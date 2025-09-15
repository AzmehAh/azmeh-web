import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; 
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
import { supabase,  ProductFilterType, ProductFilterValue } from '../../lib/supabase';

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
  instructions:  string[];
  packaging: PackagingSize[];
  storage: string;
  safety_precautions: string[];
  safety_first_aid:  string[];
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
      // جلب جميع المنتجات
      const { data: productsData, error: productsError } = await supabase
        .from('products') 
        .select('*')
        .order('created_at', { ascending: false });

      if (productsError) throw productsError;
      
      // جلب جميع الصور
      const { data: imagesData, error: imagesError } = await supabase
        .from('product_images')
        .select('*');

      if (imagesError) throw imagesError;
      
      // Parse array fields that might be stored as strings
      const parsedData = (productsData || []).map(item => ({
        ...item,
        instructions: parseArrayField(item.instructions),
        features: parseArrayField(item.features),

        safety_precautions: parseArrayField(item. safety_precautions),
        safety_first_aid: parseArrayField(item.safety_first_aid),
        applications: parseArrayField(item.applications),
        packaging: parseArrayField(item.packaging),
        technical_specs: parseArrayField(item.technical_specs)
      }));
      
      setProducts(parsedData);
      setFilteredProducts(parsedData);
      
      // تنظيم الصور حسب product_id
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

  // Helper function to parse array fields that might be stored as strings
  const parseArrayField = (field: any): any[] => {
    if (Array.isArray(field)) return field;
    if (typeof field === 'string') {
      try {
        return JSON.parse(field);
      } catch (e) {
        return [];
      }
    }
    return [];
  };

  const deleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      // First delete related images
      const { error: imageError } = await supabase
        .from('product_images')
        .delete()
        .eq('product_id', id);
      
      if (imageError) throw imageError;
      
      // Then delete the product
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
        />
      )}
    </div>
  );
};

