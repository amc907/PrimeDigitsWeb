import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Phone, Inbox, KeyRound, Bell, ArrowRight } from 'lucide-react'
import Modal from './ui/Modal'
import Button from './ui/Button'

const DONE_KEY = 'primedigits_tour_done'

export const shouldShowTour = () => {
  try {
    return localStorage.getItem(DONE_KEY) !== '1'
  } catch (err) {
    return false
  }
}

const markDone = () => {
  try {
    localStorage.setItem(DONE_KEY, '1')
  } catch (err) {
    // Storage blocked - the tour may show again next visit
  }
}

// Short first-visit walkthrough shown on the dashboard
const WelcomeTour = ({ open, onClose, hasNumber }) => {
  const [step, setStep] = useState(0)

  const steps = [
    hasNumber
      ? { icon: Phone, title: 'This is your number', text: 'Your PrimeDigits number is at the top of the dashboard. Copy it and use it anywhere you would rather not give your real number.' }
      : { icon: Phone, title: 'Start with a number', text: 'Pick a US or Canadian number. It is ready the moment payment goes through.' },
    { icon: Inbox, title: 'Texts land in your inbox', text: 'Every text is grouped by sender, like a chat app. Search, pin conversations, or download them as a CSV.' },
    { icon: KeyRound, title: 'Codes in one tap', text: 'When a verification code arrives, it shows up big at the top of your inbox with a Copy button.' },
    { icon: Bell, title: 'Never miss a code', text: 'Turn on Alerts in the inbox and your browser will tell you the moment a new text arrives.' },
  ]

  const close = () => {
    markDone()
    setStep(0)
    onClose()
  }

  const current = steps[step]
  const isLast = step === steps.length - 1

  return (
    <Modal open={open} onClose={close}>
      <div className="p-6 sm:p-8">
        <p className="text-xs font-semibold text-brand-400 uppercase tracking-wider">
          Welcome to PrimeDigits · {step + 1} of {steps.length}
        </p>
        <div className="mt-5 w-14 h-14 rounded-2xl bg-brand-500/10 flex items-center justify-center">
          <current.icon className="w-7 h-7 text-brand-400" />
        </div>
        <h2 className="mt-4 text-2xl font-bold text-white">{current.title}</h2>
        <p className="mt-2 text-gray-400 leading-relaxed">{current.text}</p>

        {/* Progress dots */}
        <div className="mt-6 flex gap-1.5">
          {steps.map((_, i) => (
            <span key={i} className={`h-1.5 rounded-full transition-all ${i === step ? 'w-6 bg-brand-500' : 'w-1.5 bg-dark-700'}`} />
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between gap-3">
          <button onClick={close} className="text-sm text-gray-500 hover:text-gray-300">
            Skip
          </button>
          <div className="flex gap-2">
            {step > 0 && (
              <Button variant="secondary" size="sm" onClick={() => setStep(step - 1)}>Back</Button>
            )}
            {!isLast && (
              <Button variant="primary" size="sm" onClick={() => setStep(step + 1)}>
                Next <ArrowRight className="ml-1 w-4 h-4" />
              </Button>
            )}
            {isLast && (hasNumber ? (
              <Link to="/sms-inbox" onClick={markDone}>
                <Button variant="primary" size="sm">Open my inbox</Button>
              </Link>
            ) : (
              <Link to="/buy" onClick={markDone}>
                <Button variant="primary" size="sm">Get my number</Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default WelcomeTour
