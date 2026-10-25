import React from 'react'
import { Link } from 'react-router-dom'
import { AlertTriangle } from 'lucide-react'
import { refundPolicyPoints, formatDate } from '../data/refundPolicy'

// No-refund warning with a required checkbox, shown before payment
const RefundAgreement = ({ checked, onChange, planLabel, price, expiresOn }) => (
  <div className="rounded-xl border-2 border-red-500/30 bg-red-500/5 p-5">
    <div className="flex items-start gap-3">
      <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0" />
      <div>
        <h3 className="text-lg font-bold text-white">Please read before you buy: no refunds</h3>
        <ul className="mt-3 space-y-2">
          {refundPolicyPoints.map(point => (
            <li key={point} className="flex items-start gap-2 text-sm text-gray-300 leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 flex-shrink-0" />
              {point}
            </li>
          ))}
        </ul>
        {expiresOn && (
          <p className="mt-4 text-sm text-gray-300">
            Your {planLabel} plan for <span className="font-semibold text-white">${price}</span> ends on{' '}
            <span className="font-semibold text-white">{formatDate(expiresOn)}</span>.
          </p>
        )}
      </div>
    </div>

    <label className="mt-5 flex items-start gap-3 p-3 rounded-lg bg-dark-900 border border-dark-700 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        className="mt-0.5 w-5 h-5 rounded accent-brand-500 flex-shrink-0"
      />
      <span className="text-sm text-white leading-relaxed">
        I have read and agree to the{' '}
        <Link to="/refund-policy" target="_blank" className="text-brand-400 font-semibold underline">no-refund policy</Link> and the{' '}
        <Link to="/terms" target="_blank" className="text-brand-400 font-semibold underline">Terms of Service</Link>.
        I understand this purchase is final and I will not be refunded after my number is activated.
      </span>
    </label>
    {!checked && (
      <p className="mt-2 text-xs text-gray-500">
        If you don't agree, please don't buy a plan.
      </p>
    )}
  </div>
)

export default RefundAgreement
