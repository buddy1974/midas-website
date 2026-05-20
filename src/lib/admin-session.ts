const SESSION_MAX_AGE_SECONDS = 60 * 60 * 12
const textEncoder = new TextEncoder()

interface AdminSessionPayload {
  v: 1
  iat: number
  exp: number
  nonce: string
}

function base64UrlEncode(value: string): string {
  return btoa(value).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}

function base64UrlEncodeBytes(value: Uint8Array): string {
  let binary = ''
  for (const byte of value) binary += String.fromCharCode(byte)
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}

function base64UrlDecode(value: string): string {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(value.length / 4) * 4, '=')
  return atob(padded)
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let result = 0
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  return result === 0
}

function getSessionSecret(): string | null {
  const explicit = process.env.ADMIN_SESSION_SECRET
  if (explicit && explicit.length >= 32) return explicit

  if (process.env.NODE_ENV !== 'production' && process.env.ADMIN_PASSWORD) {
    return `dev-session-secret:${process.env.ADMIN_PASSWORD}`
  }

  return null
}

async function signPayload(payload: string): Promise<string | null> {
  const secret = getSessionSecret()
  if (!secret) return null

  const key = await crypto.subtle.importKey(
    'raw',
    textEncoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const signature = await crypto.subtle.sign('HMAC', key, textEncoder.encode(payload))
  return base64UrlEncodeBytes(new Uint8Array(signature))
}

function randomNonce(): string {
  const bytes = new Uint8Array(16)
  crypto.getRandomValues(bytes)
  return base64UrlEncodeBytes(bytes)
}

export function getAdminSessionMaxAge(): number {
  return SESSION_MAX_AGE_SECONDS
}

export async function createAdminSessionToken(): Promise<string> {
  const now = Math.floor(Date.now() / 1000)
  const payload: AdminSessionPayload = {
    v: 1,
    iat: now,
    exp: now + SESSION_MAX_AGE_SECONDS,
    nonce: randomNonce(),
  }
  const encodedPayload = base64UrlEncode(JSON.stringify(payload))
  const signature = await signPayload(encodedPayload)

  if (!signature) {
    throw new Error('ADMIN_SESSION_SECRET must be set to at least 32 characters in production')
  }

  return `${encodedPayload}.${signature}`
}

export async function verifyAdminSessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false

  const [encodedPayload, signature] = token.split('.')
  if (!encodedPayload || !signature) return false

  const expectedSignature = await signPayload(encodedPayload)
  if (!expectedSignature || !timingSafeEqual(signature, expectedSignature)) return false

  try {
    const payload = JSON.parse(base64UrlDecode(encodedPayload)) as Partial<AdminSessionPayload>
    if (payload.v !== 1 || typeof payload.exp !== 'number') return false
    return payload.exp > Math.floor(Date.now() / 1000)
  } catch {
    return false
  }
}

export function hasSafeMutationOrigin(req: Request): boolean {
  const origin = req.headers.get('origin')
  const referer = req.headers.get('referer')

  if (!origin && !referer) return false

  const requestOrigin = new URL(req.url).origin
  if (origin) return origin === requestOrigin

  try {
    return referer ? new URL(referer).origin === requestOrigin : false
  } catch {
    return false
  }
}
