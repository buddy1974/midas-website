'use client'

import { useState } from 'react'

const inputClass =
  'w-full px-4 py-3 rounded-md text-sm text-white placeholder-[rgba(232,228,220,0.4)] focus:outline-none focus:ring-1 focus:ring-[#C9A84C]'
const inputStyle = {
  backgroundColor: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(201,168,76,0.3)',
}
const selectStyle = {
  ...inputStyle,
  backgroundColor: 'rgba(255,255,255,0.05)',
}

export default function YieldingRegistrationForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    minYield: '',
    propertyType: '',
    maxBudget: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const set =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm(f => ({ ...f, [field]: e.target.value }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/register-interest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'yielding_investment_alert' }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: 'Registration failed. Please try again.' })) as { error?: string }
        setError(data.error ?? 'Registration failed. Please try again.')
        return
      }
      setSubmitted(true)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="text-[#C9A84C] text-4xl mb-4">✓</div>
        <p className="text-[#C9A84C] font-bold text-lg mb-2">Registered.</p>
        <p className="text-[rgba(232,228,220,0.65)] text-sm">
          We will contact you when a matching yielding investment becomes available.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={set('name')}
          required
          className={inputClass}
          style={inputStyle}
        />
        <input
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={set('email')}
          required
          className={inputClass}
          style={inputStyle}
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={form.phone}
          onChange={set('phone')}
          className={inputClass}
          style={inputStyle}
        />
        <select
          value={form.minYield}
          onChange={set('minYield')}
          className={`${inputClass} cursor-pointer`}
          style={{ ...selectStyle, color: form.minYield ? 'white' : 'rgba(232,228,220,0.4)' }}
        >
          <option value="" disabled>Minimum Yield</option>
          {['Any', '5%+', '6%+', '7%+', '8%+'].map(v => (
            <option key={v} value={v} style={{ backgroundColor: '#0F0F14', color: 'white' }}>{v}</option>
          ))}
        </select>
        <select
          value={form.propertyType}
          onChange={set('propertyType')}
          className={`${inputClass} cursor-pointer`}
          style={{ ...selectStyle, color: form.propertyType ? 'white' : 'rgba(232,228,220,0.4)' }}
        >
          <option value="" disabled>Property Type</option>
          {['Any', 'BTL Single Let', 'HMO', 'Commercial', 'Portfolio'].map(v => (
            <option key={v} value={v} style={{ backgroundColor: '#0F0F14', color: 'white' }}>{v}</option>
          ))}
        </select>
        <select
          value={form.maxBudget}
          onChange={set('maxBudget')}
          className={`${inputClass} cursor-pointer`}
          style={{ ...selectStyle, color: form.maxBudget ? 'white' : 'rgba(232,228,220,0.4)' }}
        >
          <option value="" disabled>Maximum Budget</option>
          {['Under £300k', '£300k to £500k', '£500k to £1m', 'Over £1m'].map(v => (
            <option key={v} value={v} style={{ backgroundColor: '#0F0F14', color: 'white' }}>{v}</option>
          ))}
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
      {error && <p className="text-red-400 text-sm text-center">{error}</p>}
    </form>
  )
}
