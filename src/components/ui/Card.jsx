import React from 'react'

const Card = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`bg-dark-900 border border-dark-800 rounded-xl shadow-lg shadow-black/20 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export const CardHeader = ({ children, className = '' }) => (
  <div className={`px-6 py-4 border-b border-dark-800 ${className}`}>{children}</div>
)

export const CardTitle = ({ children, className = '' }) => (
  <h3 className={`text-lg font-semibold text-white ${className}`}>{children}</h3>
)

export const CardContent = ({ children, className = '' }) => (
  <div className={`px-6 py-4 ${className}`}>{children}</div>
)

export const CardFooter = ({ children, className = '' }) => (
  <div className={`px-6 py-4 border-t border-dark-800 ${className}`}>{children}</div>
)

export default Card
