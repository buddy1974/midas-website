import { NextRequest, NextResponse } from 'next/server'
import { getSql } from '@/lib/db'

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await req.json() as {
    name: string
    email?: string
    phone?: string
    source?: string
    registerAsInvestor?: boolean
  }

  if (!body.name?.trim()) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 })
  }

  try {
    const sql = getSql()

    // Verify event exists and get its name
    const [event] = await sql<{ id: string; name: string }[]>`
      SELECT id, name FROM events WHERE id = ${id} LIMIT 1`
    if (!event) return NextResponse.json({ error: 'Event not found' }, { status: 404 })

    // Store registration in leads table
    await sql`
      INSERT INTO leads (type, name, email, phone, source, data)
      VALUES (
        'event_registration',
        ${body.name.trim()},
        ${body.email?.trim() ?? null},
        ${body.phone?.trim() ?? null},
        ${body.source ?? 'website_events_page'},
        ${sql.json({
          eventId:           id,
          eventName:         event.name,
          registerAsInvestor: body.registerAsInvestor ?? false,
        })}
      )`

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[event-register]', err)
    return NextResponse.json({ error: 'Registration unavailable' }, { status: 500 })
  }
}
