import { NextResponse } from 'next/server'
import { getSql, type EventRow } from '@/lib/db'

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Cache-Control': 'public, s-maxage=60',
}

function toOsEvent(row: EventRow) {
  // Combine event_date (TEXT e.g. "2026-06-15") + event_time (e.g. "18:30") into ISO string
  const eventDate = row.event_time
    ? `${row.event_date}T${row.event_time.includes(':') ? row.event_time.padStart(5, '0') : '00:00'}`
    : `${row.event_date}T00:00`

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
