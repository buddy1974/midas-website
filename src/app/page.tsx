'use client'

import { useState, useEffect } from 'react'
import LotCard from '@/components/LotCard'
import SectionHeader from '@/components/SectionHeader'
import StatCard from '@/components/StatCard'
import GoldButton from '@/components/GoldButton'
import Link from 'next/link'
import { lots, stats, team, upcomingAuctions, testimonials, blogPosts, type Lot, type LotStatus } from '@/lib/data'
import WhatsAppSignup from '@/components/WhatsAppSignup'

interface OsLot {
  id: string; address: string; guidePrice: number; arv: number | null
  bedrooms: number | null; propertyType: string | null; pipelineStage: string
  isOffMarket: boolean; notes: string | null
}

function mapOsLot(l: OsLot): Lot {
  const parts = l.address.split(',')
  const stageMap: Record<string, LotStatus> = { live: 'live', legal_pack: 'legal_pack' }
  return {
    id: l.id, address: parts[0].trim(),
    area: parts.length > 1 ? parts.slice(1).join(',').trim() : '',
    type: l.propertyType ?? 'Residential', bedrooms: l.bedrooms ?? 0,
    guidePrice: l.guidePrice, arv: l.arv ?? 0,
    status: stageMap[l.pipelineStage] ?? 'sourcing',
    description: l.notes ?? '', features: [],
    auctionDate: 'Contact for details', auctionTime: '',
    isOffMarket: l.isOffMarket, showOnWebsite: true, postcode: '',
  }
}

function useCountdown(targetDate: string) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const target = new Date(targetDate).getTime()
    const tick = () => {
      const diff = target - Date.now()
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      })
    }
    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [targetDate])

  return timeLeft
}

function CountdownBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="bg-white border border-[#E8E5DE] rounded-lg px-5 py-4 min-w-[72px] text-center shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
      <div className="text-3xl font-bold text-[#C9A84C]">{String(value).padStart(2, '0')}</div>
      <div className="text-[#666] text-xs uppercase tracking-wider mt-1">{label}</div>
    </div>
  )
}

