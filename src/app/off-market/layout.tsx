import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Off-Market Properties | By Application Only',
  description:
    'Exclusive off-market property opportunities available to pre-qualified Midas investors only. Not advertised publicly. Apply for access below.',
}

export default function OffMarketLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
