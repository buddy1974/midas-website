'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import type { BuilderSection, PageBuilderLayout, SectionType } from '@/lib/builder-types'
import { SECTION_LIBRARY } from '@/lib/builder-types'
import { SECTION_DEFAULTS } from '@/lib/builder-defaults'
import { DEFAULT_SETTINGS } from '@/lib/builder-types'
import SectionRenderer from '@/components/builder/SectionRenderer'
import PropertiesPanel from './PropertiesPanel'

// ── Page switcher ─────────────────────────────────────────────────────────────

interface PageMeta { slug: string; title: string }

// ── Builder state ─────────────────────────────────────────────────────────────

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error'

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

  // ── Setup DB on first load ────────────────────────────────────────────────

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

  // ── Load active page ──────────────────────────────────────────────────────

  useEffect(() => {
    if (!setupDone) return
    setLayout(null)
    setSelected(null)
    fetch(`/api/admin/builder/${activeSlug}`)
      .then(r => r.json())
      .then((d: PageBuilderLayout) => setLayout(d))
      .catch(console.error)
  }, [activeSlug, setupDone])

  // ── Auto-save ─────────────────────────────────────────────────────────────

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
      } catch {
        setSaveStatus('error')
      }
    }, 1500)
  }, [])

  // ── Mutations ─────────────────────────────────────────────────────────────

  const updateLayout = useCallback((newSections: BuilderSection[]) => {
    setLayout(prev => {
      if (!prev) return prev
      const updated = { ...prev, sections: newSections }
      scheduleSave(updated)
      return updated
    })
  }, [scheduleSave])

  const addSection = useCallback((type: SectionType) => {
    const newSection: BuilderSection = {
      id: Math.random().toString(36).slice(2, 10),
      type,
      data: SECTION_DEFAULTS[type] as Record<string, string>,
      settings: { ...DEFAULT_SETTINGS[type] },
    }
    setLayout(prev => {
      if (!prev) return prev
      const updated = { ...prev, sections: [...prev.sections, newSection] }
      scheduleSave(updated)
      return updated
    })
    setSelected(newSection.id)
    setLibOpen(false)
  }, [scheduleSave])

  const moveSection = useCallback((id: string, dir: -1 | 1) => {
    setLayout(prev => {
      if (!prev) return prev
      const idx = prev.sections.findIndex(s => s.id === id)
      if (idx < 0) return prev
      const newIdx = idx + dir
      if (newIdx < 0 || newIdx >= prev.sections.length) return prev
      const arr = [...prev.sections]
      ;[arr[idx], arr[newIdx]] = [arr[newIdx], arr[idx]]
      const updated = { ...prev, sections: arr }
      scheduleSave(updated)
      return updated
    })
  }, [scheduleSave])

  const deleteSection = useCallback((id: string) => {
    setLayout(prev => {
      if (!prev) return prev
      const updated = { ...prev, sections: prev.sections.filter(s => s.id !== id) }
      scheduleSave(updated)
      return updated
    })
    if (selected === id) setSelected(null)
  }, [selected, scheduleSave])

  const updateSection = useCallback((id: string, data: Record<string, string>) => {
    setLayout(prev => {
      if (!prev) return prev
      const updated = {
        ...prev,
        sections: prev.sections.map(s => s.id === id ? { ...s, data } : s),
      }
      scheduleSave(updated)
      return updated
    })
  }, [scheduleSave])

  const updateSectionSettings = useCallback((id: string, settings: BuilderSection['settings']) => {
    setLayout(prev => {
      if (!prev) return prev
      const updated = {
        ...prev,
        sections: prev.sections.map(s => s.id === id ? { ...s, settings } : s),
      }
      scheduleSave(updated)
      return updated
    })
  }, [scheduleSave])

  // ── Create new page ───────────────────────────────────────────────────────

  const createPage = useCallback(async () => {
    if (!newPageTitle) return
    const res = await fetch('/api/admin/builder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newPageTitle, slug: newPageSlug || newPageTitle }),
    })
    if (res.ok) {
      const { slug } = await res.json() as { slug: string }
      setPages(p => [...p, { slug, title: newPageTitle }])
      setActiveSlug(slug)
      setNewPageModal(false)
      setNewPageTitle('')
      setNewPageSlug('')
    }
  }, [newPageTitle, newPageSlug])

  // ── Derived ───────────────────────────────────────────────────────────────

  const selectedSection = layout?.sections.find(s => s.id === selected) ?? null

  const filteredLib = SECTION_LIBRARY.filter(item => {
    const matchCat = libCategory === 'all' || item.category === libCategory
    const matchSearch = !libSearch || item.label.toLowerCase().includes(libSearch.toLowerCase()) || item.description.toLowerCase().includes(libSearch.toLowerCase())
    return matchCat && matchSearch
  })

  const categories = ['all', 'hero', 'content', 'layout', 'data', 'utility']

  // ── Colors ────────────────────────────────────────────────────────────────
  const C = { bg: '#0a0a0a', panel: '#0d0d0d', border: '#1a1a1a', gold: '#C9A84C', text: '#e0e0e0', muted: '#666' }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', flexDirection: 'column', background: C.bg, color: C.text, overflow: 'hidden' }}>

      {/* ── Top Bar ─────────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '0 16px', height: 52, background: C.panel, borderBottom: `1px solid ${C.border}`, flexShrink: 0, zIndex: 10 }}>
        {/* Logo */}
        <span style={{ color: C.gold, fontSize: 14, fontWeight: 700, letterSpacing: 2, marginRight: 8 }}>PAGE BUILDER</span>

        {/* Page selector */}
        <div style={{ display: 'flex', gap: 4, flex: 1, overflowX: 'auto' }}>
          {pages.map(p => (
            <button key={p.slug} onClick={() => setActiveSlug(p.slug)} style={{
              padding: '5px 12px', borderRadius: 4, border: `1px solid ${activeSlug === p.slug ? C.gold : C.border}`,
              background: activeSlug === p.slug ? 'rgba(201,168,76,0.12)' : 'transparent',
              color: activeSlug === p.slug ? C.gold : C.muted,
              fontSize: 12, cursor: 'pointer', whiteSpace: 'nowrap', fontWeight: activeSlug === p.slug ? 600 : 400,
            }}>
              {p.title}
            </button>
          ))}
          <button onClick={() => setNewPageModal(true)} style={{ padding: '5px 12px', borderRadius: 4, border: `1px dashed ${C.border}`, background: 'transparent', color: C.muted, fontSize: 12, cursor: 'pointer' }}>
            + New Page
          </button>
        </div>

        {/* Meta title / desc quick edit */}
        {layout && (
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              value={layout.metaTitle}
              onChange={e => {
                const updated = { ...layout, metaTitle: e.target.value }
                setLayout(updated)
                scheduleSave(updated)
              }}
              placeholder="Meta title..."
              style={{ padding: '4px 8px', background: '#111', border: `1px solid ${C.border}`, borderRadius: 3, color: C.text, fontSize: 11, width: 180 }}
            />
            <input
              value={layout.metaDesc}
              onChange={e => {
                const updated = { ...layout, metaDesc: e.target.value }
                setLayout(updated)
                scheduleSave(updated)
              }}
              placeholder="Meta description..."
              style={{ padding: '4px 8px', background: '#111', border: `1px solid ${C.border}`, borderRadius: 3, color: C.text, fontSize: 11, width: 240 }}
            />
          </div>
        )}

        {/* Save status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
          {saveStatus === 'saving' && <><span style={{ width: 6, height: 6, borderRadius: '50%', background: '#f0a500', display: 'inline-block' }} /> Saving…</>}
          {saveStatus === 'saved'  && <><span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4caf50', display: 'inline-block' }} /> Saved</>}
          {saveStatus === 'error'  && <><span style={{ width: 6, height: 6, borderRadius: '50%', background: '#e55', display: 'inline-block' }} /> Error</>}
          {saveStatus === 'idle'   && <span style={{ color: C.muted }}>Auto-saves</span>}
        </div>

        {/* Preview button */}
        <a href={`/${activeSlug === 'home' ? '' : activeSlug}`} target="_blank" rel="noreferrer"
          style={{ padding: '6px 14px', background: C.gold, color: '#000', borderRadius: 3, fontSize: 11, fontWeight: 700, textDecoration: 'none', letterSpacing: 1, textTransform: 'uppercase' }}>
          View Live ↗
        </a>
      </div>

      {/* ── Main 3-panel layout ──────────────────────────────────────────── */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* LEFT: Section Library ─────────────────────────────────────────── */}
        <div style={{ width: 220, background: C.panel, borderRight: `1px solid ${C.border}`, display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
          <div style={{ padding: '12px', borderBottom: `1px solid ${C.border}` }}>
            <p style={{ color: C.gold, fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', margin: '0 0 8px', fontWeight: 600 }}>Section Library</p>
            <input
              value={libSearch}
              onChange={e => setLibSearch(e.target.value)}
              placeholder="Search sections…"
              style={{ width: '100%', padding: '6px 8px', background: '#111', border: `1px solid ${C.border}`, borderRadius: 3, color: C.text, fontSize: 12, boxSizing: 'border-box' }}
            />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 8 }}>
              {categories.map(cat => (
                <button key={cat} onClick={() => setLibCategory(cat)} style={{
                  padding: '3px 8px', borderRadius: 3, border: `1px solid ${libCategory === cat ? C.gold : C.border}`,
                  background: libCategory === cat ? 'rgba(201,168,76,0.12)' : 'transparent',
                  color: libCategory === cat ? C.gold : C.muted,
                  fontSize: 10, cursor: 'pointer', textTransform: 'capitalize',
                }}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '8px' }}>
            {filteredLib.map(item => (
              <button key={item.type} onClick={() => addSection(item.type as SectionType)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'flex-start', gap: 10,
                  padding: '10px 10px', marginBottom: 4, borderRadius: 5,
                  border: `1px solid ${C.border}`, background: '#111',
                  cursor: 'pointer', textAlign: 'left', transition: 'border-color 0.15s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = C.gold }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = C.border }}
              >
                <span style={{ fontSize: 18, flexShrink: 0, opacity: 0.8 }}>{item.icon}</span>
                <div>
                  <p style={{ color: C.text, fontSize: 12, fontWeight: 600, margin: '0 0 2px' }}>{item.label}</p>
                  <p style={{ color: C.muted, fontSize: 10, margin: 0, lineHeight: 1.4 }}>{item.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* CENTER: Canvas ───────────────────────────────────────────────── */}
        <div style={{ flex: 1, overflowY: 'auto', background: '#111', position: 'relative' }}>
          {!layout ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: C.muted }}>
              Loading page…
            </div>
          ) : layout.sections.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 12 }}>
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
                  onSelect={() => setSelected(section.id === selected ? null : section.id)}
                  onMoveUp={() => moveSection(section.id, -1)}
                  onMoveDown={() => moveSection(section.id, 1)}
                  onDelete={() => deleteSection(section.id)}
                  onDuplicate={() => {
                    const dup: BuilderSection = { ...section, id: Math.random().toString(36).slice(2, 10) }
                    setLayout(prev => {
                      if (!prev) return prev
                      const arr = [...prev.sections]
                      arr.splice(idx + 1, 0, dup)
                      const updated = { ...prev, sections: arr }
                      scheduleSave(updated)
                      return updated
                    })
                  }}
                />
              ))}

              {/* Add section button at bottom */}
              <div style={{ display: 'flex', justifyContent: 'center', padding: 24 }}>
                <button onClick={() => setLibOpen(!libOpen)} style={{ border: `2px dashed ${C.border}`, background: 'transparent', color: C.muted, padding: '12px 32px', borderRadius: 5, fontSize: 13, cursor: 'pointer' }}>
                  + Add Section
                </button>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT: Properties Panel ──────────────────────────────────────── */}
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

      {/* ── New Page Modal ───────────────────────────────────────────────── */}
      {newPageModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 8, padding: 28, width: 400 }}>
            <h3 style={{ color: C.gold, fontSize: 16, fontWeight: 700, margin: '0 0 20px' }}>Create New Page</h3>
            <label style={{ color: C.muted, fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>Page Title</label>
            <input value={newPageTitle} onChange={e => setNewPageTitle(e.target.value)}
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

// ── Section block in canvas ────────────────────────────────────────────────

interface SectionBlockProps {
  section: BuilderSection
  isSelected: boolean
  isFirst: boolean
  isLast: boolean
  onSelect: () => void
  onMoveUp: () => void
  onMoveDown: () => void
  onDelete: () => void
  onDuplicate: () => void
}

function SectionBlock({ section, isSelected, isFirst, isLast, onSelect, onMoveUp, onMoveDown, onDelete, onDuplicate }: SectionBlockProps) {
  const [hover, setHover] = useState(false)
  const show = isSelected || hover

  const sectionLabel = SECTION_LIBRARY.find(l => l.type === section.type)?.label ?? section.type

  return (
    <div
      style={{
        position: 'relative',
        outline: isSelected ? '2px solid #C9A84C' : hover ? '2px solid rgba(201,168,76,0.4)' : '2px solid transparent',
        outlineOffset: -2,
        cursor: 'pointer',
        transition: 'outline 0.1s',
      }}
      onClick={onSelect}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Controls bar */}
      {show && (
        <div
          style={{
            position: 'absolute', top: 0, right: 0, zIndex: 20,
            display: 'flex', alignItems: 'center', gap: 2,
            background: isSelected ? '#C9A84C' : 'rgba(201,168,76,0.85)',
            padding: '3px 6px', borderBottomLeftRadius: 4,
          }}
          onClick={e => e.stopPropagation()}
        >
          <span style={{ color: '#000', fontSize: 11, fontWeight: 700, marginRight: 6 }}>{sectionLabel}</span>
          <CtrlBtn title="Move up"    onClick={onMoveUp}    disabled={isFirst}>↑</CtrlBtn>
          <CtrlBtn title="Move down"  onClick={onMoveDown}  disabled={isLast}>↓</CtrlBtn>
          <CtrlBtn title="Duplicate"  onClick={onDuplicate} disabled={false}>⎘</CtrlBtn>
          <CtrlBtn title="Delete"     onClick={onDelete}    disabled={false} danger>✕</CtrlBtn>
        </div>
      )}

      {/* Actual section render */}
      <div style={{ opacity: section.settings.hidden ? 0.3 : 1, pointerEvents: 'none', userSelect: 'none' }}>
        <SectionRenderer section={section} preview />
      </div>
    </div>
  )
}

function CtrlBtn({ children, onClick, disabled, danger, title }: {
  children: string; onClick: () => void; disabled: boolean; danger?: boolean; title: string
}) {
  return (
    <button
      title={title}
      disabled={disabled}
      onClick={e => { e.stopPropagation(); onClick() }}
      style={{
        background: danger ? 'rgba(220,50,50,0.9)' : 'rgba(0,0,0,0.3)',
        border: 'none', borderRadius: 3, color: danger ? '#fff' : '#000',
        width: 22, height: 22, fontSize: 12, cursor: disabled ? 'default' : 'pointer',
        opacity: disabled ? 0.3 : 1, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      {children}
    </button>
  )
}
