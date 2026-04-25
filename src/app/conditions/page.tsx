import { type Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'General Conditions of Sale | Midas Property Auctions',
}

interface ConditionSection {
  title: string
  body: string
}

const sections: ConditionSection[] = [
  {
    title: '1. Interpretation',
    body: "Words used in these conditions have the meanings given to them in the Common Auction Conditions glossary. 'We' and 'us' refers to Midas Property Auctions. 'Seller' means the person selling the lot. 'Buyer' means the person who makes the winning bid.",
  },
  {
    title: '2. The Lot',
    body: 'The lot is sold with vacant possession (unless otherwise stated in the special conditions). The guide price is the price at which the auctioneer expects bidding to commence. It does not represent the minimum or reserve price.',
  },
  {
    title: '3. Deposits',
    body: 'The buyer must pay a 10% deposit of the purchase price immediately upon the fall of the hammer. This deposit is non-refundable if the buyer fails to complete. The deposit will be held by us as stakeholders.',
  },
  {
    title: '4. Transfer',
    body: 'Transfer of ownership will occur on the completion date. The seller must transfer the property with full title guarantee unless the special conditions state otherwise.',
  },
  {
    title: '5. Completion',
    body: 'Completion takes place 28 days after the auction date unless varied by the special conditions. Failure to complete on time entitles the seller to charge interest at the contract rate.',
  },
  {
    title: '6. Remedies',
    body: 'If the buyer fails to complete, the seller may forfeit the deposit, resell the property and recover any loss. If the seller fails to complete, the buyer may rescind the contract and recover the deposit.',
  },
  {
    title: '7. Chattels',
    body: 'Unless specifically included in the special conditions, chattels are not included in the sale and must be removed by the seller before completion.',
  },
  {
    title: '8. Arrears',
    body: "Any arrears of rent or service charges are for the seller's account up to the completion date and for the buyer's account thereafter.",
  },
  {
    title: '9. VAT',
    body: 'Unless the special conditions state otherwise, the guide price and sale price are exclusive of VAT. If the lot is opted to tax, VAT will be payable in addition to the purchase price.',
  },
  {
    title: '10. Environmental',
    body: 'The buyer is deemed to have made all necessary enquiries regarding environmental conditions affecting the lot. The seller makes no warranty regarding environmental matters.',
  },
  {
    title: '11. Third Party Rights',
    body: 'The lot is sold subject to all rights and easements affecting the property as set out in the title documents. The buyer takes the property subject to these rights.',
  },
  {
    title: '12. Costs',
    body: "Each party bears their own legal costs. The buyer is responsible for their own survey, valuation and legal costs. Stamp Duty Land Tax is payable by the buyer.",
  },
]

export default function ConditionsPage() {
  return (
    <div className="min-h-screen bg-[#080809] pt-24 pb-20">

      {/* ── Hero ── */}
      <section className="max-w-4xl mx-auto px-6 text-center py-16">
        <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
          Legal
        </p>
        <h1 className="text-4xl md:text-5xl font-black text-[#E8E4DC] mb-6 leading-tight">
          General Conditions of Sale
        </h1>
        <p className="text-[rgba(232,228,220,0.65)] text-xl max-w-2xl mx-auto mb-10">
          These are the standard Common Auction Conditions (4th Edition) as adopted by Midas
          Property Auctions.
        </p>
        <a
          href="#"
          className="inline-block border border-[#C9A84C] text-[#C9A84C] px-6 py-3 rounded hover:bg-[rgba(201,168,76,0.08)] transition-colors"
        >
          Download PDF
        </a>
      </section>

      {/* ── Introduction card ── */}
      <section className="max-w-4xl mx-auto px-6 pb-12">
        <div className="bg-[#0F0F14] border border-[rgba(201,168,76,0.2)] rounded-2xl p-8">
          <p className="text-[rgba(232,228,220,0.75)] leading-relaxed mb-6">
            These conditions apply to every property sold by Midas Property Auctions unless varied
            by special conditions in the individual lot&rsquo;s legal pack. Buyers should read these
            conditions carefully before bidding. A PDF version is available to download above.
          </p>
          <div className="border-l-2 border-[#C9A84C] pl-5">
            <p className="text-[rgba(232,228,220,0.55)] text-sm leading-relaxed">
              These conditions are reproduced here for informational purposes. The definitive legal
              pack for each lot takes precedence. Consult your solicitor before bidding.
            </p>
          </div>
        </div>
      </section>

      {/* ── Accordion ── */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <div className="bg-[#0F0F14] border border-[rgba(201,168,76,0.2)] rounded-2xl overflow-hidden">
          {sections.map((section, index) => (
            <details
              key={section.title}
              className={`group py-0 ${index < sections.length - 1 ? 'border-b border-[rgba(201,168,76,0.15)]' : ''}`}
            >
              <summary className="cursor-pointer font-semibold text-[#E8E4DC] hover:text-[#C9A84C] transition-colors list-none flex items-center justify-between px-7 py-5 select-none">
                <span>{section.title}</span>
                <span className="text-[#C9A84C] text-lg leading-none ml-4 shrink-0">+</span>
              </summary>
              <div className="px-7 pb-6">
                <p className="text-[rgba(232,228,220,0.75)] text-sm leading-relaxed">
                  {section.body}
                </p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* ── Download + note ── */}
      <section className="max-w-4xl mx-auto px-6 pb-16 text-center">
        <a
          href="#"
          className="inline-block border border-[#C9A84C] text-[#C9A84C] px-6 py-3 rounded hover:bg-[rgba(201,168,76,0.08)] transition-colors mb-4"
        >
          Download Full PDF
        </a>
        <p className="text-[rgba(232,228,220,0.4)] text-xs mt-3">
          Contact{' '}
          <a
            href="mailto:info@midaspropertygroup.co.uk"
            className="text-[#C9A84C] hover:text-[#E8C96A] transition-colors"
          >
            info@midaspropertygroup.co.uk
          </a>{' '}
          for the official PDF version.
        </p>
      </section>

      {/* ── CTA ── */}
      <section className="max-w-2xl mx-auto px-6 text-center">
        <div className="bg-[#0F0F14] border border-[rgba(201,168,76,0.2)] rounded-2xl p-8">
          <h2 className="text-2xl font-black text-[#E8E4DC] mb-3">
            Questions about the conditions?
          </h2>
          <p className="text-[rgba(232,228,220,0.65)] mb-6">
            Our team is happy to walk you through any section before you bid.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-[#C9A84C] text-[#080809] font-semibold px-6 py-3 rounded hover:bg-[#E8C96A] transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </section>

    </div>
  )
}
