'use client'

import { useState } from 'react'

const DEMO_SUMMARY = {
  title: 'Freehold',
  tenure: 'Vacant Possession',
  restrictions: 'Standard residential covenants apply. Permitted development rights intact.',
  searches: 'Local authority, drainage and water searches complete.',
  costs: 'Estimated legal fees: £1,200–£1,800 + VAT. SDLT applicable on purchase price.',
}

export default function AILegalPack() {
  const [loading, setLoading] = useState(false)
  const [shown, setShown] = useState(false)

  const run = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setShown(true)
    }, 1800)
  }

  return (
    <div className="bg-white border border-[#E8E5DE] rounded-xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-lg">📋</span>
        <h3 className="text-[#1A1A1A] font-bold text-sm">Legal Pack Summary</h3>
      </div>
      <p className="text-[#666] text-xs mb-4">
        Legal pack available for download.
      </p>

      {!shown && !loading && (
        <div className="space-y-3">
          <p className="text-[#666] text-xs leading-relaxed">
            Don&apos;t have time to read 200 pages? ARIA can summarise the key points.
          </p>
          <button
            onClick={run}
            className="w-full border border-[#C9A84C] text-[#C9A84C] font-semibold py-2.5 rounded text-sm hover:bg-[#C9A84C] hover:text-[#080809] transition-all"
          >
            🤖 AI Summary
          </button>
        </div>
      )}

      {loading && (
        <div className="text-center py-4 text-[#666] text-sm animate-pulse">
          ARIA is reading the legal pack...
        </div>
      )}

      {shown && (
        <div className="space-y-2.5">
          {[
            { icon: '✅', label: 'Title', value: DEMO_SUMMARY.title },
            { icon: '✅', label: 'Tenure', value: DEMO_SUMMARY.tenure },
            { icon: '⚠️', label: 'Restrictions', value: DEMO_SUMMARY.restrictions },
            { icon: '✅', label: 'Searches', value: DEMO_SUMMARY.searches },
            { icon: '⚠️', label: 'Costs', value: DEMO_SUMMARY.costs },
          ].map(({ icon, label, value }) => (
            <div key={label} className="flex items-start gap-2 text-xs">
              <span className="flex-shrink-0">{icon}</span>
              <div>
                <span className="text-[#666] font-medium">{label}: </span>
                <span className="text-[#333]">{value}</span>
              </div>
            </div>
          ))}
          <a
            href="#"
            className="block text-center text-[#C9A84C] text-xs font-semibold mt-3 hover:text-[#E8C96A] transition-colors"
          >
            Download Full Legal Pack (PDF) →
          </a>
        </div>
      )}
    </div>
  )
}
