import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram,MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <footer className="bg-logo text-white" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* --- Company Info --- */}
          <div>
            <div className={`flex items-center mb-6 ${isRTL ? 'justify-start' : 'justify-start'}`}>
              <img
                src="/images/Azmeh-Paints-Logo.png"
                alt="Al Azmeh Paints"
                className="h-12 w-auto filter brightness-0 invert"
              />
            </div>
            <p className="text-white text-sm leading-relaxed mb-4">
              {t('footer.companyDescription')}
            </p>
            <p className="text-white text-sm">
              {t('footer.copyright', { year: new Date().getFullYear() })}
            </p>
          </div>

          {/* --- Quick Links --- */}
          <div>
            <h4 className="font-semibold mb-6 text-white text-lg">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="hover:text-gray-200 text-sm block transition-colors duration-200"
                >
                  {t('common.home')}
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="hover:text-gray-200 text-sm block transition-colors duration-200"
                >
                  {t('common.products')}
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="hover:text-gray-200 text-sm block transition-colors duration-200"
                >
                  {t('common.blog')}
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-gray-200 text-sm block transition-colors duration-200"
                >
                  {t('common.about')}
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-gray-200 text-sm block transition-colors duration-200"
                >
                  {t('common.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* --- Contact Info --- */}
          <div>
            <h4 className="font-semibold mb-6 text-white text-lg">
              {t('footer.contactInfo')}
            </h4>
            <div className="space-y-4">
              {/* Email */}
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm break-all">
                azmeh@azmeh.com
                </span>
              </div>
              {/* Phone */}
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm" dir="ltr">
           +963 11 542 50 58
                </span>
              </div>
              {/* Address */}
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm leading-relaxed">
                  {t('footer.address')}
                </span>
              </div>
            </div>
          </div>

          {/* --- Social Media --- */}
          <div>
            <h4 className="font-semibold mb-6 text-white text-lg">
              {t('footer.followUs')}
            </h4>
           <div className="flex gap-4">
  {/* Facebook */}
  <a
    href="#"
    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center 
               hover:bg-[#1877F2] transition-colors duration-300"
    aria-label="Facebook"
  >
    <Facebook className="w-5 h-5 text-white" />
  </a>

  {/* Instagram */}
  <a
    href="#"
    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center 
               transition-colors duration-300 hover:bg-gradient-to-r hover:from-[#f58529] hover:via-[#dd2a7b] hover:to-[#8134af]"
    aria-label="Instagram"
  >
    <Instagram className="w-5 h-5 text-white" />
  </a>

  {/* WhatsApp */}
  <a
    href="https://www.instagram.com/azmehpaints/"
    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center 
               hover:bg-[#25D366] transition-colors duration-300"
    aria-label="WhatsApp"
  > 
    <MessageCircle className="w-5 h-5 text-white" />
  </a>
</div>

            <div className="mt-6 pt-6 border-t border-gray-800">
              <p className="text-gray-400 text-xs">
                {t('footer.stayUpdated')}
              </p>
            </div>
          </div>
        </div>

        {/* --- Bottom Section --- */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 ">
            <p className={`text-gray-400 text-sm ${isRTL ? 'text-center md:text-right' : 'text-center md:text-left'}`}>
              {t('footer.professionalSolutions')}
            </p>
   
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;