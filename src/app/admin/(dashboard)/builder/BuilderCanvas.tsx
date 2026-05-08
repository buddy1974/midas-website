'use client'

import { useState } from 'react'
import type { BuilderSection } from '@/lib/builder-types'
import { SECTION_LIBRARY } from '@/lib/builder-types'
import SectionRenderer from '@/components/builder/SectionRenderer'
import type { BuilderState } from './hooks/useBuilderState'

const C = { border: '#1a1a1a', gold: '#C9A84C', text: '#e0e0e0', muted: '#666' }

interface Props {
  state: BuilderState
  canvasWidth: number | null
}

export default function BuilderCanvas({ state, canvasWidth }: Props) {
  const {
    layout,
    selected, setSelected,
    dragOver, setDragOver,
    device,
    addSection,
    moveSection, deleteSection, duplicateSection,
    handleDrop,
  } = state

  return (
    <div style={{ flex: 1, overflowY: 'auto', overflowX: 'auto', background: device !== 'desktop' ? '#222' : '#111', position: 'relative' }}>
      <div style={{
        width: canvasWidth ? `${canvasWidth}px` : '100%',
        margin: canvasWidth ? '0 auto' : undefined,
        minHeight: '100%',
        background: '#111',
        boxShadow: canvasWidth ? '0 0 40px rgba(0,0,0,0.8)' : undefined,
      }}>
        {!layout ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 300, color: C.muted }}>
            Loading page…
          </div>
        ) : layout.sections.length === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 300, gap: 12 }}>
            <p style={{ color: C.muted, fontSize: 14 }}>This page is empty</p>
            <button
              onClick={() => addSection('page-header')}
              style={{ background: C.gold, color: '#000', padding: '10px 24px', borderRadius: 3, fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', border: 'none', cursor: 'pointer' }}
            >
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
                onDuplicate={() => duplicateSection(section.id)}
                onDragOver={() => setDragOver(section.id)}
                onDragLeave={() => setDragOver(null)}
                onDrop={(dragId) => handleDrop(dragId, section.id)}
              />
            ))}
            <div style={{ display: 'flex', justifyContent: 'center', padding: 24 }}>
              <button
                onClick={() => addSection('page-header')}
                style={{ border: `2px dashed ${C.border}`, background: 'transparent', color: C.muted, padding: '12px 32px', borderRadius: 5, fontSize: 13, cursor: 'pointer' }}
              >
                + Add Section
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ── SectionBlock ───────────────────────────────────────────────────────────────

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

// ── CtrlBtn ────────────────────────────────────────────────────────────────────

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
