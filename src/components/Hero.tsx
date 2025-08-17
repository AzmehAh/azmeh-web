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
    id: "sports",
    title: "Sports Field",
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

// مكون العنوان المتحرك حرف بحرف
const AnimatedTitle = ({ text }) => {
  return (
    <h2 className="font-bold text-5xl text-white mb-4 text-center">
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          style={{ display: "inline-block" }}
        >
          {char}
        </motion.span>
      ))}
    </h2>
  );
};

const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const navigate = useNavigate();

  const handleExplore = (id) => {
    navigate(`/products?category=${id}`);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-900">
      <style>
        {`
          .typing {
            overflow: hidden;
            white-space: nowrap;
            border-right: 2px solid white;
            animation: typing 2s steps(40, end), blink 0.7s step-end infinite;
          }

          @keyframes typing {
            from { width: 0 }
            to { width: 100% }
          }

          @keyframes blink {
            50% { border-color: transparent }
          }
        `}
      </style>

      <div className="flex h-full">
        <AnimatePresence>
          {paintCategories.map((category, index) => {
            const isActive = activeIndex === index;

            return (
              <motion.div
                key={category.id}
                className={`relative h-full cursor-pointer ${isActive ? "z-10" : "z-0"}`}
                initial={{ width: "20%" }}
                animate={{
                  width: isActive ? "60%" : "20%",
                  filter: isActive ? "brightness(1)" : "brightness(0.7)",
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                layout
              >
                {/* الصورة */}
                <motion.div
                  className="absolute inset-0 w-full h-full"
                  initial={{ scale: 1 }}
                  animate={{ scale: isActive ? 1.05 : 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30" style={{ mixBlendMode: "multiply" }} />
                </motion.div>

                {/* المحتوى */}
                <div className="absolute inset-0 flex flex-col justify-center items-center p-8">
                  {/* العنوان */}
                  <motion.div
                    className="text-white mb-4 text-center"
                    initial={{ scale: 1 }}
                    animate={{ scale: isActive ? 1.2 : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isActive ? (
                      <AnimatedTitle text={category.title} />
                    ) : (
                      <h2
                        className="font-bold text-3xl mb-2"
                        style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}
                      >
                        {category.title}
                      </h2>
                    )}
                  </motion.div>

                  {/* الوصف */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-white text-lg text-center max-w-md mb-8 typing"
                      >
                        {category.description}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* الزر */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => handleExplore(category.id)}
                        className="px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-all"
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
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HeroSection;
