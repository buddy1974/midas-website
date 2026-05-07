'use client'

import { useState, useEffect, useCallback } from 'react'

interface MenuItem {
  label: string
  href: string
}

interface MenuEditorProps {
  open: boolean
  onClose: () => void
}

export default function MenuEditor({ open, onClose }: MenuEditorProps) {
  const [items, setItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  const fetchMenu = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/menu')
      if (!res.ok) throw new Error('Failed to load menu')
      const data = (await res.json()) as { config: MenuItem[] }
      setItems(Array.isArray(data.config) ? data.config : [])
    } catch {
      setError('Could not load menu configuration.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (open) {
      setSaved(false)
      void fetchMenu()
    }
  }, [open, fetchMenu])

  const updateItem = (index: number, key: keyof MenuItem, value: string) => {
    setItems(prev => prev.map((item, i) => i === index ? { ...item, [key]: value } : item))
    setSaved(false)
  }

  const moveUp = (index: number) => {
    if (index === 0) return
    setItems(prev => {
      const next = [...prev]
      const temp = next[index - 1]
      next[index - 1] = next[index]
      next[index] = temp
      return next
    })
    setSaved(false)
  }

  const moveDown = (index: number) => {
    setItems(prev => {
      if (index >= prev.length - 1) return prev
      const next = [...prev]
      const temp = next[index + 1]
      next[index + 1] = next[index]
      next[index] = temp
      return next
    })
    setSaved(false)
  }

  const addItem = () => {
    setItems(prev => [...prev, { label: 'New Link', href: '/' }])
    setSaved(false)
  }

  const removeItem = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index))
    setSaved(false)
  }

  const saveMenu = async () => {
    setSaving(true)
    setError('')
    try {
      const res = await fetch('/api/admin/menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ config: items }),
      })
      if (!res.ok) throw new Error('Save failed')
      setSaved(true)
    } catch {
      setError('Failed to save menu. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  if (!open) return null

  const inputStyle: React.CSSProperties = {
    background: '#0a0a0a',
    border: '1px solid #2a2a2a',
    color: '#e0e0e0',
    borderRadius: 4,
    padding: '6px 10px',
    fontSize: 12,
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          zIndex: 300,
        }}
      />

      {/* Panel */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: 480,
          height: '100%',
          background: '#0d0d0d',
          borderLeft: '1px solid #1a1a1a',
          zIndex: 350,
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 20px',
            borderBottom: '1px solid #1a1a1a',
            flexShrink: 0,
          }}
        >
          <div>
            <p style={{ color: '#C9A84C', fontSize: 14, fontWeight: 700, margin: 0 }}>Menu Editor</p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: '1px solid #2a2a2a',
              color: '#888',
              borderRadius: 4,
              width: 28,
              height: 28,
              cursor: 'pointer',
              fontSize: 14,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '16px 20px', flex: 1 }}>
          <p style={{ color: '#666', fontSize: 12, marginBottom: 20 }}>
            Edit labels and URLs. Use ▲▼ to reorder. Changes apply after Save.
          </p>

          {loading && (
            <p style={{ color: '#555', fontSize: 13 }}>Loading menu...</p>
          )}

          {error && (
            <p style={{ color: '#ef4444', fontSize: 12, marginBottom: 12 }}>{error}</p>
          )}

          {!loading && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {items.map((item, index) => (
                <div
                  key={index}
                  style={{
                    background: '#111',
                    border: '1px solid #1a1a1a',
                    borderRadius: 6,
                    padding: '10px 12px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    {/* Index badge */}
                    <span
                      style={{
                        background: '#1a1a1a',
                        color: '#555',
                        borderRadius: 3,
                        width: 20,
                        height: 20,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 10,
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      {index + 1}
                    </span>

                    {/* Up/Down buttons */}
                    <div style={{ display: 'flex', gap: 3 }}>
                      <button
                        onClick={() => moveUp(index)}
                        disabled={index === 0}
                        style={{
                          background: '#0a0a0a',
                          border: '1px solid #2a2a2a',
                          color: index === 0 ? '#333' : '#888',
                          borderRadius: 3,
                          width: 22,
                          height: 22,
                          cursor: index === 0 ? 'not-allowed' : 'pointer',
                          fontSize: 11,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        ▲
                      </button>
                      <button
                        onClick={() => moveDown(index)}
                        disabled={index >= items.length - 1}
                        style={{
                          background: '#0a0a0a',
                          border: '1px solid #2a2a2a',
                          color: index >= items.length - 1 ? '#333' : '#888',
                          borderRadius: 3,
                          width: 22,
                          height: 22,
                          cursor: index >= items.length - 1 ? 'not-allowed' : 'pointer',
                          fontSize: 11,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        ▼
                      </button>
                    </div>

                    {/* Delete */}
                    <button
                      onClick={() => removeItem(index)}
                      style={{
                        background: 'none',
                        border: '1px solid #2a2a2a',
                        color: '#ef4444',
                        borderRadius: 3,
                        width: 22,
                        height: 22,
                        cursor: 'pointer',
                        fontSize: 11,
                        marginLeft: 'auto',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      ×
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <div>
                      <label style={{ display: 'block', color: '#555', fontSize: 10, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 3 }}>
                        Label
                      </label>
                      <input
                        type="text"
                        value={item.label}
                        onChange={e => updateItem(index, 'label', e.target.value)}
                        style={inputStyle}
                        placeholder="Menu item label"
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', color: '#555', fontSize: 10, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 3 }}>
                        URL
                      </label>
                      <input
                        type="text"
                        value={item.href}
                        onChange={e => updateItem(index, 'href', e.target.value)}
                        style={inputStyle}
                        placeholder="/page-path"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && (
            <button
              onClick={addItem}
              style={{
                marginTop: 12,
                background: 'none',
                border: '1px dashed #2a2a2a',
                color: '#555',
                borderRadius: 6,
                padding: '8px 16px',
                fontSize: 12,
                cursor: 'pointer',
                width: '100%',
              }}
            >
              + Add Item
            </button>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '16px 20px',
            borderTop: '1px solid #1a1a1a',
            flexShrink: 0,
          }}
        >
          {saved && (
            <p style={{ color: '#22c55e', fontSize: 12, marginBottom: 10 }}>
              ✓ Saved. Refresh website to see changes.
            </p>
          )}
          <button
            onClick={() => { void saveMenu() }}
            disabled={saving}
            style={{
              background: saving ? '#7a6430' : '#C9A84C',
              color: '#000',
              border: 'none',
              borderRadius: 6,
              padding: '9px 20px',
              fontSize: 13,
              fontWeight: 700,
              cursor: saving ? 'not-allowed' : 'pointer',
              width: '100%',
            }}
          >
            {saving ? 'Saving...' : 'Save Menu'}
          </button>
        </div>
      </div>
    </>
  )
}
