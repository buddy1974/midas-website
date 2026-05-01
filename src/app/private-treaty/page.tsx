import { type Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Private Treaty Sales | Discreet Off-Market Property Transactions',
  description:
    'Confidential private treaty property sales for sensitive situations — probate, corporate disposals and complex transactions. Flexible timelines, discreet marketing and guaranteed confidentiality.',
  alternates: { canonical: 'https://www.midaspropertyauctions.co.uk/private-treaty' },
  openGraph: {
    title: 'Private Treaty Sales | Discreet Off-Market Property Transactions',
    description: 'Confidential property sales for sensitive situations. Flexible timelines, discreet marketing and guaranteed confidentiality.',
    url: 'https://www.midaspropertyauctions.co.uk/private-treaty',
  },
}

const whenToChoose = [
  'Sensitive probate or estate situations',
  'When the vendor requires confidentiality',
  'Complex commercial or multi-title transactions',
  'When a specific buyer has already been identified',
  'When flexible completion timelines are needed',
  'When the property falls outside standard auction criteria',
]

export default function PrivateTreatyPage() {
  return (
    <div className="min-h-screen bg-[#080809] pt-24 pb-20">

      {/* ── Hero ── */}
      <section className="max-w-4xl mx-auto px-6 text-center py-16">
        <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
          Private Treaty
        </p>
        <h1 className="text-4xl md:text-5xl font-black text-[#E8E4DC] mb-6 leading-tight">
          Private Treaty Property Services
        </h1>
        <p className="text-[rgba(232,228,220,0.65)] text-xl max-w-2xl mx-auto mb-10">
          Some properties are better suited to private negotiation than public auction. We handle
          both — with equal professionalism.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-[#C9A84C] text-[#080809] font-semibold px-6 py-3 rounded hover:bg-[#E8C96A] transition-colors"
        >
          Discuss a Private Treaty Sale
        </Link>
      </section>

      {/* ── What is Private Treaty? ── */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <div className="bg-[#0F0F14] border border-[rgba(201,168,76,0.2)] rounded-2xl p-8 max-w-3xl mx-auto">
          <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
            What is Private Treaty?
          </p>
          <p className="text-[rgba(232,228,220,0.75)] leading-relaxed mb-4">
            A private treaty sale is a negotiated property transaction conducted directly between
            buyer and seller, without the public auction process. Midas acts as the professional
            intermediary, negotiating the best outcome for all parties while maintaining discretion
            throughout.
          </p>
          <p className="text-[#E8E4DC] font-semibold">
            This is not a less professional approach — it is often the smarter one.
          </p>
        </div>
      </section>

      {/* ── When to Choose Private Treaty? ── */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-3 text-center">
          Right for you if…
        </p>
        <h2 className="text-3xl font-black text-[#E8E4DC] text-center mb-10">
          When to Choose Private Treaty?
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {whenToChoose.map((item) => (
            <div
              key={item}
              className="bg-[#0F0F14] border border-[rgba(201,168,76,0.15)] rounded-xl p-5 flex items-start gap-3"
            >
              <span className="text-[#C9A84C] text-lg leading-none mt-0.5">✓</span>
              <p className="text-[#E8E4DC] text-sm leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Our Process ── */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-3 text-center">
          How It Works
        </p>
        <h2 className="text-3xl font-black text-[#E8E4DC] text-center mb-10">Our Process</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="bg-[#0F0F14] border border-[rgba(201,168,76,0.2)] rounded-2xl p-7">
            <p className="text-[#C9A84C] text-3xl font-black mb-4">01</p>
            <h3 className="text-[#E8E4DC] font-black text-lg mb-3">Free Valuation</h3>
            <p className="text-[rgba(232,228,220,0.65)] text-sm leading-relaxed">
              We assess your property and advise whether private treaty or auction is the right
              approach. Sometimes it is both — auction first, then private treaty if unsold.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-[#0F0F14] border border-[rgba(201,168,76,0.2)] rounded-2xl p-7">
            <p className="text-[#C9A84C] text-3xl font-black mb-4">02</p>
            <h3 className="text-[#E8E4DC] font-black text-lg mb-3">Discreet Marketing</h3>
            <p className="text-[rgba(232,228,220,0.65)] text-sm leading-relaxed">
              We approach qualified buyers from our network of 2,847 investors without public
              advertising. Your sale remains confidential until you choose to proceed.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-[#0F0F14] border border-[rgba(201,168,76,0.2)] rounded-2xl p-7">
            <p className="text-[#C9A84C] text-3xl font-black mb-4">03</p>
            <h3 className="text-[#E8E4DC] font-black text-lg mb-3">Professional Negotiation</h3>
            <p className="text-[rgba(232,228,220,0.65)] text-sm leading-relaxed">
              We negotiate on your behalf, manage the legal process and coordinate with solicitors
              through to completion.
            </p>
          </div>
        </div>
      </section>

      {/* ── Fees ── */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <div className="bg-[#0F0F14] border border-[rgba(201,168,76,0.2)] rounded-2xl p-8 max-w-3xl mx-auto">
          <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
            Transparent Fees
          </p>
          <h2 className="text-2xl font-black text-[#E8E4DC] mb-4">Fees</h2>
          <p className="text-[rgba(232,228,220,0.75)] leading-relaxed">
            Our private treaty fee is agreed upfront as a fixed amount or percentage. No hidden
            charges. No surprises. Payable only on successful completion.
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="max-w-2xl mx-auto px-6 text-center">
        <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
          Get in Touch
        </p>
        <h2 className="text-3xl font-black text-[#E8E4DC] mb-4">
          Is Private Treaty Right for You?
        </h2>
        <p className="text-[rgba(232,228,220,0.65)] mb-6">
          Call Sam directly for a confidential conversation.
        </p>
        <a
          href="tel:07454753318"
          className="block text-[#C9A84C] text-2xl font-bold mb-8 hover:text-[#E8C96A] transition-colors"
        >
          07454 753318
        </a>
        <Link
          href="/contact"
          className="inline-block bg-[#C9A84C] text-[#080809] font-semibold px-6 py-3 rounded hover:bg-[#E8C96A] transition-colors"
        >
          Send a Message
        </Link>
      </section>

    </div>
  )
}
