import { type Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Probate & Corporate Property Sales | Specialist Auction Services',
  description:
    'Specialist probate, fire-damaged, corporate and distressed property sales through auction. Sensitive handling, fast completion and full coordination with solicitors and estate administrators.',
  alternates: { canonical: 'https://www.midaspropertyauctions.co.uk/probate' },
  openGraph: {
    title: 'Probate & Corporate Property Sales | Specialist Auction Services',
    description: 'Specialist probate, fire-damaged, corporate and distressed property sales through auction. Sensitive handling, fast completion.',
    url: 'https://www.midaspropertyauctions.co.uk/probate',
  },
}

const specialistTypes = [
  {
    icon: '🏠',
    title: 'Probate Properties',
    description: 'Full coordination with solicitors and estate administrators.',
  },
  {
    icon: '🔥',
    title: 'Fire Damaged Properties',
    description: 'We sell as-is to specialist buyers and developers.',
  },
  {
    icon: '🌿',
    title: 'Japanese Knotweed Issues',
    description: 'Access to specialist buyers experienced in remediation.',
  },
  {
    icon: '💧',
    title: 'Structural & Damp Issues',
    description: 'Investors who buy, refurbish and hold or flip.',
  },
  {
    icon: '📋',
    title: 'Short Lease Properties',
    description: 'Leasehold specialist buyers with lease extension experience.',
  },
  {
    icon: '👥',
    title: 'Tenanted & HMO Properties',
    description: 'Our investor database is full of buy-to-let and HMO buyers.',
  },
  {
    icon: '🏗',
    title: 'Development Sites & Land',
    description: 'Developers, housebuilders and planning specialists.',
  },
  {
    icon: '🏢',
    title: 'Commercial & Mixed Use',
    description: 'Commercial investors and conversion specialists.',
  },
]

export default function ProbatePage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-[#080809] py-20 pt-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-5">
            Specialist Services
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
            Specialist Property Services
          </h1>
          <p className="text-[#999] text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            We handle the complex cases other brokerages turn away.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-[#C9A84C] text-[#080809] font-semibold px-6 py-3 rounded hover:bg-[#E8C96A] transition-all"
          >
            Discuss Your Property
          </Link>
        </div>
      </section>

      {/* Section 1 — Probate Properties */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-black text-[#1A1A1A] mb-12 text-center">
            Probate Properties
          </h2>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left — text */}
            <div className="space-y-5 text-[#555] text-base leading-relaxed">
              <p>
                Managing a probate property is one of the most sensitive property transactions you
                will face. We understand that and approach every case with care.
              </p>
              <p>
                The property cannot be sold until probate is granted — typically 8–12 weeks — but we
                can begin marketing immediately so you are ready to go the moment probate comes
                through.
              </p>
              <p>
                Our team coordinates with solicitors, manages viewings and handles all aspects of
                the sale so you can focus on what matters.
              </p>
            </div>

            {/* Right — info card */}
            <div className="bg-[#F8F7F4] border border-[#E8E5DE] rounded-xl p-8">
              <h3 className="text-lg font-bold text-[#1A1A1A] mb-5">How We Help</h3>
              <ul className="space-y-3">
                {[
                  'Begin marketing before probate is granted',
                  'Coordinate directly with your solicitor',
                  'Manage all viewings sensitively',
                  'Achieve the best price in the shortest time',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[#444] text-sm leading-relaxed">
                    <span className="text-[#C9A84C] font-bold mt-0.5">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 — Specialist Properties */}
      <section className="bg-[#F8F7F4] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-[#1A1A1A] mb-4">
              Specialist Properties We Handle
            </h2>
            <p className="text-[#666] text-base max-w-xl mx-auto">
              We have experience selling properties that most agents won&apos;t touch.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {specialistTypes.map((item) => (
              <div
                key={item.title}
                className="bg-white border border-[#E8E5DE] rounded-xl p-7 shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
              >
                <span className="text-3xl block mb-4">{item.icon}</span>
                <h3 className="font-bold text-[#1A1A1A] text-sm mb-2 leading-snug">{item.title}</h3>
                <p className="text-[#666] text-xs leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 — Corporate Services */}
      <section className="bg-white py-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-[#1A1A1A] mb-4">
              Corporate Services
            </h2>
            <p className="text-[#666] text-base">
              Discreet, professional bulk and portfolio disposal.
            </p>
          </div>

          <div className="text-[#555] text-base leading-relaxed space-y-5">
            <p>
              We work with banks, housing associations, local authorities and corporate clients
              managing property disposal.
            </p>
            <p>
              Whether you have a single property from a corporate estate or a portfolio of 20
              assets, we provide:
            </p>
            <ul className="space-y-2 pl-2">
              {[
                'Discreet off-market marketing to pre-qualified buyers',
                'Bulk and portfolio disposal strategies',
                'Confidential valuation and auction advice',
                'Full coordination with legal and compliance teams',
              ].map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <span className="text-[#C9A84C] font-bold mt-0.5">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <p>
              We understand that institutional and corporate clients have specific requirements
              around discretion, process and reporting. We adapt to your needs.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#C9A84C] py-16">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-black text-[#080809] mb-4">Discuss Your Property</h2>
          <p className="text-[#080809]/80 text-base mb-10 leading-relaxed">
            Confidential, no-obligation conversation. Call Sam directly or send us a message.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:07454753318"
              className="border border-[#080809] text-[#080809] font-semibold px-6 py-3 rounded hover:bg-[#080809] hover:text-[#C9A84C] transition-all"
            >
              Call 07454 753318
            </a>
            <Link
              href="/contact"
              className="border border-[#080809] text-[#080809] font-semibold px-6 py-3 rounded hover:bg-[#080809] hover:text-[#C9A84C] transition-all"
            >
              Send a Message
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
