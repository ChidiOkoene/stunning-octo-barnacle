import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Verification token is required' },
        { status: 400 }
      );
    }

    // Find registration with this token
    const { data: registration, error: findError } = await supabase
      .from('registrations')
      .select('id, email, email_verified')
      .eq('verification_token', token)
      .single();

    if (findError || !registration) {
      return NextResponse.json(
        { error: 'Invalid or expired verification token' },
        { status: 404 }
      );
    }

    // Check if already verified
    if (registration.email_verified) {
      return NextResponse.json(
        { success: true, message: 'Email already verified' },
        { status: 200 }
      );
    }

    // Update registration to mark as verified
    const { error: updateError } = await supabase
      .from('registrations')
      .update({
        email_verified: true,
        verified_at: new Date().toISOString(),
        verification_token: null, // Remove token after verification
      })
      .eq('id', registration.id);

    if (updateError) {
      console.error('Update error:', updateError);
      return NextResponse.json(
        { error: 'Failed to verify email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Email verified successfully!',
        email: registration.email
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

