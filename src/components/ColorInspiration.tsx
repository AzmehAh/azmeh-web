import React, { useState } from 'react';

const ColorInspiration = () => {
  const [hoveredColor, setHoveredColor] = useState<number | null>(null);

  const colorSwatches = [
    {
      name: 'Little Kiwi',
      code: 'N°2555',
      bucketImage: 'https://i.postimg.cc/850wmJTV/Whats-App-Image-2025-08-17-at-2-34-35-PM.jpg',
      squareImage: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'
    },
    {
      name: 'Ocean Crush',
      code: 'N°0050',
      bucketImage: 'https://i.postimg.cc/850wmJTV/Whats-App-Image-2025-08-17-at-2-34-35-PM.jpg',
      squareImage: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'
    },
    {
      name: 'Lemon Cloud',
      code: 'N°2570',
      bucketImage: 'https://i.postimg.cc/850wmJTV/Whats-App-Image-2025-08-17-at-2-34-35-PM.jpg',
      squareImage: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'
    },
    {
      name: 'Charcoal Depth',
      code: 'N°8800',
      bucketImage: 'https://i.postimg.cc/850wmJTV/Whats-App-Image-2025-08-17-at-2-34-35-PM.jpg',
      squareImage: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'
    }
  ];

  return (
    <section className="py-32 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-20">
          <h2
            className="text-6xl md:text-7xl font-light text-gray-900 mb-8 tracking-tight"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            New drops
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-20">
          {colorSwatches.map((swatch, index) => (
            <div
              key={index}
              className="flex flex-col items-center group cursor-pointer"
              onMouseEnter={() => setHoveredColor(index)}
              onMouseLeave={() => setHoveredColor(null)}
            >
              {/* Image container */}
              <div className="relative mb-10 w-36 h-36 md:w-44 md:h-44 flex items-center justify-center">
                {/* Bucket Image */}
                <img
                  src={swatch.bucketImage}
                  alt={`${swatch.name} bucket`}
                  className={`absolute inset-0 w-full h-full object-cover  transition-all duration-500 ease-out ${
                    hoveredColor === index
                      ? 'opacity-0 scale-90'
                      : 'opacity-100 scale-100'
                  }`}
                />

                {/* Square Image on hover */}
                <img
                  src={swatch.squareImage}
                  alt={`${swatch.name} square`}
                  className={`absolute w-[200%] h-[130%] object-cover  shadow-xl transition-all duration-700 ease-out ${
                    hoveredColor === index
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-95'
                  }`}
                />
              </div>

              {/* Typography */}
              <div className="text-center space-y-2">
                <h3
                  className="text-xl md:text-2xl font-light text-gray-900 tracking-wide leading-tight"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  {swatch.name}
                </h3>
                <p
                  className="text-sm md:text-base text-gray-500 font-light tracking-widest uppercase"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  {swatch.code}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20"></div>
      </div>
    </section>
  );
};

export default ColorInspiration;
