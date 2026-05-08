'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import type { BuilderSection, PageBuilderLayout, SectionType } from '@/lib/builder-types'
import { SECTION_LIBRARY } from '@/lib/builder-types'
import { SECTION_DEFAULTS } from '@/lib/builder-defaults'
import { DEFAULT_SETTINGS } from '@/lib/builder-types'
import SectionRenderer from '@/components/builder/SectionRenderer'
import PropertiesPanel from './PropertiesPanel'

interface PageMeta { slug: string; title: string }
type SaveStatus = 'idle' | 'saving' | 'saved' | 'error'
type Device = 'desktop' | 'tablet' | 'mobile'

const DEVICE_WIDTHS: Record<Device, number | null> = { desktop: null, tablet: 768, mobile: 375 }

export default function BuilderPage() {
  const [pages, setPages] = useState<PageMeta[]>([])
  const [activeSlug, setActiveSlug] = useState<string>('home')
  const [layout, setLayout] = useState<PageBuilderLayout | null>(null)
  const [selected, setSelected] = useState<string | null>(null)
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle')
  const [libOpen, setLibOpen] = useState(false)
  const [newPageModal, setNewPageModal] = useState(false)
  const [newPageTitle, setNewPageTitle] = useState('')
  const [newPageSlug, setNewPageSlug] = useState('')
  const [setupDone, setSetupDone] = useState(false)
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [libSearch, setLibSearch] = useState('')
  const [libCategory, setLibCategory] = useState<string>('all')
  const [device, setDevice] = useState<Device>('desktop')
  const [undoStack, setUndoStack] = useState<BuilderSection[][]>([])
  const [redoStack, setRedoStack] = useState<BuilderSection[][]>([])
  const [pageDropdown, setPageDropdown] = useState(false)
  const [dragOver, setDragOver] = useState<string | null>(null)
  const pageDropRef = useRef<HTMLDivElement>(null)

  // ── Setup DB on first load ─────────────────────────────────────────────────
  useEffect(() => {
    fetch('/api/admin/builder/setup', { method: 'POST' })
      .then(() => {
        setSetupDone(true)
        return fetch('/api/admin/builder')
      })
      .then(r => r.json())
      .then((d: PageMeta[]) => setPages(d))
      .catch(console.error)
  }, [])

  // ── Load active page ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!setupDone) return
    setLayout(null); setSelected(null); setUndoStack([]); setRedoStack([])
    fetch(`/api/admin/builder/${activeSlug}`)
      .then(r => r.json())
      .then((d: PageBuilderLayout) => setLayout(d))
      .catch(console.error)
  }, [activeSlug, setupDone])

  // ── Close page dropdown on outside click ──────────────────────────────────
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (pageDropRef.current && !pageDropRef.current.contains(e.target as Node)) {
        setPageDropdown(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // ── Keyboard shortcuts (Ctrl+Z / Ctrl+Y) ──────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) { e.preventDefault(); undo() }
      if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) { e.preventDefault(); redo() }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [undoStack, redoStack, layout])

  // ── Auto-save ──────────────────────────────────────────────────────────────
  const scheduleSave = useCallback((newLayout: PageBuilderLayout) => {
    if (saveTimer.current) clearTimeout(saveTimer.current)
    setSaveStatus('saving')
    saveTimer.current = setTimeout(async () => {
      try {
        await fetch(`/api/admin/builder/${newLayout.slug}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sections: newLayout.sections, title: newLayout.title, metaTitle: newLayout.metaTitle, metaDesc: newLayout.metaDesc }),
        })
        setSaveStatus('saved')
        setTimeout(() => setSaveStatus('idle'), 2000)
      } catch { setSaveStatus('error') }
    }, 1500)
  }, [])

  // ── Mutations ──────────────────────────────────────────────────────────────
  const pushUndo = useCallback((sections: BuilderSection[]) => {
    setUndoStack(u => [...u.slice(-29), sections])
    setRedoStack([])
  }, [])

  const updateLayout = useCallback((newSections: BuilderSection[]) => {
    setLayout(prev => {
      if (!prev) return prev
      pushUndo(prev.sections)
      const updated = { ...prev, sections: newSections }
      scheduleSave(updated)
      return updated
    })
  }, [scheduleSave, pushUndo])

  const undo = () => {
    if (undoStack.length === 0 || !layout) return
    const prev = undoStack[undoStack.length - 1]
    setRedoStack(r => [...r, layout.sections])
    setUndoStack(u => u.slice(0, -1))
    const updated = { ...layout, sections: prev }
    setLayout(updated)
    scheduleSave(updated)
  }

  const redo = () => {
    if (redoStack.length === 0 || !layout) return
    const next = redoStack[redoStack.length - 1]
    setUndoStack(u => [...u, layout.sections])
    setRedoStack(r => r.slice(0, -1))
    const updated = { ...layout, sections: next }
    setLayout(updated)
    scheduleSave(updated)
  }

  const addSection = useCallback((type: SectionType) => {
    const newSection: BuilderSection = {
      id: Math.random().toString(36).slice(2, 10),
      type,
      data: SECTION_DEFAULTS[type] as Record<string, string>,
      settings: { ...DEFAULT_SETTINGS[type] },
    }
    setLayout(prev => {
      if (!prev) return prev
      pushUndo(prev.sections)
      const updated = { ...prev, sections: [...prev.sections, newSection] }
      scheduleSave(updated)
      return updated
    })
    setSelected(newSection.id)
    setLibOpen(false)
  }, [scheduleSave, pushUndo])

  const moveSection = useCallback((id: string, dir: -1 | 1) => {
    setLayout(prev => {
      if (!prev) return prev
      const idx = prev.sections.findIndex(s => s.id === id)
      if (idx < 0) return prev
      const newIdx = idx + dir
      if (newIdx < 0 || newIdx >= prev.sections.length) return prev
      pushUndo(prev.sections)
      const arr = [...prev.sections]
      ;[arr[idx], arr[newIdx]] = [arr[newIdx], arr[idx]]
      const updated = { ...prev, sections: arr }
      scheduleSave(updated)
      return updated
    })
  }, [scheduleSave, pushUndo])

  const deleteSection = useCallback((id: string) => {
    setLayout(prev => {
      if (!prev) return prev
      pushUndo(prev.sections)
      const updated = { ...prev, sections: prev.sections.filter(s => s.id !== id) }
      scheduleSave(updated)
      return updated
    })
    if (selected === id) setSelected(null)
  }, [selected, scheduleSave, pushUndo])

  const updateSection = useCallback((id: string, data: Record<string, string>) => {
    setLayout(prev => {
      if (!prev) return prev
      const updated = { ...prev, sections: prev.sections.map(s => s.id === id ? { ...s, data } : s) }
      scheduleSave(updated)
      return updated
    })
  }, [scheduleSave])

  const updateSectionSettings = useCallback((id: string, settings: BuilderSection['settings']) => {
    setLayout(prev => {
      if (!prev) return prev
      const updated = { ...prev, sections: prev.sections.map(s => s.id === id ? { ...s, settings } : s) }
      scheduleSave(updated)
      return updated
    })
  }, [scheduleSave])

  // ── Drag-and-drop reorder ──────────────────────────────────────────────────
  const handleDrop = useCallback((dragId: string, dropId: string) => {
    if (dragId === dropId) return
    setLayout(prev => {
      if (!prev) return prev
      const arr = [...prev.sections]
      const fromIdx = arr.findIndex(s => s.id === dragId)
      const toIdx   = arr.findIndex(s => s.id === dropId)
      if (fromIdx < 0 || toIdx < 0) return prev
      pushUndo(prev.sections)
      const [moved] = arr.splice(fromIdx, 1)
      arr.splice(toIdx, 0, moved)
      const updated = { ...prev, sections: arr }
      scheduleSave(updated)
      return updated
    })
    setDragOver(null)
  }, [scheduleSave, pushUndo])

  // ── Create new page ────────────────────────────────────────────────────────
  const createPage = useCallback(async () => {
    if (!newPageTitle) return
    const slug = newPageSlug || newPageTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    const res = await fetch('/api/admin/builder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newPageTitle, slug }),
    })
    if (res.ok) {
      const { slug: s } = await res.json() as { slug: string }
      setPages(p => [...p, { slug: s, title: newPageTitle }])
      setActiveSlug(s)
      setNewPageModal(false); setNewPageTitle(''); setNewPageSlug('')
    }
  }, [newPageTitle, newPageSlug])

  // ── Delete page ───────────────────────────────────────────────────────────
  const deletePage = useCallback(async (slug: string, title: string) => {
    if (!confirm(`Delete page "${title}"? This cannot be undone.`)) return
    await fetch(`/api/admin/builder/${slug}`, { method: 'DELETE' })
    setPages(p => p.filter(x => x.slug !== slug))
    if (activeSlug === slug) setActiveSlug('home')
  }, [activeSlug])

  // ── Derived ───────────────────────────────────────────────────────────────
  const selectedSection = layout?.sections.find(s => s.id === selected) ?? null
  const filteredLib = SECTION_LIBRARY.filter(item => {
    const matchCat = libCategory === 'all' || item.category === libCategory
    const matchSearch = !libSearch || item.label.toLowerCase().includes(libSearch.toLowerCase()) || item.description.toLowerCase().includes(libSearch.toLowerCase())
    return matchCat && matchSearch
  })
  const categories = ['all', 'hero', 'content', 'layout', 'data', 'utility']
  const C = { bg: '#0a0a0a', panel: '#0d0d0d', border: '#1a1a1a', gold: '#C9A84C', text: '#e0e0e0', muted: '#666' }

  // Page tabs: show max 6, rest in dropdown
  const MAX_VISIBLE = 6
  const visiblePages = pages.slice(0, MAX_VISIBLE)
  const overflowPages = pages.slice(MAX_VISIBLE)

  const canvasWidth = DEVICE_WIDTHS[device]

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', flexDirection: 'column', background: C.bg, color: C.text, overflow: 'hidden' }}>

      {/* ── Top Bar ───────────────────────────────────────────────────────── */}
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
                      width: '100%', padding: '8px 14px', background: activeSlug === p.slug ? 'rgba(201,168,76,0.1)' : 'transparent',
                      border: 'none', borderBottom: `1px solid ${C.border}`, color: activeSlug === p.slug ? C.gold : C.text,
                      fontSize: 12, cursor: 'pointer', textAlign: 'left',
                    }}>
                      <span>{p.title}</span>
                      {p.slug !== 'home' && (
                        <span onClick={e => { e.stopPropagation(); deletePage(p.slug, p.title); setPageDropdown(false) }} style={{ color: '#555', fontSize: 10, marginLeft: 8 }}>✕</span>
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
          {([['desktop','🖥', 'Desktop'], ['tablet','⬜', 'Tablet (768px)'], ['mobile','📱', 'Mobile (375px)']] as const).map(([d, icon, label]) => (
            <button key={d} onClick={() => setDevice(d)} title={label} style={{
              padding: '5px 9px', background: device === d ? 'rgba(201,168,76,0.15)' : 'transparent',
              border: 'none', color: device === d ? C.gold : C.muted, fontSize: 13, cursor: 'pointer',
            }}>{icon}</button>
          ))}
        </div>

        {/* Undo/Redo */}
        <div style={{ display: 'flex', gap: 2 }}>
          <button onClick={undo} disabled={undoStack.length === 0} title="Undo (Ctrl+Z)" style={{ padding: '5px 9px', background: 'transparent', border: `1px solid ${C.border}`, borderRadius: 4, color: undoStack.length > 0 ? C.text : '#333', fontSize: 13, cursor: undoStack.length > 0 ? 'pointer' : 'default' }}>↩</button>
          <button onClick={redo} disabled={redoStack.length === 0} title="Redo (Ctrl+Y)" style={{ padding: '5px 9px', background: 'transparent', border: `1px solid ${C.border}`, borderRadius: 4, color: redoStack.length > 0 ? C.text : '#333', fontSize: 13, cursor: redoStack.length > 0 ? 'pointer' : 'default' }}>↪</button>
        </div>

        {/* Meta inputs */}
        {layout && (
          <div style={{ display: 'flex', gap: 6 }}>
            <input value={layout.metaTitle} onChange={e => { const u = {...layout, metaTitle: e.target.value}; setLayout(u); scheduleSave(u) }}
              placeholder="Meta title…" style={{ padding: '4px 8px', background: '#111', border: `1px solid ${C.border}`, borderRadius: 3, color: C.text, fontSize: 11, width: 160 }} />
            <input value={layout.metaDesc} onChange={e => { const u = {...layout, metaDesc: e.target.value}; setLayout(u); scheduleSave(u) }}
              placeholder="Meta description…" style={{ padding: '4px 8px', background: '#111', border: `1px solid ${C.border}`, borderRadius: 3, color: C.text, fontSize: 11, width: 200 }} />
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
        <a href={`/${activeSlug === 'home' ? '' : activeSlug}`} target="_blank" rel="noreferrer"
          style={{ padding: '6px 12px', background: C.gold, color: '#000', borderRadius: 3, fontSize: 11, fontWeight: 700, textDecoration: 'none', letterSpacing: 1, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
          View Live ↗
        </a>
      </div>

      {/* ── Main 3-panel ──────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* LEFT: Section Library ──────────────────────────────────────────── */}
        <div style={{ width: 210, background: C.panel, borderRight: `1px solid ${C.border}`, display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
          <div style={{ padding: '10px', borderBottom: `1px solid ${C.border}` }}>
            <p style={{ color: C.gold, fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', margin: '0 0 7px', fontWeight: 600 }}>Sections</p>
            <input value={libSearch} onChange={e => setLibSearch(e.target.value)} placeholder="Search…"
              style={{ width: '100%', padding: '5px 8px', background: '#111', border: `1px solid ${C.border}`, borderRadius: 3, color: C.text, fontSize: 11, boxSizing: 'border-box' }} />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3, marginTop: 7 }}>
              {categories.map(cat => (
                <button key={cat} onClick={() => setLibCategory(cat)} style={{
                  padding: '2px 7px', borderRadius: 3, border: `1px solid ${libCategory === cat ? C.gold : C.border}`,
                  background: libCategory === cat ? 'rgba(201,168,76,0.12)' : 'transparent',
                  color: libCategory === cat ? C.gold : C.muted, fontSize: 9, cursor: 'pointer', textTransform: 'capitalize',
                }}>{cat}</button>
              ))}
            </div>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '6px' }}>
            {filteredLib.map(item => (
              <button key={item.type} onClick={() => addSection(item.type as SectionType)} style={{
                width: '100%', display: 'flex', alignItems: 'flex-start', gap: 8,
                padding: '8px 9px', marginBottom: 3, borderRadius: 4,
                border: `1px solid ${C.border}`, background: '#111',
                cursor: 'pointer', textAlign: 'left',
              }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = C.gold)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = C.border)}
              >
                <span style={{ fontSize: 16, flexShrink: 0, opacity: 0.8 }}>{item.icon}</span>
                <div>
                  <p style={{ color: C.text, fontSize: 11, fontWeight: 600, margin: '0 0 1px' }}>{item.label}</p>
                  <p style={{ color: C.muted, fontSize: 9, margin: 0, lineHeight: 1.4 }}>{item.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* CENTER: Canvas ─────────────────────────────────────────────────── */}
        <div style={{ flex: 1, overflowY: 'auto', overflowX: 'auto', background: device !== 'desktop' ? '#222' : '#111', position: 'relative' }}>
          <div style={{
            width: canvasWidth ? `${canvasWidth}px` : '100%',
            margin: canvasWidth ? '0 auto' : undefined,
            minHeight: '100%',
            background: '#111',
            boxShadow: canvasWidth ? '0 0 40px rgba(0,0,0,0.8)' : undefined,
          }}>
            {!layout ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 300, color: C.muted }}>Loading page…</div>
            ) : layout.sections.length === 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 300, gap: 12 }}>
                <p style={{ color: C.muted, fontSize: 14 }}>This page is empty</p>
                <button onClick={() => addSection('page-header')} style={{ background: C.gold, color: '#000', padding: '10px 24px', borderRadius: 3, fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', border: 'none', cursor: 'pointer' }}>
                  + Add First Section
                </button>
              </div>
            ) : (
              <div style={{ paddingBottom: 80 }}>
                {layout.sections.map((section, idx) => (
                  <SectionBlock
                    key={section.id}
                    section={section}
                    isSelected={selected === section.id}
                    isFirst={idx === 0}
                    isLast={idx === layout.sections.length - 1}
                    isDragOver={dragOver === section.id}
                    onSelect={() => setSelected(section.id === selected ? null : section.id)}
                    onMoveUp={() => moveSection(section.id, -1)}
                    onMoveDown={() => moveSection(section.id, 1)}
                    onDelete={() => deleteSection(section.id)}
                    onDuplicate={() => {
                      const dup: BuilderSection = { ...section, id: Math.random().toString(36).slice(2, 10) }
                      setLayout(prev => {
                        if (!prev) return prev
                        pushUndo(prev.sections)
                        const arr = [...prev.sections]; arr.splice(idx + 1, 0, dup)
                        const updated = { ...prev, sections: arr }; scheduleSave(updated); return updated
                      })
                    }}
                    onDragOver={() => setDragOver(section.id)}
                    onDragLeave={() => setDragOver(null)}
                    onDrop={(dragId) => handleDrop(dragId, section.id)}
                  />
                ))}
                <div style={{ display: 'flex', justifyContent: 'center', padding: 24 }}>
                  <button onClick={() => setLibOpen(!libOpen)} style={{ border: `2px dashed ${C.border}`, background: 'transparent', color: C.muted, padding: '12px 32px', borderRadius: 5, fontSize: 13, cursor: 'pointer' }}>
                    + Add Section
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Properties Panel ────────────────────────────────────────── */}
        <div style={{ width: selectedSection ? 300 : 0, transition: 'width 0.2s', overflow: 'hidden', borderLeft: `1px solid ${C.border}`, background: C.panel, flexShrink: 0 }}>
          {selectedSection && (
            <PropertiesPanel
              section={selectedSection}
              onChange={(data) => updateSection(selectedSection.id, data)}
              onSettingsChange={(settings) => updateSectionSettings(selectedSection.id, settings)}
              onClose={() => setSelected(null)}
            />
          )}
        </div>
      </div>

      {/* ── New Page Modal ─────────────────────────────────────────────────── */}
      {newPageModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 8, padding: 28, width: 400 }}>
            <h3 style={{ color: C.gold, fontSize: 16, fontWeight: 700, margin: '0 0 20px' }}>Create New Page</h3>
            <label style={{ color: C.muted, fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>Page Title</label>
            <input value={newPageTitle} onChange={e => { setNewPageTitle(e.target.value); if (!newPageSlug) setNewPageSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')) }}
              placeholder="e.g. Our Team" autoFocus
              style={{ width: '100%', padding: '9px 12px', background: '#111', border: `1px solid ${C.border}`, borderRadius: 3, color: C.text, fontSize: 14, marginBottom: 14, boxSizing: 'border-box' }}
            />
            <label style={{ color: C.muted, fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>URL Slug</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 20 }}>
              <span style={{ color: C.muted, fontSize: 13 }}>/</span>
              <input value={newPageSlug} onChange={e => setNewPageSlug(e.target.value)}
                placeholder="our-team"
                style={{ flex: 1, padding: '9px 12px', background: '#111', border: `1px solid ${C.border}`, borderRadius: 3, color: C.text, fontSize: 14, boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={createPage} disabled={!newPageTitle}
                style={{ flex: 1, background: C.gold, color: '#000', padding: '10px', border: 'none', borderRadius: 3, fontSize: 13, fontWeight: 700, cursor: newPageTitle ? 'pointer' : 'not-allowed' }}>
                Create Page
              </button>
              <button onClick={() => setNewPageModal(false)}
                style={{ padding: '10px 16px', background: 'transparent', border: `1px solid ${C.border}`, borderRadius: 3, color: C.muted, fontSize: 13, cursor: 'pointer' }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Section Block ──────────────────────────────────────────────────────────────

interface SectionBlockProps {
  section: BuilderSection
  isSelected: boolean; isFirst: boolean; isLast: boolean; isDragOver: boolean
  onSelect: () => void; onMoveUp: () => void; onMoveDown: () => void
  onDelete: () => void; onDuplicate: () => void
  onDragOver: () => void; onDragLeave: () => void; onDrop: (dragId: string) => void
}

function SectionBlock({ section, isSelected, isFirst, isLast, isDragOver, onSelect, onMoveUp, onMoveDown, onDelete, onDuplicate, onDragOver, onDragLeave, onDrop }: SectionBlockProps) {
  const [hover, setHover] = useState(false)
  const show = isSelected || hover
  const sectionLabel = SECTION_LIBRARY.find(l => l.type === section.type)?.label ?? section.type

  return (
    <div
      draggable
      onDragStart={e => e.dataTransfer.setData('sectionId', section.id)}
      onDragOver={e => { e.preventDefault(); onDragOver() }}
      onDragLeave={onDragLeave}
      onDrop={e => { e.preventDefault(); const id = e.dataTransfer.getData('sectionId'); if (id) onDrop(id) }}
      onClick={onSelect}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative', cursor: 'pointer', transition: 'outline 0.1s',
        outline: isDragOver ? '2px solid #C9A84C' : isSelected ? '2px solid #C9A84C' : hover ? '2px solid rgba(201,168,76,0.4)' : '2px solid transparent',
        outlineOffset: -2,
        background: isDragOver ? 'rgba(201,168,76,0.03)' : undefined,
      }}
    >
      {/* Drag handle + controls */}
      {show && (
        <div
          style={{ position: 'absolute', top: 0, right: 0, zIndex: 20, display: 'flex', alignItems: 'center', gap: 2, background: isSelected ? '#C9A84C' : 'rgba(201,168,76,0.85)', padding: '3px 6px', borderBottomLeftRadius: 4 }}
          onClick={e => e.stopPropagation()}
        >
          <span style={{ color: '#000', fontSize: 10, fontWeight: 700, marginRight: 4, cursor: 'grab' }}>⠿ {sectionLabel}</span>
          <CtrlBtn title="Move up"   onClick={onMoveUp}    disabled={isFirst}>↑</CtrlBtn>
          <CtrlBtn title="Move down" onClick={onMoveDown}  disabled={isLast}>↓</CtrlBtn>
          <CtrlBtn title="Duplicate" onClick={onDuplicate} disabled={false}>⎘</CtrlBtn>
          <CtrlBtn title="Delete"    onClick={onDelete}    disabled={false} danger>✕</CtrlBtn>
        </div>
      )}
      <div style={{ opacity: section.settings.hidden ? 0.25 : 1, pointerEvents: 'none', userSelect: 'none' }}>
        <SectionRenderer section={section} preview />
      </div>
    </div>
  )
}

function CtrlBtn({ children, onClick, disabled, danger, title }: { children: string; onClick: () => void; disabled: boolean; danger?: boolean; title: string }) {
  return (
    <button title={title} disabled={disabled} onClick={e => { e.stopPropagation(); onClick() }} style={{
      background: danger ? 'rgba(220,50,50,0.9)' : 'rgba(0,0,0,0.3)',
      border: 'none', borderRadius: 3, color: danger ? '#fff' : '#000',
      width: 22, height: 22, fontSize: 12, cursor: disabled ? 'default' : 'pointer',
      opacity: disabled ? 0.3 : 1, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {children}
    </button>
  )
}
