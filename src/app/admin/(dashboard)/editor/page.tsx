'use client'

import { useState, useCallback } from 'react'
import { EDITOR_SCHEMA, type SectionSchema } from '@/lib/editor-schema'
import { usePageEditor } from '@/hooks/usePageEditor'
import { EditableField } from '@/components/admin/EditableField'
import EditorToolbar from '@/components/editor/EditorToolbar'
import MenuEditor from '@/components/editor/MenuEditor'
import PagesManager from '@/components/editor/PagesManager'

const EDITOR_PAGES = Object.entries(EDITOR_SCHEMA).map(([key, schema]) => ({
  key,
  label: schema.label,
}))

function SectionCard({
  sectionKey,
  section,
  get,
  update,
}: {
  sectionKey: string
  section: SectionSchema
  get: (section: string, field: string, fallback?: string) => string
  update: (section: string, field: string, value: string, type?: string) => void
}) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div
      style={{
        background: '#111',
        border: '1px solid #1a1a1a',
        borderRadius: 8,
        marginBottom: 16,
        overflow: 'hidden',
      }}
    >
      {/* Section header */}
      <div
        onClick={() => setCollapsed(c => !c)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 20px',
          cursor: 'pointer',
          background: '#0d0d0d',
          borderBottom: collapsed ? 'none' : '1px solid #1a1a1a',
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
          <div
            style={{
              background: section.bgDark ? '#080809' : '#f8f7f4',
              borderRadius: 6,
              padding: '12px 16px',
              marginBottom: 16,
              border: '1px solid rgba(201,168,76,0.15)',
            }}
          >
            <p
              style={{
                color: '#555',
                fontSize: 10,
                letterSpacing: 1,
                textTransform: 'uppercase',
                marginBottom: 8,
              }}
            >
              Live Preview (click any field below to edit)
            </p>
            <div
              style={{
                opacity: 0.7,
                fontSize: 12,
                color: section.bgDark ? '#e0e0e0' : '#333',
              }}
            >
              {Object.entries(section.fields)
                .slice(0, 2)
                .map(([fk, fSchema]) => {
                  const val = get(sectionKey, fk, fSchema.fallback)
                  return (
                    <p
                      key={fk}
                      style={{
                        margin: '2px 0',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      <span style={{ color: '#C9A84C', marginRight: 6, fontSize: 10 }}>
                        {fSchema.label}:
                      </span>
                      {val}
                    </p>
                  )
                })}
              {Object.keys(section.fields).length > 2 && (
                <p style={{ color: '#555', fontSize: 10, marginTop: 4 }}>
                  +{Object.keys(section.fields).length - 2} more fields
                </p>
              )}
            </div>
          </div>

          {/* Fields */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {Object.entries(section.fields).map(([fieldKey, fieldSchema]) => (
              <div key={fieldKey}>
                <label
                  style={{
                    display: 'block',
                    color: '#666',
                    fontSize: 11,
                    letterSpacing: 1,
                    textTransform: 'uppercase',
                    marginBottom: 4,
                  }}
                >
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

interface PageEditorContentProps {
  pageKey: string
  onPageChange: (page: string) => void
  menuOpen: boolean
  pagesOpen: boolean
  setMenuOpen: (v: boolean) => void
  setPagesOpen: (v: boolean) => void
}

function PageEditorContent({
  pageKey,
  onPageChange,
  menuOpen,
  pagesOpen,
  setMenuOpen,
  setPagesOpen,
}: PageEditorContentProps) {
  const schema = EDITOR_SCHEMA[pageKey]
  const { get, update, save, saveStatus, loaded } = usePageEditor(pageKey)

  const handleSaveNow = useCallback(async () => {
    await save()
  }, [save])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: '#0a0a0a',
        overflowY: 'auto',
      }}
    >
      <EditorToolbar
        page={pageKey}
        onPageChange={onPageChange}
        saveStatus={saveStatus}
        onSaveNow={() => { void handleSaveNow() }}
        onMenuEditor={() => setMenuOpen(!menuOpen)}
        onPagesManager={() => setPagesOpen(!pagesOpen)}
        pages={EDITOR_PAGES}
      />

      {/* Main content */}
      <div
        style={{
          maxWidth: 800,
          margin: '0 auto',
          padding: '68px 24px 40px',
        }}
      >
        {/* Page header */}
        <div style={{ marginBottom: 24 }}>
          <h1
            style={{
              color: '#C9A84C',
              fontSize: 18,
              fontWeight: 700,
              textTransform: 'uppercase',
              margin: '0 0 4px',
            }}
          >
            {schema.label}
          </h1>
          <p style={{ color: '#555', fontSize: 13, margin: 0 }}>
            Click any field to edit. Changes save automatically within 1.5 seconds.
          </p>
        </div>

        {!loaded ? (
          <p style={{ color: '#555', fontSize: 13, padding: '32px 0' }}>Loading content...</p>
        ) : (
          <>
            {Object.entries(schema.sections).map(([sectionKey, section]) => (
              <SectionCard
                key={sectionKey}
                sectionKey={sectionKey}
                section={section}
                get={get}
                update={update}
              />
            ))}

            <div
              style={{
                marginTop: 16,
                padding: '12px 16px',
                background: '#0d0d0d',
                borderRadius: 6,
                border: '1px solid #1a1a1a',
              }}
            >
              <p style={{ color: '#444', fontSize: 12, margin: 0 }}>
                Changes are saved to the database and appear on the live website within 60 seconds.
                No publishing step required.
              </p>
            </div>
          </>
        )}
      </div>

      {/* Panels */}
      <MenuEditor open={menuOpen} onClose={() => setMenuOpen(false)} />
      <PagesManager open={pagesOpen} onClose={() => setPagesOpen(false)} />
    </div>
  )
}

export default function EditorPage() {
  const [activePage, setActivePage] = useState(EDITOR_PAGES[0].key)
  const [menuOpen, setMenuOpen] = useState(false)
  const [pagesOpen, setPagesOpen] = useState(false)

  const handleMenuOpen = useCallback((v: boolean) => {
    setMenuOpen(v)
    if (v) setPagesOpen(false)
  }, [])

  const handlePagesOpen = useCallback((v: boolean) => {
    setPagesOpen(v)
    if (v) setMenuOpen(false)
  }, [])

  return (
    <PageEditorContent
      key={activePage}
      pageKey={activePage}
      onPageChange={setActivePage}
      menuOpen={menuOpen}
      pagesOpen={pagesOpen}
      setMenuOpen={handleMenuOpen}
      setPagesOpen={handlePagesOpen}
    />
  )
}
