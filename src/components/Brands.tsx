import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

const BrandsSection = () => {
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

  const x = useMotionValue(0);
  const animationRef = useRef<number>();
  const lastTime = useRef(0);

  // نكرر العناصر 3 مرات على الأقل للتمرير السلس
  const duplicated = [...brands, ...brands, ...brands];

  const cardWidth = 128; // w-32
  const gap = 24;        // mx-6
  const totalWidthOriginal = brands.length * (cardWidth + gap);
  const totalWidth = duplicated.length * (cardWidth + gap);
  const animationDuration = 20; // ثانية
  const direction = -1; // حركة من اليمين لليسار

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const animate = (currentTime: number) => {
    if (!lastTime.current) lastTime.current = currentTime;

    const deltaTime = currentTime - lastTime.current;
    const deltaProgress = deltaTime / (animationDuration * 1000);

    let currentX = x.get();
    let newX = currentX + direction * deltaProgress * totalWidthOriginal;

    // ضبط loop
    if (Math.abs(newX) >= totalWidthOriginal) {
      newX += totalWidthOriginal;
    }

    x.set(newX);
    lastTime.current = currentTime;
    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current!);
  }, []);

  return (
    <section className="py-20 bg-gray-50">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          Trusted by Leading Brands
        </h2>
      </div>

      <div className="relative overflow-hidden w-full">
        <motion.div
          className="flex"
          style={{ x, gap: `${gap}px` }}
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
    </section>
  );
};

export default BrandsSection;
