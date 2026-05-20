import { NextRequest, NextResponse } from 'next/server'
import { getSql } from '@/lib/db'
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
  const limited = checkRateLimit(req, 'register-interest')
  if (limited) return limited

  try {
    const body = await req.json() as Record<string, unknown>
    const errors: FieldError[] = []
    const name = requiredString(body.name, 'name', 'Name', 200, errors)
    const email = emailField(body.email, true, errors)
    const phone = phoneField(body.phone)
    const interest = optionalString(body.interest, 100) ?? 'Buyer'
    const lotId = optionalString(body.lotId, 100)
    const lotAddress = optionalString(body.lotAddress, 300)
    const source = optionalString(body.source, 100) ?? 'website_property'
    const captcha = await verifyCaptcha(body.captchaToken)

    if (!captcha.ok) errors.push({ field: 'captchaToken', message: captcha.error ?? 'Captcha verification failed' })
    if (errors.length > 0) return validationError(errors)

    const sql = getSql()
    await sql`
      INSERT INTO leads (type, name, email, phone, source, data)
      VALUES (
        'register_interest',
        ${name},
        ${email},
        ${phone},
        ${source},
        ${sql.json({
          interest,
          lotId,
          lotAddress,
          budget: optionalString(body.budget, 100),
          lookingFor: stringArrayField(body.lookingFor),
          minYield: optionalString(body.minYield, 50),
          propertyType: optionalString(body.propertyType ?? body.type, 100),
          maxBudget: optionalString(body.maxBudget, 100),
          address: optionalString(body.address, 300),
          estimatedValue: optionalString(body.value, 100),
          message: optionalString(body.message, 1000),
          captchaConfigured: captcha.configured,
        })}
      )`
  } catch (err) {
    console.error('[register-interest]', err)
    return NextResponse.json({ error: 'Submission failed. Please try again.' }, { status: 500 })
  }
  return NextResponse.json({ success: true })
}
