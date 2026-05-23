import React from 'react'

const Terms = () => {
  return (
    <div className="pt-24 pb-20 lg:pt-32 lg:pb-28 animate-fade-in">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-8">Terms of Service</h1>
        <div className="prose prose-invert prose-gray max-w-none">
          <p className="text-gray-400">Last updated: May 23, 2026</p>
          
          <h2 className="text-xl font-semibold text-white mt-8 mb-4">1. Company Information</h2>
          <p className="text-gray-400 leading-relaxed">
            Prime Digits is a registered US business (EIN: 42-2601844). Our US headquarters is located at 
            518 Magnolia Dr, Osceola, AR 72370, United States. Our UK office is located at 39 Ludgate Hill, 
            London, EC4M 7JN, United Kingdom. Our website is https://primesdigits.com and our support email 
            is support@primesdigits.com.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">2. Acceptance of Terms</h2>
          <p className="text-gray-400 leading-relaxed">
            By accessing or using Prime Digits services, you agree to be bound by these Terms of Service. 
            If you do not agree to these terms, please do not use our services. These terms constitute a 
            legally binding agreement between you and Prime Digits.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">3. Description of Service</h2>
          <p className="text-gray-400 leading-relaxed">
            Prime Digits provides virtual phone numbers for receiving SMS messages. Our service is intended 
            for legitimate verification purposes, business use, app development and testing, and privacy protection. 
            Numbers are provided on a subscription basis with included SMS credits.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">4. User Accounts</h2>
          <p className="text-gray-400 leading-relaxed">
            You must provide accurate and complete information when creating an account. You are responsible 
            for maintaining the confidentiality of your account credentials and for all activities under your account. 
            You must be at least 18 years old to use our services.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">5. Prohibited Uses</h2>
          <p className="text-gray-400 leading-relaxed">
            You agree NOT to use our service for any of the following purposes:
          </p>
          <ul className="list-disc pl-5 text-gray-400 space-y-2 mt-2">
            <li>No spam or unsolicited messages — You may not use our numbers to send spam, bulk unsolicited messages, or harass any individual or entity.</li>
            <li>No fraud or impersonation — You may not use our service to impersonate others, commit fraud, or engage in deceptive practices.</li>
            <li>No illegal activities — You may not use our service for any activity that violates applicable local, state, federal, or international laws.</li>
            <li>No reselling without authorization — You may not resell, sublicense, or redistribute our numbers or services without express written permission.</li>
            <li>Numbers for legitimate verification only — Our numbers are intended for legitimate SMS verification, testing, and business communication purposes only.</li>
            <li>No use on platforms that explicitly prohibit virtual numbers where such prohibition is clearly stated and enforceable.</li>
          </ul>
          <p className="text-gray-400 leading-relaxed mt-4">
            We reserve the right to suspend or terminate accounts found in violation of these prohibited uses without refund.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">6. Payments and Refunds</h2>
          <p className="text-gray-400 leading-relaxed">
            All prices are listed in USD. Due to the instant nature of our service, refunds are granted at our 
            discretion on a case-by-case basis. Please contact support within 24 hours if you experience issues. 
            Subscription fees are charged upfront for the selected duration. Failed payments may result in service suspension.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">7. Service Availability</h2>
          <p className="text-gray-400 leading-relaxed">
            While we strive for 99.9% uptime, we do not guarantee uninterrupted service. We are not liable 
            for any damages resulting from service interruptions or delays in SMS delivery. SMS delivery times 
            may vary depending on the sending carrier and network conditions.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">8. Privacy</h2>
          <p className="text-gray-400 leading-relaxed">
            Your privacy is important to us. Please review our Privacy Policy to understand how we collect, 
            use, and protect your personal information. We comply with GDPR and CCPA requirements.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">9. Number Ownership</h2>
          <p className="text-gray-400 leading-relaxed">
            Virtual numbers are licensed to you for the duration of your active subscription. You do not own 
            the numbers. Upon expiry or cancellation, numbers may be returned to our pool and reassigned. 
            We recommend backing up any important messages before expiry.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">10. Modifications</h2>
          <p className="text-gray-400 leading-relaxed">
            We reserve the right to modify these terms at any time. Continued use of our service after 
            changes constitutes acceptance of the updated terms. Material changes will be notified via email 
            or through the website.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">11. Governing Law</h2>
          <p className="text-gray-400 leading-relaxed">
            These Terms of Service shall be governed by and construed in accordance with the laws of the State 
            of Arkansas, United States, without regard to its conflict of law provisions. Any disputes arising 
            under these terms shall be subject to the exclusive jurisdiction of the courts in Arkansas.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">12. Limitation of Liability</h2>
          <p className="text-gray-400 leading-relaxed">
            To the maximum extent permitted by law, Prime Digits shall not be liable for any indirect, incidental, 
            special, consequential, or punitive damages arising out of or relating to your use of our services.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">13. Contact</h2>
          <p className="text-gray-400 leading-relaxed">
            For questions about these terms, please contact us at support@primesdigits.com or by mail at 
            518 Magnolia Dr, Osceola, AR 72370, United States.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Terms
