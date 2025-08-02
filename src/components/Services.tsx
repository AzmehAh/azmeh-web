import React from 'react';
import { Shield, Palette, Zap, Sparkles } from 'lucide-react';

const Services = () => {
  const services = [
    {
      number: '01',
      title: 'ECO-FRIENDLY PAINTING',
      icon: Shield,
      description: 'Sustainable paint solutions that protect both your surfaces and the environment.'
    },
    {
      number: '02',
      title: 'PRECISION INTERIOR PAINTING',
      icon: Palette,
      description: 'Professional interior painting services with meticulous attention to detail.'
    },
    {
      number: '03',
      title: 'INDUSTRIAL COATINGS',
      icon: Zap,
      description: 'Heavy-duty protective coatings for industrial and commercial applications.'
    },
    {
      number: '04',
      title: 'CUSTOM SOLUTIONS',
      icon: Sparkles,
      description: 'Tailored paint systems designed for your specific project requirements.'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div key={index} className="group">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <span className="text-6xl font-bold text-gray-200 group-hover:text-[#2C5DB6] transition-colors duration-300">
                      {service.number}
                    </span>
                  </div>
                  <div className="flex-grow pt-4">
                    <div className="mb-4">
                      <IconComponent className="w-8 h-8 text-[#2C5DB6] group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;