import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, ChevronDown, Grid, List, SortAsc } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

// تعريف واجهة المنتج مع الدعم الكامل للعربية
interface Product {
  id: string;
  name: string;
  name_ar: string;
  code: string;
  description: string;
  description_ar: string;
  image: string;
  type: string;
  type_ar: string;
  brand: string;
  brand_ar: string;
  material: string;
  material_ar: string;
  usage: string;
  usage_ar: string;
}

// دالة لتحديد اللغة الحالية من <html lang="...">
const getCurrentLanguage = (): 'ar' | 'en' => {
  const lang = document.documentElement.lang;
  return lang.startsWith('ar') ? 'ar' : 'en';
};

const Products = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [filterOptions, setFilterOptions] = useState<Record<string, string[]>>({});
  const [filterTypes, setFilterTypes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeFilterCategory, setActiveFilterCategory] = useState<string | null>(null);

  useEffect(() => {
    fetchFilterData();
    fetchProducts();
  }, []);

  const fetchFilterData = async () => {
    try {
      const { data, error } = await supabase
        .from('product_filter_types')
        .select(`
          *,
          product_filter_values (*)
        `)
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) throw error;

      setFilterTypes(data || []);

      // Transform data into filter options format
      const options: Record<string, string[]> = {};
      data?.forEach(filterType => {
        const key = filterType.name.toLowerCase();
        options[key] = filterType.product_filter_values
          .filter(value => value.is_active)
          .sort((a, b) => a.sort_order - b.sort_order)
          .map(value => value.value);
      });

      setFilterOptions(options);

      // Initialize selectedFilters
      const initialFilters: Record<string, string[]> = {};
      data?.forEach(filterType => {
        initialFilters[filterType.name.toLowerCase()] = [];
      });
      setSelectedFilters(initialFilters);

    } catch (error) {
      console.error('Error fetching filter data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      setProductsLoading(true);
      const { data: productsData, error } = await supabase
        .from('products')
        .select(`
          id,
          name,
          name_ar,
          code,
          description,
          description_ar,
          type,
          type_ar,
          brand,
          brand_ar,
          material,
          material_ar,
          usage,
          usage_ar,
          status,
          created_at,
          product_images(*)
        `)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedProducts = (productsData || []).map(product => {
        const mainImage = product.product_images.find((img: any) => img.is_main) || 
                          product.product_images[0];
        
        return {
          id: product.id,
          name: product.name,
          name_ar: product.name_ar || product.name,
          code: product.code,
          description: product.description,
          description_ar: product.description_ar || product.description,
          image: mainImage?.image_url || '',
          type: product.type,
          type_ar: product.type_ar || product.type,
          brand: product.brand,
          brand_ar: product.brand_ar || product.brand,
          material: product.material,
          material_ar: product.material_ar || product.material,
          usage: product.usage,
          usage_ar: product.usage_ar || product.usage
        };
      });

      setProducts(formattedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setProductsLoading(false);
    }
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    const currentLang = getCurrentLanguage();

    let filtered = products.filter(product => {
      // Search in both languages
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        product.name.toLowerCase().includes(searchLower) ||
        product.name_ar.toLowerCase().includes(searchLower) ||
        product.code.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.description_ar.toLowerCase().includes(searchLower);

      // Category filters (always use English keys like 'brand', but match stored value)
      const matchesFilters = Object.entries(selectedFilters).every(([category, values]) => {
        if (values.length === 0) return true;
        const productValue = product[category as keyof Product] as string;
        return values.includes(productValue);
      });

      return matchesSearch && matchesFilters;
    });

    // Sort by name in current language
    filtered.sort((a, b) => {
      const nameA = currentLang === 'ar' ? a.name_ar : a.name;
      const nameB = currentLang === 'ar' ? b.name_ar : b.name;
      const compareValue = nameA.localeCompare(nameB, currentLang === 'ar' ? 'ar' : 'en');
      return sortOrder === 'asc' ? compareValue : -compareValue;
    });

    return filtered;
  }, [searchTerm, selectedFilters, sortOrder, products]);

  // URL Sync (optional enhancement)
  useEffect(() => {
    if (!loading) {
      const params = new URLSearchParams(window.location.search);
      const newFilters: Record<string, string[]> = {};
      filterTypes.forEach(ft => {
        const key = ft.name.toLowerCase();
        const value = params.get(key);
        newFilters[key] = value ? value.split(',') : [];
      });
      setSelectedFilters(newFilters);
    }
  }, [loading, filterTypes]);

  const toggleFilter = (category: string, value: string) => {
    setSelectedFilters(prev => {
      const newValues = prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value];

      const newFilters = { ...prev, [category]: newValues };

      const params = new URLSearchParams();
      Object.entries(newFilters).forEach(([key, values]) => {
        if (values.length > 0) params.set(key, values.join(','));
      });

      navigate(`/products?${params.toString()}`, { replace: true });
      return newFilters;
    });
  };

  const clearFilters = () => {
    const emptyFilters: Record<string, string[]> = {};
    filterTypes.forEach(filterType => {
      emptyFilters[filterType.name.toLowerCase()] = [];
    });
    setSelectedFilters(emptyFilters);
    setSearchTerm('');
    navigate('/products', { replace: true });
  };

  const getActiveFiltersCount = () => {
    return Object.values(selectedFilters).flat().length;
  };

  const currentLang = getCurrentLanguage();

  return (
    <div 
      className="min-h-screen bg-gray-50 pt-20"
      dir={currentLang === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#2C5DB6] to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {currentLang === 'ar' ? 'منتجاتنا' : 'Our Products'}
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
              {currentLang === 'ar'
                ? 'اكتشف مجموعة منتجاتنا الشاملة من أنظمة الدهانات المميزة والحلول التقنية المصممة لكل تطبيق وبيئة.'
                : 'Discover our comprehensive range of premium paint systems and technical solutions designed for every application and environment.'
              }
            </p>
          </div>
        </div>
      </div>

      {loading || productsLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0055A3]"></div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-80 flex-shrink-0">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto no-scrollbar">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center">
                    <Filter className="w-5 h-5 text-[#2C5DB6] mr-2" />
                    {currentLang === 'ar' ? 'الفلاتر' : 'Filters'}
                  </h3>
                  {getActiveFiltersCount() > 0 && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-[#2C5DB6] hover:text-blue-700 font-medium"
                    >
                      {currentLang === 'ar' ? 'مسح الكل' : 'Clear All'}
                    </button>
                  )}
                </div>

                {/* Search */}
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder={currentLang === 'ar' ? 'ابحث عن منتجات...' : 'Search products...'}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#2C5DB6] transition-colors"
                    />
                  </div>
                </div>

                {/* Sort Order */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {currentLang === 'ar' ? 'الترتيب الأبجدي' : 'Alphabetical Order'}
                  </label>
                  <button
                    onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors w-full"
                  >
                    <SortAsc className={`w-4 h-4 ${sortOrder === 'desc' ? 'rotate-180' : ''} transition-transform`} />
                    <span className="text-sm">
                      {sortOrder === 'asc' 
                        ? (currentLang === 'ar' ? 'من أ إلى ي' : 'A to Z') 
                        : (currentLang === 'ar' ? 'من ي إلى أ' : 'Z to A')}
                    </span>
                  </button>
                </div>

                {/* Filter Categories */}
                {Object.entries(filterOptions).map(([category, options]) => (
                  <div key={category} className="mb-6">
                    <button
                      onClick={() =>
                        setActiveFilterCategory(activeFilterCategory === category ? null : category)
                      }
                      className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3 hover:text-[#2C5DB6] transition-colors"
                    >
                      <span className="capitalize">
                        {currentLang === 'ar' 
                          ? `حسب ${category === 'brand' ? 'العلامة التجارية' : category === 'type' ? 'النوع' : category === 'material' ? 'المادة' : category === 'usage' ? 'الاستخدام' : category}`
                          : `By ${category}`}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          activeFilterCategory === category ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {activeFilterCategory === category && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-2">
                            {options.map((option) => (
                              <label
                                key={option}
                                className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
                              >
                                <input
                                  type="checkbox"
                                  checked={selectedFilters[category]?.includes(option) || false}
                                  onChange={() => toggleFilter(category, option)}
                                  className="w-4 h-4 text-[#2C5DB6] border-gray-300 rounded focus:ring-[#2C5DB6]"
                                />
                                <span className="text-sm text-gray-700">{option}</span>
                              </label>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                {/* Active Filters */}
                {getActiveFiltersCount() > 0 && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">
                      {currentLang === 'ar' ? 'الفلاتر النشطة' : 'Active Filters'}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(selectedFilters).map(([category, values]) =>
                        values.map((value) => (
                          <span
                            key={`${category}-${value}`}
                            className="inline-flex items-center space-x-1 px-3 py-1 bg-[#2C5DB6] text-white text-xs rounded-full"
                          >
                            <span>{value}</span>
                            <button
                              onClick={() => toggleFilter(category, value)}
                              className="hover:bg-blue-700 rounded-full p-0.5 transition-colors"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {currentLang === 'ar' 
                      ? `المنتجات (${filteredProducts.length})` 
                      : `Products (${filteredProducts.length})`}
                  </h2>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="flex bg-white rounded-lg shadow-sm border border-gray-200">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-l-lg transition-colors ${
                        viewMode === 'grid'
                          ? 'bg-[#2C5DB6] text-white'
                          : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      <Grid className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-r-lg transition-colors ${
                        viewMode === 'list'
                          ? 'bg-[#2C5DB6] text-white'
                          : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      <List className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Products Display */}
              <AnimatePresence mode="wait">
                {filteredProducts.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-16"
                  >
                    <div className="text-gray-400 mb-4">
                      <Filter className="w-16 h-16 mx-auto" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {currentLang === 'ar' ? 'لم يتم العثور على منتجات' : 'No products found'}
                    </h3>
                    <p className="text-gray-600">
                      {currentLang === 'ar' ? 'جرّب تعديل الفلاتر أو مصطلحات البحث' : 'Try adjusting your filters or search terms'}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key={viewMode}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={
                      viewMode === 'grid'
                        ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                        : 'space-y-4'
                    }
                  >
                    {filteredProducts.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group 
                          ${viewMode === 'list' ? 'flex items-center' : 'flex flex-col'}
                        `}
                        onClick={() => navigate(`/product/${product.id}`)}
                      >
                        {/* Product Image */}
                        <div className={`${viewMode === 'list' ? 'w-24 h-24 flex-shrink-0' : 'h-48'} overflow-hidden`}>
                          <img
                            src={product.image}
                            alt={currentLang === 'ar' ? product.name_ar : product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="p-6 flex-1 grid grid-rows-[auto,1fr,auto] items-stretch">
                          {/* Title & Brand */}
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#2C5DB6] transition-colors">
                                {currentLang === 'ar' ? product.name_ar : product.name}
                              </h3>
                              <p className="text-sm text-gray-500 font-mono">{product.code}</p>
                            </div>
                            <span className="px-3 py-1 bg-blue-50 text-[#2C5DB6] text-xs font-medium rounded-full">
                              {currentLang === 'ar' ? product.brand_ar : product.brand}
                            </span>
                          </div>

                          {/* Description + Tags */}
                          <div className="flex flex-col justify-between">
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                              {currentLang === 'ar' ? product.description_ar : product.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-4">
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                {currentLang === 'ar' ? product.type_ar : product.type}
                              </span>
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                {currentLang === 'ar' ? product.material_ar : product.material}
                              </span>
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                {currentLang === 'ar' ? product.usage_ar : product.usage}
                              </span>
                            </div>
                          </div>

                          {/* Button */}
                          {viewMode === 'grid' && (
                            <button className="w-full bg-[#2C5DB6] text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
                              {currentLang === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                            </button>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;