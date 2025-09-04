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
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const AboutAlAzmeh = () => {
  const navigate = useNavigate();

  const sections = [
    { title: 'Vision', description: 'Our vision is to deliver world-class paint solutions.' },
    { title: 'Mission', description: 'Our mission is excellence in every coat and color.' },
    { title: 'Values', description: 'Integrity, Quality, Sustainability.' },
    { title: 'Goals', description: 'Innovate and lead the paint industry globally.' },
    { title: 'Company History', description: 'Founded in 1955 in Damascus, Syria.' },
  ];

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left column - Text + Read More */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 bg-white rounded-3xl p-10 shadow-lg flex flex-col justify-center"
          >
            <span className="self-start px-4 py-2 bg-[#ffffff] text-[#2C5DB6] rounded-full text-sm font-semibold uppercase tracking-wide mb-6">
              About Al Azmeh
            </span>
            <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-6">
              Al Azmeh Paints – Excellence Since 1955
            </h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              Al Azmeh Paints has been delivering premium quality coatings for industrial and residential purposes for over 70 years. Our dedication to innovation and quality has made us a trusted global brand.
            </p>
            <motion.button
              onClick={() => navigate('/about')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="self-start px-8 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-[#2C5DB6] hover:text-[#2C5DB6] transition-all duration-300"
            >
              Read More
            </motion.button>
          </motion.div>

          {/* Right column - Sections list */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 flex flex-col justify-start space-y-6"
          >
            {sections.map((section, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl p-6 shadow hover:shadow-lg cursor-pointer transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-[#2C5DB6] mb-2">{section.title}</h3>
                <p className="text-gray-600 text-sm">{section.description}</p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutAlAzmeh;
