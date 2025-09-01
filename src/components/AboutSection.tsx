import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Calendar, MapPin, Award, Star } from 'lucide-react';

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

  const handleLearnMore = () => {
    navigate('/about');
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Company Logo and Experience */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Decorative Background Elements */}
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-br from-[#2C5DB6]/10 to-blue-300/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-gradient-to-br from-green-500/10 to-green-300/10 rounded-full blur-xl"></div>

            {/* Main Logo Container */}
            <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
              <div className="text-center">
                {/* Est. 1955 Badge */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg">
                  EST. 1955
                </div>

                {/* Company Logo */}
                <div className="mb-6 pt-4">
                  <img
                    src="/images/Azmeh-Paints-Logo.png"
                    alt="Al Azmeh Paints"
                    className="h-20 w-auto mx-auto"
                  />
                </div>

                {/* Company Name */}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Al Azmeh Paints</h3>
                <p className="text-[#2C5DB6] font-semibold mb-6">Excellence in Every Drop</p>

                {/* Location & Founded */}
                <div className="space-y-3 mb-8">
                  <div className="flex items-center justify-center space-x-2 text-gray-600">
                    <MapPin className="w-5 h-5 text-[#2C5DB6]" />
                    <span>Damascus, Syria</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-gray-600">
                    <Calendar className="w-5 h-5 text-[#2C5DB6]" />
                    <span>Founded in 1955</span>
                  </div>
                </div>

                {/* Experience Counter */}
                <div ref={ref} className="relative">
                  <div className="bg-gradient-to-br from-[#2C5DB6] to-blue-700 rounded-2xl p-6 text-white transform hover:scale-105 transition-transform duration-300">
                    <div className="text-center">
                      <motion.div
                        className="text-4xl font-bold mb-2"
                        initial={{ scale: 0 }}
                        animate={{ scale: isInView ? 1 : 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      >
                        {experienceCount}+
                      </motion.div>
                      <div className="text-blue-100 font-medium">Years of Excellence</div>
                    </div>
                  </div>

                  {/* Floating Achievement Icons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
                    transition={{ delay: 0.8 }}
                    className="absolute -top-3 -right-3 bg-yellow-400 rounded-full p-2 shadow-lg"
                  >
                    <Award className="w-5 h-5 text-yellow-800" />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
                    transition={{ delay: 1 }}
                    className="absolute -bottom-3 -left-3 bg-green-500 rounded-full p-2 shadow-lg"
                  >
                    <Star className="w-5 h-5 text-white" />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Section Header */}
            <div>
              <span className="inline-block px-4 py-2 bg-[#2C5DB6]/10 text-[#2C5DB6] rounded-full text-sm font-semibold tracking-wide uppercase mb-4">
                About Us
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Al Azmeh Paints Company
                <span className="block text-[#2C5DB6]">Founded in 1955</span>
              </h2>
            </div>

            {/* Description */}
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                Al Azmeh has set its sights on delivering the highest quality paint systems for homes, 
                furniture, automotive, and industrial applications. With decades of excellence and expertise, 
                and through constant commitment to quality, the company has become one of the leading brands 
                in the paint industry both locally and globally.
              </p>
              <p className="text-gray-600">
                From our headquarters in Damascus, Syria, we continue to innovate and expand our reach, 
                serving customers worldwide with premium paint solutions that stand the test of time.
              </p>
            </div>

            {/* Key Highlights */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { label: 'Premium Quality', icon: Award, color: 'text-blue-600' },
                { label: 'Global Reach', icon: Star, color: 'text-green-600' },
                { label: 'Innovation Leader', icon: Award, color: 'text-purple-600' },
                { label: 'Trusted Partner', icon: Star, color: 'text-orange-600' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center space-x-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className={`p-2 rounded-lg bg-gray-50 ${item.color}`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="font-semibold text-gray-800">{item.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Learn More Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <button
                onClick={handleLearnMore}
                className="group bg-gradient-to-r from-[#2C5DB6] to-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center space-x-3"
              >
                <span>Learn More About Us</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </motion.div>

            {/* Additional Stats */}
            <div className="pt-8 border-t border-gray-200">
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-[#2C5DB6]">4 Sectors</div>
                  <div className="text-sm text-gray-600">Home, Furniture, Cars, Industry</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#2C5DB6]">Quality First</div>
                  <div className="text-sm text-gray-600">Commitment to Excellence</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#2C5DB6]">Global Brand</div>
                  <div className="text-sm text-gray-600">Trusted Worldwide</div>
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