import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { HiCheckCircle, HiDownload, HiPrinter, HiArrowLeft } from 'react-icons/hi'
import { FiFileText } from 'react-icons/fi'

const CreateCV = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [formData, setFormData] = useState({
    personalInfo: {
      name: 'PHAM NGO BINH',
      email: 'phamngobinh@example.com',
      phone: '+84 123 456 789',
      address: 'Ho Chi Minh City, Vietnam',
      dateOfBirth: '1990/05/15',
    },
    education: [],
    workExperience: [],
    skills: [],
    languages: [],
    certifications: [],
  })

  const templates = [
    {
      id: 'template-1',
      name: 'Template 1 - Classic',
      description: 'Professional and clean design',
      preview: 'bg-gradient-to-br from-blue-50 to-white',
      color: 'blue',
      borderColor: 'border-blue-600',
    },
    {
      id: 'template-2',
      name: 'Template 2 - Modern',
      description: 'Modern and minimalist style',
      preview: 'bg-gradient-to-br from-green-50 to-white',
      color: 'green',
      borderColor: 'border-green-600',
    },
    {
      id: 'template-3',
      name: 'Template 3 - Creative',
      description: 'Creative and eye-catching',
      preview: 'bg-gradient-to-br from-purple-50 to-white',
      color: 'purple',
      borderColor: 'border-purple-600',
    },
    {
      id: 'template-4',
      name: 'Template 4 - Executive',
      description: 'Executive and formal design',
      preview: 'bg-gradient-to-br from-gray-50 to-white',
      color: 'gray',
      borderColor: 'border-gray-600',
    },
  ]

  if (selectedTemplate) {
    return (
      <div className="space-y-4" style={{ fontFamily: "'Myriad Pro', sans-serif" }}>
        {/* Header */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSelectedTemplate(null)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <HiArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Tạo CV - {templates.find(t => t.id === selectedTemplate)?.name}</h1>
              <p className="text-sm text-gray-600">Candidate ID: {id}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-bold text-sm hover:bg-gray-50 transition-colors flex items-center gap-2">
              <HiDownload className="w-4 h-4" />
              Download
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-bold text-sm hover:bg-gray-50 transition-colors flex items-center gap-2">
              <HiPrinter className="w-4 h-4" />
              Print
            </button>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg font-bold text-sm hover:bg-red-700 transition-colors">
              Save CV
            </button>
          </div>
        </div>

        {/* CV Editor */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Form Editor */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-2xl p-4 border border-gray-200">
              <h2 className="text-base font-bold text-gray-900 mb-4">Personal Information</h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-gray-900 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={formData.personalInfo.name}
                    onChange={(e) => setFormData({
                      ...formData,
                      personalInfo: { ...formData.personalInfo, name: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-900 mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.personalInfo.email}
                    onChange={(e) => setFormData({
                      ...formData,
                      personalInfo: { ...formData.personalInfo, email: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-900 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={formData.personalInfo.phone}
                    onChange={(e) => setFormData({
                      ...formData,
                      personalInfo: { ...formData.personalInfo, phone: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-900 mb-1">Address</label>
                  <input
                    type="text"
                    value={formData.personalInfo.address}
                    onChange={(e) => setFormData({
                      ...formData,
                      personalInfo: { ...formData.personalInfo, address: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* CV Preview */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h2 className="text-base font-bold text-gray-900 mb-4">CV Preview</h2>
              <div className="bg-white border-2 border-gray-300 rounded-lg p-8 shadow-lg min-h-[800px]">
                {/* CV Content based on template */}
                {selectedTemplate === 'template-1' && (
                  <div className="space-y-6">
                    {/* Template 1 - Classic: Header with colored bar */}
                    <div className="border-l-4 border-blue-600 pl-4">
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">{formData.personalInfo.name}</h1>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{formData.personalInfo.email}</span>
                        <span>•</span>
                        <span>{formData.personalInfo.phone}</span>
                        <span>•</span>
                        <span>{formData.personalInfo.address}</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h2 className="text-lg font-bold text-blue-600 mb-2 border-b-2 border-blue-600 pb-1">Education</h2>
                        <p className="text-sm text-gray-600">Add your education details...</p>
                      </div>
                      <div>
                        <h2 className="text-lg font-bold text-blue-600 mb-2 border-b-2 border-blue-600 pb-1">Work Experience</h2>
                        <p className="text-sm text-gray-600">Add your work experience...</p>
                      </div>
                      <div>
                        <h2 className="text-lg font-bold text-blue-600 mb-2 border-b-2 border-blue-600 pb-1">Skills</h2>
                        <p className="text-sm text-gray-600">Add your skills...</p>
                      </div>
                    </div>
                  </div>
                )}
                {selectedTemplate === 'template-2' && (
                  <div className="space-y-6">
                    {/* Template 2 - Modern: Centered header with minimal design */}
                    <div className="text-center border-b-2 border-green-600 pb-4 mb-6">
                      <h1 className="text-4xl font-bold text-gray-900 mb-2">{formData.personalInfo.name}</h1>
                      <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                        <span>{formData.personalInfo.email}</span>
                        <span>•</span>
                        <span>{formData.personalInfo.phone}</span>
                        <span>•</span>
                        <span>{formData.personalInfo.address}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h2 className="text-base font-bold text-green-600 mb-2">Education</h2>
                        <p className="text-sm text-gray-600">Add your education details...</p>
                      </div>
                      <div>
                        <h2 className="text-base font-bold text-green-600 mb-2">Work Experience</h2>
                        <p className="text-sm text-gray-600">Add your work experience...</p>
                      </div>
                      <div className="col-span-2">
                        <h2 className="text-base font-bold text-green-600 mb-2">Skills</h2>
                        <p className="text-sm text-gray-600">Add your skills...</p>
                      </div>
                    </div>
                  </div>
                )}
                {selectedTemplate === 'template-3' && (
                  <div className="space-y-6">
                    {/* Template 3 - Creative: Sidebar layout */}
                    <div className="flex gap-6">
                      <div className="w-1/3 bg-purple-100 p-4 rounded-lg">
                        <h1 className="text-2xl font-bold text-gray-900 mb-3">{formData.personalInfo.name}</h1>
                        <div className="space-y-2 text-sm text-gray-700">
                          <p>{formData.personalInfo.email}</p>
                          <p>{formData.personalInfo.phone}</p>
                          <p>{formData.personalInfo.address}</p>
                        </div>
                      </div>
                      <div className="flex-1 space-y-4">
                        <div>
                          <h2 className="text-lg font-bold text-purple-600 mb-2">Education</h2>
                          <p className="text-sm text-gray-600">Add your education details...</p>
                        </div>
                        <div>
                          <h2 className="text-lg font-bold text-purple-600 mb-2">Work Experience</h2>
                          <p className="text-sm text-gray-600">Add your work experience...</p>
                        </div>
                        <div>
                          <h2 className="text-lg font-bold text-purple-600 mb-2">Skills</h2>
                          <p className="text-sm text-gray-600">Add your skills...</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {selectedTemplate === 'template-4' && (
                  <div className="space-y-6">
                    {/* Template 4 - Executive: Formal two-column layout */}
                    <div className="border-b-4 border-gray-800 pb-4 mb-6">
                      <h1 className="text-3xl font-bold text-gray-900 mb-2 uppercase">{formData.personalInfo.name}</h1>
                      <div className="flex items-center gap-4 text-sm text-gray-700">
                        <span>{formData.personalInfo.email}</span>
                        <span>|</span>
                        <span>{formData.personalInfo.phone}</span>
                        <span>|</span>
                        <span>{formData.personalInfo.address}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <h2 className="text-base font-bold text-gray-900 mb-3 uppercase border-l-4 border-gray-800 pl-2">Education</h2>
                        <p className="text-sm text-gray-600">Add your education details...</p>
                      </div>
                      <div>
                        <h2 className="text-base font-bold text-gray-900 mb-3 uppercase border-l-4 border-gray-800 pl-2">Work Experience</h2>
                        <p className="text-sm text-gray-600">Add your work experience...</p>
                      </div>
                      <div className="col-span-2">
                        <h2 className="text-base font-bold text-gray-900 mb-3 uppercase border-l-4 border-gray-800 pl-2">Skills</h2>
                        <p className="text-sm text-gray-600">Add your skills...</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4" style={{ fontFamily: "'Myriad Pro', sans-serif" }}>
      {/* Header */}
      <div className="bg-white rounded-2xl p-4 border border-gray-200 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <FiFileText className="w-6 h-6 text-red-600" />
            Tạo CV với Template
          </h1>
          <p className="text-sm text-gray-600 mt-1">Candidate ID: {id}</p>
        </div>
        <button
          onClick={() => navigate(`/agent/candidates/${id}`)}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-bold text-sm hover:bg-gray-200 transition-colors flex items-center gap-2"
        >
          <HiArrowLeft className="w-4 h-4" />
          Quay lại
        </button>
      </div>

      {/* Template Selection */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4">Chọn Template CV</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => setSelectedTemplate(template.id)}
              className="bg-white rounded-2xl p-5 border-2 border-gray-200 hover:border-red-600 cursor-pointer transition-all shadow-lg hover:shadow-xl"
            >
              <div className={`${template.preview} rounded-lg h-64 mb-4 border-2 ${template.borderColor} p-4 relative overflow-hidden`}>
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 to-red-600"></div>
                <div className="mt-3 space-y-2">
                  <div className="h-3 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-2 bg-gray-200 rounded w-2/3"></div>
                  <div className="mt-3 space-y-1.5">
                    <div className="h-2 bg-gray-300 rounded w-full"></div>
                    <div className="h-2 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-2 bg-gray-200 rounded w-4/6"></div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-1">{template.name}</h3>
              <p className="text-xs text-gray-600">{template.description}</p>
              <div className="mt-4 flex items-center gap-2 text-red-600 text-sm font-bold">
                <HiCheckCircle className="w-4 h-4" />
                Select Template
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CreateCV

