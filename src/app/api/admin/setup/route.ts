import { NextResponse } from 'next/server'
import { readFileSync } from 'fs'
import { join } from 'path'
import { getSql } from '@/lib/db'
import { requireAdminApiAuth } from '@/lib/admin-auth'

export async function POST(req: Request) {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ ok: false, error: 'Setup API is disabled in production' }, { status: 403 })
  }

  const authError = await requireAdminApiAuth(req, { mutation: true })
  if (authError) return authError

  try {
    const schemaPath = join(process.cwd(), 'src', 'lib', 'schema.sql')
    const schema = readFileSync(schemaPath, 'utf-8')
    const sql = getSql()
    await sql.unsafe(schema)
    return NextResponse.json({ ok: true, message: 'Schema applied successfully' })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ ok: false, error: message }, { status: 500 })
  }
}
