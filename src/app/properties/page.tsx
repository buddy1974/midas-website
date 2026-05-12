'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import LotCard from '@/components/LotCard'
import SectionHeader from '@/components/SectionHeader'
import { lots as staticLots, pastAuctions, type Lot, type LotStatus, type LotImage, type LotEmbed } from '@/lib/data'
import { Lock, TrendingUp } from 'lucide-react'
import type { MRIProperty } from '@/lib/mri-feed'

type FilterType = 'All' | 'HMO' | 'Residential' | 'Commercial' | 'Portfolio' | 'Still Available'
type SortType = 'price_asc' | 'price_desc' | 'newest'

const filters: FilterType[] = ['All', 'HMO', 'Residential', 'Commercial', 'Portfolio', 'Still Available']

function matchesFilter(type: string, filter: FilterType): boolean {
  if (filter === 'All') return true
  if (filter === 'HMO') return type === 'HMO'
  if (filter === 'Residential')
    return ['Residential Flat', 'Terraced House', 'Detached House'].includes(type)
  if (filter === 'Commercial') return type === 'Commercial'
  if (filter === 'Portfolio') return type === 'Portfolio'
  return true
}

interface OsLot {
  id: string
  address: string
  guidePrice: number
  soldPrice: number | null
  arv: number | null
  bedrooms: number | null
  propertyType: string | null
  pipelineStage: string
  coverImage: string | null
  images: string | null
  isOffMarket: boolean
  notes: string | null
  createdAt: string
}

function mapOsLot(l: OsLot): Lot {
  const parts = l.address.split(',')
  const address = parts[0].trim()
  const area = parts.length > 1 ? parts.slice(1).join(',').trim() : ''
  const stageMap: Record<string, LotStatus> = {
    live: 'live',
    legal_pack: 'legal_pack',
    sourcing: 'sourcing',
    completed: 'sourcing',
    unsold: 'sourcing',
  }
  return {
    id: l.id,
    address,
    area,
    type: l.propertyType ?? 'Residential',
    bedrooms: l.bedrooms ?? 0,
    guidePrice: l.guidePrice,
    arv: l.arv ?? 0,
    status: stageMap[l.pipelineStage] ?? 'sourcing',
    description: l.notes ?? '',
    features: [],
    auctionDate: 'Contact for details',
    auctionTime: '',
    isOffMarket: l.isOffMarket,
    showOnWebsite: true,
    postcode: '',
    imageUrl: l.coverImage ?? undefined,
  }
}

function mapMRIProperty(p: MRIProperty): Lot {
  const parts = p.address.split(',')
  return {
    id: `mri-${p.id}`,
    address: parts[0].trim(),
    area: parts.length > 1 ? parts.slice(1).join(',').trim() : '',
    type: p.type || 'Residential',
    bedrooms: p.bedrooms,
    guidePrice: p.price,
    arv: 0,
    status: 'live' as LotStatus,
    description: p.description,
    features: [],
    auctionDate: 'Contact for details',
    auctionTime: '',
    isOffMarket: false,
    showOnWebsite: true,
    postcode: '',
  }
}

