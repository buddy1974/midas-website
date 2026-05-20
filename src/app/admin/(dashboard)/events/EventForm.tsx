'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { EventRow, RecurrenceDate } from '@/lib/db'
import MediaGalleryEditor, { type GalleryImage } from '@/components/admin/MediaGalleryEditor'
import EmbedEditor, { type Embed } from '@/components/admin/EmbedEditor'

const inputStyle: React.CSSProperties = { width: '100%', background: '#0d0d0d', border: '1px solid #2a2a2a', color: '#e0e0e0', borderRadius: 6, padding: '9px 12px', fontSize: 13, outline: 'none', boxSizing: 'border-box' }
const labelStyle: React.CSSProperties = { display: 'block', color: '#666', fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 5 }
const navBtn: React.CSSProperties = { background: 'none', border: '1px solid #2a2a2a', color: '#888', borderRadius: 4, padding: '4px 12px', cursor: 'pointer', fontSize: 13 }
const timeInput: React.CSSProperties = { background: '#0d0d0d', border: '1px solid #2a2a2a', color: '#e0e0e0', borderRadius: 4, padding: '5px 8px', fontSize: 12, outline: 'none', colorScheme: 'dark' }

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div style={{ marginBottom: 16 }}><label style={labelStyle}>{label}</label>{children}</div>
}

function formatDateLabel(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-GB', {
    weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
  })
}

