interface Props { data: Record<string, string>; bg?: string }

export default function DividerSection({ data, bg }: Props) {
  const isDark = bg === 'dark' || !bg || bg === 'white'
  const color = data.color === 'gold' ? '#C9A84C' : data.color === 'white' ? '#fff' : isDark ? '#1a1a1a' : '#e0d8c8'
  const isGradient = data.style === 'gradient'
  const isDots = data.style === 'dots'

  if (isDots) return (
    <div style={{ padding: '4px 0', display: 'flex', justifyContent: 'center', gap: 8 }}>
      {[0, 1, 2].map(i => <span key={i} style={{ width: 4, height: 4, borderRadius: '50%', background: color, display: 'inline-block' }} />)}
    </div>
  )

  return (
    <hr style={{
      border: 'none',
      borderTop: isGradient ? 'none' : `1px solid ${color}`,
      backgroundImage: isGradient ? `linear-gradient(90deg, transparent, ${color}, transparent)` : 'none',
      height: isGradient ? 1 : 0,
      margin: '8px 24px',
    }} />
  )
}
