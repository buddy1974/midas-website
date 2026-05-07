'use client'

interface Props { data: Record<string, string> }

export default function StatsBarSection({ data }: Props) {
  const stats = [
    { value: data.stat1Value, label: data.stat1Label },
    { value: data.stat2Value, label: data.stat2Label },
    { value: data.stat3Value, label: data.stat3Label },
    data.stat4Value ? { value: data.stat4Value, label: data.stat4Label } : null,
  ].filter(Boolean) as { value: string; label: string }[]

  return (
    <section style={{ background: '#111', borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a', padding: '36px 24px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: `repeat(${stats.length}, 1fr)`, gap: 24, textAlign: 'center' }}>
        {stats.map((s, i) => (
          <div key={i}>
            <p style={{ color: '#C9A84C', fontSize: 36, fontWeight: 700, margin: '0 0 4px', letterSpacing: -1 }}>{s.value}</p>
            <p style={{ color: '#888', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', margin: 0 }}>{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
