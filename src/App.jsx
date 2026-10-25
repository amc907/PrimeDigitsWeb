import React, { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import LoadingSpinner from './components/ui/LoadingSpinner'
import { getMetaForPath, setPageMeta } from './lib/pageMeta'

// Pages load on demand so the first visit only downloads what it needs
const Home = lazy(() => import('./pages/Home'))
const HowItWorks = lazy(() => import('./pages/HowItWorks'))
const Pricing = lazy(() => import('./pages/Pricing'))
const UseCases = lazy(() => import('./pages/UseCases'))
const About = lazy(() => import('./pages/About'))
const FAQ = lazy(() => import('./pages/FAQ'))
const Terms = lazy(() => import('./pages/Terms'))
const Privacy = lazy(() => import('./pages/Privacy'))
const Contact = lazy(() => import('./pages/Contact'))
const APIDocs = lazy(() => import('./pages/APIDocs'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const BuyNumber = lazy(() => import('./pages/BuyNumber'))
const MyNumbers = lazy(() => import('./pages/MyNumbers'))
const SMSHistory = lazy(() => import('./pages/SMSHistory'))
const SMSInbox = lazy(() => import('./pages/SMSInbox'))
const Credits = lazy(() => import('./pages/Credits'))
const Transactions = lazy(() => import('./pages/Transactions'))
const Profile = lazy(() => import('./pages/Profile'))
const Support = lazy(() => import('./pages/Support'))
const Guides = lazy(() => import('./pages/Guides'))
const Guide = lazy(() => import('./pages/Guide'))
const Invest = lazy(() => import('./pages/Invest'))

const AppLayout = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-dark-950">
    <Navbar />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
)

// Updates the tab title and description on every route change, and starts each page at the top
const RouteMeta = () => {
  const { pathname } = useLocation()
  useEffect(() => {
    const meta = getMetaForPath(pathname)
    if (meta) setPageMeta(meta)
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

const PageFallback = () => (
  <div className="min-h-screen flex items-center justify-center pt-20">
    <LoadingSpinner size="xl" />
  </div>
)

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RouteMeta />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#ffffff',
              color: '#14121f',
              border: '1px solid #e2dfee',
            },
            success: {
              iconTheme: { primary: '#6d28d9', secondary: '#ffffff' },
            },
            error: {
              iconTheme: { primary: '#ef4444', secondary: '#ffffff' },
            },
          }}
        />
        <AppLayout>
          <Suspense fallback={<PageFallback />}>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/use-cases" element={<UseCases />} />
            <Route path="/guides" element={<Guides />} />
            <Route path="/guides/:slug" element={<Guide />} />
            <Route path="/invest" element={<Invest />} />
              <Route path="/about" element={<About />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/api-docs" element={<APIDocs />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/buy" element={
                <ProtectedRoute>
                  <BuyNumber />
                </ProtectedRoute>
              } />
              <Route path="/numbers" element={
                <ProtectedRoute>
                  <MyNumbers />
                </ProtectedRoute>
              } />
              <Route path="/history" element={
                <ProtectedRoute>
                  <SMSHistory />
                </ProtectedRoute>
              } />
              <Route path="/sms-inbox" element={
                <ProtectedRoute>
                  <SMSInbox />
                </ProtectedRoute>
              } />
              <Route path="/credits" element={
                <ProtectedRoute>
                  <Credits />
                </ProtectedRoute>
              } />
              <Route path="/transactions" element={
                <ProtectedRoute>
                  <Transactions />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/support" element={
                <ProtectedRoute>
                  <Support />
                </ProtectedRoute>
              } />

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AppLayout>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
