import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  vi: {
    brand: 'JobShare',
    loginTitle: 'Đăng nhập đại lý',
    email: 'Email',
    password: 'Mật khẩu',
    login: 'Đăng nhập',
    forgotPassword: 'Quên mật khẩu? Nhấn vào đây',
    newRegistration: 'Đăng ký mới? Nhấn vào đây',
    recruitmentLogin: 'Đăng nhập quản lý tuyển dụng JobShare? Nhấn vào đây',
    chatTitle: 'AI Chat',
    chatSubtitle: 'Đội ngũ cũng có thể hỗ trợ',
    chatHours: 'Giờ làm việc: Thứ 2-6, 9:00~18:00',
    chatIntro: 'Vui lòng cho biết nội dung liên hệ. Nếu không có trong danh sách, chọn “Khác” để nhập chi tiết.',
    chatTimestamp: 'AI Chat • AI Agent • Bây giờ',
    chatQuickReplies: [
      'Muốn biết cách sử dụng',
      'Cần dữ liệu CSV job',
      'Chưa nhận phản hồi từ nơi giới thiệu',
      'Hỏi về hóa đơn',
      'Báo cáo nhân sự đã vào làm',
      'Muốn biết job thu hút ứng viên',
      'Muốn public job',
      'Khác',
    ],
  },
  en: {
    brand: 'JobShare',
    loginTitle: 'Agent Login',
    email: 'Email',
    password: 'Password',
    login: 'Login',
    forgotPassword: 'Forgot password? Click here',
    newRegistration: 'New registration? Click here',
    recruitmentLogin: 'JobShare recruitment management login? Click here',
    chatTitle: 'AI Chat',
    chatSubtitle: 'Team support available',
    chatHours: 'Business hours: Weekdays 9:00~18:00',
    chatIntro: 'Let us know your inquiry. If not listed, choose “Other” to enter details.',
    chatTimestamp: 'AI Chat • AI Agent • Now',
    chatQuickReplies: [
      'I want to know how to use it',
      'I need job CSV data',
      'No reply from client yet',
      'Confirm invoice',
      'Report a hire',
      'Find jobs to attract candidates',
      'Publish a job',
      'Other',
    ],
  },
  ja: {
    brand: 'JobShare',
    loginTitle: 'エージェントログイン',
    email: 'メール',
    password: 'パスワード',
    login: 'ログイン',
    forgotPassword: 'パスワードを忘れた方はこちら',
    newRegistration: '新規登録の方はこちら',
    recruitmentLogin: 'JobShare採用管理のログインはこちら',
    chatTitle: 'AIチャット',
    chatSubtitle: 'チームによるサポートも可能です',
    chatHours: '営業時間: 平日9:00~18:00',
    chatIntro: 'お問い合わせ内容をお伺いいたします 🫶\nご希望の項目がない場合は「その他」を選択していただきますと、お問い合わせ内容詳細のご入力が可能でございます！',
    chatTimestamp: 'AIチャット • AI Agent • 今',
    chatQuickReplies: [
      '操作方法について知りたい',
      '求人のCSVデータが欲しい',
      '推薦先から返事が来ない',
      '請求について確認したい',
      '入社報告したい',
      '候補者集客に使える求人を知りたい',
      '求人を公開したい',
      'その他',
    ],
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Lấy ngôn ngữ từ localStorage hoặc mặc định là 'vi'
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'vi';
  });

  useEffect(() => {
    // Lưu ngôn ngữ vào localStorage khi thay đổi
    localStorage.setItem('language', language);
  }, [language]);

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  const t = (key) => {
    return translations[language]?.[key] || key;
  };

  const value = {
    language,
    changeLanguage,
    t,
    translations: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

