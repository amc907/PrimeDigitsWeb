const API_BASE_URL = 'https://web-production-f778e.up.railway.app'

const getToken = () => localStorage.getItem('primedigits_token')

const headers = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${getToken() || ''}`,
})

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }))
    throw new Error(error.message || `HTTP ${response.status}`)
  }
  return response.json()
}

export const api = {
  // Auth
  register: async (email, password, fullName) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, full_name: fullName }),
    })
    return handleResponse(response)
  },

  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    return handleResponse(response)
  },

  // Numbers
  getMyNumbers: async () => {
    const response = await fetch(`${API_BASE_URL}/numbers/my`, {
      headers: headers(),
    })
    return handleResponse(response)
  },

  buyNumber: async (country, duration, amount) => {
    const response = await fetch(`${API_BASE_URL}/numbers/buy`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({ country, duration_months: duration, amount }),
    })
    return handleResponse(response)
  },

  deleteNumber: async (numberId) => {
    const response = await fetch(`${API_BASE_URL}/numbers/${numberId}`, {
      method: 'DELETE',
      headers: headers(),
    })
    return handleResponse(response)
  },

  // SMS
  getSMSHistory: async (numberId) => {
    const response = await fetch(`${API_BASE_URL}/sms/history/${numberId}`, {
      headers: headers(),
    })
    return handleResponse(response)
  },

  // Credits
  getCredits: async (numberId) => {
    const response = await fetch(`${API_BASE_URL}/credits/${numberId}`, {
      headers: headers(),
    })
    return handleResponse(response)
  },

  buyCredits: async (numberId, amount) => {
    const response = await fetch(`${API_BASE_URL}/credits/buy`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({ number_id: numberId, amount }),
    })
    return handleResponse(response)
  },

  // Transactions
  getTransactions: async () => {
    const response = await fetch(`${API_BASE_URL}/transactions/my`, {
      headers: headers(),
    })
    return handleResponse(response)
  },

  // Bachs Payments
  // The backend creates a Bachs hosted checkout session with its secret key and returns
  // { checkout_url, checkout_id }. Payment is confirmed by the Bachs webhook, not the redirect.
  // purpose is 'number' (country + duration_months) or 'credits' (number_id + sms_credits).
  // The refund_policy_* fields record that the buyer agreed to the no-refund policy;
  // the backend should copy them into the checkout session metadata for dispute evidence.
  createCheckout: async (order) => {
    const response = await fetch(`${API_BASE_URL}/payments/bachs/create-checkout`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(order),
    })
    return handleResponse(response)
  },

  // Web user numbers (for polling after payment)
  getWebNumbers: async (email) => {
    const response = await fetch(`${API_BASE_URL}/numbers/web/${encodeURIComponent(email)}`, {
      headers: headers(),
    })
    return handleResponse(response)
  },
}
