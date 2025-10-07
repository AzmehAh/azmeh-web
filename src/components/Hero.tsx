import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../lib/supabase";
import { useTranslation } from "react-i18next";

// 🔹 نفس مكوّن AnimatedTitle (لا حاجة لتغييره)
const AnimatedTitle = ({ text, isActive, isRTL }) => {
  const container = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, type: "spring" } 
    },
  };

  return (
    <motion.h1
      variants={container}
      initial="hidden"
      animate="visible"
      style={{
        fontSize: isActive 
          ? window.innerWidth < 640
            ? "2.5rem"
            : window.innerWidth < 768
            ? "3rem"
            : "4rem"
          : window.innerWidth < 640
          ? "3rem"
          : window.innerWidth < 768
          ? "4rem"
          : "5rem",
        fontWeight: "900",
        color: "white",
        textAlign: isRTL ? "right" : "left",
        lineHeight: "1.1",
        direction: isRTL ? "rtl" : "ltr",
        whiteSpace: "nowrap",
        transform: isRTL && !isActive ? "rotate(-90deg) translateX(50%)" : "none",
        transformOrigin: isRTL && !isActive ? "top right" : "center center",
      }}
    >
      {text}
    </motion.h1>
  );
}; 

// 🔹 مكوّن السلايدر للهواتف فقط
const MobileHeroSlider = ({ categories, activeIndex, setActiveIndex, isManual, setIsManual, t, isRTL }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isManual || categories.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % categories.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isManual, categories.length]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % categories.length);
    setIsManual(true);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + categories.length) % categories.length);
    setIsManual(true);
  };

  const currentCategory = categories[activeIndex];

  return (
    <div className="relative w-full h-screen overflow-hidden mt-20">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          className="absolute inset-0"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ type: "tween", duration: 0.5 }}
        >
          <img
            src={currentCategory.image_url}
            alt={currentCategory.name}
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.4) contrast(1.2)" }}
          />
          <div className="absolute inset-0 z-10 flex flex-col justify-center items-start p-4 sm:p-6">
            <AnimatedTitle 
              text={isRTL && currentCategory.name_ar ? currentCategory.name_ar : currentCategory.name} 
              isActive={true}  
              isRTL={isRTL} 
            />
            <div className="w-full max-w-sm mt-4">
              <p className="text-base mb-4 text-white leading-relaxed drop-shadow-lg">
                {isRTL && currentCategory.description_ar ? currentCategory.description_ar : currentCategory.description}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (currentCategory.button_link) {
                    window.open(currentCategory.button_link, "_blank");
                    setIsManual(true);
                  }
                }}
                className="group inline-flex items-center space-x-2 px-4 py-2 border-2 border-gray-300 text-white font-semibold rounded-lg hover:border-logo transition-all duration-300 text-sm"
              >
                <span>{t('hero.readMore')}</span>
                <ArrowRight 
                  className={`w-4 h-4 group-hover:${isRTL ? '-translate-x-1' : 'translate-x-1'} transition-transform ${isRTL ? 'rotate-180' : ''}`} 
                />
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* أزرار التنقل (اختياري) */}
      {categories.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 z-20 bg-black/30 text-white p-2 rounded-full"
            aria-label="Previous"
          >
            ‹
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 z-20 bg-black/30 text-white p-2 rounded-full"
            aria-label="Next"
          >
            ›
          </button>
        </>
      )}

      {/* نقاط التقدم */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {categories.map((_, idx) => (
          <div
            key={idx}
            className={`w-2 h-2 rounded-full ${idx === activeIndex ? 'bg-white' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
};

// 🔹 المكوّن الرئيسي
const Hero = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [activeIndex, setActiveIndex] = useState(0);
  const [isManual, setIsManual] = useState(false);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const intervalRef = useRef(null);

  // 🔥 اكتشاف نوع الشاشة
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  // 🔥 تشغيل السلايدر التلقائي فقط في التصميم الأصلي (غير الموبايل)
  useEffect(() => {
    if (isMobile || isManual || categories.length <= 1) return;

    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % categories.length);
    }, 4000);

    return () => clearInterval(intervalRef.current);
  }, [isMobile, isManual, categories.length]);

  if (loading) {
    return <div className="w-full h-screen bg-white"></div>;
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

  // 🔥 إذا كان موبايل: استخدم السلايدر الجديد
  if (isMobile) {
    return (
      <MobileHeroSlider
        categories={categories}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        isManual={isManual}
        setIsManual={setIsManual}
        t={t}
        isRTL={isRTL}
      />
    );
  }

  // 🔥 إذا لم يكن موبايل: استخدم التصميم الأصلي كما هو (بدون أي تغيير)
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

              <div className="absolute inset-0 z-10 flex flex-col justify-center items-start p-8 md:p-16">
                <div
                  className="text-white pointer-events-none mb-6"
                  style={{
                    position: isActive ? "static" : "absolute",
                    top: isActive ? "auto" : "50%",
                    left: isActive
                      ? "auto"
                      : isRTL
                        ? "55%"
                        : "40%",
                    transform: isActive
                      ? "none"
                      : "translate(-50%, -50%) rotate(-90deg)",
                    transition: "all 0.6s ease-in-out",
                    width: isActive ? "100%" : "auto",
                    textAlign: isActive ? (isRTL ? "right" : "left") : "center",
                    direction: isRTL ? "rtl" : "ltr",
                  }}
                >
                  <AnimatedTitle 
                    text={isRTL && category.name_ar ? category.name_ar : category.name} 
                    isActive={isActive}  
                    isRTL={isRTL} 
                  />
                </div>

                {isActive && (
                  <motion.div
                    className="w-full max-w-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <p className="text-xl mb-6 text-white leading-relaxed drop-shadow-lg">
                      {isRTL && category.description_ar ? category.description_ar : category.description}
                    </p>
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (category.button_link) {
                          window.open(category.button_link, "_blank");
                          setIsManual(true);
                        }
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group inline-flex items-center space-x-3 px-8 py-3 border-2 border-gray-300 text-white font-semibold rounded-lg hover:border-logo transition-all duration-300"
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