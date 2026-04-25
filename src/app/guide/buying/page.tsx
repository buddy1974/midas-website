import { type Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Guide to Buying at Auction | Midas Property Auctions',
  description: 'Your complete step-by-step guide to buying property at auction with Midas.',
}

const steps: { number: string; title: string; body: string }[] = [
  {
    number: '01',
    title: 'Browse the catalogue',
    body: 'View all lots in our current auction. Each lot comes with a guide price, property details and legal pack.',
  },
  {
    number: '02',
    title: 'Register to bid',
    body: 'Registration is free and takes 2 minutes. You can register before or on auction day.',
  },
  {
    number: '03',
    title: 'Review the legal pack',
    body: 'Every lot has a legal pack containing title documents, searches and special conditions. Read it carefully or instruct a solicitor to review it for you.',
  },
  {
    number: '04',
    title: 'Arrange finance',
    body: 'If you need bridging finance, arrange this before auction day. Completion is typically 28 days after the auction. Midas can connect you with private lenders quickly.',
  },
  {
    number: '05',
    title: 'Attend the auction',
    body: 'Our auctions are online. Bid via telephone, proxy or internet from anywhere in the world.',
  },
]

const glossary: { term: string; definition: string }[] = [
  { term: 'Guide Price', definition: 'The price at which the auctioneer expects bidding to start.' },
  { term: 'Reserve Price', definition: 'The minimum price the seller will accept. Not disclosed publicly.' },
  { term: 'Legal Pack', definition: 'Documents including title deeds, searches and special conditions of sale.' },
  { term: 'Exchange', definition: 'The moment of auction conclusion — contracts exchange at hammer fall.' },
  { term: 'Completion', definition: 'When the full balance is paid and keys change hands. Typically 28 days.' },
  { term: 'Deposit', definition: '10% of the purchase price paid immediately at hammer fall.' },
  { term: 'Lot', definition: 'A property listed for sale at auction.' },
  { term: 'Proxy Bid', definition: 'A maximum bid submitted in advance — the system bids on your behalf.' },
  { term: 'Telephone Bid', definition: 'You bid verbally with a team member during the live auction.' },
]

export default function BuyingGuidePage() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-20">

      {/* Hero */}
      <section className="bg-[#080809] py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
            Buyer&apos;s Guide
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
            Your Complete Guide to{' '}
            <span className="bg-gradient-to-r from-[#C9A84C] to-[#E8C96A] bg-clip-text text-transparent">
              Buying at Auction
            </span>
          </h1>
          <p className="text-[#999] text-xl max-w-2xl mx-auto mb-10">
            Everything you need to know — from browsing the catalogue to collecting your keys.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/properties"
              className="bg-[#C9A84C] text-[#080809] font-semibold px-6 py-3 rounded hover:bg-[#E8C96A] transition-all"
            >
              View Current Lots
            </Link>
            <Link
              href="/register"
              className="border border-[#C9A84C] text-[#C9A84C] px-6 py-3 rounded hover:bg-[rgba(201,168,76,0.05)] transition-colors"
            >
              Register to Bid
            </Link>
          </div>
        </div>
      </section>

      {/* Section 1 — How Auction Buying Works */}
      <section className="bg-[#F8F7F4] py-20">
        <div className="max-w-7xl mx-auto px-6 max-w-3xl">
          <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
            The Process
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-[#1A1A1A] mb-6">
            How Auction Buying Works
          </h2>
          <p className="text-[#444] text-lg leading-relaxed">
            Unlike traditional property purchases, auction buying is fast and certain. When the
            hammer falls, contracts exchange immediately. The sale is legally binding and cannot fall
            through.
          </p>
        </div>
      </section>

      {/* Section 2 — 5 Steps */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
            Step by Step
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-[#1A1A1A] mb-12">
            Before the Auction — 5 Steps
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

      {/* Section 3 — On Auction Day */}
      <section className="bg-[#F8F7F4] py-20">
        <div className="max-w-7xl mx-auto px-6 max-w-3xl">
          <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
            Auction Day
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-[#1A1A1A] mb-6">
            On Auction Day
          </h2>
          <p className="text-[#444] text-lg leading-relaxed">
            When your bid is accepted, you pay a 10% non-refundable deposit immediately. The
            remaining balance is due within 28 days of auction.
          </p>
        </div>
      </section>

      {/* Section 4 — After the Auction */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 max-w-3xl">
          <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
            Post-Auction
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-[#1A1A1A] mb-6">
            After the Auction
          </h2>
          <p className="text-[#444] text-lg leading-relaxed">
            We issue a Memorandum of Sale and coordinate with solicitors for completion. Our team
            supports you through every step.
          </p>
        </div>
      </section>

      {/* Section 5 — Glossary */}
      <section className="bg-[#F8F7F4] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
            Terminology
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-[#1A1A1A] mb-10">
            Auction Glossary
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {glossary.map((item) => (
              <div
                key={item.term}
                className="bg-white border border-[#E8E5DE] rounded-xl p-7 shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
              >
                <dt className="text-[#C9A84C] font-bold text-sm mb-2">{item.term}</dt>
                <dd className="text-[#666] text-sm leading-relaxed">{item.definition}</dd>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#080809] py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-8">
            Ready to start?
          </h2>
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <Link
              href="/properties"
              className="bg-[#C9A84C] text-[#080809] font-semibold px-6 py-3 rounded hover:bg-[#E8C96A] transition-all"
            >
              View Current Lots
            </Link>
            <Link
              href="/contact"
              className="border border-[#C9A84C] text-[#C9A84C] px-6 py-3 rounded hover:bg-[rgba(201,168,76,0.05)] transition-colors"
            >
              Contact Us
            </Link>
          </div>
          <p className="text-[#666] text-sm">
            Have questions? Call Sam:{' '}
            <a
              href="tel:07454753318"
              className="text-[#C9A84C] hover:text-[#E8C96A] transition-colors font-medium"
            >
              07454 753318
            </a>
          </p>
        </div>
      </section>

    </div>
  )
}
