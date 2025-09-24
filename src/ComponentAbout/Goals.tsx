import React from "react";

const goals = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* عنوان السكشن */}
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
          Our Vision & Mission
        </h2>

        {/* النصوص */}
        <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
          <p>
            <strong>Vision:</strong> To be the leading innovator in paint and coating technologies, providing sustainable solutions that protect and beautify homes, furniture, vehicles, and industrial facilities worldwide.
          </p>
          <p>
            <strong>Mission:</strong> To provide superior paint and coating solutions that protect, beautify, and enhance every surface we touch. We are committed to innovation, quality, and customer satisfaction while maintaining our responsibility to the environment.
          </p>
        </div>
      </div>
    </section>
  );
};

export default goals;
