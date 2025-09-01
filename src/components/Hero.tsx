import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const paintCategories = [
  {
    id: "automotive",
    title: "Automotive",
    description: "High-durability coatings with a glossy finish for vehicles.",
    image: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
    activeImage: "https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg"
  },
  {
    id: "sports",
    title: "Sports Field",
    description: "Specialized coatings designed for outdoor sports surfaces.",
    image: "https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg",
    activeImage: "https://images.pexels.com/photos/8274/sport.jpg"
  },
  {
    id: "interior",
    title: "Interior",
    description: "Elegant and modern finishes for home and office interiors.",
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
    activeImage: "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg"
  },
  {
    id: "exterior",
    title: "Exterior",
    description: "Weather-resistant coatings for long-term exterior protection.",
    image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
    activeImage: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg"
  },
  {
    id: "industrial",
    title: "Industrial",
    description: "Tough coatings for factories and industrial environments.",
    image: "https://images.pexels.com/photos/209251/pexels-photo-209251.jpeg",
    activeImage: "https://images.pexels.com/photos/450035/pexels-photo-450035.jpeg"
  },
];

// مكون العنوان المتحرك المعدل
const AnimatedTitle = ({ text, isActive }) => {
  const letters = Array.from(text);

  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
      },
    },
  };

  const child = {
    hidden: {
      y: 100,
      opacity: 0,
      scale: 2,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200
      }
    },
  };

  return (
    <motion.div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        perspective: "1000px",
      }}
      variants={container}
      initial="hidden"
      animate={isActive ? "visible" : "hidden"}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={child}
          style={{
            display: "inline-block",
            fontSize: isActive ? "5rem" : "1.8rem",
            fontWeight: "900",
            color: "white",
            textShadow: "2px 2px 8px rgba(0,0,0,0.7)",
            textTransform: "uppercase",
            letterSpacing: isActive ? "2px" : "1px",
            transformOrigin: "center bottom",
          }}
          aria-hidden="true"
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

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
              className={`relative h-full cursor-pointer ${
                isActive ? "flex-grow" : "flex-shrink"
              }`}
              initial={{ flex: 1 }}
              animate={{
                flex: isActive ? 5 : 1,
              }}
              transition={{
                duration: 0.7,
                ease: "easeInOut",
              }}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <motion.img
                src={isActive ? category.activeImage || category.image : category.image}
                alt={category.title}
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  filter: isActive ? "brightness(0.7)" : "brightness(0.5)",
                }}
                initial={{ scale: 1.1 }}
                animate={{ scale: isActive ? 1 : 1.1 }}
                transition={{ duration: 0.7 }}
              />
              
              {/* طبقة تظليل إضافية */}
              <div className="absolute inset-0 bg-black opacity-30"></div>

              {/* العنوان المتحرك في المركز */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <AnimatedTitle text={category.title} isActive={isActive} />
              </div>

              {/* المحتوى الإضافي يظهر فقط عند التفعيل */}
              {isActive && (
                <motion.div
                  className="absolute inset-x-0 bottom-0 flex flex-col justify-center items-center p-8 z-20 bg-gradient-to-t from-black/70 to-transparent"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <p className="text-xl text-white mb-6 max-w-lg text-center drop-shadow-lg">
                    {category.description}
                  </p>
                  <button
                    onClick={() => handleExplore(category.id)}
                    className="bg-white text-black px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors shadow-lg"
                  >
                    Explore Products
                  </button>
                </motion.div>
              )}

              {/* العنوان الصغير في الزاوية عندما لا يكون نشطًا */}
              {!isActive && (
                <motion.div 
                  className="absolute top-10 left-6 z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-white text-lg font-bold drop-shadow-md">
                    {category.title}
                  </h3>
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