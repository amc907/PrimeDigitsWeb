import React from 'react'

export const COMPANY = {
  name: 'Prime Digits',
  ein: '42-2601844',
  address: '518 Magnolia Dr, Osceola, AR 72370, United States',
  website: 'https://primesdigits.com',
  email: 'support@primesdigits.com',
}

// Shared layout for the refund and cancellation policies. Sections are
// { heading, paragraphs?: [], points?: [] }. Prints cleanly to PDF.
const PolicyPage = ({ title, effectiveDate, intro, sections, url }) => (
  <div className="pt-24 pb-20 lg:pt-32 lg:pb-28 animate-fade-in print:p-0">
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 print:max-w-none print:px-0">
      <p className="hidden print:block text-sm font-semibold mb-2">
        {COMPANY.name} · EIN {COMPANY.ein} · {COMPANY.website}
      </p>
      <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">{title}</h1>
      <p className="text-gray-400">Effective date: {effectiveDate}</p>
      <p className="mt-6 text-gray-300 leading-relaxed print:text-[#222]">{intro}</p>

      {sections.map((section, i) => (
        <section key={section.heading} className="break-inside-avoid">
          <h2 className="text-xl font-semibold text-white mt-8 mb-3">{i + 1}. {section.heading}</h2>
          {section.paragraphs?.map(p => (
            <p key={p} className="text-gray-400 leading-relaxed print:text-[#222] mb-3">{p}</p>
          ))}
          {section.points && (
            <ul className="space-y-2 mb-3">
              {section.points.map(point => (
                <li key={point} className="flex items-start gap-2 text-gray-400 leading-relaxed print:text-[#222]">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-2.5 flex-shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}

      <section className="break-inside-avoid">
        <h2 className="text-xl font-semibold text-white mt-8 mb-3">{sections.length + 1}. Contact</h2>
        <p className="text-gray-400 leading-relaxed print:text-[#222]">
          {COMPANY.name}, {COMPANY.address}. Email {COMPANY.email}. Website {COMPANY.website}. EIN {COMPANY.ein}.
        </p>
      </section>

      <p className="hidden print:block mt-10 text-xs text-gray-500">
        This policy is published at {COMPANY.website}{url}
      </p>
    </div>
  </div>
)

export default PolicyPage
