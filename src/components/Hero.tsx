import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const paintCategories = [
  {
    id: "automotive",
    title: "Automotive",
    description: "High-durability coatings with a glossy finish for vehicles.",
    image:
      "https://i.postimg.cc/76zbvLXr/Whats-App-Image-2025-08-05-at-4-00-04-PM.jpg",
    activeImage:
      "https://i.postimg.cc/76zbvLXr/Whats-App-Image-2025-08-05-at-4-00-04-PM.jpg",
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
    image: "https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg",
  },
  {
    id: "industrial",
    title: "Industrial",
    description: "Tough coatings for factories and industrial environments.",
    image: "https://images.pexels.com/photos/209251/pexels-photo-209251.jpeg",
  },
  {
    id: "wood",
    title: "Wood",
    description: "Protective and decorative finishes for wooden surfaces.",
    image: "https://images.pexels.com/photos/2440471/pexels-photo-2440471.jpeg",
  },
];

// مكون الهيرو
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
              className="relative h-full cursor-pointer overflow-hidden"
              initial={{ flex: 1 }}
              animate={{ flex: isActive ? 5 : 1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {/* الصورة */}
              <motion.img
                src={
                  isActive ? category.activeImage || category.image : category.image
                }
                alt={category.title}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                  isActive ? "clip-no-slant" : "clip-slant-left"
                }`}
                initial={{ scale: 1.1 }}
                animate={{ scale: isActive ? 1 : 1.1 }}
                transition={{ duration: 0.5 }}
              />

              {/* النص القطري وقت الميلان */}
              {!isActive && (
                <h2 className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-8xl font-bold transform rotate-[-45deg] opacity-80 tracking-widest">
                    {category.title}
                  </span>
                </h2>
              )}

              {/* المحتوى وقت الفتح */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 flex flex-col justify-center items-start p-12 z-20 bg-black/40"
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
