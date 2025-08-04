import React, { useState } from "react";
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
    description: "Specialized coatings for sports surfaces.",
    image: "https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg",
  },
  {
    id: "interior",
    title: "Interior Paints",
    description: "Modern finishes for home interiors.",
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
  },
  {
    id: "exterior",
    title: "Exterior Paints",
    description: "Weather-resistant coatings for outdoor walls.",
    image: "https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg",
  },
];

const Hero = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(null);

  const handleExplore = (id) => {
    navigate(`/products?category=${id}`);
  };

  return (
    <div className="w-full h-screen flex overflow-hidden bg-black">
      {paintCategories.map((category, index) => {
        const isActive = index === activeIndex;

        return (
          <div
            key={category.id}
            className="relative group cursor-pointer transition-all duration-500 ease-in-out"
            style={{
              flex: 1,
              overflow: "hidden",
              transform: isActive ? "skewX(0deg)" : "skewX(-8deg)",
              transformOrigin: "bottom left",
            }}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <div
              className="w-full h-full"
              style={{
                transform: isActive ? "skewX(0deg)" : "skewX(8deg)",
                transformOrigin: "bottom left",
              }}
            >
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover"
                draggable={false}
              />
              {isActive && (
                <div className="absolute inset-0 bg-black bg-opacity-60 text-white p-6 flex flex-col justify-center">
                  <h2 className="text-2xl font-bold mb-2">{category.title}</h2>
                  <p className="mb-4">{category.description}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleExplore(category.id);
                    }}
                    className="bg-white text-black px-5 py-2 rounded hover:bg-gray-200"
                  >
                    Explore
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Hero;


