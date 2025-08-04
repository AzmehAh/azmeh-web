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
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);

  const handleNavigate = (id) => {
    navigate(`/products?category=${id}`);
  };

  return (
    <div className="w-full h-screen overflow-hidden flex flex-row">
      {paintCategories.map((category, index) => (
        <motion.div
          key={category.id}
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => setHovered(null)}
          className="relative h-full flex-1 group transition-all duration-500 ease-in-out cursor-pointer"
          style={{
            transform: hovered === index ? "skewY(0deg)" : "skewY(-3deg)",
            zIndex: hovered === index ? 10 : 1,
          }}
        >
          <img
            src={category.image}
            alt={category.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div
            className={`absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-start p-8 transition-opacity duration-500 ${
              hovered === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">
              {category.title}
            </h2>
            <p className="text-white text-lg mb-6 max-w-md drop-shadow">
              {category.description}
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNavigate(category.id);
              }}
              className="bg-white text-black font-semibold px-6 py-2 rounded shadow hover:bg-gray-200 transition"
            >
              Explore Products
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Hero;
