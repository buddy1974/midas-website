import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Timed Online Auction | Bid 24/7 From Anywhere in the World',
  description:
    'Buy property at timed online auction with Midas. Lots open for 7–14 days. Bid from anywhere, 24/7. Same legal certainty at close as livestream. Contracts exchange automatically.',
  alternates: { canonical: 'https://www.midaspropertyauctions.co.uk/timed-auction' },
  openGraph: {
    title: 'Timed Online Auction | Bid 24/7 From Anywhere in the World',
    description: 'Lots open 7–14 days. Bid 24/7 from anywhere. Contracts exchange automatically at close — same legal certainty as livestream.',
    url: 'https://www.midaspropertyauctions.co.uk/timed-auction',
  },
}

export default function TimedAuctionPage() {
  return (
    <div className="min-h-screen bg-[#080809] pt-24 pb-20">

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section className="bg-[#080809] pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
            TIMED AUCTION
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-[#E8E4DC] mb-6">
            Timed Online Auction
          </h1>
          <p className="text-[rgba(232,228,220,0.65)] text-xl max-w-2xl mx-auto">
            Convenient eBay-style bidding from anywhere in the world. No waiting for a Livestream event.
          </p>
          <div className="flex justify-center gap-6 mt-6 flex-wrap">
            <span className="flex items-center gap-2 text-sm text-[rgba(232,228,220,0.65)]">
              <span className="text-[#C9A84C]">✓</span> Bid 24/7 from anywhere
            </span>
            <span className="flex items-center gap-2 text-sm text-[rgba(232,228,220,0.65)]">
              <span className="text-[#C9A84C]">✓</span> No auction day pressure
            </span>
          </div>
        </div>
      </section>

      {/* ── How It Works ──────────────────────────────────────────────────────── */}
      <section className="bg-[#0F0F14] border-y border-[rgba(201,168,76,0.1)] py-16 px-6">
        <h2 className="text-center text-[#E8E4DC] font-black text-2xl mb-10">
          How Timed Auction Works
        </h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: '🔍',
              title: 'Browse',
              body: 'View all timed lots with photos, legal packs and full descriptions. Take your time to research each property.',
            },
            {
              icon: '💸',
              title: 'Bid',
              body: 'Place your maximum bid online. The system bids automatically on your behalf up to your maximum — just like eBay.',
            },
            {
              icon: '🏆',
              title: 'Win',
              body: 'When the auction ends, the highest bidder wins. Exchange of contracts and 10% deposit required within 24 hours.',
            },
          ].map((step) => (
            <div
              key={step.title}
              className="bg-[#0F0F14] border border-[rgba(201,168,76,0.2)] rounded-xl p-8 text-center"
            >
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="text-[#E8E4DC] font-bold text-lg mb-3">{step.title}</h3>
              <p className="text-[rgba(232,228,220,0.65)] text-sm leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Current Timed Lots ────────────────────────────────────────────────── */}
      <section className="bg-[#080809] py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-[#E8E4DC] font-black text-2xl">Current Timed Lots</h2>
            <Link
              href="/properties"
              className="text-[#C9A84C] text-sm font-semibold hover:text-[#E8C96A] transition-colors"
            >
              View All →
            </Link>
          </div>
          <p className="text-[rgba(232,228,220,0.65)] text-sm mb-8 text-center">
            Timed auction lots are coming soon. Register your interest to be notified when new timed lots are listed.
          </p>
          <div className="bg-[#0F0F14] border border-[rgba(201,168,76,0.2)] rounded-xl p-10 text-center max-w-2xl mx-auto">
            <div className="text-5xl mb-4">🔔</div>
            <h3 className="text-[#E8E4DC] font-bold text-xl mb-3">Be First to Know</h3>
            <p className="text-[rgba(232,228,220,0.65)] text-sm mb-6 leading-relaxed">
              Register your interest and we&apos;ll notify you the moment new timed lots are listed.
            </p>
            <Link
              href="/register"
              className="inline-block bg-[#C9A84C] text-[#080809] font-semibold px-6 py-3 rounded hover:bg-[#E8C96A] transition-colors"
            >
              Register Interest
            </Link>
          </div>
        </div>
      </section>

      {/* ── Timed vs Livestream Comparison ───────────────────────────────────── */}
      <section className="bg-[#0F0F14] border-y border-[rgba(201,168,76,0.1)] py-16 px-6">
        <h2 className="text-center text-[#E8E4DC] font-black text-2xl mb-10">
          Timed vs Livestream Auction Event
        </h2>
        <div className="max-w-3xl mx-auto overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[rgba(201,168,76,0.2)]">
                <th className="text-left py-4 px-4 text-[rgba(232,228,220,0.65)] font-semibold">Feature</th>
                <th className="text-center py-4 px-4 text-[#C9A84C] font-bold">Timed</th>
                <th className="text-center py-4 px-4 text-[rgba(232,228,220,0.65)] font-semibold">Livestream</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  feature: 'Bid timing',
                  timed: 'Any time, 24/7',
                  livestream: 'Auction day only',
                },
                {
                  feature: 'Duration',
                  timed: 'Days to weeks',
                  livestream: 'Minutes per lot',
                },
                {
                  feature: 'Bidding method',
                  timed: 'Automatic proxy bids',
                  livestream: 'Live auctioneer',
                },
                {
                  feature: 'Pressure',
                  timed: 'None — bid at leisure',
                  livestream: 'High — real-time',
                },
                {
                  feature: 'Deposit',
                  timed: '10% within 24 hours',
                  livestream: '10% on the day',
                },
              ].map((row) => (
                <tr
                  key={row.feature}
                  className="border-b border-[rgba(201,168,76,0.08)] hover:bg-[rgba(201,168,76,0.04)] transition-colors"
                >
                  <td className="py-4 px-4 text-[rgba(232,228,220,0.65)]">{row.feature}</td>
                  <td className="py-4 px-4 text-center text-[#C9A84C] font-medium">{row.timed}</td>
                  <td className="py-4 px-4 text-center text-[rgba(232,228,220,0.65)]">{row.livestream}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────────── */}
      <section className="bg-[#080809] py-16 px-6 text-center">
        <h2 className="text-[#E8E4DC] font-black text-2xl mb-4">
          Ready to Bid in Our Next Auction?
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <Link
            href="/register"
            className="bg-[#C9A84C] text-[#080809] font-semibold px-6 py-3 rounded hover:bg-[#E8C96A] transition-colors"
          >
            Register to Bid
          </Link>
          <Link
            href="/guide/buying-timed"
            className="text-[#C9A84C] font-semibold hover:text-[#E8C96A] transition-colors"
          >
            Guide to Buying at Timed Auction →
          </Link>
        </div>
      </section>

    </div>
  )
}
