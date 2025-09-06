import React from "react";
import { motion } from "framer-motion";
import { Shield, Lightbulb, Globe, Users, Handshake, Award } from "lucide-react";

const companyValues = [
  {
    icon: Shield,
    title: "Quality Excellence",
    description: "Unwavering commitment to delivering the highest quality paint systems.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Continuous research and development to create cutting-edge coating technologies.",
  },
  {
    icon: Globe,
    title: "Social Responsibility",
    description: "Environmental stewardship through eco-friendly formulations and sustainable practices.",
  },
  {
    icon: Users,
    title: "Employee Growth",
    description: "Investing in our team through training and career advancement opportunities.",
  },
  {
    icon: Handshake,
    title: "Customer Trust",
    description: "Building lasting relationships through exceptional service and reliable products.",
  },
  {
    icon: Award,
    title: "Industry Leadership",
    description: "Setting standards for excellence and innovation in the paint and coatings industry.",
  },
];

const Values = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Core Values
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The principles that guide every decision we make and every solution we create for our customers.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {companyValues.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-white shadow-lg hover:shadow-2xl transition-all duration-500 p-8 border border-gray-100 hover:border-[#0055A3]/20"
            >
              <div className="flex flex-col items-start gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 flex items-center justify-center">
                    <value.icon className="w-8 h-8 group-hover:text-[#0055A3] text-gray-600" />
                  </div>
                  <h3 className="text-xl font-bold group-hover:text-[#0055A3] text-gray-900">{value.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Values;
