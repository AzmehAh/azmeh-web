import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from 'lucide-react';
import { motion } from "framer-motion";

const paintCategories = [
  { id: "flooring", title: "Flooring", description: "Durable coatings that protect and enhance wooden, concrete, and tiled floors.", image: "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg" },
  { id: "industrial", title: "Industrial", description: "Heavy-duty coatings designed for factories and industrial environments.", image: "https://images.pexels.com/photos/209251/pexels-photo-209251.jpeg" },
  { id: "furniture", title: "Furniture", description: "Protective and stylish finishes for wooden and metal furniture.", image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg" },
  { id: "automotive", title: "Automotive", description: "High-durability coatings with a glossy finish for vehicles.", image: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg" },
  { id: "protective", title: "Protective", description: "Weather-resistant protective coatings for buildings and outdoor structures.", image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg" },
];

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0); // يبدأ بأول قسم مفتوح
  const [isManual, setIsManual] = useState(false); // لتحديد ما إذا ضغط المستخدم
  const navigate = useNavigate();
  const intervalRef = useRef(null);

  const handleExplore = (id) => {
    navigate(`/products?category=${id}`);
    setIsManual(true); // عند الضغط يتوقف التغيير التلقائي
  };

  // التأثير التلقائي لتغيير الأقسام بعد فترة
  useEffect(() => {
    if (isManual) return; // إذا ضغط المستخدم، لا نغير تلقائياً
    intervalRef.current = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % paintCategories.length);
    }, 4000); // يفتح كل 4 ثواني قسم جديد

    return () => clearInterval(intervalRef.current);
  }, [isManual]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="flex h-full">
        {paintCategories.map((category, index) => {
          const isActive = activeIndex === index;

          return (
            <motion.div
              key={category.id}
              className={`relative h-full cursor-pointer ${isActive ? "flex-grow" : "flex-shrink"}`}
              initial={{ flex: 1 }}
              animate={{
                flex: isActive ? 5 : 1,
                transform: isActive ? "rotate(0deg)" : "rotate(5deg)",
                marginLeft: "-25px",
                marginRight: "-25px",
              }}
              style={{ transformOrigin: "center center" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              onMouseEnter={() => { setActiveIndex(index); setIsManual(true); }} // توقف التلقائي عند المرور
              onClick={() => { setActiveIndex(index); setIsManual(true); }} // توقف التلقائي عند الضغط
            >
              <motion.img
                src={category.image}
                alt={category.title}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ filter: isActive ? "brightness(0.4) contrast(1.2)" : "brightness(0.4) contrast(1.1)" }}
                initial={{ scale: 1.1 }}
                animate={{ scale: isActive ? 1 : 1.1 }}
                transition={{ duration: 0.5 }}
              />

              <div
                className="absolute text-white pointer-events-none z-10"
                style={{
                  top: isActive ? "45%" : "65%",
                  left: isActive ? "65%" : "40%",
                  transform: isActive ? "translate(-50%, -50%) rotate(0deg)" : "translate(-50%, -50%) rotate(-83deg)",
                  transition: "all 0.6s ease-in-out",
                  width: isActive ? "120%" : "100%",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                  lineHeight: isActive ? "1.4" : "1.1",
                  padding: isActive ? "20px" : "0px",
                }}
              >
                <AnimatedTitle text={category.title} isActive={isActive} />
              </div>

              {isActive && (
                <motion.div
                  className="absolute inset-0 flex flex-col justify-start items-start mt-80 p-12 z-20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <p className="text-xl mb-6 text-white leading-relaxed max-w-xl drop-shadow-lg bg-opacity-40 p-2 rounded-lg">
                    {category.description}
                  </p>
                  <motion.button
                    onClick={() => handleExplore(category.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="self-start group inline-flex items-center space-x-3 px-8 py-3 border-2 border-gray-300 text-white font-semibold rounded-lg hover:border-[#2C5DB6] transition-all duration-300"
                  >
                    <span>READ MORE</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Hero;
