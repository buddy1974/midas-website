'use client'

import Link from 'next/link'
import React from 'react'

interface GoldButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  variant?: 'filled' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  type?: 'button' | 'submit'
  disabled?: boolean
}

export default function GoldButton({
  children,
  href,
  onClick,
  variant = 'filled',
  size = 'md',
  className = '',
  type = 'button',
  disabled = false,
}: GoldButtonProps) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  }

  const variantClasses =
    variant === 'filled'
      ? 'bg-[#C9A84C] text-[#080809] hover:bg-[#E8C96A] font-semibold'
      : 'border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white'

  const baseClasses = `inline-flex items-center justify-center gap-2 rounded transition-all duration-200 hover:scale-[1.02] cursor-pointer font-medium ${sizeClasses[size]} ${variantClasses} ${className}`

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${baseClasses} ${disabled ? 'opacity-60 cursor-not-allowed hover:scale-100' : ''}`}>
      {children}
    </button>
  )
}
