import React from "react";

const goals = () => {
  return (
    <section className="py-40 bg-[#0055A3] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* عنوان السكشن */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our Vision & Mission
          </h2>
          <p className="text-lg text-white/90 max-w-3xl mx-auto">
            Driving innovation and excellence in every aspect of our business.
          </p>
        </div>

        {/* نصوص Vision و Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-white">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Vision</h3>
            <p className="text-lg leading-relaxed">
              To be the leading innovator in paint and coating technologies, providing sustainable solutions that protect and beautify homes, furniture, vehicles, and industrial facilities worldwide.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4">Mission</h3>
            <p className="text-lg leading-relaxed">
              To provide superior paint and coating solutions that protect, beautify, and enhance every surface we touch. We are committed to innovation, quality, and customer satisfaction while maintaining our responsibility to the environment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default goals;
