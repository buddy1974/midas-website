import { NextRequest, NextResponse } from 'next/server'

// Admin routes that must remain public (login + auth endpoint)
const PUBLIC_ADMIN = ['/admin/login', '/api/admin/auth']

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Allow public admin routes through
  if (PUBLIC_ADMIN.some(p => pathname.startsWith(p))) {
    return NextResponse.next()
  }

  // Gate all other /admin/* and /api/admin/* routes
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    const session = req.cookies.get('admin_session')?.value

    if (!session) {
      // API routes → 401 JSON
      if (pathname.startsWith('/api/')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
      // Page routes → redirect to login
      const loginUrl = new URL('/admin/login', req.url)
      loginUrl.searchParams.set('next', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
