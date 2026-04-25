'use client'

import { useState, useEffect } from 'react'
import GoldButton from '@/components/GoldButton'
import { MapPin, Phone, Smartphone, Mail, Clock, ExternalLink } from 'lucide-react'
import { company } from '@/lib/data'

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', message: '', subject: '',
  })

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const subject = params.get('subject')
    const lot = params.get('lot')
    if (subject === 'Viewing Request') {
      setForm((f) => ({
        ...f,
        subject: 'Viewing a property',
        message: lot ? `I would like to book a viewing for: ${lot}` : f.message,
      }))
    }
  }, [])
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('/api/register-interest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, interest: `Contact: ${form.subject}` }),
    })
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center py-16">
          <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
            Get in Touch
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-[#1A1A1A] mb-6">Contact Midas</h1>
          <p className="text-[#666] text-lg">
            We respond to all enquiries within 24 hours. For urgent matters, call us directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 pb-16">
          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-[#E8E5DE] rounded-2xl p-8 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
              <h2 className="text-xl font-bold text-[#1A1A1A] mb-6">Send a Message</h2>
              {submitted ? (
                <div className="bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.3)] rounded-lg p-6 text-[#C9A84C] text-center">
                  ✓ Message received. We&apos;ll be in touch within 24 hours.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {[
                    { key: 'name', label: 'Full Name', type: 'text', placeholder: 'John Smith' },
                    { key: 'email', label: 'Email Address', type: 'email', placeholder: 'john@example.com' },
                    { key: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+44 7700 000000' },
                  ].map(({ key, label, type, placeholder }) => (
                    <div key={key}>
                      <label className="text-[#666] text-xs uppercase tracking-wider mb-1.5 block">
                        {label}
                      </label>
                      <input
                        type={type}
                        placeholder={placeholder}
                        value={form[key as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                        required
                        className="w-full bg-[#F8F7F4] border border-[#E0DDD4] rounded px-4 py-3 text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:border-[#C9A84C] text-sm"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="text-[#666] text-xs uppercase tracking-wider mb-1.5 block">
                      What can we help with?
                    </label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      required
                      className="w-full bg-[#F8F7F4] border border-[#E0DDD4] rounded px-4 py-3 text-[#444] focus:outline-none focus:border-[#C9A84C] text-sm"
                    >
                      <option value="">Select topic...</option>
                      <option>Selling a property at auction</option>
                      <option>Buying at auction</option>
                      <option>Finance enquiry</option>
                      <option>Off-market property access</option>
                      <option>Investor registration</option>
                      <option>Viewing a property</option>
                      <option>General enquiry</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[#666] text-xs uppercase tracking-wider mb-1.5 block">
                      Message
                    </label>
                    <textarea
                      placeholder="Tell us more about your enquiry..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      required
                      rows={5}
                      className="w-full bg-[#F8F7F4] border border-[#E0DDD4] rounded px-4 py-3 text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:border-[#C9A84C] text-sm resize-none"
                    />
                  </div>
                  <GoldButton variant="filled" type="submit" size="lg" className="w-full">
                    Send Message
                  </GoldButton>
                </form>
              )}
            </div>
          </div>

          {/* Contact details */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white border border-[#E8E5DE] rounded-2xl p-8 space-y-5 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
              <h2 className="text-xl font-bold text-[#1A1A1A]">Contact Details</h2>

              <div className="flex items-start gap-3">
                <MapPin className="text-[#C9A84C] mt-0.5 flex-shrink-0" size={18} />
                <div>
                  <p className="text-[#1A1A1A] text-sm font-medium mb-1">Office</p>
                  <p className="text-[#666] text-sm">
                    {company.address.line1}
                    <br />
                    {company.address.line2}
                    <br />
                    {company.address.city}, {company.address.postcode}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="text-[#C9A84C] flex-shrink-0" size={18} />
                <div>
                  <p className="text-[#1A1A1A] text-sm font-medium">Main Office</p>
                  <a
                    href={`tel:${company.phone.replace(/\s/g, '')}`}
                    className="text-[#666] text-sm hover:text-[#C9A84C] transition-colors"
                  >
                    {company.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Smartphone className="text-[#C9A84C] flex-shrink-0" size={18} />
                <div>
                  <p className="text-[#1A1A1A] text-sm font-medium">Sam — Direct</p>
                  <a
                    href={`tel:${company.mobile}`}
                    className="text-[#666] text-sm hover:text-[#C9A84C] transition-colors"
                  >
                    {company.mobile}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="text-[#C9A84C] flex-shrink-0" size={18} />
                <div>
                  <p className="text-[#1A1A1A] text-sm font-medium">General Enquiries</p>
                  <a
                    href={`mailto:${company.email}`}
                    className="text-[#666] text-sm hover:text-[#C9A84C] transition-colors"
                  >
                    {company.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="text-[#C9A84C] flex-shrink-0" size={18} />
                <div>
                  <p className="text-[#1A1A1A] text-sm font-medium">Sam — Direct Email</p>
                  <a
                    href={`mailto:${company.samEmail}`}
                    className="text-[#666] text-sm hover:text-[#C9A84C] transition-colors"
                  >
                    {company.samEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="text-[#C9A84C] flex-shrink-0 mt-0.5" size={18} />
                <div>
                  <p className="text-[#1A1A1A] text-sm font-medium">Office Hours</p>
                  <p className="text-[#666] text-sm whitespace-pre-line">
                    {company.hours}
                  </p>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="bg-white border border-[#E8E5DE] rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
              <h3 className="text-[#1A1A1A] font-semibold mb-4">Follow Midas</h3>
              <div className="space-y-3">
                <a
                  href={company.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-[#666] text-sm hover:text-[#C9A84C] transition-colors"
                >
                  <ExternalLink size={14} className="text-[#C9A84C]" />
                  Facebook — MidasPropertyGroupUK
                </a>
                <a
                  href={company.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-[#666] text-sm hover:text-[#C9A84C] transition-colors"
                >
                  <ExternalLink size={14} className="text-[#C9A84C]" />
                  Instagram — @midas_property_auctions
                </a>
                <a
                  href={company.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-[#666] text-sm hover:text-[#C9A84C] transition-colors"
                >
                  <ExternalLink size={14} className="text-[#C9A84C]" />
                  LinkedIn — Sam Fongho
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
