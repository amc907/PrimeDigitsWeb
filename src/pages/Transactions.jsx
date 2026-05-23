import React, { useState, useEffect } from 'react'
import { Download, Filter, Calendar, Wallet, Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { api } from '../lib/api'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import toast from 'react-hot-toast'

const Transactions = () => {
  const [transactions, setTransactions] = useState([])
  const [filterType, setFilterType] = useState('All')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)

  const itemsPerPage = 10

  useEffect(() => {
    loadTransactions()
  }, [])

  const loadTransactions = async () => {
    setIsLoading(true)
    try {
      const data = await api.getTransactions()
      setTransactions(data || [])
    } catch (err) {
      setTransactions([])
    } finally {
      setIsLoading(false)
    }
  }

  const filtered = transactions.filter(tx => {
    const matchesType = filterType === 'All' || tx.type === filterType
    const matchesSearch = (tx.reference || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (tx.id || '').toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDateFrom = !dateFrom || new Date(tx.date) >= new Date(dateFrom)
    const matchesDateTo = !dateTo || new Date(tx.date) <= new Date(dateTo)
    return matchesType && matchesSearch && matchesDateFrom && matchesDateTo
  })

  const totalPages = Math.ceil(filtered.length / itemsPerPage)
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const exportCSV = () => {
    const headers = ['Date', 'Type', 'Amount', 'Status', 'Reference']
    const rows = filtered.map(tx => [tx.date, tx.type, tx.amount, tx.status, tx.reference])
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'transactions.csv'
    a.click()
    URL.revokeObjectURL(url)
    toast.success('Transactions exported to CSV')
  }

  const getStatusVariant = (status) => {
    if (status === 'Completed') return 'success'
    if (status === 'Pending') return 'warning'
    return 'danger'
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <LoadingSpinner size="xl" />
      </div>
    )
  }

  return (
    <div className="pt-24 pb-20 lg:pt-28 lg:pb-28 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Transaction History</h1>
            <p className="mt-1 text-gray-400">View and export your payment history</p>
          </div>
          <button
            onClick={exportCSV}
            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-dark-800 hover:bg-dark-700 text-gray-300 text-sm font-medium rounded-lg transition-colors border border-dark-700"
          >
            <Download className="w-4 h-4 mr-2" /> Export CSV
          </button>
        </div>

        {/* Filters */}
        <Card className="p-4 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search reference..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1) }}
                className="w-full pl-9 pr-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <select
                value={filterType}
                onChange={(e) => { setFilterType(e.target.value); setCurrentPage(1) }}
                className="w-full pl-9 pr-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-sm text-white appearance-none focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500"
              >
                <option value="All">All Types</option>
                <option value="Number Purchase">Number Purchase</option>
                <option value="SMS Credits">SMS Credits</option>
                <option value="Renewal">Renewal</option>
              </select>
            </div>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => { setDateFrom(e.target.value); setCurrentPage(1) }}
                className="w-full pl-9 pr-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500"
              />
            </div>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="date"
                value={dateTo}
                onChange={(e) => { setDateTo(e.target.value); setCurrentPage(1) }}
                className="w-full pl-9 pr-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500"
              />
            </div>
          </div>
        </Card>

        {/* Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-800">
                  <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-4">Date</th>
                  <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-4">Type</th>
                  <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-4">Amount</th>
                  <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-4">Status</th>
                  <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-4">Reference</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-800">
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-gray-400">
                      <Wallet className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                      <p>💳 No transactions yet</p>
                      <p className="text-sm text-gray-500 mt-1">Your payment history will appear here.</p>
                    </td>
                  </tr>
                ) : (
                  paginated.map((tx) => (
                    <tr key={tx.id} className="hover:bg-dark-800/30 transition-colors">
                      <td className="py-3 px-4 text-sm text-gray-300">{tx.date}</td>
                      <td className="py-3 px-4 text-sm text-white font-medium">{tx.type}</td>
                      <td className="py-3 px-4 text-sm text-white font-medium">${tx.amount?.toFixed(2)}</td>
                      <td className="py-3 px-4">
                        <Badge variant={getStatusVariant(tx.status)}>{tx.status}</Badge>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-400 font-mono">{tx.reference}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-dark-800">
              <p className="text-sm text-gray-400">
                Showing {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filtered.length)} of {filtered.length}
              </p>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-dark-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-sm text-gray-300">{currentPage} / {totalPages}</span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-dark-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

export default Transactions
