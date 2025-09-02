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
    description: "Elegant and modern finishes for home and office interi ors.",
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

// مكون العنوان المعدل بنمط مائل وبارز
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
      rotateX: -90,
      skew: "20deg",
    },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      skew: isActive ? "0deg" : "15deg", // تأثير مائل عندما لا يكون نشطاً
      scale: isActive ? 1.2 : 1,
      textShadow: isActive 
        ? "0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.5)" 
        : "0 0 5px rgba(255,255,255,0.5)",
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
        perspective: "1000px",
        transformStyle: "preserve-3d",
        fontSize: isActive ? "4.5rem" : "2.8rem",
        fontWeight: "900",
        fontStyle: "italic",
        color: "white",
        textTransform: "uppercase",
        letterSpacing: "1px",
        cursor: "default",
        userSelect: "none",
        textAlign: "center",
        lineHeight: "1.1",
      }}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={child}
          style={{ 
            display: "inline-block",
            transformOrigin: "center bottom"
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
    <div className="relative w-full h-screen overflow-hidden ">
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

              {/* طبقة تدرج لوني لتحسين قراءة النص */}
              <div 
                className="absolute inset-0"
                style={{
                  background: isActive
                    ? "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%)"
                    : "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.8) 100%)"
                }}
              />

              {/* العنوان المعدل بنمط مائل وبارز */}
          {/* العنوان المعدل بنمط مائل وأفقي عند الفتح */}
<div
  className="absolute text-white pointer-events-none z-10"
  style={{
    top: "50%",
    left: "50%",
    transform: isActive
      ? "translate(-50%, -50%) rotate(0deg)" // عند الفتح يصير أفقي
      : "translate(-50%, -50%) rotate(-65deg)", // قبل الفتح مايل
    transition: "all 0.6s ease-in-out",
    width: isActive ? "120%" : "100%", // مساحة أكبر عند الفتح
    textAlign: "center",
    whiteSpace: "nowrap",
    lineHeight: isActive ? "1.4" : "1.1", // line-height أكبر عند الفتح
    padding: isActive ? "20px" : "0px", // مساحة إضافية عند الفتح
  }}
>
  <AnimatedTitle text={category.title} isActive={isActive} />
</div>


              {/* المحتوى النصي */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 flex flex-col justify-center items-center mt-40 p-12 z-20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <p className="text-xl text-white mb-6 max-w-lg text-center drop-shadow-lg  bg-opacity-40 p-4 rounded-lg">
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