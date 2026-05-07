import { NextRequest, NextResponse } from 'next/server'
import { getAdminPassword, getSessionToken } from '@/lib/admin-auth'

export async function POST(req: NextRequest) {
  const { password } = await req.json() as { password: string }

  if (!password) {
    return NextResponse.json({ error: 'Password required' }, { status: 400 })
  }

  const activePassword = await getAdminPassword()
  if (password !== activePassword) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  }

  const token = await getSessionToken()
  const res = NextResponse.json({ ok: true })
  res.cookies.set('admin_session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
  })
  return res
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true })
  res.cookies.delete('admin_session')
  return res
}
