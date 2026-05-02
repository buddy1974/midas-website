import { NextRequest, NextResponse } from 'next/server'
import { intakeRegisterInterest } from '@/lib/os-intake'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const result = await intakeRegisterInterest({
    name: body.name,
    email: body.email,
    phone: body.phone,
    interest: body.interest,
    lotId: body.lotId,
    lotAddress: body.lotAddress,
  })
  // Always return success to the browser — failures are logged server-side
  return NextResponse.json({ success: true, _forwarded: result.ok })
}
