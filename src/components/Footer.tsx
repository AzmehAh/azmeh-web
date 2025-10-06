import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <footer className="bg-[#0055A3] text-white" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 ${
            isRTL ? 'text-right' : 'text-left'
          }`}
        >
          {/* 1. معلومات الشركة */}
          <div className="space-y-4">
            <img
              src="/images/Azmeh-Paints-Logo.png"
              alt="Azmeh Paints"
              className="h-14 w-auto filter brightness-0 invert mb-2"
            />
            <p className="text-sm leading-relaxed text-gray-100">
              {t('footer.companyDescription')}
            </p>
            <p className="text-sm text-gray-200 mt-6">
              © {new Date().getFullYear()} {t('footer.copyrightText')}
            </p>
          </div>

          {/* 2. روابط سريعة */}
          <div>
            <h4 className="font-semibold mb-5 text-lg">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-100 hover:text-white text-sm">
                  {t('common.home')}
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-100 hover:text-white text-sm">
                  {t('common.products')}
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-100 hover:text-white text-sm">
                  {t('common.blog')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-100 hover:text-white text-sm">
                  {t('common.about')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-100 hover:text-white text-sm">
                  {t('common.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. معلومات الاتصال */}
          <div>
            <h4 className="font-semibold mb-5 text-lg">{t('footer.contactInfo')}</h4>
            <ul className="space-y-3 text-gray-200">
              <li className="flex items-center">
                <Mail
                  className={`w-5 h-5 flex-shrink-0 ${isRTL ? 'ml-3' : 'mr-3'}`}
                />
                <span className="text-sm">manager@dkl-syria.com</span>
              </li>
              <li className="flex items-center">
                <Phone
                  className={`w-5 h-5 flex-shrink-0 ${isRTL ? 'ml-3' : 'mr-3'}`}
                />
                <span className="text-sm">+963 712 691 988</span>
              </li>
              <li className="flex items-center">
                <MapPin
                  className={`w-5 h-5 flex-shrink-0 ${isRTL ? 'ml-3' : 'mr-3'}`}
                />
                <span className="text-sm">{t('footer.address')}</span>
              </li>
            </ul>
          </div>

          {/* 4. تابعنا */}
          <div>
            <h4 className="font-semibold mb-5 text-lg">{t('footer.followUs')}</h4>
            <div
              className={`flex ${
                isRTL ? 'flex-row-reverse space-x-reverse' : ''
              } space-x-4`}
            >
              <a
                href="#"
                className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#2C5DB6] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#2C5DB6] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#2C5DB6] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#2C5DB6] transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
            <p className="mt-6 pt-4 border-t border-gray-700 text-gray-300 text-xs">
              {t('footer.stayUpdated')}
            </p>
          </div>
        </div>

        {/* الفاصل السفلي */}
        <div className="mt-10 pt-6 border-t border-gray-700">
          <div
            className={`flex flex-col md:flex-row justify-between items-center ${
              isRTL ? 'text-right' : 'text-left'
            }`}
          >
            <p className="text-gray-300 text-sm mb-3 md:mb-0">
              {t('footer.professionalSolutions')}
            </p>
            <div
              className={`flex ${
                isRTL ? 'flex-row-reverse space-x-reverse' : ''
              } space-x-6`}
            >
              <Link
                to="/privacy"
                className="text-gray-300 hover:text-white text-sm"
              >
                {t('footer.privacyPolicy')}
              </Link>
              <Link
                to="/terms"
                className="text-gray-300 hover:text-white text-sm"
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
