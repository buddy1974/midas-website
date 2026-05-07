import Link from 'next/link'
import { getSql } from '@/lib/db'
import type { EventRow } from '@/lib/db'
import EventForm from '../EventForm'
import { notFound } from 'next/navigation'

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const sql = getSql()
  const [row] = await sql<EventRow[]>`SELECT * FROM events WHERE id = ${id}`
  if (!row) notFound()

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Link href="/admin/events" style={{ color: '#555', fontSize: 12, textDecoration: 'none' }}>← Events</Link>
        <h1 style={{ color: '#C9A84C', fontSize: 18, fontWeight: 700, textTransform: 'uppercase', margin: '8px 0 0' }}>Edit Event</h1>
        <p style={{ color: '#555', fontSize: 12, margin: '4px 0 0' }}>{row.name}</p>
      </div>
      <EventForm initial={row} />
    </div>
  )
}
