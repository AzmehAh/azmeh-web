import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight,Paintbrush } from 'lucide-react';

const Hero = () => {
  const [currentBg, setCurrentBg] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const backgrounds = [
    {
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      title: 'Exterior Facade Restoration',
      description: 'From weather-worn walls to faded surfaces, our team specializes in bringing back the vibrancy and protection your building deserves.',
      brushColor: '#F5F5DC'
    },
    {
      image: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      title: 'Industrial Coating Solutions',
      description: 'Advanced protective coatings for industrial environments, ensuring durability and performance under the harshest conditions.',
      brushColor: '#4A90E2'
    },
    {
      image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      title: 'Premium Interior Finishes',
      description: 'Transform your interior spaces with our premium paint systems designed for beauty, durability, and health-conscious living.',
      brushColor: '#E8E8E8'
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
        {/* Left Content */}
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

        {/* Right Paint Brush Card */}
        <div className="hidden lg:block flex-shrink-0 ml-12">
          <div className={`transform transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
          }`}>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl w-80">
              <div className="flex items-center justify-center mb-6">
                <div 
                  className="w-32 h-32 rounded-full flex items-center justify-center shadow-lg transition-colors duration-500"
                  style={{ backgroundColor: backgrounds[currentBg].brushColor }}
                >
                  <Paintbrush className="w-16 h-16 text-gray-800" />
                  <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center">
                    <div className="w-16 h-2 bg-orange-400 rounded-full"></div>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Premium Quality</h3>
                <p className="text-gray-600 mb-4">Professional Grade</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Color Code</span>
                  <span className="font-mono text-sm text-gray-700">#{Math.floor(Math.random()*16777215).toString(16).toUpperCase()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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