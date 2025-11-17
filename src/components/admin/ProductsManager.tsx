import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  Package,
  Star,
  Image as ImageIcon
} from 'lucide-react';
import { supabase, api } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';

const ProductsManager = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
  let filtered = products;

  if (searchTerm) {
    const term = searchTerm.toLowerCase().trim();
    filtered = filtered.filter(product => {
    
      const name = (product.name ?? '').toString().toLowerCase();
      const code = (product.code ?? '').toString().toLowerCase();
      const brand = (product.brand ?? '').toString().toLowerCase();
      const description = (product.description ?? '').toString().toLowerCase();

      return (
        name.includes(term) ||
        code.includes(term) ||
        brand.includes(term) ||
        description.includes(term)
      );
    });
  }

  if (statusFilter !== 'all') {
    filtered = filtered.filter(product => product.status === statusFilter);
  }

  setFilteredProducts(filtered);
}, [searchTerm, statusFilter, products]);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          product_images (*),
          product_categories (name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedProducts = (data || []).map(product => {
        const mainImage = product.product_images.find(img => img.is_main) || 
                          product.product_images[0];
        
        return {
          ...product,
          main_image_url: mainImage?.image_url || null,
          images_count: product.product_images.length,
          category_name: product.product_categories?.name || 'Uncategorized'
        };
      });

      setProducts(formattedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product? This action cannot be undone.')) return;

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setProducts(products.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting product');
    }
  };

  const toggleFeatured = async (id: string, featured: boolean) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({ featured: !featured, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
      
      setProducts(products.map(p => 
        p.id === id ? { ...p, featured: !featured } : p
      ));
    } catch (error) {
      console.error('Error updating featured status:', error);
    }
  };

  const handleAddProduct = () => {
    navigate('/admin/products/new');
  };

  const handleEditProduct = (id: string) => {
    navigate(`/admin/products/${id}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0055A3]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products Management</h1>
          <p className="text-gray-600">Manage your product catalog and specifications</p>
        </div>
        <button
          onClick={handleAddProduct}
          className="flex items-center px-4 py-2 bg-[#0055A3] text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="discontinued">Discontinued</option>
        </select>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || statusFilter !== 'all' ? 'Try adjusting your search terms' : 'Get started by adding your first product'}
          </p>
          {!searchTerm && statusFilter === 'all' && (
            <button
              onClick={handleAddProduct}
              className="flex items-center mx-auto px-4 py-2 bg-[#0055A3] text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Product
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Product Image */}
              <div className="h-32 bg-gray-100 relative">
                {product.main_image_url ? (
                  <img
                    src={product.main_image_url}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Package className="w-12 h-12 text-gray-400" />
                  </div>
                )}
                <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    product.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : product.status === 'inactive'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {product.status}
                  </span>
                  {product.featured && (
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                      <Star className="w-3 h-3 inline" />
                    </span>
                  )}
                </div>
                <div className="absolute top-2 right-2">
                  <span className="bg-black bg-opacity-50 text-white px-2 py-1 text-xs rounded flex items-center">
                    <ImageIcon className="w-3 h-3 mr-1" />
                    {product.images_count}
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-1">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-500 mb-1">{product.code}</p>
                    <p className="text-xs text-gray-500">{product.category_name}</p>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                  {product.description}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span>{product.brand}</span>
                  <span className="px-2 py-1 bg-gray-100 rounded">{product.type}</span>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="flex-1 p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    title="View Product"
                  >
                    <Eye className="w-4 h-4 mx-auto" />
                  </button>
                  <button
                    onClick={() => toggleFeatured(product.id, product.featured || false)}
                    className={`p-2 rounded transition-colors ${
                      product.featured 
                        ? 'text-yellow-600 hover:bg-yellow-50' 
                        : 'text-gray-600 hover:text-yellow-600 hover:bg-yellow-50'
                    }`}
                    title="Toggle Featured"
                  >
                    <Star className={`w-4 h-4 ${product.featured ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    onClick={() => handleEditProduct(product.id)}
                    className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
                    title="Edit Product"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Delete Product"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsManager;