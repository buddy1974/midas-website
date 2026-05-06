import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Future Auction Dates 2026 | Upcoming Property Auctions',
  description:
    'All upcoming Midas Property Auction dates for 2026. Livestream and timed online auctions across London and Essex. Register to bid free. Takes 2 minutes.',
  alternates: { canonical: 'https://www.midaspropertyauctions.co.uk/auction-dates' },
  openGraph: {
    title: 'Future Auction Dates 2026 | Upcoming Property Auctions',
    description: 'All upcoming Midas Property Auction dates for 2026. Livestream and timed online auctions. Register to bid free.',
    url: 'https://www.midaspropertyauctions.co.uk/auction-dates',
  },
}

interface AuctionRow {
  name: string
  date: string
  time: string
  format: string
  status: 'open' | 'accepting' | 'tbc'
  href: string
}

const AUCTION_ROWS: AuctionRow[] = [
  {
    name: 'May Auction 2026',
    date: '14th May 2026',
    time: '12:00pm',
    format: 'Online Livestream',
    status: 'open',
    href: '/register',
  },
  {
    name: 'June Auction 2026',
    date: '25th June 2026',
    time: '12:00pm',
    format: 'Online Livestream',
    status: 'accepting',
    href: '/sell',
  },
  {
    name: 'Autumn Auction 2026',
    date: 'September 2026',
    time: 'TBC',
    format: 'Online Livestream',
    status: 'tbc',
    href: '/sell',
  },
]

const STATUS_BADGE: Record<
  AuctionRow['status'],
  { label: string; className: string }
> = {
  open: {
    label: 'Registrations Open',
    className: 'bg-emerald-900/60 text-emerald-400 border border-emerald-700/50',
  },
  accepting: {
    label: 'Accepting Instructions',
    className: 'bg-[rgba(201,168,76,0.15)] text-[#C9A84C] border border-[rgba(201,168,76,0.4)]',
  },
  tbc: {
    label: 'Dates TBC',
    className: 'bg-[rgba(255,255,255,0.06)] text-[rgba(232,228,220,0.5)] border border-[rgba(255,255,255,0.1)]',
  },
}

export default function AuctionDatesPage() {
  return (
    <div className="min-h-screen bg-[#080809] pt-24 pb-20">

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section className="bg-[#080809] pt-28 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
            AUCTION CALENDAR
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-[#E8E4DC] mb-6">
            Future Auction Dates
          </h1>
          <p className="text-[rgba(232,228,220,0.65)] text-xl max-w-2xl mx-auto">
            Plan ahead and register early. Auction events fill fast, so register before the closing date.
          </p>
        </div>

        {/* Next Auction Hero Card */}
        <div className="bg-[#0F0F14] border border-[rgba(201,168,76,0.3)] rounded-2xl p-10 max-w-2xl mx-auto mt-10 text-center">
          <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-3">
            NEXT AUCTION
          </p>
          <h2 className="text-[#E8E4DC] text-3xl font-black mb-3">
            Next Auction Event
          </h2>
          <p className="text-[#C9A84C] font-bold text-xl mt-2">
            14th May 2026, 12:00pm
          </p>
          <p className="text-[rgba(232,228,220,0.65)] text-sm mt-1 mb-6">
            12 Lots · Online Livestream
          </p>
          <p className="text-[rgba(232,228,220,0.65)] text-sm leading-relaxed mb-8 max-w-md mx-auto">
            Register by 13th May 2026. Bidder numbers issued upon registration. Legal packs available now.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="bg-[#C9A84C] text-[#080809] font-semibold px-6 py-3 rounded hover:bg-[#E8C96A] transition-colors"
            >
              Register to Bid
            </Link>
            <Link
              href="/current-auction"
              className="border border-[rgba(201,168,76,0.4)] text-[#E8E4DC] px-6 py-3 rounded hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
            >
              View Lots
            </Link>
          </div>
        </div>
      </section>

      {/* ── 2026 Auction Calendar ─────────────────────────────────────────────── */}
      <section className="bg-[#0F0F14] border-y border-[rgba(201,168,76,0.1)] py-16 px-6">
        <h2 className="text-center text-[#E8E4DC] font-black text-2xl mb-10">
          2026 Auction Calendar
        </h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {AUCTION_ROWS.map((row) => {
            const badge = STATUS_BADGE[row.status]
            const isOpen = row.status === 'open' || row.status === 'accepting'
            return (
              <div
                key={row.name}
                className={`bg-[#0F0F14] rounded-xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-l-4 ${
                  isOpen
                    ? 'border-l-[#C9A84C] border border-[rgba(201,168,76,0.2)]'
                    : 'border-l-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.06)]'
                }`}
              >
                <div className="flex-1">
                  <p className="text-[#E8E4DC] font-bold mb-1">{row.name}</p>
                  <p className="text-[rgba(232,228,220,0.65)] text-sm">
                    {row.date} · {row.time} · {row.format}
                  </p>
                </div>
                <div className="flex items-center gap-4 flex-shrink-0">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap ${badge.className}`}
                  >
                    {badge.label}
                  </span>
                  <Link
                    href={row.href}
                    className="text-[#C9A84C] text-sm font-semibold hover:text-[#E8C96A] transition-colors whitespace-nowrap"
                  >
                    Register →
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── Sell at Auction ───────────────────────────────────────────────────── */}
      <section className="bg-[#080809] py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-[#E8E4DC] font-black text-2xl mb-4">
            Listing With Us for the Next Auction?
          </h2>
          <p className="text-[rgba(232,228,220,0.65)] text-base leading-relaxed mb-8">
            We submit vendor instructions to our partner auction companies up to 4 weeks before each
            auction event. Contact us today for a free valuation and reserve price recommendation.
          </p>
          <Link
            href="/valuation"
            className="inline-block bg-[#C9A84C] text-[#080809] font-semibold px-6 py-3 rounded hover:bg-[#E8C96A] transition-colors"
          >
            Book a Free Valuation
          </Link>
        </div>
      </section>

    </div>
  )
}
