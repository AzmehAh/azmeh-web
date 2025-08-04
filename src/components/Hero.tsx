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
  className="w-full h-full object-cover object-center absolute inset-0 pointer-events-none hover:scale-100"
  loading="lazy"
  draggable={false}
/>


            {/* غطاء داكن فقط عندما يكون العنصر مفعّل */}
            {isActive && (
              <div className="absolute inset-0 bg-black bg-opacity-60 transition-opacity duration-300" />
            )}

            {/* المحتوى النصي - يظهر فقط عند التفعيل */}
           <div
  className={`absolute z-10 top-1/2 right-8  w-[80%] text-white ${
    isActive ? "block pointer-events-auto" : "hidden pointer-events-none"
  }`}
  style={{ textShadow: "0 0 8px rgba(0,0,0,0.8)" }}
>


              <h2 className="text-3xl font-extrabold mb-2">{category.title}</h2>
              <p className="mb-6">{category.description}</p>
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
  );
};

export default Hero;
