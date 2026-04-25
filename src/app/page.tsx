'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import LotCard from '@/components/LotCard'
import GoldButton from '@/components/GoldButton'
import AuctionCountdown from '@/components/AuctionCountdown'
import { lots, stats, upcomingAuctions, testimonials, blogPosts, type Lot, type LotStatus } from '@/lib/data'
import WhatsAppSignup from '@/components/WhatsAppSignup'

// ── OS Integration ────────────────────────────────────────────────────────────

interface OsLot {
  id: string; address: string; guidePrice: number; arv: number | null
  bedrooms: number | null; propertyType: string | null; pipelineStage: string
  isOffMarket: boolean; notes: string | null
}

function mapOsLot(l: OsLot): Lot {
  const parts = l.address.split(',')
  const stageMap: Record<string, LotStatus> = { live: 'live', legal_pack: 'legal_pack' }
  return {
    id: l.id, address: parts[0].trim(),
    area: parts.length > 1 ? parts.slice(1).join(',').trim() : '',
    type: l.propertyType ?? 'Residential', bedrooms: l.bedrooms ?? 0,
    guidePrice: l.guidePrice, arv: l.arv ?? 0,
    status: stageMap[l.pipelineStage] ?? 'sourcing',
    description: l.notes ?? '', features: [],
    auctionDate: 'Contact for details', auctionTime: '',
    isOffMarket: l.isOffMarket, showOnWebsite: true, postcode: '',
  }
}

// ── Why Midas card data ───────────────────────────────────────────────────────

interface WhyCard {
  icon: string
  title: string
  body: string
}

const whyCards: WhyCard[] = [
  { icon: '🤖', title: 'AI Deal Analysis', body: 'Every lot scored instantly by ARIA, our AI assistant. Know the ROI before you bid.' },
  { icon: '🔐', title: 'Off-Market Portal', body: 'Properties never listed publicly. Password-protected access for pre-qualified investors only.' },
  { icon: '🏦', title: 'Private Lending', body: 'Fast bridging finance through our network of private lenders. Terms within 24 hours.' },
  { icon: '📱', title: 'WhatsApp Alerts', body: 'New lots sent to your WhatsApp before they go public. Register once, never miss a deal.' },
  { icon: '💰', title: 'Finance Calculator', body: 'Live bridging finance calculations on every property page. Know your numbers before you bid.' },
  { icon: '⚖️', title: 'Solicitor Network', body: 'Trusted solicitors experienced in 28-day auction completions — recommended by Midas.' },
  { icon: '🌍', title: 'Nationwide Coverage', body: 'London, Essex and nationwide. Residential, HMO, commercial and development sites.' },
  { icon: '📊', title: 'Investment Intelligence', body: 'ARIA analyses market data, yields and comparable sales to help you make informed decisions.' },
]

// ── Stat data (override with data.ts values) ──────────────────────────────────

interface StatItem {
  value: string
  label: string
}

const heroStats: StatItem[] = [
  { value: stats[0]?.value ?? '340+', label: stats[0]?.label ?? 'Properties Sold' },
  { value: stats[1]?.value ?? '2,847', label: stats[1]?.label ?? 'Active Investors' },
  { value: stats[2]?.value ?? '15+', label: stats[2]?.label ?? 'Years Experience' },
  { value: '28 Days', label: 'To Completion' },
]

// ── Page component ────────────────────────────────────────────────────────────

