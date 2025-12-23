import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { HiBriefcase, HiCheckCircle, HiExternalLink, HiHeart, HiDownload, HiQuestionMarkCircle, HiX, HiSearch } from 'react-icons/hi'
import { FiCopy, FiChevronDown } from 'react-icons/fi'
import { MdWork } from 'react-icons/md'

const JobDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('job-openings')
  const [showAgentInfo, setShowAgentInfo] = useState(true)
  const [showCandidateModal, setShowCandidateModal] = useState(false)
  const [candidateSearchQuery, setCandidateSearchQuery] = useState('')

  // Mock job data - in real app, fetch by id
  const job = {
    id: '00304192-9fcd0',
    title: '【Nationwide recruitment!】 It\'s OK to change jobs anywhere in Japan Start construction management from scratch ~no experience welcome Start with peace of mind with thorough training and follow-up women are also active~',
    classification: 'Architecture and civil engineering profession / Construction management and construction supervisor 【architecture】',
    company: 'Nikken Total Sourcing Co., Ltd.',
    salary: 'uniform 800,000 yen',
    referralFee: 'uniform 800,000 yen',
    tags: ['JoBins Selection', 'Direct application job', 'Full-time employees (permanent contract)'],
    conditions: [
      'Closed on weekends and holidays',
      'Maternity/paternity leave available',
      'Scout OK (company name disclosure OK)',
      'No experience in any job type OK',
      'No industry experience allowed',
      'Media publication OK (company name publication OK)',
      'Completely inexperienced OK',
    ],
    updatedDate: '2025/11/20',
    publicationDate: '2025/11/14',
    lastViewedDate: '2025/12/01',
    annualIncome: '4 million yen ~ 5 million yen',
    applicationCategory: 'Midway',
    placeOfWork: 'Hokkaido, Aomori Prefecture, 46 other items',
    documentSelectionRate: '86.4%',
    // Application conditions
    age: '20 years old~34 years old',
    numberOfCompanies: 'No question',
    educationalDetails: 'High school graduate or higher',
    sex: 'No question',
    educationalAttainment: 'High school graduate or higher',
    nationality: 'Assuming Japanese nationality',
    requiredConditions: [
      'Those with a regular driver\'s license (AT only)',
      'Potential adopter/one who can give a \'cheerful greeting\'',
      'People with communication skills',
    ],
    yearsOfExperienceJobType: 'No experience in any job type OK',
    yearsOfExperienceIndustry: 'No industry experience allowed',
    otherExperiences: 'None (completely inexperienced OK)',
    welcomeConditions: '',
    ngTarget: 'Tattoo',
  }

  // Mock candidates data
  const candidates = [
    { id: '00044572', name: 'PHAM NGO BINH', matchScore: 92, experience: '5 years', skills: ['Construction', 'Management'] },
    { id: '00044064', name: 'NGUYEN THI NGA', matchScore: 85, experience: '3 years', skills: ['Architecture', 'Design'] },
    { id: '00043293', name: 'TRAN VAN CUONG', matchScore: 78, experience: '2 years', skills: ['Engineering', 'Project Management'] },
    { id: '00043103', name: 'LE THI MAI', matchScore: 88, experience: '4 years', skills: ['Construction', 'Supervision'] },
  ]

  const tabs = [
    { id: 'job-openings', label: 'Job openings' },
    { id: 'qa', label: 'Q&A', count: 2 },
    { id: 'selection-fail', label: 'Selection information (fail)', count: 7 },
    { id: 'selection-passed', label: 'Selection information (passed)', count: 21 },
  ]

  const tableOfContents = [
    'Application conditions',
    'Selection information',
    'Corporate information',
    'Job Description',
    'Referral fee information',
    'Questions when recommending',
    'Similar Jobs',
  ]

  return (
    <div className="space-y-4" style={{ fontFamily: "'Myriad Pro', sans-serif" }}>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-4">
          {/* Tabs */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
                      activeTab === tab.id
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tab.label} {tab.count && <span className="ml-1">({tab.count})</span>}
                  </button>
                ))}
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showAgentInfo}
                  onChange={(e) => setShowAgentInfo(e.target.checked)}
                  className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-600"
                />
                <span className="text-sm font-bold text-gray-700">Agent Information</span>
              </label>
            </div>
          </div>

          {/* Job Header */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200">
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <div className="flex items-center gap-1.5">
                <HiBriefcase className="w-4 h-4 text-gray-500" />
                <span className="text-xs text-gray-600 font-medium">Job ID {job.id}</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                {job.tags.map((tag, idx) => {
                  const pastelColors = [
                    'bg-blue-200 text-blue-800',
                    'bg-green-200 text-green-800',
                    'bg-purple-200 text-purple-800',
                  ]
                  return (
                    <span
                      key={idx}
                      className={`px-2.5 py-1 ${pastelColors[idx % pastelColors.length]} text-xs font-bold rounded flex items-center gap-1`}
                    >
                      <HiCheckCircle className="w-3 h-3" />
                      {tag}
                    </span>
                  )
                })}
              </div>
            </div>

            <h1 className="text-gray-900 font-bold text-xl mb-4 leading-relaxed">
              {job.title}
            </h1>

            <div className="flex items-start gap-2 mb-3">
              <MdWork className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-700 font-medium">
                {job.classification}
              </p>
            </div>

            <div className="flex items-start gap-2 mb-4">
              <HiBriefcase className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-600">
                Recruitment Companies: <span className="font-bold">{job.company}</span>
              </p>
            </div>

            {/* Conditions Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {job.conditions.map((condition, idx) => {
                const pastelBgColors = [
                  'bg-blue-400',
                  'bg-green-400',
                  'bg-purple-400',
                  'bg-pink-400',
                  'bg-yellow-400',
                  'bg-teal-400',
                  'bg-indigo-400',
                ]
                return (
                  <span
                    key={idx}
                    className={`px-3 py-1.5 ${pastelBgColors[idx % pastelBgColors.length]} text-white text-xs font-bold rounded-lg border border-blue-300`}
                  >
                    {condition}
                  </span>
                )
              })}
            </div>

            {/* Dates */}
            <div className="flex gap-6 text-xs text-gray-600 mb-4">
              <div>
                <span className="font-bold">Updated date:</span> {job.updatedDate}
              </div>
              <div>
                <span className="font-bold">Publication date:</span> {job.publicationDate}
              </div>
              <div>
                <span className="font-bold">Last viewed date:</span> {job.lastViewedDate}
              </div>
            </div>

            {/* Warning Message */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg mb-4">
              <p className="text-sm text-gray-800">
                <span className="font-bold">⚠️</span> The information in the items marked with this mark is for the agent. Please be careful not to share with candidates. You can also switch to showing only candidate information.
              </p>
            </div>

            {/* Application Conditions Section */}
            <div className="border-t border-gray-200 pt-4">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Application conditions</h2>
              
              <div className="space-y-4">
                {/* Specs */}
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-3">Specs:</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-bold text-gray-900">Age:</span> <span className="text-gray-700">{job.age}</span>
                    </div>
                    <div>
                      <span className="font-bold text-gray-900">Number of companies with experience:</span> <span className="text-gray-700">{job.numberOfCompanies}</span>
                    </div>
                    <div>
                      <span className="font-bold text-gray-900">Educational details:</span> <span className="text-gray-700">{job.educationalDetails}</span>
                      <p className="text-xs text-gray-600 mt-1">*For junior high school graduates, only those with experience in the construction, architecture, and construction industries can be consulted</p>
                    </div>
                    <div>
                      <span className="font-bold text-gray-900">Sex:</span> <span className="text-gray-700">{job.sex}</span>
                    </div>
                    <div>
                      <span className="font-bold text-gray-900">Educational attainment:</span> <span className="text-gray-700">{job.educationalAttainment}</span>
                    </div>
                    <div>
                      <span className="font-bold text-gray-900">Nationality:</span> <span className="text-gray-700">{job.nationality}</span>
                    </div>
                  </div>
                </div>

                {/* Required */}
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-3">Required:</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-bold text-gray-900">Years of experience required (job type):</span> <span className="text-gray-700">{job.yearsOfExperienceJobType}</span>
                    </div>
                    <div>
                      <span className="font-bold text-gray-900">Application conditions:</span>
                      <ul className="list-disc list-inside ml-4 mt-1 text-gray-700">
                        {job.requiredConditions.map((condition, idx) => (
                          <li key={idx}>{condition}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="font-bold text-gray-900">Years of experience required (industry):</span> <span className="text-gray-700">{job.yearsOfExperienceIndustry}</span>
                    </div>
                    <div>
                      <span className="font-bold text-gray-900">Other experiences sought:</span> <span className="text-gray-700">{job.otherExperiences}</span>
                    </div>
                  </div>
                </div>

                {/* Welcome conditions */}
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-3">Welcome conditions:</h3>
                  <p className="text-sm text-gray-700">{job.welcomeConditions || '—'}</p>
                </div>

                {/* NG target */}
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-3">NG target:</h3>
                  <p className="text-sm text-gray-700">{job.ngTarget}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          {/* Agent Information Box */}
          {showAgentInfo && (
            <div className="bg-white rounded-2xl p-4 border border-gray-200">
              <h3 className="text-sm font-bold text-gray-900 mb-3">com pan Full amo</h3>
              <div className="space-y-2 mb-3">
                <div className="text-sm font-bold text-gray-900">{job.salary}</div>
                <div className="text-sm font-bold text-gray-900">{job.referralFee}</div>
                <div className="flex items-center gap-1 text-xs text-green-600 font-bold">
                  <HiCheckCircle className="w-4 h-4" />
                  Same-day deposit OK
                </div>
              </div>
              <div className="border-t border-gray-200 pt-3 space-y-2 text-xs">
                <div>
                  <span className="font-bold text-gray-900">Annual income:</span> <span className="text-gray-700">{job.annualIncome}</span>
                </div>
                <div>
                  <span className="font-bold text-gray-900">Application category:</span> <span className="text-gray-700">{job.applicationCategory}</span>
                </div>
                <div>
                  <span className="font-bold text-gray-900">Place of work:</span> <span className="text-gray-700">{job.placeOfWork}</span>
                </div>
              </div>
            </div>
          )}

          {/* Performance Metrics */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-blue-50 rounded-xl p-3 border border-blue-200">
              <p className="text-xs font-bold text-gray-900 mb-1">During the day Document selection speed</p>
              <p className="text-xs text-gray-600">—</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-3 border border-blue-200">
              <p className="text-xs font-bold text-gray-900 mb-1">Document selection rate</p>
              <p className="text-xs text-gray-600">{job.documentSelectionRate}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 space-y-2">
            <button
              onClick={() => setShowCandidateModal(true)}
              className="w-full bg-yellow-400 text-gray-900 rounded-lg font-bold text-sm hover:bg-yellow-500 transition-colors shadow-md py-2.5"
            >
              Recommend a candidate
            </button>
            <button className="w-full bg-white border border-gray-300 text-gray-700 rounded-lg font-bold text-sm hover:bg-gray-50 transition-colors py-2.5 flex items-center justify-center gap-2">
              <FiCopy className="w-4 h-4" />
              Copy the job URL (for candidates)
            </button>
            <button className="w-full bg-white border border-gray-300 text-gray-700 rounded-lg font-bold text-sm hover:bg-gray-50 transition-colors py-2.5 flex items-center justify-center gap-2">
              <HiDownload className="w-4 h-4" />
              Download
              <FiChevronDown className="w-4 h-4" />
            </button>
            <button className="w-full bg-white border border-gray-300 text-gray-700 rounded-lg font-bold text-sm hover:bg-gray-50 transition-colors py-2.5 flex items-center justify-center gap-2">
              <HiHeart className="w-4 h-4" />
              Keep
            </button>
            <button className="w-full bg-white border border-gray-300 text-gray-700 rounded-lg font-bold text-sm hover:bg-gray-50 transition-colors py-2.5">
              Ask a question
            </button>
          </div>

          {/* Table of Contents */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200">
            <h3 className="text-sm font-bold text-gray-900 mb-3">Table of Contents</h3>
            <ul className="space-y-2">
              {tableOfContents.map((item, idx) => (
                <li key={idx}>
                  <a
                    href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className={`text-xs font-medium hover:text-red-600 transition-colors ${
                      idx === 3 ? 'text-blue-600' : 'text-gray-700'
                    }`}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Candidate Modal */}
      {showCandidateModal && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setShowCandidateModal(false)} />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Recommend a candidate</h2>
                  <button
                    onClick={() => setShowCandidateModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <HiX className="w-6 h-6" />
                  </button>
                </div>
                {/* Search Bar */}
                <div className="flex items-center gap-2">
                  <div className="flex-1 relative">
                    <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Tìm kiếm ứng viên theo tên, ID, kỹ năng..."
                      value={candidateSearchQuery}
                      onChange={(e) => setCandidateSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 text-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {candidates
                    .filter((candidate) => {
                      if (!candidateSearchQuery) return true
                      const query = candidateSearchQuery.toLowerCase()
                      return (
                        candidate.name.toLowerCase().includes(query) ||
                        candidate.id.toLowerCase().includes(query) ||
                        candidate.skills.some(skill => skill.toLowerCase().includes(query)) ||
                        candidate.experience.toLowerCase().includes(query)
                      )
                    })
                    .map((candidate) => (
                    <div key={candidate.id} className="border border-gray-200 rounded-xl p-4 hover:border-red-600 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="text-base font-bold text-gray-900">{candidate.name}</h3>
                          <p className="text-xs text-gray-600">ID: {candidate.id}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-red-600">{candidate.matchScore}%</div>
                          <p className="text-xs text-gray-600">Match Score</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mb-3 text-sm text-gray-700">
                        <span><span className="font-bold">Experience:</span> {candidate.experience}</span>
                        <span><span className="font-bold">Skills:</span> {candidate.skills.join(', ')}</span>
                      </div>
                      <button className="w-full bg-red-600 text-white rounded-lg font-bold text-sm hover:bg-red-700 transition-colors py-2.5">
                        Tiến cử
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default JobDetail

