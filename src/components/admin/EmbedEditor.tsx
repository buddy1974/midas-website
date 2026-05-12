'use client'

import { useState } from 'react'

export interface Embed {
  url: string
  title?: string
}

interface Props {
  embeds: Embed[]
  onChange: (embeds: Embed[]) => void
}

const inputStyle: React.CSSProperties = {
  background: '#0d0d0d', border: '1px solid #2a2a2a', color: '#e0e0e0',
  borderRadius: 6, padding: '8px 10px', fontSize: 12, outline: 'none',
  boxSizing: 'border-box', width: '100%',
}

function isYouTube(url: string) {
  return /youtube\.com|youtu\.be/.test(url)
}

export default function EmbedEditor({ embeds, onChange }: Props) {
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')

  const add = () => {
    const trimmed = url.trim()
    if (!trimmed) return
    onChange([...embeds, { url: trimmed, title: title.trim() || undefined }])
    setUrl(''); setTitle('')
  }

  const remove = (i: number) => onChange(embeds.filter((_, idx) => idx !== i))

  const updateTitle = (i: number, t: string) => {
    const next = [...embeds]
    next[i] = { ...next[i], title: t || undefined }
    onChange(next)
  }

  return (
    <div>
      {embeds.length > 0 && (
        <div style={{ marginBottom: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {embeds.map((e, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#0d0d0d', border: '1px solid #2a2a2a', borderRadius: 6, padding: '6px 10px' }}>
              <span style={{ fontSize: 14 }}>{isYouTube(e.url) ? '▶' : '🔗'}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ color: '#888', fontSize: 11, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.url}</p>
                <input
                  value={e.title ?? ''}
                  onChange={ev => updateTitle(i, ev.target.value)}
                  placeholder="Title (optional)"
                  style={{ ...inputStyle, marginTop: 4, fontSize: 11, padding: '4px 8px' }}
                />
              </div>
              <button onClick={() => remove(i)} style={{ background: 'none', border: '1px solid #3f1010', color: '#ef4444', borderRadius: 4, padding: '3px 8px', fontSize: 11, cursor: 'pointer', flexShrink: 0 }}>Remove</button>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', gap: 6 }}>
        <input
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder="YouTube URL or iframe src…"
          style={{ ...inputStyle, flex: 1 }}
          onKeyDown={e => e.key === 'Enter' && add()}
        />
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Title (optional)"
          style={{ ...inputStyle, width: 140 }}
          onKeyDown={e => e.key === 'Enter' && add()}
        />
        <button onClick={add} style={{ background: '#C9A84C', color: '#000', border: 'none', borderRadius: 6, padding: '8px 14px', fontSize: 12, fontWeight: 700, cursor: 'pointer', flexShrink: 0 }}>Add</button>
      </div>
    </div>
  )
}
