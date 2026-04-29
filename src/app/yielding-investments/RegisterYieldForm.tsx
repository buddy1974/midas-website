'use client'

import { useState } from 'react'

export default function RegisterYieldForm() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    minYield: '', propertyType: '', maxBudget: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('/api/register-interest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, interest: 'Yielding Investment', source: 'yielding_investment' }),
    })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.3)] rounded-lg p-6 text-[#C9A84C] text-center">
        ✓ Registered. We will contact you when a matching yielding investment becomes available.
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {[
        { key: 'name',  label: 'Full Name',     type: 'text',  placeholder: 'John Smith' },
        { key: 'email', label: 'Email Address',  type: 'email', placeholder: 'john@example.com' },
        { key: 'phone', label: 'Phone Number',   type: 'tel',   placeholder: '+44 7700 000000' },
      ].map(({ key, label, type, placeholder }) => (
        <div key={key}>
          <label className="text-[#666] text-xs uppercase tracking-wider mb-1.5 block">{label}</label>
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
        <label className="text-[#666] text-xs uppercase tracking-wider mb-1.5 block">Minimum Yield</label>
        <select
          value={form.minYield}
          onChange={(e) => setForm({ ...form, minYield: e.target.value })}
          required
          className="w-full bg-[#F8F7F4] border border-[#E0DDD4] rounded px-4 py-3 text-[#444] focus:outline-none focus:border-[#C9A84C] text-sm"
        >
          <option value="">Select minimum yield...</option>
          <option value="any">Any yield</option>
          <option value="5%+">5%+</option>
          <option value="6%+">6%+</option>
          <option value="7%+">7%+</option>
          <option value="8%+">8%+</option>
        </select>
      </div>

      <div>
        <label className="text-[#666] text-xs uppercase tracking-wider mb-1.5 block">Property Type</label>
        <select
          value={form.propertyType}
          onChange={(e) => setForm({ ...form, propertyType: e.target.value })}
          required
          className="w-full bg-[#F8F7F4] border border-[#E0DDD4] rounded px-4 py-3 text-[#444] focus:outline-none focus:border-[#C9A84C] text-sm"
        >
          <option value="">Select type...</option>
          <option value="BTL">BTL — Buy to Let</option>
          <option value="HMO">HMO — House in Multiple Occupation</option>
          <option value="Commercial">Commercial</option>
          <option value="Any">Any type</option>
        </select>
      </div>

      <div>
        <label className="text-[#666] text-xs uppercase tracking-wider mb-1.5 block">Maximum Budget</label>
        <select
          value={form.maxBudget}
          onChange={(e) => setForm({ ...form, maxBudget: e.target.value })}
          required
          className="w-full bg-[#F8F7F4] border border-[#E0DDD4] rounded px-4 py-3 text-[#444] focus:outline-none focus:border-[#C9A84C] text-sm"
        >
          <option value="">Select budget...</option>
          <option value="Under £300k">Under £300,000</option>
          <option value="£300k–£500k">£300,000 – £500,000</option>
          <option value="£500k–£1m">£500,000 – £1,000,000</option>
          <option value="Over £1m">Over £1,000,000</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-[#C9A84C] text-[#080809] font-bold px-6 py-4 rounded hover:bg-[#E8C96A] transition-all text-sm mt-2"
      >
        Register Interest →
      </button>
    </form>
  )
}
