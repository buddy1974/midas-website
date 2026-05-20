import { NextResponse } from 'next/server'
import { getSql } from '@/lib/db'
import { requireAdminApiAuth } from '@/lib/admin-auth'

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password + (process.env.PASSWORD_SALT || 'midas2026salt'))
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('')
}

async function ensureTable(sql: ReturnType<typeof getSql>) {
  await sql`
    CREATE TABLE IF NOT EXISTS admin_users (
      id            SERIAL PRIMARY KEY,
      username      TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role          TEXT NOT NULL DEFAULT 'editor',
      created_at    TIMESTAMPTZ DEFAULT NOW()
    )
  `
}

export async function GET() {
  const authError = await requireAdminApiAuth()
  if (authError) return authError

  try {
    const sql = getSql()
    await ensureTable(sql)
    const rows = await sql<{ id: number; username: string; role: string; created_at: string }[]>`
      SELECT id, username, role, created_at FROM admin_users ORDER BY created_at ASC
    `
    return NextResponse.json(rows)
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const authError = await requireAdminApiAuth(req, { mutation: true })
  if (authError) return authError

  try {
    const { username, password, role } = await req.json() as { username: string; password: string; role?: string }
    if (!username || !password) return NextResponse.json({ error: 'username and password required' }, { status: 400 })
    const sql = getSql()
    await ensureTable(sql)
    const hash = await hashPassword(password)
    const rows = await sql<{ id: number }[]>`
      INSERT INTO admin_users (username, password_hash, role)
      VALUES (${username.trim().toLowerCase()}, ${hash}, ${role || 'editor'})
      RETURNING id
    `
    return NextResponse.json({ id: rows[0].id, username, role: role || 'editor' }, { status: 201 })
  } catch (err: unknown) {
    const msg = String(err)
    if (msg.includes('unique')) return NextResponse.json({ error: 'Username already exists' }, { status: 409 })
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
