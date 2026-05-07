import Link from 'next/link'
import PropertyForm from '../PropertyForm'

export default function NewPropertyPage() {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Link href="/admin/properties" style={{ color: '#555', fontSize: 12, textDecoration: 'none' }}>← Properties</Link>
        <h1 style={{ color: '#C9A84C', fontSize: 18, fontWeight: 700, textTransform: 'uppercase', margin: '8px 0 0' }}>Add Property</h1>
      </div>
      <PropertyForm />
    </div>
  )
}
