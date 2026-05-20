'use client'

import { useState } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormState {
  address: string
  propertyType: string
  situation: string
  name: string
  phone: string
  email: string
}

const INITIAL_FORM: FormState = {
  address: '',
  propertyType: '',
  situation: '',
  name: '',
  phone: '',
  email: '',
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function BenefitCard({ icon, title, body }: { icon: string; title: string; body: string }) {
  return (
    <div className="bg-[#0F0F14] border border-[rgba(201,168,76,0.2)] rounded-xl p-8 text-center">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-[#E8E4DC] font-bold text-lg mb-2">{title}</h3>
      <p className="text-[rgba(232,228,220,0.65)] text-sm leading-relaxed">{body}</p>
    </div>
  )
}

function ReasonCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="bg-[#0F0F14] border border-[rgba(201,168,76,0.2)] rounded-xl p-6">
      <h3 className="text-[#E8E4DC] font-bold mb-2">{title}</h3>
      <p className="text-[rgba(232,228,220,0.65)] text-sm leading-relaxed">{body}</p>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function InstantOfferPage() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM)
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/finance-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          source: 'instant_offer',
          loanAmount: 'Instant offer request',
          propertyValue: 'Not provided',
        }),
      })
      if (!res.ok) throw new Error('Submission failed')
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again or call us directly.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    'w-full bg-[#080809] border border-[rgba(201,168,76,0.2)] rounded-lg px-4 py-3 text-[#E8E4DC] placeholder-[rgba(232,228,220,0.35)] focus:outline-none focus:border-[#C9A84C] transition-colors text-sm'

  return (
    <div className="min-h-screen bg-[#080809] pt-24 pb-20">

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section className="bg-[#080809] pt-28 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
            INSTANT CASH OFFER
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-[#E8E4DC] mb-6">
            Can&apos;t Wait For The Next Auction?
          </h1>
          <p className="text-[rgba(232,228,220,0.65)] text-xl max-w-2xl mx-auto">
            Get a cash offer on your property within 24 hours. No auction. No waiting. No chain.
          </p>
        </div>
      </section>

      {/* ── Benefit Cards ─────────────────────────────────────────────────────── */}
      <section className="bg-[#0F0F14] border-y border-[rgba(201,168,76,0.1)] py-12 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <BenefitCard
            icon="⚡"
            title="Speed"
            body="Offer within 24 hours. Completion in as little as 7 days."
          />
          <BenefitCard
            icon="💯"
            title="Certainty"
            body="No fall-throughs. No chains. A guaranteed buyer."
          />
          <BenefitCard
            icon="🔒"
            title="Privacy"
            body="Discreet, off-market transaction. No public listing."
          />
        </div>
      </section>

      {/* ── Form ──────────────────────────────────────────────────────────────── */}
      <section className="bg-[#080809] py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-[#E8E4DC] font-black text-2xl mb-8 text-center">
            Request Your Instant Offer
          </h2>

          {submitted ? (
            <div className="bg-[#0F0F14] border border-[rgba(201,168,76,0.2)] rounded-2xl p-10 text-center">
              <div className="text-5xl mb-4">✅</div>
              <p className="text-[#E8E4DC] font-bold text-xl mb-2">Request Received</p>
              <p className="text-[rgba(232,228,220,0.65)] text-sm leading-relaxed">
                Thank you. Our team will call you within 24 hours with your cash offer.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-[#0F0F14] border border-[rgba(201,168,76,0.2)] rounded-2xl p-8"
            >
              <div className="space-y-4">
                {/* Property Address */}
                <div>
                  <label
                    htmlFor="address"
                    className="block text-[rgba(232,228,220,0.75)] text-xs font-semibold uppercase tracking-wide mb-2"
                  >
                    Property Address *
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    rows={2}
                    required
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Enter the full property address"
                    className={inputClass}
                  />
                </div>

                {/* Property Type */}
                <div>
                  <label
                    htmlFor="propertyType"
                    className="block text-[rgba(232,228,220,0.75)] text-xs font-semibold uppercase tracking-wide mb-2"
                  >
                    Property Type
                  </label>
                  <select
                    id="propertyType"
                    name="propertyType"
                    value={form.propertyType}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="" disabled>Select property type</option>
                    <option>Residential House</option>
                    <option>Residential Flat</option>
                    <option>HMO</option>
                    <option>Commercial</option>
                    <option>Development Site</option>
                    <option>Land</option>
                    <option>Other</option>
                  </select>
                </div>

                {/* Current Situation */}
                <div>
                  <label
                    htmlFor="situation"
                    className="block text-[rgba(232,228,220,0.75)] text-xs font-semibold uppercase tracking-wide mb-2"
                  >
                    Current Situation
                  </label>
                  <select
                    id="situation"
                    name="situation"
                    value={form.situation}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="" disabled>Select current situation</option>
                    <option>Vacant</option>
                    <option>Tenanted</option>
                    <option>Owner Occupied</option>
                    <option>Probate</option>
                    <option>Other</option>
                  </select>
                </div>

                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-[rgba(232,228,220,0.75)] text-xs font-semibold uppercase tracking-wide mb-2"
                  >
                    Your Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Full name"
                    className={inputClass}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-[rgba(232,228,220,0.75)] text-xs font-semibold uppercase tracking-wide mb-2"
                  >
                    Phone Number *
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+44 7400 000000"
                    className={inputClass}
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-[rgba(232,228,220,0.75)] text-xs font-semibold uppercase tracking-wide mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                </div>

                {error && (
                  <p className="text-red-400 text-sm text-center">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#C9A84C] text-[#080809] font-semibold px-6 py-3 rounded hover:bg-[#E8C96A] transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                >
                  {loading ? 'Sending…' : 'Request My Instant Offer →'}
                </button>
              </div>
            </form>
          )}

          <p className="text-center text-[rgba(232,228,220,0.45)] text-xs mt-6">
            No obligation. Free appraisal. We never share your details.
          </p>
        </div>
      </section>

      {/* ── Why Choose ────────────────────────────────────────────────────────── */}
      <section className="bg-[#0F0F14] border-y border-[rgba(201,168,76,0.1)] py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center text-[#E8E4DC] font-black text-2xl mb-10">
            Why Choose an Instant Offer?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <ReasonCard
              title="Sell in Days, Not Months"
              body="Traditional sales take 4 to 6 months. Our instant offer process can complete in as little as 7 days, guaranteed."
            />
            <ReasonCard
              title="Inherited or Probate Property"
              body="We handle probate properties sensitively and efficiently, with no obligation and no pressure on timescales."
            />
            <ReasonCard
              title="Avoid Repossession"
              body="If you&apos;re facing repossession, a fast sale can protect your credit rating and stop court proceedings."
            />
            <ReasonCard
              title="Urgent Relocation"
              body="Relocating for work or personal reasons? We can match your timeline, even if that&apos;s just a few weeks away."
            />
          </div>

          {/* Comparison row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                label: 'Instant Offer',
                highlight: true,
                points: [
                  { text: 'Offer within 24 hours', yes: true },
                  { text: 'Complete in 7 days', yes: true },
                  { text: 'No chain risk', yes: true },
                  { text: 'No fees', yes: true },
                ],
              },
              {
                label: 'Open Market',
                highlight: false,
                points: [
                  { text: 'Offer within 24 hours', yes: false },
                  { text: 'Complete in 7 days', yes: false },
                  { text: 'No chain risk', yes: false },
                  { text: 'No fees', yes: false },
                ],
              },
              {
                label: 'Auction',
                highlight: false,
                points: [
                  { text: 'Offer within 24 hours', yes: false },
                  { text: 'Sold in 28 days', yes: true },
                  { text: 'No chain risk', yes: true },
                  { text: 'No fees', yes: false },
                ],
              },
            ].map((col) => (
              <div
                key={col.label}
                className={`rounded-xl p-6 border ${
                  col.highlight
                    ? 'bg-[rgba(201,168,76,0.08)] border-[rgba(201,168,76,0.4)]'
                    : 'bg-[#0F0F14] border-[rgba(201,168,76,0.1)]'
                }`}
              >
                <p
                  className={`font-bold text-base mb-4 ${
                    col.highlight ? 'text-[#C9A84C]' : 'text-[#E8E4DC]'
                  }`}
                >
                  {col.label}
                </p>
                <ul className="space-y-2">
                  {col.points.map((pt) => (
                    <li key={pt.text} className="flex items-center gap-2 text-sm">
                      <span className={pt.yes ? 'text-[#C9A84C]' : 'text-[rgba(232,228,220,0.3)]'}>
                        {pt.yes ? '✓' : '✗'}
                      </span>
                      <span
                        className={
                          pt.yes
                            ? 'text-[rgba(232,228,220,0.75)]'
                            : 'text-[rgba(232,228,220,0.35)]'
                        }
                      >
                        {pt.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
