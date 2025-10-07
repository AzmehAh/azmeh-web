import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../lib/supabase";
import { useTranslation } from "react-i18next";

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
      className="hero-title"
      style={{
        textAlign: isRTL ? "right" : "left",
        direction: isRTL ? "rtl" : "ltr",
      }}
    >
      {text}
    </motion.h1>
  );
};

const Hero = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [activeIndex, setActiveIndex] = useState(0);
  const [isManual, setIsManual] = useState(false);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const intervalRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // الكشف عن حجم الشاشة
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleExplore = (id) => {
    navigate(`/products?category=${id}`);
    setIsManual(true);
  };

  // معالجة السحب باللمس
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const diff = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) {
        // سحب لليسار - التالي
        handleNext();
      } else {
        // سحب لليمين - السابق
        handlePrev();
      }
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const handleNext = () => {
    setActiveIndex(prev => 
      prev + 1 < categories.length ? prev + 1 : 0
    );
    setIsManual(true);
  };

  const handlePrev = () => {
    setActiveIndex(prev => 
      prev - 1 >= 0 ? prev - 1 : categories.length - 1
    );
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

  useEffect(() => {
    if (isManual || categories.length === 0 || isMobile) return;

    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) =>
        prev + 1 < categories.length ? prev + 1 : 0
      );
    }, 4000);

    return () => clearInterval(intervalRef.current);
  }, [isManual, categories.length, isMobile]);

  if (loading) {
    return (
      <div className="w-full h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
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

  // تصميم الجوال - سلايدر
  if (isMobile) {
    return (
      <div className="relative w-full h-screen overflow-hidden mt-16">
        <div 
          className="relative w-full h-full"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence initial={false}>
            <motion.div
              key={activeIndex}
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <div className="relative w-full h-full">
                <img
                  src={categories[activeIndex].image_url}
                  alt={categories[activeIndex].name}
                  className="w-full h-full object-cover"
                  style={{ filter: "brightness(0.5) contrast(1.2)" }}
                />
                
                <div className="absolute inset-0 z-10 flex flex-col justify-center items-start p-6">
                  <div className="w-full text-center mb-6">
                    <AnimatedTitle 
                      text={isRTL && categories[activeIndex].name_ar ? 
                        categories[activeIndex].name_ar : categories[activeIndex].name} 
                      isActive={true}  
                      isRTL={isRTL} 
                    />
                  </div>

                  <div className="w-full max-w-full px-4">
                    <p className="text-lg mb-6 text-white leading-relaxed text-center drop-shadow-lg">
                      {isRTL && categories[activeIndex].description_ar ? 
                        categories[activeIndex].description_ar : categories[activeIndex].description}
                    </p>
                    
                    <div className="flex justify-center">
                      <motion.button
                        onClick={() => {
                          if (categories[activeIndex].button_link) {
                            window.open(categories[activeIndex].button_link, "_blank");
                          } else {
                            handleExplore(categories[activeIndex].id);
                          }
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group inline-flex items-center space-x-3 px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-300"
                      >
                        <span>{t('hero.readMore')}</span>
                        <ArrowRight 
                          className={`w-5 h-5 group-hover:${isRTL ? '-translate-x-1' : 'translate-x-1'} transition-transform ${isRTL ? 'rotate-180' : ''}`} 
                        /> 
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* أزرار التنقل */}
          {categories.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-50 text-white p-2 rounded-full"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-50 text-white p-2 rounded-full"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* النقاط الإرشادية */}
          {categories.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
              {categories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveIndex(index);
                    setIsManual(true);
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex ? 'bg-white' : 'bg-gray-400'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // تصميم سطح المكتب (يبقى كما هو مع تحسينات طفيفة)
  return (
    <div className="relative w-full h-screen overflow-hidden mt-20 md:mt-0">
      <div className="flex h-full">
        {categories.map((category, index) => {
          const isActive = activeIndex === index;

          return (
            <motion.div
              key={category.id}
              className={`relative h-full cursor-pointer ${
                isActive ? "flex-grow" : "flex-shrink-0"
              }`}
              initial={{ flex: 1 }}
              animate={{
                flex: isActive ? 5 : 1,
              }}
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
                
                {/* العنوان */}
                <div
                  className="text-white pointer-events-none mb-6 lg:mb-8"
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

                {/* الشرح */}
                {isActive && (
                  <motion.div
                    className="w-full max-w-md lg:max-w-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <p className="text-xl mb-6 text-white leading-relaxed drop-shadow-lg">
                      {isRTL && category.description_ar ? category.description_ar : category.description}
                    </p>
                    <motion.button
                      onClick={() => {
                        if (category.button_link) {
                          window.open(category.button_link, "_blank");
                          setIsManual(true);
                        }
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group inline-flex items-center space-x-3 px-8 py-3 border-2 border-gray-300 text-white font-semibold rounded-lg hover:border-white transition-all duration-300"
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