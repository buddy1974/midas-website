'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import type { BuilderSection, PageBuilderLayout, SectionType } from '@/lib/builder-types'
import { SECTION_DEFAULTS } from '@/lib/builder-defaults'
import { DEFAULT_SETTINGS } from '@/lib/builder-types'

export interface PageMeta { slug: string; title: string }
export type SaveStatus = 'idle' | 'saving' | 'saved' | 'error'
export type Device = 'desktop' | 'tablet' | 'mobile'

export function useBuilderState() {
  const [pages, setPages] = useState<PageMeta[]>([])
  const [activeSlug, setActiveSlug] = useState<string>('home')
  const [layout, setLayout] = useState<PageBuilderLayout | null>(null)
  const [selected, setSelected] = useState<string | null>(null)
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle')
  const [device, setDevice] = useState<Device>('desktop')
  const [undoStack, setUndoStack] = useState<BuilderSection[][]>([])
  const [redoStack, setRedoStack] = useState<BuilderSection[][]>([])
  const [pageDropdown, setPageDropdown] = useState(false)
  const [dragOver, setDragOver] = useState<string | null>(null)
  const [newPageModal, setNewPageModal] = useState(false)
  const [newPageTitle, setNewPageTitle] = useState('')
  const [newPageSlug, setNewPageSlug] = useState('')
  const [setupDone, setSetupDone] = useState(false)
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pageDropRef = useRef<HTMLDivElement>(null)

  // ── Setup DB + load pages ──────────────────────────────────────────────────
  useEffect(() => {
    fetch('/api/admin/builder/setup', { method: 'POST' })
      .then(() => { setSetupDone(true); return fetch('/api/admin/builder') })
      .then(r => r.json())
      .then((d: PageMeta[]) => setPages(d))
      .catch(console.error)
  }, [])

  // ── Load active page ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!setupDone) return
    let cancelled = false
    queueMicrotask(() => {
      if (cancelled) return
      setLayout(null); setSelected(null); setUndoStack([]); setRedoStack([])
      fetch(`/api/admin/builder/${activeSlug}`)
        .then(r => r.json())
        .then((d: PageBuilderLayout & { error?: string }) => {
          if (cancelled) return
          if (d.error) { console.error('[builder] load error:', d.error); return }
          const sections = Array.isArray(d.sections)
            ? d.sections
            : typeof d.sections === 'string' ? JSON.parse(d.sections) : []
          setLayout({ ...d, sections })
        })
        .catch(console.error)
    })
    return () => { cancelled = true }
  }, [activeSlug, setupDone])

  // ── Close page dropdown on outside click ──────────────────────────────────
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (pageDropRef.current && !pageDropRef.current.contains(e.target as Node))
        setPageDropdown(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // ── Auto-save ──────────────────────────────────────────────────────────────
  const scheduleSave = useCallback((newLayout: PageBuilderLayout) => {
    if (saveTimer.current) clearTimeout(saveTimer.current)
    setSaveStatus('saving')
    saveTimer.current = setTimeout(async () => {
      try {
        await fetch(`/api/admin/builder/${newLayout.slug}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sections: newLayout.sections,
            title: newLayout.title,
            metaTitle: newLayout.metaTitle,
            metaDesc: newLayout.metaDesc,
          }),
        })
        setSaveStatus('saved')
        setTimeout(() => setSaveStatus('idle'), 2000)
      } catch { setSaveStatus('error') }
    }, 1500)
  }, [])

  // ── Undo / Redo ────────────────────────────────────────────────────────────
  const pushUndo = useCallback((sections: BuilderSection[]) => {
    setUndoStack(u => [...u.slice(-29), sections])
    setRedoStack([])
  }, [])

  const undo = useCallback(() => {
    if (undoStack.length === 0 || !layout) return
    const prev = undoStack[undoStack.length - 1]
    setRedoStack(r => [...r, layout.sections])
    setUndoStack(u => u.slice(0, -1))
    const updated = { ...layout, sections: prev }
    setLayout(updated)
    scheduleSave(updated)
  }, [undoStack, layout, scheduleSave])

  const redo = useCallback(() => {
    if (redoStack.length === 0 || !layout) return
    const next = redoStack[redoStack.length - 1]
    setUndoStack(u => [...u, layout.sections])
    setRedoStack(r => r.slice(0, -1))
    const updated = { ...layout, sections: next }
    setLayout(updated)
    scheduleSave(updated)
  }, [redoStack, layout, scheduleSave])

  // ── Keyboard shortcuts ─────────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) { e.preventDefault(); undo() }
      if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) { e.preventDefault(); redo() }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [undo, redo])

  // ── Section mutations ──────────────────────────────────────────────────────
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
  }, [scheduleSave, pushUndo])

  const moveSection = useCallback((id: string, dir: -1 | 1) => {
    setLayout(prev => {
      if (!prev) return prev
      const idx = prev.sections.findIndex(s => s.id === id)
      if (idx < 0) return prev
      const newIdx = idx + dir
      if (newIdx < 0 || newIdx >= prev.sections.length) return prev
      pushUndo(prev.sections)
      const arr = [...prev.sections];
      [arr[idx], arr[newIdx]] = [arr[newIdx], arr[idx]]
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
    setSelected(sel => sel === id ? null : sel)
  }, [scheduleSave, pushUndo])

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

  const duplicateSection = useCallback((id: string) => {
    setLayout(prev => {
      if (!prev) return prev
      const idx = prev.sections.findIndex(s => s.id === id)
      if (idx < 0) return prev
      pushUndo(prev.sections)
      const dup: BuilderSection = { ...prev.sections[idx], id: Math.random().toString(36).slice(2, 10) }
      const arr = [...prev.sections]
      arr.splice(idx + 1, 0, dup)
      const updated = { ...prev, sections: arr }
      scheduleSave(updated)
      return updated
    })
  }, [scheduleSave, pushUndo])

  // ── Drag-and-drop ──────────────────────────────────────────────────────────
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

  // ── Page management ────────────────────────────────────────────────────────
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

  const deletePage = useCallback(async (slug: string, title: string) => {
    if (!confirm(`Delete page "${title}"? This cannot be undone.`)) return
    await fetch(`/api/admin/builder/${slug}`, { method: 'DELETE' })
    setPages(p => p.filter(x => x.slug !== slug))
    if (activeSlug === slug) setActiveSlug('home')
  }, [activeSlug])

  return {
    // state
    pages, activeSlug, setActiveSlug,
    layout, setLayout, scheduleSave,
    selected, setSelected,
    saveStatus,
    device, setDevice,
    undoStack, redoStack,
    pageDropdown, setPageDropdown, pageDropRef,
    dragOver, setDragOver,
    newPageModal, setNewPageModal,
    newPageTitle, setNewPageTitle,
    newPageSlug, setNewPageSlug,
    // actions
    undo, redo,
    addSection,
    moveSection, deleteSection,
    updateSection, updateSectionSettings, duplicateSection,
    handleDrop,
    createPage, deletePage,
  }
}

export type BuilderState = ReturnType<typeof useBuilderState>
