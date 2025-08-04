import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const style = `
.typing-effect {
  overflow: hidden;
  white-space: nowrap;
  animation: typing 2s steps(30, end), blink-caret 0.75s step-end infinite;
  border-right: 2px solid white;
}

@keyframes typing {
  from { width: 0; }
  to { width: 100%; }
}

@keyframes blink-caret {
  50% { border-color: transparent; }
}

/* تحسينات للشاشات المتوسطة */
@media (max-width: 1024px) {
  .typing-effect {
    white-space: normal;
    animation: none;
    border-right: none;
    font-size: 1.25rem; /* حجم خط أكبر قليلاً */
    line-height: 1.4;
  }
  .text-container {
    width: 90% !important; /* أعرض النص قليلاً */
    right: 5% !important;  /* اجعل النص أقرب للمنتصف */
    top: 50% !important;
    transform: translateY(-50%) !important;
  }
}

/* تحسينات للشاشات الصغيرة والموبايل */
@media (max-width: 640px) {
  .typing-effect {
    white-space: normal;
    animation: none;
    border-right: none;
    font-size: 1.4rem; /* خط أكبر للموبايل */
    line-height: 1.5;
  }
  .text-container {
    width: 95% !important;
    right: 2.5% !important;
    top: 55% !important;
    transform: translateY(-55%) !important;
    padding: 1rem;
    background: rgba(0,0,0,0.5);
    border-radius: 8px;
  }
  h2 {
    font-size: 1.8rem !important;
  }
  button {
    font-size: 1rem !important;
    padding: 0.75rem 1.5rem !important;
  }
}
`;

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
    image: "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg",
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
    image: "https://images.pexels.com/photos/162557/wood-grain-wood-texture-background-162557.jpeg",
  },
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
                className={`absolute z-10 top-1/2 right-8 transform -translate-y-1/2 w-[80%] text-white text-container ${
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
