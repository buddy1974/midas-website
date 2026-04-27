import type { Metadata } from 'next'
import Link from 'next/link'
import { pastAuctions } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Previous Auction Results | Midas Property Auctions',
  description:
    'Transparent results from every Midas Property Auctions event. View lots offered, lots sold, success rates and total raised per auction.',
}

function parseTotal(value: string): number {
  return parseInt(value.replace(/[£,]/g, ''), 10)
}

const MAX_VALUE = 4_820_000

export default function PastAuctionsPage() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-20">

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="bg-[#F8F7F4] py-16 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
            Track Record
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-[#1A1A1A] mb-5">
            Previous Auction Results
          </h1>
          <p className="text-[#666] text-lg">
            Transparent results from every auction event.
          </p>
        </div>
      </section>

      {/* ── Stats row ──────────────────────────────────────────────────── */}
      <section className="bg-white border-y border-[#E8E5DE] py-12">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '340+', label: 'Properties Sold' },
              { value: '£14.8M+', label: 'Total Raised' },
              { value: '97%', label: 'Success Rate' },
              { value: '28 days', label: 'Avg. Completion' },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-3xl font-black text-[#1A1A1A] mb-1">{value}</p>
                <p className="text-[#666] text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Results ────────────────────────────────────────────────────── */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-black text-[#1A1A1A] mb-8">Auction Results</h2>

          {pastAuctions.map((auction) => {
            const successRate = Math.round((auction.sold / auction.lots) * 100)
            return (
              <div
                key={auction.title}
                className="bg-white border border-[#E8E5DE] border-l-4 border-l-[#C9A84C] rounded-xl p-6 mb-4 shadow-sm"
              >
                <p className="font-bold text-lg text-[#1A1A1A]">{auction.title}</p>
                <p className="text-[#666] text-sm mb-5">{auction.date}</p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#999] mb-1">
                      Lots Offered
                    </p>
                    <p className="text-xl font-bold text-[#1A1A1A]">{auction.lots}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#999] mb-1">
                      Lots Sold
                    </p>
                    <p className="text-xl font-bold text-[#1A1A1A]">{auction.sold}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#999] mb-1">
                      Total Raised
                    </p>
                    <p className="text-xl font-bold text-[#1A1A1A]">{auction.totalRaised}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#999] mb-1">
                      Success Rate
                    </p>
                    <p className="text-xl font-bold text-[#C9A84C]">{successRate}%</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── Bar chart ──────────────────────────────────────────────────── */}
      <section className="bg-[#F8F7F4] py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-black text-[#1A1A1A] mb-8">Total Raised Per Auction</h2>

          <div className="space-y-6">
            {pastAuctions.map((auction) => {
              const numeric = parseTotal(auction.totalRaised)
              const widthPct = `${(numeric / MAX_VALUE) * 100}%`
              return (
                <div key={auction.title}>
                  <div className="w-full bg-[#E8E5DE] rounded h-8 relative overflow-hidden">
                    <div
                      className="bg-[#C9A84C] rounded absolute inset-y-0 left-0 transition-all"
                      style={{ width: widthPct }}
                    />
                  </div>
                  <div className="flex justify-between mt-2">
                    <p className="text-[#444] text-sm">{auction.title}</p>
                    <p className="text-[#C9A84C] text-sm font-semibold">{auction.totalRaised}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <section className="bg-[#080809] py-20 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Sell your property at our next auction
          </h2>
          <p className="text-[#666] text-lg mb-8">
            Free valuation, no obligation, response within 24 hours.
          </p>
          <Link
            href="/valuation"
            className="inline-block bg-[#C9A84C] text-[#080809] font-semibold px-6 py-3 rounded hover:bg-[#E8C96A] transition-all"
          >
            Request Free Valuation
          </Link>
        </div>
      </section>

    </div>
  )
}
