'use client'

import { useRef, useState } from 'react'

export interface GalleryImage {
  url: string
  caption?: string
}

interface Props {
  images: GalleryImage[]
  onChange: (images: GalleryImage[]) => void
  folder?: string
}

const inputStyle: React.CSSProperties = {
  width: '100%', background: '#0d0d0d', border: '1px solid #2a2a2a',
  color: '#e0e0e0', borderRadius: 6, padding: '7px 10px', fontSize: 12,
  outline: 'none', boxSizing: 'border-box',
}

export default function MediaGalleryEditor({ images, onChange, folder = 'uploads' }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const upload = async (file: File) => {
    setUploading(true); setError('')
    try {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('folder', folder)
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      const data = await res.json() as { url?: string; error?: string }
      if (!res.ok || !data.url) throw new Error(data.error ?? 'Upload failed')
      onChange([...images, { url: data.url, caption: '' }])
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setUploading(false)
    }
  }

  const updateCaption = (i: number, caption: string) => {
    const next = [...images]
    next[i] = { ...next[i], caption }
    onChange(next)
  }

  const remove = (i: number) => onChange(images.filter((_, idx) => idx !== i))

  const move = (i: number, dir: -1 | 1) => {
    const next = [...images]
    const j = i + dir
    if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]]
    onChange(next)
  }

  return (
    <div>
      {/* Gallery thumbnails */}
      {images.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 8, marginBottom: 10 }}>
          {images.map((img, i) => (
            <div key={i} style={{ background: '#111', borderRadius: 6, border: '1px solid #2a2a2a', overflow: 'hidden' }}>
              <div style={{ position: 'relative', height: 90 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                {i === 0 && (
                  <span style={{ position: 'absolute', top: 4, left: 4, background: '#C9A84C', color: '#000', fontSize: 9, fontWeight: 700, padding: '2px 5px', borderRadius: 3 }}>
                    COVER
                  </span>
                )}
                <button onClick={() => remove(i)} style={{ position: 'absolute', top: 4, right: 4, background: 'rgba(0,0,0,0.7)', border: 'none', color: '#fff', width: 18, height: 18, borderRadius: 3, cursor: 'pointer', fontSize: 11, lineHeight: '18px', textAlign: 'center' }}>×</button>
              </div>
              <div style={{ padding: '6px 6px 4px' }}>
                <input
                  value={img.caption ?? ''}
                  onChange={e => updateCaption(i, e.target.value)}
                  placeholder="Caption (optional)"
                  style={{ ...inputStyle, fontSize: 11 }}
                />
                <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
                  <button onClick={() => move(i, -1)} disabled={i === 0} style={{ flex: 1, background: 'none', border: '1px solid #2a2a2a', color: '#666', borderRadius: 3, padding: '2px 0', fontSize: 11, cursor: i === 0 ? 'default' : 'pointer' }}>←</button>
                  <button onClick={() => move(i, 1)} disabled={i === images.length - 1} style={{ flex: 1, background: 'none', border: '1px solid #2a2a2a', color: '#666', borderRadius: 3, padding: '2px 0', fontSize: 11, cursor: i === images.length - 1 ? 'default' : 'pointer' }}>→</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload zone */}
      <div
        onClick={() => inputRef.current?.click()}
        onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) upload(f) }}
        onDragOver={e => e.preventDefault()}
        style={{ border: '1px dashed #3a3a3a', borderRadius: 6, padding: '10px 16px', cursor: 'pointer', color: uploading ? '#C9A84C' : '#555', fontSize: 12, textAlign: 'center', background: '#0a0a0a', transition: 'border-color 0.15s' }}
        onMouseEnter={e => (e.currentTarget.style.borderColor = '#C9A84C')}
        onMouseLeave={e => (e.currentTarget.style.borderColor = '#3a3a3a')}
      >
        {uploading ? 'Uploading…' : '+ Add photo (click or drag)'}
      </div>
      <input ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }}
        onChange={e => { const f = e.target.files?.[0]; if (f) upload(f); e.target.value = '' }} />
      {error && <p style={{ color: '#ef4444', fontSize: 11, marginTop: 4 }}>{error}</p>}
    </div>
  )
}
