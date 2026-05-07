'use client'

import Link from 'next/link'

interface EditorToolbarProps {
  page: string
  onPageChange: (page: string) => void
  saveStatus: 'saved' | 'saving' | 'unsaved'
  onSaveNow: () => void
  onMenuEditor: () => void
  onPagesManager: () => void
  pages: { key: string; label: string }[]
}

const STATUS_COLORS: Record<'saved' | 'saving' | 'unsaved', string> = {
  saved: '#22c55e',
  saving: '#C9A84C',
  unsaved: '#ef4444',
}

const STATUS_LABELS: Record<'saved' | 'saving' | 'unsaved', string> = {
  saved: 'All saved',
  saving: 'Saving...',
  unsaved: 'Unsaved changes',
}

export default function EditorToolbar({
  page,
  onPageChange,
  saveStatus,
  onSaveNow,
  onMenuEditor,
  onPagesManager,
  pages,
}: EditorToolbarProps) {
  const color = STATUS_COLORS[saveStatus]
  const label = STATUS_LABELS[saveStatus]

  // Derive preview URL from page key
  const previewHref = page === 'home' ? '/' : `/${page}`

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 52,
        background: '#080809',
        borderBottom: '1px solid #1a1a1a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        zIndex: 200,
        gap: 12,
      }}
    >
      {/* Left — page selector */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
        <span style={{ color: '#C9A84C', fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
          MIDAS EDITOR
        </span>
        <select
          value={page}
          onChange={e => onPageChange(e.target.value)}
          style={{
            background: '#111',
            border: '1px solid #2a2a2a',
            color: '#e0e0e0',
            borderRadius: 4,
            padding: '5px 28px 5px 10px',
            fontSize: 12,
            cursor: 'pointer',
            outline: 'none',
            appearance: 'none',
            WebkitAppearance: 'none',
          }}
        >
          {pages.map(p => (
            <option key={p.key} value={p.key}>
              {p.label}
            </option>
          ))}
        </select>
      </div>

      {/* Center — save status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: color,
            display: 'inline-block',
            flexShrink: 0,
          }}
        />
        <span style={{ color, fontSize: 12 }}>{label}</span>
      </div>

      {/* Right — actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        <button
          onClick={onSaveNow}
          style={{
            background: '#C9A84C',
            color: '#000',
            border: 'none',
            borderRadius: 4,
            padding: '6px 14px',
            fontSize: 12,
            fontWeight: 700,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          Save Now
        </button>

        <Link
          href={previewHref}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: 'none',
            border: '1px solid #2a2a2a',
            color: '#888',
            borderRadius: 4,
            padding: '5px 12px',
            fontSize: 12,
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          Preview ↗
        </Link>

        <button
          onClick={onMenuEditor}
          style={{
            background: 'none',
            border: '1px solid #2a2a2a',
            color: '#888',
            borderRadius: 4,
            padding: '5px 12px',
            fontSize: 12,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          Menu
        </button>

        <button
          onClick={onPagesManager}
          style={{
            background: 'none',
            border: '1px solid #2a2a2a',
            color: '#888',
            borderRadius: 4,
            padding: '5px 12px',
            fontSize: 12,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          Pages
        </button>

        <Link
          href="/admin"
          style={{
            background: 'none',
            border: '1px solid #1a1a1a',
            color: '#555',
            borderRadius: 4,
            padding: '5px 12px',
            fontSize: 12,
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          Exit
        </Link>
      </div>
    </div>
  )
}
