import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';

const Hero = () => {
  const [currentBg, setCurrentBg] = useState(0);
  const controls = useAnimation();
  const cardControls = useAnimation();

  const backgrounds = [
    {
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      title: 'Lemon Cloud',
      description: 'A fresh citrus-inspired palette that brings brightness and energy to any space.',
      color: '#FFFACD', // لون ليموني فاتح
      brushImage: 'https://cdn.prod.website-files.com/65576d30478026e86cc17b29/655cfb60bbb70cd3cb60d696_paint-roller-%20greenpng.png',
      productCode: 'N°2570',
      brushColor: '#FFFACD' // لون الفرشاة مطابق للدائرة
    },
    {
      image: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      title: 'Ocean Breeze',
      description: 'Cool blue tones that evoke the serenity of coastal waters.',
      color: '#4A90E2',
      brushImage: 'https://cdn.prod.website-files.com/65576d30478026e86cc17b29/655cfc3114e0c7cae3be5bef_paint-roller-white%20orange.png',
      productCode: 'N°2571',
      brushColor: '#4A90E2'
    },
    {
      image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      title: 'Mint Fresh',
      description: 'Revitalizing green hues for a natural and refreshing atmosphere.',
      color: '#98FF98',
      brushImage: 'https://cdn.prod.website-files.com/65576d30478026e86cc17b29/655cfc01f9b8f60323e5d811_paint-roller-white%20green%20dark.png',
      productCode: 'N°2572',
      brushColor: '#98FF98'
    },
  ];

  useEffect(() => {
    // حركة الفرشاة (تأثير الطلاء)
    controls.start({
      y: [0, 30, 0],
      rotateZ: [-25, -10, -25],
      transition: { duration: 1.2, ease: 'easeInOut' },
    });

    // حركة الكارد (تأثير الظهور)
    cardControls.start({
      opacity: [0, 1],
      x: [500, 0],
      transition: { duration: 0.8, ease: 'easeOut' }
    });
  }, [currentBg, controls, cardControls]);

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

        {/* Right Paint Brush Card - تصميم معدل */}
    {/* Right Paint Brush Card - تصميم معدل */}
<div className="hidden lg:block flex-shrink-0 ml-16">
  <motion.a
    href={`/product/${backgrounds[currentBg].title.toLowerCase().replace(/\s+/g, '-')}`}
    animate={cardControls}
    className="banner-block-image relative block w-[18rem] h-80  rounded-xl p-6 no-underline overflow-hidden"
    style={{
      backdropFilter: 'blur(12px)',
      backgroundColor: 'rgba(255, 255, 255, 0.12)',
      border: '1px solid rgba(255, 255, 255, 0.25)'
    }}
  >
    {/* الدائرة الكبيرة */}
    <div  
      className="absolute w-40 h-40 rounded-full"
      style={{ 
        backgroundColor: backgrounds[currentBg].color,
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}
      aria-hidden="true"
    />

    {/* الفرشاة فوق الدائرة - حركة من تحت لفوق */}
    <motion.div
      className="absolute"
      style={{
        top:'20%',
        left: '40%',
        transform: 'translateX(-50%)',
        zIndex: 10,
      }}
      animate={{
        y: [0, 50],   // تحرك من 50px تحت إلى مكانها الأصلي (0)
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity, 
        repeatType: "mirror",
      }}
    >
      <img
        src={backgrounds[currentBg].brushImage}
        alt="paint roller"
        loading="lazy"
        className="w-32 h-auto"
        style={{
          
          transform: 'rotateZ(-30deg)'
        }}
        aria-hidden="true"
      />
    </motion.div>

    {/* Name and Product Code */}
    <div className="name-product absolute bottom-8 left-8 text-white z-20">
      <h6 className="heading-banner text-2xl font-medium mb-1">
        {backgrounds[currentBg].title.split(' ')[0]}
      </h6>
      <p className="text-sm font-light opacity-90 tracking-wider">
        {backgrounds[currentBg].productCode}
      </p>
    </div>

    {/* الدائرة الصغيرة - حذفتها كما طلبت */}

  </motion.a>
</div>
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