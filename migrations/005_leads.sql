-- Migration 005: leads table — replaces OS intake layer
-- Run once in Neon SQL editor

CREATE TABLE IF NOT EXISTS leads (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type        VARCHAR(50)  NOT NULL,   -- register_interest | finance_enquiry | offmarket_request | register_investor | whatsapp_signup
  name        VARCHAR(200),
  email       VARCHAR(255),
  phone       VARCHAR(50),
  source      VARCHAR(100) DEFAULT 'website',
  data        JSONB        NOT NULL DEFAULT '{}',  -- all type-specific fields
  created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS leads_type_idx       ON leads (type);
CREATE INDEX IF NOT EXISTS leads_email_idx      ON leads (email);
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at DESC);
