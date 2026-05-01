import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { lots, type Lot, type LotStatus } from '@/lib/data'
import { Bed, Calendar, Clock, Phone, Eye } from 'lucide-react'
import RegisterInterestForm from './RegisterInterestForm'
import AIAnalysisCard from '@/components/lot/AIAnalysisCard'
import FinanceCalculator from '@/components/lot/FinanceCalculator'
import AILegalPack from '@/components/lot/AILegalPack'
import MarketData from '@/components/lot/MarketData'
import LegalPackRequestButton from '@/components/lot/LegalPackRequestButton'

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(price)
}

const statusConfig = {
  live: { label: 'LIVE NOW', classes: 'bg-red-600 text-white' },
  legal_pack: { label: 'LEGAL PACK READY', classes: 'bg-[#C9A84C] text-[#080809]' },
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

const stageMap: Record<string, LotStatus> = {
  live: 'live',
  legal_pack: 'legal_pack',
  sourcing: 'sourcing',
  completed: 'sourcing',
  unsold: 'sourcing',
}

async function getLot(id: string): Promise<Lot | null> {
  const staticLot = lots.find((l) => l.id === id)
  if (staticLot) return staticLot

  try {
    const osUrl = process.env.NEXT_PUBLIC_OS_URL
    if (!osUrl) return null
    const res = await fetch(`${osUrl}/api/public/lots`, { next: { revalidate: 60 } })
    if (!res.ok) return null
    const data = await res.json()
    const found = (data.lots ?? []).find((l: { id: string }) => l.id === id)
    if (!found) return null

    const parts = (found.address as string).split(',')
    return {
      id: found.id,
      address: parts[0].trim(),
      area: parts.length > 1 ? parts.slice(1).join(',').trim() : '',
      type: found.propertyType ?? found.property_type ?? 'Residential',
      bedrooms: found.bedrooms ?? 0,
      guidePrice: found.guidePrice ?? Math.round((found.guide_price ?? 0) / 100),
      arv: found.arv ?? Math.round((found.arv_pence ?? 0) / 100),
      status: stageMap[found.pipelineStage ?? found.pipeline_stage ?? ''] ?? 'sourcing',
      description: found.notes ?? 'Property details available on request.',
      features: [],
      auctionDate: 'Contact for details',
      auctionTime: '',
      isOffMarket: found.isOffMarket ?? found.is_off_market ?? false,
      showOnWebsite: true,
      postcode: (found.address as string).match(/[A-Z]{1,2}[0-9][0-9A-Z]?\s?[0-9][A-Z]{2}/i)?.[0] ?? '',
    }
  } catch {
    return null
  }
}

export const dynamicParams = true

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const lot = await getLot(id)
  if (!lot) return { title: 'Property Lot' }
  const title = `${lot.address}${lot.area ? ', ' + lot.area : ''} — ${lot.type}`
  const description = `${lot.type} at auction. Guide price ${new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(lot.guidePrice)}. Legal pack available. Register to bid with Midas Property Auctions.`
  const canonical = `https://www.midaspropertyauctions.co.uk/properties/${id}`
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: `${title} | Midas Property Auctions`,
      description,
      url: canonical,
    },
  }
}

export async function generateStaticParams() {
  return lots.filter((l) => !l.isOffMarket).map((lot) => ({ id: lot.id }))
}

