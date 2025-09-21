import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { supabase, FAQCategory, TroubleshootingCategory } from '../lib/supabase';

const Header = () => {
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

  useEffect(() => {
    if (location.pathname !== '/') {
      setIsScrolled(true);
    } else {
      setIsScrolled(window.scrollY > 50);
    }

    const handleScroll = () => {
      if (location.pathname === '/') {
        setIsScrolled(window.scrollY > 50);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

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
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Left Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/products" className={`text-base font-medium transition-colors duration-200 nav-link ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
              Products
            </Link>
            <Link to="/about" className={`text-base font-medium transition-colors duration-200 nav-link ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
              About Us
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
                Technical Support <ChevronDown className="ml-1 h-4 w-4" />
              </button> 
              <AnimatePresence>
                {activeDropdown === 'technical' && (
                  <motion.div
                    variants={curtainVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="absolute top-full mt-2 left-0 w-max bg-white rounded-lg shadow-xl border border-gray-200 origin-top overflow-hidden flex"
                  >
                    {/* FAQ */}
                    <div className="min-w-[25rem] p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">FAQ</h4>
                      {faqCategories.map(category => (
                        <Link 
                          key={category.id} 
                          to={`/faq/${category.slug}`} 
                          className="menu-item block text-gray-600 hover:text-[#2C5DB6] px-3 py-2 rounded-md transition-colors duration-200 mb-1"
                        >
                          {category.name}
                        </Link>
                      ))}
                      <Link to="/faq" className="menu-item block text-[#2C5DB6] px-3 py-2 rounded-md transition-colors duration-200 mb-1"> 
                        View All FAQ Categories →
                      </Link>
                    </div>
                    
                    {/* Troubleshooting */}
                    <div className="min-w-[25rem] p-4 border-l border-gray-200">
                      <h4 className="font-semibold text-gray-900 mb-2">Troubleshooting</h4>
                      {troubleshootingCategories.map(category => (
                        <Link 
                          key={category.id} 
                          to={`/troubleshooting/${category.slug}`} 
                          className="menu-item block text-gray-600 hover:text-[#2C5DB6] px-3 py-2 rounded-md transition-colors duration-200 mb-1"
                        >
                          {category.name} {category.issue_count && <span className="text-xs text-gray-500">({category.issue_count} issues)</span>}
                        </Link>
                      ))}
                      <Link to="/troubleshooting" className="menu-item block text-[#2C5DB6] px-3 py-2 rounded-md transition-colors duration-200 mb-1"> 
                        View All Troubleshooting →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center transition-opacity">
              <img 
                src="/images/Azmeh-Paints-Logo.png" 
                alt="AL AZMEH PAINTS" 
                className={`h-10 w-auto transition-all duration-300 ${
                  isScrolled ? "filter-none" : "brightness-0 invert"
                }`}
              />
            </Link>
          </div>

          {/* Right Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/blog" className={`text-base font-medium transition-colors duration-200 nav-link ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
              Blog
            </Link>

            {/* Contact Dropdown */}
            <div className="relative" onMouseEnter={() => handleMouseEnter('contact')} onMouseLeave={handleMouseLeave}>
              <button className={`flex items-center text-base font-medium nav-link ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
                Contact <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <AnimatePresence>
                {activeDropdown === 'contact' && (
                  <motion.div
                    variants={curtainVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 origin-top overflow-hidden"
                  >
                    <div className="p-4">
                      <Link to="/contact" className="menu-item block text-gray-600 hover:text-[#2C5DB6] px-3 py-2 rounded-md transition-colors duration-200 mb-1">
                        Contact Us
                      </Link>
                      <Link to="/job-application" className="menu-item block text-gray-600 hover:text-[#2C5DB6] px-3 py-2 rounded-md transition-colors duration-200">
                        Apply for Job
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-900 hover:text-[#2C5DB6] transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-gray-200 overflow-hidden shadow-lg"
          >
            <div className="px-6 py-6 space-y-1 max-h-[80vh] overflow-y-auto">
              <Link 
                to="/" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-gray-900 hover:text-[#2C5DB6] hover:bg-blue-50 font-medium py-3 px-4 rounded-lg transition-all duration-200"
              >
                Home
              </Link>
              <Link 
                to="/about" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-gray-900 hover:text-[#2C5DB6] hover:bg-blue-50 font-medium py-3 px-4 rounded-lg transition-all duration-200"
              >
                About Us
              </Link>
              <Link 
                to="/blog" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-gray-900 hover:text-[#2C5DB6] hover:bg-blue-50 font-medium py-3 px-4 rounded-lg transition-all duration-200"
              >
                Blog
              </Link>
              <Link 
                to="/products" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-gray-900 hover:text-[#2C5DB6] hover:bg-blue-50 font-medium py-3 px-4 rounded-lg transition-all duration-200"
              >
                Products
              </Link>
              
              {/* Technical Support Dropdown */}
              <div className="border-t border-gray-100 pt-4 mt-4">
                <button
                  onClick={() => setActiveMobileDropdown(activeMobileDropdown === 'technical' ? null : 'technical')}
                  className="flex items-center justify-between w-full text-gray-900 hover:text-[#2C5DB6] hover:bg-blue-50 font-medium py-3 px-4 rounded-lg transition-all duration-200"
                >
                  <span>Technical Support</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${activeMobileDropdown === 'technical' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {activeMobileDropdown === 'technical' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden bg-gray-50 rounded-lg mt-2 p-4"
                    >
                      <div className="space-y-3">
                        <div>
                          <h5 className="text-sm font-semibold text-gray-700 mb-2">FAQ</h5>
                          {faqCategories.map(category => (
                            <Link 
                              key={category.id}
                              to={`/faq/${category.slug}`} 
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="block text-gray-600 hover:text-[#2C5DB6] py-2 px-3 rounded-md transition-colors duration-200 text-sm hover:bg-white"
                            >
                              {category.name}
                            </Link>
                          ))}
                        </div>

                        <div>
                          <h5 className="text-sm font-semibold text-gray-700 mb-2">Troubleshooting</h5>
                          {troubleshootingCategories.map(category => (
                            <Link 
                              key={category.id}
                              to={`/troubleshooting/${category.slug}`} 
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="block text-gray-600 hover:text-[#2C5DB6] py-2 px-3 rounded-md transition-colors duration-200 text-sm hover:bg-white"
                            >
                              {category.name} {category.issue_count && <span className="text-xs text-gray-400">({category.issue_count})</span>}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Contact Dropdown */}
              <div className="border-t border-gray-100 pt-4 mt-4">
                <button
                  onClick={() => setActiveMobileDropdown(activeMobileDropdown === 'contact' ? null : 'contact')}
                  className="flex items-center justify-between w-full text-gray-900 hover:text-[#2C5DB6] hover:bg-blue-50 font-medium py-3 px-4 rounded-lg transition-all duration-200"
                >
                  <span>Contact & Job Application</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${activeMobileDropdown === 'contact' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {activeMobileDropdown === 'contact' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden bg-gray-50 rounded-lg mt-2 p-4 space-y-2"
                    >
                      <Link 
                        to="/contact" 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block text-gray-600 hover:text-[#2C5DB6] py-2 px-3 rounded-md transition-colors duration-200 text-sm hover:bg-white"
                      >
                        Contact Us
                      </Link>
                      <Link 
                        to="/job-application" 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block text-gray-600 hover:text-[#2C5DB6] py-2 px-3 rounded-md transition-colors duration-200 text-sm hover:bg-white"
                      >
                        Apply for Job
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header> 
  );
};

export default Header;