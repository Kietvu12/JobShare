import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HiUpload, HiX, HiDocumentText, HiUser, HiMail, HiPhone, HiLocationMarker, HiCalendar, HiBriefcase, HiAcademicCap } from 'react-icons/hi'
import { FiArrowLeft, FiFile } from 'react-icons/fi'

const CreateCandidate = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    candidateId: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    nationality: '',
    education: [],
    workExperience: [],
    skills: [],
    languages: [],
    certifications: [],
  })
  const [uploadedCV, setUploadedCV] = useState(null)
  const [cvPreview, setCvPreview] = useState(null)

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setUploadedCV(file)
      // Create preview URL
      const reader = new FileReader()
      reader.onloadend = () => {
        setCvPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveCV = () => {
    setUploadedCV(null)
    setCvPreview(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form data:', formData)
    console.log('CV file:', uploadedCV)
    // Navigate back or show success message
    navigate('/agent/candidates')
  }

  return (
    <div className="space-y-4" style={{ fontFamily: "'Myriad Pro', sans-serif" }}>
      {/* Header */}
      <div className="bg-white rounded-2xl p-4 border border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/agent/candidates')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Tạo ứng viên</h1>
            <p className="text-sm text-gray-600 mt-1">Thêm thông tin ứng viên mới vào hệ thống</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate('/agent/candidates')}
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-bold text-sm hover:bg-gray-50 transition-colors"
          >
            Hủy
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-red-600 text-white rounded-lg font-bold text-sm hover:bg-red-700 transition-colors"
          >
            Lưu ứng viên
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Column - Form */}
        <div className="space-y-4">
          {/* Personal Information */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <HiUser className="w-5 h-5 text-red-600" />
              Thông tin cá nhân
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-900 mb-1">Mã ứng viên</label>
                <input
                  type="text"
                  value={formData.candidateId}
                  onChange={(e) => setFormData({ ...formData, candidateId: e.target.value })}
                  placeholder="VD: 00044572"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-900 mb-1">Họ và tên *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="VD: PHAM NGO BINH"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-900 mb-1">Email</label>
                  <div className="relative">
                    <HiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="email@example.com"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-900 mb-1">Số điện thoại</label>
                  <div className="relative">
                    <HiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+84 123 456 789"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-900 mb-1">Địa chỉ</label>
                <div className="relative">
                  <HiLocationMarker className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="VD: Ho Chi Minh City, Vietnam"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-900 mb-1">Ngày sinh</label>
                  <div className="relative">
                    <HiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-900 mb-1">Quốc tịch</label>
                  <input
                    type="text"
                    value={formData.nationality}
                    onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                    placeholder="VD: Vietnamese"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <HiAcademicCap className="w-5 h-5 text-red-600" />
              Học vấn
            </h2>
            <div className="space-y-3">
              <button className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:border-red-600 hover:text-red-600 transition-colors">
                + Thêm học vấn
              </button>
            </div>
          </div>

          {/* Work Experience */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <HiBriefcase className="w-5 h-5 text-red-600" />
              Kinh nghiệm làm việc
            </h2>
            <div className="space-y-3">
              <button className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:border-red-600 hover:text-red-600 transition-colors">
                + Thêm kinh nghiệm
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - CV Upload */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <HiDocumentText className="w-5 h-5 text-red-600" />
              Upload CV
            </h2>
            
            {!uploadedCV ? (
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-red-600 transition-colors">
                <label htmlFor="cv-upload" className="cursor-pointer">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                      <HiUpload className="w-8 h-8 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 mb-1">Kéo thả file CV vào đây</p>
                      <p className="text-xs text-gray-500">hoặc</p>
                      <p className="text-sm text-red-600 font-medium mt-1">Chọn file từ máy tính</p>
                    </div>
                    <p className="text-xs text-gray-500">PDF, DOC, DOCX (tối đa 10MB)</p>
                  </div>
                  <input
                    id="cv-upload"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            ) : (
              <div className="space-y-4">
                {/* File Info */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                        <FiFile className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{uploadedCV.name}</p>
                        <p className="text-xs text-gray-500">{(uploadedCV.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                    <button
                      onClick={handleRemoveCV}
                      className="text-gray-500 hover:text-red-600 transition-colors"
                    >
                      <HiX className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* CV Preview */}
                {cvPreview && (
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 p-3 border-b border-gray-200 flex items-center justify-between">
                      <p className="text-sm font-bold text-gray-900">Preview CV</p>
                      <button
                        onClick={handleRemoveCV}
                        className="text-gray-500 hover:text-red-600 transition-colors text-xs"
                      >
                        Xóa
                      </button>
                    </div>
                    <div className="bg-white p-4 min-h-[400px] max-h-[600px] overflow-y-auto">
                      {uploadedCV.type === 'application/pdf' ? (
                        <iframe
                          src={cvPreview}
                          className="w-full h-full min-h-[400px]"
                          title="CV Preview"
                        />
                      ) : (
                        <div className="text-center py-12">
                          <HiDocumentText className="w-16 h-16 text-gray-300 mx-auto mb-2" />
                          <p className="text-sm text-gray-600">Preview không khả dụng cho file này</p>
                          <p className="text-xs text-gray-500 mt-1">Vui lòng tải xuống để xem</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Re-upload Button */}
                <label htmlFor="cv-reupload" className="block">
                  <div className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors text-center cursor-pointer">
                    Tải lên CV khác
                  </div>
                  <input
                    id="cv-reupload"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            )}
          </div>

          {/* Additional Info */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Thông tin bổ sung</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-900 mb-1">Kỹ năng</label>
                <textarea
                  value={formData.skills.join(', ')}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value.split(', ').filter(s => s.trim()) })}
                  placeholder="VD: Project Management, Construction Planning, Team Leadership"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-900 mb-1">Ngôn ngữ</label>
                <textarea
                  value={formData.languages.join(', ')}
                  onChange={(e) => setFormData({ ...formData, languages: e.target.value.split(', ').filter(s => s.trim()) })}
                  placeholder="VD: Vietnamese (Native), Japanese (N2), English (Intermediate)"
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-900 mb-1">Chứng chỉ</label>
                <textarea
                  value={formData.certifications.join(', ')}
                  onChange={(e) => setFormData({ ...formData, certifications: e.target.value.split(', ').filter(s => s.trim()) })}
                  placeholder="VD: Construction Management Certificate, Safety Management License"
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateCandidate

