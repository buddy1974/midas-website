import { NextResponse } from 'next/server'
import { getSql } from '@/lib/db'
import { requireAdminApiAuth } from '@/lib/admin-auth'

export async function POST(req: Request) {
  const authErr = await requireAdminApiAuth(req, { mutation: true })
  if (authErr) return authErr

  let body: {
    subject?: string
    preview?: string
    html_body?: string
    sent_at?: string
    is_published?: boolean
  }
  try { body = await req.json() } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }) }

  const subject = (body.subject ?? '').trim()
  if (!subject) return NextResponse.json({ error: 'Subject is required' }, { status: 400 })

  try {
    const sql = getSql()
    const [row] = await sql<{ id: string }[]>`
      INSERT INTO newsletters (subject, preview, html_body, sent_at, is_published)
      VALUES (
        ${subject},
        ${body.preview?.trim() || null},
        ${body.html_body?.trim() || null},
        ${body.sent_at || null},
        ${body.is_published ?? false}
      )
      RETURNING id`
    return NextResponse.json({ id: row.id })
  } catch (err) {
    console.error('[newsletters POST]', err)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}
