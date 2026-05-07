'use client'

import Link from 'next/link'

interface Props { data: Record<string, string>; preview?: boolean }

export default function HeroLightSection({ data, preview }: Props) {
  return (
    <section style={{
      background: 'linear-gradient(135deg, #fdf9f0 0%, #faf5e8 100%)',
      padding: '80px 24px',
      textAlign: 'center',
    }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        {data.eyebrow && (
          <p style={{ color: '#C9A84C', fontSize: 11, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 16, fontWeight: 600 }}>
            {data.eyebrow}
          </p>
        )}
        <h1 style={{ color: '#1a1209', fontSize: preview ? 28 : 46, fontWeight: 300, lineHeight: 1.15, marginBottom: 20, letterSpacing: -0.5 }}>
          {data.title || 'Your Headline Here'}
        </h1>
        {data.subtitle && (
          <p style={{ color: '#555', fontSize: preview ? 13 : 18, lineHeight: 1.7, maxWidth: 580, margin: '0 auto 32px' }}>
            {data.subtitle}
          </p>
        )}
        {data.ctaText && (
          preview
            ? <span style={{ background: '#C9A84C', color: '#000', padding: '12px 28px', borderRadius: 3, fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', display: 'inline-block' }}>{data.ctaText}</span>
            : <Link href={data.ctaUrl || '#'} style={{ background: '#C9A84C', color: '#000', padding: '14px 32px', borderRadius: 3, fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', textDecoration: 'none', display: 'inline-block' }}>{data.ctaText}</Link>
        )}
      </div>
    </section>
  )
}
