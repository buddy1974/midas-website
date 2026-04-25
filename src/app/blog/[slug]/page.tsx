import { type Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Article Coming Soon | Midas Property Auctions',
}

export default function BlogSlugPage() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-6">
          Coming Soon
        </p>
        <h1 className="text-3xl md:text-4xl font-black text-[#1A1A1A] mb-6">
          Article Being Prepared
        </h1>
        <p className="text-[#666] text-lg mb-10 leading-relaxed">
          This article is currently being written by the Midas team. Check back soon or subscribe
          to be notified when new content is published.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/blog"
            className="bg-[#C9A84C] text-[#080809] font-semibold px-6 py-3 rounded hover:bg-[#E8C96A] transition-all"
          >
            ← Back to Blog
          </Link>
          <Link
            href="/register"
            className="border border-[#C9A84C] text-[#C9A84C] px-6 py-3 rounded hover:bg-[rgba(201,168,76,0.05)] transition-colors"
          >
            Join Investor List
          </Link>
        </div>
      </div>
    </div>
  )
}
