'use client'

import { useState } from 'react'
import SectionHeader from '@/components/SectionHeader'
import GoldButton from '@/components/GoldButton'
import { testimonials } from '@/lib/data'
import { Zap, Shield, TrendingUp, Link as LinkIcon, Star, Users, CheckCircle, ClipboardList, ChevronDown, ChevronUp } from 'lucide-react'

const sellerFaqs = [
  {
    title: 'How quickly can my property sell at auction?',
    content: 'Auction sales are fast. Completion typically takes place within 28 days after the auction.',
  },
  {
    title: 'Will I get the best price at auction?',
    content: 'Competitive bidding can drive the price up, especially for well-presented, well-priced properties. We manage the marketing to attract serious, qualified bidders.',
  },
  {
    title: 'What does it cost to list with Midas?',
    content: 'Listing your property through Midas is completely free. We submit your property to our network of partner auction companies. You only pay the standard auction house fees — clearly communicated before you commit to anything.',
  },
  {
    title: 'What happens after I agree to sell?',
    content: 'We connect you with solicitors, coordinate the full process, and guide you through to completion.',
  },
  {
    title: 'Do I need my own solicitor?',
    content: 'You can use your own solicitor, or we can recommend trusted solicitors we already work with regularly.',
  },
  {
    title: 'How do I know your deals are genuine?',
    content: 'We work with established auction houses, verified sellers and professional partners to ensure legitimacy at every step.',
  },
  {
    title: 'Can buyers view properties before bidding?',
    content: 'Yes. Physical viewings or virtual tours can be arranged depending on the property.',
  },
  {
    title: 'How often do you get new deals?',
    content: 'New opportunities come in regularly depending on auction cycles and market availability.',
  },
]

