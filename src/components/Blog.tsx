import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, X, ChevronDown } from 'lucide-react';
import { supabase, api, Bulletin, BulletinCategoryConfig } from '../lib/supabase';
import { useTranslation } from 'react-i18next';

const Blog = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const navigate = useNavigate();

  // 📦 بيانات الأصلية (لا تتغير عند تغيير اللغة)
  const [originalBulletins, setOriginalBulletins] = useState<Bulletin[]>([]);
  const [originalCategoriesConfig, setOriginalCategoriesConfig] = useState<BulletinCategoryConfig[]>([]);

  // 🌐 بيانات مُترجمة/مرتبة حسب اللغة الحالية
  const [bulletins, setBulletins] = useState<Bulletin[]>([]);
  const [systemCategories, setSystemCategories] = useState<Record<string, string[]>>({});
  const [bulletinCategories, setBulletinCategories] = useState<BulletinCategoryConfig[]>([]);
  const [categoryDisplayNames, setCategoryDisplayNames] = useState<Record<string, string>>({});

  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // 🔁 تحميل البيانات مرة واحدة فقط عند التحميل الأولي
  useEffect(() => {
    const loadInitialData = async () => {
      if (originalBulletins.length > 0 && originalCategoriesConfig.length > 0) return;

      try {
        const [bulletinsData, categoriesData] = await Promise.all([
          api.getBulletins(),
          api.getBulletinCategoriesConfig()
        ]);

        setOriginalBulletins(bulletinsData || []);
        setOriginalCategoriesConfig(categoriesData || []);

        // استخدم هذه البيانات لاحقاً في تحديث اللغة
        setBulletins(bulletinsData || []);
        setBulletinCategories(categoriesData || []);

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []); // فقط مرة واحدة

  // 🌍 تحديث العرض عند تغيير اللغة (بدون إعادة جلب من API)
  useEffect(() => {
    if (originalBulletins.length === 0 || originalCategoriesConfig.length === 0) return;

    const isRTL = i18n.language === 'ar';

    const categoriesMap: Record<string, string[]> = {};
    const displayNames: Record<string, string> = {};

    originalCategoriesConfig.forEach(category => {
      if (category.is_active) {
        const originalName = category.name;
        const displayName = isRTL ? category.name_ar || category.name : category.name;
        
        displayNames[originalName] = displayName;

        const categoryBulletins = originalBulletins.filter(b => b.category === originalName);
        const subcategories = [
          ...new Set(
            categoryBulletins
              .map(b => (isRTL ? b.subcategory_ar || b.subcategory : b.subcategory))
              .filter(Boolean)
          ),
        ];

        categoriesMap[originalName] = subcategories;
      }
    });

    setSystemCategories(categoriesMap);
    setCategoryDisplayNames(displayNames);
    // لا نعيد تعيين bulletins لأنها نفس البيانات، فقط عرضها باللغة الجديدة
    // لكننا نعيد تعيينها للتأكد من أن أي تغيير في اللغة يعكس الترجمة
    setBulletins(originalBulletins.map(b => ({ ...b }))); // shallow copy لتفادي مشاكل الـ re-render

  }, [i18n.language, originalBulletins, originalCategoriesConfig]);

  // 💡 تحديث الفلاتر من URL عند التحميل
  useEffect(() => {
    if (!loading) {
      const params = new URLSearchParams(window.location.search);
      const newFilters: Record<string, string[]> = {};
      bulletinCategories.forEach(cat => {
        const key = cat.name;
        const value = params.get(key);
        newFilters[key] = value ? value.split(',') : [];
      });
      setSelectedFilters(newFilters);
    }
  }, [loading, bulletinCategories]);

  const toggleFilter = (category: string, subcategory: string) => {
    setSelectedFilters(prev => {
      const prevCategory = prev[category] || [];
      const updatedCategory = prevCategory.includes(subcategory)
        ? prevCategory.filter(item => item !== subcategory)
        : [...prevCategory, subcategory];

      const newFilters = { ...prev, [category]: updatedCategory };

      const params = new URLSearchParams();
      Object.entries(newFilters).forEach(([cat, subs]) => {
        if (subs.length > 0) params.set(cat, subs.join(','));
      });

      navigate(`/blog?${params.toString()}`, { replace: true });
      return newFilters;
    });
  };

  const clearFilters = () => {
    setSelectedFilters({});
    setSearchTerm('');
    navigate('/blog', { replace: true });
  };

  const filteredBulletins = useMemo(() => {
    let filtered = bulletins;

    Object.entries(selectedFilters).forEach(([originalCategory, subcategories]) => {
      if (subcategories.length > 0) {
        filtered = filtered.filter(b => 
          b.category === originalCategory && 
          subcategories.includes(isRTL ? b.subcategory_ar || b.subcategory : b.subcategory)
        );
      }
    });

    if (searchTerm) {
      filtered = filtered.filter(b =>
        (isRTL ? b.title_ar || b.title : b.title).toLowerCase().includes(searchTerm.toLowerCase()) ||
        ((isRTL ? b.short_description_ar || b.short_description : b.short_description) || '')
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [selectedFilters, searchTerm, bulletins, isRTL]);

  const handleBulletinClick = (id: string) => {
    navigate(`/bulletin/${id}`);
  };

  // Skeleton للعناصر أثناء التحميل
  const renderSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {[...Array(6)].map((_, idx) => (
        <div key={idx} className="bg-white rounded-xl shadow animate-pulse overflow-hidden">
          <div className="h-48 bg-gray-200 w-full"></div>
          <div className="p-6 space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-6 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-4/5"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className={`min-h-screen bg-gray-50 pt-28 ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Hero Section */}
      <div className="text-logo pt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          {t('blog.heroTitle')}
        </h1>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto no-scrollbar">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">{t('blog.categoriesTitle')}</h3>
                {Object.values(selectedFilters).flat().length > 0 && (
                  <button onClick={clearFilters} className="text-sm text-logo hover:text-blue-700 font-medium">
                    {t('blog.clearAll')}
                  </button>
                )}
              </div>

              {/* Search */}
              <div className="mb-6">
                <div className="relative">
                  <Search className={`${isRTL ? 'right-3' : 'left-3'} top-3 absolute w-5 h-5 text-gray-400`} />
                  <input
                    type="text"
                    placeholder={t('blog.searchPlaceholder')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-logo transition-colors`}
                  />
                </div>
              </div>

              {/* Categories - عرض Skeleton أثناء التحميل */}
              {loading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
                      <div className="space-y-2 pl-4">
                        {[...Array(2)].map((_, j) => (
                          <div key={j} className="h-4 bg-gray-100 rounded w-5/6"></div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {Object.entries(systemCategories).map(([originalCategoryName, subcategories]) => (
                    <div key={originalCategoryName}>
                      <button
                        onClick={() => setActiveCategory(activeCategory === originalCategoryName ? null : originalCategoryName)}
                        className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-2 hover:text-logo transition-colors"
                      >
                        <span>{categoryDisplayNames[originalCategoryName] || originalCategoryName}</span>
                        <motion.span animate={{ rotate: activeCategory === originalCategoryName ? 180 : 0 }} className="inline-block">
                          <ChevronDown className="w-4 h-4" />
                        </motion.span>
                      </button>

                      <AnimatePresence>
                        {activeCategory === originalCategoryName && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden space-y-2"
                          >
                            {subcategories.map(sub => (
                              <label
                                key={sub}
                                className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 cursor-pointer"
                              >
                                <div className="flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    checked={selectedFilters[originalCategoryName]?.includes(sub) || false}
                                    onChange={() => toggleFilter(originalCategoryName, sub)}
                                    className="w-4 h-4 text-logo border-gray-300 rounded focus:ring-logo"
                                  />
                                  <span className="text-sm text-gray-700">{sub}</span>
                                </div>
                              </label>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Bulletins Grid */}
          <div className="flex-1">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {Object.values(selectedFilters).flat().length > 0
                  ? t('blog.filteredTitle')
                  : t('blog.allTitle')}
              </h2>
              <p className="text-gray-600">
                {loading ? '0' : filteredBulletins.length} {t('blog.bulletinsAvailable')}
              </p>
            </div>

            {loading ? (
              renderSkeleton()
            ) : filteredBulletins.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="text-center py-16"
              >
                <div className="text-gray-400 mb-4">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('blog.noResults')}</h3>
                <p className="text-gray-600">{t('blog.noResultsText')}</p>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                {filteredBulletins.map((b, idx) => {
                  const displayTitle = isRTL ? b.title_ar || b.title : b.title;
                  const displayDesc = isRTL ? b.short_description_ar || b.short_description : b.short_description;
                  const displaySubcategory = isRTL ? b.subcategory_ar || b.subcategory : b.subcategory;

                  return (
                    <motion.div
                      key={b.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group min-h-[400px] flex flex-col"
                      onClick={() => handleBulletinClick(b.id)}
                    >
                      <div className="h-48 overflow-hidden"> 
                        <img 
                          src={b.cover_image} 
                          alt={displayTitle} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                        />
                      </div>
                      <div className="p-6 flex-grow flex flex-col justify-between">
                        <div>
                          <span className="inline-block px-3 py-1 bg-blue-50 text-logo text-xs font-medium rounded-full mb-2">
                            {displaySubcategory}
                          </span>
                          <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-logo transition-colors line-clamp-2 min-h-[3rem]">
                            {displayTitle}
                          </h3>
                        
                        </div>
                        <button className="w-full but py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-logo/20 font-medium mt-auto">
                          {t('blog.readMore')}
                        </button>
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

export default Blog;