export default function PropertiesPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('All')
  const [sort, setSort] = useState<SortType>('newest')
  const [liveLots, setLiveLots] = useState<Lot[] | null>(null)
  const [mriCount, setMriCount] = useState(0)

  useEffect(() => {
    const osUrl = process.env.NEXT_PUBLIC_OS_URL

    const fetchOs = osUrl
      ? fetch(`${osUrl}/api/public/lots`)
          .then(r => r.ok ? r.json() : Promise.reject())
          .then((data: { lots: OsLot[] }) =>
            Array.isArray(data?.lots) ? data.lots.map(mapOsLot) : []
          )
          .catch(() => [] as Lot[])
      : Promise.resolve([] as Lot[])

    const fetchMri = fetch('/api/mri-properties')
      .then(r => r.ok ? r.json() : Promise.reject())
      .then((data: { properties: MRIProperty[] }) =>
        Array.isArray(data?.properties) ? data.properties.map(mapMRIProperty) : []
      )
      .catch(() => [] as Lot[])

    const fetchLocal = fetch('/api/public/properties')
      .then(r => r.ok ? r.json() : Promise.reject())
      .then((data: { properties: Array<{
        id: string; title: string; address: string; area: string;
        guidePrice: number; bedrooms: number | null; propertyType: string;
        stage: string; coverImage: string | null; videoUrl: string | null;
        images: LotImage[]; embeds: LotEmbed[];
        description: string | null; features: string | null;
        auctionDate: string | null; isOffMarket: boolean; createdAt: string;
      }> }) =>
        Array.isArray(data?.properties)
          ? data.properties.map(p => ({
              id: p.id,
              address: p.address.split(',')[0].trim(),
              area: p.area,
              type: p.propertyType ?? 'Residential',
              bedrooms: p.bedrooms ?? 0,
              guidePrice: p.guidePrice,
              arv: 0,
              status: 'sourcing' as LotStatus,
              description: p.description ?? '',
              features: p.features ? p.features.split('\n').filter(Boolean) : [],
              auctionDate: p.auctionDate ?? 'Contact for details',
              auctionTime: '',
              isOffMarket: p.isOffMarket,
              showOnWebsite: true,
              postcode: '',
              imageUrl: p.coverImage ?? (p.images?.[0]?.url) ?? undefined,
              images: p.images ?? [],
              embeds: p.embeds ?? [],
              videoUrl: p.videoUrl ?? undefined,
            }))
          : [] as Lot[]
      )
      .catch(() => [] as Lot[])

    Promise.all([fetchOs, fetchMri, fetchLocal]).then(([osLots, mriLots, localLots]) => {
      const localIds = new Set(localLots.map(l => l.id))
      const uniqueOs = osLots.filter(l => !localIds.has(l.id))
      const combined = [...localLots, ...uniqueOs, ...mriLots]
      if (combined.length > 0) {
        setLiveLots(combined)
        setMriCount(mriLots.length)
      }
    })
  }, [])

  const allLots = liveLots ?? staticLots.filter(l => l.showOnWebsite)
  const publicLots = allLots.filter(l => !l.isOffMarket)
  const offMarketCount = allLots.filter(l => l.isOffMarket).length

  const filtered = publicLots
    .filter(l =>
      activeFilter === 'Still Available'
        ? l.status === 'unsold'
        : matchesFilter(l.type, activeFilter)
    )
    .sort((a, b) => {
      if (sort === 'price_asc') return a.guidePrice - b.guidePrice
      if (sort === 'price_desc') return b.guidePrice - a.guidePrice
      const aNum = parseInt(a.id)
      const bNum = parseInt(b.id)
      if (!isNaN(aNum) && !isNaN(bNum)) return bNum - aNum
      return 0
    })

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="Active Lots"
          title="Current Properties"
          subtitle="Active lots across London and Essex. Legal packs available on request."
        />

        {liveLots !== null && (
          <div className="mb-6 flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-green-400">Live data from Midas OS</span>
            </div>
            {mriCount > 0 && (
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-xs text-blue-400">{mriCount} from MRI CRM</span>
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 bg-[#F8F7F4] border border-[#E8E5DE] rounded-xl p-5">
          {[
            { value: '28 days', label: 'Average time to completion' },
            { value: '10% deposit', label: 'Secured at hammer fall' },
            { value: '100% legal pack', label: 'Available before you bid' },
            { value: '340+ sold', label: 'Our track record' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-[#C9A84C] font-black text-xl mb-1">{value}</div>
              <div className="text-[#777] text-xs">{label}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap gap-2">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-2 text-sm rounded border transition-all ${
                  activeFilter === f
                    ? 'bg-[#C9A84C] text-[#080809] border-[#C9A84C] font-semibold'
                    : 'border-[#E0DDD4] text-[#666] hover:border-[#C9A84C] hover:text-[#1A1A1A]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <select
            value={sort}
            onChange={e => setSort(e.target.value as SortType)}
            className="bg-[#F8F7F4] border border-[#E0DDD4] text-[#444] text-sm px-3 py-2 rounded focus:outline-none focus:border-[#C9A84C]"
          >
            <option value="newest">Newest First</option>
            <option value="price_asc">Guide Price ↑</option>
            <option value="price_desc">Guide Price ↓</option>
          </select>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(lot => (
              <LotCard key={lot.id} lot={lot} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-[#888]">
            No properties match this filter.
          </div>
        )}

        <div className="mt-12 border border-[#D8D4CC] rounded-xl p-8 bg-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
          <div className="flex items-center gap-4">
            <Lock className="text-[#C9A84C] flex-shrink-0" size={32} />
            <div>
              <h3 className="text-[#1A1A1A] font-bold text-lg">
                🔐 {offMarketCount > 0 ? `+${offMarketCount} more` : 'More'} off-market properties available
              </h3>
              <p className="text-[#666] text-sm">
                Available to registered investors only. Not advertised publicly.
              </p>
            </div>
          </div>
          <Link
            href="/off-market"
            className="whitespace-nowrap bg-[#C9A84C] text-[#080809] font-semibold px-6 py-3 rounded hover:bg-[#E8C96A] transition-all flex-shrink-0"
          >
            Request Access →
          </Link>
        </div>

        <div className="mt-12">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="text-[#C9A84C]" size={18} />
            <h3 className="text-[#1A1A1A] font-bold">Recent Auction Results</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {pastAuctions.map(auction => (
              <div
                key={auction.title}
                className="bg-[#F8F7F4] border border-[#F0EDE6] rounded-lg p-4 text-center"
              >
                <div className="text-[#C9A84C] font-bold text-sm">{auction.totalRaised}</div>
                <div className="text-[#666] text-xs mt-1">{auction.title.replace('Midas ', '')}</div>
                <div className="text-[#999] text-[10px] mt-0.5">
                  {auction.sold}/{auction.lots} sold
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
