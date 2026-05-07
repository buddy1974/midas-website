'use client'

import Image from 'next/image'

interface Props { data: Record<string, string> }

export default function ImageFullSection({ data }: Props) {
  const height = parseInt(data.height || '400', 10)
  return (
    <section>
      {data.imageUrl ? (
        <div style={{ position: 'relative', width: '100%', height }}>
          <Image src={data.imageUrl} alt={data.alt || ''} fill style={{ objectFit: 'cover' }} />
        </div>
      ) : (
        <div style={{ width: '100%', height, background: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ color: '#666' }}>Add an image URL in the properties panel →</p>
        </div>
      )}
      {data.caption && (
        <div style={{ background: '#0d0d0d', padding: '10px 24px', textAlign: 'center' }}>
          <p style={{ color: '#888', fontSize: 13, margin: 0 }}>{data.caption}</p>
        </div>
      )}
    </section>
  )
}
