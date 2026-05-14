import { NextRequest, NextResponse } from 'next/server'
import { getSql } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as Record<string, string | string[] | boolean | null | undefined>
    const sql = getSql()
    const name = [body.firstName, body.lastName].filter(Boolean).join(' ') || (body.name as string) || null
    await sql`
      INSERT INTO leads (type, name, email, phone, source, data)
      VALUES (
        'register_investor',
        ${name},
        ${(body.email as string) ?? null},
        ${(body.phone as string) ?? null},
        ${(body.source as string) ?? 'website_register'},
        ${sql.json({
          userType:          (body.userType as string)          ?? null,
          lookingFor:        (body.lookingFor as string[])      ?? [],
          budget:            (body.budget as string)            ?? null,
          preferredAreas:    (body.preferredAreas as string[])  ?? [],
          contactPreference: (body.contactPreference as string[]) ?? [],
          whatsappOptIn:     (body.whatsappOptIn as boolean)    ?? false,
          whatsapp:          (body.whatsapp as string)          ?? null,
        })}
      )`
  } catch (err) {
    console.error('[register-investor]', err)
  }
  return NextResponse.json({ success: true, message: 'Welcome to the Midas investor network' })
}
