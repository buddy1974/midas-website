'use client'

interface StepItem { title: string; body: string }
interface Props { data: Record<string, string>; bg?: string }

export default function StepsSection({ data, bg }: Props) {
  const isDark = bg === 'dark'
  let steps: StepItem[] = []
  try { steps = JSON.parse(data.steps || '[]') as StepItem[] } catch { steps = [] }

  return (
    <section style={{ background: isDark ? '#0d0d0d' : bg === 'cream' ? '#fdf9f0' : '#fff', padding: '72px 24px' }}>
      <div style={{ maxWidth: 880, margin: '0 auto' }}>
        {data.heading && (
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ color: isDark ? '#fff' : '#1a1209', fontSize: 32, fontWeight: 300, marginBottom: 10 }}>{data.heading}</h2>
            {data.subheading && <p style={{ color: isDark ? 'rgba(255,255,255,0.55)' : '#777', fontSize: 16 }}>{data.subheading}</p>}
          </div>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {steps.map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: 28, alignItems: 'flex-start', padding: '24px 0', borderBottom: `1px solid ${isDark ? '#1a1a1a' : '#e8e2d4'}` }}>
              <div style={{
                width: 44, height: 44, borderRadius: '50%',
                background: '#C9A84C', color: '#000',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 17, fontWeight: 700, flexShrink: 0,
              }}>
                {i + 1}
              </div>
              <div>
                <h3 style={{ color: isDark ? '#fff' : '#1a1209', fontSize: 18, fontWeight: 600, marginBottom: 6 }}>{step.title}</h3>
                <p style={{ color: isDark ? 'rgba(255,255,255,0.6)' : '#666', fontSize: 15, lineHeight: 1.65, margin: 0 }}>{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
