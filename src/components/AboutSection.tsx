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
   <section className="py-20 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

      {/* Left Side - Text Content */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-8"
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

        <div className="grid grid-cols-2 gap-6">
          {[
            { label: 'Premium Quality', icon: Award, color: 'bg-blue-100 text-blue-600' },
            { label: 'Global Reach', icon: Star, color: 'bg-green-100 text-green-600' },
            { label: 'Innovation Leader', icon: Award, color: 'bg-purple-100 text-purple-600' },
            { label: 'Trusted Partner', icon: Star, color: 'bg-orange-100 text-orange-600' },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="flex items-center space-x-3 p-4 rounded-xl bg-white shadow hover:shadow-lg transition-shadow"
            >
              <div className={`p-2 rounded-lg ${item.color}`}>
                <item.icon className="w-5 h-5" />
              </div>
              <span className="font-semibold text-gray-800">{item.label}</span>
            </motion.div>
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
        className="relative flex justify-center items-center"
      >
        <div className="relative bg-white p-8 rounded-3xl shadow-2xl border border-gray-100">
          {/* EST. Badge */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg">
            EST. 1955
          </div>
          {/* Logo */}
          <img src="/images/Azmeh-Paints-Logo.png" alt="Logo" className="h-24 w-auto mx-auto mb-6" />
          {/* Experience Counter */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl p-6 text-center">
            <motion.div
              ref={ref}
              className="text-4xl font-bold mb-2"
              initial={{ scale: 0 }}
              animate={{ scale: isInView ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {experienceCount}+
            </motion.div>
            <div className="text-blue-100 font-medium">Years of Excellence</div>
          </div>
          {/* Floating Icons */}
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
      </motion.div>

    </div>
  </div>
</section>

  );
};

export default AboutSection;