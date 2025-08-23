import React, { useState, useEffect } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
const handleMouseEnter = (menu: string) => {
  clearTimeout(timeoutId); 
  setActiveDropdown(menu);
};

const handleMouseLeave = () => {
  timeoutId = setTimeout(() => setActiveDropdown(null), 300); 
};

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const paintSystems = [
    'Concrete Exterior', 'Concrete Lining', 'Concrete Repair & Protection',
    'Concrete Sealer', 'Ferrous & Steel Substrate Treatment', 'Fire Retardant Paints',
    'Home & Industrial Wall/Ceiling Paints', 'Steel Coatings', 'Steel Linings',
    'Floorings', 'Adhesives and Grouts', 'Joint Sealants'
  ];

  const technicalSolutions = [
    'Car Coating Systems', 'Concrete Walls Coating', 'Façade Protection',
    'Industrial Flooring', 'Joint Sealant', 'Steel Surface Coatings',
    'Roof Coatings', 'Wooden Surface Coatings'
  ];

  const faqItems = [
    'What is the best paint for exterior walls?',
    'How long does industrial coating last?',
    'Do you provide technical support?',
    'What are your warranty terms?'
  ];
let timeoutId: NodeJS.Timeout;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Left Navigation - 3 عناصر */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="#about" className={`text-base font-medium transition-colors duration-200 hover:text-[#2C5DB6] ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
              About Us
            </a>

            {/* System Dropdown */}
            <div
              className="relative"
            
              onMouseEnter={() => handleMouseEnter('system')}
              onMouseLeave={handleMouseLeave}
            >
              <button className={`flex items-center text-base font-medium transition-colors duration-200 hover:text-[#2C5DB6] ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
                System <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {activeDropdown === 'system' && (
                <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden flex"> 
                  <div className="w-90 p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Paint Systems</h3>
                    <div className="grid grid-cols-1 gap-2">
                      {paintSystems.map((system, index) => (
                        <a
                          key={index}
                          href={`#system-${system.toLowerCase().replace(/\s+/g, '-')}`}
                          className=" menu-item text-gray-600 hover:text-[#2C5DB6]  px-3 py-2 rounded-md transition-colors duration-200"
                        >
                          {system}
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="w-80 p-6 border-l border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Technical Solutions</h3>
                    <div className="grid grid-cols-1 gap-2">
                      {technicalSolutions.map((solution, index) => (
                        <a
                          key={index}
                          href={`#solution-${solution.toLowerCase().replace(/\s+/g, '-')}`}
                          className=" menu-item  text-gray-600 hover:text-[#2C5DB6]  px-3 py-2 rounded-md transition-colors duration-200"
                        >
                          {solution}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <a href="#products" className={`text-base font-medium transition-colors duration-200 hover:text-[#2C5DB6] ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
              Products
            </a>
          </nav>

          {/* Logo في الوسط */}
          <div className="flex-shrink-0">
            <a href="#" className="flex items-center">
              <img
                src="/images/Azmeh-Paints-Logo.png"
                alt="AL AZMEH PAINTS"
                className={`h-10 w-auto transition-all duration-200 ${isScrolled ? 'filter brightness-100' : 'filter brightness-0 invert'}`}
              />
            </a>
          </div>

          {/* Right Navigation - 3 عناصر */}
          <nav className="hidden lg:flex items-center space-x-8">

            {/* FAQ Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('faq')}
              onMouseLeave={() => handleMouseLeave(null)}
            >
              <button className={`flex items-center text-base font-medium transition-colors duration-200 hover:text-[#2C5DB6] ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
                FAQ <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {activeDropdown === 'faq' && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
                  <div className="p-4">
                    {faqItems.map((item, index) => (
                      <a
                        key={index}
                        href="#faq"
                        className="menu-item  block text-gray-600 hover:text-[#2C5DB6]  px-3 py-2 rounded-md transition-colors duration-200 mb-1"
                      >
                        {item}
                      </a>
                    ))}
                    <a
                      href="#faq"
                      className=" menu-item block text-[#2C5DB6] font-medium  px-3 py-2 rounded-md transition-colors duration-200 mt-2 border-t border-gray-200"
                    >
                      View All FAQs →
                    </a>
                  </div>
                </div>
              )}
            </div>

            <a href="#blog" className={`text-base font-medium transition-colors duration-200 hover:text-[#2C5DB6] ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
              Blog
            </a>

            {/* Contact Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('contact')}
              onMouseLeave={() => handleMouseLeave(null)}
            >
              <button className={`flex items-center text-base font-medium transition-colors duration-200 hover:text-[#2C5DB6] ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
                Contact & Distributors <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {activeDropdown === 'contact' && (
                <div className=" absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
                  <div className="p-4">
                    <a href="#contact" className=" menu-item  block text-gray-600 hover:text-[#2C5DB6]  px-3 py-2 rounded-md transition-colors duration-200 mb-1">Contact Us</a>
                    <a href="#distributors" className=" menu-item  block text-gray-600 hover:text-[#2C5DB6] px-3 py-2 rounded-md transition-colors duration-200">Find Distributors</a>
                  </div>
                </div>
              )}
            </div>

          </nav>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-md transition-colors duration-200 ${isScrolled ? 'text-gray-900' : 'text-white'}`}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-6 space-y-4">
            <a href="#about" className="block text-gray-900 hover:text-[#2C5DB6] font-medium">About Us</a>
            <a href="#system" className="block text-gray-900 hover:text-[#2C5DB6] font-medium">System</a>
            <a href="#products" className="block text-gray-900 hover:text-[#2C5DB6] font-medium">Products</a>
            <a href="#faq" className="block text-gray-900 hover:text-[#2C5DB6] font-medium">FAQ</a>
            <a href="#blog" className="block text-gray-900 hover:text-[#2C5DB6] font-medium">Blog</a>
            <a href="#contact" className="block text-gray-900 hover:text-[#2C5DB6] font-medium">Contact</a>
            <a href="#distributors" className="block text-gray-900 hover:text-[#2C5DB6] font-medium">Distributors</a>
          </div>
        </div>
      )} 
    </header>
  );
};

export default Header;
