import { getSql } from '@/lib/db'
import Link from 'next/link'

async function getStats() {
  try {
    const sql = getSql()
    const [props, posts, evts] = await Promise.all([
      sql`SELECT COUNT(*) AS count FROM properties`,
      sql`SELECT COUNT(*) AS count FROM blog_posts`,
      sql`SELECT COUNT(*) AS count FROM events`,
    ])
    return {
      properties: Number((props[0] as { count: string }).count),
      posts: Number((posts[0] as { count: string }).count),
      events: Number((evts[0] as { count: string }).count),
    }
  } catch {
    return { properties: 0, posts: 0, events: 0 }
  }
}

export default async function AdminDashboard() {
  const stats = await getStats()

  const cards = [
    { label: 'Properties', count: stats.properties, href: '/admin/properties', icon: '🏠', action: 'Add Property', actionHref: '/admin/properties/new' },
    { label: 'Blog Posts', count: stats.posts, href: '/admin/blog', icon: '📝', action: 'Add Post', actionHref: '/admin/blog/new' },
    { label: 'Events', count: stats.events, href: '/admin/events', icon: '📅', action: 'Add Event', actionHref: '/admin/events/new' },
  ]

  return (
    <div>
      <h1 style={{ color: '#C9A84C', fontSize: 20, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>
        Dashboard
      </h1>
      <p style={{ color: '#555', fontSize: 13, marginBottom: 32 }}>Midas Property Auctions — website content manager</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 40 }}>
        {cards.map(card => (
          <div key={card.label} style={{ background: '#111', border: '1px solid #1a1a1a', borderRadius: 8, padding: '24px 20px' }}>
            <p style={{ color: '#555', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', margin: '0 0 8px' }}>{card.icon} {card.label}</p>
            <p style={{ color: '#C9A84C', fontSize: 36, fontWeight: 700, margin: '0 0 16px' }}>{card.count}</p>
            <div style={{ display: 'flex', gap: 8 }}>
              <Link href={card.href} style={{ color: '#888', fontSize: 12, textDecoration: 'none' }}>View all →</Link>
              <span style={{ color: '#333' }}>·</span>
              <Link href={card.actionHref} style={{ color: '#C9A84C', fontSize: 12, textDecoration: 'none' }}>{card.action} +</Link>
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: '#111', border: '1px solid #1a1a1a', borderRadius: 8, padding: '20px 24px' }}>
        <p style={{ color: '#C9A84C', fontSize: 13, fontWeight: 600, marginBottom: 12 }}>Quick Links</p>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {[
            { label: 'Edit Site Content', href: '/admin/content' },
            { label: 'New Property', href: '/admin/properties/new' },
            { label: 'New Blog Post', href: '/admin/blog/new' },
            { label: 'New Event', href: '/admin/events/new' },
          ].map(({ label, href }) => (
            <Link key={href} href={href} style={{
              background: 'rgba(201,168,76,0.08)',
              border: '1px solid rgba(201,168,76,0.2)',
              color: '#C9A84C',
              borderRadius: 6,
              padding: '8px 14px',
              fontSize: 12,
              fontWeight: 600,
              textDecoration: 'none',
            }}>
              {label}
            </Link>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 32, padding: '16px 20px', background: '#0d0d0d', border: '1px solid #1a1a1a', borderRadius: 8 }}>
        <p style={{ color: '#555', fontSize: 12, margin: 0 }}>
          First time? Run <strong style={{ color: '#C9A84C' }}>POST /api/admin/setup</strong> to initialise the database, then add your <strong style={{ color: '#C9A84C' }}>WEBSITE_DATABASE_URL</strong> to Vercel environment variables.
        </p>
      </div>
    </div>
  )
}
