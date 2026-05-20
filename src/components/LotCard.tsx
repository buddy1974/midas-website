'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Heart, Calendar } from 'lucide-react'
import type { Lot, LotStatus } from '@/lib/data'

interface LotCardProps {
  lot: Lot
  lotNumber?: number
  showOffMarket?: boolean
}

const statusConfig: Record<LotStatus, { label: string; classes: string }> = {
  live: { label: 'LIVE', classes: 'bg-red-600 text-white' },
  legal_pack: { label: 'LEGAL PACK', classes: 'bg-[#C9A84C] text-[#080809]' },
  sourcing: { label: 'COMING SOON', classes: 'bg-gray-600 text-white' },
  unsold: { label: 'STILL AVAILABLE', classes: 'bg-blue-600 text-white' },
}

const typeGradient: Record<string, string> = {
  HMO: 'from-[rgba(201,168,76,0.4)] to-[#080809]',
  'Residential Flat': 'from-blue-900 to-[#080809]',
  'Terraced House': 'from-blue-800 to-[#080809]',
  'Detached House': 'from-blue-700 to-[#080809]',
  Commercial: 'from-purple-900 to-[#080809]',
  Portfolio: 'from-emerald-900 to-[#080809]',
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(price)
}

export default function LotCard({ lot, lotNumber }: LotCardProps) {
  const [wishlisted, setWishlisted] = useState(false)
  const [imgError, setImgError] = useState(false)
  const gradient = typeGradient[lot.type] ?? 'from-gray-900 to-[#080809]'
  const status = statusConfig[lot.status]

  // Resolve cover image: images array first, then imageUrl legacy field
  const coverImage = !imgError
    ? (lot.images?.[0]?.url || lot.imageUrl || null)
    : null

  useEffect(() => {
    queueMicrotask(() => {
      try {
        const stored = localStorage.getItem('midas_wishlist')
        const items: unknown = stored ? JSON.parse(stored) : []
        setWishlisted(Array.isArray(items) && (items as string[]).includes(lot.id))
      } catch {
        setWishlisted(false)
      }
    })
  }, [lot.id])

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      const stored = localStorage.getItem('midas_wishlist')
      const items: unknown = stored ? JSON.parse(stored) : []
      const arr: string[] = Array.isArray(items) ? (items as string[]) : []
      const updated = arr.includes(lot.id)
        ? arr.filter(id => id !== lot.id)
        : [...arr, lot.id]
      localStorage.setItem('midas_wishlist', JSON.stringify(updated))
      setWishlisted(!arr.includes(lot.id))
    } catch {
      // silent
    }
  }

  return (
    <div className="bg-[#0F0F14] border border-[rgba(201,168,76,0.18)] rounded-xl overflow-hidden hover:border-[rgba(201,168,76,0.45)] transition-all duration-300 hover:-translate-y-1 flex flex-col shadow-[0_4px_20px_rgba(0,0,0,0.4)]">

      {/* Image / gradient area */}
      <div className={`relative h-44 flex-shrink-0 overflow-hidden ${!coverImage ? `bg-gradient-to-br ${gradient}` : 'bg-[#080809]'}`}>

        {/* Cover image */}
        {coverImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={coverImage}
            alt={lot.address}
            onError={() => setImgError(true)}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* LOT badge */}
        {lotNumber !== undefined && (
          <span className="absolute top-0 left-0 z-10 bg-[#C9A84C] text-[#080809] text-[10px] font-black px-3 py-1.5 rounded-br-lg">
            LOT {lotNumber}
          </span>
        )}

        {/* Status badge */}
        <span className={`absolute top-3 right-3 z-10 text-[10px] font-bold px-2 py-1 rounded ${status.classes}`}>
          {status.label}
        </span>

        {/* Off-market overlay */}
        {lot.isOffMarket && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10">
            <span className="text-5xl opacity-60">🔐</span>
          </div>
        )}

        {/* Guide price strip */}
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-[rgba(201,168,76,0.95)] px-3 py-1.5">
          <span className="text-[#080809] text-xs font-bold">
            Guide Price: {formatPrice(lot.guidePrice)}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-[#E8E4DC] font-bold text-sm leading-tight mb-0.5">
          {lot.isOffMarket ? '★ Off-Market Property' : lot.address}
        </h3>
        <p className="text-[#C9A84C] text-xs mb-3">{lot.area}</p>

        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="text-[10px] bg-[rgba(201,168,76,0.1)] text-[rgba(232,228,220,0.6)] border border-[rgba(201,168,76,0.15)] px-2 py-0.5 rounded">
            {lot.type}
          </span>
          {lot.bedrooms > 0 && (
            <span className="text-[10px] bg-[rgba(201,168,76,0.1)] text-[rgba(232,228,220,0.6)] border border-[rgba(201,168,76,0.15)] px-2 py-0.5 rounded">
              🛏 {lot.bedrooms} bed
            </span>
          )}
        </div>

        {lot.description && (
          <p className="text-[rgba(232,228,220,0.5)] text-xs leading-relaxed mb-3 line-clamp-2 flex-1">
            {lot.description}
          </p>
        )}

        {lot.features && lot.features.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {lot.features.slice(0, 2).map(f => (
              <span key={f} className="text-[10px] text-[#C9A84C] border border-[rgba(201,168,76,0.25)] px-2 py-0.5 rounded">
                {f}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-1.5 text-[rgba(232,228,220,0.35)] text-xs mb-4">
          <Calendar size={11} />
          <span>{lot.auctionDate}</span>
        </div>

        <div className="flex gap-2 mt-auto">
          <button
            onClick={toggleWishlist}
            className={`border rounded px-3 py-2.5 transition-colors flex-shrink-0 ${
              wishlisted
                ? 'border-[#C9A84C] text-[#C9A84C]'
                : 'border-[rgba(201,168,76,0.25)] text-[rgba(232,228,220,0.4)] hover:border-[#C9A84C] hover:text-[#C9A84C]'
            }`}
            aria-label={wishlisted ? 'Remove from saved' : 'Save property'}
          >
            <Heart size={14} className={wishlisted ? 'fill-[#C9A84C]' : ''} />
          </button>
          <Link
            href={`/properties/${lot.id}`}
            className="flex-1 text-center bg-[#C9A84C] text-[#080809] text-xs font-bold py-2.5 rounded hover:bg-[#E8C96A] transition-colors"
          >
            View Details →
          </Link>
          <Link
            href={`/properties/${lot.id}#legal-pack`}
            className="border border-[rgba(201,168,76,0.25)] text-[rgba(232,228,220,0.5)] text-xs px-3 py-2.5 rounded hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors flex-shrink-0"
            title="Request Legal Pack"
          >
            📥
          </Link>
        </div>
      </div>
    </div>
  )
}
