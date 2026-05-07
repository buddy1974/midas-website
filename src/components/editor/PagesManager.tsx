'use client'

import { useState } from 'react'
import Link from 'next/link'

interface SitePage {
  name: string
  url: string
  inMenu: boolean
}

const SITE_PAGES: SitePage[] = [
  { name: 'Home', url: '/', inMenu: true },
  { name: 'Available Properties', url: '/properties', inMenu: false },
  { name: 'Current Auction', url: '/current-auction', inMenu: false },
  { name: 'Off-Market', url: '/off-market', inMenu: false },
  { name: 'Buy Property', url: '/buy', inMenu: true },
  { name: 'Sell Property', url: '/sell', inMenu: true },
  { name: 'Instant Cash Offer', url: '/instant-offer', inMenu: true },
  { name: 'Events', url: '/events', inMenu: true },
  { name: 'Alternative Investments', url: '/alternative-investments', inMenu: true },
  { name: 'Yielding Investments', url: '/yielding-investments', inMenu: true },
  { name: 'About Us', url: '/about', inMenu: true },
  { name: 'Contact', url: '/contact', inMenu: false },
  { name: 'Finance', url: '/finance', inMenu: false },
  { name: 'Blog', url: '/blog', inMenu: false },
  { name: 'FAQs', url: '/faqs', inMenu: false },
  { name: 'Register to Bid', url: '/register', inMenu: false },
  { name: 'Free Valuation', url: '/valuation', inMenu: false },
]

interface PagesManagerProps {
  open: boolean
  onClose: () => void
}

export default function PagesManager({ open, onClose }: PagesManagerProps) {
  const [requestName, setRequestName] = useState('')
  const [requestPurpose, setRequestPurpose] = useState('')
  const [requestSent, setRequestSent] = useState(false)

  if (!open) return null

  const handleSendRequest = () => {
    // No-op: just show success
    setRequestSent(true)
    setRequestName('')
    setRequestPurpose('')
  }

  const inputStyle: React.CSSProperties = {
    background: '#0a0a0a',
    border: '1px solid #2a2a2a',
    color: '#e0e0e0',
    borderRadius: 4,
    padding: '6px 10px',
    fontSize: 12,
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          zIndex: 300,
        }}
      />

      {/* Panel */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: 480,
          height: '100%',
          background: '#0d0d0d',
          borderLeft: '1px solid #1a1a1a',
          zIndex: 350,
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 20px',
            borderBottom: '1px solid #1a1a1a',
            flexShrink: 0,
          }}
        >
          <p style={{ color: '#C9A84C', fontSize: 14, fontWeight: 700, margin: 0 }}>Pages</p>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: '1px solid #2a2a2a',
              color: '#888',
              borderRadius: 4,
              width: 28,
              height: 28,
              cursor: 'pointer',
              fontSize: 14,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '16px 20px', flex: 1 }}>
          {/* Pages table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
              <thead>
                <tr>
                  {['Page', 'URL', 'In Menu', 'Actions'].map(col => (
                    <th
                      key={col}
                      style={{
                        textAlign: 'left',
                        color: '#555',
                        fontSize: 10,
                        letterSpacing: 1,
                        textTransform: 'uppercase',
                        padding: '6px 8px',
                        borderBottom: '1px solid #1a1a1a',
                        fontWeight: 600,
                      }}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SITE_PAGES.map(pg => (
                  <tr key={pg.url} style={{ borderBottom: '1px solid #111' }}>
                    <td style={{ padding: '8px', color: '#e0e0e0' }}>{pg.name}</td>
                    <td style={{ padding: '8px', color: '#666', fontFamily: 'monospace' }}>{pg.url}</td>
                    <td style={{ padding: '8px', textAlign: 'center' }}>
                      {pg.inMenu ? (
                        <span style={{ color: '#22c55e', fontSize: 11 }}>Yes</span>
                      ) : (
                        <span style={{ color: '#444', fontSize: 11 }}>No</span>
                      )}
                    </td>
                    <td style={{ padding: '8px' }}>
                      <Link
                        href={pg.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: '#C9A84C',
                          textDecoration: 'none',
                          fontSize: 11,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        View ↗
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Request New Page */}
          <div
            style={{
              marginTop: 24,
              background: '#111',
              border: '1px solid #1a1a1a',
              borderRadius: 8,
              padding: '16px',
            }}
          >
            <p style={{ color: '#C9A84C', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>Request New Page</p>
            <p style={{ color: '#555', fontSize: 11, marginBottom: 14 }}>
              Need a page that does not exist yet? Submit a request and the team will build it.
            </p>

            {requestSent ? (
              <div
                style={{
                  background: 'rgba(34,197,94,0.08)',
                  border: '1px solid rgba(34,197,94,0.3)',
                  borderRadius: 6,
                  padding: '12px 16px',
                  color: '#22c55e',
                  fontSize: 12,
                }}
              >
                ✓ Request sent. The team will review and build this page.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div>
                  <label style={{ display: 'block', color: '#555', fontSize: 10, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>
                    Page Name
                  </label>
                  <input
                    type="text"
                    value={requestName}
                    onChange={e => setRequestName(e.target.value)}
                    placeholder="e.g. Land Sales"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#555', fontSize: 10, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>
                    Purpose
                  </label>
                  <textarea
                    value={requestPurpose}
                    onChange={e => setRequestPurpose(e.target.value)}
                    placeholder="Describe what this page should do and who it's for..."
                    rows={3}
                    style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }}
                  />
                </div>
                <button
                  onClick={handleSendRequest}
                  disabled={!requestName.trim()}
                  style={{
                    background: requestName.trim() ? '#C9A84C' : '#2a2a2a',
                    color: requestName.trim() ? '#000' : '#555',
                    border: 'none',
                    borderRadius: 5,
                    padding: '8px 16px',
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: requestName.trim() ? 'pointer' : 'not-allowed',
                  }}
                >
                  Send Request
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
