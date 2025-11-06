-- Add bio and introductory media URLs to registrations
ALTER TABLE registrations 
ADD COLUMN IF NOT EXISTS bio TEXT,
ADD COLUMN IF NOT EXISTS intro_audio_url TEXT,
ADD COLUMN IF NOT EXISTS intro_video_url TEXT;

COMMENT ON COLUMN registrations.bio IS 'Member biography / about section';
COMMENT ON COLUMN registrations.intro_audio_url IS 'URL to introductory audio in native language';
COMMENT ON COLUMN registrations.intro_video_url IS 'URL to introductory video in native language';


