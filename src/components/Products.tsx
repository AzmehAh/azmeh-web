import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, ChevronDown, Grid, List, SortAsc } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase, api, ProductFilterType, ProductFilterValue } from '../lib/supabase';
import { useTranslation } from 'react-i18next';


interface Product {
  id: string;
  name: string;
  name_ar: string;
  code: string;
  description: string;
  description_ar: string;

  type: string;
  brand: string;
  material: string; 
  usage: string;
}


let filterDataCache: any = null;
let productsDataCache: any = null;
let currentLanguageCache: string = '';

const Products = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [filterOptions, setFilterOptions] = useState<Record<string, {id: string, value: string}[]>>({});
  const [filterTypes, setFilterTypes] = useState<(ProductFilterType & { product_filter_values: ProductFilterValue[] })[]>([]);
  const [loading, setLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [activeFilterCategory, setActiveFilterCategory] = useState<string | null>(null);

  const isRTL = i18n.language === 'ar';

  // جلب بيانات الفلاتر مع caching
  const fetchFilterData = useCallback(async () => {
    if (filterDataCache && currentLanguageCache === i18n.language) {
      setFilterTypes(filterDataCache.filterTypes);
      setFilterOptions(filterDataCache.filterOptions);
      setSelectedFilters(filterDataCache.initialFilters);
      setLoading(false);
      return;
    }

    try {
      const data = await api.getProductFilterTypes();
      setFilterTypes(data || []);
      
      const options: Record<string, {id: string, value: string}[]> = {};
      const initialFilters: Record<string, string[]> = {};

      data?.forEach(filterType => {
        const key = filterType.name.toLowerCase();
        const valuesList: {id: string, value: string}[] = [];

        filterType.product_filter_values
          .filter(value => value.is_active)
          .sort((a, b) => a.sort_order - b.sort_order)
          .forEach(value => {
            const displayValue = i18n.language === 'ar' && value.value_ar ? value.value_ar : value.value;
            valuesList.push({ id: value.id, value: displayValue });
          });

        options[key] = valuesList;
        initialFilters[key] = [];
      });
      
      setFilterOptions(options);
      
      filterDataCache = {
        filterTypes: data || [],
        filterOptions: options,
        initialFilters
      };
      currentLanguageCache = i18n.language;
      setSelectedFilters(initialFilters);
      
    } catch (error) {
      console.error('Error fetching filter data:', error);
    } finally {
      setLoading(false);
    }
  }, [i18n.language]);

  const fetchProducts = useCallback(async () => {
    if (productsDataCache) {
      setProducts(productsDataCache);
      setProductsLoading(false);
      return;
    }

    try {
      setProductsLoading(true);
  
const { data: productsData, error } = await supabase
  .from('products')
  .select(`
    *,
    product_images(*),
    product_materials(material_id)
  `)
  .eq('status', 'active')
  .order('created_at', { ascending: false });

if (error) throw error;

const formattedProducts = (productsData || []).map(product => {
  const mainImage = product.product_images.find((img: any) => img.is_main) || 
                    product.product_images[0];

  const materialIds = product.product_materials?.map(pm => pm.material_id) || [];

 

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

  
    "material type": materialIds, 
    "application fields": materialIds, 
  };
});

      productsDataCache = formattedProducts;
      setProducts(formattedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setProductsLoading(false);
    }
  }, []);

// 👇 جديد: دالة لقراءة الفلاتر من الـ URL
const initializeFiltersFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  const initialFilters: Record<string, string[]> = {};

  Object.keys(filterOptions).forEach((category) => {
    const paramValue = params.get(category);
    if (paramValue) {
      // تقسيم القيم إذا كانت متعددة (مفصولة بفواصل)
      const values = paramValue.split(',').map(v => v.trim()).filter(v => v);
      // التأكد من أن كل قيمة موجودة فعلاً في خيارات الفلتر (لتجنب قيم مزيفة)
      const validValues = values.filter(val =>
        filterOptions[category]?.some(opt => opt.value === val)
      );
      initialFilters[category] = validValues;
    } else {
      initialFilters[category] = [];
    }
  });

  setSelectedFilters(initialFilters);
};

// 👇 تعديل useEffect لتحميل البيانات ثم تطبيق الفلاتر من الرابط
useEffect(() => {
  const loadData = async () => {
    setLoading(true);
    setProductsLoading(true);
    await Promise.all([fetchFilterData(), fetchProducts()]);
  };
  loadData();
}, [fetchFilterData, fetchProducts]);

