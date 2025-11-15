import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <footer className="bg-gray-900 text-white" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* --- Company Info --- */}
          <div className="space-y-4">
            <div className="flex items-center">
              <img
                src="/images/Azmeh-Paints-Logo.png"
                alt="Al Azmeh Paints"
                className="h-10 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-white text-sm leading-relaxed">
              {t('footer.companyDescription')}
            </p>
           
          </div>
 
          {/* --- Quick Links --- */}
          <div>
            <h4 className="font-bold text-white text-lg mb-5">
              {t('footer.quickLinks')}
               <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red"></span>
            </h4>
            <ul className="space-y-3">
              {[
                { to: '/', label: t('common.home') },
                { to: '/products', label: t('common.products') },
                { to: '/blog', label: t('common.blog') },
                { to: '/about', label: t('common.about') },
                { to: '/contact', label: t('common.contact') },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link to={link.to} className="nav-link text-sm block w-fit">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* --- Contact Info --- */}
          <div>
            <h4 className="font-bold text-white text-lg mb-5">
              {t('footer.contactInfo')}
            </h4>
            <div className="space-y-4 text-gray-400">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span className="text-sm break-all">azmeh@azmeh.com</span>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span className="text-sm" dir="ltr">+963 11 542 50 58</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{t('footer.address')}</span>
              </div>
            </div>
          </div>

          {/* --- Social Media --- */}
          <div>
            <h4 className="font-bold text-white text-lg mb-5">
              {t('footer.followUs')}
               
            </h4>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/azmehpaints"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#1877F2] flex items-center justify-center  transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://www.instagram.com/azmehpaints/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full  bg-gradient-to-r from-[#f58529] via-[#dd2a7b] to-[#8134af]  flex items-center justify-center "
              aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://wa.me/963115425058"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center "
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5 text-white" />
              </a>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-800">
              <p className="text-gray-500 text-xs">{t('footer.stayUpdated')}</p>
            </div>
          </div>
        </div>

        {/* --- Bottom Divider --- */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center md:text-left">
          <p className="text-gray-500 text-xs mt-2">
              © {new Date().getFullYear()} {t('footer.copyright')}
            </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;