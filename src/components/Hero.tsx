import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabase";
import { useTranslation } from "react-i18next";

const AnimatedTitle = ({ text, isActive }) => {
  const container = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, type: "spring" } },
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
        textAlign: "inherit",
        lineHeight: "1.1",
        direction: "inherit",
        whiteSpace: "nowrap",
      }}
    >
      {text}
    </motion.h1>
  );
};

const Hero = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const [activeIndex, setActiveIndex] = useState(0);
  const [isManual, setIsManual] = useState(false);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const intervalRef = useRef(null);

  useEffect(() => {
    const fetchHeroCategories = async () => {
      try {
        const { data, error } = await supabase
          .from("product_categories")
          .select(
            "id, name, name_ar, description, description_ar, image_url , button_link"
          )
          .eq("is_active", true)
          .order("sort_order", { ascending: true });

        if (error) throw error;

        const validCategories = data.filter(
          (cat) => cat.image_url && cat.description && cat.name
        );

        setCategories(validCategories);
        if (validCategories.length > 0) setActiveIndex(0);
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
    return <div className="w-full h-screen bg-white"></div>;
  }

  if (categories.length === 0) {
    return (
      <div className="relative w-full h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white text-center">
          <div className="text-2xl mb-4">
            No active categories found for Hero.
          </div>
          <div className="text-sm">
            Please add categories with image and description.
          </div>
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

              {/* ✅ المحتوى الجديد المتناسق */}
              {isActive && (
                <motion.div
                  className={`absolute inset-0 z-10 flex flex-col justify-center items-${
                    isRTL ? "end" : "start"
                  } text-${isRTL ? "right" : "left"} px-6 sm:px-12 lg:px-20`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  style={{ direction: isRTL ? "rtl" : "ltr" }}
                >
                  <AnimatedTitle
                    text={
                      isRTL && category.name_ar
                        ? category.name_ar
                        : category.name
                    }
                    isActive={isActive}
                  />

                  <p className="text-base sm:text-lg md:text-xl mb-4 sm:mb-5 md:mb-6 text-white leading-relaxed drop-shadow-lg max-w-xl">
                    {isRTL && category.description_ar
                      ? category.description_ar
                      : category.description}
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
                    className="group inline-flex items-center space-x-2 sm:space-x-3 px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-3 border-2 border-gray-300 text-white font-semibold rounded-lg hover:border-[#2C5DB6] transition-all duration-300 text-sm sm:text-base"
                  >
                    <span>{t("hero.readMore")}</span>
                    <ArrowRight
                      className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform ${
                        isRTL
                          ? "rotate-180 -translate-x-1 group-hover:-translate-x-2"
                          : "translate-x-1 group-hover:translate-x-2"
                      }`}
                    />
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Hero;
