'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

interface FieldUpdate {
  page: string
  section: string
  field: string
  value: string
  content_type?: string
}

export function usePageEditor(page: string) {
  const [content, setContent] = useState<Record<string, string>>({})
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved')
  const [loaded, setLoaded] = useState(false)
  const pendingRef = useRef<Record<string, FieldUpdate>>({})
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    fetch(`/api/admin/editor?page=${encodeURIComponent(page)}`)
      .then(r => r.json())
      .then((data: Record<string, string>) => {
        setContent(data)
        setLoaded(true)
      })
      .catch(() => setLoaded(true))
  }, [page])

  const save = useCallback(async () => {
    const updates = Object.values(pendingRef.current)
    if (updates.length === 0) return
    setSaveStatus('saving')
    pendingRef.current = {}
    try {
      await fetch('/api/admin/editor/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ updates }),
      })
      setSaveStatus('saved')
    } catch {
      setSaveStatus('unsaved')
    }
  }, [])

  const update = useCallback((
    section: string,
    field: string,
    value: string,
    content_type = 'text'
  ) => {
    const key = `${section}.${field}`
    setContent(prev => ({ ...prev, [key]: value }))
    setSaveStatus('unsaved')
    pendingRef.current[key] = { page, section, field, value, content_type }
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => { void save() }, 1500)
  }, [page, save])

  const get = useCallback((
    section: string,
    field: string,
    fallback = ''
  ): string => {
    return content[`${section}.${field}`] ?? fallback
  }, [content])

  return { content, get, update, save, saveStatus, loaded }
}
