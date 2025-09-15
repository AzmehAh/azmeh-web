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
  Upload,
  Filter
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
}

interface ProductFilterValue {
  id: string;
  value: string;
  display_name: string;
  filter_type_id: string;
  is_active: boolean;
  sort_order: number;
}

interface ProductFilterType {
  id: string;
  name: string;
  description: string;
  sort_order: number;
  is_active: boolean;
}

interface Product {
  id: string;
  name: string;
  code: string;
  brand_id?: string;
  type_id?: string;
  material_id?: string;
  usage_id?: string;
  description: string;
  technical_description: string;
  features: string[];
  applications: string[];
  instructions: string[];
  packaging: PackagingSize[];
  storage: string;
  safety_precautions: string[];
  safety_first_aid: string[];
  technical_specs: TechnicalSpec[];
  status: 'active' | 'inactive' | 'draft';
  created_at?: string;
  brand?: ProductFilterValue;
  type?: ProductFilterValue;
  material?: ProductFilterValue;
  usage?: ProductFilterValue;
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
  const [filterTypes, setFilterTypes] = useState<ProductFilterType[]>([]);
  const [filterValues, setFilterValues] = useState<ProductFilterValue[]>([]);
  const [loadingFilters, setLoadingFilters] = useState(true);
  const [activeFilters, setActiveFilters] = useState<{
    brand: string[];
    type: string[];
    material: string[];
    usage: string[];
  }>({
    brand: [],
    type: [],
    material: [],
    usage: []
  });

  useEffect(() => {
    fetchFilters();
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchTerm, products, activeFilters]);

