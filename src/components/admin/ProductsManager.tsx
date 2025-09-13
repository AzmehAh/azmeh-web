import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  Image as ImageIcon,
  Save,
  X
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

// تعريف الأنواع
export interface Product {
  id: string;
  name: string;
  code: string;
  brand: string;
  type: string;
  material: string;
  usage: string;
  description?: string;
  technical_description?: string;
  features?: string[];
  applications?: string[];
  instructions?: string;
  packaging?: any;
  storage?: string;
  safety_precautions?: string;
  safety_first_aid?: string;
  technical_specs?: any;
  status: 'active' | 'inactive' | 'draft';
  created_at: string;
  updated_at: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  created_at: string;
}

const ProductsManager = () => {
  const [products, setProducts] = useState<(Product & { product_images: ProductImage[] })[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<(Product & { product_images: ProductImage[] })[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

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
      // جلب المنتجات
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (productsError) throw productsError;

      // جلب الصور
      const { data: imagesData, error: imagesError } = await supabase
        .from('product_images')
        .select('*');

      if (imagesError) throw imagesError;

      // دمج البيانات
      const productsWithImages = productsData.map(product => ({
        ...product,
        product_images: imagesData.filter(img => img.product_id === product.id)
      }));

      setProducts(productsWithImages);
      setFilteredProducts(productsWithImages);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      // حذف الصور أولاً
      const { error: imagesError } = await supabase
        .from('product_images')
        .delete()
        .eq('product_id', id);

      if (imagesError) throw imagesError;

      // ثم حذف المنتج
      const { error: productError } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (productError) throw productError;
      
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
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600">Manage your product catalog</p>
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
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Product Image */}
            <div className="h-48 bg-gray-100 relative">
              {product.product_images?.[0] ? (
                <img
                  src={product.product_images[0].image_url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <ImageIcon className="w-12 h-12 text-gray-400" />
                </div>
              )}
              <div className="absolute top-2 right-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  product.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.status}
                </span>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                  {product.name}
                </h3>
                <span className="text-xs bg-blue-100 text-[#0055A3] px-2 py-1 rounded">
                  {product.brand}
                </span>
              </div>
              
              <p className="text-sm text-gray-500 mb-2">{product.code}</p>
              
              <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                {product.description}
              </p>

              <div className="flex flex-wrap gap-1 mb-4">
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                  {product.type}
                </span>
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                  {product.usage}
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <button
                    onClick={() => openModal(product, false)}
                    className="p-2 text-gray-600 hover:text-[#0055A3] hover:bg-blue-50 rounded transition-colors"
                    title="View"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => openModal(product, true)}
                    className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-xs text-gray-400">
                  {product.product_images?.length || 0} images
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* No products message */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
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
        isEditing={isEditing}
        onSave={fetchProducts}
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
  onSave 
}: {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  isEditing: boolean;
  onSave: () => void;
}) => {
  const [formData, setFormData] = useState<Partial<Product> & { product_images: ProductImage[] }>({
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
    instructions: '',
    packaging: '',
    storage: '',
    safety_precautions: '',
    safety_first_aid: '',
    technical_specs: '',
    status: 'active',
    product_images: []
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProductData = async () => {
      if (product) {
        try {
          // جلب صور المنتج
          const { data: images, error } = await supabase
            .from('product_images')
            .select('*')
            .eq('product_id', product.id);
          
          if (error) throw error;

          // تعيين بيانات النموذج
          setFormData({
            ...product,
            features: Array.isArray(product.features) ? product.features : [],
            applications: Array.isArray(product.applications) ? product.applications : [],
            instructions: product.instructions || '',
            packaging: product.packaging || '',
            storage: product.storage || '',
            safety_precautions: product.safety_precautions || '',
            safety_first_aid: product.safety_first_aid || '',
            technical_specs: product.technical_specs || '',
            product_images: images || []
          });
        } catch (error) {
          console.error('Error fetching product data:', error);
        }
      } else {
        // تعيين بيانات افتراضية لمنتج جديد
        setFormData({
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
          instructions: '',
          packaging: '',
          storage: '',
          safety_precautions: '',
          safety_first_aid: '',
          technical_specs: '',
          status: 'active',
          product_images: []
        });
      }
    };

    if (isOpen) {
      fetchProductData();
    }
  }, [product, isOpen]);

  const handleSave = async () => {
    setSaving(true);
    try {
      let productId = product?.id;

      // فصل بيانات المنتج عن الصور
      const productData = { ...formData };
      delete productData.product_images;

      if (product) {
        // تحديث المنتج الموجود
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', product.id);
        
        if (error) throw error;
        productId = product.id;
      } else {
        // إنشاء منتج جديد
        const { data, error } = await supabase
          .from('products')
          .insert([productData])
          .select();
        
        if (error) throw error;
        productId = data?.[0]?.id;
      }

      // معالجة صور المنتج
      if (productId) {
        // حذف الصور الحالية أولاً (في حالة التحديث)
        if (product) {
          const { error: deleteError } = await supabase
            .from('product_images')
            .delete()
            .eq('product_id', productId);
          
          if (deleteError) throw deleteError;
        }

        // إضافة الصور الجديدة
        const imagesToInsert = formData.product_images
          .filter(img => img.image_url.trim() !== '')
          .map(img => ({
            product_id: productId,
            image_url: img.image_url
          }));

        if (imagesToInsert.length > 0) {
          const { error: imagesError } = await supabase
            .from('product_images')
            .insert(imagesToInsert);
          
          if (imagesError) throw imagesError;
        }
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

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayInputChange = (field: string, index: number, value: string) => {
    setFormData(prev => {
      const currentArray = Array.isArray(prev[field]) ? [...(prev[field] as string[])] : [];
      currentArray[index] = value;
      return { ...prev, [field]: currentArray };
    });
  };

  const addArrayItem = (field: string) => {
    setFormData(prev => {
      const currentArray = Array.isArray(prev[field]) ? [...(prev[field] as string[])] : [];
      return { ...prev, [field]: [...currentArray, ''] };
    });
  };

  const removeArrayItem = (field: string, index: number) => {
    setFormData(prev => {
      const currentArray = Array.isArray(prev[field]) ? [...(prev[field] as string[])] : [];
      return { ...prev, [field]: currentArray.filter((_, i) => i !== index) };
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={onClose}
        />

        <div className="flex min-h-full items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">
                {isEditing ? (product ? 'Edit Product' : 'Add Product') : 'View Product'}
              </h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Info */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Name *
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.name || ''}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3}
                        required
                      />
                    ) : (
                      <p className="text-gray-900">{formData.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Code *
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.code || ''}
                        onChange={(e) => handleInputChange('code', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                        required
                      />
                    ) : (
                      <p className="text-gray-900">{formData.code}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Brand *
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.brand || ''}
                        onChange={(e) => handleInputChange('brand', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                        required
                      />
                    ) : (
                      <p className="text-gray-900">{formData.brand}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type *
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.type || ''}
                        onChange={(e) => handleInputChange('type', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                        required
                      />
                    ) : (
                      <p className="text-gray-900">{formData.type}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Material
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.material || ''}
                        onChange={(e) => handleInputChange('material', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                      />
                    ) : (
                      <p className="text-gray-900">{formData.material || '-'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Usage
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.usage || ''}
                        onChange={(e) => handleInputChange('usage', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                      />
                    ) : (
                      <p className="text-gray-900">{formData.usage || '-'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    {isEditing ? (
                      <select
                        value={formData.status || 'active'}
                        onChange={(e) => handleInputChange('status', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="draft">Draft</option>
                      </select>
                    ) : (
                      <p className="text-gray-900 capitalize">{formData.status}</p>
                    )}
                  </div>
                </div>

                {/* Description & Technical Info */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    {isEditing ? (
                      <textarea
                        value={formData.description || ''}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                      />
                    ) : (
                      <p className="text-gray-900 whitespace-pre-wrap">{formData.description || '-'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Technical Description
                    </label>
                    {isEditing ? (
                      <textarea
                        value={formData.technical_description || ''}
                        onChange={(e) => handleInputChange('technical_description', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                      />
                    ) : (
                      <p className="text-gray-900 whitespace-pre-wrap">{formData.technical_description || '-'}</p>
                    )}
                  </div>

                  {/* Features */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Features
                    </label>
                    {isEditing ? (
                      <div className="space-y-2">
                        {formData.features?.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={feature}
                              onChange={(e) => handleArrayInputChange('features', index, e.target.value)}
                              className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                              placeholder="Enter feature"
                            />
                            <button
                              type="button"
                              onClick={() => removeArrayItem('features', index)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => addArrayItem('features')}
                          className="flex items-center text-sm text-[#0055A3] hover:text-blue-700"
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Add Feature
                        </button>
                      </div>
                    ) : (
                      <ul className="list-disc list-inside text-gray-900">
                        {formData.features?.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                        {(!formData.features || formData.features.length === 0) && <li>-</li>}
                      </ul>
                    )}
                  </div>

                  {/* Applications */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Applications
                    </label>
                    {isEditing ? (
                      <div className="space-y-2">
                        {formData.applications?.map((application, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={application}
                              onChange={(e) => handleArrayInputChange('applications', index, e.target.value)}
                              className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                              placeholder="Enter application"
                            />
                            <button
                              type="button"
                              onClick={() => removeArrayItem('applications', index)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => addArrayItem('applications')}
                          className="flex items-center text-sm text-[#0055A3] hover:text-blue-700"
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Add Application
                        </button>
                      </div>
                    ) : (
                      <ul className="list-disc list-inside text-gray-900">
                        {formData.applications?.map((application, index) => (
                          <li key={index}>{application}</li>
                        ))}
                        {(!formData.applications || formData.applications.length === 0) && <li>-</li>}
                      </ul>
                    )}
                  </div>
                </div>
              </div>

              {/* Additional Sections */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Instructions */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Instructions
                  </label>
                  {isEditing ? (
                    <textarea
                      value={formData.instructions || ''}
                      onChange={(e) => handleInputChange('instructions', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                    />
                  ) : (
                    <p className="text-gray-900 whitespace-pre-wrap">{formData.instructions || '-'}</p>
                  )}
                </div>

                {/* Storage */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Storage
                  </label>
                  {isEditing ? (
                    <textarea
                      value={formData.storage || ''}
                      onChange={(e) => handleInputChange('storage', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                    />
                  ) : (
                    <p className="text-gray-900 whitespace-pre-wrap">{formData.storage || '-'}</p>
                  )}
                </div>

                {/* Safety Precautions */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Safety Precautions
                  </label>
                  {isEditing ? (
                    <textarea
                      value={formData.safety_precautions || ''}
                      onChange={(e) => handleInputChange('safety_precautions', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                    />
                  ) : (
                    <p className="text-gray-900 whitespace-pre-wrap">{formData.safety_precautions || '-'}</p>
                  )}
                </div>

                {/* First Aid */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Aid Measures
                  </label>
                  {isEditing ? (
                    <textarea
                      value={formData.safety_first_aid || ''}
                      onChange={(e) => handleInputChange('safety_first_aid', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                    />
                  ) : (
                    <p className="text-gray-900 whitespace-pre-wrap">{formData.safety_first_aid || '-'}</p>
                  )}
                </div>
              </div>

              {/* Product Images */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Images
                </label>
                {isEditing ? (
                  <div className="space-y-3">
                    {formData.product_images?.map((image, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="url"
                          value={image.image_url}
                          onChange={(e) => {
                            const newImages = [...formData.product_images];
                            newImages[index] = { ...newImages[index], image_url: e.target.value };
                            setFormData(prev => ({ ...prev, product_images: newImages }));
                          }}
                          className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                          placeholder="Enter image URL"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newImages = formData.product_images.filter((_, i) => i !== index);
                            setFormData(prev => ({ ...prev, product_images: newImages }));
                          }}
                          className="p-2 text-red-600 hover:bg-red-50 rounded"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          product_images: [...prev.product_images, { id: '', product_id: '', image_url: '', created_at: '' }]
                        }));
                      }}
                      className="flex items-center text-sm text-[#0055A3] hover:text-blue-700"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Image URL
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {formData.product_images?.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image.image_url}
                          alt={`Product image ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0zMiAxNlY0OCIgc3Ryb2tlPSIjQ0RDRUNGIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8cGF0aCBkPSJNMTYgMzJINDgiIHN0cm9rZT0iI0NEQ0VDRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPC9zdmc+';
                          }}
                        />
                      </div>
                    ))}
                    {(!formData.product_images || formData.product_images.length === 0) && (
                      <div className="col-span-full text-center py-8 text-gray-500">
                        <ImageIcon className="w-12 h-12 mx-auto mb-2" />
                        <p>No images available</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              
              {isEditing && (
                <button
                  onClick={handleSave}
                  disabled={saving || !formData.name || !formData.code || !formData.brand || !formData.type}
                  className="flex items-center px-4 py-2 bg-[#0055A3] text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default ProductsManager;