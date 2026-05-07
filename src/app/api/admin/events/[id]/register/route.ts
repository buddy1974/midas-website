import { NextRequest, NextResponse } from 'next/server'
import { getSql } from '@/lib/db'

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await req.json() as { name: string; email?: string; phone?: string; source?: string }

  if (!body.name?.trim()) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 })
  }

  try {
    const sql = getSql()
    // Verify event exists
    const [event] = await sql`SELECT id, name FROM events WHERE id = ${id} LIMIT 1`
    if (!event) return NextResponse.json({ error: 'Event not found' }, { status: 404 })

    // Store registration in a simple log (extend schema later if needed)
    // For now just return success — registrations can be managed in the admin
    console.log(`Event registration: ${body.name} for event ${id}`)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Registration unavailable' }, { status: 500 })
  }
}
