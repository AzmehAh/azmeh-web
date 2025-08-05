import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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
  {
    id: "exterior",
    title: "Exterior Paints",
    description: "Weather-resistant coatings for long-term exterior protection.",
    image: "https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg",
  },
  {
    id: "industrial",
    title: "Industrial Paints",
    description: "Tough coatings for factories and industrial environments.",
    image: "https://images.pexels.com/photos/209251/pexels-photo-209251.jpeg",
  },
  {
    id: "wood",
    title: "Wood Paints",
    description: "Protective and decorative finishes for wooden surfaces.",
    image: "https://images.pexels.com/photos/2440471/pexels-photo-2440471.jpeg",
  },
];

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
              className={`relative h-full cursor-pointer overflow-hidden transition-all duration-500 ${
                isActive ? "flex-grow" : "flex-shrink"
              }`}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              animate={{
                flex: isActive ? 5 : 1,
              }}
              transition={{
                duration: 0.6,
                ease: "easeInOut",
              }}
            >
              {/* خلفية الصورة */}
              <motion.div
                className="absolute inset-0 bg-cover bg-center transition-all duration-700"
                style={{
                  backgroundImage: `url(${category.image})`,
                  transform: isActive ? "skewX(0deg)" : "skewX(-5deg)",
                }}
              />

              {/* غطاء داكن للوضوح */}
              <div className="absolute inset-0 bg-black/40 z-10 transition-all duration-500" />

              {/* عنوان عمودي في البداية → يتحول لأفقي عند التفعيل */}
              <motion.div
                className="absolute z-20 inset-0 flex items-center justify-center"
                animate={{
                  x: isActive ? 0 : 0,
                  y: isActive ? 0 : 0,
                }}
              >
                <motion.p
                  initial={false}
                  animate={{
                    writingMode: isActive ? "horizontal-tb" : "vertical-rl",
                    rotate: isActive ? 0 : 0,
                    fontSize: isActive ? "2.5rem" : "1.25rem",
                    translateY: isActive ? "0%" : "0%",
                    translateX: isActive ? "0%" : "-30%",
                    color: "#ffffff",
                  }}
                  transition={{
                    duration: 0.6,
                    ease: "easeInOut",
                  }}
                  className="font-bold text-white tracking-wide text-center pointer-events-none"
                  style={{
                    textOrientation: "upright",
                  }}
                >
                  {category.title}
                </motion.p>
              </motion.div>

              {/* المحتوى عند التفعيل */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 z-30 flex flex-col justify-center items-start p-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
                    {category.title}
                  </h2>
                  <p className="text-lg text-white mb-6 max-w-lg drop-shadow-lg">
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
