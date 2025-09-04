import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Eye, Target, Heart } from 'lucide-react';

const AboutSection = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const cardRefs = [useRef(null), useRef(null), useRef(null)];

  const cards = [
    {
      id: 1,
      title: 'Vision',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      description: 'To be the leading innovator in paint and coating technologies, providing sustainable solutions that protect and beautify homes, furniture, vehicles, and industrial facilities worldwide.',
      icon: Eye
    },
    {
      id: 2,
      title: 'Mission',
      image: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      description: 'To provide superior paint and coating solutions that protect, beautify, and enhance every surface we touch. We are committed to innovation, quality, and customer satisfaction while maintaining our responsibility to the environment.',
      icon: Target
    },
    {
      id: 3,
      title: 'Values',
      image: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      description: 'Quality Excellence, Innovation, Environmental Responsibility, Customer Trust, Employee Growth, and Industry Leadership guide every decision we make and every solution we create.',
      icon: Heart
    }
  ];

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#2C5DB6]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-300/20 rounded-full blur-2xl translate-x-1/2 translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">

          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-[#2C5DB6] via-blue-600 to-blue-800 rounded-3xl p-10 shadow-xl flex flex-col justify-center text-white relative overflow-hidden"
          >
            {/* Background decorative circles */}
            <div className="absolute top-4 right-4 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-4 left-4 w-24 h-24 bg-white/5 rounded-full blur-lg"></div>
            
            <div className="relative z-10">
              {/* Company Logo */}
              <div className="mb-8 flex justify-center lg:justify-start">
                <img
                  src="/images/Azmeh-Paints-Logo.png"
                  alt="Al Azmeh Paints"
                  className="h-16 w-auto brightness-0 invert"
                />
              </div>

              {/* Main Heading */}
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Al Azmeh Paints – Excellence Since 1955
              </h2>
              
              {/* Description */}
              <p className="text-blue-100 mb-8 leading-relaxed text-lg">
                Al Azmeh has set its sights on delivering the highest quality paint systems and coatings. 
                With decades of excellence and expertise, we have become one of the leading brands in the paint industry.
              </p>

              {/* Features */}
              <div className="text-white/90 mb-8 text-sm uppercase tracking-wide font-medium">
                PREMIUM QUALITY • INNOVATIVE SOLUTIONS • TRUSTED WORLDWIDE
              </div>

              {/* Read More Button */}
              <motion.button
                onClick={() => navigate('/about')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="self-start bg-white text-[#2C5DB6] px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Read More
              </motion.button>
            </div>
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
                className="relative flex-1 bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer group"
                onHoverStart={() => setHoveredCard(card.id)}
                onHoverEnd={() => setHoveredCard(null)}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                   <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20"></div>
                </div>

                {/* Expanding Circle Effect */}
                 <motion.div
                  className="absolute inset-0 rounded-full bg-[#425e44] origin-center"
                  initial={{ scale: 0, opacity: 0.3 }}
                    animate={{
                    scale: hoveredCard === card.id ? 3 : 0,
                    opacity: hoveredCard === card.id ? 1 : 0
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  style={{
                    width: "125%",
                    height: "400%",
                    top: "auto",
                    bottom: "-400%",
                    left: "auto",
                    right: "-16px"
                  }}
                />

                {/* Content */}
                <div className="relative z-10 p-6 h-full flex flex-col justify-between min-h-[140px]">
                  {/* Title and Icon */}
                 {/* Title Centered */}
<div className="absolute inset-0 flex items-center justify-center text-center pointer-events-none">
  <h3 className="text-2xl font-bold text-white">{card.title}</h3>
</div>


                  {/* Expandable Description with Bubble Effect */}
                  <motion.div
                    className="relative"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ 
                      height: hoveredCard === card.id ? 'auto' : 0,
                      opacity: hoveredCard === card.id ? 1 : 0
                    }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    {/* Expanding circular background */}
                    <motion.div
                      className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-xl"
                      initial={{ scale: 0, borderRadius: '50%' }}
                      animate={{ 
                        scale: hoveredCard === card.id ? 1 : 0,
                        borderRadius: hoveredCard === card.id ? '12px' : '50%'
                      }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                    
                    {/* Text Content */}
                    <motion.div 
                      className="relative z-10 p-4"
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ 
                        y: hoveredCard === card.id ? 0 : 10,
                        opacity: hoveredCard === card.id ? 1 : 0
                      }}
                      transition={{ duration: 0.3, delay: hoveredCard === card.id ? 0.2 : 0 }}
                    >
                      <p className="text-gray-700 text-sm leading-relaxed">
                         {card.description}
                      </p>
                    </motion.div>
                  </motion.div>
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