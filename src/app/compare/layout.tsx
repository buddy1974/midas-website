import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Compare Properties Side by Side',
  description:
    'Use ARIA — the Midas AI — to compare any two auction lots side by side. Instant AI investment analysis. Find the better deal in seconds.',
}

export default function CompareLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
