import { NextRequest, NextResponse } from 'next/server'
import { getSql } from '@/lib/db'
import { isAdminLoggedIn } from '@/lib/admin-auth'

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!await isAdminLoggedIn()) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  const { id } = await params
  const sql = getSql()
  const [row] = await sql`SELECT * FROM events WHERE id = ${id}`
  if (!row) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(row)
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!await isAdminLoggedIn()) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  const { id } = await params
  const body = await req.json() as Record<string, unknown>
  const sql = getSql()

  const imagesJson = Array.isArray(body.images) ? JSON.stringify(body.images) : null
  const embedsJson = Array.isArray(body.embeds)  ? JSON.stringify(body.embeds)  : null

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
      images            = CASE WHEN ${imagesJson} IS NOT NULL THEN ${imagesJson}::jsonb ELSE images END,
      embeds            = CASE WHEN ${embedsJson} IS NOT NULL THEN ${embedsJson}::jsonb ELSE embeds END,
      registration_url  = ${(body.registration_url as string) ?? null},
      is_featured       = COALESCE(${body.is_featured as boolean ?? null}, is_featured)
    WHERE id = ${id}
    RETURNING *`
  if (!row) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(row)
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!await isAdminLoggedIn()) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  const { id } = await params
  const sql = getSql()
  await sql`DELETE FROM events WHERE id = ${id}`
  return NextResponse.json({ ok: true })
}
