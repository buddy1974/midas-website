import { NextResponse } from 'next/server'
import { getSql } from '@/lib/db'
import { isAdminLoggedIn } from '@/lib/admin-auth'

const KEAP_API = 'https://api.infusionsoft.com/crm/rest/v2'

interface KBroadcast {
  id: number
  name?: string
  status: string
  send_utc_time?: string
  subject?: string
  content?: string   // HTML body if returned by API
  preview_text?: string
}

async function keapGet<T>(path: string, token: string): Promise<T> {
  const res = await fetch(`${KEAP_API}${path}`, {
    headers: { 'X-Keap-API-Key': token },
    next: { revalidate: 0 },
  })
  if (!res.ok) throw new Error(`Keap API ${res.status}: ${await res.text()}`)
  return res.json() as Promise<T>
}

async function runSync() {
  const token = process.env.INFUSIONSOFT_API_KEY
  if (!token) {
    return NextResponse.json({ error: 'INFUSIONSOFT_API_KEY not set' }, { status: 500 })
  }

  const sql = getSql()
  let synced = 0
  let total = 0

  try {
    // Fetch all sent email broadcasts
    const list = await keapGet<{ broadcasts: KBroadcast[] }>(
      '/broadcasts?broadcast_type=EMAIL&status=SENT&limit=200',
      token
    )

    total = list.broadcasts?.length ?? 0

    for (const broadcast of list.broadcasts ?? []) {
      if (broadcast.status !== 'SENT') continue

      // Try to get detailed content for each broadcast
      let subject = broadcast.subject ?? broadcast.name ?? `Newsletter ${broadcast.id}`
      let htmlBody = broadcast.content ?? null
      let preview  = broadcast.preview_text ?? null
      const sentAt = broadcast.send_utc_time ?? null

      // Attempt to fetch broadcast detail if content wasn't in list response
      if (!htmlBody) {
        try {
          const detail = await keapGet<KBroadcast>(`/broadcasts/${broadcast.id}`, token)
          subject  = detail.subject ?? detail.name ?? subject
          htmlBody = detail.content ?? null
          preview  = detail.preview_text ?? preview
        } catch { /* detail fetch optional */ }
      }

      // Derive a short preview from HTML if not provided
      if (!preview && htmlBody) {
        preview = htmlBody
          .replace(/<[^>]+>/g, ' ')
          .replace(/\s+/g, ' ')
          .trim()
          .slice(0, 200) || null
      }

      await sql`
        INSERT INTO newsletters (external_id, subject, preview, html_body, sent_at, is_published)
        VALUES (
          ${String(broadcast.id)},
          ${subject},
          ${preview},
          ${htmlBody},
          ${sentAt},
          true
        )
        ON CONFLICT (external_id) DO UPDATE SET
          subject    = EXCLUDED.subject,
          preview    = EXCLUDED.preview,
          html_body  = COALESCE(EXCLUDED.html_body, newsletters.html_body),
          sent_at    = COALESCE(EXCLUDED.sent_at, newsletters.sent_at)
      `
      synced++
    }
  } catch (err) {
    console.error('[newsletter-sync]', err)
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }

  return NextResponse.json({ ok: true, synced, total })
}

export async function POST() {
  if (!await isAdminLoggedIn()) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  return runSync()
}

// GET: Vercel Cron support (optional)
export async function GET(req: Request) {
  if (!process.env.CRON_SECRET) return NextResponse.json({ error: 'No cron secret' }, { status: 503 })
  if (req.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  return runSync()
}
