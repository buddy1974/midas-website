import { type Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Guide to Selling at Auction | Midas Property Auctions',
  description:
    'A clear and simple guide to selling your property at auction through Midas. Free to list. Fast completion. Professional marketing to 2,847+ investors.',
}

export default function SellingGuidePage() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-20">

      {/* Hero */}
      <section className="bg-[#080809] py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
            Seller&apos;s Guide
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
            Selling at an Auction
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold text-[#C9A84C] mb-6">
            A Clear and Simple Guide
          </h2>
          <p className="text-[#999] text-base max-w-2xl mx-auto mb-10 leading-relaxed">
            There are many reasons why you might choose to sell a property at an auction but if you
            want to sell a property quickly and for the right price then it is one of the better
            options.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/valuation"
              className="bg-[#C9A84C] text-[#080809] font-semibold px-6 py-3 rounded hover:bg-[#E8C96A] transition-all"
            >
              Request Free Valuation →
            </Link>
            <Link
              href="/contact"
              className="border border-[#C9A84C] text-[#C9A84C] px-6 py-3 rounded hover:bg-[rgba(201,168,76,0.08)] transition-colors"
            >
              Contact Sam →
            </Link>
            <Link
              href="#fees"
              className="border border-[rgba(232,228,220,0.2)] text-[rgba(232,228,220,0.7)] px-6 py-3 rounded hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
            >
              Learn About Fees
            </Link>
          </div>
        </div>
      </section>

      {/* Section 1 — What You Need to Provide */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="flex gap-5 items-start mb-8">
          <span className="text-4xl flex-shrink-0">📋</span>
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-[#1A1A1A] mb-3">
              You&apos;ll Need to Provide Information to Begin the Process
            </h2>
            <p className="text-[#444] text-sm leading-relaxed">
              Before we can begin marketing your property, we will need some key information.
              Having these items ready will speed up the process significantly.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            'The property address and postcode',
            'Photographs of the interior and exterior',
            'Tenure details (freehold or leasehold)',
            'Details of tenancy (if applicable)',
            'Information on floor plans and room sizes',
            'Title plan',
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 bg-white border border-[#E8E5DE] rounded-lg px-4 py-3 shadow-[0_1px_4px_rgba(0,0,0,0.04)]"
            >
              <span className="text-[#C9A84C] font-bold flex-shrink-0">✓</span>
              <span className="text-[#444] text-sm">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2 — Is It Suitable */}
      <section className="bg-[#F8F7F4] py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex gap-5 items-start">
            <span className="text-4xl flex-shrink-0">🤔</span>
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-[#1A1A1A] mb-4">
                Is Your Property Suitable for Auction?
              </h2>
              <p className="text-[#444] text-sm leading-relaxed mb-5">
                While the majority of properties are suitable for sale through an auction, it might
                not always be the right option. Therefore, you should seek professional advice to
                see whether it is the right route to market.
              </p>
              <Link
                href="/valuation"
                className="inline-flex items-center gap-2 text-[#C9A84C] text-sm font-semibold hover:text-[#E8C96A] transition-colors"
              >
                Get a free suitability assessment →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 — Who Can Sell */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="flex gap-5 items-start mb-8">
          <span className="text-4xl flex-shrink-0">👥</span>
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-[#1A1A1A] mb-3">
              Who Can Sell a Property at Auction?
            </h2>
            <p className="text-[#444] text-sm leading-relaxed mb-6">
              A wide range of sellers can sell both residential and commercial properties at auction.
              This can include:
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                'Private Investors',
                'Property Companies',
                'Receivers',
                'Trustees',
                'Banks',
                'Local Authorities',
                'Owner-Occupiers',
                'Probate Estates',
              ].map((seller) => (
                <span
                  key={seller}
                  className="border border-[rgba(201,168,76,0.4)] text-[#444] text-sm px-4 py-2 rounded-full bg-white"
                >
                  {seller}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 — The Selling Process */}
      <section className="bg-[#F8F7F4] py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex gap-5 items-start mb-10">
            <span className="text-4xl flex-shrink-0">🔄</span>
            <h2 className="text-2xl md:text-3xl font-black text-[#1A1A1A]">
              The Selling Process
            </h2>
          </div>
          <div className="relative space-y-0">
            {[
              {
                title: 'Appraisal',
                desc: 'We discuss whether auction is the best route. You receive an estimated sale price and recommended reserve price.',
              },
              {
                title: 'Guide Prices',
                desc: 'A guide price is agreed — aligned with a price you deem acceptable. Guide price is typically higher than the reserve.',
              },
              {
                title: 'Fees and Terms',
                desc: 'All terms and conditions are agreed. These include entry fees and the commission payable on successful sale.',
              },
              {
                title: 'Identity Checks',
                desc: 'Anti-Money Laundering Regulations require proof of identity and address before marketing can begin.',
              },
              {
                title: 'Property Inspection',
                desc: 'A surveyor inspects the property, takes measurements and photographs. Draft sales particulars are prepared and a legal pack is created.',
              },
              {
                title: 'Marketing',
                desc: 'Your property is marketed through our online catalogue, email campaigns to registered buyers, multiple portals, social media and targeted outreach.',
              },
              {
                title: 'Reserve Price Meeting',
                desc: '2-3 days before auction, we review the reserve price based on marketing feedback. The guide price may be adjusted.',
              },
              {
                title: 'Auction Day and Completion',
                desc: 'The hammer falls — binding contract formed. Buyer pays deposit immediately. Completion within the agreed timeframe.',
              },
            ].map(({ title, desc }, i) => (
              <div key={title} className="flex gap-5 pb-6">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-[#C9A84C] flex items-center justify-center text-[#080809] font-black text-xs z-10">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  {i < 7 && (
                    <div className="w-0.5 flex-1 bg-[rgba(201,168,76,0.25)] mt-1" />
                  )}
                </div>
                <div className="bg-white border border-[#E8E5DE] rounded-xl p-5 flex-1 mb-1 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                  <h3 className="text-[#1A1A1A] font-bold mb-1">{title}</h3>
                  <p className="text-[#666] text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5 — How We Market */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="flex gap-5 items-start mb-10">
          <span className="text-4xl flex-shrink-0">📢</span>
          <h2 className="text-2xl md:text-3xl font-black text-[#1A1A1A]">
            How We Market Your Property
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              icon: '📧',
              title: 'Email Campaigns',
              body: 'Sent to all registered parties interested in your type of property.',
            },
            {
              icon: '🌐',
              title: 'Online Catalogue',
              body: 'Listed in the auction catalogue available to buyers nationwide.',
            },
            {
              icon: '🏠',
              title: 'Property Portals',
              body: 'Advertised across multiple property portals for maximum exposure.',
            },
            {
              icon: '📱',
              title: 'Social Media',
              body: 'Extensive online advertising campaigns across all major platforms.',
            },
            {
              icon: '🎯',
              title: 'Targeted Outreach',
              body: 'Shared with developers, property companies and adjacent occupiers.',
            },
            {
              icon: '📊',
              title: 'Regular Reports',
              body: 'You receive updates on buyer interest, enquiries, offers and legal pack downloads.',
            },
          ].map(({ icon, title, body }) => (
            <div
              key={title}
              className="bg-white border border-[#E8E5DE] rounded-xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
            >
              <span className="text-3xl block mb-3">{icon}</span>
              <h3 className="text-[#1A1A1A] font-bold mb-2">{title}</h3>
              <p className="text-[#666] text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 6 — Benefits */}
      <section className="bg-[#F8F7F4] py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex gap-5 items-start mb-10">
            <span className="text-4xl flex-shrink-0">✨</span>
            <h2 className="text-2xl md:text-3xl font-black text-[#1A1A1A]">
              The Benefits of Selling at Auction
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              {
                title: 'Legally Binding',
                body: 'Once the hammer falls the sale is agreed and legally binding. No further negotiations. Buyer cannot pull out.',
              },
              {
                title: 'Best Price',
                body: 'Competitive bidding drives the price up. Multiple interested bidders maximise the final sale price on the day.',
              },
              {
                title: 'Speed',
                body: 'Instruction through to exchange of contracts can take just a few weeks — far faster than estate agent sales.',
              },
              {
                title: 'Transparency',
                body: 'The seller knows the best price has been achieved and the buyer is fully committed to the purchase.',
              },
            ].map(({ title, body }) => (
              <div
                key={title}
                className="bg-white border border-[#E8E5DE] rounded-xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
              >
                <div className="w-2 h-2 rounded-full bg-[#C9A84C] mb-3" />
                <h3 className="text-[#1A1A1A] font-bold text-lg mb-2">{title}</h3>
                <p className="text-[#666] text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7 — Comparison Table */}
      <section id="fees" className="max-w-4xl mx-auto px-6 py-16">
        <div className="flex gap-5 items-start mb-10">
          <span className="text-4xl flex-shrink-0">📊</span>
          <h2 className="text-2xl md:text-3xl font-black text-[#1A1A1A]">
            How Do Auctions Compare With Estate Agent Sales?
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left py-3 px-5 text-[#444] font-medium border-b border-[#E8E5DE] w-1/3" />
                <th className="py-3 px-5 text-center font-bold text-[#C9A84C] bg-[rgba(201,168,76,0.06)] border-b border-[#E8E5DE]">
                  Auction
                </th>
                <th className="py-3 px-5 text-center font-semibold text-[#666] border-b border-[#E8E5DE]">
                  Estate Agent
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                { label: 'Success Rate',           auction: '78%+',                         agent: '51%' },
                { label: 'Sales Falling Through',  auction: '1–5%',                         agent: '25–40%' },
                { label: 'Time to Sell',           auction: '3–4 weeks',                    agent: '14–23 weeks' },
                { label: 'Sale Certainty',         auction: 'Legally binding at hammer',    agent: 'Can fall through anytime' },
                { label: 'Negotiation Risk',       auction: 'None — price locked at hammer', agent: 'Always present' },
              ].map(({ label, auction, agent }) => (
                <tr key={label} className="border-b border-[#F0EDE6] hover:bg-[#FAFAF8] transition-colors">
                  <td className="py-3 px-5 text-[#444] font-medium">{label}</td>
                  <td className="py-3 px-5 text-center text-[#C9A84C] font-semibold bg-[rgba(201,168,76,0.04)]">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="text-xs">✓</span> {auction}
                    </span>
                  </td>
                  <td className="py-3 px-5 text-center text-[#888]">{agent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#080809] py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
            Ready to sell your property?
          </h2>
          <div className="flex flex-wrap gap-4 justify-center mb-6">
            <Link
              href="/valuation"
              className="bg-[#C9A84C] text-[#080809] font-semibold px-6 py-3 rounded hover:bg-[#E8C96A] transition-all"
            >
              Request Free Valuation →
            </Link>
            <a
              href="tel:+442072062691"
              className="border border-[#C9A84C] text-[#C9A84C] px-6 py-3 rounded hover:bg-[rgba(201,168,76,0.08)] transition-colors"
            >
              Call Sam →
            </a>
          </div>
          <Link
            href="/contact"
            className="text-[rgba(232,228,220,0.5)] text-sm hover:text-[#C9A84C] transition-colors"
          >
            Send a message →
          </Link>
        </div>
      </section>

    </div>
  )
}