function RecurrencePicker({
  dates,
  onChange,
  defaultStartTime,
  defaultEndTime,
}: {
  dates: RecurrenceDate[]
  onChange: (dates: RecurrenceDate[]) => void
  defaultStartTime: string
  defaultEndTime: string
}) {
  const now = new Date()
  const [viewYear, setViewYear] = useState(now.getFullYear())
  const [viewMonth, setViewMonth] = useState(now.getMonth())

  const monthLabel = new Date(viewYear, viewMonth, 1).toLocaleString('en-GB', { month: 'long', year: 'numeric' })
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const firstDow = new Date(viewYear, viewMonth, 1).getDay() // 0=Sun

  const pad = (n: number) => String(n).padStart(2, '0')
  const isoDay = (d: number) => `${viewYear}-${pad(viewMonth + 1)}-${pad(d)}`
  const isSelected = (d: number) => dates.some(r => r.date === isoDay(d))

  const toggleDay = (d: number) => {
    const key = isoDay(d)
    if (dates.some(r => r.date === key)) {
      onChange(dates.filter(r => r.date !== key))
    } else {
      const next = [...dates, { date: key, startTime: defaultStartTime || '09:00', endTime: defaultEndTime || '' }]
      next.sort((a, b) => a.date.localeCompare(b.date))
      onChange(next)
    }
  }

  const updateTime = (date: string, field: 'startTime' | 'endTime', value: string) => {
    onChange(dates.map(r => r.date === date ? { ...r, [field]: value } : r))
  }

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1) }
    else setViewMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1) }
    else setViewMonth(m => m + 1)
  }

  const cells: (number | null)[] = []
  for (let i = 0; i < firstDow; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  return (
    <div style={{ marginTop: 16, background: '#0a0a0a', border: '1px solid #222', borderRadius: 8, padding: 16 }}>
      {/* Month navigation */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <button type="button" onClick={prevMonth} style={navBtn}>‹</button>
        <span style={{ color: '#C9A84C', fontSize: 13, fontWeight: 700 }}>{monthLabel}</span>
        <button type="button" onClick={nextMonth} style={navBtn}>›</button>
      </div>

      {/* Day-of-week headers */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 3, marginBottom: 6 }}>
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
          <div key={d} style={{ textAlign: 'center', fontSize: 10, color: '#444', fontWeight: 600, letterSpacing: 0.5 }}>{d}</div>
        ))}
      </div>

      {/* Day cells */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 3 }}>
        {cells.map((d, i) => (
          <button
            key={i}
            type="button"
            disabled={!d}
            onClick={() => d && toggleDay(d)}
            style={{
              height: 34,
              border: d && isSelected(d) ? '1px solid #C9A84C' : '1px solid #1c1c1c',
              background: d && isSelected(d) ? '#C9A84C' : (d ? '#111' : 'transparent'),
              color: d && isSelected(d) ? '#000' : (d ? '#888' : 'transparent'),
              borderRadius: 5,
              fontSize: 12,
              cursor: d ? 'pointer' : 'default',
              fontWeight: d && isSelected(d) ? 700 : 400,
              transition: 'all 0.1s',
            }}
          >
            {d ?? ''}
          </button>
        ))}
      </div>

      {/* Selected dates with time pickers */}
      {dates.length > 0 && (
        <div style={{ marginTop: 16, borderTop: '1px solid #1c1c1c', paddingTop: 14 }}>
          <p style={{ fontSize: 11, color: '#555', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>
            {dates.length} date{dates.length !== 1 ? 's' : ''} selected
          </p>
          {dates.map(r => (
            <div key={r.date} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, background: '#111', border: '1px solid #1e1e1e', borderRadius: 6, padding: '7px 10px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: 12, color: '#C9A84C', flex: 1, minWidth: 160 }}>{formatDateLabel(r.date)}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <input
                  type="time"
                  value={r.startTime}
                  onChange={e => updateTime(r.date, 'startTime', e.target.value)}
                  style={timeInput}
                />
                <span style={{ color: '#444', fontSize: 11 }}>→</span>
                <input
                  type="time"
                  value={r.endTime}
                  onChange={e => updateTime(r.date, 'endTime', e.target.value)}
                  style={{ ...timeInput, opacity: r.endTime ? 1 : 0.4 }}
                />
                <button
                  type="button"
                  onClick={() => onChange(dates.filter(x => x.date !== r.date))}
                  style={{ background: 'none', border: 'none', color: '#444', cursor: 'pointer', fontSize: 18, lineHeight: 1, padding: '0 2px' }}
                  title="Remove date"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {dates.length === 0 && (
        <p style={{ marginTop: 14, fontSize: 12, color: '#444', textAlign: 'center' }}>
          Click dates on the calendar to add them
        </p>
      )}
    </div>
  )
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
    is_recurring: initial?.is_recurring ?? false,
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
  function parseRecurrenceDates(val: unknown): RecurrenceDate[] {
    if (Array.isArray(val)) return val as RecurrenceDate[]
    return []
  }

  const [images, setImages] = useState<GalleryImage[]>(() =>
    parseGallery(initial?.images, initial?.image_url)
  )
  const [embeds, setEmbeds] = useState<Embed[]>(() => parseEmbeds(initial?.embeds))
  const [recurrenceDates, setRecurrenceDates] = useState<RecurrenceDate[]>(() =>
    parseRecurrenceDates(initial?.recurrence_dates)
  )

  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState('')

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value
    setForm(f => ({ ...f, [key]: value }))
  }

  // Parse default times from event_time string like "6:30pm – 9pm" or "17:00 - 21:00"
  function parseDefaultTimes(): { startTime: string; endTime: string } {
    const t = form.event_time.trim()
    const parts = t.split(/\s*(?:[-–]|\bto\b)\s*/i).map(s => s.trim()).filter(Boolean)
    const parseOne = (s: string): string => {
      const m = s.match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)?$/i)
      if (!m) return ''
      let h = parseInt(m[1])
      const min = m[2] ? parseInt(m[2]) : 0
      const period = m[3]?.toLowerCase()
      if (period === 'pm' && h !== 12) h += 12
      if (period === 'am' && h === 12) h = 0
      return `${String(h).padStart(2, '0')}:${String(min).padStart(2, '0')}`
    }
    return { startTime: parseOne(parts[0] ?? '') || '09:00', endTime: parseOne(parts[1] ?? '') }
  }

  const handleSave = async () => {
    if (!form.name.trim() || !form.event_date.trim()) { setError('Name and date are required.'); return }
    if (form.is_recurring && recurrenceDates.length === 0) { setError('Add at least one recurring date, or uncheck Recurring.'); return }
    setSaving(true); setError('')
    try {
      const payload = {
        ...form,
        cost_amount: parseInt(form.cost_amount) || 0,
        image_url: images[0]?.url ?? null,
        images,
        embeds,
        recurrence_dates: form.is_recurring ? recurrenceDates : [],
      }
      const url = isEdit ? `/api/admin/events/${initial!.id}` : '/api/admin/events'
      const method = isEdit ? 'PATCH' : 'POST'
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if (res.ok) {
        router.push('/admin/events'); router.refresh()
        return
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

  const { startTime: defaultStart, endTime: defaultEnd } = parseDefaultTimes()

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
          <input value={form.event_time} onChange={set('event_time')} placeholder="e.g. 6:30pm – 9pm" style={inputStyle} />
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

      {/* Featured toggle */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#888', cursor: 'pointer' }}>
          <input type="checkbox" checked={form.is_featured} onChange={set('is_featured')} style={{ accentColor: '#C9A84C' }} />
          Featured event
        </label>
      </div>

      {/* Recurring toggle */}
      <div style={{ marginBottom: 20 }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#888', cursor: 'pointer' }}>
          <input type="checkbox" checked={form.is_recurring} onChange={set('is_recurring')} style={{ accentColor: '#C9A84C' }} />
          Recurring / Multiple dates
        </label>
        {form.is_recurring && (
          <>
            <p style={{ fontSize: 12, color: '#555', marginTop: 8, marginLeft: 24 }}>
              Click dates on the calendar to add occurrences. Each date inherits the time above by default — adjust individually as needed.
            </p>
            <RecurrencePicker
              dates={recurrenceDates}
              onChange={setRecurrenceDates}
              defaultStartTime={defaultStart}
              defaultEndTime={defaultEnd}
            />
          </>
        )}
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
