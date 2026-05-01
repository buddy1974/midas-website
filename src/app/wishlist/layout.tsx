import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Saved Properties | Wishlist',
  description: 'Your saved Midas auction lots. Review, compare and register interest in the properties you have shortlisted.',
  robots: { index: false, follow: false },
}

export default function WishlistLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
