'use client'

import { useState } from 'react'
import { FileText } from 'lucide-react'

interface Props {
  lotId: string
  lotAddress: string
}

export default function LegalPackRequestButton({ lotId, lotAddress }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await fetch('/api/register-interest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        phone,
        source: 'legal_pack_request',
        lot_id: lotId,
        interest: `Legal Pack Request for ${lotAddress}`,
      }),
    })
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center gap-2 w-full bg-[#C9A84C] text-[#080809] font-bold py-3.5 rounded-lg hover:bg-[#E8C96A] transition-all text-sm"
      >
        <FileText size={16} /> Request Legal Pack
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => { if (!loading) setIsOpen(false) }}
          />
          <div className="relative bg-[#15151C] border border-[rgba(201,168,76,0.3)] rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-[rgba(232,228,220,0.4)] hover:text-[#E8E4DC] text-2xl leading-none"
            >
              ×
            </button>

            <h3 className="text-[#E8E4DC] font-bold text-xl mb-2">Request Legal Pack</h3>
            <p className="text-[rgba(232,228,220,0.5)] text-sm mb-6">
              {lotAddress}. We&apos;ll send the full legal pack to your email within 24 hours.
            </p>

            {submitted ? (
              <div className="bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.3)] rounded-lg p-5 text-center">
                <div className="text-[#C9A84C] font-bold mb-1">
                  ✓ Legal pack sent to your email within 24 hours.
                </div>
                <div className="text-[rgba(201,168,76,0.7)] text-xs">
                  Reference: {lotAddress}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-[rgba(232,228,220,0.6)] text-xs uppercase tracking-wider mb-1.5 block">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full bg-[#0F0F14] border border-[rgba(201,168,76,0.2)] rounded px-4 py-3 text-[#E8E4DC] placeholder-[rgba(232,228,220,0.3)] focus:outline-none focus:border-[#C9A84C] text-sm"
                  />
                </div>
                <div>
                  <label className="text-[rgba(232,228,220,0.6)] text-xs uppercase tracking-wider mb-1.5 block">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-[#0F0F14] border border-[rgba(201,168,76,0.2)] rounded px-4 py-3 text-[#E8E4DC] placeholder-[rgba(232,228,220,0.3)] focus:outline-none focus:border-[#C9A84C] text-sm"
                  />
                </div>
                <div>
                  <label className="text-[rgba(232,228,220,0.6)] text-xs uppercase tracking-wider mb-1.5 block">
                    Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="+44 7700 000000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full bg-[#0F0F14] border border-[rgba(201,168,76,0.2)] rounded px-4 py-3 text-[#E8E4DC] placeholder-[rgba(232,228,220,0.3)] focus:outline-none focus:border-[#C9A84C] text-sm"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#C9A84C] text-[#080809] font-bold py-3.5 rounded-lg hover:bg-[#E8C96A] transition-all text-sm disabled:opacity-60"
                >
                  {loading ? 'Sending...' : 'Send Request'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}
