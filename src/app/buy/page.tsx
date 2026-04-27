'use client'

import { useState } from 'react'
import SectionHeader from '@/components/SectionHeader'
import GoldButton from '@/components/GoldButton'
import { ChevronDown, ChevronUp } from 'lucide-react'

const accordionItems = [
  {
    title: 'Do you only deal with auction properties?',
    content:
      'No, but mostly. Our focus is on auction deals because they offer strong investment opportunities, but we also handle selected off-market properties.',
  },
  {
    title: 'Where in the UK do you operate?',
    content:
      'We work nationwide across the UK, sourcing and selling properties in multiple cities depending on available opportunities.',
  },
  {
    title: 'How do I start buying with you?',
    content:
      'Simply contact us, tell us your budget and criteria, and we will match you with suitable deals from our current pipeline.',
  },
  {
    title: 'Do I need cash ready before I enquire?',
    content:
      'Auction purchases require quick completion, so having funds or finance in place is important. However, we can connect you with private lenders if needed.',
  },
  {
    title: 'Can you help me get financing?',
    content:
      'Yes, we work with trusted private lenders who can assist with short-term bridging finance for auction purchases.',
  },
  {
    title: 'Are your deals below market value?',
    content:
      'Many of our deals are below market value or have strong investment potential, but every deal is assessed individually.',
  },
  {
    title: 'Do you work with first-time investors?',
    content:
      'Yes, we guide both beginners and experienced investors through the entire process.',
  },
]

function AccordionItem({ title, content }: { title: string; content: string }) {
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

export default function BuyPage() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', budget: '', lookingFor: [] as string[],
  })
  const [submitted, setSubmitted] = useState(false)

  const propertyTypes = ['Residential BTL', 'HMO', 'Commercial', 'Land', 'Flip/Refurb', 'Any']
  const budgets = ['Under £200k', '£200k–£400k', '£400k–£700k', '£700k–£1M', '£1M+']

  const toggleType = (type: string) => {
    setForm((f) => ({
      ...f,
      lookingFor: f.lookingFor.includes(type)
        ? f.lookingFor.filter((t) => t !== type)
        : [...f.lookingFor, type],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('/api/register-interest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, interest: 'Buyer Registration' }),
    })
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 text-center py-16">
        <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
          Buy With Midas
        </p>
        <h1 className="text-4xl md:text-5xl font-black text-[#1A1A1A] mb-6">
          Buy Property at Auction
        </h1>
        <p className="text-[#666] text-xl mb-8">
          Below-market-value opportunities. Transparent process. Fast completion.
        </p>
        <GoldButton href="#register" variant="filled" size="lg">
          Register as a Bidder
        </GoldButton>
      </section>

      {/* Why auction for buyers */}
      <section className="bg-[#F8F7F4] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader eyebrow="Why Auction?" title="The Smart Way to Buy" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'BMV Opportunities', desc: 'Properties often sell below market value, offering strong equity from day one.' },
              { title: 'Speed', desc: 'Complete within 28 days. No prolonged negotiations or delays.' },
              { title: 'Transparency', desc: 'Open bidding process. You know exactly what others are paying.' },
              { title: 'Legal Pack Upfront', desc: 'All due diligence documents available before you bid. No surprises.' },
            ].map(({ title, desc }) => (
              <div key={title} className="bg-white border border-[#E8E5DE] rounded-xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                <div className="w-2 h-2 rounded-full bg-[#C9A84C] mb-4" />
                <h3 className="text-[#1A1A1A] font-bold text-lg mb-2">{title}</h3>
                <p className="text-[#666] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guide link */}
      <section className="max-w-3xl mx-auto px-6 pt-16 pb-2">
        <div className="bg-[#F8F7F4] border border-[#E8E5DE] rounded-xl p-6 flex items-center justify-between gap-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          <div>
            <p className="text-[#1A1A1A] font-bold text-sm mb-1">New to buying at auction?</p>
            <p className="text-[#666] text-xs">Read our complete guide — what to bring, how bidding works, buyer&apos;s fees and more.</p>
          </div>
          <a
            href="/guide/buying"
            className="flex-shrink-0 border border-[#C9A84C] text-[#C9A84C] text-sm font-semibold px-4 py-2.5 rounded hover:bg-[#C9A84C] hover:text-[#080809] transition-all whitespace-nowrap"
          >
            Read our complete buying guide →
          </a>
        </div>
      </section>

      {/* Accordion guide */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <SectionHeader eyebrow="Buyer's Guide" title="Step by Step Guide" align="left" />
        <div className="space-y-3">
          {accordionItems.map((item) => (
            <AccordionItem key={item.title} {...item} />
          ))}
        </div>
      </section>

      {/* Register form */}
      <section id="register" className="max-w-2xl mx-auto px-6 pb-16">
        <div className="bg-white border border-[#E0DDD4] rounded-2xl p-8 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">Register as a Bidder</h2>
          {submitted ? (
            <div className="bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.3)] rounded-lg p-6 text-[#C9A84C] text-center">
              ✓ Registration received. Welcome to Midas. Our team will be in touch shortly.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { key: 'name', label: 'Full Name', type: 'text', placeholder: 'John Smith' },
                { key: 'email', label: 'Email Address', type: 'email', placeholder: 'john@example.com' },
                { key: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+44 7700 000000' },
              ].map(({ key, label, type, placeholder }) => (
                <div key={key}>
                  <label className="text-[#666] text-xs uppercase tracking-wider mb-1.5 block">{label}</label>
                  <input
                    type={type}
                    placeholder={placeholder}
                    value={form[key as keyof typeof form] as string}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    required
                    className="w-full bg-[#F8F7F4] border border-[#E0DDD4] rounded px-4 py-3 text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:border-[#C9A84C] text-sm"
                  />
                </div>
              ))}

              <div>
                <label className="text-[#666] text-xs uppercase tracking-wider mb-2 block">
                  What are you looking for?
                </label>
                <div className="flex flex-wrap gap-2">
                  {propertyTypes.map((type) => (
                    <button
                      type="button"
                      key={type}
                      onClick={() => toggleType(type)}
                      className={`px-3 py-1.5 text-xs rounded border transition-all ${
                        form.lookingFor.includes(type)
                          ? 'bg-[#C9A84C] text-[#080809] border-[#C9A84C] font-semibold'
                          : 'border-[#E0DDD4] text-[#666] hover:border-[#C9A84C]'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[#666] text-xs uppercase tracking-wider mb-1.5 block">Budget Range</label>
                <select
                  value={form.budget}
                  onChange={(e) => setForm({ ...form, budget: e.target.value })}
                  required
                  className="w-full bg-[#F8F7F4] border border-[#E0DDD4] rounded px-4 py-3 text-[#444] focus:outline-none focus:border-[#C9A84C] text-sm"
                >
                  <option value="">Select budget...</option>
                  {budgets.map((b) => <option key={b}>{b}</option>)}
                </select>
              </div>

              <GoldButton variant="filled" type="submit" size="lg" className="w-full mt-2">
                Register as a Bidder
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
            We work with specialist professionals experienced in auction property transactions.
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
