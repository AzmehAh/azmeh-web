import React, { useRef, useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";

const Brands = () => {
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

  // تكرار العناصر لتغطية الحركة المستمرة
  const repeatedBrands = [...brands, ...brands, ...brands, ...brands];

  const x = useMotionValue(0);
  const requestRef = useRef<number>(0);

  const speed = 0.3; // سرعة الحركة (قيمة أقل = أبطأ)

  // حلقة الحركة
  const animate = (time: number) => {
    let currentX = x.get();
    currentX -= speed;

    // إعادة ضبط loop
    const totalWidth = repeatedBrands.length * (32 + 24); // w-32 + mx-6
    if (Math.abs(currentX) >= totalWidth / 2) {
      currentX += totalWidth / 2;
    }

    x.set(currentX);
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  return (
    <section className="py-20 bg-gray-50">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          Trusted by Leading Brands
        </h2>
      </div>

      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex"
          style={{
            x,
          }}
        >
          {repeatedBrands.map((brand, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-32 h-20 flex items-center justify-center mx-6"
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

export default Brands;
