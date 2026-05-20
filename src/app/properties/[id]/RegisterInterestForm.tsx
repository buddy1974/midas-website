'use client'

import { useState } from 'react'
import GoldButton from '@/components/GoldButton'

interface Props {
  lotId: string
  lotAddress: string
}

export default function RegisterInterestForm({ lotId, lotAddress }: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [interest, setInterest] = useState('Buyer')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const res = await fetch('/api/register-interest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lotId, lotAddress, name, email, phone, interest }),
    })
    if (!res.ok) {
      const data = await res.json().catch(() => ({ error: 'Submission failed. Please try again.' })) as { error?: string }
      setError(data.error ?? 'Submission failed. Please try again.')
      return
    }
    setSubmitted(true)
  }

  return (
    <div className="bg-white border border-[#E8E5DE] rounded-xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
      <h3 className="text-[#1A1A1A] font-bold text-base mb-5">Register Interest</h3>
      {submitted ? (
        <div className="bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.3)] rounded-lg p-4 text-[#C9A84C] text-sm text-center">
          ✓ Interest registered. We will contact you within 24 hours.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full bg-[#F8F7F4] border border-[#E0DDD4] rounded px-3 py-2.5 text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:border-[#C9A84C] text-sm"
          />
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-[#F8F7F4] border border-[#E0DDD4] rounded px-3 py-2.5 text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:border-[#C9A84C] text-sm"
          />
          <input
            type="tel"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-[#F8F7F4] border border-[#E0DDD4] rounded px-3 py-2.5 text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:border-[#C9A84C] text-sm"
          />
          <div>
            <label className="text-[#666] text-xs mb-2 block">
              I am interested as:
            </label>
            <select
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              className="w-full bg-[#F8F7F4] border border-[#E0DDD4] rounded px-3 py-2.5 text-[#444] focus:outline-none focus:border-[#C9A84C] text-sm"
            >
              <option>Buyer</option>
              <option>Investor</option>
              <option>Other</option>
            </select>
          </div>
          <GoldButton variant="filled" type="submit" className="w-full">
            Register Interest
          </GoldButton>
          {error && <p className="text-red-500 text-xs text-center">{error}</p>}
          <p className="text-[#999] text-xs text-center">
            We will contact you within 24 hours.
          </p>
        </form>
      )}
    </div>
  )
}
