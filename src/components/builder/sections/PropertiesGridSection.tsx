'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import LotCard from '@/components/LotCard'
import type { Lot, LotStatus } from '@/lib/data'
import type { PropertyRow } from '@/lib/db'

interface Props { data: Record<string, string>; bg?: string }

function stageToStatus(stage: string): LotStatus {
  const map: Record<string, LotStatus> = { 'Legal Pack': 'legal_pack', 'Going to Auction': 'live', 'Live': 'live', 'Sold': 'unsold' }
  return map[stage] ?? 'sourcing'
}

function dbToLot(p: PropertyRow): Lot {
  let features: string[] = []
  try { features = p.features ? (JSON.parse(p.features) as string[]) : [] } catch { features = [] }
  return { id: p.id, address: p.title, area: p.area, type: p.property_type, bedrooms: p.bedrooms ?? 0, guidePrice: p.guide_price, arv: 0, status: stageToStatus(p.stage), description: p.description ?? '', features, auctionDate: p.auction_date ?? 'Contact for details', auctionTime: '', isOffMarket: p.is_off_market, showOnWebsite: p.show_on_website, postcode: '' }
}

export default function PropertiesGridSection({ data, bg }: Props) {
  const [lots, setLots] = useState<Lot[]>([])
  const isDark = bg === 'dark'
  const max = parseInt(data.maxItems || '6', 10)

  useEffect(() => {
    fetch('/api/mri-properties')
      .then(r => r.json())
      .then((d: PropertyRow[]) => {
        const filtered = (d || []).filter(p => p.show_on_website)
        setLots(filtered.slice(0, max).map(dbToLot))
      })
      .catch(() => setLots([]))
  }, [max])

  return (
    <section style={{ background: isDark ? '#0d0d0d' : bg === 'cream' ? '#fdf9f0' : '#fff', padding: '72px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {data.heading && (
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ color: isDark ? '#fff' : '#1a1209', fontSize: 32, fontWeight: 300, marginBottom: 10 }}>{data.heading}</h2>
            {data.subheading && <p style={{ color: isDark ? 'rgba(255,255,255,0.55)' : '#777', fontSize: 16 }}>{data.subheading}</p>}
          </div>
        )}
        {lots.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
            {lots.map(lot => <LotCard key={lot.id} lot={lot} />)}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: 32, border: `2px dashed ${isDark ? '#2a2a2a' : '#e0d8c8'}`, borderRadius: 8, color: '#888' }}>
            Properties will appear here when published
          </div>
        )}
        {data.ctaText && (
          <div style={{ textAlign: 'center', marginTop: 36 }}>
            <Link href={data.ctaUrl || '/current-auction'} style={{ background: '#C9A84C', color: '#000', padding: '13px 32px', borderRadius: 3, fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', textDecoration: 'none', display: 'inline-block' }}>
              {data.ctaText}
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
