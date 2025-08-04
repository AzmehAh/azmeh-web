import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const style = `
.typing-effect {
  overflow: hidden;
  white-space: nowrap;
  animation: typing 2s steps(30, end), blink-caret 0.75s step-end infinite;
}

@keyframes typing {
  from { width: 0; }
  to { width: 100%; }
}

@keyframes blink-caret {
  50% { border-color: transparent; }
}

@media (max-width: 768px) {
  .typing-effect {
    white-space: normal;
    animation: none;
  }
}
`;

const paintCategories = [
  // ... (بقية المصفوفة كما هي بدون تغيير)
];

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const navigate = useNavigate();

  const handleExplore = (id) => {
    navigate(`/products?category=${id}`);
  };

  const toggleActive = (index) => {
    setActiveIndex((current) => (current === index ? null : index));
  };

  return (
    <>
      <style>{style}</style>
      <div className="relative w-full h-screen overflow-hidden flex">
        {paintCategories.map((category, index) => {
          const isActive = activeIndex === index;

          return (
            <motion.div
              key={category.id}
              onClick={() => toggleActive(index)}
              className="relative h-full cursor-pointer select-none overflow-hidden"
              style={{
                flex: isActive ? 4 : 1,
                transition: "flex 0.5s ease",
              }}
            >
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover object-center absolute inset-0 pointer-events-none"
                loading="lazy"
                draggable={false}
              />

              {isActive && (
                <div className="absolute inset-0 bg-black bg-opacity-60 transition-opacity duration-300" />
              )}

              <div
                className={`absolute z-10 top-1/2 right-8 transform -translate-y-1/2 w-[80%] text-white ${
                  isActive ? "block pointer-events-auto" : "hidden pointer-events-none"
                }`}
                style={{ textShadow: "0 0 8px rgba(0,0,0,0.8)" }}
              >
                <h2 className="text-3xl font-extrabold mb-2">{category.title}</h2>
                <p className={`mb-6 ${isActive ? "typing-effect" : ""}`}>
                  {category.description}
                </p>
                <div className="flex items-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleExplore(category.id);
                    }}
                    className="bg-white text-black px-5 py-2 rounded shadow hover:bg-gray-200 transition"
                  >
                    Explore Products
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </>
  );
};

export default Hero;