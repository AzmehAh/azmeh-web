import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const AboutSection = () => {
  const [count, setCount] = useState(0);
  const currentYear = new Date().getFullYear();
  const targetYears = currentYear - 1955;

  // Animated counter effect
  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60; // Number of animation steps
    const increment = targetYears / steps;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      if (currentStep <= steps) {
        setCount(Math.floor(increment * currentStep));
      } else {
        setCount(targetYears);
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [targetYears]);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          ><h3 className="text-sm uppercase text-[#0055A3] mb-2">
    Our Legacy
  </h3>
           <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
    Excellence in Paint Solutions
  </h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-4 sm:mb-6">
              Al Azmeh Paints has been delivering excellence in paint systems and coatings since 1955. 
              We provide innovative solutions for residential, industrial, and commercial applications worldwide.
            </p> 
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-6 sm:mb-8">
              Our commitment to quality and innovation has made us a trusted partner for professionals 
              and homeowners seeking superior paint solutions.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center bg-[#2C5DB6] text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold text-sm sm:text-base"
            >
              Read More
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            </Link>
          </motion.div>

          {/* Right Content - Experience Counter with Logo */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative">

              {/* Background decoration */}
              <div className="absolute -inset-4 bg-gradient-to-br from-[#2C5DB6]/10 to-blue-200/20 rounded-2xl blur-xl"></div>
              
              {/* Main counter card */}
              <div className="relative bg-white rounded-xl p-8 sm:p-12 lg:p-16 shadow-xl flex flex-col items-center max-w-sm mx-auto">

                {/* Logo on top */}
                <div className="w-20 sm:w-24 lg:w-28 h-12 sm:h-14 lg:h-16 mb-3 sm:mb-4">
                  <img 
                    src="/images/Azmeh-Paints-Logo.png" 
                    alt="Al Azmeh Paints" 
                    className="w-full h-full  object-contain"
                  />
                </div>
                
                {/* Counter */} 
                <motion.div 
                  className="text-2xl sm:text-3xl lg:text-4xl text-[#0055A3] font-bold mb-1 sm:mb-2"
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  {count}Y+
                </motion.div>
                <div className="text-xs sm:text-sm font-semibold text-[#0055A3] uppercase tracking-wide text-center">
                  Years of Experience
                </div>
                <div className="mt-1 sm:mt-2 text-[#0055A3] text-xs text-center">
                  Since 1955
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
