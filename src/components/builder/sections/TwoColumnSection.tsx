'use client'

interface Props { data: Record<string, string>; bg?: string }

export default function TwoColumnSection({ data, bg }: Props) {
  const isDark = bg === 'dark'
  return (
    <section style={{ background: isDark ? '#0d0d0d' : bg === 'cream' ? '#fdf9f0' : '#fff', padding: '64px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {data.heading && (
          <h2 style={{ color: isDark ? '#fff' : '#1a1209', fontSize: 30, fontWeight: 300, marginBottom: 40, textAlign: 'center' }}>
            {data.heading}
          </h2>
        )}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
          <div>
            {data.col1Title && <h3 style={{ color: '#C9A84C', fontSize: 18, fontWeight: 600, marginBottom: 12 }}>{data.col1Title}</h3>}
            <p style={{ color: isDark ? 'rgba(255,255,255,0.65)' : '#555', fontSize: 16, lineHeight: 1.75 }}>{data.col1Body}</p>
          </div>
          <div>
            {data.col2Title && <h3 style={{ color: '#C9A84C', fontSize: 18, fontWeight: 600, marginBottom: 12 }}>{data.col2Title}</h3>}
            <p style={{ color: isDark ? 'rgba(255,255,255,0.65)' : '#555', fontSize: 16, lineHeight: 1.75 }}>{data.col2Body}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
