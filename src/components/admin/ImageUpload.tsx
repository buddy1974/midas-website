'use client'

import { useRef, useState } from 'react'

interface Props {
  value: string
  onChange: (url: string) => void
  folder?: string
  label?: string
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: '#0d0d0d',
  border: '1px solid #2a2a2a',
  color: '#e0e0e0',
  borderRadius: 6,
  padding: '9px 12px',
  fontSize: 13,
  outline: 'none',
  boxSizing: 'border-box',
}

export default function ImageUpload({ value, onChange, folder = 'uploads', label = 'Cover Image' }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')

  const handleFile = async (file: File) => {
    setUploading(true)
    setUploadError('')
    try {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('folder', folder)
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      const data = await res.json() as { url?: string; error?: string }
      if (!res.ok || !data.url) throw new Error(data.error ?? 'Upload failed')
      onChange(data.url)
    } catch (e) {
      setUploadError((e as Error).message)
    } finally {
      setUploading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  return (
    <div>
      {/* Preview */}
      {value && (
        <div style={{ marginBottom: 8, position: 'relative', display: 'inline-block' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="preview"
            style={{ maxHeight: 160, maxWidth: '100%', borderRadius: 6, border: '1px solid #2a2a2a', display: 'block' }}
          />
          <button
            type="button"
            onClick={() => onChange('')}
            title="Remove image"
            style={{
              position: 'absolute', top: 4, right: 4, background: 'rgba(0,0,0,0.7)',
              border: 'none', color: '#fff', borderRadius: 4, width: 22, height: 22,
              cursor: 'pointer', fontSize: 14, lineHeight: '22px', textAlign: 'center',
            }}
          >×</button>
        </div>
      )}

      {/* Drop zone / upload button */}
      <div
        onDrop={handleDrop}
        onDragOver={e => e.preventDefault()}
        onClick={() => inputRef.current?.click()}
        style={{
          border: '1px dashed #3a3a3a',
          borderRadius: 6,
          padding: '12px 16px',
          cursor: 'pointer',
          color: uploading ? '#C9A84C' : '#666',
          fontSize: 12,
          textAlign: 'center',
          marginBottom: 6,
          background: '#0a0a0a',
          transition: 'border-color 0.15s',
        }}
        onMouseEnter={e => (e.currentTarget.style.borderColor = '#C9A84C')}
        onMouseLeave={e => (e.currentTarget.style.borderColor = '#3a3a3a')}
      >
        {uploading ? 'Uploading…' : `Click or drag to upload ${label}`}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        style={{ display: 'none' }}
        onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f) }}
      />

      {/* URL fallback */}
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="…or paste an image URL"
        style={{ ...inputStyle, fontSize: 11, color: '#555' }}
      />

      {uploadError && <p style={{ color: '#ef4444', fontSize: 11, marginTop: 4 }}>{uploadError}</p>}
    </div>
  )
}
