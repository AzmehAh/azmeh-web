import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, Phone, Mail, CheckCircle, AlertTriangle } from 'lucide-react';
import { coatingSystemsData, getTechnicalSolutions } from '../data/coatingSystemsData';

const SystemDetail = () => {
  const { systemId } = useParams<{ systemId: string }>();
  const navigate = useNavigate();

  // Combine all systems data
  const allSystems = [...coatingSystemsData, ...getTechnicalSolutions()];
  const system = allSystems.find(s => s.id === systemId);

  if (!system) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">System Not Found</h2>
          <button
            onClick={() => navigate('/')}
            className="bg-[#2C5DB6] text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Back to Home
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
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-[#2C5DB6] text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-white hover:text-gray-200 mb-6 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </button>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                {system.title}
              </h1>
              {system.subtitle && (
                <p className="text-xl text-blue-100 mb-6">
                  {system.subtitle}
                </p>
              )}
              <p className="text-lg text-blue-50 leading-relaxed">
                {system.description}
              </p>
            </div>
            
            <div className="relative">
              <img
                src={system.images[0]}
                alt={system.title}
                className="w-full h-80 object-cover rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        {/* Purpose & Applications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div variants={itemVariants} className="bg-gray-50 p-8 rounded-xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <CheckCircle className="w-6 h-6 mr-3 text-[#2C5DB6]" />
              Purpose & Benefits
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg mb-6">
              {system.purpose}
            </p>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Advantages</h3>
            <ul className="space-y-3">
              {system.advantages.map((advantage, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-3 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{advantage}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-blue-50 p-8 rounded-xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Applications</h2>
            <div className="grid grid-cols-1 gap-3">
              {system.applications.map((application, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-[#2C5DB6]">
                  <span className="text-gray-800 font-medium">{application}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Technical Specifications */}
        <motion.div variants={itemVariants} className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Technical Specifications</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
              <thead className="bg-[#2C5DB6] text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Property</th>
                  <th className="px-6 py-4 text-left font-semibold">Value</th>
                  <th className="px-6 py-4 text-left font-semibold">Unit</th>
                </tr>
              </thead>
              <tbody>
                {system.technicalSpecs.map((spec, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-4 font-medium text-gray-900">{spec.property}</td>
                    <td className="px-6 py-4 text-gray-700 font-semibold">{spec.value}</td>
                    <td className="px-6 py-4 text-gray-600">{spec.unit || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Application Instructions */}
        <motion.div variants={itemVariants} className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Application Instructions</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Surface Preparation */}
            <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-orange-500">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-orange-500" />
                Surface Preparation
              </h3>
              <ul className="space-y-2">
                {system.instructions.surfacePreparation.map((step, index) => (
                  <li key={index} className="flex items-start">
                    <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2 py-1 rounded-full mr-3 mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-gray-700 text-sm">{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Application Steps */}
            <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                Application Steps
              </h3>
              <ul className="space-y-2">
                {system.instructions.application.map((step, index) => (
                  <li key={index} className="flex items-start">
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full mr-3 mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-gray-700 text-sm">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Additional Instructions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Mixing Instructions</h4>
              <p className="text-gray-700 text-sm">{system.instructions.mixing}</p>
            </div>
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Drying Time</h4>
              <p className="text-gray-700 text-sm">{system.instructions.dryingTime}</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Environmental Conditions</h4>
              <ul className="text-gray-700 text-sm space-y-1">
                {system.instructions.conditions.map((condition, index) => (
                  <li key={index}>• {condition}</li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Product Information */}
        <motion.div variants={itemVariants} className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Available Colors</h3>
              <div className="space-y-2">
                {system.colors.map((color, index) => (
                  <span key={index} className="inline-block bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-700 mr-2 mb-2 shadow-sm">
                    {color}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Packaging</h3>
              <div className="space-y-2">
                {system.packaging.map((pack, index) => (
                  <div key={index} className="bg-white px-3 py-2 rounded-lg text-sm font-medium text-gray-700 shadow-sm">
                    {pack}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Shelf Life</h3>
              <p className="text-gray-700">{system.shelfLife}</p>
            </div>
          </div>
        </motion.div>

        {/* Safety Information */}
        <motion.div variants={itemVariants} className="mb-16">
          <div className="bg-red-50 border border-red-200 p-8 rounded-xl">
            <h2 className="text-2xl font-bold text-red-800 mb-6 flex items-center">
              <AlertTriangle className="w-6 h-6 mr-3" />
              Safety Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {system.safety.map((safety, index) => (
                <div key={index} className="flex items-start">
                  <AlertTriangle className="w-4 h-4 mr-3 text-red-600 mt-0.5 flex-shrink-0" />
                  <span className="text-red-800 text-sm">{safety}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Contact & Downloads */}
        <motion.div variants={itemVariants} className="bg-[#2C5DB6] text-white p-8 rounded-xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Need More Information?</h2>
            <p className="text-blue-100 text-lg">
              Contact our technical team for detailed specifications and application guidance
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button className="flex items-center justify-center bg-white text-[#2C5DB6] px-6 py-4 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-semibold">
              <Download className="w-5 h-5 mr-2" />
              Download Datasheet
            </button>
            <button className="flex items-center justify-center bg-blue-700 text-white px-6 py-4 rounded-lg hover:bg-blue-800 transition-colors duration-200 font-semibold">
              <Phone className="w-5 h-5 mr-2" />
              Technical Support
            </button>
            <button className="flex items-center justify-center bg-blue-700 text-white px-6 py-4 rounded-lg hover:bg-blue-800 transition-colors duration-200 font-semibold">
              <Mail className="w-5 h-5 mr-2" />
              Request Sample
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SystemDetail;