import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowRight, Facebook, Instagram, MessageCircle } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'Products', href: '/products' },
    { name: 'Systems', href: '/systems' },
    { name: 'Technical Support', href: '/faq' },
    { name: 'About Us', href: '/about' }
  ];

  const services = [
    { name: 'Industrial Coatings', href: '/systems' },
    { name: 'Automotive Paints', href: '/products' },
    { name: 'Architectural Solutions', href: '/products' },
    { name: 'Protective Systems', href: '/systems' }
  ];

  const support = [
    { name: 'FAQ', href: '/faq' },
    { name: 'Troubleshooting', href: '/troubleshooting' },
    { name: 'Technical Bulletins', href: '/systems' },
    { name: 'Contact Support', href: '/contact' }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="py-12 border-b border-gray-700">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
              <p className="text-gray-300 text-lg">
                Get the latest updates on new products, technical insights, and industry innovations.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-[#2C5DB6] focus:ring-2 focus:ring-[#2C5DB6]/20 text-white placeholder-gray-400"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#2C5DB6] text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 flex items-center justify-center"
              >
                Subscribe
                <ArrowRight className="w-4 h-4 ml-2" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-6">
                <img
                  src="/images/Azmeh-Paints-Logo.png"
                  alt="Al Azmeh Paints"
                  className="h-12 w-auto filter brightness-0 invert"
                />
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Al-Azmeh Paints has been delivering premium paint systems and coatings since 1955. 
                With nearly 70 years of excellence, we provide innovative solutions for industrial, 
                automotive, and architectural applications worldwide.
              </p>
              <div className="flex space-x-4">
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-300"
                >
                  <Facebook className="w-5 h-5 text-white" />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-300"
                >
                  <Instagram className="w-5 h-5 text-white" />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-300"
                >
                  <MessageCircle className="w-5 h-5 text-white" />
                </motion.a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-lg mb-6 text-white">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-[#2C5DB6] transition-colors duration-200 flex items-center group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {link.name}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-bold text-lg mb-6 text-white">Our Services</h4>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service.name}>
                    <a
                      href={service.href}
                      className="text-gray-300 hover:text-[#2C5DB6] transition-colors duration-200 flex items-center group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {service.name}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-bold text-lg mb-6 text-white">Support</h4>
              <ul className="space-y-3">
                {support.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-gray-300 hover:text-[#2C5DB6] transition-colors duration-200 flex items-center group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {item.name}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="py-8 border-t border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Syria Branch */}
            <div className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-colors duration-300">
              <h5 className="font-semibold text-white mb-4 flex items-center">
                <MapPin className="w-5 h-5 text-[#2C5DB6] mr-2" />
                Syria Headquarters
              </h5>
              <div className="space-y-2 text-gray-300 text-sm">
                <p>Damascus - Mazzeh - Fayez Mansour St.</p>
                <p>Muhafaza Building 6</p>
                <p className="flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-[#2C5DB6]" />
                  manager@dkl-syria.com
                </p>
                <p className="flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-[#2C5DB6]" />
                  (+963) 988 691 712
                </p>
              </div>
            </div>

            {/* USA Branch */}
            <div className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-colors duration-300">
              <h5 className="font-semibold text-white mb-4 flex items-center">
                <MapPin className="w-5 h-5 text-[#2C5DB6] mr-2" />
                USA Office
              </h5>
              <div className="space-y-2 text-gray-300 text-sm">
                <p>Tennessee - Chattanooga</p>
                <p>Marlin Rd 5726 Ste 312 - 37411</p>
                <p className="flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-[#2C5DB6]" />
                  manager@dkl-syria.com
                </p>
                <p className="flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-[#2C5DB6]" />
                  (+1) 423 667 1606
                </p>
              </div>
            </div>

            {/* UAE Branch */}
            <div className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-colors duration-300">
              <h5 className="font-semibold text-white mb-4 flex items-center">
                <MapPin className="w-5 h-5 text-[#2C5DB6] mr-2" />
                UAE Office
              </h5>
              <div className="space-y-2 text-gray-300 text-sm">
                <p>Dubai World Trade Center</p>
                <p>#103 - Floor 26</p>
                <p className="flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-[#2C5DB6]" />
                  manager@dkl-syria.com
                </p>
                <p className="flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-[#2C5DB6]" />
                  (+971) 54 388 7822
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-gray-700 flex flex-col md:flex-row items-center justify-between">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Al Azmeh Paints. All rights reserved. | Excellence Since 1955
          </div>
          <div className="flex items-center space-x-6 text-sm text-gray-400">
            <a href="/privacy" className="hover:text-white transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-white transition-colors duration-200">
              Terms of Service
            </a>
            <a href="/sitemap" className="hover:text-white transition-colors duration-200">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;