import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Eye, Target, Heart, ArrowRight } from "lucide-react";

const cards = [
  {
    id: 1,
    title: "Vision",
    description:
      "To be the leading innovator in paint and coating technologies, providing sustainable solutions that protect and beautify homes, furniture, vehicles, and industrial facilities worldwide.",
    icon: Eye,
  },
  {
    id: 2,
    title: "Mission",
    description:
      "To provide superior paint and coating solutions that protect, beautify, and enhance every surface we touch. We are committed to innovation, quality, and customer satisfaction while maintaining our responsibility to the environment.",
    icon: Target,
  },
  {
    id: 3,
    title: "Values",
    description:
      "Quality Excellence, Innovation, Environmental Responsibility, Customer Trust, Employee Growth, and Industry Leadership guide every decision we make and every solution we create.",
    icon: Heart,
  },
];

const AboutSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-40 bg-[#0055A3] relative overflow-hidden text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="rounded-3xl p-10 flex flex-col justify-center"
          >
            <div className="mb-8 flex justify-center lg:justify-start">
              <img
                src="/images/Azmeh-Paints-Logo.png"
                alt="Al Azmeh Paints"
                className="h-16 w-auto brightness-0 invert"
              />
            </div>
            <h2 className="text-4xl md:text-4xl font-semibold mb-6 leading-tight">
              Al Azmeh Paints – Excellence Since 1955
            </h2>
            <p className="mb-8 leading-relaxed text-lg">
              Al Azmeh has set its sights on delivering the highest quality paint systems and coatings. 
              With decades of excellence and expertise, we have become one of the leading brands in the paint industry.
            </p>
            <div className="text-white/90 mb-8 text-sm uppercase tracking-wide font-medium">
              PREMIUM QUALITY • INNOVATIVE SOLUTIONS • TRUSTED WORLDWIDE
            </div>

          </motion.div>

          {/* Right Column - Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col space-y-6 h-full"
          >
            {cards.map((card) => (
              <div
                key={card.id}
                className="flex-1 bg-[#0070C0] rounded-2xl p-6 shadow-lg flex flex-col justify-start"
              >
                <h3 className="text-2xl font-bold mb-3">{card.title}</h3>
                <p className="text-white text-sm leading-relaxed">{card.description}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
