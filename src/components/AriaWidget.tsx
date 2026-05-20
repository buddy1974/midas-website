'use client'

import { useState } from 'react'

export default function AriaWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    { role: 'aria', text: "Hi, I'm ARIA, the Midas Property AI assistant. Ask me anything about our properties, auction process or investment opportunities." }
  ])
  const [loading, setLoading] = useState(false)

  const send = async () => {
    if (!input.trim()) return
    const userMsg = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text: userMsg }])
    setLoading(true)

    try {
      const res = await fetch('/api/ai-analyse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, source: 'website_widget' })
      })
      const data = await res.json()
      if (!res.ok) {
        setMessages(prev => [...prev, {
          role: 'aria',
          text: data.error || 'ARIA is currently unavailable. Please contact Midas directly for help.'
        }])
        return
      }
      setMessages(prev => [...prev, {
        role: 'aria',
        text: data.reply ||
          'Thank you for your enquiry. Please call Sam on 07454 753318 or email info@midaspropertyauctions.co.uk for a personal response.'
      }])
    } catch {
      setMessages(prev => [...prev, {
        role: 'aria',
        text: 'Please call Sam on 07454 753318 or email info@midaspropertyauctions.co.uk and we will get back to you shortly.'
      }])
    }
    setLoading(false)
  }

  return (
    <>
      {/* Chat bubble button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105"
        style={{ background: 'linear-gradient(135deg, #C9A84C, #d4b55a)' }}
        aria-label="Chat with ARIA"
      >
        {open ? (
          <span className="text-[#080809] text-xl font-bold">✕</span>
        ) : (
          <span className="text-[#080809] text-2xl">🤖</span>
        )}
      </button>

      {/* Chat window */}
      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 w-80 rounded-2xl shadow-2xl flex flex-col"
          style={{
            background: '#0D0D14',
            border: '1px solid rgba(201,168,76,0.3)',
            maxHeight: '420px'
          }}
        >
          {/* Header */}
          <div className="px-4 py-3 border-b border-[rgba(201,168,76,0.2)]">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[#C9A84C] font-bold text-sm">ARIA</span>
              <span className="text-[rgba(232,228,220,0.4)] text-xs">Midas Property AI</span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3" style={{ maxHeight: '280px' }}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className="rounded-xl px-3 py-2 text-xs max-w-[85%] leading-relaxed"
                  style={{
                    background: msg.role === 'user' ? 'rgba(201,168,76,0.2)' : 'rgba(255,255,255,0.05)',
                    color: msg.role === 'user' ? '#C9A84C' : '#E8E4DC',
                    border: msg.role === 'aria' ? '1px solid rgba(201,168,76,0.15)' : 'none'
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div
                  className="rounded-xl px-3 py-2 text-xs"
                  style={{ background: 'rgba(255,255,255,0.05)', color: '#C9A84C' }}
                >
                  ARIA is thinking...
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-[rgba(201,168,76,0.2)]">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send()}
                placeholder="Ask about properties..."
                className="flex-1 text-xs rounded-lg px-3 py-2 outline-none"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(201,168,76,0.2)',
                  color: '#E8E4DC'
                }}
              />
              <button
                onClick={send}
                disabled={loading}
                className="px-3 py-2 rounded-lg text-xs font-bold"
                style={{ background: '#C9A84C', color: '#080809' }}
              >
                →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
