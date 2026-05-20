CREATE TABLE IF NOT EXISTS properties (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  area TEXT NOT NULL,
  address TEXT,
  address_visible BOOLEAN DEFAULT true,
  property_type TEXT NOT NULL DEFAULT 'Residential',
  bedrooms INTEGER,
  guide_price INTEGER NOT NULL DEFAULT 0,
  description TEXT,
  features TEXT,
  image_url TEXT,
  video_url TEXT,
  images JSONB NOT NULL DEFAULT '[]',
  embeds JSONB NOT NULL DEFAULT '[]',
  auction_date TEXT,
  tenure TEXT DEFAULT 'Freehold',
  is_featured BOOLEAN DEFAULT false,
  show_on_website BOOLEAN DEFAULT true,
  is_off_market BOOLEAN DEFAULT false,
  stage TEXT DEFAULT 'Sourcing',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS blog_posts (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT,
  cover_image TEXT,
  category TEXT DEFAULT 'Guide',
  status TEXT DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS events (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  event_date TEXT NOT NULL,
  event_time TEXT,
  location TEXT,
  description TEXT,
  event_type TEXT DEFAULT 'webinar',
  cost_type TEXT DEFAULT 'free',
  cost_amount INTEGER DEFAULT 0,
  image_url TEXT,
  images JSONB NOT NULL DEFAULT '[]',
  embeds JSONB NOT NULL DEFAULT '[]',
  registration_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_recurring BOOLEAN DEFAULT false,
  recurrence_dates JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS events_registration_url_unique
  ON events (registration_url)
  WHERE registration_url IS NOT NULL;

CREATE TABLE IF NOT EXISTS site_content (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO site_content (key, value) VALUES
  ('hero_title_1', 'Midas'),
  ('hero_title_2', 'Property Auctions'),
  ('hero_subtitle', 'Standing in the middle, connecting buyers, sellers and investors across the UK through our network of established auction companies and exclusive off-market services.'),
  ('welcome_heading', 'Welcome to Midas Property Auctions'),
  ('welcome_subtitle', 'Midas Property Auctions connects buyers, sellers and investors across the UK.'),
  ('stats_properties', '340+'),
  ('stats_investors', '3,000+'),
  ('stats_experience', '15+'),
  ('contact_phone', '+44 (0) 2072062691'),
  ('contact_mobile', '+44 (0) 7413041372'),
  ('contact_email', 'info@midaspropertyauctions.co.uk'),
  ('contact_hours', 'Mon to Fri: 9.00 to 18.00')
ON CONFLICT (key) DO NOTHING;

CREATE TABLE IF NOT EXISTS page_content (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  page TEXT NOT NULL,
  section TEXT NOT NULL,
  field TEXT NOT NULL,
  value TEXT NOT NULL,
  content_type TEXT DEFAULT 'text',
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(page, section, field)
);

CREATE TABLE IF NOT EXISTS menu_config (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  config JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS pages_config (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  config JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

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
