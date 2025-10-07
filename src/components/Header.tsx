import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { supabase, FAQCategory, TroubleshootingCategory,FAQItem,TroubleshootingItem } from '../lib/supabase';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Header = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null);
  const [faqCategories, setFaqCategories] = useState<FAQCategory[]>([]);
  const [troubleshootingCategories, setTroubleshootingCategories] = useState<TroubleshootingCategory[]>([]);

  const location = useLocation();
  let timeoutId: NodeJS.Timeout;

  const handleMouseEnter = (menu: string) => {
    clearTimeout(timeoutId);
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => setActiveDropdown(null), 300);
  };

  // 🔥 اكتشاف إذا كان الجهاز موبايل
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🔥 تحسين منطق isScrolled للموبايل
  useEffect(() => {
    const updateScrolledState = () => {
      // إذا كان موبايل والصفحة الرئيسية
      if (isMobile && location.pathname === '/') {
        // على الموبايل، نجعله يتغير عند السكرول مباشرة
        setIsScrolled(window.scrollY > 20);
      } else {
        // في غير ذلك: السلوك الأصلي
        if (location.pathname !== '/') {
          setIsScrolled(true);
        } else {
          setIsScrolled(window.scrollY > 50);
        }
      }
    };

    updateScrolledState();

    const handleScroll = () => {
      updateScrolledState();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location, isMobile]);

  // جلب بيانات الأسئلة الشائعة من Supabase
  useEffect(() => {
    const fetchFAQCategories = async () => {
      const { data, error } = await supabase
        .from('faq_categories')
        .select('*')
        .order('name');
      
      if (!error && data) {
        setFaqCategories(data);
      }
    };

    // جلب بيانات استكشاف الأخطاء من Supabase
    const fetchTroubleshootingCategories = async () => {
      const { data, error } = await supabase
        .from('troubleshooting_categories')
        .select('*')
        .order('name');
      
      if (!error && data) {
        setTroubleshootingCategories(data);
      }
    };

    fetchFAQCategories();
    fetchTroubleshootingCategories();
  }, []);

  const curtainVariants = {
    hidden: { scaleY: 0, opacity: 0 },
    visible: { scaleY: 1, opacity: 1 },
    exit: { scaleY: 0, opacity: 0 }
  };
  
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg backdrop-blur-sm' : 'bg-transparent'
      } ${isMobile ? 'h-16' : 'h-20'}`} // 🔥 تعديل ارتفاع الهيدر للموبايل
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        {/* استخدام grid مع ارتفاع كامل */}
        <div className="grid grid-cols-3 items-center h-full">

          {/* Left Navigation - يصبح يمين في RTL */}
          <nav className="hidden lg:flex items-center gap-8 justify-self-start">
            <Link
              to="/products"
              className={`text-base font-medium transition-colors duration-200 nav-link ${isScrolled ? 'text-gray-900' : 'text-white'}`}
            >
              {t('header.products')}
            </Link>
            <Link
              to="/about"
              className={`text-base font-medium transition-colors duration-200 nav-link ${isScrolled ? 'text-gray-900' : 'text-white'}`}
            >
              {t('header.about')}
            </Link>

            {/* Technical Support Dropdown */}
            <div 
              className="relative" 
              onMouseEnter={() => handleMouseEnter('technical')} 
              onMouseLeave={handleMouseLeave}
            >
              <button 
                className={`flex items-center text-base font-medium transition-colors duration-200 ${
                  isScrolled ? 'text-gray-900' : 'text-white'
                } nav-link`}
              >
                {t('header.technicalSupport')} 
                <ChevronDown className={`${isRTL ? 'mr-1' : 'ml-1'} h-4 w-4`} />
              </button> 
              <AnimatePresence>
                {activeDropdown === 'technical' && (
                  <motion.div
                    key="technical-dropdown"
                    variants={curtainVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className={`absolute top-full mt-2 ${
                      isRTL ? 'right-0' : 'left-0'
                    } w-max bg-white rounded-lg shadow-xl border border-gray-200 origin-top overflow-hidden flex ${
                      isRTL ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    {/* Troubleshooting - أولًا في RTL */}
                    <div className={`min-w-[25rem] p-4 ${isRTL ? 'border-l' : 'border-r'} border-gray-200`}>
                      <h4 className="font-semibold text-gray-900 mb-2">{t('header.troubleshooting')}</h4>
                      {troubleshootingCategories.map(category => (
                        <Link
                          key={category.id}
                          to={`/troubleshooting/${category.id}`}
                          className="menu-item block text-gray-600 hover:text-logo px-3 py-2 rounded-md transition-colors duration-200 mb-1"
                        >
                          {isRTL && category.name_ar ? category.name_ar : category.name}
                        </Link>
                      ))}
                      <Link
                        to="/troubleshooting"
                        className="menu-item block text-logo px-3 py-2 rounded-md transition-colors duration-200"
                      >
                        {t('header.viewAllTroubleshooting')}
                      </Link>
                    </div>
                    
                    {/* FAQ - ثانيًا في RTL */}
                    <div className="min-w-[25rem] p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">{t('header.faq')}</h4>
                      {faqCategories.map(category => (
                        <Link
                          key={category.id}
                          to={`/faq/${category.id}`}
                          className="menu-item block text-gray-600 hover:text-logo px-3 py-2 rounded-md transition-colors duration-200 mb-1"
                        >
                          {isRTL && category.name_ar ? category.name_ar : category.name}
                        </Link>
                      ))}
                      <Link
                        to="/faq"
                        className="menu-item block text-logo px-3 py-2 rounded-md transition-colors duration-200"
                      >
                        {t('header.viewAllFaq')}
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Logo - دائمًا في المنتصف */}
          <div className="justify-self-center flex-shrink-0">
            <Link to="/" className="flex items-center transition-opacity">
              <img 
                src="/images/Azmeh-Paints-Logo.png" 
                alt="AL AZMEH PAINTS" 
                className={`transition-all duration-300 ${
                  isScrolled ? "filter-none h-8" : "brightness-0 invert h-8" // 🔥 تعديل حجم اللوجو للموبايل
                } ${isMobile ? 'h-7' : 'h-10'}`} // حجم مختلف للموبايل
              />
            </Link>
          </div>

          {/* Right Navigation - يصبح يسار في RTL */}
          <nav className="hidden lg:flex items-center gap-8 justify-self-end">
           
            <Link
              to="/blog"
              className={`text-base font-medium transition-colors duration-200 nav-link ${isScrolled ? 'text-gray-900' : 'text-white'}`}
            >
              {t('header.blog')}
            </Link>

            {/* Contact Dropdown */}
            <div 
              className="relative" 
              onMouseEnter={() => handleMouseEnter('contact')} 
              onMouseLeave={handleMouseLeave}
            >
              <button 
                className={`flex items-center text-base font-medium transition-colors duration-200 ${
                  isScrolled ? 'text-gray-900' : 'text-white'
                } nav-link`}
              >
                {t('header.contact')} 
                <ChevronDown className={`${isRTL ? 'mr-1' : 'ml-1'} h-4 w-4`} />
              </button>

              <AnimatePresence>
                {activeDropdown === 'contact' && (
                  <motion.div
                    key="contact-dropdown"
                    variants={curtainVariants} 
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className={`absolute top-full mt-2 ${
                      isRTL ? 'right-0' : 'left-0'
                    } w-64 bg-white rounded-lg shadow-xl border border-gray-200 origin-top overflow-hidden`}
                  >
                    <div className="p-4">
                      <Link
                        to="/contact"
                        className="menu-item block text-gray-600 hover:text-logo px-3 py-2 rounded-md mb-1 transition-colors duration-200"
                      >
                        {t('header.contactUs')}
                      </Link>
                      <Link
                        to="/job-application"
                        className="menu-item block text-gray-600 hover:text-logo px-3 py-2 rounded-md transition-colors duration-200"
                      >
                        {t('header.applyForJob')}
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
           <div className={`flex items-center ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
              <LanguageSwitcher />
            </div>
          </nav>

          {/* Mobile menu button - تم تعديله */}
          <div className="lg:hidden flex items-center justify-end w-full">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-md transition-colors ${
                isScrolled ? 'text-gray-900 hover:text-logo' : 'text-white hover:text-gray-200'
              }`}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu - تم تحسينه */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, maxHeight: 0 }}
            animate={{ 
              opacity: 1, 
              maxHeight: 'calc(100vh - 4rem)', // 🔥 استخدام viewport height ناقص ارتفاع الهيدر
              transition: { duration: 0.35, ease: "easeOut" }
            }}
            exit={{ 
              opacity: 0, 
              maxHeight: 0,
              transition: { duration: 0.25, ease: "easeIn" }
            }} 
            className="lg:hidden bg-white border-t border-gray-200 overflow-hidden shadow-lg absolute top-full left-0 right-0"
            style={{ top: isMobile ? '4rem' : '5rem' }} // 🔥 يبدأ من أسفل الهيدر مباشرة
          >
            <div className="px-4 py-4 space-y-1 max-h-[calc(100vh-5rem)] overflow-y-auto">
              {/* Home */}
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-gray-900 hover:text-logo hover:bg-blue-50 font-medium py-3 px-4 rounded-lg transition-all duration-200"
              >
                {t('header.home')}
              </Link>
              
              {/* About */}
              <Link
                to="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-gray-900 hover:text-logo hover:bg-blue-50 font-medium py-3 px-4 rounded-lg transition-all duration-200"
              >
                {t('header.about')}
              </Link>
              
              {/* Blog */}
              <Link
                to="/blog"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-gray-900 hover:text-logo hover:bg-blue-50 font-medium py-3 px-4 rounded-lg transition-all duration-200"
              >
                {t('header.blog')}
              </Link>
              
              {/* Products */}
              <Link
                to="/products"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-gray-900 hover:text-logo hover:bg-blue-50 font-medium py-3 px-4 rounded-lg transition-all duration-200"
              >
                {t('header.products')}
              </Link>

              {/* Technical Support Dropdown */}
              <div className="border-t border-gray-100 pt-3 mt-3">
                <button
                  onClick={() => setActiveMobileDropdown(activeMobileDropdown === 'technical' ? null : 'technical')}
                  className="flex items-center justify-between w-full text-gray-900 hover:text-logo hover:bg-blue-50 font-medium py-3 px-4 rounded-lg transition-all duration-200"
                >
                  <span>{t('header.technicalSupport')}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${activeMobileDropdown === 'technical' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {activeMobileDropdown === 'technical' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden bg-gray-50 rounded-lg mt-2"
                    >
                      <div className="p-3 space-y-3">
                        <div>
                          <h5 className="text-sm font-semibold text-gray-700 mb-2">{t('header.faq')}</h5>
                          {faqCategories.map(category => (
                            <Link
                              key={category.id}
                              to={`/faq/${category.id}`}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="block text-gray-600 hover:text-logo py-2 px-3 rounded-md transition-colors duration-200 text-sm hover:bg-white"
                            >
                              {isRTL && category.name_ar ? category.name_ar : category.name}
                            </Link>
                          ))}
                        </div>
                        <div>
                          <h5 className="text-sm font-semibold text-gray-700 mb-2">{t('header.troubleshooting')}</h5>
                          {troubleshootingCategories.map(category => (
                            <Link
                              key={category.id}
                              to={`/troubleshooting/${category.id}`}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="block text-gray-600 hover:text-logo py-2 px-3 rounded-md transition-colors duration-200 text-sm hover:bg-white"
                            >
                              {isRTL && category.name_ar ? category.name_ar : category.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Contact Dropdown */}
              <div className="border-t border-gray-100 pt-3 mt-3">
                <button
                  onClick={() => setActiveMobileDropdown(activeMobileDropdown === 'contact' ? null : 'contact')}
                  className="flex items-center justify-between w-full text-gray-900 hover:text-logo hover:bg-blue-50 font-medium py-3 px-4 rounded-lg transition-all duration-200"
                >
                  <span>{t('header.contactAndJob')}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${activeMobileDropdown === 'contact' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {activeMobileDropdown === 'contact' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden bg-gray-50 rounded-lg mt-2 p-3 space-y-2"
                    >
                      <Link
                        to="/contact"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block text-gray-600 hover:text-logo py-2 px-3 rounded-md transition-colors duration-200 text-sm hover:bg-white"
                      >
                        {t('header.contactUs')}
                      </Link>
                      <Link
                        to="/job-application"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block text-gray-600 hover:text-logo py-2 px-3 rounded-md transition-colors duration-200 text-sm hover:bg-white"
                      >
                        {t('header.applyForJob')}
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
 
              {/* Language Switcher */}
              <div className="border-t border-gray-100 pt-3 mt-3 flex justify-center">
                <LanguageSwitcher />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header> 
  );
}; 

export default Header;