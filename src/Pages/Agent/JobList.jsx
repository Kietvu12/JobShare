import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HiSearch, HiPlus, HiQuestionMarkCircle, HiCheckCircle, HiX, HiLocationMarker, HiBriefcase, HiClock, HiOfficeBuilding } from 'react-icons/hi'
import { FiFilter, FiBookmark, FiList, FiSave, FiDollarSign } from 'react-icons/fi'
import { MdWork, MdBusinessCenter, MdHistory } from 'react-icons/md'

const JobList = () => {
  const navigate = useNavigate()
  const [filters, setFilters] = useState({
    freeWord: '',
    placeOfWork: '',
    jobType: '',
    industry: '',
    age: '',
    minSalary: '',
    maxSalary: '',
    applicationCategory: [],
    detailedConditions: [],
  })

  const jobListings = [
    {
      id: '00304192-9fcd0',
      title: '【Nationwide recruitment!】 It\'s OK to change jobs anywhere in Japan Start construction management from scratch ~no experience welcome Start with peace of mind with thorough training and follow-up women are also active~',
      classification: 'Architecture and civil engineering profession / Construction management and construction supervisor 【architecture】',
      company: 'Recruitmentikken Total Sourcing Co., Ltd.',
      salary: 'uniform 800,000 yen',
      referralFee: 'uniform 800,000 yen',
      tags: ['JoBins Selection', 'Direct application job', 'Full-time employees (permanent contract)'],
      conditions: [
        'No experience in any job type OK',
        'No industry experience allowed',
        'Completely inexperienced OK',
        'Media publication OK (company name publication OK)',
        'Scout OK (company name disclosure OK)',
        'Closed on weekends and holidays',
        'Maternity/paternity leave available',
      ],
      description: 'Nationwide service available! Completely inexperienced building construction management Among construction managers with no prior experience, the referral fee is 800,000 yen! With generous training and support, both men and women are active. Since this is a speed selection process, we will respond quickly even after your recommendation',
    },
    {
      id: '00180228-54b9a',
      title: '1-day selection held! Full Speed Selection 『Are you doing SECOM?』 The familiar security staff! (Beat Engineer) ◆Average annual salary: 6.21 million yen/Maximum bonus: 1.98 million yen/Company housing and dormitory available/10-day holidays allowed',
      classification: 'Skilled workers, equipment, traffic, transportation / security, guards',
      company: 'Recruitmeritecom Co., Ltd.',
      salary: 'Theoretical annual income 36%',
      referralFee: 'Theoretical annual income 36%',
      tags: ['JoBins Selection', 'Direct application job', 'Full-time employees (permanent contract)'],
      conditions: [
        'No experience in any job type OK',
        'No industry experience allowed',
        'Completely inexperienced OK',
        'Media publication OK (company name publication OK)',
        'Scout OK (company name disclosure OK)',
        'Making the most of English',
        'Company housing/rent subsidy system available',
      ],
      description: '== == Area only 1-day selection session will be held!!',
    },
    {
        id: '00304192-9fcd0',
        title: '【Nationwide recruitment!】 It\'s OK to change jobs anywhere in Japan Start construction management from scratch ~no experience welcome Start with peace of mind with thorough training and follow-up women are also active~',
        classification: 'Architecture and civil engineering profession / Construction management and construction supervisor 【architecture】',
        company: 'Recruitmentikken Total Sourcing Co., Ltd.',
        salary: 'uniform 800,000 yen',
        referralFee: 'uniform 800,000 yen',
        tags: ['JoBins Selection', 'Direct application job', 'Full-time employees (permanent contract)'],
        conditions: [
          'No experience in any job type OK',
          'No industry experience allowed',
          'Completely inexperienced OK',
          'Media publication OK (company name publication OK)',
          'Scout OK (company name disclosure OK)',
          'Closed on weekends and holidays',
          'Maternity/paternity leave available',
        ],
        description: 'Nationwide service available! Completely inexperienced building construction management Among construction managers with no prior experience, the referral fee is 800,000 yen! With generous training and support, both men and women are active. Since this is a speed selection process, we will respond quickly even after your recommendation',
      },
      {
        id: '00180228-54b9a',
        title: '1-day selection held! Full Speed Selection 『Are you doing SECOM?』 The familiar security staff! (Beat Engineer) ◆Average annual salary: 6.21 million yen/Maximum bonus: 1.98 million yen/Company housing and dormitory available/10-day holidays allowed',
        classification: 'Skilled workers, equipment, traffic, transportation / security, guards',
        company: 'Recruitmeritecom Co., Ltd.',
        salary: 'Theoretical annual income 36%',
        referralFee: 'Theoretical annual income 36%',
        tags: ['JoBins Selection', 'Direct application job', 'Full-time employees (permanent contract)'],
        conditions: [
          'No experience in any job type OK',
          'No industry experience allowed',
          'Completely inexperienced OK',
          'Media publication OK (company name publication OK)',
          'Scout OK (company name disclosure OK)',
          'Making the most of English',
          'Company housing/rent subsidy system available',
        ],
        description: '== == Area only 1-day selection session will be held!!',
      },
  ]

  const handleCheckboxChange = (category, value) => {
    setFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }))
  }

  return (
    <div className="h-full flex flex-col" style={{ fontFamily: "'Myriad Pro', sans-serif" }}>
      {/* Top Navigation */}
      <div className="flex items-center gap-4 text-sm mb-3">
        <a href="#" className="text-gray-700 hover:text-red-600 font-medium transition-colors flex items-center gap-1.5">
          <MdHistory className="w-4 h-4" />
          Search history
        </a>
        <span className="text-gray-300">|</span>
        <a href="#" className="text-gray-700 hover:text-red-600 font-medium transition-colors flex items-center gap-1.5">
          <FiSave className="w-4 h-4" />
          Saved search criteria
        </a>
        <span className="text-gray-300">|</span>
        <a href="#" className="text-gray-700 hover:text-red-600 font-medium transition-colors flex items-center gap-1.5">
          <FiBookmark className="w-4 h-4" />
          Keep List <span className="text-red-600 font-bold">61 items</span>
        </a>
      </div>

      {/* Search Results Count */}
      <div className="text-sm text-gray-700 mb-4 flex items-center gap-2">
        <FiList className="w-4 h-4 text-red-600" />
        <span>Search results list <span className="font-bold text-red-600">**110,418**</span> Number</span>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-5 gap-4 overflow-hidden">
        {/* Left Panel - Search Filters */}
        <div className="lg:col-span-2 flex flex-col">
          <div className="bg-white rounded-2xl shadow-2xl p-2.5 border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <FiFilter className="w-4 h-4 text-red-600" />
              <h2 className="text-base font-bold text-gray-900">Bộ lọc tìm kiếm</h2>
            </div>

            <div className="space-y-4">
              {/* Free Word */}
              <div>
                <label className="block text-xs font-bold text-gray-900 mb-0.5 flex items-center gap-1.5">
                  <HiSearch className="w-3.5 h-3.5 text-red-600" />
                  Free Word
                </label>
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    placeholder="ID, job title, job description, etc"
                    value={filters.freeWord}
                    onChange={(e) => setFilters({ ...filters, freeWord: e.target.value })}
                    className="flex-1 px-2.5 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 text-xs"
                  />
                  <button className="px-2.5 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-xs font-bold">
                    OR
                  </button>
                </div>
              </div>

              {/* Place of work */}
              <div>
                <label className="block text-xs font-bold text-gray-900 mb-0.5 flex items-center gap-1.5">
                  <HiLocationMarker className="w-3.5 h-3.5 text-red-600" />
                  Place of work
                </label>
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    placeholder="Please select your place of work"
                    value={filters.placeOfWork}
                    onChange={(e) => setFilters({ ...filters, placeOfWork: e.target.value })}
                    className="flex-1 px-2.5 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 text-xs"
                  />
                  <button className="px-2.5 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex-shrink-0">
                    <HiPlus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Job type */}
              <div>
                <label className="block text-xs font-bold text-gray-900 mb-0.5 flex items-center gap-1.5">
                  <HiBriefcase className="w-3.5 h-3.5 text-red-600" />
                  Job type
                </label>
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    placeholder="Please select your job title"
                    value={filters.jobType}
                    onChange={(e) => setFilters({ ...filters, jobType: e.target.value })}
                    className="flex-1 px-2.5 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 text-xs"
                  />
                  <button className="px-2.5 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex-shrink-0">
                    <HiPlus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Industry */}
              <div>
                <label className="block text-xs font-bold text-gray-900 mb-0.5 flex items-center gap-1.5">
                  <MdBusinessCenter className="w-3.5 h-3.5 text-red-600" />
                  Industry
                </label>
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    placeholder="Please select your industry"
                    value={filters.industry}
                    onChange={(e) => setFilters({ ...filters, industry: e.target.value })}
                    className="flex-1 px-2.5 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 text-xs"
                  />
                  <button className="px-2.5 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex-shrink-0">
                    <HiPlus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Age */}
              <div>
                <label className="block text-xs font-bold text-gray-900 mb-0.5 flex items-center gap-1.5">
                  <HiClock className="w-3.5 h-3.5 text-red-600" />
                  Age
                </label>
                <select
                  value={filters.age}
                  onChange={(e) => setFilters({ ...filters, age: e.target.value })}
                  className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 text-xs"
                >
                  <option value="">Please select</option>
                  <option value="20-25">20-25</option>
                  <option value="26-30">26-30</option>
                  <option value="31-35">31-35</option>
                </select>
                <p className="text-xs text-gray-600 mt-0.5">Applications accepted at age</p>
              </div>

              {/* Minimum annual salary */}
              <div>
                <label className="block text-xs font-bold text-gray-900 mb-0.5 flex items-center gap-1.5">
                  <FiDollarSign className="w-3.5 h-3.5 text-red-600" />
                  Minimum annual salary
                </label>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minSalary}
                      onChange={(e) => setFilters({ ...filters, minSalary: e.target.value })}
                      className="flex-1 px-2.5 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 text-xs"
                    />
                    <span className="text-xs text-gray-600 whitespace-nowrap">million</span>
                    <span className="text-xs text-gray-600 whitespace-nowrap">yen</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="text-gray-600 text-xs">~</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxSalary}
                      onChange={(e) => setFilters({ ...filters, maxSalary: e.target.value })}
                      className="flex-1 px-2.5 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 text-xs"
                    />
                    <span className="text-xs text-gray-600 whitespace-nowrap">million</span>
                    <span className="text-xs text-gray-600 whitespace-nowrap">yen</span>
                  </div>
                </div>
              </div>

              {/* Application category */}
              <div>
                <label className="block text-xs font-bold text-gray-900 mb-0.5 flex items-center gap-1.5">
                  <MdWork className="w-3.5 h-3.5 text-red-600" />
                  Application category
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {['New graduate', 'Midway', 'Specific Skills (SSW)', 'Technology, Humanities, and Internat'].map((item) => (
                    <label key={item} className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.applicationCategory.includes(item)}
                        onChange={() => handleCheckboxChange('applicationCategory', item)}
                        className="w-3.5 h-3.5 text-red-600 border-gray-300 rounded focus:ring-red-600 flex-shrink-0"
                      />
                      <span className="text-xs text-gray-700">{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Detailed conditions */}
              <div>
                <label className="block text-xs font-bold text-gray-900 mb-0.5 flex items-center gap-1.5">
                  <HiCheckCircle className="w-3.5 h-3.5 text-red-600" />
                  Detailed conditions
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    'No experience in any job type OK',
                    'No industry experience allowed',
                    'Closed on weekends and holidays',
                    'Completely inexperienced OK',
                  ].map((item) => (
                    <label key={item} className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.detailedConditions.includes(item)}
                        onChange={() => handleCheckboxChange('detailedConditions', item)}
                        className="w-3.5 h-3.5 text-red-600 border-gray-300 rounded focus:ring-red-600 flex-shrink-0"
                      />
                      <span className="text-xs text-gray-700">{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Search Button */}
              <button className="w-full bg-red-600 text-white py-2 rounded-xl font-bold text-xs hover:bg-red-700 transition-colors shadow-lg flex items-center justify-center gap-1.5 mt-2">
                <HiSearch className="w-4 h-4" />
                Q <span className="text-yellow-300">**110,418**</span> Search for
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel - Job Listings */}
        <div className="lg:col-span-3 flex flex-col overflow-hidden">
          {/* Top Navigation Buttons */}
          <div className="flex gap-3 flex-wrap mb-4 flex-shrink-0">
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg font-bold text-sm hover:bg-red-700 transition-colors shadow-md flex items-center gap-2">
              <HiBriefcase className="w-4 h-4" />
              View Gijinkoku Jobs
            </button>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg font-bold text-sm hover:bg-red-700 transition-colors shadow-md flex items-center gap-2">
              <HiCheckCircle className="w-4 h-4" />
              See job openings with no experience
            </button>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg font-bold text-sm hover:bg-red-700 transition-colors shadow-md flex items-center gap-2">
              <HiOfficeBuilding className="w-4 h-4" />
              Recruitment company information session
            </button>
          </div>

          {/* Scrollable Job List Container */}
          <div className="flex-1 overflow-y-auto pr-2 relative min-h-0">
            {/* Job Listings */}
            <div className="space-y-4 pb-24">
              {jobListings.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-2xl p-5 border border-gray-200 cursor-pointer hover:border-red-600 transition-colors"
                  onClick={() => navigate(`/agent/jobs/${job.id}`)}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3 flex-wrap">
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
                            'bg-pink-200 text-pink-800',
                            'bg-yellow-200 text-yellow-800',
                            'bg-teal-200 text-teal-800',
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
                  </div>

                  {/* Job Title */}
                  <h3 className="text-gray-900 font-bold text-base mb-3 leading-relaxed">
                    {job.title}
                  </h3>

                  {/* Job Classification */}
                  <div className="flex items-start gap-2 mb-2">
                    <MdWork className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700 font-medium">
                      {job.classification}
                    </p>
                  </div>

                  {/* Company */}
                  <div className="flex items-start gap-2 mb-4">
                    <HiOfficeBuilding className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-600">
                      Recruitment Company: <span className="font-bold">{job.company}</span>
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    {/* Salary/Referral Info Box */}
                    <div className="md:col-span-1 bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <div className="mb-2">
                        <p className="text-xs font-bold text-gray-900 mb-1">Your company</p>
                        <p className="text-xs font-bold text-gray-900">Full amount</p>
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        <span className="text-sm font-bold text-gray-900">{job.salary}</span>
                        <HiQuestionMarkCircle className="w-4 h-4 text-gray-500" />
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        <span className="text-sm font-bold text-gray-900">{job.referralFee}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-green-600 font-bold">
                        <HiCheckCircle className="w-4 h-4" />
                        Same-day deposit OK
                      </div>
                    </div>

                    {/* Conditions Tags */}
                    <div className="md:col-span-2">
                      <div className="flex flex-wrap gap-2">
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
                              className={`px-3 py-1.5 ${pastelBgColors[idx % pastelBgColors.length]} text-white text-xs font-bold rounded-lg`}
                            >
                              {condition}
                            </span>
                          )
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {job.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Sticky Load More Button - Floating on top of job list */}
            <div className="sticky bottom-0 pt-4 pb-2 text-center z-10">
              <button className="px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] flex items-center gap-2 mx-auto">
                <HiSearch className="w-5 h-5" />
                See other JoBins selections
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobList

