import React, { useState } from 'react'
import { HiPlus, HiExternalLink, HiSearch, HiBriefcase, HiCalendar, HiCheckCircle, HiX } from 'react-icons/hi'
import { FiMoreVertical, FiSend, FiHelpCircle, FiSettings, FiDollarSign } from 'react-icons/fi'

const ReferralList = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(20)
  const [searchMode, setSearchMode] = useState('OR')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [referralDate, setReferralDate] = useState('')
  const [selectedRows, setSelectedRows] = useState([])

  const referrals = [
    {
      id: 'REF001',
      candidateName: 'PHAM NGO BINH',
      candidateId: '00044572',
      jobTitle: 'Construction Management',
      jobId: '00304192-9fcd0',
      company: 'Recruitmentikken Total Sourcing Co., Ltd.',
      referralDate: '2025/12/15',
      status: 'Interviewing',
      interviewDate: '2025/12/20',
      fee: '800,000 yen',
      notes: '',
      matchScore: 92,
    },
    {
      id: 'REF002',
      candidateName: 'NGUYEN THI NGA',
      candidateId: '00044064',
      jobTitle: 'Security Staff (Beat Engineer)',
      jobId: '00180228-54b9a',
      company: 'Recruitmeritecom Co., Ltd.',
      referralDate: '2025/12/10',
      status: 'Accepted',
      interviewDate: '2025/12/17',
      fee: '36%',
      notes: 'Nyusha successful',
      matchScore: 88,
    },
    {
      id: 'REF003',
      candidateName: 'TRAN VAN CUONG',
      candidateId: '00043293',
      jobTitle: 'Construction Management',
      jobId: '00304192-9fcd0',
      company: 'Recruitmentikken Total Sourcing Co., Ltd.',
      referralDate: '2025/12/08',
      status: 'Rejected',
      interviewDate: '',
      fee: '800,000 yen',
      notes: 'Candidate declined',
      matchScore: 75,
    },
    {
      id: 'REF004',
      candidateName: 'LE THI MAI',
      candidateId: '00043103',
      jobTitle: 'Security Staff (Beat Engineer)',
      jobId: '00180228-54b9a',
      company: 'Recruitmeritecom Co., Ltd.',
      referralDate: '2025/12/05',
      status: 'Pending',
      interviewDate: '',
      fee: '36%',
      notes: '',
      matchScore: 85,
    },
    {
      id: 'REF005',
      candidateName: 'HOANG VAN DUC',
      candidateId: '00042979',
      jobTitle: 'Construction Management',
      jobId: '00304192-9fcd0',
      company: 'Recruitmentikken Total Sourcing Co., Ltd.',
      referralDate: '2025/12/03',
      status: 'Interviewing',
      interviewDate: '2025/12/18',
      fee: '800,000 yen',
      notes: '',
      matchScore: 90,
    },
    ...Array.from({ length: 15 }, (_, i) => ({
      id: `REF${String(i + 6).padStart(3, '0')}`,
      candidateName: `CANDIDATE ${String.fromCharCode(65 + (i % 26))}`,
      candidateId: `000429${50 - i}`,
      jobTitle: ['Construction Management', 'Security Staff', 'IT Engineer', 'Sales Manager'][i % 4],
      jobId: `00${300000 + i}-abc${i}`,
      company: `Company ${i + 1} Co., Ltd.`,
      referralDate: `2025/12/${String(Math.max(1, 20 - i)).padStart(2, '0')}`,
      status: ['Pending', 'Interviewing', 'Accepted', 'Rejected'][i % 4],
      interviewDate: i % 2 === 0 ? `2025/12/${String(Math.max(1, 25 - i)).padStart(2, '0')}` : '',
      fee: i % 2 === 0 ? '800,000 yen' : '36%',
      notes: '',
      matchScore: Math.floor(Math.random() * 30) + 70, // Random score between 70-100
    }))
  ]

  const totalItems = referrals.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const getMatchScoreColor = (score) => {
    if (score >= 90) return 'bg-green-100 text-green-700'
    if (score >= 80) return 'bg-blue-100 text-blue-700'
    if (score >= 70) return 'bg-yellow-100 text-yellow-700'
    return 'bg-red-100 text-red-700'
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Accepted':
        return 'bg-green-400 text-white'
      case 'Interviewing':
        return 'bg-blue-400 text-white'
      case 'Rejected':
        return 'bg-red-400 text-white'
      case 'Pending':
        return 'bg-yellow-400 text-white'
      default:
        return 'bg-gray-400 text-white'
    }
  }

  return (
    <div className="h-full flex flex-col" style={{ fontFamily: "'Myriad Pro', sans-serif" }}>
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Search Bar Section */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200 mb-4 flex-shrink-0">
          <div className="flex items-center gap-3 flex-wrap">
            {/* OR/AND Toggle */}
            <div className="flex gap-1">
              <button
                onClick={() => setSearchMode('OR')}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
                  searchMode === 'OR'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                OR
              </button>
              <button
                onClick={() => setSearchMode('AND')}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
                  searchMode === 'AND'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                AND
              </button>
            </div>

            {/* Search Input */}
            <div className="flex-1 min-w-[300px]">
              <input
                type="text"
                placeholder="ID, candidate name, job title, company name, etc"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 text-sm"
              />
            </div>

            {/* Search Button */}
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold text-sm hover:bg-blue-700 transition-colors flex items-center gap-2">
              <HiSearch className="w-4 h-4" />
              Q Search
            </button>

            {/* Reset Button */}
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedStatus('')
                setReferralDate('')
              }}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-bold text-sm hover:bg-gray-200 transition-colors"
            >
              Reset
            </button>

            {/* Open Advanced Search */}
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-bold text-sm hover:bg-gray-200 transition-colors">
              Open Advanced Search
            </button>

            {/* Help Icon */}
            <button className="text-gray-600 hover:text-gray-800 p-2">
              <FiHelpCircle className="w-5 h-5" />
            </button>

            {/* Display Settings */}
            <button className="px-4 py-2 bg-gray-800 text-white rounded-lg font-bold text-sm hover:bg-gray-900 transition-colors flex items-center gap-2">
              <FiSettings className="w-4 h-4" />
              Display Settings
            </button>
          </div>

          {/* Filter Section */}
          <div className="flex items-center gap-4 mt-4 flex-wrap">
            <div className="flex items-center gap-2">
              <label className="text-sm font-bold text-gray-900">Select status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
              >
                <option value="">All status</option>
                <option value="Pending">Pending</option>
                <option value="Interviewing">Interviewing</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm font-bold text-gray-900">Referral date</label>
              <input
                type="date"
                value={referralDate}
                onChange={(e) => setReferralDate(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>
          </div>
        </div>

        {/* Pagination - Top */}
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="px-2 py-1 bg-white border border-gray-300 rounded text-sm font-bold text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              &lt;&lt;
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-2 py-1 bg-white border border-gray-300 rounded text-sm font-bold text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              &lt;
            </button>
            {(() => {
              const pages = []
              const maxPages = 7
              let startPage = Math.max(1, currentPage - Math.floor(maxPages / 2))
              let endPage = Math.min(totalPages, startPage + maxPages - 1)
              
              if (endPage - startPage < maxPages - 1) {
                startPage = Math.max(1, endPage - maxPages + 1)
              }
              
              for (let i = startPage; i <= endPage; i++) {
                pages.push(i)
              }
              
              return pages.map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded text-sm font-bold transition-colors ${
                    currentPage === page
                      ? 'bg-red-600 text-white'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))
            })()}
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-2 py-1 bg-white border border-gray-300 rounded text-sm font-bold text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              &gt;
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="px-2 py-1 bg-white border border-gray-300 rounded text-sm font-bold text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              &gt;&gt;
            </button>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="px-3 py-1 border border-gray-300 rounded text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span className="text-sm text-gray-700 font-bold">{totalItems} items</span>
          </div>
        </div>

        {/* Scrollable Table Container */}
        <div className="flex-1 overflow-y-auto bg-white rounded-2xl border border-gray-200 min-h-0 relative">
          <div className="overflow-x-auto h-full">
            <table className="w-full">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-3 text-center text-xs font-bold text-gray-900 border-b border-gray-200 w-12">
                    <input
                      type="checkbox"
                      checked={selectedRows.length === referrals.length && referrals.length > 0}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedRows(referrals.map(r => r.id))
                        } else {
                          setSelectedRows([])
                        }
                      }}
                      className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-600"
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-900 border-b border-gray-200">Referral ID</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-900 border-b border-gray-200">Candidate</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-900 border-b border-gray-200">Job Title</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-900 border-b border-gray-200">Company</th>
                  <th className="px-4 py-3 text-center text-xs font-bold text-gray-900 border-b border-gray-200">Match Score</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-900 border-b border-gray-200">Referral Date</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-900 border-b border-gray-200">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-900 border-b border-gray-200">Interview Date</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-900 border-b border-gray-200">Fee</th>
                  <th className="px-4 py-3 text-center text-xs font-bold text-gray-900 border-b border-gray-200">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {referrals.map((referral) => (
                  <tr key={referral.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-center">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(referral.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedRows([...selectedRows, referral.id])
                          } else {
                            setSelectedRows(selectedRows.filter(id => id !== referral.id))
                          }
                        }}
                        className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-600"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <a
                        href="#"
                        className="text-blue-600 hover:text-blue-800 font-medium text-xs flex items-center gap-1"
                      >
                        {referral.id}
                        <HiExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-900 font-medium">{referral.candidateName}</span>
                        <a
                          href="#"
                          className="text-blue-600 hover:text-blue-800 text-xs flex items-center gap-1"
                        >
                          {referral.candidateId}
                          <HiExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-900 font-medium">{referral.jobTitle}</span>
                        <a
                          href="#"
                          className="text-blue-600 hover:text-blue-800 text-xs flex items-center gap-1"
                        >
                          {referral.jobId}
                          <HiExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-700">{referral.company}</td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex flex-col items-center">
                        <span className={`px-3 py-1.5 rounded-lg text-xs font-bold ${getMatchScoreColor(referral.matchScore)}`}>
                          {referral.matchScore}%
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-700">{referral.referralDate}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${getStatusColor(referral.status)}`}>
                        {referral.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-700">{referral.interviewDate || '—'}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <FiDollarSign className="w-3 h-3 text-gray-500" />
                        <span className="text-xs text-gray-900 font-medium">{referral.fee}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <button className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50 transition-colors">
                          <FiSend className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-800 p-1 rounded hover:bg-gray-100 transition-colors">
                          <FiMoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReferralList

