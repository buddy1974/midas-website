'use client'

import Link from 'next/link'

interface AuctionCard {
  badge: string
  title: string
  subtitle: string
  body: string
  cta1Text: string
  cta1Url: string
  cta2Text?: string
  cta2Url?: string
}

interface Props { data: Record<string, string>; preview?: boolean }

const DEFAULT_CARDS: AuctionCard[] = [
  {
    badge: 'UPCOMING',
    title: 'Properties Going to Auction',
    subtitle: 'Next Auction: Contact for Dates',
    body: 'Browse properties we are currently listing through our network of partner auction companies across London, Essex and nationwide.',
    cta1Text: 'View Lots →',
    cta1Url: '/current-auction',
    cta2Text: 'Register',
    cta2Url: '/register',
  },
  {
    badge: 'ONLINE',
    title: 'Timed Auction',
    subtitle: 'Weekly Online Auctions',
    body: 'View all properties in our upcoming online weekly auction. Bid from anywhere, any time.',
    cta1Text: 'View Lots →',
    cta1Url: '/timed-auction',
  },
  {
    badge: 'EXCLUSIVE',
    title: 'Off-Market Properties',
    subtitle: 'Password-Protected Access',
    body: 'Pre-qualified investors only. Properties never listed publicly. Access by application.',
    cta1Text: 'Request Access →',
    cta1Url: '/off-market',
  },
  {
    badge: 'FREE',
    title: 'Auction Valuation',
    subtitle: 'No Obligation Appraisal',
    body: 'Request a free auction appraisal for your land or property. Response within 24 hours.',
    cta1Text: 'Request A Valuation →',
    cta1Url: '/valuation',
  },
]

export default function AuctionTypesSection({ data, preview }: Props) {
  let cards: AuctionCard[] = DEFAULT_CARDS
  if (data.cards) {
    try { cards = JSON.parse(data.cards) as AuctionCard[] } catch { cards = DEFAULT_CARDS }
  }

  return (
    <section style={{ background: '#080809', padding: '40px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {cards.map((card, i) => (
          <div key={i} style={{
            background: 'linear-gradient(to bottom, #1a1a2e, #0d0d14)',
            border: '1px solid rgba(201,168,76,0.3)',
            borderRadius: 12,
            padding: 28,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: 260,
          }}>
            <div>
              <p style={{ color: '#C9A84C', fontSize: 9, letterSpacing: 4, textTransform: 'uppercase', fontWeight: 700, marginBottom: 8, margin: '0 0 8px' }}>
                {card.badge}
              </p>
              <h2 style={{ color: '#E8E4DC', fontWeight: 900, fontSize: 18, marginBottom: 6, margin: '0 0 6px', lineHeight: 1.2 }}>
                {card.title}
              </h2>
              <p style={{ color: 'rgba(232,228,220,0.5)', fontSize: 11, marginBottom: 12, margin: '0 0 12px' }}>
                {card.subtitle}
              </p>
              <p style={{ color: 'rgba(232,228,220,0.6)', fontSize: 13, lineHeight: 1.6, marginBottom: 24, margin: '0 0 24px' }}>
                {card.body}
              </p>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {preview ? (
                <span style={{ background: '#C9A84C', color: '#080809', fontSize: 11, fontWeight: 700, padding: '7px 16px', borderRadius: 4 }}>{card.cta1Text}</span>
              ) : (
                <Link href={card.cta1Url} style={{ background: '#C9A84C', color: '#080809', fontSize: 11, fontWeight: 700, padding: '8px 18px', borderRadius: 4, textDecoration: 'none', display: 'inline-block' }}>
                  {card.cta1Text}
                </Link>
              )}
              {card.cta2Text && (
                preview
                  ? <span style={{ border: '1px solid rgba(201,168,76,0.4)', color: 'rgba(232,228,220,0.7)', fontSize: 11, padding: '7px 16px', borderRadius: 4 }}>{card.cta2Text}</span>
                  : <Link href={card.cta2Url || '#'} style={{ border: '1px solid rgba(201,168,76,0.4)', color: 'rgba(232,228,220,0.7)', fontSize: 11, padding: '8px 18px', borderRadius: 4, textDecoration: 'none', display: 'inline-block' }}>
                      {card.cta2Text}
                    </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
