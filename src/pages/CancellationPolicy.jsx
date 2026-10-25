import React from 'react'
import PolicyPage, { COMPANY } from '../components/PolicyPage'

const sections = [
  {
    heading: 'Summary',
    points: [
      'Plans are prepaid for a fixed period and do not renew automatically.',
      'You are never charged again unless you choose to make a new purchase yourself.',
      'There is nothing to cancel to stop future charges, because there are none.',
      'You can stop using your number at any time, but stopping early does not lead to a refund.',
    ],
  },
  {
    heading: 'No automatic renewals or recurring charges',
    paragraphs: [
      'Every plan (1, 3, 6 or 12 months) is a one-time payment charged in full when you buy it. We do not store your card for future charges, and we do not run subscriptions. When your plan period ends, your number simply stops working and no further payment is taken.',
      'Before you pay, our checkout shows the exact date your plan ends. Your dashboard also shows how many days are left on each number.',
    ],
  },
  {
    heading: 'Ending your service early',
    paragraphs: [
      'You can stop using your number whenever you like. You can also delete a number from the My Numbers page in your dashboard. Deleting a number ends the service for that number immediately and cannot be undone.',
      'Ending early does not entitle you to a refund for the remaining days or unused SMS credits. Please see our Refund Policy.',
    ],
  },
  {
    heading: 'Closing your account',
    paragraphs: [
      `To close your PrimeDigits account, email ${COMPANY.email} from the email address on your account. Closing your account ends service on all of your numbers. It does not lead to a refund for time remaining on any plan.`,
    ],
  },
  {
    heading: 'If you were charged and believe you should not have been',
    paragraphs: [
      `Because there are no recurring charges, every charge on your statement is for a purchase made from your account. If you do not recognise a charge, contact ${COMPANY.email} within 30 days and include the date and amount. We will show you which purchase it was for and, if your account was used without your permission, help you secure it.`,
    ],
  },
  {
    heading: 'Cancellation by us',
    paragraphs: [
      'We may suspend or end your service if you break our Terms of Service, for example by using a number for fraud, spam or illegal activity. Service ended for this reason is not refunded.',
    ],
  },
]

const CancellationPolicy = () => (
  <PolicyPage
    title="Cancellation Policy"
    effectiveDate="October 25, 2026"
    url="/cancellation-policy"
    intro={`This Cancellation Policy explains how ${COMPANY.name} ("we", "us") plans end and how you can stop using our service. It forms part of our Terms of Service.`}
    sections={sections}
  />
)

export default CancellationPolicy
