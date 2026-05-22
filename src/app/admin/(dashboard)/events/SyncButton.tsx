'use client'

import { useState } from 'react'

export default function SyncButton() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSync = async () => {
    setStatus('loading')
    setMessage('')
    try {
      const res = await fetch('/api/admin/eventbrite-sync', { method: 'POST' })
      const data = await res.json() as { ok?: boolean; synced?: number; total?: number; error?: string }
      if (res.ok && data.ok) {
        setStatus('done')
        setMessage(`Synced ${data.synced} of ${data.total} events from Eventbrite`)
      } else {
        setStatus('error')
        setMessage(data.error ?? 'Sync failed')
      }
    } catch {
      setStatus('error')
      setMessage('Network error — check console')
    }
    setTimeout(() => { setStatus('idle'); setMessage('') }, 5000)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
      <button
        onClick={handleSync}
        disabled={status === 'loading'}
        style={{
          background: status === 'done' ? '#166534' : status === 'error' ? '#7f1d1d' : '#1a1a1a',
          color: status === 'loading' ? '#555' : '#aaa',
          border: '1px solid #2a2a2a',
          borderRadius: 6,
          padding: '7px 14px',
          fontSize: 12,
          cursor: status === 'loading' ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s',
          whiteSpace: 'nowrap',
        }}
      >
        {status === 'loading' ? '⟳ Syncing…' : status === 'done' ? '✓ Synced' : status === 'error' ? '✕ Failed' : '⟳ Sync Eventbrite'}
      </button>
      {message && (
        <span style={{ fontSize: 11, color: status === 'error' ? '#ef4444' : '#22c55e' }}>
          {message}
        </span>
      )}
    </div>
  )
}
