// Stripe's card field lives in an iframe, so it needs its colors passed in directly
export const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#14121f',
      fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
      fontSize: '16px',
      '::placeholder': {
        color: '#6b7280',
      },
    },
    invalid: {
      color: '#ef4444',
      iconColor: '#ef4444',
    },
  },
}
