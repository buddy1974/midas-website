'use client'

import { useState } from 'react'
import { lots } from '@/lib/data'
import GoldButton from '@/components/GoldButton'
import { Bot } from 'lucide-react'

function fmt(n: number) {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(n)
}

interface CompareResult {
  recommendation: string
  winner: 'A' | 'B' | 'Equal'
}

export default function ComparePage() {
  const [lotAId, setLotAId] = useState(lots[0].id)
  const [lotBId, setLotBId] = useState(lots[1].id)
  const [result, setResult] = useState<CompareResult | null>(null)
  const [loading, setLoading] = useState(false)

  const lotA = lots.find((l) => l.id === lotAId)!
  const lotB = lots.find((l) => l.id === lotBId)!

  const roiA = lotA.arv > 0 ? (((lotA.arv - lotA.guidePrice) / lotA.guidePrice) * 100).toFixed(1) + '%' : 'N/A'
  const roiB = lotB.arv > 0 ? (((lotB.arv - lotB.guidePrice) / lotB.guidePrice) * 100).toFixed(1) + '%' : 'N/A'

  const runComparison = async () => {
    setLoading(true)
    setResult(null)
    try {
      const res = await fetch('/api/ai-compare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lotAId, lotBId }),
      })
      setResult(await res.json())
    } catch {
      //
    } finally {
      setLoading(false)
    }
  }

  const publicLots = lots.filter((l) => !l.isOffMarket)

  const rows = [
    { label: 'Type', a: lotA.type, b: lotB.type },
    { label: 'Bedrooms', a: lotA.bedrooms > 0 ? `${lotA.bedrooms} beds` : 'N/A', b: lotB.bedrooms > 0 ? `${lotB.bedrooms} beds` : 'N/A' },
    { label: 'Guide Price', a: fmt(lotA.guidePrice), b: fmt(lotB.guidePrice) },
    { label: 'ARV', a: lotA.arv > 0 ? fmt(lotA.arv) : 'N/A', b: lotB.arv > 0 ? fmt(lotB.arv) : 'N/A' },
    { label: 'Est. ROI', a: roiA, b: roiB },
    { label: 'Area', a: lotA.area, b: lotB.area },
    { label: 'Auction Date', a: lotA.auctionDate, b: lotB.auctionDate },
    { label: 'Status', a: lotA.status.replace('_', ' ').toUpperCase(), b: lotB.status.replace('_', ' ').toUpperCase() },
  ]

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center py-12">
          <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-3">Property Comparison</p>
          <h1 className="text-3xl md:text-4xl font-black text-[#1A1A1A] mb-4">Compare Properties Side by Side</h1>
          <p className="text-[#666]">Select two properties and let ARIA pick the better deal.</p>
        </div>

        {/* Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {[
            { label: 'Lot A', value: lotAId, onChange: setLotAId },
            { label: 'Lot B', value: lotBId, onChange: setLotBId },
          ].map(({ label, value, onChange }) => (
            <div key={label}>
              <label className="text-[#666] text-xs uppercase tracking-wider mb-1.5 block">{label}</label>
              <select
                value={value}
                onChange={(e) => { onChange(e.target.value); setResult(null) }}
                className="w-full bg-[#F8F7F4] border border-[#E0DDD4] rounded px-4 py-3 text-[#333] focus:outline-none focus:border-[#C9A84C] text-sm"
              >
                {publicLots.map((l) => (
                  <option key={l.id} value={l.id}>{l.address} — {l.area}</option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* Comparison table */}
        <div className="bg-white border border-[#E8E5DE] rounded-xl overflow-hidden mb-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
          {/* Headers */}
          <div className="grid grid-cols-3 bg-[#F8F7F4] border-b border-[#E8E5DE]">
            <div className="px-4 py-3 text-[#888] text-xs uppercase tracking-wider">Criteria</div>
            <div className={`px-4 py-3 text-sm font-bold text-center ${result?.winner === 'A' ? 'text-[#C9A84C]' : 'text-[#1A1A1A]'}`}>
              {lotA.address.slice(0, 20)}… {result?.winner === 'A' && '⭐'}
            </div>
            <div className={`px-4 py-3 text-sm font-bold text-center ${result?.winner === 'B' ? 'text-[#C9A84C]' : 'text-[#1A1A1A]'}`}>
              {lotB.address.slice(0, 20)}… {result?.winner === 'B' && '⭐'}
            </div>
          </div>
          {rows.map(({ label, a, b }, i) => (
            <div key={label} className={`grid grid-cols-3 border-b border-[#F0EDE6] ${i % 2 === 0 ? '' : 'bg-[#F8F7F4]'}`}>
              <div className="px-4 py-3 text-[#666] text-xs">{label}</div>
              <div className="px-4 py-3 text-[#1A1A1A] text-sm text-center font-medium">{a}</div>
              <div className="px-4 py-3 text-[#1A1A1A] text-sm text-center font-medium">{b}</div>
            </div>
          ))}
        </div>

        {/* AI comparison */}
        <div className="text-center mb-8">
          <GoldButton variant="filled" size="lg" onClick={runComparison}>
            <Bot size={16} />
            {loading ? 'ARIA is comparing...' : 'Run AI Comparison'}
          </GoldButton>
        </div>

        {result && (
          <div className="bg-white border border-[#C9A84C]/30 rounded-xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🤖</span>
              <h3 className="text-[#1A1A1A] font-bold">ARIA&apos;s Recommendation</h3>
              {result.winner !== 'Equal' && (
                <span className="ml-auto bg-[#C9A84C] text-[#080809] text-xs font-bold px-3 py-1 rounded">
                  Recommends Lot {result.winner}
                </span>
              )}
            </div>
            <p className="text-[#333] leading-relaxed text-sm">{result.recommendation}</p>
          </div>
        )}
      </div>
    </div>
  )
}
