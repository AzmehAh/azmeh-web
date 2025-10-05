import React from 'react';
import { useTranslation } from 'react-i18next';

const Services = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language; // 'ar' or 'en'

  // العناوين مترجمة عبر ملفات JSON
  const services = [
    { number: '01', title: t('services.ecoFriendly') },
    { number: '02', title: t('services.precisionInterior') },
    { number: '03', title: t('services.industrialCoatings') },
    { number: '04', title: t('services.customSolutions') }
  ];

  return (
    <section className="py-8 sm:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 sm:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`flex items-center p-2 sm:p-0 cursor-pointer group ${
                currentLang === 'ar' ? 'gap-reverse' : ''
              }`}
            >
              <span className="text-2xl sm:text-3xl font-bold text-gray-200 group-hover:text-[#0055A3] transition-colors duration-300 flex-shrink-0">
                {service.number}
              </span>
              <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 leading-tight">
                {service.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;