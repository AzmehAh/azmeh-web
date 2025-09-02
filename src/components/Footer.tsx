import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#f5f5f5] text-[#0055a3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <img
                src="/images/Azmeh-Paints-Logo.png"
                alt="DKL Engineering"
                className="h-12 w-auto"
              />
            </div>
            <p className="text-gray-700 mb-4 max-w-xs">
              Al-Dakhlallah Engineering Company for Electrical and Mechanical Projects is a Syrian company established in 2005
            </p>
            <div className="flex space-x-3">
              <button className="p-2 bg-white rounded shadow hover:bg-gray-100">
                <Mail className="w-5 h-5 text-[#0055a3]" />
              </button>
              <button className="p-2 bg-white rounded shadow hover:bg-gray-100">
                <Phone className="w-5 h-5 text-[#0055a3]" />
              </button>
            </div>
          </div>

          {/* BRW Galaxy LLC */}
          <div>
            <h4 className="font-semibold mb-3 border-b-2 border-[#0055a3] inline-block text-gray-700">
              Contact Info (BRW Galaxy LLC)
            </h4>
            <div className="space-y-2 mt-2 text-gray-700">
              <div className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 mt-1 text-[#0055a3]" />
                <span>USA - Tennessee - Chattanooga - Marlin Rd 5726 Ste 312 - Zip code 37411</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-[#0055a3]" />
                <span>manager@dkl-syria.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-[#0055a3]" />
                <span>(+1) 423 667 1606</span>
              </div>
            </div>
          </div>

          {/* Syria Branch */}
          <div>
            <h4 className="font-semibold mb-3 border-b-2 border-[#0055a3] inline-block text-gray-700">
              Contact Info
            </h4>
            <div className="space-y-2 mt-2 text-gray-700">
              <div className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 mt-1 text-[#0055a3]" />
                <span>Syria-Damascus - Mazzeh - Fayez Mansour Str - Muhafaza building 6</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-[#0055a3]" />
                <span>manager@dkl-syria.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-[#0055a3]" />
                <span>(+963) 988 691 712</span>
              </div>
            </div>
          </div>

          {/* BRW Galaxy FZE */}
          <div>
            <h4 className="font-semibold mb-3 border-b-2 border-[#0055a3] inline-block text-gray-700">
              Contact Info (BRW Galaxy FZE)
            </h4>
            <div className="space-y-2 mt-2 text-gray-700">
              <div className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 mt-1 text-[#0055a3]" />
                <span>UAE-Dubai World Trade Center #103- Floor 26</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-[#0055a3]" />
                <span>manager@dkl-syria.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-[#0055a3]" />
                <span>(+971) 54 388 7822</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Small bottom bar */}
      <div className="bg-[#0055a3] text-white text-center py-2">
        © {new Date().getFullYear()} DKL Engineering. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
