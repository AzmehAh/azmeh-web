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
    // تحديث الهيدر عند التنقل بين الصفحات
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

  const paintSystems = [
    { id: 'concrete-exterior', name: 'Concrete Exterior' },
    { id: 'concrete-lining', name: 'Concrete Lining' },
    { id: 'concrete-repair', name: 'Concrete Repair & Protection' },
    { id: 'concrete-sealer', name: 'Concrete Sealer' },
    { id: 'ferrous-steel', name: 'Ferrous & Steel Substrate Treatment' },
    { id: 'fire-retardant', name: 'Fire Retardant Paints' },
    { id: 'wall-ceiling', name: 'Home & Industrial Wall/Ceiling Paints' },
    { id: 'steel-coatings', name: 'Steel Coatings' },
    { id: 'steel-linings', name: 'Steel Linings' },
    { id: 'floorings', name: 'Floorings' },
    { id: 'adhesives', name: 'Adhesives and Grouts' },
    { id: 'joint-sealants', name: 'Joint Sealants' }
  ];

  const technicalSolutions = [
    { id: 'car-coating', name: 'Car Coating Systems' },
    { id: 'concrete-walls', name: 'Concrete Walls Coating' },
    { id: 'facade-protection', name: 'Façade Protection' },
    { id: 'industrial-flooring', name: 'Industrial Flooring' },
    { id: 'joint-sealant', name: 'Joint Sealant' },
    { id: 'steel-surface', name: 'Steel Surface Coatings' },
    { id: 'roof-coatings', name: 'Roof Coatings' },
    { id: 'wooden-surface', name: 'Wooden Surface Coatings' }
  ];

  const faqItems = [
    'Industrial and Protective Coating',
    'Architectural Coating'
  ];

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
            <Link to="/about" className={`text-base font-medium transition-colors duration-200 hover:text-[#2C5DB6] ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
              About Us
            </Link>

            {/* System Dropdown */}
            <div className="relative" onMouseEnter={() => handleMouseEnter('system')} onMouseLeave={handleMouseLeave}>
              <button className={`flex items-center text-base font-medium transition-colors duration-200 hover:text-[#2C5DB6] ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
                System <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <AnimatePresence>
                {activeDropdown === 'system' && (
                  <motion.div
                    variants={curtainVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 flex w-max origin-top overflow-hidden"
                  >
                    <div className="min-w-[23rem] p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Paint Systems</h3>
                      <div className="grid grid-cols-1 gap-2">
                        {paintSystems.map((system, index) => (
                          <button 
                            key={index} 
                            onClick={() => handleSystemClick(system.id)}
                            className="menu-item text-gray-600 hover:text-[#2C5DB6] px-3 py-2 rounded-md transition-colors duration-200 text-left w-full"
                          >
                            {system.name}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="min-w-[23rem] p-4 border-l border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Technical Solutions</h3>
                      <div className="grid grid-cols-1 gap-2">
                        {technicalSolutions.map((solution, index) => (
                          <button 
                            key={index} 
                            onClick={() => handleSystemClick(solution.id)}
                            className="menu-item text-gray-600 hover:text-[#2C5DB6] px-3 py-2 rounded-md transition-colors duration-200 text-left w-full"
                          >
                            {solution.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/products" className={`text-base font-medium hover:text-[#2C5DB6] ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
              Products
            </Link>
          </nav>

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img
                src="/images/Azmeh-Paints-Logo.png"
                alt="AL AZMEH PAINTS"
                className={`h-10 w-auto transition-all duration-200 ${isScrolled ? 'filter brightness-100' : 'filter brightness-0 invert'}`}
              />
            </Link>
          </div>

          {/* Right Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {/* FAQ Dropdown */}
            <div className="relative" onMouseEnter={() => handleMouseEnter('faq')} onMouseLeave={handleMouseLeave}>
              <button className={`flex items-center text-base font-medium hover:text-[#2C5DB6] ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
                FAQ <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <AnimatePresence>
                {activeDropdown === 'faq' && (
                  <motion.div
                    variants={curtainVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 origin-top overflow-hidden"
                  >
                    <div className="p-4">
                      <Link 
                        to="/faq/industrial" 
                        className="menu-item block text-gray-600 hover:text-[#2C5DB6] px-3 py-2 rounded-md transition-colors duration-200 mb-1"
                      >
                        Industrial and Protective Coating
                      </Link>
                      <Link 
                        to="/faq/architectural" 
                        className="menu-item block text-gray-600 hover:text-[#2C5DB6] px-3 py-2 rounded-md transition-colors duration-200 mb-1"
                      >
                        Architectural Coating
                      </Link>
                      <Link to="/faq" className="block text-[#2C5DB6] font-medium px-3 py-2 mt-2 border-t border-gray-200">
                        View All Categories →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/blog" className={`text-base font-medium hover:text-[#2C5DB6] ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
              Blog
            </Link>

            {/* Contact Dropdown */}
            <div className="relative" onMouseEnter={() => handleMouseEnter('contact')} onMouseLeave={handleMouseLeave}>
              <button className={`flex items-center text-base font-medium hover:text-[#2C5DB6] ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
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
              className={`p-2 rounded-md ${isScrolled ? 'text-gray-900' : 'text-white'}`}
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
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-6 space-y-4">
            <Link to="/about" className="block text-gray-900 hover:text-[#2C5DB6] font-medium">About Us</Link>
            <Link to="/products" className="block text-gray-900 hover:text-[#2C5DB6] font-medium">Products</Link>
            <div className="space-y-2">
              <p className="text-gray-700 font-semibold">FAQ</p>
              <Link to="/faq/industrial" className="block text-gray-600 hover:text-[#2C5DB6] pl-4">Industrial and Protective Coating</Link>
              <Link to="/faq/architectural" className="block text-gray-600 hover:text-[#2C5DB6] pl-4">Architectural Coating</Link>
              <Link to="/faq" className="block text-[#2C5DB6] font-medium pl-4">All Categories</Link>
            </div>
            <Link to="/blog" className="block text-gray-900 hover:text-[#2C5DB6] font-medium">Blog</Link>
            <Link to="/contact" className="block text-gray-900 hover:text-[#2C5DB6] font-medium">Contact</Link>
            <Link to="/distributors" className="block text-gray-900 hover:text-[#2C5DB6] font-medium">Distributors</Link>

            {/* System Dropdown */}
            <div className="mt-4">
              <h3 className="text-gray-700 font-semibold mb-2">Paint Systems</h3>
              {paintSystems.map(system => (
                <button 
                  key={system.id} 
                  onClick={() => handleSystemClick(system.id)}
                  className="block text-gray-600 hover:text-[#2C5DB6] px-3 py-2 rounded-md transition-colors duration-200 w-full text-left"
                >
                  {system.name}
                </button>
              ))}
              <h3 className="text-gray-700 font-semibold mt-4 mb-2">Technical Solutions</h3>
              {technicalSolutions.map(solution => (
                <button 
                  key={solution.id} 
                  onClick={() => handleSystemClick(solution.id)}
                  className="block text-gray-600 hover:text-[#2C5DB6] px-3 py-2 rounded-md transition-colors duration-200 w-full text-left"
                >
                  {solution.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
