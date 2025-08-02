import React, { useState } from 'react';

const ColorInspiration = () => {
  const [hoveredColor, setHoveredColor] = useState<number | null>(null);

  const colorSwatches = [
    {
      name: 'Little Kiwi',
      code: 'N°2555',
      color: '#B8C5A1',
      image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'
    },
    {
      name: 'Ocean Crush',
      code: 'N°0050',
      color: '#7BA7BC',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'
    },
    {
      name: 'Lemon Cloud',
      code: 'N°2570',
      color: '#E4A853',
      image: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'
    },
    {
      name: 'Charcoal Depth',
      code: 'N°8800',
      color: '#4A4A4A',
      image: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'
    }
  ];

  return (
    <section className="py-32 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Title */}
        <div className="text-center mb-20">
          <h2 className="text-6xl md:text-7xl font-light text-gray-900 mb-8 tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
            New drops
          </h2>
        </div>

        {/* Color Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-20">
          {colorSwatches.map((swatch, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center group cursor-pointer"
              onMouseEnter={() => setHoveredColor(index)}
              onMouseLeave={() => setHoveredColor(null)}
            >
              {/* Color Circle with Image Overlay */}
              <div className="relative mb-8">
                <div 
                  className={`w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-dashed border-gray-200 transition-all duration-500 ease-out ${
                    hoveredColor === index ? 'shadow-xl scale-105' : 'shadow-sm hover:shadow-md'
                  }`}
                  style={{ backgroundColor: swatch.color }}
                >
                  {/* Image overlay that appears on hover */}
                  <div 
                    className={`absolute inset-0 rounded-full overflow-hidden transition-opacity duration-500 ease-out ${
                      hoveredColor === index ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <img
                      src={swatch.image}
                      alt={swatch.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 rounded-full"></div>
                  </div>
                </div>
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

        {/* Bottom spacing for visual balance */}
        <div className="mt-20"></div>
      </div>
    </section>
  );
};

export default ColorInspiration;