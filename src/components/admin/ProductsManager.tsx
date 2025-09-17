import React, { useState, useEffect, useRef } from 'react';
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
  AlertTriangle
} from 'lucide-react';
import { supabase, Product, ProductImage, ProductCategory, api } from '../../lib/supabase';

const ProductsManager = () => {
  const [products, setProducts] = useState<(Product & { product_images: ProductImage[] })[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<(Product & { product_images: ProductImage[] })[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchTerm, products]);

  const fetchData = async () => {
    try {
      const [productsData, categoriesData] = await Promise.all([
        supabase
          .from('products')
          .select(`
            *,
            product_images (*)
          `)
          .order('created_at', { ascending: false }),
        api.getProductCategories()
      ]);

      setProducts(productsData.data || []);
      setCategories(categoriesData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product? This will also delete all associated images.')) return;

    try {
      // Delete will cascade to product_images due to foreign key constraint
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setProducts(products.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting product');
    }
  };

  const openModal = (product: Product | null = null, editing = false) => {
    setSelectedProduct(product);
    setIsEditing(editing);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
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
          <h1 className="text-3xl font-bold text-gray-900">Products Management</h1>
          <p className="text-gray-600">Manage your product catalog and images</p>
        </div>
        <button
          onClick={() => openModal(null, true)}
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
        {filteredProducts.map((product, index) => {
          const mainImage = product.product_images.find(img => img.is_main) || product.product_images[0];
          
          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Product Image */}
              <div className="h-48 bg-gray-100 relative">
                {mainImage ? (
                  <img
                    src={mainImage.image_url}
                    alt={mainImage.alt_text || product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Package className="w-12 h-12 text-gray-400" />
                  </div>
                )}
                <div className="absolute top-2 left-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    product.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.status}
                  </span>
                </div>
                {product.product_images.length > 0 && (
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                      {product.product_images.length} images
                    </span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 font-mono">{product.code}</p>
                  </div>
                  <span className="px-2 py-1 bg-blue-50 text-[#0055A3] text-xs font-medium rounded-full">
                    {product.brand}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                  {product.description}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                    {product.type}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                    {product.material}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                    {product.usage}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => openModal(product, false)}
                    className="flex-1 p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    title="View Product"
                  >
                    <Package className="w-4 h-4 mx-auto" />
                  </button>
                  <button
                    onClick={() => openModal(product, true)}
                    className="flex-1 p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
                    title="Edit Product"
                  >
                    <Edit className="w-4 h-4 mx-auto" />
                  </button>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="flex-1 p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Delete Product"
                  >
                    <Trash2 className="w-4 h-4 mx-auto" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* No products message */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm ? 'Try adjusting your search terms' : 'Get started by adding your first product'}
          </p>
          {!searchTerm && (
            <button
              onClick={() => openModal(null, true)}
              className="flex items-center mx-auto px-4 py-2 bg-[#0055A3] text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Product
            </button>
          )}
        </div>
      )}

      {/* Product Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={closeModal}
        product={selectedProduct}
        categories={categories}
        isEditing={isEditing}
        onSave={fetchData}
      />
    </div>
  );
};

// Product Modal Component
const ProductModal = ({ 
  isOpen, 
  onClose, 
  product, 
  categories,
  isEditing, 
  onSave 
}: {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  categories: ProductCategory[];
  isEditing: boolean;
  onSave: () => void;
}) => {
  const [activeTab, setActiveTab] = useState('basic');
  const [productImages, setProductImages] = useState<ProductImage[]>([]);
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
    status: 'active',
    category_id: ''
  });
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
        packaging: JSON.stringify(product.packaging, null, 2),
        technical_specs: JSON.stringify(product.technical_specs, null, 2),
        storage: product.storage || '',
        safety_precautions: Array.isArray(product.safety_precautions) ? product.safety_precautions.join('\n') : '',
        safety_first_aid: Array.isArray(product.safety_first_aid) ? product.safety_first_aid.join('\n') : '',
        status: product.status,
        category_id: product.category_id || ''
      });
      
      // Fetch product images
      if (product.id) {
        fetchProductImages(product.id);
      }
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
        packaging: '[]',
        technical_specs: '[]',
        storage: '',
        safety_precautions: '',
        safety_first_aid: '',
        status: 'active',
        category_id: ''
      });
      setProductImages([]);
    }
  }, [product]);

  const fetchProductImages = async (productId: string) => {
    try {
      const images = await api.getProductImages(productId);
      setProductImages(images || []);
    } catch (error) {
      console.error('Error fetching product images:', error);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0 || !product) return;

    setUploadingImage(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        await api.uploadProductImage(product.id, file, `${product.name} image`);
      }
      
      await fetchProductImages(product.id);
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Error uploading images');
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDeleteImage = async (imageId: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      await api.deleteProductImage(imageId);
      setProductImages(productImages.filter(img => img.id !== imageId));
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Error deleting image');
    }
  };

  const handleSetMainImage = async (imageId: string) => {
    if (!product) return;

    try {
      await api.setMainProductImage(product.id, imageId);
      setProductImages(productImages.map(img => ({
        ...img,
        is_main: img.id === imageId
      })));
    } catch (error) {
      console.error('Error setting main image:', error);
      alert('Error setting main image');
    }
  };

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
        technical_description: formData.technical_description,
        features: formData.features.split('\n').filter(f => f.trim()),
        applications: formData.applications.split('\n').filter(a => a.trim()),
        instructions: formData.instructions.split('\n').filter(i => i.trim()),
        packaging: JSON.parse(formData.packaging || '[]'),
        technical_specs: JSON.parse(formData.technical_specs || '[]'),
        storage: formData.storage,
        safety_precautions: formData.safety_precautions.split('\n').filter(s => s.trim()),
        safety_first_aid: formData.safety_first_aid.split('\n').filter(s => s.trim()),
        status: formData.status,
        category_id: formData.category_id || null,
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
      alert('Error saving product. Please check your JSON fields.');
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: Package },
    { id: 'technical', label: 'Technical', icon: AlertTriangle },
    { id: 'images', label: 'Images', icon: ImageIcon, count: productImages.length }
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
            <nav className="flex px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-4 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-[#0055A3] text-[#0055A3]'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon className="w-4 h-4 mr-2" />
                  {tab.label}
                  {tab.count !== undefined && (
                    <span className="ml-2 bg-gray-100 text-gray-600 py-1 px-2 rounded-full text-xs">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-200px)] p-6">
            {/* Basic Info Tab */}
            {activeTab === 'basic' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      <p className="text-gray-900 font-mono">{formData.code}</p>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    {isEditing ? (
                      <select
                        value={formData.category_id}
                        onChange={(e) => setFormData(prev => ({ ...prev, category_id: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                      >
                        <option value="">Select Category</option>
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </select>
                    ) : (
                      <p className="text-gray-900">
                        {categories.find(c => c.id === formData.category_id)?.name || 'No category'}
                      </p>
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
            )}

            {/* Technical Tab */}
            {activeTab === 'technical' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Features (one per line)</label>
                    {isEditing ? (
                      <textarea
                        value={formData.features}
                        onChange={(e) => setFormData(prev => ({ ...prev, features: e.target.value }))}
                        rows={6}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                      />
                    ) : (
                      <div className="bg-gray-50 p-3 rounded-lg">
                        {formData.features.split('\n').filter(f => f.trim()).map((feature, idx) => (
                          <div key={idx} className="flex items-center mb-1">
                            <div className="w-2 h-2 bg-[#0055A3] rounded-full mr-2" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Applications (one per line)</label>
                    {isEditing ? (
                      <textarea
                        value={formData.applications}
                        onChange={(e) => setFormData(prev => ({ ...prev, applications: e.target.value }))}
                        rows={6}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                      />
                    ) : (
                      <div className="bg-gray-50 p-3 rounded-lg">
                        {formData.applications.split('\n').filter(a => a.trim()).map((app, idx) => (
                          <div key={idx} className="flex items-center mb-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                            <span>{app}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Instructions (one per line)</label>
                  {isEditing ? (
                    <textarea
                      value={formData.instructions}
                      onChange={(e) => setFormData(prev => ({ ...prev, instructions: e.target.value }))}
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                    />
                  ) : (
                    <div className="bg-gray-50 p-3 rounded-lg">
                      {formData.instructions.split('\n').filter(i => i.trim()).map((instruction, idx) => (
                        <div key={idx} className="flex items-start mb-2">
                          <span className="bg-[#0055A3] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">
                            {idx + 1}
                          </span>
                          <span>{instruction}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Packaging (JSON)</label>
                    {isEditing ? (
                      <textarea
                        value={formData.packaging}
                        onChange={(e) => setFormData(prev => ({ ...prev, packaging: e.target.value }))}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3] font-mono text-sm"
                      />
                    ) : (
                      <pre className="bg-gray-50 p-3 rounded-lg text-sm overflow-auto">{formData.packaging}</pre>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Technical Specs (JSON)</label>
                    {isEditing ? (
                      <textarea
                        value={formData.technical_specs}
                        onChange={(e) => setFormData(prev => ({ ...prev, technical_specs: e.target.value }))}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3] font-mono text-sm"
                      />
                    ) : (
                      <pre className="bg-gray-50 p-3 rounded-lg text-sm overflow-auto">{formData.technical_specs}</pre>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Safety Precautions (one per line)</label>
                    {isEditing ? (
                      <textarea
                        value={formData.safety_precautions}
                        onChange={(e) => setFormData(prev => ({ ...prev, safety_precautions: e.target.value }))}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                      />
                    ) : (
                      <div className="bg-red-50 p-3 rounded-lg">
                        {formData.safety_precautions.split('\n').filter(s => s.trim()).map((safety, idx) => (
                          <div key={idx} className="flex items-center mb-1 text-red-800">
                            <AlertTriangle className="w-3 h-3 mr-2" />
                            <span className="text-sm">{safety}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Aid (one per line)</label>
                    {isEditing ? (
                      <textarea
                        value={formData.safety_first_aid}
                        onChange={(e) => setFormData(prev => ({ ...prev, safety_first_aid: e.target.value }))}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                      />
                    ) : (
                      <div className="bg-orange-50 p-3 rounded-lg">
                        {formData.safety_first_aid.split('\n').filter(s => s.trim()).map((aid, idx) => (
                          <div key={idx} className="flex items-center mb-1 text-orange-800">
                            <div className="w-2 h-2 bg-orange-500 rounded-full mr-2" />
                            <span className="text-sm">{aid}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Storage Requirements</label>
                  {isEditing ? (
                    <textarea
                      value={formData.storage}
                      onChange={(e) => setFormData(prev => ({ ...prev, storage: e.target.value }))}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                    />
                  ) : (
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{formData.storage}</p>
                  )}
                </div>
              </div>
            )}

            {/* Images Tab */}
            {activeTab === 'images' && (
              <ProductImagesTab
                productImages={productImages}
                isEditing={isEditing}
                uploadingImage={uploadingImage}
                onImageUpload={handleImageUpload}
                onDeleteImage={handleDeleteImage}
                onSetMainImage={handleSetMainImage}
                fileInputRef={fileInputRef}
              />
            )}
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

// Product Images Tab Component
const ProductImagesTab = ({
  productImages,
  isEditing,
  uploadingImage,
  onImageUpload,
  onDeleteImage,
  onSetMainImage,
  fileInputRef
}: {
  productImages: ProductImage[];
  isEditing: boolean;
  uploadingImage: boolean;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDeleteImage: (imageId: string) => void;
  onSetMainImage: (imageId: string) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}) => {
  return (
    <div className="space-y-6">
      {/* Upload Section */}
      {isEditing && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-gray-900">Product Images</h4>
            <div>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={onImageUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadingImage}
                className="flex items-center px-4 py-2 bg-[#0055A3] text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {uploadingImage ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Images
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Images Grid */}
      {productImages.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {productImages.map((image) => (
            <div key={image.id} className="relative group">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={image.image_url}
                  alt={image.alt_text || 'Product image'}
                  className="w-full h-full object-cover"
                />
                
                {/* Main Image Badge */}
                {image.is_main && (
                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">
                      MAIN
                    </span>
                  </div>
                )}

                {/* Action Buttons */}
                {isEditing && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                    <button
                      onClick={() => onSetMainImage(image.id)}
                      className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                      title="Set as Main Image"
                    >
                      <Star className={`w-4 h-4 ${image.is_main ? 'text-yellow-500 fill-current' : 'text-gray-600'}`} />
                    </button>
                    <button
                      onClick={() => onDeleteImage(image.id)}
                      className="p-2 bg-white rounded-full hover:bg-red-50 transition-colors"
                      title="Delete Image"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                )}
              </div>

              {/* Main Image Radio */}
              {isEditing && (
                <div className="mt-2 text-center">
                  <label className="flex items-center justify-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="mainImage"
                      checked={image.is_main || false}
                      onChange={() => onSetMainImage(image.id)}
                      className="w-4 h-4 text-[#0055A3] border-gray-300 focus:ring-[#0055A3]"
                    />
                    <span className="text-sm text-gray-700">Main Image</span>
                  </label>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No images uploaded</h3>
          <p className="text-gray-600">
            {isEditing ? 'Upload images to showcase this product' : 'No images available for this product'}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductsManager;