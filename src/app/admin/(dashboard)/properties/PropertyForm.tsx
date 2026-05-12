'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { PropertyRow } from '@/lib/db'
import ImageUpload from '@/components/admin/ImageUpload'

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: '#0d0d0d',
  border: '1px solid #2a2a2a',
  color: '#e0e0e0',
  borderRadius: 6,
  padding: '9px 12px',
  fontSize: 13,
  outline: 'none',
  boxSizing: 'border-box',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  color: '#666',
  fontSize: 11,
  letterSpacing: 1,
  textTransform: 'uppercase',
  marginBottom: 5,
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  )
}

interface Props {
  initial?: PropertyRow
}

export default function PropertyForm({ initial }: Props) {
  const router = useRouter()
  const isEdit = !!initial

  const [form, setForm] = useState({
    title: initial?.title ?? '',
    area: initial?.area ?? '',
    address: initial?.address ?? '',
    address_visible: initial?.address_visible ?? true,
    property_type: initial?.property_type ?? 'Residential',
    bedrooms: initial?.bedrooms?.toString() ?? '',
    guide_price: initial?.guide_price?.toString() ?? '0',
    description: initial?.description ?? '',
    features: initial?.features ?? '',
    image_url: initial?.image_url ?? '',
    video_url: initial?.video_url ?? '',
    auction_date: initial?.auction_date ?? '',
    tenure: initial?.tenure ?? 'Freehold',
    is_featured: initial?.is_featured ?? false,
    show_on_website: initial?.show_on_website ?? true,
    is_off_market: initial?.is_off_market ?? false,
    stage: initial?.stage ?? 'Sourcing',
  })

  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState('')

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value
    setForm(f => ({ ...f, [key]: value }))
  }

  const handleSave = async () => {
    if (!form.title.trim() || !form.area.trim()) { setError('Title and area are required.'); return }
    setSaving(true)
    setError('')
    const payload = {
      ...form,
      bedrooms: form.bedrooms ? parseInt(form.bedrooms) : null,
      guide_price: parseInt(form.guide_price) || 0,
    }
    const url = isEdit ? `/api/admin/properties/${initial!.id}` : '/api/admin/properties'
    const method = isEdit ? 'PATCH' : 'POST'
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    if (res.ok) {
      router.push('/admin/properties')
      router.refresh()
    } else {
      const data = await res.json() as { error?: string }
      setError(data.error ?? 'Save failed.')
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Delete this property? This cannot be undone.')) return
    setDeleting(true)
    await fetch(`/api/admin/properties/${initial!.id}`, { method: 'DELETE' })
    router.push('/admin/properties')
    router.refresh()
  }

  return (
    <div style={{ maxWidth: 720 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
        <Field label="Title *">
          <input value={form.title} onChange={set('title')} placeholder="e.g. 88 Ripple Road" style={inputStyle} />
        </Field>
        <Field label="Area *">
          <input value={form.area} onChange={set('area')} placeholder="e.g. Barking, IG11 7NS" style={inputStyle} />
        </Field>
        <Field label="Address (full)">
          <input value={form.address} onChange={set('address')} placeholder="Full address" style={inputStyle} />
        </Field>
        <Field label="Stage">
          <select value={form.stage} onChange={set('stage')} style={inputStyle}>
            {['Sourcing', 'Legal Pack', 'Live', 'Sold', 'Withdrawn'].map(s => <option key={s}>{s}</option>)}
          </select>
        </Field>
        <Field label="Property Type">
          <select value={form.property_type} onChange={set('property_type')} style={inputStyle}>
            {['Residential', 'HMO', 'Commercial', 'Development Site', 'Portfolio', 'Land'].map(t => <option key={t}>{t}</option>)}
          </select>
        </Field>
        <Field label="Tenure">
          <select value={form.tenure} onChange={set('tenure')} style={inputStyle}>
            {['Freehold', 'Leasehold', 'Share of Freehold'].map(t => <option key={t}>{t}</option>)}
          </select>
        </Field>
        <Field label="Bedrooms">
          <input type="number" value={form.bedrooms} onChange={set('bedrooms')} placeholder="0" style={inputStyle} min={0} />
        </Field>
        <Field label="Guide Price">
          <input type="number" value={form.guide_price} onChange={set('guide_price')} placeholder="0" style={inputStyle} min={0} />
        </Field>
        <Field label="Auction Date">
          <input value={form.auction_date} onChange={set('auction_date')} placeholder="e.g. 14 May 2026" style={inputStyle} />
        </Field>
        <div style={{ gridColumn: '1 / -1' }}>
          <Field label="Cover Image">
            <ImageUpload
              value={form.image_url}
              onChange={url => setForm(f => ({ ...f, image_url: url }))}
              folder="properties"
              label="property photo"
            />
          </Field>
        </div>
      </div>

      <Field label="Description">
        <textarea value={form.description} onChange={set('description')} rows={5} placeholder="Property description..." style={{ ...inputStyle, resize: 'vertical' }} />
      </Field>
      <Field label="Key Features (one per line)">
        <textarea value={form.features} onChange={set('features')} rows={4} placeholder="Planning permission&#10;Vacant possession&#10;Legal pack ready" style={{ ...inputStyle, resize: 'vertical' }} />
      </Field>
      <Field label="Video URL">
        <input value={form.video_url} onChange={set('video_url')} placeholder="https://youtube.com/..." style={inputStyle} />
      </Field>

      <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
        {([
          { key: 'show_on_website', label: 'Show on website' },
          { key: 'is_off_market', label: 'Off-market only' },
          { key: 'is_featured', label: 'Featured' },
          { key: 'address_visible', label: 'Address visible' },
        ] as { key: keyof typeof form; label: string }[]).map(({ key, label }) => (
          <label key={key} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#888', cursor: 'pointer' }}>
            <input type="checkbox" checked={form[key] as boolean} onChange={set(key)} style={{ accentColor: '#C9A84C' }} />
            {label}
          </label>
        ))}
      </div>

      {error && <p style={{ color: '#ef4444', fontSize: 13, marginBottom: 16 }}>{error}</p>}

      <div style={{ display: 'flex', gap: 10 }}>
        <button onClick={handleSave} disabled={saving} style={{ background: saving ? '#555' : '#C9A84C', color: '#000', border: 'none', borderRadius: 6, padding: '10px 24px', fontSize: 13, fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer' }}>
          {saving ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Property'}
        </button>
        <button onClick={() => router.back()} style={{ background: 'none', border: '1px solid #2a2a2a', color: '#888', borderRadius: 6, padding: '10px 20px', fontSize: 13, cursor: 'pointer' }}>
          Cancel
        </button>
        {isEdit && (
          <button onClick={handleDelete} disabled={deleting} style={{ marginLeft: 'auto', background: 'none', border: '1px solid #3f1010', color: '#ef4444', borderRadius: 6, padding: '10px 20px', fontSize: 13, cursor: deleting ? 'not-allowed' : 'pointer' }}>
            {deleting ? 'Deleting...' : 'Delete'}
          </button>
        )}
      </div>
    </div>
  )
}
