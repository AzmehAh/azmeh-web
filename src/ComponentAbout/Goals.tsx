import React from "react";
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
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Strategic Goals
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Driving innovation and excellence in every aspect of our business to shape the future of the paint industry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {goals.map((goal, index) => {
            const Icon = goal.icon;
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-100"
              >
                {/* الخط العلوي الأزرق */}
                <div className="relative h-2 overflow-hidden">
                  <div className="absolute left-0 bottom-0 w-0 h-full bg-[#0055A3] transition-all duration-400 group-hover:w-full"></div>
                </div>

                <div className="p-8 flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center transition-transform duration-300 ">
                      <Icon className="w-8 h-8 text-[#0055A3]" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{goal.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{goal.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Goals;
