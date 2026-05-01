import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Lots Still Available | Post-Auction Properties You Can Still Buy',
  description:
    'Properties that did not sell at auction are still available to purchase at or below guide price. Submit an offer today — we present it to the vendor immediately.',
  alternates: { canonical: 'https://www.midaspropertyauctions.co.uk/lots-still-available' },
  openGraph: {
    title: 'Lots Still Available | Post-Auction Properties You Can Still Buy',
    description: 'Properties that did not sell at auction. Submit an offer today — presented to the vendor immediately.',
    url: 'https://www.midaspropertyauctions.co.uk/lots-still-available',
  },
}

interface Step {
  number: string
  title: string
  body: string
}

const STEPS: Step[] = [
  {
    number: '01',
    title: 'Submit Offer',
    body: 'Contact us with your proposed offer amount. We will present it to the vendor immediately.',
  },
  {
    number: '02',
    title: 'Negotiation',
    body: 'We negotiate on your behalf. Vendors may accept, reject or counter-offer. We aim to have a response within 24 hours.',
  },
  {
    number: '03',
    title: 'Exchange',
    body: 'If accepted, exchange of contracts and 10% deposit required within 48 hours on standard auction terms.',
  },
]

export default function LotsStillAvailablePage() {
  return (
    <div className="min-h-screen bg-[#080809] pt-24 pb-20">

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section className="bg-[#080809] pt-28 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
            POST-AUCTION SALES
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-[#E8E4DC] mb-6">
            Lots Still Available
          </h1>
          <p className="text-[rgba(232,228,220,0.65)] text-xl max-w-2xl mx-auto">
            These properties were offered at a recent auction but remain unsold. Subject to vendor approval,
            offers may be considered.
          </p>
        </div>

        {/* Notice card */}
        <div className="bg-[rgba(201,168,76,0.08)] border border-[rgba(201,168,76,0.4)] rounded-xl p-6 max-w-2xl mx-auto mt-8 text-center">
          <p className="text-[rgba(232,228,220,0.75)] text-sm leading-relaxed">
            Properties listed here may be available for post-auction purchase at or near the guide price.
            All offers are subject to vendor approval and standard auction terms apply.
          </p>
        </div>
      </section>

      {/* ── Available Lots ────────────────────────────────────────────────────── */}
      <section className="bg-[#0F0F14] border-y border-[rgba(201,168,76,0.1)] py-12 px-6">
        <h2 className="text-center text-[#E8E4DC] font-black text-2xl mb-8">Available Now</h2>

        {/* Empty state */}
        <div className="bg-[#0F0F14] border border-[rgba(201,168,76,0.2)] rounded-xl p-10 text-center max-w-2xl mx-auto">
          <p className="text-[#E8E4DC] font-bold text-lg mb-3">No Lots Currently Available</p>
          <p className="text-[rgba(232,228,220,0.65)] text-sm leading-relaxed mb-8">
            All our recent lots have been sold. Check back after our next auction, or register to be
            notified of any withdrawn or unsold lots.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/current-auction"
              className="bg-[#C9A84C] text-[#080809] font-semibold px-6 py-3 rounded hover:bg-[#E8C96A] transition-colors"
            >
              View Current Auction Lots
            </Link>
            <Link
              href="/register"
              className="text-[#C9A84C] font-semibold hover:text-[#E8C96A] transition-colors self-center"
            >
              Register for alerts →
            </Link>
          </div>
        </div>
      </section>

      {/* ── How Post-Auction Offers Work ──────────────────────────────────────── */}
      <section className="bg-[#080809] py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center text-[#E8E4DC] font-black text-2xl mb-10">
            How Post-Auction Offers Work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {STEPS.map((step) => (
              <div
                key={step.number}
                className="bg-[#0F0F14] border border-[rgba(201,168,76,0.2)] rounded-xl p-8"
              >
                <p className="text-[#C9A84C] font-black text-3xl mb-3">{step.number}</p>
                <h3 className="text-[#E8E4DC] font-bold text-lg mb-3">{step.title}</h3>
                <p className="text-[rgba(232,228,220,0.65)] text-sm leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/contact"
              className="inline-block bg-[#C9A84C] text-[#080809] font-semibold px-6 py-3 rounded hover:bg-[#E8C96A] transition-colors"
            >
              Make an Enquiry
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
