import React from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Clock, ArrowRight } from 'lucide-react'
import Card from '../components/ui/Card'
import { guides } from '../data/guides'

const Guides = () => (
  <div className="pt-24 pb-20 lg:pt-32 lg:pb-28 animate-fade-in">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-semibold mb-4">
          <BookOpen className="w-3.5 h-3.5" />
          Guides
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">Guides</h1>
        <p className="mt-4 text-lg text-gray-400">Short, practical how-tos for getting and using a second number.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {guides.map(guide => (
          <Link key={guide.slug} to={`/guides/${guide.slug}`} className="group">
            <Card className="h-full p-6 flex flex-col hover:border-brand-500/40 hover:-translate-y-1 transition-all">
              <p className="flex items-center gap-1.5 text-xs text-gray-500">
                <Clock className="w-3.5 h-3.5" /> {guide.readMinutes} min read
              </p>
              <h2 className="mt-3 text-lg font-bold text-white leading-snug">{guide.title}</h2>
              <p className="mt-2 text-sm text-gray-400 leading-relaxed flex-1">{guide.description}</p>
              <span className="mt-5 inline-flex items-center text-sm font-semibold text-brand-400">
                Read guide <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  </div>
)

export default Guides
