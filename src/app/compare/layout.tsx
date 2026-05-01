import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Compare Properties Side by Side | ARIA AI Analysis',
  description:
    'Use ARIA — the Midas AI — to compare any two auction lots side by side. Instant AI investment analysis. Find the better deal in seconds.',
  alternates: { canonical: 'https://www.midaspropertyauctions.co.uk/compare' },
  openGraph: {
    title: 'Compare Properties Side by Side | ARIA AI Analysis',
    description: 'ARIA AI compares two auction lots side by side. Instant investment analysis. Find the better deal in seconds.',
    url: 'https://www.midaspropertyauctions.co.uk/compare',
  },
}

export default function CompareLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
