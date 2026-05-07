import Link from 'next/link'
import EventForm from '../EventForm'

export default function NewEventPage() {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Link href="/admin/events" style={{ color: '#555', fontSize: 12, textDecoration: 'none' }}>← Events</Link>
        <h1 style={{ color: '#C9A84C', fontSize: 18, fontWeight: 700, textTransform: 'uppercase', margin: '8px 0 0' }}>Add Event</h1>
      </div>
      <EventForm />
    </div>
  )
}
