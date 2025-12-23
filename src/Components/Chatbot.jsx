import React, { useState, useRef, useEffect } from 'react'
import { HiChat, HiX, HiPaperAirplane, HiOutlineChat } from 'react-icons/hi'
import { FiSend, FiMessageCircle } from 'react-icons/fi'
import { useLanguage } from '../Contexts/LanguageContext'

const Chatbot = () => {
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleStartConversation = () => {
    setHasStarted(true)
    setMessages([
      {
        id: 1,
        sender: 'ai',
        text: t('chatIntro') || 'Xin chào! Tôi là AI assistant. Tôi có thể giúp gì cho bạn?',
        timestamp: new Date(),
      },
    ])
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Add user message
      setMessages(prev => [
        ...prev,
        {
          id: prev.length + 1,
          sender: 'user',
          text: newMessage,
          timestamp: new Date(),
        },
      ])
      setNewMessage('')
      
      // Simulate AI response
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            id: prev.length + 1,
            sender: 'ai',
            text: 'Cảm ơn bạn đã liên hệ. Tôi đang xử lý yêu cầu của bạn. Vui lòng đợi một chút...',
            timestamp: new Date(),
          },
        ])
      }, 1000)
    }
  }

  const handleQuickReply = (reply) => {
    if (!hasStarted) {
      handleStartConversation()
    }
    setMessages(prev => [
      ...prev,
      {
        id: prev.length + 1,
        sender: 'user',
        text: reply,
        timestamp: new Date(),
      },
    ])
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: prev.length + 1,
          sender: 'ai',
          text: `Tôi hiểu bạn muốn "${reply}". Để tôi hỗ trợ bạn với vấn đề này.`,
          timestamp: new Date(),
        },
      ])
    }, 1000)
  }

  const formatTime = (date) => {
    const now = new Date()
    const diff = now - date
    const minutes = Math.floor(diff / 60000)

    if (minutes < 1) return 'Vừa xong'
    if (minutes < 60) return `${minutes} phút trước`
    return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
  }

  const quickReplies = t('chatQuickReplies') || [
    'Muốn biết cách sử dụng',
    'Cần dữ liệu CSV job',
    'Chưa nhận phản hồi từ nơi giới thiệu',
    'Hỏi về hóa đơn',
    'Báo cáo nhân sự đã vào làm',
    'Muốn biết job thu hút ứng viên',
    'Muốn public job',
    'Khác',
  ]

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors z-40 shadow-lg"
          style={{ fontFamily: "'Myriad Pro', sans-serif" }}
        >
          <HiChat className="w-6 h-6" />
        </button>
      )}

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl flex flex-col z-40 border border-gray-200 shadow-lg" style={{ fontFamily: "'Myriad Pro', sans-serif" }}>
            {/* Header */}
            <div className="bg-white p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">{t('chatTitle') || 'Tin nhắn'}</h3>
              <button
                onClick={() => {
                  setIsOpen(false)
                  setHasStarted(false)
                  setMessages([])
                }}
                className="text-gray-500 hover:text-gray-700 transition-colors p-1"
              >
                <HiX className="w-5 h-5" />
              </button>
            </div>

            {/* Welcome Screen or Messages */}
            {!hasStarted ? (
              <div className="flex-1 flex flex-col items-center justify-center p-6 bg-gray-50">
                {/* Welcome Message */}
                <div className="w-full mb-6">
                  <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-200">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                      <FiMessageCircle className="w-5 h-5 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-800 mb-1">
                        {t('chatIntro') || 'Có điều gì bạn cần hỗ trợ không? JoBi...'}
                      </p>
                      <p className="text-xs text-gray-500">Customer Success • 3 tháng</p>
                    </div>
                    <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0 mt-2"></div>
                  </div>
                </div>

                {/* Start Conversation Button */}
                <button
                  onClick={handleStartConversation}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Bắt đầu cuộc trò chuyện</span>
                  <span className="text-lg">→</span>
                </button>
              </div>
            ) : (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl p-3 ${
                          message.sender === 'user'
                            ? 'bg-blue-500 text-white'
                            : 'bg-white text-gray-900 border border-gray-200'
                        }`}
                      >
                        <p className="text-sm font-medium mb-1">{message.text}</p>
                        <p
                          className={`text-xs ${
                            message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                          }`}
                        >
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Replies */}
                {messages.length === 1 && (
                  <div className="px-4 py-3 bg-white border-t border-gray-200">
                    <p className="text-xs text-gray-600 mb-2 font-medium">Câu hỏi thường gặp:</p>
                    <div className="flex flex-wrap gap-2">
                      {quickReplies.slice(0, 4).map((reply, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleQuickReply(reply)}
                          className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-200 transition-colors"
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input */}
                <div className="p-4 bg-white border-t border-gray-200 rounded-b-2xl">
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
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg font-bold text-sm hover:bg-blue-600 transition-colors flex items-center gap-2"
                    >
                      <FiSend className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </>
            )}
        </div>
      )}
    </>
  )
}

export default Chatbot

