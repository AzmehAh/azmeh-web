import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// بيانات الأقسام
const paintCategories = [
  {
    id: "automotive",
    title: "Automotive",
    description: "High-durability coatings with a glossy finish for vehicles.",
    image: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
  },
  {
    id: "sports",
    title: "Sports Field",
    description: "Specialized coatings designed for outdoor sports surfaces.",
    image: "https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg",
  },
  {
    id: "interior",
    title: "Interior",
    description: "Elegant and modern finishes for home and office interiors.",
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
  },
  {
    id: "exterior",
    title: "Exterior",
    description: "Weather-resistant coatings for long-term exterior protection.",
    image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
  },
  {
    id: "industrial",
    title: "Industrial",
    description: "Tough coatings for factories and industrial environments.",
    image: "https://images.pexels.com/photos/209251/pexels-photo-209251.jpeg",
  },
];

// مكون يعرض النص عموديًا ومائلًا وكبيرًا
const VerticalTitle = ({ text }) => {
  return (
    <div
      style={{
        writingMode: "vertical-rl", // نص عمودي من الأسفل للأعلى
        textOrientation: "upright", // يبقي الحروف بشكل طبيعي
        transform: "rotate(-10deg)", // ميل بسيط
        fontSize: "3rem",
        fontWeight: "bold",
        fontStyle: "italic",
        color: "white",
        textShadow: "2px 2px 5px rgba(0,0,0,0.7)",
        userSelect: "none",
        whiteSpace: "nowrap",
      }}
    >
      {text}
    </div>
  );
};

// المكون الرئيسي
const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const navigate = useNavigate();

  const handleExplore = (id) => {
    navigate(`/products?category=${id}`);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="flex h-full">
        {paintCategories.map((category, index) => {
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
                transform: isActive ? "rotate(0deg)" : "rotate(-5deg)",
                marginLeft: "-25px",
                marginRight: "-25px",
              }}
              style={{
                transformOrigin: "center center",
              }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {/* الخلفية */}
              <motion.img
                src={category.image}
                alt={category.title}
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  filter: isActive ? "brightness(0.6)" : "brightness(0.8)",
                }}
                initial={{ scale: 1.1 }}
                animate={{ scale: isActive ? 1 : 1.1 }}
                transition={{ duration: 0.5 }}
              />

              {/* العنوان العمودي الكبير */}
              <div
                className="absolute pointer-events-none"
                style={{
                  top: "50%",
                  left: "10%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 10,
                }}
              >
                <VerticalTitle text={category.title} />
              </div>

              {/* المحتوى يظهر عند التفعيل */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 flex flex-col justify-center items-start mt-40 p-12 z-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-xl text-white mb-6 max-w-lg drop-shadow-lg">
                    {category.description}
                  </p>
                  <button
                    onClick={() => handleExplore(category.id)}
                    className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                  >
                    Explore Products
                  </button>
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
