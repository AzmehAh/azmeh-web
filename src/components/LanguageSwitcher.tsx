// LanguageSwitcher.jsx

import React from "react";
import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = ({ isScrolled = false }) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const toggleLanguage = () => {
    const newLang = currentLang === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
  };

  // تحديد لون النص حسب حالة التمرير
  const textColor = isScrolled ? 'text-gray-900' : 'text-white';
  const hoverBg = isScrolled ? 'hover:bg-blue-50' : 'hover:bg-white/10';
  const borderColor = isScrolled ? 'border-gray-300 hover:border-[#2C5DB6]' : 'border-white/30 hover:border-[#2C5DB6]';

  return (
    <button
      onClick={toggleLanguage}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-200 ${textColor} ${hoverBg} ${borderColor} group`}
      aria-label="Switch language"
    >
      <Globe className={`w-5 h-5 ${textColor}`} />
      <span className="text-sm font-medium">
        {currentLang === 'en' ? 'العربية' : 'English'}
      </span>
    </button>
  );
};

export default LanguageSwitcher;