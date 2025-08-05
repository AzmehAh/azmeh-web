import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const paintCategories = [
  {
    id: "automotive",
    title: "Automotive",
    description: "High-durability coatings with a glossy finish for vehicles.",
    image: "https://images.pexels.com/photos/190574/pexels-photo-190574.jpeg",
  },
  {
    id: "sports",
    title: "Sports Field ",
    description: "Specialized coatings designed for outdoor sports surfaces.",
    image: "https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg",
  },
  {
    id: "interior",
    title: "Interior ",
    description: "Elegant and modern finishes for home and office interiors.",
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
  },
  {
    id: "exterior",
    title: "Exterior ",
    description: "Weather-resistant coatings for long-term exterior protection.",
    image: "https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg",
  },
  {
    id: "industrial",
    title: "Industrial ",
    description: "Tough coatings for factories and industrial environments.",
    image: "https://images.pexels.com/photos/209251/pexels-photo-209251.jpeg",
  },
  {
    id: "wood",
    title: "Wood ",
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
              {/* صورة الخلفية */}
              <motion.img
                src={category.image}
                alt={category.title}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ scale: 1.1 }}
                animate={{ scale: isActive ? 1 : 1.1 }}
                transition={{ duration: 0.5 }}
              />

              {/* العنوان الواحد المتحرك */}
              <motion.p
                className="absolute text-white font-bold tracking-wide drop-shadow-lg whitespace-nowrap pointer-events-none"
                style={{
                  writingMode: isActive ? "horizontal-tb" : "vertical-rl",
                  textOrientation: "upright",
                  top: "45%",
                  left: isActive ? "20%" : "10%",
                  transform: isActive
                    ? "translate(-50%, -50%)"
                    : "translate(0, -50%)",
                  fontSize: isActive ? "3rem" : "1.5rem",
                  transition: "all 0.5s ease-in-out",
                }}
              >
                {category.title}
              </motion.p>

              {/* المحتوى النصي بدون العنوان */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 flex flex-col justify-center items-start mt-40 p-12 z-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {/* تم حذف العنوان من هنا */}
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
