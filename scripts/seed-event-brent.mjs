// seed-event-brent.mjs — inserts Brent Forum event into production DB
import postgres from 'postgres'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const env = readFileSync(join(__dirname, '..', '.env.local'), 'utf8')
const rawUrl = env.match(/WEBSITE_DATABASE_URL=([^\n\r]+)/)?.[1]?.trim() ?? ''
// Strip surrounding quotes that vercel env pull sometimes adds
const dbUrl = rawUrl.replace(/^["']|["']$/g, '')

console.log('DB URL found:', dbUrl ? 'YES (length ' + dbUrl.length + ')' : 'NO')

if (!dbUrl || dbUrl.length < 10) {
  console.error('WEBSITE_DATABASE_URL not found or empty in .env.local')
  process.exit(1)
}

console.log('Connecting to DB...')
const sql = postgres(dbUrl, { ssl: 'require', connect_timeout: 15 })

const description = `Midas Property Auctions, working with Brent Council, brings landlords and investors together to discuss new licensing rules, compliance, and key property updates.

Join us for an interactive Landlord Forum at the Brent Civic Centre, where landlords and property professionals can engage directly with the Council and property experts.

This event provides an opportunity for Brent Council to engage with stakeholders on the proposed extension and expansion of property licensing schemes, as well as the Renters Rights Bill and its potential impact on the private rented sector.

Open to landlords with property in Brent, Hillingdon, Barnet, and surrounding areas.

Agenda:
17:00 - Exhibitor Arrival and Delegate Registration
17:30 to 18:30 - Open Networking
18:30 to 18:45 - Welcome Address
Guest panel of industry professionals, key housing updates and open Q&A to follow.

Ideal for: Landlords, Buy-to-Let Landlords, HMO Operators, Property Developers, Estate Agents, Letting Agents, Property Lawyers, Builders, Architects and Property Investors.`

try {
  console.log('Running INSERT...')
  const [row] = await sql`
    INSERT INTO events (name, event_date, event_time, location, description, event_type, cost_type, cost_amount, image_url, registration_url, is_featured)
    VALUES (
      'Brent Landlord, Investor & Developer Forum',
      '2026-06-08',
      '17:00 - 22:00',
      'Brent Civic Centre, 32 Engineers Way, Wembley, HA9',
      ${description},
      'in-person',
      'free',
      0,
      null,
      'https://www.eventbrite.co.uk/e/brent-landlord-investor-developer-forum-tickets-1985314910340',
      true
    )
    RETURNING id, name
  `
  console.log('SUCCESS - Event created:', row.name)
  console.log('ID:', row.id)
  console.log('Live at: https://www.midaspropertyauctions.co.uk/events')
} catch (err) {
  console.error('INSERT FAILED:', err.message ?? String(err))
} finally {
  await sql.end()
  console.log('Done.')
  process.exit(0)
}
