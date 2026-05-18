-- Migration 006: Eventbrite sync support
-- Run once in Neon SQL editor

-- Unique constraint on registration_url so ON CONFLICT works for Eventbrite upserts
ALTER TABLE events ADD COLUMN IF NOT EXISTS registration_url TEXT;
ALTER TABLE events ADD COLUMN IF NOT EXISTS images JSONB NOT NULL DEFAULT '[]';
ALTER TABLE events ADD COLUMN IF NOT EXISTS embeds JSONB NOT NULL DEFAULT '[]';

-- Only add unique constraint if it doesn't already exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'events_registration_url_key'
  ) THEN
    ALTER TABLE events ADD CONSTRAINT events_registration_url_key UNIQUE (registration_url);
  END IF;
END $$;
