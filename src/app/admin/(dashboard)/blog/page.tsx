import { getSql } from '@/lib/db'
import type { BlogPostRow } from '@/lib/db'
import Link from 'next/link'

export default async function BlogAdminPage() {
  let rows: BlogPostRow[] = []
  try {
    const sql = getSql()
    rows = await sql<BlogPostRow[]>`SELECT * FROM blog_posts ORDER BY created_at DESC`
  } catch { /* DB not yet set up */ }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ color: '#C9A84C', fontSize: 18, fontWeight: 700, textTransform: 'uppercase', margin: 0 }}>Blog Posts</h1>
          <p style={{ color: '#555', fontSize: 12, margin: '4px 0 0' }}>{rows.length} total</p>
        </div>
        <Link href="/admin/blog/new" style={{ background: '#C9A84C', color: '#000', borderRadius: 6, padding: '8px 16px', fontSize: 12, fontWeight: 700, textDecoration: 'none' }}>
          + Add Post
        </Link>
      </div>

      {rows.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '48px 0', color: '#555', fontSize: 13 }}>
          No posts yet. <Link href="/admin/blog/new" style={{ color: '#C9A84C' }}>Write the first one.</Link>
        </div>
      ) : (
        <div style={{ background: '#111', border: '1px solid #1a1a1a', borderRadius: 8, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1a1a1a' }}>
                {['Title', 'Category', 'Status', 'Published', ''].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', color: '#555', fontWeight: 600, fontSize: 11, letterSpacing: 1, textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((p, i) => (
                <tr key={p.id} style={{ borderBottom: i < rows.length - 1 ? '1px solid #1a1a1a' : 'none' }}>
                  <td style={{ padding: '10px 14px', color: '#e0e0e0', fontWeight: 500 }}>{p.title}</td>
                  <td style={{ padding: '10px 14px', color: '#888' }}>{p.category}</td>
                  <td style={{ padding: '10px 14px' }}>
                    <span style={{ background: p.status === 'published' ? 'rgba(34,197,94,0.1)' : 'rgba(255,255,255,0.05)', color: p.status === 'published' ? '#22c55e' : '#888', borderRadius: 4, padding: '2px 8px', fontSize: 11 }}>
                      {p.status}
                    </span>
                  </td>
                  <td style={{ padding: '10px 14px', color: '#555', fontSize: 12 }}>
                    {p.published_at ? new Date(p.published_at).toLocaleDateString('en-GB') : 'Not published'}
                  </td>
                  <td style={{ padding: '10px 14px' }}>
                    <Link href={`/admin/blog/${p.id}`} style={{ color: '#C9A84C', fontSize: 12, textDecoration: 'none' }}>Edit →</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
