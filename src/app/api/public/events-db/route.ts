import { NextResponse } from 'next/server'
import { getSql, type EventRow } from '@/lib/db'

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Cache-Control': 'public, s-maxage=60',
}

/** Parse a single time token: "6:30pm", "18:30", "6pm", "17:00" → "17:00" */
function parseSingleTime(t: string): string {
  const m = t.trim().match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)?$/i)
  if (!m) return '00:00'
  let h = parseInt(m[1])
  const min = m[2] ? parseInt(m[2]) : 0
  const period = m[3]?.toLowerCase()
  if (period === 'pm' && h !== 12) h += 12
  if (period === 'am' && h === 12) h = 0
  return `${h.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`
}

/** Handles "17:00 - 22:00", "6:30pm – 9pm", "18:30 to 21:00", plain "17:00" */
function parseTimeRange(t: string): { start: string; end: string | null } {
  // Split on dash, en-dash, or "to"
  const parts = t.split(/\s*(?:[-–]|\bto\b)\s*/i).map(s => s.trim()).filter(Boolean)
  return {
    start: parseSingleTime(parts[0] ?? ''),
    end:   parts[1] ? parseSingleTime(parts[1]) : null,
  }
}

function toOsEvent(row: EventRow) {
  // Combine event_date (TEXT e.g. "2026-06-15") + event_time (e.g. "17:00 - 22:00")
  const { start, end } = row.event_time ? parseTimeRange(row.event_time) : { start: '00:00', end: null }
  const eventDate = `${row.event_date}T${start}`
  const endTime   = end ? `${row.event_date}T${end}` : null

  // Resolve cover image: prefer first entry in images array, fall back to image_url
  const imagesArray = Array.isArray(row.images) ? row.images : []
  const coverImage  = imagesArray[0]?.url ?? row.image_url ?? null

  const recurrenceDates = Array.isArray(row.recurrence_dates) ? row.recurrence_dates : []

  return {
    id:               row.id,
    title:            row.name,
    description:      row.description,
    eventType:        row.event_type,
    eventDate,
    endTime,
    location:         row.location,
    pricePence:       row.cost_type === 'free' ? 0 : (row.cost_amount ?? 0) * 100,
    maxCapacity:      null,
    ticketLink:       row.registration_url,
    registrationType: row.registration_url ? 'external' : 'form',
    formFields:       'full',
    showInvestorOption: false,
    imageUrl:         coverImage,
    images:           imagesArray,
    isFeatured:       row.is_featured,
    isRecurring:      row.is_recurring ?? false,
    recurrenceDates,
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
