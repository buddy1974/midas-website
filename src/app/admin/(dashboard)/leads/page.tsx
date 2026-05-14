import { getSql } from '@/lib/db'
import type { LeadRow } from '@/lib/db'

export const dynamic = 'force-dynamic'

const TYPE_LABEL: Record<string, string> = {
  register_interest:  'Property Interest',
  finance_enquiry:    'Finance Enquiry',
  offmarket_request:  'Off-Market Request',
  register_investor:  'Investor Registration',
  whatsapp_signup:    'WhatsApp Signup',
}

const TYPE_COLOR: Record<string, string> = {
  register_interest:  '#C9A84C',
  finance_enquiry:    '#22c55e',
  offmarket_request:  '#a855f7',
  register_investor:  '#3b82f6',
  whatsapp_signup:    '#25D366',
}

function fmt(ts: string) {
  const d = new Date(ts)
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) +
    ' ' + d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
}

function Detail({ data, type }: { data: Record<string, unknown>; type: string }) {
  if (type === 'register_interest') {
    return (
      <span style={{ color: '#888', fontSize: 11 }}>
        {data.lotAddress ? `Re: ${data.lotAddress as string}` : ''}
        {data.interest ? ` · ${data.interest as string}` : ''}
      </span>
    )
  }
  if (type === 'finance_enquiry') {
    return (
      <span style={{ color: '#888', fontSize: 11 }}>
        {[data.loanAmount && `Loan: £${data.loanAmount}`, data.purpose, data.propertyAddress]
          .filter(Boolean).join(' · ')}
      </span>
    )
  }
  if (type === 'register_investor' || type === 'whatsapp_signup') {
    return (
      <span style={{ color: '#888', fontSize: 11 }}>
        {[data.userType, data.budget && `Budget: ${data.budget as string}`]
          .filter(Boolean).join(' · ')}
      </span>
    )
  }
  return null
}

export default async function LeadsPage() {
  let leads: LeadRow[] = []
  let dbError = ''

  try {
    const sql = getSql()
    leads = await sql<LeadRow[]>`
      SELECT * FROM leads ORDER BY created_at DESC LIMIT 500`
  } catch (err) {
    console.error('[admin/leads]', err)
    dbError = String(err)
  }

  const counts = leads.reduce<Record<string, number>>((acc, l) => {
    acc[l.type] = (acc[l.type] ?? 0) + 1
    return acc
  }, {})

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ color: '#C9A84C', fontSize: 18, fontWeight: 700, textTransform: 'uppercase', margin: 0 }}>Leads</h1>
          <p style={{ color: '#555', fontSize: 12, margin: '4px 0 0' }}>{leads.length} total</p>
        </div>
      </div>

      {/* Summary pills */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 24 }}>
        {Object.entries(TYPE_LABEL).map(([key, label]) => (
          <div key={key} style={{
            background: '#111', border: `1px solid ${TYPE_COLOR[key] ?? '#2a2a2a'}22`,
            borderRadius: 6, padding: '6px 14px', fontSize: 11,
          }}>
            <span style={{ color: TYPE_COLOR[key] ?? '#888' }}>{label}</span>
            <span style={{ color: '#555', marginLeft: 6 }}>{counts[key] ?? 0}</span>
          </div>
        ))}
      </div>

      {dbError && (
        <div style={{ background: '#1a0a0a', border: '1px solid #3f1010', borderRadius: 6, padding: '10px 14px', marginBottom: 20, color: '#ef4444', fontSize: 12 }}>
          DB error: {dbError}
        </div>
      )}

      {leads.length === 0 && !dbError ? (
        <div style={{ textAlign: 'center', padding: '48px 0', color: '#555', fontSize: 13 }}>
          No leads yet. Make sure migration 005_leads.sql has been run in Neon.
        </div>
      ) : (
        <div style={{ background: '#111', border: '1px solid #1a1a1a', borderRadius: 8, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1a1a1a' }}>
                {['Type', 'Name', 'Email', 'Phone', 'Detail', 'Date'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', color: '#555', fontWeight: 600, fontSize: 11, letterSpacing: 1, textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {leads.map((lead, i) => (
                <tr key={lead.id} style={{ borderBottom: i < leads.length - 1 ? '1px solid #1a1a1a' : 'none' }}>
                  <td style={{ padding: '10px 14px' }}>
                    <span style={{
                      background: `${TYPE_COLOR[lead.type] ?? '#888'}18`,
                      color: TYPE_COLOR[lead.type] ?? '#888',
                      borderRadius: 4, padding: '2px 8px', fontSize: 11, whiteSpace: 'nowrap',
                    }}>
                      {TYPE_LABEL[lead.type] ?? lead.type}
                    </span>
                  </td>
                  <td style={{ padding: '10px 14px', color: '#e0e0e0', fontWeight: 500 }}>{lead.name ?? '—'}</td>
                  <td style={{ padding: '10px 14px', color: '#888' }}>
                    {lead.email ? (
                      <a href={`mailto:${lead.email}`} style={{ color: '#C9A84C', textDecoration: 'none' }}>{lead.email}</a>
                    ) : '—'}
                  </td>
                  <td style={{ padding: '10px 14px', color: '#888' }}>
                    {lead.phone ? (
                      <a href={`tel:${lead.phone}`} style={{ color: '#888', textDecoration: 'none' }}>{lead.phone}</a>
                    ) : '—'}
                  </td>
                  <td style={{ padding: '10px 14px', maxWidth: 260 }}>
                    <Detail data={lead.data} type={lead.type} />
                  </td>
                  <td style={{ padding: '10px 14px', color: '#555', fontSize: 11, whiteSpace: 'nowrap' }}>
                    {fmt(lead.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
