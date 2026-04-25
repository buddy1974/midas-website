import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Complaints Procedure | Midas Property Auctions',
}

export default function ComplaintsPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-[#F8F7F4] py-12 pt-24">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-3xl md:text-4xl font-black text-[#1A1A1A] mb-3">
            Complaints Procedure
          </h1>
          <p className="text-[#666] text-base leading-relaxed">
            We take all complaints seriously and aim to resolve them quickly and fairly.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-6 space-y-10">

          {/* 1 — Our Commitment */}
          <div>
            <h2 className="font-bold text-[#1A1A1A] text-base mb-4">1. Our Commitment</h2>
            <p className="text-[#555] text-sm leading-relaxed">
              Midas Property Group Ltd is committed to providing a high standard of service. If you
              are unhappy with any aspect of our service, please tell us and we will do our best to
              resolve the issue promptly.
            </p>
          </div>

          {/* 2 — Stage 1 */}
          <div>
            <h2 className="font-bold text-[#1A1A1A] text-base mb-4">
              2. Stage 1 — Contact Us Directly
            </h2>
            <p className="text-[#555] text-sm leading-relaxed mb-4">
              In the first instance, please raise your complaint directly with us:
            </p>
            <div className="bg-[#F8F7F4] border border-[#E8E5DE] rounded-xl p-6 space-y-2 text-sm text-[#555]">
              <p>
                <span className="font-semibold text-[#1A1A1A]">Name:</span> Sam Fongho, CEO
              </p>
              <p>
                <span className="font-semibold text-[#1A1A1A]">Email:</span>{' '}
                <a
                  href="mailto:info@midaspropertygroup.co.uk"
                  className="text-[#C9A84C] hover:text-[#E8C96A] transition-colors"
                >
                  info@midaspropertygroup.co.uk
                </a>
              </p>
              <p>
                <span className="font-semibold text-[#1A1A1A]">Phone:</span>{' '}
                <a
                  href="tel:07454753318"
                  className="text-[#C9A84C] hover:text-[#E8C96A] transition-colors"
                >
                  07454 753318
                </a>
              </p>
              <p>
                <span className="font-semibold text-[#1A1A1A]">Address:</span> Stanmore Business
                &amp; Innovation Centre, Stanmore Place, Honeypot Lane, London HA7 1BT
              </p>
            </div>
            <p className="text-[#555] text-sm leading-relaxed mt-4">
              Please provide your name, contact details, a description of your complaint and any
              relevant dates or reference numbers. We will acknowledge your complaint within 3
              working days and aim to resolve it within 15 working days.
            </p>
          </div>

          {/* 3 — Stage 2 */}
          <div>
            <h2 className="font-bold text-[#1A1A1A] text-base mb-4">
              3. Stage 2 — Escalation Within Midas
            </h2>
            <p className="text-[#555] text-sm leading-relaxed">
              If your complaint is not resolved to your satisfaction at Stage 1, you may request
              that it is escalated to a senior member of the team. We will provide a final written
              response within 15 working days of escalation.
            </p>
          </div>

          {/* 4 — Stage 3 */}
          <div>
            <h2 className="font-bold text-[#1A1A1A] text-base mb-4">
              4. Stage 3 — The Property Ombudsman
            </h2>
            <p className="text-[#555] text-sm leading-relaxed mb-4">
              If you remain dissatisfied after exhausting our internal complaints procedure, you
              have the right to refer your complaint to The Property Ombudsman (TPO):
            </p>
            <div className="bg-[#F8F7F4] border border-[#E8E5DE] rounded-xl p-6 space-y-2 text-sm text-[#555]">
              <p className="font-semibold text-[#1A1A1A]">The Property Ombudsman</p>
              <p>Milford House</p>
              <p>43–55 Milford Street</p>
              <p>Salisbury</p>
              <p>Wiltshire</p>
              <p>SP1 2BP</p>
              <div className="pt-2 space-y-1">
                <p>
                  <span className="font-semibold text-[#1A1A1A]">Website:</span>{' '}
                  <a
                    href="https://www.tpos.co.uk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#C9A84C] hover:text-[#E8C96A] transition-colors"
                  >
                    www.tpos.co.uk
                  </a>
                </p>
                <p>
                  <span className="font-semibold text-[#1A1A1A]">Email:</span>{' '}
                  <a
                    href="mailto:admin@tpos.co.uk"
                    className="text-[#C9A84C] hover:text-[#E8C96A] transition-colors"
                  >
                    admin@tpos.co.uk
                  </a>
                </p>
                <p>
                  <span className="font-semibold text-[#1A1A1A]">Phone:</span>{' '}
                  <a
                    href="tel:01722333306"
                    className="text-[#C9A84C] hover:text-[#E8C96A] transition-colors"
                  >
                    01722 333 306
                  </a>
                </p>
              </div>
            </div>
            <p className="text-[#555] text-sm leading-relaxed mt-4">
              Please note: You must have received our final written response before referring to
              TPO. Complaints must be referred within 12 months of our final response.
            </p>
          </div>

          {/* 5 — Important Notes */}
          <div>
            <h2 className="font-bold text-[#1A1A1A] text-base mb-4">5. Important Notes</h2>
            <p className="text-[#555] text-sm leading-relaxed">
              This complaints procedure applies to our estate agency and auction services. We are
              members of The Property Ombudsman scheme and are bound by their Code of Practice.
            </p>
          </div>

          {/* CTA card */}
          <div className="bg-[#F8F7F4] rounded-xl p-6 text-center">
            <p className="font-semibold text-[#1A1A1A] text-sm mb-4">
              Have a complaint? Contact us first.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center text-sm">
              <a
                href="mailto:info@midaspropertygroup.co.uk"
                className="text-[#C9A84C] hover:text-[#E8C96A] transition-colors font-medium"
              >
                info@midaspropertygroup.co.uk
              </a>
              <span className="hidden sm:inline text-[#CCC]">|</span>
              <a
                href="tel:07454753318"
                className="text-[#C9A84C] hover:text-[#E8C96A] transition-colors font-medium"
              >
                07454 753318
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
