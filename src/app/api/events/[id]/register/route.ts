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

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const limited = checkRateLimit(req, 'event-registration')
  if (limited) return limited

  const { id } = await params
  const body = await req.json() as Record<string, unknown>
  const errors: FieldError[] = []

  const name = requiredString(body.name, 'name', 'Name', 200, errors)
  const email = emailField(body.email, true, errors)
  const phone = phoneField(body.phone)
  const source = optionalString(body.source, 100) ?? 'website_events_page'
  const registerAsInvestor = body.registerAsInvestor === true
  const captcha = await verifyCaptcha(body.captchaToken)

  if (!captcha.ok) errors.push({ field: 'captchaToken', message: captcha.error ?? 'Captcha verification failed' })
  if (errors.length > 0) return validationError(errors)

  try {
    const sql = getSql()
    const [event] = await sql<{ id: string; name: string }[]>`
      SELECT id, name FROM events WHERE id = ${id} LIMIT 1`
    if (!event) return NextResponse.json({ error: 'Event not found' }, { status: 404 })

    await sql`
      INSERT INTO leads (type, name, email, phone, source, data)
      VALUES (
        'event_registration',
        ${name},
        ${email},
        ${phone},
        ${source},
        ${sql.json({
          eventId: id,
          eventName: event.name,
          registerAsInvestor,
          captchaConfigured: captcha.configured,
        })}
      )`

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[event-register]', err)
    return NextResponse.json({ error: 'Registration unavailable. Please try again.' }, { status: 500 })
  }
}
