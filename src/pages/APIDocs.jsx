import React, { useState } from 'react'
import { Code, Terminal, Globe, AlertTriangle, Copy, Check } from 'lucide-react'
import Card from '../components/ui/Card'

const APIDocs = () => {
  const [copiedIndex, setCopiedIndex] = useState(null)

  const copyCode = (code, index) => {
    navigator.clipboard.writeText(code)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const endpoints = [
    {
      method: 'GET',
      path: '/numbers',
      description: 'List all virtual numbers associated with your account.',
      auth: true,
      response: `{
  "numbers": [
    {
      "id": 1,
      "phone_number": "+1 (555) 123-4567",
      "country": "US",
      "expires_at": "2026-12-31T23:59:59Z",
      "credits": 15,
      "status": "active"
    }
  ]
}`,
    },
    {
      method: 'POST',
      path: '/numbers/buy',
      description: 'Purchase a new virtual number.',
      auth: true,
      body: `{
  "country": "US",
  "duration_months": 3,
  "amount": 9.99
}`,
      response: `{
  "id": 2,
  "phone_number": "+1 (555) 987-6543",
  "country": "US",
  "expires_at": "2026-09-23T00:00:00Z",
  "credits": 15,
  "status": "active"
}`,
    },
    {
      method: 'GET',
      path: '/sms/{number_id}',
      description: 'Get SMS messages received by a specific number.',
      auth: true,
      response: `{
  "messages": [
    {
      "id": 101,
      "from_number": "+14155551234",
      "message": "Your code is 284756",
      "created_at": "2026-05-23T09:12:00Z",
      "status": "delivered"
    }
  ]
}`,
    },
    {
      method: 'DELETE',
      path: '/numbers/{id}',
      description: 'Release a virtual number from your account.',
      auth: true,
      response: `{
  "message": "Number released successfully"
}`,
    },
  ]

  const codeExamples = [
    {
      language: 'cURL',
      code: `curl -X GET https://web-production-f778e.up.railway.app/numbers \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`,
    },
    {
      language: 'JavaScript',
      code: `const response = await fetch('https://web-production-f778e.up.railway.app/numbers', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
});

const data = await response.json();
console.log(data.numbers);`,
    },
    {
      language: 'Python',
      code: `import requests

headers = {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
}

response = requests.get(
    'https://web-production-f778e.up.railway.app/numbers',
    headers=headers
)

data = response.json()
print(data['numbers'])`,
    },
  ]

  const errorCodes = [
    { code: '200', meaning: 'OK', description: 'Request succeeded' },
    { code: '201', meaning: 'Created', description: 'Resource created successfully' },
    { code: '400', meaning: 'Bad Request', description: 'Invalid request parameters' },
    { code: '401', meaning: 'Unauthorized', description: 'Invalid or missing API key' },
    { code: '403', meaning: 'Forbidden', description: 'Insufficient permissions' },
    { code: '404', meaning: 'Not Found', description: 'Resource does not exist' },
    { code: '429', meaning: 'Too Many Requests', description: 'Rate limit exceeded' },
    { code: '500', meaning: 'Server Error', description: 'Internal server error' },
  ]

  return (
    <div className="pt-24 pb-20 lg:pt-32 lg:pb-28 animate-fade-in">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">API Documentation</h1>
          <p className="mt-4 text-lg text-gray-400">
            Integrate Prime Digits into your applications with our simple REST API.
          </p>
        </div>

        {/* Overview */}
        <Card className="p-6 mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Globe className="w-6 h-6 text-gold-500" />
            <h2 className="text-xl font-semibold text-white">Base URL</h2>
          </div>
          <code className="block p-3 bg-dark-950 rounded-lg text-gold-400 text-sm font-mono">
            https://web-production-f778e.up.railway.app
          </code>
        </Card>

        {/* Authentication */}
        <Card className="p-6 mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Terminal className="w-6 h-6 text-gold-500" />
            <h2 className="text-xl font-semibold text-white">Authentication</h2>
          </div>
          <p className="text-gray-400 text-sm mb-4">
            All API requests require authentication using your API key in the Authorization header. 
            You can find your API key in your account settings.
          </p>
          <code className="block p-3 bg-dark-950 rounded-lg text-gray-300 text-sm font-mono">
            Authorization: Bearer {'<YOUR_API_KEY>'}
          </code>
        </Card>

        {/* Endpoints */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Endpoints</h2>
          <div className="space-y-4">
            {endpoints.map((ep, i) => (
              <Card key={i} className="p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                    ep.method === 'GET' ? 'bg-blue-500/20 text-blue-400' :
                    ep.method === 'POST' ? 'bg-green-500/20 text-green-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {ep.method}
                  </span>
                  <code className="text-gold-400 text-sm font-mono">{ep.path}</code>
                  {ep.auth && (
                    <span className="px-2 py-0.5 bg-gold-500/10 text-gold-400 text-xs rounded border border-gold-500/20">
                      Auth Required
                    </span>
                  )}
                </div>
                <p className="text-gray-400 text-sm mb-3">{ep.description}</p>
                {ep.body && (
                  <div className="mb-3">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Request Body</p>
                    <pre className="p-3 bg-dark-950 rounded-lg text-gray-300 text-xs font-mono overflow-x-auto">{ep.body}</pre>
                  </div>
                )}
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Response</p>
                  <pre className="p-3 bg-dark-950 rounded-lg text-gray-300 text-xs font-mono overflow-x-auto">{ep.response}</pre>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Code Examples */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Code Examples</h2>
          <div className="space-y-4">
            {codeExamples.map((ex, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2 bg-dark-800 border-b border-dark-700">
                  <span className="text-sm text-gray-300 font-medium">{ex.language}</span>
                  <button
                    onClick={() => copyCode(ex.code, i)}
                    className="flex items-center text-xs text-gray-400 hover:text-white transition-colors"
                  >
                    {copiedIndex === i ? (
                      <><Check className="w-3 h-3 mr-1" /> Copied</>
                    ) : (
                      <><Copy className="w-3 h-3 mr-1" /> Copy</>
                    )}
                  </button>
                </div>
                <pre className="p-4 bg-dark-950 text-gray-300 text-sm font-mono overflow-x-auto">{ex.code}</pre>
              </Card>
            ))}
          </div>
        </div>

        {/* Rate Limits */}
        <Card className="p-6 mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-gold-500" />
            <h2 className="text-xl font-semibold text-white">Rate Limits</h2>
          </div>
          <p className="text-gray-400 text-sm mb-4">
            To ensure fair usage for all users, the following rate limits apply:
          </p>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-gold-500 mr-2" />100 requests per minute per API key</li>
            <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-gold-500 mr-2" />1,000 requests per hour per API key</li>
            <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-gold-500 mr-2" />SMS history limited to last 100 messages per request</li>
          </ul>
        </Card>

        {/* Error Codes */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Error Codes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {errorCodes.map((err, i) => (
              <Card key={i} className="p-4">
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                    err.code.startsWith('2') ? 'bg-green-500/20 text-green-400' :
                    err.code.startsWith('4') ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {err.code}
                  </span>
                  <div>
                    <p className="text-white text-sm font-medium">{err.meaning}</p>
                    <p className="text-gray-500 text-xs">{err.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Coming Soon */}
        <Card className="p-6 border-gold-500/20">
          <div className="flex items-center space-x-3 mb-3">
            <Code className="w-6 h-6 text-gold-500" />
            <h2 className="text-xl font-semibold text-white">Coming Soon</h2>
            <span className="px-2 py-0.5 bg-gold-500/10 text-gold-400 text-xs rounded border border-gold-500/20">
              Coming Soon
            </span>
          </div>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-gold-500 mr-2" />Webhooks for incoming SMS</li>
            <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-gold-500 mr-2" />Bulk number purchasing</li>
            <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-gold-500 mr-2" />Number reservation system</li>
            <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-gold-500 mr-2" />SDK for Node.js and Python</li>
          </ul>
        </Card>
      </div>
    </div>
  )
}

export default APIDocs
