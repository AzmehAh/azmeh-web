import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

import { useTranslation } from "react-i18next";

const BrandsSection = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  const animationRef = useRef<number>();
  const x = useMotionValue(0);
  const lastTime = useRef(0);
  const isHovered = useRef(false);
  const isDragging = useRef(false);

  const brands = [
    { name: "Azmeh Paints", logo: "/images/Azmeh-Paints-Logo.png" },
    { name: "SRT", logo: "/images/SRT-.gif" },
    { name: "Original", logo: "/images/Original.gif" },
    { name: "Omegan", logo: "/images/Omegan.gif" },
    { name: "Mlonati", logo: "/images/Mlonati.gif" },
    { name: "Jupiter", logo: "/images/Jupiter.gif" },
    { name: "COPRAbEL", logo: "/images/COPRAbEL.jpg" },
    { name: "Capric", logo: "/images/Capric.gif" },
    { name: "Azur", logo: "/images/Azur-.png" },
    { name: "AlDahab", logo: "/images/AlDahab.png" },
  ];

  // تكرار العناصر عدة مرات للإنسيابية
  const repeatCount = 5;
  const duplicated = Array(repeatCount).fill(brands).flat();

  const cardWidth = 160; // عرض كل بطاقة علامة تجارية
  const gap = 32; // المسافة بين البطاقات
  const animationDuration = 25; // مدة الحركة بالثواني
  const totalWidthOriginal = brands.length * (cardWidth + gap);
  const totalWidth = duplicated.length * (cardWidth + gap);
  const direction = isRTL ? 1 : -1;

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // الحركة التلقائية مع إعادة ضبط الموضع لل-loop اللانهائي
  const animate = (currentTime: number) => {
    if (!lastTime.current) lastTime.current = currentTime;

    if (!isHovered.current && !isDragging.current) {
      const deltaTime = currentTime - lastTime.current;
      const deltaProgress = deltaTime / (animationDuration * 1000);

      let currentX = x.get();
      let newX = currentX + direction * deltaProgress * totalWidthOriginal;

      // ضبط loop بحيث يعيد القيمة عند الخروج عن طول المحتوى الأصلي
      if (direction < 0) {
        if (Math.abs(newX) >= totalWidthOriginal) {
          newX += totalWidthOriginal;
        } else if (newX > 0) {
          newX -= totalWidthOriginal;
        }
      } else {
        if (newX >= totalWidthOriginal) {
          newX -= totalWidthOriginal;
        } else if (newX < 0) {
          newX += totalWidthOriginal;
        }
      }

      x.set(newX);
    }

    lastTime.current = currentTime;
    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current!);
  }, [isRTL]);

  const handleMouseEnter = () => {
    isHovered.current = true;
  };

  const handleMouseLeave = () => {
    isHovered.current = false;
    lastTime.current = performance.now();
  };

  const handleDragStart = () => {
    isDragging.current = true;
  };

  const handleDragEnd = () => {
    isDragging.current = false;
    lastTime.current = performance.now();

    let currentX = x.get();

    if (direction < 0) {
      if (Math.abs(currentX) >= totalWidthOriginal) {
        x.set(currentX + totalWidthOriginal);
      } else if (currentX > 0) {
        x.set(currentX - totalWidthOriginal);
      }
    } else {
      if (currentX >= totalWidthOriginal) {
        x.set(currentX - totalWidthOriginal);
      } else if (currentX < 0) {
        x.set(currentX + totalWidthOriginal);
      }
    }
  };

  // ضبط dragConstraints حسب اتجاه اللغة لمنع ظهور فراغات بيضاء
  const dragConstraints = isRTL
    ? { left: 0, right: totalWidth - windowWidth }
    : { left: -totalWidth + windowWidth, right: 0 };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-screen-2xl mx-auto">
        <SectionHeading
          subtitle={t("brands.subtitle", "Our Partners")}
          title={t("brands.title", "Trusted by Leading Brands")}
          description={t("brands.description", "We collaborate with the most reputable brands in the industry")}
          centered
        />

        <div
          className="relative overflow-x-clip overflow-y-visible mt-12 w-full"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          dir={isRTL ? "rtl" : "ltr"}
        >
          <motion.div
            drag="x"
            dragConstraints={dragConstraints}
            dragElastic={0.2}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            className={`flex ${isRTL ? "flex-row-reverse" : ""}`}
            style={{
              width: `${totalWidth}px`,
              x,
              gap: `${gap}px`,
              cursor: "grab",
            }}
            whileTap={{ cursor: "grabbing" }}
          >
            {duplicated.map((brand, index) => (
              <div
                key={index}
                className="bg-white backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/40 w-40 h-32 flex-shrink-0 flex items-center justify-center"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-full h-full object-contain p-2"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;