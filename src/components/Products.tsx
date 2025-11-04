import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, ChevronDown, Grid, List, SortAsc } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase, api, ProductFilterType, ProductFilterValue } from '../lib/supabase';
import { useTranslation } from 'react-i18next';

// تعريف واجهة المنتج
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

const Products = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [filterOptions, setFilterOptions] = useState<Record<string, string[]>>({});
  const [translatedFilterValues, setTranslatedFilterValues] = useState<Record<string, Record<string, string>>>({});
  const [filterTypes, setFilterTypes] = useState<(ProductFilterType & { product_filter_values: ProductFilterValue[] })[]>([]);
  const [loading, setLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeFilterCategory, setActiveFilterCategory] = useState<string | null>(null);

  const isRTL = i18n.language === 'ar';

  // دالة مساعدة لترجمة قيم الفلاتر
  const translateFilterValue = (category: string, value: string): string => {
    if (!translatedFilterValues[category]) return value;
    return translatedFilterValues[category][value] || value;
  };

  // دالة للحصول على النص المترجم للحقول النصية (مثل الاسم والوصف)
  const getTranslatedText = (product: Product, field: string): string => {
    const fieldAr = `${field}_ar` as keyof Product;
    return (i18n.language === 'ar' && product[fieldAr]) ? String(product[fieldAr]) : String(product[field as keyof Product]);
  };

  const fetchFilterData = async () => {
  try {
    const data = await api.getProductFilterTypes();
    setFilterTypes(data || []);
    
    const options: Record<string, string[]> = {};
    const translations: Record<string, Record<string, string>> = {};

    data?.forEach(filterType => {
      const key = filterType.name.toLowerCase();
      // سنقوم بتخزين القيم المترجمة باستخدام الـ id كمفتاح
      const translatedValuesMap: Record<string, string> = {};
      const translatedValuesList: string[] = [];

      filterType.product_filter_values
        .filter(value => value.is_active)
        .sort((a, b) => a.sort_order - b.sort_order)
        .forEach(value => {
          const displayValue = i18n.language === 'ar' && value.value_ar ? value.value_ar : value.value;
          // ⚠️ المفتاح الآن هو الـ id
          translatedValuesMap[value.id] = displayValue;
          translatedValuesList.push(displayValue);
        });

      options[key] = translatedValuesList;
      translations[key] = translatedValuesMap; // ← خريطة الـ IDs إلى القيم المترجمة
    });
    
    setFilterOptions(options);
    setTranslatedFilterValues(translations);
    
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
        // ✅ استخدم الـ IDs هنا
        type: product.type_id || "", // ← هذا هو الـ ID
        brand: product.brand_id || "", // ← هذا هو الـ ID
        material: product.material_id || "", // ← هذا هو الـ ID
        usage: product.usage_id || "", // ← هذا هو الـ ID
        // يمكنك حذف الحقول *_ar للـ type, brand, etc. لأنها غير مستخدمة
      };
    });

    setProducts(formattedProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
  } finally {
    setProductsLoading(false);
  }
};
      
  // إعادة تحميل البيانات عند تغيير اللغة
  useEffect(() => {
    setLoading(true);
    setProductsLoading(true);
    fetchFilterData();
    fetchProducts();
  }, [i18n.language]);

  // عند تحميل الصفحة وتهيئة الفلاتر من الـ URL
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

  const getFilterCategoryName = (category: string): string => {
  const filterNames: Record<string, string> = {
    'brand': t('products.brand'),
    'type': t('products.type'),
    'material type': t('products.material'), // ← اسم الفئة الصحيح
    'application fields': t('products.usage') // ← اسم الفئة الصحيح
  };
  return filterNames[category] || category;
};

