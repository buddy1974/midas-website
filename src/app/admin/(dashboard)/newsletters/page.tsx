import { getSql } from '@/lib/db'
import type { NewsletterRow } from '@/lib/db'
import Link from 'next/link'
import NewsletterSyncButton from './NewsletterSyncButton'

export default async function NewslettersAdminPage() {
  let rows: NewsletterRow[] = []
  try {
    const sql = getSql()
    rows = await sql<NewsletterRow[]>`
      SELECT * FROM newsletters ORDER BY sent_at DESC NULLS LAST, created_at DESC`
  } catch { /* table not yet created */ }

  const ebConfigured = !!process.env.INFUSIONSOFT_API_KEY

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h1 style={{ color: '#C9A84C', fontSize: 18, fontWeight: 700, textTransform: 'uppercase', margin: 0 }}>Newsletters</h1>
          <p style={{ color: '#555', fontSize: 12, margin: '4px 0 0' }}>{rows.length} total · published on /newsletter</p>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          {ebConfigured
            ? <NewsletterSyncButton />
            : <span style={{ fontSize: 11, color: '#444', border: '1px solid #1e1e1e', borderRadius: 6, padding: '7px 12px' }}>Set INFUSIONSOFT_API_KEY to sync</span>
          }
        </div>
      </div>

      {rows.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '48px 0', color: '#555', fontSize: 13 }}>
          No newsletters yet. Click <strong style={{ color: '#C9A84C' }}>Sync Infusionsoft</strong> to import your broadcasts.
        </div>
      ) : (
        <div style={{ background: '#111', border: '1px solid #1a1a1a', borderRadius: 8, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1a1a1a' }}>
                {['Subject', 'Sent', 'Content', 'Published', ''].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', color: '#555', fontWeight: 600, fontSize: 11, letterSpacing: 1, textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((n, i) => (
                <tr key={n.id} style={{ borderBottom: i < rows.length - 1 ? '1px solid #1a1a1a' : 'none' }}>
                  <td style={{ padding: '10px 14px', color: '#e0e0e0', fontWeight: 500, maxWidth: 320 }}>
                    <span style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{n.subject}</span>
                    {n.preview && <span style={{ display: 'block', color: '#555', fontSize: 11, marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{n.preview}</span>}
                  </td>
                  <td style={{ padding: '10px 14px', color: '#888', whiteSpace: 'nowrap' }}>
                    {n.sent_at ? new Date(n.sent_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                  </td>
                  <td style={{ padding: '10px 14px' }}>
                    {n.html_body
                      ? <span style={{ color: '#22c55e', fontSize: 11 }}>✓ HTML</span>
                      : <span style={{ color: '#666', fontSize: 11 }}>No content</span>
                    }
                  </td>
                  <td style={{ padding: '10px 14px' }}>
                    <span style={{ fontSize: 11, color: n.is_published ? '#22c55e' : '#666' }}>
                      {n.is_published ? '✓ Live' : '— Hidden'}
                    </span>
                  </td>
                  <td style={{ padding: '10px 14px' }}>
                    <Link href={`/newsletter/${n.id}`} target="_blank" style={{ color: '#C9A84C', fontSize: 12, textDecoration: 'none' }}>Preview ↗</Link>
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
