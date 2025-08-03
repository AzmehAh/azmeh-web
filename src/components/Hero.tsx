import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  const [currentBg, setCurrentBg] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const backgrounds = [
    {
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      title: 'Exterior Facade Restoration',
      description: 'From weather-worn walls to faded surfaces, our team specializes in bringing back the vibrancy and protection your building deserves.',
      brushColor: '#F5F5DC',
      brushImage: 'https://cdn.prod.website-files.com/65576d30478026e86cc17b29/655cfc01f9b8f60323e5d811_paint-roller-white%20green%20dark.png'
    },
    {
      image: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      title: 'Industrial Coating Solutions',
      description: 'Advanced protective coatings for industrial environments, ensuring durability and performance under the harshest conditions.',
      brushColor: '#4A90E2',
      brushImage: 'https://cdn.prod.website-files.com/65576d30478026e86cc17b29/655cfc3114e0c7cae3be5bef_paint-roller-white%20orange.png'
    },
    {
      image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      title: 'Premium Interior Finishes',
      description: 'Transform your interior spaces with our premium paint systems designed for beauty, durability, and health-conscious living.',
      brushColor: '#E8E8E8',
      brushImage: 'https://cdn.prod.website-files.com/65576d30478026e86cc17b29/655cfc3114e0c7cae3be5bef_paint-roller-white%20orange.png'
    }
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const nextSlide = () => {
    setCurrentBg((prev) => (prev + 1) % backgrounds.length);
  };

  const prevSlide = () => {
    setCurrentBg((prev) => (prev - 1 + backgrounds.length) % backgrounds.length);
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images */}
      {backgrounds.map((bg, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentBg ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${bg.image})` }}
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-full">
        {/* Left Text Content */}
        <div className="flex-1 max-w-2xl">
          <div className={`transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              {backgrounds[currentBg].title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed max-w-xl">
              {backgrounds[currentBg].description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300 font-semibold text-lg">
                Learn More
              </button>
              <button className="bg-white text-gray-900 px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 font-semibold text-lg">
                View Colors
              </button>
            </div>
          </div>
        </div>

        {/* Right Paint Brush */}
        {/* Right Paint Brush */}
<div className="hidden lg:block flex-shrink-0 ml-12">
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 1, delay: 0.5 }}
  >
    <div className="relative bg-white/20 backdrop-blur-lg rounded-2xl p-6 shadow-xl w-80 border border-white/40">
      
{/* Right Paint Brush */}
<div className="hidden lg:block flex-shrink-0 ml-12">
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 1, delay: 0.5 }}
  >
    <div className="relative bg-white/20 backdrop-blur-lg rounded-2xl p-6 shadow-xl w-80 border border-white/40">

      {/* Brush image with tilt and animation */}
      <div className="relative w-40 h-40 mx-auto perspective-1000">
        <motion.img
          src={backgrounds[currentBg].brushImage}
          alt="paint roller"
          className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-auto"
          animate={{ y: [0, -15, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            transformOrigin: "center center",
            transform: "rotateZ(-29deg)"
          }}
          aria-hidden="true"
          loading="lazy"
        />
      </div>

      {/* Name and code block like your example */}
      <div className="name-product mt-6 px-6 text-white" aria-hidden="true">
        <h6 className="heading-banner hover mb-1 text-xl font-semibold">
          {backgrounds[currentBg].title}
        </h6>
        <p className="without-margin height text-sm">
          {/* You can replace this with actual code or number */}
          N°{backgrounds[currentBg].brushColor.slice(1).toUpperCase().slice(0,4)}
        </p>
      </div>
      
    </div>
  </motion.div>




     
      {/* Navigation Arrows */}
      <div className="absolute bottom-8 right-8 flex gap-2 z-20">
        <button
          onClick={prevSlide}
          className="w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {backgrounds.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentBg(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentBg ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
