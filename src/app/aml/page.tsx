import { type Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'AML Requirements | Anti-Money Laundering for Property Buyers',
  description:
    'Anti-money laundering requirements for buyers at Midas Property Auctions. Find out what ID and proof of funds documentation you need to bid and complete a purchase.',
  alternates: { canonical: 'https://www.midaspropertyauctions.co.uk/aml' },
}

const individualPhotoId = [
  'Current valid passport',
  'Current UK driving licence (photo card)',
  'National identity card (EEA nationals only)',
]

const individualAddress = [
  'Bank or building society statement',
  'Council tax bill',
  'Utility bill (gas, electric, water)',
  'HMRC or government correspondence',
]

const companyDocs = [
  'Certificate of Incorporation',
  'Latest filed accounts (from Companies House)',
  'Photo ID and proof of address for each director',
  'Proof of registered company address',
  'Beneficial ownership information (where applicable)',
]

export default function AmlPage() {
  return (
    <div className="min-h-screen bg-[#080809] pt-24 pb-20">

      {/* ── Hero ── */}
      <section className="max-w-4xl mx-auto px-6 text-center py-16">
        <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
          Legal Compliance
        </p>
        <h1 className="text-4xl md:text-5xl font-black text-[#E8E4DC] mb-6 leading-tight">
          Anti-Money Laundering Requirements
        </h1>
        <p className="text-[rgba(232,228,220,0.65)] text-xl max-w-2xl mx-auto">
          Required by law for all property transactions. Please have your documents ready before
          auction day.
        </p>
      </section>

      {/* ── Why We Ask ── */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <div className="bg-[#0F0F14] border border-[rgba(201,168,76,0.2)] rounded-2xl p-8">
          <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
            Why We Ask
          </p>
          <p className="text-[rgba(232,228,220,0.75)] leading-relaxed">
            UK law requires all property professionals to verify the identity of all buyers before
            they can bid or complete a purchase. This applies to all buyers — individuals, companies
            and trustees. We take these obligations seriously and all documentation is handled
            securely.
          </p>
        </div>
      </section>

      {/* ── Individual Buyers ── */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-3">
          Section 1
        </p>
        <h2 className="text-3xl font-black text-[#E8E4DC] mb-8">For Individual Buyers</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Photo ID */}
          <div className="bg-[#0F0F14] border border-[rgba(201,168,76,0.2)] rounded-xl p-6">
            <h3 className="text-[#E8E4DC] font-black text-base mb-5">
              Photo Identification{' '}
              <span className="text-[rgba(232,228,220,0.45)] font-normal">(one of:)</span>
            </h3>
            <ul className="space-y-3">
              {individualPhotoId.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-[#C9A84C] text-sm mt-0.5 shrink-0">✓</span>
                  <span className="text-[rgba(232,228,220,0.75)] text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Proof of Address */}
          <div className="bg-[#0F0F14] border border-[rgba(201,168,76,0.2)] rounded-xl p-6">
            <h3 className="text-[#E8E4DC] font-black text-base mb-5">
              Proof of Address{' '}
              <span className="text-[rgba(232,228,220,0.45)] font-normal">
                (dated within 3 months, one of:)
              </span>
            </h3>
            <ul className="space-y-3">
              {individualAddress.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-[#C9A84C] text-sm mt-0.5 shrink-0">✓</span>
                  <span className="text-[rgba(232,228,220,0.75)] text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Company Buyers ── */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-3">
          Section 2
        </p>
        <h2 className="text-3xl font-black text-[#E8E4DC] mb-8">For Company Buyers</h2>
        <div className="bg-[#0F0F14] border border-[rgba(201,168,76,0.2)] rounded-xl p-6 max-w-2xl">
          <ul className="space-y-3">
            {companyDocs.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="text-[#C9A84C] text-sm mt-0.5 shrink-0">✓</span>
                <span className="text-[rgba(232,228,220,0.75)] text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Source of Funds ── */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-3">
          Section 3
        </p>
        <h2 className="text-3xl font-black text-[#E8E4DC] mb-8">Source of Funds</h2>
        <div className="bg-[#0F0F14] border border-[rgba(201,168,76,0.2)] rounded-xl p-7 max-w-3xl">
          <p className="text-[rgba(232,228,220,0.75)] leading-relaxed mb-5">
            We may request evidence of the source of funds used for your purchase. This may include:
          </p>
          <ul className="space-y-2 mb-5">
            {[
              'Recent bank statements showing the funds',
              'A letter from your solicitor confirming funds',
              'Evidence of a property sale or inheritance',
              'Documentation from an investment account',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="text-[#C9A84C] text-sm mt-0.5 shrink-0">•</span>
                <span className="text-[rgba(232,228,220,0.75)] text-sm">{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-[rgba(232,228,220,0.55)] text-sm">
            This is a legal requirement and applies to all buyers regardless of purchase price.
          </p>
        </div>
      </section>

      {/* ── GDPR Note ── */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <div className="border border-[rgba(201,168,76,0.35)] rounded-xl p-7 max-w-3xl">
          <p className="text-[rgba(232,228,220,0.7)] text-sm leading-relaxed">
            All documentation submitted to Midas Property Auctions is handled in strict confidence
            and stored securely in accordance with the{' '}
            <span className="text-[#E8E4DC] font-medium">
              UK General Data Protection Regulation (UK GDPR)
            </span>{' '}
            and the{' '}
            <span className="text-[#E8E4DC] font-medium">
              Money Laundering, Terrorist Financing and Transfer of Funds (Information on the Payer)
              Regulations 2017
            </span>
            .
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="max-w-2xl mx-auto px-6 text-center">
        <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
          Ready to Bid?
        </p>
        <h2 className="text-3xl font-black text-[#E8E4DC] mb-4">Questions about AML?</h2>
        <p className="text-[rgba(232,228,220,0.65)] mb-8">
          Our team is happy to talk you through the process before auction day.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="inline-block border border-[#C9A84C] text-[#C9A84C] px-6 py-3 rounded hover:bg-[rgba(201,168,76,0.08)] transition-colors"
          >
            Questions about AML?
          </Link>
          <Link
            href="/register"
            className="inline-block bg-[#C9A84C] text-[#080809] font-semibold px-6 py-3 rounded hover:bg-[#E8C96A] transition-colors"
          >
            Register to Bid
          </Link>
        </div>
      </section>

    </div>
  )
}
