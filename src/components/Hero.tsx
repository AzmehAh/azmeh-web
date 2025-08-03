import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';

const Hero = () => {
  const [currentBg, setCurrentBg] = useState(0);
  const brushControls = useAnimation();
  const cardControls = useAnimation();

  const backgrounds = [
    {
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      title: 'Exterior Facade Restoration',
      description: 'From weather-worn walls to faded surfaces, our team specializes in bringing back the vibrancy and protection your building deserves.',
      brushColor: '#F5F5DC',
      brushImage: 'https://cdn.prod.website-files.com/65576d30478026e86cc17b29/655cfb60bbb70cd3cb60d696_paint-roller-%20greenpng.png',
      productCode: 'N°0510'
    },
    {
      image: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      title: 'Industrial Coating Solutions',
      description: 'Advanced protective coatings for industrial environments, ensuring durability and performance under the harshest conditions.',
      brushColor: '#4A90E2',
      brushImage: 'https://cdn.prod.website-files.com/65576d30478026e86cc17b29/655cfb60bbb70cd3cb60d696_paint-roller-%20greenpng.png',
      productCode: 'N°0511'
    },
    {
      image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      title: 'Premium Interior Finishes',
      description: 'Transform your interior spaces with our premium paint systems designed for beauty, durability, and health-conscious living.',
      brushColor: '#E8E8E8',
      brushImage: 'https://cdn.prod.website-files.com/65576d30478026e86cc17b29/655cfb60bbb70cd3cb60d696_paint-roller-%20greenpng.png',
      productCode: 'N°0512'
    },
  ];

  useEffect(() => {
    // تحريك الفرشاة (تهتز وتنزل وترتفع مع ميل)
    brushControls.start({
      y: [0, 30, 0],
      rotateZ: [-30, -15, -30],
      transition: { duration: 1.2, ease: 'easeInOut' },
    });

    // تحريك الكارد (يدخل من اليمين مع تلاشي)
    cardControls.start({
      opacity: [0, 1],
      x: [500, 0],
      transition: { duration: 0.8, ease: 'easeOut' },
    });
  }, [currentBg]);

  const nextSlide = () => {
    setCurrentBg((prev) => (prev + 1) % backgrounds.length);
  };

  const prevSlide = () => {
    setCurrentBg((prev) => (prev - 1 + backgrounds.length) % backgrounds.length);
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gray-900">
      {/* Background Images */}
      {backgrounds.map((bg, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentBg ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          aria-hidden={index !== currentBg}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${bg.image})` }}
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-6 flex items-center justify-between h-full">
        {/* Left Text Content */}
        <div className="flex-1 max-w-2xl text-white">
          <div className="transform transition-all duration-1000 translate-y-0 opacity-100">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
              {backgrounds[currentBg].title}
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-xl opacity-80">
              {backgrounds[currentBg].description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white hover:text-gray-900 transition duration-300 font-semibold text-lg">
                Learn More
              </button>
              <button className="bg-white text-gray-900 px-8 py-4 rounded-full hover:bg-gray-100 transition duration-300 font-semibold text-lg">
                View Colors
              </button>
            </div>
          </div>
        </div>

        {/* Right Paint Brush Card */}
        <div className="hidden lg:block flex-shrink-0 ml-16">
          <motion.a
            href={`/product/${backgrounds[currentBg].title.toLowerCase().replace(/\s+/g, '-')}`}
            animate={cardControls}
            className="banner-block-image relative block w-80 rounded-2xl p-6 no-underline overflow-hidden"
            style={{
              backdropFilter: 'blur(10px)',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            {/* Brush Image with 3D Transform */}
           {/* Right Paint Brush Card - تم التعديل ليشبه "Lemon Cloud" */}
<div className="hidden lg:block flex-shrink-0 ml-16">
  <motion.a
    href={`/product/${backgrounds[currentBg].title.toLowerCase().replace(/\s+/g, '-')}`}
    animate={cardControls}
    className="banner-block-image relative block w-80 h-96 rounded-2xl p-6 no-underline overflow-hidden"
    style={{
      backdropFilter: 'blur(10px)',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    }}
  >
    {/* Brush Image with 3D Transform */}
    <motion.img
      src={backgrounds[currentBg].brushImage}
      alt="paint roller"
      loading="lazy"
      className="banner-small-image absolute w-32 h-auto"
      animate={controls}
      initial={{ 
        x: 80,
        y: 120,
        rotateZ: -25,
        z: 4
      }}
      style={{ 
        transformStyle: 'preserve-3d',
        right: '15%',
        top: '15%'
      }}
      aria-hidden="true"
    />

    {/* Name and Product Code - تصميم مشابه لـ "Lemon Cloud" */}
    <div className="name-product absolute bottom-8 left-8 text-white">
      <h6 className="heading-banner text-2xl font-medium mb-1">
        {backgrounds[currentBg].title.split(' ')[0]}
      </h6>
      <p className="text-sm font-light opacity-90 tracking-wider">
        {backgrounds[currentBg].productCode}
      </p>
    </div>

    {/* Color Drop - دائرة ملونة كبيرة */}
    <div 
      className="absolute bottom-6 right-6 w-8 h-8 rounded-full"
      style={{ 
        backgroundColor: backgrounds[currentBg].brushColor,
        boxShadow: `0 0 30px ${backgrounds[currentBg].brushColor}`,
        filter: 'brightness(1.1)'
      }}
      aria-hidden="true"
    />
    
    {/* تأثيرات إضافية لتحقيق مظهر السحابة */}
    <div className="absolute inset-0 opacity-20" style={{
      background: `radial-gradient(circle at 70% 80%, ${backgrounds[currentBg].brushColor}, transparent 70%)`
    }} aria-hidden="true" />
  </motion.a>
</div>
           

      {/* Navigation Arrows */}
      <div className="absolute bottom-8 right-8 flex gap-3 z-20">
        <button
          onClick={prevSlide}
          className="w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition duration-300"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition duration-300"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
        {backgrounds.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentBg(index)}
            className={`w-3 h-3 rounded-full transition duration-300 ${
              index === currentBg ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;

