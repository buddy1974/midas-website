'use client'

import Link from 'next/link'
import Image from 'next/image'

interface Props { data: Record<string, string>; bg?: string }

export default function TextImageSection({ data, bg }: Props) {
  const imageRight = data.imagePosition !== 'left'
  const isDark = bg === 'dark'
  const hasImage = Boolean(data.imageUrl)

  const textCol = (
    <div style={{ flex: 1, minWidth: 280 }}>
      {data.eyebrow && (
        <p style={{ color: '#C9A84C', fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 12, fontWeight: 600 }}>
          {data.eyebrow}
        </p>
      )}
      <h2 style={{ color: isDark ? '#fff' : '#1a1209', fontSize: 32, fontWeight: 300, lineHeight: 1.25, marginBottom: 18 }}>
        {data.heading || 'Section Heading'}
      </h2>
      {data.body && (
        <p style={{ color: isDark ? 'rgba(255,255,255,0.65)' : '#555', fontSize: 16, lineHeight: 1.75, marginBottom: data.ctaText ? 24 : 0 }}>
          {data.body}
        </p>
      )}
      {data.ctaText && (
        <Link href={data.ctaUrl || '#'} style={{ background: '#C9A84C', color: '#000', padding: '11px 24px', borderRadius: 3, fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', textDecoration: 'none', display: 'inline-block' }}>
          {data.ctaText}
        </Link>
      )}
    </div>
  )

  const imageCol = (
    <div style={{ flex: 1, minWidth: 280, minHeight: 300, background: isDark ? '#1a1a1a' : '#f0ece3', borderRadius: 8, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {hasImage
        ? <Image src={data.imageUrl} alt={data.imageAlt || ''} width={600} height={400} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        : <p style={{ color: '#666', fontSize: 13 }}>Add image URL in properties →</p>
      }
    </div>
  )

  return (
    <section style={{
      background: isDark ? '#0d0d0d' : bg === 'cream' ? '#fdf9f0' : '#fff',
      padding: '72px 24px',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: 64, alignItems: 'center', flexWrap: 'wrap' }}>
        {imageRight ? <>{textCol}{imageCol}</> : <>{imageCol}{textCol}</>}
      </div>
    </section>
  )
}
