import React from 'react'
import { Link } from 'react-router-dom'
import { Home, AlertTriangle } from 'lucide-react'
import Button from '../components/ui/Button'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 animate-fade-in">
      <div className="text-center max-w-md">
        <AlertTriangle className="w-16 h-16 text-brand-400 mx-auto mb-6" />
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <h2 className="text-xl font-semibold text-white mb-2">This page doesn't exist</h2>
        <p className="text-gray-400 mb-8">
          It may have moved, or the link might be wrong.
        </p>
        <Link to="/">
          <Button variant="primary">
            <Home className="w-4 h-4 mr-2" /> Back to home
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default NotFound
