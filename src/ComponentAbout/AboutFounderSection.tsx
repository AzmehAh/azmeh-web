import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Users } from "lucide-react";

const AboutFounderSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-40 bg-[#0055A3] relative overflow-hidden text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

           {/* Combined Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left Side: Founder Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-[#0055A3] rounded-3xl opacity-20 blur-xl"></div>
            <div className="relative bg-gradient-to-br from-[#2C5DB6] to-blue-800 rounded-3xl p-8 shadow-2xl">
              <div className="w-64 h-64 mx-auto bg-gray-300 rounded-2xl flex items-center justify-center">
                <Users className="w-32 h-32 text-gray-500" />
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-2xl font-bold text-gray-50 mb-2">Ehsan Ezzat Al Azmeh</h3>
                <p className="text-blue-200">Founder & Visionary</p>
                <div className="mt-4 space-y-1 text-sm text-blue-200">
                  <p>Born: 1918, Damascus</p>
                  <p>Started Business: 1938</p>
                  <p>Founded Al Azmeh Paints: 1955</p>
                  <p>Legacy Continues: 1918 - 1998</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Combined Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 text-gray-100"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Al Azmeh Paints – Excellence & Vision Since 1955
            </h2>
            <p className="leading-relaxed text-lg">
              Ahmed Al Azmeh, born in 1918 in Damascus, Syria, began his entrepreneurial journey in 1938. 
              In 1955, he founded Al Azmeh Paints with a clear vision: to deliver the highest quality paint systems 
              for every application. With decades of excellence and expertise, the company quickly grew 
              into a leading name in the paint industry.  
              <br /><br />
              Under Ahmed's visionary leadership until 1998, Al Azmeh Paints became synonymous with quality, 
              innovation, and customer satisfaction. His legacy continues to guide the company today, 
              maintaining the same commitment to excellence established nearly seven decades ago.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-200 mb-2">80</div>
                <div className="text-gray-200">Years of Leadership</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-200 mb-2">1955</div>
                <div className="text-gray-200">Company Founded</div>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default AboutFounderSection;
