import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Clock, Lightbulb } from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import NotFound from './NotFound'
import { guides, getGuide } from '../data/guides'
import { setPageMeta } from '../lib/pageMeta'

const Block = ({ block }) => {
  if (block.h2) return <h2 className="mt-10 mb-3 text-2xl font-bold text-white">{block.h2}</h2>
  if (block.p) return <p className="mt-4 text-gray-300 leading-relaxed text-[17px]">{block.p}</p>
  if (block.list) {
    return (
      <ul className="mt-4 space-y-2.5">
        {block.list.map(item => (
          <li key={item} className="flex items-start text-gray-300 leading-relaxed">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-2.5 mr-3 flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    )
  }
  if (block.steps) {
    return (
      <ol className="mt-4 space-y-3">
        {block.steps.map((step, i) => (
          <li key={step} className="flex items-start gap-3 text-gray-300 leading-relaxed">
            <span className="w-7 h-7 rounded-full bg-brand-500 text-[#fff] text-sm font-bold flex items-center justify-center flex-shrink-0">
              {i + 1}
            </span>
            <span className="pt-0.5">{step}</span>
          </li>
        ))}
      </ol>
    )
  }
  if (block.tip) {
    return (
      <div className="mt-6 p-4 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-start gap-3">
        <Lightbulb className="w-5 h-5 text-brand-400 flex-shrink-0 mt-0.5" />
        <p className="text-gray-200 text-sm leading-relaxed">{block.tip}</p>
      </div>
    )
  }
  return null
}

const Guide = () => {
  const { slug } = useParams()
  const guide = getGuide(slug)

  useEffect(() => {
    if (guide) setPageMeta({ title: guide.title, description: guide.description })
  }, [guide])

  if (!guide) return <NotFound />

  const others = guides.filter(g => g.slug !== guide.slug)

  return (
    <article className="pt-24 pb-20 lg:pt-32 lg:pb-28 animate-fade-in">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/guides" className="inline-flex items-center text-sm text-gray-400 hover:text-brand-400">
          <ArrowLeft className="w-4 h-4 mr-1" /> All guides
        </Link>
        <h1 className="mt-6 text-3xl sm:text-4xl font-extrabold text-white leading-tight">{guide.title}</h1>
        <p className="mt-3 text-lg text-gray-400">{guide.description}</p>
        <p className="mt-3 flex items-center gap-1.5 text-sm text-gray-500">
          <Clock className="w-4 h-4" /> {guide.readMinutes} min read
        </p>

        <div className="mt-6">
          {guide.body.map((block, i) => <Block key={i} block={block} />)}
        </div>

        <Card className="mt-12 p-6 text-center bg-gradient-to-br from-brand-500/10 to-dark-900 border-brand-500/20">
          <h2 className="text-xl font-bold text-white">Get your second number</h2>
          <p className="mt-2 text-gray-400">US or Canadian numbers from $3.99 a month. Ready in about a minute.</p>
          <Link to="/register" className="inline-block mt-5">
            <Button variant="primary" className="group">
              Get my number <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </Card>

        <div className="mt-12">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">More guides</h2>
          <div className="space-y-3">
            {others.map(g => (
              <Link key={g.slug} to={`/guides/${g.slug}`} className="block p-4 rounded-xl border border-dark-800 bg-dark-900 hover:border-brand-500/40 transition-colors">
                <p className="font-semibold text-white">{g.title}</p>
                <p className="text-sm text-gray-400 mt-0.5">{g.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}

export default Guide
