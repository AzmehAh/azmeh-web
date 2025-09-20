import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Save,
  X,
  Package,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { supabase, ProductCategory } from '../../lib/supabase';

const ProductCategoriesManager = () => {
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<ProductCategory[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
const reorderCategories = async () => {
  try {
    // جلب أحدث البيانات
    const { data: categoriesData, error: fetchError } = await supabase
      .from('product_categories')
      .select('*')
      .order('sort_order', { ascending: true });

    if (fetchError) throw fetchError;
    if (!categoriesData || categoriesData.length === 0) return;

    // فقط الفئات النشطة (اختياري - يمكنك إزالة هذا السطر إذا أردت ترتيب الجميع)
    const activeCategories = categoriesData.filter(c => c.is_active);

    // فرز حسب sort_order الحالي (للتأكد)
    const sorted = [...activeCategories].sort((a, b) => a.sort_order - b.sort_order);

    // تحديث الترتيب ليكون 0, 1, 2...
    const updates = sorted.map((category, index) => ({
      id: category.id,
      sort_order: index
    }));

    // تحديث جميع الفئات معًا
    const updatePromises = updates.map(update =>
      supabase
        .from('product_categories')
        .update({ sort_order: update.sort_order })
        .eq('id', update.id)
    );

    await Promise.all(updatePromises);

    // تأخير بسيط لضمان استقرار البيانات (اختياري لكن مفيد)
    await new Promise(resolve => setTimeout(resolve, 300));

    // إعادة جلب البيانات لتحديث الواجهة
    await fetchCategories();

    // ✅ اختياري: التحقق من أن الترتيب تم تطبيقه
    const { data: finalData } = await supabase
      .from('product_categories')
      .select('id, sort_order, is_active')
      .order('sort_order', { ascending: true });

    const checkSorted = finalData
      .filter(c => c.is_active)
      .every((cat, idx) => cat.sort_order === idx);

    if (!checkSorted) {
      console.warn("Warning: Product categories may not be correctly reordered.");
    }

  } catch (error) {
    console.error('Error reordering product categories:', error);
    alert('Failed to reorder categories. Please refresh the page.');
  }
};
  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = categories.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (category.description && category.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredCategories(filtered);
    } else {
      setFilteredCategories(categories);
    }
  }, [searchTerm, categories]);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('product_categories')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category? This will remove the category from all associated products.')) return;

    try {
      const { error } = await supabase
        .from('product_categories')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setCategories(categories.filter(c => c.id !== id));
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('Error deleting category');
    }
  };

  const openModal = (category: ProductCategory | null = null, editing = false) => {
    setSelectedCategory(category);
    setIsEditing(editing);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCategory(null);
    setIsEditing(false);
    setIsModalOpen(false);
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
          <h1 className="text-3xl font-bold text-gray-900">Product Categories</h1>
          <p className="text-gray-600">Manage product categories and filters</p>
        </div>
        <button
          onClick={() => openModal(null, true)}
          className="flex items-center px-4 py-2 bg-[#0055A3] text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Category
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
        />
      </div>

      {/* Categories List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {filteredCategories.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {filteredCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <Package className="w-6 h-6 text-[#0055A3]" />
                      <h3 className="text-lg font-semibold text-gray-900">
                        {category.name}
                      </h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        category.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {category.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    
                    {category.description && (
                      <p className="text-gray-600 text-sm mb-2">
                        {category.description}
                      </p>
                    )}

                    <div className="text-xs text-gray-500">
                      Sort Order: {category.sort_order}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => openModal(category, false)}
                      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      title="View Category"
                    >
                      <Package className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => openModal(category, true)}
                      className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
                      title="Edit Category"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteCategory(category.id)}
                      className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="Delete Category"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No categories found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm ? 'Try adjusting your search terms' : 'Get started by adding your first product category'}
            </p>
            {!searchTerm && (
              <button
                onClick={() => openModal(null, true)}
                className="flex items-center mx-auto px-4 py-2 bg-[#0055A3] text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Category
              </button>
            )}
          </div>
        )}
      </div>

      {/* Category Modal */}
      <CategoryModal
        isOpen={isModalOpen}
        onClose={closeModal}
        category={selectedCategory}
        isEditing={isEditing}
        onSave={fetchCategories}  
        reorderCategories={reorderCategories}
      />
    </div>
  );
};

// Category Modal Component
const CategoryModal = ({ 
  isOpen, 
  onClose, 
  category, 
  isEditing, 
  onSave ,
  reorderCategories
}: {
  isOpen: boolean;
  onClose: () => void;
  category: ProductCategory | null;
  isEditing: boolean;
  onSave: () => void;
  reorderCategories: () => Promise<void>; 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    sort_order: 0,
    is_active: true
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        description: category.description || '',
        sort_order: category.sort_order,
        is_active: category.is_active
      });
    } else {
      setFormData({
        name: '',
        description: '',
        sort_order: 0,
        is_active: true
      });
    }
  }, [category]);

  const handleSave = async () => {
  setSaving(true);
  try {
    if (category) {
      const { error } = await supabase
        .from('product_categories')
        .update(formData)
        .eq('id', category.id);
      
      if (error) throw error;
    } else {
      const { error } = await supabase
        .from('product_categories')
        .insert([formData]);
      
      if (error) throw error;
    }

    onSave(); // لتحديث القائمة مباشرة (قد يحتوي بيانات قديمة)
    await reorderCategories(); // 👈 هذا هو المفتاح! يعيد الترتيب ويحدث القائمة مجددًا
    onClose();
  } catch (error) {
    console.error('Error saving category:', error);
    alert('Error saving category');
  } finally {
    setSaving(false);
  }
};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="flex min-h-full items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative bg-white rounded-lg shadow-xl max-w-lg w-full"
        >
          <div className="flex items-center justify-between p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">
              {isEditing ? (category ? 'Edit Category' : 'Add Category') : 'View Category'}
            </h3>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category Name *</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                  placeholder="e.g., Industrial Coatings"
                />
              ) : (
                <p className="text-gray-900">{formData.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              {isEditing ? (
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                  placeholder="Category description..."
                />
              ) : (
                <p className="text-gray-900">{formData.description}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort Order</label>
                {isEditing ? (
                  <input
                    type="number"
                    value={formData.sort_order}
                    onChange={(e) => setFormData(prev => ({ ...prev, sort_order: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                  />
                ) : (
                  <p className="text-gray-900">{formData.sort_order}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                {isEditing ? (
                  <select
                    value={formData.is_active ? 'true' : 'false'}
                    onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.value === 'true' }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                ) : (
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    formData.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {formData.is_active ? 'Active' : 'Inactive'}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          {isEditing && (
            <div className="flex items-center justify-end space-x-3 p-6 border-t bg-gray-50">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 bg-[#0055A3] text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center"
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Category
                  </>
                )}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );

};

export default ProductCategoriesManager;