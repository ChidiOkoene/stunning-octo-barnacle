-- ⚠️ IMPORTANT: Run this migration in Supabase SQL Editor
-- This adds email verification columns to your registrations table
-- Location: Supabase Dashboard > SQL Editor > New Query

-- Add email verification fields to registrations table
ALTER TABLE registrations 
ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT FALSE NOT NULL,
ADD COLUMN IF NOT EXISTS verification_token TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS verified_at TIMESTAMP WITH TIME ZONE;

-- Create index on verification_token for faster lookups
CREATE INDEX IF NOT EXISTS idx_registrations_verification_token ON registrations(verification_token);

-- Create index on email_verified for querying verified users
CREATE INDEX IF NOT EXISTS idx_registrations_email_verified ON registrations(email_verified);

-- Add comment
COMMENT ON COLUMN registrations.email_verified IS 'Whether the email address has been verified';
COMMENT ON COLUMN registrations.verification_token IS 'Unique token for email verification';
COMMENT ON COLUMN registrations.verified_at IS 'Timestamp when email was verified';

