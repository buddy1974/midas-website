import { NextRequest, NextResponse } from 'next/server'
import { getSql } from '@/lib/db'
import { isAdminLoggedIn } from '@/lib/admin-auth'

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!await isAdminLoggedIn()) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  const { id } = await params
  const sql = getSql()
  const [row] = await sql`SELECT * FROM properties WHERE id = ${id}`
  if (!row) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(row)
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!await isAdminLoggedIn()) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  const { id } = await params
  const body = await req.json() as Record<string, unknown>
  const sql = getSql()

  const images = Array.isArray(body.images) ? body.images
    : (body.image_url ? [{ url: body.image_url, caption: '' }] : undefined)
  const embeds = Array.isArray(body.embeds) ? body.embeds : undefined

  const [row] = await sql`
    UPDATE properties SET
      title           = COALESCE(${body.title as string ?? null}, title),
      area            = COALESCE(${body.area as string ?? null}, area),
      address         = ${(body.address as string) ?? null},
      address_visible = COALESCE(${body.address_visible as boolean ?? null}, address_visible),
      property_type   = COALESCE(${body.property_type as string ?? null}, property_type),
      bedrooms        = ${(body.bedrooms as number) ?? null},
      guide_price     = COALESCE(${body.guide_price as number ?? null}, guide_price),
      description     = ${(body.description as string) ?? null},
      features        = ${(body.features as string) ?? null},
      image_url       = ${(body.image_url as string) ?? null},
      video_url       = ${(body.video_url as string) ?? null},
      images          = COALESCE(${images !== undefined ? sql.json(images) : null}::jsonb, images),
      embeds          = COALESCE(${embeds !== undefined ? sql.json(embeds) : null}::jsonb, embeds),
      auction_date    = ${(body.auction_date as string) ?? null},
      tenure          = COALESCE(${body.tenure as string ?? null}, tenure),
      is_featured     = COALESCE(${body.is_featured as boolean ?? null}, is_featured),
      show_on_website = COALESCE(${body.show_on_website as boolean ?? null}, show_on_website),
      is_off_market   = COALESCE(${body.is_off_market as boolean ?? null}, is_off_market),
      stage           = COALESCE(${body.stage as string ?? null}, stage),
      updated_at      = NOW()
    WHERE id = ${id}
    RETURNING *`
  if (!row) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(row)
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!await isAdminLoggedIn()) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  const { id } = await params
  const sql = getSql()
  await sql`DELETE FROM properties WHERE id = ${id}`
  return NextResponse.json({ ok: true })
}
