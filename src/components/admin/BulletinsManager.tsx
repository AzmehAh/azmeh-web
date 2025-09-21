import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  Star, 
  FileText 
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';

const BulletinsManager = () => {
  const [bulletins, setBulletins] = useState([]);
  const [filteredBulletins, setFilteredBulletins] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBulletins();
    fetchCategories(); 
  }, []);

  useEffect(() => {
    let filtered = bulletins;

    if (searchTerm) {
      filtered = filtered.filter(bulletin =>
        bulletin.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (bulletin.short_description && bulletin.short_description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        bulletin.subcategory.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(bulletin => bulletin.category === categoryFilter);
    }

    setFilteredBulletins(filtered);
  }, [searchTerm, categoryFilter, bulletins]);

  const fetchBulletins = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('bulletins')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBulletins(data || []);
    } catch (error) {
      console.error('Error fetching bulletins:', error);
      alert('Error loading bulletins');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('bulletin_categories_config')
        .select('name')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) throw error;
      
      if (!data || data.length === 0) {
        const { data: bulletinsData } = await supabase
          .from('bulletins')
          .select('category')
          .not('category', 'is', null);
        
        if (bulletinsData) {
          const uniqueCategories = [...new Set(bulletinsData.map(b => b.category))].filter(Boolean);
          setCategories(uniqueCategories);
        }
      } else {
        setCategories(data.map(cat => cat.name));
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      
      try {
        const { data: bulletinsData } = await supabase
          .from('bulletins')
          .select('category')
          .not('category', 'is', null);
        
        if (bulletinsData) {
          const uniqueCategories = [...new Set(bulletinsData.map(b => b.category))].filter(Boolean);
          setCategories(uniqueCategories);
        }
      } catch (fallbackError) {
        console.error('Fallback category fetch failed:', fallbackError);
        setCategories([]);
      }
    }
  };

  const deleteBulletin = async (id) => {
    if (!confirm('Are you sure you want to delete this bulletin?')) return;

    try {
      const { error } = await supabase
        .from('bulletins')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setBulletins(bulletins.filter(b => b.id !== id));
    } catch (error) {
      console.error('Error deleting bulletin:', error);
      alert('Error deleting bulletin');
    }
  };

  const toggleFeatured = async (id, featured) => {
    try {
      const { error } = await supabase
        .from('bulletins')
        .update({ featured: !featured, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
      
      setBulletins(bulletins.map(b => 
        b.id === id ? { ...b, featured: !featured } : b
      ));
    } catch (error) {
      console.error('Error updating featured status:', error);
    }
  };

  const handleAddBulletin = () => {
  navigate('/admin/bulletins/new'); // ✅ أضف /admin
};

const handleViewBulletin = (id) => {
  navigate(`/admin/bulletins/${id}`); // ✅
};

const handleEditBulletin = (id) => {
  navigate(`/admin/bulletins/${id}/edit`); // ✅
};

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0055A3]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Technical Bulletins</h1>
          <p className="text-gray-600">Manage technical bulletins and system documentation</p>
        </div>
        <button
          onClick={handleAddBulletin}
          className="flex items-center px-4 py-2 bg-[#0055A3] text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Bulletin
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search bulletins..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
        >
          <option value="all">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Bulletins Grid */}
      {filteredBulletins.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No bulletins found</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || categoryFilter !== 'all' ? 'Try adjusting your search terms' : 'Get started by adding your first technical bulletin'}
          </p>
          {!searchTerm && categoryFilter === 'all' && (
            <button
              onClick={handleAddBulletin}
              className="flex items-center mx-auto px-4 py-2 bg-[#0055A3] text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Bulletin
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBulletins.map((bulletin, index) => (
            <motion.div
              key={bulletin.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Bulletin Image */}
              <div className="h-32 bg-gray-100 relative">
                {bulletin.cover_image ? (
                  <img
                    src={bulletin.cover_image}
                    alt={bulletin.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <FileText className="w-12 h-12 text-gray-400" />
                  </div>
                )}
                <div className="absolute top-2 left-2 flex space-x-1">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    bulletin.status === 'published' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {bulletin.status}
                  </span>
                  {bulletin.featured && (
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                      <Star className="w-3 h-3 inline" />
                    </span>
                  )}
                </div>
              </div>

              {/* Bulletin Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-1">
                      {bulletin.title}
                    </h3>
                    <p className="text-xs text-gray-500 mb-2">{bulletin.subcategory}</p>
                  </div>
                </div>
                
                {bulletin.short_description && (
                  <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                    {bulletin.short_description}
                  </p>
                )}

                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span>{new Date(bulletin.created_at).toLocaleDateString()}</span>
                  <span className="px-2 py-1 bg-gray-100 rounded">{bulletin.category}</span>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleViewBulletin(bulletin.id)}
                    className="flex-1 p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    title="View"
                  >
                    <Eye className="w-4 h-4 mx-auto" />
                  </button>
                  <button
                    onClick={() => toggleFeatured(bulletin.id, bulletin.featured || false)}
                    className={`p-2 rounded transition-colors ${
                      bulletin.featured 
                        ? 'text-yellow-600 hover:bg-yellow-50' 
                        : 'text-gray-600 hover:text-yellow-600 hover:bg-yellow-50'
                    }`}
                    title="Toggle Featured"
                  >
                    <Star className={`w-4 h-4 ${bulletin.featured ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    onClick={() => handleEditBulletin(bulletin.id)}
                    className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteBulletin(bulletin.id)}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Delete"
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

export default BulletinsManager;