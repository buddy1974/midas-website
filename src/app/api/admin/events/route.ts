import { NextRequest, NextResponse } from 'next/server'
import { getSql } from '@/lib/db'
import { isAdminLoggedIn } from '@/lib/admin-auth'

export async function GET() {
  if (!await isAdminLoggedIn()) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  const sql = getSql()
  const rows = await sql`SELECT * FROM events ORDER BY event_date ASC`
  return NextResponse.json(rows)
}

export async function POST(req: NextRequest) {
  if (!await isAdminLoggedIn()) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  const body = await req.json() as Record<string, unknown>
  const sql = getSql()
  const [row] = await sql`
    INSERT INTO events (name, event_date, event_time, location, description, event_type, cost_type, cost_amount, image_url, registration_url, is_featured)
    VALUES (
      ${body.name as string},
      ${body.event_date as string},
      ${(body.event_time as string) ?? null},
      ${(body.location as string) ?? null},
      ${(body.description as string) ?? null},
      ${(body.event_type as string) ?? 'webinar'},
      ${(body.cost_type as string) ?? 'free'},
      ${(body.cost_amount as number) ?? 0},
      ${(body.image_url as string) ?? null},
      ${(body.registration_url as string) ?? null},
      ${(body.is_featured as boolean) ?? false}
    )
    RETURNING *`
  return NextResponse.json(row, { status: 201 })
}