  const fetchFilters = async () => {
    try {
      const { data: typesData, error: typesError } = await supabase
        .from('product_filter_types')
        .select('*')
        .order('sort_order');

      if (typesError) throw typesError;

      const { data: valuesData, error: valuesError } = await supabase
        .from('product_filter_values')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');

      if (valuesError) throw valuesError;

      setFilterTypes(typesData || []);
      setFilterValues(valuesData || []);
    } catch (error) {
      console.error('Error fetching filters:', error);
    } finally {
      setLoadingFilters(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select(`
          *,
          brand:brand_id (*),
          type:type_id (*),
          material:material_id (*),
          usage:usage_id (*)
        `)
        .order('created_at', { ascending: false });

      if (productsError) throw productsError;
      
      const { data: imagesData, error: imagesError } = await supabase
        .from('product_images')
        .select('*');

      if (imagesError) throw imagesError;
      
      const parsedData = (productsData || []).map(item => ({
        ...item,
        instructions: parseArrayField(item.instructions),
        features: parseArrayField(item.features),
        safety_precautions: parseArrayField(item.safety_precautions),
        safety_first_aid: parseArrayField(item.safety_first_aid),
        applications: parseArrayField(item.applications),
        packaging: parseArrayField(item.packaging),
        technical_specs: parseArrayField(item.technical_specs)
      }));
      
      setProducts(parsedData);
      
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

  const filterProducts = () => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.brand?.display_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
         product.brand?.value?.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // تطبيق الفلاتر
    if (activeFilters.brand.length > 0) {
      filtered = filtered.filter(product => 
        product.brand_id && activeFilters.brand.includes(product.brand_id)
      );
    }

    if (activeFilters.type.length > 0) {
      filtered = filtered.filter(product => 
        product.type_id && activeFilters.type.includes(product.type_id)
      );
    }

    if (activeFilters.material.length > 0) {
      filtered = filtered.filter(product => 
        product.material_id && activeFilters.material.includes(product.material_id)
      );
    }

    if (activeFilters.usage.length > 0) {
      filtered = filtered.filter(product => 
        product.usage_id && activeFilters.usage.includes(product.usage_id)
      );
    }

    setFilteredProducts(filtered);
  };

  const getFilterValuesByType = (typeName: string): ProductFilterValue[] => {
    const filterType = filterTypes.find(ft => 
      ft.name.toLowerCase().includes(typeName.toLowerCase()) ||
      ft.description?.toLowerCase().includes(typeName.toLowerCase())
    );
    
    if (!filterType) return [];
    
    return filterValues.filter(fv => fv.filter_type_id === filterType.id);
  };

  const toggleFilter = (filterType: keyof typeof activeFilters, value: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter(v => v !== value)
        : [...prev[filterType], value]
    }));
  };

  const clearFilters = () => {
    setActiveFilters({
      brand: [],
      type: [],
      material: [],
      usage: []
    });
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

  if (loading || loadingFilters) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0055A3]"></div>
      </div>
    );
  }

  const brands = getFilterValuesByType('brand');
  const types = getFilterValuesByType('type');
  const materials = getFilterValuesByType('material');
  const usages = getFilterValuesByType('usage');

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

      {/* Search and Filters */}
      <div className="space-y-4">
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

        {/* Filter Section */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 flex items-center">
              <Filter className="w-5 h-5 mr-2 text-[#0055A3]" />
              Filters
            </h3>
            <button
              onClick={clearFilters}
              className="text-sm text-[#0055A3] hover:underline"
            >
              Clear all
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Brand Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {brands.map(brand => (
                  <label key={brand.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={activeFilters.brand.includes(brand.id)}
                      onChange={() => toggleFilter('brand', brand.id)}
                      className="rounded border-gray-300 text-[#0055A3] focus:ring-[#0055A3]"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      {brand.display_name || brand.value}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {types.map(type => (
                  <label key={type.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={activeFilters.type.includes(type.id)}
                      onChange={() => toggleFilter('type', type.id)}
                      className="rounded border-gray-300 text-[#0055A3] focus:ring-[#0055A3]"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      {type.display_name || type.value}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Material Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Material</label>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {materials.map(material => (
                  <label key={material.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={activeFilters.material.includes(material.id)}
                      onChange={() => toggleFilter('material', material.id)}
                      className="rounded border-gray-300 text-[#0055A3] focus:ring-[#0055A3]"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      {material.display_name || material.value}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Usage Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Usage</label>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {usages.map(usage => (
                  <label key={usage.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={activeFilters.usage.includes(usage.id)}
                      onChange={() => toggleFilter('usage', usage.id)}
                      className="rounded border-gray-300 text-[#0055A3] focus:ring-[#0055A3]"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      {usage.display_name || usage.value}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
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
                    {product.brand?.display_name || product.brand?.value || 'No brand'}
                  </span>
                </div>
                
                <p className="text-sm text-gray-500 mb-2">{product.code}</p>
                
                <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                  {product.description}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {product.type && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {product.type.display_name || product.type.value}
                    </span>
                  )}
                  {product.usage && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {product.usage.display_name || product.usage.value}
                    </span>
                  )}
                  {product.material && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {product.material.display_name || product.material.value}
                    </span>
                  )}
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
            {searchTerm || Object.values(activeFilters).some(arr => arr.length > 0) 
              ? 'Try adjusting your search or filter terms' 
              : 'Get started by adding your first product'}
          </p>
          {!searchTerm && Object.values(activeFilters).every(arr => arr.length === 0) && (
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
          filterValues={filterValues}
          filterTypes={filterTypes}
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
  filterValues,
  filterTypes
}: {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  isEditing: boolean;
  onSave: () => void;
  onUploadImage: (file: File) => Promise<string | null>;
  uploading: boolean;
  productImages: Record<string, ProductImage[]>;
  filterValues: ProductFilterValue[];
  filterTypes: ProductFilterType[];
}) => {
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    code: '',
    brand_id: '',
    type_id: '',
    material_id: '',
    usage_id: '',
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

  useEffect(() => {
    if (product) {
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
        brand_id: '',
        type_id: '',
        material_id: '',
        usage_id: '',
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

  const getFilterValuesByType = (typeName: string): ProductFilterValue[] => {
    const filterType = filterTypes.find(ft => 
      ft.name.toLowerCase().includes(typeName.toLowerCase()) ||
      ft.description?.toLowerCase().includes(typeName.toLowerCase())
    );
    
    if (!filterType) return [];
    
    return filterValues.filter(fv => fv.filter_type_id === filterType.id && fv.is_active);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      let productId = product?.id;

      const productData = {
        ...formData,
        features: Array.isArray(formData.features) ? formData.features : [],
        safety_precautions: Array.isArray(formData.safety_precautions) ? formData.safety_precautions : [],
        instructions: Array.isArray(formData.instructions) ? formData.instructions : [],
        applications: Array.isArray(formData.applications) ? formData.applications : [],
        safety_first_aid: Array.isArray(formData.safety_first_aid) ? formData.safety_first_aid : [],
        packaging: typeof formData.packaging === "string"
          ? JSON.parse(formData.packaging || "{}")
          : formData.packaging || {},
        technical_specs: typeof formData.technical_specs === "string"
          ? JSON.parse(formData.technical_specs || "{}")
          : formData.technical_specs || {},
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
    e.target.value = '';
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  if (!isOpen) return null;

  const brands = getFilterValuesByType('brand');
  const types = getFilterValuesByType('type');
  const materials = getFilterValuesByType('material');
  const usages = getFilterValuesByType('usage');

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
                        value={formData.brand_id || ''}
                        onChange={(e) => handleInputChange('brand_id', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                        required
                      >
                        <option value="">Select a brand</option>
                        {brands.map(brand => (
                          <option key={brand.id} value={brand.id}>
                            {brand.display_name || brand.value}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <p className="text-gray-900">
                        {brands.find(b => b.id === formData.brand_id)?.display_name || 
                         brands.find(b => b.id === formData.brand_id)?.value || 
                         'No brand selected'}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type *
                    </label>
                    {isEditing ? (
                      <select
                        value={formData.type_id || ''}
                        onChange={(e) => handleInputChange('type_id', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                        required
                      >
                        <option value="">Select a type</option>
                        {types.map(type => (
                          <option key={type.id} value={type.id}>
                            {type.display_name || type.value}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <p className="text-gray-900">
                        {types.find(t => t.id === formData.type_id)?.display_name || 
                         types.find(t => t.id === formData.type_id)?.value || 
                         'No type selected'}
                      </p>
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
                      <select
                        value={formData.material_id || ''}
                        onChange={(e) => handleInputChange('material_id', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                        required
                      >
                        <option value="">Select a material</option>
                        {materials.map(material => (
                          <option key={material.id} value={material.id}>
                            {material.display_name || material.value}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <p className="text-gray-900">
                        {materials.find(m => m.id === formData.material_id)?.display_name || 
                         materials.find(m => m.id === formData.material_id)?.value || 
                         'No material selected'}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Usage *
                    </label>
                    {isEditing ? (
                      <select
                        value={formData.usage_id || ''}
                        onChange={(e) => handleInputChange('usage_id', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                        required
                      >
                        <option value="">Select a usage</option>
                        {usages.map(usage => (
                          <option key={usage.id} value={usage.id}>
                            {usage.display_name || usage.value}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <p className="text-gray-900">
                        {usages.find(u => u.id === formData.usage_id)?.display_name || 
                         usages.find(u => u.id === formData.usage_id)?.value || 
                         'No usage selected'}
                      </p>
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
                          ? 'bg-red-100 text-red
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
                  Description
                </label>
                {isEditing ? (
                  <ReactQuill
                    value={formData.description || ''}
                    onChange={(value) => handleInputChange('description', value)}
                    theme="snow"
                    className="rounded-lg border-gray-200 focus:border-[#0055A3]"
                  />
                ) : (
                  <div 
                    className="text-gray-900 prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: formData.description || '' }}
                  />
                )}
              </div>

              {/* Technical Description */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Technical Description
                </label>
                {isEditing ? (
                  <ReactQuill
                    value={formData.technical_description || ''}
                    onChange={(value) => handleInputChange('technical_description', value)}
                    theme="snow"
                    className="rounded-lg border-gray-200 focus:border-[#0055A3]"
                  />
                ) : (
                  <div 
                    className="text-gray-900 prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: formData.technical_description || '' }}
                  />
                )}
              </div>

              {/* Features */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Features
                  </label>
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => addArrayItem('features', '')}
                      className="text-sm text-[#0055A3] hover:underline"
                    >
                      + Add Feature
                    </button>
                  )}
                </div>
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
                  </div>
                ) : (
                  <ul className="list-disc list-inside text-gray-900 space-y-1">
                    {formData.features?.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Applications */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Applications
                  </label>
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => addArrayItem('applications', '')}
                      className="text-sm text-[#0055A3] hover:underline"
                    >
                      + Add Application
                    </button>
                  )}
                </div>
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
                  </div>
                ) : (
                  <ul className="list-disc list-inside text-gray-900 space-y-1">
                    {formData.applications?.map((application, index) => (
                      <li key={index}>{application}</li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Technical Specifications */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Technical Specifications
                  </label>
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => addArrayItem('technical_specs', { property: '', value: '', standard: '' })}
                      className="text-sm text-[#0055A3] hover:underline"
                    >
                      + Add Specification
                    </button>
                  )}
                </div>
                {isEditing ? (
                  <div className="space-y-3">
                    {formData.technical_specs?.map((spec, index) => (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-2 p-3 border border-gray-200 rounded-lg">
                        <input
                          type="text"
                          value={spec.property}
                          onChange={(e) => {
                            const newSpecs = [...(formData.technical_specs || [])];
                            newSpecs[index] = { ...spec, property: e.target.value };
                            handleInputChange('technical_specs', newSpecs);
                          }}
                          placeholder="Property"
                          className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                        />
                        <input
                          type="text"
                          value={spec.value}
                          onChange={(e) => {
                            const newSpecs = [...(formData.technical_specs || [])];
                            newSpecs[index] = { ...spec, value: e.target.value };
                            handleInputChange('technical_specs', newSpecs);
                          }}
                          placeholder="Value"
                          className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                        />
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={spec.standard}
                            onChange={(e) => {
                              const newSpecs = [...(formData.technical_specs || [])];
                              newSpecs[index] = { ...spec, standard: e.target.value };
                              handleInputChange('technical_specs', newSpecs);
                            }}
                            placeholder="Standard"
                            className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                          />
                          <button
                            type="button"
                            onClick={() => removeArrayItem('technical_specs', index)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Property</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Value</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Standard</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {formData.technical_specs?.map((spec, index) => (
                          <tr key={index}>
                            <td className="px-4 py-2 text-sm text-gray-900">{spec.property}</td>
                            <td className="px-4 py-2 text-sm text-gray-900">{spec.value}</td>
                            <td className="px-4 py-2 text-sm text-gray-900">{spec.standard}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Images */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Images
                </label>
                {isEditing && (
                  <div className="mb-4">
                    <label className="flex items-center justify-center px-4 py-2 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#0055A3] transition-colors">
                      <Upload className="w-5 h-5 mr-2 text-gray-400" />
                      <span className="text-sm text-gray-600">Upload Images</span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={uploading}
                      />
                    </label>
                    {uploading && (
                      <p className="text-sm text-gray-500 mt-2">Uploading images...</p>
                    )}
                  </div>
                )}
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image.image_url}
                        alt={`Product image ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      {isEditing && (
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end space-x-3 p-6 border-t">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              {isEditing && (
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center px-4 py-2 bg-[#0055A3] text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
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