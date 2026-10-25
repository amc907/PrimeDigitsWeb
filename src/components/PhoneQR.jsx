import React from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { Smartphone } from 'lucide-react'
import Modal from './ui/Modal'

// QR code that opens this number's inbox on the user's phone
const PhoneQR = ({ open, onClose, number }) => {
  if (!number) return null
  const url = `${window.location.origin}/sms-inbox?number=${number.id}`

  return (
    <Modal open={open} onClose={onClose}>
      <div className="p-6 sm:p-8 text-center">
        <div className="w-12 h-12 rounded-xl bg-brand-500/10 flex items-center justify-center mx-auto">
          <Smartphone className="w-6 h-6 text-brand-400" />
        </div>
        <h2 className="mt-4 text-xl font-bold text-white">Open on your phone</h2>
        <p className="mt-2 text-sm text-gray-400">
          Point your phone camera at this code to open the inbox for {number.phone_number}.
        </p>
        <div className="mt-6 inline-block p-4 bg-[#fff] rounded-2xl border border-dark-800">
          <QRCodeSVG value={url} size={200} fgColor="#14121f" level="M" />
        </div>
        <p className="mt-5 text-xs text-gray-500 leading-relaxed">
          You'll need to log in on your phone the first time. Then tap your browser's
          share menu and choose <span className="font-semibold text-gray-400">Add to Home Screen</span> to
          use PrimeDigits like an app.
        </p>
      </div>
    </Modal>
  )
}

export default PhoneQR
