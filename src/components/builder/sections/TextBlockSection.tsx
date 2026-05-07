'use client'

import Link from 'next/link'

interface Props { data: Record<string, string>; bg?: string }

export default function TextBlockSection({ data, bg }: Props) {
  const align = (data.alignment as 'left' | 'center' | 'right') || 'center'
  const isDark = bg === 'dark'

  return (
    <section style={{
      background: isDark ? '#0d0d0d' : bg === 'cream' ? '#fdf9f0' : '#fff',
      padding: '64px 24px',
      textAlign: align,
    }}>
      <div style={{ maxWidth: 740, margin: '0 auto' }}>
        {data.eyebrow && (
          <p style={{ color: '#C9A84C', fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 14, fontWeight: 600 }}>
            {data.eyebrow}
          </p>
        )}
        {data.heading && (
          <h2 style={{ color: isDark ? '#fff' : '#1a1209', fontSize: 34, fontWeight: 300, lineHeight: 1.25, marginBottom: 20, letterSpacing: -0.3 }}>
            {data.heading}
          </h2>
        )}
        {data.body && (
          <p style={{ color: isDark ? 'rgba(255,255,255,0.65)' : '#555', fontSize: 17, lineHeight: 1.75, marginBottom: data.ctaText ? 28 : 0 }}>
            {data.body}
          </p>
        )}
        {data.ctaText && (
          <Link href={data.ctaUrl || '#'} style={{ background: '#C9A84C', color: '#000', padding: '12px 28px', borderRadius: 3, fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', textDecoration: 'none', display: 'inline-block' }}>
            {data.ctaText}
          </Link>
        )}
      </div>
    </section>
  )
}
