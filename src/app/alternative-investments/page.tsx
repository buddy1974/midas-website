import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Alternative Property Investments | Midas Property Auctions',
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface ServiceCard {
  icon: string
  title: string
  body: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const SERVICES: ServiceCard[] = [
  {
    icon: '🌍',
    title: 'Tier 1 Investment Visas',
    body: 'We work with international investors seeking UK property investment as part of their Tier 1 (Investor) Visa application. Access to our full portfolio of qualifying investments.',
  },
  {
    icon: '✈️',
    title: 'International Relocations',
    body: 'Investing from overseas? We assist international clients with the full process — from property selection to conveyancing, immigration and relocation support.',
  },
  {
    icon: '🏦',
    title: 'Offshore Mortgages',
    body: 'Specialist mortgage advisory for international investors and UK expats looking to finance UK property. Access to lenders experienced with non-resident applications.',
  },
  {
    icon: '🏗',
    title: 'Block & Volume Acquisitions',
    body: 'Portfolio deals, development site acquisitions and volume purchases for institutional and high-net-worth investors. Discreet, professional and experienced.',
  },
  {
    icon: '🤝',
    title: 'JV Partnerships',
    body: 'Joint venture opportunities with experienced UK property investors and developers. We structure and facilitate JV partnerships for specific development projects.',
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AlternativeInvestmentsPage() {
  return (
    <div className="min-h-screen bg-[#080809] pt-24 pb-20">

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section className="bg-[#080809] pt-28 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
            BEYOND STANDARD AUCTIONS
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-[#E8E4DC] mb-6">
            Alternative Property Investments
          </h1>
          <p className="text-[rgba(232,228,220,0.65)] text-xl max-w-2xl mx-auto">
            Specialist investment services for sophisticated investors — from Tier 1 visas to
            international acquisitions.
          </p>
        </div>
      </section>

      {/* ── Services Grid ─────────────────────────────────────────────────────── */}
      <section className="bg-[#0F0F14] border-y border-[rgba(201,168,76,0.1)] py-16 px-6">
        <h2 className="text-center text-[#E8E4DC] font-black text-2xl mb-10">
          Our Specialist Services
        </h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
            <div
              key={service.title}
              className="bg-[#0F0F14] border border-[rgba(201,168,76,0.2)] rounded-xl p-8"
            >
              <div className="text-3xl mb-4">{service.icon}</div>
              <h3 className="text-[#E8E4DC] font-bold text-lg mb-3">{service.title}</h3>
              <p className="text-[rgba(232,228,220,0.65)] text-sm leading-relaxed">{service.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── MPG Link ──────────────────────────────────────────────────────────── */}
      <section className="bg-[rgba(201,168,76,0.06)] border-y border-[#C9A84C]/30 py-12 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-[#E8E4DC] font-black text-2xl mb-4">
            Full Details on Our Main Website
          </h2>
          <p className="text-[rgba(232,228,220,0.65)] text-base leading-relaxed mb-8">
            For comprehensive information on all our alternative investment services, visit the Midas
            Property Group main website.
          </p>
          <a
            href="https://www.midaspropertygroup.co.uk/alternative-investments-with-midas-property-group/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#C9A84C] font-bold text-lg hover:text-[#E8C96A] transition-colors"
          >
            Full details at midaspropertygroup.co.uk/alternative-investments →
          </a>
        </div>
      </section>

      {/* ── Contact CTA ───────────────────────────────────────────────────────── */}
      <section className="bg-[#080809] py-16 px-6 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-[#E8E4DC] font-black text-2xl mb-3">
            Interested in Alternative Investments?
          </h2>
          <p className="text-[rgba(232,228,220,0.65)] text-base mb-6">
            Speak to Sam Fongho directly for a confidential discussion.
          </p>
          <a
            href="tel:+447413041372"
            className="block text-[#C9A84C] font-bold text-2xl hover:text-[#E8C96A] transition-colors mb-8"
          >
            +44 (0) 7413041372
          </a>
          <Link
            href="/contact"
            className="inline-block bg-[#C9A84C] text-[#080809] font-semibold px-6 py-3 rounded hover:bg-[#E8C96A] transition-colors"
          >
            Send a Message
          </Link>
        </div>
      </section>

    </div>
  )
}
