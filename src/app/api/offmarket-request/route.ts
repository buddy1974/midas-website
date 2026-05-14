import { NextRequest, NextResponse } from 'next/server'
import { getSql } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as Record<string, string | null | undefined>
    const sql = getSql()
    await sql`
      INSERT INTO leads (type, name, email, phone, source, data)
      VALUES (
        'offmarket_request',
        ${body.name ?? null},
        ${body.email ?? null},
        ${null},
        'website_offmarket',
        ${sql.json({})}
      )`
  } catch (err) {
    console.error('[offmarket-request]', err)
  }
  return NextResponse.json({ success: true })
}
