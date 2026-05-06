'use client'

import { useState } from 'react'
import { MessageCircle } from 'lucide-react'

export default function WhatsAppSignup() {
  const [waNumber, setWaNumber] = useState('')
  const [waType, setWaType] = useState('')
  const [waBudget, setWaBudget] = useState('')
  const [waDone, setWaDone] = useState(false)

  return (
    <section className="py-12 bg-[#080809]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="border border-[#25D366]/30 rounded-2xl p-8 bg-[#15151C] flex flex-col md:flex-row items-center gap-8">
          <div className="flex-shrink-0 w-14 h-14 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center">
            <MessageCircle className="text-[#25D366]" size={28} />
          </div>
          <div className="flex-1">
            <h3 className="text-[#E8E4DC] font-bold text-xl mb-1">Get WhatsApp Alerts for New Lots</h3>
            <p className="text-[rgba(232,228,220,0.55)] text-sm mb-4">
              Be the first to know. New lots sent directly to your WhatsApp before they go public.
            </p>
            {waDone ? (
              <div className="text-[#25D366] text-sm font-medium">
                ✅ You&apos;re on the list. Expect your first alert within 24 hours.
              </div>
            ) : (
              <form
                onSubmit={async (e) => {
                  e.preventDefault()
                  await fetch('/api/whatsapp-signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ number: waNumber, type: waType, budget: waBudget }),
                  })
                  setWaDone(true)
                }}
                className="flex flex-wrap gap-2"
              >
                <input
                  type="tel"
                  placeholder="WhatsApp number"
                  value={waNumber}
                  onChange={(e) => setWaNumber(e.target.value)}
                  required
                  className="flex-1 min-w-[160px] bg-[#0F0F14] border border-[rgba(201,168,76,0.2)] rounded px-3 py-2.5 text-[#E8E4DC] placeholder-[rgba(232,228,220,0.3)] focus:outline-none focus:border-[#25D366] text-sm"
                />
                <select
                  value={waType}
                  onChange={(e) => setWaType(e.target.value)}
                  className="bg-[#0F0F14] border border-[rgba(201,168,76,0.2)] rounded px-3 py-2.5 text-[rgba(232,228,220,0.7)] focus:outline-none focus:border-[#25D366] text-sm"
                >
                  <option value="">Any type</option>
                  <option>HMO</option>
                  <option>Residential</option>
                  <option>Commercial</option>
                </select>
                <select
                  value={waBudget}
                  onChange={(e) => setWaBudget(e.target.value)}
                  className="bg-[#0F0F14] border border-[rgba(201,168,76,0.2)] rounded px-3 py-2.5 text-[rgba(232,228,220,0.7)] focus:outline-none focus:border-[#25D366] text-sm"
                >
                  <option value="">Any budget</option>
                  <option>Under £250k</option>
                  <option>£250k to £500k</option>
                  <option>£500k to £1m</option>
                  <option>Over £1m</option>
                </select>
                <button
                  type="submit"
                  className="bg-[#25D366] text-white font-semibold px-5 py-2.5 rounded hover:bg-[#20c05b] transition-all text-sm"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
