import React, { useState } from 'react'
import { HiArrowUp, HiCalendar, HiExternalLink, HiBell, HiNewspaper, HiFire, HiBriefcase, HiUser, HiTrendingUp, HiTrendingDown, HiDocumentText, HiCash, HiCheckCircle, HiChevronLeft, HiChevronRight, HiClock, HiLocationMarker, HiX } from 'react-icons/hi'
import { FiTarget, FiDollarSign, FiUsers } from 'react-icons/fi'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const HomePage = () => {
  const [timeRange, setTimeRange] = useState('month')
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [showAppointmentModal, setShowAppointmentModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)

  // Mock data for scheduled appointments
  const scheduledAppointments = [
    {
      id: 1,
      candidateId: '00044572',
      candidateName: 'PHAM NGO BINH',
      type: 'interview',
      date: '2025-12-20',
      time: '10:00',
      location: 'Văn phòng công ty',
    },
    {
      id: 2,
      candidateId: '00044064',
      candidateName: 'NGUYEN THI NGA',
      type: 'on-job',
      date: '2025-12-22',
      time: '14:00',
      location: 'Công trường A',
    },
    {
      id: 3,
      candidateId: '00043293',
      candidateName: 'TRAN VAN CUONG',
      type: 'interview',
      date: '2025-12-25',
      time: '09:00',
      location: 'Văn phòng công ty',
    },
    {
      id: 4,
      candidateId: '00043103',
      candidateName: 'LE THI MAI',
      type: 'interview',
      date: '2025-12-20',
      time: '15:00',
      location: 'Văn phòng công ty',
    },
  ]

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()
    
    const days = []
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }
    return days
  }

  const hasAppointment = (date) => {
    if (!date) return false
    const dateStr = date.toISOString().split('T')[0]
    return scheduledAppointments.some(apt => apt.date === dateStr)
  }

  const getAppointmentsForDate = (date) => {
    if (!date) return []
    const dateStr = date.toISOString().split('T')[0]
    return scheduledAppointments.filter(apt => apt.date === dateStr)
  }

  const isToday = (date) => {
    if (!date) return false
    const today = new Date()
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear()
  }

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
    setSelectedDate(null)
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
    setSelectedDate(null)
  }

  const handleDateClick = (date) => {
    if (date) {
      setSelectedDate(date)
      setShowAppointmentModal(true)
    }
  }

  // Sample data for charts
  const statCards = [
    { title: 'Tổng số CV đã ứng tuyển', value: 6, change: '-100%', color: 'red', icon: HiDocumentText },
    { title: 'CV đang phỏng vấn', value: 0, change: '100%', color: 'green', icon: HiBriefcase },
    { title: 'CV đã nyusha', value: 0, change: '100%', color: 'blue', icon: HiCheckCircle },
    { title: 'CV đã thanh toán', value: 0, change: '100%', color: 'purple', icon: HiCash },
  ]

  const chartData = [
    { month: '2025-01', referred: 0, interviewing: 0, nyusha: 0, paid: 0 },
    { month: '2025-02', referred: 0, interviewing: 0, nyusha: 0, paid: 0 },
    { month: '2025-03', referred: 0, interviewing: 0, nyusha: 0, paid: 0 },
    { month: '2025-04', referred: 0, interviewing: 0, nyusha: 0, paid: 0 },
    { month: '2025-05', referred: 0, interviewing: 0, nyusha: 0, paid: 0 },
    { month: '2025-06', referred: 0, interviewing: 0, nyusha: 0, paid: 0 },
    { month: '2025-07', referred: 0, interviewing: 0, nyusha: 0, paid: 0 },
    { month: '2025-08', referred: 0, interviewing: 0, nyusha: 0, paid: 0 },
    { month: '2025-09', referred: 0, interviewing: 0, nyusha: 0, paid: 0 },
    { month: '2025-10', referred: 0, interviewing: 0, nyusha: 0, paid: 0 },
    { month: '2025-11', referred: 5, interviewing: 0, nyusha: 0, paid: 0 },
    { month: '2025-12', referred: 6, interviewing: 0, nyusha: 0, paid: 0 },
  ]

  const newsItems = [
    '3 KIỂU ỨNG VIÊN "TƯỜNG LÀ TỐT NHƯNG TIẾN CỬ KHẢ NĂNG CAO SẼ "RỤNG"!"',
    'VÌ SAO BẠN NÊN "CHAY" JOB KỸ THUẬT - THAY VÌ CHỈ TẬP TRUNG CHAY JOB BUNKEI?',
    'Phí back 30%-40% TUYỂN KỸ SƯ IT TỪ NƯỚC NGOÀI - LÀM VIỆC TẠI NHẬT BẢN JP',
    'Cuối năm, ứng viên chùn chuyển việc – Hiểu quy luật để không mất nhịp đầu năm sau',
    'MỘT SỐ THÁCH THỨC CỦA RECRUITER/HR NHẬT VIỆT NGÀY NAY',
    '44 Câu hỏi phỏng vấn kinh điển và 3 cấp độ trả lời',
  ]

  const hotJobs = [
    'HOT JOB BẢO TRÌ - BẢO DƯỠNG',
    'TOP 5 JOB THIẾT KẾ CƠ KHÍ CHỐT NAITEI NHANH',
    'JOB N4-N3/ TUYỂN TỪ VIỆT NAM',
    'JOB PHÍ BACK CAD',
  ]

  const updatedJobs = [
    'Tuyền 30 người/Quản lý Khách sạn theo nhóm 2 Người – Hợp đồng Ủy thác Vận hành/ Toàn nước Nhật',
    'Tuyển gấp/Kỹ sư IT tổng hợp/ Làm việc toàn quốc/Gia nhập công ty vào tháng 12 và tháng 1',
    '(BrSE) Kỹ sư cầu nối khách hàng Nhật và đội offshore Việt Nam/Kinh nghiệm > 3 năm/ Làm việc tại Tokyo / Nagoya',
    'Quản lý thi công- Ứng viên ở ngoài Nhật có thể ứng tuyển/Làm việc trên toàn nước Nhật',
    'Kỹ sư cơ khí (thiết kế – QC - công trường) tại Nagoya-Aichi',
  ]

  return (
    <div className="space-y-4" style={{ fontFamily: "'Myriad Pro', sans-serif" }}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-4">
          {/* Notification Banner */}
          <div className="bg-red-600 text-white p-4 rounded-2xl flex items-center gap-3">
            <HiBell className="w-5 h-5 flex-shrink-0" />
            <p className="font-bold text-sm">
              11/11/2025 Phí back 30%-40% TUYẾN KỸ SƯ IT TỪ NƯỚC NGOÀI - LÀM VIỆC TẠI NHẬT BẢN JP
            </p>
          </div>

          {/* Latest News */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <HiNewspaper className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold text-gray-900">Tin mới</h2>
            </div>
            <div className="space-y-3">
              {newsItems.map((item, idx) => {
                const tagColors = [
                  'bg-red-600 text-white',
                  'bg-orange-500 text-white',
                  'bg-yellow-500 text-white',
                  'bg-green-600 text-white',
                  'bg-blue-600 text-white',
                  'bg-purple-600 text-white',
                ]
                const tagColor = tagColors[idx % tagColors.length]
                return (
                  <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-lg hover:bg-gray-50 transition-colors">
                    <span className={`${tagColor} text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 flex items-center gap-1`}>
                      <HiFire className="w-3 h-3" />
                      New
                    </span>
                    <p className="text-sm text-gray-800 font-medium leading-relaxed">{item}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Events */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <HiCalendar className="w-5 h-5 text-purple-600" />
              <h2 className="text-lg font-bold text-gray-900">Sự kiện</h2>
            </div>
            <div className="flex items-start gap-2.5 p-3 bg-purple-50 rounded-xl border-l-4 border-purple-600">
              <HiCalendar className="text-purple-600 w-5 h-5 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800 mb-2">[28/09/2025] [Webinar] Chuỗi hoạt động đào tạo nghiệp vụ cho cộng tác viên lần 2</p>
                <a href="#" className="text-purple-600 hover:text-purple-700 text-sm font-bold inline-flex items-center gap-1.5">
                  Xem chi tiết
                  <HiExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Campaigns */}
          <div className="bg-white rounded-2xl p-5 space-y-4 border border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <FiTarget className="w-5 h-5 text-red-600" />
              <h2 className="text-lg font-bold text-gray-900">Campaign</h2>
            </div>
            
            <div className="border-l-4 border-red-600 rounded-xl p-4 bg-red-50">
              <div className="flex items-start gap-2.5 mb-2">
                <HiFire className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                <h3 className="font-bold text-red-600 text-sm">
                  25%-30% cho tất cả các đơn tiến cử nyusha thành công trong tháng 12 này !!!
                </h3>
              </div>
              <p className="text-sm text-gray-800 mb-2 leading-relaxed">
                TIẾP TỤC DUY TRÌ CHUỖI CHIẾN DỊCH TUYỂN DỤNG MÙA ĐÔNG 2025, JobShare tiếp sức cho các cộng tác viên với chính sách nâng hạng 30% với tất cả các đơn tiến cử nyusha thành công trong tháng 12!
              </p>
              <div className="flex items-center gap-1.5 text-xs text-gray-600">
                <HiCalendar className="w-3.5 h-3.5" />
                <span>Chiến dịch sẽ diễn ra từ 08/11/2025 đến hết 31/12/2025</span>
              </div>
            </div>

            <div className="border-l-4 border-red-600 rounded-xl p-4 bg-red-50">
              <div className="flex items-start gap-2.5 mb-2">
                <HiFire className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                <h3 className="font-bold text-red-600 text-sm">
                  Phi back CTV siêu hot: 150 man TUYỂN QUẢN LÝ KHÁCH SẠN THEO CẬP – Cơ hội bứt phá sự nghiệp trong 4 năm
                </h3>
              </div>
              <p className="text-sm text-gray-800 mb-2 leading-relaxed">
                Không nhầm đâu ạ : o Phí back CTV siêu hot: 150 man Giới thiệu thành công, CTV đổi ngay VF3 đi chơi phố Job ngon, cho người không ngại khó : § Xứng tầm theo đuổi !!!
              </p>
              <div className="flex items-center gap-1.5 text-xs text-gray-600">
                <HiCalendar className="w-3.5 h-3.5" />
                <span>Chiến dịch sẽ diễn ra từ 13/12/2025 đến hết 31/05/2026</span>
              </div>
            </div>
          </div>

          {/* Management Dashboard */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <HiTrendingUp className="w-5 h-5 text-red-600" />
                <h2 className="text-lg font-bold text-gray-900">Bảng quản lý</h2>
              </div>
              <div className="flex gap-2">
                {['Ngày', 'Tuần', 'Tháng'].map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range.toLowerCase())}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      timeRange === range.toLowerCase()
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              {statCards.map((card, idx) => {
                const Icon = card.icon
                const iconBgColors = {
                  red: 'bg-red-100',
                  green: 'bg-green-100',
                  blue: 'bg-blue-100',
                  purple: 'bg-purple-100',
                }
                return (
                  <div key={idx} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border border-gray-200 transition-shadow hover:border-red-300">
                    <div className="flex items-center justify-between mb-2">
                      <div className={`${iconBgColors[card.color]} p-2 rounded-lg`}>
                        <Icon className={`w-4 h-4 ${
                          card.color === 'red' ? 'text-red-600' : 
                          card.color === 'green' ? 'text-green-600' :
                          card.color === 'blue' ? 'text-blue-600' : 'text-purple-600'
                        }`} />
                      </div>
                      {card.change.startsWith('-') ? (
                        <HiTrendingDown className="w-3.5 h-3.5 text-red-600" />
                      ) : (
                        <HiTrendingUp className="w-3.5 h-3.5 text-green-600" />
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mb-1.5 font-medium leading-tight">{card.title}</p>
                    <div className="flex items-baseline gap-2 mb-1.5">
                      <span className="text-xl font-bold text-gray-900">{card.value}</span>
                      <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${
                        card.change.startsWith('-') 
                          ? 'text-red-600 bg-red-50' 
                          : 'text-green-600 bg-green-50'
                      }`}>
                        {card.change}
                      </span>
                    </div>
                    <div className="h-1 bg-gray-200 rounded-full">
                      <div 
                        className="h-full rounded-full" 
                        style={{ 
                          width: '50%',
                          backgroundColor: card.color === 'red' ? '#ef4444' : 
                                         card.color === 'green' ? '#10b981' :
                                         card.color === 'blue' ? '#3b82f6' : '#a855f7'
                        }}
                      ></div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Main Chart */}
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="referred" stroke="#10b981" name="CV đã tiến cử" strokeWidth={2} />
                  <Line type="monotone" dataKey="interviewing" stroke="#3b82f6" name="CV đang phỏng vấn" strokeWidth={2} />
                  <Line type="monotone" dataKey="nyusha" stroke="#ef4444" name="CV đã nyusha" strokeWidth={2} />
                  <Line type="monotone" dataKey="paid" stroke="#a855f7" name="CV đã thanh toán" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* HOT JOB Buttons */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-orange-100 p-1.5 rounded-lg">
                <HiFire className="w-5 h-5 text-orange-600" />
              </div>
              <h2 className="text-lg font-bold text-gray-900">HOT JOB</h2>
            </div>
            <div className="space-y-2.5">
              {hotJobs.map((job, idx) => {
                const jobColors = [
                  'bg-red-600 hover:bg-red-700',
                  'bg-orange-600 hover:bg-orange-700',
                  'bg-yellow-600 hover:bg-yellow-700',
                  'bg-red-600 hover:bg-red-700',
                ]
                return (
                  <button
                    key={idx}
                    className={`w-full ${jobColors[idx % jobColors.length]} text-white px-3 py-2.5 rounded-xl font-bold text-xs transition-all text-left transform hover:-translate-y-0.5 flex items-center gap-2`}
                  >
                    <HiBriefcase className="w-3.5 h-3.5" />
                    {job}
                  </button>
                )
              })}
            </div>
          </div>

          {/* User Profile */}
          <div className="bg-white rounded-2xl p-5 relative border border-gray-200">
            <button className="absolute top-3 right-3 bg-red-600 text-white px-2.5 py-1 rounded-lg text-xs font-bold hover:bg-red-700 transition-colors flex items-center gap-1">
              <HiUser className="w-3 h-3" />
              Update
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                <HiUser className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm">Trần Quỳnh Anh</h3>
                <p className="text-xs text-gray-600 mt-0.5">ID: CN202506112226452</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <HiCalendar className="w-3 h-3 text-gray-500" />
                  <p className="text-xs text-gray-600">2025-06-11</p>
                </div>
              </div>
            </div>
            <div className="pt-3 border-t border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <FiDollarSign className="w-3.5 h-3.5 text-gray-600" />
                  <span className="text-xs font-bold text-gray-900">Mức phí đang nhận</span>
                </div>
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Level 6</span>
              </div>
              <div className="h-2.5 bg-gray-200 rounded-full mb-1.5">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: '30%' }}></div>
              </div>
              <p className="text-xs text-gray-600 font-medium">30.00%</p>
            </div>
          </div>

          {/* Updated Job List */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-blue-100 p-1.5 rounded-lg">
                <HiBriefcase className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-lg font-bold text-gray-900">Danh sách việc làm cập nhật</h2>
            </div>
            <div className="space-y-2.5">
              {updatedJobs.map((job, idx) => {
                const iconColors = [
                  'text-blue-600',
                  'text-green-600',
                  'text-purple-600',
                  'text-orange-600',
                  'text-indigo-600',
                ]
                const hoverColors = [
                  'hover:border-blue-600 hover:bg-blue-50',
                  'hover:border-green-600 hover:bg-green-50',
                  'hover:border-purple-600 hover:bg-purple-50',
                  'hover:border-orange-600 hover:bg-orange-50',
                  'hover:border-indigo-600 hover:bg-indigo-50',
                ]
                return (
                  <div key={idx} className={`border border-gray-200 rounded-xl p-3 ${hoverColors[idx % hoverColors.length]} transition-all cursor-pointer group`}>
                    <div className="flex items-start gap-2.5">
                      <HiBriefcase className={`w-4 h-4 ${iconColors[idx % iconColors.length]} flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform`} />
                      <p className="text-xs text-gray-800 font-medium leading-relaxed">{job}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Calendar - Scheduled Appointments */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-green-100 p-1.5 rounded-lg">
                <HiCalendar className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-lg font-bold text-gray-900">Lịch hẹn</h2>
            </div>
            
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={handlePrevMonth}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <HiChevronLeft className="w-5 h-5 text-gray-700" />
              </button>
              <h3 className="text-base font-bold text-gray-900">
                {currentMonth.toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' })}
              </h3>
              <button
                onClick={handleNextMonth}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <HiChevronRight className="w-5 h-5 text-gray-700" />
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map((day) => (
                <div key={day} className="text-center text-xs font-bold text-gray-600 py-2">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-1 mb-4">
              {getDaysInMonth(currentMonth).map((date, idx) => {
                if (!date) {
                  return <div key={idx} className="aspect-square" />
                }
                const hasApt = hasAppointment(date)
                const isTodayDay = isToday(date)
                
                return (
                  <button
                    key={idx}
                    onClick={() => handleDateClick(date)}
                    className={`aspect-square rounded-lg text-xs font-bold transition-colors relative ${
                      isTodayDay
                        ? 'bg-red-100 text-red-600 border-2 border-red-600'
                        : hasApt
                        ? 'bg-red-50 text-red-600 hover:bg-red-100'
                        : 'bg-white text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {date.getDate()}
                    {hasApt && (
                      <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-red-600 rounded-full"></span>
                    )}
                  </button>
                )
              })}
            </div>

            {/* Summary */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600 font-medium">Tổng số lịch hẹn trong tháng:</span>
                <span className="text-green-600 bg-green-50 px-2 py-1 rounded font-bold">{scheduledAppointments.filter(apt => {
                  const aptDate = new Date(apt.date)
                  return aptDate.getMonth() === currentMonth.getMonth() &&
                         aptDate.getFullYear() === currentMonth.getFullYear()
                }).length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Appointment Modal */}
      {showAppointmentModal && selectedDate && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setShowAppointmentModal(false)} />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <HiCalendar className="w-6 h-6 text-red-600" />
                    Lịch hẹn ngày {selectedDate.toLocaleDateString('vi-VN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </h2>
                  <button
                    onClick={() => setShowAppointmentModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <HiX className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                {getAppointmentsForDate(selectedDate).length > 0 ? (
                  <div className="space-y-3">
                    {getAppointmentsForDate(selectedDate).map((apt) => (
                      <div key={apt.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <p className="text-sm font-bold text-gray-900 mb-1">{apt.candidateName}</p>
                            <p className="text-xs text-gray-600">ID: {apt.candidateId}</p>
                          </div>
                          <span className={`text-xs font-bold px-3 py-1.5 rounded ${
                            apt.type === 'interview' 
                              ? 'bg-blue-100 text-blue-600' 
                              : 'bg-green-100 text-green-600'
                          }`}>
                            {apt.type === 'interview' ? 'Phỏng vấn' : 'On Job'}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-700">
                          <div className="flex items-center gap-1.5">
                            <HiClock className="w-4 h-4 text-gray-500" />
                            <span className="font-medium">{apt.time}</span>
                          </div>
                          {apt.location && (
                            <div className="flex items-center gap-1.5">
                              <HiLocationMarker className="w-4 h-4 text-gray-500" />
                              <span>{apt.location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <HiCalendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 font-medium">
                      Không có lịch hẹn vào ngày này
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default HomePage
