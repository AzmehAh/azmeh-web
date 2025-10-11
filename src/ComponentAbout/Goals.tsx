import React from "react";
import { Eye, Target } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const Goals = () => {
  const { t } = useTranslation();

  return (
    <section className="py-40 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* عنوان السكشن */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              {t('goals.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('goals.subtitle')}
            </p>
          </motion.div>
        </div>

        {/* كتل Vision و Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-100 shadow-lg  rounded-2xl p-8 text-white flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Eye className="w-6 h-6 text-logo" />
              <h3 className="text-2xl font-bold text-logo">{t('goals.vision.title')}</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              {t('goals.vision.description')}
            </p>
          </div>

          <div className="bg-gray-100 rounded-2xl p-8 text-white flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Target className="w-6 h-6 text-logo" />
              <h3 className="text-2xl text-logo font-bold">{t('goals.mission.title')}</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              {t('goals.mission.description')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Goals;