import React from "react";
import { Eye, Target } from "lucide-react";

const goals = () => {
  return (
    <section className="py-40 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* عنوان السكشن */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Our Vision & Mission
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Driving innovation and excellence in every aspect of our business.
          </p>
        </div> 

        {/* كتل Vision و Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#0070C0] rounded-2xl p-8 text-white flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Eye className="w-6 h-6 text-white" />
              <h3 className="text-2xl font-bold">Vision</h3>
            </div>
            <p className="text-sm leading-relaxed">
              To be the leading innovator in paint and coating technologies, providing sustainable solutions that protect and beautify homes, furniture, vehicles, and industrial facilities worldwide.
            </p>
          </div>

          <div className="bg-[#0070C0] rounded-2xl p-8 text-white flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Target className="w-6 h-6 text-white" />
              <h3 className="text-2xl font-bold">Mission</h3>
            </div>
            <p className="text-sm leading-relaxed">
              To provide superior paint and coating solutions that protect, beautify, and enhance every surface we touch. We are committed to innovation, quality, and customer satisfaction while maintaining our responsibility to the environment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default goals;
