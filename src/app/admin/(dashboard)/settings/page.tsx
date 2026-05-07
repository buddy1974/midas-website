'use client'

import { useState } from 'react'

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: '#0d0d0d',
  border: '1px solid #2a2a2a',
  color: '#e0e0e0',
  borderRadius: 6,
  padding: '10px 14px',
  fontSize: 14,
  outline: 'none',
  boxSizing: 'border-box',
}

export default function SettingsPage() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match.')
      return
    }
    if (newPassword.length < 8) {
      setError('New password must be at least 8 characters.')
      return
    }

    setSaving(true)
    try {
      const res = await fetch('/api/admin/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      })
      const data = await res.json() as { ok?: boolean; error?: string }
      if (data.ok) {
        setSuccess(true)
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
      } else {
        setError(data.error ?? 'Failed to change password.')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <h1 style={{ color: '#C9A84C', fontSize: 18, fontWeight: 700, textTransform: 'uppercase', margin: '0 0 4px' }}>
        Settings
      </h1>
      <p style={{ color: '#555', fontSize: 13, marginBottom: 32 }}>Manage admin access credentials.</p>

      <div style={{ maxWidth: 480, background: '#111', border: '1px solid #1a1a1a', borderRadius: 8, padding: '28px 28px' }}>
        <p style={{ color: '#C9A84C', fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 20 }}>
          Change Password
        </p>
        <p style={{ color: '#555', fontSize: 12, marginBottom: 20, lineHeight: 1.6 }}>
          This changes the password for the admin area and the off-market page. Both use the same password.
        </p>

        <form onSubmit={handleChangePassword} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={{ display: 'block', color: '#666', fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 5 }}>
              Current Password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
              required
              style={inputStyle}
            />
          </div>

          <div>
            <label style={{ display: 'block', color: '#666', fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 5 }}>
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              placeholder="At least 8 characters"
              required
              minLength={8}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={{ display: 'block', color: '#666', fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 5 }}>
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="Repeat new password"
              required
              style={inputStyle}
            />
          </div>

          {error && (
            <p style={{ color: '#ef4444', fontSize: 13, margin: 0 }}>{error}</p>
          )}

          {success && (
            <p style={{ color: '#22c55e', fontSize: 13, margin: 0 }}>
              Password changed successfully. Your session has been updated.
            </p>
          )}

          <button
            type="submit"
            disabled={saving}
            style={{
              background: saving ? '#333' : '#C9A84C',
              color: '#000',
              border: 'none',
              borderRadius: 6,
              padding: '11px 0',
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: 1,
              textTransform: 'uppercase',
              cursor: saving ? 'not-allowed' : 'pointer',
              marginTop: 4,
            }}
          >
            {saving ? 'Saving...' : 'Update Password'}
          </button>
        </form>
      </div>

      <div style={{ maxWidth: 480, marginTop: 20, background: '#0d0d0d', border: '1px solid #1a1a1a', borderRadius: 8, padding: '16px 20px' }}>
        <p style={{ color: '#555', fontSize: 12, margin: 0, lineHeight: 1.6 }}>
          The password is stored securely in your database. If you lose access, set <strong style={{ color: '#666' }}>ADMIN_PASSWORD</strong> in your Vercel environment variables to reset it.
        </p>
      </div>
    </div>
  )
}
