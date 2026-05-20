import { NextRequest, NextResponse } from 'next/server'
import { getSql } from '@/lib/db'
import { requireAdminApiAuth } from '@/lib/admin-auth'

interface PagesConfigRow {
  config: unknown
}

export async function GET() {
  const authError = await requireAdminApiAuth()
  if (authError) return authError

  const sql = getSql()
  const [row] = await sql<PagesConfigRow[]>`SELECT config FROM pages_config ORDER BY updated_at DESC LIMIT 1`
  return NextResponse.json(row?.config ?? null)
}

export async function POST(req: NextRequest) {
  const authError = await requireAdminApiAuth(req, { mutation: true })
  if (authError) return authError

  const { config } = await req.json() as { config: unknown }
  const sql = getSql()
  await sql`DELETE FROM pages_config`
  await sql`INSERT INTO pages_config (config) VALUES (${sql.json(config as Parameters<typeof sql.json>[0])})`
  return NextResponse.json({ ok: true })
}
