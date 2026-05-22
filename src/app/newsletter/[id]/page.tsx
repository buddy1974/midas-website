import { getSql } from '@/lib/db'
import type { NewsletterRow } from '@/lib/db'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import DOMPurify from 'isomorphic-dompurify'

export const revalidate = 300

interface Props {
  params: Promise<{ id: string }>
}

function formatDate(d: string | null): string {
  if (!d) return ''
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params
  try {
    const sql = getSql()
    const [row] = await sql<NewsletterRow[]>`
      SELECT subject, preview FROM newsletters WHERE id = ${id} AND is_published = true`
    if (!row) return {}
    return { title: row.subject, description: row.preview ?? undefined }
  } catch { return {} }
}

export default async function NewsletterDetailPage({ params }: Props) {
  const { id } = await params
  let newsletter: NewsletterRow | undefined

  try {
    const sql = getSql()
    const [row] = await sql<NewsletterRow[]>`
      SELECT * FROM newsletters WHERE id = ${id} AND is_published = true`
    newsletter = row
  } catch { /* DB not ready */ }

  if (!newsletter) notFound()

  // Sanitize HTML — allow full email HTML tags but strip scripts
  const safeHtml = newsletter.html_body
    ? DOMPurify.sanitize(newsletter.html_body, {
        ALLOWED_TAGS: [
          'p','br','strong','b','em','i','u','s','strike','h1','h2','h3','h4','h5','h6',
          'ul','ol','li','a','img','table','thead','tbody','tr','th','td',
          'blockquote','hr','span','div','center','font','sup','sub',
          'figure','figcaption','caption',
        ],
        ALLOWED_ATTR: [
          'href','src','alt','title','class','style','width','height','align',
          'valign','border','cellpadding','cellspacing','colspan','rowspan',
          'target','rel','color','bgcolor','face','size',
        ],
        FORCE_BODY: true,
      })
    : null

  return (
    <div className="min-h-screen bg-[#F8F7F4] pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-6">

        {/* Back link */}
        <Link
          href="/newsletter"
          className="inline-flex items-center gap-2 text-[#888] text-sm hover:text-[#C9A84C] transition-colors mb-8"
        >
          ← Newsletter Archive
        </Link>

        {/* Header */}
        <div className="bg-white border border-[#E8E5DE] rounded-xl overflow-hidden mb-8 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
          <div className="h-1.5 bg-gradient-to-r from-[#C9A84C] to-[#E8C96A]" />
          <div className="px-8 py-8">
            {newsletter.sent_at && (
              <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-widest mb-3">
                {formatDate(newsletter.sent_at)}
              </p>
            )}
            <h1 className="text-[#1A1A1A] font-bold text-2xl leading-tight">
              {newsletter.subject}
            </h1>
          </div>
        </div>

        {/* Newsletter content */}
        <div className="bg-white border border-[#E8E5DE] rounded-xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
          {safeHtml ? (
            // Email HTML rendered in an isolated container with reset styles
            <div
              className="newsletter-body"
              style={{ padding: '0', overflowX: 'auto' }}
              dangerouslySetInnerHTML={{ __html: safeHtml }}
            />
          ) : (
            <div className="px-8 py-16 text-center text-[#888]">
              <p className="text-4xl mb-4">✉️</p>
              <p className="font-semibold text-[#1A1A1A] mb-2">Content not available</p>
              <p className="text-sm">The HTML body for this newsletter hasn&apos;t been synced yet.</p>
            </div>
          )}
        </div>

        {/* Footer nav */}
        <div className="flex justify-between items-center mt-10">
          <Link
            href="/newsletter"
            className="text-[#888] text-sm hover:text-[#C9A84C] transition-colors"
          >
            ← Back to archive
          </Link>
          <Link
            href="/register"
            className="bg-[#C9A84C] text-[#080809] font-semibold text-sm px-5 py-2.5 rounded hover:bg-[#E8C96A] transition-colors"
          >
            Subscribe to updates →
          </Link>
        </div>
      </div>
    </div>
  )
}
