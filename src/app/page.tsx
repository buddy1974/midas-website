'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Phone, Smartphone, Mail, Clock } from 'lucide-react'
import LotCard from '@/components/LotCard'
import AuctionCountdown from '@/components/AuctionCountdown'
import NewsletterForm from '@/components/NewsletterForm'
import {
  lots,
  testimonials,
  blogPosts,
  principles,
  serviceNames,
  accreditations,
  staticEvents,
  type Lot,
  type LotStatus,
} from '@/lib/data'

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

// ── Page component ────────────────────────────────────────────────────────────

export default function HomePage() {
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

  // ── Inline data for three-column section ─────────────────────────────────

  const eventsData = staticEvents

  const principlesData = principles

  const servicesData = serviceNames

  const accreditationsData = accreditations

  return (
    <main>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* SECTION 1 — HERO                                                      */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: "linear-gradient(to bottom, rgba(8,8,9,0.75) 0%, rgba(8,8,9,0.9) 100%), url('https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1920&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          {/* Eyebrow */}
          <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.3em] mb-4">
            PROPERTY ACQUISITION — LONDON &amp; ESSEX
          </p>

          {/* H1 */}
          <h1 className="text-4xl md:text-6xl font-black mb-6">
            <span className="text-white">Midas </span>
            <span className="text-[#C9A84C]">Property Auctions</span>
          </h1>

          {/* Gold-bordered intro box */}
          <div className="bg-[rgba(201,168,76,0.08)] border border-[rgba(201,168,76,0.5)] rounded-lg px-8 py-6 max-w-2xl mx-auto mb-8">
            <p className="text-[rgba(232,228,220,0.85)] text-lg leading-relaxed">
              Midas Property Auctions specialises in sourcing, selling and investing in top-performing
              properties across London, Essex and nationwide — connecting buyers, sellers and investors
              through professional auction and off-market services.
            </p>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/current-auction"
              className="bg-[#C9A84C] text-[#080809] font-semibold px-6 py-3 rounded hover:bg-[#E8C96A] transition-colors"
            >
              View Current Lots →
            </Link>
            <Link
              href="/register"
              className="border border-[rgba(201,168,76,0.5)] text-[#E8E4DC] px-6 py-3 rounded hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
            >
              Register to Bid
            </Link>
            <Link
              href="/valuation"
              className="border border-[rgba(201,168,76,0.5)] text-[#E8E4DC] px-6 py-3 rounded hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
            >
              Free Valuation
            </Link>
          </div>

          {/* Phone */}
          <p className="mt-6 text-[#C9A84C] text-sm">
            📱 Sam Fongho: +44 (0) 7413041372
          </p>

          {/* Next auction countdown */}
          <div className="mt-8 max-w-sm mx-auto bg-[rgba(8,8,9,0.6)] border border-[rgba(201,168,76,0.3)] rounded-xl p-5">
            <p className="text-[#C9A84C] text-[10px] uppercase tracking-[0.2em] font-semibold mb-3">
              Next Auction
            </p>
            <AuctionCountdown
              targetDate="2026-05-14T12:00:00"
              auctionName="Next Auction Event — May 2026"
              lotCount={12}
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* SECTION 2 — CONTACT BAR                                               */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#0D0D14] border-t-2 border-t-[#C9A84C] border-b border-b-[rgba(201,168,76,0.15)] py-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
          {/* Phone */}
          <div className="flex items-center gap-3 px-6 py-2 border-r border-[rgba(201,168,76,0.15)]">
            <Phone className="text-[#C9A84C] flex-shrink-0" size={18} />
            <div>
              <p className="text-[#C9A84C] text-[10px] uppercase tracking-[0.15em] font-semibold">PHONE NUMBER</p>
              <p className="text-[#E8E4DC] text-sm font-medium">+44 (0) 2072062691</p>
            </div>
          </div>
          {/* Mobile */}
          <div className="flex items-center gap-3 px-6 py-2 border-r border-[rgba(201,168,76,0.15)]">
            <Smartphone className="text-[#C9A84C] flex-shrink-0" size={18} />
            <div>
              <p className="text-[#C9A84C] text-[10px] uppercase tracking-[0.15em] font-semibold">MOBILE NUMBER</p>
              <p className="text-[#E8E4DC] text-sm font-medium">+44 (0) 7413041372</p>
            </div>
          </div>
          {/* Email */}
          <div className="flex items-center gap-3 px-6 py-2 border-r border-[rgba(201,168,76,0.15)]">
            <Mail className="text-[#C9A84C] flex-shrink-0" size={18} />
            <div>
              <p className="text-[#C9A84C] text-[10px] uppercase tracking-[0.15em] font-semibold">EMAIL</p>
              <p className="text-[#E8E4DC] text-sm font-medium">info@midaspropertygroup.co.uk</p>
            </div>
          </div>
          {/* Hours */}
          <div className="flex items-center gap-3 px-6 py-2">
            <Clock className="text-[#C9A84C] flex-shrink-0" size={18} />
            <div>
              <p className="text-[#C9A84C] text-[10px] uppercase tracking-[0.15em] font-semibold">OPENING TIMES</p>
              <p className="text-[#E8E4DC] text-sm font-medium">Mon - Fri: 9.00 - 18:00</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* SECTION 3 — FOUR AUCTION CARDS                                        */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#080809] py-10 px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">

          {/* Card 1 — Properties Going to Auction */}
          <div className="bg-gradient-to-b from-[#1a1a2e] to-[#0d0d14] border border-[rgba(201,168,76,0.3)] rounded-xl p-7 flex flex-col justify-between min-h-[260px]">
            <div>
              <p className="text-[#C9A84C] text-[10px] uppercase tracking-widest font-bold mb-2">UPCOMING</p>
              <h2 className="text-[#E8E4DC] font-black text-xl mb-1">Properties Going to Auction</h2>
              <p className="text-[#C9A84C] font-semibold text-sm mb-3">14th May 2026 — 12:00pm</p>
              <p className="text-[rgba(232,228,220,0.6)] text-sm leading-relaxed mb-6">
                Browse properties we are currently listing through our network of partner
                auction companies across London and Essex.
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                href="/current-auction"
                className="bg-[#C9A84C] text-[#080809] text-xs font-bold px-4 py-2 rounded hover:bg-[#E8C96A] transition-colors"
              >
                View Lots →
              </Link>
              <Link
                href="/register"
                className="border border-[rgba(201,168,76,0.4)] text-[rgba(232,228,220,0.7)] text-xs px-4 py-2 rounded hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
              >
                Register
              </Link>
            </div>
          </div>

          {/* Card 2 — Timed Auction */}
          <div className="bg-gradient-to-b from-[#1a1a2e] to-[#0d0d14] border border-[rgba(201,168,76,0.3)] rounded-xl p-7 flex flex-col justify-between min-h-[260px]">
            <div>
              <p className="text-[#C9A84C] text-[10px] uppercase tracking-widest font-bold mb-2">ONLINE</p>
              <h2 className="text-[#E8E4DC] font-black text-xl mb-1">Timed Auction</h2>
              <p className="text-[rgba(232,228,220,0.5)] text-xs mb-3">Weekly Online Auctions</p>
              <p className="text-[rgba(232,228,220,0.6)] text-sm leading-relaxed mb-6">
                View all properties in our upcoming online weekly auction — bid from anywhere, any time.
              </p>
            </div>
            <div>
              <Link
                href="/timed-auction"
                className="bg-[#C9A84C] text-[#080809] text-xs font-bold px-4 py-2 rounded hover:bg-[#E8C96A] transition-colors inline-block"
              >
                View Lots →
              </Link>
            </div>
          </div>

          {/* Card 3 — Off-Market */}
          <div className="bg-gradient-to-b from-[#1a1a2e] to-[#0d0d14] border border-[rgba(201,168,76,0.3)] rounded-xl p-7 flex flex-col justify-between min-h-[260px]">
            <div>
              <p className="text-[#C9A84C] text-[10px] uppercase tracking-widest font-bold mb-2">EXCLUSIVE</p>
              <h2 className="text-[#E8E4DC] font-black text-xl mb-1">Off-Market Properties</h2>
              <p className="text-[rgba(232,228,220,0.5)] text-xs mb-3">Password-Protected Access</p>
              <p className="text-[rgba(232,228,220,0.6)] text-sm leading-relaxed mb-6">
                Pre-qualified investors only. Properties never listed publicly. Access by application.
              </p>
            </div>
            <div>
              <Link
                href="/off-market"
                className="bg-[#C9A84C] text-[#080809] text-xs font-bold px-4 py-2 rounded hover:bg-[#E8C96A] transition-colors inline-block"
              >
                Request Access →
              </Link>
            </div>
          </div>

          {/* Card 4 — Free Valuation */}
          <div className="bg-gradient-to-b from-[#1a1a2e] to-[#0d0d14] border border-[rgba(201,168,76,0.3)] rounded-xl p-7 flex flex-col justify-between min-h-[260px]">
            <div>
              <p className="text-[#C9A84C] text-[10px] uppercase tracking-widest font-bold mb-2">FREE</p>
              <h2 className="text-[#E8E4DC] font-black text-xl mb-1">Auction Valuation</h2>
              <p className="text-[rgba(232,228,220,0.5)] text-xs mb-3">No Obligation Appraisal</p>
              <p className="text-[rgba(232,228,220,0.6)] text-sm leading-relaxed mb-6">
                Request a free auction appraisal for your land or property. Response within 24 hours.
              </p>
            </div>
            <div>
              <Link
                href="/valuation"
                className="bg-[#C9A84C] text-[#080809] text-xs font-bold px-4 py-2 rounded hover:bg-[#E8C96A] transition-colors inline-block"
              >
                Request A Valuation →
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* SECTION 4 — WELCOME SECTION                                           */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#111118] py-16 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black mb-6">
            <span className="text-white">Welcome to </span>
            <span className="text-[#C9A84C]">Midas Property Auctions!</span>
          </h2>
          <p className="text-[rgba(232,228,220,0.75)] text-lg max-w-3xl mx-auto mb-10 leading-relaxed">
            Midas Property Auctions connects buyers, sellers and investors across London, Essex and
            nationwide — working with a network of established UK auction companies to deliver fast,
            transparent and professional results.
          </p>

          {/* Bullet points */}
          <ul className="max-w-2xl mx-auto text-left space-y-4">
            {[
              'Standing in the middle — connecting buyers to sellers, investors to opportunities, and clients to the professionals they need.',
              'A trusted name in UK property auctions since 2015, with over 340 properties sold.',
              'An active database of 2,847 investors with maximum exposure through email, WhatsApp and social media campaigns.',
              'Specialising in residential, HMO, commercial and development opportunities across London and Essex.',
              'Trusted by private sellers, landlords, developers, solicitors and housing associations.',
            ].map((point, i) => (
              <li key={i} className="flex items-start gap-4">
                <div className="w-1 flex-shrink-0 mt-1 self-stretch bg-[#C9A84C] rounded-full" />
                <p className="text-[rgba(232,228,220,0.75)] text-sm leading-relaxed">{point}</p>
              </li>
            ))}
          </ul>

          {/* Links */}
          <div className="flex justify-center gap-6 mt-8">
            <Link href="/about" className="text-[#C9A84C] text-sm hover:text-[#E8C96A] transition-colors">
              Learn more about us →
            </Link>
            <Link
              href="https://www.midaspropertygroup.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[rgba(232,228,220,0.4)] text-xs hover:text-[#C9A84C] transition-colors"
            >
              Visit our main website →
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* SECTION 5 — FEATURED LOTS                                             */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#080809] py-12 px-6">
        {/* Header row */}
        <div className="flex justify-between items-start mb-8 max-w-7xl mx-auto">
          <div>
            <h2 className="text-[#C9A84C] font-black uppercase text-xl">FEATURED LOTS</h2>
            <div className="w-10 h-0.5 bg-[#C9A84C] mt-2" />
          </div>
          <div className="flex gap-4 text-sm">
            <Link href="/current-auction" className="text-[#C9A84C] hover:text-[#E8C96A] transition-colors">
              View Full List →
            </Link>
            <Link href="/current-auction" className="text-[rgba(232,228,220,0.4)] hover:text-[#C9A84C] transition-colors">
              View Catalogue →
            </Link>
          </div>
        </div>

        {/* Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {publicLots.slice(0, 4).map((lot, i) => (
            <LotCard key={lot.id} lot={lot} lotNumber={i + 1} />
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* SECTION 6 — THREE COLUMN SECTION                                      */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#111118] border-y border-[rgba(201,168,76,0.1)] py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 divide-x divide-[rgba(201,168,76,0.1)]">

          {/* COLUMN 1 — LATEST EVENTS */}
          <div className="md:pr-8">
            <h3 className="text-[#C9A84C] font-black uppercase text-sm tracking-widest mb-2">LATEST EVENTS</h3>
            <div className="w-10 h-0.5 bg-[#C9A84C] mb-6" />

            <div className="space-y-0">
              {eventsData.map((event, i) => (
                <div
                  key={i}
                  className="flex gap-4 pb-5 mb-5 border-b border-[rgba(201,168,76,0.08)] last:border-0 last:mb-0 last:pb-0"
                >
                  {/* Date block */}
                  <div className="w-14 text-center flex-shrink-0 bg-[rgba(201,168,76,0.08)] border border-[rgba(201,168,76,0.2)] rounded-lg py-2">
                    <p className="text-[#C9A84C] text-2xl font-black leading-none">{event.day}</p>
                    <p className="text-[#C9A84C] text-[9px] uppercase tracking-wider">{event.month}</p>
                    <p className="text-[rgba(232,228,220,0.3)] text-[9px]">{event.year}</p>
                  </div>
                  {/* Content */}
                  <div className="flex-1">
                    <Link
                      href={event.href}
                      className="text-[#E8E4DC] text-sm font-semibold hover:text-[#C9A84C] transition-colors leading-snug mb-1 block"
                    >
                      {event.title}
                    </Link>
                    <p className="text-[rgba(232,228,220,0.5)] text-xs leading-relaxed line-clamp-2">
                      {event.excerpt}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/events" className="text-[#C9A84C] text-sm mt-4 block hover:text-[#E8C96A] transition-colors">
              View All Events →
            </Link>
          </div>

          {/* COLUMN 2 — OUR PRINCIPLES */}
          <div className="md:px-8">
            <h3 className="text-[#C9A84C] font-black uppercase text-sm tracking-widest mb-2">OUR PRINCIPLES</h3>
            <div className="w-10 h-0.5 bg-[#C9A84C] mb-6" />

            <div>
              {principlesData.map((p, i) => (
                <div key={i} className="mb-5 last:mb-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[#C9A84C] text-xs">◆</span>
                    <span className="text-[#E8E4DC] font-bold text-sm">{p.title}</span>
                  </div>
                  <p className="text-[rgba(232,228,220,0.55)] text-xs leading-relaxed pl-5">
                    {p.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* COLUMN 3 — OUR SERVICES */}
          <div className="md:pl-8">
            <h3 className="text-[#C9A84C] font-black uppercase text-sm tracking-widest mb-2">OUR SERVICES</h3>
            <div className="w-10 h-0.5 bg-[#C9A84C] mb-6" />

            <div>
              {servicesData.map((service, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 py-2 border-b border-[rgba(201,168,76,0.07)] last:border-0 hover:border-[rgba(201,168,76,0.25)] transition-colors cursor-default"
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-[9px] font-bold text-[#C9A84C]"
                    style={{ background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.25)' }}
                  >
                    {i + 1}
                  </div>
                  <span className="text-[rgba(232,228,220,0.75)] text-xs hover:text-[#C9A84C] transition-colors">
                    {service}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* SECTION 7 — TIMED AUCTION LOTS                                        */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#080809] py-10 px-6">
        {/* Header row */}
        <div className="flex justify-between items-start mb-8 max-w-7xl mx-auto">
          <div>
            <h2 className="text-[#C9A84C] font-black uppercase text-xl">TIMED AUCTION LOTS</h2>
            <div className="w-10 h-0.5 bg-[#C9A84C] mt-2" />
          </div>
          <div className="flex gap-4 text-sm">
            <Link href="/timed-auction" className="text-[#C9A84C] hover:text-[#E8C96A] transition-colors">
              View Full List →
            </Link>
          </div>
        </div>

        {/* Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {publicLots.slice(4, 8).length > 0
            ? publicLots.slice(4, 8).map((lot, i) => (
                <LotCard key={lot.id} lot={lot} lotNumber={i + 5} />
              ))
            : publicLots.slice(0, 4).map((lot, i) => (
                <LotCard key={lot.id + '-t'} lot={lot} lotNumber={i + 1} />
              ))
          }
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* SECTION 8 — STATS BAR                                                 */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#0D0D14] border-y border-[rgba(201,168,76,0.2)] py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '340+', label: 'Properties Sold' },
            { value: '2,847', label: 'Active Investors' },
            { value: '15+', label: 'Years Experience' },
            { value: '28 Days', label: 'To Completion' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <p className="text-4xl md:text-5xl font-black text-[#C9A84C] tabular-nums">{stat.value}</p>
              <p className="text-xs uppercase tracking-wider text-[rgba(232,228,220,0.5)] mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* SECTION 9 — NEWSLETTER                                                */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-[rgba(201,168,76,0.06)] border-y-2 border-[#C9A84C] py-14 px-6">
        <div className="text-center mb-10">
          <h2 className="text-[#C9A84C] font-black uppercase text-xl tracking-wider mb-3">
            JOIN OUR MAILING LIST
          </h2>
          <p className="text-[rgba(232,228,220,0.65)] text-base max-w-xl mx-auto">
            Be the first to hear about new lots, auction dates and exclusive investment opportunities.
          </p>
        </div>
        <NewsletterForm />
      </section>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* SECTION 10 — GOLD CTA BANNER                                          */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#C9A84C' }} className="py-16 px-6 text-center">
        <h2 className="text-white font-black uppercase text-2xl md:text-3xl tracking-wide mb-3">
          WE CAN ASSIST YOU WITH ALL YOUR PROPERTY INVESTMENT NEEDS
        </h2>
        <p className="text-white/80 text-xs tracking-[0.3em] uppercase mb-8">
          LET US KNOW HOW WE CAN HELP
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-bold text-sm text-white hover:bg-[#111] hover:border-white transition-colors"
          style={{ backgroundColor: '#1a1a1a', border: '2px solid rgba(255,255,255,0.3)' }}
        >
          ✉ Contact Us
        </Link>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* SECTION 11 — ACCREDITATION LOGOS                                      */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-[rgba(255,255,255,0.02)] border-t border-[rgba(201,168,76,0.15)] py-8 px-6">
        <div className="flex flex-wrap justify-center gap-4">
          {accreditationsData.map(name => (
            <span
              key={name}
              className="border border-[rgba(201,168,76,0.3)] rounded px-5 py-2 text-[#C9A84C] text-xs font-semibold tracking-wider uppercase hover:bg-[rgba(201,168,76,0.05)] transition-colors cursor-default"
            >
              {name}
            </span>
          ))}
        </div>
        <span className="text-[rgba(232,228,220,0.2)] text-xs italic text-center mt-6 block">
          TODO: Replace text badges with official logo images when Sam provides them.
        </span>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* SECTION 12 — TESTIMONIALS                                             */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#0F0F14] border-y border-[rgba(201,168,76,0.1)] py-16 px-6">
        <h2 className="text-[#C9A84C] font-black uppercase text-xl tracking-widest mb-2 text-center">
          TESTIMONIALS
        </h2>
        <div className="w-10 h-0.5 bg-[#C9A84C] mx-auto mb-10" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto">
          {testimonials.map(t => (
            <div
              key={t.name}
              className="bg-[#15151C] border border-[rgba(201,168,76,0.15)] rounded-xl p-6 flex flex-col"
            >
              <p className="text-[#C9A84C] text-4xl font-serif leading-none mb-3">&ldquo;</p>
              <p className="text-[#C9A84C] text-xs mb-3">{'★'.repeat(t.rating)}</p>
              <p className="text-[rgba(232,228,220,0.7)] text-sm leading-relaxed italic flex-1 mb-4">{t.text}</p>
              <div>
                <p className="text-[#E8E4DC] font-bold text-sm">{t.name}</p>
                <p className="text-[rgba(232,228,220,0.4)] text-xs">{t.location}</p>
              </div>
            </div>
          ))}
        </div>

        <Link
          href="/testimonials"
          className="text-[#C9A84C] text-sm mt-8 block text-center hover:text-[#E8C96A] transition-colors"
        >
          View All Testimonials →
        </Link>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* SECTION 13 — LATEST NEWS                                              */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#080809] py-14 px-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-8 max-w-7xl mx-auto">
          <div>
            <h2 className="text-[#C9A84C] font-black uppercase text-xl">LATEST NEWS</h2>
            <div className="w-10 h-0.5 bg-[#C9A84C] mt-2" />
          </div>
          <Link href="/blog" className="text-[#C9A84C] text-sm hover:text-[#E8C96A] transition-colors">
            Read More Articles →
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {blogPosts.slice(0, 2).map(post => (
            <div
              key={post.slug}
              className="bg-[#0F0F14] border border-[rgba(201,168,76,0.15)] rounded-xl overflow-hidden"
            >
              {/* Image area */}
              <div className="h-36 bg-gradient-to-br from-[#15151C] to-[#080809] flex items-center justify-center">
                <span className="bg-[rgba(201,168,76,0.15)] text-[#C9A84C] text-xs px-3 py-1 rounded-full uppercase font-semibold">
                  {post.category}
                </span>
              </div>
              {/* Body */}
              <div className="p-6">
                <p className="text-[rgba(232,228,220,0.35)] text-xs mb-2">{post.date}</p>
                <h3 className="text-[#E8E4DC] font-bold text-base leading-snug mb-3">{post.title}</h3>
                <p className="text-[rgba(232,228,220,0.55)] text-sm leading-relaxed mb-4">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-[#C9A84C] text-sm font-semibold hover:text-[#E8C96A] transition-colors"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>


    </main>
  )
}
