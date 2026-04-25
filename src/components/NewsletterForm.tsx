'use client'

import { useState } from 'react'

const USER_TYPES = ['Buyer', 'Seller', 'Investor', 'Landlord', 'Developer', 'Both Buyer & Seller']

const inputClass =
  'w-full px-4 py-3 rounded-md text-sm text-white placeholder-[rgba(232,228,220,0.4)] focus:outline-none focus:ring-1 focus:ring-[#C9A84C]'
const inputStyle = {
  backgroundColor: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(201,168,76,0.3)',
}

export default function NewsletterForm() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    userType: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const set = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/whatsapp-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'newsletter_homepage' }),
      })
    } catch {
      // silent — still mark subscribed
    }
    setSubmitted(true)
    setLoading(false)
  }

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="text-[#C9A84C] text-4xl mb-4">✓</div>
        <p className="text-[#C9A84C] font-bold text-lg mb-2">
          Thank you for joining the Midas investor network.
        </p>
        <p className="text-[rgba(232,228,220,0.65)] text-sm">
          We will be in touch with relevant opportunities shortly.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="First Name"
          value={form.firstName}
          onChange={set('firstName')}
          required
          className={inputClass}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={form.lastName}
          onChange={set('lastName')}
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
        <input
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={set('email')}
          required
          className={inputClass}
          style={inputStyle}
        />
        <select
          value={form.userType}
          onChange={set('userType')}
          required
          className={`${inputClass} cursor-pointer`}
          style={{ ...inputStyle, color: form.userType ? 'white' : 'rgba(232,228,220,0.4)' }}
        >
          <option value="" disabled>I am a...</option>
          {USER_TYPES.map(t => (
            <option key={t} value={t} style={{ backgroundColor: '#0F0F14', color: 'white' }}>
              {t}
            </option>
          ))}
        </select>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 font-bold uppercase tracking-wider rounded-md transition-colors disabled:opacity-60"
          style={{ backgroundColor: '#C9A84C', color: '#080809' }}
        >
          {loading ? 'Subscribing...' : 'Subscribe'}
        </button>
      </div>
    </form>
  )
}
