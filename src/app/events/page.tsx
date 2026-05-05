'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Calendar, Clock, MapPin, Users, Share2, ChevronDown, ChevronUp } from 'lucide-react'

// ── Types ─────────────────────────────────────────────────────────────────────

interface OsEvent {
  id: string
  title: string
  description: string | null
  eventType: string
  eventDate: string
  endTime: string | null
  location: string | null
  pricePence: number | null
  maxCapacity: number | null
  ticketLink: string | null
  registrationType?: string
  formFields?: string
  showInvestorOption?: boolean
  customButtonLabel?: string
  customButtonUrl?: string
  recapUrl?: string | null
  registrantCount?: number
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDay(iso: string) { return new Date(iso).getDate().toString() }
function formatMonth(iso: string) { return new Date(iso).toLocaleDateString('en-GB', { month: 'short' }).toUpperCase() }
function formatYear(iso: string) { return new Date(iso).getFullYear().toString() }
function formatDateFull(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
}
function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
}
function isFuture(iso: string) { return new Date(iso).getTime() > Date.now() }

function typeBadgeColor(type: string) {
  if (type.toLowerCase().includes('webinar') || type.toLowerCase().includes('online')) return 'bg-blue-900/40 text-blue-300 border-blue-800'
  if (type.toLowerCase().includes('networking') || type.toLowerCase().includes('person')) return 'bg-emerald-900/40 text-emerald-300 border-emerald-800'
  if (type.toLowerCase().includes('auction') || type.toLowerCase().includes('briefing')) return 'bg-amber-900/40 text-amber-300 border-amber-800'
  return 'bg-[rgba(201,168,76,0.1)] text-[#C9A84C] border-[rgba(201,168,76,0.3)]'
}

function typeLabel(type: string) {
  if (type.toLowerCase().includes('webinar')) return '🎥 Online Webinar'
  if (type.toLowerCase().includes('networking')) return '🤝 Networking'
  if (type.toLowerCase().includes('auction') || type.toLowerCase().includes('briefing')) return '🏛 Pre-Auction Briefing'
  return type
}

// ── Inline Registration Form ──────────────────────────────────────────────────

interface RegFormProps {
  event: OsEvent
  onClose: () => void
}

function RegistrationForm({ event, onClose }: RegFormProps) {
  const fields = event.formFields ?? 'full'
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [asInvestor, setAsInvestor] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const osUrl = process.env.NEXT_PUBLIC_OS_URL

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || (!email.trim() && fields !== 'name_phone' && fields !== 'name_only')) return
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch(`${osUrl}/api/events/${event.id}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          source: 'website_events_page',
          registerAsInvestor: asInvestor,
        }),
      })
      const data = await res.json() as { success?: boolean; error?: string }
      if (data.success) { setSuccess(true) }
      else { setError(data.error ?? 'Something went wrong. Please try again.') }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass = 'w-full bg-white border border-[#C9A84C] rounded px-4 py-3 text-sm text-[#1A1A1A] placeholder-[rgba(0,0,0,0.4)] focus:outline-none focus:ring-1 focus:ring-[#C9A84C]'

  return (
    <div className="mt-4 border border-[rgba(201,168,76,0.3)] rounded-xl bg-[#0F0F14] p-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-[#C9A84C] font-bold text-sm uppercase tracking-wider">Register for {event.title}</h4>
        <button onClick={onClose} className="text-[rgba(232,228,220,0.4)] hover:text-[#C9A84C] text-lg transition-colors">✕</button>
      </div>

      {success ? (
        <div className="text-center py-6">
          <p className="text-green-400 text-3xl mb-3">✓</p>
          <p className="text-[#E8E4DC] font-bold mb-2">You&apos;re registered!</p>
          <p className="text-[rgba(232,228,220,0.6)] text-sm">We&apos;ll send confirmation to your email shortly.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Full Name *"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            className={inputClass}
          />
          {(fields === 'full' || fields === 'name_email') && (
            <input
              type="email"
              placeholder="Email Address *"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className={inputClass}
            />
          )}
          {(fields === 'full' || fields === 'name_phone') && (
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className={inputClass}
            />
          )}
          {event.showInvestorOption && (
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={asInvestor}
                onChange={e => setAsInvestor(e.target.checked)}
                className="accent-[#C9A84C]"
              />
              <span className="text-[rgba(232,228,220,0.7)] text-sm">Register me as a Midas investor</span>
            </label>
          )}
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#C9A84C] text-[#080809] font-bold py-3 rounded hover:bg-[#E8C96A] transition-colors disabled:opacity-60"
          >
            {submitting ? 'Registering…' : 'Register Now →'}
          </button>
        </form>
      )}
    </div>
  )
}

// ── Share Button ──────────────────────────────────────────────────────────────

function ShareButton({ event }: { event: OsEvent }) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const url = `${typeof window !== 'undefined' ? window.location.origin : ''}/events#${event.id}`
    if (navigator.share) {
      try {
        await navigator.share({ title: event.title, text: event.description ?? '', url })
      } catch { /* user cancelled */ }
    } else {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-1.5 border border-[rgba(201,168,76,0.3)] text-[rgba(232,228,220,0.6)] text-xs px-3 py-2 rounded hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
    >
      <Share2 size={12} />
      {copied ? 'Link copied ✓' : 'Share ↗'}
    </button>
  )
}

