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
  registration_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

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
