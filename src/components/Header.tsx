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
<Link to="/products" className={`text-base font-medium transition-colors duration-200 hover:text-[#2C5DB6] ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
              Products
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
                } hover:text-[#2C5DB6]`}
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
                      <Link to="/faq/industrial" className="menu-item block text-gray-600 hover:text-[#2C5DB6] px-3 py-2 rounded-md transition-colors duration-200 mb-1">
                        Industrial and Protective Coating
                      </Link>
                      <Link to="/faq/architectural" className="menu-item block text-gray-600 hover:text-[#2C5DB6] px-3 py-2 rounded-md transition-colors duration-200 mb-1">
                        Architectural Coating
                      </Link>
                      <Link to="/faq" className="menu-item block text-[#2C5DB6] px-3 py-2 rounded-md transition-colors duration-200 mb-1"> 
                        View All FAQ Categories →
                      </Link>
                    </div>
                    
                    {/* Troubleshooting */}
                    <div className="min-w-[25rem] p-4 border-l border-gray-200">
                      <h4 className="font-semibold text-gray-900 mb-2">Troubleshooting</h4>
                      <Link to="/troubleshooting/car-coating" className="menu-item block text-gray-600 hover:text-[#2C5DB6] px-3 py-2 rounded-md transition-colors duration-200 mb-1">
                        Car Coating Problem Guide <span className="text-xs text-gray-500">(28 issues)</span>
                      </Link>
                      <Link to="/troubleshooting/coating-defects" className="menu-item block text-gray-600 hover:text-[#2C5DB6] px-3 py-2 rounded-md transition-colors duration-200 mb-1">
                        Coating Application Defects <span className="text-xs text-gray-500">(13 issues)</span>
                      </Link>
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
  <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
    <img 
      src={isScrolled ? "/images/Azmeh-Paints-Logo.png" : "/images/Azmeh-Paints-Logo-White.png"} 
      alt="AL AZMEH PAINTS" 
      className="h-10 w-auto" 
    />
  </Link>
</div>


          {/* Right Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            

            

            <Link to="/systems" className={`text-base font-medium transition-colors duration-200 hover:text-[#2C5DB6] ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
              Systems
            </Link>

            <Link to="/blog" className={`text-base font-medium hover:text-[#2C5DB6] ${isScrolled ? 'text-gray-900' : 'text-gray-900'}`}>
              Blog
            </Link>

            {/* Contact Dropdown */}
            <div className="relative" onMouseEnter={() => handleMouseEnter('contact')} onMouseLeave={handleMouseLeave}>
              <button className={`flex items-center text-base font-medium hover:text-[#2C5DB6] ${isScrolled ? 'text-gray-900' : 'text-gray-900'}`}>
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
                      <Link to="/contact" className="menu-item block text-gray-600 hover:text-[#2C5DB6] px-3 py-2 rounded-md transition-colors duration-200 mb-1">
                        Contact Us
                      </Link>
                      <Link to="/distributors" className="menu-item block text-gray-600 hover:text-[#2C5DB6] px-3 py-2 rounded-md transition-colors duration-200">
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
            <div className="px-4 py-6 space-y-4 max-h-96 overflow-y-auto">
              <Link 
                to="/" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-gray-900 hover:text-orange-600 font-medium py-2"
              >
                Home
              </Link>
              <Link 
                to="/about" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-gray-900 hover:text-orange-600 font-medium py-2"
              >
                About Us
              </Link>

              {/* Technical Support Dropdown */}
              <div>
                <button
                  onClick={() => setActiveMobileDropdown(activeMobileDropdown === 'technical' ? null : 'technical')}
                  className="flex items-center justify-between w-full text-gray-900 hover:text-orange-600 font-medium py-2"
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
                      className="overflow-hidden pl-4 mt-2 space-y-1"
                    >
                      <h5 className="text-sm font-semibold text-gray-700 mb-2">FAQ</h5>
                      <Link 
                        to="/faq/industrial" 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block text-gray-600 hover:text-[#2C5DB6] px-2 py-1 rounded-md transition-colors duration-200 text-sm"
                      >
                        Industrial and Protective Coating
                      </Link>
                      <Link 
                        to="/faq/architectural" 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block text-gray-600 hover:text-[#2C5DB6] px-2 py-1 rounded-md transition-colors duration-200 text-sm"
                      >
                        Architectural Coating
                      </Link>
                      
                      <h5 className="text-sm font-semibold text-gray-700 mb-2 mt-3">Troubleshooting</h5>
                      <Link 
                        to="/troubleshooting/car-coating" 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block text-gray-600 hover:text-orange-600 px-2 py-1 rounded-md transition-colors duration-200 text-sm"
                      >
                        Car Coating Problems <span className="text-xs text-gray-500">(28)</span>
                      </Link>
                      <Link 
                        to="/troubleshooting/coating-defects" 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block text-gray-600 hover:text-orange-600 px-2 py-1 rounded-md transition-colors duration-200 text-sm"
                      >
                        Application Defects <span className="text-xs text-gray-500">(13)</span>
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* System Dropdown */}
              <div>
                <button
                  onClick={() => setActiveMobileDropdown(activeMobileDropdown === 'system' ? null : 'system')}
                  className="flex items-center justify-between w-full text-gray-900 hover:text-orange-600 font-medium py-2"
                >
                  <span>System</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${activeMobileDropdown === 'system' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {activeMobileDropdown === 'system' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden pl-4 mt-2 space-y-1"
                    >
                      <h5 className="text-sm font-semibold text-gray-700 mb-2">Paint Systems</h5>
                      {paintSystems.slice(0, 6).map(system => (
                        <button 
                          key={system.id} 
                          onClick={() => {
                            handleSystemClick(system.id);
                            setIsMobileMenuOpen(false);
                          }}
                          className="block text-gray-600 hover:text-[#2C5DB6] px-2 py-1 rounded-md transition-colors duration-200 w-full text-left text-sm"
                        >
                          {system.name}
                        </button>
                      ))}
                      <h5 className="text-sm font-semibold text-gray-700 mb-2 mt-3">Technical Solutions</h5>
                      {technicalSolutions.slice(0, 4).map(solution => (
                        <button 
                          key={solution.id} 
                          onClick={() => {
                            handleSystemClick(solution.id);
                            setIsMobileMenuOpen(false);
                          }}
                          className="block text-gray-600 hover:text-[#2C5DB6] px-2 py-1 rounded-md transition-colors duration-200 w-full text-left text-sm"
                        >
                          {solution.name}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link 
                to="/products" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-gray-900 hover:text-orange-600 font-medium py-2"
              >
                Products
              </Link>

              <Link 
                to="/blog" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-gray-900 hover:text-orange-600 font-medium py-2"
              >
                Blog
              </Link>

              {/* Contact Dropdown */}
              <div>
                <button
                  onClick={() => setActiveMobileDropdown(activeMobileDropdown === 'contact' ? null : 'contact')}
                  className="flex items-center justify-between w-full text-gray-900 hover:text-orange-600 font-medium py-2"
                >
                  <span>Contact & Distributors</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${activeMobileDropdown === 'contact' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {activeMobileDropdown === 'contact' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden pl-4 mt-2 space-y-1"
                    >
                      <Link 
                        to="/contact" 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block text-gray-600 hover:text-orange-600 px-2 py-1 rounded-md transition-colors duration-200 text-sm"
                      >
                        Contact Us
                      </Link>
                      <Link 
                        to="/distributors" 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block text-gray-600 hover:text-orange-600 px-2 py-1 rounded-md transition-colors duration-200 text-sm"
                      >
                        Find Distributors
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