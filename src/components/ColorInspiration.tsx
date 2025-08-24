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
              className="flex flex-col items-center group cursor-pointer w-52 h-[320px] border-t border-b border-gray-300"
              onMouseEnter={() => setHoveredColor(index)}
              onMouseLeave={() => setHoveredColor(null)}
            >
              {/* العنوان */}
              <div className="flex justify-between w-full px-2 text-gray-800 font-serif mt-2">
                <span className="text-lg font-semibold">{swatch.name}</span>
                <span className="text-sm text-gray-500">{swatch.code}</span>
              </div>

              {/* الصورة بتتمدد لتعبي المساحة بين العنوان والخط السفلي */}
              <div className="flex-1 flex items-center justify-center">
                <div className="relative w-36 h-36 md:w-44 md:h-44">
                  {/* Bucket Image */}
                  <img
                    src={swatch.bucketImage}
                    alt={`${swatch.name} bucket`}
                    className={`absolute inset-0 w-full h-full object-contain transition-all duration-500 ease-out ${
                      hoveredColor === index
                        ? 'opacity-0 scale-90'
                        : 'opacity-100 scale-100'
                    }`}
                  />

                  {/* Square Image on hover */}
                  <img
                    src={swatch.squareImage}
                    alt={`${swatch.name} square`}
                    className={`absolute inset-0 w-full h-full object-cover shadow-xl transition-all duration-700 ease-out ${
                      hoveredColor === index
                        ? 'opacity-100 scale-100'
                        : 'opacity-0 scale-95'
                    }`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ColorInspiration;
