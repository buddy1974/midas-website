'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { lots } from '@/lib/data'
import type { Lot } from '@/lib/data'

const WISHLIST_KEY = 'midas_wishlist'

function formatPrice(price: number): string {
  return '£' + price.toLocaleString('en-GB')
}

export default function WishlistPage() {
  const [savedIds, setSavedIds] = useState<string[]>([])

  useEffect(() => {
    queueMicrotask(() => {
      try {
        const stored = localStorage.getItem(WISHLIST_KEY)
        setSavedIds(stored ? (JSON.parse(stored) as string[]) : [])
      } catch {
        setSavedIds([])
      }
    })
  }, [])

  const removeFromWishlist = (id: string) => {
    const updated = savedIds.filter((s) => s !== id)
    setSavedIds(updated)
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(updated))
  }

  const clearAll = () => {
    setSavedIds([])
    localStorage.removeItem(WISHLIST_KEY)
  }

  const wishlistLots: Lot[] = lots.filter((lot) => savedIds.includes(lot.id))

  return (
    <div className="min-h-screen bg-[#080809] pt-24 pb-20">

      {/* ── Header ── */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-3">
          Your Saved Properties
        </p>
        <h1 className="text-4xl md:text-5xl font-black text-[#E8E4DC] mb-4">
          ❤ Your Saved Properties
        </h1>
        <p className="text-[rgba(232,228,220,0.65)] text-lg">
          Properties you have saved while browsing.
        </p>
      </section>

      {/* ── Empty State ── */}
      {wishlistLots.length === 0 && (
        <section className="max-w-xl mx-auto px-6 text-center py-12">
          <div className="bg-[#0F0F14] border border-[rgba(201,168,76,0.2)] rounded-2xl p-12">
            <p className="text-[#C9A84C] text-6xl mb-6">❤</p>
            <h2 className="text-2xl font-black text-[#E8E4DC] mb-3">No saved properties yet</h2>
            <p className="text-[rgba(232,228,220,0.65)] mb-8">
              Browse our current lots and click ❤ to save properties here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/current-auction"
                className="inline-block bg-[#C9A84C] text-[#080809] font-semibold px-6 py-3 rounded hover:bg-[#E8C96A] transition-colors"
              >
                Browse Lots
              </Link>
              <Link
                href="/register"
                className="inline-block border border-[#C9A84C] text-[#C9A84C] px-6 py-3 rounded hover:bg-[rgba(201,168,76,0.08)] transition-colors"
              >
                Register as Investor
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Wishlist Grid ── */}
      {wishlistLots.length > 0 && (
        <section className="max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <p className="text-[rgba(232,228,220,0.55)] text-sm">
              {wishlistLots.length} saved propert{wishlistLots.length === 1 ? 'y' : 'ies'}
            </p>
            <button
              onClick={clearAll}
              className="border border-red-500/50 text-red-400 text-sm px-4 py-2 rounded hover:bg-red-500/10 transition-colors"
            >
              Clear All
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {wishlistLots.map((lot) => (
              <div
                key={lot.id}
                className="bg-[#0F0F14] border border-[rgba(201,168,76,0.2)] rounded-xl p-5 flex flex-col"
              >
                {/* Address */}
                <h3 className="text-[#E8E4DC] font-bold text-base mb-1 leading-snug">
                  {lot.address}
                </h3>

                {/* Area */}
                <p className="text-[#C9A84C] text-sm mb-4">{lot.area}</p>

                {/* Meta row */}
                <div className="flex flex-wrap gap-x-4 gap-y-1 mb-4 text-[rgba(232,228,220,0.55)] text-xs">
                  <span>{lot.type}</span>
                  {lot.bedrooms > 0 && <span>{lot.bedrooms} bed</span>}
                  <span className="text-[#E8E4DC] font-semibold">
                    Guide: {formatPrice(lot.guidePrice)}
                  </span>
                </div>

                {/* Actions */}
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-[rgba(201,168,76,0.1)]">
                  <button
                    onClick={() => removeFromWishlist(lot.id)}
                    className="text-red-400 text-xs hover:text-red-300 transition-colors"
                  >
                    Remove ✕
                  </button>
                  <Link
                    href={`/properties/${lot.id}`}
                    className="text-[#C9A84C] text-sm font-medium hover:text-[#E8C96A] transition-colors"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom browse link */}
          <div className="text-center mt-12">
            <Link
              href="/current-auction"
              className="inline-block border border-[#C9A84C] text-[#C9A84C] px-6 py-3 rounded hover:bg-[rgba(201,168,76,0.08)] transition-colors"
            >
              Browse More Lots
            </Link>
          </div>
        </section>
      )}

    </div>
  )
}
