import type { Metadata } from 'next'
import Link from 'next/link'
import RegisterYieldForm from './RegisterYieldForm'

export const metadata: Metadata = {
  title: 'Yielding Investments | Tenanted Properties With Verified Income',
  description:
    'Tenanted properties with verified rental income — producing yield from day one. HMOs and BTLs with existing tenancy agreements. Yields from 8.5% to 16.3%.',
  alternates: { canonical: 'https://www.midaspropertyauctions.co.uk/yielding-investments' },
  openGraph: {
    title: 'Yielding Investments | Tenanted Properties With Verified Income',
    description: 'Income-producing properties with tenants in place. Yields from 8.5% to 16.3%. Immediate rental income from completion.',
    url: 'https://www.midaspropertyauctions.co.uk/yielding-investments',
  },
}

const yieldingProperties = [
  {
    id: 'yi-1',
    address: '5 Weald Lane',
    area: 'Harrow HA3 5EU',
    type: 'HMO — 9 Rooms',
    badge: 'Fully Licensed',
    guidePrice: '£895,000',
    monthlyRent: '£10,300',
    annualIncome: '£123,600',
    yieldPct: '13.0%',
    tenancy: 'Individual ASTs — all occupied',
    gradient: 'from-[#1a1208] to-[#0d0d14]',
  },
  {
    id: 'yi-2',
    address: '88 Ripple Road',
    area: 'Barking IG11 7NS',
    type: 'HMO — 6 Rooms',
    badge: 'Licensed',
    guidePrice: '£310,000',
    monthlyRent: '£4,200',
    annualIncome: '£50,400',
    yieldPct: '16.3%',
    tenancy: 'Licensed HMO — fully occupied',
    gradient: 'from-[#0a1220] to-[#0d0d14]',
  },
  {
    id: 'yi-3',
    address: 'Portfolio — 3 x BTL',
    area: 'Barking & Dagenham',
    type: 'BTL Portfolio',
    badge: 'Tenants in Situ',
    guidePrice: '£510,000',
    monthlyRent: '£3,600',
    annualIncome: '£43,200',
    yieldPct: '8.5%',
    tenancy: 'Tenants in situ — ASTs',
    gradient: 'from-[#0d1a0d] to-[#0d0d14]',
  },
]

