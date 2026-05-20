'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import AuctionCountdown from '@/components/AuctionCountdown'
import { lots as staticLots, type Lot, type LotStatus } from '@/lib/data'
import { Grid3X3, List, Search, X, Heart } from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

type ViewMode = 'grid' | 'list'
type PropertyTypeFilter = 'All' | 'Residential' | 'HMO' | 'Commercial' | 'Development' | 'Land'
type TenureFilter = 'All' | 'Freehold' | 'Leasehold' | 'Share of Freehold'

// ─── Constants ────────────────────────────────────────────────────────────────

const MAX_PRICE_OPTIONS: { label: string; value: number | null }[] = [
  { label: 'Any Price', value: null },
  { label: '£100,000', value: 100000 },
  { label: '£150,000', value: 150000 },
  { label: '£200,000', value: 200000 },
  { label: '£250,000', value: 250000 },
  { label: '£300,000', value: 300000 },
  { label: '£350,000', value: 350000 },
  { label: '£400,000', value: 400000 },
  { label: '£450,000', value: 450000 },
  { label: '£500,000', value: 500000 },
  { label: '£600,000', value: 600000 },
  { label: '£750,000', value: 750000 },
  { label: '£1,000,000', value: 1000000 },
]

const STATUS_CONFIG: Record<LotStatus, { label: string; bg: string; text: string }> = {
  live: { label: 'LIVE', bg: 'bg-red-600', text: 'text-white' },
  legal_pack: { label: 'LEGAL PACK', bg: 'bg-[#C9A84C]', text: 'text-[#080809]' },
  sourcing: { label: 'COMING SOON', bg: 'bg-gray-600', text: 'text-white' },
  unsold: { label: 'STILL AVAILABLE', bg: 'bg-blue-600', text: 'text-white' },
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(n: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(n)
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: LotStatus }) {
  const cfg = STATUS_CONFIG[status]
  return (
    <span
      className={`${cfg.bg} ${cfg.text} text-[10px] font-black px-2 py-1 rounded uppercase tracking-wide`}
    >
      {cfg.label}
    </span>
  )
}

function LotCard({
  lot,
  index,
  wishlisted,
  onToggleWishlist,
}: {
  lot: Lot
  index: number
  wishlisted: boolean
  onToggleWishlist: (id: string) => void
}) {
  return (
    <div className="bg-[#0F0F14] border border-[rgba(201,168,76,0.18)] rounded-xl overflow-hidden hover:border-[rgba(201,168,76,0.4)] transition-all group">
      {/* Image area */}
      <div className="relative h-48 bg-gradient-to-br from-[#15151C] to-[#080809]">
        {/* Lot number */}
        <span className="absolute top-0 left-0 bg-[#C9A84C] text-[#080809] text-xs font-black px-2.5 py-1 rounded-br-lg z-10">
          LOT {index + 1}
        </span>

        {/* Status badge */}
        <span className="absolute top-3 right-3 z-10">
          <StatusBadge status={lot.status} />
        </span>

        {/* Wishlist */}
        <button
          onClick={() => onToggleWishlist(lot.id)}
          className="absolute top-10 right-3 z-10 p-1.5 hover:scale-110 transition-transform"
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            size={16}
            className={wishlisted ? 'fill-[#C9A84C] text-[#C9A84C]' : 'text-[rgba(201,168,76,0.5)]'}
          />
        </button>

        {/* Guide price strip */}
        <div className="absolute bottom-0 left-0 right-0 bg-[rgba(201,168,76,0.95)] text-[#080809] font-bold text-sm px-3 py-1.5">
          Guide Price: {fmt(lot.guidePrice)}
        </div>
      </div>

      {/* Card body */}
      <div className="p-5">
        <p className="font-bold text-[#E8E4DC] text-sm leading-tight">{lot.address}</p>
        <p className="text-[#C9A84C] text-xs mt-0.5">{lot.area}</p>

        <div className="flex gap-3 mt-2 text-xs text-[rgba(232,228,220,0.5)]">
          <span>🏠 {lot.type}</span>
          {lot.bedrooms > 0 && <span>🛏 {lot.bedrooms} bed</span>}
          <span>Freehold</span>
        </div>

        <p className="text-[rgba(232,228,220,0.6)] text-xs leading-relaxed mt-2 line-clamp-2">
          {lot.description}
        </p>

        <div className="border-t border-[rgba(201,168,76,0.1)] mt-3 pt-3 flex items-center justify-between">
          <span className="text-xs text-[rgba(232,228,220,0.5)]">📅 {lot.auctionDate}</span>
          <Link
            href={`/properties/${lot.id}`}
            className="text-[#C9A84C] text-xs font-semibold hover:text-[#E8C96A] transition-colors"
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  )
}

