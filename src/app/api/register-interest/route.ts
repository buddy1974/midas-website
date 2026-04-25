import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  console.log('[register-interest]', new Date().toISOString(), body)
  return NextResponse.json({ success: true })
}
