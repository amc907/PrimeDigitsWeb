import React from 'react'

const HowItWorksSection = () => {
  const steps = [
    { step: '01', title: 'Choose a Country', desc: 'Select from available countries including US, UK, and Canada.' },
    { step: '02', title: 'Pick a Plan', desc: 'Choose the duration that works for you with transparent pricing.' },
    { step: '03', title: 'Start Receiving', desc: 'Your number is activated instantly. Start receiving SMS right away.' },
  ]

  return (
    <section className="py-20 lg:py-28 bg-dark-900/50 border-y border-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">How It Works</h2>
          <p className="mt-4 text-gray-400">Get your virtual number in three simple steps.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item, i) => (
            <div key={i} className="relative text-center animate-slide-up" style={{ animationDelay: `${i * 150}ms` }}>
              <div className="text-5xl font-bold text-gold-500/20 mb-4">{item.step}</div>
              <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorksSection
