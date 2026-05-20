interface Props { data: Record<string, string>; bg?: string }

const ALLOWED_TAGS = new Set(['p', 'br', 'strong', 'em', 'u', 's', 'h1', 'h2', 'h3', 'h4', 'ul', 'ol', 'li', 'a', 'blockquote', 'hr', 'span'])

function sanitizeHref(href: string): string {
  const trimmed = href.trim()
  if (/^(https?:|mailto:|tel:|\/(?!\/))/i.test(trimmed)) return trimmed
  return '#'
}

function sanitizeHtml(html: string): string {
  return html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<\s*(script|style|iframe|object|embed|link|meta)[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi, '')
    .replace(/<\s*\/?\s*([a-z0-9-]+)([^>]*)>/gi, (match, rawTag: string, rawAttrs: string) => {
      const tag = rawTag.toLowerCase()
      if (!ALLOWED_TAGS.has(tag)) return ''
      if (match.startsWith('</')) return `</${tag}>`
      if (tag !== 'a') return `<${tag}>`

      const hrefMatch = rawAttrs.match(/\s href\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+))/i)
      const targetMatch = rawAttrs.match(/\s target\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+))/i)
      const href = sanitizeHref(hrefMatch?.[2] ?? hrefMatch?.[3] ?? hrefMatch?.[4] ?? '#')
      const target = (targetMatch?.[2] ?? targetMatch?.[3] ?? targetMatch?.[4]) === '_blank' ? ' target="_blank" rel="noopener noreferrer"' : ''
      return `<a href="${href.replace(/"/g, '&quot;')}"${target}>`
    })
}

export default function RichTextSection({ data, bg }: Props) {
  const isDark = bg === 'dark'
  const cols = data.columns === '2' ? 2 : 1
  const align = data.alignment || 'left'

  const safeHtml = sanitizeHtml(data.content || '<p>Add your content in the properties panel.</p>')

  return (
    <section style={{ background: isDark ? '#0d0d0d' : bg === 'cream' ? '#fdf9f0' : '#fff', padding: '64px 24px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {data.heading && (
          <h2 style={{ color: isDark ? '#fff' : '#1a1209', fontSize: 30, fontWeight: 300, marginBottom: 28, textAlign: align as 'left' | 'center' | 'right' }}>
            {data.heading}
          </h2>
        )}
        <div
          style={{ columnCount: cols, columnGap: 48, color: isDark ? 'rgba(255,255,255,0.7)' : '#555', fontSize: 16, lineHeight: 1.75, textAlign: align as 'left' | 'center' | 'right' }}
          dangerouslySetInnerHTML={{ __html: safeHtml }}
        />
      </div>
    </section>
  )
}
