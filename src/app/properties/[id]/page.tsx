import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { lots, type Lot, type LotStatus } from '@/lib/data'
import { getSql, type PropertyRow } from '@/lib/db'
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

function getYouTubeId(url: string): string | null {
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
  return m ? m[1] : null
}

// Safely parse JSONB fields — handles both real arrays and legacy text-stringified values
// (Properties saved before the sql.json() fix may have images/embeds stored as text)
function parseJsonArray<T>(val: unknown): T[] {
  if (Array.isArray(val)) return val as T[]
  if (typeof val === 'string') {
    try { return JSON.parse(val) as T[] } catch { return [] }
  }
  return []
}

async function getLot(id: string): Promise<Lot | null> {
  // 1. Static data
  const staticLot = lots.find((l) => l.id === id)
  if (staticLot) return staticLot

  // 2. Website DB — handles UUID IDs from admin panel
  try {
    const sql = getSql()
    const [row] = await sql<PropertyRow[]>`
      SELECT * FROM properties WHERE id = ${id} LIMIT 1`
    if (row) {
      const displayAddress = row.address_visible && row.address
        ? `${row.address}, ${row.area}`
        : row.area
      const images = parseJsonArray<{url:string;caption?:string}>(row.images)
      const embeds = parseJsonArray<{url:string;title?:string}>(row.embeds)
      const coverImage = images[0]?.url ?? row.image_url ?? undefined
      return {
        id: row.id,
        address: row.address?.split(',')[0]?.trim() ?? row.title,
        area: row.area,
        type: row.property_type ?? 'Residential',
        bedrooms: row.bedrooms ?? 0,
        guidePrice: row.guide_price,
        arv: 0,
        status: stageMap[row.stage?.toLowerCase().replace(' ', '_') ?? ''] ?? 'sourcing',
        description: row.description ?? 'Property details available on request.',
        features: row.features ? row.features.split('\n').filter(Boolean) : [],
        auctionDate: row.auction_date ?? 'Contact for details',
        auctionTime: '',
        isOffMarket: row.is_off_market,
        showOnWebsite: row.show_on_website,
        postcode: displayAddress.match(/[A-Z]{1,2}[0-9][0-9A-Z]?\s?[0-9][A-Z]{2}/i)?.[0] ?? '',
        imageUrl: coverImage,
        images,
        embeds,
        videoUrl: row.video_url ?? undefined,
      }
    }
  } catch (err) {
    console.error('[property detail] DB lookup failed:', err)
  }

  return null
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
  const title = `${lot.address}${lot.area ? ', ' + lot.area : ''}, ${lot.type}`
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
      ...(lot.imageUrl ? { images: [{ url: lot.imageUrl }] } : {}),
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
  const coverImage = lot.images?.[0]?.url ?? lot.imageUrl ?? null
  const galleryImages = lot.images ?? []
  const embeds = lot.embeds ?? []

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
          <Link href="/guide/buying" className="text-[#C9A84C] text-xs font-semibold hover:text-[#E8C96A] transition-colors">
            Read our guide &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Left column */}
          <div className="lg:col-span-3">

            {/* Hero image */}
            <div className={`relative h-72 rounded-xl overflow-hidden mb-4 ${coverImage ? 'bg-[#080809]' : `bg-gradient-to-br ${gradient}`}`}>
              {coverImage && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={coverImage} alt={lot.address} className="w-full h-full object-cover" />
              )}
              <span className={`absolute top-4 left-4 text-xs font-bold px-3 py-1.5 rounded ${status.classes}`}>
                {status.label}
              </span>
              <span className="absolute top-4 right-4 text-xs px-3 py-1.5 rounded bg-black/60 text-[#E8E4DC]">
                {lot.type}
              </span>
            </div>

            {/* Image gallery — additional photos */}
            {galleryImages.length > 1 && (
              <div className="grid grid-cols-3 gap-2 mb-6">
                {galleryImages.slice(1).map((img, i) => (
                  <div key={i} className="relative aspect-video rounded-lg overflow-hidden bg-[#080809]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img.url} alt={img.caption ?? `Photo ${i + 2}`} className="w-full h-full object-cover" />
                    {img.caption && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-2 py-1">
                        <p className="text-white text-[10px] truncate">{img.caption}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-black text-[#1A1A1A] mb-2">{lot.address}</h1>
            <p className="text-[#666] text-lg mb-6">{lot.area}</p>

            {/* Description */}
            <div className="bg-white border border-[#E8E5DE] rounded-xl p-6 mb-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
              <h2 className="text-[#1A1A1A] font-bold text-lg mb-4">About This Property</h2>
              <p className="text-[#444] leading-relaxed">{lot.description}</p>
            </div>

            {/* Features */}
            {lot.features.length > 0 && (
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
            )}

            {/* Embeds — YouTube videos and iframes */}
            {embeds.length > 0 && (
              <div className="mb-6 space-y-4">
                {embeds.map((embed, i) => {
                  const ytId = getYouTubeId(embed.url)
                  return (
                    <div key={i} className="bg-white border border-[#E8E5DE] rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                      {embed.title && (
                        <div className="px-6 pt-4 pb-2">
                          <h3 className="text-[#1A1A1A] font-bold text-sm">{embed.title}</h3>
                        </div>
                      )}
                      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                        <iframe
                          src={ytId ? `https://www.youtube.com/embed/${ytId}` : embed.url}
                          className="absolute inset-0 w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          title={embed.title ?? `Video ${i + 1}`}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

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
                <p className="text-[#666] text-xs uppercase tracking-wider mb-2">Guide Price</p>
                <div className="text-4xl font-black text-[#C9A84C] mb-1">
                  {formatPrice(lot.guidePrice)}+
                </div>
                {lot.arv > 0 && (
                  <p className="text-[#888] text-sm mb-4">ARV: {formatPrice(lot.arv)}</p>
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

              <AIAnalysisCard lot={lot} />
              <FinanceCalculator guidePrice={lot.guidePrice} type={lot.type} />
              <AILegalPack />
              <RegisterInterestForm lotId={lot.id} lotAddress={lot.address} />
            </div>
          </div>
        </div>

        <div className="mt-10">
          <MarketData postcodeArea={lot.area} />
        </div>
      </div>
    </div>
  )
}
