import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // إغلاق القائمة عند الضغط خارجها
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const paintSystems = [ /* ... */ ];
  const technicalSolutions = [ /* ... */ ];
  const faqItems = [ /* ... */ ];

  const toggleDropdown = (name: string) => {
    setActiveDropdown(prev => (prev === name ? null : name));
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg backdrop-blur-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="#blog" className={`text-base font-medium transition-colors duration-200 hover:text-[#2C5DB6] ${isScrolled ? 'text-gray-900' : 'text-white'}`}>Blog</a>
            
            {/* System Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => toggleDropdown('system')}
                className={`flex items-center text-base font-medium transition-colors duration-200 hover:text-[#2C5DB6] ${isScrolled ? 'text-gray-900' : 'text-white'}`}
              >
                System <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              {activeDropdown === 'system' && (
                <div className="absolute top-full left-[180%] transform -translate-x-1/2 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
                  <div className="flex">
                    <div className="w-80 p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Paint Systems</h3>
                      <div className="grid grid-cols-1 gap-2">
                        {paintSystems.map((system, index) => (
                          <a key={index} href={`#system-${system.toLowerCase().replace(/\s+/g, '-')}`} className="text-gray-600 hover:text-[#2C5DB6] hover:bg-blue-50 px-3 py-2 rounded-md transition-colors duration-200">{system}</a>
                        ))}
                      </div>
                    </div>
                    <div className="w-80 p-6 border-l border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Technical Solutions</h3>
                      <div className="grid grid-cols-1 gap-2">
                        {technicalSolutions.map((solution, index) => (
                          <a key={index} href={`#solution-${solution.toLowerCase().replace(/\s+/g, '-')}`} className="text-gray-600 hover:text-[#2C5DB6] hover:bg-blue-50 px-3 py-2 rounded-md transition-colors duration-200">{solution}</a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* FAQ Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => toggleDropdown('faq')}
                className={`flex items-center text-base font-medium transition-colors duration-200 hover:text-[#2C5DB6] ${isScrolled ? 'text-gray-900' : 'text-white'}`}
              >
                FAQ <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              {activeDropdown === 'faq' && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
                  <div className="p-4">
                    {faqItems.map((item, index) => (
                      <a key={index} href="#faq" className="block text-gray-600 hover:text-[#2C5DB6] hover:bg-blue-50 px-3 py-2 rounded-md transition-colors duration-200 mb-1">{item}</a>
                    ))}
                    <a href="#faq" className="block text-[#2C5DB6] font-medium hover:bg-blue-50 px-3 py-2 rounded-md transition-colors duration-200 mt-2 border-t border-gray-200">View All FAQs →</a>
                  </div>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
