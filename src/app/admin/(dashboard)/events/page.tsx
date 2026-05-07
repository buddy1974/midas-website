import { getSql } from '@/lib/db'
import type { EventRow } from '@/lib/db'
import Link from 'next/link'

export default async function EventsAdminPage() {
  let rows: EventRow[] = []
  try {
    const sql = getSql()
    rows = await sql<EventRow[]>`SELECT * FROM events ORDER BY event_date ASC`
  } catch { /* DB not yet set up */ }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ color: '#C9A84C', fontSize: 18, fontWeight: 700, textTransform: 'uppercase', margin: 0 }}>Events</h1>
          <p style={{ color: '#555', fontSize: 12, margin: '4px 0 0' }}>{rows.length} total</p>
        </div>
        <Link href="/admin/events/new" style={{ background: '#C9A84C', color: '#000', borderRadius: 6, padding: '8px 16px', fontSize: 12, fontWeight: 700, textDecoration: 'none' }}>
          + Add Event
        </Link>
      </div>

      {rows.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '48px 0', color: '#555', fontSize: 13 }}>
          No events yet. <Link href="/admin/events/new" style={{ color: '#C9A84C' }}>Add the first one.</Link>
        </div>
      ) : (
        <div style={{ background: '#111', border: '1px solid #1a1a1a', borderRadius: 8, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1a1a1a' }}>
                {['Name', 'Date', 'Type', 'Cost', 'Location', ''].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', color: '#555', fontWeight: 600, fontSize: 11, letterSpacing: 1, textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((ev, i) => (
                <tr key={ev.id} style={{ borderBottom: i < rows.length - 1 ? '1px solid #1a1a1a' : 'none' }}>
                  <td style={{ padding: '10px 14px', color: '#e0e0e0', fontWeight: 500 }}>{ev.name}</td>
                  <td style={{ padding: '10px 14px', color: '#888' }}>{ev.event_date}{ev.event_time ? ` · ${ev.event_time}` : ''}</td>
                  <td style={{ padding: '10px 14px' }}>
                    <span style={{ background: 'rgba(201,168,76,0.1)', color: '#C9A84C', borderRadius: 4, padding: '2px 8px', fontSize: 11 }}>{ev.event_type}</span>
                  </td>
                  <td style={{ padding: '10px 14px', color: ev.cost_type === 'free' ? '#22c55e' : '#C9A84C', fontSize: 12 }}>
                    {ev.cost_type === 'free' ? 'Free' : `£${ev.cost_amount}`}
                  </td>
                  <td style={{ padding: '10px 14px', color: '#888', fontSize: 12 }}>{ev.location ?? 'Online'}</td>
                  <td style={{ padding: '10px 14px' }}>
                    <Link href={`/admin/events/${ev.id}`} style={{ color: '#C9A84C', fontSize: 12, textDecoration: 'none' }}>Edit →</Link>
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
