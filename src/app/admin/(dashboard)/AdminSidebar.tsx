'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const NAV = [
  { href: '/admin',            label: 'Dashboard',   icon: '⬡' },
  { href: '/admin/builder',    label: 'Page Builder', icon: '🧱' },
  { href: '/admin/properties', label: 'Properties',  icon: '🏠' },
  { href: '/admin/blog',       label: 'Blog Posts',  icon: '📝' },
  { href: '/admin/events',     label: 'Events',      icon: '📅' },
  { href: '/admin/content',    label: 'Site Content', icon: '✏️' },
  { href: '/admin/users',      label: 'Users',       icon: '👥' },
  { href: '/admin/settings',   label: 'Settings',    icon: '⚙️' },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' })
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <aside style={{
      width: 200,
      background: '#0d0d0d',
      borderRight: '1px solid #1a1a1a',
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 0',
      flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{ padding: '0 20px 24px', borderBottom: '1px solid #1a1a1a' }}>
        <p style={{ color: '#C9A84C', fontSize: 16, letterSpacing: 4, textTransform: 'uppercase', margin: 0 }}>MIDAS</p>
        <p style={{ color: '#444', fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', margin: '2px 0 0' }}>WEBSITE ADMIN</p>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '16px 0' }}>
        {NAV.map(({ href, label, icon }) => {
          const active = pathname === href || (href !== '/admin' && pathname.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '9px 20px',
                color: active ? '#C9A84C' : '#888',
                textDecoration: 'none',
                fontSize: 13,
                fontWeight: active ? 600 : 400,
                background: active ? 'rgba(201,168,76,0.08)' : 'transparent',
                borderLeft: active ? '2px solid #C9A84C' : '2px solid transparent',
                transition: 'all 0.15s',
              }}
            >
              <span style={{ fontSize: 14 }}>{icon}</span>
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div style={{ padding: '16px 20px', borderTop: '1px solid #1a1a1a' }}>
        <a
          href="https://www.midaspropertyauctions.co.uk"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'block', color: '#444', fontSize: 11, textDecoration: 'none', marginBottom: 10 }}
        >
          View website ↗
        </a>
        <button
          onClick={handleLogout}
          style={{ background: 'none', border: '1px solid #2a2a2a', color: '#666', borderRadius: 4, padding: '6px 12px', fontSize: 11, cursor: 'pointer', width: '100%' }}
          >
          Sign out
        </button>
      </div>
    </aside>
  )
}
