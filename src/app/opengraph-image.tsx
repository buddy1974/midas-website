import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Midas Property Auctions'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #080809 0%, #1a1a2e 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{
          color: '#C9A84C',
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          marginBottom: 16,
        }}>
          MIDAS PROPERTY AUCTIONS
        </div>
        <div style={{
          color: '#E8E4DC',
          fontSize: 48,
          fontWeight: 900,
          textAlign: 'center',
          maxWidth: 900,
          lineHeight: 1.2,
          marginBottom: 24,
        }}>
          London, Essex & Nationwide
          Property Brokerage
        </div>
        <div style={{
          color: 'rgba(232,228,220,0.6)',
          fontSize: 22,
          textAlign: 'center',
          maxWidth: 800,
        }}>
          Connecting buyers, sellers and investors
          through established UK auction companies
        </div>
        <div style={{
          marginTop: 40,
          padding: '12px 32px',
          background: '#C9A84C',
          color: '#080809',
          fontSize: 18,
          fontWeight: 700,
          borderRadius: 8,
        }}>
          midaspropertyauctions.co.uk
        </div>
      </div>
    ),
    { ...size }
  )
}
