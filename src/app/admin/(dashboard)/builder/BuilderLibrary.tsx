'use client'

import { useState } from 'react'
import type { SectionType } from '@/lib/builder-types'
import { SECTION_LIBRARY } from '@/lib/builder-types'
import type { BuilderState } from './hooks/useBuilderState'

const C = { border: '#1a1a1a', gold: '#C9A84C', text: '#e0e0e0', muted: '#666', panel: '#0d0d0d' }
const CATEGORIES = ['all', 'hero', 'content', 'layout', 'data', 'utility']

interface Props { state: BuilderState }

export default function BuilderLibrary({ state }: Props) {
  const { addSection } = state
  const [libSearch, setLibSearch] = useState('')
  const [libCategory, setLibCategory] = useState<string>('all')

  const filtered = SECTION_LIBRARY.filter(item => {
    const matchCat    = libCategory === 'all' || item.category === libCategory
    const matchSearch = !libSearch
      || item.label.toLowerCase().includes(libSearch.toLowerCase())
      || item.description.toLowerCase().includes(libSearch.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div style={{ width: 210, background: C.panel, borderRight: `1px solid ${C.border}`, display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
      <div style={{ padding: '10px', borderBottom: `1px solid ${C.border}` }}>
        <p style={{ color: C.gold, fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', margin: '0 0 7px', fontWeight: 600 }}>Sections</p>
        <input
          value={libSearch}
          onChange={e => setLibSearch(e.target.value)}
          placeholder="Search…"
          style={{ width: '100%', padding: '5px 8px', background: '#111', border: `1px solid ${C.border}`, borderRadius: 3, color: C.text, fontSize: 11, boxSizing: 'border-box' }}
        />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3, marginTop: 7 }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setLibCategory(cat)} style={{
              padding: '2px 7px', borderRadius: 3,
              border: `1px solid ${libCategory === cat ? C.gold : C.border}`,
              background: libCategory === cat ? 'rgba(201,168,76,0.12)' : 'transparent',
              color: libCategory === cat ? C.gold : C.muted,
              fontSize: 9, cursor: 'pointer', textTransform: 'capitalize',
            }}>{cat}</button>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '6px' }}>
        {filtered.map(item => (
          <button
            key={item.type}
            onClick={() => addSection(item.type as SectionType)}
            style={{ width: '100%', display: 'flex', alignItems: 'flex-start', gap: 8, padding: '8px 9px', marginBottom: 3, borderRadius: 4, border: `1px solid ${C.border}`, background: '#111', cursor: 'pointer', textAlign: 'left' }}
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
  )
}
