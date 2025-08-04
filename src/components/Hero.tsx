import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// CSS لتأثير التيبنج (typing effect)
const style = ` 
.typing-effect {
  overflow: hidden; /* يمنع ظهور النص خارج الإطار */
  white-space: nowrap; /* يمنع التفاف النص */
  border-right: 2px solid white; /* مؤشر الكتابة */
  animation: typing 2s steps(30, end), blink-caret 0.75s step-end infinite;
  width: fit-content;
  display: inline-block;
}

@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%; 
  }
}

@keyframes blink-caret {
  50% {
    border-color: transparent;
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
    image: "https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg",
  },
  {
    id: "industrial",
    title: "Industrial Paints",
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
    <>
      {/* إضافة ستايلات CSS */}
      <style>{style}</style>

      <div className="relative w-full h-screen overflow-hidden flex">
        {paintCategories.map((category, index) => {
          const isActive = activeIndex === index;

          return (
            <motion.div
              key={category.id}
              onMouseEnter={() => setActiveIndex(index)}  // فتح عند مرور الماوس
              onMouseLeave={() => setActiveIndex(null)}   // إغلاق عند ابتعاد الماوس
              className="relative h-full cursor-pointer select-none overflow-hidden"
              style={{
                flex: isActive ? 4 : 1,
                transition: "flex 0.5s ease, transform 0.5s ease",
                transform: isActive ? "rotate(0deg)" : "rotate(-5deg)", // ميلان لليسار
                zIndex: isActive ? 10 : 1,
              }}
            >
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover object-center absolute inset-0 pointer-events-none"
                loading="lazy"
                draggable={false}
                style={{
                  transform: isActive ? "scale(1)" : "scale(1.1)",
                  transition: "transform 0.5s ease",
                }}
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

