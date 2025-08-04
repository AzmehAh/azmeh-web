import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

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
            className="relative h-full cursor-pointer select-none"
            layout
            onClick={() => toggleActive(index)}
            style={{
              flex: isActive ? 4 : 1,
              // إزالة clipPath تماما
              backgroundImage: `url(${category.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "relative",
              margin: 0,
              padding: 0,
              
              overflow: 'hidden',
            }}
           
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Overlay */}
            <motion.div
              className="absolute inset-0"
              animate={{ backgroundColor: isActive ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.3)" }}
              transition={{ duration: 0.5 }}
            />

            <AnimatePresence>
              {isActive && (
                <motion.div
                  className="absolute top-1/2 right-8 transform -translate-y-1/2 w-[80%] text-white z-10 flex flex-col justify-center"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.1 }}
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
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
};

export default Hero;