function LotRow({
  lot,
  index,
  wishlisted,
  onToggleWishlist,
}: {
  lot: Lot
  index: number
  wishlisted: boolean
  onToggleWishlist: (id: string) => void
}) {
  return (
    <div className="bg-[#0F0F14] border-b border-[rgba(201,168,76,0.1)] px-5 py-4 flex items-center gap-4 hover:bg-[#15151C] transition-colors">
      <span className="bg-[#C9A84C] text-[#080809] text-xs font-black px-2 py-0.5 rounded shrink-0">
        LOT {index + 1}
      </span>

      <div className="flex-1 min-w-0">
        <p className="font-semibold text-[#E8E4DC] text-sm truncate">{lot.address}</p>
        <p className="text-[#C9A84C] text-xs">{lot.area}</p>
      </div>

      <span className="text-[#C9A84C] font-bold text-sm shrink-0">{fmt(lot.guidePrice)}</span>

      <span className="text-[rgba(232,228,220,0.5)] text-xs shrink-0 hidden md:block">
        {lot.type}
      </span>

      <span className="shrink-0">
        <StatusBadge status={lot.status} />
      </span>

      <button
        onClick={() => onToggleWishlist(lot.id)}
        className="shrink-0 hover:scale-110 transition-transform"
        aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <Heart
          size={15}
          className={wishlisted ? 'fill-[#C9A84C] text-[#C9A84C]' : 'text-[rgba(201,168,76,0.4)]'}
        />
      </button>

      <Link
        href={`/properties/${lot.id}`}
        className="text-[#C9A84C] text-xs font-semibold hover:text-[#E8C96A] shrink-0 transition-colors"
      >
        View →
      </Link>
    </div>
  )
}

// ─── Catalogue Modal ──────────────────────────────────────────────────────────

function CatalogueModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/register-interest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          interest: 'Catalogue Request',
          source: 'catalogue_request',
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: 'Request failed. Please try again.' })) as { error?: string }
        setError(data.error ?? 'Request failed. Please try again.')
        return
      }
      setSent(true)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    'w-full bg-[#15151C] border border-[rgba(201,168,76,0.2)] rounded-lg px-4 py-3 text-sm text-[#E8E4DC] placeholder-[rgba(232,228,220,0.35)] focus:outline-none focus:border-[#C9A84C]'

  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-[#0F0F14] border border-[rgba(201,168,76,0.3)] rounded-2xl p-8 max-w-md w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[rgba(232,228,220,0.5)] hover:text-[#E8E4DC] transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {sent ? (
          <div className="text-center py-4">
            <div className="w-14 h-14 rounded-full bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.3)] flex items-center justify-center mx-auto mb-5">
              <span className="text-[#C9A84C] text-2xl">✓</span>
            </div>
            <h2 className="text-[#E8E4DC] font-bold text-xl mb-2">Catalogue Requested</h2>
            <p className="text-[rgba(232,228,220,0.6)] text-sm mb-6">
              We will email your catalogue within 1 hour.
            </p>
            <Link
              href="/register"
              className="inline-block bg-[#C9A84C] text-[#080809] font-semibold px-6 py-3 rounded hover:bg-[#E8C96A] transition-colors"
            >
              Register to Bid →
            </Link>
          </div>
        ) : (
          <>
            <h2 className="text-[#E8E4DC] font-bold text-xl mb-2">Request Auction Catalogue</h2>
            <p className="text-[rgba(232,228,220,0.6)] text-sm mb-6">
              Enter your details and we will email the full catalogue to you within 1 hour.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                required
                className={inputClass}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                required
                className={inputClass}
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#C9A84C] text-[#080809] font-semibold px-6 py-3 rounded hover:bg-[#E8C96A] transition-colors disabled:opacity-60"
              >
                {loading ? 'Sending…' : 'Send Catalogue →'}
              </button>
              {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            </form>
          </>
        )}
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CurrentAuctionPage() {
  const [search, setSearch] = useState('')
  const [maxPrice, setMaxPrice] = useState('Any Price')
  const [propType, setPropType] = useState<PropertyTypeFilter>('All')
  const [tenure, setTenure] = useState<TenureFilter>('All')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [showCatalogueModal, setShowCatalogueModal] = useState(false)
  const [wishlist, setWishlist] = useState<string[]>([])

  useEffect(() => {
    queueMicrotask(() => {
      try {
        const s = localStorage.getItem('midas_wishlist')
        setWishlist(s ? (JSON.parse(s) as string[]) : [])
      } catch {
        setWishlist([])
      }
    })
  }, [])

  const toggleWishlist = (id: string) => {
    const updated = wishlist.includes(id) ? wishlist.filter((x) => x !== id) : [...wishlist, id]
    setWishlist(updated)
    localStorage.setItem('midas_wishlist', JSON.stringify(updated))
  }

  const publicLots: Lot[] = staticLots.filter((l) => l.showOnWebsite && !l.isOffMarket)

  const filtered: Lot[] = publicLots.filter((lot) => {
    if (search) {
      const q = search.toLowerCase()
      if (!lot.address.toLowerCase().includes(q) && !lot.area.toLowerCase().includes(q))
        return false
    }
    const maxPriceVal = MAX_PRICE_OPTIONS.find((o) => o.label === maxPrice)?.value
    if (maxPriceVal && lot.guidePrice > maxPriceVal) return false
    if (propType !== 'All') {
      if (
        propType === 'Residential' &&
        !['Residential Flat', 'Terraced House', 'Detached House'].includes(lot.type)
      )
        return false
      if (propType === 'HMO' && lot.type !== 'HMO') return false
      if (propType === 'Commercial' && lot.type !== 'Commercial') return false
    }
    return true
  })

  const selectClass =
    'bg-[#15151C] border border-[rgba(201,168,76,0.2)] rounded-lg px-3 py-2.5 text-sm text-[#E8E4DC] focus:outline-none focus:border-[#C9A84C]'

  return (
    <div className="min-h-screen bg-[#080809]">
      {/* ── Hero ── */}
      <section className="bg-[#080809] pt-28 pb-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left */}
          <div className="lg:col-span-3">
            <p className="text-[#C9A84C] text-xs uppercase tracking-widest mb-3 font-semibold">
              Going to Auction
            </p>
            <h1 className="text-4xl md:text-5xl font-black text-[#E8E4DC] leading-tight mb-4">
              Current Properties<br />Going to Auction
            </h1>
            <p className="text-[rgba(232,228,220,0.65)] text-base leading-relaxed mb-8 max-w-xl">
              Properties sourced and listed by Midas through our network of partner UK auction
              companies. All lots are fully vetted by the Midas team. Remote bidding available.
            </p>

            <p className="text-[#C9A84C] text-2xl font-bold mb-4">14th May 2026, 12:00pm</p>

            <div className="h-px bg-[rgba(201,168,76,0.2)] mb-4" />

            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-[#C9A84C] text-xl font-bold">12 Lots*</span>
              <span className="text-[rgba(232,228,220,0.5)] text-xs">* Subject to change</span>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setShowCatalogueModal(true)}
                className="border border-[rgba(201,168,76,0.4)] text-[#C9A84C] px-6 py-3 rounded font-semibold hover:bg-[rgba(201,168,76,0.08)] transition-colors"
              >
                View Catalogue
              </button>
              <Link
                href="/register"
                className="bg-[#C9A84C] text-[#080809] font-semibold px-6 py-3 rounded hover:bg-[#E8C96A] transition-colors"
              >
                Register to Bid →
              </Link>
            </div>
          </div>

          {/* Right — countdown card */}
          <div className="lg:col-span-2">
            <div className="bg-[#0F0F14] border border-[rgba(201,168,76,0.2)] rounded-2xl p-8">
              <AuctionCountdown
                targetDate="2026-05-14T12:00:00"
                auctionName="Next Auction Event, May 2026"
                lotCount={12}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Filter bar ── */}
      <div className="bg-[#0F0F14] border-b border-[rgba(201,168,76,0.15)]">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 min-w-48">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgba(232,228,220,0.4)]"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Postcode, address or lot no."
              className="w-full bg-[#15151C] border border-[rgba(201,168,76,0.2)] rounded-lg pl-9 pr-4 py-2.5 text-sm text-[#E8E4DC] placeholder-[rgba(232,228,220,0.35)] focus:outline-none focus:border-[#C9A84C]"
            />
          </div>

          {/* Max Price */}
          <select
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className={selectClass}
          >
            {MAX_PRICE_OPTIONS.map((o) => (
              <option key={o.label}>{o.label}</option>
            ))}
          </select>

          {/* Property Type */}
          <select
            value={propType}
            onChange={(e) => setPropType(e.target.value as PropertyTypeFilter)}
            className={selectClass}
          >
            {(['All', 'Residential', 'HMO', 'Commercial', 'Development', 'Land'] as const).map(
              (t) => (
                <option key={t}>{t === 'All' ? 'All Types' : t}</option>
              ),
            )}
          </select>

          {/* Tenure */}
          <select
            value={tenure}
            onChange={(e) => setTenure(e.target.value as TenureFilter)}
            className={selectClass}
          >
            {(['All', 'Freehold', 'Leasehold', 'Share of Freehold'] as const).map((t) => (
              <option key={t}>{t === 'All' ? 'Any Tenure' : t}</option>
            ))}
          </select>

          {/* View toggle */}
          <div className="flex rounded-lg overflow-hidden border border-[rgba(201,168,76,0.2)]">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-2.5 transition-colors ${
                viewMode === 'grid'
                  ? 'bg-[rgba(201,168,76,0.15)] text-[#C9A84C]'
                  : 'bg-[#15151C] text-[rgba(232,228,220,0.5)] hover:text-[#E8E4DC]'
              }`}
              aria-label="Grid view"
            >
              <Grid3X3 size={15} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-2.5 border-l border-[rgba(201,168,76,0.2)] transition-colors ${
                viewMode === 'list'
                  ? 'bg-[rgba(201,168,76,0.15)] text-[#C9A84C]'
                  : 'bg-[#15151C] text-[rgba(232,228,220,0.5)] hover:text-[#E8E4DC]'
              }`}
              aria-label="List view"
            >
              <List size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Results bar ── */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <p className="text-[rgba(232,228,220,0.5)] text-sm">
          {filtered.length} lot{filtered.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* ── Lot listings ── */}
      <section className="bg-[#080809] py-10">
        <div className="max-w-7xl mx-auto px-6">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[rgba(232,228,220,0.5)] text-lg mb-6">
                No lots match your filters.
              </p>
              <button
                onClick={() => {
                  setSearch('')
                  setMaxPrice('Any Price')
                  setPropType('All')
                  setTenure('All')
                }}
                className="border border-[rgba(201,168,76,0.4)] text-[#C9A84C] px-6 py-3 rounded font-semibold hover:bg-[rgba(201,168,76,0.08)] transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((lot, i) => (
                <LotCard
                  key={lot.id}
                  lot={lot}
                  index={i}
                  wishlisted={wishlist.includes(lot.id)}
                  onToggleWishlist={toggleWishlist}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-xl overflow-hidden border border-[rgba(201,168,76,0.15)]">
              {filtered.map((lot, i) => (
                <LotRow
                  key={lot.id}
                  lot={lot}
                  index={i}
                  wishlisted={wishlist.includes(lot.id)}
                  onToggleWishlist={toggleWishlist}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Catalogue modal ── */}
      {showCatalogueModal && <CatalogueModal onClose={() => setShowCatalogueModal(false)} />}
    </div>
  )
}
