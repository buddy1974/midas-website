import { NextRequest, NextResponse } from 'next/server'
import { getSql } from '@/lib/db'
import { requireAdminApiAuth } from '@/lib/admin-auth'

export async function GET() {
  const authError = await requireAdminApiAuth()
  if (authError) return authError

  const sql = getSql()
  const rows = await sql`SELECT * FROM events ORDER BY event_date ASC`
  return NextResponse.json(rows)
}

export async function POST(req: NextRequest) {
  const authError = await requireAdminApiAuth(req, { mutation: true })
  if (authError) return authError

  const body = await req.json() as Record<string, unknown>
  const sql = getSql()

  const images = Array.isArray(body.images) ? body.images
    : (body.image_url ? [{ url: body.image_url, caption: '' }] : [])
  const embeds = Array.isArray(body.embeds) ? body.embeds : []

  const isRecurring = (body.is_recurring as boolean) ?? false
  const recurrenceDates = isRecurring && Array.isArray(body.recurrence_dates) ? body.recurrence_dates : []

  const [row] = await sql`
    INSERT INTO events (
      name, event_date, event_time, location, description,
      event_type, cost_type, cost_amount, image_url,
      images, embeds, registration_url, is_featured,
      is_recurring, recurrence_dates
    ) VALUES (
      ${body.name as string},
      ${body.event_date as string},
      ${(body.event_time as string) ?? null},
      ${(body.location as string) ?? null},
      ${(body.description as string) ?? null},
      ${(body.event_type as string) ?? 'webinar'},
      ${(body.cost_type as string) ?? 'free'},
      ${(body.cost_amount as number) ?? 0},
      ${(body.image_url as string) ?? null},
      ${sql.json(images)},
      ${sql.json(embeds)},
      ${(body.registration_url as string) ?? null},
      ${(body.is_featured as boolean) ?? false},
      ${isRecurring},
      ${sql.json(recurrenceDates)}
    )
    RETURNING *`
  return NextResponse.json(row, { status: 201 })
}
