'use client'

import { useState } from 'react'

const inputClass =
  'w-full px-4 py-3 rounded-md text-sm text-white placeholder-[rgba(232,228,220,0.4)] focus:outline-none focus:ring-1 focus:ring-[#C9A84C]'
const inputStyle = { backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(201,168,76,0.3)' }
const optStyle = { backgroundColor: '#0F0F14', color: 'white' }

export default function RegisterYieldForm() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    minYield: '', propertyType: '', maxBudget: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [key]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/register-interest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'yielding_investment_alert' }),
      })
    } catch { /* silent */ }
    setSubmitted(true)
    setLoading(false)
  }

  if (submitted) {
    return (
      <div className="text-center py-6">
        <div className="text-[#C9A84C] text-4xl mb-3">✓</div>
        <p className="text-[#C9A84C] font-bold text-base mb-2">Registered.</p>
        <p className="text-[rgba(232,228,220,0.6)] text-sm">
          We will contact you when a matching yielding investment becomes available.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input type="text" placeholder="Full Name" required value={form.name} onChange={set('name')} className={inputClass} style={inputStyle} />
        <input type="email" placeholder="Email Address" required value={form.email} onChange={set('email')} className={inputClass} style={inputStyle} />
        <input type="tel" placeholder="Phone Number" value={form.phone} onChange={set('phone')} className={inputClass} style={inputStyle} />
        <select value={form.minYield} onChange={set('minYield')} className={`${inputClass} cursor-pointer`} style={{ ...inputStyle, color: form.minYield ? 'white' : 'rgba(232,228,220,0.4)' }}>
          <option value="" disabled>Minimum Yield</option>
          {['Any', '5%+', '6%+', '7%+', '8%+'].map(v => <option key={v} value={v} style={optStyle}>{v}</option>)}
        </select>
        <select value={form.propertyType} onChange={set('propertyType')} className={`${inputClass} cursor-pointer`} style={{ ...inputStyle, color: form.propertyType ? 'white' : 'rgba(232,228,220,0.4)' }}>
          <option value="" disabled>Property Type</option>
          {['Any', 'BTL Single Let', 'HMO', 'Commercial', 'Portfolio'].map(v => <option key={v} value={v} style={optStyle}>{v}</option>)}
        </select>
        <select value={form.maxBudget} onChange={set('maxBudget')} className={`${inputClass} cursor-pointer`} style={{ ...inputStyle, color: form.maxBudget ? 'white' : 'rgba(232,228,220,0.4)' }}>
          <option value="" disabled>Maximum Budget</option>
          {['Under £300k', '£300k–£500k', '£500k–£1m', 'Over £1m'].map(v => <option key={v} value={v} style={optStyle}>{v}</option>)}
        </select>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 font-bold uppercase tracking-wider rounded-md transition-colors disabled:opacity-60 text-sm"
        style={{ backgroundColor: '#C9A84C', color: '#080809' }}
      >
        {loading ? 'Registering…' : 'Register for Alerts →'}
      </button>
    </form>
  )
}