function SellerFaqItem({ title, content }: { title: string; content: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-[#E8E5DE] rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left bg-white hover:bg-[#F8F7F4] transition-colors"
      >
        <span className="text-[#1A1A1A] font-medium text-sm">{title}</span>
        {open ? (
          <ChevronUp className="text-[#C9A84C] flex-shrink-0" size={18} />
        ) : (
          <ChevronDown className="text-[#C9A84C] flex-shrink-0" size={18} />
        )}
      </button>
      {open && (
        <div className="px-6 pb-5 bg-white border-t border-[#E8E5DE]">
          <p className="text-[#555] text-sm leading-relaxed pt-4">{content}</p>
        </div>
      )}
    </div>
  )
}

export default function SellPage() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', address: '', type: '', value: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('/api/register-interest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, interest: 'Seller - Valuation Request' }),
    })
    setSubmitted(true)
  }

  const patricia = testimonials.find((t) => t.name === 'Patricia M.')

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 text-center py-16">
        <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
          Sell With Midas
        </p>
        <h1 className="text-4xl md:text-5xl font-black text-[#1A1A1A] mb-6">
          Sell Your Property at Auction
        </h1>
        <p className="text-[#666] text-xl">
          Fast. Certain. At the best price.
        </p>
      </section>

      {/* Why Midas — specific claims */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <SectionHeader eyebrow="Why Sell With Midas?" title="The Smarter Way to Sell" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { icon: Users,        claim: '2,847 active investors in our database', detail: 'Every property is marketed directly to our full investor database via email, WhatsApp and social media — on day one.' },
            { icon: TrendingUp,   claim: '98% of lots sold at or above reserve price', detail: 'Our auction format drives competitive bidding between qualified investors, consistently achieving strong results.' },
            { icon: ClipboardList,claim: 'Legal pack preparation included', detail: 'We coordinate your solicitor and prepare your legal pack as part of the service — at no extra cost to you.' },
            { icon: Zap,         claim: '28-day completion from hammer fall', detail: 'On auction day contracts exchange immediately. You receive a 10% deposit on the day. Completion in 28 days.' },
            { icon: Shield,      claim: 'Free to list — no Midas fees', detail: 'Listing with Midas costs nothing. We submit your property to our partner auction companies at no charge to you.' },
            { icon: LinkIcon,    claim: 'No chain — clean transaction', detail: 'Auction sales are chain-free by design. No mortgage delays, no gazundering, no fall-throughs.' },
          ].map(({ icon: Icon, claim, detail }) => (
            <div key={claim} className="bg-white border border-[#E8E5DE] rounded-xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
              <div className="flex items-start gap-3 mb-3">
                <CheckCircle className="text-[#C9A84C] flex-shrink-0 mt-0.5" size={18} />
                <p className="text-[#1A1A1A] font-semibold text-sm">{claim}</p>
              </div>
              <p className="text-[#666] text-xs leading-relaxed pl-7">{detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process — 8 Steps */}
      <section className="bg-[#F8F7F4] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader eyebrow="Our Process" title="From Appraisal to Completion" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Appraisal',           desc: 'We discuss whether auction is the best route for your property. You receive an estimated sale price and a recommended reserve price.' },
              { step: '02', title: 'Guide Price',          desc: 'A guide price is agreed — aligned with a sale price you deem acceptable. The guide price is set higher than the agreed reserve.' },
              { step: '03', title: 'Fees & Terms',         desc: 'All relevant terms and conditions are provided and agreed. These include any entry fees and the commission payable on a successful sale.' },
              { step: '04', title: 'Identity Checks',      desc: 'Strict Anti-Money Laundering Regulations require proof of identity and address before marketing can begin — even when acting on behalf of the seller.' },
              { step: '05', title: 'Property Inspection',  desc: 'A surveyor carries out an inspection — taking measurements and photographs. Draft sales particulars are prepared and your solicitor is requested to create the legal pack.' },
              { step: '06', title: 'Marketing',            desc: 'Your property is marketed through online catalogues, email campaigns to registered buyers, property portals, social media and targeted outreach to investors.' },
              { step: '07', title: 'Reserve Price Meeting',desc: '2–3 days before auction, we discuss the reserve price based on marketing feedback. The guide price may be adjusted at this point.' },
              { step: '08', title: 'Auction Day',          desc: 'When the hammer falls, a binding contract is formed. The buyer pays a deposit immediately. Completion takes place within the agreed timeframe — typically 28 days.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="bg-white border border-[#E8E5DE] rounded-xl p-6 relative shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                <div className="text-[rgba(201,168,76,0.12)] text-7xl font-black absolute top-4 right-4 leading-none select-none">
                  {step}
                </div>
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[rgba(201,168,76,0.12)] text-[#C9A84C] text-xs font-bold mb-4">
                  {step}
                </div>
                <h3 className="text-[#1A1A1A] font-bold mb-2">{title}</h3>
                <p className="text-[#666] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison: Auction vs Estate Agent */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <SectionHeader eyebrow="Why Auction?" title="Auction vs Estate Agent" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left py-3 px-4 text-[#444] font-medium border-b border-[#E8E5DE] w-1/3"></th>
                <th className="py-3 px-4 text-center font-bold text-[#C9A84C] border-b border-[#E8E5DE] bg-[rgba(201,168,76,0.04)] rounded-t-lg">
                  Auction
                </th>
                <th className="py-3 px-4 text-center font-semibold text-[#666] border-b border-[#E8E5DE]">
                  Estate Agent
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                { label: 'Success Rate',           auction: '78%+',           agent: '51%' },
                { label: 'Sales Falling Through',  auction: '1–5%',           agent: '25–40%' },
                { label: 'Time to Sell',           auction: '3–4 weeks',      agent: '14–23 weeks' },
                { label: 'Certainty',              auction: 'Legally binding at hammer', agent: 'Can fall through anytime' },
              ].map(({ label, auction, agent }) => (
                <tr key={label} className="border-b border-[#F0EDE6]">
                  <td className="py-3 px-4 text-[#444] font-medium">{label}</td>
                  <td className="py-3 px-4 text-center text-[#C9A84C] font-semibold bg-[rgba(201,168,76,0.04)]">{auction}</td>
                  <td className="py-3 px-4 text-center text-[#888]">{agent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* What you need to provide */}
      <section className="bg-[#F8F7F4] py-16">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeader eyebrow="Getting Started" title="What You Need to Provide" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              'Property address and postcode',
              'Interior and exterior photographs',
              'Tenure details (freehold or leasehold)',
              'Tenancy details (if applicable)',
              'Floor plans and room sizes',
              'Title plan',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 bg-white border border-[#E8E5DE] rounded-lg px-4 py-3 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
                <CheckCircle className="text-[#C9A84C] flex-shrink-0" size={16} />
                <span className="text-[#444] text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who can sell */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <SectionHeader eyebrow="Who Is This For?" title="Who Can Sell at Auction?" />
        <div className="bg-white border border-[#E8E5DE] rounded-2xl p-8 shadow-[0_2px_8px_rgba(0,0,0,0.06)] space-y-4">
          <p className="text-[#444] text-sm leading-relaxed">
            A wide range of sellers can sell both residential and commercial properties at auction —
            including private investors, property companies, receivers, trustees, banks, local
            authorities and owner-occupiers.
          </p>
          <p className="text-[#444] text-sm leading-relaxed">
            Auction is also particularly suitable for probate properties where trustees want a quick,
            certain and transparent sale.
          </p>
        </div>
      </section>

      {/* No Fees */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <SectionHeader eyebrow="Transparent Pricing" title="No Fees to List With Midas" />
        <div className="bg-white border border-[#E0DDD4] rounded-2xl p-10 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
          <div className="bg-[rgba(201,168,76,0.08)] border border-[rgba(201,168,76,0.4)] rounded-xl p-6 mb-8">
            <p className="text-[#1A1A1A] text-sm leading-relaxed">
              <span className="text-[#C9A84C] font-bold">★ Listing your property through Midas is completely free.</span>
              <br /><br />
              We submit your property to our network of partner auction companies across the UK.
              The only fees you pay are the standard auction house charges — clearly communicated
              before you commit to anything.
            </p>
          </div>
          <div className="space-y-4">
            {[
              'Free to list — no charge from Midas whatsoever.',
              'We handle the entire submission process on your behalf.',
              'You choose which auction house to proceed with.',
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle className="text-[#C9A84C] flex-shrink-0 mt-0.5" size={18} />
                <span className="text-[#444] text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seller testimonial */}
      {patricia && (
        <section className="max-w-3xl mx-auto px-6 pb-16">
          <div className="bg-[#F8F7F4] border border-[#E8E5DE] rounded-2xl p-10 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
            <div className="text-[#C9A84C] text-4xl mb-4 font-serif">&ldquo;</div>
            <p className="text-[#333] text-base leading-relaxed mb-6 italic">
              {patricia.text}
            </p>
            <div>
              <div className="text-[#1A1A1A] font-bold">{patricia.name}</div>
              <div className="text-[#888] text-sm">{patricia.location}</div>
            </div>
          </div>
        </section>
      )}

      {/* Seller FAQs */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <SectionHeader eyebrow="Seller FAQs" title="Common Questions" align="left" />
        <div className="space-y-3">
          {sellerFaqs.map((item) => (
            <SellerFaqItem key={item.title} {...item} />
          ))}
        </div>
      </section>

      {/* Valuation form */}
      <section className="max-w-2xl mx-auto px-6 pb-16">
        <div className="bg-white border border-[#E0DDD4] rounded-2xl p-8 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">Book a Free Valuation</h2>
          <p className="text-[#666] text-sm mb-6">
            Sam or a member of the Midas team will contact you within 24 hours to arrange your
            valuation and discuss the best auction strategy for your property.
          </p>
          {submitted ? (
            <div className="bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.3)] rounded-lg p-6 text-[#C9A84C] text-center">
              ✓ Request received. Our team will contact you within 24 hours to arrange your valuation.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { key: 'name',    label: 'Full Name',             type: 'text',  placeholder: 'John Smith' },
                { key: 'email',   label: 'Email Address',         type: 'email', placeholder: 'john@example.com' },
                { key: 'phone',   label: 'Phone Number',          type: 'tel',   placeholder: '+44 7700 000000' },
                { key: 'address', label: 'Property Address',      type: 'text',  placeholder: '123 High Street, Dagenham, RM8' },
                { key: 'value',   label: 'Estimated Value (£)',   type: 'text',  placeholder: '250,000' },
              ].map(({ key, label, type, placeholder }) => (
                <div key={key}>
                  <label className="text-[#666] text-xs uppercase tracking-wider mb-1.5 block">
                    {label}
                  </label>
                  <input
                    type={type}
                    placeholder={placeholder}
                    value={form[key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    required
                    className="w-full bg-[#F8F7F4] border border-[#E0DDD4] rounded px-4 py-3 text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:border-[#C9A84C] text-sm"
                  />
                </div>
              ))}
              <div>
                <label className="text-[#666] text-xs uppercase tracking-wider mb-1.5 block">
                  Property Type
                </label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  required
                  className="w-full bg-[#F8F7F4] border border-[#E0DDD4] rounded px-4 py-3 text-[#444] focus:outline-none focus:border-[#C9A84C] text-sm"
                >
                  <option value="">Select type...</option>
                  <option>Residential House</option>
                  <option>Residential Flat</option>
                  <option>HMO</option>
                  <option>Commercial</option>
                  <option>Land / Development Site</option>
                  <option>Mixed Use</option>
                  <option>Portfolio</option>
                </select>
              </div>
              <GoldButton variant="filled" type="submit" size="lg" className="w-full mt-2">
                Book Free Valuation
              </GoldButton>
            </form>
          )}
        </div>
      </section>

      {/* Trusted Partners */}
      <section className="max-w-3xl mx-auto px-6 pb-16">
        <div className="text-center mb-8">
          <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-4">Our Network</p>
          <h2 className="text-2xl font-bold text-[#1A1A1A]">Trusted Legal Partners</h2>
          <p className="text-[#666] text-sm mt-2">
            We work with specialist solicitors experienced in auction conveyancing.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-[#E8E5DE] rounded-xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
            <h3 className="font-bold text-[#1A1A1A] mb-2">Specialist Auction Solicitors</h3>
            <p className="text-[#666] text-sm leading-relaxed mb-4">
              Experienced in auction conveyancing with fast turnaround for 28-day completions.
              Contact us for a referral.
            </p>
            <GoldButton href="/contact" variant="outline">Request a Referral →</GoldButton>
          </div>
          <div className="bg-white border border-[#E8E5DE] rounded-xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
            <h3 className="font-bold text-[#1A1A1A] mb-2">Bridging Finance Partners</h3>
            <p className="text-[#666] text-sm leading-relaxed mb-4">
              Our trusted lenders can issue bridging terms within 24 hours for qualifying auction
              purchases.
            </p>
            <GoldButton href="/finance" variant="outline">Learn About Finance →</GoldButton>
          </div>
        </div>
        <p className="text-center text-[#999] text-xs mt-6">
          Partner details to be confirmed. Contact Sam directly for referrals.
        </p>
      </section>
    </div>
  )
}
