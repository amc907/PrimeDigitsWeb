// Per-page <title> and description, so tabs, bookmarks and Google results
// show something specific instead of the same text on every page.
const SITE = 'PrimeDigits'
const DEFAULT_DESCRIPTION =
  'Get a real US or Canadian phone number in about a minute. Read texts and verification codes from any browser and keep your personal number private.'

export const PAGE_META = {
  '/': { title: 'PrimeDigits: Your second phone number', description: DEFAULT_DESCRIPTION, exact: true },
  '/how-it-works': { title: 'How it works', description: 'Pick a country, choose how long, and start getting texts in about a minute.' },
  '/pricing': { title: 'Pricing', description: 'US and Canadian numbers from $3.99 a month with 15 texts included. Longer plans cost less.' },
  '/use-cases': { title: 'What people use it for', description: 'Sign-up codes, freelancing, a business line, privacy and app testing.' },
  '/guides': { title: 'Guides', description: 'Short how-tos for getting and using a second phone number.' },
  '/invest': { title: 'Invest in PrimeDigits', description: 'Own a piece of PrimeDigits. Investments start at $500 through an SEC-registered funding portal.' },
  '/about': { title: 'About us', description: 'PrimeDigits is a registered US company that makes it easy to get a second phone number.' },
  '/faq': { title: 'Questions & answers', description: 'Quick answers about numbers, texts and payments.' },
  '/contact': { title: 'Contact us', description: "Questions or need a hand? Send us a message and we'll help." },
  '/terms': { title: 'Terms of Service' },
  '/privacy': { title: 'Privacy Policy' },
  '/refund-policy': { title: 'Refund Policy', description: 'All sales are final. When PrimeDigits does and does not issue refunds.' },
  '/cancellation-policy': { title: 'Cancellation Policy', description: 'PrimeDigits plans are prepaid and never renew automatically. How plans end and how to stop service.' },
  '/api-docs': { title: 'API docs' },
  '/login': { title: 'Log in' },
  '/register': { title: 'Create your free account' },
  '/dashboard': { title: 'Dashboard' },
  '/buy': { title: 'Get a new number' },
  '/numbers': { title: 'My numbers' },
  '/history': { title: 'SMS history' },
  '/sms-inbox': { title: 'Inbox' },
  '/credits': { title: 'Add text credits' },
  '/transactions': { title: 'Payments' },
  '/profile': { title: 'Profile' },
  '/support': { title: 'Help' },
}

export const formatTitle = (title) => (title === PAGE_META['/'].title ? title : `${title} · ${SITE}`)

const setMeta = (selector, attr, value) => {
  document.querySelector(selector)?.setAttribute(attr, value)
}

export const setPageMeta = ({ title, description = DEFAULT_DESCRIPTION }) => {
  const fullTitle = formatTitle(title)
  document.title = fullTitle
  setMeta('meta[name="description"]', 'content', description)
  setMeta('meta[property="og:title"]', 'content', fullTitle)
  setMeta('meta[property="og:description"]', 'content', description)
  setMeta('meta[name="twitter:title"]', 'content', fullTitle)
  setMeta('meta[name="twitter:description"]', 'content', description)
}

// Pages with their own dynamic meta (like a single guide) return null and set it themselves
export const getMetaForPath = (pathname) => {
  if (PAGE_META[pathname]) return PAGE_META[pathname]
  if (pathname.startsWith('/guides/')) return null
  return { title: 'Page not found' }
}
