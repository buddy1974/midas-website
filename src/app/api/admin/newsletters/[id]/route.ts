import { NextResponse } from 'next/server'
import { getSql } from '@/lib/db'
import { requireAdminApiAuth } from '@/lib/admin-auth'

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const authErr = await requireAdminApiAuth(req, { mutation: true })
  if (authErr) return authErr

  const { id } = await params
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
    await sql`
      UPDATE newsletters SET
        subject      = ${subject},
        preview      = ${body.preview?.trim() || null},
        html_body    = ${body.html_body?.trim() || null},
        sent_at      = ${body.sent_at || null},
        is_published = ${body.is_published ?? false}
      WHERE id = ${id}`
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[newsletters PATCH]', err)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const authErr = await requireAdminApiAuth(req, { mutation: true })
  if (authErr) return authErr

  const { id } = await params
  try {
    const sql = getSql()
    await sql`DELETE FROM newsletters WHERE id = ${id}`
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[newsletters DELETE]', err)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}
