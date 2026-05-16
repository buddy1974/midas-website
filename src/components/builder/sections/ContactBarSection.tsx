interface Props { data: Record<string, string> }

export default function ContactBarSection({ data }: Props) {
  const items = [
    { icon: '📞', label: 'PHONE NUMBER',   value: data.phone  || '+44 (0) 2072062691' },
    { icon: '📱', label: 'MOBILE NUMBER',  value: data.mobile || '+44 (0) 7413041372' },
    { icon: '✉',  label: 'EMAIL',          value: data.email  || 'info@midaspropertyauctions.co.uk' },
    { icon: '🕐', label: 'OPENING TIMES',  value: data.hours  || 'Mon to Fri: 9.00 to 18.00' },
  ]

  return (
    <section style={{
      background: '#0D0D14',
      borderTop: '2px solid #C9A84C',
      borderBottom: '1px solid rgba(201,168,76,0.15)',
    }}>
      <div style={{
        maxWidth: 1280,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
      }}>
        {items.map((item, i) => (
          <div key={i} style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '14px 24px',
            borderRight: i < 3 ? '1px solid rgba(201,168,76,0.15)' : undefined,
          }}>
            <span style={{ color: '#C9A84C', fontSize: 18, flexShrink: 0 }}>{item.icon}</span>
            <div>
              <p style={{ color: '#C9A84C', fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600, margin: 0 }}>
                {item.label}
              </p>
              <p style={{ color: '#E8E4DC', fontSize: 13, fontWeight: 500, margin: '2px 0 0' }}>
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
