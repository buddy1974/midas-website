// GET    /api/admin/builder/[slug]  — load page layout
// PUT    /api/admin/builder/[slug]  — save page layout
// DELETE /api/admin/builder/[slug]  — delete page (non-system only)

import { NextResponse, NextRequest } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getSql } from '@/lib/db'

const SYSTEM_PAGES = ['home', 'about', 'sell', 'buy', 'contact', 'register']

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    const sql = getSql()
    const rows = await sql`SELECT * FROM page_builder_layouts WHERE slug = ${slug}`
    if (rows.length === 0) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 })
    }
    const row = rows[0]
    return NextResponse.json({
      slug: row.slug,
      title: row.title,
      metaTitle: row.meta_title,
      metaDesc: row.meta_desc,
      sections: typeof row.sections === 'string' ? JSON.parse(row.sections) : (row.sections ?? []),
      updatedAt: row.updated_at,
    })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    const body = await req.json() as {
      title?: string
      metaTitle?: string
      metaDesc?: string
      sections?: unknown[]
    }

    const sql = getSql()

    await sql`
      UPDATE page_builder_layouts
      SET
        title      = COALESCE(${body.title ?? null}, title),
        meta_title = COALESCE(${body.metaTitle ?? null}, meta_title),
        meta_desc  = COALESCE(${body.metaDesc ?? null}, meta_desc),
        sections   = COALESCE(${body.sections ? JSON.stringify(body.sections) : null}::jsonb, sections),
        updated_at = NOW()
      WHERE slug = ${slug}
    `

    // Revalidate the public page so ISR picks up new content immediately
    const publicPath = slug === 'home' ? '/' : `/${slug}`
    revalidatePath(publicPath)

    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params

    if (SYSTEM_PAGES.includes(slug)) {
      return NextResponse.json({ error: 'Cannot delete a system page' }, { status: 403 })
    }

    const sql = getSql()
    await sql`DELETE FROM page_builder_layouts WHERE slug = ${slug}`
    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
