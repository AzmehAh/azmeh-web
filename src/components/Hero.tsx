import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const paintCategories = [
  {
    id: "automotive",
    title: "Automotive Paints",
    description: "High-durability coatings with a glossy finish for vehicles.",
    image: "https://images.pexels.com/photos/190574/pexels-photo-190574.jpeg",
  },
  {
    id: "sports",
    title: "Sports Field Paints",
    description: "Specialized coatings designed for outdoor sports surfaces.",
    image: "https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg",
  },
  {
    id: "interior",
    title: "Interior Paints",
    description: "Elegant and modern finishes for home and office interiors.",
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
  },
];

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const navigate = useNavigate();

  const handleExplore = (id) => {
    navigate(`/products?category=${id}`);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {paintCategories.map((category, index) => {
        const isActive = activeIndex === index;

        return (
          <motion.div
            key={category.id}
            className={`relative flex-1 cursor-pointer overflow-hidden`}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            initial={{ flex: 1 }}
            animate={{ flex: isActive ? 4 : 1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {/* الخلفية مع الميلان */}
            <motion.div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${category.image})` }}
              initial={{ skewX: -5 }}
              animate={{ skewX: isActive ? 0 : -5, scale: isActive ? 1.05 : 1 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />

            {/* غطاء داكن للوضوح */}
            <motion.div
              className="absolute inset-0 bg-black/40"
              animate={{ opacity: isActive ? 0.6 : 0.4 }}
              transition={{ duration: 0.6 }}
            />

            {/* العنوان - عنوان واحد يتحرك */}
            <motion.h2
              className="absolute text-white font-bold tracking-wide drop-shadow-lg pointer-events-none"
              style={{
                writingMode: isActive ? "horizontal-tb" : "vertical-rl",
                textOrientation: "upright",
                whiteSpace: "nowrap",
              }}
              initial={false}
              animate={{
                top: isActive ? "50%" : "10%",
                left: isActive ? "50%" : "5%",
                fontSize: isActive ? "3rem" : "1.5rem",
                translateX: isActive ? "-50%" : "0%",
                translateY: isActive ? "-50%" : "0%",
              }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              {category.title}
            </motion.h2>

            {/* المحتوى النصي عند التفعيل */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  className="absolute bottom-10 left-10 right-10 z-20 bg-black bg-opacity-50 rounded-lg p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-white mb-4">{category.description}</p>
                  <button
                    onClick={() => handleExplore(category.id)}
                    className="bg-white text-black px-5 py-2 rounded-md hover:bg-gray-100 transition"
                  >
                    Explore Products
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
};

export default Hero;
