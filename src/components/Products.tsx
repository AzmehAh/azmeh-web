// src/pages/Products.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ChevronDown, Package } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useTranslation } from 'react-i18next';

const Products = () => {
  const { t, i18n } = useTranslation();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    brand: [],
    type: [],
    material: [],
    usage: []
  });
  const [filterOptions, setFilterOptions] = useState({
    brands: [],
    types: [],
    materials: [],
    usages: []
  });
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetchProducts();
    fetchFilterOptions();
  }, []);

  useEffect(() => {
    filterAndSortProducts();
  }, [products, searchTerm, selectedFilters, sortBy, sortOrder, i18n.language]);

  const fetchProducts = async () => {
    try {
      const { data: productsData, error } = await supabase
        .from('products')
        .select(`
          *,
          product_images (
            image_url,
            is_main
          )
        `)
        .eq('status', 'active');

      if (error) throw error;

      const productsWithMainImages = productsData.map(product => ({
        ...product,
        mainImage: product.product_images?.find(img => img.is_main)?.image_url || 
                   product.product_images?.[0]?.image_url || null
      }));

      setProducts(productsWithMainImages || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFilterOptions = async () => {
    try {
      const { data: filterTypes, error: typesError } = await supabase
        .from('product_filter_types')
        .select('*')
        .eq('is_active', true);
      
      if (typesError) throw typesError;

      const { data: filterValues, error: valuesError } = await supabase
        .from('product_filter_values')
        .select('*, filter_type_id')
        .eq('is_active', true);
      
      if (valuesError) throw valuesError;

      const groupedValues = (filterTypes || []).reduce((acc, type) => {
        const values = (filterValues || [])
          .filter(value => value.filter_type_id === type.id)
          .map(value => ({
            id: value.id,
            name: value.display_name || value.value,
            name_ar: value.display_name_ar || value.value_ar,
            value: value.value
          }));
        
        acc[type.name.toLowerCase()] = values;
        return acc;
      }, {});

      setFilterOptions({
        brands: groupedValues.brand || groupedValues.brands || [],
        types: groupedValues.type || groupedValues.types || [],
        materials: groupedValues.material || groupedValues.materials || [],
        usages: groupedValues.usage || groupedValues.usages || []
      });
    } catch (error) {
      console.error('Error fetching filter options:', error);
    }
  };

  const filterAndSortProducts = () => {
    let filtered = products.filter(product => {
      // Search filter
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        product.name?.toLowerCase().includes(searchLower) ||
        product.name_ar?.toLowerCase().includes(searchLower) ||
        product.description?.toLowerCase().includes(searchLower) ||
        product.description_ar?.toLowerCase().includes(searchLower) ||
        product.code?.toLowerCase().includes(searchLower);

      if (!matchesSearch) return false;

      // Brand filter
      if (selectedFilters.brand.length > 0 && !selectedFilters.brand.includes(product.brand)) {
        return false;
      }

      // Type filter
      if (selectedFilters.type.length > 0 && !selectedFilters.type.includes(product.type)) {
        return false;
      }

      // Material filter
      if (selectedFilters.material.length > 0 && !selectedFilters.material.includes(product.material)) {
        return false;
      }

      // Usage filter
      if (selectedFilters.usage.length > 0 && !selectedFilters.usage.includes(product.usage)) {
        return false;
      }

      return true;
    });

    // Sorting
    filtered.sort((a, b) => {
      let aValue, bValue;

      // Get the correct field based on current language
      if (sortBy === 'name') {
        aValue = i18n.language === 'ar' ? (a.name_ar || a.name) : (a.name || a.name_ar);
        bValue = i18n.language === 'ar' ? (b.name_ar || b.name) : (b.name || b.name_ar);
      } else if (sortBy === 'brand') {
        aValue = a.brand;
        bValue = b.brand;
      } else if (sortBy === 'code') {
        aValue = a.code;
        bValue = b.code;
      } else {
        aValue = a[sortBy];
        bValue = b[sortBy];
      }

      aValue = aValue || '';
      bValue = bValue || '';

      if (sortOrder === 'asc') {
        return aValue.localeCompare(bValue, i18n.language === 'ar' ? 'ar' : 'en');
      } else {
        return bValue.localeCompare(aValue, i18n.language === 'ar' ? 'ar' : 'en');
      }
    });

    setFilteredProducts(filtered);
  };

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter(item => item !== value)
        : [...prev[filterType], value]
    }));
  };

  const clearFilters = () => {
    setSelectedFilters({
      brand: [],
      type: [],
      material: [],
      usage: []
    });
    setSearchTerm('');
  };

  const getDisplayName = (item) => {
    return i18n.language === 'ar' ? (item.name_ar || item.name) : (item.name || item.name_ar);
  };

  const getProductDisplayName = (product) => {
    return i18n.language === 'ar' ? (product.name_ar || product.name) : (product.name || product.name_ar);
  };

  const getProductDescription = (product) => {
    return i18n.language === 'ar' ? (product.description_ar || product.description) : (product.description || product.description_ar);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0055A3]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            {t('products.ourProducts')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            {t('products.discoverOurRange')}
          </motion.p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={t('products.searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                />
              </div>
            </div>

            {/* Sort */}
            <div className="flex gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
              >
                <option value="name">{t('products.sortByName')}</option>
                <option value="brand">{t('products.sortByBrand')}</option>
                <option value="code">{t('products.sortByCode')}</option>
              </select>
              
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
              >
                <option value="asc">{t('products.ascending')}</option>
                <option value="desc">{t('products.descending')}</option>
              </select>
            </div>
          </div>

          {/* Filter Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {/* Brand Filter */}
            <FilterSection
              title={t('products.brand')}
              options={filterOptions.brands}
              selectedOptions={selectedFilters.brand}
              onChange={(value) => handleFilterChange('brand', value)}
              getDisplayName={getDisplayName}
            />

            {/* Type Filter */}
            <FilterSection
              title={t('products.type')}
              options={filterOptions.types}
              selectedOptions={selectedFilters.type}
              onChange={(value) => handleFilterChange('type', value)}
              getDisplayName={getDisplayName}
            />

            {/* Material Filter */}
            <FilterSection
              title={t('products.material')}
              options={filterOptions.materials}
              selectedOptions={selectedFilters.material}
              onChange={(value) => handleFilterChange('material', value)}
              getDisplayName={getDisplayName}
            />

            {/* Usage Filter */}
            <FilterSection
              title={t('products.usage')}
              options={filterOptions.usages}
              selectedOptions={selectedFilters.usage}
              onChange={(value) => handleFilterChange('usage', value)}
              getDisplayName={getDisplayName}
            />
          </div>

          {/* Active Filters and Clear Button */}
          {(searchTerm || Object.values(selectedFilters).some(arr => arr.length > 0)) && (
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {searchTerm && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {t('products.search')}: "{searchTerm}"
                    <button 
                      onClick={() => setSearchTerm('')}
                      className="ml-2 hover:text-blue-600"
                    >
                      ×
                    </button>
                  </span>
                )}
                {selectedFilters.brand.map(brand => {
                  const brandObj = filterOptions.brands.find(b => b.value === brand);
                  return brandObj ? (
                    <span key={brand} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {t('products.brand')}: {getDisplayName(brandObj)}
                      <button 
                        onClick={() => handleFilterChange('brand', brand)}
                        className="ml-2 hover:text-green-600"
                      >
                        ×
                      </button>
                    </span>
                  ) : null;
                })}
                {/* Add similar blocks for other filter types */}
              </div>
              
              <button
                onClick={clearFilters}
                className="text-sm text-red-600 hover:text-red-700 font-medium"
              >
                {t('products.clearAll')}
              </button>
            </div>
          )}
        </div>

        {/* Products Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {t('products.allProducts')} ({filteredProducts.length})
            </h2>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {t('products.noProductsFound')}
              </h3>
              <p className="text-gray-600 mb-4">
                {t('products.tryAdjustingSearch')}
              </p>
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-[#0055A3] text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {t('products.clearFilters')}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  {/* Product Image */}
                  <div className="aspect-w-16 aspect-h-12 bg-gray-100">
                    {product.mainImage ? (
                      <img
                        src={product.mainImage}
                        alt={getProductDisplayName(product)}
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <div className="w-full h-48 flex items-center justify-center bg-gray-100">
                        <Package className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {getProductDisplayName(product)}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {getProductDescription(product)}
                    </p>

                    {product.code && (
                      <p className="text-xs text-gray-500 mb-3">
                        {t('products.code')}: {product.code}
                      </p>
                    )}

                    {product.brand && (
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800">
                          {product.brand}
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Filter Section Component
const FilterSection = ({ title, options, selectedOptions, onChange, getDisplayName }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left font-medium text-gray-900 hover:bg-gray-50 rounded-lg"
      >
        <span>{title}</span>
        {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>
      
      {isOpen && (
        <div className="p-4 border-t border-gray-200 max-h-60 overflow-y-auto">
          <div className="space-y-2">
            {options.map((option) => (
              <label key={option.id} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(option.value)}
                  onChange={() => onChange(option.value)}
                  className="rounded border-gray-300 text-[#0055A3] focus:ring-[#0055A3]"
                />
                <span className="text-sm text-gray-700">{getDisplayName(option)}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;