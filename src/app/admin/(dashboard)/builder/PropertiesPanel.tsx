'use client'

import { useState, useEffect } from 'react'
import type { BuilderSection } from '@/lib/builder-types'
import { SECTION_SCHEMAS } from '@/lib/builder-defaults'
import { SECTION_LIBRARY } from '@/lib/builder-types'

const C = { bg: '#0d0d0d', border: '#1a1a1a', gold: '#C9A84C', text: '#e0e0e0', muted: '#666', input: '#111' }

interface Props {
  section: BuilderSection
  onChange: (data: Record<string, string>) => void
  onSettingsChange: (settings: BuilderSection['settings']) => void
  onClose: () => void
}

export default function PropertiesPanel({ section, onChange, onSettingsChange, onClose }: Props) {
  const schema = SECTION_SCHEMAS[section.type]
  const libItem = SECTION_LIBRARY.find(l => l.type === section.type)
  const [activeTab, setActiveTab] = useState<'content' | 'settings'>('content')

  const data = section.data as Record<string, string>

  const set = (key: string, value: string) => {
    onChange({ ...data, [key]: value })
  }

  if (!schema) {
    return (
      <div style={{ padding: 20 }}>
        <p style={{ color: C.muted, fontSize: 12 }}>No properties for this section type.</p>
        <button onClick={onClose} style={{ color: C.muted, background: 'none', border: `1px solid ${C.border}`, borderRadius: 3, padding: '6px 12px', cursor: 'pointer', fontSize: 12 }}>Close</button>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>

      {/* Header */}
      <div style={{ padding: '12px 14px', borderBottom: `1px solid ${C.border}`, flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <div>
            <p style={{ color: C.gold, fontSize: 12, fontWeight: 700, margin: 0 }}>{libItem?.icon} {libItem?.label}</p>
            <p style={{ color: C.muted, fontSize: 10, margin: '2px 0 0' }}>{libItem?.description}</p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: `1px solid ${C.border}`, borderRadius: 3, color: C.muted, width: 26, height: 26, cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
        </div>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4 }}>
          {(['content', 'settings'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              style={{ flex: 1, padding: '5px 0', borderRadius: 3, border: `1px solid ${activeTab === tab ? C.gold : C.border}`, background: activeTab === tab ? 'rgba(201,168,76,0.1)' : 'transparent', color: activeTab === tab ? C.gold : C.muted, fontSize: 11, cursor: 'pointer', textTransform: 'capitalize', fontWeight: activeTab === tab ? 600 : 400 }}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 14px' }}>

        {activeTab === 'content' && (
          <>
            {schema.map(group => (
              <div key={group.group} style={{ marginBottom: 20 }}>
                <p style={{ color: C.gold, fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700, margin: '0 0 10px' }}>{group.group}</p>
                {group.fields.map(field => (
                  <div key={field.key} style={{ marginBottom: 12 }}>
                    <label style={{ display: 'block', color: C.muted, fontSize: 10, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>
                      {field.label}
                    </label>

                    {field.type === 'text' && (
                      <input
                        value={data[field.key] ?? ''}
                        onChange={e => set(field.key, e.target.value)}
                        placeholder={field.placeholder}
                        style={{ width: '100%', padding: '7px 9px', background: C.input, border: `1px solid ${C.border}`, borderRadius: 3, color: C.text, fontSize: 12, boxSizing: 'border-box' }}
                      />
                    )}

                    {(field.type === 'textarea' || field.type === 'url') && (
                      <textarea
                        value={data[field.key] ?? ''}
                        onChange={e => set(field.key, e.target.value)}
                        placeholder={field.placeholder}
                        rows={field.type === 'url' ? 1 : 3}
                        style={{ width: '100%', padding: '7px 9px', background: C.input, border: `1px solid ${C.border}`, borderRadius: 3, color: C.text, fontSize: 12, boxSizing: 'border-box', resize: 'vertical', fontFamily: 'inherit' }}
                      />
                    )}

                    {field.type === 'number' && (
                      <input
                        type="number"
                        value={data[field.key] ?? ''}
                        onChange={e => set(field.key, e.target.value)}
                        placeholder={field.placeholder}
                        style={{ width: '100%', padding: '7px 9px', background: C.input, border: `1px solid ${C.border}`, borderRadius: 3, color: C.text, fontSize: 12, boxSizing: 'border-box' }}
                      />
                    )}

                    {field.type === 'select' && (
                      <select
                        value={data[field.key] ?? ''}
                        onChange={e => set(field.key, e.target.value)}
                        style={{ width: '100%', padding: '7px 9px', background: C.input, border: `1px solid ${C.border}`, borderRadius: 3, color: C.text, fontSize: 12, boxSizing: 'border-box', cursor: 'pointer' }}
                      >
                        {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    )}

                    {field.type === 'toggle' && (
                      <div
                        onClick={() => set(field.key, data[field.key] === 'true' ? 'false' : 'true')}
                        style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
                      >
                        <div style={{ width: 36, height: 20, borderRadius: 10, background: data[field.key] === 'true' ? C.gold : '#333', position: 'relative', transition: 'background 0.2s' }}>
                          <div style={{ position: 'absolute', top: 2, left: data[field.key] === 'true' ? 18 : 2, width: 16, height: 16, borderRadius: '50%', background: '#fff', transition: 'left 0.2s' }} />
                        </div>
                        <span style={{ color: C.muted, fontSize: 12 }}>{data[field.key] === 'true' ? 'Enabled' : 'Disabled'}</span>
                      </div>
                    )}

                    {field.type === 'faq-list' && <FAQListEditor value={data[field.key] ?? '[]'} onChange={v => set(field.key, v)} />}
                    {field.type === 'testimonial-list' && <TestimonialListEditor value={data[field.key] ?? '[]'} onChange={v => set(field.key, v)} />}
                    {field.type === 'card-list' && <CardListEditor value={data[field.key] ?? '[]'} onChange={v => set(field.key, v)} />}
                    {field.type === 'step-list' && <StepListEditor value={data[field.key] ?? '[]'} onChange={v => set(field.key, v)} />}

                    {field.hint && <p style={{ color: '#444', fontSize: 10, margin: '3px 0 0' }}>{field.hint}</p>}
                  </div>
                ))}
              </div>
            ))}
          </>
        )}

        {activeTab === 'settings' && (
          <SectionSettings section={section} onChange={onSettingsChange} />
        )}
      </div>
    </div>
  )
}

// ── Section settings tab ──────────────────────────────────────────────────────

function SectionSettings({ section, onChange }: { section: BuilderSection; onChange: (s: BuilderSection['settings']) => void }) {
  const s = section.settings
  const set = (key: keyof BuilderSection['settings'], val: string | boolean) => onChange({ ...s, [key]: val })

  const BG_OPTIONS = [
    { value: 'dark',  label: 'Dark',  color: '#0d0d0d' },
    { value: 'light', label: 'Light', color: '#1a1a1a' },
    { value: 'cream', label: 'Cream', color: '#fdf9f0' },
    { value: 'white', label: 'White', color: '#ffffff' },
    { value: 'gold',  label: 'Gold',  color: '#C9A84C' },
  ]
  const PAD = ['none', 'sm', 'md', 'lg', 'xl']

  return (
    <div>
      <p style={{ color: '#C9A84C', fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700, margin: '0 0 12px' }}>Background</p>
      <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
        {BG_OPTIONS.map(opt => (
          <button key={opt.value} title={opt.label} onClick={() => set('background', opt.value)}
            style={{ width: 32, height: 32, borderRadius: 4, background: opt.color, border: `2px solid ${s.background === opt.value ? '#C9A84C' : '#2a2a2a'}`, cursor: 'pointer' }}
          />
        ))}
      </div>

      <p style={{ color: '#C9A84C', fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700, margin: '0 0 8px' }}>Padding Top</p>
      <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
        {PAD.map(p => (
          <button key={p} onClick={() => set('paddingTop', p)}
            style={{ flex: 1, padding: '5px 0', borderRadius: 3, border: `1px solid ${s.paddingTop === p ? '#C9A84C' : '#2a2a2a'}`, background: s.paddingTop === p ? 'rgba(201,168,76,0.12)' : 'transparent', color: s.paddingTop === p ? '#C9A84C' : '#666', fontSize: 10, cursor: 'pointer' }}>
            {p}
          </button>
        ))}
      </div>

      <p style={{ color: '#C9A84C', fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700, margin: '0 0 8px' }}>Padding Bottom</p>
      <div style={{ display: 'flex', gap: 4, marginBottom: 20 }}>
        {PAD.map(p => (
          <button key={p} onClick={() => set('paddingBottom', p)}
            style={{ flex: 1, padding: '5px 0', borderRadius: 3, border: `1px solid ${s.paddingBottom === p ? '#C9A84C' : '#2a2a2a'}`, background: s.paddingBottom === p ? 'rgba(201,168,76,0.12)' : 'transparent', color: s.paddingBottom === p ? '#C9A84C' : '#666', fontSize: 10, cursor: 'pointer' }}>
            {p}
          </button>
        ))}
      </div>

      <p style={{ color: '#C9A84C', fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700, margin: '0 0 8px' }}>Visibility</p>
      <div onClick={() => set('hidden', !s.hidden)}
        style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', padding: '8px 10px', background: '#111', border: '1px solid #1a1a1a', borderRadius: 4 }}>
        <div style={{ width: 36, height: 20, borderRadius: 10, background: !s.hidden ? '#C9A84C' : '#333', position: 'relative', transition: 'background 0.2s' }}>
          <div style={{ position: 'absolute', top: 2, left: !s.hidden ? 18 : 2, width: 16, height: 16, borderRadius: '50%', background: '#fff', transition: 'left 0.2s' }} />
        </div>
        <span style={{ color: '#888', fontSize: 12 }}>{s.hidden ? 'Hidden (not visible on site)' : 'Visible on site'}</span>
      </div>
    </div>
  )
}

// ── List editors ─────────────────────────────────────────────────────────────

function FAQListEditor({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  interface Item { question: string; answer: string }
  const [items, setItems] = useState<Item[]>([])
  useEffect(() => { try { setItems(JSON.parse(value) as Item[]) } catch { setItems([]) } }, [value])

  const update = (newItems: Item[]) => { setItems(newItems); onChange(JSON.stringify(newItems)) }
  const add = () => update([...items, { question: 'New question?', answer: 'Your answer here.' }])
  const del = (i: number) => update(items.filter((_, j) => j !== i))
  const set = (i: number, k: keyof Item, v: string) => { const arr = [...items]; arr[i] = { ...arr[i], [k]: v }; update(arr) }

  return (
    <div>
      {items.map((item, i) => (
        <div key={i} style={{ background: '#0d0d0d', border: '1px solid #1a1a1a', borderRadius: 4, padding: 10, marginBottom: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ color: '#888', fontSize: 10, textTransform: 'uppercase', letterSpacing: 1 }}>Q {i + 1}</span>
            <button onClick={() => del(i)} style={{ background: 'none', border: 'none', color: '#e55', cursor: 'pointer', fontSize: 12 }}>✕</button>
          </div>
          <input value={item.question} onChange={e => set(i, 'question', e.target.value)}
            placeholder="Question" style={{ width: '100%', padding: '6px 8px', background: '#111', border: '1px solid #1a1a1a', borderRadius: 3, color: '#e0e0e0', fontSize: 11, marginBottom: 6, boxSizing: 'border-box' }} />
          <textarea value={item.answer} onChange={e => set(i, 'answer', e.target.value)}
            placeholder="Answer" rows={2} style={{ width: '100%', padding: '6px 8px', background: '#111', border: '1px solid #1a1a1a', borderRadius: 3, color: '#e0e0e0', fontSize: 11, boxSizing: 'border-box', resize: 'vertical', fontFamily: 'inherit' }} />
        </div>
      ))}
      <button onClick={add} style={{ width: '100%', padding: '7px', border: '1px dashed #2a2a2a', borderRadius: 4, background: 'transparent', color: '#888', fontSize: 11, cursor: 'pointer' }}>+ Add Question</button>
    </div>
  )
}

function TestimonialListEditor({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  interface Item { quote: string; author: string; role: string }
  const [items, setItems] = useState<Item[]>([])
  useEffect(() => { try { setItems(JSON.parse(value) as Item[]) } catch { setItems([]) } }, [value])

  const update = (newItems: Item[]) => { setItems(newItems); onChange(JSON.stringify(newItems)) }
  const add = () => update([...items, { quote: 'Add your testimonial quote here.', author: 'Client Name', role: 'Role / Location' }])
  const del = (i: number) => update(items.filter((_, j) => j !== i))
  const set = (i: number, k: keyof Item, v: string) => { const arr = [...items]; arr[i] = { ...arr[i], [k]: v }; update(arr) }

  return (
    <div>
      {items.map((item, i) => (
        <div key={i} style={{ background: '#0d0d0d', border: '1px solid #1a1a1a', borderRadius: 4, padding: 10, marginBottom: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ color: '#888', fontSize: 10 }}>Testimonial {i + 1}</span>
            <button onClick={() => del(i)} style={{ background: 'none', border: 'none', color: '#e55', cursor: 'pointer', fontSize: 12 }}>✕</button>
          </div>
          <textarea value={item.quote} onChange={e => set(i, 'quote', e.target.value)} placeholder="Quote" rows={2}
            style={{ width: '100%', padding: '6px 8px', background: '#111', border: '1px solid #1a1a1a', borderRadius: 3, color: '#e0e0e0', fontSize: 11, marginBottom: 6, boxSizing: 'border-box', fontFamily: 'inherit', resize: 'vertical' }} />
          <input value={item.author} onChange={e => set(i, 'author', e.target.value)} placeholder="Author name"
            style={{ width: '100%', padding: '6px 8px', background: '#111', border: '1px solid #1a1a1a', borderRadius: 3, color: '#e0e0e0', fontSize: 11, marginBottom: 6, boxSizing: 'border-box' }} />
          <input value={item.role} onChange={e => set(i, 'role', e.target.value)} placeholder="Role / Location"
            style={{ width: '100%', padding: '6px 8px', background: '#111', border: '1px solid #1a1a1a', borderRadius: 3, color: '#e0e0e0', fontSize: 11, boxSizing: 'border-box' }} />
        </div>
      ))}
      <button onClick={add} style={{ width: '100%', padding: '7px', border: '1px dashed #2a2a2a', borderRadius: 4, background: 'transparent', color: '#888', fontSize: 11, cursor: 'pointer' }}>+ Add Testimonial</button>
    </div>
  )
}

function CardListEditor({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  interface Item { icon: string; title: string; body: string }
  const [items, setItems] = useState<Item[]>([])
  useEffect(() => { try { setItems(JSON.parse(value) as Item[]) } catch { setItems([]) } }, [value])

  const update = (newItems: Item[]) => { setItems(newItems); onChange(JSON.stringify(newItems)) }
  const add = () => update([...items, { icon: '⭐', title: 'Card Title', body: 'Card description goes here.' }])
  const del = (i: number) => update(items.filter((_, j) => j !== i))
  const set = (i: number, k: keyof Item, v: string) => { const arr = [...items]; arr[i] = { ...arr[i], [k]: v }; update(arr) }

  return (
    <div>
      {items.map((item, i) => (
        <div key={i} style={{ background: '#0d0d0d', border: '1px solid #1a1a1a', borderRadius: 4, padding: 10, marginBottom: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ color: '#888', fontSize: 10 }}>Card {i + 1}</span>
            <button onClick={() => del(i)} style={{ background: 'none', border: 'none', color: '#e55', cursor: 'pointer', fontSize: 12 }}>✕</button>
          </div>
          <div style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
            <input value={item.icon} onChange={e => set(i, 'icon', e.target.value)} placeholder="🎯"
              style={{ width: 44, padding: '6px 8px', background: '#111', border: '1px solid #1a1a1a', borderRadius: 3, color: '#e0e0e0', fontSize: 16, textAlign: 'center' }} />
            <input value={item.title} onChange={e => set(i, 'title', e.target.value)} placeholder="Card title"
              style={{ flex: 1, padding: '6px 8px', background: '#111', border: '1px solid #1a1a1a', borderRadius: 3, color: '#e0e0e0', fontSize: 11 }} />
          </div>
          <textarea value={item.body} onChange={e => set(i, 'body', e.target.value)} placeholder="Card description" rows={2}
            style={{ width: '100%', padding: '6px 8px', background: '#111', border: '1px solid #1a1a1a', borderRadius: 3, color: '#e0e0e0', fontSize: 11, boxSizing: 'border-box', fontFamily: 'inherit', resize: 'vertical' }} />
        </div>
      ))}
      <button onClick={add} style={{ width: '100%', padding: '7px', border: '1px dashed #2a2a2a', borderRadius: 4, background: 'transparent', color: '#888', fontSize: 11, cursor: 'pointer' }}>+ Add Card</button>
    </div>
  )
}

function StepListEditor({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  interface Item { title: string; body: string }
  const [items, setItems] = useState<Item[]>([])
  useEffect(() => { try { setItems(JSON.parse(value) as Item[]) } catch { setItems([]) } }, [value])

  const update = (newItems: Item[]) => { setItems(newItems); onChange(JSON.stringify(newItems)) }
  const add = () => update([...items, { title: 'Step Title', body: 'Step description.' }])
  const del = (i: number) => update(items.filter((_, j) => j !== i))
  const set = (i: number, k: keyof Item, v: string) => { const arr = [...items]; arr[i] = { ...arr[i], [k]: v }; update(arr) }

  return (
    <div>
      {items.map((item, i) => (
        <div key={i} style={{ background: '#0d0d0d', border: '1px solid #1a1a1a', borderRadius: 4, padding: 10, marginBottom: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <span style={{ background: '#C9A84C', color: '#000', width: 20, height: 20, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>{i + 1}</span>
            <button onClick={() => del(i)} style={{ background: 'none', border: 'none', color: '#e55', cursor: 'pointer', fontSize: 12 }}>✕</button>
          </div>
          <input value={item.title} onChange={e => set(i, 'title', e.target.value)} placeholder="Step title"
            style={{ width: '100%', padding: '6px 8px', background: '#111', border: '1px solid #1a1a1a', borderRadius: 3, color: '#e0e0e0', fontSize: 11, marginBottom: 6, boxSizing: 'border-box' }} />
          <textarea value={item.body} onChange={e => set(i, 'body', e.target.value)} placeholder="Step description" rows={2}
            style={{ width: '100%', padding: '6px 8px', background: '#111', border: '1px solid #1a1a1a', borderRadius: 3, color: '#e0e0e0', fontSize: 11, boxSizing: 'border-box', fontFamily: 'inherit', resize: 'vertical' }} />
        </div>
      ))}
      <button onClick={add} style={{ width: '100%', padding: '7px', border: '1px dashed #2a2a2a', borderRadius: 4, background: 'transparent', color: '#888', fontSize: 11, cursor: 'pointer' }}>+ Add Step</button>
    </div>
  )
}
