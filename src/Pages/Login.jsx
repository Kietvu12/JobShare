import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiMail, HiLockClosed, HiEye, HiEyeOff } from 'react-icons/hi';
import { FaComments } from 'react-icons/fa';
import { MdLanguage } from 'react-icons/md';
import { AiOutlineClose } from 'react-icons/ai';
import { useLanguage } from '../Contexts/LanguageContext';
import logoImage from '../assets/image/logo-removebg-preview.png';

const Login = () => {
  const navigate = useNavigate();
  const { language, changeLanguage, t } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý đăng nhập ở đây
    console.log('Login:', { email, password });
    
    // Giả lập đăng nhập thành công - điều hướng đến trang admin
    // Trong thực tế, bạn sẽ gọi API và kiểm tra kết quả trước khi điều hướng
    navigate('/agent/home');
  };

  const languages = [
    { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <div 
      className="min-h-screen bg-white flex items-center justify-center relative py-8"
      style={{ fontFamily: "'Myriad Pro', sans-serif" }}
    >
      {/* Language Switcher - Top Left */}
      <div className="fixed top-6 left-6 z-50">
        <div className="relative">
          <button
            onClick={() => setShowLanguageMenu(!showLanguageMenu)}
            className="bg-white border-2 border-red-600 rounded-lg px-4 py-2 flex items-center gap-2 shadow-md hover:bg-red-600 transition-colors group"
            style={{ fontFamily: "'Myriad Pro', sans-serif" }}
          >
            <MdLanguage className="text-gray-800 group-hover:text-white text-xl transition-colors" />
            <span className="text-sm font-medium text-gray-800 group-hover:text-white transition-colors">
              {currentLanguage?.flag} {currentLanguage?.name}
            </span>
          </button>
          
          {showLanguageMenu && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setShowLanguageMenu(false)}
              />
              <div 
                className="absolute top-full left-0 mt-2 bg-white border-2 border-red-600 rounded-lg shadow-lg z-50 min-w-[180px]"
                style={{ fontFamily: "'Myriad Pro', sans-serif" }}
              >
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      changeLanguage(lang.code);
                      setShowLanguageMenu(false);
                    }}
                    className={`w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-red-600 hover:text-white transition-colors ${
                      language === lang.code ? 'bg-red-600 text-white' : 'text-gray-800'
                    }`}
                    style={{ fontFamily: "'Myriad Pro', sans-serif" }}
                  >
                    <span>{lang.flag}</span>
                    <span className="text-sm">{lang.name}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Main Login Container */}
      <div className="w-full max-w-5xl mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-black">
        <div className="flex flex-col lg:flex-row">
          {/* Left Panel - White Background with Logo */}
          <div 
            className="bg-white p-8 lg:p-12 flex flex-col justify-center items-center lg:items-start lg:w-2/5 relative"
            style={{ fontFamily: "'Myriad Pro', sans-serif" }}
          >
            
            {/* Logo Section */}
            <div className="mb-8 lg:mb-12 w-full">
              <div className="flex justify-center lg:justify-start mb-8">
                <img 
                  src={logoImage} 
                  alt="JobShare Logo" 
                  className="h-20 lg:h-24 w-auto object-contain"
                />
              </div>
              
              {/* Welcome Text */}
             
            </div>
            
            {/* Links */}
            <div className="space-y-3 w-full mt-auto">
              <a 
                href="#" 
                className="block text-black hover:text-red-700 text-sm transition-colors text-center lg:text-left underline"
                style={{ fontFamily: "'Myriad Pro', sans-serif" }}
              >
                {t('forgotPassword')}
              </a>
              <a 
                href="#" 
                className="block text-black hover:text-red-700 text-sm transition-colors text-center lg:text-left underline"
                style={{ fontFamily: "'Myriad Pro', sans-serif" }}
              >
                {t('newRegistration')}
              </a>
              <a 
                href="#" 
                className="block text-black hover:text-red-700 text-sm transition-colors text-center lg:text-left underline"
                style={{ fontFamily: "'Myriad Pro', sans-serif" }}
              >
                {t('recruitmentLogin')}
              </a>
            </div>
          </div>

          {/* Right Panel - White Background with Form */}
          <div 
            className="bg-white p-8 lg:p-12 flex-1 lg:w-3/5 "
            style={{ fontFamily: "'Myriad Pro', sans-serif" }}
          >
            <form onSubmit={handleSubmit} className="max-w-md mx-auto lg:mx-0">
              <div className="mb-8">
                <h2 
                  className="text-2xl font-semibold text-gray-900 mb-2"
                  style={{ fontFamily: "'Myriad Pro', sans-serif" }}
                >
                  {t('loginTitle')}
                </h2>
              </div>

              <div className="space-y-5">
                {/* Email Input */}
                <div className="relative">
                  <label 
                    className="block text-sm font-medium text-gray-900 mb-2"
                    style={{ fontFamily: "'Myriad Pro', sans-serif" }}
                  >
                    {t('email')}
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      <HiMail className="w-5 h-5" />
                    </div>
                    <input
                      type="email"
                      placeholder={t('email')}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-all text-gray-900 placeholder-gray-400"
                      style={{ fontFamily: "'Myriad Pro', sans-serif" }}
                      required
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="relative">
                  <label 
                    className="block text-sm font-medium text-gray-900 mb-2"
                    style={{ fontFamily: "'Myriad Pro', sans-serif" }}
                  >
                    {t('password')}
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      <HiLockClosed className="w-5 h-5" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder={t('password')}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-12 pr-12 py-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-all text-gray-900 placeholder-gray-400"
                      style={{ fontFamily: "'Myriad Pro', sans-serif" }}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-700 transition-colors"
                    >
                      {showPassword ? (
                        <HiEyeOff className="w-5 h-5" />
                      ) : (
                        <HiEye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  className="w-full bg-red-600 text-white py-3.5 rounded-lg hover:bg-red-700 transition-colors font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                  style={{ fontFamily: "'Myriad Pro', sans-serif" }}
                >
                  {t('login')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {showChat && (
          <div className="w-[340px] sm:w-[380px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="flex items-start gap-3 px-4 py-3 border-b border-gray-200">
              <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white font-bold text-lg">S</div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-gray-900">{t('chatTitle')}</div>
                <div className="text-xs text-gray-500">{t('chatSubtitle')}</div>
                <div className="text-[11px] text-gray-500 mt-1">{t('chatHours')}</div>
              </div>
              <button
                onClick={() => setShowChat(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close chat"
              >
                <AiOutlineClose className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="px-4 py-3 space-y-3 max-h-[420px] overflow-y-auto">
              <div className="bg-gray-100 text-gray-800 text-sm rounded-2xl px-4 py-3 leading-relaxed whitespace-pre-line">
                {t('chatIntro')}
              </div>
              <div className="text-xs text-gray-500">{t('chatTimestamp')}</div>

              {/* Quick Replies */}
              <div className="flex flex-wrap gap-2">
                {(t('chatQuickReplies') || []).map((label) => (
                  <button
                    key={label}
                    className="px-3 py-2 rounded-full bg-white border border-gray-200 text-gray-800 text-xs hover:border-red-500 hover:text-red-600 transition-colors shadow-sm"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Chat Icon - Bottom Right */}
        <div className="relative">
          <button
            onClick={() => setShowChat((prev) => !prev)}
            className="bg-red-600 w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-red-700 transition-colors"
          >
            <FaComments className="text-white text-xl" />
          </button>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
            1
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
