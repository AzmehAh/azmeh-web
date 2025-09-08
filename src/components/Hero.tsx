import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const paintCategories = [
  {
    id: "flooring",
    title: "Flooring",
    description:
      "Durable coatings that protect and enhance wooden, concrete, and tiled floors.",
    image: "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg",
  },
  {
    id: "industrial",
    title: "Industrial",
    description:
      "Heavy-duty coatings designed for factories and industrial environments.",
    image: "https://images.pexels.com/photos/209251/pexels-photo-209251.jpeg",
  },
  {
    id: "furniture",
    title: "Furniture",
    description:
      "Protective and stylish finishes for wooden and metal furniture.",
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
  },
  {
    id: "automotive",
    title: "Automotive",
    description:
      "High-durability coatings with a glossy finish for vehicles.",
    image: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
  },
  {
    id: "protective",
    title: "Protective",
    description:
      "Weather-resistant protective coatings for buildings and outdoor structures.",
    image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
  },
];

const AnimatedTitle = ({ text, isActive }) => {
  const letters = Array.from(text);

  const container = {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { staggerChildren: 0.03 } },
  };

  const child = {
    hidden: { y: 50, opacity: 0, rotateX: -45, skew: "10deg" },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      skew: isActive ? "0deg" : "10deg",
      scale: isActive ? 1.1 : 1,
      textShadow: isActive
        ? "0 0 8px rgba(255,255,255,0.4)"
        : "0 0 3px rgba(0,0,0,0.9)",
      transition: { type: "spring", damping: 15, stiffness: 120 },
    },
  };

  return (
    <motion.div
      style={{
        display: "flex",
        flexWrap: "wrap",
        perspective: "1000px",
        transformStyle: "preserve-3d",
        fontSize: isActive ? "clamp(1.5rem, 5vw, 3rem)" : "clamp(1.2rem, 3vw, 2rem)",
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
            transformOrigin: "center bottom",
            whiteSpace: "pre",
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isManual, setIsManual] = useState(false);
  const navigate = useNavigate();
  const intervalRef = useRef(null);

  const handleExplore = (id) => {
    navigate(`/products?category=${id}`);
    setIsManual(true);
  };

  useEffect(() => {
    if (isManual) return;

    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) =>
        prev + 1 < paintCategories.length ? prev + 1 : 0
      );
    }, 4000);

    return () => clearInterval(intervalRef.current);
  }, [isManual]);

  return (
    <div className="relative w-full h-screen overflow-hidden mt-20 md:mt-0">
      <div className="flex h-full flex-wrap md:flex-nowrap">
        {paintCategories.map((category, index) => {
          const isActive = activeIndex === index;

          return (
            <motion.div
              key={category.id}
              className={`relative h-full cursor-pointer transition-all duration-500 ${
                isActive ? "flex-grow" : "flex-shrink"
              }`}
              initial={{ flex: 1 }}
              animate={{ flex: isActive ? 5 : 1 }}
              style={{ transformOrigin: "center center", margin: "0 -10px" }}
              onClick={() => {
                setActiveIndex(index);
                setIsManual(true);
              }}
            >
              <motion.img
                src={category.image}
                alt={category.title}
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  filter: isActive
                    ? "brightness(0.45) contrast(1.2)"
                    : "brightness(0.4) contrast(1.1)",
                }}
                initial={{ scale: 1.1 }}
                animate={{ scale: isActive ? 1 : 1.1 }}
                transition={{ duration: 0.5 }}
              />

              {/* محتوى الهيرو */}
              <div className="absolute inset-0 z-10 flex flex-col justify-center items-start p-2 sm:p-6 md:p-10 lg:p-16">
                <div
                  className="text-white pointer-events-none mb-4 w-full"
                  style={{
                    position: isActive ? "static" : "absolute",
                    top: isActive ? "auto" : "50%",
                    left: isActive ? "auto" : "50%",
                    transform: isActive
                      ? "none"
                      : "translate(-50%, -50%) scale(0.75)",
                    transition: "all 0.6s ease-in-out",
                    width: isActive ? "100%" : "auto",
                    textAlign: isActive ? "left" : "center",
                  }}
                >
                  <AnimatedTitle text={category.title} isActive={isActive} />
                </div>

                {isActive && (
                  <motion.div
                    className="w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <p className="text-sm sm:text-base md:text-lg mb-4 text-white leading-relaxed break-words drop-shadow-lg">
                      {category.description}
                    </p>
                    <motion.button
                      onClick={() => handleExplore(category.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group inline-flex items-center space-x-2 px-4 py-2 border-2 border-gray-300 text-white font-semibold rounded-lg hover:border-[#2C5DB6] transition-all duration-300 text-sm sm:text-base"
                    >
                      <span>READ MORE</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Hero;
