import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'

// Public pages
import Home from './pages/Home'
import HowItWorks from './pages/HowItWorks'
import Pricing from './pages/Pricing'
import UseCases from './pages/UseCases'
import About from './pages/About'
import FAQ from './pages/FAQ'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import Contact from './pages/Contact'
import APIDocs from './pages/APIDocs'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'

// Protected pages
import Dashboard from './pages/Dashboard'
import BuyNumber from './pages/BuyNumber'
import MyNumbers from './pages/MyNumbers'
import SMSHistory from './pages/SMSHistory'
import SMSInbox from './pages/SMSInbox'
import Credits from './pages/Credits'
import Transactions from './pages/Transactions'
import Profile from './pages/Profile'
import Support from './pages/Support'

const AppLayout = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-dark-950">
    <Navbar />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
)

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1a1a20',
              color: '#fff',
              border: '1px solid #35353c',
            },
            success: {
              iconTheme: {
                primary: '#d49a2e',
                secondary: '#1a1a20',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#1a1a20',
              },
            },
          }}
        />
        <AppLayout>
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
        </AppLayout>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
