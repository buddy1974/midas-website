import Link from 'next/link'
import { getSql } from '@/lib/db'
import type { PropertyRow } from '@/lib/db'
import PropertyForm from '../PropertyForm'
import { notFound } from 'next/navigation'

export default async function EditPropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const sql = getSql()
  const [row] = await sql<PropertyRow[]>`SELECT * FROM properties WHERE id = ${id}`
  if (!row) notFound()

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Link href="/admin/properties" style={{ color: '#555', fontSize: 12, textDecoration: 'none' }}>← Properties</Link>
        <h1 style={{ color: '#C9A84C', fontSize: 18, fontWeight: 700, textTransform: 'uppercase', margin: '8px 0 0' }}>Edit Property</h1>
        <p style={{ color: '#555', fontSize: 12, margin: '4px 0 0' }}>{row.title}</p>
      </div>
      <PropertyForm initial={row} />
    </div>
  )
}
