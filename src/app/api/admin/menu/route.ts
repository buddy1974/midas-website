import { NextRequest, NextResponse } from 'next/server'
import { getSql } from '@/lib/db'
import { isAdminLoggedIn } from '@/lib/admin-auth'

interface MenuConfigRow {
  config: unknown
}

export async function GET() {
  const sql = getSql()
  const [row] = await sql<MenuConfigRow[]>`SELECT config FROM menu_config ORDER BY updated_at DESC LIMIT 1`
  return NextResponse.json(row?.config ?? null)
}

export async function POST(req: NextRequest) {
  if (!await isAdminLoggedIn()) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  const { config } = await req.json() as { config: unknown }
  const configJson = JSON.stringify(config)
  const sql = getSql()
  await sql`DELETE FROM menu_config`
  await sql`INSERT INTO menu_config (config) VALUES (${configJson}::jsonb)`
  return NextResponse.json({ ok: true })
}
