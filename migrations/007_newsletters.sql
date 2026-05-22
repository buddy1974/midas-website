-- Migration 007: Newsletter archive
-- Run once in Neon SQL editor

CREATE TABLE IF NOT EXISTS newsletters (
  id          TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  external_id TEXT UNIQUE,                -- Infusionsoft broadcast ID
  subject     TEXT NOT NULL,
  preview     TEXT,                       -- short teaser shown in cards
  html_body   TEXT,                       -- full broadcast HTML
  sent_at     TIMESTAMPTZ,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS newsletters_sent_at_idx ON newsletters (sent_at DESC);
