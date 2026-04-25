'use client'

import { useState } from 'react'
import type { Lot } from '@/lib/data'

interface AnalysisResult {
  score: number
  verdict: 'Strong Buy' | 'Worth Considering' | 'Proceed with Caution'
  yield: string
  roi: string
  risk: 'Low' | 'Medium' | 'High'
  summary: string
}

const verdictColor = {
  'Strong Buy': 'text-green-400 border-green-400/30 bg-green-400/10',
  'Worth Considering': 'text-[#C9A84C] border-[rgba(201,168,76,0.3)] bg-[rgba(201,168,76,0.08)]',
  'Proceed with Caution': 'text-red-400 border-red-400/30 bg-red-400/10',
}

const scoreColor = (score: number) => {
  if (score >= 80) return 'text-green-400'
  if (score >= 60) return 'text-[#C9A84C]'
  return 'text-red-400'
}

export default function AIAnalysisCard({ lot }: { lot: Lot }) {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)

  const runAnalysis = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/ai-analyse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          address: lot.address,
          guidePrice: lot.guidePrice,
          type: lot.type,
          bedrooms: lot.bedrooms,
          arv: lot.arv,
        }),
      })
      setResult(await res.json())
    } catch {
      // silent
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white border border-[#D8D4CC] rounded-xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-lg">🤖</span>
        <h3 className="text-[#1A1A1A] font-bold text-sm">AI Deal Analysis</h3>
      </div>
      <p className="text-[#888] text-xs mb-4">Powered by ARIA — Midas AI</p>

      {!result && !loading && (
        <button
          onClick={runAnalysis}
          className="w-full bg-[#C9A84C] text-[#080809] font-semibold py-2.5 rounded text-sm hover:bg-[#E8C96A] transition-all"
        >
          Run Analysis
        </button>
      )}

      {loading && (
        <div className="text-center py-4">
          <div className="text-[#666] text-sm animate-pulse">
            ARIA is analysing this deal...
          </div>
        </div>
      )}

      {result && (
        <div className="space-y-3">
          {/* Score + Verdict */}
          <div className={`border rounded-lg px-4 py-3 flex items-center justify-between ${verdictColor[result.verdict]}`}>
            <div>
              <div className="font-bold text-sm">{result.verdict}</div>
            </div>
            <div className={`text-3xl font-black ${scoreColor(result.score)}`}>
              {result.score}
              <span className="text-sm font-normal">/100</span>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'Gross Yield', value: result.yield },
              { label: 'Est. ROI', value: result.roi },
              { label: 'Risk', value: result.risk },
            ].map(({ label, value }) => (
              <div key={label} className="bg-[#F8F7F4] rounded-lg p-2.5 text-center">
                <div className="text-[#C9A84C] font-bold text-sm">{value}</div>
                <div className="text-[#888] text-[10px] mt-0.5">{label}</div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <p className="text-[#555] text-xs leading-relaxed border-t border-[#E8E5DE] pt-3">
            {result.summary}
          </p>

          <button
            onClick={() => { setResult(null) }}
            className="text-[#999] text-xs hover:text-[#C9A84C] transition-colors"
          >
            Run again ↺
          </button>
        </div>
      )}
    </div>
  )
}
