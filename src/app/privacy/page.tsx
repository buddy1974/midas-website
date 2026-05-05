import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Midas Property Auctions',
  description:
    'How Midas Property Group Ltd collects, uses and protects your personal data. We comply fully with the UK GDPR and Data Protection Act 2018.',
  alternates: { canonical: 'https://www.midaspropertyauctions.co.uk/privacy' },
  robots: { index: true, follow: false },
}

interface PolicySection {
  heading: string
  content: string
}

const sections: PolicySection[] = [
  {
    heading: '1. Data Controller',
    content:
      'Midas Property Group Ltd (Company No: 09522321) is the data controller for personal data collected through this website and our services. Contact: info@midaspropertyauctions.co.uk',
  },
  {
    heading: '2. What Data We Collect',
    content:
      'We collect the following types of personal data:\n• Contact information: name, email address, phone number\n• Property information: address, type, estimated value\n• Communication preferences and enquiry details\n• Technical data: IP address, browser type, page visits (via analytics)\n• Financial information where required for AML compliance',
  },
  {
    heading: '3. How We Use Your Data',
    content:
      'We use your personal data to:\n• Respond to your enquiries and provide our services\n• Send you information about properties and auction dates (with your consent)\n• Comply with our legal obligations including anti-money-laundering checks\n• Improve our website and services\n• Contact you about relevant investment opportunities',
  },
  {
    heading: '4. Legal Basis for Processing',
    content:
      'We process your data under the following legal bases:\n• Contract: where processing is necessary to provide our services\n• Legitimate interests: to grow and improve our business\n• Consent: for marketing communications\n• Legal obligation: for AML and regulatory compliance',
  },
  {
    heading: '5. Data Sharing',
    content:
      'We do not sell your personal data. We may share it with:\n• Our solicitor and finance partners (with your consent)\n• IT service providers and website hosts\n• Regulatory authorities where required by law',
  },
  {
    heading: '6. Data Retention',
    content:
      'We retain personal data for as long as necessary to provide our services and comply with legal obligations. Typically, client data is retained for 6 years after our last transaction.',
  },
  {
    heading: '7. Your Rights (GDPR)',
    content:
      'Under UK GDPR, you have the right to:\n• Access your personal data\n• Correct inaccurate data\n• Request erasure of your data\n• Object to processing\n• Data portability\n• Withdraw consent at any time\nTo exercise these rights, contact: info@midaspropertyauctions.co.uk',
  },
  {
    heading: '8. Cookies',
    content:
      'We use essential cookies to operate our website and optional analytics cookies to understand how visitors use our site. You can control cookies via your browser settings.',
  },
  {
    heading: '9. Changes to This Policy',
    content:
      'We may update this policy from time to time. Significant changes will be notified via email where we hold your contact details.',
  },
  {
    heading: '10. Contact',
    content:
      'For privacy queries: info@midaspropertyauctions.co.uk or write to: Midas Property Group Ltd, Stanmore Business & Innovation Centre, Stanmore Place, Honeypot Lane, London HA7 1BT',
  },
]

function renderContent(content: string) {
  const lines = content.split('\n')
  return lines.map((line, index) => {
    if (line.startsWith('•')) {
      return (
        <li key={index} className="flex items-start gap-2 text-[#555] text-sm leading-relaxed">
          <span className="text-[#C9A84C] font-bold mt-0.5 shrink-0">•</span>
          <span>{line.slice(1).trim()}</span>
        </li>
      )
    }
    return (
      <p key={index} className="text-[#555] text-sm leading-relaxed">
        {line}
      </p>
    )
  })
}

export default function PrivacyPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-[#F8F7F4] py-12 pt-24">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-3xl md:text-4xl font-black text-[#1A1A1A] mb-3">Privacy Policy</h1>
          <p className="text-[#666] text-base">Last updated: April 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-6 space-y-10">
          {sections.map((section) => {
            const lines = section.content.split('\n')
            const hasBullets = lines.some((l) => l.startsWith('•'))

            return (
              <div key={section.heading}>
                <h2 className="font-bold text-[#1A1A1A] text-base mb-4">{section.heading}</h2>
                {hasBullets ? (
                  <div className="space-y-2">
                    {lines.map((line, index) => {
                      if (line.startsWith('•')) {
                        return (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-[#555] text-sm leading-relaxed list-none"
                          >
                            <span className="text-[#C9A84C] font-bold mt-0.5 shrink-0">•</span>
                            <span>{line.slice(1).trim()}</span>
                          </li>
                        )
                      }
                      return line.trim() ? (
                        <p key={index} className="text-[#555] text-sm leading-relaxed mb-2">
                          {line}
                        </p>
                      ) : null
                    })}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {renderContent(section.content)}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>
    </main>
  )
}
