import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Car, Factory, Home, Shield, Zap } from "lucide-react";

const Hero = () => {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const navigate = useNavigate();

  const sections = [
    {
      id: "flooring",
      title: "Flooring",
      description: "Premium flooring solutions for sports courts, industrial facilities, and commercial spaces.",
      color: "from-red-500 to-red-600",
      bgImage: "https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg",
      icon: Home,
      angle: "rotate(-15deg)",
      textAngle: "rotate(15deg)"
    },
    {
      id: "protect", 
      title: "Protect",
      description: "Advanced protective coatings for harsh environments and long-lasting durability.",
      color: "from-blue-600 to-blue-700", 
      bgImage: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
      icon: Shield,
      angle: "rotate(-8deg)",
      textAngle: "rotate(8deg)"
    },
    {
      id: "automotive",
      title: "Automotive", 
      description: "High-performance automotive paints and coatings for vehicles and transport.",
      color: "from-indigo-500 to-indigo-600",
      bgImage: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
      icon: Car,
      angle: "rotate(0deg)",
      textAngle: "rotate(0deg)"
    },
    {
      id: "future",
      title: "Future",
      description: "Next-generation smart coatings and innovative paint technologies.", 
      color: "from-purple-500 to-purple-600",
      bgImage: "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg",
      icon: Zap,
      angle: "rotate(8deg)", 
      textAngle: "rotate(-8deg)"
    },
    {
      id: "industrial",
      title: "Industrial",
      description: "Heavy-duty industrial coatings for factories, infrastructure, and equipment.",
      color: "from-green-500 to-green-600",
      bgImage: "https://images.pexels.com/photos/209251/pexels-photo-209251.jpeg", 
      icon: Factory,
      angle: "rotate(15deg)",
      textAngle: "rotate(-15deg)"
    }
  ];

  const handleExplore = (id: string) => {
    navigate(`/products?category=${id}`);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-900">
      {/* Diagonal Sections Container */}
      <div className="absolute inset-0 flex">
        {sections.map((section, index) => (
          <motion.div
            key={section.id}
            className={`relative flex-1 cursor-pointer transition-all duration-700 ease-out`}
            style={{
              transform: section.angle,
              transformOrigin: "center bottom",
              zIndex: hoveredSection === section.id ? 50 : index + 1
            }}
            onMouseEnter={() => setHoveredSection(section.id)}
            onMouseLeave={() => setHoveredSection(null)}
            whileHover={{ scale: hoveredSection === section.id ? 1 : 0.98 }}
          >
            {/* Background Image & Gradient */}
            <div className="absolute inset-0 overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${section.bgImage})` }}
              />
              <div className={`absolute inset-0 bg-gradient-to-br ${section.color} opacity-80`} />
              <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Default State - Diagonal Text */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 1 }}
              animate={{ 
                opacity: hoveredSection === section.id ? 0 : 1,
                scale: hoveredSection === section.id ? 0.8 : 1 
              }}
              transition={{ duration: 0.4 }}
            >
              <div 
                className="text-center text-white"
                style={{ transform: section.textAngle }}
              >
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-wider drop-shadow-2xl">
                  {section.title}
                </h2>
              </div>
            </motion.div>

            {/* Hover State - Expanded Overlay */}
            <AnimatePresence>
              {hoveredSection === section.id && (
                <motion.div
                  initial={{ 
                    opacity: 0,
                    scale: 0.8,
                    rotateY: -20
                  }}
                  animate={{ 
                    opacity: 1,
                    scale: 1,
                    rotateY: 0
                  }}
                  exit={{ 
                    opacity: 0,
                    scale: 0.8,
                    rotateY: 20
                  }}
                  transition={{ 
                    duration: 0.6,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  className="absolute inset-0 flex flex-col items-center justify-center text-white p-8"
                  style={{ transform: "rotate(0deg)" }}
                >
                  {/* Icon */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="mb-6"
                  >
                    <section.icon className="w-16 h-16 text-white drop-shadow-lg" />
                  </motion.div>

                  {/* Title */}
                  <motion.h3
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="text-4xl md:text-5xl font-black uppercase mb-6 text-center drop-shadow-xl"
                  >
                    {section.title}
                  </motion.h3>

                  {/* Description */}
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                    className="text-lg text-center max-w-sm mb-8 leading-relaxed drop-shadow-lg"
                  >
                    {section.description}
                  </motion.p>

                  {/* CTA Button */}
                  <motion.button
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleExplore(section.id)}
                    className="group bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/30 transition-all duration-300 flex items-center space-x-3 border border-white/30 hover:border-white/50"
                  >
                    <span>Explore Products</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Diagonal Section Borders */}
            <div className="absolute inset-0 pointer-events-none">
              {index < sections.length - 1 && (
                <div className="absolute top-0 right-0 w-px h-full bg-white/20 transform origin-top rotate-12" />
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Company Logo Overlay */}
      <motion.div
        className="absolute top-8 left-8 z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <img
          src="/images/Azmeh-Paints-Logo-White.png"
          alt="Al Azmeh Paints"
          className="h-12 w-auto drop-shadow-2xl"
        />
      </motion.div>

      {/* Navigation Hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-center z-50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <p className="text-sm font-light drop-shadow-lg">
          Hover over sections to explore our product categories
        </p>
      </motion.div>
    </div>
  );
};

export default Hero;