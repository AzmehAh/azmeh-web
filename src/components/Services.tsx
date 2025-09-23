import React from 'react';

const Services = () => {
  const services = [
    { number: '01', title: 'ECO-FRIENDLY PAINTING' },
    { number: '02', title: 'PRECISION INTERIOR ' },
    { number: '03', title: 'INDUSTRIAL COATINGS' },
    { number: '04', title: 'CUSTOM SOLUTIONS' }
  ];

  return (
    <section className="py-8 sm:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="flex items-center space-x-3 sm:space-x-4 group cursor-pointer p-2 sm:p-0"
            >
              <span className="text-2xl sm:text-3xl font-bold text-gray-200 group-hover:text-[#0055a3] transition-colors duration-300 flex-shrink-0">
                {service.number}
              </span>
              <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 leading-tight">{service.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
