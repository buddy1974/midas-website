'use client'

import Link from 'next/link'

interface Props { data: Record<string, string> }

export default function CTABannerSection({ data }: Props) {
  return (
    <section style={{
      background: 'linear-gradient(90deg, #0a0a0a 0%, #1a1209 50%, #0a0a0a 100%)',
      borderTop: '1px solid #1a1a1a',
      borderBottom: '1px solid #1a1a1a',
      padding: '52px 24px',
      textAlign: 'center',
    }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <p style={{ color: '#C9A84C', fontSize: 11, letterSpacing: 4, fontWeight: 700, marginBottom: 8, textTransform: 'uppercase' }}>
          {data.text || 'YOUR CALL TO ACTION'}
        </p>
        {data.subtext && (
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 28 }}>
            {data.subtext}
          </p>
        )}
        {data.ctaText && (
          <Link href={data.ctaUrl || '#'} style={{
            background: '#C9A84C', color: '#000',
            padding: '13px 32px', borderRadius: 3,
            fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase',
            textDecoration: 'none', display: 'inline-block',
          }}>
            {data.ctaText}
          </Link>
        )}
      </div>
    </section>
  )
}
