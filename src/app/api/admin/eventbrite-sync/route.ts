import { NextResponse } from 'next/server'
import { getSql } from '@/lib/db'
import { requireAdminApiAuth } from '@/lib/admin-auth'

interface EbEvent {
  id: string
  name: { text: string }
  description: { text: string | null }
  start: { local: string }
  end:   { local: string }
  url:   string
  is_free: boolean
  online_event: boolean
  venue_id: string | null
  status: string
  summary?: string | null
}
interface EbVenue {
  address: { localized_address_display: string }
}
interface EbTicketClass {
  cost?: { major_value: string } | null
  free: boolean
}

async function ebFetch<T>(path: string, token: string): Promise<T> {
  const res = await fetch(`https://www.eventbriteapi.com/v3${path}`, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 0 },
  })
  if (!res.ok) throw new Error(`Eventbrite API ${res.status}: ${await res.text()}`)
  return res.json() as Promise<T>
}

function parseLocalDate(local: string) {
  const [date, time] = local.split('T')
  return { date: date ?? '', time: time ? time.slice(0, 5) : '00:00' }
}

async function runSync() {
  const token = process.env.EVENTBRITE_API_KEY
  const orgId = process.env.EVENTBRITE_ORG_ID

  if (!token || !orgId) {
    return NextResponse.json({ error: 'EVENTBRITE_API_KEY and EVENTBRITE_ORG_ID env vars required' }, { status: 500 })
  }

  const sql = getSql()

  const eb = await ebFetch<{ events: EbEvent[] }>(
    `/organizations/${orgId}/events/?status=live,started&order_by=start_asc&expand=venue&page_size=50`,
    token
  )

  let synced = 0

  for (const ev of eb.events) {
    if (ev.status === 'canceled' || ev.status === 'deleted') continue

    const { date: event_date, time: start } = parseLocalDate(ev.start.local)
    const { time: end }                      = parseLocalDate(ev.end.local)
    const event_time = `${start} - ${end}`

    let location: string | null = null
    if (!ev.online_event && ev.venue_id) {
      try {
        const venue = await ebFetch<EbVenue>(`/venues/${ev.venue_id}/`, token)
        location = venue.address.localized_address_display
      } catch { /* ignore */ }
    }

    let cost_type = 'free'
    let cost_amount = 0
    if (!ev.is_free) {
      try {
        const tix = await ebFetch<{ ticket_classes: EbTicketClass[] }>(`/events/${ev.id}/ticket_classes/`, token)
        const paid = tix.ticket_classes.find(t => !t.free && t.cost)
        if (paid?.cost?.major_value) {
          cost_type = 'paid'
          cost_amount = Math.round(parseFloat(paid.cost.major_value))
        }
      } catch { /* ignore */ }
    }

    const description = ev.description?.text ?? ev.summary ?? null
    const event_type  = ev.online_event ? 'webinar' : 'in-person'

    await sql`
      INSERT INTO events
        (name, event_date, event_time, location, description, event_type,
         cost_type, cost_amount, image_url, registration_url, is_featured)
      VALUES
        (${ev.name.text}, ${event_date}, ${event_time}, ${location}, ${description},
         ${event_type}, ${cost_type}, ${cost_amount}, null, ${ev.url}, false)
      ON CONFLICT (registration_url) DO UPDATE SET
        name        = EXCLUDED.name,
        event_date  = EXCLUDED.event_date,
        event_time  = EXCLUDED.event_time,
        location    = EXCLUDED.location,
        description = EXCLUDED.description,
        event_type  = EXCLUDED.event_type,
        cost_type   = EXCLUDED.cost_type,
        cost_amount = EXCLUDED.cost_amount
    `
    synced++
  }

  return NextResponse.json({ ok: true, synced, total: eb.events.length })
}

// POST: triggered manually from admin dashboard
export async function POST(req: Request) {
  const authError = await requireAdminApiAuth(req, { mutation: true })
  if (authError) return authError

  return runSync()
}

// GET: called by Vercel Cron every hour
export async function GET(req: Request) {
  if (!process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'CRON_SECRET is not configured' }, { status: 503 })
  }
  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  return runSync()
}
