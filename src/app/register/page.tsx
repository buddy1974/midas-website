'use client'

import { useState } from 'react'
import GoldButton from '@/components/GoldButton'
import { CheckCircle } from 'lucide-react'

type Step = 1 | 2 | 3

const propertyTypes = ['BTL Residential', 'HMO', 'Commercial', 'Development Sites', 'Below Market Value', 'Off-Market']
const budgets = ['Under £100k', '£100k to £250k', '£250k to £500k', '£500k to £1m', 'Over £1m']
const areas = ['London', 'Essex', 'Nationwide', 'Other']
const contactPrefs = ['Email', 'WhatsApp', 'Phone']

export default function RegisterPage() {
  const [step, setStep] = useState<Step>(1)
  const [form, setForm] = useState({
    name: '', email: '', phone: '', whatsapp: '',
    lookingFor: [] as string[],
    budget: '',
    preferredAreas: [] as string[],
    contactPreference: [] as string[],
    whatsappOptIn: false,
  })

  const toggle = (key: 'lookingFor' | 'preferredAreas' | 'contactPreference', value: string) => {
    setForm((f) => ({
      ...f,
      [key]: f[key].includes(value) ? f[key].filter((v) => v !== value) : [...f[key], value],
    }))
  }

  const handleSubmit = async () => {
    await fetch('/api/register-investor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setStep(3)
  }

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-3">
            Investor Registration
          </p>
          <h1 className="text-3xl font-black text-[#1A1A1A] mb-2">Register as a Midas Investor</h1>
          <p className="text-[#666] text-sm">Free. 2 minutes. Access more deals.</p>
        </div>

        {/* Progress */}
        {step < 3 && (
          <div className="flex items-center gap-2 mb-10">
            {([1, 2] as const).map((s) => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                  step >= s ? 'bg-[#C9A84C] text-[#080809]' : 'bg-white border border-[#D8D4CC] text-[#888]'
                }`}>{s}</div>
                {s < 2 && <div className={`h-px flex-1 ${step > s ? 'bg-[#C9A84C]' : 'bg-[#E0DDD4]'}`} />}
              </div>
            ))}
          </div>
        )}

        <div className="bg-white border border-[#E0DDD4] rounded-2xl p-8 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-[#1A1A1A] font-bold text-lg mb-5">Step 1: Contact Details</h2>
              {[
                { key: 'name', label: 'Full Name', type: 'text', placeholder: 'John Smith' },
                { key: 'email', label: 'Email Address', type: 'email', placeholder: 'john@example.com' },
                { key: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+44 7700 000000' },
                { key: 'whatsapp', label: 'WhatsApp Number', type: 'tel', placeholder: '+44 7700 000000 (if different)' },
              ].map(({ key, label, type, placeholder }) => (
                <div key={key}>
                  <label className="text-[#666] text-xs uppercase tracking-wider mb-1.5 block">{label}</label>
                  <input
                    type={type}
                    placeholder={placeholder}
                    value={form[key as keyof typeof form] as string}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className="w-full bg-[#F8F7F4] border border-[#E0DDD4] rounded px-4 py-3 text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:border-[#C9A84C] text-sm"
                  />
                </div>
              ))}
              <GoldButton
                variant="filled"
                size="lg"
                className="w-full mt-2"
                onClick={() => setStep(2)}
              >
                Continue →
              </GoldButton>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-5">
              <h2 className="text-[#1A1A1A] font-bold text-lg mb-5">Step 2: Investment Criteria</h2>

              <div>
                <label className="text-[#666] text-xs uppercase tracking-wider mb-2 block">
                  What are you looking for?
                </label>
                <div className="flex flex-wrap gap-2">
                  {propertyTypes.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => toggle('lookingFor', t)}
                      className={`px-3 py-1.5 text-xs rounded border transition-all ${
                        form.lookingFor.includes(t)
                          ? 'bg-[#C9A84C] text-[#080809] border-[#C9A84C] font-semibold'
                          : 'border-[#E0DDD4] text-[#666] hover:border-[#C9A84C]'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[#666] text-xs uppercase tracking-wider mb-1.5 block">Budget Range</label>
                <select
                  value={form.budget}
                  onChange={(e) => setForm({ ...form, budget: e.target.value })}
                  className="w-full bg-[#F8F7F4] border border-[#E0DDD4] rounded px-4 py-3 text-[#444] focus:outline-none focus:border-[#C9A84C] text-sm"
                >
                  <option value="">Select budget...</option>
                  {budgets.map((b) => <option key={b}>{b}</option>)}
                </select>
              </div>

              <div>
                <label className="text-[#666] text-xs uppercase tracking-wider mb-2 block">Preferred Areas</label>
                <div className="flex flex-wrap gap-2">
                  {areas.map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => toggle('preferredAreas', a)}
                      className={`px-3 py-1.5 text-xs rounded border transition-all ${
                        form.preferredAreas.includes(a)
                          ? 'bg-[#C9A84C] text-[#080809] border-[#C9A84C] font-semibold'
                          : 'border-[#E0DDD4] text-[#666] hover:border-[#C9A84C]'
                      }`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[#666] text-xs uppercase tracking-wider mb-2 block">How do you want to be contacted?</label>
                <div className="flex gap-2">
                  {contactPrefs.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => toggle('contactPreference', c)}
                      className={`flex-1 py-2 text-xs rounded border transition-all ${
                        form.contactPreference.includes(c)
                          ? 'bg-[#C9A84C] text-[#080809] border-[#C9A84C] font-semibold'
                          : 'border-[#E0DDD4] text-[#666] hover:border-[#C9A84C]'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <GoldButton variant="outline" onClick={() => setStep(1)} className="flex-1">
                  ← Back
                </GoldButton>
                <GoldButton variant="filled" onClick={handleSubmit} className="flex-1">
                  Register →
                </GoldButton>
              </div>
              <p className="text-center text-[#999] text-[10px] mt-2">
                Protected by reCAPTCHA.{' '}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#C9A84C]">Privacy</a>
                {' '}·{' '}
                <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#C9A84C]">Terms</a>
              </p>
            </div>
          )}

          {/* STEP 3 - Confirmation */}
          {step === 3 && (
            <div className="text-center py-4">
              <CheckCircle className="text-[#C9A84C] mx-auto mb-4" size={48} />
              <h2 className="text-2xl font-black text-[#1A1A1A] mb-3">You&apos;re registered 🎉</h2>
              <p className="text-[#666] mb-8 leading-relaxed">
                We&apos;ll alert you the moment a lot matching your criteria comes to market.
              </p>

              <div className="bg-[rgba(201,168,76,0.08)] border border-[rgba(201,168,76,0.2)] rounded-xl p-5 text-left">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.whatsappOptIn}
                    onChange={(e) => setForm({ ...form, whatsappOptIn: e.target.checked })}
                    className="mt-0.5 accent-[#C9A84C]"
                  />
                  <div>
                    <div className="text-[#1A1A1A] font-semibold text-sm mb-1">
                      📱 Send me WhatsApp alerts
                    </div>
                    <div className="text-[#666] text-xs">
                      Receive instant notifications on WhatsApp when new matching lots are added.
                    </div>
                  </div>
                </label>
              </div>

              <div className="mt-6">
                <GoldButton href="/properties" variant="filled" size="lg">
                  Available Properties →
                </GoldButton>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
