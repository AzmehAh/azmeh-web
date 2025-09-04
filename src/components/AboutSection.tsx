import React from 'react';
import { useNavigate } from 'react-router-dom';

const AboutSection = () => {
  const navigate = useNavigate();

  const sections = [
    { title: 'Vision & Mission', description: 'Short description about vision and mission.' },
    { title: 'Values & Goals', description: 'Brief overview of company values and goals.' },
    { title: 'Company History', description: 'A short history of Al Azmeh Paints.' }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12">
        
        {/* Left Column - About Company + Read More */}
        <div className="flex flex-col justify-center bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
          <h2 className="text-3xl font-bold text-[#2C5DB6] mb-4">About Al Azmeh Paints</h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Al Azmeh Paints, founded in 1955 in Damascus, Syria, has been delivering the highest quality paint systems and coatings for decades. The company is known for excellence, innovation, and trusted solutions both locally and globally.
          </p>
          <button
            onClick={() => navigate('/about')}
            className="inline-flex items-center px-6 py-3 bg-[#2C5DB6] text-white font-semibold rounded-full hover:bg-blue-700 transition-colors duration-300"
          >
            Read More
          </button>
        </div>

        {/* Right Column - Sections */}
        <div className="flex flex-col justify-center space-y-6">
          {sections.map((section, index) => (
            <div key={index} className="group cursor-pointer">
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#2C5DB6] transition-colors duration-300">
                {section.title}
              </h3>
              <p className="text-gray-600 mt-1">{section.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
