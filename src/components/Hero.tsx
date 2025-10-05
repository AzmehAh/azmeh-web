import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabase";
import { useTranslation } from "react-i18next";

const AnimatedTitle = ({ text, size = "large", isRTL = false }) => {
  const variants = {
    small: { opacity: 1, scale: 0.9, y: 0, transition: { duration: 0.45 } },
    large: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.55 } },
  };

  const fontSize =
    size === "large"
      ? window.innerWidth < 640
        ? "2.5rem"
        : window.innerWidth < 768
        ? "3rem"
        : "4rem"
      : window.innerWidth < 640
      ? "1.6rem"
      : window.innerWidth < 768
      ? "2rem"
      : "2.6rem";

  return (
    <motion.h1
      variants={variants}
      initial={size === "large" ? "small" : "small"}
      animate={size === "large" ? "large" : "small"}
      style={{
        fontSize,
        fontWeight: 900,
        color: "white",
        lineHeight: 1.05,
        whiteSpace: "nowrap",
        textAlign: isRTL ? "right" : "left",
        direction: isRTL ? "rtl" : "ltr",
        margin: 0,
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
      setActiveIndex((prev) => (prev + 1 < categories.length ? prev + 1 : 0));
    }, 4000);
    return () => clearInterval(intervalRef.current);
  }, [isManual, categories.length]);

  const handleExplore = (id) => {
    navigate(`/products?category=${id}`);
    setIsManual(true);
  };

  if (loading) return <div className="w-full h-screen bg-white" />;

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
              className={`relative h-full cursor-pointer ${isActive ? "flex-grow" : "flex-shrink"}`}
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
                  filter: isActive ? "brightness(0.4) contrast(1.2)" : "brightness(0.4) contrast(1.1)",
                }}
                initial={{ scale: 1.1 }}
                animate={{ scale: isActive ? 1 : 1.1 }}
                transition={{ duration: 0.5 }}
              />

              {/* overlay that keeps both rotated preview title (always present) and main content (only visible when active) */}
              <div className="absolute inset-0 z-20 pointer-events-none">
                {/* Rotated preview title (visible when NOT active) */}
                <motion.div
                  initial={false}
                  animate={
                    isActive
                      ? { opacity: 0, rotate: 0, y: -10, transition: { duration: 0.45 } }
                      : { opacity: 1, rotate: -90, y: 0, transition: { duration: 0.45 } }
                  }
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: isRTL ? undefined : window.innerWidth < 768 ? "50%" : "10%",
                    right: isRTL ? (window.innerWidth < 768 ? "50%" : "10%") : undefined,
                    transformOrigin: "center center",
                    transform: isActive ? "translateY(-50%)" : "translate(-50%, -50%) rotate(-90deg)",
                    pointerEvents: "none",
                    width: isActive ? "100%" : "auto",
                    textAlign: isActive ? (isRTL ? "right" : "left") : "center",
                  }}
                >
                  <AnimatedTitle
                    text={isRTL && category.name_ar ? category.name_ar : category.name}
                    size={isActive ? "large" : "small"}
                    isRTL={isRTL}
                  />
                </motion.div>

                {/* Main content (title big + description + button) - pointer events enabled here */}
                <motion.div
                  className="absolute inset-0 z-30 flex flex-col justify-center px-6 sm:px-12 lg:px-20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  style={{
                    direction: isRTL ? "rtl" : "ltr",
                    alignItems: isRTL ? "flex-end" : "flex-start",
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                >
                  {/* show big title only when active (it is animated) */}
                  {isActive && (
                    <>
                      <AnimatedTitle
                        text={isRTL && category.name_ar ? category.name_ar : category.name}
                        size="large"
                        isRTL={isRTL}
                      />

                      <p className="text-base sm:text-lg md:text-xl mb-4 sm:mb-5 md:mb-6 text-white leading-relaxed drop-shadow-lg max-w-xl">
                        {isRTL && category.description_ar ? category.description_ar : category.description}
                      </p>

                      <motion.button
                        onClick={() => {
                          if (category.button_link) {
                            window.open(category.button_link, "_blank");
                            setIsManual(true);
                          } else {
                            handleExplore(category.id);
                          }
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="group inline-flex items-center space-x-2 sm:space-x-3 px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-3 border-2 border-gray-300 text-white font-semibold rounded-lg hover:border-[#2C5DB6] transition-all duration-300 text-sm sm:text-base"
                        style={{ pointerEvents: "auto" }}
                      >
                        <span>{t("hero.readMore")}</span>
                        <ArrowRight
                          className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform ${
                            isRTL ? "rotate-180 -translate-x-1 group-hover:-translate-x-2" : "translate-x-1 group-hover:translate-x-2"
                          }`}
                        />
                      </motion.button>
                    </>
                  )}
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Hero;
