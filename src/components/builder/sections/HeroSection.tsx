'use client'

import Link from 'next/link'

interface HeroSectionProps {
  data: Record<string, string>
  preview?: boolean
}

export default function HeroSection({ data, preview }: HeroSectionProps) {
  const scale = preview ? { transform: 'scale(0.6)', transformOrigin: 'top center', width: '166.67%', marginLeft: '-33.33%' } : {}

  return (
    <section
      style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1209 50%, #0a0a0a 100%)',
        padding: '80px 24px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        ...scale,
      }}
    >
      {/* Gold grid overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative' }}>
        {data.eyebrow && (
          <p style={{
            color: '#C9A84C', fontSize: 11, letterSpacing: 4, textTransform: 'uppercase',
            marginBottom: 20, fontWeight: 600,
          }}>
            {data.eyebrow}
          </p>
        )}

        <h1 style={{
          color: '#fff',
          fontSize: preview ? 32 : 52,
          fontWeight: 300,
          lineHeight: 1.1,
          marginBottom: 24,
          letterSpacing: -1,
        }}>
          {data.title || 'Your Headline Here'}
        </h1>

        {data.subtitle && (
          <p style={{
            color: 'rgba(255,255,255,0.65)',
            fontSize: preview ? 14 : 18,
            lineHeight: 1.7,
            maxWidth: 600,
            margin: '0 auto 36px',
          }}>
            {data.subtitle}
          </p>
        )}

        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          {data.ctaText && (
            preview
              ? <span style={{ background: '#C9A84C', color: '#000', padding: '12px 28px', borderRadius: 3, fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>{data.ctaText}</span>
              : <Link href={data.ctaUrl || '#'} style={{ background: '#C9A84C', color: '#000', padding: '14px 32px', borderRadius: 3, fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', textDecoration: 'none' }}>{data.ctaText}</Link>
          )}
          {data.ctaText2 && (
            preview
              ? <span style={{ border: '1px solid rgba(201,168,76,0.4)', color: '#C9A84C', padding: '12px 28px', borderRadius: 3, fontSize: 13, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>{data.ctaText2}</span>
              : <Link href={data.ctaUrl2 || '#'} style={{ border: '1px solid rgba(201,168,76,0.4)', color: '#C9A84C', padding: '14px 32px', borderRadius: 3, fontSize: 13, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', textDecoration: 'none' }}>{data.ctaText2}</Link>
          )}
          {data.ctaText3 && (
            preview
              ? <span style={{ border: '1px solid rgba(201,168,76,0.4)', color: '#C9A84C', padding: '12px 28px', borderRadius: 3, fontSize: 13, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>{data.ctaText3}</span>
              : <Link href={data.ctaUrl3 || '#'} style={{ border: '1px solid rgba(201,168,76,0.4)', color: '#C9A84C', padding: '14px 32px', borderRadius: 3, fontSize: 13, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', textDecoration: 'none' }}>{data.ctaText3}</Link>
          )}
        </div>

        {data.phone && (
          <p style={{ marginTop: 24, color: '#C9A84C', fontSize: 13 }}>{data.phone}</p>
        )}
      </div>
    </section>
  )
}
