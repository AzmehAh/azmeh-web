import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertTriangle, Zap, Shield, Palette, Droplets } from 'lucide-react';

interface SystemDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  systemData: SystemData | null;
}

interface SystemData {
  id: string;
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  applications: string[];
  features: string[];
  technicalSpecs: {
    coverage: string;
    dryingTime: string;
    thickness: string;
    temperature: string;
    durability: string;
    finish: string;
  };
  advantages: string[];
  applicationMethod: string[];
  safetyInfo: string[];
  relatedProducts: string[];
  images: string[];
}

const SystemDetailsModal: React.FC<SystemDetailsModalProps> = ({ isOpen, onClose, systemData }) => {
  if (!systemData) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Content */}
          <div className="flex min-h-full items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
            >
              {/* Header */}
              <div className="relative bg-gradient-to-r from-[#2C5DB6] to-blue-700 text-white p-8">
                <button
                  onClick={onClose}
                  className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
                >
                  <X className="w-6 h-6" />
                </button>
                
                <div className="pr-16">
                  <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-4">
                    {systemData.category}
                  </span>
                  <h1 className="text-4xl font-bold mb-4">{systemData.title}</h1>
                  <p className="text-xl opacity-90 leading-relaxed">
                    {systemData.description}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
                <div className="p-8">
                  {/* Main Description */}
                  <div className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <Palette className="w-6 h-6 text-[#2C5DB6] mr-3" />
                      Product Overview
                    </h2>
                    <div className="bg-gray-50 rounded-xl p-6">
                      <p className="text-gray-700 text-lg leading-relaxed">
                        {systemData.fullDescription}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left Column */}
                    <div className="space-y-10">
                      {/* Applications */}
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                          <Zap className="w-5 h-5 text-[#2C5DB6] mr-2" />
                          Applications
                        </h3>
                        <ul className="space-y-2">
                          {systemData.applications.map((app, index) => (
                            <li key={index} className="flex items-center text-gray-700">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                              {app}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Features */}
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                          <Shield className="w-5 h-5 text-[#2C5DB6] mr-2" />
                          Key Features
                        </h3>
                        <ul className="space-y-2">
                          {systemData.features.map((feature, index) => (
                            <li key={index} className="flex items-center text-gray-700">
                              <CheckCircle className="w-4 h-4 text-blue-500 mr-3 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Application Methods */}
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                          <Droplets className="w-5 h-5 text-[#2C5DB6] mr-2" />
                          Application Methods
                        </h3>
                        <ul className="space-y-2">
                          {systemData.applicationMethod.map((method, index) => (
                            <li key={index} className="flex items-center text-gray-700">
                              <div className="w-2 h-2 bg-[#2C5DB6] rounded-full mr-3 flex-shrink-0" />
                              {method}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-10">
                      {/* Technical Specifications */}
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                          Technical Specifications
                        </h3>
                        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                          {Object.entries(systemData.technicalSpecs).map(([key, value], index) => (
                            <div key={key} className={`px-6 py-4 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                              <div className="flex justify-between items-center">
                                <span className="font-medium text-gray-900 capitalize">
                                  {key.replace(/([A-Z])/g, ' $1').trim()}
                                </span>
                                <span className="text-gray-700">{value}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Advantages */}
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                          Product Advantages
                        </h3>
                        <ul className="space-y-3">
                          {systemData.advantages.map((advantage, index) => (
                            <li key={index} className="flex items-start text-gray-700">
                              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                                <CheckCircle className="w-3 h-3 text-green-600" />
                              </div>
                              {advantage}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Safety Information */}
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                          <AlertTriangle className="w-5 h-5 text-orange-500 mr-2" />
                          Safety Information
                        </h3>
                        <ul className="space-y-2">
                          {systemData.safetyInfo.map((info, index) => (
                            <li key={index} className="flex items-center text-gray-700">
                              <AlertTriangle className="w-4 h-4 text-orange-500 mr-3 flex-shrink-0" />
                              {info}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Related Products */}
                  {systemData.relatedProducts.length > 0 && (
                    <div className="mt-12 pt-8 border-t border-gray-200">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        Related Products
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {systemData.relatedProducts.map((product, index) => (
                          <span
                            key={index}
                            className="px-4 py-2 bg-blue-50 text-[#2C5DB6] rounded-full text-sm font-medium hover:bg-blue-100 transition-colors cursor-pointer"
                          >
                            {product}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-gray-200 p-6 bg-gray-50">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    For more information, contact our technical support team
                  </p>
                  <div className="flex space-x-3">
                    <button className="px-6 py-2 bg-[#2C5DB6] text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                      Download Datasheet
                    </button>
                    <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                      Contact Support
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SystemDetailsModal;