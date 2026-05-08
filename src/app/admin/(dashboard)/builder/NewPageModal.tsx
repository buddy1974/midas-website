'use client'

import type { BuilderState } from './hooks/useBuilderState'

const C = { panel: '#0d0d0d', border: '#1a1a1a', gold: '#C9A84C', text: '#e0e0e0', muted: '#666' }

interface Props { state: BuilderState }

export default function NewPageModal({ state }: Props) {
  const {
    newPageModal, setNewPageModal,
    newPageTitle, setNewPageTitle,
    newPageSlug, setNewPageSlug,
    createPage,
  } = state

  if (!newPageModal) return null

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 8, padding: 28, width: 400 }}>
        <h3 style={{ color: C.gold, fontSize: 16, fontWeight: 700, margin: '0 0 20px' }}>Create New Page</h3>

        <label style={{ color: C.muted, fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>Page Title</label>
        <input
          value={newPageTitle}
          onChange={e => {
            setNewPageTitle(e.target.value)
            if (!newPageSlug) setNewPageSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''))
          }}
          placeholder="e.g. Our Team"
          autoFocus
          style={{ width: '100%', padding: '9px 12px', background: '#111', border: `1px solid ${C.border}`, borderRadius: 3, color: C.text, fontSize: 14, marginBottom: 14, boxSizing: 'border-box' }}
        />

        <label style={{ color: C.muted, fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>URL Slug</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 20 }}>
          <span style={{ color: C.muted, fontSize: 13 }}>/</span>
          <input
            value={newPageSlug}
            onChange={e => setNewPageSlug(e.target.value)}
            placeholder="our-team"
            style={{ flex: 1, padding: '9px 12px', background: '#111', border: `1px solid ${C.border}`, borderRadius: 3, color: C.text, fontSize: 14, boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={createPage}
            disabled={!newPageTitle}
            style={{ flex: 1, background: C.gold, color: '#000', padding: '10px', border: 'none', borderRadius: 3, fontSize: 13, fontWeight: 700, cursor: newPageTitle ? 'pointer' : 'not-allowed' }}
          >
            Create Page
          </button>
          <button
            onClick={() => setNewPageModal(false)}
            style={{ padding: '10px 16px', background: 'transparent', border: `1px solid ${C.border}`, borderRadius: 3, color: C.muted, fontSize: 13, cursor: 'pointer' }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
