import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const AboutSection = () => {
  const [count, setCount] = useState(0);
  const currentYear = new Date().getFullYear();
  const targetYears = currentYear - 1955;
  const duration = 2000;
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    const steps = 60;
    const increment = targetYears / steps;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      if (currentStep <= steps) {
        setCount(Math.floor(increment * currentStep));
      } else {
        setCount(targetYears);
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [targetYears, duration]);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className={`text-center lg:text-left ${isRTL ? 'lg:text-right' : ''}`}
          >
             <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 ">
              {t('about.legacy')}
            </h2>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              {t('about.title')}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-4 sm:mb-6">
              {t('about.description1')}
            </p>
           
          <Link
  to="/about"
  className="inline-flex items-center but group px-6 py-3 sm:px-8 sm:py-4 rounded-lg 
             focus:outline-none focus:ring-2 focus:ring-logo/20 
             font-semibold text-sm sm:text-base"
>
  {t('about.readMore')}
  <ArrowRight
    className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform ${
      isRTL 
        ? 'mr-2 rotate-180 group-hover:-translate-x-1' 
        : 'ml-2 group-hover:translate-x-1'
    }`}
  />
</Link>
          </motion.div>

          {/* Right Content - Company Image with Counter Badge */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex justify-center"
          >
            {/* Company Image */}
            <img
              src="./images/about_png"
              alt="Al Azmeh Paints Company"
              className="rounded-xl shadow-lg object-cover w-full max-w-md lg:max-w-lg"
            />

            {/* Counter Badge - يمين في العربية، يسار في الإنجليزية */}
           {/* Counter Badge - Sticker/Brand Style */}
{/* Counter Badge - Brand Sticker Style */}
<motion.div
  className={`absolute bottom-4 ${
    isRTL ? 'right-8' : 'left-8'
  } bg-white rounded-l-xl rounded-r-3xl px-6 py-3 shadow-xl flex items-center space-x-3 transform rotate-[-3deg]`}
  initial={{ scale: 0.5, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ duration: 0.5, delay: 0.5 }}
>
  {/* Optional small logo on the side */}
  <img
    src="/images/logo.png"
    alt="Brand Logo"
    className="w-10 h-10 object-contain rounded-full"
  />

  {/* Counter Text */}
  <div className="flex flex-col items-start">
    <div className="text-xl sm:text-2xl font-bold text-logo">
      {count}Y+
    </div>
    <div className="text-[10px] sm:text-xs text-logo font-semibold uppercase">
      {t('about.experience')}
    </div>
  </div>
</motion.div>


          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;