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
  X,
  Upload
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

// Types
interface ProductImage {
  id?: string;
  image_url: string;
  product_id?: string;
}

interface TechnicalSpec {
  property: string;
  value: string;
  standard: string;
}

interface PackagingSize {
  size: string;
  type?: string;
  coverage?: string;
}

interface Product {
  id: string;
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
  instructions: string;
  packaging: PackagingSize[];
  storage: string;
  safety_precautions: string;
  safety_first_aid: string;
  technical_specs: TechnicalSpec[];
  status: 'active' | 'inactive' | 'draft';
  created_at?: string;
}

const ProductsManager = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productImages, setProductImages] = useState<Record<string, ProductImage[]>>({});
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // دالة مساعدة لتحويل الحقول
  const parseField = (field: any, defaultValue: any = []): any => {
    if (Array.isArray(field)) return field;
    if (typeof field === 'string' && field.trim() !== '') {
      try {
        const parsed = JSON.parse(field);
        return Array.isArray(parsed) ? parsed : defaultValue;
      } catch (e) {
        // إذا فشل التحويل، حاول تقسيم النص بفواصل
        if (typeof field === 'string') {
          return field.split(',').map(item => item.trim()).filter(item => item !== '');
        }
        return defaultValue;
      }
    }
    return defaultValue;
  };

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
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (productsError) throw productsError;
      
      const { data: imagesData, error: imagesError } = await supabase
        .from('product_images')
        .select('*');

      if (imagesError) throw imagesError;
      
      // Parse all fields correctly
      const parsedData = (productsData || []).map(item => ({
        ...item,
        features: parseField(item.features, []),
        applications: parseField(item.applications, []),
        packaging: parseField(item.packaging, []),
        technical_specs: parseField(item.technical_specs, []),
        instructions: item.instructions || '',
        storage: item.storage || '',
        safety_precautions: item.safety_precautions || '',
        safety_first_aid: item.safety_first_aid || ''
      })) as Product[];
      
      setProducts(parsedData);
      setFilteredProducts(parsedData);
      
      const imagesByProduct: Record<string, ProductImage[]> = {};
      (imagesData || []).forEach(image => {
        if (!imagesByProduct[image.product_id]) {
          imagesByProduct[image.product_id] = [];
        }
        imagesByProduct[image.product_id].push(image);
      });
      
      setProductImages(imagesByProduct);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const { error: imageError } = await supabase
        .from('product_images')
        .delete()
        .eq('product_id', id);
      
      if (imageError) throw imageError;
      
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

  const uploadImage = async (file: File) => {
    try {
      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `product-images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('products')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('products')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image');
      return null;
    } finally {
      setUploading(false);
    }
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
        {filteredProducts.map((product, index) => {
          const images = productImages[product.id] || [];
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
                {images[0] ? (
                  <img
                    src={images[0].image_url}
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
                      : product.status === 'inactive'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
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
                    {images.length} images
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
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
      {isModalOpen && (
        <ProductModal
          isOpen={isModalOpen}
          onClose={closeModal}
          product={selectedProduct}
          isEditing={isEditing}
          onSave={fetchProducts}
          onUploadImage={uploadImage}
          uploading={uploading}
          productImages={productImages}
          parseField={parseField}
        />
      )}
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
  onUploadImage,
  uploading,
  productImages,
  parseField
}: {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  isEditing: boolean;
  onSave: () => void;
  onUploadImage: (file: File) => Promise<string | null>;
  uploading: boolean;
  productImages: Record<string, ProductImage[]>;
  parseField: (field: any, defaultValue: any) => any;
}) => {
  const [formData, setFormData] = useState<Partial<Product>>({
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
    packaging: [],
    storage: '',
    safety_precautions: '',
    safety_first_aid: '',
    technical_specs: [],
    status: 'active'
  });
  const [images, setImages] = useState<ProductImage[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (product) {
      const productData = {
        ...product,
        features: parseField(product.features, []),
        applications: parseField(product.applications, []),
        packaging: parseField(product.packaging, []),
        technical_specs: parseField(product.technical_specs, []),
        instructions: product.instructions || '',
        storage: product.storage || '',
        safety_precautions: product.safety_precautions || '',
        safety_first_aid: product.safety_first_aid || ''
      };
      setFormData(productData);
      setImages(productImages[product.id] || []);
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
        features: [],
        applications: [],
        instructions: '',
        packaging: [],
        storage: '',
        safety_precautions: '',
        safety_first_aid: '',
        technical_specs: [],
        status: 'active'
      });
      setImages([]);
    }
  }, [product, productImages, parseField]);

  const handleSave = async () => {
    setSaving(true);
    try {
      let productId = product?.id;

      const productData = { 
        ...formData,
        features: JSON.stringify(formData.features || []),
        applications: JSON.stringify(formData.applications || []),
        packaging: JSON.stringify(formData.packaging || []),
        technical_specs: JSON.stringify(formData.technical_specs || [])
      };

      if (product) {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', product.id);
        if (error) throw error;
        productId = product.id;
      } else {
        const { data, error } = await supabase
          .from('products')
          .insert([productData])
          .select();
        if (error) throw error;
        productId = data?.[0]?.id;
      }

      if (productId) {
        await manageProductImages(productId);
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

  const manageProductImages = async (productId: string) => {
    const { data: existingImages } = await supabase
      .from('product_images')
      .select('*')
      .eq('product_id', productId);

    const imagesToKeep = images.filter(img => img.id).map(img => img.id);
    const imagesToDelete = existingImages?.filter(img => !imagesToKeep.includes(img.id)) || [];
    
    for (const img of imagesToDelete) {
      await supabase
        .from('product_images')
        .delete()
        .eq('id', img.id);
    }

    for (const img of images) {
      if (img.id) {
        await supabase
          .from('product_images')
          .update({ image_url: img.image_url })
          .eq('id', img.id);
      } else {
        await supabase
          .from('product_images')
          .insert([{ product_id: productId, image_url: img.image_url }]);
      }
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayInputChange = (field: string, index: number, value: string) => {
    setFormData(prev => {
      const currentArray = Array.isArray(prev[field]) ? [...(prev[field] as any[])] : [];
      currentArray[index] = value;
      return { ...prev, [field]: currentArray };
    });
  };

   const handlePackagingChange = (index: number, field: keyof PackagingSize, value: string) => {
    setFormData(prev => {
      const currentPackaging = Array.isArray(prev.packaging) ? [...prev.packaging] : [];
      if (!currentPackaging[index]) {
        currentPackaging[index] = { size: '', type: '', coverage: '' };
      }
      currentPackaging[index] = { ...currentPackaging[index], [field]: value };
      return { ...prev, packaging: currentPackaging };
    });
  };

  const addPackagingItem = () => {
    setFormData(prev => ({
      ...prev,
      packaging: [...(prev.packaging || []), { size: '', type: '', coverage: '' }]
    }));
  };

  const removePackagingItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      packaging: (prev.packaging || []).filter((_, i) => i !== index)
    }));
  };

  const handleSpecChange = (index: number, field: keyof TechnicalSpec, value: string) => {
    setFormData(prev => {
      const currentSpecs = Array.isArray(prev.technical_specs) ? [...prev.technical_specs] : [];
      if (!currentSpecs[index]) {
        currentSpecs[index] = { property: '', value: '', standard: '' };
      }
      currentSpecs[index] = { ...currentSpecs[index], [field]: value };
      return { ...prev, technical_specs: currentSpecs };
    });
  };

  const addSpecItem = () => {
    setFormData(prev => ({
      ...prev,
      technical_specs: [...(prev.technical_specs || []), { property: '', value: '', standard: '' }]
    }));
  };

  const removeSpecItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      technical_specs: (prev.technical_specs || []).filter((_, i) => i !== index)
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const imageUrl = await onUploadImage(file);
      if (imageUrl) {
        setImages(prev => [...prev, { image_url: imageUrl }]);
      }
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {isEditing ? (product ? 'Edit Product' : 'Add Product') : 'Product Details'}
              </h2>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0055A3] disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Code *
                  </label>
                  <input
                    type="text"
                    value={formData.code || ''}
                    onChange={(e) => handleInputChange('code', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0055A3] disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brand *
                  </label>
                  <input
                    type="text"
                    value={formData.brand || ''}
                    onChange={(e) => handleInputChange('brand', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0055A3] disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type *
                  </label>
                  <input
                    type="text"
                    value={formData.type || ''}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0055A3] disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Material
                  </label>
                  <input
                    type="text"
                    value={formData.material || ''}
                    onChange={(e) => handleInputChange('material', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0055A3] disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Usage
                  </label>
                  <input
                    type="text"
                    value={formData.usage || ''}
                    onChange={(e) => handleInputChange('usage', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0055A3] disabled:bg-gray-100"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  disabled={!isEditing}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0055A3] disabled:bg-gray-100"
                />
              </div>

              {/* Technical Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Technical Description
                </label>
                <textarea
                  value={formData.technical_description || ''}
                  onChange={(e) => handleInputChange('technical_description', e.target.value)}
                  disabled={!isEditing}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0055A3] disabled:bg-gray-100"
                />
              </div>

              {/* Features */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Features (one per line)
                </label>
                <textarea
                  value={(formData.features || []).join('\n')}
                  onChange={(e) => handleInputChange('features', e.target.value.split('\n').filter(line => line.trim() !== ''))}
                  disabled={!isEditing}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0055A3] disabled:bg-gray-100"
                />
              </div>

              {/* Applications */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Applications (one per line)
                </label>
                <textarea
                  value={(formData.applications || []).join('\n')}
                  onChange={(e) => handleInputChange('applications', e.target.value.split('\n').filter(line => line.trim() !== ''))}
                  disabled={!isEditing}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0055A3] disabled:bg-gray-100"
                />
              </div>

              {/* Images */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Images
                </label>
                {isEditing && (
                  <div className="mb-4">
                    <label className="flex items-center justify-center px-4 py-2 bg-gray-100 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-200 transition-colors">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Images
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={uploading}
                      />
                    </label>
                    {uploading && <p className="text-sm text-gray-500 mt-2">Uploading...</p>}
                  </div>
                )}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image.image_url}
                        alt={`Product image ${index + 1}`}
                        className="w-full h-32 object-cover rounded-md"
                      />
                      {isEditing && (
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Specifications */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Technical Specifications
                  </label>
                  {isEditing && (
                    <button
                      type="button"
                      onClick={addSpecItem}
                      className="text-sm text-[#0055A3] hover:text-blue-700"
                    >
                      + Add Specification
                    </button>
                  )}
                </div>
                <div className="space-y-3">
                  {(formData.technical_specs || []).map((spec, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-3 items-start">
                      <input
                        type="text"
                        placeholder="Property"
                        value={spec.property}
                        onChange={(e) => handleSpecChange(index, 'property', e.target.value)}
                        disabled={!isEditing}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0055A3] disabled:bg-gray-100"
                      />
                      <input
                        type="text"
                        placeholder="Value"
                        value={spec.value}
                        onChange={(e) => handleSpecChange(index, 'value', e.target.value)}
                        disabled={!isEditing}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0055A3] disabled:bg-gray-100"
                      />
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Standard"
                          value={spec.standard}
                          onChange={(e) => handleSpecChange(index, 'standard', e.target.value)}
                          disabled={!isEditing}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0055A3] disabled:bg-gray-100"
                        />
                        {isEditing && (
                          <button
                            type="button"
                            onClick={() => removeSpecItem(index)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Packaging */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Packaging Sizes
                  </label>
                  {isEditing && (
                    <button
                      type="button"
                      onClick={addPackagingItem}
                      className="text-sm text-[#0055A3] hover:text-blue-700"
                    >
                      + Add Packaging
                    </button>
                  )}
                </div>
                <div className="space-y-3">
                  {(formData.packaging || []).map((pkg, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-3 items-start">
                      <input
                        type="text"
                        placeholder="Size"
                        value={pkg.size}
                        onChange={(e) => handlePackagingChange(index, 'size', e.target.value)}
                        disabled={!isEditing}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0055A3] disabled:bg-gray-100"
                      />
                      <input
                        type="text"
                        placeholder="Type"
                        value={pkg.type || ''}
                        onChange={(e) => handlePackagingChange(index, 'type', e.target.value)}
                        disabled={!isEditing}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0055A3] disabled:bg-gray-100"
                      />
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Coverage"
                          value={pkg.coverage || ''}
                          onChange={(e) => handlePackagingChange(index, 'coverage', e.target.value)}
                          disabled={!isEditing}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0055A3] disabled:bg-gray-100"
                        />
                        {isEditing && (
                          <button
                            type="button"
                            onClick={() => removePackagingItem(index)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Usage Instructions
                  </label>
                  <textarea
                    value={formData.instructions || ''}
                    onChange={(e) => handleInputChange('instructions', e.target.value)}
                    disabled={!isEditing}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0055A3] disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Storage Conditions
                  </label>
                  <textarea
                    value={formData.storage || ''}
                    onChange={(e) => handleInputChange('storage', e.target.value)}
                    disabled={!isEditing}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0055A3] disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Safety Precautions
                  </label>
                  <textarea
                    value={formData.safety_precautions || ''}
                    onChange={(e) => handleInputChange('safety_precautions', e.target.value)}
                    disabled={!isEditing}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0055A3] disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Aid Measures
                  </label>
                  <textarea
                    value={formData.safety_first_aid || ''}
                    onChange={(e) => handleInputChange('safety_first_aid', e.target.value)}
                    disabled={!isEditing}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0055A3] disabled:bg-gray-100"
                  />
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={formData.status || 'active'}
                  onChange={(e) => handleInputChange('status', e.target.value as 'active' | 'inactive' | 'draft')}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0055A3] disabled:bg-gray-100"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>

            {/* Footer */}
            {isEditing && (
              <div className="flex items-center justify-end space-x-4 p-6 border-t border-gray-200">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving || uploading}
                  className="flex items-center px-6 py-2 bg-[#0055A3] text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
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
      )}
    </AnimatePresence>
  );
};

export default ProductsManager;