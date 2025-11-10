import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, ChevronDown, Grid, List, SortAsc } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase, api, ProductFilterType, ProductFilterValue } from '../lib/supabase';
import { useTranslation } from 'react-i18next';

// تعريف واجهة المنتج (نستخدم الـ IDs مباشرة)
interface Product {
  id: string;
  name: string;
  name_ar: string;
  code: string;
  description: string;
  description_ar: string;
  image: string;
  type: string;     // هذا هو type_id (UUID أو TEXT)
  brand: string;    // brand_id
  material: string; // material_id
  usage: string;    // usage_id
}

// خيارات الفلتر: نحتفظ بالـ ID + القيمتين (عربي/إنجليزي)
interface FilterOption {
  id: string;
  value: string;
  value_ar: string;
}

const Products = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [filterOptions, setFilterOptions] = useState<Record<string, FilterOption[]>>({});
  const [filterTypes, setFilterTypes] = useState<(ProductFilterType & { product_filter_values: ProductFilterValue[] })[]>([]);
  const [loading, setLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeFilterCategory, setActiveFilterCategory] = useState<string | null>(null);

  // دالة للحصول على النص المترجم
  const getTranslatedText = useCallback((product: Product, field: string): string => {
    const fieldAr = `${field}_ar` as keyof Product;
    return (isRTL && product[fieldAr]) ? String(product[fieldAr]) : String(product[field as keyof Product]);
  }, [isRTL]);

  // جلب أنواع الفلاتر
  const fetchFilterData = useCallback(async () => {
    try {
      const data = await api.getProductFilterTypes();
      setFilterTypes(data || []);
      
      const options: Record<string, FilterOption[]> = {};
      const initialFilters: Record<string, string[]> = {};

      data?.forEach(filterType => {
        const key = filterType.name.toLowerCase();
        const valuesList: FilterOption[] = [];

        filterType.product_filter_values
          .filter(value => value.is_active)
          .sort((a, b) => a.sort_order - b.sort_order)
          .forEach(value => {
            valuesList.push({
              id: value.id,
              value: value.value,
              value_ar: value.value_ar || value.value,
            });
          });

        options[key] = valuesList;
        initialFilters[key] = []; // نبدأ بفلاتر فارغة (IDs)
      });
      
      setFilterOptions(options);
      setSelectedFilters(initialFilters);
    } catch (error) {
      console.error('Error fetching filter data:', error);
    } finally {
      setLoading(false);
    }
  }, [isRTL]);

  // جلب المنتجات
  const fetchProducts = useCallback(async () => {
    try {
      setProductsLoading(true);
      const { data: productsData, error } = await supabase
        .from('products')
        .select(`
          *,
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
          type: product.type_id || "",
          brand: product.brand_id || "",
          material: product.material_id || "",
          usage: product.usage_id || "",
        };
      });

      setProducts(formattedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setProductsLoading(false);
    }
  }, []);

  // تحميل البيانات عند التحميل الأولي
  useEffect(() => {
    setLoading(true);
    setProductsLoading(true);
    Promise.all([fetchFilterData(), fetchProducts()]).finally(() => {
      // تحميل الفلاتر من الـ URL بعد تحميل filterTypes
      setTimeout(() => {
        const params = new URLSearchParams(location.search);
        const newFilters: Record<string, string[]> = {};
        Object.keys(filterOptions).forEach(key => {
          const val = params.get(key);
          newFilters[key] = val ? val.split(',') : [];
        });
        setSelectedFilters(newFilters);
        setSearchTerm(params.get('q') || '');
      }, 100); // تأجيل بسيط لضمان تحميل filterOptions
    });
  }, [fetchFilterData, fetchProducts, location.search]);

  // تحديث الـ URL عند التغيير
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('q', searchTerm);
    Object.entries(selectedFilters).forEach(([key, ids]) => {
      if (ids.length > 0) params.set(key, ids.join(','));
    });
    navigate(`/products?${params.toString()}`, { replace: true });
  }, [selectedFilters, searchTerm, navigate]);

  // الفلترة النهائية (باستخدام الـ IDs مباشرة)
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // 1. البحث
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      result = result.filter(product => {
        const name = getTranslatedText(product, 'name').toLowerCase();
        const desc = getTranslatedText(product, 'description').toLowerCase();
        const code = (product.code || '').toLowerCase();
        return name.includes(term) || desc.includes(term) || code.includes(term);
      });
    }

    // 2. الفلترة حسب الـ IDs (المفتاح الصحيح!)
    Object.entries(selectedFilters).forEach(([category, selectedIds]) => {
      if (selectedIds.length > 0) {
        result = result.filter(product => {
          const productValue = product[category as keyof Product] as string;
          return selectedIds.includes(productValue); // مقارنة مباشرة بين IDs
        });
      }
    });

    // 3. الترتيب
    result.sort((a, b) => {
      const nameA = getTranslatedText(a, 'name');
      const nameB = getTranslatedText(b, 'name');
      return sortOrder === 'asc'
        ? nameA.localeCompare(nameB, i18n.language)
        : nameB.localeCompare(nameA, i18n.language);
    });

    return result;
  }, [products, selectedFilters, searchTerm, sortOrder, i18n.language, getTranslatedText]);

  // تبديل الفلتر (نمرر الـ ID مباشرة)
  const toggleFilter = (category: string, valueId: string) => {
    setSelectedFilters(prev => {
      const current = prev[category] || [];
      const newValues = current.includes(valueId)
        ? current.filter(id => id !== valueId)
        : [...current, valueId];
      return { ...prev, [category]: newValues };
    });
  };

  const clearFilters = () => {
    const emptyFilters: Record<string, string[]> = {};
    Object.keys(filterOptions).forEach(key => {
      emptyFilters[key] = [];
    });
    setSelectedFilters(emptyFilters);
    setSearchTerm('');
  };

  const getActiveFiltersCount = () => {
    return Object.values(selectedFilters).flat().length;
  };

  const getFilterCategoryName = (category: string): string => {
    const filterNames: Record<string, string> = {
      'brand': t('products.brand'),
      'type': t('products.type'),
      'material': t('products.material'),
      'usage': t('products.usage')
    };
    return filterNames[category] || category;
  };

  const getFilterValueLabel = (category: string, valueId: string): string => {
    const options = filterOptions[category] || [];
    const option = options.find(opt => opt.id === valueId);
    if (!option) return valueId;
    return isRTL && option.value_ar ? option.value_ar : option.value;
  };

  if (loading || productsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-logo"></div>
      </div>
    );
  }

  return ( 
    <div className="min-h-screen bg-gray-50 pt-20" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <div className="text-logo pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {t('products.title')}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                  <Filter className="w-5 h-5 text-logo mr-2" />
                  {t('products.filter')}
                </h3>
                {getActiveFiltersCount() > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-logo hover:text-white/20 font-medium"
                  >
                    {t('products.clearAll')}
                  </button>
                )}
              </div>

              {/* Search */}
              <div className="mb-6">
                <div className="relative">
                  <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-3 w-5 h-5 text-gray-400`} />
                  <input
                    type="text"
                    placeholder={t('products.searchPlaceholder')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-logo transition-colors`}
                  />
                </div>
              </div>

              {/* Sort Order */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('products.sortByName')}
                </label>
                <button
                  onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors w-full"
                >
                  <SortAsc className={`w-4 h-4 ${sortOrder === 'desc' ? 'rotate-180' : ''} transition-transform`} />
                  <span className="text-sm">
                    {sortOrder === 'asc' ? t('products.ascending') : t('products.descending')}
                  </span>
                </button>
              </div>

              {/* Filter Categories */}
              {Object.entries(filterOptions).map(([category, options]) => (
                <div key={category} className="mb-6">
                  <button
                    onClick={() => setActiveFilterCategory(activeFilterCategory === category ? null : category)}
                    className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3 hover:text-logo transition-colors"
                  >
                    <span>{getFilterCategoryName(category)}</span>
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
                          {options.map((option) => {
                            const displayValue = isRTL && option.value_ar 
                              ? option.value_ar 
                              : option.value;

                            return (
                              <label
                                key={option.id}
                                className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
                                style={isRTL ? { flexDirection: 'row-reverse', spaceX: 'space-x-reverse' } : {}}
                              >
                                <input
                                  type="checkbox"
                                  checked={selectedFilters[category]?.includes(option.id) || false}
                                  onChange={() => toggleFilter(category, option.id)} // ← نمرر الـ ID
                                  className="w-4 h-4 text-logo border-gray-300 rounded focus:ring-logo"
                                />
                                <span className="text-sm text-gray-700">{displayValue}</span>
                              </label>
                            );
                          })}
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
                    {t('products.activeFilters')}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(selectedFilters).map(([category, ids]) =>
                      ids.map((id) => (
                        <span
                          key={`${category}-${id}`}
                          className="inline-flex items-center space-x-1 px-3 py-1 bg-logo text-white text-xs rounded-full"
                          style={isRTL ? { flexDirection: 'row-reverse' } : {}}
                        >
                          <span>{getFilterValueLabel(category, id)}</span>
                          <button
                            onClick={() => toggleFilter(category, id)}
                            className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
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
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                {t('products.ourProducts')} ({filteredProducts.length})
              </h2>
              
              <div className="flex items-center space-x-3">
                <div className="flex bg-white rounded-lg shadow-sm border border-gray-200">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${isRTL ? 'rounded-r-lg' : 'rounded-l-lg'} transition-colors ${
                      viewMode === 'grid'
                        ? 'bg-logo text-white'
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${isRTL ? 'rounded-l-lg' : 'rounded-r-lg'} transition-colors ${
                      viewMode === 'list'
                        ? 'bg-logo text-white'
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

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
                    {t('products.noProductsFound')}
                  </h3>
                  <p className="text-gray-600">
                    {t('products.tryAdjustingSearch')}
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
                  {filteredProducts.map((product, index) => {
                    const productName = getTranslatedText(product, 'name');
                    const productDescription = getTranslatedText(product, 'description');
                    const productBrand = getFilterValueLabel('brand', product.brand);
                    const productType = getFilterValueLabel('type', product.type);
                    const productMaterial = getFilterValueLabel('material', product.material);
                    const productUsage = getFilterValueLabel('usage', product.usage);

                    return (
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
                        <div className={`${viewMode === 'list' ? 'w-24 h-24 flex-shrink-0' : 'h-48'} overflow-hidden`}>
                          <img
                            src={product.image}
                            alt={productName}
                            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>

                        <div className="p-6 flex-1 grid grid-rows-[auto,1fr,auto] items-stretch">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900 group-hover:text-logo transition-colors">
                                {productName}
                              </h3>
                              <p className="text-sm text-gray-500 font-mono">{product.code}</p>
                            </div>
                            {product.brand && (
                              <span className="px-3 py-1 bg-logo text-white text-xs font-medium rounded-full">
                                {productBrand}
                              </span>
                            )}
                          </div>

                          <div className="flex flex-col justify-between">
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                              {productDescription} 
                            </p>

                            <div className="flex flex-wrap gap-2 mb-4">
                              {product.type && (
                                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                  {productType}
                                </span>
                              )}
                              {product.material && (
                                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                  {productMaterial}
                                </span>
                              )}
                              {product.usage && (
                                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                  {productUsage}
                                </span>
                              )}
                            </div>
                          </div>

                          {viewMode === 'grid' && (
                            <button className="w-full but py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-logo/20 font-medium">
                              {t('products.viewDetails')}
                            </button>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;