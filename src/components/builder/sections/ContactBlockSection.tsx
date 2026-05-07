'use client'

interface Props { data: Record<string, string>; bg?: string }

export default function ContactBlockSection({ data, bg }: Props) {
  const isDark = bg === 'dark'
  const cards = [
    { icon: '📍', label: 'Address',  value: data.address },
    { icon: '📞', label: 'Phone',    value: data.phone },
    { icon: '📱', label: 'Mobile',   value: data.mobile },
    { icon: '✉',  label: 'Email',    value: data.email },
    { icon: '🕐', label: 'Hours',    value: data.hours },
  ].filter(c => c.value)

  return (
    <section style={{ background: isDark ? '#0d0d0d' : bg === 'cream' ? '#fdf9f0' : '#fff', padding: '72px 24px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {data.heading && (
          <h2 style={{ color: isDark ? '#fff' : '#1a1209', fontSize: 32, fontWeight: 300, marginBottom: 40, textAlign: 'center' }}>
            {data.heading}
          </h2>
        )}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
          {cards.map((c, i) => (
            <div key={i} style={{ background: isDark ? '#111' : '#fff', border: `1px solid ${isDark ? '#1a1a1a' : '#e8e2d4'}`, borderRadius: 8, padding: '24px 20px' }}>
              <div style={{ fontSize: 22, marginBottom: 10 }}>{c.icon}</div>
              <p style={{ color: '#C9A84C', fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 6, fontWeight: 600 }}>{c.label}</p>
              <p style={{ color: isDark ? '#ccc' : '#333', fontSize: 14, lineHeight: 1.5, margin: 0, whiteSpace: 'pre-line' }}>{c.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
