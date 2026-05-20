import { NextRequest, NextResponse } from 'next/server'
import { requireAdminApiAuth } from '@/lib/admin-auth'

export async function POST(req: NextRequest) {
  const authError = await requireAdminApiAuth(req, { mutation: true })
  if (authError) return authError

  return NextResponse.json(
    { error: 'Event registration moved to /api/events/[id]/register' },
    { status: 410 },
  )
}
