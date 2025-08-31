import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, X, Palette, Wrench, Shield, Zap, Building, Car, Layers, Hammer, Droplets, Settings, Factory, Home, Flame } from 'lucide-react';
import { bulletinsData, systemCategories, BulletinItem } from '../data/bulletinsData';

const Systems = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Get icon for subcategory
  const getSubcategoryIcon = (subcategory: string) => {
    const iconMap: Record<string, any> = {
      'Car Coating Systems': Car,
      'Concrete Walls Coating': Building,
      'Façade Protection': Shield,
      'Industrial Flooring': Factory,
      'Joint Sealant': Droplets,
      'Steel Surface Coatings': Layers,
      'Roof Coatings': Home,
      'Wooden Surface Coatings': Hammer,
      'Concrete Exterior': Building,
      'Concrete Lining': Layers,
      'Concrete Repair & Protection': Wrench,
      'Concrete Sealer': Shield,
      'Ferrous & Steel Substrate Treatment': Settings,
      'Fire Retardant Paints': Flame,
      'Home & Industrial Wall/Ceiling Paints': Palette,
      'Steel Coatings': Layers,
      'Steel Linings': Factory,
      'Floorings': Building,
      'Adhesives and Grouts': Droplets,
      'Joint Sealants': Droplets
    };
    return iconMap[subcategory] || Palette;
  };

  // Filter bulletins based on selections and search
  const filteredBulletins = useMemo(() => {
    let filtered = bulletinsData;

    // Filter by category and subcategory
    if (selectedCategory && selectedSubcategory) {
      filtered = filtered.filter(bulletin => 
        bulletin.category === selectedCategory && bulletin.subcategory === selectedSubcategory
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(bulletin =>
        bulletin.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bulletin.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [selectedCategory, selectedSubcategory, searchTerm]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null);
  };

  const handleSubcategorySelect = (subcategory: string) => {
    setSelectedSubcategory(subcategory);
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setSearchTerm('');
  };

  const handleBulletinClick = (bulletinId: string) => {
    navigate(`/bulletin/${bulletinId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#2C5DB6] to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Technical Systems</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
              Explore our comprehensive technical solutions and paint systems designed for professional applications and specialized environments.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                  <Settings className="w-5 h-5 text-[#2C5DB6] mr-2" />
                  System Categories
                </h3>
                {(selectedCategory || selectedSubcategory || searchTerm) && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-[#2C5DB6] hover:text-blue-700 font-medium"
                  >
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

              {/* Categories */}
              <div className="space-y-4">
                {Object.entries(systemCategories).map(([category, subcategories]) => (
                  <div key={category}>
                    <button
                      onClick={() => handleCategorySelect(category)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                        selectedCategory === category
                          ? 'border-[#2C5DB6] bg-blue-50 text-[#2C5DB6]'
                          : 'border-gray-200 bg-white hover:border-gray-300 text-gray-900'
                      }`}
                    >
                      <div className="flex items-center">
                        {category === 'Technical Solutions' ? (
                          <Zap className="w-5 h-5 mr-3" />
                        ) : (
                          <Palette className="w-5 h-5 mr-3" />
                        )}
                        <span className="font-semibold">{category}</span>
                      </div>
                      <span className="text-sm opacity-75 mt-1 block">
                        {subcategories.length} subcategories
                      </span>
                    </button>

                    {/* Subcategories */}
                    <AnimatePresence>
                      {selectedCategory === category && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden mt-3 space-y-2"
                        >
                          {subcategories.map((subcategory) => {
                            const IconComponent = getSubcategoryIcon(subcategory);
                            const bulletinCount = bulletinsData.filter(b => b.subcategory === subcategory).length;
                            
                            return (
                              <button
                                key={subcategory}
                                onClick={() => handleSubcategorySelect(subcategory)}
                                className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
                                  selectedSubcategory === subcategory
                                    ? 'border-[#2C5DB6] bg-blue-50 text-[#2C5DB6]'
                                    : 'border-gray-100 bg-gray-50 hover:border-gray-200 text-gray-700'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    <IconComponent className="w-4 h-4 mr-2" />
                                    <span className="text-sm font-medium">{subcategory}</span>
                                  </div>
                                  {bulletinCount > 0 && (
                                    <span className="text-xs bg-white rounded-full px-2 py-1 text-gray-600">
                                      {bulletinCount}
                                    </span>
                                  )}
                                </div>
                              </button>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              {/* Active Filters */}
              {(selectedCategory || selectedSubcategory) && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Active Filters</h4>
                  <div className="space-y-2">
                    {selectedCategory && (
                      <span className="inline-flex items-center space-x-2 px-3 py-1 bg-[#2C5DB6] text-white text-sm rounded-full">
                        <span>{selectedCategory}</span>
                        <button
                          onClick={() => {
                            setSelectedCategory(null);
                            setSelectedSubcategory(null);
                          }}
                          className="hover:bg-blue-700 rounded-full p-0.5 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {selectedSubcategory && (
                      <span className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-100 text-[#2C5DB6] text-sm rounded-full">
                        <span>{selectedSubcategory}</span>
                        <button
                          onClick={() => setSelectedSubcategory(null)}
                          className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {selectedSubcategory || selectedCategory || 'All Technical Bulletins'}
              </h2>
              <p className="text-gray-600">
                {filteredBulletins.length} bulletin(s) available
                {selectedSubcategory && ` in ${selectedSubcategory}`}
              </p>
            </div>

            {/* Bulletins Grid */}
            <AnimatePresence mode="wait">
              {filteredBulletins.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-16"
                >
                  {!selectedCategory && !selectedSubcategory && !searchTerm ? (
                    <div>
                      <div className="text-gray-400 mb-4">
                        <Palette className="w-16 h-16 mx-auto" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Select a System Category</h3>
                      <p className="text-gray-600">Choose from Technical Solutions or Paint Systems to view related bulletins</p>
                    </div>
                  ) : (
                    <div>
                      <div className="text-gray-400 mb-4">
                        <Search className="w-16 h-16 mx-auto" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">No bulletins found</h3>
                      <p className="text-gray-600">Try selecting a different category or adjusting your search</p>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                >
                  {filteredBulletins.map((bulletin, index) => (
                    <motion.div
                      key={bulletin.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
                      onClick={() => handleBulletinClick(bulletin.id)}
                    >
                      {/* Cover Image */}
                      <div className="h-48 overflow-hidden">
                        <img
                          src={bulletin.coverImage}
                          alt={bulletin.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <div className="mb-3">
                          <span className="inline-block px-3 py-1 bg-blue-50 text-[#2C5DB6] text-xs font-medium rounded-full mb-2">
                            {bulletin.subcategory}
                          </span>
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#2C5DB6] transition-colors line-clamp-2">
                          {bulletin.title}
                        </h3>

                        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                          {bulletin.shortDescription}
                        </p>

                        <button className="w-full bg-gradient-to-r from-[#2C5DB6] to-blue-700 text-white py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium group-hover:shadow-lg">
                          Read More
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Call to Action */}
        {filteredBulletins.length > 0 && (
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-[#2C5DB6] to-blue-700 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Need Technical Assistance?</h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Our technical experts are available to help you select the right system for your specific application requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-[#2C5DB6] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Contact Technical Support
                </button>
                <button className="bg-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors backdrop-blur-sm">
                  Request Consultation
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Systems;</parameter>