import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const navigate = useNavigate();

  const handleExplore = (id) => {
    navigate(`/products?category=${id}`);
  };

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
              {/* الصورة */}
              <motion.img
                src={category.image}
                alt={category.title}
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  filter: isActive
                    ? "brightness(0.7) contrast(1.2)"
                    : "brightness(0.5) contrast(1.1)",
                }}
                initial={{ scale: 1.1 }}
                animate={{ scale: isActive ? 1 : 1.1 }}
                transition={{ duration: 0.5 }}
              />

              {/* طبقة التدرج - تغطي كامل الصورة دايمًا */}
              <div
                className="absolute inset-0 z-5"
                style={{
                  background: isActive
                    ? "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8))"
                    : "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.9))",
                }}
              />

              {/* العناوين بشكل درج */}
              {!isActive && (
                <div
                  className="absolute left-6 top-1/2 transform -translate-y-1/2 rotate-[-90deg] origin-left z-10"
                >
                  <p className="text-white text-3xl font-bold italic tracking-wide opacity-80">
                    {category.title}
                  </p>
                </div>
              )}

              {/* العنوان + المحتوى عند الفتح */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 flex flex-col justify-center items-center text-center p-12 z-20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <h2 className="text-5xl font-extrabold italic text-white mb-6 drop-shadow-lg">
                    {category.title}
                  </h2>
                  <p className="text-xl text-white mb-6 max-w-lg drop-shadow-lg bg-black bg-opacity-40 p-4 rounded-lg">
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
