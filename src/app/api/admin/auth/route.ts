import { NextRequest, NextResponse } from 'next/server'
import { getAdminPassword, getSessionToken } from '@/lib/admin-auth'

// ── In-memory rate limiter (5 attempts / 15 min per IP) ───────────────────────
const attempts = new Map<string, { count: number; resetAt: number }>()
const WINDOW_MS = 15 * 60 * 1000   // 15 minutes
const MAX_ATTEMPTS = 5

function getIp(req: NextRequest): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
}

function checkRateLimit(ip: string): { limited: boolean; retryAfter: number } {
  const now = Date.now()
  const entry = attempts.get(ip)

  if (!entry || now > entry.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return { limited: false, retryAfter: 0 }
  }

  if (entry.count >= MAX_ATTEMPTS) {
    return { limited: true, retryAfter: Math.ceil((entry.resetAt - now) / 1000) }
  }

  entry.count++
  return { limited: false, retryAfter: 0 }
}

function clearRateLimit(ip: string) {
  attempts.delete(ip)
}

// ── Handlers ──────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const ip = getIp(req)
  const { limited, retryAfter } = checkRateLimit(ip)

  if (limited) {
    return NextResponse.json(
      { error: `Too many attempts. Try again in ${retryAfter}s.` },
      { status: 429, headers: { 'Retry-After': String(retryAfter) } },
    )
  }

  const { password } = await req.json() as { password: string }

  if (!password) {
    return NextResponse.json({ error: 'Password required' }, { status: 400 })
  }

  const activePassword = await getAdminPassword()
  if (password !== activePassword) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  }

  // Successful login — clear the counter so the admin can log out and back in
  clearRateLimit(ip)

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
