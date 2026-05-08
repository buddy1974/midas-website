'use client'

import { useEffect, useState } from 'react'
import { useBuilderState } from './hooks/useBuilderState'
import BuilderTopBar from './BuilderTopBar'
import BuilderLibrary from './BuilderLibrary'
import BuilderCanvas from './BuilderCanvas'
import PropertiesPanel from './PropertiesPanel'
import NewPageModal from './NewPageModal'

const C = { bg: '#0a0a0a', panel: '#0d0d0d', border: '#1a1a1a', gold: '#C9A84C', muted: '#666' }
const DEVICE_WIDTHS = { desktop: null, tablet: 768, mobile: 375 } as const

function MobileGuard() {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: C.bg, display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: 16, padding: 32, textAlign: 'center',
    }}>
      <span style={{ fontSize: 48 }}>🖥️</span>
      <p style={{ color: C.gold, fontSize: 18, fontWeight: 700, margin: 0 }}>Desktop required</p>
      <p style={{ color: C.muted, fontSize: 14, margin: 0, maxWidth: 300, lineHeight: 1.6 }}>
        The page builder needs a screen wider than 768px. Please open it on a desktop or laptop.
      </p>
    </div>
  )
}

export default function BuilderPage() {
  const state = useBuilderState()
  const { layout, selected, setSelected, device, updateSection, updateSectionSettings } = state

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  if (isMobile) return <MobileGuard />

  const selectedSection = layout?.sections.find(s => s.id === selected) ?? null
  const canvasWidth = DEVICE_WIDTHS[device]

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', flexDirection: 'column', background: C.bg, color: '#e0e0e0', overflow: 'hidden' }}>

      <BuilderTopBar state={state} />

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <BuilderLibrary state={state} />

        <BuilderCanvas state={state} canvasWidth={canvasWidth} />

        <div style={{ width: selectedSection ? 300 : 0, transition: 'width 0.2s', overflow: 'hidden', borderLeft: `1px solid ${C.border}`, background: C.panel, flexShrink: 0 }}>
          {selectedSection && (
            <PropertiesPanel
              section={selectedSection}
              onChange={data => updateSection(selectedSection.id, data)}
              onSettingsChange={settings => updateSectionSettings(selectedSection.id, settings)}
              onClose={() => setSelected(null)}
            />
          )}
        </div>
      </div>

      <NewPageModal state={state} />
    </div>
  )
}
