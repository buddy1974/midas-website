'use client'

import { useState, useCallback } from 'react'
import { EDITOR_SCHEMA, type SectionSchema } from '@/lib/editor-schema'
import { usePageEditor } from '@/hooks/usePageEditor'
import { EditableField } from '@/components/admin/EditableField'
import Link from 'next/link'

const PAGE_KEYS = Object.keys(EDITOR_SCHEMA)

function SaveBadge({ status }: { status: 'saved' | 'saving' | 'unsaved' }) {
  const map = {
    saved: { label: 'All saved', color: '#22c55e' },
    saving: { label: 'Saving...', color: '#C9A84C' },
    unsaved: { label: 'Unsaved changes', color: '#888' },
  }
  const { label, color } = map[status]
  return (
    <span style={{ color, fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: color, display: 'inline-block' }} />
      {label}
    </span>
  )
}

function SectionCard({
  sectionKey,
  section,
  get,
  update,
}: {
  sectionKey: string
  section: SectionSchema
  pageKey: string
  get: (section: string, field: string, fallback?: string) => string
  update: (section: string, field: string, value: string, type?: string) => void
}) {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <div style={{
      background: '#111',
      border: '1px solid #1a1a1a',
      borderRadius: 8,
      marginBottom: 16,
      overflow: 'hidden',
    }}>
      {/* Section header */}
      <div
        onClick={() => setCollapsed(c => !c)}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '12px 20px', cursor: 'pointer',
          background: '#0d0d0d', borderBottom: collapsed ? 'none' : '1px solid #1a1a1a',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ color: '#C9A84C', fontSize: 13, fontWeight: 700 }}>{section.label}</span>
          <span style={{ color: '#444', fontSize: 11 }}>{sectionKey}</span>
        </div>
        <span style={{ color: '#555', fontSize: 14 }}>{collapsed ? '▶' : '▼'}</span>
      </div>

      {!collapsed && (
        <div style={{ padding: '16px 20px' }}>
          {/* Preview strip */}
          <div style={{
            background: section.bgDark ? '#080809' : '#f8f7f4',
            borderRadius: 6, padding: '12px 16px', marginBottom: 16,
            border: '1px solid rgba(201,168,76,0.15)',
          }}>
            <p style={{ color: '#555', fontSize: 10, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>
              Live Preview (click any field below to edit)
            </p>
            <div style={{ opacity: 0.7, fontSize: 12, color: section.bgDark ? '#e0e0e0' : '#333' }}>
              {Object.entries(section.fields).slice(0, 2).map(([fk, fSchema]) => {
                const val = get(sectionKey, fk, fSchema.fallback)
                return (
                  <p key={fk} style={{ margin: '2px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    <span style={{ color: '#C9A84C', marginRight: 6, fontSize: 10 }}>{fSchema.label}:</span>
                    {val}
                  </p>
                )
              })}
              {Object.keys(section.fields).length > 2 && (
                <p style={{ color: '#555', fontSize: 10, marginTop: 4 }}>+{Object.keys(section.fields).length - 2} more fields</p>
              )}
            </div>
          </div>

          {/* Fields */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {Object.entries(section.fields).map(([fieldKey, fieldSchema]) => (
              <div key={fieldKey}>
                <label style={{ display: 'block', color: '#666', fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>
                  {fieldSchema.label}
                </label>
                <EditableField
                  value={get(sectionKey, fieldKey, fieldSchema.fallback)}
                  onChange={val => update(sectionKey, fieldKey, val, fieldSchema.type)}
                  type={fieldSchema.type}
                  multiline={fieldSchema.multiline}
                  placeholder={`Enter ${fieldSchema.label.toLowerCase()}...`}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function PageEditor({ pageKey }: { pageKey: string }) {
  const schema = EDITOR_SCHEMA[pageKey]
  const { get, update, save, saveStatus, loaded } = usePageEditor(pageKey)

  const handleSaveNow = useCallback(async () => {
    await save()
  }, [save])

  if (!loaded) {
    return <p style={{ color: '#555', fontSize: 13, padding: '32px 0' }}>Loading content...</p>
  }

  return (
    <div>
      {/* Page toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, padding: '12px 16px', background: '#0d0d0d', borderRadius: 8, border: '1px solid #1a1a1a' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <SaveBadge status={saveStatus} />
          <span style={{ color: '#333', fontSize: 12 }}>Edits save automatically within 1.5 seconds</span>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={handleSaveNow}
            style={{ background: '#C9A84C', color: '#000', border: 'none', borderRadius: 6, padding: '7px 16px', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
          >
            Save Now
          </button>
          <Link
            href="/"
            target="_blank"
            style={{ background: 'none', border: '1px solid #2a2a2a', color: '#888', borderRadius: 6, padding: '7px 16px', fontSize: 12, textDecoration: 'none' }}
          >
            Preview Site ↗
          </Link>
        </div>
      </div>

      {/* Sections */}
      {Object.entries(schema.sections).map(([sectionKey, section]) => (
        <SectionCard
          key={sectionKey}
          sectionKey={sectionKey}
          section={section}
          pageKey={pageKey}
          get={get}
          update={update}
        />
      ))}

      {/* Note */}
      <div style={{ marginTop: 16, padding: '12px 16px', background: '#0a0a0a', borderRadius: 6, border: '1px solid #1a1a1a' }}>
        <p style={{ color: '#444', fontSize: 12, margin: 0 }}>
          Changes are saved to the database and appear on the live website within 60 seconds. No publishing step required.
        </p>
      </div>
    </div>
  )
}

export default function EditorPage() {
  const [activePage, setActivePage] = useState(PAGE_KEYS[0])

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ color: '#C9A84C', fontSize: 18, fontWeight: 700, textTransform: 'uppercase', margin: '0 0 4px' }}>
          Visual Content Editor
        </h1>
        <p style={{ color: '#555', fontSize: 13, margin: 0 }}>
          Click any field to edit. Changes save automatically.
        </p>
      </div>

      {/* Page tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 24, borderBottom: '1px solid #1a1a1a', paddingBottom: 0 }}>
        {PAGE_KEYS.map(key => {
          const active = key === activePage
          return (
            <button
              key={key}
              onClick={() => setActivePage(key)}
              style={{
                background: 'none', border: 'none',
                borderBottom: active ? '2px solid #C9A84C' : '2px solid transparent',
                color: active ? '#C9A84C' : '#666',
                padding: '8px 16px', fontSize: 13, fontWeight: active ? 700 : 400,
                cursor: 'pointer', marginBottom: -1,
              }}
            >
              {EDITOR_SCHEMA[key].label}
            </button>
          )
        })}
      </div>

      <PageEditor key={activePage} pageKey={activePage} />
    </div>
  )
}
