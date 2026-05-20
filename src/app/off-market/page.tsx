'use client'

import { useState } from 'react'
import LotCard from '@/components/LotCard'
import GoldButton from '@/components/GoldButton'
import { lots } from '@/lib/data'
import { Lock, AlertTriangle } from 'lucide-react'

export default function OffMarketPage() {
  const [unlocked, setUnlocked] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [checking, setChecking] = useState(false)
  const [reqName, setReqName] = useState('')
  const [reqEmail, setReqEmail] = useState('')
  const [reqSent, setReqSent] = useState(false)
  const [reqError, setReqError] = useState('')

  const offMarketLots = lots.filter((l) => l.isOffMarket)

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault()
    setChecking(true)
    setError('')
    try {
      const res = await fetch('/api/off-market/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (res.ok) {
        setUnlocked(true)
      } else {
        setError('Incorrect code. Contact Sam to request access.')
      }
    } catch {
      setError('Unable to verify. Please try again.')
    } finally {
      setChecking(false)
    }
  }

  if (!unlocked) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-20">
        <div className="w-full max-w-md text-center">
          <div className="w-20 h-20 rounded-full bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.3)] flex items-center justify-center mx-auto mb-8">
            <Lock className="text-[#C9A84C]" size={36} />
          </div>

          <h1 className="text-3xl font-black text-[#1A1A1A] mb-4">Off-Market Properties</h1>
          <p className="text-[#666] mb-10 leading-relaxed">
            This section contains private investment opportunities shared exclusively with
            pre-qualified Midas investors.
          </p>

          <form onSubmit={handleUnlock} className="space-y-4 mb-10">
            <input
              type="password"
              placeholder="Enter your access code"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-[#F8F7F4] border border-[#E0DDD4] rounded-lg px-4 py-3.5 text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:border-[#C9A84C] text-center text-lg tracking-widest"
            />
            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm justify-center">
                <AlertTriangle size={14} />
                {error}
              </div>
            )}
            <GoldButton variant="filled" type="submit" className="w-full" size="lg" disabled={checking}>
              {checking ? 'Checking...' : 'Access Properties →'}
            </GoldButton>
          </form>

          {/* Request access */}
          <div className="border-t border-[#E8E5DE] pt-8">
            <p className="text-[#666] text-sm mb-5">
              Don&apos;t have a code? Request access below.
            </p>
            {reqSent ? (
              <div className="bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.3)] rounded-lg p-4 text-[#C9A84C] text-sm">
                ✓ Request received. Sam&apos;s team will be in touch within 24 hours.
              </div>
            ) : (
              <form
                onSubmit={async (e) => {
                  e.preventDefault()
                  setReqError('')
                  const res = await fetch('/api/offmarket-request', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: reqName, email: reqEmail }),
                  })
                  if (!res.ok) {
                    const data = await res.json().catch(() => ({ error: 'Request failed. Please try again.' })) as { error?: string }
                    setReqError(data.error ?? 'Request failed. Please try again.')
                    return
                  }
                  setReqSent(true)
                }}
                className="space-y-3"
              >
                <input
                  type="text"
                  placeholder="Your name"
                  value={reqName}
                  onChange={(e) => setReqName(e.target.value)}
                  required
                  className="w-full bg-[#F8F7F4] border border-[#E8E5DE] rounded px-4 py-3 text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:border-[#C9A84C] text-sm"
                />
                <input
                  type="email"
                  placeholder="Email address"
                  value={reqEmail}
                  onChange={(e) => setReqEmail(e.target.value)}
                  required
                  className="w-full bg-[#F8F7F4] border border-[#E8E5DE] rounded px-4 py-3 text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:border-[#C9A84C] text-sm"
                />
                <GoldButton variant="outline" type="submit" className="w-full">
                  Request Access
                </GoldButton>
                {reqError && <p className="text-red-500 text-sm text-center">{reqError}</p>}
              </form>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Confidential banner */}
        <div className="bg-[rgba(201,168,76,0.08)] border border-[rgba(201,168,76,0.3)] rounded-xl px-6 py-4 flex items-center gap-3 mb-10">
          <Lock className="text-[#C9A84C] flex-shrink-0" size={18} />
          <p className="text-[#C9A84C] text-sm font-medium">
            🔐 Confidential. Please do not share these details publicly.
          </p>
        </div>

        <h1 className="text-3xl font-black text-[#1A1A1A] mb-2">Off-Market Properties</h1>
        <p className="text-[#666] mb-10">
          Pre-qualified investor access only. {offMarketLots.length} properties available.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offMarketLots.map((lot) => (
            <LotCard key={lot.id} lot={lot} showOffMarket />
          ))}
        </div>
      </div>
    </div>
  )
}
