import type { Metadata } from 'next'
import SectionHeader from '@/components/SectionHeader'
import GoldButton from '@/components/GoldButton'
import { upcomingAuctions, pastAuctions } from '@/lib/data'
import { Calendar, Clock, Monitor, Package, TrendingUp } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Upcoming Auctions & Events | 97% Clearance Rate',
  description:
    'View upcoming Midas property auctions and register to bid online. Track record of 97% clearance rate across all auctions. Networking events across London.',
  alternates: { canonical: 'https://www.midaspropertyauctions.co.uk/events' },
  openGraph: {
    title: 'Upcoming Auctions & Events | 97% Clearance Rate',
    description: 'Upcoming property auctions. 97% clearance rate. Register to bid online. Networking events across London.',
    url: 'https://www.midaspropertyauctions.co.uk/events',
  },
}

interface OsEvent {
  id: string
  title: string
  eventType: string
  eventDate: string
  endTime: string | null
  location: string | null
  description: string | null
  maxCapacity: number | null
  pricePence: number
}

interface RenderEvent {
  id: string
  title: string
  description: string
  date: string
  time: string
  format: string
  lots: number
  status: string
}

function mapOsEvent(e: OsEvent): RenderEvent {
  const d = new Date(e.eventDate)
  const isOnline = (e.location ?? '').toLowerCase().includes('zoom') ||
    (e.location ?? '').toLowerCase().includes('online')
  return {
    id: e.id,
    title: e.title,
    description: e.description ?? '',
    date: d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
    time: d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
    format: isOnline ? 'Online — Live Stream' : (e.location ?? e.eventType),
    lots: 0,
    status: 'Registrations Open',
  }
}

async function getLiveEvents(): Promise<RenderEvent[] | null> {
  try {
    const osUrl = process.env.NEXT_PUBLIC_OS_URL
    if (!osUrl) return null
    const res = await fetch(`${osUrl}/api/public/events`, { next: { revalidate: 60 } })
    if (!res.ok) return null
    const data = await res.json() as { events?: OsEvent[] }
    if (!Array.isArray(data?.events) || data.events.length === 0) return null
    return data.events.map(mapOsEvent)
  } catch {
    return null
  }
}

