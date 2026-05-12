import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getSql } from '@/lib/db'
import { isAdminLoggedIn } from '@/lib/admin-auth'

export async function GET() {
  if (!await isAdminLoggedIn()) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  const sql = getSql()
  const rows = await sql`SELECT key, value, updated_at FROM site_content ORDER BY key`
  return NextResponse.json(rows)
}

export async function PATCH(req: NextRequest) {
  if (!await isAdminLoggedIn()) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  const updates = await req.json() as Record<string, string>
  const sql = getSql()

  for (const [key, value] of Object.entries(updates)) {
    await sql`
      INSERT INTO site_content (key, value, updated_at)
      VALUES (${key}, ${value}, NOW())
      ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()`
  }

  // Flush ISR cache for all pages that may consume site_content
  revalidatePath('/')
  revalidatePath('/about')
  revalidatePath('/buy')
  revalidatePath('/sell')
  revalidatePath('/contact')

  return NextResponse.json({ ok: true })
}