// 👇 جديد: بعد تحميل filterOptions، نُطبّق الفلاتر من الـ URL
useEffect(() => {
  if (!loading && Object.keys(filterOptions).length > 0) {
    initializeFiltersFromUrl();
  }
}, [loading, filterOptions]);
 
  useEffect(() => {
    if (!loading) {
      fetchFilterData();
    }
  }, [i18n.language, fetchFilterData]);

 
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

   
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(product => {
     
        const name = isRTL
          ? (product.name_ar || product.name || '').toLowerCase()
          : (product.name || '').toLowerCase();
        
       
        const description = isRTL
          ? (product.description_ar || product.description || '').toLowerCase()
          : (product.description || '').toLowerCase();
        
    
        const code = (product.code?.toString() || '').toLowerCase();

        return name.includes(term) || description.includes(term) || code.includes(term);
      });
    }


Object.entries(selectedFilters).forEach(([category, selectedValues]) => {
  if (selectedValues.length > 0) {
    filtered = filtered.filter(product => {
    
      const categoryOptions = filterOptions[category] || [];
      const selectedIds = selectedValues.map(selectedValue => {
        const option = categoryOptions.find(opt => opt.value === selectedValue);
        return option?.id;
      }).filter(Boolean);

      if (Array.isArray(product[category as keyof Product])) {
      
        return product[category as keyof Product].some(
          (productId: string) => selectedIds.includes(productId)
        );
      } else {
        
        const productValue = product[category as keyof Product] as string;
        return selectedIds.includes(productValue);
      }
    });
  }
});

    
    filtered.sort((a, b) => {
      const nameA = isRTL ? (a.name_ar || a.name) : a.name;
      const nameB = isRTL ? (b.name_ar || b.name) : b.name;
      return sortOrder === 'asc'
        ? nameA.localeCompare(nameB, i18n.language)
        : nameB.localeCompare(nameA, i18n.language);
    });

    return filtered;
  }, [searchTerm, selectedFilters, sortOrder, products, i18n.language, filterOptions, isRTL]);

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
    Object.keys(filterOptions).forEach(key => {
      emptyFilters[key] = [];
    });
    setSelectedFilters(emptyFilters);
    setSearchTerm('');
    navigate('/products', { replace: true });
  };

  const getActiveFiltersCount = () => {
    return Object.values(selectedFilters).flat().length;
  };

 const getFilterCategoryName = (category: string): string => {

  const matchedType = filterTypes.find(
    (ft) => ft.name.toLowerCase() === category.toLowerCase()
  );

  if (!matchedType) {
    
    return category;
  }


  return i18n.language === "ar"
    ? matchedType.name_ar || matchedType.name
    : matchedType.name;
};


  
  return ( 
    <div className="min-h-screen bg-gray-50 pt-20 scrollable-page custom-scrollbar" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="text-logo pt-20 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {t('products.title')}
          </h1>
        </div>
      </div>

      {loading || productsLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-logo"></div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside className="lg:w-80 flex-shrink-0">
              <div className="lg:sticky lg:top-24">
                <div className="bg-white rounded-xl shadow-lg p-6 max-h-[calc(100vh-7rem)] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center">
                    <Filter className="w-5 h-5 text-logo mr-2" />
                    {t('products.filter')}
                  </h3> 
                  {getActiveFiltersCount() > 0 && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-logo  font-medium"
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
                    className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors w-full"
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
                            {options.map((option) => (
                              <label
                                key={option.id}
                                className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
                              >
                                <input
                                  type="checkbox"
                                  checked={selectedFilters[category]?.includes(option.value) || false}
                                  onChange={() => toggleFilter(category, option.value)}
                                  className="w-4 h-4 text-logo border-gray-300 rounded focus:ring-logo mt-0.5 flex-shrink-0 "
                                />
                                <span className="text-sm text-gray-700">{option.value}</span>
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
                      {t('products.activeFilters')}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(selectedFilters).map(([category, values]) =>
                        values.map((value) => (
                          <span
                            key={`${category}-${value}`}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-logo text-white text-xs rounded-full"
                          >
                            <span>{value}</span>
                            <button
                              onClick={() => toggleFilter(category, value)}
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
            </aside>

            {/* Products Grid */}
            <div className="flex-1 "> 
              <div className="flex items-center justify-between mb-8 ">
                <h2 className="text-2xl font-bold text-gray-900">
                  {t('products.ourProducts')} ({filteredProducts.length})
                </h2> 
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

              <AnimatePresence mode="wait">
                {filteredProducts.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-16"
                  >
                    <Filter className="w-16 h-16 mx-auto text-gray-400" />
                    <h3 className="text-xl font-semibold text-gray-900 mt-4">
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
                      const productName = isRTL ? (product.name_ar || product.name) : product.name;
                      const productDescription = isRTL ? (product.description_ar || product.description) : product.description;

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
                              className="w-full h-full object-cover ontain group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>

                          <div className="p-6 flex-1">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h3 className="text-xl font-bold text-gray-900 group-hover:text-logo">
                                  {productName}
                                </h3>
                                <p className="text-sm text-gray-500 font-mono">{product.code}</p>
                              </div>
                            </div>

                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                              {productDescription} 
                            </p>

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
      )}
    </div>
  );
};

export default Products;