export default async function EventsPage() {
  const liveEvents = await getLiveEvents()
  const displayEvents: RenderEvent[] = liveEvents ?? upcomingAuctions.map(e => ({
    ...e, lots: (e as typeof upcomingAuctions[0]).lots,
  }))
  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        {/* Midas Property Events intro */}
        <section className="text-center py-16">
          <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
            Midas Property Events
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-[#1A1A1A] mb-6">
            Midas Property Events
          </h1>
          <p className="text-[#666] text-lg mb-6 max-w-2xl mx-auto leading-relaxed">
            Every month we organise in-person and online events and webinars bringing together
            experts from across the property industry.
          </p>
          <p className="text-[#666] text-sm mb-6 max-w-2xl mx-auto leading-relaxed">
            At these events we invite speakers from local councils, legal and law departments,
            property investment, finance and lending, and marketing — coming together to teach,
            learn and network around the UK property market.
          </p>
          <p className="text-[#666] text-sm mb-10 max-w-xl mx-auto">
            These events are open to investors, buyers, sellers and anyone serious about property.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-4">
            {[
              {
                icon: '🎥',
                title: 'Online Webinars',
                desc: 'Expert-led sessions you can join from anywhere. Recorded and available after.',
              },
              {
                icon: '🤝',
                title: 'In-Person Networking',
                desc: 'High-quality evenings with industry professionals, speakers and investors.',
              },
              {
                icon: '🏛',
                title: 'Pre-Auction Briefings',
                desc: 'Join Sam before each auction for a live Q&A on the lots, legal packs and bidding strategy.',
              },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="bg-white border border-[#E8E5DE] rounded-xl p-6 text-left shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
              >
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="text-[#1A1A1A] font-bold mb-2">{title}</h3>
                <p className="text-[#666] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Auction calendar heading */}
        <section className="text-center pb-10">
          <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
            Auction Calendar
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-[#1A1A1A] mb-4">
            Upcoming Auctions
          </h2>
          <p className="text-[#666] text-lg">
            Register free for any upcoming auction. Bid online from anywhere in the world. No
            physical attendance required.
          </p>
        </section>

        {/* Upcoming auctions */}
        <section className="mb-16">
          <SectionHeader eyebrow="Coming Up" title="Upcoming Events" align="left" />
          {liveEvents !== null && (
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-green-400">Live data from Midas OS</span>
            </div>
          )}
          <div className="space-y-6">
            {displayEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white border border-[#E0DDD4] rounded-xl p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded ${
                        event.status === 'Registrations Open'
                          ? 'bg-[#C9A84C] text-[#080809]'
                          : 'bg-white border border-[#C9A84C]/30 text-[#C9A84C]'
                      }`}
                    >
                      {event.status}
                    </span>
                  </div>
                  <h3 className="text-[#1A1A1A] font-bold text-xl mb-3">{event.title}</h3>
                  <p className="text-[#666] text-sm mb-4 leading-relaxed">
                    {event.description}
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2 text-[#666] text-sm">
                      <Calendar size={14} className="text-[#C9A84C]" />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-2 text-[#666] text-sm">
                      <Clock size={14} className="text-[#C9A84C]" />
                      {event.time}
                    </div>
                    <div className="flex items-center gap-2 text-[#666] text-sm">
                      <Monitor size={14} className="text-[#C9A84C]" />
                      {event.format}
                    </div>
                    {event.lots > 0 && (
                      <div className="flex items-center gap-2 text-[#666] text-sm">
                        <Package size={14} className="text-[#C9A84C]" />
                        {event.lots} Lots
                      </div>
                    )}
                  </div>
                </div>
                {event.status === 'Registrations Open' ? (
                  <GoldButton href="/register" variant="filled">
                    Register Free
                  </GoldButton>
                ) : (
                  <GoldButton href="/sell" variant="outline">
                    List Your Property
                  </GoldButton>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="bg-[#F8F7F4] rounded-2xl p-8 md:p-10 mb-16">
          <SectionHeader eyebrow="On the Day" title="How the Auction Works" align="left" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Register Before Auction',
                desc: 'Free registration. Verify your ID online. Approved bidders receive their login credentials for the live bidding platform at least 48 hours before auction day.',
              },
              {
                step: '02',
                title: 'Bid Live Online',
                desc: 'Watch the livestream and place bids in real time from your phone, tablet or desktop. Our auctioneers conduct a professional live stream with full commentary.',
              },
              {
                step: '03',
                title: 'Exchange on the Day',
                desc: 'The winning bid triggers immediate exchange of contracts. A 10% deposit is required on the day. Legal completion must occur within 28 days of the auction.',
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="relative">
                <div className="text-[rgba(201,168,76,0.12)] text-6xl font-black absolute top-0 right-0 leading-none select-none">
                  {step}
                </div>
                <div className="pr-12">
                  <h3 className="text-[#1A1A1A] font-bold mb-2">{title}</h3>
                  <p className="text-[#666] text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Networking events */}
        <section className="mb-16">
          <SectionHeader eyebrow="Investor Events" title="Networking Events" align="left" />
          <p className="text-[#666] text-sm leading-relaxed mb-8 max-w-3xl">
            Beyond auction events, Midas organises regular property investment networking events in
            London featuring expert speakers, deal discussions and investor meetups. We have hosted
            events in partnership with the London Borough of Harrow, London Borough of Brent,
            London Borough of Barnet and London Borough of Redbridge. Past events have been held
            at Harrow School and the MIPIM Conference in Cannes.
          </p>

          <div className="bg-white border border-[#D8D4CC] rounded-xl p-8 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <span className="text-xs font-bold px-2.5 py-1 rounded bg-[#C9A84C] text-[#080809] mb-4 inline-block">
                  Upcoming
                </span>
                <h3 className="text-[#1A1A1A] font-bold text-xl mb-3">
                  Harrow School Business Networking Evening
                </h3>
                <p className="text-[#666] text-sm mb-4 max-w-xl">
                  Join Sam Fongho and the Midas team for an exclusive networking evening at Harrow
                  School. Keynote address by Lord Bilimoria, Founder of Cobra Beer. Dinner and
                  drinks included. Investor tables limited — early registration strongly recommended.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2 text-[#666] text-sm">
                    <Calendar size={14} className="text-[#C9A84C]" />
                    14 April 2026
                  </div>
                  <div className="flex items-center gap-2 text-[#666] text-sm">
                    <Clock size={14} className="text-[#C9A84C]" />
                    6:00pm – 10:30pm
                  </div>
                  <div className="flex items-center gap-2 text-[#666] text-sm">
                    <Monitor size={14} className="text-[#C9A84C]" />
                    Harrow School, HA1 3HP
                  </div>
                  <div className="flex items-center gap-2 text-[#666] text-sm">
                    <Package size={14} className="text-[#C9A84C]" />
                    £60 per person
                  </div>
                </div>
              </div>
              <GoldButton href="/contact" variant="filled" className="flex-shrink-0">
                Register →
              </GoldButton>
            </div>
          </div>
        </section>

        {/* Past auctions */}
        <section>
          <SectionHeader eyebrow="Track Record" title="Past Auction Results" align="left" />
          <div className="space-y-4">
            {pastAuctions.map((event) => {
              const successRate = Math.round((event.sold / event.lots) * 100)
              return (
                <div
                  key={event.title}
                  className="bg-white border border-[#F0EDE6] rounded-xl p-6 grid grid-cols-2 md:grid-cols-5 gap-4 items-center shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
                >
                  <div className="col-span-2 md:col-span-2">
                    <h3 className="text-[#1A1A1A] font-semibold">{event.title}</h3>
                    <p className="text-[#888] text-sm">{event.date}</p>
                  </div>
                  <div className="text-center">
                    <div className="text-[#1A1A1A] font-bold">{event.lots}</div>
                    <div className="text-[#888] text-xs">Lots</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <TrendingUp size={14} className="text-[#C9A84C]" />
                      <span className="text-[#C9A84C] font-bold">{event.totalRaised}</span>
                    </div>
                    <div className="text-[#888] text-xs">Total Raised</div>
                  </div>
                  <div className="text-center">
                    <div
                      className={`font-bold ${successRate === 100 ? 'text-green-400' : 'text-[#C9A84C]'}`}
                    >
                      {event.sold}/{event.lots} ({successRate}%)
                    </div>
                    <div className="text-[#888] text-xs">Sold</div>
                  </div>
                </div>
              )
            })}
          </div>
          <p className="text-[#999] text-xs mt-4">
            Midas Property Group has maintained a 97%+ clearance rate across all auctions to date.
            Total funds raised exceeds £14.8M.
          </p>
        </section>
      </div>
    </div>
  )
}
