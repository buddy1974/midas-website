import postgres from 'postgres'

let _sql: ReturnType<typeof postgres> | null = null

export function getSql() {
  if (!_sql) {
    if (!process.env.WEBSITE_DATABASE_URL) {
      throw new Error('WEBSITE_DATABASE_URL not set')
    }
    _sql = postgres(process.env.WEBSITE_DATABASE_URL, {
      ssl: 'require',
      max: 1,
      idle_timeout: 20,
      connect_timeout: 10,
    })
  }
  return _sql
}

export interface MediaImage {
  url: string
  caption?: string
}

export interface MediaEmbed {
  url: string
  title?: string
}

export interface PropertyRow {
  id: string
  title: string
  area: string
  address: string | null
  address_visible: boolean
  property_type: string
  bedrooms: number | null
  guide_price: number
  description: string | null
  features: string | null
  image_url: string | null
  video_url: string | null
  images: MediaImage[]
  embeds: MediaEmbed[]
  auction_date: string | null
  tenure: string
  is_featured: boolean
  show_on_website: boolean
  is_off_market: boolean
  stage: string
  created_at: string
  updated_at: string
}

export interface BlogPostRow {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string | null
  cover_image: string | null
  category: string
  status: string
  published_at: string | null
  created_at: string
  updated_at: string
}

export interface RecurrenceDate {
  date: string        // ISO "2026-07-10"
  startTime: string   // "18:00"
  endTime: string     // "21:00" — empty string means no end time
}

export interface EventRow {
  id: string
  name: string
  event_date: string
  event_time: string | null
  location: string | null
  description: string | null
  event_type: string
  cost_type: string
  cost_amount: number
  image_url: string | null
  images: MediaImage[]
  embeds: MediaEmbed[]
  registration_url: string | null
  is_featured: boolean
  is_recurring: boolean
  recurrence_dates: RecurrenceDate[]
  created_at: string
}

export interface NewsletterRow {
  id: string
  external_id: string | null
  subject: string
  preview: string | null
  html_body: string | null
  sent_at: string | null
  is_published: boolean
  created_at: string
}

export interface SiteContentRow {
  key: string
  value: string
  updated_at: string
}

export interface LeadRow {
  id: string
  type: string
  name: string | null
  email: string | null
  phone: string | null
  source: string
  data: Record<string, unknown>
  created_at: string
}
