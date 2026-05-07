'use client'

import { useState, useEffect, useCallback } from 'react'

interface ContentRow { key: string; value: string; updated_at: string }

const GROUPS: { label: string; keys: string[] }[] = [
  { label: 'Hero', keys: ['hero_title_1', 'hero_title_2', 'hero_subtitle'] },
  { label: 'Welcome Section', keys: ['welcome_heading', 'welcome_subtitle'] },
  { label: 'Stats', keys: ['stats_properties', 'stats_investors', 'stats_experience'] },
  { label: 'Contact Info', keys: ['contact_phone', 'contact_mobile', 'contact_email', 'contact_hours'] },
]

function fieldLabel(key: string) {
  return key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}

export default function ContentAdminPage() {
  const [rows, setRows] = useState<ContentRow[]>([])
  const [edits, setEdits] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(true)

  const fetchContent = useCallback(async () => {
    setLoading(true)
    const res = await fetch('/api/admin/content')
    if (res.ok) {
      const data = await res.json() as ContentRow[]
      setRows(data)
      const initial: Record<string, string> = {}
      data.forEach(r => { initial[r.key] = r.value })
      setEdits(initial)
    }
    setLoading(false)
  }, [])

  useEffect(() => { void fetchContent() }, [fetchContent])

  const handleSave = async () => {
    setSaving(true)
    setSaved(false)
    await fetch('/api/admin/content', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(edits) })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const inputStyle: React.CSSProperties = { width: '100%', background: '#0d0d0d', border: '1px solid #2a2a2a', color: '#e0e0e0', borderRadius: 6, padding: '9px 12px', fontSize: 13, outline: 'none', boxSizing: 'border-box' }
  const labelStyle: React.CSSProperties = { display: 'block', color: '#666', fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 5 }

  if (loading) return <p style={{ color: '#555', fontSize: 13 }}>Loading content...</p>

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ color: '#C9A84C', fontSize: 18, fontWeight: 700, textTransform: 'uppercase', margin: 0 }}>Site Content</h1>
          <p style={{ color: '#555', fontSize: 12, margin: '4px 0 0' }}>Edit homepage text, stats and contact info</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          style={{ background: saved ? '#22c55e' : saving ? '#555' : '#C9A84C', color: '#000', border: 'none', borderRadius: 6, padding: '9px 20px', fontSize: 13, fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer' }}
        >
          {saved ? 'Saved ✓' : saving ? 'Saving...' : 'Save All'}
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {GROUPS.map(group => (
          <div key={group.label} style={{ background: '#111', border: '1px solid #1a1a1a', borderRadius: 8, padding: '20px 24px' }}>
            <p style={{ color: '#C9A84C', fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', margin: '0 0 16px' }}>{group.label}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {group.keys.map(key => {
                const value = edits[key] ?? ''
                const isLong = value.length > 80
                return (
                  <div key={key}>
                    <label style={labelStyle}>{fieldLabel(key)}</label>
                    {isLong ? (
                      <textarea
                        value={value}
                        onChange={e => setEdits(prev => ({ ...prev, [key]: e.target.value }))}
                        rows={3}
                        style={{ ...inputStyle, resize: 'vertical' }}
                      />
                    ) : (
                      <input
                        value={value}
                        onChange={e => setEdits(prev => ({ ...prev, [key]: e.target.value }))}
                        style={inputStyle}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}

        {/* Any extra keys not in groups */}
        {rows.filter(r => !GROUPS.flatMap(g => g.keys).includes(r.key)).length > 0 && (
          <div style={{ background: '#111', border: '1px solid #1a1a1a', borderRadius: 8, padding: '20px 24px' }}>
            <p style={{ color: '#555', fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', margin: '0 0 16px' }}>Other</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {rows.filter(r => !GROUPS.flatMap(g => g.keys).includes(r.key)).map(r => (
                <div key={r.key}>
                  <label style={labelStyle}>{r.key}</label>
                  <input
                    value={edits[r.key] ?? ''}
                    onChange={e => setEdits(prev => ({ ...prev, [r.key]: e.target.value }))}
                    style={inputStyle}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
