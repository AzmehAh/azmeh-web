import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  useEffect(() => {
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
  }, [currentLang]);

  const toggleLanguage = () => {
    const newLang = currentLang === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
  };
 
  return (
   
   {/* Language Switcher Inline */}
<button
  onClick={() => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  }}
  className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-300 ${
    isScrolled 
      ? 'text-gray-900 border-gray-300 hover:border-[#2C5DB6]' 
      : 'text-white border-white/30 hover:border-[#2C5DB6]'
  }`}
  aria-label="Switch language"
>
  <Globe className={`w-5 h-5 ${isScrolled ? 'text-gray-900' : 'text-white'}`} />
  <span className="text-sm font-medium">
    {i18n.language === 'en' ? 'العربية' : 'English'}
  </span>
</button>
  );
};

export default LanguageSwitcher;
