import { NextRequest, NextResponse } from 'next/server'
import { getSql } from '@/lib/db'
import { syncToKeap } from '@/lib/infusionsoft'
import {
  checkRateLimit,
  emailField,
  requiredString,
  validationError,
  verifyCaptcha,
  type FieldError,
} from '@/lib/public-form-security'

export async function POST(req: NextRequest) {
  const limited = checkRateLimit(req, 'offmarket-request')
  if (limited) return limited

  try {
    const body = await req.json() as Record<string, unknown>
    const errors: FieldError[] = []
    const name = requiredString(body.name, 'name', 'Name', 200, errors)
    const email = emailField(body.email, true, errors)
    const captcha = await verifyCaptcha(body.captchaToken)

    if (!captcha.ok) errors.push({ field: 'captchaToken', message: captcha.error ?? 'Captcha verification failed' })
    if (errors.length > 0) return validationError(errors)

    const sql = getSql()
    await sql`
      INSERT INTO leads (type, name, email, phone, source, data)
      VALUES (
        'offmarket_request',
        ${name},
        ${email},
        ${null},
        'website_offmarket',
        ${sql.json({ captchaConfigured: captcha.configured })}
      )`
    await syncToKeap({ name, email })
  } catch (err) {
    console.error('[offmarket-request]', err)
    return NextResponse.json({ error: 'Submission failed. Please try again.' }, { status: 500 })
  }
  return NextResponse.json({ success: true })
}
