'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

interface AccordionItem {
  id: string
  question: string
  answer: string
}

const glossaryItems: AccordionItem[] = [
  {
    id: 'gloss-bid',
    question: 'Bid',
    answer: 'An offer made by a prospective buyer during an auction.',
  },
  {
    id: 'gloss-guide-price',
    question: 'Guide Price',
    answer:
      'The price at which the auctioneer expects bidding to start. The reserve price is usually set within 10% of the guide price.',
  },
  {
    id: 'gloss-reserve-price',
    question: 'Reserve Price',
    answer:
      'The minimum price the seller will accept. Not disclosed publicly but set before the auction.',
  },
  {
    id: 'gloss-legal-pack',
    question: 'Legal Pack',
    answer:
      'Documents relating to the property including title deeds, searches, tenancy agreements and special conditions.',
  },
  {
    id: 'gloss-lot',
    question: 'Lot',
    answer: 'A property listed for sale at auction.',
  },
  {
    id: 'gloss-exchange',
    question: 'Exchange of Contracts',
    answer:
      'The point at which the auction concludes. Contracts exchange at the fall of the hammer. Legally binding.',
  },
  {
    id: 'gloss-completion',
    question: 'Completion',
    answer:
      'When the full purchase price is paid and the buyer takes ownership. Typically 28 days after auction.',
  },
  {
    id: 'gloss-deposit',
    question: 'Deposit',
    answer: '10% of the purchase price paid immediately at the fall of the hammer.',
  },
  {
    id: 'gloss-proxy-bid',
    question: 'Proxy Bid',
    answer:
      'A maximum bid submitted in advance. The system bids on your behalf up to your maximum.',
  },
  {
    id: 'gloss-telephone-bid',
    question: 'Telephone Bid',
    answer: 'You are called during the auction and bid verbally with a team member.',
  },
  {
    id: 'gloss-probate',
    question: 'Probate',
    answer: 'Legal process of administering the estate of a deceased person.',
  },
  {
    id: 'gloss-memorandum',
    question: 'Memorandum of Sale',
    answer: 'Document confirming the sale, issued immediately after the auction.',
  },
]

const buyerFaqs: AccordionItem[] = [
  {
    id: 'buyer-view',
    question: 'How do I view a property?',
    answer:
      'Viewing dates are listed on each lot page. Some properties allow open house viewings with no booking required. Others require an appointment. Check the individual lot.',
  },
  {
    id: 'buyer-guide-price',
    question: 'What is a guide price?',
    answer:
      'The guide price is the price at which bidding is expected to start. The reserve is usually within 10% of the guide.',
  },
  {
    id: 'buyer-register',
    question: 'How do I register to bid?',
    answer: 'Visit /register. Free, takes 2 minutes. You can also register on auction day.',
  },
  {
    id: 'buyer-how-bid',
    question: 'How do I bid?',
    answer:
      'Online via our bidding platform, by telephone, or by proxy (submitting a maximum bid in advance).',
  },
  {
    id: 'buyer-win',
    question: 'What happens when I win?',
    answer:
      'You pay a 10% deposit immediately plus the buyer\'s administration fee. Completion is within 28 days.',
  },
  {
    id: 'buyer-id',
    question: 'What ID do I need?',
    answer:
      'Photo ID (passport or driving licence) and proof of address dated within 3 months. Required for anti-money-laundering checks.',
  },
  {
    id: 'buyer-mortgage',
    question: 'Can I buy with a mortgage?',
    answer:
      'Mortgages are possible but bridging finance is more common for auction purchases due to the 28-day completion. We can connect you with lenders.',
  },
  {
    id: 'buyer-pre-auction',
    question: 'Can I buy before the auction?',
    answer:
      'Sometimes. Contact us and we will approach the vendor. Pre-auction offers must be unconditional.',
  },
  {
    id: 'buyer-post-auction',
    question: 'Can I buy after the auction?',
    answer:
      'If a lot is unsold, yes. Check our properties page for available lots or contact us directly.',
  },
  {
    id: 'buyer-costs',
    question: 'What are the costs?',
    answer:
      '10% deposit on the day. Buyer\'s administration fee (where applicable). Solicitor fees. Stamp duty.',
  },
  {
    id: 'buyer-solicitor',
    question: 'Do I need a solicitor?',
    answer:
      'We recommend it. You can use your own or we can recommend trusted partners.',
  },
  {
    id: 'buyer-finance-after',
    question: 'Can I arrange finance after the auction?',
    answer:
      'You should have finance arranged before bidding. We can help connect you with bridging lenders through our finance service.',
  },
]

