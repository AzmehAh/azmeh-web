import React from 'react';

const Services = () => {
  const services = [
    { number: '01', title: 'ECO-FRIENDLY PAINTING' },
    { number: '02', title: 'PRECISION INTERIOR PAINTING' },
    { number: '03', title: 'INDUSTRIAL COATINGS' },
    { number: '04', title: 'CUSTOM SOLUTIONS' }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="flex items-center space-x-4 group cursor-pointer"
            >
              <span className="text-3xl font-bold text-gray-200  group-hover:text-[#0055a3] transition-colors duration-300">
                {service.number}
              </span>
              <h3 className="text-lg font-bold text-gray-900">{service.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
