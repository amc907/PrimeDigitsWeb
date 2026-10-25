// Settings for the /invest page. Edit this file when your crowdfunding campaign goes live.
//
// status: 'coming_soon' -> shows company facts and a no-money interest form
//         'live'        -> shows the offering terms and sends investors to the funding portal
//
// Investments are only ever made on the funding portal. This website never takes payment for shares.
export const investing = {
  status: 'coming_soon',

  minInvestment: 500,

  // Fill these in from your Form C once the campaign is filed and live
  portalName: null, // e.g. 'Wefunder', 'StartEngine' or 'Republic'
  campaignUrl: null, // full https:// link to your campaign page on the portal
  securityType: null, // e.g. 'Common stock' or 'Crowd SAFE'
  pricePerShare: null, // e.g. '$1.00'
  targetAmount: null, // e.g. '$50,000'
  maximumAmount: null, // e.g. '$500,000'
  deadline: null, // e.g. 'March 31, 2027'

  // Where interest-form sign-ups are emailed
  contactEmail: 'support@primesdigits.com',
}