const sellerFaqs: AccordionItem[] = [
  {
    id: 'seller-how-fast',
    question: 'How fast can I sell at auction?',
    answer:
      'We can have your property in auction within 4 to 6 weeks of instruction. Completion follows 28 days after the auction, so you can be fully sold within 10 weeks.',
  },
  {
    id: 'seller-asking-price',
    question: 'Will I definitely get my asking price?',
    answer:
      'The reserve price is the minimum you will accept. We advise on the right reserve to ensure a sale while maximising your return. Competitive bidding often pushes the price above the reserve.',
  },
  {
    id: 'seller-fees',
    question: 'What are your fees?',
    answer:
      '2% + VAT of the hammer price, payable at completion. No upfront fees. If the property does not sell, you pay nothing.',
  },
  {
    id: 'seller-solicitor',
    question: 'Do I need a solicitor?',
    answer:
      'Yes. You will need a solicitor to prepare the legal pack. We can recommend specialist auction solicitors if you need one.',
  },
  {
    id: 'seller-unsold',
    question: 'What if my property does not sell?',
    answer:
      'If the property does not reach its reserve, it remains unsold. We will advise on next steps, which often means a post-auction sale at a negotiated price or inclusion in the next auction.',
  },
  {
    id: 'seller-tenanted',
    question: 'Can you sell tenanted properties?',
    answer:
      'Yes. Tenanted properties sell well at auction. Investors value the immediate income. We market them specifically to our buy-to-let and HMO investor database.',
  },
  {
    id: 'seller-marketing',
    question: 'How do you market my property?',
    answer:
      'We list it through our partner auction companies, send details to 2,847 investors via email and WhatsApp, and promote it across social media. Every property also benefits from photography and a full legal pack.',
  },
  {
    id: 'seller-reserve',
    question: 'Can I set a reserve price?',
    answer:
      'Yes. You set the reserve in consultation with us. The property will not sell below this price.',
  },
]

function Accordion({
  items,
  openItem,
  onToggle,
}: {
  items: AccordionItem[]
  openItem: string | null
  onToggle: (id: string) => void
}) {
  return (
    <div>
      {items.map((item) => {
        const isOpen = openItem === item.id
        return (
          <div key={item.id} className="border border-[#E8E5DE] rounded-lg mb-2">
            <button
              type="button"
              onClick={() => onToggle(item.id)}
              className="flex items-center justify-between p-4 cursor-pointer hover:text-[#C9A84C] w-full text-left transition-colors"
              aria-expanded={isOpen}
            >
              <span className="font-semibold text-[#1A1A1A] text-sm pr-4">{item.question}</span>
              <ChevronDown
                size={18}
                className={`flex-shrink-0 text-[#C9A84C] transition-transform duration-200 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-4 pb-4 text-[#666] text-sm leading-relaxed">
                {item.answer}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default function FaqsPage() {
  const [openItem, setOpenItem] = useState<string | null>(null)

  function handleToggle(id: string) {
    setOpenItem((prev) => (prev === id ? null : id))
  }

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">

      {/* Hero */}
      <section className="bg-[#F8F7F4] py-16 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
            Help Centre
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-[#1A1A1A] mb-6">
            FAQs &amp; Auction Glossary
          </h1>
          <p className="text-[#666] text-xl max-w-2xl mx-auto">
            Everything you need to know about buying and selling at auction.
          </p>
        </div>
      </section>

      {/* Section 1 — Glossary */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
            Key Terms
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-[#1A1A1A] mb-10">
            Auction Glossary
          </h2>
          <div className="max-w-3xl">
            <Accordion items={glossaryItems} openItem={openItem} onToggle={handleToggle} />
          </div>
        </div>
      </section>

      {/* Section 2 — Buyer FAQs */}
      <section className="bg-[#F8F7F4] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
            Buyers
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-[#1A1A1A] mb-10">
            Buyer FAQs
          </h2>
          <div className="max-w-3xl">
            <Accordion items={buyerFaqs} openItem={openItem} onToggle={handleToggle} />
          </div>
        </div>
      </section>

      {/* Section 3 — Seller FAQs */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
            Sellers
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-[#1A1A1A] mb-10">
            Seller FAQs
          </h2>
          <div className="max-w-3xl">
            <Accordion items={sellerFaqs} openItem={openItem} onToggle={handleToggle} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#080809] py-16 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Still have questions?
          </h2>
          <p className="text-[#999] text-lg mb-8">
            Call Sam directly on{' '}
            <a
              href="tel:07454753318"
              className="text-[#C9A84C] hover:text-[#E8C96A] transition-colors font-medium"
            >
              07454 753318
            </a>{' '}
            or send us a message.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-[#C9A84C] text-[#080809] font-semibold px-6 py-3 rounded hover:bg-[#E8C96A] transition-all"
            >
              Contact Us
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

    </div>
  )
}
