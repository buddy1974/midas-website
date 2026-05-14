import { NextResponse } from 'next/server'
import { getSql, type EventRow } from '@/lib/db'

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Cache-Control': 'public, s-maxage=60',
}

/** Convert "6:30pm", "6:30 PM", "18:30", "6pm" → "18:30" 24-hr */
function parseTime(t: string): string {
  const m = t.trim().match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)?$/i)
  if (!m) return '00:00'
  let h = parseInt(m[1])
  const min = m[2] ? parseInt(m[2]) : 0
  const period = m[3]?.toLowerCase()
  if (period === 'pm' && h !== 12) h += 12
  if (period === 'am' && h === 12) h = 0
  return `${h.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`
}

function toOsEvent(row: EventRow) {
  // Combine event_date (TEXT e.g. "2026-06-15") + event_time (e.g. "6:30pm" or "18:30")
  const time = row.event_time ? parseTime(row.event_time) : '00:00'
  const eventDate = `${row.event_date}T${time}`

  return {
    id:               row.id,
    title:            row.name,
    description:      row.description,
    eventType:        row.event_type,
    eventDate,
    endTime:          null,
    location:         row.location,
    // admin stores cost_amount in £, page expects pence
    pricePence:       row.cost_type === 'free' ? 0 : (row.cost_amount ?? 0) * 100,
    maxCapacity:      null,
    ticketLink:       row.registration_url,
    registrationType: row.registration_url ? 'external' : 'form',
    formFields:       'full',
    showInvestorOption: false,
    imageUrl:         row.image_url,
    isFeatured:       row.is_featured,
  }
}

export async function GET() {
  try {
    const sql = getSql()
    const rows = await sql<EventRow[]>`
      SELECT * FROM events ORDER BY event_date ASC, event_time ASC`
    return NextResponse.json({ events: rows.map(toOsEvent) }, { headers: CORS })
  } catch (err) {
    console.error('[events-db]', err)
    return NextResponse.json({ events: [] }, { headers: CORS })
  }
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS })
}
