import { NextResponse } from 'next/server'
import { readFileSync } from 'fs'
import { join } from 'path'
import { getSql } from '@/lib/db'

export async function POST() {
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
