import { NextResponse } from 'next/server'
import { getSql, type PropertyRow } from '@/lib/db'

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Cache-Control': 'public, s-maxage=60',
}

function toPublicProperty(row: PropertyRow) {
  const displayAddress = row.address_visible && row.address
    ? `${row.address}, ${row.area}`
    : row.area

  return {
    id:            row.id,
    title:         row.title,
    address:       displayAddress,
    area:          row.area,
    guidePrice:    row.guide_price,
    bedrooms:      row.bedrooms,
    propertyType:  row.property_type,
    tenure:        row.tenure,
    pipelineStage: row.stage,
    coverImage:    row.image_url,
    videoUrl:      row.video_url,
    description:   row.description,
    features:      row.features,
    auctionDate:   row.auction_date,
    isOffMarket:   row.is_off_market,
    isFeatured:    row.is_featured,
    createdAt:     row.created_at,
  }
}

export async function GET() {
  try {
    const sql = getSql()
    const rows = await sql<PropertyRow[]>`
      SELECT * FROM properties
      WHERE show_on_website = true
      ORDER BY is_featured DESC, created_at DESC`
    return NextResponse.json({ properties: rows.map(toPublicProperty) }, { headers: CORS })
  } catch (err) {
    console.error('[public/properties]', err)
    return NextResponse.json({ properties: [] }, { headers: CORS })
  }
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS })
}
