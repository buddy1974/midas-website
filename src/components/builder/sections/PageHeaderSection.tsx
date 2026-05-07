'use client'

interface Props { data: Record<string, string> }

export default function PageHeaderSection({ data }: Props) {
  return (
    <section style={{
      background: 'linear-gradient(180deg, #0a0a0a 0%, #111 100%)',
      padding: '56px 24px',
      textAlign: 'center',
      borderBottom: '1px solid #1a1a1a',
    }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        {data.eyebrow && (
          <p style={{ color: '#C9A84C', fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 12, fontWeight: 600 }}>
            {data.eyebrow}
          </p>
        )}
        <h1 style={{ color: '#fff', fontSize: 36, fontWeight: 300, lineHeight: 1.2, marginBottom: 14, letterSpacing: -0.3 }}>
          {data.title || 'Page Title'}
        </h1>
        {data.subtitle && (
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 16, lineHeight: 1.6, maxWidth: 520, margin: '0 auto' }}>
            {data.subtitle}
          </p>
        )}
      </div>
    </section>
  )
}
