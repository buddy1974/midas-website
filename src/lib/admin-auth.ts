import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export function getSessionToken(): string {
  const password = process.env.ADMIN_PASSWORD ?? ''
  return Buffer.from(password + 'midas-admin-2026').toString('base64')
}

export async function requireAdminAuth(): Promise<void> {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')
  if (session?.value !== getSessionToken()) {
    redirect('/admin/login')
  }
}

export async function isAdminLoggedIn(): Promise<boolean> {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')
  return session?.value === getSessionToken()
}
