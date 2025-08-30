import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import SystemDetailsModal from './SystemDetailsModal';
import { systemsData, SystemData } from '../data/systemsData';

const Header = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedSystem, setSelectedSystem] = useState<SystemData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg backdrop-blur-sm' : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Left Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="#about" className="text-base font-medium transition-colors duration-200 hover:text-[#2C5DB6] text-gray-900">
              About Us
            </a>

            {/* System Dropdown */}
            <div className="relative" onMouseEnter={() => handleMouseEnter('system')} onMouseLeave={handleMouseLeave}>
              <button className="flex items-center text-base font-medium transition-colors duration-200 hover:text-[#2C5DB6] text-gray-900">
                System <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              <AnimatePresence>
                {activeDropdown === 'system' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 py-4 animate-dropdown"
                  >
                    <div className="px-4 pb-2">
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                        Paint Systems
                      </h3>
                    </div>
                    {Object.values(systemsData).map((system) => (
                      <button
                        key={system.id}
                        onClick={() => handleSystemClick(system.id)}
                        className="menu-item w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors duration-200 block"
                      >
                        <div className="font-medium text-gray-900">{system.title}</div>
                        <div className="text-sm text-gray-500 mt-1">{system.description}</div>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/products" className="text-base font-medium hover:text-[#2C5DB6] text-gray-900 transition-colors duration-200">
              Products
            </Link>
          </nav>

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img
                src="/images/Azmeh-Paints-Logo.png"
                alt="AL AZMEH PAINTS"
                className="h-10 w-auto filter brightness-100"
              />
            </Link>
          </div>

          {/* Right Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="#faq" className="text-base font-medium transition-colors duration-200 hover:text-[#2C5DB6] text-gray-900">
              FAQ
            </a>
            <a href="#blog" className="text-base font-medium transition-colors duration-200 hover:text-[#2C5DB6] text-gray-900">
              Blog
            </a>
            <a href="#contact" className="text-base font-medium transition-colors duration-200 hover:text-[#2C5DB6] text-gray-900">
              Contact
            </a>
            <a href="#distributors" className="text-base font-medium transition-colors duration-200 hover:text-[#2C5DB6] text-gray-900">
              Distributors
            </a>
          </nav>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-900 hover:text-[#2C5DB6] hover:bg-gray-100 transition-colors duration-200"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden bg-white border-t border-gray-100"
            >
              <div className="py-4 space-y-1">
                <Link
                  to="/"
                  className="block px-4 py-3 text-base font-medium text-gray-900 hover:text-[#2C5DB6] hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <a
                  href="#about"
                  className="block px-4 py-3 text-base font-medium text-gray-900 hover:text-[#2C5DB6] hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About Us
                </a>
                
                {/* Mobile System Menu */}
                <div className="px-4 py-2">
                  <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    System
                  </div>
                  <div className="pl-4 space-y-1">
                    {Object.values(systemsData).map((system) => (
                      <button
                        key={system.id}
                        onClick={() => {
                          handleSystemClick(system.id);
                          setIsMobileMenuOpen(false);
                        }}
                        className="block w-full text-left py-2 text-sm text-gray-700 hover:text-[#2C5DB6] transition-colors duration-200"
                      >
                        {system.title}
                      </button>
                    ))}
                  </div>
                </div>

                <Link
                  to="/products"
                  className="block px-4 py-3 text-base font-medium text-gray-900 hover:text-[#2C5DB6] hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Products
                </Link>
                <a
                  href="#faq"
                  className="block px-4 py-3 text-base font-medium text-gray-900 hover:text-[#2C5DB6] hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  FAQ
                </a>
                <a
                  href="#blog"
                  className="block px-4 py-3 text-base font-medium text-gray-900 hover:text-[#2C5DB6] hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Blog
                </a>
                <a
                  href="#contact"
                  className="block px-4 py-3 text-base font-medium text-gray-900 hover:text-[#2C5DB6] hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </a>
                <a
                  href="#distributors"
                  className="block px-4 py-3 text-base font-medium text-gray-900 hover:text-[#2C5DB6] hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Distributors
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* System Details Modal */}
      <SystemDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        systemData={selectedSystem}
      />
    </header>
  );
};

export default Header;