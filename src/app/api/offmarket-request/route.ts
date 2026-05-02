import { NextRequest, NextResponse } from 'next/server'
import { intakeOffmarketRequest } from '@/lib/os-intake'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const result = await intakeOffmarketRequest({
    name: body.name,
    email: body.email,
  })
  return NextResponse.json({ success: true, _forwarded: result.ok })
}
