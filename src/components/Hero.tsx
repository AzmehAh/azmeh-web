import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Palette, Shield, Sparkles } from "lucide-react";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Trigger the animation after a short delay
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const titleVariants = {
    initial: {
      rotate: -90,
      x: -200,
      y: 0,
      transformOrigin: "center center",
    },
    animate: {
      rotate: 0,
      x: 0,
      y: 0,
      transformOrigin: "center center",
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const subtitleVariants = {
    initial: { opacity: 0, y: 50 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.8,
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 1.2,
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const backgroundVariants = {
    initial: { scale: 1.1 },
    animate: {
      scale: 1,
      transition: {
        duration: 2,
        ease: "easeOut",
      },
    },
  };

  const floatingIconVariants = {
    initial: { opacity: 0, y: 100, rotate: -45 },
    animate: (delay: number) => ({
      opacity: 0.3,
      y: 0,
      rotate: 0,
      transition: {
        delay: delay,
        duration: 1,
        ease: "easeOut",
      },
    }),
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-[#2C5DB6] via-blue-600 to-blue-800">
      {/* Background Image with Animation */}
      <motion.div
        className="absolute inset-0 z-0"
        variants={backgroundVariants}
        initial="initial"
        animate={isLoaded ? "animate" : "initial"}
      >
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(44, 93, 182, 0.7), rgba(30, 64, 128, 0.8)), url('https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`,
          }}
        />
      </motion.div>

      {/* Floating Background Icons */}
      <motion.div
        className="absolute top-20 right-20 z-10"
        variants={floatingIconVariants}
        initial="initial"
        animate={isLoaded ? "animate" : "initial"}
        custom={1.5}
      >
        <Palette className="w-20 h-20 text-white" />
      </motion.div>

      <motion.div
        className="absolute bottom-32 left-20 z-10"
        variants={floatingIconVariants}
        initial="initial"
        animate={isLoaded ? "animate" : "initial"}
        custom={1.8}
      >
        <Shield className="w-16 h-16 text-white" />
      </motion.div>

      <motion.div
        className="absolute top-1/3 right-1/4 z-10"
        variants={floatingIconVariants}
        initial="initial"
        animate={isLoaded ? "animate" : "initial"}
        custom={2.1}
      >
        <Sparkles className="w-12 h-12 text-white" />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-20 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-6xl mx-auto">
          {/* Animated Title */}
          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-8 tracking-tight"
            variants={titleVariants}
            initial="initial"
            animate={isLoaded ? "animate" : "initial"}
            style={{
              fontFamily: "Georgia, serif",
              textShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
            }}
          >
            AL AZMEH
            <br />
            <span className="text-yellow-400">PAINTS</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl text-blue-100 mb-12 leading-relaxed max-w-3xl mx-auto"
            variants={subtitleVariants}
            initial="initial"
            animate={isLoaded ? "animate" : "initial"}
          >
            Excellence in Every Drop. Discover premium paint systems and 
            technical solutions designed for every application and environment.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            variants={buttonVariants}
            initial="initial"
            animate={isLoaded ? "animate" : "initial"}
          >
            <motion.button
              onClick={() => navigate('/products')}
              className="group relative bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-10 py-5 rounded-full font-bold text-lg shadow-2xl hover:shadow-yellow-400/25 transition-all duration-300"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(251, 191, 36, 0.4)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center space-x-3">
                <span>Explore Our Products</span>
                <motion.div
                  className="inline-block"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 1.5,
                    ease: "easeInOut"
                  }}
                >
                  <ArrowRight className="w-6 h-6" />
                </motion.div>
              </span>
              
              {/* Button Glow Effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl" />
            </motion.button>
          </motion.div>

          {/* Bottom Accent */}
          <motion.div
            className="mt-20 flex justify-center space-x-8 text-blue-200"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: isLoaded ? 1 : 0,
              transition: { delay: 1.6, duration: 0.8 }
            }}
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">70+</div>
              <div className="text-sm">Years of Excellence</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">2000+</div>
              <div className="text-sm">Satisfied Clients</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">35+</div>
              <div className="text-sm">Countries Served</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/20 to-transparent z-10" />
      
      {/* Animated Particles */}
      {Array.from({ length: 6 }).map((_, index) => (
        <motion.div
          key={index}
          className="absolute w-2 h-2 bg-yellow-400 rounded-full opacity-60"
          animate={{
            y: [-20, -100, -20],
            x: [0, Math.random() * 100 - 50, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
          style={{
            left: `${10 + Math.random() * 80}%`,
            bottom: `${Math.random() * 20}%`,
          }}
        />
      ))}
    </div>
  );
};

export default Hero;