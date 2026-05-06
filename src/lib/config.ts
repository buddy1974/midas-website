import { team as defaultTeam, testimonials as defaultTestimonials, blogPosts as defaultBlogPosts, company } from '@/lib/data'

// ── Shared CMS types (compatible with both data.ts and OS API) ────────────────

export interface CmsTeamMember {
  id?: string
  name: string
  role: string
  initials: string
  bio: string
  phone?: string
  email?: string
  linkedin?: string
  photoUrl?: string
  sortOrder?: number
}

export interface CmsTestimonial {
  id?: string
  name: string
  location: string
  text: string
  rating: number
}

export interface CmsBlogPost {
  id?: string
  title: string
  slug: string
  category: string
  date?: string
  publishedAt?: string
  excerpt: string
  coverImage?: string
  gradient?: string
  content?: string
}

export interface SiteConfigMap {
  [key: string]: string
}

export interface PublicData {
  config: SiteConfigMap
  team: CmsTeamMember[]
  testimonials: CmsTestimonial[]
  posts: CmsBlogPost[]
}

// ── Default config (fallback when OS is unreachable) ─────────────────────────

const defaultConfig: SiteConfigMap = {
  'site.name': company.name,
  'site.tagline': company.tagline,
  'site.company_full': company.fullName,
  'site.company_no': company.companyNo,
  'site.vat_no': company.vatNo,
  'contact.phone': company.phone,
  'contact.mobile': company.mobile,
  'contact.email': company.email,
  'contact.address_line1': company.address.line1,
  'contact.address_line2': company.address.line2,
  'contact.city': company.address.city,
  'contact.postcode': company.address.postcode,
  'contact.hours': company.hours,
  'social.facebook': company.social.facebook,
  'social.instagram': company.social.instagram,
  'social.linkedin': company.social.linkedin,
  'auction.next_date': '2026-05-14T12:00:00',
  'auction.next_name': 'Next Auction Event, May 2026',
  'auction.next_lots': '12',
  'auction.next_format': 'livestream',
  'auction.catalogue_pdf': '',
  'auction.livestream_url': '',
  'map.lat': '51.6154',
  'map.lng': '-0.3039',
  'map.zoom': '15',
  'home.hero_eyebrow': 'London & Essex Property Auctions',
  'home.hero_heading_1': 'Where Committed Buyers',
  'home.hero_heading_2': 'Meet Committed Sellers',
  'home.hero_subtitle': 'Standing in the middle, connecting buyers to sellers, investors to opportunities, and clients to the solicitors, lenders and partners they need.',
  'home.stat_1_value': '340+',
  'home.stat_1_label': 'Properties Sold',
  'home.stat_2_value': '2,847',
  'home.stat_2_label': 'Active Investors',
  'home.stat_3_value': '15+',
  'home.stat_3_label': 'Years Experience',
  'home.stat_4_value': '28',
  'home.stat_4_label': 'Days to Completion',
  'sell.fee_text': '2% + VAT of the final hammer price, payable at completion. No upfront costs. No sale, no fee.',
  'sell.success_rate': '98%',
  'finance.rate_from': '0.75%',
  'finance.min_loan': '£50,000',
  'finance.max_loan': '£2,000,000',
  'offmarket.teaser_text': 'Password-protected access for pre-qualified investors. Properties never advertised publicly.',
  'seo.home.title': 'Midas Property Auctions | London & Essex Property Auctioneers',
  'seo.home.description': 'Premier property auction house serving London and Essex. HMOs, residential, commercial and development sites. 2,847 active investors. Register to bid today.',
  'analytics.google_id': '',
}

// ── Fetcher ───────────────────────────────────────────────────────────────────

export async function getPublicData(): Promise<PublicData> {
  try {
    const osUrl = process.env.NEXT_PUBLIC_OS_URL
    if (!osUrl) return getDefaultData()

    const res = await fetch(`${osUrl}/api/public/config`, {
      next: { revalidate: 30 },
    })
    if (!res.ok) return getDefaultData()

    const data = await res.json() as Partial<PublicData>
    return {
      config: data.config ?? defaultConfig,
      team: data.team ?? getDefaultData().team,
      testimonials: data.testimonials ?? getDefaultData().testimonials,
      posts: data.posts ?? getDefaultData().posts,
    }
  } catch {
    return getDefaultData()
  }
}

function getDefaultData(): PublicData {
  return {
    config: defaultConfig,
    team: defaultTeam.map(m => ({
      name: m.name,
      role: m.role,
      initials: m.initials,
      bio: m.bio,
      phone: m.phone,
      linkedin: m.linkedin,
    })),
    testimonials: defaultTestimonials.map(t => ({
      name: t.name,
      location: t.location,
      text: t.text,
      rating: t.rating,
    })),
    posts: defaultBlogPosts.map(p => ({
      title: p.title,
      slug: p.slug,
      category: p.category,
      date: p.date,
      excerpt: p.excerpt,
    })),
  }
}

// ── Helper ────────────────────────────────────────────────────────────────────

export function cfg(config: SiteConfigMap, key: string, fallback = ''): string {
  return config[key] ?? fallback
}
