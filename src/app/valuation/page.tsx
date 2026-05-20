'use client'

import { useState } from 'react'
import Link from 'next/link'

interface FormState {
  address: string
  propertyType: string
  bedrooms: string
  approxValue: string
  situation: string
  whySelling: string
  name: string
  phone: string
  email: string
  contactTime: string
}

const inputClass =
  'w-full border border-[#E0DDD4] rounded px-4 py-3 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#C9A84C] bg-white'

const labelClass = 'block text-sm font-medium text-[#333] mb-1'

export default function ValuationPage() {
  const [form, setForm] = useState<FormState>({
    address: '',
    propertyType: '',
    bedrooms: '',
    approxValue: '',
    situation: '',
    whySelling: '',
    name: '',
    phone: '',
    email: '',
    contactTime: '',
  })
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  function set(field: keyof FormState) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/finance-enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        phone: form.phone,
        address: form.address,
        propertyType: form.propertyType,
        situation: form.situation,
        notes: form.whySelling,
        source: 'valuation_request',
        loanAmount: 'Valuation request',
        propertyValue: form.approxValue || 'Not provided',
      }),
    })
    if (!res.ok) {
      const data = await res.json().catch(() => ({ error: 'Request failed. Please try again.' })) as { error?: string }
      setError(data.error ?? 'Request failed. Please try again.')
      setLoading(false)
      return
    }
    setSubmitted(true)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="bg-[#F8F7F4] py-16 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
            Free Valuation
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-[#1A1A1A] mb-5">
            Get Your Free Property Appraisal
          </h1>
          <p className="text-[#666] text-lg leading-relaxed">
            Find out what your property could achieve at auction. Free, no obligation, response
            within 24 hours.
          </p>
        </div>
      </section>

      {/* ── Main ───────────────────────────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* LEFT — Form */}
            <div className="bg-white border border-[#E8E5DE] rounded-xl p-8 shadow-sm">
              <h2 className="text-xl font-bold text-[#1A1A1A] mb-6">Property Details</h2>

              {submitted ? (
                <div className="bg-[rgba(201,168,76,0.08)] border border-[rgba(201,168,76,0.3)] rounded-xl p-8 text-center">
                  <p className="text-[#1A1A1A] font-semibold text-lg mb-2">
                    Thank you, {form.name}.
                  </p>
                  <p className="text-[#444] text-sm mb-6">
                    Our listing service is completely free. Sam will be in touch within 24 hours
                    to discuss the best route to sale for your property.
                  </p>
                  <p className="text-[#666] text-sm mb-6">
                    Questions? Call:{' '}
                    <a href="tel:07454753318" className="text-[#C9A84C] font-medium hover:text-[#E8C96A] transition-colors">
                      07454 753318
                    </a>
                  </p>
                  <Link
                    href="/properties"
                    className="inline-block text-[#C9A84C] text-sm font-medium hover:text-[#E8C96A] transition-colors"
                  >
                    Browse current lots →
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">

                  {/* Property Address */}
                  <div>
                    <label className={labelClass} htmlFor="address">Property Address *</label>
                    <input
                      id="address"
                      type="text"
                      required
                      placeholder="Full property address"
                      value={form.address}
                      onChange={set('address')}
                      className={inputClass}
                    />
                  </div>

                  {/* Property Type */}
                  <div>
                    <label className={labelClass} htmlFor="propertyType">Property Type *</label>
                    <select
                      id="propertyType"
                      required
                      value={form.propertyType}
                      onChange={set('propertyType')}
                      className={inputClass}
                    >
                      <option value="">Select type...</option>
                      <option>Residential</option>
                      <option>HMO</option>
                      <option>Commercial</option>
                      <option>Development Site</option>
                      <option>Land</option>
                      <option>Mixed Use</option>
                    </select>
                  </div>

                  {/* Bedrooms */}
                  <div>
                    <label className={labelClass} htmlFor="bedrooms">Number of Bedrooms</label>
                    <select
                      id="bedrooms"
                      value={form.bedrooms}
                      onChange={set('bedrooms')}
                      className={inputClass}
                    >
                      <option value="">Select...</option>
                      <option>Studio</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5+</option>
                    </select>
                  </div>

                  {/* Approximate Value */}
                  <div>
                    <label className={labelClass} htmlFor="approxValue">Approximate Value £</label>
                    <input
                      id="approxValue"
                      type="number"
                      placeholder="e.g. 350000"
                      value={form.approxValue}
                      onChange={set('approxValue')}
                      className={inputClass}
                    />
                  </div>

                  {/* Situation */}
                  <div>
                    <label className={labelClass} htmlFor="situation">Current Situation *</label>
                    <select
                      id="situation"
                      required
                      value={form.situation}
                      onChange={set('situation')}
                      className={inputClass}
                    >
                      <option value="">Select situation...</option>
                      <option>Vacant</option>
                      <option>Tenanted</option>
                      <option>Owner Occupied</option>
                      <option>Probate</option>
                      <option>Other</option>
                    </select>
                  </div>

                  {/* Why selling */}
                  <div>
                    <label className={labelClass} htmlFor="whySelling">Why are you selling?</label>
                    <textarea
                      id="whySelling"
                      rows={3}
                      placeholder="Tell us about your situation (optional)"
                      value={form.whySelling}
                      onChange={set('whySelling')}
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  <hr className="border-[#E8E5DE]" />
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#999]">Your Contact Details</p>

                  {/* Name */}
                  <div>
                    <label className={labelClass} htmlFor="name">Your Name *</label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={set('name')}
                      className={inputClass}
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className={labelClass} htmlFor="phone">Phone *</label>
                    <input
                      id="phone"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={set('phone')}
                      className={inputClass}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className={labelClass} htmlFor="email">Email *</label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={set('email')}
                      className={inputClass}
                    />
                  </div>

                  {/* Contact time */}
                  <div>
                    <label className={labelClass} htmlFor="contactTime">Preferred Contact Time</label>
                    <select
                      id="contactTime"
                      value={form.contactTime}
                      onChange={set('contactTime')}
                      className={inputClass}
                    >
                      <option value="">Select time...</option>
                      <option>Morning (9am to 12pm)</option>
                      <option>Afternoon (12pm to 5pm)</option>
                      <option>Evening (5pm to 8pm)</option>
                      <option>Any time</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#C9A84C] text-[#080809] font-bold py-4 rounded text-base hover:bg-[#E8C96A] transition-all disabled:opacity-60"
                  >
                    {loading ? 'Sending…' : 'Request Free Valuation →'}
                  </button>
                  {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                </form>
              )}
            </div>

            {/* RIGHT — Info panel */}
            <div>

              {/* Section A — Why sell at auction */}
              <h2 className="text-xl font-bold text-[#1A1A1A] mb-5">Why Sell at Auction?</h2>
              <ul className="space-y-3 mb-10">
                {[
                  'Completion typically within 28 days',
                  'Legally binding at hammer fall. No fall-throughs.',
                  'Access to 2,847 active investors',
                  'Our listing service is completely free',
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="text-[#C9A84C] font-bold mt-0.5">✓</span>
                    <span className="text-[#444] text-sm leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>

              {/* Section B — What happens next */}
              <h2 className="text-xl font-bold text-[#1A1A1A] mb-5">What Happens Next</h2>
              <ol className="space-y-5 mb-10">
                {[
                  'We review your details and research the property',
                  'Sam calls you within 24 hours with a valuation and strategy',
                  'If you instruct us, we manage everything from legal pack to sale',
                ].map((step, i) => (
                  <li key={step} className="flex items-start gap-4">
                    <span className="w-7 h-7 rounded-full bg-[#C9A84C] text-[#080809] text-xs font-bold flex items-center justify-center flex-shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-[#444] text-sm leading-relaxed pt-1">{step}</span>
                  </li>
                ))}
              </ol>

              {/* Section C — Contact card */}
              <div className="bg-[#F8F7F4] border border-[#E8E5DE] rounded-xl p-6">
                <p className="text-[#1A1A1A] font-semibold mb-4">Prefer to speak directly?</p>
                <div className="space-y-1 mb-1">
                  <p className="text-sm font-bold text-[#1A1A1A]">Sam Fongho, CEO</p>
                </div>
                <a
                  href="tel:07454753318"
                  className="block text-[#C9A84C] text-sm font-medium hover:text-[#E8C96A] transition-colors mt-2"
                >
                  07454 753318
                </a>
                <a
                  href="mailto:info@midaspropertyauctions.co.uk"
                  className="block text-[#C9A84C] text-sm font-medium hover:text-[#E8C96A] transition-colors mt-1"
                >
                  info@midaspropertyauctions.co.uk
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
