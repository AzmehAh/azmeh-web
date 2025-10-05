import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Save,
  X,
  Wrench,
  ChevronDown,
  ChevronUp,
  AlertTriangle
} from 'lucide-react';
import { supabase, TroubleshootingCategory, TroubleshootingItem } from '../../lib/supabase';
import BilingualInput from './BilingualInput'; // تأكد من وجوده

const TroubleshootingManager = () => {
  const [categories, setCategories] = useState<(TroubleshootingCategory & { troubleshooting_items: TroubleshootingItem[] })[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TroubleshootingCategory | null>(null);
  const [selectedItem, setSelectedItem] = useState<TroubleshootingItem | null>(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTroubleshootingData();
  }, []);

  const fetchTroubleshootingData = async () => {
    try {
      const { data, error } = await supabase
        .from('troubleshooting_categories')
        .select(`
          *,
          troubleshooting_items (*)
        `)
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setCategories(data || []);
      setExpandedCategories((data || []).map(cat => cat.id));
    } catch (error) {
      console.error('Error fetching troubleshooting data:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const deleteCategory = async (id: string) => {
    if (!confirm('Are you sure? This will delete the category and all its items.')) return;

    try {
      const { error } = await supabase
        .from('troubleshooting_categories')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchTroubleshootingData();
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('Error deleting category');
    }
  };

  const deleteItem = async (id: string) => {
    if (!confirm('Are you sure you want to delete this troubleshooting item?')) return;

    try {
      const { error } = await supabase
        .from('troubleshooting_items')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchTroubleshootingData();
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Error deleting item');
    }
  };

  const openCategoryModal = (category: TroubleshootingCategory | null = null, editing = false) => {
    setSelectedCategory(category);
    setIsEditing(editing);
    setIsCategoryModalOpen(true);
  };

  const openItemModal = (item: TroubleshootingItem | null = null, editing = false, categoryId?: string) => {
    setSelectedItem(item || { category_id: categoryId } as TroubleshootingItem);
    setIsEditing(editing);
    setIsItemModalOpen(true);
  };

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-orange-100 text-orange-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredCategories = categories.filter(category =>
    searchTerm === '' || 
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (category.name_ar && category.name_ar.toLowerCase().includes(searchTerm.toLowerCase())) ||
    category.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (category.description_ar && category.description_ar.toLowerCase().includes(searchTerm.toLowerCase())) ||
    category.troubleshooting_items.some(item => 
      item.problem.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.problem_ar && item.problem_ar.toLowerCase().includes(searchTerm.toLowerCase())) ||
      item.solution.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.solution_ar && item.solution_ar.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  );

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
          <h1 className="text-3xl font-bold text-gray-900">Troubleshooting Management</h1>
          <p className="text-gray-600">Manage troubleshooting categories and solutions</p>
        </div>
        <button
          onClick={() => openCategoryModal(null, true)}
          className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
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
          placeholder="Search troubleshooting items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
        />
      </div>

      {/* Categories */}
      <div className="space-y-4">
        {filteredCategories.map((category) => (
          <div key={category.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Category Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="p-2 hover:bg-gray-100 rounded transition-colors"
                  >
                    {expandedCategories.includes(category.id) ? (
                      <ChevronUp className="w-5 h-5 text-gray-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-600" />
                    )}
                  </button>
                  <Wrench className="w-6 h-6 text-orange-600" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {category.name}
                      {category.name_ar && (
                        <span className="block text-gray-700 text-base" dir="rtl">
                          {category.name_ar}
                        </span>
                      )}
                    </h3>
                    {(category.description || category.description_ar) && (
                      <p className="text-gray-600 text-sm">
                        {category.description}
                        {category.description_ar && (
                          <span className="block" dir="rtl">
                            {category.description_ar}
                          </span>
                        )}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">{category.troubleshooting_items.length} items</span>
                  <button
                    onClick={() => openItemModal(null, true, category.id)}
                    className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
                    title="Add Item"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => openCategoryModal(category, true)}
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
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
            </div>

            {/* Items */}
            <AnimatePresence>
              {expandedCategories.includes(category.id) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 space-y-4">
                    {category.troubleshooting_items.length > 0 ? (
                      category.troubleshooting_items.map((item) => (
                        <div key={item.id} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(item.severity)}`}>
                                  {item.severity}
                                </span>
                              </div>
                              <h4 className="font-semibold text-gray-900 mb-2">
                                {item.problem}
                                {item.problem_ar && (
                                  <span className="block text-gray-700 mt-1" dir="rtl">
                                    {item.problem_ar}
                                  </span>
                                )}
                              </h4>
                              <p className="text-gray-600 text-sm">
                                {item.solution}
                                {item.solution_ar && (
                                  <span className="block mt-1" dir="rtl">
                                    {item.solution_ar}
                                  </span>
                                )}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2 ml-4">
                              <button
                                onClick={() => openItemModal(item, true)}
                                className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
                                title="Edit Item"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => deleteItem(item.id)}
                                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                title="Delete Item"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <p>No items in this category</p>
                        <button
                          onClick={() => openItemModal(null, true, category.id)}
                          className="mt-2 text-[#0055A3] hover:underline"
                        >
                          Add the first item
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}

        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <Wrench className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No categories found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm ? 'Try adjusting your search terms' : 'Get started by creating your first category'}
            </p>
            {!searchTerm && (
              <button
                onClick={() => openCategoryModal(null, true)}
                className="flex items-center mx-auto px-4 py-2 bg-[#0055A3] text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Category
              </button>
            )}
          </div>
        )}
      </div>

      {/* Modals */}
      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        category={selectedCategory}
        isEditing={isEditing}
        onSave={fetchTroubleshootingData}
      />

      <ItemModal
        isOpen={isItemModalOpen}
        onClose={() => setIsItemModalOpen(false)}
        item={selectedItem}
        isEditing={isEditing}
        onSave={fetchTroubleshootingData}
        categories={categories}
      />
    </div>
  );
};

// Category Modal
const CategoryModal = ({ 
  isOpen, 
  onClose, 
  category, 
  isEditing, 
  onSave 
}: {
  isOpen: boolean;
  onClose: () => void;
  category: TroubleshootingCategory | null;
  isEditing: boolean;
  onSave: () => void;
}) => {
  const [formData, setFormData] = useState({
    name: '',
    name_ar: '',
    description: '',
    description_ar: '',
    sort_order: 0
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        name_ar: category.name_ar || '',
        description: category.description || '',
        description_ar: category.description_ar || '',
        sort_order: category.sort_order
      });
    } else {
      setFormData({
        name: '',
        name_ar: '',
        description: '',
        description_ar: '',
        sort_order: 0
      });
    }
  }, [category]);

  const handleSave = async () => {
    if (!formData.name.trim()) {
      alert('Category name (English) is required');
      return;
    }

    setSaving(true);
    try {
      if (category) {
        const { error } = await supabase
          .from('troubleshooting_categories')
          .update({
            name: formData.name,
            name_ar: formData.name_ar,
            description: formData.description,
            description_ar: formData.description_ar,
            sort_order: formData.sort_order
          })
          .eq('id', category.id);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('troubleshooting_categories')
          .insert([{
            name: formData.name,
            name_ar: formData.name_ar,
            description: formData.description,
            description_ar: formData.description_ar,
            sort_order: formData.sort_order
          }]);
        
        if (error) throw error;
      }

      onSave();
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
              {category ? 'Edit Category' : 'Add Category'}
            </h3>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-4">
            {/* Name - Bilingual */}
            {isEditing ? (
              <BilingualInput
                labelEn="Category Name"
                labelAr="اسم التصنيف"
                nameEn="name"
                nameAr="name_ar"
                valueEn={formData.name}
                valueAr={formData.name_ar}
                onChange={(e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                required
              />
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category Name / اسم التصنيف
                </label>
                <p className="text-gray-900">{formData.name}</p>
                {formData.name_ar && <p className="text-gray-700 mt-1" dir="rtl">{formData.name_ar}</p>}
              </div>
            )}

            {/* Description - Bilingual */}
            {isEditing ? (
              <BilingualInput
                labelEn="Description"
                labelAr="الوصف"
                nameEn="description"
                nameAr="description_ar"
                valueEn={formData.description}
                valueAr={formData.description_ar}
                onChange={(e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                type="textarea"
              />
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description / الوصف
                </label>
                <p className="text-gray-900">{formData.description}</p>
                {formData.description_ar && <p className="text-gray-700 mt-1" dir="rtl">{formData.description_ar}</p>}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort Order
              </label>
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
          </div>

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
                    Save
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

// Item Modal
const ItemModal = ({ 
  isOpen, 
  onClose, 
  item, 
  isEditing, 
  onSave,
  categories
}: {
  isOpen: boolean;
  onClose: () => void;
  item: TroubleshootingItem | null;
  isEditing: boolean;
  onSave: () => void;
  categories: TroubleshootingCategory[];
}) => {
  const [formData, setFormData] = useState({
    category_id: '',
    problem: '',
    problem_ar: '',
    solution: '',
    solution_ar: '',
    severity: 'Medium',
    sort_order: 0
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (item) {
      setFormData({
        category_id: item.category_id,
        problem: item.problem || '',
        problem_ar: item.problem_ar || '',
        solution: item.solution || '',
        solution_ar: item.solution_ar || '',
        severity: item.severity || 'Medium',
        sort_order: item.sort_order || 0
      });
    } else {
      setFormData({
        category_id: '',
        problem: '',
        problem_ar: '',
        solution: '',
        solution_ar: '',
        severity: 'Medium',
        sort_order: 0
      });
    }
  }, [item]);

  const handleSave = async () => {
    if (!formData.category_id || !formData.problem.trim() || !formData.solution.trim()) {
      alert('Please fill in all required fields (English problem and solution)');
      return;
    }

    setSaving(true);
    try {
      if (item && item.id) {
        const { error } = await supabase
          .from('troubleshooting_items')
          .update({
            category_id: formData.category_id,
            problem: formData.problem,
            problem_ar: formData.problem_ar,
            solution: formData.solution,
            solution_ar: formData.solution_ar,
            severity: formData.severity,
            sort_order: formData.sort_order
          })
          .eq('id', item.id);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('troubleshooting_items')
          .insert([{
            category_id: formData.category_id,
            problem: formData.problem,
            problem_ar: formData.problem_ar,
            solution: formData.solution,
            solution_ar: formData.solution_ar,
            severity: formData.severity,
            sort_order: formData.sort_order
          }]);
        
        if (error) throw error;
      }

      onSave();
      onClose();
    } catch (error) {
      console.error('Error saving troubleshooting item:', error);
      alert('Error saving troubleshooting item');
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
          className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full"
        >
          <div className="flex items-center justify-between p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">
              {item && item.id ? 'Edit Troubleshooting Item' : 'Add Troubleshooting Item'}
            </h3>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                value={formData.category_id}
                onChange={(e) => setFormData(prev => ({ ...prev, category_id: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
              >
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name} {cat.name_ar && `(${cat.name_ar})`}
                  </option>
                ))}
              </select>
            </div>

            {/* Problem - Bilingual */}
            {isEditing ? (
              <BilingualInput
                labelEn="Problem"
                labelAr="المشكلة"
                nameEn="problem"
                nameAr="problem_ar"
                valueEn={formData.problem}
                valueAr={formData.problem_ar}
                onChange={(e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                required
              />
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Problem / المشكلة
                </label>
                <p className="text-gray-900">{formData.problem}</p>
                {formData.problem_ar && <p className="text-gray-700 mt-1" dir="rtl">{formData.problem_ar}</p>}
              </div>
            )}

            {/* Solution - Bilingual */}
            {isEditing ? (
              <BilingualInput
                labelEn="Solution"
                labelAr="الحل"
                nameEn="solution"
                nameAr="solution_ar"
                valueEn={formData.solution}
                valueAr={formData.solution_ar}
                onChange={(e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                type="textarea"
                rows={6}
              />
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Solution / الحل
                </label>
                <p className="text-gray-900">{formData.solution}</p>
                {formData.solution_ar && <p className="text-gray-700 mt-1" dir="rtl">{formData.solution_ar}</p>}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Severity / الأولوية
                </label>
                {isEditing ? (
                  <select
                    value={formData.severity}
                    onChange={(e) => setFormData(prev => ({ ...prev, severity: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                  >
                    <option value="Low">Low / منخفضة</option>
                    <option value="Medium">Medium / متوسطة</option>
                    <option value="High">High / عالية</option>
                  </select>
                ) : (
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(formData.severity)}`}>
                    {formData.severity}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort Order
                </label>
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
            </div>
          </div>

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
                    Save Item
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

export default TroubleshootingManager;