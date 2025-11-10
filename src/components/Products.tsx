import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, ChevronDown, Grid, List, SortAsc } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase, api } from '../lib/supabase';
import { useTranslation } from 'react-i18next';

// تعريف الواجهات
interface Product {
  id: string;
  name: string;
  name_ar: string;
  code: string;
  description: string;
  description_ar: string;
  image: string;
  type_id: string | null;
  brand_id: string | null;
  material_id: string | null;
  usage_id: string | null;
}

interface FilterType {
  id: string;
  name: string; // مثل: "brand", "type"
  product_filter_values: {
    id: string;
    value: string;
    value_ar: string;
    is_active: boolean;
    sort_order: number;
  }[];
}

const Products = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  // الحالة
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [filterTypes, setFilterTypes] = useState<FilterType[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeFilterCategory, setActiveFilterCategory] = useState<string | null>(null);
  const [loadingFilters, setLoadingFilters] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);

  // تهيئة الفلاتر من الـ URL عند التحميل الأولي
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const initialFilters: Record<string, string[]> = {};

    // سنملأ selectedFilters لاحقًا بعد تحميل filterTypes
    setSearchTerm(params.get('q') || '');
  }, [location.search]);

  // تحميل أنواع الفلاتر (brand, type, material, usage)
  const fetchFilterTypes = useCallback(async () => {
    try {
      const data = await api.getProductFilterTypes();
      setFilterTypes(data || []);
      
      // بناء selectedFilters فارغ حسب الأنواع
      const initialFilters: Record<string, string[]> = {};
      const params = new URLSearchParams(location.search);
      
      data?.forEach(ft => {
        const key = ft.name.toLowerCase();
        const fromUrl = params.get(key);
        initialFilters[key] = fromUrl ? fromUrl.split(',') : [];
      });

      setSelectedFilters(initialFilters);
    } catch (err) {
      console.error('Failed to load filter types', err);
    } finally {
      setLoadingFilters(false);
    }
  }, [location.search]);

  // تحميل المنتجات مع الفلاتر المطبّقة
  const fetchProducts = useCallback(async (filters: Record<string, string[]>, term: string) => {
    try {
      setLoadingProducts(true);

      let query = supabase
        .from('products')
        .select(`
          id,
          name,
          name_ar,
          code,
          description,
          description_ar,
          type_id,
          brand_id,
          material_id,
          usage_id,
          product_images!inner(id, image_url, is_main)
        `)
        .eq('status', 'active')
        .eq('product_images.is_main', true);

      // تطبيق الفلاتر على الحقول (نستخدم الـ IDs)
      if (filters['brand']?.length) {
        query = query.in('brand_id', filters['brand']);
      }
      if (filters['type']?.length) {
        query = query.in('type_id', filters['type']);
      }
      if (filters['material']?.length) {
        query = query.in('material_id', filters['material']);
      }
      if (filters['usage']?.length) {
        query = query.in('usage_id', filters['usage']);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;

      const formatted = data.map(p => ({
        id: p.id,
        name: p.name || '',
        name_ar: p.name_ar || p.name || '',
        code: p.code || '',
        description: p.description || '',
        description_ar: p.description_ar || p.description || '',
        image: p.product_images[0]?.image_url || '',
        type_id: p.type_id,
        brand_id: p.brand_id,
        material_id: p.material_id,
        usage_id: p.usage_id,
      }));

      setProducts(formatted);
    } catch (err) {
      console.error('Failed to fetch products', err);
    } finally {
      setLoadingProducts(false);
    }
  }, []);

  // إعادة تحميل الفلاتر عند تغيير اللغة
  useEffect(() => {
    setLoadingFilters(true);
    fetchFilterTypes();
  }, [i18n.language, fetchFilterTypes]);

  // تطبيق الفلاتر والبحث
  useEffect(() => {
    if (!loadingFilters) {
      fetchProducts(selectedFilters, searchTerm);
    }
  }, [selectedFilters, searchTerm, fetchProducts, loadingFilters]);

  // تحديث الـ URL عند تغيير الفلاتر أو البحث
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('q', searchTerm);
    Object.entries(selectedFilters).forEach(([key, values]) => {
      if (values.length > 0) params.set(key, values.join(','));
    });
    navigate(`/products?${params.toString()}`, { replace: true });
  }, [selectedFilters, searchTerm, navigate]);

  // دوال مساعدة
  const getTranslatedText = (product: Product, field: 'name' | 'description'): string => {
    return isRTL ? product[`${field}_ar` as keyof Product] || product[field] : product[field];
  };

  const getFilterValueLabel = (category: string, valueId: string): string => {
    const filterType = filterTypes.find(ft => ft.name.toLowerCase() === category);
    const value = filterType?.product_filter_values.find(v => v.id === valueId);
    if (!value) return valueId;
    return isRTL && value.value_ar ? value.value_ar : value.value;
  };

  const getFilterCategoryLabel = (key: string): string => {
    const map: Record<string, string> = {
      brand: t('products.brand'),
      type: t('products.type'),
      material: t('products.material'),
      usage: t('products.usage'),
    };
    return map[key] || key;
  };

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
    const empty: Record<string, string[]> = {};
    filterTypes.forEach(ft => {
      empty[ft.name.toLowerCase()] = [];
    });
    setSelectedFilters(empty);
    setSearchTerm('');
  };

  const activeFiltersCount = useMemo(() => 
    Object.values(selectedFilters).flat().length, 
    [selectedFilters]
  );

  // الفلترة النهائية (البحث فقط — لأن الفلاتر تُطبّق على مستوى الاستعلام)
  const finalProducts = useMemo(() => {
    if (!searchTerm) return products;

    const term = searchTerm.toLowerCase().trim();
    return products.filter(p => {
      const name = getTranslatedText(p, 'name').toLowerCase();
      const desc = getTranslatedText(p, 'description').toLowerCase();
      const code = p.code?.toLowerCase() || '';
      return name.includes(term) || desc.includes(term) || code.includes(term);
    });
  }, [products, searchTerm, i18n.language]);

  // الترتيب
  const sortedProducts = useMemo(() => {
    return [...finalProducts].sort((a, b) => {
      const nameA = getTranslatedText(a, 'name');
      const nameB = getTranslatedText(b, 'name');
      return sortOrder === 'asc'
        ? nameA.localeCompare(nameB, i18n.language)
        : nameB.localeCompare(nameA, i18n.language);
    });
  }, [finalProducts, sortOrder, i18n.language]);

  const isLoading = loadingFilters || loadingProducts;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-logo"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero */}
      <div className="text-logo pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">{t('products.title')}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                  <Filter className="w-5 h-5 text-logo ml-2 mr-2" />
                  {t('products.filter')}
                </h3>
                {activeFiltersCount > 0 && (
                  <button onClick={clearFilters} className="text-sm text-logo font-medium">
                    {t('products.clearAll')}
                  </button>
                )}
              </div>

              {/* Search */}
              <div className="mb-6">
                <div className="relative">
                  <Search className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'} w-5 h-5 text-gray-400`} />
                  <input
                    type="text"
                    placeholder={t('products.searchPlaceholder')}
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className={`w-full py-3 pl-10 pr-4 border border-gray-200 rounded-lg focus:outline-none focus:border-logo`}
                    style={isRTL ? { paddingRight: '2.5rem', paddingLeft: '1rem' } : {}}
                  />
                </div>
              </div>

              {/* Sort */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('products.sortByName')}
                </label>
                <button
                  onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 w-full"
                  style={isRTL ? { flexDirection: 'row-reverse' } : {}}
                >
                  <SortAsc className={`w-4 h-4 ${sortOrder === 'desc' ? 'rotate-180' : ''}`} />
                  <span className="text-sm">
                    {sortOrder === 'asc' ? t('products.ascending') : t('products.descending')}
                  </span>
                </button>
              </div>

              {/* Filter Categories */}
              {filterTypes.map(filterType => {
                const key = filterType.name.toLowerCase();
                const options = filterType.product_filter_values
                  .filter(v => v.is_active)
                  .sort((a, b) => a.sort_order - b.sort_order);

                return (
                  <div key={key} className="mb-6">
                    <button
                      onClick={() => setActiveFilterCategory(prev => prev === key ? null : key)}
                      className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3 hover:text-logo"
                    >
                      <span>{getFilterCategoryLabel(key)}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${activeFilterCategory === key ? 'rotate-180' : ''}`}
                      />
                    </button>

                    <AnimatePresence>
                      {activeFilterCategory === key && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-2">
                            {options.map(option => (
                              <label
                                key={option.id}
                                className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded-md"
                                style={isRTL ? { flexDirection: 'row-reverse' } : {}}
                              >
                                <input
                                  type="checkbox"
                                  checked={selectedFilters[key]?.includes(option.id) || false}
                                  onChange={() => toggleFilter(key, option.id)}
                                  className="w-4 h-4 text-logo rounded focus:ring-logo"
                                />
                                <span className="text-sm text-gray-700">
                                  {isRTL && option.value_ar ? option.value_ar : option.value}
                                </span>
                              </label>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              {/* Active Filters Tags */}
              {activeFiltersCount > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">
                    {t('products.activeFilters')}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(selectedFilters).map(([cat, ids]) =>
                      ids.map(id => (
                        <span
                          key={`${cat}-${id}`}
                          className="inline-flex items-center space-x-1 px-3 py-1 bg-logo text-white text-xs rounded-full"
                          style={isRTL ? { flexDirection: 'row-reverse' } : {}}
                        >
                          <span>{getFilterValueLabel(cat, id)}</span>
                          <button onClick={() => toggleFilter(cat, id)} className="hover:bg-white/20 rounded-full p-0.5">
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

          {/* Products */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                {t('products.ourProducts')} ({sortedProducts.length})
              </h2>
              <div className="flex bg-white rounded-lg shadow-sm border border-gray-200">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${isRTL ? 'rounded-r-lg' : 'rounded-l-lg'} ${
                    viewMode === 'grid' ? 'bg-logo text-white' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${isRTL ? 'rounded-l-lg' : 'rounded-r-lg'} ${
                    viewMode === 'list' ? 'bg-logo text-white' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            {sortedProducts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <Filter className="w-16 h-16 mx-auto text-gray-400" />
                <h3 className="text-xl font-semibold text-gray-900 mt-4">{t('products.noProductsFound')}</h3>
                <p className="text-gray-600 mt-2">{t('products.tryAdjustingSearch')}</p>
              </motion.div>
            ) : (
              <motion.div
                key={viewMode}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-4'}
              >
                {sortedProducts.map((product, idx) => {
                  const name = getTranslatedText(product, 'name');
                  const desc = getTranslatedText(product, 'description');
                  const brandLabel = product.brand_id ? getFilterValueLabel('brand', product.brand_id) : '';
                  const typeLabel = product.type_id ? getFilterValueLabel('type', product.type_id) : '';
                  const materialLabel = product.material_id ? getFilterValueLabel('material', product.material_id) : '';
                  const usageLabel = product.usage_id ? getFilterValueLabel('usage', product.usage_id) : '';

                  return (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.03 }}
                      className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer group ${
                        viewMode === 'list' ? 'flex items-center' : 'flex flex-col'
                      }`}
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      <div className={`${viewMode === 'list' ? 'w-24 h-24 flex-shrink-0' : 'h-48'} overflow-hidden`}>
                        <img
                          src={product.image}
                          alt={name}
                          className="w-full h-full object-contain group-hover:scale-110 transition-transform"
                        />
                      </div>
                      <div className="p-6 flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-logo">{name}</h3>
                            <p className="text-sm text-gray-500 font-mono">{product.code}</p>
                          </div>
                          {brandLabel && (
                            <span className="px-3 py-1 bg-logo text-white text-xs rounded-full">{brandLabel}</span>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{desc}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {typeLabel && <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">{typeLabel}</span>}
                          {materialLabel && <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">{materialLabel}</span>}
                          {usageLabel && <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">{usageLabel}</span>}
                        </div>
                        {viewMode === 'grid' && (
                          <button className="w-full but py-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-logo/20">
                            {t('products.viewDetails')}
                          </button>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;