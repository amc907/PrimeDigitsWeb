// The no-refund policy shown at checkout, in the FAQ and in the Terms.
// Change VERSION whenever the wording changes, so each purchase records which text the buyer agreed to.
export const REFUND_POLICY_VERSION = '2026-10-25'

export const refundPolicyPoints = [
  'All sales are final. Your number is activated and reserved for you the moment you pay.',
  'No refunds after activation, including for unused days, unused texts, or if you stop needing the number.',
  'Plans do not renew automatically. Your number stops working at the end of the period you paid for.',
  'Some apps block virtual numbers. Not being accepted by a particular app is not a reason for a refund.',
  'If your number does not activate, contact support within 24 hours and we will fix it or refund you.',
]

export const addMonths = (date, months) => {
  const d = new Date(date)
  d.setMonth(d.getMonth() + months)
  return d
}

export const formatDate = (date) =>
  date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