// ── Event Card ────────────────────────────────────────────────────────────────

function EventCard({ event }: { event: OsEvent }) {
  const [showForm, setShowForm] = useState(false)

  const regType = event.registrationType ?? (event.ticketLink ? 'external' : 'form')
  const isFree = !event.pricePence || event.pricePence === 0

  return (
    <div id={event.id} className="bg-[#0F0F14] border border-[rgba(201,168,76,0.2)] rounded-xl overflow-hidden hover:border-[rgba(201,168,76,0.4)] transition-colors">
      <div className="flex flex-col sm:flex-row">
        {/* Date block */}
        <div className="sm:w-24 flex-shrink-0 bg-[rgba(201,168,76,0.08)] border-b sm:border-b-0 sm:border-r border-[rgba(201,168,76,0.15)] flex sm:flex-col items-center justify-center gap-2 sm:gap-0 py-4 sm:py-6 px-6 sm:px-0">
          <p className="text-[#C9A84C] text-3xl sm:text-4xl font-black leading-none">{formatDay(event.eventDate)}</p>
          <p className="text-[#C9A84C] text-sm font-bold sm:mt-1">{formatMonth(event.eventDate)}</p>
          <p className="text-[rgba(232,228,220,0.3)] text-xs">{formatYear(event.eventDate)}</p>
        </div>

        {/* Content */}
        <div className="p-6 flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className={`text-[10px] font-bold px-2.5 py-1 rounded border uppercase tracking-wider ${typeBadgeColor(event.eventType)}`}>
              {typeLabel(event.eventType)}
            </span>
            <span className={`text-[10px] font-bold px-2.5 py-1 rounded border uppercase tracking-wider ${isFree ? 'bg-green-900/30 text-green-400 border-green-800' : 'bg-[rgba(201,168,76,0.1)] text-[#C9A84C] border-[rgba(201,168,76,0.3)]'}`}>
              {isFree ? 'FREE' : `£${Math.round(event.pricePence! / 100)}`}
            </span>
          </div>

          <h3 className="text-[#E8E4DC] font-bold text-lg mb-2">{event.title}</h3>
          {event.description && (
            <p className="text-[rgba(232,228,220,0.6)] text-sm leading-relaxed mb-4 line-clamp-2">{event.description}</p>
          )}

          <div className="flex flex-wrap gap-4 mb-4 text-xs text-[rgba(232,228,220,0.5)]">
            <span className="flex items-center gap-1.5">
              <Calendar size={12} className="text-[#C9A84C]" />
              {formatDateFull(event.eventDate)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={12} className="text-[#C9A84C]" />
              {formatTime(event.eventDate)}{event.endTime ? ` – ${formatTime(event.endTime)}` : ''}
            </span>
            {event.location && (
              <span className="flex items-center gap-1.5">
                <MapPin size={12} className="text-[#C9A84C]" />
                {event.location}
              </span>
            )}
            {event.maxCapacity && (
              <span className="flex items-center gap-1.5">
                <Users size={12} className="text-[#C9A84C]" />
                {event.maxCapacity} capacity
              </span>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-2">
            {/* Primary action */}
            {event.customButtonLabel && event.customButtonUrl ? (
              <a
                href={event.customButtonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#C9A84C] text-[#080809] font-bold text-xs px-4 py-2 rounded hover:bg-[#E8C96A] transition-colors"
              >
                {event.customButtonLabel} →
              </a>
            ) : regType === 'external' && event.ticketLink ? (
              <a
                href={event.ticketLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#C9A84C] text-[#080809] font-bold text-xs px-4 py-2 rounded hover:bg-[#E8C96A] transition-colors"
              >
                Register →
              </a>
            ) : regType === 'phone' ? (
              <a
                href="tel:07454753318"
                className="bg-[#C9A84C] text-[#080809] font-bold text-xs px-4 py-2 rounded hover:bg-[#E8C96A] transition-colors"
              >
                Call to Register
              </a>
            ) : regType !== 'none' ? (
              <button
                onClick={() => setShowForm(f => !f)}
                className="flex items-center gap-1.5 bg-[#C9A84C] text-[#080809] font-bold text-xs px-4 py-2 rounded hover:bg-[#E8C96A] transition-colors"
              >
                Register Now →
                {showForm ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              </button>
            ) : null}

            <ShareButton event={event} />
          </div>

          {/* Inline form */}
          {showForm && regType === 'form' && (
            <RegistrationForm event={event} onClose={() => setShowForm(false)} />
          )}
        </div>
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function EventsPage() {
  const [upcoming, setUpcoming] = useState<OsEvent[]>([])
  const [past, setPast] = useState<OsEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [liveData, setLiveData] = useState(false)

  useEffect(() => {
    const osUrl = process.env.NEXT_PUBLIC_OS_URL
    if (!osUrl) { setLoading(false); return }
    fetch(`${osUrl}/api/public/events`)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then((data: { events?: OsEvent[] }) => {
        if (!Array.isArray(data?.events)) return
        setLiveData(true)
        setUpcoming(data.events.filter(e => isFuture(e.eventDate)).sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime()))
        setPast(data.events.filter(e => !isFuture(e.eventDate)).sort((a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime()))
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-[#080809] pt-24 pb-20">

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section
        className="relative py-20 px-6"
        style={{
          backgroundImage: "linear-gradient(to bottom, rgba(8,8,9,0.85) 0%, rgba(8,8,9,0.97) 100%), url('https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1920&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.3em] mb-4">
            Midas Property Events
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-[#E8E4DC] mb-6">
            Midas Property Events
          </h1>
          <p className="text-[rgba(232,228,220,0.75)] text-lg max-w-2xl mx-auto leading-relaxed mb-3">
            Every month we organise in-person and online events and webinars bringing together
            experts from across the property industry.
          </p>
          <p className="text-[rgba(232,228,220,0.55)] text-base max-w-xl mx-auto mb-10">
            Open to investors, buyers, sellers and anyone serious about property.
          </p>

          {/* Event type pills */}
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { icon: '🎥', label: 'Online Webinars' },
              { icon: '🤝', label: 'In-Person Networking' },
              { icon: '🏛', label: 'Pre-Auction Briefings' },
            ].map(({ icon, label }) => (
              <span
                key={label}
                className="flex items-center gap-2 border border-[rgba(201,168,76,0.3)] text-[rgba(232,228,220,0.7)] text-sm px-4 py-2 rounded-full"
              >
                {icon} {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Upcoming Events ─────────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-[#C9A84C] font-black uppercase text-xl">Upcoming Events</h2>
          {liveData && (
            <span className="flex items-center gap-1.5 text-xs text-green-400">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Live
            </span>
          )}
        </div>
        <div className="w-10 h-0.5 bg-[#C9A84C] mb-8" />

        {loading ? (
          <div className="space-y-4">
            {[1, 2].map(i => (
              <div key={i} className="h-40 bg-[#0F0F14] border border-[rgba(201,168,76,0.1)] rounded-xl animate-pulse" />
            ))}
          </div>
        ) : upcoming.length === 0 ? (
          <div className="text-center py-12 border border-[rgba(201,168,76,0.15)] rounded-xl">
            <p className="text-[rgba(232,228,220,0.4)] mb-3">No upcoming events scheduled right now.</p>
            <p className="text-[rgba(232,228,220,0.3)] text-sm">Check back soon or join our mailing list to be notified.</p>
            <Link
              href="/register"
              className="inline-block mt-4 border border-[rgba(201,168,76,0.4)] text-[#C9A84C] text-sm px-5 py-2 rounded hover:bg-[rgba(201,168,76,0.08)] transition-colors"
            >
              Join Mailing List →
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {upcoming.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>

      {/* ── Past Events ─────────────────────────────────────────────────────── */}
      {past.length > 0 && (
        <section className="max-w-4xl mx-auto px-6 pb-16">
          <h2 className="text-[#C9A84C] font-black uppercase text-xl mb-2">Past Events</h2>
          <div className="w-10 h-0.5 bg-[#C9A84C] mb-6" />

          <div className="border border-[rgba(201,168,76,0.15)] rounded-xl overflow-hidden">
            {past.slice(0, 10).map((event, i) => (
              <div
                key={event.id}
                className={`flex items-center gap-4 px-5 py-4 ${i < past.length - 1 ? 'border-b border-[rgba(201,168,76,0.08)]' : ''} hover:bg-[rgba(201,168,76,0.04)] transition-colors`}
              >
                <div className="text-[rgba(232,228,220,0.4)] text-xs w-24 flex-shrink-0">
                  {new Date(event.eventDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[rgba(232,228,220,0.75)] text-sm font-medium truncate">{event.title}</p>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded border uppercase font-bold flex-shrink-0 ${typeBadgeColor(event.eventType)}`}>
                  {event.eventType}
                </span>
                {event.recapUrl && (
                  <a
                    href={event.recapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#C9A84C] text-xs hover:text-[#E8C96A] transition-colors flex-shrink-0"
                  >
                    View Recap →
                  </a>
                )}
              </div>
            ))}
          </div>

          {past.length > 10 && (
            <p className="text-center mt-4">
              <Link href="/events" className="text-[rgba(232,228,220,0.4)] text-sm hover:text-[#C9A84C] transition-colors">
                Showing 10 of {past.length} past events
              </Link>
            </p>
          )}
        </section>
      )}

      {/* ── CTA ─────────────────────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-6 pb-8">
        <div className="bg-[rgba(201,168,76,0.06)] border border-[rgba(201,168,76,0.25)] rounded-xl p-8 text-center">
          <h2 className="text-[#E8E4DC] font-black text-xl mb-3">Want to speak at a Midas event?</h2>
          <p className="text-[rgba(232,228,220,0.6)] text-sm mb-6 max-w-md mx-auto">
            We welcome expert speakers from property, finance, law and development. Get in touch to discuss.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-[#C9A84C] text-[#080809] font-bold px-6 py-3 rounded hover:bg-[#E8C96A] transition-colors"
          >
            Contact Us →
          </Link>
        </div>
      </section>

    </div>
  )
}
