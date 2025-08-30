import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Download, 
  Shield, 
  Package, 
  AlertTriangle, 
  CheckCircle,
  Zap,
  FileText,
  Image as ImageIcon
} from 'lucide-react';
import { productsData } from '../data/productsData';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const product = productsData.find(p => p.id === id);

  useEffect(() => {
    if (product && product.images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex(prev => (prev + 1) % product.images.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <button
            onClick={() => navigate('/products')}
            className="bg-[#2C5DB6] text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const handleDownloadDatasheet = () => {
    // Simulate PDF download
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${product.code}-datasheet.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/products')}
              className="flex items-center space-x-2 text-gray-600 hover:text-[#2C5DB6] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Products</span>
            </button>
            
            <div className="flex items-center space-x-4">
              <span className="px-3 py-1 bg-blue-50 text-[#2C5DB6] text-sm font-medium rounded-full">
                {product.brand}
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                {product.code}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Product Image */}
          <div className="lg:col-span-1">
            <div className="sticky top-32">
              <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden p-8">
                <div className="aspect-square mb-6">
                  <motion.img
                    key={currentImageIndex}
                    src={product.images[currentImageIndex]}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-xl"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
                
                {/* Image Navigation Dots */}
                {product.images.length > 1 && (
                  <div className="flex justify-center space-x-2 mb-6">
                    {product.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-200 ${
                          currentImageIndex === index ? 'bg-[#2C5DB6]' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                )}

                {/* Download Button */}
                <motion.button
                  onClick={handleDownloadDatasheet}
                  className="w-full bg-gradient-to-r from-[#2C5DB6] to-blue-700 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-3"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Download className="w-6 h-6" />
                  <span>Download Datasheet</span>
                </motion.button>
              </div>
            </div>
          </div>

          {/* Right Column - Product Information */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title & Description */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center space-x-3 mb-6">
                <FileText className="w-8 h-8 text-[#2C5DB6]" />
                <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Product Overview</h3>
                  <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Technical Description</h3>
                  <p className="text-gray-700 leading-relaxed">{product.technicalDescription}</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Product Specifications</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Type</span>
                      <span className="font-medium text-gray-900">{product.type}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Material</span>
                      <span className="font-medium text-gray-900">{product.material}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Usage</span>
                      <span className="font-medium text-gray-900">{product.usage}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Brand</span>
                      <span className="font-medium text-gray-900">{product.brand}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Applications & Instructions */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center space-x-3 mb-6">
                <Zap className="w-7 h-7 text-[#2C5DB6]" />
                <h2 className="text-3xl font-bold text-gray-900">Applications & Instructions</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Applications</h3>
                  <ul className="space-y-3">
                    {product.applications.map((app, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{app}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Application Instructions</h3>
                  <ul className="space-y-3">
                    {product.instructions.map((instruction, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-[#2C5DB6] text-white rounded-full flex items-center justify-center text-sm font-medium mt-0.5 flex-shrink-0">
                          {index + 1}
                        </div>
                        <span className="text-gray-700">{instruction}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Technical Specifications */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center space-x-3 mb-6">
                <ImageIcon className="w-7 h-7 text-[#2C5DB6]" />
                <h2 className="text-3xl font-bold text-gray-900">Technical Specifications</h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Property</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Value</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Standard</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.technicalSpecs.map((spec, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="py-4 px-6 font-medium text-gray-900">{spec.property}</td>
                        <td className="py-4 px-6 text-gray-700">{spec.value}</td>
                        <td className="py-4 px-6 text-gray-600 text-sm">{spec.standard}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Packaging & Sizes */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center space-x-3 mb-6">
                <Package className="w-7 h-7 text-[#2C5DB6]" />
                <h2 className="text-3xl font-bold text-gray-900">Packaging & Sizes</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {product.packaging.map((pack, index) => (
                  <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 text-center border border-blue-100">
                    <div className="w-16 h-16 bg-[#2C5DB6] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Package className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{pack.size}</h4>
                    <p className="text-gray-600 text-sm mb-3">{pack.type}</p>
                    <div className="text-2xl font-bold text-[#2C5DB6]">{pack.coverage}</div>
                    <p className="text-gray-500 text-xs">Coverage</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-6 bg-amber-50 rounded-xl border border-amber-200">
                <h4 className="text-lg font-semibold text-amber-800 mb-3">Storage Recommendations</h4>
                <ul className="space-y-2 text-amber-700">
                  {product.storage.map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Safety Information */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center space-x-3 mb-6">
                <Shield className="w-7 h-7 text-[#2C5DB6]" />
                <h2 className="text-3xl font-bold text-gray-900">Safety & Handling</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <AlertTriangle className="w-5 h-5 text-orange-500 mr-2" />
                    Safety Precautions
                  </h3>
                  <ul className="space-y-3">
                    {product.safety.precautions.map((precaution, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <AlertTriangle className="w-4 h-4 text-orange-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{precaution}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Shield className="w-5 h-5 text-green-500 mr-2" />
                    First Aid
                  </h3>
                  <ul className="space-y-3">
                    {product.safety.firstAid.map((aid, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <Shield className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{aid}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-red-50 rounded-xl border border-red-200">
                <h4 className="text-lg font-semibold text-red-800 mb-3 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Important Safety Notice
                </h4>
                <p className="text-red-700 text-sm leading-relaxed">
                  Always read the complete safety data sheet before use. Ensure proper ventilation and use appropriate personal protective equipment. Keep away from children and pets.
                </p>
              </div>
            </div>

            {/* Key Features */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Key Features & Benefits</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {product.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100"
                  >
                    <div className="w-10 h-10 bg-[#2C5DB6] rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-gray-800 font-medium">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Contact & Support */}
            <div className="bg-gradient-to-r from-[#2C5DB6] to-blue-700 rounded-2xl shadow-lg p-8 text-white">
              <h2 className="text-3xl font-bold mb-6">Need Technical Support?</h2>
              <p className="text-xl opacity-90 mb-8 leading-relaxed">
                Our technical experts are ready to help you with product selection, application guidance, and troubleshooting.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-white text-[#2C5DB6] px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex-1">
                  Contact Technical Support
                </button>
                <button className="border border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors flex-1">
                  Request Sample
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;