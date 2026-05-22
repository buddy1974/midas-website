/**
 * Infusionsoft / Keap contact sync utility
 * Uses the Keap REST API v2 with an API Key (X-Keap-API-Key header)
 * Silently skips if INFUSIONSOFT_API_KEY is not set — safe in all environments
 */

const KEAP_API = 'https://api.infusionsoft.com/crm/rest/v2'

interface KeapContactPayload {
  given_name?: string
  family_name?: string
  email_addresses?: { email: string; field: 'EMAIL1' }[]
  phone_numbers?: { number: string; field: 'PHONE1' }[]
  duplicate_option: 'Email' | 'EmailAndName' | 'None'
  source_type?: string
}

/** Split "Marcel Maxplan" → { given_name: "Marcel", family_name: "Maxplan" } */
function parseName(fullName: string | null | undefined): { given_name: string; family_name: string } {
  if (!fullName?.trim()) return { given_name: '', family_name: '' }
  const parts = fullName.trim().split(/\s+/)
  return {
    given_name:  parts[0] ?? '',
    family_name: parts.slice(1).join(' '),
  }
}

export interface KeapContact {
  /** Full name string OR separate first/last */
  name?: string | null
  firstName?: string | null
  lastName?: string | null
  email?: string | null
  phone?: string | null
}

/**
 * Upsert a contact in Infusionsoft/Keap.
 * Matches on email (duplicate_option: "Email") — updates existing, creates new.
 * Never throws — Infusionsoft failures are logged and swallowed so they
 * never affect the user's form submission.
 */
export async function syncToKeap(contact: KeapContact): Promise<void> {
  const apiKey = process.env.INFUSIONSOFT_API_KEY
  if (!apiKey) return // not configured — skip silently

  const email = contact.email?.trim() || null
  if (!email) return // Keap deduplication requires email

  // Resolve name: prefer explicit first/last, fall back to full name string
  const given_name  = contact.firstName?.trim() || parseName(contact.name).given_name
  const family_name = contact.lastName?.trim()  || parseName(contact.name).family_name

  const payload: KeapContactPayload = {
    given_name:      given_name  || undefined,
    family_name:     family_name || undefined,
    email_addresses: [{ email, field: 'EMAIL1' }],
    phone_numbers:   contact.phone?.trim()
      ? [{ number: contact.phone.trim(), field: 'PHONE1' }]
      : undefined,
    duplicate_option: 'Email',
    source_type: 'API',
  }

  try {
    const res = await fetch(`${KEAP_API}/contacts`, {
      method:  'POST',
      headers: {
        'X-Keap-API-Key': apiKey,
        'Content-Type':   'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const body = await res.text().catch(() => '')
      console.error(`[infusionsoft] Keap API ${res.status}:`, body)
    }
  } catch (err) {
    console.error('[infusionsoft] sync failed:', err)
  }
}
