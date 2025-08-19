import React from 'react';

const Brands = () => {
  const brands = [
    { name: 'DuPont', logo: 'https://images.pexels.com/photos/3184632/pexels-photo-3184632.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop' },
    { name: 'Sherwin-Williams', logo: 'https://images.pexels.com/photos/3184634/pexels-photo-3184634.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop' },
    { name: 'PPG Industries', logo: 'https://images.pexels.com/photos/3184636/pexels-photo-3184636.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop' },
    { name: 'AkzoNobel', logo: 'https://images.pexels.com/photos/3184638/pexels-photo-3184638.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop' },
    { name: 'BASF Coatings', logo: 'https://images.pexels.com/photos/3184640/pexels-photo-3184640.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop' },
    { name: 'Benjamin Moore', logo: 'https://images.pexels.com/photos/3184642/pexels-photo-3184642.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop' }
  ];

  // نسخ العناصر لتكرار الحركة المستمرة
  const repeatedBrands = [...brands, ...brands];

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Trusted by Leading Brands
          </h2>
        </div>

        <div className="relative w-full overflow-hidden">
          <div className="flex animate-scroll whitespace-nowrap">
            {repeatedBrands.map((brand, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-32 h-20 flex items-center justify-center mx-6 cursor-pointer transition-transform duration-300 hover:scale-110"
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
      </div>

      {/* Tailwind CSS animation */}
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll {
            display: flex;
            animation: scroll 20s linear infinite;
          }
        `}
      </style>
    </section>
  );
};

export default Brands;

