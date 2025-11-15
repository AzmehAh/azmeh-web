import React from "react";
import { motion } from "framer-motion";
import { Shield, Lightbulb, Globe, Users, Handshake, Award } from "lucide-react";
import { useTranslation } from "react-i18next";

const Values = () => {
  const { t } = useTranslation();

  const icons = [Shield, Lightbulb, Globe, Users, Handshake, Award];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
            {t('values.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('values.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t('values.values', { returnObjects: true }).map((value: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-white shadow-lg hover:shadow-2xl transition-all duration-500 p-8 border border-gray-100 hover:border-logo/20"
            >
              <div className="flex flex-col items-start gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 flex items-center justify-center">
                    {React.createElement(icons[index], {
                      className: "w-8 h-8 group-hover:text-logo text-gray-600"
                    })}
                  </div>
                  <h3 className="text-xl font-bold group-hover:text-logo text-gray-900">
                    {value.title}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Values;