-- ⚠️ IMPORTANT: Run this migration in Supabase SQL Editor
-- This adds ALL missing columns: email verification + password + profile picture
-- Location: Supabase Dashboard > SQL Editor > New Query

-- Step 1: Add email verification fields (if not already added)
ALTER TABLE registrations 
ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT FALSE NOT NULL,
ADD COLUMN IF NOT EXISTS verification_token TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS verified_at TIMESTAMP WITH TIME ZONE;

-- Step 2: Add password and profile picture fields
ALTER TABLE registrations 
ADD COLUMN IF NOT EXISTS password_hash TEXT,
ADD COLUMN IF NOT EXISTS profile_picture_url TEXT;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_registrations_verification_token ON registrations(verification_token);
CREATE INDEX IF NOT EXISTS idx_registrations_email_verified ON registrations(email_verified);

-- Add comments
COMMENT ON COLUMN registrations.email_verified IS 'Whether the email address has been verified';
COMMENT ON COLUMN registrations.verification_token IS 'Unique token for email verification';
COMMENT ON COLUMN registrations.verified_at IS 'Timestamp when email was verified';
COMMENT ON COLUMN registrations.password_hash IS 'Hashed password for user authentication';
COMMENT ON COLUMN registrations.profile_picture_url IS 'URL to user profile picture';

