import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { HiUser, HiMail, HiPhone, HiLocationMarker, HiCalendar, HiBriefcase, HiAcademicCap, HiDocumentText, HiDownload, HiPrinter, HiCheckCircle } from 'react-icons/hi'
import { FiFileText, FiEdit } from 'react-icons/fi'

const CandidateDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  // Mock candidate data - in real app, fetch by id
  const candidate = {
    id: '00044572',
    name: 'PHAM NGO BINH',
    email: 'phamngobinh@example.com',
    phone: '+84 123 456 789',
    address: 'Ho Chi Minh City, Vietnam',
    dateOfBirth: '1990/05/15',
    nationality: 'Vietnamese',
    education: [
      {
        degree: 'Bachelor of Engineering',
        school: 'Ho Chi Minh City University of Technology',
        period: '2008-2012',
        major: 'Civil Engineering',
      },
    ],
    workExperience: [
      {
        position: 'Construction Manager',
        company: 'ABC Construction Co., Ltd.',
        period: '2015-2020',
        description: 'Managed construction projects, supervised teams, and ensured quality standards.',
      },
      {
        position: 'Site Engineer',
        company: 'XYZ Engineering',
        period: '2012-2015',
        description: 'Supervised construction sites, coordinated with contractors.',
      },
    ],
    skills: ['Project Management', 'Construction Planning', 'Team Leadership', 'AutoCAD', 'Japanese (N2)'],
    certifications: ['Construction Management Certificate', 'Safety Management License'],
    languages: [
      { language: 'Vietnamese', level: 'Native' },
      { language: 'Japanese', level: 'N2' },
      { language: 'English', level: 'Intermediate' },
    ],
    cvUrl: '/cv/sample-cv.pdf',
  }

  return (
    <div className="space-y-4" style={{ fontFamily: "'Myriad Pro', sans-serif" }}>
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg">
              <HiUser className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">{candidate.name}</h1>
              <p className="text-sm text-gray-600">Candidate ID: {candidate.id}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/agent/candidates/${candidate.id}/create-cv`)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg font-bold text-sm hover:bg-red-700 transition-colors shadow-md flex items-center gap-2"
            >
              <FiFileText className="w-4 h-4" />
              Tạo CV
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-bold text-sm hover:bg-gray-50 transition-colors flex items-center gap-2">
              <HiDownload className="w-4 h-4" />
              Download CV
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-bold text-sm hover:bg-gray-50 transition-colors flex items-center gap-2">
              <HiPrinter className="w-4 h-4" />
              Print
            </button>
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <HiMail className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-700">{candidate.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <HiPhone className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-700">{candidate.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <HiLocationMarker className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-700">{candidate.address}</span>
          </div>
          <div className="flex items-center gap-2">
            <HiCalendar className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-700">Date of Birth: {candidate.dateOfBirth}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4">
          {/* Education */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <HiAcademicCap className="w-5 h-5 text-red-600" />
              Education
            </h2>
            <div className="space-y-4">
              {candidate.education.map((edu, idx) => (
                <div key={idx} className="border-l-4 border-red-600 pl-4">
                  <h3 className="text-base font-bold text-gray-900">{edu.degree}</h3>
                  <p className="text-sm text-gray-700 font-medium">{edu.school}</p>
                  <p className="text-sm text-gray-600">{edu.major} • {edu.period}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Work Experience */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <HiBriefcase className="w-5 h-5 text-red-600" />
              Work Experience
            </h2>
            <div className="space-y-4">
              {candidate.workExperience.map((exp, idx) => (
                <div key={idx} className="border-l-4 border-red-600 pl-4">
                  <h3 className="text-base font-bold text-gray-900">{exp.position}</h3>
                  <p className="text-sm text-gray-700 font-medium">{exp.company}</p>
                  <p className="text-sm text-gray-600 mb-2">{exp.period}</p>
                  <p className="text-sm text-gray-700">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {candidate.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 bg-red-50 text-red-600 text-xs font-bold rounded-lg border border-red-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Languages</h2>
            <div className="space-y-2">
              {candidate.languages.map((lang, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{lang.language}</span>
                  <span className="text-sm text-gray-600">{lang.level}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Certifications</h2>
            <ul className="space-y-2">
              {candidate.certifications.map((cert, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                  <HiCheckCircle className="w-4 h-4 text-green-600" />
                  {cert}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          {/* CV Preview */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <HiDocumentText className="w-5 h-5 text-red-600" />
              CV Preview
            </h2>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 min-h-[400px] flex items-center justify-center">
              <div className="text-center">
                <HiDocumentText className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">CV Preview</p>
                <p className="text-xs text-gray-500 mt-1">Click to view full CV</p>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg font-bold text-sm hover:bg-red-700 transition-colors">
                View Full CV
              </button>
              <button className="px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-bold text-sm hover:bg-gray-50 transition-colors">
                <HiDownload className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <button className="w-full px-4 py-2 bg-red-600 text-white rounded-lg font-bold text-sm hover:bg-red-700 transition-colors text-left flex items-center gap-2">
                <FiFileText className="w-4 h-4" />
                Recommend for Job
              </button>
              <button className="w-full px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-bold text-sm hover:bg-gray-50 transition-colors text-left flex items-center gap-2">
                <FiEdit className="w-4 h-4" />
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CandidateDetail

