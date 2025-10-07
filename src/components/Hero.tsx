import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../lib/supabase";
import { useTranslation } from "react-i18next";

// دالة للكشف عن الجوال
const isMobile = () => window.innerWidth < 768;

const Hero = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [activeIndex, setActiveIndex] = useState(0);
  const [isManual, setIsManual] = useState(false);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const intervalRef = useRef(null);

  const handleExplore = (id) => {
    navigate(`/products?category=${id}`);
    setIsManual(true);
  };

  useEffect(() => {
    const fetchHeroCategories = async () => {
      try {
        const { data, error } = await supabase
          .from("product_categories")
          .select("id, name, name_ar, description, description_ar, image_url, button_link")
          .eq("is_active", true)
          .order("sort_order", { ascending: true });

        if (error) throw error;

        const validCategories = data.filter(
          (cat) => cat.image_url && cat.description && cat.name
        );

        setCategories(validCategories);
        if (validCategories.length > 0) {
          setActiveIndex(0);
        }
      } catch (error) {
        console.error("Error fetching hero categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroCategories();
  }, []);

  // مؤقت التبديل التلقائي (يعمل فقط على غير الجوال)
  useEffect(() => {
    if (isManual || categories.length === 0 || isMobile()) return;

    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) =>
        prev + 1 < categories.length ? prev + 1 : 0
      );
    }, 4000);

    return () => clearInterval(intervalRef.current);
  }, [isManual, categories.length]);

  if (loading) {
    return (
      <div className="w-full h-screen bg-white"></div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="relative w-full h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white text-center">
          <div className="text-2xl mb-4">No active categories found for Hero.</div>
          <div className="text-sm">Please add categories with image and description.</div>
        </div>
      </div>
    );
  }

  // ✅ عرض منفصل للجوال
  if (isMobile()) {
    const current = categories[activeIndex];

    return (
      <div className="relative w-full h-[80vh] md:h-screen overflow-hidden mt-20 md:mt-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            className="absolute inset-0"
            initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isRTL ? 50 : -50 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={current.image_url}
              alt={isRTL && current.name_ar ? current.name_ar : current.name}
              className="w-full h-full object-cover"
              style={{ filter: "brightness(0.4) contrast(1.2)" }}
            />
            <div className={`absolute inset-0 z-10 flex flex-col justify-center p-6 ${isRTL ? 'items-end text-right' : 'items-start text-left'}`}>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-white text-3xl sm:text-4xl font-black mb-4"
                style={{ direction: isRTL ? 'rtl' : 'ltr' }}
              >
                {isRTL && current.name_ar ? current.name_ar : current.name}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-white text-base sm:text-lg max-w-md mb-6 leading-relaxed"
              >
                {isRTL && current.description_ar ? current.description_ar : current.description}
              </motion.p>
              <motion.button
                onClick={() => {
                  if (current.button_link) {
                    window.open(current.button_link, "_blank");
                  } else {
                    handleExplore(current.id);
                  }
                  setIsManual(true);
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center space-x-2 px-5 py-2.5 border-2 border-gray-300 text-white font-semibold rounded-lg hover:border-logo transition-all duration-300 text-base"
              >
                <span>{t('hero.readMore')}</span>
                <ArrowRight 
                  className={`w-4 h-4 ${isRTL ? 'mr-1 -translate-x-1 rotate-180' : 'ml-1 translate-x-1'}`} 
                />
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Indicators */}
        <div className={`absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
          {categories.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveIndex(idx);
                setIsManual(true);
              }}
              className={`w-3 h-3 rounded-full transition-all ${
                idx === activeIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    );
  }

  // ✅ عرض سطحي (Desktop/Tablet)
  return (
    <div className="relative w-full h-screen overflow-hidden mt-20 md:mt-0">
      <div className="flex h-full">
        {categories.map((category, index) => {
          const isActive = activeIndex === index;

          return (
            <motion.div
              key={category.id}
              className={`relative h-full cursor-pointer ${
                isActive ? "flex-grow" : "flex-shrink"
              }`}
              initial={{ flex: 1 }}
              animate={{
                flex: isActive ? 5 : 1,
                transform: isActive ? "rotate(0deg)" : "rotate(5deg)",
                marginLeft: "-25px",
                marginRight: "-25px",
              }}
              style={{ transformOrigin: "center center" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              onClick={() => {
                setActiveIndex(index);
                setIsManual(true);
              }}
            >
              <motion.img
                src={category.image_url}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  filter: isActive
                    ? "brightness(0.4) contrast(1.2)"
                    : "brightness(0.4) contrast(1.1)", 
                }}
                initial={{ scale: 1.1 }}
                animate={{ scale: isActive ? 1 : 1.1 }}
                transition={{ duration: 0.5 }}
              />

              <div className="absolute inset-0 z-10 flex flex-col justify-center items-start p-8 lg:p-16">
                {/* العنوان - يظهر فقط عند النشاط */}
                {isActive && (
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, type: "spring" }}
                    className="text-white text-4xl md:text-5xl lg:text-6xl font-black mb-6"
                    style={{ textAlign: isRTL ? "right" : "left", direction: isRTL ? "rtl" : "ltr" }}
                  >
                    {isRTL && category.name_ar ? category.name_ar : category.name}
                  </motion.h1>
                )}

                {/* الشرح - يظهر فقط عند النشاط */}
                {isActive && (
                  <motion.div
                    className="w-full max-w-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <p className="text-lg md:text-xl mb-6 text-white leading-relaxed drop-shadow-lg">
                      {isRTL && category.description_ar ? category.description_ar : category.description}
                    </p>
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (category.button_link) {
                          window.open(category.button_link, "_blank");
                        } else {
                          handleExplore(category.id);
                        }
                        setIsManual(true);
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group inline-flex items-center space-x-3 px-6 py-3 border-2 border-gray-300 text-white font-semibold rounded-lg hover:border-logo transition-all duration-300 text-base"
                    >
                      <span>{t('hero.readMore')}</span>
                      <ArrowRight 
                        className={`w-5 h-5 group-hover:${isRTL ? '-translate-x-1' : 'translate-x-1'} transition-transform ${isRTL ? 'rotate-180' : ''}`} 
                      />
                    </motion.button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Hero;