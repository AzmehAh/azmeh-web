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
          
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center mb-6">
              <img
                src="/images/Azmeh-Paints-Logo.png"
                alt="Al Azmeh Paints"
                className="h-12 w-auto filter brightness-0 invert"
              />
            </div>
            <p className="text-white text-sm leading-relaxed">
              {t('footer.companyDescription')}
            </p>
            <div className="pt-4">
              <p className="text-white text-sm">
                {t('footer.copyright', { year: new Date().getFullYear() })}
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-6 text-white text-lg">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-white hover:text-white transition-colors text-sm">
                  {t('common.home')}
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-white hover:text-white transition-colors text-sm">
                  {t('common.products')}
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-white hover:text-white transition-colors text-sm">
                  {t('common.blog')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white hover:text-white transition-colors text-sm">
                  {t('common.about')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white hover:text-white transition-colors text-sm">
                  {t('common.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="font-semibold mb-6 text-white text-lg">
              {t('footer.contactInfo')}
            </h4>
            <div className="space-y-4">
              <div className={`flex items-start ${isRTL ? 'flex-row-reverse gap-reverse' : 'gap-3'}`}>
                <Mail className={`w-5 h-5 text-white mt-0.5 flex-shrink-0 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                <div>
                  <p className="text-gray-300 text-sm">manager@dkl-syria.com</p>
                </div>
              </div>
              <div className={`flex items-start ${isRTL ? 'flex-row-reverse gap-reverse' : 'gap-3'}`}>
                <Phone className={`w-5 h-5 text-white mt-0.5 flex-shrink-0 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                <div>
                  <p className="text-gray-300 text-sm">(+963) 988 691 712</p>
                </div>
              </div>
              <div className={`flex items-start ${isRTL ? 'flex-row-reverse gap-reverse' : 'gap-3'}`}>
                <MapPin className={`w-5 h-5 text-white mt-0.5 flex-shrink-0 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                <div>
                  <p className="text-gray-300 text-sm">
                   {t('footer.address')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-semibold mb-6 text-white text-lg">
              {t('footer.followUs')}
            </h4>
            <div className={`flex ${isRTL ? 'flex-row-reverse gap-reverse' : 'gap-4'}`}>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#2C5DB6] transition-colors duration-300"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#2C5DB6] transition-colors duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#2C5DB6] transition-colors duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#2C5DB6] transition-colors duration-300"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-800">
              <p className="text-gray-400 text-xs">
                {t('footer.stayUpdated')}
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Border */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              {t('footer.professionalSolutions')}
            </p>
            <div className={`flex ${isRTL ? 'flex-row-reverse gap-reverse' : 'gap-6'} text-sm`}>
              <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                {t('footer.privacyPolicy')}
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
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