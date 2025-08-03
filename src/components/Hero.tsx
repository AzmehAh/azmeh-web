import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';

const Hero = () => {
  const [currentBg, setCurrentBg] = useState(0);
  const cardControls = useAnimation();
  const brushControls = useAnimation();

  const backgrounds = [
    {
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      title: 'Lemon Cloud',
      description: 'A fresh citrus-inspired palette that brings brightness and energy to any space.',
      color: '#FFFACD',
      brushImage: 'https://cdn.prod.website-files.com/65576d30478026e86cc17b29/655cfb60bbb70cd3cb60d696_paint-roller-%20greenpng.png',
      productCode: 'N°2570',
      brushColor: '#FFFACD'
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
    // حركة الكارد عند تغيير الخلفية
    cardControls.start({
      opacity: [0, 1],
      x: [500, 0],
      transition: { duration: 0.8, ease: 'easeOut' }
    });

    // حركة الفرشاة عند تغيير الخلفية (مرة واحدة فقط)
    brushControls.start({
      y: [50, 0],
      rotateZ: [-30, -15, -30],
      transition: { duration: 1.2, ease: 'easeInOut' }
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
      {/* Backgrounds */}
      {backgrounds.map((bg, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentBg ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          aria-hidden={index !== currentBg}
        >
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${bg.image})` }} />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-6 flex items-center justify-between h-full">
        {/* Left Text */}
        <div className="flex-1 max-w-2xl text-white">
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

        {/* Right Brush Card */}
        <div className="hidden lg:block flex-shrink-0 ml-16">
          <motion.a
            href={`/product/${backgrounds[currentBg].title.toLowerCase().replace(/\s+/g, '-')}`}
            animate={cardControls}
            className="relative block w-[18rem] h-80 rounded-xl p-6 overflow-hidden"
            style={{
              backdropFilter: 'blur(12px)',
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              border: '1px solid rgba(255, 255, 255, 0.25)'
            }}
          >
            {/* Circle */}
            <div
              className="absolute w-40 h-40 rounded-full"
              style={{
                backgroundColor: backgrounds[currentBg].color,
                top: '30%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            />

            {/* Brush */}
            <motion.div
              animate={brushControls}
              initial={{ y: 50 }}
              className="absolute"
              style={{
                top: '20%',
                left: '40%',
                transform: 'translateX(-50%)',
                zIndex: 10
              }}
            >
              <img
                src={backgrounds[currentBg].brushImage}
                alt="paint roller"
                className="w-32 h-auto"
                style={{ transform: 'rotateZ(-30deg)' }}
              />
            </motion.div>

            {/* Text */}
            <div className="absolute bottom-8 left-8 text-white z-20">
              <h6 className="text-2xl font-medium mb-1">{backgrounds[currentBg].title.split(' ')[0]}</h6>
              <p className="text-sm font-light opacity-90 tracking-wider">{backgrounds[currentBg].productCode}</p>
            </div>
          </motion.a>
        </div>
      </div>

      {/* Navigation */}
      <div className="absolute bottom-8 right-8 flex gap-3 z-20">
        <button onClick={prevSlide} className="w-12 h-12 bg-white/20 rounded-full text-white hover:bg-white/30 transition">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button onClick={nextSlide} className="w-12 h-12 bg-white/20 rounded-full text-white hover:bg-white/30 transition">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {backgrounds.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentBg(index)}
            className={`w-3 h-3 rounded-full transition ${
              index === currentBg ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
