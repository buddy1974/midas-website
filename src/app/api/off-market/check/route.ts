import { NextRequest, NextResponse } from 'next/server'
import { getSql } from '@/lib/db'

export async function POST(req: NextRequest) {
  const { password } = await req.json() as { password: string }
  if (!password) return NextResponse.json({ ok: false }, { status: 400 })

  // Check DB-stored password first (set via admin), fall back to env var
  let expected = process.env.ADMIN_PASSWORD ?? ''
  try {
    const sql = getSql()
    const [row] = await sql<{ value: string }[]>`
      SELECT value FROM site_content WHERE key = 'admin_password' LIMIT 1`
    if (row?.value) expected = row.value
  } catch { /* fallback to env var */ }

  if (password === expected) {
    return NextResponse.json({ ok: true })
  }
  return NextResponse.json({ ok: false }, { status: 401 })
}
