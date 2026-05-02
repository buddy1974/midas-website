/**
 * os-intake.ts
 *
 * Typed proxy helper for all website → OS intake API calls.
 * Used by the website's local /api/* route handlers, which act as
 * thin pass-through proxies so the API key never reaches the browser.
 *
 * Required env var: MIDAS_OS_API_KEY  (same value as WEBSITE_API_KEY on OS)
 * Optional env var: NEXT_PUBLIC_OS_URL (default: https://midas-property-sam.vercel.app)
 */

const DEFAULT_OS_URL = 'https://midas-property-sam.vercel.app'

function getOsUrl(): string {
  return (process.env.NEXT_PUBLIC_OS_URL ?? DEFAULT_OS_URL).replace(/\/$/, '')
}

function getApiKey(): string | null {
  return process.env.MIDAS_OS_API_KEY ?? null
}

export interface IntakeResult {
  ok: boolean
  status: number
  data: unknown
}

/**
 * POST to an OS intake endpoint with the shared API key.
 * Never throws — returns { ok: false } on any error so caller can
 * decide whether to surface a user-facing error.
 */
export async function osIntake(
  path: string,
  body: unknown
): Promise<IntakeResult> {
  const key = getApiKey()
  if (!key) {
    console.error('[os-intake] MIDAS_OS_API_KEY is not set')
    // Return ok:true so users get a success UX even in misconfigured envs.
    // Log the payload so the data isn't silently lost — visible in Vercel logs.
    console.warn('[os-intake] payload that was NOT forwarded:', JSON.stringify(body))
    return { ok: false, status: 503, data: { error: 'intake not configured' } }
  }

  const url = `${getOsUrl()}${path}`

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': key,
      },
      body: JSON.stringify(body),
    })

    let data: unknown
    try {
      data = await res.json()
    } catch {
      data = null
    }

    if (!res.ok) {
      console.error(`[os-intake] ${path} returned ${res.status}:`, data)
    }

    return { ok: res.ok, status: res.status, data }
  } catch (err) {
    console.error(`[os-intake] fetch failed for ${path}:`, err)
    return { ok: false, status: 500, data: { error: 'network error' } }
  }
}

// ─── Typed helpers per form ───────────────────────────────────────────────

export interface RegisterInterestPayload {
  name: string
  email: string
  phone?: string
  interest?: string
  lotId?: string
  lotAddress?: string
}

export async function intakeRegisterInterest(p: RegisterInterestPayload) {
  return osIntake('/api/intake/register-interest', p)
}

export interface FinanceEnquiryPayload {
  name: string
  email: string
  phone?: string
  loanAmount?: string
  propertyValue?: string
  propertyAddress?: string
  purpose?: string
  term?: string
  source?: string
  // Valuation fields
  address?: string
  propertyType?: string
  situation?: string
  notes?: string
}

export async function intakeFinanceEnquiry(p: FinanceEnquiryPayload) {
  return osIntake('/api/intake/finance-enquiry', p)
}

export interface OffmarketRequestPayload {
  name: string
  email: string
}

export async function intakeOffmarketRequest(p: OffmarketRequestPayload) {
  return osIntake('/api/intake/offmarket-request', p)
}

export interface RegisterInvestorPayload {
  name?: string
  firstName?: string
  lastName?: string
  email: string
  phone?: string
  whatsapp?: string
  userType?: string
  lookingFor?: string[]
  budget?: string
  preferredAreas?: string[]
  contactPreference?: string[]
  whatsappOptIn?: boolean
  source?: string
}

export async function intakeRegisterInvestor(p: RegisterInvestorPayload) {
  return osIntake('/api/intake/register-investor', p)
}

export interface NewsletterSubscribePayload {
  email: string
  name?: string
  source?: string
  investor_type?: string
}

export async function intakeNewsletterSubscribe(p: NewsletterSubscribePayload) {
  return osIntake('/api/newsletter/subscribe', p)
}
