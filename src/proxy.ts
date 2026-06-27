import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminSessionToken } from '@/lib/admin-session'

const PUBLIC_ADMIN = ['/admin/login']
const PUBLIC_ADMIN_API = ['/api/admin/auth']

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  // 1. Maintenance mode — public site only. /admin and /api stay reachable so
  //    the site can still be managed while maintenance is on.
  if (process.env.MAINTENANCE_MODE === 'true') {
    const exempt =
      pathname.startsWith('/admin') ||
      pathname.startsWith('/api') ||
      pathname.startsWith('/_next') ||
      pathname === '/maintenance' ||
      pathname === '/favicon.ico'

    if (!exempt) {
      const url = req.nextUrl.clone()
      url.pathname = '/maintenance'
      return NextResponse.rewrite(url)
    }
  }

  // 2. Admin authentication (unchanged behaviour).
  if (PUBLIC_ADMIN.includes(pathname) || PUBLIC_ADMIN_API.includes(pathname)) {
    return NextResponse.next()
  }

  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    const session = req.cookies.get('admin_session')?.value

    if (!await verifyAdminSessionToken(session)) {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }

      const loginUrl = new URL('/admin/login', req.url)
      loginUrl.searchParams.set('next', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
