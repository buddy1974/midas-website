import { type Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Guide to Selling at Timed Auction | Midas Property Auctions',
  description:
    'Reach bidders 24/7 with a timed auction listing. Find out how to sell your property at timed auction with Midas.',
}

const benefits: { icon: string; title: string; body: string }[] = [
  {
    icon: '🕐',
    title: 'Longer exposure period',
    body: 'Properties listed for 7–14 days attract more bidders than a single auction day.',
  },
  {
    icon: '✅',
    title: 'Same legal certainty at close',
    body: 'Contracts exchange automatically at auction close — the same binding outcome as livestream.',
  },
  {
    icon: '📱',
    title: 'Reaches online-first bidders',
    body: 'Timed auctions attract a digital-first audience, including buyers who cannot attend livestream events.',
  },
  {
    icon: '💰',
    title: 'Competitive bidding drives price',
    body: 'Proxy bidding creates incremental competition, pushing the final price toward true market value.',
  },
  {
    icon: '🌍',
    title: 'International bidders welcome',
    body: 'Bidders from anywhere in the world can participate — no geographic restriction on your buyer pool.',
  },
]

const steps: { number: string; title: string; body: string }[] = [
  {
    number: '01',
    title: 'Free Valuation',
    body: 'We assess your property and recommend whether timed or livestream auction is the best fit.',
  },
  {
    number: '02',
    title: 'Instruction & Listing',
    body: 'We list your property on our timed auction platform with full marketing support.',
  },
  {
    number: '03',
    title: 'Marketing period',
    body: '14-day marketing period to our 2,847-strong investor database.',
  },
  {
    number: '04',
    title: 'Bidding period',
    body: '7–14 day live bidding period. Watch bids in real time.',
  },
  {
    number: '05',
    title: 'Completion',
    body: 'Winner provides 10% deposit immediately at auction close. Balance within 28 days.',
  },
]

const suitedProperties: { label: string }[] = [
  { label: 'Refurbishment projects' },
  { label: 'Commercial units' },
  { label: 'Development land' },
  { label: 'Off-plan opportunities' },
]

export default function SellingTimedGuidePage() {
  return (
    <div className="min-h-screen bg-[#080809] pt-24 pb-20">

      {/* Hero */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
            Seller&apos;s Guide — Timed Auction
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-[#E8E4DC] mb-6 leading-tight">
            Guide to Selling at{' '}
            <span className="bg-gradient-to-r from-[#C9A84C] to-[#E8C96A] bg-clip-text text-transparent">
              Timed Auction
            </span>
          </h1>
          <p className="text-[rgba(232,228,220,0.55)] text-xl max-w-2xl mx-auto mb-10">
            Reach bidders 24/7 with a timed auction listing that works around the clock.
          </p>
          <Link
            href="/valuation"
            className="bg-[#C9A84C] text-[#080809] font-semibold px-6 py-3 rounded hover:bg-[#E8C96A] transition-colors"
          >
            Request Free Valuation
          </Link>
        </div>
      </section>

      {/* Why sell via timed auction */}
      <section className="border-t border-[rgba(201,168,76,0.1)] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
            Benefits
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-[#E8E4DC] mb-12">
            Why Sell via Timed Auction?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="bg-[#0F0F14] border border-[rgba(201,168,76,0.2)] rounded-xl p-7"
              >
                <span className="text-3xl block mb-3">{b.icon}</span>
                <h3 className="text-[#E8E4DC] font-bold text-base mb-2">{b.title}</h3>
                <p className="text-[rgba(232,228,220,0.6)] text-sm leading-relaxed">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 Step process */}
      <section className="border-t border-[rgba(201,168,76,0.1)] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
            Step by Step
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-[#E8E4DC] mb-12">
            The Selling Process — 5 Steps
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step) => (
              <div
                key={step.number}
                className="bg-[#0F0F14] border border-[rgba(201,168,76,0.2)] rounded-xl p-7"
              >
                <span className="text-[#C9A84C] text-3xl font-black block mb-3">
                  {step.number}
                </span>
                <h3 className="text-[#E8E4DC] font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-[rgba(232,228,220,0.6)] text-sm leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Properties suited to timed auction */}
      <section className="border-t border-[rgba(201,168,76,0.1)] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
            Best Fit
          </p>
          <h2 className="text-3xl font-black text-[#E8E4DC] mb-10">
            Properties Suited to Timed Auction
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {suitedProperties.map((prop) => (
              <div
                key={prop.label}
                className="bg-[#0F0F14] border border-[rgba(201,168,76,0.2)] rounded-xl p-7 flex items-center justify-center text-center"
              >
                <span className="text-[#E8E4DC] font-semibold text-sm">{prop.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Fees */}
      <section className="border-t border-[rgba(201,168,76,0.1)] py-20">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
            Transparent Pricing
          </p>
          <h2 className="text-3xl font-black text-[#E8E4DC] mb-6">Our Fees</h2>
          <div className="bg-[#0F0F14] border border-[rgba(201,168,76,0.2)] rounded-xl p-8">
            <p className="text-5xl md:text-6xl font-black text-[#C9A84C] mb-4">2% + VAT</p>
            <p className="text-[rgba(232,228,220,0.7)] text-lg leading-relaxed">
              of the final hammer price. Payable at completion only. No upfront costs. No sale — no
              fee.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[rgba(201,168,76,0.1)] py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-[#E8E4DC] mb-4">
            Ready to list your property?
          </h2>
          <p className="text-[rgba(232,228,220,0.5)] text-lg max-w-xl mx-auto mb-8">
            Get a free valuation and find out which auction format is right for your property.
          </p>
          <Link
            href="/valuation"
            className="bg-[#C9A84C] text-[#080809] font-semibold px-6 py-3 rounded hover:bg-[#E8C96A] transition-colors"
          >
            Request Free Valuation
          </Link>
        </div>
      </section>

    </div>
  )
}
