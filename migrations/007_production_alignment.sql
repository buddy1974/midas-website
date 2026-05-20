-- Migration 007: production readiness alignment
-- Idempotently aligns existing databases with the application schema.

ALTER TABLE properties
  ADD COLUMN IF NOT EXISTS images JSONB NOT NULL DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS embeds JSONB NOT NULL DEFAULT '[]';

ALTER TABLE events
  ADD COLUMN IF NOT EXISTS images JSONB NOT NULL DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS embeds JSONB NOT NULL DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS registration_url TEXT,
  ADD COLUMN IF NOT EXISTS is_recurring BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS recurrence_dates JSONB NOT NULL DEFAULT '[]';

CREATE UNIQUE INDEX IF NOT EXISTS events_registration_url_unique
  ON events (registration_url)
  WHERE registration_url IS NOT NULL;

CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type VARCHAR(50) NOT NULL,
  name VARCHAR(200),
  email VARCHAR(255),
  phone VARCHAR(50),
  source VARCHAR(100) DEFAULT 'website',
  data JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS leads_type_idx ON leads (type);
CREATE INDEX IF NOT EXISTS leads_email_idx ON leads (email);
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at DESC);

CREATE TABLE IF NOT EXISTS page_builder_layouts (
  slug TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  meta_title TEXT NOT NULL DEFAULT '',
  meta_desc TEXT NOT NULL DEFAULT '',
  sections JSONB NOT NULL DEFAULT '[]',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS admin_users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'editor',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
