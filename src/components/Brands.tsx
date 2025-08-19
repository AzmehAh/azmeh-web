import React, { useState } from 'react';

const Brands = () => {
  const [hoveredBrand, setHoveredBrand] = useState<number | null>(null);

  const brands = [
    {
      name: 'DuPont',
      logo: 'https://images.pexels.com/photos/3184632/pexels-photo-3184632.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop'
    },
    {
      name: 'Sherwin-Williams',
      logo: 'https://images.pexels.com/photos/3184634/pexels-photo-3184634.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop'
    },
    {
      name: 'PPG Industries',
      logo: 'https://images.pexels.com/photos/3184636/pexels-photo-3184636.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop'
    },
    {
      name: 'AkzoNobel',
      logo: 'https://images.pexels.com/photos/3184638/pexels-photo-3184638.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop'
    },
    {
      name: 'BASF Coatings',
      logo: 'https://images.pexels.com/photos/3184640/pexels-photo-3184640.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop'
    },
    {
      name: 'Benjamin Moore',
      logo: 'https://images.pexels.com/photos/3184642/pexels-photo-3184642.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Trusted by Leading Brands
          </h2>
        </div>

        <div className="flex space-x-8 overflow-x-auto scrollbar-hide py-4">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-32 h-20 flex items-center justify-center cursor-pointer transition-transform duration-300"
              onMouseEnter={() => setHoveredBrand(index)}
              onMouseLeave={() => setHoveredBrand(null)}
              style={{
                transform: hoveredBrand === index ? 'scale(1.2)' : 'scale(1)',
              }}
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brands;
