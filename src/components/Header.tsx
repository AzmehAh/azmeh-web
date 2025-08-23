import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const menuRef = useRef<HTMLUListElement>(null);

  const navItems = [
    { name: 'About Us', dropdown: null },
    { name: 'System', dropdown: 'system' },
    { name: 'Products', dropdown: null },
    { name: 'FAQ', dropdown: 'faq' },
    { name: 'Blog', dropdown: null },
    { name: 'Contact & Distributors', dropdown: 'contact' },
  ];

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

  const handleMouseEnterDropdown = (menu: string) => {
    clearTimeout(timeoutId);
    setActiveDropdown(menu);
  };

  const handleMouseLeaveDropdown = () => {
    timeoutId = setTimeout(() => setActiveDropdown(null), 300);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (hoverIndex !== null && menuRef.current) {
      const item = menuRef.current.children[hoverIndex] as HTMLElement;
      setIndicatorStyle({
        width: item.offsetWidth + 'px',
        left: item.offsetLeft + 'px',
      });
    } else {
      setIndicatorStyle({ width: 0 });
    }
  }, [hoverIndex]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg backdrop-blur-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Left Navigation */}
          <div className="hidden lg:flex items-center relative">
            <ul ref={menuRef} className="flex space-x-8 relative">
              {navItems.map((item, index) => (
                <li
                  key={index}
                  className={`cursor-pointer py-2 text-base font-medium transition-colors duration-200 ${isScrolled ? 'text-gray-900' : 'text-white'}`}
                  onMouseEnter={() => {
                    setHoverIndex(index);
                    if (item.dropdown) handleMouseEnterDropdown(item.dropdown);
                  }}
                  onMouseLeave={() => {
                    setHoverIndex(null);
                    handleMouseLeaveDropdown();
                  }}
                >
                  {item.name} {item.dropdown && <ChevronDown className="ml-1 h-4 w-4 inline" />}
                </li>
              ))}
              {/* Sliding Indicator */}
              <span
                className="absolute bottom-0 h-1 bg-[#2C5DB6] transition-all duration-300"
                style={indicatorStyle}
              ></span>
            </ul>

            {/* Dropdowns */}
            {activeDropdown === 'system' && (
              <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden flex">
                <div className="w-80 p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Paint Systems</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {paintSystems.map((system, idx) => (
                      <a
                        key={idx}
                        href={`#system-${system.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-gray-600 hover:text-[#2C5DB6] hover:bg-blue-50 px-3 py-2 rounded-md transition-colors duration-200"
                      >
                        {system}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="w-80 p-6 border-l border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Technical Solutions</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {technicalSolutions.map((solution, idx) => (
                      <a
                        key={idx}
                        href={`#solution-${solution.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-gray-600 hover:text-[#2C5DB6] hover:bg-blue-50 px-3 py-2 rounded-md transition-colors duration-200"
                      >
                        {solution}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeDropdown === 'faq' && (
              <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
                <div className="p-4">
                  {faqItems.map((item, idx) => (
                    <a
                      key={idx}
                      href="#faq"
                      className="block text-gray-600 hover:text-[#2C5DB6] hover:bg-blue-50 px-3 py-2 rounded-md transition-colors duration-200 mb-1"
                    >
                      {item}
                    </a>
                  ))}
                  <a
                    href="#faq"
                    className="block text-[#2C5DB6] font-medium hover:bg-blue-50 px-3 py-2 rounded-md transition-colors duration-200 mt-2 border-t border-gray-200"
                  >
                    View All FAQs →
                  </a>
                </div>
              </div>
            )}

            {activeDropdown === 'contact' && (
              <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
                <div className="p-4">
                  <a href="#contact" className="block text-gray-600 hover:text-[#2C5DB6] hover:bg-blue-50 px-3 py-2 rounded-md transition-colors duration-200 mb-1">Contact Us</a>
                  <a href="#distributors" className="block text-gray-600 hover:text-[#2C5DB6] hover:bg-blue-50 px-3 py-2 rounded-md transition-colors duration-200">Find Distributors</a>
                </div>
              </div>
            )}
          </div>

          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#" className="flex items-center">
              <img
                src="/images/Azmeh-Paints-Logo.png"
                alt="AL AZMEH PAINTS"
                className={`h-10 w-auto transition-all duration-200 ${isScrolled ? 'filter brightness-100' : 'filter brightness-0 invert'}`}
              />
            </a>
          </div>

          {/* Mobile menu & Right navigation omitted for brevity (يمكن إبقاؤها كما هي) */}

        </div>
      </div>
    </header>
  );
};

export default Header;
