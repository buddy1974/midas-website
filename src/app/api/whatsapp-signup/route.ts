import { NextRequest, NextResponse } from 'next/server'
import { getSql } from '@/lib/db'
import { syncToKeap } from '@/lib/infusionsoft'
import {
  checkRateLimit,
  emailField,
  optionalString,
  phoneField,
  validationError,
  verifyCaptcha,
  type FieldError,
} from '@/lib/public-form-security'

export async function POST(req: NextRequest) {
  const limited = checkRateLimit(req, 'whatsapp-signup')
  if (limited) return limited

  try {
    const body = await req.json() as Record<string, unknown>
    const errors: FieldError[] = []
    const firstName = optionalString(body.firstName, 100)
    const lastName = optionalString(body.lastName, 100)
    const submittedName = optionalString(body.name, 200)
    const name = [firstName, lastName].filter(Boolean).join(' ') || submittedName || null
    const email = emailField(body.email, false, errors)
    const phone = phoneField(body.phone ?? body.number)
    const source = optionalString(body.source, 100) ?? 'whatsapp_signup'
    const userType = optionalString(body.userType ?? body.type, 100)
    const budget = optionalString(body.budget, 100)
    const captcha = await verifyCaptcha(body.captchaToken)

    if (!phone && !email) errors.push({ field: 'phone', message: 'Phone or email is required' })
    if (!captcha.ok) errors.push({ field: 'captchaToken', message: captcha.error ?? 'Captcha verification failed' })
    if (errors.length > 0) return validationError(errors)

    const sql = getSql()
    await sql`
      INSERT INTO leads (type, name, email, phone, source, data)
      VALUES (
        'whatsapp_signup',
        ${name},
        ${email},
        ${phone},
        ${source},
        ${sql.json({ userType, budget, captchaConfigured: captcha.configured })}
      )`
    await syncToKeap({ firstName, lastName, name, email, phone })
  } catch (err) {
    console.error('[whatsapp-signup]', err)
    return NextResponse.json({ error: 'Submission failed. Please try again.' }, { status: 500 })
  }
  return NextResponse.json({ success: true })
}
