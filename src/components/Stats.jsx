import React from 'react'

const Stats = () => {
  return (
    <section className="py-12 border-y border-dark-800 bg-dark-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { value: '10,000+', label: 'Numbers Delivered' },
            { value: '3', label: 'Countries Available' },
            { value: '99.9%', label: 'Uptime' },
            { value: '< 1 Second', label: 'SMS Delivery' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-gold-500">{stat.value}</div>
              <div className="mt-1 text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Stats
