import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// هذا المكون يعرض العنوان بحروف متحركة
const AnimatedTitle = ({ text, isActive }) => {
  const letters = Array.from(text);

  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const child = {
    hidden: {
      y: 20,
      opacity: 0,
      rotate: -90,
    },
    visible: {
      y: 0,
      opacity: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <motion.div
      style={{
        display: isActive ? "flex" : "inline-block",
        flexDirection: isActive ? "row" : "column",
        fontSize: isActive ? "3rem" : "1.5rem",
        fontWeight: "bold",
        color: "white",
        whiteSpace: "nowrap",
      }}
      variants={container}
      initial="hidden"
      animate={isActive ? "visible" : "hidden"}
      aria-live="polite"
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={child}
          style={{ display: "inline-block" }}
          aria-hidden="true"
        >
          {letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const navigate = useNavigate();

  // بيانات الفئات (يمكن استبدالها ببياناتك الفعلية)
  const paintCategories = [
    {
      id: 1,
      title: "الدهانات الداخلية",
      description: "اكتشف مجموعة واسعة من الدهانات الداخلية عالية الجودة",
      image: "/images/interior-paint.jpg",
      activeImage: "/images/interior-paint-active.jpg",
      sideText: "ديكورات داخلية"
    },
    {
      id: 2,
      title: "الدهانات الخارجية",
      description: "دهانات خارجية مقاومة للعوامل الجوية وتدوم طويلاً",
      image: "/images/exterior-paint.jpg",
      activeImage: "/images/exterior-paint-active.jpg",
      sideText: "واجهات خارجية"
    },
    {
      id: 3,
      title: "الألوان المخصصة",
      description: "اختر لونك المفضل من بين آلاف الألوان المتاحة",
      image: "/images/custom-colors.jpg",
      activeImage: "/images/custom-colors-active.jpg",
      sideText: "ألوان حصرية"
    }
  ];

  const handleExplore = (id) => {
    navigate(`/products?category=${id}`);
  };

  const handleInteraction = (index, isEnter) => {
    setActiveIndex(isEnter ? index : null);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="flex h-full">
        {paintCategories.map((category, index) => {
          const isActive = activeIndex === index;

          return (
            <motion.div
              key={category.id}
              className={`relative h-full cursor-pointer ${
                isActive ? "flex-grow" : "flex-shrink"
              }`}
              initial={{ flex: 1 }}
              animate={{
                flex: isActive ? 5 : 1,
                rotate: isActive ? 0 : -5,
              }}
              style={{
                transformOrigin: "left center",
                zIndex: isActive ? 10 : 1,
                marginRight: isActive ? "0px" : "-50px",
                overflow: 'hidden',
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              onMouseEnter={() => handleInteraction(index, true)}
              onMouseLeave={() => handleInteraction(index, false)}
              onTouchStart={() => handleInteraction(index, true)}
            >
              <motion.img
                src={isActive ? category.activeImage || category.image : category.image}
                alt={category.title}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ scale: 1.1 }}
                animate={{ scale: isActive ? 1 : 1.1 }}
                transition={{ duration: 0.5 }}
              />

              {/* النص القطري الكبير على الجانب */}
              {!isActive && (
                <motion.div
                  className="absolute right-0 top-0 h-full flex items-center justify-end pr-4"
                  style={{
                    transform: 'rotate(90deg) translateX(50%)',
                    transformOrigin: 'right center',
                    width: '100vh',
                    fontSize: '5rem',
                    fontWeight: 'bold',
                    color: 'rgba(255,255,255,0.5)',
                    textTransform: 'uppercase',
                    pointerEvents: 'none',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                  }}
                  animate={{
                    opacity: isActive ? 0 : 1,
                    x: isActive ? 100 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {category.sideText || category.title}
                </motion.div>
              )}

              {/* العنوان المتحرك */}
              <div
                className="absolute text-white drop-shadow-lg pointer-events-none"
                style={{
                  top: "45%",
                  left: isActive ? "50%" : "30%",
                  transform: isActive
                    ? "translate(-50%, -50%)"
                    : "translate(0, -50%)",
                  transition: "all 0.5s ease-in-out",
                }}
              >
                <AnimatedTitle text={category.title} isActive={isActive} />
              </div>

              {/* المحتوى النصي عند التفعيل */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 flex flex-col justify-center items-start mt-40 p-12 z-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-xl text-white mb-6 max-w-lg drop-shadow-lg">
                    {category.description}
                  </p>
                  <button
                    onClick={() => handleExplore(category.id)}
                    className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                  >
                    تصفح المنتجات
                  </button>
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