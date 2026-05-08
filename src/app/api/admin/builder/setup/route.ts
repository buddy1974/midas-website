// POST /api/admin/builder/setup
// Creates the page_builder_layouts table and seeds initial page data.

import { NextResponse } from 'next/server'
import { getSql } from '@/lib/db'
import { SECTION_DEFAULTS, SECTION_SCHEMAS as _ } from '@/lib/builder-defaults'
import { DEFAULT_SETTINGS } from '@/lib/builder-types'
import { isAdminLoggedIn } from '@/lib/admin-auth'

// ── Seed data: maps existing pages to builder layouts ─────────────────────────

function makeId() {
  return Math.random().toString(36).slice(2, 10)
}

const SEED_PAGES = [
  {
    slug: 'home',
    title: 'Homepage',
    metaTitle: 'Midas Property Auctions | London, Essex & Nationwide',
    metaDesc: 'UK property auction specialists connecting buyers, sellers and investors through our network of established auction companies.',
    sections: [
      { id: makeId(), type: 'hero',          settings: DEFAULT_SETTINGS['hero'],          data: SECTION_DEFAULTS['hero'] },
      { id: makeId(), type: 'stats-bar',     settings: DEFAULT_SETTINGS['stats-bar'],     data: SECTION_DEFAULTS['stats-bar'] },
      { id: makeId(), type: 'text-block',    settings: { ...DEFAULT_SETTINGS['text-block'], background: 'dark' }, data: {
          ...SECTION_DEFAULTS['text-block'],
          eyebrow: 'Welcome to Midas',
          heading: 'Welcome to Midas Property Auctions',
          body: 'Midas Property Auctions connects buyers, sellers and investors across the UK, working with a network of established UK auction companies to deliver fast, transparent and professional results.',
          alignment: 'center',
        }
      },
      { id: makeId(), type: 'properties-grid', settings: DEFAULT_SETTINGS['properties-grid'], data: SECTION_DEFAULTS['properties-grid'] },
      { id: makeId(), type: 'card-grid',     settings: DEFAULT_SETTINGS['card-grid'],     data: SECTION_DEFAULTS['card-grid'] },
      { id: makeId(), type: 'newsletter',    settings: DEFAULT_SETTINGS['newsletter'],    data: SECTION_DEFAULTS['newsletter'] },
      { id: makeId(), type: 'cta-banner',    settings: DEFAULT_SETTINGS['cta-banner'],    data: SECTION_DEFAULTS['cta-banner'] },
    ],
  },
  {
    slug: 'about',
    title: 'About Us',
    metaTitle: 'About Midas Property Auctions | 15+ Years Experience',
    metaDesc: 'Meet the team behind Midas Property Auctions — specialists in UK property auctions, off-market deals and investor services.',
    sections: [
      { id: makeId(), type: 'page-header', settings: DEFAULT_SETTINGS['page-header'], data: { eyebrow: 'About Midas', title: '15+ Years at the Heart of UK Property Auctions', subtitle: 'Built on expertise, trust, and an unrivalled investor network.' } },
      { id: makeId(), type: 'text-image',  settings: { ...DEFAULT_SETTINGS['text-image'], background: 'dark' }, data: { ...SECTION_DEFAULTS['text-image'], eyebrow: 'Who We Are', heading: 'A Team of Dedicated Experts', body: 'At Midas Property Group, we focus on ensuring we deliver a professional service for each of our clients. Our team has a drive and a vision to help Midas Property Group become one of the leaders in our industry.', imagePosition: 'right' } },
      { id: makeId(), type: 'stats-bar',  settings: DEFAULT_SETTINGS['stats-bar'],  data: SECTION_DEFAULTS['stats-bar'] },
      { id: makeId(), type: 'cta-banner', settings: DEFAULT_SETTINGS['cta-banner'], data: SECTION_DEFAULTS['cta-banner'] },
    ],
  },
  {
    slug: 'contact',
    title: 'Contact',
    metaTitle: 'Contact Midas Property Auctions',
    metaDesc: 'Get in touch with Midas Property Auctions. We respond within 24 hours.',
    sections: [
      { id: makeId(), type: 'page-header',   settings: DEFAULT_SETTINGS['page-header'],   data: { eyebrow: 'Contact', title: 'Get in Touch', subtitle: 'We respond within 24 hours. Call Sam directly for urgent enquiries.' } },
      { id: makeId(), type: 'contact-block', settings: DEFAULT_SETTINGS['contact-block'], data: SECTION_DEFAULTS['contact-block'] },
    ],
  },
  {
    slug: 'sell',
    title: 'Sell Property',
    metaTitle: 'Sell Your Property at Auction | Midas Property Auctions',
    metaDesc: 'Free to list. No upfront fees. Sell in as little as 28 days through Midas Property Auctions.',
    sections: [
      { id: makeId(), type: 'hero',      settings: DEFAULT_SETTINGS['hero'], data: { ...SECTION_DEFAULTS['hero'], eyebrow: 'SELL WITH MIDAS', title: 'Sell Your Property at Auction', subtitle: 'Free to list. No upfront fees. Sell in as little as 28 days.', ctaText: 'Get a Free Valuation', ctaUrl: '/valuation', ctaText2: '', ctaUrl2: '' } },
      { id: makeId(), type: 'steps',    settings: DEFAULT_SETTINGS['steps'], data: { ...SECTION_DEFAULTS['steps'], heading: 'How Selling Works' } },
      { id: makeId(), type: 'faq',      settings: DEFAULT_SETTINGS['faq'],   data: SECTION_DEFAULTS['faq'] },
      { id: makeId(), type: 'cta-banner', settings: DEFAULT_SETTINGS['cta-banner'], data: SECTION_DEFAULTS['cta-banner'] },
    ],
  },
  {
    slug: 'buy',
    title: 'Buy Property',
    metaTitle: 'Buy Property at Auction | Midas Property Auctions',
    metaDesc: 'Browse residential, HMO, commercial and development properties at auction across London, Essex and nationwide.',
    sections: [
      { id: makeId(), type: 'hero',      settings: DEFAULT_SETTINGS['hero'], data: { ...SECTION_DEFAULTS['hero'], eyebrow: 'BUY WITH MIDAS', title: 'Buy Property at Auction', subtitle: 'Residential, HMO, commercial and development properties across London, Essex and nationwide.', ctaText: 'View Current Lots', ctaUrl: '/current-auction', ctaText2: 'Register to Bid', ctaUrl2: '/register' } },
      { id: makeId(), type: 'steps',    settings: DEFAULT_SETTINGS['steps'], data: { ...SECTION_DEFAULTS['steps'], heading: 'How Buying Works' } },
      { id: makeId(), type: 'properties-grid', settings: DEFAULT_SETTINGS['properties-grid'], data: SECTION_DEFAULTS['properties-grid'] },
      { id: makeId(), type: 'faq',      settings: DEFAULT_SETTINGS['faq'],   data: SECTION_DEFAULTS['faq'] },
      { id: makeId(), type: 'cta-banner', settings: DEFAULT_SETTINGS['cta-banner'], data: SECTION_DEFAULTS['cta-banner'] },
    ],
  },
  {
    slug: 'register',
    title: 'Register to Bid',
    metaTitle: 'Register to Bid | Midas Property Auctions',
    metaDesc: 'Register as a bidder with Midas Property Auctions and access our full range of lots.',
    sections: [
      { id: makeId(), type: 'page-header', settings: DEFAULT_SETTINGS['page-header'], data: { eyebrow: 'Investor Registration', title: 'Register to Bid', subtitle: 'Join 2,847+ active investors in our network.' } },
    ],
  },
]

export async function POST() {
  if (!(await isAdminLoggedIn())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const sql = getSql()

    // Create table
    await sql`
      CREATE TABLE IF NOT EXISTS page_builder_layouts (
        slug       TEXT PRIMARY KEY,
        title      TEXT NOT NULL DEFAULT '',
        meta_title TEXT NOT NULL DEFAULT '',
        meta_desc  TEXT NOT NULL DEFAULT '',
        sections   JSONB NOT NULL DEFAULT '[]',
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )
    `

    // Seed pages (only if they don't already exist)
    for (const page of SEED_PAGES) {
      const existing = await sql`SELECT slug FROM page_builder_layouts WHERE slug = ${page.slug}`
      if (existing.length === 0) {
        await sql`
          INSERT INTO page_builder_layouts (slug, title, meta_title, meta_desc, sections)
          VALUES (${page.slug}, ${page.title}, ${page.metaTitle}, ${page.metaDesc}, ${JSON.stringify(page.sections)})
        `
      }
    }

    return NextResponse.json({ ok: true, seeded: SEED_PAGES.length })
  } catch (err) {
    console.error('[builder/setup]', err)
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
