import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const AboutSection = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const cardRefs = [useRef(null), useRef(null), useRef(null)];

  const cards = [
    {
      id: 1,
      title: 'Vision',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      description: 'To be the leading innovator in paint and coating technologies, providing sustainable solutions that protect and beautify homes, furniture, vehicles, and industrial facilities worldwide.'
    },
    {
      id: 2,
      title: 'Mission',
      image: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      description: 'To provide superior paint and coating solutions that protect, beautify, and enhance every surface we touch. We are committed to innovation, quality, and customer satisfaction while maintaining our responsibility to the environment.'
    },
    {
      id: 3,
      title: 'Values',
      image: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      description: 'Quality Excellence, Innovation, Environmental Responsibility, Customer Trust, Employee Growth, and Industry Leadership guide every decision we make and every solution we create.'
    }
  ];

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">

          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-[#2C5DB6] via-blue-600 to-blue-800 rounded-3xl p-10 shadow-xl flex flex-col justify-center text-white relative overflow-hidden"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center">
              Al Azmeh Paints – Excellence Since 1955
            </h2>
            <p className="text-blue-100 mb-8 leading-relaxed text-lg text-center">
              Al Azmeh has set its sights on delivering the highest quality paint systems and coatings. 
              With decades of excellence and expertise, we have become one of the leading brands in the paint industry.
            </p>
          </motion.div>

          {/* Right Column - Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col space-y-6 h-full"
          >
            {cards.map((card, index) => (
              <motion.div
                key={card.id}
                ref={cardRefs[index]}
                className="relative flex-1 overflow-hidden cursor-pointer group"
                onHoverStart={() => setHoveredCard(card.id)}
                onHoverEnd={() => setHoveredCard(null)}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Background Image */}
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-60 object-cover rounded-2xl transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Hover Text */}
                {hoveredCard === card.id && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center px-6 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-white text-lg md:text-xl font-semibold">
                      {card.description}
                    </p>
                  </motion.div>
                )}

                {/* Title Centered */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
                  <h3 className="text-2xl font-bold text-white">{card.title}</h3>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
