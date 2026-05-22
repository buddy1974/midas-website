'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { NewsletterRow } from '@/lib/db'

interface Props {
  initial?: NewsletterRow
}

const inp: React.CSSProperties = {
  background: '#0d0d0d',
  border: '1px solid #2a2a2a',
  color: '#e0e0e0',
  borderRadius: 6,
  padding: '9px 12px',
  fontSize: 13,
  width: '100%',
  boxSizing: 'border-box',
  outline: 'none',
  fontFamily: 'inherit',
}

const label: React.CSSProperties = {
  color: '#888',
  fontSize: 11,
  letterSpacing: 1,
  textTransform: 'uppercase',
  marginBottom: 4,
  display: 'block',
}

export default function NewsletterForm({ initial }: Props) {
  const router = useRouter()
  const isEdit = !!initial

  const [subject, setSubject]     = useState(initial?.subject ?? '')
  const [preview, setPreview]     = useState(initial?.preview ?? '')
  const [htmlBody, setHtmlBody]   = useState(initial?.html_body ?? '')
  const [sentAt, setSentAt]       = useState(
    initial?.sent_at ? initial.sent_at.slice(0, 10) : ''
  )
  const [published, setPublished] = useState(initial?.is_published ?? false)
  const [saving, setSaving]       = useState(false)
  const [deleting, setDeleting]   = useState(false)
  const [error, setError]         = useState('')

  const handleSave = async () => {
    if (!subject.trim()) { setError('Subject is required'); return }
    setSaving(true)
    setError('')
    try {
      const url    = isEdit ? `/api/admin/newsletters/${initial!.id}` : '/api/admin/newsletters'
      const method = isEdit ? 'PATCH' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, preview, html_body: htmlBody, sent_at: sentAt || null, is_published: published }),
      })
      const data = await res.json() as { id?: string; error?: string }
      if (!res.ok) { setError(data.error ?? 'Save failed'); return }
      router.push('/admin/newsletters')
      router.refresh()
    } catch {
      setError('Network error')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!initial || !confirm('Delete this newsletter? This cannot be undone.')) return
    setDeleting(true)
    try {
      await fetch(`/api/admin/newsletters/${initial.id}`, { method: 'DELETE' })
      router.push('/admin/newsletters')
      router.refresh()
    } catch {
      setError('Delete failed')
      setDeleting(false)
    }
  }

  return (
    <div style={{ maxWidth: 860 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <div>
          <h1 style={{ color: '#C9A84C', fontSize: 18, fontWeight: 700, textTransform: 'uppercase', margin: 0 }}>
            {isEdit ? 'Edit Newsletter' : 'New Newsletter'}
          </h1>
          <p style={{ color: '#555', fontSize: 12, margin: '4px 0 0' }}>
            {isEdit ? 'Update details and content' : 'Add a newsletter to the public archive'}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          {isEdit && (
            <button
              onClick={handleDelete}
              disabled={deleting}
              style={{ background: 'none', border: '1px solid #7f1d1d', color: '#ef4444', borderRadius: 6, padding: '8px 16px', fontSize: 12, cursor: 'pointer' }}
            >
              {deleting ? 'Deleting…' : 'Delete'}
            </button>
          )}
          <button
            onClick={() => router.back()}
            style={{ background: 'none', border: '1px solid #2a2a2a', color: '#888', borderRadius: 6, padding: '8px 16px', fontSize: 12, cursor: 'pointer' }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            style={{ background: saving ? '#555' : '#C9A84C', color: '#000', border: 'none', borderRadius: 6, padding: '8px 20px', fontSize: 12, fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer' }}
          >
            {saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Create Newsletter'}
          </button>
        </div>
      </div>

      {error && (
        <div style={{ background: '#7f1d1d', border: '1px solid #991b1b', color: '#fca5a5', borderRadius: 6, padding: '10px 14px', fontSize: 13, marginBottom: 20 }}>
          {error}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Subject */}
        <div>
          <label style={label}>Subject *</label>
          <input
            style={inp}
            value={subject}
            onChange={e => setSubject(e.target.value)}
            placeholder="e.g. Midas Property Auctions — May Update"
          />
        </div>

        {/* Send date + published */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <label style={label}>Send Date</label>
            <input
              type="date"
              style={{ ...inp, colorScheme: 'dark' }}
              value={sentAt}
              onChange={e => setSentAt(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 20 }}>
            <input
              type="checkbox"
              id="published"
              checked={published}
              onChange={e => setPublished(e.target.checked)}
              style={{ accentColor: '#C9A84C', width: 16, height: 16, cursor: 'pointer' }}
            />
            <label htmlFor="published" style={{ color: '#e0e0e0', fontSize: 13, cursor: 'pointer' }}>
              Published (visible on /newsletter)
            </label>
          </div>
        </div>

        {/* Preview text */}
        <div>
          <label style={label}>Preview text</label>
          <textarea
            style={{ ...inp, minHeight: 60, resize: 'vertical' }}
            value={preview}
            onChange={e => setPreview(e.target.value)}
            placeholder="Short description shown in the archive list (auto-generated from HTML if blank)"
          />
        </div>

        {/* HTML body */}
        <div>
          <label style={label}>Email HTML content</label>
          <p style={{ color: '#555', fontSize: 11, marginBottom: 8 }}>
            Paste the full HTML source from your email campaign. This renders as the newsletter body when users click to read it.
          </p>
          <textarea
            style={{ ...inp, minHeight: 320, resize: 'vertical', fontFamily: 'monospace', fontSize: 12 }}
            value={htmlBody}
            onChange={e => setHtmlBody(e.target.value)}
            placeholder="<!DOCTYPE html><html>..."
            spellCheck={false}
          />
          {htmlBody && (
            <p style={{ color: '#22c55e', fontSize: 11, marginTop: 6 }}>
              ✓ {htmlBody.length.toLocaleString()} characters · will render as sanitized HTML
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
