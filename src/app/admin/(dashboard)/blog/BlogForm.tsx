'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { BlogPostRow } from '@/lib/db'

const inputStyle: React.CSSProperties = {
  width: '100%', background: '#0d0d0d', border: '1px solid #2a2a2a',
  color: '#e0e0e0', borderRadius: 6, padding: '9px 12px', fontSize: 13, outline: 'none', boxSizing: 'border-box',
}
const labelStyle: React.CSSProperties = { display: 'block', color: '#666', fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 5 }

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div style={{ marginBottom: 16 }}><label style={labelStyle}>{label}</label>{children}</div>
}

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export default function BlogForm({ initial }: { initial?: BlogPostRow }) {
  const router = useRouter()
  const isEdit = !!initial

  const [form, setForm] = useState({
    title: initial?.title ?? '',
    slug: initial?.slug ?? '',
    category: initial?.category ?? 'Guide',
    excerpt: initial?.excerpt ?? '',
    content: initial?.content ?? '',
    cover_image: initial?.cover_image ?? '',
    status: initial?.status ?? 'draft',
  })
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState('')

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [key]: e.target.value }))

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    setForm(f => ({ ...f, title, slug: isEdit ? f.slug : slugify(title) }))
  }

  const handleSave = async () => {
    if (!form.title.trim() || !form.slug.trim()) { setError('Title and slug are required.'); return }
    setSaving(true); setError('')
    const url = isEdit ? `/api/admin/blog/${initial!.id}` : '/api/admin/blog'
    const method = isEdit ? 'PATCH' : 'POST'
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    if (res.ok) { router.push('/admin/blog'); router.refresh() }
    else { const d = await res.json() as { error?: string }; setError(d.error ?? 'Save failed.'); setSaving(false) }
  }

  const handleDelete = async () => {
    if (!confirm('Delete this post?')) return
    setDeleting(true)
    await fetch(`/api/admin/blog/${initial!.id}`, { method: 'DELETE' })
    router.push('/admin/blog'); router.refresh()
  }

  return (
    <div style={{ maxWidth: 720 }}>
      <Field label="Title *">
        <input value={form.title} onChange={handleTitleChange} placeholder="Post title" style={inputStyle} />
      </Field>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
        <Field label="Slug *">
          <input value={form.slug} onChange={set('slug')} placeholder="post-url-slug" style={inputStyle} />
        </Field>
        <Field label="Category">
          <select value={form.category} onChange={set('category')} style={inputStyle}>
            {['Guide', 'Market Report', 'Finance', 'Investment', 'News'].map(c => <option key={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="Status">
          <select value={form.status} onChange={set('status')} style={inputStyle}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </Field>
        <Field label="Cover Image URL">
          <input value={form.cover_image} onChange={set('cover_image')} placeholder="https://..." style={inputStyle} />
        </Field>
      </div>
      <Field label="Excerpt (shown in listings)">
        <textarea value={form.excerpt} onChange={set('excerpt')} rows={3} placeholder="Short summary..." style={{ ...inputStyle, resize: 'vertical' }} />
      </Field>
      <Field label="Content">
        <textarea value={form.content} onChange={set('content')} rows={16} placeholder="Full article content..." style={{ ...inputStyle, resize: 'vertical', fontFamily: 'monospace', fontSize: 12 }} />
      </Field>
      {error && <p style={{ color: '#ef4444', fontSize: 13, marginBottom: 16 }}>{error}</p>}
      <div style={{ display: 'flex', gap: 10 }}>
        <button onClick={handleSave} disabled={saving} style={{ background: saving ? '#555' : '#C9A84C', color: '#000', border: 'none', borderRadius: 6, padding: '10px 24px', fontSize: 13, fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer' }}>
          {saving ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Post'}
        </button>
        <button onClick={() => router.back()} style={{ background: 'none', border: '1px solid #2a2a2a', color: '#888', borderRadius: 6, padding: '10px 20px', fontSize: 13, cursor: 'pointer' }}>Cancel</button>
        {isEdit && (
          <button onClick={handleDelete} disabled={deleting} style={{ marginLeft: 'auto', background: 'none', border: '1px solid #3f1010', color: '#ef4444', borderRadius: 6, padding: '10px 20px', fontSize: 13, cursor: deleting ? 'not-allowed' : 'pointer' }}>
            {deleting ? 'Deleting...' : 'Delete'}
          </button>
        )}
      </div>
    </div>
  )
}
