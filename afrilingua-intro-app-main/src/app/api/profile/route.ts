import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

// For demo purposes - returns latest registration
// In production, get user from session/auth token
export async function GET(request: Request) {
  try {
    // Get the latest registration (for demo)
    // In production, use authentication to get current user
    const { data, error } = await supabase
      .from('registrations')
      .select('id, email, first_name, last_name, profile_picture_url, role, email_verified, country_of_origin, ethnic_of_origin, mother_tongue, lingua_franca, date_of_birth, created_at, bio, intro_audio_url, intro_video_url')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ user: data }, { status: 200 });
  } catch (error) {
    console.error('Profile error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

