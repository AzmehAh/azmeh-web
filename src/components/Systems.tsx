import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ArrowRight, Calendar, Clock, User, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { systemCategories, blogPosts, BlogPost } from '../data/blogsData';

const Systems = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter posts based on selected category and subcategory
  const filteredPosts = useMemo(() => {
    let filtered = blogPosts;

    if (activeCategory) {
      filtered = filtered.filter(post => post.category === activeCategory);
    }

    if (activeSubcategory) {
      filtered = filtered.filter(post => post.subcategory === activeSubcategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    return filtered;
  }, [activeCategory, activeSubcategory, searchTerm]);

  const resetFilters = () => {
    setActiveCategory(null);
    setActiveSubcategory(null);
    setSearchTerm('');
  };

  const getCurrentCategory = () => {
    return systemCategories.find(cat => cat.id === activeCategory);
  };

  const getCurrentSubcategory = () => {
    const category = getCurrentCategory();
    return category?.subcategories.find(sub => sub.id === activeSubcategory);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#2C5DB6] via-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Systems & Solutions
            </motion.h1>
            <motion.p 
              className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Explore our comprehensive range of technical solutions and paint systems. 
              Discover expert insights, application guides, and innovative technologies for every project.
            </motion.p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Filters Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              {/* Search */}
              <div className="mb-8">
                <div className="relative">
                  <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#2C5DB6] focus:ring-2 focus:ring-[#2C5DB6]/20 transition-all"
                  />
                </div>
              </div>

              {/* Active Filters */}
              {(activeCategory || activeSubcategory || searchTerm) && (
                <div className="mb-8 p-4 bg-blue-50 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900 flex items-center">
                      <Filter className="w-4 h-4 mr-2 text-[#2C5DB6]" />
                      Active Filters
                    </h4>
                    <button
                      onClick={resetFilters}
                      className="text-sm text-[#2C5DB6] hover:text-blue-700 font-medium"
                    >
                      Clear All
                    </button>
                  </div>
                  <div className="space-y-2">
                    {activeCategory && (
                      <div className="flex items-center justify-between bg-white rounded-lg px-3 py-2">
                        <span className="text-sm font-medium text-gray-700">
                          Category: {getCurrentCategory()?.title}
                        </span>
                        <button
                          onClick={() => setActiveCategory(null)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          ×
                        </button>
                      </div>
                    )}
                    {activeSubcategory && (
                      <div className="flex items-center justify-between bg-white rounded-lg px-3 py-2">
                        <span className="text-sm font-medium text-gray-700">
                          Topic: {getCurrentSubcategory()?.name}
                        </span>
                        <button
                          onClick={() => setActiveSubcategory(null)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          ×
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* System Categories */}
              <div className="space-y-6">
                {systemCategories.map((category) => (
                  <div key={category.id}>
                    <button
                      onClick={() => {
                        setActiveCategory(activeCategory === category.id ? null : category.id);
                        setActiveSubcategory(null);
                      }}
                      className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                        activeCategory === category.id
                          ? 'bg-[#2C5DB6] text-white shadow-lg'
                          : 'bg-gray-50 hover:bg-gray-100 text-gray-900'
                      }`}
                    >
                      <h3 className="font-bold text-lg mb-2">{category.title}</h3>
                      <p className={`text-sm ${
                        activeCategory === category.id ? 'text-blue-100' : 'text-gray-600'
                      }`}>
                        {category.description}
                      </p>
                    </button>

                    {/* Subcategories */}
                    <AnimatePresence>
                      {activeCategory === category.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden mt-3"
                        >
                          <div className="space-y-2 pl-4">
                            {category.subcategories.map((sub) => (
                              <button
                                key={sub.id}
                                onClick={() => setActiveSubcategory(
                                  activeSubcategory === sub.id ? null : sub.id
                                )}
                                className={`w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center ${
                                  activeSubcategory === sub.id
                                    ? 'bg-white text-[#2C5DB6] shadow-sm border-2 border-[#2C5DB6]'
                                    : 'bg-white hover:bg-blue-50 text-gray-700 border border-gray-200'
                                }`}
                              >
                                <span className="text-2xl mr-3">{sub.icon}</span>
                                <span className="font-medium">{sub.name}</span>
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-3xl font-bold text-gray-900">
                  {activeSubcategory 
                    ? getCurrentSubcategory()?.name 
                    : activeCategory 
                      ? getCurrentCategory()?.title 
                      : 'All Articles'
                  }
                </h2>
                <span className="text-gray-500 font-medium">
                  {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
                </span>
              </div>
              
              {activeSubcategory && (
                <p className="text-gray-600 text-lg">
                  Technical insights and solutions for {getCurrentSubcategory()?.name.toLowerCase()} applications.
                </p>
              )}
            </div>

            {/* Blog Posts Grid */}
            <AnimatePresence mode="wait">
              {filteredPosts.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-20"
                >
                  <div className="text-gray-400 mb-6">
                    <Search className="w-24 h-24 mx-auto" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">No articles found</h3>
                  <p className="text-gray-600 mb-8">
                    Try adjusting your filters or search terms to find relevant content.
                  </p>
                  <button
                    onClick={resetFilters}
                    className="bg-[#2C5DB6] text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Clear Filters
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
                >
                  {filteredPosts.map((post, index) => (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
                    >
                      <Link to={`/blog/${post.id}`}>
                        {/* Image */}
                        <div className="h-48 overflow-hidden">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          {/* Meta Info */}
                          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {new Date(post.date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {post.readTime}
                            </div>
                          </div>

                          {/* Title */}
                          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#2C5DB6] transition-colors line-clamp-2">
                            {post.title}
                          </h3>

                          {/* Description */}
                          <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                            {post.description}
                          </p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-1 bg-blue-50 text-[#2C5DB6] text-xs rounded-full font-medium"
                              >
                                {tag}
                              </span>
                            ))}
                            {post.tags.length > 2 && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                                +{post.tags.length - 2} more
                              </span>
                            )}
                          </div>

                          {/* Author */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-sm text-gray-600">
                              <User className="w-4 h-4 mr-2" />
                              {post.author}
                            </div>
                            <div className="flex items-center text-[#2C5DB6] font-semibold group-hover:translate-x-1 transition-transform">
                              <span className="text-sm">Read More</span>
                              <ArrowRight className="w-4 h-4 ml-1" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.article>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Featured Categories Section (shown when no filters are active) */}
            {!activeCategory && !activeSubcategory && !searchTerm && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-16"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                  Explore Our System Categories
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {systemCategories.map((category) => (
                    <motion.div
                      key={category.id}
                      className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 group cursor-pointer"
                      onClick={() => setActiveCategory(category.id)}
                      whileHover={{ y: -5 }}
                    >
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#2C5DB6] transition-colors">
                        {category.title}
                      </h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {category.description}
                      </p>
                      
                      {/* Preview subcategories */}
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        {category.subcategories.slice(0, 4).map((sub) => (
                          <div
                            key={sub.id}
                            className="flex items-center p-2 bg-gray-50 rounded-lg text-sm"
                          >
                            <span className="mr-2">{sub.icon}</span>
                            <span className="text-gray-700 font-medium truncate">{sub.name}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          {category.subcategories.length} subcategories
                        </span>
                        <div className="flex items-center text-[#2C5DB6] font-semibold group-hover:translate-x-2 transition-transform">
                          <span>Explore</span>
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Systems;