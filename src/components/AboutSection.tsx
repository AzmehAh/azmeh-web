import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const AboutSection = () => {
  const currentYear = new Date().getFullYear();
  const yearsOfExperience = currentYear - 1955;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">About Us</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Al Azmeh Paints has been delivering excellence in paint systems and coatings since 1955. 
              We provide innovative solutions for residential, industrial, and commercial applications worldwide.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Our commitment to quality and innovation has made us a trusted partner for professionals 
              and homeowners seeking superior paint solutions.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center bg-[#2C5DB6] text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold"
            >
              Read More
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>

          {/* Right Content - Experience Counter */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Background decoration */}
              <div className="absolute -inset-8 bg-gradient-to-br from-[#2C5DB6]/10 to-blue-200/20 rounded-3xl blur-2xl"></div>
              
              {/* Main counter card */}
              <div className="relative bg-gradient-to-br from-[#2C5DB6] to-blue-700 rounded-2xl p-12 text-white shadow-2xl">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    <Award className="w-12 h-12 text-yellow-300" />
                  </div>
                  <div className="text-6xl font-bold mb-2">{yearsOfExperience}</div>
                  <div className="text-xl font-semibold text-blue-100 uppercase tracking-wide">
                    Years of Experience
                  </div>
                  <div className="mt-4 text-blue-200 text-sm">
                    Since 1955
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-white/5 rounded-full"></div>
                <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/5 rounded-full"></div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;