import DOMPurify from 'isomorphic-dompurify'

interface Props { data: Record<string, string>; bg?: string }

export default function RichTextSection({ data, bg }: Props) {
  const isDark = bg === 'dark'
  const cols = data.columns === '2' ? 2 : 1
  const align = data.alignment || 'left'

  const safeHtml = DOMPurify.sanitize(data.content || '<p>Add your content in the properties panel.</p>', {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 's', 'h1', 'h2', 'h3', 'h4', 'ul', 'ol', 'li', 'a', 'blockquote', 'hr', 'span'],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class', 'style'],
    FORCE_BODY: true,
  })

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
