import React, { useState, useRef, useEffect } from 'react'
import { HiPaperAirplane, HiCalendar, HiClock, HiUser, HiCheckCircle, HiX, HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { FiSend, FiPlus, FiMoreVertical, FiTrash2 } from 'react-icons/fi'

const Messages = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'admin',
      text: 'Xin chào! Tôi có thể giúp gì cho bạn?',
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: 2,
      sender: 'user',
      text: 'Tôi muốn tạo lịch hẹn cho ứng viên đi phỏng vấn',
      timestamp: new Date(Date.now() - 3000000),
    },
    {
      id: 3,
      sender: 'admin',
      text: 'Bạn có thể sử dụng nút "Tạo lịch hẹn nhanh" bên dưới để tạo lịch hẹn.',
      timestamp: new Date(Date.now() - 2400000),
    },
  ])
  const [newMessage, setNewMessage] = useState('')
  const [showQuickSchedule, setShowQuickSchedule] = useState(false)
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [openMenuId, setOpenMenuId] = useState(null)
  const [scheduleForm, setScheduleForm] = useState({
    candidateId: '',
    candidateName: '',
    type: 'interview', // 'interview' or 'on-job'
    date: '',
    time: '',
    location: '',
    notes: '',
  })
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const messagesEndRef = useRef(null)
  const menuRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleDeleteMessage = (messageId) => {
    setMessages(messages.filter(msg => msg.id !== messageId))
    setOpenMenuId(null)
  }

  const handleOpenScheduleModal = () => {
    setShowScheduleModal(true)
    setOpenMenuId(null)
  }

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()
    
    const days = []
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }
    return days
  }

  const formatDateForInput = (date) => {
    if (!date) return ''
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const handleDateSelect = (date) => {
    if (date) {
      setSelectedDate(date)
      setScheduleForm({ ...scheduleForm, date: formatDateForInput(date) })
    }
  }

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const isToday = (date) => {
    if (!date) return false
    const today = new Date()
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear()
  }

  const isSelected = (date) => {
    if (!date) return false
    return date.getDate() === selectedDate.getDate() &&
           date.getMonth() === selectedDate.getMonth() &&
           date.getFullYear() === selectedDate.getFullYear()
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: 'user',
          text: newMessage,
          timestamp: new Date(),
        },
      ])
      setNewMessage('')
      
      // Simulate admin response
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            id: prev.length + 1,
            sender: 'admin',
            text: 'Cảm ơn bạn đã liên hệ. Tôi sẽ xử lý yêu cầu của bạn sớm nhất có thể.',
            timestamp: new Date(),
          },
        ])
      }, 1000)
    }
  }

  const handleCreateSchedule = () => {
    if (scheduleForm.candidateId && scheduleForm.date && scheduleForm.time) {
      const scheduleMessage = `Đã tạo lịch hẹn ${scheduleForm.type === 'interview' ? 'phỏng vấn' : 'on job'} cho ứng viên ${scheduleForm.candidateName || scheduleForm.candidateId} vào ${scheduleForm.date} lúc ${scheduleForm.time}${scheduleForm.location ? ` tại ${scheduleForm.location}` : ''}${scheduleForm.notes ? `. Ghi chú: ${scheduleForm.notes}` : ''}`
      
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: 'user',
          text: scheduleMessage,
          timestamp: new Date(),
        },
      ])
      
      setScheduleForm({
        candidateId: '',
        candidateName: '',
        type: 'interview',
        date: '',
        time: '',
        location: '',
        notes: '',
      })
      setShowQuickSchedule(false)
      setShowScheduleModal(false)
      setSelectedDate(new Date())
      
      // Simulate admin confirmation
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            id: prev.length + 1,
            sender: 'admin',
            text: `Đã xác nhận lịch hẹn ${scheduleForm.type === 'interview' ? 'phỏng vấn' : 'on job'} cho ứng viên ${scheduleForm.candidateName || scheduleForm.candidateId}.`,
            timestamp: new Date(),
          },
        ])
      }, 1000)
    }
  }

  const formatTime = (date) => {
    const now = new Date()
    const diff = now - date
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return 'Vừa xong'
    if (minutes < 60) return `${minutes} phút trước`
    if (hours < 24) return `${hours} giờ trước`
    if (days < 7) return `${days} ngày trước`
    return date.toLocaleDateString('vi-VN')
  }

  return (
    <div className="h-full flex flex-col" style={{ fontFamily: "'Myriad Pro', sans-serif" }}>
      <div className="bg-white rounded-2xl p-4 border border-gray-200 mb-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <HiUser className="w-6 h-6 text-red-600" />
              Tin nhắn với Admin
            </h1>
            <p className="text-sm text-gray-600 mt-1">Liên hệ với admin để được hỗ trợ</p>
          </div>
          <button
            onClick={() => setShowQuickSchedule(!showQuickSchedule)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg font-bold text-sm hover:bg-red-700 transition-colors flex items-center gap-2 shadow-md"
          >
            <HiCalendar className="w-4 h-4" />
            Tạo lịch hẹn nhanh
          </button>
        </div>
      </div>

      {/* Quick Schedule Form */}
      {showQuickSchedule && (
        <div className="bg-white rounded-2xl p-5 border border-gray-200 mb-4 shadow-lg">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <HiCalendar className="w-5 h-5 text-red-600" />
            Tạo lịch hẹn nhanh
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-900 mb-1">Mã ứng viên *</label>
              <input
                type="text"
                value={scheduleForm.candidateId}
                onChange={(e) => setScheduleForm({ ...scheduleForm, candidateId: e.target.value })}
                placeholder="VD: 00044572"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-900 mb-1">Tên ứng viên</label>
              <input
                type="text"
                value={scheduleForm.candidateName}
                onChange={(e) => setScheduleForm({ ...scheduleForm, candidateName: e.target.value })}
                placeholder="VD: PHAM NGO BINH"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-900 mb-1">Loại lịch hẹn *</label>
              <select
                value={scheduleForm.type}
                onChange={(e) => setScheduleForm({ ...scheduleForm, type: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
              >
                <option value="interview">Phỏng vấn</option>
                <option value="on-job">On Job</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-900 mb-1">Ngày *</label>
              <input
                type="date"
                value={scheduleForm.date}
                onChange={(e) => setScheduleForm({ ...scheduleForm, date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-900 mb-1">Giờ *</label>
              <input
                type="time"
                value={scheduleForm.time}
                onChange={(e) => setScheduleForm({ ...scheduleForm, time: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-900 mb-1">Địa điểm</label>
              <input
                type="text"
                value={scheduleForm.location}
                onChange={(e) => setScheduleForm({ ...scheduleForm, location: e.target.value })}
                placeholder="VD: Văn phòng công ty"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-900 mb-1">Ghi chú</label>
              <textarea
                value={scheduleForm.notes}
                onChange={(e) => setScheduleForm({ ...scheduleForm, notes: e.target.value })}
                placeholder="Thêm ghi chú cho lịch hẹn..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleCreateSchedule}
              className="px-4 py-2 bg-red-600 text-white rounded-lg font-bold text-sm hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              <HiCheckCircle className="w-4 h-4" />
              Tạo lịch hẹn
            </button>
            <button
              onClick={() => {
                setShowQuickSchedule(false)
                setScheduleForm({
                  candidateId: '',
                  candidateName: '',
                  type: 'interview',
                  date: '',
                  time: '',
                  location: '',
                  notes: '',
                })
              }}
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-bold text-sm hover:bg-gray-50 transition-colors"
            >
              Hủy
            </button>
          </div>
        </div>
      )}

      {/* Chat Messages */}
      <div className="flex-1 flex flex-col bg-white rounded-2xl border border-gray-200 shadow-lg min-h-0">
        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className="relative">
                <div
                  className={`max-w-[70%] rounded-2xl p-4 relative group ${
                    message.sender === 'user'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm font-medium mb-1 pr-6">{message.text}</p>
                  <p
                    className={`text-xs ${
                      message.sender === 'user' ? 'text-red-100' : 'text-gray-500'
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </p>
                
                  {/* Menu Button */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setOpenMenuId(openMenuId === message.id ? null : message.id)
                      }}
                      className={`p-1 rounded-lg hover:bg-opacity-20 ${
                        message.sender === 'user' ? 'hover:bg-white' : 'hover:bg-gray-300'
                      }`}
                    >
                      <FiMoreVertical className={`w-4 h-4 ${message.sender === 'user' ? 'text-white' : 'text-gray-700'}`} />
                    </button>
                  </div>
                </div>
                
                {/* Dropdown Menu */}
                {openMenuId === message.id && (
                  <div className="absolute right-0 top-10 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-50 min-w-[160px]" ref={menuRef}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleOpenScheduleModal()
                      }}
                      className="w-full px-4 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <HiCalendar className="w-4 h-4 text-red-600" />
                      Tạo lịch hẹn
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteMessage(message.id)
                      }}
                      className="w-full px-4 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                      <FiTrash2 className="w-4 h-4" />
                      Xóa tin nhắn
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage()
                }
              }}
              placeholder="Nhập tin nhắn..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <button
              onClick={handleSendMessage}
              className="px-4 py-2 bg-red-600 text-white rounded-lg font-bold text-sm hover:bg-red-700 transition-colors flex items-center gap-2 shadow-md"
            >
              <FiSend className="w-4 h-4" />
              Gửi
            </button>
          </div>
        </div>
      </div>

      {/* Schedule Modal with Calendar */}
      {showScheduleModal && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setShowScheduleModal(false)} />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <HiCalendar className="w-6 h-6 text-red-600" />
                    Tạo lịch hẹn
                  </h2>
                  <button
                    onClick={() => {
                      setShowScheduleModal(false)
                      setScheduleForm({
                        candidateId: '',
                        candidateName: '',
                        type: 'interview',
                        date: '',
                        time: '',
                        location: '',
                        notes: '',
                      })
                      setSelectedDate(new Date())
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <HiX className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Calendar */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-4">
                      <button
                        onClick={handlePrevMonth}
                        className="p-2 hover:bg-white rounded-lg transition-colors"
                      >
                        <HiChevronLeft className="w-5 h-5 text-gray-700" />
                      </button>
                      <h3 className="text-lg font-bold text-gray-900">
                        {currentMonth.toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' })}
                      </h3>
                      <button
                        onClick={handleNextMonth}
                        className="p-2 hover:bg-white rounded-lg transition-colors"
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
                    
                    <div className="grid grid-cols-7 gap-1">
                      {getDaysInMonth(currentMonth).map((date, idx) => {
                        if (!date) {
                          return <div key={idx} className="aspect-square" />
                        }
                        const isSelectedDay = isSelected(date)
                        const isTodayDay = isToday(date)
                        return (
                          <button
                            key={idx}
                            onClick={() => handleDateSelect(date)}
                            className={`aspect-square rounded-lg text-sm font-bold transition-colors ${
                              isSelectedDay
                                ? 'bg-red-600 text-white'
                                : isTodayDay
                                ? 'bg-red-100 text-red-600 border-2 border-red-600'
                                : 'bg-white text-gray-900 hover:bg-gray-100'
                            }`}
                          >
                            {date.getDate()}
                          </button>
                        )
                      })}
                    </div>
                    
                    {/* Selected Date Display */}
                    {scheduleForm.date && (
                      <div className="mt-4 p-3 bg-white rounded-lg border border-gray-200">
                        <p className="text-xs text-gray-600 mb-1">Ngày đã chọn:</p>
                        <p className="text-sm font-bold text-gray-900">
                          {new Date(scheduleForm.date).toLocaleDateString('vi-VN', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Form */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-900 mb-1">Mã ứng viên *</label>
                      <input
                        type="text"
                        value={scheduleForm.candidateId}
                        onChange={(e) => setScheduleForm({ ...scheduleForm, candidateId: e.target.value })}
                        placeholder="VD: 00044572"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-900 mb-1">Tên ứng viên</label>
                      <input
                        type="text"
                        value={scheduleForm.candidateName}
                        onChange={(e) => setScheduleForm({ ...scheduleForm, candidateName: e.target.value })}
                        placeholder="VD: PHAM NGO BINH"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-900 mb-1">Loại lịch hẹn *</label>
                      <select
                        value={scheduleForm.type}
                        onChange={(e) => setScheduleForm({ ...scheduleForm, type: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                      >
                        <option value="interview">Phỏng vấn</option>
                        <option value="on-job">On Job</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-900 mb-1">Giờ *</label>
                      <input
                        type="time"
                        value={scheduleForm.time}
                        onChange={(e) => setScheduleForm({ ...scheduleForm, time: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-900 mb-1">Địa điểm</label>
                      <input
                        type="text"
                        value={scheduleForm.location}
                        onChange={(e) => setScheduleForm({ ...scheduleForm, location: e.target.value })}
                        placeholder="VD: Văn phòng công ty"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-900 mb-1">Ghi chú</label>
                      <textarea
                        value={scheduleForm.notes}
                        onChange={(e) => setScheduleForm({ ...scheduleForm, notes: e.target.value })}
                        placeholder="Thêm ghi chú cho lịch hẹn..."
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                      />
                    </div>
                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={handleCreateSchedule}
                        className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-bold text-sm hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <HiCheckCircle className="w-4 h-4" />
                        Tạo lịch hẹn
                      </button>
                      <button
                        onClick={() => {
                          setShowScheduleModal(false)
                          setScheduleForm({
                            candidateId: '',
                            candidateName: '',
                            type: 'interview',
                            date: '',
                            time: '',
                            location: '',
                            notes: '',
                          })
                          setSelectedDate(new Date())
                        }}
                        className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-bold text-sm hover:bg-gray-50 transition-colors"
                      >
                        Hủy
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Messages

