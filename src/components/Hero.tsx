import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
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
        textAlign: isRTL ? "right" : "left", // ⭐ تعديل مهم للغة العربية
        lineHeight: "1.1",
        direction: isRTL ? "rtl" : "ltr", // ⭐ ضبط اتجاه النص
        whiteSpace: "nowrap",
        transform: isRTL && !isActive ? "rotate(-90deg) translateX(50%)" : "none", // ⭐ تعديل لجعل النص العربي يظهر بشكل مائل لكن قابل للقراءة
        transformOrigin: isRTL && !isActive ? "top right" : "center center", // ⭐ تعديل لمركز التدوير
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
   <div className="flex h-full">
  {categories.map((category, index) => {
    const isActive = activeIndex === index;
    const isMobile = window.innerWidth < 768;

    return (
      <motion.div
        key={category.id}
        className={`relative h-full w-full ${
          isMobile ? "flex-shrink-0" : "cursor-pointer"
        }`}
        initial={{ opacity: 0 }}
        animate={{
          opacity: isActive ? 1 : 0,
          x: isMobile ? (isActive ? 0 : "100%") : 0,
          flex: isMobile ? 1 : isActive ? 5 : 1,
          rotate: isMobile ? 0 : isActive ? 0 : 5,
          marginLeft: isMobile ? 0 : "-25px",
          marginRight: isMobile ? 0 : "-25px",
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{
          position: isMobile ? "absolute" : "relative",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        onClick={() => {
          if (!isMobile) {
            setActiveIndex(index);
            setIsManual(true);
          }
        }}
      >
        {/* الخلفية */}
        <motion.img
          src={category.image_url}
          alt={category.name}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            filter: "brightness(0.45) contrast(1.15)",
          }}
          initial={{ scale: 1.1 }}
          animate={{ scale: isActive ? 1 : 1.1 }}
          transition={{ duration: 0.5 }}
        />

        {/* النصوص */}
        {isActive && (
          <div className="absolute inset-0 z-10 flex flex-col justify-center items-start px-6 sm:px-10 text-white">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl sm:text-5xl font-extrabold mb-4 drop-shadow-lg"
              dir={isRTL ? "rtl" : "ltr"}
            >
              {isRTL && category.name_ar ? category.name_ar : category.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-base sm:text-lg mb-6 max-w-md leading-relaxed drop-shadow-md"
              dir={isRTL ? "rtl" : "ltr"}
            >
              {isRTL && category.description_ar
                ? category.description_ar
                : category.description}
            </motion.p>

            <motion.button
              onClick={() => {
                if (category.button_link) {
                  window.open(category.button_link, "_blank");
                  setIsManual(true);
                }
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center space-x-2 px-6 py-3 border-2 border-gray-300 text-white font-semibold rounded-lg hover:border-logo transition-all text-sm sm:text-base"
            >
              <span>{t("hero.readMore")}</span>
              <ArrowRight
                className={`w-5 h-5 transition-transform ${
                  isRTL ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"
                }`}
              />
            </motion.button>
          </div>
        )}
      </motion.div>
    );
  })}
</div>

  );
};

export default Hero; 