export default async function LotPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const lot = await getLot(id)

  if (!lot) notFound()

  const gradient = typeGradient[lot.type] ?? 'from-gray-900 to-[#080809]'
  const status = statusConfig[lot.status]

  return (
    <div className="min-h-screen bg-white pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[#888] mb-4 pt-6">
          <Link href="/" className="hover:text-[#C9A84C] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/properties" className="hover:text-[#C9A84C] transition-colors">Properties</Link>
          <span>/</span>
          <span className="text-[#444]">{lot.address}</span>
        </nav>

        {/* First-time buyer nudge */}
        <div className="mb-6 flex items-center justify-between bg-[#F8F7F4] border border-[#E8E5DE] rounded-lg px-5 py-3">
          <p className="text-[#666] text-xs">First time buying at auction?</p>
          <Link
            href="/guide/buying"
            className="text-[#C9A84C] text-xs font-semibold hover:text-[#E8C96A] transition-colors"
          >
            Read our guide →
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Left column */}
          <div className="lg:col-span-3">
            {/* Hero image */}
            <div className={`relative h-72 rounded-xl bg-gradient-to-br ${gradient} overflow-hidden mb-8`}>
              <span className={`absolute top-4 left-4 text-xs font-bold px-3 py-1.5 rounded ${status.classes}`}>
                {status.label}
              </span>
              <span className="absolute top-4 right-4 text-xs px-3 py-1.5 rounded bg-black/60 text-[#E8E4DC]">
                {lot.type}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-black text-[#1A1A1A] mb-2">{lot.address}</h1>
            <p className="text-[#666] text-lg mb-6">{lot.area}</p>

            {/* Description */}
            <div className="bg-white border border-[#E8E5DE] rounded-xl p-6 mb-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
              <h2 className="text-[#1A1A1A] font-bold text-lg mb-4">About This Property</h2>
              <p className="text-[#444] leading-relaxed">{lot.description}</p>
            </div>

            {/* Features */}
            <div className="bg-white border border-[#E8E5DE] rounded-xl p-6 mb-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
              <h2 className="text-[#1A1A1A] font-bold text-lg mb-4">Key Features</h2>
              <div className="grid grid-cols-2 gap-3">
                {lot.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] flex-shrink-0" />
                    <span className="text-[#444] text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* About the area */}
            <div className="bg-white border border-[#E8E5DE] rounded-xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
              <h2 className="text-[#1A1A1A] font-bold text-lg mb-4">About the Area</h2>
              <p className="text-[#666] text-sm leading-relaxed">
                {lot.area} is a well-connected location with strong rental demand and excellent
                transport links into central London. The area benefits from a mix of residential and
                commercial activity, making it attractive for buy-to-let investors and developers
                alike. Local amenities, schools and green spaces are within easy reach.
              </p>
            </div>
          </div>

          {/* Right column — sticky */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 space-y-6">
              {/* Price card */}
              <div className="bg-white border border-[#D8D4CC] rounded-xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                <p className="text-[#666] text-xs uppercase tracking-wider mb-2">
                  Guide Price
                </p>
                <div className="text-4xl font-black text-[#C9A84C] mb-1">
                  {formatPrice(lot.guidePrice)}+
                </div>
                {lot.arv > 0 && (
                  <p className="text-[#888] text-sm mb-4">
                    ARV: {formatPrice(lot.arv)}
                  </p>
                )}

                <div className="border-t border-[#F0EDE6] pt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-[#666]">
                    <Calendar size={14} className="text-[#C9A84C]" />
                    <span>{lot.auctionDate}</span>
                  </div>
                  {lot.auctionTime && lot.auctionTime !== 'By Appointment' && (
                    <div className="flex items-center gap-2 text-sm text-[#666]">
                      <Clock size={14} className="text-[#C9A84C]" />
                      <span>{lot.auctionTime}</span>
                    </div>
                  )}
                  {lot.bedrooms > 0 && (
                    <div className="flex items-center gap-2 text-sm text-[#666]">
                      <Bed size={14} className="text-[#C9A84C]" />
                      <span>{lot.bedrooms} bedrooms</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action buttons */}
              <div className="space-y-3">
                <LegalPackRequestButton lotId={lot.id} lotAddress={lot.address} />
                <Link
                  href={`/contact?subject=Viewing+Request&lot=${encodeURIComponent(lot.address)}`}
                  className="flex items-center justify-center gap-2 w-full border border-[#C9A84C] text-[#C9A84C] font-bold py-3.5 rounded-lg hover:bg-[#C9A84C] hover:text-[#080809] transition-all text-sm"
                >
                  <Eye size={16} /> Book a Viewing
                </Link>
                <a
                  href="tel:+442072062691"
                  className="flex items-center justify-center gap-2 w-full bg-white border border-[#E0DDD4] text-[#1A1A1A] font-bold py-3.5 rounded-lg hover:border-[#C9A84C] transition-all text-sm"
                >
                  <Phone size={16} /> Speak to the Team
                </a>
              </div>

              {/* AI Deal Analysis */}
              <AIAnalysisCard lot={lot} />

              {/* Finance Calculator */}
              <FinanceCalculator guidePrice={lot.guidePrice} type={lot.type} />

              {/* AI Legal Pack Summary */}
              <AILegalPack />

              {/* Register interest form */}
              <RegisterInterestForm lotId={lot.id} lotAddress={lot.address} />
            </div>
          </div>
        </div>

        {/* Market Data — full width below columns */}
        <div className="mt-10">
          <MarketData postcodeArea={lot.area} />
        </div>
      </div>
    </div>
  )
}
