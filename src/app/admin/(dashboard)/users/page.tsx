'use client'

import { useState, useEffect, useCallback } from 'react'

interface AdminUser {
  id: number
  username: string
  role: string
  created_at: string
}

const INPUT: React.CSSProperties = {
  background: '#0a0a0a', border: '1px solid #2a2a2a', color: '#e0e0e0',
  borderRadius: 4, padding: '8px 12px', fontSize: 13, outline: 'none', width: '100%', boxSizing: 'border-box',
}
const BTN = (gold = false, sm = false): React.CSSProperties => ({
  padding: sm ? '5px 12px' : '9px 20px',
  background: gold ? '#C9A84C' : 'transparent',
  color: gold ? '#000' : '#888',
  border: gold ? 'none' : '1px solid #2a2a2a',
  borderRadius: 4, fontSize: 12, fontWeight: gold ? 700 : 400,
  cursor: 'pointer', letterSpacing: gold ? 1 : 0, textTransform: gold ? 'uppercase' : 'none',
})

export default function UsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'admin' | 'editor'>('editor')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [changePwId, setChangePwId] = useState<number | null>(null)
  const [newPw, setNewPw] = useState('')

  const load = useCallback(() => {
    setLoading(true)
    fetch('/api/admin/users')
      .then(r => r.json())
      .then((d: AdminUser[]) => setUsers(Array.isArray(d) ? d : []))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    queueMicrotask(load)
  }, [load])

  const handleCreate = async () => {
    if (!username.trim() || !password.trim()) return
    setSaving(true); setError('')
    const res = await fetch('/api/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username.trim(), password, role }),
    })
    setSaving(false)
    if (res.ok) {
      setShowForm(false); setUsername(''); setPassword(''); setRole('editor')
      load()
    } else {
      const d = await res.json() as { error?: string }
      setError(d.error ?? 'Failed to create user')
    }
  }

  const handleDelete = async (id: number, uname: string) => {
    if (!confirm(`Delete user "${uname}"? This cannot be undone.`)) return
    await fetch(`/api/admin/users/${id}`, { method: 'DELETE' })
    load()
  }

  const handleChangePw = async (id: number) => {
    if (!newPw.trim()) return
    await fetch(`/api/admin/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: newPw }),
    })
    setChangePwId(null); setNewPw(''); load()
  }

  return (
    <div style={{ maxWidth: 760 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <h1 style={{ color: '#e0e0e0', fontSize: 22, fontWeight: 700, margin: '0 0 4px' }}>Users</h1>
          <p style={{ color: '#555', fontSize: 13, margin: 0 }}>Manage admin users who can log into this dashboard.</p>
        </div>
        <button onClick={() => setShowForm(s => !s)} style={BTN(true)}>
          {showForm ? 'Cancel' : '+ Add User'}
        </button>
      </div>

      {/* Add user form */}
      {showForm && (
        <div style={{ background: '#111', border: '1px solid #1a1a1a', borderRadius: 8, padding: '20px 24px', marginBottom: 24 }}>
          <p style={{ color: '#C9A84C', fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600, margin: '0 0 16px' }}>New User</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            <div>
              <label style={{ color: '#888', fontSize: 11, display: 'block', marginBottom: 4 }}>Username</label>
              <input value={username} onChange={e => setUsername(e.target.value)} placeholder="e.g. sarah" style={INPUT} />
            </div>
            <div>
              <label style={{ color: '#888', fontSize: 11, display: 'block', marginBottom: 4 }}>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" style={INPUT} />
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#888', fontSize: 11, display: 'block', marginBottom: 4 }}>Role</label>
            <select value={role} onChange={e => setRole(e.target.value as 'admin' | 'editor')} style={{ ...INPUT, width: 'auto' }}>
              <option value="editor">Editor — can edit content</option>
              <option value="admin">Admin — full access</option>
            </select>
          </div>
          {error && <p style={{ color: '#e55', fontSize: 12, margin: '0 0 12px' }}>{error}</p>}
          <button onClick={handleCreate} disabled={!username || !password || saving} style={BTN(true)}>
            {saving ? 'Creating…' : 'Create User'}
          </button>
        </div>
      )}

      {/* Users table */}
      <div style={{ background: '#111', border: '1px solid #1a1a1a', borderRadius: 8, overflow: 'hidden' }}>
        {/* Table header */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px 160px 1fr', padding: '10px 20px', borderBottom: '1px solid #1a1a1a' }}>
          {['Username', 'Role', 'Created', 'Actions'].map(h => (
            <span key={h} style={{ color: '#555', fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>{h}</span>
          ))}
        </div>

        {loading ? (
          <div style={{ padding: '20px', color: '#555', fontSize: 13 }}>Loading…</div>
        ) : users.length === 0 ? (
          <div style={{ padding: '24px 20px', color: '#555', fontSize: 13 }}>
            No additional users yet. The primary admin uses the password from Settings.
          </div>
        ) : (
          users.map(u => (
            <div key={u.id}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px 160px 1fr', padding: '12px 20px', borderBottom: '1px solid #111', alignItems: 'center' }}>
                <span style={{ color: '#e0e0e0', fontSize: 13, fontWeight: 500 }}>{u.username}</span>
                <span style={{
                  color: u.role === 'admin' ? '#C9A84C' : '#888', fontSize: 12,
                  background: u.role === 'admin' ? 'rgba(201,168,76,0.1)' : 'rgba(255,255,255,0.04)',
                  padding: '2px 8px', borderRadius: 4, display: 'inline-block',
                }}>{u.role}</span>
                <span style={{ color: '#555', fontSize: 12 }}>{new Date(u.created_at).toLocaleDateString('en-GB')}</span>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => { setChangePwId(changePwId === u.id ? null : u.id); setNewPw('') }} style={BTN(false, true)}>
                    Change PW
                  </button>
                  <button onClick={() => handleDelete(u.id, u.username)} style={{ ...BTN(false, true), color: '#e55', borderColor: '#3a1a1a' }}>
                    Delete
                  </button>
                </div>
              </div>
              {changePwId === u.id && (
                <div style={{ padding: '10px 20px', background: '#0d0d0d', borderBottom: '1px solid #111', display: 'flex', gap: 8, alignItems: 'center' }}>
                  <input type="password" value={newPw} onChange={e => setNewPw(e.target.value)} placeholder="New password" style={{ ...INPUT, width: 200 }} />
                  <button onClick={() => handleChangePw(u.id)} disabled={!newPw.trim()} style={BTN(true, true)}>Save</button>
                  <button onClick={() => { setChangePwId(null); setNewPw('') }} style={BTN(false, true)}>Cancel</button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <p style={{ color: '#444', fontSize: 12, marginTop: 16 }}>
        Note: The primary admin password is managed in <a href="/admin/settings" style={{ color: '#C9A84C' }}>Settings</a>.
        Users created here are additional team members.
      </p>
    </div>
  )
}
