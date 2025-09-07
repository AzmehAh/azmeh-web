import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import SystemDetailsModal from './SystemDetailsModal';
import { systemsData, SystemData } from '../data/systemsData';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null);
  const [selectedSystem, setSelectedSystem] = useState<SystemData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const location = useLocation();
  let timeoutId: NodeJS.Timeout;

  const handleMouseEnter = (menu: string) => {
    clearTimeout(timeoutId);
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => setActiveDropdown(null), 300);
  };

  const handleSystemClick = (systemId: string) => {
    const system = systemsData[systemId];
    if (system) {
      setSelectedSystem(system);
      setIsModalOpen(true);
      setActiveDropdown(null);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname === '/') {
        setIsScrolled(window.scrollY > 50);
      }
    };
    if (location.pathname !== '/') setIsScrolled(true);
    else handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

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
            <Link to="/about" className={`text-base font-medium transition-colors duration-200 ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
              About Us
            </Link>
            <Link to="/products" className={`text-base font-medium transition-colors duration-200 ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
              Products
            </Link>

            {/* Technical Support Dropdown */}
            <div className="relative" onMouseEnter={() => handleMouseEnter('technical')} onMouseLeave={handleMouseLeave}>
              <button className={`flex items-center text-base font-medium transition-colors duration-200 ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
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
                    className="absolute top-full mt-2 left-0 w-max bg-white rounded-lg shadow-xl border border-gray-200 origin-top overflow-hidden"
                  >
                    {/* Dropdown content here */}
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
            <Link to="/systems" className={`text-base font-medium transition-colors duration-200 ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
              Systems
            </Link>
            <Link to="/blog" className={`text-base font-medium transition-colors duration-200 ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
              Blog
            </Link>

            {/* Contact Dropdown */}
            <div className="relative" onMouseEnter={() => handleMouseEnter('contact')} onMouseLeave={handleMouseLeave}>
              <button className={`flex items-center text-base font-medium ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
                Contact & Distributors <ChevronDown className="ml-1 h-4 w-4" />
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
                      <Link to="/contact" className="block text-gray-600 hover:text-[#2C5DB6] px-3 py-2 rounded-md transition-colors duration-200 mb-1">
                        Contact Us
                      </Link>
                      <Link to="/distributors" className="block text-gray-600 hover:text-[#2C5DB6] px-3 py-2 rounded-md transition-colors duration-200">
                        Find Distributors
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

      {/* System Details Modal */}
      <SystemDetailsModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        systemData={selectedSystem}
      />

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-gray-200 overflow-hidden"
          >
            {/* Mobile menu content here */}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
