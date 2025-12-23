import React from 'react'
import { HiArrowUp, HiStar } from 'react-icons/hi'
import { FiBell, FiUser, FiExternalLink } from 'react-icons/fi'

const Header = () => {
  return (
    <header 
      className="bg-white px-6 py-4 flex items-center justify-between rounded-2xl m-4 mb-0"
      style={{ fontFamily: "'Myriad Pro', sans-serif" }}
    >
      {/* Left Side - Title */}
      <div>
        <h1 className="text-xl font-bold text-gray-900">
          Danh sách việc làm
        </h1>
      </div>

      {/* Right Side - Actions */}
      <div className="flex items-center gap-3">
        {/* How to use link */}
        <a
          href="#"
          className="flex items-center gap-1.5 text-gray-800 hover:text-red-600 underline text-sm font-bold transition-colors"
        >
          <span>Cách sử dụng JobShare</span>
          <FiExternalLink className="w-3 h-3" />
        </a>

        {/* Scroll to top button */}
        <button className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-colors shadow-md">
          <HiArrowUp className="w-5 h-5" />
        </button>

        {/* Rating button */}
        <button className="px-4 py-2 rounded-full bg-yellow-400 text-gray-900 flex items-center gap-1.5 hover:bg-yellow-500 transition-colors font-bold text-sm shadow-md">
          <span>4.8</span>
          <HiStar className="w-4 h-4 fill-current" />
        </button>

        {/* Notification button */}
        <button className="relative w-10 h-10 rounded-lg bg-gray-100 text-gray-700 flex items-center justify-center hover:bg-gray-200 transition-colors">
          <FiBell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-600 rounded-full"></span>
        </button>

        {/* Profile button */}
        <button className="w-10 h-10 rounded-lg bg-gray-100 text-gray-700 flex items-center justify-center hover:bg-gray-200 transition-colors">
          <FiUser className="w-5 h-5" />
        </button>
      </div>
    </header>
  )
}

export default Header

