'use client'

import { useState, useRef } from 'react'

interface EditableFieldProps {
  value: string
  onChange: (val: string) => void
  type?: 'text' | 'textarea' | 'image'
  label?: string
  placeholder?: string
  className?: string
  multiline?: boolean
}

export function EditableField({
  value,
  onChange,
  type = 'text',
  label,
  placeholder = 'Click to edit...',
  className = '',
  multiline = false,
}: EditableFieldProps) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)
  const inputRef = useRef<HTMLTextAreaElement | HTMLInputElement>(null)

  const handleClick = () => {
    setDraft(value)
    setEditing(true)
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  const handleBlur = () => {
    setEditing(false)
    if (draft !== value) onChange(draft)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault()
      handleBlur()
    }
    if (e.key === 'Escape') {
      setDraft(value)
      setEditing(false)
    }
  }

  if (type === 'image') {
    return (
      <div style={{ position: 'relative' }}>
        {label && <p style={{ color: '#888', fontSize: 10, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>{label}</p>}
        {value && (
          <div style={{ marginBottom: 8, borderRadius: 4, overflow: 'hidden', maxHeight: 120 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value} alt="preview" style={{ width: '100%', height: 120, objectFit: 'cover' }} />
          </div>
        )}
        <input
          type="url"
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onBlur={() => { if (draft !== value) onChange(draft) }}
          placeholder="https://... image URL"
          style={{
            width: '100%', background: '#0d0d0d', border: '1px solid #2a2a2a',
            color: '#e0e0e0', borderRadius: 4, padding: '7px 10px', fontSize: 12, outline: 'none', boxSizing: 'border-box',
          }}
        />
      </div>
    )
  }

  const sharedEditStyle: React.CSSProperties = {
    width: '100%', background: 'rgba(201,168,76,0.08)',
    border: '1px solid #C9A84C', color: '#e0e0e0',
    borderRadius: 4, padding: '6px 10px', fontSize: 13,
    outline: 'none', resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box',
  }

  if (editing) {
    if (multiline) {
      return (
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          rows={3}
          style={sharedEditStyle}
          autoFocus
        />
      )
    }
    return (
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        value={draft}
        onChange={e => setDraft(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        style={{ ...sharedEditStyle, resize: undefined }}
        autoFocus
      />
    )
  }

  return (
    <div
      className={className}
      onClick={handleClick}
      style={{
        cursor: 'pointer',
        padding: '4px 6px',
        borderRadius: 4,
        border: '1px dashed transparent',
        transition: 'all 0.15s',
        minHeight: 24,
        color: value ? 'inherit' : '#555',
      }}
      onMouseEnter={e => {
        ;(e.currentTarget as HTMLElement).style.borderColor = '#C9A84C'
        ;(e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.05)'
      }}
      onMouseLeave={e => {
        ;(e.currentTarget as HTMLElement).style.borderColor = 'transparent'
        ;(e.currentTarget as HTMLElement).style.background = 'transparent'
      }}
    >
      {label && <span style={{ display: 'block', color: '#666', fontSize: 9, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 2 }}>{label}</span>}
      {value || <span style={{ color: '#555', fontStyle: 'italic' }}>{placeholder}</span>}
    </div>
  )
}
