import React, { useState } from "react";
import { motion } from "framer-motion";
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

  return (
    <div className="relative w-full h-screen overflow-hidden flex">
      {paintCategories.map((category, index) => {
        const isActive = activeIndex === index;
        return (
          <motion.div
            key={category.id}
            className="relative h-full cursor-pointer"
            onClick={() => setActiveIndex(index)}
            style={{
              flex: isActive ? "4" : "1",
              clipPath: "polygon(0% 0%, 90% 0%, 100% 100%, 10% 100%)", // ميلان باتجاه اليمين
              backgroundImage: `url(${category.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* التعتيم */}
            <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-50 transition-all duration-300" />
            {/* المحتوى */}
            <div
              className="absolute bottom-8 left-8 right-8 text-white transition-opacity duration-300"
              style={{ opacity: isActive ? 1 : 0 }}
            >
              <h2 className="text-2xl font-bold mb-2">{category.title}</h2>
              <p className="mb-4">{category.description}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleExplore(category.id);
                }}
                className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition"
              >
                Explore Products
              </button>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default Hero;