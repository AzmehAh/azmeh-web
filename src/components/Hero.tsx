import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabase";
import { useTranslation } from "react-i18next";


const AnimatedTitle = ({ text, isActive }) => {
  const letters = Array.from(text);

  const container = {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { staggerChildren: 0.03 } },
  };

  const child = {
    hidden: { y: 50, opacity: 0, rotateX: -45, skew: "10deg" },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0, 
      skew: isActive ? "0deg" : "10deg", 
      scale: isActive ? 1.1 : 1, 
    
      transition: { type: "spring", damping: 15, stiffness: 120 },
    },
  };

  return (
    <motion.div
      style={{
        display: "flex",
        perspective: "1000px",
        transformStyle: "preserve-3d",
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
        fontStyle: "italic",
        color: "white",
        textTransform: "uppercase",
        letterSpacing: window.innerWidth < 640 ? "1px" : "2px",
        cursor: "default",
        userSelect: "none",
        textAlign: "center",
        lineHeight: "1.1",
      }}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={child}
          style={{ display: "inline-block", transformOrigin: "center bottom" }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

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
          .select("id, name, name_ar, description, description_ar, image_url , button_link")
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
    if (isManual || categories.length === 0) return;

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
                marginLeft: window.innerWidth < 768 ? "-15px" : "-25px",
                marginRight: window.innerWidth < 768 ? "-15px" : "-25px",
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

           
              <div className="absolute inset-0 z-10 flex flex-col justify-center items-start p-4 sm:p-6 md:p-8 lg:p-16">
        
                <div
                  className="text-white pointer-events-none mb-3 sm:mb-4 md:mb-6 lg:mb-8"
                  style={{
                    position: isActive ? "static" : "absolute",
                    top: isActive ? "auto" : "50%",
                    left: isActive
                      ? "auto"
                      : window.innerWidth < 768
                      ? "50%"
                      : "40%",
                    transform: isActive
                      ? "none"
                      : window.innerWidth < 768
                      ? "translate(-50%, -50%) rotate(-90deg) scale(0.8)"
                      : "translate(-50%, -50%) rotate(-90deg)",
                    transition: "all 0.6s ease-in-out",
                    width: isActive ? "100%" : "auto",
                    textAlign: isActive ? "left" : "center",
                  }}
                >
                  <AnimatedTitle text={isRTL && category.name_ar ? category.name_ar : category.name} isActive={isActive} />
                </div>

         
                {isActive && (
                  <motion.div
                    className="w-full max-w-sm sm:max-w-md lg:max-w-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <p className="text-base sm:text-lg md:text-xl mb-3 sm:mb-4 md:mb-6 text-white leading-relaxed drop-shadow-lg">
                      {isRTL && category.description_ar ? category.description_ar : category.description}
                    </p>
             <motion.button
  onClick={() => {
    if (category.button_link) {
      window.open(category.button_link, "_blank"); // ✅ صار خارجي
      setIsManual(true);
    }
  }}
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  className="group inline-flex items-center space-x-2 sm:space-x-3 px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-3 border-2 border-gray-300 text-white font-semibold rounded-lg hover:border-[#2C5DB6] transition-all duration-300 text-sm sm:text-base"
>
  <span>{t('hero.readMore')}</span>
  <ArrowRight className={`w-4 h-4 sm:w-5 sm:h-5 group-hover:${isRTL ? '-translate-x-1' : 'translate-x-1'} transition-transform ${isRTL ? 'rotate-180' : ''}`} />
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