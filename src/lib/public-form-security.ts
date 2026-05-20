import { NextRequest, NextResponse } from 'next/server'

type RateLimitEntry = { count: number; resetAt: number }

const rateLimitStore = new Map<string, RateLimitEntry>()
const DEFAULT_WINDOW_MS = 15 * 60 * 1000
const DEFAULT_MAX_REQUESTS = 8

export interface FieldError {
  field: string
  message: string
}

export interface CaptchaResult {
  ok: boolean
  configured: boolean
  error?: string
}

export function getClientIp(req: NextRequest | Request): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    ?? req.headers.get('x-real-ip')
    ?? 'unknown'
}

export function checkRateLimit(
  req: NextRequest | Request,
  bucket: string,
  maxRequests = DEFAULT_MAX_REQUESTS,
  windowMs = DEFAULT_WINDOW_MS,
): NextResponse | null {
  const key = `${bucket}:${getClientIp(req)}`
  const now = Date.now()
  const entry = rateLimitStore.get(key)

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs })
    return null
  }

  if (entry.count >= maxRequests) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000)
    return NextResponse.json(
      { error: 'Too many submissions. Please wait and try again.' },
      { status: 429, headers: { 'Retry-After': String(retryAfter) } },
    )
  }

  entry.count++
  return null
}

export function asString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

export function optionalString(value: unknown, maxLength: number): string | null {
  const trimmed = asString(value)
  if (!trimmed) return null
  return trimmed.slice(0, maxLength)
}

export function requiredString(
  value: unknown,
  field: string,
  label: string,
  maxLength: number,
  errors: FieldError[],
): string {
  const trimmed = asString(value)
  if (!trimmed) {
    errors.push({ field, message: `${label} is required` })
    return ''
  }
  if (trimmed.length > maxLength) {
    errors.push({ field, message: `${label} must be ${maxLength} characters or less` })
    return trimmed.slice(0, maxLength)
  }
  return trimmed
}

export function emailField(value: unknown, required: boolean, errors: FieldError[]): string | null {
  const email = optionalString(value, 255)
  if (!email) {
    if (required) errors.push({ field: 'email', message: 'Email is required' })
    return null
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push({ field: 'email', message: 'Enter a valid email address' })
  }
  return email.toLowerCase()
}

export function phoneField(value: unknown): string | null {
  const phone = optionalString(value, 50)
  if (!phone) return null
  return phone.replace(/[^\d+()\-\s]/g, '').slice(0, 50)
}

export function stringArrayField(value: unknown, maxItems = 8, maxItemLength = 80): string[] {
  if (!Array.isArray(value)) return []
  return value
    .map(item => optionalString(item, maxItemLength))
    .filter((item): item is string => Boolean(item))
    .slice(0, maxItems)
}

export function validationError(errors: FieldError[]): NextResponse {
  return NextResponse.json({ error: 'Please check the form fields and try again.', fields: errors }, { status: 400 })
}

export async function verifyCaptcha(token: unknown): Promise<CaptchaResult> {
  const secret = process.env.RECAPTCHA_SECRET_KEY ?? process.env.GOOGLE_RECAPTCHA_SECRET_KEY
  if (!secret) return { ok: true, configured: false }

  const captchaToken = asString(token)
  if (!captchaToken) return { ok: false, configured: true, error: 'Captcha verification is required' }

  const form = new URLSearchParams()
  form.set('secret', secret)
  form.set('response', captchaToken)

  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: form.toString(),
  })
  const result = await response.json() as { success?: boolean }

  return result.success
    ? { ok: true, configured: true }
    : { ok: false, configured: true, error: 'Captcha verification failed' }
}
