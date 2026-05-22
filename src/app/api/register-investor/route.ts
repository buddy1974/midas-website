import { NextRequest, NextResponse } from 'next/server'
import { getSql } from '@/lib/db'
import { syncToKeap } from '@/lib/infusionsoft'
import {
  checkRateLimit,
  emailField,
  optionalString,
  phoneField,
  requiredString,
  stringArrayField,
  validationError,
  verifyCaptcha,
  type FieldError,
} from '@/lib/public-form-security'

export async function POST(req: NextRequest) {
  const limited = checkRateLimit(req, 'register-investor')
  if (limited) return limited

  try {
    const body = await req.json() as Record<string, unknown>
    const errors: FieldError[] = []
    const firstName = optionalString(body.firstName, 100)
    const lastName = optionalString(body.lastName, 100)
    const submittedName = optionalString(body.name, 200)
    const name = [firstName, lastName].filter(Boolean).join(' ') || submittedName || ''
    requiredString(name, 'name', 'Name', 200, errors)
    const email = emailField(body.email, true, errors)
    const phone = phoneField(body.phone)
    const source = optionalString(body.source, 100) ?? 'website_register'
    const captcha = await verifyCaptcha(body.captchaToken)

    if (!captcha.ok) errors.push({ field: 'captchaToken', message: captcha.error ?? 'Captcha verification failed' })
    if (errors.length > 0) return validationError(errors)

    const sql = getSql()
    await sql`
      INSERT INTO leads (type, name, email, phone, source, data)
      VALUES (
        'register_investor',
        ${name},
        ${email},
        ${phone},
        ${source},
        ${sql.json({
          userType: optionalString(body.userType, 100),
          lookingFor: stringArrayField(body.lookingFor),
          budget: optionalString(body.budget, 100),
          preferredAreas: stringArrayField(body.preferredAreas),
          contactPreference: stringArrayField(body.contactPreference),
          whatsappOptIn: body.whatsappOptIn === true,
          whatsapp: phoneField(body.whatsapp),
          captchaConfigured: captcha.configured,
        })}
      )`
    await syncToKeap({ firstName, lastName, name, email, phone })
  } catch (err) {
    console.error('[register-investor]', err)
    return NextResponse.json({ error: 'Submission failed. Please try again.' }, { status: 500 })
  }
  return NextResponse.json({ success: true, message: 'Welcome to the Midas investor network' })
}
