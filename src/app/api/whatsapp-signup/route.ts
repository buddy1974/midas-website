import { NextRequest, NextResponse } from 'next/server'
import { intakeRegisterInvestor } from '@/lib/os-intake'

// This route is called by the homepage NewsletterForm (userType-based signup).
// It routes to the same OS endpoint as register-investor since both create
// a contact + newsletter subscriber with investor profile data.
export async function POST(req: NextRequest) {
  const body = await req.json()
  const result = await intakeRegisterInvestor({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    phone: body.phone,
    userType: body.userType,
    source: body.source ?? 'whatsapp_signup',
  })
  return NextResponse.json({ success: true, _forwarded: result.ok })
}
