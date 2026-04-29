import { type Metadata } from 'next'
import Link from 'next/link'
import RegisterYieldForm from './RegisterYieldForm'

export const metadata: Metadata = {
  title: 'Yielding Investments | Midas Property Auctions',
  description:
    'Tenanted properties with verified rental income. Ready-made investment opportunities producing yield from day one.',
}

const yieldingProperties = [
  {
    id: 'yi-1',
    address: '5 Weald Lane',
    area: 'Harrow, HA3 5EU',
    type: 'HMO — 9 Rooms',
    guidePrice: 895000,
    monthlyRent: 10300,
    annualIncome: 123600,
    yield: '13.0',
    tenancy: 'Individual ASTs — all occupied',
    gradient: 'from-[#C9A84C] to-[#080809]',
  },
  {
    id: 'yi-2',
    address: '88 Ripple Road',
    area: 'Barking, IG11 7NS',
    type: 'HMO — 6 Rooms',
    guidePrice: 310000,
    monthlyRent: 4200,
    annualIncome: 50400,
    yield: '16.3',
    tenancy: 'Licensed HMO — fully occupied',
    gradient: 'from-blue-900 to-[#080809]',
  },
  {
    id: 'yi-3',
    address: 'Portfolio — 3 x BTL',
    area: 'Barking & Dagenham',
    type: 'BTL Portfolio',
    guidePrice: 510000,
    monthlyRent: 3600,
    annualIncome: 43200,
    yield: '8.5',
    tenancy: 'Tenants in situ — ASTs',
    gradient: 'from-purple-900 to-[#080809]',
  },
]

function formatPrice(n: number) {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(n)
}

function formatRent(n: number) {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(n)
}

