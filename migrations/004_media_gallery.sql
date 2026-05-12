-- Migration 004: multi-image gallery + embeds for properties and events
-- Run once in Neon SQL editor

ALTER TABLE properties
  ADD COLUMN IF NOT EXISTS images  JSONB NOT NULL DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS embeds  JSONB NOT NULL DEFAULT '[]';

ALTER TABLE events
  ADD COLUMN IF NOT EXISTS images  JSONB NOT NULL DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS embeds  JSONB NOT NULL DEFAULT '[]';

-- Backfill: move existing image_url into images array as first element
UPDATE properties
  SET images = jsonb_build_array(jsonb_build_object('url', image_url, 'caption', ''))
  WHERE image_url IS NOT NULL AND image_url <> '' AND images = '[]'::jsonb;

UPDATE events
  SET images = jsonb_build_array(jsonb_build_object('url', image_url, 'caption', ''))
  WHERE image_url IS NOT NULL AND image_url <> '' AND images = '[]'::jsonb;