export default function HomePage() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [liveLots, setLiveLots] = useState<Lot[] | null>(null)

  useEffect(() => {
    const osUrl = process.env.NEXT_PUBLIC_OS_URL
    if (!osUrl) return
    fetch(`${osUrl}/api/public/lots`)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then((data: { lots: OsLot[] }) => {
        if (Array.isArray(data?.lots)) setLiveLots(data.lots.map(mapOsLot))
      })
      .catch(() => {})
  }, [])

  const publicLots = (liveLots ?? lots.filter(l => l.showOnWebsite)).filter(l => !l.isOffMarket)

  async function handleSubscribe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      await fetch('/api/whatsapp-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'mailing_list' }),
      })
    } catch {
      // silent fail — still mark subscribed
    }
    setSubscribed(true)
  }

  return (
    <main>

      {/* ── SECTION 1 — HERO ───────────────────────────────────────────────── */}
      <section className="relative bg-[#080809] min-h-screen overflow-hidden">
        {/* Gold radial glow — top right */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[rgba(201,168,76,0.06)] blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 pt-28 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left column */}
          <div>
            <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
              London &amp; Essex Property Auctions
            </p>

            <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
              <span className="text-[#E8E4DC] block">Where Committed Buyers</span>
              <span className="text-[#C9A84C] block">Meet Committed Sellers</span>
            </h1>

            <p className="text-[rgba(232,228,220,0.65)] text-lg max-w-xl leading-relaxed">
              Standing in the middle — connecting buyers to sellers, investors to opportunities,
              and clients to the solicitors, lenders and partners they need.
            </p>

            {/* Primary CTAs */}
            <div className="flex flex-wrap gap-3 mt-8">
              <Link
                href="/current-auction"
                className="bg-[#C9A84C] text-[#080809] font-semibold px-6 py-3 rounded hover:bg-[#E8C96A] transition-all"
              >
                View Current Lots →
              </Link>
              <Link
                href="/register"
                className="border border-[rgba(201,168,76,0.5)] text-[#E8E4DC] px-6 py-3 rounded hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all"
              >
                Register to Bid
              </Link>
              <Link
                href="/valuation"
                className="border border-[rgba(201,168,76,0.5)] text-[#E8E4DC] px-6 py-3 rounded hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all"
              >
                Get Free Valuation
              </Link>
            </div>

            {/* Phone */}
            <p className="mt-6 text-[#C9A84C] text-sm">📱 Call Sam: 07454 753318</p>

            {/* Quick-link pills */}
            <div className="flex flex-wrap gap-3 mt-4">
              {['View Current Lots', 'Register to Bid', 'Get Free Valuation'].map(label => (
                <span
                  key={label}
                  className="border border-[rgba(201,168,76,0.35)] text-[rgba(232,228,220,0.6)] text-sm px-4 py-1.5 rounded-full hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors cursor-default"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Right column — countdown card */}
          <div>
            <div className="bg-[#0F0F14] border border-[rgba(201,168,76,0.25)] rounded-2xl p-8">
              <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-6">
                Next Auction
              </p>
              <AuctionCountdown
                targetDate="2026-05-14T12:00:00"
                auctionName={upcomingAuctions[0].title}
                lotCount={upcomingAuctions[0].lots}
              />
            </div>
          </div>

        </div>
      </section>

      {/* ── SECTION 2 — AUCTION TYPE CARDS ────────────────────────────────── */}
      <section className="bg-[#080809] py-16 border-t border-[rgba(201,168,76,0.1)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Card 1 — Livestream */}
            <div className="bg-[#0F0F14] border-t-2 border-t-[#C9A84C] border border-[rgba(201,168,76,0.2)] rounded-xl p-8">
              <h2 className="font-black text-[#E8E4DC] text-2xl">Livestream Auction</h2>
              <p className="text-[#C9A84C] font-semibold text-lg mt-2">14th May 2026 — 12:00pm</p>
              <p className="text-[rgba(232,228,220,0.5)] text-sm mt-1">12 Lots · Live Online Stream</p>
              <p className="text-[rgba(232,228,220,0.65)] text-sm mt-4 leading-relaxed">
                Telephone, Proxy and Online Bidding. Register once to bid on any lot in this auction.
              </p>
              <div className="flex flex-wrap gap-3 mt-6">
                <Link
                  href="/current-auction"
                  className="bg-[#C9A84C] text-[#080809] font-semibold px-6 py-3 rounded hover:bg-[#E8C96A] transition-all"
                >
                  View Lots →
                </Link>
                <Link
                  href="/register"
                  className="border border-[rgba(201,168,76,0.5)] text-[#E8E4DC] px-6 py-3 rounded hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all"
                >
                  Register to Bid
                </Link>
              </div>
            </div>

            {/* Card 2 — Timed */}
            <div className="bg-[#0F0F14] border-t-2 border-t-[rgba(201,168,76,0.4)] border border-[rgba(201,168,76,0.2)] rounded-xl p-8">
              <h2 className="font-black text-[#E8E4DC] text-2xl">Timed Online Auction</h2>
              <p className="text-[#C9A84C] font-semibold text-lg mt-2">Weekly Online Auctions</p>
              <p className="text-[rgba(232,228,220,0.5)] text-sm mt-1">Rolling, open 24/7</p>
              <p className="text-[rgba(232,228,220,0.65)] text-sm mt-4 leading-relaxed">
                View properties in our rolling online timed auction — bid from anywhere, any time, without attending an event.
              </p>
              <div className="mt-6">
                <button
                  disabled
                  className="border border-[rgba(201,168,76,0.5)] text-[rgba(232,228,220,0.4)] px-6 py-3 rounded cursor-not-allowed opacity-60"
                >
                  Coming Soon
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 3 — STATS BAR ─────────────────────────────────────────── */}
      <section className="bg-[#0F0F14] border-y border-[rgba(201,168,76,0.15)] py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {heroStats.map(stat => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-black text-[#C9A84C]">{stat.value}</div>
                <div className="text-sm text-[rgba(232,228,220,0.5)] mt-1 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4 — FEATURED LOTS ─────────────────────────────────────── */}
      <section className="bg-[#080809] py-20">
        <div className="max-w-7xl mx-auto px-6">

          <div className="flex justify-between items-center mb-10">
            <h2 className="text-[#E8E4DC] text-2xl font-black">Current Auction Lots</h2>
            <Link href="/current-auction" className="text-[#C9A84C] text-sm font-semibold hover:text-[#E8C96A] transition-colors">
              View All Lots →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {publicLots.slice(0, 4).map(lot => (
              <LotCard key={lot.id} lot={lot} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/current-auction"
              className="inline-block border border-[rgba(201,168,76,0.5)] text-[#E8E4DC] px-6 py-3 rounded hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all"
            >
              View All Properties →
            </Link>
          </div>

        </div>
      </section>

      {/* ── SECTION 5 — WHY MIDAS ─────────────────────────────────────────── */}
      <section className="bg-[#0F0F14] border-y border-[rgba(201,168,76,0.1)] py-20">
        <div className="max-w-7xl mx-auto px-6">

          <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
            Why Midas
          </p>
          <h2 className="text-[#E8E4DC] text-3xl font-black mb-3">What Makes Midas Different</h2>
          <p className="text-[rgba(232,228,220,0.65)] text-base mb-12 max-w-xl">
            Technology and expertise no other London auction house offers.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whyCards.map(card => (
              <div
                key={card.title}
                className="bg-[#15151C] border border-[rgba(201,168,76,0.15)] rounded-xl p-6 hover:border-[rgba(201,168,76,0.35)] transition-all"
              >
                <div className="text-2xl mb-3">{card.icon}</div>
                <h3 className="text-[#E8E4DC] font-bold text-sm mb-2">{card.title}</h3>
                <p className="text-[rgba(232,228,220,0.55)] text-sm leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── SECTION 6 — MIDAS OS TEASER ───────────────────────────────────── */}
      <section className="bg-[#080809] py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-[#0F0F14] border border-[rgba(201,168,76,0.35)] rounded-2xl p-10 text-center">

            <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
              The Midas Intelligence Platform
            </p>
            <h2 className="text-[#E8E4DC] text-2xl font-black mb-4">
              AI-Powered Auction Management
            </h2>
            <p className="text-[rgba(232,228,220,0.65)] text-base leading-relaxed max-w-2xl mx-auto">
              Behind every lot on this website is a live AI-powered dashboard. Our team manages the pipeline,
              analyses deals and monitors your investment in real time — technology no other London auction house has.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mt-6">
              {['AI Deal Scoring', 'Live Pipeline', 'Instant Facility Letters'].map(pill => (
                <span
                  key={pill}
                  className="border border-[rgba(201,168,76,0.3)] text-[#C9A84C] text-sm px-4 py-2 rounded-full"
                >
                  {pill}
                </span>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 7 — TESTIMONIALS ──────────────────────────────────────── */}
      <section className="bg-[#0F0F14] border-y border-[rgba(201,168,76,0.1)] py-20">
        <div className="max-w-7xl mx-auto px-6">

          <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
            Testimonials
          </p>
          <h2 className="text-[#E8E4DC] text-3xl font-black mb-12">
            Trusted by Investors Across London
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map(t => (
              <div
                key={t.name}
                className="bg-[#15151C] border border-[rgba(201,168,76,0.15)] rounded-xl p-7 flex flex-col"
              >
                <div className="text-[#C9A84C] text-4xl font-serif mb-4">&ldquo;</div>
                <p className="text-[rgba(232,228,220,0.75)] text-sm leading-relaxed mb-6 flex-1 italic">
                  {t.text}
                </p>
                <div>
                  <div className="text-[#E8E4DC] font-semibold text-sm">{t.name}</div>
                  <div className="text-[rgba(232,228,220,0.4)] text-xs">{t.location}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── SECTION 8 — LATEST NEWS ───────────────────────────────────────── */}
      <section className="bg-[#080809] py-20">
        <div className="max-w-7xl mx-auto px-6">

          <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
            Blog
          </p>
          <h2 className="text-[#E8E4DC] text-3xl font-black mb-12">From the Midas Blog</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {blogPosts.slice(0, 2).map(post => (
              <div
                key={post.slug}
                className="bg-[#0F0F14] border border-[rgba(201,168,76,0.15)] rounded-xl overflow-hidden"
              >
                {/* Image placeholder */}
                <div className="bg-gradient-to-br from-[#15151C] to-[#080809] h-36 flex items-center justify-center">
                  <span className="bg-[rgba(201,168,76,0.15)] text-[#C9A84C] text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                    {post.category}
                  </span>
                </div>
                {/* Body */}
                <div className="p-6">
                  <p className="text-[rgba(232,228,220,0.4)] text-xs mb-2">{post.date}</p>
                  <h3 className="text-[#E8E4DC] font-bold text-base mb-2 leading-snug">{post.title}</h3>
                  <p className="text-[rgba(232,228,220,0.55)] text-sm leading-relaxed mb-4">{post.excerpt}</p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-[#C9A84C] font-semibold text-sm hover:text-[#E8C96A] transition-colors"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/blog"
              className="inline-block border border-[rgba(201,168,76,0.5)] text-[#E8E4DC] px-6 py-3 rounded hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all"
            >
              View All Articles →
            </Link>
          </div>

        </div>
      </section>

      {/* ── SECTION 9 — MAILING LIST ──────────────────────────────────────── */}
      <section className="bg-[#0F0F14] border-y border-[rgba(201,168,76,0.1)] py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Left — Email */}
            <div>
              <h3 className="text-[#E8E4DC] font-bold text-xl mb-3">Stay in the Know</h3>
              <p className="text-[rgba(232,228,220,0.55)] text-sm mb-6">
                New lots, auction dates and market insights.
              </p>

              {subscribed ? (
                <p className="text-[#C9A84C] font-semibold">
                  You&apos;re subscribed. We&apos;ll be in touch.
                </p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 bg-[#15151C] border border-[rgba(201,168,76,0.2)] text-[#E8E4DC] placeholder-[rgba(232,228,220,0.3)] px-4 py-3 rounded text-sm focus:outline-none focus:border-[rgba(201,168,76,0.5)] transition-colors"
                  />
                  <button
                    type="submit"
                    className="bg-[#C9A84C] text-[#080809] font-semibold px-6 py-3 rounded hover:bg-[#E8C96A] transition-all whitespace-nowrap"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>

            {/* Right — WhatsApp */}
            <div>
              <h3 className="text-[#E8E4DC] font-bold text-xl mb-3">WhatsApp Alerts</h3>
              <p className="text-[rgba(232,228,220,0.55)] text-sm mb-6">
                Get new lots on WhatsApp before they go public.
              </p>
              <WhatsAppSignup />
            </div>

          </div>
        </div>
      </section>

    </main>
  )
}
