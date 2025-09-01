import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const AboutSection = () => {
  const [experienceCount, setExperienceCount] = useState(0);
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // Calculate years since 1955
  const currentYear = new Date().getFullYear();
  const yearsOfExperience = currentYear - 1955;

  useEffect(() => {
    if (isInView) {
      const timer = setInterval(() => {
        setExperienceCount((prev) => {
          if (prev < yearsOfExperience) {
            return prev + 1;
          }
          clearInterval(timer);
          return yearsOfExperience;
        });
      }, 50);

      return () => clearInterval(timer);
    }
  }, [isInView, yearsOfExperience]);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">

          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-between space-y-8"
          >
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold uppercase">
              About Us
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Al Azmeh Paints Company
              <span className="block text-blue-600 mt-2">Founded in 1955</span>
            </h2>
            <p className="text-gray-700 text-lg">
              Delivering the highest quality paint systems for homes, furniture, automotive, and industrial applications. 
              Decades of excellence and expertise make us a trusted brand locally and globally.
            </p>
            <p className="text-gray-600 text-lg">
              From our headquarters in Damascus, Syria, we innovate and expand our reach worldwide.
            </p>

            {/* Features with check marks */}
            <div className="space-y-4">
              {['Premium Quality', 'Global Reach', 'Innovation Leader', 'Trusted Partner'].map((label, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-800 font-semibold">{label}</span>
                </div>
              ))}
            </div>

            <motion.button
              onClick={() => navigate('/about')}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="group inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold text-lg rounded-full shadow-lg hover:scale-105 transition-transform"
            >
              <span>Learn More</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>

          {/* Right Side - Logo & Experience */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center items-stretch"
          >
            <div className="relative bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 w-full flex flex-col justify-between">

              {/* EST. Badge */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg">
                EST. 1955
              </div>

              {/* Logo */}
              <img src="/images/Azmeh-Paints-Logo.png" alt="Logo" className="h-24 w-auto mx-auto mb-6" />

              {/* Experience Counter in geometric shape */}
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-8 rounded-3xl relative w-32 h-32 flex items-center justify-center shadow-lg">
                  <motion.div
                    ref={ref}
                    className="text-4xl font-bold text-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: isInView ? 1 : 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    {experienceCount}+
                  </motion.div>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
