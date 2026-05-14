import { NextRequest, NextResponse } from 'next/server'
import { getSql } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as Record<string, string | null | undefined>
    const sql = getSql()
    await sql`
      INSERT INTO leads (type, name, email, phone, source, data)
      VALUES (
        'register_interest',
        ${body.name ?? null},
        ${body.email ?? null},
        ${body.phone ?? null},
        'website_property',
        ${sql.json({
          interest:   body.interest   ?? 'Buyer',
          lotId:      body.lotId      ?? null,
          lotAddress: body.lotAddress ?? null,
        })}
      )`
  } catch (err) {
    console.error('[register-interest]', err)
  }
  return NextResponse.json({ success: true })
}
