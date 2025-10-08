import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Users } from "lucide-react";
import { useTranslation } from "react-i18next";

const AboutFounderSection = () => {
  const navigate = useNavigate(); 
  const { t } = useTranslation();

  return (
    <section className="py-40 bg-logo relative overflow-hidden text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Combined Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left Side: Founder Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-logo rounded-3xl opacity-20 blur-xl"></div>
            <div className="relative bg-gradient-to-br from-[#2C5DB6] to-blue-800 rounded-3xl p-8 shadow-2xl">
              <div className="w-64 h-64 mx-auto bg-gray-300 rounded-2xl flex items-center justify-center">
                <Users className="w-32 h-32 text-gray-500" />
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-2xl font-bold text-gray-50 mb-2">
                  {t('founder.founderName')}
                </h3>
                <p className="text-blue-200">{t('founder.founderTitle')}</p>
                <div className="mt-4 space-y-1 text-sm text-blue-200">
                  <p>{t('founder.details.born')}</p>
                  <p>{t('founder.details.started')}</p>
                  <p>{t('founder.details.founded')}</p>
                  <p>{t('founder.details.legacy')}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Combined Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 text-gray-100"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t('founder.title')}
            </h2>
            <p className="leading-relaxed text-lg">
              {t('founder.description')}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-200 mb-2">80</div>
                <div className="text-gray-200">{t('founder.stats.leadership')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-200 mb-2">1955</div>
                <div className="text-gray-200">{t('founder.stats.founded')}</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutFounderSection;