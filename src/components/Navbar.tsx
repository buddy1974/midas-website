'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown, Heart } from 'lucide-react'

// ── Nav structure ─────────────────────────────────────────────────────────────

interface DropdownItem {
  label: string
  href: string
  isHeader?: boolean
}

interface NavItem {
  label: string
  href?: string
  dropdown?: DropdownItem[]
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Buy Property',
    dropdown: [
      { label: 'PROPERTIES', href: '', isHeader: true },
      { label: 'Current Lots', href: '/current-auction' },
      { label: 'Available Properties', href: '/properties' },
      { label: 'Off-Market Properties', href: '/off-market' },
      { label: 'Future Auction Dates', href: '/auction-dates' },
      { label: 'BUYING GUIDES', href: '', isHeader: true },
      { label: 'Buying With Us', href: '/buy' },
      { label: 'Guide to Buying at Auction', href: '/guide/buying' },
      { label: 'Guide to Timed Auction', href: '/guide/buying-timed' },
      { label: 'Finance Your Purchase', href: '/finance' },
      { label: 'AML Requirements', href: '/aml' },
    ],
  },
  {
    label: 'Sell Property',
    dropdown: [
      { label: 'Sell With Us', href: '/sell' },
      { label: 'Free Valuation', href: '/valuation' },
      { label: 'Guide to Selling', href: '/guide/selling' },
      { label: 'Corporate & Probate', href: '/probate' },
      { label: 'Get Instant Offer', href: '/instant-offer' },
      { label: 'Past Sales', href: '/past-auctions' },
    ],
  },
  { label: 'Instant Cash Offer', href: '/instant-offer' },
  { label: 'Events', href: '/events' },
  {
    label: 'About',
    dropdown: [
      { label: 'About Us', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Testimonials', href: '/testimonials' },
      { label: 'FAQs', href: '/faqs' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
]

// ── Helpers ───────────────────────────────────────────────────────────────────

function isActive(item: NavItem, pathname: string): boolean {
  if (item.href) return pathname === item.href
  return (item.dropdown ?? []).some(sub => {
    if (sub.isHeader) return false
    const path = sub.href.split('?')[0]
    return pathname === path || (path !== '/' && pathname.startsWith(path))
  })
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const [wishlistCount, setWishlistCount] = useState(0)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setMobileExpanded(null)
  }, [pathname])

  useEffect(() => {
    try {
      const stored = localStorage.getItem('midas_wishlist')
      const items: unknown = stored ? JSON.parse(stored) : []
      setWishlistCount(Array.isArray(items) ? items.length : 0)
    } catch {
      setWishlistCount(0)
    }
  }, [pathname])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 bg-[#080809] transition-all duration-300 ${
          scrolled
            ? 'border-b border-[rgba(201,168,76,0.2)] shadow-lg shadow-black/40'
            : 'border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src="/logo-midas-white--REMIX.png"
              alt="Midas Property Auctions"
              width={160}
              height={48}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden xl:flex items-center flex-1 justify-center">
            {navItems.map(item => {
              const active = isActive(item, pathname)
              return (
                <li
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.dropdown && setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  {item.href ? (
                    <Link
                      href={item.href}
                      className={`flex items-center px-3 py-5 text-[13px] font-medium transition-colors relative ${
                        active ? 'text-[#C9A84C]' : 'text-[rgba(232,228,220,0.75)] hover:text-[#C9A84C]'
                      }`}
                    >
                      {item.label}
                      {active && (
                        <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#C9A84C]" />
                      )}
                    </Link>
                  ) : (
                    <button
                      className={`flex items-center gap-1 px-3 py-5 text-[13px] font-medium transition-colors relative ${
                        active ? 'text-[#C9A84C]' : 'text-[rgba(232,228,220,0.75)] hover:text-[#C9A84C]'
                      }`}
                    >
                      {item.label}
                      <ChevronDown
                        size={12}
                        className={`transition-transform duration-200 ${
                          openDropdown === item.label ? 'rotate-180' : ''
                        }`}
                      />
                      {active && (
                        <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#C9A84C]" />
                      )}
                    </button>
                  )}

                  {/* Dropdown */}
                  {item.dropdown && openDropdown === item.label && (
                    <div className="absolute top-full left-0 w-72 z-50">
                      <div
                        className="rounded-b-xl shadow-2xl shadow-black/60 py-2"
                        style={{
                          backgroundColor: '#0D0D14',
                          border: '1px solid rgba(201,168,76,0.2)',
                          borderTopColor: '#C9A84C',
                          borderTopWidth: '2px',
                        }}
                      >
                        {item.dropdown.map((sub, i) =>
                          sub.isHeader ? (
                            <div
                              key={`${sub.label}-${i}`}
                              className="px-6 pt-4 pb-1.5"
                            >
                              <span className="text-[#C9A84C] text-[9px] uppercase tracking-[0.2em] font-bold">
                                {sub.label}
                              </span>
                            </div>
                          ) : sub.href.startsWith('http') ? (
                            <a
                              key={sub.href}
                              href={sub.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block px-6 py-2.5 text-sm text-[rgba(232,228,220,0.75)] hover:text-[#C9A84C] hover:bg-[rgba(201,168,76,0.06)] transition-all duration-150 italic"
                            >
                              {sub.label}
                            </a>
                          ) : (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              className="block px-6 py-2.5 text-sm text-[rgba(232,228,220,0.75)] hover:text-[#C9A84C] hover:bg-[rgba(201,168,76,0.06)] transition-all duration-150"
                            >
                              {sub.label}
                            </Link>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </li>
              )
            })}
          </ul>

          {/* Right side */}
          <div className="hidden xl:flex items-center gap-3 flex-shrink-0">
            {/* Wishlist */}
            <Link href="/wishlist" className="relative text-[rgba(232,228,220,0.6)] hover:text-[#C9A84C] transition-colors">
              <Heart size={18} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#C9A84C] text-[#080809] text-[9px] font-black flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Contact Us */}
            <Link
              href="/contact"
              className="flex items-center gap-1.5 text-[rgba(232,228,220,0.75)] text-xs font-medium hover:text-[#C9A84C] transition-colors border border-[rgba(201,168,76,0.35)] px-3 py-1.5 rounded hover:border-[#C9A84C]"
            >
              Contact Us
            </Link>

            {/* Team Login */}
            <a
              href="https://os.midaspropertyauctions.co.uk/login"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[rgba(232,228,220,0.5)] text-xs hover:text-[#C9A84C] transition-colors border border-[rgba(201,168,76,0.2)] px-3 py-1.5 rounded"
            >
              Team Login →
            </a>

            {/* Free Valuation CTA */}
            <Link
              href="/valuation"
              className="bg-[#C9A84C] text-[#080809] text-sm font-bold px-4 py-2 rounded hover:bg-[#E8C96A] transition-all hover:scale-[1.02]"
            >
              Free Valuation
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="xl:hidden text-[rgba(232,228,220,0.75)] p-2 hover:text-[#C9A84C] transition-colors"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] bg-[#080809] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 h-16 border-b border-[rgba(201,168,76,0.15)]">
            <Link href="/" className="flex items-center">
              <Image src="/logo-midas-white--REMIX.png" alt="Midas Property Auctions" width={130} height={40} className="h-8 w-auto" />
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="text-[rgba(232,228,220,0.75)] p-2 hover:text-[#C9A84C] transition-colors"
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>

          {/* Nav items */}
          <nav className="flex-1 overflow-y-auto px-6 py-4">
            <ul>
              {navItems.map(item => (
                <li key={item.label}>
                  {item.dropdown ? (
                    <div>
                      <button
                        onClick={() =>
                          setMobileExpanded(mobileExpanded === item.label ? null : item.label)
                        }
                        className="w-full flex items-center justify-between py-4 text-base font-medium text-[rgba(232,228,220,0.85)] border-b border-[rgba(201,168,76,0.1)] hover:text-[#C9A84C] transition-colors"
                      >
                        {item.label}
                        <ChevronDown
                          size={16}
                          className={`transition-transform duration-200 ${
                            mobileExpanded === item.label ? 'rotate-180 text-[#C9A84C]' : ''
                          }`}
                        />
                      </button>
                      {mobileExpanded === item.label && (
                        <ul className="border-l-2 border-[#C9A84C] ml-4 border-b border-[rgba(201,168,76,0.1)]">
                          {item.dropdown.map((sub, i) =>
                            sub.isHeader ? (
                              <li key={`${sub.label}-${i}`} className="px-4 pt-3 pb-1">
                                <span className="text-[#C9A84C] text-[9px] uppercase tracking-[0.2em] font-bold">
                                  {sub.label}
                                </span>
                              </li>
                            ) : (
                              <li key={sub.href}>
                                <Link
                                  href={sub.href}
                                  className="block px-4 py-2.5 text-sm text-[rgba(232,228,220,0.6)] hover:text-[#C9A84C] transition-colors"
                                >
                                  {sub.label}
                                </Link>
                              </li>
                            )
                          )}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href ?? '/'}
                      className="block py-4 text-base font-medium text-[rgba(232,228,220,0.85)] border-b border-[rgba(201,168,76,0.1)] hover:text-[#C9A84C] transition-colors"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            {/* Bottom CTAs */}
            <div className="mt-8 space-y-3 pb-8">
              <Link
                href="/contact"
                className="flex items-center justify-center w-full border border-[rgba(201,168,76,0.4)] text-[rgba(232,228,220,0.85)] text-base font-semibold px-6 py-4 rounded hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
              >
                Contact Us
              </Link>
              <Link
                href="/valuation"
                className="block w-full text-center bg-[#C9A84C] text-[#080809] text-base font-bold px-6 py-4 rounded hover:bg-[#E8C96A] transition-colors"
              >
                Free Valuation
              </Link>
              <Link
                href="/register"
                className="block w-full text-center border border-[rgba(201,168,76,0.4)] text-[rgba(232,228,220,0.8)] text-base font-semibold px-6 py-4 rounded hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
              >
                Register to Bid
              </Link>
              <Link
                href="/wishlist"
                className="flex items-center justify-center gap-2 w-full text-[rgba(232,228,220,0.5)] text-sm py-3 hover:text-[#C9A84C] transition-colors"
              >
                <Heart size={16} />
                Saved Properties
                {wishlistCount > 0 && (
                  <span className="bg-[#C9A84C] text-[#080809] text-xs font-black px-2 py-0.5 rounded-full">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <a
                href="https://os.midaspropertyauctions.co.uk/login"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-xs text-[rgba(232,228,220,0.4)] py-3 border-t border-[rgba(201,168,76,0.1)] hover:text-[#C9A84C] transition-colors"
              >
                Team Login — Midas OS →
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}
