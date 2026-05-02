import { NextRequest, NextResponse } from 'next/server'
import { intakeRegisterInvestor } from '@/lib/os-intake'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const result = await intakeRegisterInvestor({
    name: body.name,
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    phone: body.phone,
    whatsapp: body.whatsapp,
    userType: body.userType,
    lookingFor: body.lookingFor,
    budget: body.budget,
    preferredAreas: body.preferredAreas,
    contactPreference: body.contactPreference,
    whatsappOptIn: body.whatsappOptIn,
    source: 'website_register',
  })
  return NextResponse.json({
    success: true,
    message: 'Welcome to the Midas investor network',
    _forwarded: result.ok,
  })
}
