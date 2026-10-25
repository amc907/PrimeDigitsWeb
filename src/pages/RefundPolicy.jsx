import React from 'react'
import PolicyPage, { COMPANY } from '../components/PolicyPage'
import { refundPolicyPoints } from '../data/refundPolicy'

const sections = [
  {
    heading: 'Summary',
    points: refundPolicyPoints,
  },
  {
    heading: 'What you are buying',
    paragraphs: [
      'Each plan gives you one dedicated US or Canadian virtual phone number that can receive SMS text messages for a fixed period of 1, 3, 6 or 12 months, plus 15 SMS credits. The full price is charged once, upfront, when you buy.',
      'Your number is activated and reserved for you immediately after payment, and it is removed from our available stock for the whole plan period. Because the service is delivered at the moment of purchase, all sales are final.',
    ],
  },
  {
    heading: 'No refunds after activation',
    paragraphs: ['Once your number has been activated, we do not offer refunds, credits or partial refunds for any of the following:'],
    points: [
      'Unused days remaining on your plan.',
      'Unused SMS credits.',
      'Deciding you no longer need the number, or changing your mind.',
      'A website or app declining to send codes to virtual numbers. Some services block virtual numbers, and we cannot control their decisions.',
      'Account suspension for breaking our Terms of Service.',
      'Purchases of additional SMS credits.',
    ],
  },
  {
    heading: 'The one exception: numbers that do not activate',
    paragraphs: [
      `If your payment goes through but your number does not activate, email ${COMPANY.email} within 24 hours of purchase. We will either activate a working number for you or refund that purchase in full to the original payment method.`,
    ],
  },
  {
    heading: 'How you agree to this policy',
    paragraphs: [
      'Before payment, our checkout shows this no-refund policy and the date your plan will end. You must tick a box confirming "I have read and agree to the no-refund policy and the Terms of Service. I understand this purchase is final and I will not be refunded after my number is activated." The payment button stays disabled until you tick it. If you do not agree, do not buy a plan.',
    ],
  },
  {
    heading: 'Payment disputes and chargebacks',
    paragraphs: [
      `If you have a problem with a charge, please contact us at ${COMPANY.email} first so we can look into it. If you dispute a charge with your bank or card issuer instead, we may share your agreement to this policy, your account details, your number's activation record and your SMS history with our payment processor and your bank as evidence that the service was delivered. Your account may be suspended while a dispute is open.`,
    ],
  },
]

const RefundPolicy = () => (
  <PolicyPage
    title="Refund Policy"
    effectiveDate="October 25, 2026"
    url="/refund-policy"
    intro={`This Refund Policy explains when ${COMPANY.name} ("we", "us") does and does not issue refunds for virtual phone number plans and SMS credits bought at ${COMPANY.website}. It forms part of our Terms of Service.`}
    sections={sections}
  />
)

export default RefundPolicy
