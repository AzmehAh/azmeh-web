import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, X, Palette, Wrench, Shield, Building, Car, Layers, Hammer, Droplets, Settings, Factory, Home, Flame,ChevronDown } from 'lucide-react';
import { supabase, api, Bulletin, BulletinCategoryConfig } from '../lib/supabase';

const Blog = () => {
  const navigate = useNavigate();
  const [bulletins, setBulletins] = useState<Bulletin[]>([]);
  const [systemCategories, setSystemCategories] = useState<Record<string, string[]>>({});
  const [bulletinCategories, setBulletinCategories] = useState<BulletinCategoryConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [bulletinsData, categoriesData] = await Promise.all([
        api.getBulletins(),
        api.getBulletinCategoriesConfig()
      ]);
      
      setBulletins(bulletinsData || []);
      setBulletinCategories(categoriesData || []);
      
      // Build dynamic system categories from bulletins
      const categoriesMap: Record<string, string[]> = {};
      categoriesData?.forEach(category => {
        if (category.is_active) {
          const categoryBulletins = bulletinsData?.filter(b => b.category === category.name) || [];
          const subcategories = [...new Set(categoryBulletins.map(b => b.subcategory))];
          categoriesMap[category.name] = subcategories;
        }
      });
      
      setSystemCategories(categoriesMap);
      
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Toggle subcategory filter
  const toggleFilter = (category: string, subcategory: string) => {
    setSelectedFilters(prev => {
      const prevCategory = prev[category] || [];
      const updatedCategory = prevCategory.includes(subcategory)
        ? prevCategory.filter(item => item !== subcategory)
        : [...prevCategory, subcategory];
      return { ...prev, [category]: updatedCategory };
    });
  };

  const clearFilters = () => {
    setSelectedFilters({});
    setSearchTerm('');
  };

  // Filter bulletins based on selectedFilters and search term
  const filteredBulletins = useMemo(() => {
    let filtered = bulletins;

    Object.entries(selectedFilters).forEach(([category, subcategories]) => {
      if (subcategories.length > 0) {
        filtered = filtered.filter(b => b.category === category && subcategories.includes(b.subcategory));
      }
    });

    if (searchTerm) {
      filtered = filtered.filter(b =>
        b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (b.short_description && b.short_description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    return filtered;
  }, [selectedFilters, searchTerm, bulletins]);

  const handleBulletinClick = (id: string) => {
    navigate(`/bulletin/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#2C5DB6] to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Technical Blog</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
            Explore our comprehensive technical solutions and paint Blog designed for professional applications and specialized environments.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
           <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24 
                max-h-[calc(100vh-6rem)] overflow-y-auto no-scrollbar">

              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">System Categories</h3>
                {Object.values(selectedFilters).flat().length > 0 && (
                  <button onClick={clearFilters} className="text-sm text-[#2C5DB6] hover:text-blue-700 font-medium">
                    Clear All
                  </button>
                )}
              </div>

              {/* Search */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search bulletins..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#2C5DB6] transition-colors"
                  />
                </div>
              </div>

              {/* Categories & Subcategories */}
              <div className="space-y-4">
                {Object.entries(systemCategories).map(([category, subcategories]) => (
                  <div key={category}>
                    <button
                      onClick={() => setActiveCategory(activeCategory === category ? null : category)}
                      className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-2 hover:text-[#2C5DB6] transition-colors"
                    >
                      <span>{category}</span>
                      <motion.span
    animate={{ rotate: activeCategory === category ? 180 : 0 }}
    className="inline-block"
  >
    <ChevronDown className="w-4 h-4" />
  </motion.span>
                    </button>

                    <AnimatePresence>
                      {activeCategory === category && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden space-y-2"
                        >
                          {subcategories.map(sub => {
                            const count = bulletins.filter(b => b.subcategory === sub).length;
                            return (
                              <label
                                key={sub}
                                className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 cursor-pointer"
                              >
                                <div className="flex items-center space-x-2">
                                  <input
                                    type="checkbox"
                                    checked={selectedFilters[category]?.includes(sub) || false}
                                    onChange={() => toggleFilter(category, sub)}
                                    className="w-4 h-4 text-[#2C5DB6] border-gray-300 rounded focus:ring-[#2C5DB6]"
                                  />
                                  <span className="text-sm text-gray-700">{sub}</span>
                                </div>
                                {count > 0 && (
                                  <span className="text-xs bg-gray-100 rounded-full px-2 py-0.5 text-gray-600">
                                    {count}
                                  </span>
                                )}
                              </label>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              {/* Active Filters */}
              {Object.values(selectedFilters).flat().length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Active Filters</h4>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(selectedFilters).map(([cat, subs]) =>
                      subs.map(sub => (
                        <span key={`${cat}-${sub}`} className="inline-flex items-center space-x-1 px-3 py-1 bg-[#2C5DB6] text-white text-xs rounded-full">
                          <span>{sub}</span>
                          <button onClick={() => toggleFilter(cat, sub)} className="hover:bg-blue-700 rounded-full p-0.5 transition-colors">
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

          {/* Bulletins Grid */}
          <div className="flex-1">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {Object.values(selectedFilters).flat().length > 0
                  ? 'Filtered Bulletins'
                  : 'All Technical Bulletins'}
              </h2>
              <p className="text-gray-600">{filteredBulletins.length} bulletin(s) available</p>
            </div>

            <AnimatePresence mode="wait">
              {filteredBulletins.length === 0 ? (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
                  <div className="text-gray-400 mb-4">
                    <Search className="w-16 h-16 mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No bulletins found</h3>
                  <p className="text-gray-600">Try selecting a different filter or adjusting your search</p>
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredBulletins.map((b, idx) => (
                    <motion.div
                      key={b.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
                      onClick={() => handleBulletinClick(b.id)}
                    >
                      <div className="h-48 overflow-hidden">
                        <img src={b.cover_image} alt={b.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="p-6">
                        <span className="inline-block px-3 py-1 bg-blue-50 text-[#2C5DB6] text-xs font-medium rounded-full mb-2">{b.subcategory}</span>
                        <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#2C5DB6] transition-colors line-clamp-2">{b.title}</h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">{b.short_description}</p>
                        <button className="w-full bg-gradient-to-r from-[#2C5DB6] to-blue-700 text-white py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium group-hover:shadow-lg">Read More</button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;