'use client'

import { useState, useEffect } from 'react'

interface AuctionCountdownProps {
  targetDate: string
  auctionName: string
  lotCount: number
  showWhenLive?: boolean
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function calcTimeLeft(targetDate: string): TimeLeft {
  const diff = new Date(targetDate).getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

function pad(n: number): string {
  return String(n).padStart(2, '0')
}

export default function AuctionCountdown({
  targetDate,
  auctionName,
  lotCount,
  showWhenLive = true,
}: AuctionCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calcTimeLeft(targetDate))

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calcTimeLeft(targetDate))
    }, 1000)
    return () => clearInterval(interval)
  }, [targetDate])

  const isLive =
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0

  return (
    <div>
      {isLive && showWhenLive ? (
        <div className="flex items-center gap-3 bg-red-950/50 border border-red-500/30 rounded-xl px-6 py-4">
          <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
          <span className="text-red-400 font-bold text-lg">LIVE NOW</span>
          <span className="text-[rgba(232,228,220,0.5)] text-sm">Auction in Progress</span>
        </div>
      ) : (
        <div>
          <p className="text-[#C9A84C] text-sm uppercase tracking-widest mb-3">
            Coming up in
          </p>
          <div className="flex gap-4">
            {(
              [
                { value: timeLeft.days, label: 'Days' },
                { value: timeLeft.hours, label: 'Hours' },
                { value: timeLeft.minutes, label: 'Mins' },
              ] as { value: number; label: string }[]
            ).map(({ value, label }) => (
              <div
                key={label}
                className="bg-[#15151C] border border-[rgba(201,168,76,0.2)] rounded-xl px-5 py-4 text-center min-w-[80px]"
              >
                <div className="text-4xl md:text-5xl font-black text-[#C9A84C] tabular-nums">
                  {pad(value)}
                </div>
                <div className="text-xs uppercase tracking-widest text-[rgba(232,228,220,0.5)] mt-1">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-5 text-sm">
        <span className="text-[#C9A84C] font-semibold">{auctionName}</span>
        <span className="text-[rgba(232,228,220,0.5)] ml-2">· {lotCount} lots</span>
      </div>
    </div>
  )
}
