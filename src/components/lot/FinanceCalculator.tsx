'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Props {
  guidePrice: number
  type: string
}

function fmt(n: number) {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(n)
}

export default function FinanceCalculator({ guidePrice, type }: Props) {
  const [price, setPrice] = useState(guidePrice)
  const [depositPct, setDepositPct] = useState(25)
  const [monthlyRate, setMonthlyRate] = useState(0.85)
  const [termMonths, setTermMonths] = useState(12)

  const deposit = Math.round(price * depositPct / 100)
  const loan = price - deposit
  const ltv = Math.round((loan / price) * 100)
  const monthlyInterest = Math.round(loan * monthlyRate / 100)
  const totalInterest = monthlyInterest * termMonths
  const isHMO = type === 'HMO'
  // Rough HMO yield estimate: £650/room/month × bedrooms (not shown here — shown if HMO)
  const estMonthlyRent = isHMO ? Math.round(loan * 0.008) : 0
  const cashflow = estMonthlyRent - monthlyInterest

  // sync if guidePrice prop changes
  useEffect(() => { setPrice(guidePrice) }, [guidePrice])

  return (
    <div className="bg-white border border-[#E8E5DE] rounded-xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg">💰</span>
        <h3 className="text-[#1A1A1A] font-bold text-sm">Quick Finance Calculator</h3>
      </div>

      <div className="space-y-3 mb-4">
        {/* Purchase price */}
        <div>
          <label className="text-[#666] text-xs mb-1 block">Purchase Price (£)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full bg-[#F8F7F4] border border-[#E0DDD4] rounded px-3 py-2 text-[#1A1A1A] text-sm focus:outline-none focus:border-[#C9A84C]"
          />
        </div>

        {/* Deposit slider */}
        <div>
          <div className="flex justify-between mb-1">
            <label className="text-[#666] text-xs">Deposit</label>
            <span className="text-[#C9A84C] text-xs font-semibold">{depositPct}% — {fmt(deposit)}</span>
          </div>
          <input
            type="range"
            min={20} max={40} step={5}
            value={depositPct}
            onChange={(e) => setDepositPct(Number(e.target.value))}
            className="w-full accent-[#C9A84C]"
          />
        </div>

        {/* Monthly rate */}
        <div>
          <label className="text-[#666] text-xs mb-1 block">Monthly Rate (%)</label>
          <input
            type="number"
            step={0.05}
            min={0.5}
            max={2}
            value={monthlyRate}
            onChange={(e) => setMonthlyRate(Number(e.target.value))}
            className="w-full bg-[#F8F7F4] border border-[#E0DDD4] rounded px-3 py-2 text-[#1A1A1A] text-sm focus:outline-none focus:border-[#C9A84C]"
          />
        </div>

        {/* Term */}
        <div>
          <label className="text-[#666] text-xs mb-1 block">Loan Term</label>
          <select
            value={termMonths}
            onChange={(e) => setTermMonths(Number(e.target.value))}
            className="w-full bg-[#F8F7F4] border border-[#E0DDD4] rounded px-3 py-2 text-[#444] text-sm focus:outline-none focus:border-[#C9A84C]"
          >
            <option value={3}>3 months</option>
            <option value={6}>6 months</option>
            <option value={12}>12 months</option>
            <option value={24}>24 months</option>
          </select>
        </div>
      </div>

      {/* Results */}
      <div className="bg-[#F8F7F4] rounded-lg p-3 space-y-2 mb-4">
        {[
          { label: 'Loan Amount', value: fmt(loan) },
          { label: 'LTV', value: `${ltv}%` },
          { label: 'Monthly Interest', value: fmt(monthlyInterest) },
          { label: 'Total Interest', value: fmt(totalInterest) },
        ].map(({ label, value }) => (
          <div key={label} className="flex justify-between items-center">
            <span className="text-[#666] text-xs">{label}</span>
            <span className="text-[#1A1A1A] text-sm font-semibold">{value}</span>
          </div>
        ))}
        {isHMO && (
          <div className="border-t border-[#E8E5DE] pt-2 flex justify-between items-center">
            <span className="text-[rgba(232,228,220,0.5)] text-xs">Est. Monthly Cashflow</span>
            <span className={`text-sm font-bold ${cashflow >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {cashflow >= 0 ? '+' : ''}{fmt(cashflow)}
            </span>
          </div>
        )}
      </div>

      <Link
        href="/finance"
        className="block w-full text-center border border-[#C9A84C] text-[#C9A84C] text-sm font-semibold py-2.5 rounded hover:bg-[#C9A84C] hover:text-[#080809] transition-all"
      >
        Apply for Finance →
      </Link>
    </div>
  )
}
