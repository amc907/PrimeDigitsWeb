import React, { useEffect } from 'react'
import { X } from 'lucide-react'

const Modal = ({ open, onClose, children, className = '' }) => {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-fade-in" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-[#14121f]/50 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative w-full max-w-md bg-dark-900 border border-dark-800 rounded-2xl shadow-2xl ${className}`}>
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-dark-800"
        >
          <X className="w-5 h-5" />
        </button>
        {children}
      </div>
    </div>
  )
}

export default Modal
