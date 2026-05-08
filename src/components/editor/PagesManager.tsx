'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface PageRow {
  slug: string
  title: string
  inMenu?: boolean
}

interface PagesManagerProps {
  open: boolean
  onClose: () => void
}

export default function PagesManager({ open, onClose }: PagesManagerProps) {
  const router = useRouter()
  const [pages, setPages] = useState<PageRow[]>([])
  const [loading, setLoading] = useState(false)
  const [creating, setCreating] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newSlug, setNewSlug] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!open) return
    setLoading(true)
    fetch('/api/admin/builder')
      .then(r => r.json())
      .then((data: PageRow[]) => setPages(data))
      .catch(() => setError('Failed to load pages'))
      .finally(() => setLoading(false))
  }, [open])

  const autoSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

  const handleTitleChange = (v: string) => {
    setNewTitle(v)
    if (!newSlug || newSlug === autoSlug(newTitle)) {
      setNewSlug(autoSlug(v))
    }
  }

  const handleCreate = async () => {
    const slug = newSlug || autoSlug(newTitle)
    if (!newTitle.trim() || !slug) return
    setCreating(true)
    setError('')
    try {
      const res = await fetch('/api/admin/builder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle.trim(), slug }),
      })
      if (!res.ok) {
        const d = await res.json().catch(() => ({}))
        throw new Error((d as { error?: string }).error ?? 'Failed to create page')
      }
      onClose()
      router.push('/admin/builder')
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Error creating page')
    } finally {
      setCreating(false)
    }
  }

  if (!open) return null

  const panelStyle: React.CSSProperties = {
    position: 'fixed', top: 0, right: 0, width: 480, height: '100%',
    background: '#0d0d0d', borderLeft: '1px solid #1a1a1a',
    zIndex: 350, display: 'flex', flexDirection: 'column', overflowY: 'auto',
  }
  const inputStyle: React.CSSProperties = {
    background: '#0a0a0a', border: '1px solid #2a2a2a', color: '#e0e0e0',
    borderRadius: 4, padding: '8px 12px', fontSize: 13, outline: 'none',
    width: '100%', boxSizing: 'border-box',
  }

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 300 }} />
      <div style={panelStyle}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid #1a1a1a', flexShrink: 0 }}>
          <h2 style={{ color: '#C9A84C', fontSize: 14, fontWeight: 700, margin: 0, letterSpacing: 2, textTransform: 'uppercase' }}>Pages</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#666', fontSize: 18, cursor: 'pointer', lineHeight: 1 }}>✕</button>
        </div>

        {/* Create new page */}
        <div style={{ padding: '20px', borderBottom: '1px solid #1a1a1a', flexShrink: 0 }}>
          <p style={{ color: '#C9A84C', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', margin: '0 0 12px', fontWeight: 600 }}>Create New Page</p>
          <label style={{ color: '#888', fontSize: 11, display: 'block', marginBottom: 4 }}>Page Title</label>
          <input
            value={newTitle}
            onChange={e => handleTitleChange(e.target.value)}
            placeholder="e.g. Our Team"
            style={{ ...inputStyle, marginBottom: 10 }}
            onKeyDown={e => e.key === 'Enter' && handleCreate()}
          />
          <label style={{ color: '#888', fontSize: 11, display: 'block', marginBottom: 4 }}>URL Slug</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 14 }}>
            <span style={{ color: '#555', fontSize: 13 }}>/</span>
            <input
              value={newSlug}
              onChange={e => setNewSlug(e.target.value)}
              placeholder="our-team"
              style={{ ...inputStyle }}
            />
          </div>
          {error && <p style={{ color: '#e55', fontSize: 12, margin: '0 0 10px' }}>{error}</p>}
          <button
            onClick={handleCreate}
            disabled={!newTitle.trim() || creating}
            style={{
              width: '100%', padding: '10px', background: newTitle.trim() ? '#C9A84C' : '#333',
              color: newTitle.trim() ? '#000' : '#666', border: 'none', borderRadius: 4,
              fontSize: 13, fontWeight: 700, cursor: newTitle.trim() ? 'pointer' : 'not-allowed',
              letterSpacing: 1, textTransform: 'uppercase',
            }}
          >
            {creating ? 'Creating…' : '+ Create Page'}
          </button>
        </div>

        {/* Existing pages list */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <div style={{ padding: '12px 20px', borderBottom: '1px solid #111' }}>
            <p style={{ color: '#555', fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', margin: 0 }}>All Pages</p>
          </div>
          {loading ? (
            <div style={{ padding: 20, color: '#555', fontSize: 13 }}>Loading…</div>
          ) : (
            <>
              {/* Builder-managed pages */}
              {pages.map(p => (
                <div key={p.slug} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 20px', borderBottom: '1px solid #111' }}>
                  <div>
                    <p style={{ color: '#e0e0e0', fontSize: 13, fontWeight: 500, margin: 0 }}>{p.title}</p>
                    <p style={{ color: '#555', fontSize: 11, margin: '2px 0 0' }}>/{p.slug}</p>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <Link
                      href={`/admin/builder`}
                      onClick={onClose}
                      style={{ color: '#C9A84C', fontSize: 12, textDecoration: 'none', fontWeight: 600 }}
                    >
                      Edit →
                    </Link>
                    <a
                      href={`/${p.slug === 'home' ? '' : p.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: '#555', fontSize: 12, textDecoration: 'none' }}
                    >
                      View ↗
                    </a>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  )
}
