import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <footer className="bg-[#0055A3] text-white" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 ${isRTL ? 'text-right' : 'text-left'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* --- Company Info --- */}
          <div className={`flex flex-col ${isRTL ? 'items-end' : 'items-start'}`}>
            <div className={`flex items-center mb-6 ${isRTL ? 'justify-end' : 'justify-start'}`}>
              <img
                src="/images/Azmeh-Paints-Logo.png"
                alt="Al Azmeh Paints"
                className="h-12 w-auto filter brightness-0 invert"
              />
            </div>
            <p className="text-white text-sm leading-relaxed text-justify">
              {t('footer.companyDescription')}
            </p>
            <div className="pt-4 mt-auto">
              <p className="text-white text-sm">
                {t('footer.copyright', { year: new Date().getFullYear() })}
              </p>
            </div>
          </div>

          {/* --- Quick Links --- */}
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <h4 className="font-semibold mb-6 text-white text-lg">
              {t('footer.quickLinks')}
            </h4>
            <ul className={`space-y-3 ${isRTL ? 'pr-0' : 'pl-0'}`}>
              <li>
                <Link to="/" className="hover:text-gray-200 text-sm block transition-colors duration-300">
                  {t('common.home')}
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-gray-200 text-sm block transition-colors duration-300">
                  {t('common.products')}
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-gray-200 text-sm block transition-colors duration-300">
                  {t('common.blog')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gray-200 text-sm block transition-colors duration-300">
                  {t('common.about')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gray-200 text-sm block transition-colors duration-300">
                  {t('common.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* --- Contact Info --- */}
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <h4 className="font-semibold mb-6 text-white text-lg">
              {t('footer.contactInfo')}
            </h4>
            <div className="space-y-4">
              {/* Email */}
              <div className={`flex items-start ${isRTL ? 'flex-row-reverse justify-end' : 'justify-start'}`}>
                <Mail className={`w-5 h-5 text-white mt-0.5 flex-shrink-0 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                <p className="text-gray-300 text-sm break-all">manager@dkl-syria.com</p>
              </div>
              {/* Phone */}
              <div className={`flex items-start ${isRTL ? 'flex-row-reverse justify-end' : 'justify-start'}`}>
                <Phone className={`w-5 h-5 text-white mt-0.5 flex-shrink-0 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                <p className="text-gray-300 text-sm">(+963) 988 691 712</p>
              </div>
              {/* Address */}
              <div className={`flex items-start ${isRTL ? 'flex-row-reverse justify-end' : 'justify-start'}`}>
                <MapPin className={`w-5 h-5 text-white mt-0.5 flex-shrink-0 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                <p className="text-gray-300 text-sm leading-relaxed">{t('footer.address')}</p>
              </div>
            </div>
          </div>

          {/* --- Social Media --- */}
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <h4 className="font-semibold mb-6 text-white text-lg">
              {t('footer.followUs')}
            </h4>
            <div className={`flex ${isRTL ? 'justify-end' : 'justify-start'} ${isRTL ? 'flex-row-reverse space-x-reverse' : ''} gap-4`}>
              {[
                { Icon: Facebook, name: 'Facebook' },
                { Icon: Instagram, name: 'Instagram' },
                { Icon: Linkedin, name: 'Linkedin' },
                { Icon: Youtube, name: 'Youtube' }
              ].map(({ Icon, name }, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#2C5DB6] transition-colors duration-300"
                  aria-label={name}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-gray-800">
              <p className="text-gray-400 text-xs leading-relaxed">{t('footer.stayUpdated')}</p>
            </div>
          </div>
        </div>

        {/* --- Bottom Section --- */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className={`flex flex-col md:flex-row ${isRTL ? 'md:flex-row-reverse' : ''} justify-between items-center gap-4`}>
            <p className="text-gray-400 text-sm text-center md:text-left">
              {t('footer.professionalSolutions')}
            </p>
            <div className={`flex ${isRTL ? 'flex-row-reverse' : ''} gap-6 text-sm`}>
              <Link 
                to="/privacy" 
                className="text-gray-400 hover:text-white transition-colors duration-300 whitespace-nowrap"
              >
                {t('footer.privacyPolicy')}
              </Link>
              <Link 
                to="/terms" 
                className="text-gray-400 hover:text-white transition-colors duration-300 whitespace-nowrap"
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