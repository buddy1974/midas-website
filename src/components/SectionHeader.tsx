interface SectionHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center' | 'right'
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'center',
}: SectionHeaderProps) {
  const alignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }[align]

  return (
    <div className={`${alignClass} mb-12`}>
      {eyebrow && (
        <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">{title}</h2>
      {subtitle && (
        <p className="text-[#666] text-lg max-w-2xl mx-auto">{subtitle}</p>
      )}
    </div>
  )
}
