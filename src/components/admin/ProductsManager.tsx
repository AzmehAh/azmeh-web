import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Save,
  X,
  Package,
  Upload,
  Image as ImageIcon,
  Star,
  Eye,
  AlertCircle
} from 'lucide-react';
import { supabase, api } from '../../lib/supabase';

interface Product {
  id: string;
  name: string;
  code: string;
  brand: string;
  type: string;
  material: string;
  usage: string;
  description: string;
  technical_description?: string;
  features: string[];
  applications: string[];
  instructions: string[];
  packaging: any[];
  technical_specs: any[];
  storage: string;
  safety_precautions: string[];
  safety_first_aid: string[];
  status: string;
  created_at: string;
  updated_at: string;
  category_id?: string;
}

interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  alt_text?: string;
  sort_order: number;
  is_main: boolean;
  created_at: string;
}

const ProductsManager = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productImages, setProductImages] = useState<ProductImage[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchTerm, products]);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductImages = async (productId: string) => {
    try {
      setImageLoading(true);
      const images = await api.getProductImages(productId);
      setProductImages(images || []);
    } catch (error) {
      console.error('Error fetching product images:', error);
      setProductImages([]);
    } finally {
      setImageLoading(false);
    }
  };

  const handleUploadImages = async (files: FileList, productId: string) => {
    try {
      setImageLoading(true);
      const uploadPromises = Array.from(files).map(file => 
        api.uploadProductImage(productId, file)
      );
      
      await Promise.all(uploadPromises);
      await fetchProductImages(productId);
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Error uploading images');
    } finally {
      setImageLoading(false);
    }
  };

  const handleDeleteImage = async (imageId: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      await api.deleteProductImage(imageId);
      await fetchProductImages(selectedProduct!.id);
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Error deleting image');
    }
  };

  const handleSetMainImage = async (productId: string, imageId: string) => {
    try {
      await api.setMainProductImage(productId, imageId);
      await fetchProductImages(productId);
    } catch (error) {
      console.error('Error setting main image:', error);
      alert('Error setting main image');
    }
  };

  const openProductModal = (product: Product | null = null, editing = false) => {
    setSelectedProduct(product);
    setIsEditing(editing);
    setIsModalOpen(true);
    setActiveTab('details');
    
    if (product) {
      fetchProductImages(product.id);
    }
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsEditing(false);
    setIsModalOpen(false);
    setProductImages([]);
    setActiveTab('details');
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
          <h1 className="text-3xl font-bold text-gray-900">Products Management</h1>
          <p className="text-gray-600">Manage products and their images</p>
        </div>
        <button
          onClick={() => openProductModal(null, true)}
          className="flex items-center px-4 py-2 bg-[#0055A3] text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Product
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
        />
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-1">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 mb-2">{product.code}</p>
                <div className="flex flex-wrap gap-1 mb-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">{product.brand}</span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">{product.type}</span>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {product.status}
              </span>
            </div>

            <p className="text-sm text-gray-600 line-clamp-3 mb-4">
              {product.description}
            </p>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => openProductModal(product, false)}
                className="flex-1 p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                title="View Product"
              >
                <Eye className="w-4 h-4 mx-auto" />
              </button>
              <button
                onClick={() => openProductModal(product, true)}
                className="flex-1 p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
                title="Edit Product"
              >
                <Edit className="w-4 h-4 mx-auto" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* No products message */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm ? 'Try adjusting your search terms' : 'Get started by adding your first product'}
          </p>
        </div>
      )}

      {/* Product Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={closeModal}
        product={selectedProduct}
        isEditing={isEditing}
        onSave={fetchProducts}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        productImages={productImages}
        imageLoading={imageLoading}
        onUploadImages={handleUploadImages}
        onDeleteImage={handleDeleteImage}
        onSetMainImage={handleSetMainImage}
      />
    </div>
  );
};

// Product Modal Component
const ProductModal = ({ 
  isOpen, 
  onClose, 
  product, 
  isEditing, 
  onSave,
  activeTab,
  setActiveTab,
  productImages,
  imageLoading,
  onUploadImages,
  onDeleteImage,
  onSetMainImage
}: {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  isEditing: boolean;
  onSave: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  productImages: ProductImage[];
  imageLoading: boolean;
  onUploadImages: (files: FileList, productId: string) => Promise<void>;
  onDeleteImage: (imageId: string) => Promise<void>;
  onSetMainImage: (productId: string, imageId: string) => Promise<void>;
}) => {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    brand: '',
    type: '',
    material: '',
    usage: '',
    description: '',
    technical_description: '',
    features: '',
    applications: '',
    instructions: '',
    packaging: '',
    technical_specs: '',
    storage: '',
    safety_precautions: '',
    safety_first_aid: '',
    status: 'active'
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        code: product.code,
        brand: product.brand,
        type: product.type,
        material: product.material,
        usage: product.usage,
        description: product.description,
        technical_description: product.technical_description || '',
        features: Array.isArray(product.features) ? product.features.join('\n') : '',
        applications: Array.isArray(product.applications) ? product.applications.join('\n') : '',
        instructions: Array.isArray(product.instructions) ? product.instructions.join('\n') : '',
        packaging: Array.isArray(product.packaging) ? JSON.stringify(product.packaging, null, 2) : '',
        technical_specs: Array.isArray(product.technical_specs) ? JSON.stringify(product.technical_specs, null, 2) : '',
        storage: product.storage || '',
        safety_precautions: Array.isArray(product.safety_precautions) ? product.safety_precautions.join('\n') : '',
        safety_first_aid: Array.isArray(product.safety_first_aid) ? product.safety_first_aid.join('\n') : '',
        status: product.status
      });
    } else {
      setFormData({
        name: '',
        code: '',
        brand: '',
        type: '',
        material: '',
        usage: '',
        description: '',
        technical_description: '',
        features: '',
        applications: '',
        instructions: '',
        packaging: '',
        technical_specs: '',
        storage: '',
        safety_precautions: '',
        safety_first_aid: '',
        status: 'active'
      });
    }
  }, [product]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const productData = {
        name: formData.name,
        code: formData.code,
        brand: formData.brand,
        type: formData.type,
        material: formData.material,
        usage: formData.usage,
        description: formData.description,
        technical_description: formData.technical_description || null,
        features: formData.features ? formData.features.split('\n').filter(f => f.trim()) : [],
        applications: formData.applications ? formData.applications.split('\n').filter(a => a.trim()) : [],
        instructions: formData.instructions ? formData.instructions.split('\n').filter(i => i.trim()) : [],
        packaging: formData.packaging ? JSON.parse(formData.packaging) : [],
        technical_specs: formData.technical_specs ? JSON.parse(formData.technical_specs) : [],
        storage: formData.storage || null,
        safety_precautions: formData.safety_precautions ? formData.safety_precautions.split('\n').filter(s => s.trim()) : [],
        safety_first_aid: formData.safety_first_aid ? formData.safety_first_aid.split('\n').filter(s => s.trim()) : [],
        status: formData.status,
        updated_at: new Date().toISOString()
      };

      if (product) {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', product.id);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('products')
          .insert([productData]);
        
        if (error) throw error;
      }

      onSave();
      onClose();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error saving product');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !product) return;

    await onUploadImages(files, product.id);
    e.target.value = ''; // Reset input
  };

  if (!isOpen) return null;

  const tabs = [
    { id: 'details', label: 'Product Details', icon: Package },
    { id: 'images', label: 'Product Images', icon: ImageIcon }
  ];

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
              {isEditing ? (product ? 'Edit Product' : 'Add Product') : 'View Product'}
            </h3>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-[#0055A3] text-[#0055A3]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-5 h-5 mr-2" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
            {activeTab === 'details' && (
              <ProductDetailsTab
                formData={formData}
                setFormData={setFormData}
                isEditing={isEditing}
              />
            )}

            {activeTab === 'images' && product && (
              <ProductImagesTab
                product={product}
                images={productImages}
                loading={imageLoading}
                onUpload={handleImageUpload}
                onDelete={onDeleteImage}
                onSetMain={onSetMainImage}
              />
            )}
          </div>

          {/* Footer */}
          {isEditing && activeTab === 'details' && (
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
                    Save Product
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

// Product Details Tab
const ProductDetailsTab = ({ 
  formData, 
  setFormData, 
  isEditing 
}: {
  formData: any;
  setFormData: (data: any) => void;
  isEditing: boolean;
}) => {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900">Basic Information</h4>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
            {isEditing ? (
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
              />
            ) : (
              <p className="text-gray-900">{formData.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Code *</label>
            {isEditing ? (
              <input
                type="text"
                value={formData.code}
                onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
              />
            ) : (
              <p className="text-gray-900">{formData.code}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Brand *</label>
            {isEditing ? (
              <input
                type="text"
                value={formData.brand}
                onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
              />
            ) : (
              <p className="text-gray-900">{formData.brand}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type *</label>
            {isEditing ? (
              <input
                type="text"
                value={formData.type}
                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
              />
            ) : (
              <p className="text-gray-900">{formData.type}</p>
            )}
          </div>
        </div>

        {/* Product Classification */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900">Classification</h4>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Material *</label>
            {isEditing ? (
              <input
                type="text"
                value={formData.material}
                onChange={(e) => setFormData(prev => ({ ...prev, material: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
              />
            ) : (
              <p className="text-gray-900">{formData.material}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Usage *</label>
            {isEditing ? (
              <input
                type="text"
                value={formData.usage}
                onChange={(e) => setFormData(prev => ({ ...prev, usage: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
              />
            ) : (
              <p className="text-gray-900">{formData.usage}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            {isEditing ? (
              <select
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            ) : (
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                formData.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {formData.status}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
        {isEditing ? (
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            rows={4}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
          />
        ) : (
          <p className="text-gray-900">{formData.description}</p>
        )}
      </div>

      {/* Technical Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Technical Description</label>
        {isEditing ? (
          <textarea
            value={formData.technical_description}
            onChange={(e) => setFormData(prev => ({ ...prev, technical_description: e.target.value }))}
            rows={4}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
          />
        ) : (
          <p className="text-gray-900">{formData.technical_description}</p>
        )}
      </div>
    </div>
  );
};

// Product Images Tab
const ProductImagesTab = ({ 
  product,
  images,
  loading,
  onUpload,
  onDelete,
  onSetMain
}: {
  product: Product;
  images: ProductImage[];
  loading: boolean;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  onDelete: (imageId: string) => Promise<void>;
  onSetMain: (productId: string, imageId: string) => Promise<void>;
}) => {
  return (
    <div className="p-6 space-y-6">
      {/* Upload Section */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Product Images</h4>
        <div className="mb-4">
          <label htmlFor="image-upload" className="flex items-center justify-center w-full px-4 py-3 bg-[#0055A3] text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
            <Upload className="w-5 h-5 mr-2" />
            Upload Images
          </label>
          <input
            id="image-upload"
            type="file"
            multiple
            accept="image/*"
            onChange={onUpload}
            className="hidden"
          />
        </div>
        <p className="text-sm text-gray-600">
          Upload multiple images for this product. You can set one as the main image that will be displayed on the product page.
        </p>
      </div>

      {/* Images Grid */}
      {loading ? (
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0055A3]"></div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <div key={image.id} className="relative group bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="aspect-square">
                <img
                  src={image.image_url}
                  alt={image.alt_text || 'Product image'}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Image Actions Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                <button
                  onClick={() => onSetMain(product.id, image.id)}
                  className={`p-2 rounded-full transition-colors ${
                    image.is_main 
                      ? 'bg-green-500 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                  title={image.is_main ? 'Main Image' : 'Set as Main Image'}
                >
                  <Star className={`w-4 h-4 ${image.is_main ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={() => onDelete(image.id)}
                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  title="Delete Image"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Main Image Badge */}
              {image.is_main && (
                <div className="absolute top-2 left-2">
                  <span className="px-2 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
                    Main Image
                  </span>
                </div>
              )}

              {/* Main Image Radio Button */}
              <div className="absolute bottom-2 left-2">
                <label className="flex items-center space-x-2 text-white text-sm">
                  <input
                    type="radio"
                    name={`main-image-${product.id}`}
                    checked={image.is_main}
                    onChange={() => onSetMain(product.id, image.id)}
                    className="w-4 h-4 text-green-500"
                  />
                  <span>Main Image</span>
                </label>
              </div>
            </div>
          ))}
        </div>
      )}

      {images.length === 0 && !loading && (
        <div className="text-center py-12">
          <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No images uploaded</h3>
          <p className="text-gray-600">Upload images to showcase this product</p>
        </div>
      )}
    </div>
  );
};

export default ProductsManager;