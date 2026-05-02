import { NextRequest, NextResponse } from 'next/server'
import { intakeFinanceEnquiry } from '@/lib/os-intake'

export async function POST(req: NextRequest) {
  const body = await req.json()
  // This route handles both /finance page enquiries and /valuation page requests.
  // The source field distinguishes them in the OS.
  const result = await intakeFinanceEnquiry({
    name: body.name,
    email: body.email,
    phone: body.phone,
    loanAmount: body.loanAmount,
    propertyValue: body.propertyValue,
    propertyAddress: body.propertyAddress ?? body.address,
    purpose: body.purpose,
    term: body.term,
    // Valuation-specific fields
    address: body.address,
    propertyType: body.propertyType,
    situation: body.situation,
    notes: body.notes,
    source: body.source ?? 'website_finance',
  })
  return NextResponse.json({ success: true, _forwarded: result.ok })
}
