import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Save,
  X,
  FileText,
  Eye,
  Package,
  Settings
} from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { api, ProductDetails } from '../../lib/supabase';

const ProductDetailsManager = () => {
  const [productDetails, setProductDetails] = useState<ProductDetails[]>([]);
  const [filteredDetails, setFilteredDetails] = useState<ProductDetails[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDetails, setSelectedDetails] = useState<ProductDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProductDetails();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = productDetails.filter(details =>
        details.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        details.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredDetails(filtered);
    } else {
      setFilteredDetails(productDetails);
    }
  }, [searchTerm, productDetails]);

  const fetchProductDetails = async () => {
    try {
      const data = await api.getAllProductDetails();
      setProductDetails(data || []);
    } catch (error) {
      console.error('Error fetching product details:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProductDetails = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product details page?')) return;

    try {
      await api.deleteProductDetails(id);
      setProductDetails(productDetails.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting product details:', error);
      alert('Error deleting product details');
    }
  };

  const openModal = (details: ProductDetails | null = null, editing = false) => {
    setSelectedDetails(details);
    setIsEditing(editing);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedDetails(null);
    setIsEditing(false);
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0055A3]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Product Details</h1>
          <p className="text-gray-600">Manage detailed product bulletin pages</p>
        </div>
        <button
          onClick={() => openModal(null, true)}
          className="flex items-center px-4 py-2 bg-[#0055A3] text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Product Details
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search product details..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
        />
      </div>

      {/* Product Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDetails.map((details, index) => (
          <motion.div
            key={details.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-2">
                  {details.title}
                </h3>
                <div 
                  className="text-sm text-gray-600 line-clamp-3"
                  dangerouslySetInnerHTML={{ 
                    __html: details.description.replace(/<[^>]*>/g, '').substring(0, 150) + '...'
                  }}
                />
              </div>
              <Package className="w-6 h-6 text-[#0055A3] flex-shrink-0" />
            </div>

            <div className="text-xs text-gray-500 mb-4">
              Updated: {new Date(details.updated_at).toLocaleDateString()}
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => window.open(`/product-details/${details.id}`, '_blank')}
                className="flex-1 flex items-center justify-center p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                title="View"
              >
                <Eye className="w-4 h-4 mr-1" />
                View
              </button>
              <button
                onClick={() => openModal(details, true)}
                className="flex-1 flex items-center justify-center p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
                title="Edit"
              >
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </button>
              <button
                onClick={() => deleteProductDetails(details.id)}
                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* No details message */}
      {filteredDetails.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No product details found</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm ? 'Try adjusting your search terms' : 'Get started by adding your first product details page'}
          </p>
          {!searchTerm && (
            <button
              onClick={() => openModal(null, true)}
              className="flex items-center mx-auto px-4 py-2 bg-[#0055A3] text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Product Details
            </button>
          )}
        </div>
      )}

      {/* Product Details Modal */}
      <ProductDetailsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        productDetails={selectedDetails}
        isEditing={isEditing}
        onSave={fetchProductDetails}
      />
    </div>
  );
};

