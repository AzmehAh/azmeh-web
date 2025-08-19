import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-gray-900 text-white overflow-hidden">

      {/* Curved Top */}
      <div className="absolute top-0 left-0 right-0">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-16 md:h-20"
          fill="currentColor"
        >
          <path d="M0,0 C300,120 900,120 1200,0 L1200,120 L0,120 Z" />
        </svg>
      </div>

      <div className="relative pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

            {/* Company Logo */}
            <div className="lg:col-span-2 flex items-center justify-start mb-6">
              <img
                src="/images/Azmeh-Paints-Logo.png"
                alt="AL AZMEH PAINTS"
                className="h-12 w-auto filter brightness-0 invert"
              />
            </div>

            {/* Company Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Information</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-[#2C5DB6]" />
                  <span className="text-gray-300">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-[#2C5DB6]" />
                  <span className="text-gray-300">info@alazmehpaints.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-[#2C5DB6]" />
                  <span className="text-gray-300">123 Industrial Ave, Paint City, PC 12345</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#about" className="text-gray-300 hover:text-white transition-colors duration-200">About Us</a></li>
                <li><a href="#products" className="text-gray-300 hover:text-white transition-colors duration-200">Products</a></li>
                <li><a href="#services" className="text-gray-300 hover:text-white transition-colors duration-200">Services</a></li>
                <li><a href="#blog" className="text-gray-300 hover:text-white transition-colors duration-200">Blog</a></li>
                <li><a href="#contact" className="text-gray-300 hover:text-white transition-colors duration-200">Contact</a></li>
                <li><a href="#distributors" className="text-gray-300 hover:text-white transition-colors duration-200">Distributors</a></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
              <p className="text-gray-300 text-sm mb-4">
                Subscribe to our newsletter for the latest paint trends and product updates.
              </p>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-[#2C5DB6] text-white placeholder-gray-400"
                />
                <button
                  type="submit"
                  className="w-full bg-[#2C5DB6] text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold"
                >
                  Subscribe
                </button>
              </form>
            </div>

          </div>

          {/* Social Media & Copyright */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-6 mb-4 md:mb-0">
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 group">
                  <Facebook className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 group">
                  <Instagram className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 group">
                  <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
                </a>
              </div>

              <div className="text-gray-400 text-sm">
                © 2025 Al Azmeh Paints. All rights reserved.
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Decorative Gradient */}
      <div className="absolute bottom-0 right-0 w-64 h-64 opacity-5">
        <div className="w-full h-full bg-gradient-to-tl from-[#2C5DB6] to-transparent rounded-full"></div>
      </div>
    </footer>
  );
};

export default Footer;

