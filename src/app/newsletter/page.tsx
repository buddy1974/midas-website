import { getSql } from '@/lib/db'
import type { NewsletterRow } from '@/lib/db'
import Link from 'next/link'
import SectionHeader from '@/components/SectionHeader'

export const revalidate = 300 // 5-minute ISR

const PER_PAGE = 9

interface Props {
  searchParams: Promise<{ page?: string }>
}

function formatDate(d: string | null): string {
  if (!d) return ''
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default async function NewsletterPage({ searchParams }: Props) {
  const { page: pageParam } = await searchParams
  const page = Math.max(1, parseInt(pageParam ?? '1') || 1)
  const offset = (page - 1) * PER_PAGE

  let newsletters: NewsletterRow[] = []
  let total = 0

  try {
    const sql = getSql()
    const [countRow] = await sql<[{ count: string }]>`
      SELECT COUNT(*)::text AS count FROM newsletters WHERE is_published = true`
    total = parseInt(countRow?.count ?? '0')

    newsletters = await sql<NewsletterRow[]>`
      SELECT * FROM newsletters
      WHERE is_published = true
      ORDER BY sent_at DESC NULLS LAST, created_at DESC
      LIMIT ${PER_PAGE} OFFSET ${offset}`
  } catch { /* DB not yet ready */ }

  const totalPages = Math.ceil(total / PER_PAGE)

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="Stay Informed"
          title="Newsletter Archive"
          subtitle="Insights, market updates and auction news from the Midas team."
        />

        {newsletters.length === 0 ? (
          <div className="text-center py-20 text-[#888]">No newsletters yet — check back soon.</div>
        ) : (
          <>
            {/* Card grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
              {newsletters.map(n => (
                <Link
                  key={n.id}
                  href={`/newsletter/${n.id}`}
                  className="group block bg-white border border-[#E8E5DE] rounded-xl overflow-hidden hover:border-[#C9A84C] hover:shadow-[0_4px_20px_rgba(201,168,76,0.12)] transition-all duration-300"
                >
                  {/* Gold header strip */}
                  <div className="h-2 bg-gradient-to-r from-[#C9A84C] to-[#E8C96A]" />

                  <div className="p-6">
                    {/* Date */}
                    {n.sent_at && (
                      <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-widest mb-3">
                        {formatDate(n.sent_at)}
                      </p>
                    )}

                    {/* Subject */}
                    <h3 className="text-[#1A1A1A] font-bold text-base leading-snug mb-3 group-hover:text-[#C9A84C] transition-colors line-clamp-2">
                      {n.subject}
                    </h3>

                    {/* Preview */}
                    {n.preview && (
                      <p className="text-[#666] text-sm leading-relaxed line-clamp-3 mb-4">
                        {n.preview}
                      </p>
                    )}

                    <span className="text-[#C9A84C] text-sm font-semibold group-hover:underline">
                      Read newsletter →
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-14">
                {page > 1 && (
                  <Link
                    href={`/newsletter?page=${page - 1}`}
                    className="px-4 py-2 border border-[#E0DDD4] text-[#666] text-sm rounded hover:border-[#C9A84C] hover:text-[#1A1A1A] transition-all"
                  >
                    ← Previous
                  </Link>
                )}

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => {
                  // Show first, last, current ±1, and ellipses
                  const show = p === 1 || p === totalPages || Math.abs(p - page) <= 1
                  const ellipsisBefore = p === page - 2 && page > 3
                  const ellipsisAfter  = p === page + 2 && page < totalPages - 2
                  if (!show && !ellipsisBefore && !ellipsisAfter) return null
                  if (ellipsisBefore || ellipsisAfter) {
                    return <span key={`e${p}`} className="px-2 text-[#999]">…</span>
                  }
                  return (
                    <Link
                      key={p}
                      href={`/newsletter?page=${p}`}
                      className={`w-9 h-9 flex items-center justify-center rounded text-sm font-medium transition-all ${
                        p === page
                          ? 'bg-[#C9A84C] text-[#080809]'
                          : 'border border-[#E0DDD4] text-[#666] hover:border-[#C9A84C]'
                      }`}
                    >
                      {p}
                    </Link>
                  )
                })}

                {page < totalPages && (
                  <Link
                    href={`/newsletter?page=${page + 1}`}
                    className="px-4 py-2 border border-[#E0DDD4] text-[#666] text-sm rounded hover:border-[#C9A84C] hover:text-[#1A1A1A] transition-all"
                  >
                    Next →
                  </Link>
                )}
              </div>
            )}

            <p className="text-center text-[#bbb] text-xs mt-6">
              Showing {offset + 1}–{Math.min(offset + PER_PAGE, total)} of {total} newsletters
            </p>
          </>
        )}
      </div>
    </div>
  )
}
