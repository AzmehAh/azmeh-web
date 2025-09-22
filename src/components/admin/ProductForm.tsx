import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Save, 
  ArrowLeft, 
  Upload, 
  Trash2, 
  Plus,
  Package,
  Star,
  Image as ImageIcon
} from 'lucide-react';
import { supabase, api } from '../../lib/supabase';
import { useNavigate, useParams } from 'react-router-dom';

interface ProductFormData {
  name: string;
  code: string;
  brand: string;
  type: string;
  material: string;
  usage: string;
  description: string;
  technical_description: string;
  features: string[];
  applications: string[];
  instructions: string[];
  packaging: Array<{ size: string; type: string; coverage: string }>;
  technical_specs: Array<{ property: string; value: string; standard: string }>;
  storage: string;
  safety_precautions: string[];
  safety_first_aid: string[];
  status: string;
  featured: boolean;
  category_id?: string;
}

const ProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    code: '',
    brand: '',
    type: '',
    material: '',
    usage: '',
    description: '',
    technical_description: '',
    features: [],
    applications: [],
    instructions: [],
    packaging: [],
    technical_specs: [],
    storage: '',
    safety_precautions: [],
    safety_first_aid: [],
    status: 'active',
    featured: false,
    category_id: ''
  });

  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(isEditing);

  useEffect(() => {
    fetchCategories();
    if (isEditing) {
      fetchProduct();
    }
  }, [id, isEditing]);

  const fetchCategories = async () => {
    try {
      const data = await api.getProductCategories();
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProduct = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      const { data: productData, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      const productImages = await api.getProductImages(id);

      setFormData({
        name: productData.name || '',
        code: productData.code || '',
        brand: productData.brand || '',
        type: productData.type || '',
        material: productData.material || '',
        usage: productData.usage || '',
        description: productData.description || '',
        technical_description: productData.technical_description || '',
        features: Array.isArray(productData.features) ? productData.features : [],
        applications: Array.isArray(productData.applications) ? productData.applications : [],
        instructions: Array.isArray(productData.instructions) ? productData.instructions : [],
        packaging: Array.isArray(productData.packaging) ? productData.packaging : [],
        technical_specs: Array.isArray(productData.technical_specs) ? productData.technical_specs : [],
        storage: productData.storage || '',
        safety_precautions: Array.isArray(productData.safety_precautions) ? productData.safety_precautions : [],
        safety_first_aid: Array.isArray(productData.safety_first_aid) ? productData.safety_first_aid : [],
        status: productData.status || 'active',
        featured: productData.featured || false,
        category_id: productData.category_id || ''
      });

      setImages(productImages || []);
    } catch (error) {
      console.error('Error fetching product:', error);
      alert('Error loading product');
      navigate('/admin/products');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof ProductFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayFieldChange = (field: keyof ProductFormData, value: string) => {
    const items = value.split('\n').filter(item => item.trim() !== '');
    setFormData(prev => ({ ...prev, [field]: items }));
  };

  const handleComplexArrayChange = (field: 'packaging' | 'technical_specs', index: number, subField: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as any[]).map((item, i) => 
        i === index ? { ...item, [subField]: value } : item
      )
    }));
  };

  const addComplexArrayItem = (field: 'packaging' | 'technical_specs') => {
    const newItem = field === 'packaging' 
      ? { size: '', type: '', coverage: '' }
      : { property: '', value: '', standard: '' };
    
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field] as any[]), newItem]
    }));
  };

  const removeComplexArrayItem = (field: 'packaging' | 'technical_specs', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as any[]).filter((_, i) => i !== index)
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !id) return;

    try {
      setUploading(true);
      const uploadedImage = await api.uploadProductImage(id, file);
      setImages(prev => [...prev, uploadedImage]);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = async (imageId: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      await api.deleteProductImage(imageId);
      setImages(prev => prev.filter(img => img.id !== imageId));
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Error deleting image');
    }
  };

  const handleSetMainImage = async (imageId: string) => {
    if (!id) return;

    try {
      await api.setMainProductImage(id, imageId);
      setImages(prev => prev.map(img => ({
        ...img,
        is_main: img.id === imageId
      })));
    } catch (error) {
      console.error('Error setting main image:', error);
      alert('Error setting main image');
    }
  };

  const handleSave = async () => {
    if (!formData.name || !formData.code || !formData.brand) {
      alert('Please fill in all required fields');
      return;
    }

    setSaving(true);
    try {
      const productData = {
        ...formData,
        updated_at: new Date().toISOString()
      };

      if (isEditing) {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', id);
        
        if (error) throw error;
      } else {
        productData.created_at = new Date().toISOString();
        const { error } = await supabase
          .from('products')
          .insert([productData]);
        
        if (error) throw error;
      }

      navigate('/admin/products');
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error saving product: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0055A3]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <button
              onClick={() => navigate('/admin/products')}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Products
            </button>
            <h1 className="text-2xl font-bold text-gray-900">
              {isEditing ? 'Edit Product' : 'Add New Product'}
            </h1>
            <div className="w-20" /> {/* Spacer */}
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(100vh-200px)] p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Left Column - Basic Info */}
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Package className="w-5 h-5 mr-2 text-[#0055A3]" />
                    Basic Information
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                        placeholder="Enter product name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Product Code *</label>
                      <input
                        type="text"
                        value={formData.code}
                        onChange={(e) => handleInputChange('code', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                        placeholder="e.g., AZ-001"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Brand *</label>
                      <input
                        type="text"
                        value={formData.brand}
                        onChange={(e) => handleInputChange('brand', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                        placeholder="e.g., Azur, Original"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                      <input
                        type="text"
                        value={formData.type}
                        onChange={(e) => handleInputChange('type', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                        placeholder="e.g., Primer, Paint"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Material</label>
                      <input
                        type="text"
                        value={formData.material}
                        onChange={(e) => handleInputChange('material', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                        placeholder="e.g., Acrylic, Epoxy"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Usage</label>
                      <input
                        type="text"
                        value={formData.usage}
                        onChange={(e) => handleInputChange('usage', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                        placeholder="e.g., Interior, Exterior"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                      <select
                        value={formData.category_id}
                        onChange={(e) => handleInputChange('category_id', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                      >
                        <option value="">Select category</option>
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                      <select
                        value={formData.status}
                        onChange={(e) => handleInputChange('status', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="discontinued">Discontinued</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.featured}
                        onChange={(e) => handleInputChange('featured', e.target.checked)}
                        className="w-4 h-4 text-[#0055A3] border-gray-300 rounded focus:ring-[#0055A3]"
                      />
                      <Star className="w-4 h-4 ml-2 mr-1 text-yellow-500" />
                      <span className="text-sm text-gray-700">Featured Product</span>
                    </label>
                  </div>
                </div>

                {/* Description */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Product Description</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                        placeholder="Enter product description"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Technical Description</label>
                      <textarea
                        value={formData.technical_description}
                        onChange={(e) => handleInputChange('technical_description', e.target.value)}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                        placeholder="Enter technical description"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Storage Requirements</label>
                      <textarea
                        value={formData.storage}
                        onChange={(e) => handleInputChange('storage', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                        placeholder="Enter storage requirements"
                      />
                    </div>
                  </div>
                </div>

                {/* Features & Applications */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Features & Applications</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Features (one per line)</label>
                      <textarea
                        value={formData.features.join('\n')}
                        onChange={(e) => handleArrayFieldChange('features', e.target.value)}
                        rows={6}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                        placeholder="Enter each feature on a new line"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Applications (one per line)</label>
                      <textarea
                        value={formData.applications.join('\n')}
                        onChange={(e) => handleArrayFieldChange('applications', e.target.value)}
                        rows={6}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                        placeholder="Enter each application on a new line"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Instructions (one per line)</label>
                    <textarea
                      value={formData.instructions.join('\n')}
                      onChange={(e) => handleArrayFieldChange('instructions', e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                      placeholder="Enter each instruction on a new line"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Product Images */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <ImageIcon className="w-5 h-5 mr-2 text-[#0055A3]" />
                    Product Images
                  </h2>

                  {/* Upload */}
                  <div className="mb-4">
                    <label className="flex items-center px-4 py-2 bg-[#0055A3] text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors w-fit">
                      <Upload className="w-4 h-4 mr-2" />
                      {uploading ? 'Uploading...' : 'Upload Image'}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={uploading || !isEditing}
                      />
                    </label>
                    {!isEditing && (
                      <p className="text-sm text-gray-500 mt-2">Save the product first to upload images</p>
                    )}
                  </div>

                  {/* Images Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {images.map((image) => (
                      <div key={image.id} className="relative group">
                        <img
                          src={image.image_url}
                          alt={image.alt_text || 'Product image'}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        {image.is_main && (
                          <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 text-xs rounded">
                            Main
                          </div>
                        )}
                        <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {!image.is_main && (
                            <button
                              onClick={() => handleSetMainImage(image.id)}
                              className="p-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
                              title="Set as main image"
                            >
                              <Star className="w-3 h-3" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteImage(image.id)}
                            className="p-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                            title="Delete image"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technical Specifications */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Technical Specifications</h2>
                    <button
                      onClick={() => addComplexArrayItem('technical_specs')}
                      className="flex items-center px-3 py-1 bg-[#0055A3] text-white rounded text-sm hover:bg-blue-700"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Spec
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    {formData.technical_specs.map((spec, index) => (
                      <div key={index} className="grid grid-cols-4 gap-2 items-center">
                        <input
                          type="text"
                          value={spec.property}
                          onChange={(e) => handleComplexArrayChange('technical_specs', index, 'property', e.target.value)}
                          placeholder="Property"
                          className="px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-[#0055A3]"
                        />
                        <input
                          type="text"
                          value={spec.value}
                          onChange={(e) => handleComplexArrayChange('technical_specs', index, 'value', e.target.value)}
                          placeholder="Value"
                          className="px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-[#0055A3]"
                        />
                        <input
                          type="text"
                          value={spec.standard}
                          onChange={(e) => handleComplexArrayChange('technical_specs', index, 'standard', e.target.value)}
                          placeholder="Standard"
                          className="px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-[#0055A3]"
                        />
                        <button
                          onClick={() => removeComplexArrayItem('technical_specs', index)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Packaging */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Packaging Information</h2>
                    <button
                      onClick={() => addComplexArrayItem('packaging')}
                      className="flex items-center px-3 py-1 bg-[#0055A3] text-white rounded text-sm hover:bg-blue-700"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Package
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    {formData.packaging.map((pack, index) => (
                      <div key={index} className="grid grid-cols-4 gap-2 items-center">
                        <input
                          type="text"
                          value={pack.size}
                          onChange={(e) => handleComplexArrayChange('packaging', index, 'size', e.target.value)}
                          placeholder="Size"
                          className="px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-[#0055A3]"
                        />
                        <input
                          type="text"
                          value={pack.type}
                          onChange={(e) => handleComplexArrayChange('packaging', index, 'type', e.target.value)}
                          placeholder="Type"
                          className="px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-[#0055A3]"
                        />
                        <input
                          type="text"
                          value={pack.coverage}
                          onChange={(e) => handleComplexArrayChange('packaging', index, 'coverage', e.target.value)}
                          placeholder="Coverage"
                          className="px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-[#0055A3]"
                        />
                        <button
                          onClick={() => removeComplexArrayItem('packaging', index)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Safety Information */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Safety Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Safety Precautions (one per line)</label>
                      <textarea
                        value={formData.safety_precautions.join('\n')}
                        onChange={(e) => handleArrayFieldChange('safety_precautions', e.target.value)}
                        rows={6}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                        placeholder="Enter each precaution on a new line"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Aid (one per line)</label>
                      <textarea
                        value={formData.safety_first_aid.join('\n')}
                        onChange={(e) => handleArrayFieldChange('safety_first_aid', e.target.value)}
                        rows={6}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                        placeholder="Enter each first aid instruction on a new line"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t bg-gray-50">
            <button
              onClick={() => navigate('/admin/products')}
              className="px-6 py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-3 bg-[#0055A3] text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center font-medium"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5 mr-2" />
                  Save Product
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;