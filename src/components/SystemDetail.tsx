import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, Phone, Mail, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { systemsData } from '../data/systemsData';

const SystemDetail = () => {
  const navigate = useNavigate();
  const { systemId } = useParams();
  
  const system = systemsData.find(s => s.id === systemId);

  if (!system) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="pt-24 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">System Not Found</h1>
          <button
            onClick={() => navigate('/')}
            className="text-[#2C5DB6] hover:underline"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <motion.main
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="pt-24"
      >
        {/* Header Section */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div variants={itemVariants}>
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center text-[#2C5DB6] hover:text-blue-700 mb-6 transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </button>
              
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    {system.title}
                  </h1>
                  <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
                    {system.description}
                  </p>
                </div>
                <div className="flex space-x-3">
                  <button className="flex items-center bg-[#2C5DB6] text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                    <Download className="w-4 h-4 mr-2" />
                    Download Brochure
                  </button>
                  <button className="flex items-center border-2 border-[#2C5DB6] text-[#2C5DB6] px-6 py-3 rounded-lg hover:bg-[#2C5DB6] hover:text-white transition-all duration-200">
                    <Phone className="w-4 h-4 mr-2" />
                    Contact Expert
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              
              {/* Left Column - Main Content */}
              <div className="lg:col-span-2 space-y-12">
                
                {/* Product Overview */}
                <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <CheckCircle2 className="w-6 h-6 text-[#2C5DB6] mr-3" />
                    Product Overview
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {system.overview}
                  </p>
                  
                  {/* Key Features */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Features</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {system.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-gray-600">
                        <div className="w-2 h-2 bg-[#2C5DB6] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Applications & Instructions */}
                <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Applications & Usage Instructions</h2>
                  
                  {/* Applications */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Applications</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {system.applications.map((app, index) => (
                        <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <CheckCircle2 className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{app}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Application Methods */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Methods</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {system.applicationMethods.map((method, index) => (
                        <div key={index} className="text-center p-4 bg-blue-50 rounded-lg">
                          <div className="w-12 h-12 bg-[#2C5DB6] rounded-full flex items-center justify-center mx-auto mb-3">
                            <span className="text-white font-bold">{index + 1}</span>
                          </div>
                          <h4 className="font-semibold text-gray-900 mb-2">{method.method}</h4>
                          <p className="text-sm text-gray-600">{method.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mixing & Preparation */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Mixing & Preparation</h3>
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                      <div className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-amber-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-amber-800 mb-2">Important Instructions</h4>
                          <ul className="text-amber-700 text-sm space-y-1">
                            <li>• Mixing Ratio: {system.mixingRatio}</li>
                            <li>• Pot Life: {system.potLife}</li>
                            <li>• Application Temperature: {system.applicationTemp}</li>
                            <li>• Drying Time: {system.dryingTime}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Technical Specifications */}
                <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Technical Specifications</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Property</th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Value</th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Test Method</th>
                        </tr>
                      </thead>
                      <tbody>
                        {system.technicalSpecs.map((spec, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-3 font-medium text-gray-900">{spec.property}</td>
                            <td className="border border-gray-300 px-4 py-3 text-gray-600">{spec.value}</td>
                            <td className="border border-gray-300 px-4 py-3 text-gray-600">{spec.testMethod}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>

                {/* Safety Information */}
                <motion.div variants={itemVariants} className="bg-red-50 border border-red-200 rounded-xl p-8">
                  <h2 className="text-2xl font-bold text-red-900 mb-6 flex items-center">
                    <AlertTriangle className="w-6 h-6 text-red-600 mr-3" />
                    Safety Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-red-900 mb-3">Health & Safety</h3>
                      <ul className="text-red-800 text-sm space-y-2">
                        {system.safetyInfo.health.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-red-600 mr-2">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-red-900 mb-3">Environmental</h3>
                      <ul className="text-red-800 text-sm space-y-2">
                        {system.safetyInfo.environmental.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-red-600 mr-2">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right Column - Sidebar */}
              <div className="space-y-8">
                
                {/* Quick Specs Card */}
                <motion.div variants={itemVariants} className="bg-[#2C5DB6] text-white p-6 rounded-xl">
                  <h3 className="text-lg font-bold mb-4">Quick Specifications</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-blue-200 text-sm">Coverage</span>
                      <p className="font-semibold">{system.coverage}</p>
                    </div>
                    <div>
                      <span className="text-blue-200 text-sm">Drying Time</span>
                      <p className="font-semibold">{system.dryingTime}</p>
                    </div>
                    <div>
                      <span className="text-blue-200 text-sm">Durability</span>
                      <p className="font-semibold">{system.durability}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Contact Support */}
                <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Need Technical Support?</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Our technical experts are available to help you with application guidance and product selection.
                  </p>
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-center bg-[#2C5DB6] text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Technical Support
                    </button>
                    <button className="w-full flex items-center justify-center border border-[#2C5DB6] text-[#2C5DB6] px-4 py-3 rounded-lg hover:bg-[#2C5DB6] hover:text-white transition-all duration-200">
                      <Mail className="w-4 h-4 mr-2" />
                      Email Technical Team
                    </button>
                  </div>
                </motion.div>

                {/* Related Products */}
                <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Related Products</h3>
                  <div className="space-y-3">
                    {system.relatedProducts.map((product, index) => (
                      <button
                        key={index}
                        className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 border border-gray-200"
                      >
                        <p className="font-medium text-gray-900 text-sm">{product}</p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </motion.main>

      <Footer />
    </div>
  );
};

export default SystemDetail;