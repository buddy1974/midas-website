'use client'

import { useState } from 'react'

interface Props { data: Record<string, string>; bg?: string }

export default function NewsletterSection({ data, bg }: Props) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'ok' | 'err'>('idle')
  const isDark = bg === 'dark'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await fetch('/api/register-investor', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) })
      setStatus('ok')
    } catch { setStatus('err') }
  }

  return (
    <section style={{ background: isDark ? '#0d0d0d' : bg === 'cream' ? '#fdf9f0' : '#fff', padding: '72px 24px', textAlign: 'center' }}>
      <div style={{ maxWidth: 560, margin: '0 auto' }}>
        <p style={{ color: '#C9A84C', fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 14, fontWeight: 600 }}>
          Mailing List
        </p>
        <h2 style={{ color: isDark ? '#fff' : '#1a1209', fontSize: 28, fontWeight: 300, marginBottom: 14 }}>
          {data.heading || 'JOIN OUR MAILING LIST'}
        </h2>
        {data.subtitle && (
          <p style={{ color: isDark ? 'rgba(255,255,255,0.55)' : '#777', fontSize: 15, lineHeight: 1.7, marginBottom: 28 }}>
            {data.subtitle}
          </p>
        )}
        {status === 'ok' ? (
          <p style={{ color: '#C9A84C', fontWeight: 600 }}>Thank you — you&apos;re on the list!</p>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 12, maxWidth: 420, margin: '0 auto' }}>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)} required
              placeholder="Your email address"
              style={{ flex: 1, padding: '12px 16px', border: `1px solid ${isDark ? '#2a2a2a' : '#d0c9b8'}`, borderRadius: 3, background: isDark ? '#111' : '#fff', color: isDark ? '#fff' : '#333', fontSize: 14, outline: 'none' }}
            />
            <button type="submit" style={{ background: '#C9A84C', color: '#000', padding: '12px 20px', border: 'none', borderRadius: 3, fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', cursor: 'pointer' }}>
              Subscribe
            </button>
          </form>
        )}
        {status === 'err' && <p style={{ color: '#e55', fontSize: 13, marginTop: 8 }}>Something went wrong. Please try again.</p>}
      </div>
    </section>
  )
}
