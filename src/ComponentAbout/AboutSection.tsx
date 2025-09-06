import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Eye, Target, Heart, ArrowRight } from "lucide-react";

const cards = [
  {
    id: 1,
    title: "Vision",
    image: "https://m.media-amazon.com/images/I/71wqob-X0nL._UF894%2C1000_QL80_.jpg",
    description:
      "To be the leading innovator in paint and coating technologies, providing sustainable solutions that protect and beautify homes, furniture, vehicles, and industrial facilities worldwide.",
    icon: Eye,
  },
  {
    id: 2,
    title: "Mission",
    image: "https://com.bimago.media/media/catalog/image/view/product/127492/role/image/size/1500x2240/type/ft-osmr-wiz1/61b99cf5ba9560c800f08e85e8e3f534.webp",
    description:
      "To provide superior paint and coating solutions that protect, beautify, and enhance every surface we touch. We are committed to innovation, quality, and customer satisfaction while maintaining our responsibility to the environment.",
    icon: Target,
  },
  {
    id: 3,
    title: "Values",
    image: "https://com.bimago.media/media/catalog/image/view/product/127492/role/image/size/1500x2240/type/ft-osmr-wiz1/61b99cf5ba9560c800f08e85e8e3f534.webp",
    description:
      "Quality Excellence, Innovation, Environmental Responsibility, Customer Trust, Employee Growth, and Industry Leadership guide every decision we make and every solution we create.",
    icon: Heart,
  },
];

const AboutSection = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const cardRefs = [React.useRef(null), React.useRef(null), React.useRef(null)];

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
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
                onClick={() => navigate("/about")}
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
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20"></div>
                </div>

                {/* Circle Effect */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-[#0055A3] origin-center"
                  initial={{ scale: 0, opacity: 0.3 }}
                  animate={{
                    scale: hoveredCard === card.id ? 3 : 0,
                    opacity: hoveredCard === card.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  style={{
                    width: "125%",
                    height: "400%",
                    top: "auto",
                    bottom: "-400%",
                    left: "auto",
                    right: "-16px",
                  }}
                />

                {/* Content */}
                <div className="relative z-10 p-6 flex flex-col justify-between h-full">
                  <h3 className="text-2xl font-bold text-white">{card.title}</h3>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: hoveredCard === card.id ? 1 : 0,
                      y: hoveredCard === card.id ? 0 : 20,
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
  );
};

export default AboutSection;
