import React, { useState } from 'react';

const ColorInspiration = () => {
  const [hoveredColor, setHoveredColor] = useState<number | null>(null);

  const colorSwatches = [
    {
      name: 'Little Kiwi',
   
      bucketImage: 'https://i.postimg.cc/850wmJTV/Whats-App-Image-2025-08-17-at-2-34-35-PM.jpg',
      squareImage: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'
    },
    {
      name: 'Ocean ',

      bucketImage: 'https://i.postimg.cc/850wmJTV/Whats-App-Image-2025-08-17-at-2-34-35-PM.jpg',
      squareImage: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'
    },
    {
      name: 'Lemon',
  
      bucketImage: 'https://i.postimg.cc/850wmJTV/Whats-App-Image-2025-08-17-at-2-34-35-PM.jpg',
      squareImage: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'
    },
    {
      name: 'Charcoal ',

      bucketImage: 'https://i.postimg.cc/850wmJTV/Whats-App-Image-2025-08-17-at-2-34-35-PM.jpg',
      squareImage: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-20">
          <h2
            className="text-5xl md:text-6xl font-semibold text-gray-900 mb-8 "
           
          >
            New drops
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-20">
          {colorSwatches.map((swatch, index) => (
            <div
              key={index}
              className="relative overflow-hidden group cursor-pointer w-52 h-[320px]" 
              onMouseEnter={() => setHoveredColor(index)}
              onMouseLeave={() => setHoveredColor(null)}
            >
              {/* العنوان */}
             
              {/* Bucket Image (الخلفية الأساسية) */}
              <img
                src={swatch.bucketImage}
                alt={`${swatch.name} bucket`}
                className={`absolute inset-0 w-full h-full object-contain transition-all duration-500 ease-out ${
                  hoveredColor === index
                    ? 'opacity-0 scale-90'
                    : 'opacity-100 scale-100'
                }`}
              /> 

              {/* Square Image on hover (يغطي البطاقة كلها بما فيها الاسم) */}
              <img
                src={swatch.squareImage}
                alt={`${swatch.name} square`}
                className={`absolute inset-0 z-10 w-full h-full object-cover shadow-xl transition-all duration-700 ease-out ${
                  hoveredColor === index
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-95'
                }`}
              />
              {/* العنوان أسفل صورة الدلو */}
  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center text-gray-800 font-serif">
    <span className="block text-lg font-semibold">{swatch.name}</span>

  </div>
            </div>
       
          ))}
        </div>
      </div>
    </section>
  );
};

export default ColorInspiration;