export default function HomePage() {
  const countdown = useCountdown('2026-05-14T12:00:00Z')
  const [email, setEmail] = useState('')
  const [offEmail, setOffEmail] = useState('')
  const [offName, setOffName] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [offRequested, setOffRequested] = useState(false)
  const [liveLots, setLiveLots] = useState<Lot[] | null>(null)
  const [liveStats, setLiveStats] = useState<typeof stats | null>(null)

  useEffect(() => {
    const osUrl = process.env.NEXT_PUBLIC_OS_URL
    if (!osUrl) return
    fetch(`${osUrl}/api/public/lots`)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then((data: { lots: OsLot[] }) => {
        if (Array.isArray(data?.lots)) setLiveLots(data.lots.map(mapOsLot))
      })
      .catch(() => {})
    fetch(`${osUrl}/api/public/stats`)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then((data: { propertiesSold: number; activeInvestors: number; activeLots: number }) => {
        if (data && typeof data === 'object') {
          setLiveStats([
            { label: 'Properties Sold', value: `${data.propertiesSold}+` },
            { label: 'Active Investors', value: data.activeInvestors.toLocaleString() },
            { label: 'Years in Auctions', value: '15+' },
            { label: 'Avg. Days to Sold', value: '28' },
          ])
        }
      })
      .catch(() => {})
  }, [])

  const publicLots = (liveLots ?? lots.filter(l => l.showOnWebsite)).filter(l => !l.isOffMarket)
  const displayStats = liveStats ?? stats

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#080809]" />
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(201,168,76,0.07)] via-transparent to-transparent" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[rgba(201,168,76,0.04)] blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 pt-28 pb-20">
          <div className="max-w-3xl">
            <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-6">
              London &amp; Essex Premier Auction House
            </p>
            <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
              Where Committed Buyers
              <br />
              Meet{' '}
              <span className="text-[#C9A84C]">Committed Sellers</span>
            </h1>
            <p className="text-[rgba(232,228,220,0.65)] text-lg md:text-xl mb-10 leading-relaxed max-w-xl">
              Midas Property Auctions connects buyers, sellers, investors, solicitors and finance
              partners — making the process simple and smooth from start to finish.
            </p>
            <div className="flex flex-wrap gap-4">
              <GoldButton href="/properties" variant="filled" size="lg">
                View Current Lots
              </GoldButton>
              <GoldButton href="/buy#register" variant="outline" size="lg">
                Register to Bid
              </GoldButton>
            </div>
            <p className="mt-6 text-[#C9A84C] text-sm text-center">
              📱 Speak to Sam directly: 07454 753318
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {[
                { label: 'View Current Lots', href: '/properties' },
                { label: 'Register to Bid', href: '/register' },
                { label: 'Get Free Valuation', href: '/valuation' },
              ].map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="border border-[rgba(201,168,76,0.4)] text-[rgba(232,228,220,0.7)] text-sm px-4 py-2 rounded-full hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
                >
                  {label} →
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-20 border-t border-[rgba(201,168,76,0.15)] pt-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {displayStats.map((s) => (
                <StatCard key={s.label} value={s.value} label={s.label} />
              ))}
            </div>
          </div>

          <div className="mt-8 h-px bg-[#C9A84C] animate-gold-line origin-left" />
        </div>
      </section>

      {/* COUNTDOWN */}
      <section className="bg-[#F8F7F4] border-y border-[#E8E5DE] py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
            Next Auction
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-8">
            {upcomingAuctions[0].title} — {upcomingAuctions[0].date}
          </h2>
          <div className="flex justify-center gap-4 mb-8">
            <CountdownBox value={countdown.days} label="Days" />
            <CountdownBox value={countdown.hours} label="Hours" />
            <CountdownBox value={countdown.minutes} label="Mins" />
            <CountdownBox value={countdown.seconds} label="Secs" />
          </div>
          <p className="text-[#666] text-sm mb-8">
            {upcomingAuctions[0].lots} Lots · {upcomingAuctions[0].format} · Free to Register
          </p>
          <GoldButton href="/buy#register" variant="filled" size="md">
            Register Now →
          </GoldButton>
        </div>
      </section>

      {/* CURRENT LOTS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            eyebrow="Available Now"
            title="Current Lots"
            subtitle="Active properties across London and Essex. Legal packs available on request."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {publicLots.map((lot) => (
              <LotCard key={lot.id} lot={lot} />
            ))}
          </div>
          <div className="text-center mt-10">
            <GoldButton href="/properties" variant="outline">
              View All Properties →
            </GoldButton>
          </div>
        </div>
      </section>

      {/* WHATSAPP ALERTS */}
      <WhatsAppSignup />

      {/* OFF-MARKET TEASER */}
      <section className="py-16 bg-[#F8F7F4]">
        <div className="max-w-3xl mx-auto px-6">
          <div className="border border-[#E0DDD4] rounded-2xl p-8 md:p-12 text-center bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
            <div className="text-5xl mb-6">🔐</div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-4">
              Off-Market Properties
            </h2>
            <p className="text-[#666] mb-8 leading-relaxed">
              Selected investment opportunities shared only with pre-qualified investors. Not
              advertised publicly. Apply for off-market access below.
            </p>
            {offRequested ? (
              <div className="bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.3)] rounded-lg p-4 text-[#C9A84C]">
                ✓ Request received. Sam&apos;s team will be in touch within 24 hours.
              </div>
            ) : (
              <form
                onSubmit={async (e) => {
                  e.preventDefault()
                  await fetch('/api/offmarket-request', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: offName, email: offEmail }),
                  })
                  setOffRequested(true)
                }}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <input
                  type="text"
                  placeholder="Your name"
                  value={offName}
                  onChange={(e) => setOffName(e.target.value)}
                  required
                  className="flex-1 bg-[#F8F7F4] border border-[#E0DDD4] rounded px-4 py-3 text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:border-[#C9A84C] text-sm"
                />
                <input
                  type="email"
                  placeholder="Email address"
                  value={offEmail}
                  onChange={(e) => setOffEmail(e.target.value)}
                  required
                  className="flex-1 bg-[#F8F7F4] border border-[#E0DDD4] rounded px-4 py-3 text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:border-[#C9A84C] text-sm"
                />
                <GoldButton variant="filled" type="submit">
                  Request Access
                </GoldButton>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            eyebrow="What We Do"
            title="What we do"
            subtitle="We stand in the middle — connecting buyers to sellers, investors to opportunities, and clients to the trusted professionals they need."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: '📉',
                title: 'BMV Property Deals',
                desc: 'Our most requested service. We source below-market-value properties across the UK for investors ready to act quickly.',
              },
              {
                icon: '🏛',
                title: 'Auction Acquisitions & Disposals',
                desc: 'We help buyers acquire and sellers dispose of properties through established UK auction houses. Fast, certain, professionally managed.',
              },
              {
                icon: '🔐',
                title: 'Off-Market Properties',
                desc: 'Selected opportunities that never reach the open market — shared only with our registered investor network.',
              },
              {
                icon: '🏦',
                title: 'Private Lending Connections',
                desc: 'We connect buyers who need short-term finance with our trusted private lenders. Terms typically arranged within 48 hours.',
              },
              {
                icon: '⚖️',
                title: 'Legal & Professional Network',
                desc: 'We work with trusted solicitors and construction partners — you can use your own or we recommend professionals from our network.',
              },
              {
                icon: '🎙',
                title: 'Monthly Events & Webinars',
                desc: 'Regular property events featuring councils, legal experts, lenders and investors. Open to our full network.',
              },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="bg-white border border-[#E8E5DE] rounded-xl p-7 shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
              >
                <div className="text-3xl mb-4">{icon}</div>
                <h3 className="text-[#1A1A1A] font-bold text-lg mb-3">{title}</h3>
                <p className="text-[#666] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10 flex flex-wrap justify-center gap-4">
            <GoldButton href="/buy" variant="filled">
              Buy a Property
            </GoldButton>
            <GoldButton href="/sell" variant="outline">
              Sell Your Property
            </GoldButton>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-[#F8F7F4]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader eyebrow="What Clients Say" title="Trusted by Investors Across London" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map(({ text, name, location }) => (
              <div
                key={name}
                className="bg-white border border-[#E8E5DE] rounded-xl p-7 flex flex-col shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
              >
                <div className="text-[#C9A84C] text-3xl mb-4 font-serif">&ldquo;</div>
                <p className="text-[#444] text-sm leading-relaxed mb-6 flex-1">{text}</p>
                <div>
                  <div className="text-[#1A1A1A] font-semibold text-sm">{name}</div>
                  <div className="text-[#888] text-xs">{location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM PREVIEW */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            eyebrow="The Team"
            title="Meet the People Behind Midas"
            subtitle="Experienced professionals dedicated to getting you the best result."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-white border border-[#E8E5DE] rounded-xl p-6 text-center shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
              >
                <div className="w-16 h-16 rounded-full bg-[#C9A84C] flex items-center justify-center text-[#080809] font-black text-lg mx-auto mb-4">
                  {member.initials}
                </div>
                <h3 className="text-[#1A1A1A] font-bold mb-1">{member.name}</h3>
                <p className="text-[#C9A84C] text-xs uppercase tracking-wider mb-3">{member.role}</p>
                <p className="text-[#666] text-xs leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <GoldButton href="/about" variant="outline">
              Learn More About Us
            </GoldButton>
          </div>
        </div>
      </section>

      {/* LATEST NEWS */}
      <section className="py-20 bg-[#F8F7F4]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            eyebrow="Latest Articles"
            title="From the Midas Blog"
            subtitle="Market insights and auction guides from the Midas team."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {blogPosts.slice(0, 2).map(post => (
              <div
                key={post.slug}
                className="bg-white border border-[#E8E5DE] rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
              >
                <div className="bg-gradient-to-br from-[#0F0F14] to-[#1a1a2e] h-36 flex items-center justify-center">
                  <span className="bg-[rgba(201,168,76,0.15)] text-[#C9A84C] text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                    {post.category}
                  </span>
                </div>
                <div className="p-6">
                  <p className="text-[#888] text-xs mb-2">{post.date}</p>
                  <h3 className="font-bold text-[#1A1A1A] text-base mb-3 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-[#666] text-sm leading-relaxed mb-4">{post.excerpt}</p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-[#C9A84C] text-sm font-semibold hover:text-[#E8C96A] transition-colors"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <GoldButton href="/blog" variant="outline">
              View All Articles →
            </GoldButton>
          </div>
        </div>
      </section>

      {/* MAILING LIST */}
      <section className="py-20 bg-[#080809]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
            Stay in the Know
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Join 2,847 Investors
          </h2>
          <p className="text-[rgba(232,228,220,0.65)] mb-8">
            Enter your email to be the first to hear about new lots, auction dates and off-market
            opportunities.
          </p>
          {subscribed ? (
            <div className="bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.3)] rounded-lg p-4 text-[#C9A84C] max-w-sm mx-auto">
              ✓ You&apos;re subscribed. Welcome to the Midas investor network.
            </div>
          ) : (
            <>
              <form
                onSubmit={async (e) => {
                  e.preventDefault()
                  await fetch('/api/whatsapp-signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, source: 'mailing_list' }),
                  })
                  setSubscribed(true)
                }}
                className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto"
              >
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 bg-[rgba(255,255,255,0.05)] border border-[rgba(201,168,76,0.3)] rounded px-4 py-3 text-white placeholder-[rgba(232,228,220,0.4)] focus:outline-none focus:border-[#C9A84C] text-sm"
                />
                <GoldButton variant="filled" type="submit">
                  Subscribe
                </GoldButton>
              </form>
              <p className="text-[rgba(232,228,220,0.3)] text-xs mt-4">
                No spam. Unsubscribe anytime.
              </p>
            </>
          )}
        </div>
      </section>
    </>
  )
}
