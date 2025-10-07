import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion, useDragControls } from "framer-motion";
import { supabase } from "../lib/supabase";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const [categories, setCategories] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isManual, setIsManual] = useState(false);
  const navigate = useNavigate();
  const dragControls = useDragControls();
  const containerRef = useRef(null);

  // جلب البيانات من Supabase
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("id", { ascending: true });
      if (!error && data) setCategories(data);
    };
    fetchData();
  }, []);

  // التبديل التلقائي بين الشرائح
  useEffect(() => {
    if (isManual) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % categories.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [categories.length, isManual]);

  // السحب في الموبايل
  const handleDragEnd = (event, info) => {
    if (info.offset.x < -50) {
      // سحب لليسار
      setActiveIndex((prev) => (prev + 1) % categories.length);
      setIsManual(true);
    } else if (info.offset.x > 50) {
      // سحب لليمين
      setActiveIndex((prev) =>
        prev === 0 ? categories.length - 1 : prev - 1
      );
      setIsManual(true);
    }
  };

  if (!categories.length) return null;

  return (
    <section className="relative w-full h-screen overflow-hidden" ref={containerRef}>
      <div className="absolute inset-0 bg-black/30 z-[1]" />

      <div className="flex h-full relative overflow-hidden">
        {categories.map((category, index) => {
          const isActive = activeIndex === index;
          const isMobile = window.innerWidth < 768;

          return (
            <motion.div
              key={category.id}
              className={`relative h-full w-full ${
                isMobile ? "flex-shrink-0" : "cursor-pointer"
              }`}
              drag={isMobile ? "x" : false}
              dragControls={dragControls}
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
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

              {/* المحتوى */}
              {isActive && (
                <div className="absolute inset-0 z-10 flex flex-col justify-center items-start px-6 sm:px-12 text-white">
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-3xl sm:text-5xl font-extrabold mb-4 drop-shadow-lg leading-tight"
                    dir={isRTL ? "rtl" : "ltr"}
                  >
                    {isRTL && category.name_ar
                      ? category.name_ar
                      : category.name}
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
                        isRTL
                          ? "rotate-180 group-hover:-translate-x-1"
                          : "group-hover:translate-x-1"
                      }`}
                    />
                  </motion.button>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Hero;
