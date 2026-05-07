import { NextRequest, NextResponse } from 'next/server'
import { getSql } from '@/lib/db'
import { isAdminLoggedIn } from '@/lib/admin-auth'

interface PageContentRow {
  section: string
  field: string
  value: string
}

// GET ?page=home → returns { "hero.title_1": "Midas", "hero.subtitle": "..." }
export async function GET(req: NextRequest) {
  const page = new URL(req.url).searchParams.get('page') ?? ''
  const sql = getSql()
  const rows = await sql<PageContentRow[]>`
    SELECT section, field, value FROM page_content WHERE page = ${page}`
  const result: Record<string, string> = {}
  for (const r of rows) result[`${r.section}.${r.field}`] = r.value
  return NextResponse.json(result)
}

interface EditorPostBody {
  page: string
  section: string
  field: string
  value: string
  content_type?: string
}

// POST { page, section, field, value, content_type }
export async function POST(req: NextRequest) {
  if (!await isAdminLoggedIn()) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  const body = await req.json() as EditorPostBody
  const sql = getSql()
  await sql`
    INSERT INTO page_content (page, section, field, value, content_type, updated_at)
    VALUES (${body.page}, ${body.section}, ${body.field}, ${body.value}, ${body.content_type ?? 'text'}, NOW())
    ON CONFLICT (page, section, field) DO UPDATE SET value = EXCLUDED.value, content_type = EXCLUDED.content_type, updated_at = NOW()`
  return NextResponse.json({ ok: true })
}
