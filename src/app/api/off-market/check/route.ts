import { NextRequest, NextResponse } from 'next/server'
import { getSql } from '@/lib/db'
import { checkRateLimit } from '@/lib/public-form-security'

export async function POST(req: NextRequest) {
  const limited = checkRateLimit(req, 'off-market-check', 5)
  if (limited) return limited

  const { password } = await req.json() as { password: string }
  if (!password) return NextResponse.json({ ok: false }, { status: 400 })

  let expected = process.env.OFF_MARKET_ACCESS_CODE ?? ''
  try {
    const sql = getSql()
    const [row] = await sql<{ value: string }[]>`
      SELECT value FROM site_content WHERE key = 'off_market_access_code' LIMIT 1`
    if (row?.value) expected = row.value
  } catch { /* fallback to env var */ }

  if (!expected) {
    return NextResponse.json({ ok: false, error: 'Off-market access is not configured' }, { status: 503 })
  }

  if (password === expected) {
    return NextResponse.json({ ok: true })
  }
  return NextResponse.json({ ok: false }, { status: 401 })
}
