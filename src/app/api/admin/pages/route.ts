import { NextRequest, NextResponse } from 'next/server'
import { getSql } from '@/lib/db'
import { isAdminLoggedIn } from '@/lib/admin-auth'

interface PagesConfigRow {
  config: unknown
}

export async function GET() {
  const sql = getSql()
  const [row] = await sql<PagesConfigRow[]>`SELECT config FROM pages_config ORDER BY updated_at DESC LIMIT 1`
  return NextResponse.json(row?.config ?? null)
}

export async function POST(req: NextRequest) {
  if (!await isAdminLoggedIn()) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  const { config } = await req.json() as { config: unknown }
  const configJson = JSON.stringify(config)
  const sql = getSql()
  await sql`DELETE FROM pages_config`
  await sql`INSERT INTO pages_config (config) VALUES (${configJson}::jsonb)`
  return NextResponse.json({ ok: true })
}
