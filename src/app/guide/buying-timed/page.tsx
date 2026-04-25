import { type Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Guide to Buying at Timed Auction | Midas Property Auctions',
  description:
    'Your complete guide to buying property at a timed online auction with Midas — bid 24/7 from anywhere in the world.',
}

const steps: { number: string; title: string; body: string }[] = [
  {
    number: '01',
    title: 'Browse the catalogue',
    body: 'View all timed lots with full details, photos and legal packs.',
  },
  {
    number: '02',
    title: 'Register',
    body: 'Free registration. You need to be registered and verified before bidding.',
  },
  {
    number: '03',
    title: 'Review the legal pack',
    body: 'Every lot has a legal pack. Read it thoroughly or instruct a solicitor.',
  },
  {
    number: '04',
    title: 'Place your maximum bid',
    body: 'Enter the maximum you are willing to pay. The system bids incrementally up to this amount.',
  },
  {
    number: '05',
    title: 'Win and exchange',
    body: 'When the auction closes, the highest bidder wins. 10% deposit required within 24 hours.',
  },
]

const glossary: { term: string; definition: string }[] = [
  {
    term: 'Proxy Bid',
    definition:
      'A maximum bid submitted in advance — the system bids on your behalf up to this ceiling.',
  },
  {
    term: 'Reserve Price',
    definition: 'The minimum price the seller will accept. Not disclosed publicly.',
  },
  {
    term: 'Exchange',
    definition:
      'At the close of the timed auction, contracts exchange automatically with the highest bidder.',
  },
  {
    term: 'Completion',
    definition: 'When the full balance is paid and keys change hands. Typically 28 days.',
  },
  {
    term: 'Deposit',
    definition: '10% of the purchase price, payable within 24 hours of auction close.',
  },
]

const comparisons: { feature: string; timed: string; livestream: string }[] = [
  { feature: 'Bidding window', timed: '7–14 days, 24/7', livestream: 'Single scheduled day' },
  { feature: 'Bidding method', timed: 'Proxy only', livestream: 'Proxy, phone or internet' },
  { feature: 'Exchange', timed: 'At auction close', livestream: 'At hammer fall' },
  { feature: 'Deposit', timed: 'Within 24 hours', livestream: 'Immediately at hammer fall' },
  { feature: 'Legal framework', timed: 'Same — binding', livestream: 'Same — binding' },
]

const keyDifferences: string[] = [
  'No scheduled auction day — bid anytime',
  'Extended bidding periods (typically 7–14 days)',
  'Proxy bidding only (no telephone bidding)',
  'Same legal framework — exchange at close of auction',
]

export default function BuyingTimedGuidePage() {
  return (
    <div className="min-h-screen bg-[#080809] pt-24 pb-20">

      {/* Hero */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
            Buyer&apos;s Guide — Timed Auction
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-[#E8E4DC] mb-6 leading-tight">
            Guide to Buying at{' '}
            <span className="bg-gradient-to-r from-[#C9A84C] to-[#E8C96A] bg-clip-text text-transparent">
              Timed Auction
            </span>
          </h1>
          <p className="text-[rgba(232,228,220,0.55)] text-xl max-w-2xl mx-auto mb-10">
            Timed auctions run 24/7 — bid at your convenience from anywhere in the world.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/register"
              className="bg-[#C9A84C] text-[#080809] font-semibold px-6 py-3 rounded hover:bg-[#E8C96A] transition-colors"
            >
              Register to Bid
            </Link>
            <Link
              href="/aml"
              className="border border-[rgba(201,168,76,0.4)] text-[#E8E4DC] px-6 py-3 rounded hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
            >
              AML Requirements
            </Link>
          </div>
        </div>
      </section>

      {/* What is a Timed Auction */}
      <section className="border-t border-[rgba(201,168,76,0.1)] py-20">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
            The Format
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-[#E8E4DC] mb-6">
            What is a Timed Auction?
          </h2>
          <p className="text-[rgba(232,228,220,0.7)] text-lg leading-relaxed">
            A timed auction works similarly to eBay. Each property has a set start and end date.
            You place your maximum bid and the system automatically bids on your behalf up to that
            maximum. When the auction ends, the highest bidder wins.
          </p>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
            Comparison
          </p>
          <h2 className="text-3xl font-black text-[#E8E4DC] mb-8">
            Timed vs Livestream Auction
          </h2>
          <div className="bg-[#0F0F14] border border-[rgba(201,168,76,0.2)] rounded-xl overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-3 border-b border-[rgba(201,168,76,0.15)]">
              <div className="p-4 text-[rgba(232,228,220,0.4)] text-xs font-semibold uppercase tracking-wider" />
              <div className="p-4 text-[#C9A84C] text-xs font-semibold uppercase tracking-wider border-l border-[rgba(201,168,76,0.15)]">
                Timed Auction
              </div>
              <div className="p-4 text-[rgba(232,228,220,0.5)] text-xs font-semibold uppercase tracking-wider border-l border-[rgba(201,168,76,0.15)]">
                Livestream Auction
              </div>
            </div>
            {comparisons.map((row, i) => (
              <div
                key={row.feature}
                className={`grid grid-cols-3${i < comparisons.length - 1 ? ' border-b border-[rgba(201,168,76,0.08)]' : ''}`}
              >
                <div className="p-4 text-[rgba(232,228,220,0.5)] text-sm">{row.feature}</div>
                <div className="p-4 text-[#E8E4DC] text-sm border-l border-[rgba(201,168,76,0.08)]">
                  {row.timed}
                </div>
                <div className="p-4 text-[rgba(232,228,220,0.6)] text-sm border-l border-[rgba(201,168,76,0.08)]">
                  {row.livestream}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 Steps */}
      <section className="border-t border-[rgba(201,168,76,0.1)] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
            Step by Step
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-[#E8E4DC] mb-12">
            How to Buy — 5 Steps
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

      {/* Key Differences */}
      <section className="border-t border-[rgba(201,168,76,0.1)] py-20">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
            Key Points
          </p>
          <h2 className="text-3xl font-black text-[#E8E4DC] mb-8">
            Key Differences from Livestream
          </h2>
          <ul className="space-y-4">
            {keyDifferences.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#C9A84C] shrink-0" />
                <span className="text-[rgba(232,228,220,0.75)] text-base leading-relaxed">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Glossary */}
      <section className="border-t border-[rgba(201,168,76,0.1)] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
            Terminology
          </p>
          <h2 className="text-3xl font-black text-[#E8E4DC] mb-10">Glossary</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {glossary.map((item) => (
              <div
                key={item.term}
                className="bg-[#0F0F14] border border-[rgba(201,168,76,0.2)] rounded-xl p-6"
              >
                <dt className="text-[#C9A84C] font-bold text-sm mb-2">{item.term}</dt>
                <dd className="text-[rgba(232,228,220,0.6)] text-sm leading-relaxed">
                  {item.definition}
                </dd>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[rgba(201,168,76,0.1)] py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-[#E8E4DC] mb-4">
            Ready to bid on a timed lot?
          </h2>
          <p className="text-[rgba(232,228,220,0.5)] text-lg max-w-xl mx-auto mb-8">
            Register today and gain access to our full timed auction catalogue.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/register"
              className="bg-[#C9A84C] text-[#080809] font-semibold px-6 py-3 rounded hover:bg-[#E8C96A] transition-colors"
            >
              Register to Bid
            </Link>
            <Link
              href="/aml"
              className="border border-[rgba(201,168,76,0.4)] text-[#E8E4DC] px-6 py-3 rounded hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
            >
              AML Requirements
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
