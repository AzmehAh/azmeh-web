import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CTA = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-logo rounded-2xl p-12 text-white"
        >
        
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            {t('cta.subtitle')}
          </p>
 
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/contact")}
              className="bg-white text-[#2C5DB6] px-8 py-4 rounded-lg font-bold text-lg hover:shadow-2xl transition-all duration-300"
            >
              {t('cta.buttons.contact')}
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/products")}
              className="bg-white/20 backdrop-blur-sm rounded-lg text-white px-8 py-4 font-bold text-lg hover:bg-white/30 transition-all duration-300"
            >
              {t('cta.buttons.products')}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;