export default function YieldingInvestmentsPage() {
  return (
    <main>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-[78vh] flex items-center justify-center"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(8,8,9,0.72) 0%, rgba(8,8,9,0.92) 100%), url('https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="relative max-w-4xl mx-auto px-6 text-center pt-20">
          <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.3em] mb-4">
            INCOME-PRODUCING PROPERTIES
          </p>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
            Yielding <span className="text-[#C9A84C]">Investments</span>
          </h1>
          <p className="text-[rgba(232,228,220,0.8)] text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Tenanted properties with verified rental income — producing yield from day one.
            No void periods. No setup required. Just a proven income stream.
          </p>

          {/* Benefit pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {['Immediate Income', 'Verified Yields', 'Tenants in Place'].map(pill => (
              <span
                key={pill}
                className="bg-[rgba(201,168,76,0.12)] border border-[rgba(201,168,76,0.4)] text-[#C9A84C] text-xs font-semibold px-4 py-2 rounded-full"
              >
                {pill}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/properties"
              className="bg-[#C9A84C] text-[#080809] font-bold px-6 py-3 rounded hover:bg-[#E8C96A] transition-colors"
            >
              Available Properties →
            </Link>
            <Link
              href="/register"
              className="border border-[rgba(201,168,76,0.5)] text-[#E8E4DC] px-6 py-3 rounded hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
            >
              Register Interest →
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHAT ARE YIELDING INVESTMENTS ─────────────────────────────────── */}
      <section className="bg-[#0D0D14] py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* Left — 60% */}
          <div className="lg:col-span-3">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
              What is a <span className="text-[#C9A84C]">Yielding Investment?</span>
            </h2>
            <div className="space-y-4 text-[rgba(232,228,220,0.7)] text-base leading-relaxed">
              <p>
                A yielding investment is a property that already has tenants in place and is producing
                rental income at the point of purchase.
              </p>
              <p>
                Unlike vacant properties that require finding tenants after purchase, yielding
                investments give you an immediate income stream from the moment you complete.
              </p>
              <p>
                Midas sources and lists yielding investment properties across London, Essex and
                nationwide — from single BTL properties to fully occupied HMOs.
              </p>
            </div>
          </div>

          {/* Right — 40% benefit cards */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: '💰', title: 'Immediate Rental Income', desc: 'No waiting for tenants. Income starts from completion.' },
              { icon: '📋', title: 'Existing Tenancy Agreements', desc: 'ASTs already in place. All documentation provided with the legal pack.' },
              { icon: '🏠', title: 'HMOs and BTLs', desc: 'Single lets, multi-room HMOs and portfolio opportunities.' },
              { icon: '📊', title: 'Verified Income Figures', desc: 'Rental income independently verified — no inflated estimates.' },
            ].map(b => (
              <div
                key={b.title}
                className="rounded-xl p-5"
                style={{ backgroundColor: '#0F0F14', border: '1px solid rgba(201,168,76,0.2)' }}
              >
                <div className="text-2xl mb-3">{b.icon}</div>
                <p className="text-[#E8E4DC] font-bold text-sm mb-2">{b.title}</p>
                <p className="text-[rgba(232,228,220,0.55)] text-xs leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CURRENT YIELDING PROPERTIES ───────────────────────────────────── */}
      <section className="bg-[#080809] py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <h2 className="text-[#C9A84C] font-black uppercase text-xl mb-2">Current Yielding Properties</h2>
            <div className="w-10 h-0.5 bg-[#C9A84C] mb-4" />
            <p className="text-[rgba(232,228,220,0.5)] text-sm">
              All properties below are tenanted and producing verified rental income.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {yieldingProperties.map(p => (
              <div
                key={p.id}
                className="rounded-xl overflow-hidden flex flex-col"
                style={{ backgroundColor: '#0F0F14', border: '1px solid rgba(201,168,76,0.2)' }}
              >
                {/* Header */}
                <div className={`bg-gradient-to-br ${p.gradient} px-5 pt-5 pb-4`}>
                  <span className="bg-[#C9A84C] text-[#080809] text-xs font-black px-3 py-1 rounded-full">
                    {p.yieldPct} YIELD
                  </span>
                  <p className="text-white font-black text-base mt-3">{p.address}</p>
                  <p className="text-[rgba(232,228,220,0.5)] text-xs">{p.area}</p>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    <span className="bg-[rgba(201,168,76,0.12)] border border-[rgba(201,168,76,0.3)] text-[#C9A84C] text-[10px] font-semibold px-2 py-0.5 rounded">
                      {p.type}
                    </span>
                    <span className="bg-[rgba(255,255,255,0.05)] text-[rgba(232,228,220,0.5)] text-[10px] px-2 py-0.5 rounded">
                      {p.badge}
                    </span>
                  </div>
                </div>

                {/* Income grid */}
                <div className="px-5 py-4 grid grid-cols-2 gap-3 flex-1">
                  {[
                    { label: 'Monthly Rent', value: p.monthlyRent },
                    { label: 'Annual Income', value: p.annualIncome },
                    { label: 'Tenancy Type', value: 'AST' },
                    { label: 'Guide Price', value: `${p.guidePrice}+` },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p className="text-[rgba(232,228,220,0.35)] text-[10px] uppercase tracking-wider">{label}</p>
                      <p className="text-[#E8E4DC] text-sm font-semibold">{value}</p>
                    </div>
                  ))}
                </div>

                <p className="px-5 pb-3 text-[rgba(232,228,220,0.35)] text-[10px] italic border-t border-[rgba(201,168,76,0.08)] pt-3">
                  {p.tenancy}
                </p>

                {/* Buttons */}
                <div className="px-5 pb-5 flex gap-2">
                  <Link
                    href="/contact"
                    className="flex-1 text-center bg-[#C9A84C] text-[#080809] text-xs font-bold py-2.5 rounded hover:bg-[#E8C96A] transition-colors"
                  >
                    View Details →
                  </Link>
                  <Link
                    href="/register"
                    className="flex-1 text-center border border-[rgba(201,168,76,0.4)] text-[rgba(232,228,220,0.7)] text-xs py-2.5 rounded hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
                  >
                    Register Interest
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY BUY YIELDING COMPARISON ───────────────────────────────────── */}
      <section className="bg-[#111118] border-y border-[rgba(201,168,76,0.1)] py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-white text-center mb-10">
            Why Buy a <span className="text-[#C9A84C]">Yielding Investment?</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Yielding */}
            <div
              className="rounded-xl p-7"
              style={{ border: '2px solid #C9A84C', backgroundColor: 'rgba(201,168,76,0.04)' }}
            >
              <p className="text-[#C9A84C] font-black uppercase tracking-wider text-sm mb-5">
                ◆ Yielding Investment
              </p>
              <ul className="space-y-3">
                {[
                  '✅ Income from day one',
                  '✅ No tenant void risk',
                  '✅ Verified rental figures',
                  '✅ Existing tenancy documentation',
                  '✅ Immediate ROI calculation',
                ].map(item => (
                  <li key={item} className="text-[rgba(232,228,220,0.8)] text-sm">{item}</li>
                ))}
              </ul>
            </div>

            {/* Vacant */}
            <div
              className="rounded-xl p-7"
              style={{ border: '1px solid rgba(255,255,255,0.08)', backgroundColor: 'rgba(255,255,255,0.02)' }}
            >
              <p className="text-[rgba(232,228,220,0.4)] font-black uppercase tracking-wider text-sm mb-5">
                Vacant Property
              </p>
              <ul className="space-y-3">
                {[
                  '⏳ Wait to find tenants',
                  '⚠️ Void period — no income',
                  '📊 Estimated rental projections only',
                  '📝 New tenancy to arrange',
                  '❓ Unknown actual yield',
                ].map(item => (
                  <li key={item} className="text-[rgba(232,228,220,0.45)] text-sm">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── REGISTER INTEREST ─────────────────────────────────────────────── */}
      <section className="bg-[#080809] py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <div
            className="rounded-xl p-8 md:p-10"
            style={{ border: '1px solid rgba(201,168,76,0.35)', backgroundColor: '#0F0F14' }}
          >
            <h2 className="text-2xl font-black text-white mb-2">
              Register for Yielding Investment Alerts
            </h2>
            <p className="text-[rgba(232,228,220,0.55)] text-sm mb-8 leading-relaxed">
              Tell us your minimum yield and budget. We contact you the moment a matching property
              becomes available.
            </p>
            <RegisterYieldForm />
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ────────────────────────────────────────────────────── */}
      <section className="bg-[#0D0D14] border-t border-[rgba(201,168,76,0.1)] py-16 px-6 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-xl md:text-2xl font-black text-white mb-4">
            Have a tenanted property to sell?
          </h2>
          <p className="text-[rgba(232,228,220,0.6)] text-base leading-relaxed mb-8">
            We specialise in selling tenanted properties discreetly. Your tenants stay in place —
            the sale is simple, certain and fast.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-[#C9A84C] text-[#080809] font-bold px-8 py-4 rounded hover:bg-[#E8C96A] transition-colors"
          >
            Contact Sam →
          </Link>
        </div>
      </section>

    </main>
  )
}
