import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CTA = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-gray-50">
     

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
      
    
    </section>
  );
};

export default CTA;