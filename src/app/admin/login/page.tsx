'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (res.ok) {
      router.push('/admin')
      router.refresh()
    } else {
      setError('Incorrect password.')
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a' }}>
      <div style={{ width: '100%', maxWidth: 360, padding: '0 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <p style={{ color: '#C9A84C', fontSize: 22, letterSpacing: 6, textTransform: 'uppercase', margin: 0 }}>MIDAS</p>
          <p style={{ color: '#555', fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', margin: '4px 0 0' }}>WEBSITE ADMIN</p>
          <div style={{ width: 32, height: 1, background: '#C9A84C', margin: '16px auto 0' }} />
        </div>
        <div style={{ background: '#111', border: '1px solid #1a1a1a', borderRadius: 8, padding: '28px 24px' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoFocus
              style={{ background: '#0d0d0d', border: '1px solid #2a2a2a', color: '#e0e0e0', borderRadius: 6, padding: '10px 14px', fontSize: 14, outline: 'none' }}
            />
            {error && <p style={{ color: '#ef4444', fontSize: 13, margin: 0 }}>{error}</p>}
            <button
              type="submit"
              disabled={loading}
              style={{ background: loading ? '#555' : '#C9A84C', color: '#000', border: 'none', borderRadius: 6, padding: '11px 0', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer' }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
