import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Calendar, 
  Users, 
  Globe,
  Factory,
  Eye,
  Target,
  Heart,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

const About = () => {
  const [experienceCount, setExperienceCount] = useState(0);
  const [projectsCount, setProjectsCount] = useState(0);
  const [clientsCount, setClientsCount] = useState(0);
  const [countriesCount, setCountriesCount] = useState(0);

  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: true });

  // Calculate years since 1955
  const currentYear = new Date().getFullYear();
  const yearsOfExperience = currentYear - 1955;

  // Animated counters
  useEffect(() => {
    if (isStatsInView) {
      const animateCounter = (setter: (value: number) => void, target: number, duration: number) => {
        let current = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            setter(target);
            clearInterval(timer);
          } else {
            setter(Math.floor(current));
          }
        }, 16);
      };

      animateCounter(setExperienceCount, yearsOfExperience, 2000);
      animateCounter(setProjectsCount, 8000, 2500);
      animateCounter(setClientsCount, 2000, 2000);
      animateCounter(setCountriesCount, 35, 1500);
    }
  }, [isStatsInView, yearsOfExperience]);

  // Cards for Vision / Mission / Values
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const cardRefs = [useRef(null), useRef(null), useRef(null)];

  const cards = [
    {
      id: 1,
      title: 'Vision',
      image: 'https://m.media-amazon.com/images/I/71wqob-X0nL._UF894%2C1000_QL80_.jpg',
      description: 'To be the leading innovator in paint and coating technologies, providing sustainable solutions that protect and beautify homes, furniture, vehicles, and industrial facilities worldwide.',
      icon: Eye
    },
    {
      id: 2,
      title: 'Mission',
      image: 'https://com.bimago.media/media/catalog/image/view/product/127492/role/image/size/1500x2240/type/ft-osmr-wiz1/61b99cf5ba9560c800f08e85e8e3f534.webp',
      description: 'To provide superior paint and coating solutions that protect, beautify, and enhance every surface we touch. We are committed to innovation, quality, and customer satisfaction while maintaining our responsibility to the environment.',
      icon: Target
    },
    {
      id: 3,
      title: 'Values',
      image: 'https://com.bimago.media/media/catalog/image/view/product/127492/role/image/size/1500x2240/type/ft-osmr-wiz1/61b99cf5ba9560c800f08e85e8e3f534.webp',
      description: 'Quality Excellence, Innovation, Environmental Responsibility, Customer Trust, Employee Growth, and Industry Leadership guide every decision we make and every solution we create.',
      icon: Heart
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">

      {/* --- NEW SECTION: Vision / Mission / Values --- */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#0055A3]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-300/20 rounded-full blur-2xl translate-x-1/2 translate-y-1/2"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">

            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-[#0055A3] rounded-3xl p-10 shadow-xl flex flex-col justify-center text-white relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
              <div className="absolute bottom-4 left-4 w-24 h-24 bg-white/5 rounded-full blur-lg"></div>

              <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                  <div className="mb-8 flex justify-center lg:justify-start">
                    <img
                      src="/images/Azmeh-Paints-Logo.png"
                      alt="Al Azmeh Paints"
                      className="h-16 w-auto brightness-0 invert"
                    />
                  </div>

                  <h2 className="text-4xl md:text-4xl font-semibold text-white mb-6 leading-tight">
                    Al Azmeh Paints – Excellence Since 1955
                  </h2>

                  <p className="text-blue-100 mb-8 leading-relaxed text-lg">
                    Al Azmeh has set its sights on delivering the highest quality paint systems and coatings. 
                    With decades of excellence and expertise, we have become one of the leading brands in the paint industry.
                  </p>

                  <div className="text-white/90 mb-8 text-sm uppercase tracking-wide font-medium">
                    PREMIUM QUALITY • INNOVATIVE SOLUTIONS • TRUSTED WORLDWIDE
                  </div>
                </div>

                <motion.button
                  onClick={() => navigate('/about')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-6 self-center group inline-flex items-center justify-center space-x-3 px-6 py-2 border-2 border-gray-300 text-white font-semibold rounded-lg hover:border-[#2C5DB6] transition-all duration-300"
                >
                  <span>READ MORE</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
                  className="relative flex-1 bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer group flex flex-col"
                  onHoverStart={() => setHoveredCard(card.id)}
                  onHoverEnd={() => setHoveredCard(null)}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute inset-0">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20"></div>
                  </div>

                  <motion.div
                    className="absolute inset-0 rounded-full bg-[#0055A3] origin-center"
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

                  <div className="relative z-10 p-6 flex flex-col justify-between h-full">
                    <h3 className="text-2xl font-bold text-white">{card.title}</h3>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: hoveredCard === card.id ? 1 : 0,
                        y: hoveredCard === card.id ? 0 : 20
                      }}
                      transition={{ duration: 0.4 }}
                      className="mt-3"
                    >
                      <p className="text-white text-sm leading-relaxed">
                        {card.description}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </section>

      {/* --- KEEP Experience Statistics --- */}
      <section ref={statsRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Excellence in Numbers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our journey of success is reflected in these milestones that showcase our commitment to quality and innovation.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { count: experienceCount, label: 'Years of Experience', suffix: '+', icon: Calendar, color: 'blue' },
              { count: projectsCount, label: 'Projects Completed', suffix: '+', icon: Factory, color: 'green' },
              { count: clientsCount, label: 'Satisfied Clients', suffix: '+', icon: Users, color: 'purple' },
              { count: countriesCount, label: 'Countries Served', suffix: '+', icon: Globe, color: 'orange' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                 className="text-center group"
              >
                <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-${stat.color}-500 to-${stat.color}-700 flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                  <stat.icon className="w-10 h-10 text-white" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {stat.count}{stat.suffix}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* باقي سكشنات المهمة مثل Call to Action تظل كما هي */}

 


      {/* Call to Action */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-[#2C5DB6] to-blue-700 rounded-3xl p-12 text-white"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Project?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Let our {yearsOfExperience}+ years of experience and innovative solutions bring your vision to life. 
              Whether it's for your home, furniture, vehicle, or industrial facility, we have the perfect paint solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-[#2C5DB6] px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all duration-300"
              >
                Get In Touch
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/30 transition-all duration-300"
              >
                View Our Products
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;