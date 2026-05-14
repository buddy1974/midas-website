import { NextRequest, NextResponse } from 'next/server'
import { getSql } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as Record<string, string | null | undefined>
    const sql = getSql()
    await sql`
      INSERT INTO leads (type, name, email, phone, source, data)
      VALUES (
        'finance_enquiry',
        ${body.name ?? null},
        ${body.email ?? null},
        ${body.phone ?? null},
        ${body.source ?? 'website_finance'},
        ${sql.json({
          loanAmount:      body.loanAmount      ?? null,
          propertyValue:   body.propertyValue   ?? null,
          propertyAddress: body.propertyAddress ?? body.address ?? null,
          purpose:         body.purpose         ?? null,
          term:            body.term            ?? null,
          propertyType:    body.propertyType    ?? null,
          situation:       body.situation       ?? null,
          notes:           body.notes           ?? null,
        })}
      )`
  } catch (err) {
    console.error('[finance-enquiry]', err)
  }
  return NextResponse.json({ success: true })
}
