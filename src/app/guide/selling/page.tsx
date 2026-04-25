import { type Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Guide to Selling at Auction | Midas Property Auctions',
  description: 'Your step-by-step guide to selling property at auction with Midas.',
}

const benefits: { icon: string; title: string; body: string }[] = [
  { icon: '⚡', title: 'Speed', body: 'Completion within 28 days of auction.' },
  { icon: '✅', title: 'Certainty', body: 'Legally binding at the fall of the hammer.' },
  { icon: '📈', title: 'Competition', body: 'Competitive bidding drives price up.' },
  { icon: '🔗', title: 'No Chains', body: 'Cash and bridging buyers only — no mortgage delays.' },
  { icon: '🛡', title: 'No Fall-Throughs', body: '10% deposit secured immediately at hammer fall.' },
]

const steps: { number: string; title: string; body: string }[] = [
  {
    number: '01',
    title: 'Free valuation',
    body: 'Contact us for a free appraisal. We will advise on guide price, reserve and the best auction for your property.',
  },
  {
    number: '02',
    title: 'Instruct us',
    body: 'Complete our vendor instruction form. We prepare the marketing materials, legal pack and catalogue entry.',
  },
  {
    number: '03',
    title: 'Marketing period',
    body: 'Your property is marketed to our 2,847-strong investor database plus email, WhatsApp and social media campaigns.',
  },
  {
    number: '04',
    title: 'Auction day',
    body: 'Our auctioneer manages the bidding. You watch the bids in real time. The hammer falls at the best price.',
  },
  {
    number: '05',
    title: 'Completion',
    body: 'The buyer pays a 10% deposit immediately. Balance received within 28 days. You move on.',
  },
]

const specialisms: { icon: string; label: string }[] = [
  { icon: '🏠', label: 'Residential' },
  { icon: '🏘', label: 'HMO' },
  { icon: '🏢', label: 'Commercial' },
  { icon: '⚖️', label: 'Probate' },
  { icon: '🔥', label: 'Fire Damage' },
  { icon: '📋', label: 'Short Lease' },
  { icon: '👥', label: 'Tenanted Properties' },
  { icon: '🏗', label: 'Development Sites' },
]

export default function SellingGuidePage() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-20">

      {/* Hero */}
      <section className="bg-[#080809] py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
            Seller&apos;s Guide
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
            Guide to{' '}
            <span className="bg-gradient-to-r from-[#C9A84C] to-[#E8C96A] bg-clip-text text-transparent">
              Selling at Auction
            </span>
          </h1>
          <p className="text-[#999] text-xl max-w-2xl mx-auto mb-10">
            Fast, certain and professional property disposal across London and Essex.
          </p>
          <Link
            href="/valuation"
            className="bg-[#C9A84C] text-[#080809] font-semibold px-6 py-3 rounded hover:bg-[#E8C96A] transition-all"
          >
            Request Free Valuation
          </Link>
        </div>
      </section>

      {/* Section 1 — Why Sell at Auction */}
      <section className="bg-[#F8F7F4] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
            Benefits
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-[#1A1A1A] mb-12">
            Why Sell at Auction?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="bg-white border border-[#E8E5DE] rounded-xl p-7 shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
              >
                <span className="text-3xl block mb-3">{b.icon}</span>
                <h3 className="text-[#1A1A1A] font-bold text-base mb-2">{b.title}</h3>
                <p className="text-[#666] text-sm leading-relaxed">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2 — The Selling Process */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
            Step by Step
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-[#1A1A1A] mb-12">
            The Selling Process — 5 Steps
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step) => (
              <div
                key={step.number}
                className="bg-white border border-[#E8E5DE] rounded-xl p-7 shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
              >
                <span className="text-[#C9A84C] text-3xl font-black block mb-3">
                  {step.number}
                </span>
                <h3 className="text-[#1A1A1A] font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-[#666] text-sm leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 — Properties We Specialise In */}
      <section className="bg-[#F8F7F4] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
            Our Expertise
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-[#1A1A1A] mb-12">
            Properties We Specialise In
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {specialisms.map((s) => (
              <div
                key={s.label}
                className="bg-white border border-[#E8E5DE] rounded-xl p-7 shadow-[0_2px_8px_rgba(0,0,0,0.06)] flex flex-col items-center text-center"
              >
                <span className="text-3xl mb-3">{s.icon}</span>
                <span className="text-[#1A1A1A] font-semibold text-sm">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 — Our Fees */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
            Transparent Pricing
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-[#1A1A1A] mb-6">
            Our Fees
          </h2>
          <p className="text-6xl md:text-7xl font-black text-[#C9A84C] mb-4">
            2% + VAT
          </p>
          <p className="text-[#666] text-lg max-w-xl mx-auto">
            of the final hammer price, payable at completion. No upfront costs. No sale — no fee.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#080809] py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Get Your Free Valuation
          </h2>
          <p className="text-[#999] text-lg max-w-xl mx-auto mb-8">
            Find out what your property could achieve at auction. Free, no obligation, response
            within 24 hours.
          </p>
          <Link
            href="/valuation"
            className="bg-[#C9A84C] text-[#080809] font-semibold px-6 py-3 rounded hover:bg-[#E8C96A] transition-all"
          >
            Request Free Valuation
          </Link>
        </div>
      </section>

    </div>
  )
}
