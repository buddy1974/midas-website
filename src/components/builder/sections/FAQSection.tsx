'use client'

import { useState } from 'react'

interface FAQItem { question: string; answer: string }
interface Props { data: Record<string, string>; bg?: string }

export default function FAQSection({ data, bg }: Props) {
  const isDark = bg === 'dark'
  const [open, setOpen] = useState<number | null>(null)

  let items: FAQItem[] = []
  try { items = JSON.parse(data.items || '[]') as FAQItem[] } catch { items = [] }

  return (
    <section style={{ background: isDark ? '#0d0d0d' : bg === 'cream' ? '#fdf9f0' : '#fff', padding: '72px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        {data.heading && (
          <h2 style={{ color: isDark ? '#fff' : '#1a1209', fontSize: 32, fontWeight: 300, marginBottom: 40, textAlign: 'center' }}>
            {data.heading}
          </h2>
        )}
        {items.map((item, i) => (
          <div key={i} style={{ borderBottom: `1px solid ${isDark ? '#1a1a1a' : '#e8e2d4'}` }}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '18px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
              }}
            >
              <span style={{ color: isDark ? '#fff' : '#1a1209', fontSize: 16, fontWeight: 500 }}>{item.question}</span>
              <span style={{ color: '#C9A84C', fontSize: 20, flexShrink: 0, marginLeft: 16 }}>{open === i ? '−' : '+'}</span>
            </button>
            {open === i && (
              <div style={{ paddingBottom: 20 }}>
                <p style={{ color: isDark ? 'rgba(255,255,255,0.65)' : '#666', fontSize: 15, lineHeight: 1.7, margin: 0 }}>
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
