import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

const BrandsSection = () => {
  const isRTL = false; // false = LTR, true = RTL

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

  const duplicated = [...brands, ...brands, ...brands];

  const cardWidth = 128;
  const gap = 24;
  const animationDuration = 20;
  const totalWidthOriginal = brands.length * (cardWidth + gap);
  const totalWidth = duplicated.length * (cardWidth + gap);
  const direction = isRTL ? 1 : -1;

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const animate = (currentTime: number) => {
    if (!lastTime.current) lastTime.current = currentTime;

    if (!isHovered.current && !isDragging.current) {
      const deltaTime = currentTime - lastTime.current;
      const deltaProgress = deltaTime / (animationDuration * 1000);

      let currentX = x.get();
      let newX = currentX + direction * deltaProgress * totalWidthOriginal;

      if (direction < 0) {
        if (Math.abs(newX) >= totalWidthOriginal) newX += totalWidthOriginal;
        else if (newX > 0) newX -= totalWidthOriginal;
      } else {
        if (newX >= totalWidthOriginal) newX -= totalWidthOriginal;
        else if (newX < 0) newX += totalWidthOriginal;
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

  const handleMouseEnter = () => (isHovered.current = true);
  const handleMouseLeave = () => {
    isHovered.current = false;
    lastTime.current = performance.now();
  };
  const handleDragStart = () => (isDragging.current = true);
  const handleDragEnd = () => {
    isDragging.current = false;
    lastTime.current = performance.now();

    let currentX = x.get();
    if (direction < 0) {
      if (Math.abs(currentX) >= totalWidthOriginal) x.set(currentX + totalWidthOriginal);
      else if (currentX > 0) x.set(currentX - totalWidthOriginal);
    } else {
      if (currentX >= totalWidthOriginal) x.set(currentX - totalWidthOriginal);
      else if (currentX < 0) x.set(currentX + totalWidthOriginal);
    }
  };

  const dragConstraints = isRTL
    ? { left: 0, right: totalWidth - windowWidth }
    : { left: -totalWidth + windowWidth, right: 0 };

  return (
    <section className="bg-gray-50 pt-24 pb-24 relative">
      <div className="pt-10 max-w-screen-2xl mx-auto relative">
        {/* عنوان السكشن */}
        <h2 className="text-4xl font-bold text-center mb-6">
           Brands
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Here are some of our trusted partners.
        </p>

        {/* السكشن المتحرك */}
      <div
  className="relative overflow-x-clip mt-12 max-w-[90%] mx-auto"
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
        className="flex-shrink-0 w-32 h-20 flex items-center justify-center"
      >
        <img
          src={brand.logo}
          alt={brand.name}
          className="w-full h-full object-contain"
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
