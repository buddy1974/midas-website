'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { EventRow } from '@/lib/db'
import MediaGalleryEditor, { type GalleryImage } from '@/components/admin/MediaGalleryEditor'
import EmbedEditor, { type Embed } from '@/components/admin/EmbedEditor'

const inputStyle: React.CSSProperties = { width: '100%', background: '#0d0d0d', border: '1px solid #2a2a2a', color: '#e0e0e0', borderRadius: 6, padding: '9px 12px', fontSize: 13, outline: 'none', boxSizing: 'border-box' }
const labelStyle: React.CSSProperties = { display: 'block', color: '#666', fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 5 }

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div style={{ marginBottom: 16 }}><label style={labelStyle}>{label}</label>{children}</div>
}

export default function EventForm({ initial }: { initial?: EventRow }) {
  const router = useRouter()
  const isEdit = !!initial

  const [form, setForm] = useState({
    name: initial?.name ?? '',
    event_date: initial?.event_date ?? '',
    event_time: initial?.event_time ?? '',
    location: initial?.location ?? '',
    description: initial?.description ?? '',
    event_type: initial?.event_type ?? 'in-person',
    cost_type: initial?.cost_type ?? 'free',
    cost_amount: initial?.cost_amount?.toString() ?? '0',
    registration_url: initial?.registration_url ?? '',
    is_featured: initial?.is_featured ?? false,
  })

  function parseGallery(val: unknown, fallbackUrl?: string | null): GalleryImage[] {
    if (Array.isArray(val) && val.length > 0) return val as GalleryImage[]
    if (typeof val === 'string' && val.trim().startsWith('[')) {
      try {
        const parsed = JSON.parse(val) as GalleryImage[]
        if (Array.isArray(parsed) && parsed.length > 0) return parsed
      } catch { /* ignore */ }
    }
    if (fallbackUrl) return [{ url: fallbackUrl, caption: '' }]
    return []
  }
  function parseEmbeds(val: unknown): Embed[] {
    if (Array.isArray(val)) return val as Embed[]
    if (typeof val === 'string' && val.trim().startsWith('[')) {
      try { return JSON.parse(val) as Embed[] } catch { /* ignore */ }
    }
    return []
  }

  const [images, setImages] = useState<GalleryImage[]>(() =>
    parseGallery(initial?.images, initial?.image_url)
  )
  const [embeds, setEmbeds] = useState<Embed[]>(() =>
    parseEmbeds(initial?.embeds)
  )

  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState('')

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value
    setForm(f => ({ ...f, [key]: value }))
  }

  const handleSave = async () => {
    if (!form.name.trim() || !form.event_date.trim()) { setError('Name and date are required.'); return }
    setSaving(true); setError('')
    try {
      const payload = {
        ...form,
        cost_amount: parseInt(form.cost_amount) || 0,
        image_url: images[0]?.url ?? null,
        images,
        embeds,
      }
      const url = isEdit ? `/api/admin/events/${initial!.id}` : '/api/admin/events'
      const method = isEdit ? 'PATCH' : 'POST'
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if (res.ok) {
        router.push('/admin/events'); router.refresh()
        return // keep saving=true during navigation
      }
      let message = 'Save failed.'
      try { const d = await res.json() as { error?: string }; message = d.error ?? message } catch { /* non-JSON body */ }
      setError(message)
    } catch (err) {
      console.error('[EventForm] save error:', err)
      setError('Network error. Please check your connection and try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Delete this event?')) return
    setDeleting(true)
    await fetch(`/api/admin/events/${initial!.id}`, { method: 'DELETE' })
    router.push('/admin/events'); router.refresh()
  }

  return (
    <div style={{ maxWidth: 640 }}>
      <Field label="Event Name *">
        <input value={form.name} onChange={set('name')} placeholder="e.g. Midas Investor Networking Evening" style={inputStyle} />
      </Field>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
        <Field label="Date *">
          <input value={form.event_date} onChange={set('event_date')} placeholder="e.g. 2026-06-10" style={inputStyle} />
        </Field>
        <Field label="Time">
          <input value={form.event_time} onChange={set('event_time')} placeholder="e.g. 6:30pm" style={inputStyle} />
        </Field>
        <Field label="Event Type">
          <select value={form.event_type} onChange={set('event_type')} style={inputStyle}>
            <option value="in-person">🤝 In-Person / Networking</option>
            <option value="webinar">🎥 Online Webinar</option>
            <option value="auction-briefing">🏛 Pre-Auction Briefing</option>
            <option value="workshop">📋 Workshop</option>
            <option value="other">Other</option>
          </select>
        </Field>
        <Field label="Cost Type">
          <select value={form.cost_type} onChange={set('cost_type')} style={inputStyle}>
            <option value="free">Free</option>
            <option value="paid">Paid</option>
          </select>
        </Field>
        {form.cost_type === 'paid' && (
          <Field label="Cost Amount (£)">
            <input type="number" value={form.cost_amount} onChange={set('cost_amount')} placeholder="0" style={inputStyle} min={0} />
          </Field>
        )}
        <Field label="Location">
          <input value={form.location} onChange={set('location')} placeholder="e.g. Harrow School, HA1 3HP or Online" style={inputStyle} />
        </Field>
        <Field label="Registration URL">
          <input value={form.registration_url} onChange={set('registration_url')} placeholder="https://..." style={inputStyle} />
        </Field>
      </div>

      <Field label="Description">
        <textarea value={form.description} onChange={set('description')} rows={5} placeholder="Event description..." style={{ ...inputStyle, resize: 'vertical' }} />
      </Field>

      <Field label="Photos (first = cover image)">
        <MediaGalleryEditor images={images} onChange={setImages} folder="events" />
      </Field>

      <Field label="Videos & Embeds (YouTube or iframe URL)">
        <EmbedEditor embeds={embeds} onChange={setEmbeds} />
      </Field>

      <div style={{ marginBottom: 20 }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#888', cursor: 'pointer' }}>
          <input type="checkbox" checked={form.is_featured} onChange={set('is_featured')} style={{ accentColor: '#C9A84C' }} />
          Featured event
        </label>
      </div>

      {error && <p style={{ color: '#ef4444', fontSize: 13, marginBottom: 16 }}>{error}</p>}

      <div style={{ display: 'flex', gap: 10 }}>
        <button onClick={handleSave} disabled={saving} style={{ background: saving ? '#555' : '#C9A84C', color: '#000', border: 'none', borderRadius: 6, padding: '10px 24px', fontSize: 13, fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer' }}>
          {saving ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Event'}
        </button>
        <button onClick={() => router.back()} style={{ background: 'none', border: '1px solid #2a2a2a', color: '#888', borderRadius: 6, padding: '10px 20px', fontSize: 13, cursor: 'pointer' }}>Cancel</button>
        {isEdit && (
          <button onClick={handleDelete} disabled={deleting} style={{ marginLeft: 'auto', background: 'none', border: '1px solid #3f1010', color: '#ef4444', borderRadius: 6, padding: '10px 20px', fontSize: 13, cursor: deleting ? 'not-allowed' : 'pointer' }}>
            {deleting ? 'Deleting...' : 'Delete'}
          </button>
        )}
      </div>
    </div>
  )
}
