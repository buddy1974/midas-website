import { type Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Guide to Buying at Auction | Midas Property Auctions',
  description:
    'Everything you need to know about buying property at auction. Browse lots, register to bid, attend the auction and complete your purchase with confidence.',
}

export default function BuyingGuidePage() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-20">

      {/* Hero */}
      <section className="bg-[#080809] py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
            Buyer&apos;s Guide
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
            Buying at an Auction
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold text-[#C9A84C] mb-6">
            A Clear and Simple Guide
          </h2>
          <p className="text-[#999] text-base max-w-2xl mx-auto mb-10 leading-relaxed">
            Buying a property at an auction is an exciting prospect but it is one that follows a
            certain structure and process. If you are new to purchasing a property at an auction then
            our guide is going to help you understand what is involved so you can bid with confidence.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/properties"
              className="bg-[#C9A84C] text-[#080809] font-semibold px-6 py-3 rounded hover:bg-[#E8C96A] transition-all"
            >
              Browse Current Lots →
            </Link>
            <Link
              href="/register"
              className="border border-[#C9A84C] text-[#C9A84C] px-6 py-3 rounded hover:bg-[rgba(201,168,76,0.08)] transition-colors"
            >
              Register to Bid
            </Link>
            <Link
              href="/contact"
              className="border border-[rgba(232,228,220,0.2)] text-[rgba(232,228,220,0.7)] px-6 py-3 rounded hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Section 1 — Browse */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="flex gap-5 items-start">
          <span className="text-4xl flex-shrink-0">🔍</span>
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-[#1A1A1A] mb-4">
              Browse The Properties In The Auction
            </h2>
            <p className="text-[#444] text-sm leading-relaxed mb-5">
              Before you arrange to attend the auction, it is important that you browse the properties
              that are up for auction. Where possible, you should ensure you gather as much information
              as possible and visit the property.
            </p>
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 text-[#C9A84C] text-sm font-semibold hover:text-[#E8C96A] transition-colors"
            >
              Browse current lots →
            </Link>
          </div>
        </div>
      </section>

      {/* Section 2 — Register */}
      <section className="bg-[#F8F7F4] py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex gap-5 items-start">
            <span className="text-4xl flex-shrink-0">📝</span>
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-[#1A1A1A] mb-4">
                Registering to Bid
              </h2>
              <div className="space-y-4 text-[#444] text-sm leading-relaxed mb-5">
                <p>
                  It is especially important to register your interest before you attend the auction
                  as you will need to be pre-approved prior to the sale. This is because checks have
                  to be carried out as current anti-money laundering legislation requires that these
                  checks take place.
                </p>
                <p>
                  These checks are part of the process and have to be completed satisfactorily in
                  order to be given the approval to bid. This is a process that can take some time
                  so make sure that you give yourself plenty of time prior to the auction.
                </p>
              </div>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 text-[#C9A84C] text-sm font-semibold hover:text-[#E8C96A] transition-colors"
              >
                Register to bid →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 — Unable to Attend */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="flex gap-5 items-start mb-8">
          <span className="text-4xl flex-shrink-0">📱</span>
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-[#1A1A1A] mb-4">
              What If You Are Unable to Attend?
            </h2>
            <p className="text-[#444] text-sm leading-relaxed">
              It is common for some bidders to be unable to attend the auction in person but this is
              not an issue. We do offer remote bidding in a number of ways:
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          {[
            {
              label: 'Telephone',
              body: 'You will be called from the auction room so you can be involved in the auction over the phone.',
            },
            {
              label: 'By Proxy',
              body: 'Where required, it is possible for the auctioneer to make bids on your behalf up to your maximum amount.',
            },
            {
              label: 'Online',
              body: 'Where possible, you can make bids online should that be necessary — from anywhere in the world.',
            },
          ].map(({ label, body }) => (
            <div
              key={label}
              className="bg-white border border-[#E8E5DE] rounded-xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
            >
              <div className="w-2 h-2 rounded-full bg-[#C9A84C] mb-3" />
              <h3 className="text-[#1A1A1A] font-bold mb-2">{label}</h3>
              <p className="text-[#666] text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
        <div className="bg-[#F8F7F4] border border-[#E8E5DE] rounded-xl p-5 text-sm text-[#444] leading-relaxed">
          When you register to bid, you will be given the opportunity to select remote bidding. Once
          approved, we will request cleared funds to cover the deposit and buyer&apos;s fee.
        </div>
      </section>

      {/* Section 4 — Auction Day */}
      <section className="bg-[#F8F7F4] py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex gap-5 items-start mb-8">
            <span className="text-4xl flex-shrink-0">📋</span>
            <h2 className="text-2xl md:text-3xl font-black text-[#1A1A1A]">
              The Day of the Auction — What to Bring
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
            {[
              {
                title: 'Photo ID',
                body: 'You will need to bring the same ID used when you submitted your registration to bid. This must be the original document — no photocopies accepted.',
              },
              {
                title: 'Deposit Payment & Buyer\'s Fee',
                body: 'Payment can be made by cheque, banker\'s draft, solicitor\'s client account cheque or debit card. Note: credit card payments and cash deposits are NOT accepted.',
              },
              {
                title: 'Solicitor Information',
                body: 'We recommend instructing solicitors before bidding. Please bring your solicitor\'s contact details with you on auction day.',
              },
            ].map(({ title, body }) => (
              <div
                key={title}
                className="bg-white border border-[#E8E5DE] rounded-xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
              >
                <div className="w-8 h-8 rounded-full bg-[rgba(201,168,76,0.12)] flex items-center justify-center mb-3">
                  <span className="text-[#C9A84C] text-lg">✓</span>
                </div>
                <h3 className="text-[#1A1A1A] font-bold mb-2">{title}</h3>
                <p className="text-[#666] text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
          <div className="bg-white border border-[rgba(201,168,76,0.3)] rounded-xl p-5 flex gap-4 items-start shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            <span className="text-2xl flex-shrink-0">📋</span>
            <div>
              <p className="text-[#1A1A1A] font-bold mb-1">Check the Addendum</p>
              <p className="text-[#555] text-sm leading-relaxed">
                Prior to bidding, take a look at the printed Addendum and listen for announcements
                about any last-minute changes — these become part of the contract.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5 — The Auction */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="flex gap-5 items-start mb-8">
          <span className="text-4xl flex-shrink-0">🔨</span>
          <h2 className="text-2xl md:text-3xl font-black text-[#1A1A1A]">
            The Auction
          </h2>
        </div>
        <div className="space-y-4 mb-8">
          {[
            'The auctioneer opens with information about the procedure and announces any last-minute changes.',
            'Your lot number is announced. Listen carefully — the auctioneer begins bidding at a set opening amount.',
            'To bid, raise your hand or catalogue clearly. This constitutes a legally binding offer at that price.',
            'The auctioneer controls bidding in increments. Properties are offered with an undisclosed reserve price.',
            '\'Going once, going twice, sold\' — the hammer falls. If you made the final bid, the property is yours. This is a legally binding contract.',
          ].map((step, i) => (
            <div key={i} className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-[#C9A84C] flex items-center justify-center text-[#080809] font-black text-sm flex-shrink-0">
                {i + 1}
              </div>
              <p className="text-[#444] text-sm leading-relaxed pt-1.5">{step}</p>
            </div>
          ))}
        </div>
        <div className="bg-[rgba(201,168,76,0.08)] border border-[rgba(201,168,76,0.3)] rounded-xl p-5">
          <p className="text-[#1A1A1A] text-sm leading-relaxed">
            <span className="font-bold">⚠️ Important:</span> Once the hammer falls, you are legally
            obligated to complete the purchase. Properties are NOT sold subject to finance, survey or
            contract — the sale is binding immediately.
          </p>
        </div>
      </section>

      {/* Section 6 — Successful Bidder */}
      <section className="bg-[#F8F7F4] py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex gap-5 items-start mb-8">
            <span className="text-4xl flex-shrink-0">🏆</span>
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-[#1A1A1A] mb-3">
                Being the Successful Bidder
              </h2>
              <p className="text-[#444] text-sm leading-relaxed">
                After the auction, if you are the successful bidder, you will be approached by a team
                member. You will need to:
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-[#E8E5DE] rounded-xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
              <h3 className="text-[#1A1A1A] font-bold mb-4">What You Must Do</h3>
              <div className="space-y-3">
                {[
                  'Provide your original ID (same as registration)',
                  'Pay the 10% deposit immediately',
                  'Pay the buyer\'s fee (see below)',
                  'Sign the Memorandum of Sale at the Contracts Desk',
                  'Give the seller\'s section to your solicitor',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="text-[#C9A84C] font-bold flex-shrink-0 mt-0.5">✓</span>
                    <span className="text-[#444] text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div
              id="fees"
              className="bg-white border border-[rgba(201,168,76,0.4)] rounded-xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
            >
              <h3 className="text-[#1A1A1A] font-bold mb-4">Buyer&apos;s Fees</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-[#C9A84C] font-semibold uppercase tracking-wider text-xs mb-2">
                    Residential Properties
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center py-2 border-b border-[#F0EDE6]">
                      <span className="text-[#444]">Lots £10,000 and above</span>
                      <span className="text-[#1A1A1A] font-bold">£1,500 inc. VAT</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-[#444]">Lots below £10,000</span>
                      <span className="text-[#1A1A1A] font-bold">£300 inc. VAT</span>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-[#C9A84C] font-semibold uppercase tracking-wider text-xs mb-2">
                    Commercial Properties
                  </p>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-[#444]">All lots</span>
                    <span className="text-[#1A1A1A] font-bold">£1,000 inc. VAT</span>
                  </div>
                </div>
                <p className="text-[#888] text-xs border-t border-[#F0EDE6] pt-3">
                  Payable on the day. Credit card and cash are NOT accepted.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7 — Memorandum */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="flex gap-5 items-start">
          <span className="text-4xl flex-shrink-0">📄</span>
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-[#1A1A1A] mb-4">
              Memorandum of Sale
            </h2>
            <div className="space-y-4 text-[#444] text-sm leading-relaxed">
              <p>
                Once your ID is verified and all payments made, you will receive a Bidder
                Identification Card as receipt. Take this to the Contracts Desk where you will sign
                the Memorandum of Sale.
              </p>
              <p>
                This is your proof of purchase. The seller&apos;s section should be given to your
                solicitor. The signed memorandum is forwarded to the seller&apos;s solicitor, with
                completion typically taking around 20 days.
              </p>
              <p className="font-semibold text-[#1A1A1A]">
                Do not leave the room without your memorandum.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8 — Pros and Cons */}
      <section className="bg-[#F8F7F4] py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-3">
              Weigh It Up
            </p>
            <h2 className="text-2xl md:text-3xl font-black text-[#1A1A1A]">
              Pros and Cons of Buying at Auction
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border-l-4 border-green-500 rounded-xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
              <h3 className="text-green-700 font-bold mb-4 flex items-center gap-2">
                <span>✅</span> Pros
              </h3>
              <div className="space-y-3">
                {[
                  'No chain — no risk of collapsed sales',
                  'High chance of finding good value property',
                  'Quick and efficient process',
                  'Legally binding at hammer fall',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm text-[#444]">
                    <span className="text-green-500 flex-shrink-0">✓</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white border-l-4 border-amber-400 rounded-xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
              <h3 className="text-amber-600 font-bold mb-4 flex items-center gap-2">
                <span>⚠️</span> Cons
              </h3>
              <div className="space-y-3">
                {[
                  'Can be competitive — prices can rise',
                  'Easy to bid beyond your planned budget',
                  'Hidden costs if not fully researched',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm text-[#444]">
                    <span className="text-amber-500 flex-shrink-0">⚠</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#080809] py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
            Ready to buy at auction?
          </h2>
          <div className="flex flex-wrap gap-4 justify-center mb-6">
            <Link
              href="/properties"
              className="bg-[#C9A84C] text-[#080809] font-semibold px-6 py-3 rounded hover:bg-[#E8C96A] transition-all"
            >
              View Current Lots →
            </Link>
            <Link
              href="/register"
              className="border border-[#C9A84C] text-[#C9A84C] px-6 py-3 rounded hover:bg-[rgba(201,168,76,0.08)] transition-colors"
            >
              Register to Bid →
            </Link>
          </div>
          <Link
            href="/contact"
            className="text-[rgba(232,228,220,0.5)] text-sm hover:text-[#C9A84C] transition-colors"
          >
            Have questions? Contact us →
          </Link>
        </div>
      </section>

    </div>
  )
}
