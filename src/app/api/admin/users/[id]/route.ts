import { NextResponse } from 'next/server'
import { getSql } from '@/lib/db'
import { requireAdminApiAuth } from '@/lib/admin-auth'

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password + (process.env.PASSWORD_SALT || 'midas2026salt'))
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('')
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireAdminApiAuth(req, { mutation: true })
  if (authError) return authError

  const { id } = await params
  const body = await req.json() as { password?: string; role?: string }
  try {
    const sql = getSql()
    if (body.password) {
      const hash = await hashPassword(body.password)
      await sql`UPDATE admin_users SET password_hash = ${hash} WHERE id = ${Number(id)}`
    }
    if (body.role) {
      await sql`UPDATE admin_users SET role = ${body.role} WHERE id = ${Number(id)}`
    }
    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireAdminApiAuth(req, { mutation: true })
  if (authError) return authError

  const { id } = await params
  try {
    const sql = getSql()
    await sql`DELETE FROM admin_users WHERE id = ${Number(id)}`
    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
