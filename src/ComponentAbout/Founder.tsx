import React from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";

const Founder = () => { 
  return (
    <section className="py-20 bg-white text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Founder Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-[#0055A3]  rounded-3xl opacity-20 blur-xl"></div>
            <div className="relative bg-gradient-to-br from-[#2C5DB6] to-blue-800 rounded-3xl p-8 shadow-2xl">
              <div className="w-64 h-64 mx-auto bg-gray-300 rounded-2xl flex items-center justify-center">
                <Users className="w-32 h-32 text-gray-500" />
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-2xl font-bold text-gray-50 mb-2">Ahmed Al Azmeh</h3>
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

          {/* Founder Description */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Visionary Leadership
            </h2>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                Ahmed Al Azmeh was born in 1918 in Damascus, Syria. He started his entrepreneurial 
                journey in 1938 and founded Al Azmeh Paints Company in 1955 with a clear vision: 
                to create the highest quality paint systems for every application.
              </p>
              <p>
                Throughout his life until 1998, Ahmed led the company with unwavering dedication 
                to quality and innovation. His vision transformed a small local business into a 
                respected name in the paint industry, serving customers across multiple sectors.
              </p>
              <p>
                His legacy of excellence continues to guide our company today, maintaining the 
                same commitment to quality and customer satisfaction that he established nearly 
                seven decades ago.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#0055A3] mb-2">80</div>
                <div className="text-gray-600">Years of Leadership</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#0055A3]  mb-2">1955</div>
                <div className="text-gray-600">Company Founded</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Founder;
