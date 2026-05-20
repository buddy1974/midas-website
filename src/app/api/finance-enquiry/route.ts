import { NextRequest, NextResponse } from 'next/server'
import { getSql } from '@/lib/db'
import {
  checkRateLimit,
  emailField,
  optionalString,
  phoneField,
  requiredString,
  validationError,
  verifyCaptcha,
  type FieldError,
} from '@/lib/public-form-security'

export async function POST(req: NextRequest) {
  const limited = checkRateLimit(req, 'finance-enquiry')
  if (limited) return limited

  try {
    const body = await req.json() as Record<string, unknown>
    const errors: FieldError[] = []
    const name = requiredString(body.name, 'name', 'Name', 200, errors)
    const email = emailField(body.email, true, errors)
    const phone = phoneField(body.phone)
    const loanAmount = requiredString(body.loanAmount, 'loanAmount', 'Loan amount', 80, errors)
    const propertyValue = requiredString(body.propertyValue, 'propertyValue', 'Property value', 80, errors)
    const source = optionalString(body.source, 100) ?? 'website_finance'
    const captcha = await verifyCaptcha(body.captchaToken)

    if (!captcha.ok) errors.push({ field: 'captchaToken', message: captcha.error ?? 'Captcha verification failed' })
    if (errors.length > 0) return validationError(errors)

    const sql = getSql()
    await sql`
      INSERT INTO leads (type, name, email, phone, source, data)
      VALUES (
        'finance_enquiry',
        ${name},
        ${email},
        ${phone},
        ${source},
        ${sql.json({
          loanAmount,
          propertyValue,
          propertyAddress: optionalString(body.propertyAddress, 300) ?? optionalString(body.address, 300),
          purpose: optionalString(body.purpose, 100),
          term: optionalString(body.term, 100),
          propertyType: optionalString(body.propertyType, 100),
          situation: optionalString(body.situation, 1000),
          notes: optionalString(body.notes, 1000),
          captchaConfigured: captcha.configured,
        })}
      )`
  } catch (err) {
    console.error('[finance-enquiry]', err)
    return NextResponse.json({ error: 'Submission failed. Please try again.' }, { status: 500 })
  }
  return NextResponse.json({ success: true })
}
