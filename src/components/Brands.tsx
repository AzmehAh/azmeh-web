import React, { useRef, useEffect, useState } from "react";

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

  const containerRef = useRef(null);
  const [repeatedBrands, setRepeatedBrands] = useState(brands);

  // حساب عدد التكرارات بناءً على عرض الشاشة
  useEffect(() => {
    const updateRepeat = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;
      const brandWidth = 32 + 24; // w-32 + mx-6
      const minRepeat = Math.ceil(containerWidth / brandWidth);
      // نكرر العناصر لضمان تغطية كاملة + إضافية للتمرير
      const repeated = Array(Math.max(minRepeat, 3))
        .fill(brands)
        .flat();
      setRepeatedBrands(repeated);
    };

    updateRepeat();
    window.addEventListener("resize", updateRepeat);
    return () => window.removeEventListener("resize", updateRepeat);
  }, [brands]);

  return (
    <section className="py-20 bg-gray-50">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          Trusted by Leading Brands
        </h2>
      </div>

      <div ref={containerRef} className="relative w-full overflow-hidden">
        <div className="flex animate-scroll">
          {repeatedBrands.map((brand, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-32 h-20 flex items-center justify-center mx-6 cursor-pointer transition-transform duration-300 hover:scale-110"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll {
            display: flex;
            animation: scroll 25s linear infinite;
          }
        `}
      </style>
    </section>
  );
};

export default Brands;
