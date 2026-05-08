'use client'

import type { BuilderState } from './hooks/useBuilderState'

const C = { bg: '#0a0a0a', panel: '#0d0d0d', border: '#1a1a1a', gold: '#C9A84C', text: '#e0e0e0', muted: '#666' }
const MAX_VISIBLE = 6

interface Props { state: BuilderState }

export default function BuilderTopBar({ state }: Props) {
  const {
    pages, activeSlug, setActiveSlug,
    layout, setLayout, scheduleSave,
    saveStatus,
    device, setDevice,
    undoStack, redoStack, undo, redo,
    pageDropdown, setPageDropdown, pageDropRef,
    setNewPageModal,
    deletePage,
  } = state

  const visiblePages  = pages.slice(0, MAX_VISIBLE)
  const overflowPages = pages.slice(MAX_VISIBLE)

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 12px', height: 52, background: C.panel, borderBottom: `1px solid ${C.border}`, flexShrink: 0, zIndex: 10 }}>

      {/* Logo */}
      <span style={{ color: C.gold, fontSize: 13, fontWeight: 700, letterSpacing: 2, marginRight: 4, whiteSpace: 'nowrap' }}>PAGE BUILDER</span>

      {/* Page tabs */}
      <div style={{ display: 'flex', gap: 3, flex: 1, overflow: 'hidden', alignItems: 'center' }}>
        {visiblePages.map(p => (
          <button key={p.slug} onClick={() => setActiveSlug(p.slug)} style={{
            padding: '4px 10px', borderRadius: 4,
            border: `1px solid ${activeSlug === p.slug ? C.gold : C.border}`,
            background: activeSlug === p.slug ? 'rgba(201,168,76,0.12)' : 'transparent',
            color: activeSlug === p.slug ? C.gold : C.muted,
            fontSize: 11, cursor: 'pointer', whiteSpace: 'nowrap', fontWeight: activeSlug === p.slug ? 600 : 400,
          }}>
            {p.title}
            {p.slug !== 'home' && (
              <span
                onClick={e => { e.stopPropagation(); deletePage(p.slug, p.title) }}
                style={{ marginLeft: 5, color: activeSlug === p.slug ? '#C9A84C' : '#444', fontSize: 10, opacity: 0.7 }}
                title={`Delete "${p.title}"`}
              >✕</span>
            )}
          </button>
        ))}

        {/* Overflow dropdown */}
        {overflowPages.length > 0 && (
          <div ref={pageDropRef} style={{ position: 'relative' }}>
            <button onClick={() => setPageDropdown(d => !d)} style={{
              padding: '4px 10px', borderRadius: 4, border: `1px solid ${C.border}`,
              background: overflowPages.some(p => p.slug === activeSlug) ? 'rgba(201,168,76,0.12)' : 'transparent',
              color: overflowPages.some(p => p.slug === activeSlug) ? C.gold : C.muted,
              fontSize: 11, cursor: 'pointer',
            }}>
              ▼ {overflowPages.length} more
            </button>
            {pageDropdown && (
              <div style={{ position: 'absolute', top: 32, left: 0, background: '#0d0d0d', border: `1px solid ${C.border}`, borderRadius: 4, zIndex: 200, minWidth: 160, boxShadow: '0 8px 24px rgba(0,0,0,0.6)' }}>
                {overflowPages.map(p => (
                  <button key={p.slug} onClick={() => { setActiveSlug(p.slug); setPageDropdown(false) }} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    width: '100%', padding: '8px 14px',
                    background: activeSlug === p.slug ? 'rgba(201,168,76,0.1)' : 'transparent',
                    border: 'none', borderBottom: `1px solid ${C.border}`,
                    color: activeSlug === p.slug ? C.gold : C.text,
                    fontSize: 12, cursor: 'pointer', textAlign: 'left',
                  }}>
                    <span>{p.title}</span>
                    {p.slug !== 'home' && (
                      <span
                        onClick={e => { e.stopPropagation(); deletePage(p.slug, p.title); setPageDropdown(false) }}
                        style={{ color: '#555', fontSize: 10, marginLeft: 8 }}
                      >✕</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <button onClick={() => setNewPageModal(true)} style={{ padding: '4px 10px', borderRadius: 4, border: `1px dashed ${C.border}`, background: 'transparent', color: C.muted, fontSize: 11, cursor: 'pointer', whiteSpace: 'nowrap' }}>
          + New Page
        </button>
      </div>

      {/* Device preview */}
      <div style={{ display: 'flex', gap: 2, border: `1px solid ${C.border}`, borderRadius: 4, overflow: 'hidden' }}>
        {(['desktop', 'tablet', 'mobile'] as const).map((d, i) => {
          const icons = ['🖥', '⬜', '📱'] as const
          const labels = ['Desktop', 'Tablet (768px)', 'Mobile (375px)'] as const
          return (
            <button key={d} onClick={() => setDevice(d)} title={labels[i]} style={{
              padding: '5px 9px', background: device === d ? 'rgba(201,168,76,0.15)' : 'transparent',
              border: 'none', color: device === d ? C.gold : C.muted, fontSize: 13, cursor: 'pointer',
            }}>{icons[i]}</button>
          )
        })}
      </div>

      {/* Undo / Redo */}
      <div style={{ display: 'flex', gap: 2 }}>
        <button onClick={undo} disabled={undoStack.length === 0} title="Undo (Ctrl+Z)" style={{ padding: '5px 9px', background: 'transparent', border: `1px solid ${C.border}`, borderRadius: 4, color: undoStack.length > 0 ? C.text : '#333', fontSize: 13, cursor: undoStack.length > 0 ? 'pointer' : 'default' }}>↩</button>
        <button onClick={redo} disabled={redoStack.length === 0} title="Redo (Ctrl+Y)" style={{ padding: '5px 9px', background: 'transparent', border: `1px solid ${C.border}`, borderRadius: 4, color: redoStack.length > 0 ? C.text : '#333', fontSize: 13, cursor: redoStack.length > 0 ? 'pointer' : 'default' }}>↪</button>
      </div>

      {/* Meta inputs */}
      {layout && (
        <div style={{ display: 'flex', gap: 6 }}>
          <input
            value={layout.metaTitle}
            onChange={e => { const u = { ...layout, metaTitle: e.target.value }; setLayout(u); scheduleSave(u) }}
            placeholder="Meta title…"
            style={{ padding: '4px 8px', background: '#111', border: `1px solid ${C.border}`, borderRadius: 3, color: C.text, fontSize: 11, width: 160 }}
          />
          <input
            value={layout.metaDesc}
            onChange={e => { const u = { ...layout, metaDesc: e.target.value }; setLayout(u); scheduleSave(u) }}
            placeholder="Meta description…"
            style={{ padding: '4px 8px', background: '#111', border: `1px solid ${C.border}`, borderRadius: 3, color: C.text, fontSize: 11, width: 200 }}
          />
        </div>
      )}

      {/* Save status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, whiteSpace: 'nowrap' }}>
        {saveStatus === 'saving' && <><span style={{ width: 6, height: 6, borderRadius: '50%', background: '#f0a500', display: 'inline-block' }} /> Saving…</>}
        {saveStatus === 'saved'  && <><span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4caf50', display: 'inline-block' }} /> Saved</>}
        {saveStatus === 'error'  && <><span style={{ width: 6, height: 6, borderRadius: '50%', background: '#e55', display: 'inline-block' }} /> Error</>}
        {saveStatus === 'idle'   && <span style={{ color: C.muted }}>Auto-saves</span>}
      </div>

      {/* View live */}
      <a
        href={`/${activeSlug === 'home' ? '' : activeSlug}`}
        target="_blank" rel="noreferrer"
        style={{ padding: '6px 12px', background: C.gold, color: '#000', borderRadius: 3, fontSize: 11, fontWeight: 700, textDecoration: 'none', letterSpacing: 1, textTransform: 'uppercase', whiteSpace: 'nowrap' }}
      >
        View Live ↗
      </a>
    </div>
  )
}
