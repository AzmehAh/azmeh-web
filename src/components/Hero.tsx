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

// مكون العنوان المتدرج للكلمات
const AnimatedTitle = ({ text, isActive }) => {
  const words = text.split(" "); // تقسيم النص إلى كلمات

  return (
    <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", perspective: "1000px" }}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ y: 50, opacity: 0, rotateX: -45 }}
          animate={{
            y: 0,
            opacity: 1,
            rotateX: 0,
            scale: isActive ? 1.3 : 1,
            textShadow: isActive
              ? "0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.5)"
              : "0 0 5px rgba(255,255,255,0.5)",
          }}
          transition={{ type: "spring", stiffness: 120, damping: 12, delay: index * 0.1 }}
          style={{
            display: "inline-block",
            fontSize: isActive ? "4.5rem" : "3rem",
            fontWeight: 900,
            fontStyle: "italic",
            color: "white",
            margin: "0 5px",
            transformOrigin: "center bottom",
          }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const navigate = useNavigate();

  const handleExplore = (id) => navigate(`/products?category=${id}`);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <div className="flex h-full">
        {paintCategories.map((category, index) => {
          const isActive = activeIndex === index;

          return (
            <motion.div
              key={category.id}
              className="relative h-full cursor-pointer"
              initial={{ flex: 1 }}
              animate={{
                flex: isActive ? 5 : 1,
                transform: isActive ? "rotate(0deg)" : "rotate(-5deg)",
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {/* الخلفية */}
              <motion.img
                src={category.image}
                alt={category.title}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ filter: isActive ? "brightness(0.7) contrast(1.2)" : "brightness(0.5) contrast(1.1)" }}
                initial={{ scale: 1.1 }}
                animate={{ scale: isActive ? 1 : 1.1 }}
                transition={{ duration: 0.5 }}
              />

              {/* طبقة سوداء لتوضيح النص */}
              <div
                className="absolute inset-0 bg-black"
                style={{ opacity: isActive ? 0.2 : 0.5 }}
              />

              {/* العنوان */}
              <div className="absolute w-full text-center top-1/3">
                <AnimatedTitle text={category.title} isActive={isActive} />
              </div>

              {/* المحتوى عند الفتح */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 flex flex-col justify-center items-center mt-40 p-12 z-20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <p className="text-xl text-white mb-6 max-w-lg text-center drop-shadow-lg bg-black bg-opacity-40 p-4 rounded-lg">
                    {category.description}
                  </p>
                  <button
                    onClick={() => handleExplore(category.id)}
                    className="bg-white text-black px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors text-lg shadow-lg"
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
