import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Off-Market Properties London | By Application Only',
  description:
    'Exclusive off-market property opportunities available to pre-qualified Midas investors only. Not advertised publicly. Apply for access below.',
  alternates: { canonical: 'https://www.midaspropertyauctions.co.uk/off-market' },
  openGraph: {
    title: 'Off-Market Properties London | By Application Only',
    description: 'Exclusive off-market property opportunities for pre-qualified investors only. Not advertised publicly.',
    url: 'https://www.midaspropertyauctions.co.uk/off-market',
  },
}

export default function OffMarketLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
