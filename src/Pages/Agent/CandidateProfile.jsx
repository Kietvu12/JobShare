import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HiPlus, HiExternalLink, HiSearch } from 'react-icons/hi'
import { FiMoreVertical, FiSend, FiHelpCircle, FiSettings } from 'react-icons/fi'

const CandidateProfile = () => {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(20)
  const [searchMode, setSearchMode] = useState('OR') // OR or AND
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPhase, setSelectedPhase] = useState('')
  const [firstInterviewDate, setFirstInterviewDate] = useState('')
  const [onlyYourCandidates, setOnlyYourCandidates] = useState(false)
  const [showArchiveOnly, setShowArchiveOnly] = useState(false)
  const [selectedRows, setSelectedRows] = useState([])

  const candidates = [
    { id: '00044572', name: 'PHAM NGO BINH ...', inflowPath: '', inHouseResponsible: '', firstInterviewDate: '', phase: '', numberOfRecommendations: 1, numberOfScouts: '', scoutStatus: '', finalScoutReleaseDate: '' },
    { id: '00044064', name: 'NGUYEN THI NGA', inflowPath: '', inHouseResponsible: 'Nguyen Hai Quang', firstInterviewDate: '2025/12/17', phase: '', numberOfRecommendations: 1, numberOfScouts: '', scoutStatus: '', finalScoutReleaseDate: '2025/12/17' },
    { id: '00043293', name: 'TRAN VAN CUONG', inflowPath: '', inHouseResponsible: '', firstInterviewDate: '2025/12/10', phase: '', numberOfRecommendations: 1, numberOfScouts: '', scoutStatus: '', finalScoutReleaseDate: '' },
    { id: '00043103', name: 'LE THI MAI', inflowPath: '', inHouseResponsible: '', firstInterviewDate: '2025/12/08', phase: '', numberOfRecommendations: 1, numberOfScouts: '', scoutStatus: '', finalScoutReleaseDate: '' },
    { id: '00042979', name: 'HOANG VAN DUC', inflowPath: '', inHouseResponsible: '', firstInterviewDate: '2025/12/05', phase: '', numberOfRecommendations: 1, numberOfScouts: '', scoutStatus: '', finalScoutReleaseDate: '' },
    { id: '00042966', name: 'VU THI HOA', inflowPath: '', inHouseResponsible: '', firstInterviewDate: '', phase: '', numberOfRecommendations: 3, numberOfScouts: '', scoutStatus: '', finalScoutReleaseDate: '' },
    ...Array.from({ length: 14 }, (_, i) => ({
      id: `000429${50 - i}`,
      name: `CANDIDATE ${String.fromCharCode(65 + (i % 26))} ...`,
      inflowPath: '',
      inHouseResponsible: '',
      firstInterviewDate: '',
      phase: '',
      numberOfRecommendations: i % 3 === 0 ? 1 : 0,
      numberOfScouts: '',
      scoutStatus: '',
      finalScoutReleaseDate: '',
    }))
  ]

  const totalItems = 136
  const totalPages = Math.ceil(totalItems / itemsPerPage)

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
                placeholder="ID, candidate name, education, work history, qualification"
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
                setSelectedPhase('')
                setFirstInterviewDate('')
                setOnlyYourCandidates(false)
                setShowArchiveOnly(false)
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

            {/* Add Candidate Button */}
            <button
              onClick={() => navigate('/agent/candidates/create')}
              className="px-4 py-2 bg-yellow-400 text-gray-900 rounded-lg font-bold text-sm hover:bg-yellow-500 transition-colors flex items-center gap-2"
            >
              <HiPlus className="w-4 h-4" />
              + Add a candidate
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
              <label className="text-sm font-bold text-gray-900">Select a phase</label>
              <select
                value={selectedPhase}
                onChange={(e) => setSelectedPhase(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
              >
                <option value="">Please select</option>
                <option value="phase1">Phase 1</option>
                <option value="phase2">Phase 2</option>
                <option value="phase3">Phase 3</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm font-bold text-gray-900">Select the date of the first in</label>
              <input
                type="date"
                value={firstInterviewDate}
                onChange={(e) => setFirstInterviewDate(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={onlyYourCandidates}
                onChange={(e) => setOnlyYourCandidates(e.target.checked)}
                className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-600"
              />
              <span className="text-sm text-gray-700 font-bold">Only show your candidates</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showArchiveOnly}
                onChange={(e) => setShowArchiveOnly(e.target.checked)}
                className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-600"
              />
              <span className="text-sm text-gray-700 font-bold">Show archive only</span>
            </label>
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
                      checked={selectedRows.length === candidates.length && candidates.length > 0}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedRows(candidates.map(c => c.id))
                        } else {
                          setSelectedRows([])
                        }
                      }}
                      className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-600"
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-900 border-b border-gray-200">ID</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-900 border-b border-gray-200">Name of candidate</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-900 border-b border-gray-200">Inflow path</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-900 border-b border-gray-200">In-house respon...</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-900 border-b border-gray-200">First interview d...</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-900 border-b border-gray-200">Phase</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-900 border-b border-gray-200">Number of reco...</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-900 border-b border-gray-200">Number of Scouts</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-900 border-b border-gray-200">Scout Status</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-900 border-b border-gray-200">Final Scout Rele...</th>
                  <th className="px-4 py-3 text-center text-xs font-bold text-gray-900 border-b border-gray-200">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {candidates.map((candidate) => (
                  <tr
                    key={candidate.id}
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => navigate(`/agent/candidates/${candidate.id}`)}
                  >
                    <td className="px-4 py-3 text-center" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(candidate.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedRows([...selectedRows, candidate.id])
                          } else {
                            setSelectedRows(selectedRows.filter(id => id !== candidate.id))
                          }
                        }}
                        className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-600"
                      />
                    </td>
                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          navigate(`/agent/candidates/${candidate.id}`)
                        }}
                        className="text-blue-600 hover:text-blue-800 font-medium text-xs flex items-center gap-1"
                      >
                        {candidate.id}
                        <HiExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-900">{candidate.name}</td>
                    <td className="px-4 py-3 text-xs text-gray-700">{candidate.inflowPath || '—'}</td>
                    <td className="px-4 py-3 text-xs text-gray-700">{candidate.inHouseResponsible || '—'}</td>
                    <td className="px-4 py-3 text-xs text-gray-700">{candidate.firstInterviewDate || '—'}</td>
                    <td className="px-4 py-3">
                      <select
                        className="px-2 py-1 border border-gray-300 rounded text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600 w-full"
                        defaultValue=""
                      >
                        <option value="">Please select</option>
                        <option value="phase1">Phase 1</option>
                        <option value="phase2">Phase 2</option>
                        <option value="phase3">Phase 3</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-gray-900 font-medium">{candidate.numberOfRecommendations}</span>
                        <a href="#" className="text-blue-600 hover:text-blue-800">
                          <HiExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-700">{candidate.numberOfScouts || '—'}</td>
                    <td className="px-4 py-3 text-xs text-gray-700">{candidate.scoutStatus || '—'}</td>
                    <td className="px-4 py-3 text-xs text-gray-700">{candidate.finalScoutReleaseDate || '-'}</td>
                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                          }}
                          className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50 transition-colors"
                        >
                          <FiSend className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                          }}
                          className="text-gray-600 hover:text-gray-800 p-1 rounded hover:bg-gray-100 transition-colors"
                        >
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

export default CandidateProfile

