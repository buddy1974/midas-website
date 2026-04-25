import { TrendingUp, TrendingDown, Clock, Home, DollarSign } from 'lucide-react'
import { marketData } from '@/lib/data'

interface MarketDataProps {
  postcodeArea: string
}

export default function MarketData({ postcodeArea }: MarketDataProps) {
  const match = postcodeArea.match(/([A-Z]{1,2}\d{1,2})/)?.[1] ?? ''
  const data = marketData[match]

  if (!data) return null

  return (
    <div className="bg-white border border-[#E8E5DE] rounded-xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
      <div className="flex items-center gap-2 mb-5">
        <span className="text-lg">📊</span>
        <h2 className="text-[#1A1A1A] font-bold">Local Market Data</h2>
        <span className="text-[#999] text-xs ml-1">{match} area</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#F8F7F4] rounded-lg p-3 text-center">
          <Home className="text-[#C9A84C] mx-auto mb-1.5" size={16} />
          <div className="text-[#1A1A1A] font-bold text-sm">{data.avgPrice}</div>
          <div className="text-[#888] text-[10px] mt-0.5">Avg Sold Price</div>
        </div>
        <div className="bg-[#F8F7F4] rounded-lg p-3 text-center">
          {data.positive
            ? <TrendingUp className="text-green-400 mx-auto mb-1.5" size={16} />
            : <TrendingDown className="text-red-400 mx-auto mb-1.5" size={16} />}
          <div className={`font-bold text-sm ${data.positive ? 'text-green-400' : 'text-red-400'}`}>
            {data.yoyChange}
          </div>
          <div className="text-[#888] text-[10px] mt-0.5">YoY Change</div>
        </div>
        <div className="bg-[#F8F7F4] rounded-lg p-3 text-center">
          <Clock className="text-[#C9A84C] mx-auto mb-1.5" size={16} />
          <div className="text-[#1A1A1A] font-bold text-sm">{data.avgDaysOnMarket} days</div>
          <div className="text-[#888] text-[10px] mt-0.5">Avg Days on Market</div>
        </div>
        <div className="bg-[#F8F7F4] rounded-lg p-3 text-center">
          <DollarSign className="text-[#C9A84C] mx-auto mb-1.5" size={16} />
          <div className="text-[#C9A84C] font-bold text-sm">{data.avgRent}</div>
          <div className="text-[#888] text-[10px] mt-0.5">Avg Rental Income</div>
        </div>
      </div>
      {data.hmoRooms && (
        <div className="mt-3 bg-[#F8F7F4] rounded-lg px-4 py-2.5 flex items-center justify-between">
          <span className="text-[#666] text-xs">HMO Room Rate (est.)</span>
          <span className="text-[#C9A84C] text-xs font-semibold">{data.hmoRooms}/month</span>
        </div>
      )}
      <div className="flex items-center justify-between mt-3">
        <p className="text-[#999] text-[10px]">
          Source: Land Registry / Rightmove estimates. For guidance only.
        </p>
        <p className="text-[#999] text-[10px]">
          Rental demand: <span className="text-[#C9A84C]">{data.rentalDemand}</span>
        </p>
      </div>
    </div>
  )
}
