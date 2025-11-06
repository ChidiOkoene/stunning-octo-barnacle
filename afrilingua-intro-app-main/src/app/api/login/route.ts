import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const emailNorm = (email || '').trim().toLowerCase();
    const passwordInput = (password || '').trim();

    if (!emailNorm || !passwordInput) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user by email (handle multiple rows - get most recent with password_hash)
    const { data: users, error: findError } = await supabase
      .from('registrations')
      .select('id, email, password_hash, first_name, last_name, email_verified, profile_picture_url, role, country_of_origin, ethnic_of_origin, mother_tongue, lingua_franca, date_of_birth, created_at')
      .eq('email', emailNorm)
      .eq('email_verified', true)
      .not('password_hash', 'is', null)
      .order('created_at', { ascending: false })
      .limit(1);

    if (findError || !users || users.length === 0) {
      console.error('Login error - user not found:', { emailNorm, findError });
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const user = users[0];

    // Verify password (email_verified and password_hash already filtered in query)
    if (!user.password_hash) {
      console.error('Login error - no password_hash:', { userId: user.id });
      return NextResponse.json(
        { error: 'Account not set up with password. Please reset your password.' },
        { status: 401 }
      );
    }

    const isValidPassword = await bcrypt.compare(passwordInput, user.password_hash);

    if (!isValidPassword) {
      console.error('Login error - password mismatch:', { 
        emailNorm, 
        userId: user.id,
        hasPasswordHash: !!user.password_hash 
      });
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Return user data (without password hash)
    const { password_hash, ...userData } = user;

    return NextResponse.json(
      {
        success: true,
        user: userData,
        message: 'Login successful'
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

