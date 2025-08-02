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
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We partner with world-class manufacturers to bring you the highest quality paint systems and coatings available in the market.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer"
              onMouseEnter={() => setHoveredBrand(index)}
              onMouseLeave={() => setHoveredBrand(null)}
            >
              <div className="relative w-full h-16 flex items-center justify-center">
                <div 
                  className={`w-full h-full bg-gray-300 rounded flex items-center justify-center text-gray-600 font-semibold text-sm transition-all duration-300 ${
                    hoveredBrand === index ? 'grayscale-0 opacity-100' : 'grayscale opacity-70'
                  }`}
                >
                  {brand.name}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600">
            Interested in becoming a partner?{' '}
            <a href="#contact" className="text-[#2C5DB6] hover:underline font-semibold">
              Contact us
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Brands;