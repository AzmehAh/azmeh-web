import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Factory, Globe, Users } from "lucide-react";

const goals = [
  {
    icon: TrendingUp,
    title: "Market Expansion",
    description: "Strengthen our position as the leading paint manufacturer in the Middle East and expand to new international markets.",
  },
  {
    icon: Factory,
    title: "Production Excellence",
    description: "Modernize manufacturing facilities and implement Industry 4.0 technologies for enhanced efficiency.",
  },
  {
    icon: Globe,
    title: "Sustainability Goals",
    description: "Achieve carbon neutrality by 2030 and develop comprehensive eco-friendly product lines.",
  },
  {
    icon: Users,
    title: "Customer Excellence",
    description: "Provide world-class customer service and technical support across all markets we serve.",
  },
];

const Goals = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Strategic Goals
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Driving innovation and excellence in every aspect of our business to shape the future of the paint industry.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {goals.map((goal, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden p-8"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center">
                  <goal.icon className="w-8 h-8 text-[#0055A3]" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{goal.title}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">{goal.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Goals;