// Product Details Modal Component
const ProductDetailsModal = ({ 
  isOpen, 
  onClose, 
  productDetails, 
  isEditing, 
  onSave 
}: {
  isOpen: boolean;
  onClose: () => void;
  productDetails: ProductDetails | null;
  isEditing: boolean;
  onSave: () => void;
}) => {
  const [formData, setFormData] = useState<Partial<ProductDetails>>({
    title: '',
    description: '',
    recommended_uses: '',
    features: '',
    application_instruction: '',
    technical_info: {},
    surface_preparation: '',
    drying_time: '',
    storing_conditions: '',
    notice: ''
  });
  const [technicalInfoText, setTechnicalInfoText] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (productDetails) {
      setFormData(productDetails);
      setTechnicalInfoText(JSON.stringify(productDetails.technical_info, null, 2));
    } else {
      setFormData({
        title: '',
        description: '',
        recommended_uses: '',
        features: '',
        application_instruction: '',
        technical_info: {},
        surface_preparation: '',
        drying_time: '',
        storing_conditions: '',
        notice: ''
      });
      setTechnicalInfoText('{}');
    }
  }, [productDetails]);

  const handleSave = async () => {
    setSaving(true);
    try {
      // Parse technical info JSON
      let technicalInfo;
      try {
        technicalInfo = JSON.parse(technicalInfoText);
      } catch {
        alert('Invalid JSON in Technical Information field');
        setSaving(false);
        return;
      }

      const dataToSave = {
        ...formData,
        technical_info: technicalInfo
      };

      if (productDetails) {
        await api.updateProductDetails(productDetails.id, dataToSave);
      } else {
        await api.createProductDetails(dataToSave as Omit<ProductDetails, 'id' | 'created_at' | 'updated_at'>);
      }

      onSave();
      onClose();
    } catch (error) {
      console.error('Error saving product details:', error);
      alert('Error saving product details');
    } finally {
      setSaving(false);
    }
  };

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'color': [] }, { 'background': [] }],
      ['link'],
      ['clean']
    ]
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="flex min-h-full items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">
              {isEditing ? (productDetails ? 'Edit Product Details' : 'Add Product Details') : 'View Product Details'}
            </h3>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-140px)] p-6">
            <div className="space-y-6">
              {/* Basic Information */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Title *</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.title || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                    placeholder="Enter product title"
                  />
                ) : (
                  <p className="text-gray-900">{formData.title}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                {isEditing ? (
                  <ReactQuill
                    value={formData.description || ''}
                    onChange={(value) => setFormData(prev => ({ ...prev, description: value }))}
                    modules={quillModules}
                    theme="snow"
                    style={{ height: '200px', marginBottom: '50px' }}
                  />
                ) : (
                  <div className="prose max-w-none">
                    <ReactQuill
                      value={formData.description || ''}
                      readOnly={true}
                      theme="bubble"
                      modules={{ toolbar: false }}
                    />
                  </div>
                )}
              </div>

              {/* Recommended Uses */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Recommended Uses</label>
                {isEditing ? (
                  <ReactQuill
                    value={formData.recommended_uses || ''}
                    onChange={(value) => setFormData(prev => ({ ...prev, recommended_uses: value }))}
                    modules={quillModules}
                    theme="snow"
                    style={{ height: '150px', marginBottom: '50px' }}
                  />
                ) : (
                  <div className="prose max-w-none">
                    <ReactQuill
                      value={formData.recommended_uses || ''}
                      readOnly={true}
                      theme="bubble"
                      modules={{ toolbar: false }}
                    />
                  </div>
                )}
              </div>

              {/* Features */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Key Features</label>
                {isEditing ? (
                  <ReactQuill
                    value={formData.features || ''}
                    onChange={(value) => setFormData(prev => ({ ...prev, features: value }))}
                    modules={quillModules}
                    theme="snow"
                    style={{ height: '150px', marginBottom: '50px' }}
                  />
                ) : (
                  <div className="prose max-w-none">
                    <ReactQuill
                      value={formData.features || ''}
                      readOnly={true}
                      theme="bubble"
                      modules={{ toolbar: false }}
                    />
                  </div>
                )}
              </div>

              {/* Application Instructions */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Application Instructions</label>
                {isEditing ? (
                  <ReactQuill
                    value={formData.application_instruction || ''}
                    onChange={(value) => setFormData(prev => ({ ...prev, application_instruction: value }))}
                    modules={quillModules}
                    theme="snow"
                    style={{ height: '200px', marginBottom: '50px' }}
                  />
                ) : (
                  <div className="prose max-w-none">
                    <ReactQuill
                      value={formData.application_instruction || ''}
                      readOnly={true}
                      theme="bubble"
                      modules={{ toolbar: false }}
                    />
                  </div>
                )}
              </div>

              {/* Technical Information */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Technical Information (JSON)</label>
                {isEditing ? (
                  <textarea
                    value={technicalInfoText}
                    onChange={(e) => setTechnicalInfoText(e.target.value)}
                    rows={12}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3] font-mono text-sm"
                    placeholder='{"Color": "Gray", "Gloss": "Semi-Matt", "Volume Solids": "65-70%"}'
                  />
                ) : (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <pre className="text-xs text-gray-700 whitespace-pre-wrap">
                      {JSON.stringify(formData.technical_info, null, 2)}
                    </pre>
                  </div>
                )}
              </div>

              {/* Surface Preparation, Drying Time, Storage, Notice */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Surface Preparation</label>
                  {isEditing ? (
                    <textarea
                      value={formData.surface_preparation || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, surface_preparation: e.target.value }))}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                    />
                  ) : (
                    <p className="text-gray-900">{formData.surface_preparation}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Drying Time</label>
                  {isEditing ? (
                    <textarea
                      value={formData.drying_time || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, drying_time: e.target.value }))}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                    />
                  ) : (
                    <p className="text-gray-900">{formData.drying_time}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Storage Conditions</label>
                  {isEditing ? (
                    <textarea
                      value={formData.storing_conditions || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, storing_conditions: e.target.value }))}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                    />
                  ) : (
                    <p className="text-gray-900">{formData.storing_conditions}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Important Notice</label>
                  {isEditing ? (
                    <textarea
                      value={formData.notice || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, notice: e.target.value }))}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                    />
                  ) : (
                    <p className="text-gray-900">{formData.notice}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          {isEditing && (
            <div className="flex items-center justify-end space-x-3 p-6 border-t bg-gray-50">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 bg-[#0055A3] text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center"
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Product Details
                  </>
                )}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetailsManager;