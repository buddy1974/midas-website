import Link from 'next/link'
import { Bed, Calendar } from 'lucide-react'
import type { Lot } from '@/lib/data'

interface LotCardProps {
  lot: Lot
  showOffMarket?: boolean
}

const statusConfig = {
  live: { label: 'LIVE', classes: 'bg-red-600 text-white' },
  legal_pack: { label: 'LEGAL PACK', classes: 'bg-[#C9A84C] text-[#080809]' },
  sourcing: { label: 'SOURCING', classes: 'bg-gray-600 text-white' },
  unsold: { label: 'STILL AVAILABLE', classes: 'bg-blue-600 text-white' },
}

const typeGradient: Record<string, string> = {
  HMO: 'from-[#C9A84C] to-[#080809]',
  'Residential Flat': 'from-blue-900 to-[#080809]',
  'Terraced House': 'from-blue-800 to-[#080809]',
  'Detached House': 'from-blue-700 to-[#080809]',
  Commercial: 'from-purple-900 to-[#080809]',
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(price)
}

export default function LotCard({ lot }: LotCardProps) {
  const gradient = typeGradient[lot.type] ?? 'from-gray-900 to-[#080809]'
  const status = statusConfig[lot.status]

  return (
    <div className="bg-white border border-[#E8E5DE] rounded-xl overflow-hidden hover:border-[#C9A84C] transition-all duration-300 hover:-translate-y-1 flex flex-col shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
      {/* Image / Gradient area */}
      <div className={`relative h-44 bg-gradient-to-br ${gradient} flex-shrink-0`}>
        {/* Status badge */}
        <span
          className={`absolute top-3 left-3 text-[10px] font-bold px-2 py-1 rounded ${status.classes}`}
        >
          {status.label}
        </span>
        {/* Type badge */}
        <span className="absolute top-3 right-3 text-[10px] font-medium px-2 py-1 rounded bg-black/60 text-[#E8E4DC]">
          {lot.type}
        </span>
        {lot.isOffMarket && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl">🔐</span>
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-[#1A1A1A] font-bold text-base leading-tight mb-1">
          {lot.isOffMarket ? '★ Off-Market Property' : lot.address}
        </h3>
        <p className="text-[#666] text-sm mb-3">{lot.area}</p>

        {lot.bedrooms > 0 && (
          <div className="flex items-center gap-1.5 text-[#666] text-sm mb-3">
            <Bed size={14} />
            <span>{lot.bedrooms} bedrooms</span>
          </div>
        )}

        <div className="mb-1">
          <span className="text-[#C9A84C] font-bold text-xl">
            {formatPrice(lot.guidePrice)}+
          </span>
        </div>
        {lot.arv > 0 && (
          <p className="text-[#888] text-xs mb-3">ARV: {formatPrice(lot.arv)}</p>
        )}

        {/* Features */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {lot.features.slice(0, 2).map((feature) => (
            <span
              key={feature}
              className="text-[10px] text-[#C9A84C] border border-[#C9A84C]/30 px-2 py-0.5 rounded"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-[#F0EDE6]">
          <div className="flex items-center gap-1.5 text-[#888] text-xs">
            <Calendar size={12} />
            <span>{lot.auctionDate}</span>
          </div>
          <Link
            href={`/properties/${lot.id}`}
            className="text-[#C9A84C] text-xs font-medium hover:text-[#E8C96A] transition-colors"
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  )
}
