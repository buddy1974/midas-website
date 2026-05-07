import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getSql } from '@/lib/db'

// ── Active password: DB overrides env var ─────────────────────────────────────

export async function getAdminPassword(): Promise<string> {
  try {
    const sql = getSql()
    const [row] = await sql<{ value: string }[]>`
      SELECT value FROM site_content WHERE key = 'admin_password' LIMIT 1`
    if (row?.value) return row.value
  } catch { /* DB not ready */ }
  return process.env.ADMIN_PASSWORD ?? 'MidasAdmin2026!'
}

export async function getSessionToken(): Promise<string> {
  const password = await getAdminPassword()
  return Buffer.from(password + 'midas-admin-2026').toString('base64')
}

// ── Auth checks ───────────────────────────────────────────────────────────────

export async function requireAdminAuth(): Promise<void> {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')
  const token = await getSessionToken()
  if (session?.value !== token) {
    redirect('/admin/login')
  }
}

export async function isAdminLoggedIn(): Promise<boolean> {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')
  const token = await getSessionToken()
  return session?.value === token
}
