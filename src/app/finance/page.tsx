'use client'

import { useState } from 'react'
import SectionHeader from '@/components/SectionHeader'
import GoldButton from '@/components/GoldButton'
import { Building2, Hammer, Briefcase, CheckCircle } from 'lucide-react'

export default function FinancePage() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', loanAmount: '', propertyValue: '', purpose: '', term: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('/api/finance-enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 text-center py-16">
        <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
          Auction Finance
        </p>
        <h1 className="text-4xl md:text-5xl font-black text-[#1A1A1A] mb-6">
          Fast Bridging Finance for Auction Purchases
        </h1>
        <p className="text-[#666] text-xl leading-relaxed max-w-2xl mx-auto">
          Through our network of private lenders, Midas can arrange bridging finance for
          qualified buyers within 24 hours. Don&apos;t lose a deal because you couldn&apos;t
          arrange finance in time.
        </p>
      </section>

      {/* Why Midas Finance */}
      <section className="bg-[#F8F7F4] py-14">
        <div className="max-w-3xl mx-auto px-6">
          <SectionHeader eyebrow="Why Use Midas Finance?" title="Terms in 24 Hours" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              'Terms issued within 24 hours of enquiry',
              'Rates from 0.75% per month',
              'Loan amounts from £50,000 to £2,000,000',
              '1st and 2nd charge available',
              'Adverse credit history considered',
              'No early repayment charges',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 bg-white border border-[#E8E5DE] rounded-lg px-5 py-3.5 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                <CheckCircle className="text-[#C9A84C] flex-shrink-0" size={16} />
                <span className="text-[#333] text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Finance products */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <SectionHeader eyebrow="Finance Options" title="Solutions for Every Deal" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Building2,
              title: 'Auction Bridging Finance',
              desc: 'Specifically designed for auction purchases with 28-day completion requirements. We understand auction timelines better than any mainstream lender — our lenders move at auction speed.',
              features: ['Complete in 28 days', 'Rates from 0.75%/mo', 'Up to 75% LTV', 'Terms in 24 hours', 'Individual & corporate borrowers'],
            },
            {
              icon: Hammer,
              title: 'Refurbishment & Light Works Finance',
              desc: 'Fund your purchase and refurbishment together with a single facility. Drawdown in stages as works progress. Ideal for HMO conversions, heavy refurbishments and development flips.',
              features: ['Purchase + works in one loan', 'Staged drawdowns', 'Light to heavy refurb', 'HMO conversions', 'Day 1 gross loan available'],
            },
            {
              icon: Briefcase,
              title: 'Portfolio & Commercial Finance',
              desc: 'For investors with multiple properties or commercial acquisitions. Bespoke structuring for complex transactions. We work with specialist commercial lenders to find terms that work.',
              features: ['Mixed-use and commercial', 'Portfolio cross-charge', 'Developer terms available', 'Complex structures welcome', 'Bespoke case-by-case terms'],
            },
          ].map(({ icon: Icon, title, desc, features }) => (
            <div key={title} className="bg-white border border-[#E8E5DE] rounded-xl p-8 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
              <div className="w-12 h-12 rounded-lg bg-[rgba(201,168,76,0.1)] flex items-center justify-center mb-6">
                <Icon className="text-[#C9A84C]" size={24} />
              </div>
              <h3 className="text-[#1A1A1A] font-bold text-xl mb-3">{title}</h3>
              <p className="text-[#666] text-sm leading-relaxed mb-6">{desc}</p>
              <ul className="space-y-2">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-[#555]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Enquiry form */}
      <section className="max-w-2xl mx-auto px-6 pb-16">
        <div className="bg-white border border-[#E0DDD4] rounded-2xl p-8 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">Finance Enquiry</h2>
          <p className="text-[#666] text-sm mb-6">
            Fill in your details below and a member of the Midas finance team will respond within
            24 hours with indicative terms. All enquiries are treated in strict confidence.
          </p>
          {submitted ? (
            <div className="bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.3)] rounded-lg p-6 text-[#C9A84C] text-center">
              ✓ Enquiry received. Our finance team will respond within 24 hours with indicative terms.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { key: 'name',          label: 'Full Name',              type: 'text',  placeholder: 'John Smith' },
                { key: 'email',         label: 'Email Address',          type: 'email', placeholder: 'john@example.com' },
                { key: 'phone',         label: 'Phone Number',           type: 'tel',   placeholder: '+44 7700 000000' },
                { key: 'loanAmount',    label: 'Loan Amount Required (£)',type: 'text',  placeholder: '200,000' },
                { key: 'propertyValue', label: 'Property Value (£)',     type: 'text',  placeholder: '300,000' },
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
                  Loan Purpose
                </label>
                <select
                  value={form.purpose}
                  onChange={(e) => setForm({ ...form, purpose: e.target.value })}
                  required
                  className="w-full bg-[#F8F7F4] border border-[#E0DDD4] rounded px-4 py-3 text-[#444] focus:outline-none focus:border-[#C9A84C] text-sm"
                >
                  <option value="">Select purpose...</option>
                  <option>Auction Purchase</option>
                  <option>Refurbishment / HMO Conversion</option>
                  <option>Commercial Purchase</option>
                  <option>Development Finance</option>
                  <option>Portfolio Refinance</option>
                </select>
              </div>
              <div>
                <label className="text-[#666] text-xs uppercase tracking-wider mb-1.5 block">
                  Loan Term Required
                </label>
                <select
                  value={form.term}
                  onChange={(e) => setForm({ ...form, term: e.target.value })}
                  required
                  className="w-full bg-[#F8F7F4] border border-[#E0DDD4] rounded px-4 py-3 text-[#444] focus:outline-none focus:border-[#C9A84C] text-sm"
                >
                  <option value="">Select term...</option>
                  <option>1–3 months</option>
                  <option>3–6 months</option>
                  <option>6–12 months</option>
                  <option>12–24 months</option>
                </select>
              </div>
              <GoldButton variant="filled" type="submit" size="lg" className="w-full mt-2">
                Submit Finance Enquiry
              </GoldButton>
              <p className="text-[#999] text-xs text-center">
                All enquiries handled directly by Midas and treated in strict confidence.
              </p>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}
