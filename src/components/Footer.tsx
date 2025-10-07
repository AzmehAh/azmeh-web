import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <footer className="bg-[#0055A3] text-white" dir={isRTL ? 'rtl' : 'ltr'}>
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
                  manager@dkl-syria.com
                </span>
              </div>
              {/* Phone */}
              <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}>
                <Phone className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm" dir="ltr">
                  (+963) 988 691 712
                </span>
              </div>
              {/* Address */}
              <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}>
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
            <div className={`flex gap-4 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
              {[Facebook, Instagram, Linkedin, Youtube].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#2C5DB6] transition-colors duration-300"
                  aria-label={`Social media ${index}`}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
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
          <div className={`flex flex-col md:flex-row justify-between items-center gap-4 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
            <p className={`text-gray-400 text-sm ${isRTL ? 'text-center md:text-right' : 'text-center md:text-left'}`}>
              {t('footer.professionalSolutions')}
            </p>
            <div className={`flex gap-6 text-sm ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
              <Link
                to="/privacy"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                {t('footer.privacyPolicy')}
              </Link>
              <Link
                to="/terms"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                {t('footer.termsOfService')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;