import { NextResponse } from 'next/server';
import { supabase, RegistrationData } from '@/lib/supabaseClient';
import { sendRegistrationConfirmationEmail } from '@/lib/email';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const body: RegistrationData = await request.json();
    const {
      first_name,
      last_name,
      email,
      password,
      date_of_birth,
      country_of_origin,
      ethnic_of_origin,
      mother_tongue,
      lingua_franca,
      role,
      locale,
    } = body;

    // Validate required fields
    if (
      !first_name ||
      !last_name ||
      !email ||
      !password ||
      !date_of_birth ||
      !country_of_origin ||
      !ethnic_of_origin ||
      !mother_tongue ||
      !lingua_franca ||
      !role
    ) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Normalize and validate email
    const emailNorm = (email || '').trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailNorm)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate date of birth format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date_of_birth)) {
      return NextResponse.json(
        { error: 'Invalid date format. Use YYYY-MM-DD' },
        { status: 400 }
      );
    }

    // Validate date of birth is not in the future
    const birthDate = new Date(date_of_birth);
    const today = new Date();
    if (birthDate > today) {
      return NextResponse.json(
        { error: 'Date of birth cannot be in the future' },
        { status: 400 }
      );
    }

    // Validate lingua franca
    if (lingua_franca !== 'en' && lingua_franca !== 'fr') {
      return NextResponse.json(
        { error: 'Lingua franca must be either "en" or "fr"' },
        { status: 400 }
      );
    }

    // Validate role
    const validRoles = ['coreTeam', 'ambassador', 'validator', 'contributor', 'technicalPlayer'];
    if (!validRoles.includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role selected' },
        { status: 400 }
      );
    }

    // Generate verification token
    const crypto = await import('crypto');
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Insert registration into Supabase
    const { data, error } = await supabase
      .from('registrations')
      .insert([
        {
          first_name,
          last_name,
          email: emailNorm,
          password_hash: passwordHash,
          date_of_birth,
          country_of_origin,
          ethnic_of_origin,
          mother_tongue,
          lingua_franca,
          role,
          locale: locale || 'en',
          verification_token: verificationToken,
          email_verified: false,
        },
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to submit registration', details: error.message },
        { status: 500 }
      );
    }

    // Send confirmation email (don't block registration if email fails)
    try {
      const fullName = `${first_name} ${last_name}`;
      const roleLabels: Record<string, string> = {
        coreTeam: 'Core Team Member',
        ambassador: 'Ambassador',
        validator: 'Validator',
        contributor: 'Contributor',
        technicalPlayer: 'Technical Player',
      };
      const roleLabel = roleLabels[role] || role;
      
      // Extract base URL from request (check headers first for proxy/load balancer support)
      const host = request.headers.get('host') || request.headers.get('x-forwarded-host');
      const protocol = request.headers.get('x-forwarded-proto') || 
                      (request.url.startsWith('https') ? 'https' : 'http');
      const baseUrl = host ? `${protocol}://${host}` : undefined;
      
      await sendRegistrationConfirmationEmail(email, fullName, roleLabel, verificationToken, locale || 'en', baseUrl);
    } catch (emailError) {
      // Log email error but don't fail the registration
      console.error('Email sending failed:', emailError);
    }

    return NextResponse.json(
      { success: true, data, message: 'Registration successful! Check your email for confirmation.' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
