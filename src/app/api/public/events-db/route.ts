import { NextResponse } from 'next/server'
import { getSql, type EventRow } from '@/lib/db'

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Cache-Control': 'public, s-maxage=60',
}

export async function GET() {
  try {
    const sql = getSql()
    const rows = await sql<EventRow[]>`
      SELECT * FROM events ORDER BY event_date ASC`
    return NextResponse.json({ events: rows }, { headers: CORS })
  } catch {
    return NextResponse.json({ events: [] }, { headers: CORS })
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS })
}
