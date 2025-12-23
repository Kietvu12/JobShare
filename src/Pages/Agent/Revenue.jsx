import React, { useState } from 'react'
import { HiTrendingUp, HiTrendingDown, HiCash, HiCheckCircle, HiClock, HiCalendar } from 'react-icons/hi'
import { FiDollarSign, FiFileText, FiUsers } from 'react-icons/fi'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const Revenue = () => {
  const [timeRange, setTimeRange] = useState('month')

  // Revenue statistics
  const revenueStats = [
    { title: 'Tổng doanh thu', value: '¥12,450,000', change: '+15.2%', color: 'green', icon: HiCash },
    { title: 'Số đơn tiến cử', value: '24', change: '+8.3%', color: 'blue', icon: FiFileText },
    { title: 'Đơn đã thanh toán', value: '18', change: '+12.5%', color: 'purple', icon: HiCheckCircle },
    { title: 'Đơn chờ thanh toán', value: '6', change: '-5.0%', color: 'yellow', icon: HiClock },
  ]

  // Revenue chart data
  const revenueChartData = [
    { month: '2025-01', revenue: 850000, paid: 650000, pending: 200000 },
    { month: '2025-02', revenue: 920000, paid: 720000, pending: 200000 },
    { month: '2025-03', revenue: 1100000, paid: 900000, pending: 200000 },
    { month: '2025-04', revenue: 980000, paid: 800000, pending: 180000 },
    { month: '2025-05', revenue: 1250000, paid: 1050000, pending: 200000 },
    { month: '2025-06', revenue: 1350000, paid: 1150000, pending: 200000 },
    { month: '2025-07', revenue: 1420000, paid: 1220000, pending: 200000 },
    { month: '2025-08', revenue: 1180000, paid: 980000, pending: 200000 },
    { month: '2025-09', revenue: 1320000, paid: 1120000, pending: 200000 },
    { month: '2025-10', revenue: 1450000, paid: 1250000, pending: 200000 },
    { month: '2025-11', revenue: 1580000, paid: 1380000, pending: 200000 },
    { month: '2025-12', revenue: 1245000, paid: 1045000, pending: 200000 },
  ]

  // Referral revenue table data
  const referralRevenue = [
    {
      id: 'REF001',
      candidateName: 'PHAM NGO BINH',
      jobTitle: 'Construction Management',
      company: 'Recruitmentikken Total Sourcing Co., Ltd.',
      referralDate: '2025/12/15',
      status: 'Paid',
      fee: '800,000 yen',
      paymentDate: '2025/12/20',
      paymentStatus: 'Completed',
    },
    {
      id: 'REF002',
      candidateName: 'NGUYEN THI NGA',
      jobTitle: 'Security Staff (Beat Engineer)',
      company: 'Recruitmeritecom Co., Ltd.',
      referralDate: '2025/12/10',
      status: 'Paid',
      fee: '1,200,000 yen',
      paymentDate: '2025/12/18',
      paymentStatus: 'Completed',
    },
    {
      id: 'REF003',
      candidateName: 'TRAN VAN CUONG',
      jobTitle: 'Construction Management',
      company: 'Recruitmentikken Total Sourcing Co., Ltd.',
      referralDate: '2025/12/08',
      status: 'Pending',
      fee: '800,000 yen',
      paymentDate: '—',
      paymentStatus: 'Processing',
    },
    {
      id: 'REF004',
      candidateName: 'LE THI MAI',
      jobTitle: 'Security Staff (Beat Engineer)',
      company: 'Recruitmeritecom Co., Ltd.',
      referralDate: '2025/12/05',
      status: 'Pending',
      fee: '1,200,000 yen',
      paymentDate: '—',
      paymentStatus: 'Awaiting',
    },
    {
      id: 'REF005',
      candidateName: 'HOANG VAN DUC',
      jobTitle: 'Construction Management',
      company: 'Recruitmentikken Total Sourcing Co., Ltd.',
      referralDate: '2025/12/03',
      status: 'Paid',
      fee: '800,000 yen',
      paymentDate: '2025/12/15',
      paymentStatus: 'Completed',
    },
    ...Array.from({ length: 15 }, (_, i) => ({
      id: `REF${String(i + 6).padStart(3, '0')}`,
      candidateName: `CANDIDATE ${String.fromCharCode(65 + (i % 26))}`,
      jobTitle: ['Construction Management', 'Security Staff', 'IT Engineer', 'Sales Manager'][i % 4],
      company: `Company ${i + 1} Co., Ltd.`,
      referralDate: `2025/12/${String(Math.max(1, 20 - i)).padStart(2, '0')}`,
      status: i % 3 === 0 ? 'Paid' : 'Pending',
      fee: i % 2 === 0 ? '800,000 yen' : '1,200,000 yen',
      paymentDate: i % 3 === 0 ? `2025/12/${String(Math.max(1, 25 - i)).padStart(2, '0')}` : '—',
      paymentStatus: i % 3 === 0 ? 'Completed' : i % 3 === 1 ? 'Processing' : 'Awaiting',
    }))
  ]

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-400 text-white'
      case 'Processing':
        return 'bg-blue-400 text-white'
      case 'Awaiting':
        return 'bg-yellow-400 text-white'
      default:
        return 'bg-gray-400 text-white'
    }
  }

  const getStatusColor = (status) => {
    return status === 'Paid' ? 'bg-green-400 text-white' : 'bg-yellow-400 text-white'
  }

  return (
    <div className="space-y-4" style={{ fontFamily: "'Myriad Pro', sans-serif" }}>
        {/* Header with Time Range Selector */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <HiCash className="w-6 h-6 text-red-600" />
              Doanh thu cá nhân
            </h2>
            <div className="flex gap-2">
              {['Ngày', 'Tuần', 'Tháng', 'Năm'].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range.toLowerCase())}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
                    timeRange === range.toLowerCase()
                      ? 'bg-red-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Revenue Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {revenueStats.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <div key={idx} className="bg-white rounded-2xl p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`w-5 h-5 ${
                    stat.color === 'green' ? 'text-green-600' :
                    stat.color === 'blue' ? 'text-blue-600' :
                    stat.color === 'purple' ? 'text-purple-600' : 'text-yellow-600'
                  }`} />
                  {stat.change.startsWith('+') ? (
                    <HiTrendingUp className="w-4 h-4 text-green-600" />
                  ) : (
                    <HiTrendingDown className="w-4 h-4 text-red-600" />
                  )}
                </div>
                <p className="text-xs text-gray-600 mb-1 font-medium">{stat.title}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-gray-900">{stat.value}</span>
                  <span className={`text-xs font-bold ${
                    stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Revenue Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Line Chart - Revenue Trend */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <HiTrendingUp className="w-5 h-5 text-red-600" />
              Xu hướng doanh thu
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#ef4444" name="Tổng doanh thu" strokeWidth={2} />
                  <Line type="monotone" dataKey="paid" stroke="#10b981" name="Đã thanh toán" strokeWidth={2} />
                  <Line type="monotone" dataKey="pending" stroke="#f59e0b" name="Chờ thanh toán" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bar Chart - Revenue by Month */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <HiCash className="w-5 h-5 text-red-600" />
              Doanh thu theo tháng
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="paid" fill="#10b981" name="Đã thanh toán" />
                  <Bar dataKey="pending" fill="#f59e0b" name="Chờ thanh toán" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Payment Progress */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <HiClock className="w-5 h-5 text-red-600" />
            Tiến độ thanh toán
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gray-900">Đã thanh toán</span>
                <HiCheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-2">18 đơn</div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-full bg-green-600 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <p className="text-xs text-gray-600 mt-2">¥10,450,000</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gray-900">Đang xử lý</span>
                <HiClock className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-2">3 đơn</div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: '12.5%' }}></div>
              </div>
              <p className="text-xs text-gray-600 mt-2">¥2,400,000</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-white rounded-xl p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gray-900">Chờ thanh toán</span>
                <HiClock className="w-4 h-4 text-yellow-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-2">3 đơn</div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-full bg-yellow-600 rounded-full" style={{ width: '12.5%' }}></div>
              </div>
              <p className="text-xs text-gray-600 mt-2">¥2,400,000</p>
            </div>
          </div>
        </div>

        {/* Referral Revenue Table */}
        <div className="bg-white rounded-2xl border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <FiFileText className="w-5 h-5 text-red-600" />
              Bảng doanh thu môi giới
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 sticky top-0 z-10 shadow-sm">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-900 border-b border-gray-200">Referral ID</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-900 border-b border-gray-200">Tên ứng viên</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-900 border-b border-gray-200">Tên công việc</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-900 border-b border-gray-200">Công ty</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-900 border-b border-gray-200">Ngày tiến cử</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-900 border-b border-gray-200">Trạng thái</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-900 border-b border-gray-200">Phí môi giới</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-900 border-b border-gray-200">Ngày thanh toán</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-900 border-b border-gray-200">Trạng thái thanh toán</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {referralRevenue.map((referral) => (
                  <tr key={referral.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-xs text-blue-600 font-medium">{referral.id}</td>
                    <td className="px-4 py-3 text-xs text-gray-900">{referral.candidateName}</td>
                    <td className="px-4 py-3 text-xs text-gray-700">{referral.jobTitle}</td>
                    <td className="px-4 py-3 text-xs text-gray-700">{referral.company}</td>
                    <td className="px-4 py-3 text-xs text-gray-700">{referral.referralDate}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${getStatusColor(referral.status)}`}>
                        {referral.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <FiDollarSign className="w-3 h-3 text-gray-500" />
                        <span className="text-xs text-gray-900 font-medium">{referral.fee}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-700">{referral.paymentDate}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${getPaymentStatusColor(referral.paymentStatus)}`}>
                        {referral.paymentStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
    </div>
  )
}

export default Revenue

