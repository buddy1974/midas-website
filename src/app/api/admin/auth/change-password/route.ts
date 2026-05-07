import { NextRequest, NextResponse } from 'next/server'
import { getAdminPassword, getSessionToken } from '@/lib/admin-auth'
import { getSql } from '@/lib/db'

export async function POST(req: NextRequest) {
  const { currentPassword, newPassword } = await req.json() as {
    currentPassword: string
    newPassword: string
  }

  if (!currentPassword || !newPassword) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
  }
  if (newPassword.length < 8) {
    return NextResponse.json({ error: 'New password must be at least 8 characters' }, { status: 400 })
  }

  const active = await getAdminPassword()
  if (currentPassword !== active) {
    return NextResponse.json({ error: 'Current password is incorrect' }, { status: 401 })
  }

  // Save new password to DB (overrides env var going forward)
  const sql = getSql()
  await sql`
    INSERT INTO site_content (key, value, updated_at)
    VALUES ('admin_password', ${newPassword}, NOW())
    ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()`

  // Return new session token so login page can set fresh cookie
  const newToken = Buffer.from(newPassword + 'midas-admin-2026').toString('base64')
  const res = NextResponse.json({ ok: true })
  res.cookies.set('admin_session', newToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
  })
  // Also update the getSessionToken used by auth so current session stays valid
  return res
}
