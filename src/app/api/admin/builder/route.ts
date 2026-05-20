// GET  /api/admin/builder  — list all pages
// POST /api/admin/builder  — create new page

import { NextResponse, NextRequest } from 'next/server'
import { getSql } from '@/lib/db'
import { requireAdminApiAuth } from '@/lib/admin-auth'
import { DEFAULT_SETTINGS } from '@/lib/builder-types'

export async function GET() {
  const authError = await requireAdminApiAuth()
  if (authError) return authError

  try {
    const sql = getSql()
    const rows = await sql`
      SELECT slug, title, meta_title, meta_desc, updated_at
      FROM page_builder_layouts
      ORDER BY
        CASE slug
          WHEN 'home' THEN 0
          WHEN 'about' THEN 1
          WHEN 'sell' THEN 2
          WHEN 'buy' THEN 3
          WHEN 'contact' THEN 4
          ELSE 99
        END,
        title ASC
    `
    return NextResponse.json(rows)
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const authError = await requireAdminApiAuth(req, { mutation: true })
  if (authError) return authError

  try {
    const body = await req.json() as { slug: string; title: string }
    const { slug, title } = body

    if (!slug || !title) {
      return NextResponse.json({ error: 'slug and title required' }, { status: 400 })
    }

    // Sanitise slug
    const cleanSlug = slug
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')

    const sql = getSql()

    // Check not already taken
    const existing = await sql`SELECT slug FROM page_builder_layouts WHERE slug = ${cleanSlug}`
    if (existing.length > 0) {
      return NextResponse.json({ error: 'A page with this slug already exists' }, { status: 409 })
    }

    // Seed with a blank hero so the page isn't empty
    const starterSections = [
      {
        id: Math.random().toString(36).slice(2, 10),
        type: 'page-header',
        settings: DEFAULT_SETTINGS['page-header'],
        data: { eyebrow: '', title, subtitle: '' },
      },
    ]

    await sql`
      INSERT INTO page_builder_layouts (slug, title, meta_title, meta_desc, sections)
      VALUES (${cleanSlug}, ${title}, ${title}, '', ${sql.json(starterSections as unknown as Parameters<typeof sql.json>[0])})
    `

    return NextResponse.json({ slug: cleanSlug, title })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
