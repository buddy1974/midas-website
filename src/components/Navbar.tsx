'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'

interface NavItem {
  label: string
  href?: string
  dropdown?: { label: string; href: string }[]
}

const navItems: NavItem[] = [
  {
    label: 'Auctions',
    dropdown: [
      { label: 'Current Auction Lots', href: '/properties' },
      { label: 'Future Auction Dates', href: '/auction-dates' },
      { label: 'Previous Auction Results', href: '/past-auctions' },
      { label: 'Lots Still Available', href: '/properties?status=unsold' },
      { label: 'Register to Bid', href: '/register' },
    ],
  },
  {
    label: 'Buy Property',
    dropdown: [
      { label: 'Buying a Property With Us', href: '/buy' },
      { label: 'Guide to Buying at Auction', href: '/guide/buying' },
      { label: 'Finance Your Property', href: '/finance' },
      { label: 'Private Treaty Services', href: '/private-treaty' },
    ],
  },
  {
    label: 'Sell Property',
    dropdown: [
      { label: 'Free Auction Valuation', href: '/valuation' },
      { label: 'Sell Your Property With Us', href: '/sell' },
      { label: 'Guide to Selling at Auction', href: '/guide/selling' },
      { label: 'Corporate & Probate Services', href: '/probate' },
      { label: 'Get an Instant Offer', href: '/instant-offer' },
    ],
  },
  {
    label: 'About',
    dropdown: [
      { label: 'About Us', href: '/about' },
      { label: 'Meet the Team', href: '/about#team' },
      { label: 'Blog', href: '/blog' },
      { label: 'Testimonials', href: '/testimonials' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'FAQs', href: '/faqs' },
    ],
  },
  { label: 'Finance', href: '/finance' },
]

function isActive(item: NavItem, pathname: string): boolean {
  if (item.href) {
    return pathname === item.href
  }
  return (item.dropdown ?? []).some(sub => {
    const path = sub.href.split('?')[0]
    return pathname === path || (path !== '/' && pathname.startsWith(path))
  })
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setMobileExpanded(null)
  }, [pathname])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E5E2DC]'
            : 'bg-white border-b border-[#E5E2DC]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Midas Property Group"
              width={140}
              height={48}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center">
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
                      className={`flex items-center px-3 py-5 text-sm transition-colors relative ${
                        active ? 'text-[#C9A84C]' : 'text-[#444] hover:text-[#1A1A1A]'
                      }`}
                    >
                      {item.label}
                      {active && (
                        <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#C9A84C]" />
                      )}
                    </Link>
                  ) : (
                    <button
                      className={`flex items-center gap-1 px-3 py-5 text-sm transition-colors relative ${
                        active ? 'text-[#C9A84C]' : 'text-[#444] hover:text-[#1A1A1A]'
                      }`}
                    >
                      {item.label}
                      <ChevronDown
                        size={13}
                        className={`transition-transform duration-200 ${
                          openDropdown === item.label ? 'rotate-180' : ''
                        }`}
                      />
                      {active && (
                        <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#C9A84C]" />
                      )}
                    </button>
                  )}

                  {/* Dropdown panel */}
                  {item.dropdown && openDropdown === item.label && (
                    <div className="absolute top-full left-0 w-64 z-50">
                      <div className="bg-[#0F0F14] border border-[rgba(201,168,76,0.25)] rounded-lg shadow-2xl py-1.5">
                        {item.dropdown.map(sub => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className="block px-4 py-2.5 text-sm text-[rgba(232,228,220,0.7)] hover:text-[#C9A84C] hover:bg-[rgba(201,168,76,0.06)] transition-colors"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              )
            })}
          </ul>

          {/* Right side — Free Valuation CTA */}
          <div className="hidden lg:flex items-center">
            <Link
              href="/valuation"
              className="bg-[#C9A84C] text-[#080809] text-sm font-semibold px-4 py-2 rounded hover:bg-[#E8C96A] transition-all hover:scale-[1.02]"
            >
              Free Valuation
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-[#1A1A1A] p-2"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] bg-white flex flex-col">
          <div className="flex items-center justify-between px-6 h-16 border-b border-[#E8E5DE]">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Midas Property Group"
                width={140}
                height={48}
                className="h-10 w-auto"
              />
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="text-[#1A1A1A] p-2"
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-6 py-2">
            <ul>
              {navItems.map(item => (
                <li key={item.label}>
                  {item.dropdown ? (
                    <div>
                      <button
                        onClick={() =>
                          setMobileExpanded(mobileExpanded === item.label ? null : item.label)
                        }
                        className="w-full flex items-center justify-between py-3.5 text-base font-medium text-[#333] border-b border-[#E8E5DE] hover:text-[#C9A84C] transition-colors"
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
                        <ul className="bg-[#F8F7F4] border-b border-[#E8E5DE]">
                          {item.dropdown.map(sub => (
                            <li key={sub.href}>
                              <Link
                                href={sub.href}
                                className="block px-4 py-3 text-sm text-[#555] hover:text-[#C9A84C] border-b border-[#EDEBE5] last:border-0 transition-colors"
                              >
                                {sub.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href ?? '/'}
                      className="block py-3.5 text-base font-medium text-[#333] border-b border-[#E8E5DE] hover:text-[#C9A84C] transition-colors"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-6 space-y-3 pb-6">
              <Link
                href="/valuation"
                className="block w-full text-center bg-[#C9A84C] text-[#080809] text-base font-bold px-6 py-4 rounded hover:bg-[#E8C96A] transition-colors"
              >
                Free Valuation
              </Link>
              <Link
                href="/register"
                className="block w-full text-center border border-[#C9A84C] text-[#C9A84C] text-base font-semibold px-6 py-4 rounded hover:bg-[rgba(201,168,76,0.05)] transition-colors"
              >
                Register to Bid
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}
