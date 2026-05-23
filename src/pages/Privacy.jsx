import React from 'react'

const Privacy = () => {
  return (
    <div className="pt-24 pb-20 lg:pt-32 lg:pb-28 animate-fade-in">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-8">Privacy Policy</h1>
        <div className="prose prose-invert prose-gray max-w-none">
          <p className="text-gray-400">Last updated: May 23, 2026</p>
          
          <h2 className="text-xl font-semibold text-white mt-8 mb-4">1. Company Information</h2>
          <p className="text-gray-400 leading-relaxed">
            Prime Digits (EIN: 42-2601844) is committed to protecting your privacy. Our US headquarters is located 
            at 518 Magnolia Dr, Osceola, AR 72370, United States. Our UK office is located at 39 Ludgate Hill, 
            London, EC4M 7JN, United Kingdom. This Privacy Policy explains how we collect, use, and safeguard 
            your information when you use our services.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">2. Compliance</h2>
          <p className="text-gray-400 leading-relaxed">
            Prime Digits is GDPR compliant through our UK office and CCPA compliant as a US business. We adhere 
            to international data protection standards and respect your privacy rights regardless of your location.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">3. Information We Collect</h2>
          <p className="text-gray-400 leading-relaxed">
            We collect information you provide directly to us, including:
          </p>
          <ul className="list-disc pl-5 text-gray-400 space-y-2 mt-2">
            <li>Your name and email address</li>
            <li>Payment information (processed securely by our payment partners)</li>
            <li>Account credentials</li>
            <li>Usage data and SMS metadata necessary to provide our service</li>
            <li>Device and browser information for security purposes</li>
            <li>IP address and log data</li>
          </ul>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">4. How We Use Your Information</h2>
          <p className="text-gray-400 leading-relaxed">
            We use your information to:
          </p>
          <ul className="list-disc pl-5 text-gray-400 space-y-2 mt-2">
            <li>Provide and improve our services</li>
            <li>Process payments and maintain your account</li>
            <li>Communicate with you about your account and updates</li>
            <li>Ensure the security of our platform</li>
            <li>Comply with legal obligations</li>
            <li>Detect and prevent fraud or abuse</li>
          </ul>
          <p className="text-gray-400 leading-relaxed mt-4">
            We do not sell your personal information to third parties.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">5. Data Security</h2>
          <p className="text-gray-400 leading-relaxed">
            We implement industry-standard security measures to protect your data. All communications 
            are encrypted using SSL/TLS, and access to personal information is restricted to authorized 
            personnel only. We regularly review and update our security practices.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">6. Data Retention</h2>
          <p className="text-gray-400 leading-relaxed">
            We retain your personal information for as long as necessary to provide our services and 
            comply with legal obligations. SMS messages are retained according to your plan duration 
            and any applicable legal requirements. After account closure, we retain minimal data for 
            legal and accounting purposes for up to 7 years, after which it is securely deleted.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">7. Your Rights</h2>
          <p className="text-gray-400 leading-relaxed">
            Depending on your jurisdiction, you have the right to:
          </p>
          <ul className="list-disc pl-5 text-gray-400 space-y-2 mt-2">
            <li>Access the personal data we hold about you</li>
            <li>Correct inaccurate or incomplete data</li>
            <li>Request deletion of your personal data</li>
            <li>Object to or restrict certain processing activities</li>
            <li>Request a copy of your data in a portable format</li>
            <li>Withdraw consent at any time</li>
          </ul>
          <p className="text-gray-400 leading-relaxed mt-4">
            To exercise these rights, contact us at support@primesdigits.com.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">8. Cookies and Tracking</h2>
          <p className="text-gray-400 leading-relaxed">
            We use cookies and similar technologies to enhance your experience, analyze usage, and 
            improve our services. You can control cookie preferences through your browser settings. 
            Essential cookies necessary for the operation of our service cannot be disabled.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">9. Third-Party Services</h2>
          <p className="text-gray-400 leading-relaxed">
            We may use third-party services for payment processing, analytics, and infrastructure. 
            These services have their own privacy policies and handle data according to their respective 
            terms. We only share data necessary for them to perform their services.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">10. International Transfers</h2>
          <p className="text-gray-400 leading-relaxed">
            Your data may be transferred to and processed in countries other than your own, including 
            the United States and the United Kingdom. We ensure appropriate safeguards are in place 
            to protect your data during such transfers.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">11. Children's Privacy</h2>
          <p className="text-gray-400 leading-relaxed">
            Our services are not intended for individuals under 18 years of age. We do not knowingly 
            collect personal information from children. If you believe we have collected data from a 
            minor, please contact us immediately.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">12. Changes to This Policy</h2>
          <p className="text-gray-400 leading-relaxed">
            We may update this privacy policy from time to time. We will notify you of significant 
            changes by posting the new policy on our website and, where appropriate, via email.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">13. Contact Us</h2>
          <p className="text-gray-400 leading-relaxed">
            If you have questions about this privacy policy or our data practices, please contact us at 
            support@primesdigits.com or by mail at 518 Magnolia Dr, Osceola, AR 72370, United States.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Privacy
