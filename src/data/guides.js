// Help guides shown at /guides. Each body is a list of blocks:
// { h2 }, { p }, { list: [...] }, { steps: [...] } or { tip }.
export const guides = [
  {
    slug: 'us-phone-number-for-whatsapp',
    title: 'How to get a US phone number for WhatsApp',
    description: 'Set up WhatsApp with a US number from anywhere in the world, without a US SIM card.',
    readMinutes: 4,
    body: [
      { p: "WhatsApp asks for a phone number when you sign up, and sends a 6-digit code to it. That number doesn't have to be the one on your SIM card. A US virtual number works too, as long as it can receive a text." },
      { h2: 'Why use a separate number?' },
      { list: [
        'You live outside the US but want a US number for work or family.',
        "You want a WhatsApp account that isn't tied to your personal number.",
        'You run a small business and want a separate line for customers.',
      ] },
      { h2: 'Step by step' },
      { steps: [
        'Create a free PrimeDigits account and pick a United States number.',
        'Open WhatsApp on your phone and start the sign-up.',
        'Choose the United States (+1) and type in your PrimeDigits number.',
        'When WhatsApp offers to send a code, choose text message (SMS), not a phone call.',
        'Open your PrimeDigits inbox. The code shows up within seconds. Tap Copy and paste it into WhatsApp.',
      ] },
      { tip: 'PrimeDigits numbers receive texts but not voice calls. If WhatsApp only offers a call, wait for the timer and ask it to resend by SMS.' },
      { h2: 'Good to know' },
      { list: [
        'WhatsApp may ask for a new code if you reinstall the app or switch phones. Keep your number active so you can still receive it.',
        'Some apps block virtual numbers. Most accept them, but if you need it for one specific app, start with a monthly plan and try it first.',
        'Turn on two-step verification in WhatsApp settings to protect your account with a PIN.',
      ] },
    ],
  },
  {
    slug: 'canadian-phone-number-online',
    title: 'How to get a Canadian phone number online',
    description: 'Get a real Canadian (+1) number in about a minute, even if you are not in Canada.',
    readMinutes: 3,
    body: [
      { p: "Moving to Canada, working with Canadian clients, or signing up for a service that only accepts Canadian numbers? You don't need a Canadian SIM card. A virtual number gives you a real +1 Canadian number that receives texts online." },
      { h2: 'What you can use it for' },
      { list: [
        'Sign-up and verification codes for Canadian apps and websites.',
        'A local contact number for Canadian clients or landlords.',
        'Setting things up before you arrive in Canada.',
      ] },
      { h2: 'How to get one' },
      { steps: [
        'Create a free PrimeDigits account.',
        'Go to Buy Number and choose Canada.',
        'Pick how long you want it: 1, 3, 6 or 12 months.',
        'Pay securely by card. Your number is live right away.',
        'Texts sent to it show up in your PrimeDigits inbox on any device.',
      ] },
      { tip: 'Canadian and US numbers both start with +1, so they work the same way in most sign-up forms. Just make sure Canada is selected in the country list.' },
      { h2: 'How much does it cost?' },
      { p: 'Plans start at $3.99 a month with 15 texts included. Longer plans cost less per month, down to $2.50 a month on the yearly plan.' },
    ],
  },
  {
    slug: 'keep-your-phone-number-private',
    title: 'How to keep your real phone number private online',
    description: 'Simple ways to stop giving out your personal number, and cut down on spam texts and calls.',
    readMinutes: 4,
    body: [
      { p: 'Every website seems to want your phone number: shops, delivery apps, dating apps, Wi-Fi sign-ins, contests. Each one is another place your number can leak, get sold, or end up on a spam list.' },
      { h2: 'Why it matters' },
      { list: [
        'Your phone number is often linked to your name, address and other accounts.',
        'Once it leaks, spam texts and robocalls are hard to stop.',
        'Scammers use leaked numbers to try SIM swaps and fake "account problem" texts.',
      ] },
      { h2: 'Five easy habits' },
      { steps: [
        'Only give your real number to people and services you actually trust, like your bank.',
        'Use a second number for everything else: sign-ups, deliveries, online sellers, one-off forms.',
        'Skip optional phone fields. If a form does not require it, leave it blank.',
        'Use an authenticator app for two-factor codes on important accounts when the site offers it.',
        'Never share a verification code with anyone who contacts you, even if they say they are from the company.',
      ] },
      { tip: 'A PrimeDigits number is a cheap way to do step 2. Use it anywhere you would rather not give your real number, and read the texts from any browser.' },
    ],
  },
]

export const getGuide = (slug) => guides.find(g => g.slug === slug)