const filteredProducts = useMemo(() => {
  let filtered = products.filter(product => {
    const productName = getTranslatedText(product, 'name');
    const productDescription = getTranslatedText(product, 'description');
    
    const matchesSearch = productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         productDescription.toLowerCase().includes(searchTerm.toLowerCase());

    // 👇 ابدأ الاستبدال من هنا 👇
    const matchesFilters = Object.entries(selectedFilters).every(([category, values]) => {
      if (values.length === 0) return true;

      // ✅ فقط الفلاتر المعروفة نعالجها
      const supported = ['Brand', 'Type', 'Material Type', 'Application Fields'];
      if (!supported.includes(category)) {
        return true; // تجاهل الفلاتر الجديدة
      }

      // ربط الفئة بالحقل
      let field: keyof Product;
      if (category === 'Brand') field = 'brand';
      else if (category === 'Type') field = 'type';
      else if (category === 'Material Type') field = 'material';
      else if (category === 'Application Fields') field = 'usage';
      else return true;

      const productValue = product[field];
      if (productValue == null) return false;

      const translatedValue = translateFilterValue(category, String(productValue));
      return values.includes(translatedValue);
    });
    // 👆 انتهى الاستبدال هنا 👆

    return matchesSearch && matchesFilters;
  });

  // ... باقي الكود (الفرز، إلخ)
  filtered.sort((a, b) => {
    const aName = getTranslatedText(a, 'name');
    const bName = getTranslatedText(b, 'name');
    const compareValue = aName.localeCompare(bName, i18n.language);
    return sortOrder === 'asc' ? compareValue : -compareValue;
  });

  return filtered;
}, [searchTerm, selectedFilters, sortOrder, products, i18n.language, translatedFilterValues]);

    filtered.sort((a, b) => {
      const aName = getTranslatedText(a, 'name');
      const bName = getTranslatedText(b, 'name');
      const compareValue = aName.localeCompare(bName, i18n.language);
      return sortOrder === 'asc' ? compareValue : -compareValue;
    });

    return filtered;
  }, [searchTerm, selectedFilters, sortOrder, products, i18n.language, translatedFilterValues]);

  return (
    <div className="min-h-screen bg-gray-50 pt-20" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <div className=" text-logo pt-20 ">
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
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24  
                          max-h-[calc(100vh-6rem)] overflow-y-auto no-scrollbar">
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
                    onClick={() =>
                      setActiveFilterCategory(activeFilterCategory === category ? null : category)
                    }
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
                              key={option}
                              className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
                            >
                              <input
                                type="checkbox"
                                checked={selectedFilters[category]?.includes(option) || false}
                                onChange={() => toggleFilter(category, option)}
                                className="w-4 h-4 text-logo border-gray-300 rounded focus:ring-logo"
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
                    {t('products.activeFilters')}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(selectedFilters).map(([category, values]) =>
                      values.map((value) => (
                        <span
                          key={`${category}-${value}`}
                          className="inline-flex items-center space-x-1 px-3 py-1 bg-logo text-white text-xs rounded-full"
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

          {/* Products Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  {t('products.ourProducts')} ({filteredProducts.length})
                </h2> 
              </div>
              
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
  // ✅ استخدم الـ IDs للترجمة
  const productBrand = translateFilterValue('brand', product.brand); // product.brand هو الـ ID
  const productType = translateFilterValue('type', product.type); // product.type هو الـ ID
  const productMaterial = translateFilterValue('material', product.material); // product.material هو الـ ID
  const productUsage = translateFilterValue('usage', product.usage); // product.usage هو الـ ID


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
                        {/* Product Image */}
                        <div className={`${viewMode === 'list' ? 'w-24 h-24 flex-shrink-0' : 'h-48'} overflow-hidden`}>
                          <img
                            src={product.image}
                            alt={productName}
                            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="p-6 flex-1 grid grid-rows-[auto,1fr,auto] items-stretch">
                          {/* Title & Brand */}
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900 group-hover:text-logo transition-colors">
                                {productName}
                              </h3>
                              <p className="text-sm text-gray-500 font-mono">{product.code}</p>
                            </div>
                            <span className="px-3 py-1 bg-logo text-white text-xs font-medium rounded-full">
                              {productBrand}
                            </span>
                          </div>

                          {/* Description + Tags */}
                          <div className="flex flex-col justify-between">
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                              {productDescription} 
                            </p>

                            <div className="flex flex-wrap gap-2 mb-4">
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                {productType}
                              </span>
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                {productMaterial}
                              </span>
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                {productUsage}
                              </span>
                            </div>
                          </div>

                     {/* Button */}
{viewMode === 'grid' && (
  <button className="w-full but py-2 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-logo/20 
                     font-medium">
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