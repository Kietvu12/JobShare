import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { MdDashboard } from 'react-icons/md'
import { HiOutlineBriefcase, HiOutlineClipboardList, HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { RiFileUserLine, RiTeamLine, RiMoneyDollarCircleLine } from 'react-icons/ri'
import { FiLogOut, FiHelpCircle, FiSettings, FiMessageCircle } from 'react-icons/fi'
import logoImage from '../assets/image/logo-removebg-preview.png'

const menuItems = [
  { label: 'Dashboard', icon: MdDashboard, path: '/agent/home' },
  { label: 'Danh sách việc làm', icon: HiOutlineClipboardList, path: '/agent/jobs' },
  { label: 'Hồ sơ ứng viên', icon: RiFileUserLine, path: '/agent/candidates' },
  { label: 'Đơn tiến cử', icon: RiTeamLine, path: '/agent/referrals' },
  { label: 'Doanh thu cá nhân', icon: RiMoneyDollarCircleLine, path: '/agent/revenue' },
]

const footerItems = [
  { label: 'Tin nhắn', icon: FiMessageCircle, path: '/agent/messages' },
  { label: 'Cài đặt', icon: FiSettings },
  { label: 'Đăng xuất', icon: FiLogOut },
]

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <aside 
      className={`border-2 border-black h-[calc(100vh-2rem)] px-5 py-6 flex flex-col shadow-2xl transition-all duration-300 relative rounded-2xl m-4 sticky top-4 ${
        collapsed ? 'w-20' : 'w-72'
      }`}
      style={{ fontFamily: "'Myriad Pro', sans-serif" }}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 bg-white border-2 border-black rounded-full w-6 h-6 flex items-center justify-center text-gray-700 hover:bg-red-600 hover:text-white transition-colors shadow-lg z-10"
      >
        {collapsed ? (
          <HiChevronRight className="text-sm" />
        ) : (
          <HiChevronLeft className="text-sm" />
        )}
      </button>

      {/* Brand */}
      <div className={`flex items-center justify-center gap-3 mb-8`}>
        {collapsed ? (
          <div className="w-12 h-12 rounded-full bg-red-600 text-white font-bold flex items-center justify-center text-2xl shadow-lg">
            j
          </div>
        ) : (
          <img 
            src={logoImage} 
            alt="JobShare Logo" 
            className="h-10 w-auto object-contain"
          />
        )}
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-1 overflow-y-auto flex-1 min-h-0">
        {menuItems.map((item) => {
          const Icon = item.icon
          const active = location.pathname === item.path
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                active
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'text-gray-900 hover:bg-gray-100'
              } ${collapsed ? 'justify-center' : ''}`}
              title={collapsed ? item.label : ''}
            >
              <span
                className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  active ? 'text-white' : 'text-gray-700'
                }`}
              >
                <Icon className="text-lg" />
              </span>
              {!collapsed && <span className="truncate">{item.label}</span>}
            </button>
          )
        })}
      </nav>

      {/* Footer actions */}
      <div className={`mt-6 border-t-2 border-black pt-4 space-y-2 ${collapsed ? 'border-t border-gray-300' : ''}`}>
        {footerItems.map((item) => {
          const Icon = item.icon
          const isLogout = item.label === 'Đăng xuất'
          const active = item.path && location.pathname === item.path
          
          const handleClick = () => {
            if (isLogout) {
              // Clear any stored authentication data
              localStorage.removeItem('token')
              localStorage.removeItem('user')
              // Navigate to login
              navigate('/login')
            } else if (item.path) {
              navigate(item.path)
            }
          }
          
          return (
            <button
              key={item.label}
              onClick={handleClick}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                isLogout
                  ? 'text-red-600 hover:bg-red-50'
                  : active
                  ? 'bg-red-600 text-white'
                  : 'text-gray-900 hover:bg-gray-100'
              } ${collapsed ? 'justify-center' : ''}`}
              title={collapsed ? item.label : ''}
            >
              <span className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                isLogout ? 'text-red-600' : active ? 'text-white' : 'text-gray-700'
              }`}>
                <Icon className="text-lg" />
              </span>
              {!collapsed && <span className="truncate">{item.label}</span>}
            </button>
          )
        })}
      </div>
    </aside>
  )
}

export default Sidebar

