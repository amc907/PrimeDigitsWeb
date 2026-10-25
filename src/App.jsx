import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import { useTheme } from './hooks/useTheme'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import LoadingSpinner from './components/ui/LoadingSpinner'

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

const AppLayout = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-dark-950">
    <Navbar />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
)

const ThemedToaster = () => {
  const { theme } = useTheme()
  const surface = theme === 'light' ? '#ffffff' : '#1a1a20'
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: surface,
          color: theme === 'light' ? '#111118' : '#fff',
          border: `1px solid ${theme === 'light' ? '#dedee4' : '#35353c'}`,
        },
        success: {
          iconTheme: { primary: '#d49a2e', secondary: surface },
        },
        error: {
          iconTheme: { primary: '#ef4444', secondary: surface },
        },
      }}
    />
  )
}

const PageFallback = () => (
  <div className="min-h-screen flex items-center justify-center pt-20">
    <LoadingSpinner size="xl" />
  </div>
)

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <ThemedToaster />
          <AppLayout>
            <Suspense fallback={<PageFallback />}>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Home />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/use-cases" element={<UseCases />} />
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
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
