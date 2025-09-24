import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';


const AboutSection = () => {
  const [count, setCount] = useState(0);
  const currentYear = new Date().getFullYear();
  const targetYears = currentYear - 1955; // يحسب عدد السنوات منذ 1955
  const duration = 2000; // مدة العد بالمللي ثانية

  useEffect(() => {
    const steps = 60; // عدد خطوات العد
    const increment = targetYears / steps;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      if (currentStep <= steps) {
        setCount(Math.floor(increment * currentStep));
      } else {
        setCount(targetYears); // لضمان الوصول للرقم الصحيح
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [targetYears, duration]);


  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <h3 className="text-sm uppercase text-[#0055A3] mb-2">Our Legacy</h3>
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

        {/* Right Content - Company Image with Counter Badge */}
<motion.div
  initial={{ opacity: 0, x: 20 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6, delay: 0.2 }}
  className="relative flex justify-center"
>
  {/* حاوية الصورة بارتفاع متطابق مع النص */}
  <div className="w-full max-w-md lg:max-w-lg h-full">
    <img
      src="https://i.pinimg.com/1200x/8f/46/97/8f4697297b8614f72f58f55b66accd09.jpg"
      alt="Al Azmeh Paints Company"
      className="rounded-xl shadow-lg object-cover w-full h-full"
    />
  </div>

  {/* Counter Badge - Hexagon Shape */}
  <motion.div
    className="absolute bottom-0 right-0  transform -translate-x-1/2"
    initial={{ scale: 0.5, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.5, delay: 0.5 }}
  >
    <div className="hexagon-badge">
      <div className="count">{count}Y+</div>
      <div className="label"></div>
    </div>
  </motion.div>
</motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
