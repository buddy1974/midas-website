import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Current Auction Lots | Browse Properties Going to Auction',
  description:
    'Browse current auction lots across London and Essex. HMOs, residential, commercial and development sites. Legal packs available. Register to bid today.',
  alternates: { canonical: 'https://www.midaspropertyauctions.co.uk/properties' },
  openGraph: {
    title: 'Current Auction Lots | Browse Properties Going to Auction',
    description: 'HMOs, residential, commercial and development sites across London and Essex. Legal packs available. Register to bid.',
    url: 'https://www.midaspropertyauctions.co.uk/properties',
  },
}

export default function PropertiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
