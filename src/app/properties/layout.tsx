import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Current Auction Lots',
  description:
    'Browse current auction lots across London and Essex. HMOs, residential, commercial and development sites. Legal packs available. Register to bid today.',
}

export default function PropertiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
