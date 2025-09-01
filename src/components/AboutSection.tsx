import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';

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

  const achievements = [
    'Premium Quality Paint Systems',
    'Industrial & Residential Solutions', 
    'Trusted Globally for Excellence',
    'Advanced Coating Technologies',
    'Over 70 Years of Innovation'
  ];

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 opacity-5">
        <div className="w-full h-full bg-gradient-to-tl from-green-500 to-transparent rounded-full"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Side - Logo and Visual Elements (4 columns) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-4 relative"
          >
            {/* Decorative corner triangle */}
            <div className="absolute -top-8 -left-8 w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 transform rotate-45 rounded-lg"></div>
            
            {/* Main logo container */}
            <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
              {/* Decorative leaf pattern around year */}
              <div className="relative mb-6">
                <div className="absolute -top-2 -left-2 text-green-500 opacity-20">
                  <svg width="120" height="60" viewBox="0 0 120 60" className="fill-current">
                    <path d="M10,30 Q30,10 50,30 Q70,50 90,30 Q110,10 120,30" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <circle cx="20" cy="25" r="3" fill="currentColor"/>
                    <circle cx="40" cy="35" r="3" fill="currentColor"/>
                    <circle cx="60" cy="25" r="3" fill="currentColor"/>
                    <circle cx="80" cy="35" r="3" fill="currentColor"/>
                    <circle cx="100" cy="25" r="3" fill="currentColor"/>
                  </svg>
                </div>
                <div className="text-center text-4xl font-bold text-green-600 mb-2">1955</div>
              </div>

              {/* Company Logo */}
              <div className="text-center mb-6">
                <img
                  src="/images/Azmeh-Paints-Logo.png"
                  alt="Al Azmeh Paints"
                  className="h-20 w-auto mx-auto mb-4"
                />
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">AL AZMEH PAINTS</h3>
  
                  <p className="text-green-600 font-semibold mt-2">Excellence ... Quality</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Center - Experience Counter (2 columns) */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 flex justify-center"
            ref={ref}
          >
            <div className="relative">
              {/* Hexagonal background */}
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg width="128" height="128" viewBox="0 0 128 128" className="absolute inset-0">
                  <polygon
                    points="64,8 104,32 104,96 64,120 24,96 24,32"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="3"
                    className="opacity-20"
                  />
                  <polygon
                    points="64,12 100,34 100,94 64,116 28,94 28,34"
                    fill="#F0FDF4"
                    stroke="#10B981"
                    strokeWidth="2"
                  />
                </svg>
                <div className="relative z-10 text-center">
                  <div className="text-4xl font-bold text-gray-900">
                    {experienceCount}Y+
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    Proven Experience
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Company Information (6 columns) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-6"
          >
            {/* About Us Label */}
            <span className="inline-block px-4 py-2 bg-green-100 text-green-600 rounded-full text-sm font-semibold uppercase tracking-wide mb-6">
              About Us
            </span>
            
            {/* Main Heading */}
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
              Al Azmeh Paints Company Founded in 1955 in Damascus, Syria
            </h2>
            
            {/* Description */}
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Al Azmeh has set its sights on delivering the highest quality paint systems and coatings. 
              With decades of excellence and expertise, and through its constant commitment to quality, 
              the company has become one of the leading brands in the paint industry both locally and globally.
            </p>

            {/* Achievements Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center space-x-3 group"
                >
                  <div className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <span className="text-gray-700 font-medium">{achievement}</span>
                </motion.div>
              ))}
            </div>

            {/* Read More Button */}
            <motion.button
              onClick={() => navigate('/about')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center space-x-3 px-8 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-[#2C5DB6] hover:text-[#2C5DB6] transition-all duration-300"
            >
              <span>READ MORE</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Decorative SVG elements */}
      <div className="absolute bottom-0 left-0 w-32 h-32 opacity-10">
        <svg viewBox="0 0 100 100" className="w-full h-full text-green-500 fill-current">
          <circle cx="50" cy="50" r="40" fillOpacity="0.1"/>
          <circle cx="50" cy="50" r="25" fillOpacity="0.2"/>
          <circle cx="50" cy="50" r="10" fillOpacity="0.3"/>
        </svg>
      </div>
    </section>
  );
};

export default AboutSection;