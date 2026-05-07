// GET /api/public/builder-page/[slug]
// Returns the page layout for public rendering. No auth required.

import { NextResponse, NextRequest } from 'next/server'
import { getSql } from '@/lib/db'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    const sql = getSql()
    const rows = await sql`SELECT * FROM page_builder_layouts WHERE slug = ${slug}`
    if (rows.length === 0) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
    const row = rows[0]
    return NextResponse.json({
      slug: row.slug,
      title: row.title,
      metaTitle: row.meta_title,
      metaDesc: row.meta_desc,
      sections: row.sections,
    })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
