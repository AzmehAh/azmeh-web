import React from 'react';

const Brands = () => {
  const brands = [
    { name: 'Azmeh Paints', logo: '/images/Azmeh-Paints-Logo.png' },
    { name: 'SRT', logo: '/images/SRT-.gif' },
    { name: 'Original', logo: '/images/Original.gif' },
    { name: 'Omegan', logo: '/images/Omegan.gif' },
    { name: 'Mlonati', logo: '/images/Mlonati.gif' },
    { name: 'Jupiter', logo: '/images/Jupiter.gif' },
     { name: 'COPRAbEL', logo: '/images/COPRAbEL.jpg' },
   { name: 'Capric', logo: '/images/Capric.gif' },
   { name: 'Azur', logo: '/images/Azur-.png' },
   { name: 'AlDahab', logo: '/images/AlDahab.png' },
  
  ];

  // نسخ العناصر مرتين لتكرار سلس
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
          <div className="flex w-max animate-scroll">
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

      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); } /* -50% لأننا نسخنا العناصر مرتين */
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


