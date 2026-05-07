import { NextRequest, NextResponse } from 'next/server'
import { getSql } from '@/lib/db'
import { isAdminLoggedIn } from '@/lib/admin-auth'

interface BulkUpdate {
  page: string
  section: string
  field: string
  value: string
  content_type?: string
}

export async function POST(req: NextRequest) {
  if (!await isAdminLoggedIn()) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  const { updates } = await req.json() as { updates: BulkUpdate[] }
  if (!Array.isArray(updates) || updates.length === 0) return NextResponse.json({ ok: true, count: 0 })
  const sql = getSql()
  for (const u of updates) {
    await sql`
      INSERT INTO page_content (page, section, field, value, content_type, updated_at)
      VALUES (${u.page}, ${u.section}, ${u.field}, ${u.value}, ${u.content_type ?? 'text'}, NOW())
      ON CONFLICT (page, section, field) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()`
  }
  return NextResponse.json({ ok: true, count: updates.length })
}
