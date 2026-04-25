import type { Metadata } from 'next'
import Link from 'next/link'
import { testimonials } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Client Testimonials | Midas Property Auctions',
  description:
    'Real feedback from buyers, sellers and investors across London and Essex. See what clients say about Midas Property Auctions.',
}

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-20">

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="bg-[#F8F7F4] py-16 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
            What Clients Say
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-[#1A1A1A] mb-5">
            Client Testimonials
          </h1>
          <p className="text-[#666] text-lg">
            Real feedback from buyers, sellers and investors across London and Essex.
          </p>
        </div>
      </section>

      {/* ── Stats row ──────────────────────────────────────────────────── */}
      <section className="bg-white border-y border-[#E8E5DE] py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[
              { value: '340+', label: 'Properties Sold' },
              { value: '2,847', label: 'Active Investors' },
              { value: '5★', label: 'Average Rating' },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-3xl font-black text-[#1A1A1A] mb-1">{value}</p>
                <p className="text-[#666] text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials grid ──────────────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-white border border-[#E8E5DE] rounded-xl p-8 shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
              >
                {/* Quote mark */}
                <p className="text-[#C9A84C] text-4xl font-serif leading-none mb-4">&ldquo;</p>

                {/* Stars */}
                <p className="text-[#C9A84C] text-base mb-4" aria-label={`${t.rating} stars`}>
                  {Array(t.rating).fill('★').join('')}
                </p>

                {/* Text */}
                <p className="text-[#444] text-base leading-relaxed mb-6 italic">{t.text}</p>

                {/* Attribution */}
                <p className="font-bold text-[#1A1A1A]">{t.name}</p>
                <p className="text-[#888] text-sm">{t.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Google Review ──────────────────────────────────────────────── */}
      <section className="bg-[#F8F7F4] py-16 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-2xl font-black text-[#1A1A1A] mb-4">Share Your Experience</h2>
          <p className="text-[#666] text-base mb-8">
            Had a great experience with Midas? We would love your review.
          </p>
          <a
            href="https://g.page/r/midaspropertyauctions/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#C9A84C] text-[#080809] font-semibold px-6 py-3 rounded hover:bg-[#E8C96A] transition-all"
          >
            Leave a Google Review →
          </a>
          <p className="text-[#999] text-sm mt-4">Your review helps other investors find us.</p>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <section className="bg-[#080809] py-20 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-8">
            Ready to Work With Midas?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/properties"
              className="inline-block bg-[#C9A84C] text-[#080809] font-semibold px-6 py-3 rounded hover:bg-[#E8C96A] transition-all"
            >
              View Current Lots
            </Link>
            <Link
              href="/register"
              className="inline-block border border-white text-white px-6 py-3 rounded hover:bg-white hover:text-[#080809] transition-all font-semibold"
            >
              Register to Bid
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