export default function YieldingInvestmentsPage() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-20">

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 text-center py-16">
        <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
          Income-Producing Properties
        </p>
        <h1 className="text-4xl md:text-5xl font-black text-[#1A1A1A] mb-6 leading-tight">
          Yielding Investments
        </h1>
        <p className="text-[#666] text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
          Tenanted properties with verified rental income — producing yield from day one.
          No void periods. No setup required. Just a proven income stream.
        </p>

        {/* 3 stat cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              title: 'Immediate Income',
              body: 'Rental income from day one — tenants already in place',
            },
            {
              title: 'Verified Yields',
              body: 'All rental income independently verified before listing',
            },
            {
              title: 'Hassle Free',
              body: 'Existing tenancies, compliant and professionally managed',
            },
          ].map(({ title, body }) => (
            <div
              key={title}
              className="bg-white border border-[#E8E5DE] rounded-xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
            >
              <div className="w-2 h-2 rounded-full bg-[#C9A84C] mb-3 mx-auto" />
              <h3 className="text-[#1A1A1A] font-bold text-base mb-2">{title}</h3>
              <p className="text-[#666] text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What Are Yielding Investments */}
      <section className="bg-[#F8F7F4] py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* Left — explanation */}
            <div>
              <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-3">
                What Are Yielding Investments?
              </p>
              <h2 className="text-2xl md:text-3xl font-black text-[#1A1A1A] mb-6">
                Income from day one
              </h2>
              <div className="space-y-4 text-[#444] text-sm leading-relaxed">
                <p>
                  A yielding investment is a property that already has tenants in place and is
                  producing rental income at the point of purchase.
                </p>
                <p>
                  Unlike vacant properties that require finding tenants after purchase, yielding
                  investments give you an immediate income stream from the moment you complete.
                </p>
                <p>
                  Midas sources and lists yielding investment properties across London, Essex and
                  nationwide — from single BTL properties to fully occupied HMOs producing
                  £40,000+ per year.
                </p>
              </div>
            </div>

            {/* Right — 4 benefit cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: '💰',
                  title: 'Immediate rental income',
                  body: 'No waiting for tenants. Income starts from completion.',
                },
                {
                  icon: '📋',
                  title: 'Existing tenancy agreements',
                  body: 'ASTs in place. All documentation provided with the legal pack.',
                },
                {
                  icon: '🏠',
                  title: 'HMOs and BTLs',
                  body: 'Single lets, multi-room HMOs and portfolio opportunities.',
                },
                {
                  icon: '📊',
                  title: 'Verified income figures',
                  body: 'Rental income independently verified — no inflated estimates.',
                },
              ].map(({ icon, title, body }) => (
                <div
                  key={title}
                  className="bg-white border border-[#E8E5DE] rounded-xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
                >
                  <span className="text-2xl block mb-2">{icon}</span>
                  <h3 className="text-[#1A1A1A] font-bold text-sm mb-1">{title}</h3>
                  <p className="text-[#666] text-xs leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Current Yielding Properties */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-10">
          <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-3">
            Available Now
          </p>
          <h2 className="text-2xl md:text-3xl font-black text-[#1A1A1A] mb-3">
            Current Yielding Properties
          </h2>
          <p className="text-[#666] text-sm">
            All properties below are tenanted and producing verified rental income.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {yieldingProperties.map((p) => (
            <div
              key={p.id}
              className="bg-white border border-[#E8E5DE] rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:border-[rgba(201,168,76,0.4)] transition-all"
            >
              {/* Image area with yield badge */}
              <div className={`relative h-44 bg-gradient-to-br ${p.gradient}`}>
                <span className="absolute top-3 left-3 bg-[#C9A84C] text-[#080809] text-xs font-black px-3 py-1.5 rounded">
                  {p.yield}% YIELD
                </span>
                <span className="absolute top-3 right-3 text-xs px-3 py-1 rounded bg-black/60 text-[#E8E4DC]">
                  {p.type}
                </span>
                <div className="absolute bottom-3 left-3">
                  <p className="text-white font-black text-lg leading-tight">{p.address}</p>
                  <p className="text-[rgba(232,228,220,0.7)] text-xs">{p.area}</p>
                </div>
              </div>

              {/* Details */}
              <div className="p-5">
                {/* Price and yield */}
                <div className="flex items-baseline justify-between mb-4">
                  <div>
                    <p className="text-[#888] text-xs uppercase tracking-wider mb-1">Guide Price</p>
                    <p className="text-[#C9A84C] font-black text-2xl">{formatPrice(p.guidePrice)}+</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#888] text-xs uppercase tracking-wider mb-1">Annual Income</p>
                    <p className="text-[#1A1A1A] font-bold text-lg">{formatRent(p.annualIncome)}</p>
                  </div>
                </div>

                {/* Income breakdown */}
                <div className="bg-[#F8F7F4] rounded-lg p-3 mb-4 space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#888]">Current Rent</span>
                    <span className="text-[#1A1A1A] font-semibold">{formatRent(p.monthlyRent)}/mo</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[#888]">Gross Yield</span>
                    <span className="text-[#C9A84C] font-bold">{p.yield}%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[#888]">Tenancy</span>
                    <span className="text-[#444] font-medium text-right max-w-[140px] leading-snug">{p.tenancy}</span>
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="block w-full text-center bg-[#C9A84C] text-[#080809] font-bold py-3 rounded hover:bg-[#E8C96A] transition-all text-sm"
                >
                  Enquire About This Property
                </Link>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-[#999] text-xs mt-8">
          Additional yielding properties available to registered investors.{' '}
          <Link href="/register" className="text-[#C9A84C] hover:text-[#E8C96A] transition-colors">
            Register for full access →
          </Link>
        </p>
      </section>

      {/* Register Interest */}
      <section className="bg-[#F8F7F4] py-16">
        <div className="max-w-2xl mx-auto px-6">
          <div className="bg-white border border-[rgba(201,168,76,0.4)] rounded-2xl p-8 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
            <div className="mb-6">
              <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-2">
                Never Miss an Opportunity
              </p>
              <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">
                Register for Yielding Investment Alerts
              </h2>
              <p className="text-[#666] text-sm leading-relaxed">
                Tell us your minimum yield requirement and preferred location. We will contact you
                the moment a matching property becomes available.
              </p>
            </div>
            <RegisterYieldForm />
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-3xl mx-auto px-6 py-16 text-center">
        <div className="bg-[#1A1A1A] rounded-2xl p-10">
          <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-3">
            Have a Tenanted Property?
          </p>
          <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
            Have a tenanted property to sell?
          </h2>
          <p className="text-[rgba(232,228,220,0.7)] text-sm leading-relaxed max-w-xl mx-auto mb-8">
            We specialise in selling tenanted properties. Your tenants stay in place — the sale is
            simple, certain and fast.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-[#C9A84C] text-[#080809] font-bold px-6 py-3 rounded hover:bg-[#E8C96A] transition-all"
          >
            Contact Sam →
          </Link>
        </div>
      </section>

    </div>
  )
}
