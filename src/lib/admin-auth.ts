import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextResponse } from 'next/server'
import { getSql } from '@/lib/db'
import { hasSafeMutationOrigin, verifyAdminSessionToken } from '@/lib/admin-session'

// ── Active password: DB overrides env var ─────────────────────────────────────

export async function getAdminPassword(): Promise<string> {
  try {
    const sql = getSql()
    const [row] = await sql<{ value: string }[]>`
      SELECT value FROM site_content WHERE key = 'admin_password' LIMIT 1`
    if (row?.value) return row.value
  } catch { /* DB not ready */ }
  const envPassword = process.env.ADMIN_PASSWORD
  if (!envPassword) throw new Error('ADMIN_PASSWORD environment variable is not set')
  return envPassword
}

// ── Auth checks ───────────────────────────────────────────────────────────────

export async function requireAdminAuth(): Promise<void> {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')
  if (!await verifyAdminSessionToken(session?.value)) {
    redirect('/admin/login')
  }
}

export async function isAdminLoggedIn(): Promise<boolean> {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')
  return verifyAdminSessionToken(session?.value)
}

export async function requireAdminApiAuth(
  req?: Request,
  options: { mutation?: boolean } = {},
): Promise<NextResponse | null> {
  if (!await isAdminLoggedIn()) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  if (options.mutation && req && !hasSafeMutationOrigin(req)) {
    return NextResponse.json({ error: 'Invalid request origin' }, { status: 403 })
  }

  return null
}
