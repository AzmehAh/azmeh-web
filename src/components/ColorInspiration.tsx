import React, { useState } from 'react';

const ColorInspiration = () => {
  const [hoveredColor, setHoveredColor] = useState<number | null>(null);

  const colorSwatches = [
    {
      name: 'Little Kiwi', 
      code: 'N°2555',
      bucketImage: 'https://images.pexels.com/photos/1005632/pexels-photo-1005632.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      squareImage: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'
    },
    {
      name: 'Ocean Crush',
      code: 'N°0050',
      bucketImage: 'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      squareImage: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'
    },
    {
      name: 'Lemon Cloud',
      code: 'N°2570',
      bucketImage: 'https://images.pexels.com/photos/271645/pexels-photo-271645.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      squareImage: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'
    },
    {
      name: 'Charcoal Depth',
      code: 'N°8800',
      bucketImage: 'https://images.pexels.com/photos/1068520/pexels-photo-1068520.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      squareImage: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'
    }
  ];

  return (
    <section className="py-32 bg-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-20">
          <h2 className="text-6xl md:text-7xl font-light text-gray-900 mb-8 tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
            New drops
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-20">
          {colorSwatches.map((swatch, index) => (
            <div 
              key={index} 
              className="relative flex flex-col items-center group cursor-pointer"
              onMouseEnter={() => setHoveredColor(index)}
              onMouseLeave={() => setHoveredColor(null)}
            >
              {/* Typography */}
              <div className="text-center space-y-2 z-10">
                <h3 className="text-xl md:text-2xl font-light text-gray-900 tracking-wide leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
                  {swatch.name}
                </h3>
                <p className="text-sm md:text-base text-gray-500 font-light tracking-widest uppercase" style={{ fontFamily: 'Georgia, serif' }}>
                  {swatch.code}
                </p>
              </div>

              {/* Small bucket image */}
              <div className="mt-4 w-20 h-20 md:w-24 md:h-24 z-10">
                <img 
                  src={swatch.bucketImage} 
                  alt={`${swatch.name} bucket`} 
                  className="w-full h-full object-cover rounded-md shadow"
                />
              </div>

              {/* Large square image on hover */}
              {hoveredColor === index && (
                <div className="absolute top-[-150%] left-1/2 transform -translate-x-1/2 w-48 h-48 md:w-64 md:h-64 rounded-md shadow-2xl z-20 transition-all duration-500">
                  <img 
                    src={swatch.squareImage} 
                    alt={`${swatch.name} square`} 
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-20"></div>
      </div>
    </section>
  );
};

export default ColorInspiration;
