'use client'

interface CardItem { icon: string; title: string; body: string }
interface Props { data: Record<string, string>; bg?: string }

export default function CardGridSection({ data, bg }: Props) {
  const isDark = bg === 'dark'
  const cols = parseInt(data.columns || '3', 10)

  let cards: CardItem[] = []
  try { cards = JSON.parse(data.cards || '[]') as CardItem[] } catch { cards = [] }

  return (
    <section style={{ background: isDark ? '#0d0d0d' : bg === 'cream' ? '#fdf9f0' : '#fff', padding: '72px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {data.heading && (
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ color: isDark ? '#fff' : '#1a1209', fontSize: 32, fontWeight: 300, marginBottom: 12 }}>{data.heading}</h2>
            {data.subheading && <p style={{ color: isDark ? 'rgba(255,255,255,0.55)' : '#777', fontSize: 16 }}>{data.subheading}</p>}
          </div>
        )}
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 24 }}>
          {cards.map((card, i) => (
            <div key={i} style={{
              background: isDark ? '#111' : '#fff',
              border: `1px solid ${isDark ? '#1a1a1a' : '#e8e2d4'}`,
              borderRadius: 8,
              padding: '28px 24px',
            }}>
              {card.icon && <div style={{ fontSize: 32, marginBottom: 14 }}>{card.icon}</div>}
              <h3 style={{ color: isDark ? '#fff' : '#1a1209', fontSize: 17, fontWeight: 600, marginBottom: 10 }}>{card.title}</h3>
              <p style={{ color: isDark ? 'rgba(255,255,255,0.6)' : '#666', fontSize: 14, lineHeight: 1.65, margin: 0 }}>{card.body}</p>
            </div>
          ))}
          {cards.length === 0 && (
            <div style={{ gridColumn: `1 / -1`, textAlign: 'center', padding: '32px', color: '#666', border: '2px dashed #2a2a2a', borderRadius: 8 }}>
              Add cards in the Properties panel →
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
