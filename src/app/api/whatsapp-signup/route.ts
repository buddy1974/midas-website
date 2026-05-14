import { NextRequest, NextResponse } from 'next/server'
import { getSql } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as Record<string, string | null | undefined>
    const sql = getSql()
    const name = [body.firstName, body.lastName].filter(Boolean).join(' ') || null
    await sql`
      INSERT INTO leads (type, name, email, phone, source, data)
      VALUES (
        'whatsapp_signup',
        ${name},
        ${body.email ?? null},
        ${body.phone ?? null},
        ${body.source ?? 'whatsapp_signup'},
        ${sql.json({ userType: body.userType ?? null })}
      )`
  } catch (err) {
    console.error('[whatsapp-signup]', err)
  }
  return NextResponse.json({ success: true })
}
