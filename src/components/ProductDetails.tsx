import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Download, 
  FileText, 
  Shield, 
  Wrench, 
  Package,
  AlertTriangle,
  Phone,
  Mail,
  CheckCircle
} from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import { api, ProductDetails as ProductDetailsType } from '../lib/supabase';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [productDetails, setProductDetails] = useState<ProductDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchProductDetails(id);
    }
  }, [id]);

  const fetchProductDetails = async (productId: string) => {
    try {
      const data = await api.getProductDetails(productId);
      setProductDetails(data);
    } catch (err) {
      console.error('Error fetching product details:', err);
      setError('Product details not found');
    } finally {
      setLoading(false);
    }
  };

  const renderTechnicalInfo = (technicalInfo: Record<string, any>) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(technicalInfo).map(([key, value]) => (
          <div key={key} className="bg-gray-50 rounded-lg p-4">
            <dt className="text-sm font-semibold text-gray-700 mb-2">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </dt>
            <dd className="text-sm text-gray-900">
              {typeof value === 'object' && value !== null ? (
                <div className="space-y-1">
                  {Object.entries(value).map(([subKey, subValue]) => (
                    <div key={subKey} className="flex justify-between">
                      <span className="text-gray-600">{subKey}:</span>
                      <span className="font-medium">{String(subValue)}</span>
                    </div>
                  ))}
                </div>
              ) : Array.isArray(value) ? (
                <ul className="space-y-1">
                  {value.map((item, index) => (
                    <li key={index} className="text-gray-900">{String(item)}</li>
                  ))}
                </ul>
              ) : (
                <span className="text-gray-900">{String(value)}</span>
              )}
            </dd>
          </div>
        ))}
      </div>
    );
  };

  const downloadDatasheet = () => {
    // Placeholder for download functionality
    alert('Datasheet download would be implemented here');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0055A3]"></div>
      </div>
    );
  }

  if (error || !productDetails) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">{error || 'The product details you\'re looking for don\'t exist.'}</p>
          <Link to="/products" className="bg-[#0055A3] text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center text-sm text-gray-600">
            <Link to="/" className="hover:text-[#0055A3] transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/products" className="hover:text-[#0055A3] transition-colors">Products</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{productDetails.title}</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-[#2C5DB6] to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/products')}
            className="inline-flex items-center text-blue-100 hover:text-white font-medium mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </button>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            {productDetails.title}
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={downloadDatasheet}
              className="inline-flex items-center bg-white text-[#2C5DB6] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Datasheet
            </button>
            <button className="inline-flex items-center bg-white/20 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors backdrop-blur-sm">
              <Phone className="w-5 h-5 mr-2" />
              Contact Technical Support
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          
          {/* Description */}
          {productDetails.description && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <FileText className="w-6 h-6 text-[#2C5DB6] mr-3" />
                Product Description
              </h2>
              <div className="prose prose-lg max-w-none">
                <ReactQuill
                  value={productDetails.description}
                  readOnly={true}
                  theme="bubble"
                  modules={{ toolbar: false }}
                />
              </div>
            </motion.section>
          )}

          {/* Recommended Uses */}
          {productDetails.recommended_uses && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Wrench className="w-6 h-6 text-[#2C5DB6] mr-3" />
                Recommended Uses
              </h2>
              <div className="prose prose-lg max-w-none">
                <ReactQuill
                  value={productDetails.recommended_uses}
                  readOnly={true}
                  theme="bubble"
                  modules={{ toolbar: false }}
                />
              </div>
            </motion.section>
          )}

          {/* Features */}
          {productDetails.features && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                Key Features
              </h2>
              <div className="prose prose-lg max-w-none">
                <ReactQuill
                  value={productDetails.features}
                  readOnly={true}
                  theme="bubble"
                  modules={{ toolbar: false }}
                />
              </div>
            </motion.section>
          )}

          {/* Technical Information */}
          {productDetails.technical_info && Object.keys(productDetails.technical_info).length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="bg-gradient-to-r from-[#2C5DB6] to-blue-700 px-8 py-6">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <Package className="w-6 h-6 mr-3" />
                  Technical Information
                </h2>
              </div>
              <div className="p-8">
                <dl className="space-y-6">
                  {renderTechnicalInfo(productDetails.technical_info)}
                </dl>
              </div>
            </motion.section>
          )}

          {/* Application Instructions */}
          {productDetails.application_instruction && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Wrench className="w-6 h-6 text-[#2C5DB6] mr-3" />
                Application Instructions
              </h2>
              <div className="prose prose-lg max-w-none">
                <ReactQuill
                  value={productDetails.application_instruction}
                  readOnly={true}
                  theme="bubble"
                  modules={{ toolbar: false }}
                />
              </div>
            </motion.section>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Surface Preparation */}
            {productDetails.surface_preparation && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-xl shadow-lg p-8"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Package className="w-5 h-5 text-[#2C5DB6] mr-2" />
                  Surface Preparation
                </h2>
                <p className="text-gray-700 leading-relaxed">{productDetails.surface_preparation}</p>
              </motion.section>
            )}

            {/* Drying Time */}
            {productDetails.drying_time && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white rounded-xl shadow-lg p-8"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Package className="w-5 h-5 text-[#2C5DB6] mr-2" />
                  Drying Time
                </h2>
                <p className="text-gray-700 leading-relaxed">{productDetails.drying_time}</p>
              </motion.section>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Storage Conditions */}
            {productDetails.storing_conditions && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-lg p-8 border-l-4 border-green-500"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Shield className="w-5 h-5 text-green-600 mr-2" />
                  Storage Conditions
                </h2>
                <p className="text-gray-700 leading-relaxed">{productDetails.storing_conditions}</p>
              </motion.section>
            )}

            {/* Important Notice */}
            {productDetails.notice && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-gradient-to-br from-yellow-50 to-orange-100 rounded-xl shadow-lg p-8 border-l-4 border-orange-500"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <AlertTriangle className="w-5 h-5 text-orange-600 mr-2" />
                  Important Notice
                </h2>
                <p className="text-gray-700 leading-relaxed">{productDetails.notice}</p>
              </motion.section>
            )}
          </div>

          {/* Technical Support */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-gradient-to-r from-[#2C5DB6] to-blue-700 rounded-2xl p-8 text-white"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Phone className="w-6 h-6 mr-3" />
              Technical Support
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Need Help?</h3>
                <p className="text-blue-100 mb-6 leading-relaxed">
                  Our technical experts are ready to assist you with product selection, 
                  application guidance, and troubleshooting.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 mr-3" />
                    <span>manager@dkl-syria.com</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 mr-3" />
                    <span>(+963) 988 691 712</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col justify-center space-y-4">
                <button
                  onClick={downloadDatasheet}
                  className="flex items-center justify-center bg-white text-[#2C5DB6] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Technical Datasheet
                </button>
                <button className="flex items-center justify-center bg-white/20 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors backdrop-blur-sm">
                  <Mail className="w-5 h-5 mr-2" />
                  Contact Technical Team
                </button>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;