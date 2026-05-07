'use client'

interface Item { quote: string; author: string; role: string }
interface Props { data: Record<string, string>; bg?: string }

export default function TestimonialsSection({ data, bg }: Props) {
  const isDark = bg !== 'white' && bg !== 'cream'
  let items: Item[] = []
  try { items = JSON.parse(data.items || '[]') as Item[] } catch { items = [] }

  return (
    <section style={{ background: isDark ? '#0d0d0d' : '#fdf9f0', padding: '72px 24px' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        {data.heading && (
          <h2 style={{ color: isDark ? '#fff' : '#1a1209', fontSize: 32, fontWeight: 300, marginBottom: 48, textAlign: 'center' }}>
            {data.heading}
          </h2>
        )}
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(items.length, 3)}, 1fr)`, gap: 24 }}>
          {items.map((item, i) => (
            <div key={i} style={{ background: isDark ? '#111' : '#fff', border: `1px solid ${isDark ? '#1a1a1a' : '#e8e2d4'}`, borderRadius: 8, padding: '28px 24px' }}>
              <p style={{ color: '#C9A84C', fontSize: 24, margin: '0 0 14px' }}>❝</p>
              <p style={{ color: isDark ? 'rgba(255,255,255,0.8)' : '#333', fontSize: 15, lineHeight: 1.7, marginBottom: 20, fontStyle: 'italic' }}>
                {item.quote}
              </p>
              <div>
                <p style={{ color: isDark ? '#fff' : '#1a1209', fontWeight: 600, fontSize: 14, margin: 0 }}>{item.author}</p>
                <p style={{ color: '#C9A84C', fontSize: 12, margin: '2px 0 0' }}>{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
