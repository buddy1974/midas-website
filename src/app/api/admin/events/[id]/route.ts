import { NextRequest, NextResponse } from 'next/server'
import { getSql } from '@/lib/db'
import { requireAdminApiAuth } from '@/lib/admin-auth'

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireAdminApiAuth()
  if (authError) return authError

  const { id } = await params
  const sql = getSql()
  const [row] = await sql`SELECT * FROM events WHERE id = ${id}`
  if (!row) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(row)
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireAdminApiAuth(req, { mutation: true })
  if (authError) return authError

  const { id } = await params

  let body: Record<string, unknown>
  try {
    body = await req.json() as Record<string, unknown>
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const sql = getSql()

  // Use sql.json() for JSONB columns — same pattern as POST route.
  // JSON.stringify + ::jsonb inline cast is incompatible with postgres v3 prepared statements.
  const images = Array.isArray(body.images) ? body.images : null
  const embeds = Array.isArray(body.embeds)  ? body.embeds  : null
  const isRecurring = (body.is_recurring as boolean) ?? false
  const recurrenceDates = isRecurring && Array.isArray(body.recurrence_dates) ? body.recurrence_dates : []

  try {
    const [row] = await sql`
      UPDATE events SET
        name              = COALESCE(${body.name as string ?? null}, name),
        event_date        = COALESCE(${body.event_date as string ?? null}, event_date),
        event_time        = ${(body.event_time as string) ?? null},
        location          = ${(body.location as string) ?? null},
        description       = ${(body.description as string) ?? null},
        event_type        = COALESCE(${body.event_type as string ?? null}, event_type),
        cost_type         = COALESCE(${body.cost_type as string ?? null}, cost_type),
        cost_amount       = COALESCE(${body.cost_amount as number ?? null}, cost_amount),
        image_url         = ${(body.image_url as string) ?? null},
        images            = ${images !== null ? sql.json(images) : sql`images`},
        embeds            = ${embeds !== null ? sql.json(embeds) : sql`embeds`},
        registration_url  = ${(body.registration_url as string) ?? null},
        is_featured       = COALESCE(${body.is_featured as boolean ?? null}, is_featured),
        is_recurring      = ${isRecurring},
        recurrence_dates  = ${sql.json(recurrenceDates)}
      WHERE id = ${id}
      RETURNING *`
    if (!row) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(row)
  } catch (err) {
    console.error('[events PATCH] DB error:', err)
    return NextResponse.json({ error: 'Save failed. Please try again.' }, { status: 500 })
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireAdminApiAuth(_, { mutation: true })
  if (authError) return authError

  const { id } = await params
  const sql = getSql()
  await sql`DELETE FROM events WHERE id = ${id}`
  return NextResponse.json({ ok: true })
}
