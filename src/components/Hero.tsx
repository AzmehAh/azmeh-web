import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const paintCategories = [
  {
    id: "automotive",
    title: "Automotive",
    description: "High-durability coatings with a glossy finish for vehicles.",
    image: "https://i.postimg.cc/76zbvLXr/Whats-App-Image-2025-08-05-at-4-00-04-PM.jpg",
    color: "#3b82f6",
  },
  {
    id: "sports",
    title: "Sports",
    description: "Specialized coatings designed for outdoor sports surfaces.",
    image: "https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg",
    color: "#10b981",
  },
  {
    id: "interior",
    title: "Interior",
    description: "Elegant and modern finishes for home and office interiors.",
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
    color: "#f59e0b",
  },
  {
    id: "exterior",
    title: "Exterior",
    description: "Weather-resistant coatings for long-term exterior protection.",
    image: "https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg",
    color: "#ef4444",
  },
  {
    id: "industrial",
    title: "Industrial",
    description: "Tough coatings for factories and industrial environments.",
    image: "https://images.pexels.com/photos/209251/pexels-photo-209251.jpeg",
    color: "#8b5cf6",
  },
];

const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const navigate = useNavigate();

  const handleExplore = (id) => {
    navigate(`/products?category=${id}`);
  };

  return (
    <div className="relative w-full h-screen bg-gray-900 overflow-hidden">
      <div className="flex h-full">
        {paintCategories.map((category, index) => {
          const isActive = activeIndex === index;
          
          return (
            <motion.div
              key={category.id}
              className={`relative h-full cursor-pointer ${isActive ? "z-10" : "z-0"}`}
              initial={{ width: "20%" }}
              animate={{
                width: isActive ? "60%" : "20%",
              }}
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              layout
            >
              {/* الصورة مع طبقة تغطية */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1 }}
                  animate={{ scale: isActive ? 1.05 : 1 }}
                  transition={{ duration: 0.5 }}
                />
                <div 
                  className="absolute inset-0"
                  style={{ 
                    backgroundColor: category.color,
                    opacity: isActive ? 0.2 : 0.4,
                    transition: "opacity 0.3s ease"
                  }}
                />
              </div>

              {/* المحتوى */}
              <div className="absolute inset-0 flex flex-col justify-center items-center p-4 md:p-8">
                {/* العنوان */}
                <motion.h2
                  className="font-bold text-white text-2xl md:text-4xl mb-2 text-center"
                  style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}
                  initial={{ scale: 1 }}
                  animate={{ 
                    scale: isActive ? 1.1 : 1,
                    y: isActive ? -20 : 0
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {category.title}
                </motion.h2>

                {/* الوصف */}
                <AnimatePresence>
                  {isActive && (
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="text-white text-sm md:text-lg text-center max-w-md mb-6"
                    >
                      {category.description}
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* الزر */}
                <AnimatePresence>
                  {isActive && (
                    <motion.button
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 30 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      onClick={() => handleExplore(category.id)}
                      className="px-4 py-2 md:px-6 md:py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-all"
                      style={{ boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}
                    >
                      اكتشف المنتجات
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default HeroSection;