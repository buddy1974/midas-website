import { NextRequest, NextResponse } from 'next/server'
import { getSql } from '@/lib/db'
import { isAdminLoggedIn } from '@/lib/admin-auth'

export async function GET() {
  if (!await isAdminLoggedIn()) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  const sql = getSql()
  const rows = await sql`SELECT * FROM properties ORDER BY created_at DESC`
  return NextResponse.json(rows)
}

export async function POST(req: NextRequest) {
  if (!await isAdminLoggedIn()) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  const body = await req.json() as Record<string, unknown>
  const sql = getSql()
  const [row] = await sql`
    INSERT INTO properties (
      title, area, address, address_visible, property_type, bedrooms,
      guide_price, description, features, image_url, video_url,
      auction_date, tenure, is_featured, show_on_website, is_off_market, stage
    ) VALUES (
      ${body.title as string},
      ${body.area as string},
      ${(body.address as string) ?? null},
      ${(body.address_visible as boolean) ?? true},
      ${(body.property_type as string) ?? 'Residential'},
      ${(body.bedrooms as number) ?? null},
      ${(body.guide_price as number) ?? 0},
      ${(body.description as string) ?? null},
      ${(body.features as string) ?? null},
      ${(body.image_url as string) ?? null},
      ${(body.video_url as string) ?? null},
      ${(body.auction_date as string) ?? null},
      ${(body.tenure as string) ?? 'Freehold'},
      ${(body.is_featured as boolean) ?? false},
      ${(body.show_on_website as boolean) ?? true},
      ${(body.is_off_market as boolean) ?? false},
      ${(body.stage as string) ?? 'Sourcing'}
    )
    RETURNING *`
  return NextResponse.json(row, { status: 201 })
}
