-- Add password and profile picture fields to registrations table
ALTER TABLE registrations 
ADD COLUMN IF NOT EXISTS password_hash TEXT,
ADD COLUMN IF NOT EXISTS profile_picture_url TEXT;

-- Create index on email for login lookups (already exists but ensuring it)
CREATE INDEX IF NOT EXISTS idx_registrations_email ON registrations(email);

-- Add comment
COMMENT ON COLUMN registrations.password_hash IS 'Hashed password for user authentication';
COMMENT ON COLUMN registrations.profile_picture_url IS 'URL to user profile picture';

