import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Eye, Target, Heart } from 'lucide-react';

const AboutSection = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const cardRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];

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

  // لتحديث مواقع الكروت إذا احتجنا
  const [cardPositions, setCardPositions] = useState<{x: number, y: number, width: number, height: number}[]>([]);

  useEffect(() => {
    const updatePositions = () => {
      const positions = cardRefs.map(ref => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          return {
            x: rect.left + window.scrollX,
            y: rect.top + window.scrollY,
            width: rect.width,
            height: rect.height
          };
        }
        return { x: 0, y: 0, width: 0, height: 0 };
      });
      setCardPositions(positions);
    };
    updatePositions();
    window.addEventListener('resize', updatePositions);
    return () => window.removeEventListener('resize', updatePositions);
  }, []);

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
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Al Azmeh Paints – Excellence Since 1955
            </h2>
            <p className="text-blue-100 mb-8 leading-relaxed text-lg">
              Al Azmeh has set its sights on delivering the highest quality paint systems and coatings.
            </p>
            <motion.button
              onClick={() => navigate('/about')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="self-start bg-white text-[#2C5DB6] px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Read More
            </motion.button>
          </motion.div>

          {/* Right Column - Cards */}
          <div className="flex flex-col space-y-6 relative">
            {/* الدائرة المتحركة المشتركة */}
            {hoveredCard && cardPositions.length > 0 && (
              <motion.div
                className="absolute bg-[#425e44] rounded-full pointer-events-none z-0"
                initial={false}
                animate={{
                  width: cardPositions[hoveredCard - 1].width * 1.2,
                  height: cardPositions[hoveredCard - 1].height * 1.2,
                  x: cardPositions[hoveredCard - 1].x + cardPositions[hoveredCard - 1].width / 2,
                  y: cardPositions[hoveredCard - 1].y + cardPositions[hoveredCard - 1].height / 2,
                  opacity: 1,
                  translateX: '-50%',
                  translateY: '-50%'
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}

            {cards.map((card, index) => (
              <motion.div
                key={card.id}
                ref={cardRefs[index]}
                className="relative flex-1 bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer group z-10"
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

                {/* Content */}
                <div className="relative z-10 p-6 flex flex-col justify-between min-h-[140px]">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <card.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">{card.title}</h3>
                  </div>

                  <motion.div
                    className="relative mt-4"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: hoveredCard === card.id ? 'auto' : 0, opacity: hoveredCard === card.id ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                  >
                    <p className="text-gray-700 text-sm leading-relaxed mt-2">{card.description}</p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