// Product Modal Component - التصحيح هنا
const ProductModal = ({ 
  isOpen, 
  onClose, 
  product, 
  isEditing, 
  onSave,
  onUploadImage,
  uploading,
  productImages
}: {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  isEditing: boolean;
  onSave: () => void;
  onUploadImage: (file: File) => Promise<string | null>;
  uploading: boolean;
  productImages: Record<string, ProductImage[]>;
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
    instructions: [],
    packaging: [],
    storage: '',
    safety_precautions: [],
    safety_first_aid: [],
    technical_specs: [],
    status: 'active'
  });
  const [images, setImages] = useState<ProductImage[]>([]);
  const [saving, setSaving] = useState(false);
  const [brands, setBrands] = useState<ProductFilterValue[]>([]);
  const [types, setTypes] = useState<ProductFilterValue[]>([]); // إضافة حالة للأنواع
  const [usages, setUsages] = useState<ProductFilterValue[]>([]); // إضافة حالة للاستخدامات

  useEffect(() => {
    fetchBrands();
    fetchTypes(); // جلب الأنواع
    fetchUsages(); // جلب الاستخدامات
    
    if (product) {
      // تهيئة بيانات المنتج
      const productData = {
        ...product,
        features: Array.isArray(product.features) ? product.features : [],
        applications: Array.isArray(product.applications) ? product.applications : [],
        packaging: Array.isArray(product.packaging) ? product.packaging : [],
        technical_specs: Array.isArray(product.technical_specs) ? product.technical_specs : [],
        instructions: Array.isArray(product.instructions) ? product.instructions : [],
        safety_first_aid: Array.isArray(product.safety_first_aid) ? product.safety_first_aid : [],
        safety_precautions: Array.isArray(product.safety_precautions) ? product.safety_precautions : [],
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
        instructions: [],
        packaging: [],
        storage: '',
        safety_precautions: [],
        safety_first_aid: [],
        technical_specs: [],
        status: 'active'
      });
      setImages([]);
    }
  }, [product, productImages]);

  // دالة جلب البراندات من قاعدة البيانات
  const fetchBrands = async () => {
    try {
      const { data } = await supabase
        .from('product_filter_types')
        .select('id, name, product_filter_values(*)')
        .eq('name', 'Brand')
        .single();

      if (data?.product_filter_values) {
        setBrands(data.product_filter_values);
      }
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  // دالة جلب الأنواع من قاعدة البيانات
  const fetchTypes = async () => {
    try {
      const { data } = await supabase
        .from('product_filter_types')
        .select('id, name, product_filter_values(*)')
        .eq('name', 'Type')
        .single();

      if (data?.product_filter_values) {
        setTypes(data.product_filter_values);
      }
    } catch (error) {
      console.error('Error fetching types:', error);
    }
  };

  // دالة جلب الاستخدامات من قاعدة البيانات
  const fetchUsages = async () => {
    try {
      const { data } = await supabase
        .from('product_filter_types')
        .select('id, name, product_filter_values(*)')
        .eq('name', 'Usage')
        .single();

      if (data?.product_filter_values) {
        setUsages(data.product_filter_values);
      }
    } catch (error) {
      console.error('Error fetching usages:', error);
    }
  };
  useEffect(() => {
    if (product) {
      // Ensure all array fields are properly initialized
      const productData = {
        ...product,
        features: Array.isArray(product.features) ? product.features : [],
        applications: Array.isArray(product.applications) ? product.applications : [],
        packaging: Array.isArray(product.packaging) ? product.packaging : [],
        technical_specs: Array.isArray(product.technical_specs) ? product.technical_specs : [],
        instructions: Array.isArray(product.instructions) ? product.instructions : [],
       
        safety_first_aid: Array.isArray(product.safety_first_aid) ? product.safety_first_aid : [],
        safety_precautions: Array.isArray(product.safety_precautions) ? product.safety_precautions : [],
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
        instructions: [],
        packaging: [],
        storage: '',
        safety_precautions: [],
        safety_first_aid: [],
        technical_specs: [],
        status: 'active'
      });
      setImages([]);
    }
  }, [product, productImages]);

  const handleSave = async () => {
    setSaving(true);
    try {
      let productId = product?.id;

      // Prepare product data without images
    const productData = {
  ...formData,

  // Arrays (TEXT[])
  features: Array.isArray(formData.features) ? formData.features : [],
   
      safety_precautions : Array.isArray(formData.safety_precautions) ? formData.safety_precautions : [],
      instructions: Array.isArray(formData.instructions) ? formData.instructions : [],
      applications: Array.isArray(formData.applications) ? formData.applications : [],
      safety_first_aid: Array.isArray(formData.safety_first_aid) ? formData.safety_first_aid : [],
   
 

  // JSONB
  packaging:
    typeof formData.packaging === "string"
      ? JSON.parse(formData.packaging || "{}")
      : formData.packaging || {},

  technical_specs:
    typeof formData.technical_specs === "string"
      ? JSON.parse(formData.technical_specs || "{}")
      : formData.technical_specs || {},
};


      if (product) {
        // Update product
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', product.id);
        if (error) throw error;
        productId = product.id;
      } else {
        // Create new product
        const { data, error } = await supabase
          .from('products')
          .insert([productData])
          .select();
        if (error) throw error;
        productId = data?.[0]?.id;
      }

      // Manage images only if we have a product ID
      if (productId) {
        // Get current images to compare
        const { data: existingImages } = await supabase
          .from('product_images')
          .select('*')
          .eq('product_id', productId);

        // Delete images that were removed
        const imagesToKeep = images.filter(img => img.id).map(img => img.id);
        const imagesToDelete = existingImages?.filter(img => !imagesToKeep.includes(img.id)) || [];
        
        for (const img of imagesToDelete) {
          await supabase
            .from('product_images')
            .delete()
            .eq('id', img.id);
        }

        // Add/update images
        for (const img of images) {
          if (img.id) {
            // Update existing image
            await supabase
              .from('product_images')
              .update({ image_url: img.image_url })
              .eq('id', img.id);
          } else {
            // Add new image
            await supabase
              .from('product_images')
              .insert([{ product_id: productId, image_url: img.image_url }]);
          }
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

  const addArrayItem = (field: string, defaultValue: any = '') => {
    setFormData(prev => {
      const currentArray = Array.isArray(prev[field]) ? [...(prev[field] as any[])] : [];
      return { ...prev, [field]: [...currentArray, defaultValue] };
    });
  };

  const removeArrayItem = (field: string, index: number) => {
    setFormData(prev => {
      const currentArray = Array.isArray(prev[field]) ? [...(prev[field] as any[])] : [];
      return { ...prev, [field]: currentArray.filter((_, i) => i !== index) };
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newImages = [...images];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const imageUrl = await onUploadImage(file);
      if (imageUrl) {
        newImages.push({ image_url: imageUrl });
      }
    }
    
    setImages(newImages);
    e.target.value = ''; // Reset file input
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
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
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
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
        <select
          value={formData.brand || ''}
          onChange={(e) => handleInputChange('brand', e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
        >
          <option value="">Select a brand</option>
          {brands.map((b) => (
            <option key={b.id} value={b.value}>
              {b.display_name || b.value}
            </option>
          ))}
        </select>
      ) : (
        <p className="text-gray-900">{formData.brand}</p>
      )}
    </div>
 {/* حقل النوع (Type) المعتمد على البيانات من قاعدة البيانات */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type *
                    </label>
                    {isEditing ? (
                      <select
                        value={formData.type || ''}
                        onChange={(e) => handleInputChange('type', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                      >
                        <option value="">Select a type</option>
                        {types.map((t) => (
                          <option key={t.id} value={t.value}>
                            {t.display_name || t.value}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <p className="text-gray-900">{formData.type}</p>
                    )}
                  </div>
                </div>

                {/* Additional Info */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Material *
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.material || ''}
                        onChange={(e) => handleInputChange('material', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                      />
                    ) : (
                      <p className="text-gray-900">{formData.material}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Usage *
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.usage || ''}
                        onChange={(e) => handleInputChange('usage', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                      />
                    ) : (
                      <p className="text-gray-900">{formData.usage}</p>
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
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        formData.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : formData.status === 'inactive'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {formData.status}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                {isEditing ? (
                  <textarea
                    value={formData.description || ''}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                  />
                ) : (
                  <p className="text-gray-900">{formData.description}</p>
                )}
              </div>

              {/* Technical Description */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Technical Description
                </label>
                {isEditing ? (
                  <textarea
                    value={formData.technical_description || ''}
                    onChange={(e) => handleInputChange('technical_description', e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                  />
                ) : (
                  <p className="text-gray-900">{formData.technical_description}</p>
                )}
              </div>

              {/* Features */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Features
                </label>
                {isEditing ? (
                  <div className="space-y-2">
                    {(formData.features || []).map((item, idx) => (
                      <div key={idx} className="flex gap-2">
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => handleArrayInputChange('features', idx, e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                        />
                        <button
                          type="button"
                          onClick={() => removeArrayItem('features', idx)}
                          className="px-2 py-1 text-red-600 border border-red-200 rounded hover:bg-red-50"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addArrayItem('features', '')}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                    >
                      + Add Feature
                    </button>
                  </div>
                ) : (
                  <ul className="list-disc pl-5 text-gray-900">
                    {(formData.features || []).map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Applications */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Applications
                </label>
                {isEditing ? (
                  <div className="space-y-2">
                    {(formData.applications || []).map((item, idx) => (
                      <div key={idx} className="flex gap-2">
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => handleArrayInputChange('applications', idx, e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                        />
                        <button
                          type="button"
                          onClick={() => removeArrayItem('applications', idx)}
                          className="px-2 py-1 text-red-600 border border-red-200 rounded hover:bg-red-50"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addArrayItem('applications', '')}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                    >
                      + Add Application
                    </button>
                  </div>
                ) : (
                  <ul className="list-disc pl-5 text-gray-900">
                    {(formData.applications || []).map((a, i) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ul>
                )}
              </div>

              {/*instructions*/}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                instructions
                </label>
                {isEditing ? (
                  <div className="space-y-2">
                    {(formData.instructions || []).map((item, idx) => (
                      <div key={idx} className="flex gap-2">
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => handleArrayInputChange('instructions', idx, e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                        />
                        <button
                          type="button"
                          onClick={() => removeArrayItem('instructions', idx)}
                          className="px-2 py-1 text-red-600 border border-red-200 rounded hover:bg-red-50"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addArrayItem('instructions', '')}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                    >
                      + Add instructions
                    </button>
                  </div>
                ) : (
                  <ul className="list-disc pl-5 text-gray-900">
                    {(formData.instructions || []).map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                )}
              </div>
 
              {/* Packaging */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Packaging Sizes
                </label>
                {isEditing ? (
                  <div className="space-y-2">
                    {(formData.packaging || []).map((item, idx) => (
                      <div key={idx} className="flex gap-2">
                        <input
                          type="text"
                          value={item.size || ''}
                          onChange={(e) => {
                            const newPackaging = [...(formData.packaging || [])];
                            newPackaging[idx] = { ...newPackaging[idx], size: e.target.value };
                            setFormData(prev => ({ ...prev, packaging: newPackaging }));
                          }}
                          className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                          placeholder="Size (e.g., 1L, 5kg)"
                        />
                        <button
                          type="button"
                          onClick={() => removeArrayItem('packaging', idx)}
                          className="px-2 py-1 text-red-600 border border-red-200 rounded hover:bg-red-50"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addArrayItem('packaging', { size: '' })}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                    >
                      + Add Size
                    </button>
                  </div>
                ) : (
                  <ul className="list-disc pl-5 text-gray-900">
                    {(formData.packaging || []).map((p, i) => (
                      <li key={i}>{p.size}</li>
                    ))}
                  </ul>
                )}
              </div>

          
{/* Storage */}
<div className="mt-6">
  <label className="block text-sm font-medium text-gray-700 mb-2">
       Storage
  </label>
  {isEditing ? (
    <ReactQuill
      value={formData.storage || ""}
      onChange={(value) => handleInputChange("storage", value)}
      className="bg-white rounded-lg border border-gray-200"
      theme="snow"
      modules={{
        toolbar: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image"],
          ["clean"],
        ],
      }}
    />
  ) : (
    <div
      className="prose max-w-none text-gray-900"
      dangerouslySetInnerHTML={{ __html: formData.storage }}
    />
  )}
</div>


              {/* Product Images */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Images
                </label>

                {isEditing ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <label className="flex items-center px-4 py-2 bg-[#0055A3] text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors">
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
                      {uploading && <span className="text-gray-500">Uploading...</span>}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                      {images.map((img, idx) => (
                        <div key={img.id || idx} className="relative group">
                          <img
                            src={img.image_url}
                            alt={`Product ${idx + 1}`}
                            className="w-full h-32 object-cover rounded border"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button
                              type="button"
                              onClick={() => removeImage(idx)}
                              className="p-1 bg-red-500 text-white rounded"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {images.map((img, i) => (
                      <img
                        key={i}
                        src={img.image_url}
                        alt={`Product Image ${i + 1}`}
                        className="w-full h-32 object-cover rounded border"
                      />
                    ))}
                  </div>
                )}
              </div>

                {/* safety_precautions */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                 safety_precautions
                </label>
                {isEditing ? (
                  <div className="space-y-2">
                    {(formData.safety_precautions|| []).map((item, idx) => (
                      <div key={idx} className="flex gap-2">
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => handleArrayInputChange('safety_precautions', idx, e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                        />
                        <button
                          type="button"
                          onClick={() => removeArrayItem('safety_precautions', idx)}
                          className="px-2 py-1 text-red-600 border border-red-200 rounded hover:bg-red-50"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addArrayItem('safety_precautions', '')}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                    >
                      + Add safety_precautions
                    </button>
                  </div>
                ) : (
                  <ul className="list-disc pl-5 text-gray-900">
                    {(formData.safety_precautions || []).map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                )}
              </div>


              {/* safety_first_aid*/}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                safety first aid
                </label>
                {isEditing ? (
                  <div className="space-y-2">
                    {(formData.safety_first_aid || []).map((item, idx) => (
                      <div key={idx} className="flex gap-2">
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => handleArrayInputChange('safety_first_aid', idx, e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                        />
                        <button
                          type="button"
                          onClick={() => removeArrayItem('safety_first_aid', idx)}
                          className="px-2 py-1 text-red-600 border border-red-200 rounded hover:bg-red-50"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addArrayItem('safety_first_aid', '')}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                    >
                      + Add safety first aid
                    </button>
                  </div>
                ) : (
                  <ul className="list-disc pl-5 text-gray-900">
                    {(formData.safety_first_aid || []).map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                )}
              </div>


              {/* Technical Specs */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Technical Specifications
                </label>
                {isEditing ? (
                  <div className="space-y-2">
                    {(formData.technical_specs || []).map((item, idx) => (
                      <div key={idx} className="grid grid-cols-1 md:grid-cols-4 gap-2 items-center">
                        <input
                          type="text"
                          placeholder="Property"
                          value={item.property || ''}
                          onChange={(e) => {
                            const newSpecs = [...(formData.technical_specs || [])];
                            newSpecs[idx] = { ...newSpecs[idx], property: e.target.value };
                            setFormData(prev => ({ ...prev, technical_specs: newSpecs }));
                          }}
                          className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                        />
                        <input
                          type="text"
                          placeholder="Value"
                          value={item.value || ''}
                          onChange={(e) => {
                            const newSpecs = [...(formData.technical_specs || [])];
                            newSpecs[idx] = { ...newSpecs[idx], value: e.target.value };
                            setFormData(prev => ({ ...prev, technical_specs: newSpecs }));
                          }}
                          className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                        />
                        <input
                          type="text"
                          placeholder="Standard"
                          value={item.standard || ''}
                          onChange={(e) => {
                            const newSpecs = [...(formData.technical_specs || [])];
                            newSpecs[idx] = { ...newSpecs[idx], standard: e.target.value };
                            setFormData(prev => ({ ...prev, technical_specs: newSpecs }));
                          }}
                          className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                        />
                        <button
                          type="button"
                          onClick={() => removeArrayItem('technical_specs', idx)}
                          className="px-2 py-2 text-red-600 border border-red-200 rounded hover:bg-red-50"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addArrayItem('technical_specs', { property: '', value: '', standard: '' })}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                    >
                      + Add Specification
                    </button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full border border-gray-200 rounded text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="border px-3 py-2 text-left">Property</th>
                          <th className="border px-3 py-2 text-left">Value</th>
                          <th className="border px-3 py-2 text-left">Standard</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(formData.technical_specs || []).map((item, i) => (
                          <tr key={i}>
                            <td className="border px-3 py-2">{item.property}</td>
                            <td className="border px-3 py-2">{item.value}</td>
                            <td className="border px-3 py-2">{item.standard}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            {isEditing && (
              <div className="flex items-center justify-end space-x-3 p-6 border-t bg-gray-50">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-4 py-2 bg-[#0055A3] text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center"
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
    </AnimatePresence>
  );
};

export default ProductsManager; 