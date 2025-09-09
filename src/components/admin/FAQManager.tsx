import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Save,
  X,
  HelpCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { supabase, FAQCategory, FAQItem } from '../../lib/supabase';

const FAQManager = () => {
  const [categories, setCategories] = useState<(FAQCategory & { faq_items: FAQItem[] })[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FAQCategory | null>(null);
  const [selectedFAQ, setSelectedFAQ] = useState<FAQItem | null>(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isFAQModalOpen, setIsFAQModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFAQData();
  }, []);

  const fetchFAQData = async () => {
    try {
      const { data, error } = await supabase
        .from('faq_categories')
        .select(`
          *,
          faq_items (*)
        `)
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setCategories(data || []);
      // Expand all categories by default
      setExpandedCategories((data || []).map(cat => cat.id));
    } catch (error) {
      console.error('Error fetching FAQ data:', error);
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
    if (!confirm('Are you sure? This will delete the category and all its FAQ items.')) return;

    try {
      const { error } = await supabase
        .from('faq_categories')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchFAQData();
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('Error deleting category');
    }
  };

  const deleteFAQItem = async (id: string) => {
    if (!confirm('Are you sure you want to delete this FAQ item?')) return;

    try {
      const { error } = await supabase
        .from('faq_items')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchFAQData();
    } catch (error) {
      console.error('Error deleting FAQ item:', error);
      alert('Error deleting FAQ item');
    }
  };

  const openCategoryModal = (category: FAQCategory | null = null, editing = false) => {
    setSelectedCategory(category);
    setIsEditing(editing);
    setIsCategoryModalOpen(true);
  };

  const openFAQModal = (faq: FAQItem | null = null, editing = false, categoryId?: string) => {
    setSelectedFAQ(faq || { category_id: categoryId } as FAQItem);
    setIsEditing(editing);
    setIsFAQModalOpen(true);
  };

  const filteredCategories = categories.filter(category =>
    searchTerm === '' || 
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.faq_items.some(item => 
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h1 className="text-3xl font-bold text-gray-900">FAQ Management</h1>
          <p className="text-gray-600">Manage FAQ categories and items</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => openCategoryModal(null, true)}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Category
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search FAQ categories and items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
        />
      </div>

      {/* FAQ Categories */}
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
                  <HelpCircle className="w-6 h-6 text-[#0055A3]" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{category.name}</h3>
                    {category.description && (
                      <p className="text-gray-600 text-sm">{category.description}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">{category.faq_items.length} items</span>
                  <button
                    onClick={() => openFAQModal(null, true, category.id)}
                    className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
                    title="Add FAQ Item"
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

            {/* FAQ Items */}
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
                    {category.faq_items.length > 0 ? (
                      category.faq_items.map((item, index) => (
                        <div key={item.id} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 mb-2">{item.question}</h4>
                              <p className="text-gray-600 text-sm line-clamp-3">{item.answer}</p>
                            </div>
                            <div className="flex items-center space-x-2 ml-4">
                              <button
                                onClick={() => openFAQModal(item, true)}
                                className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
                                title="Edit FAQ"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => deleteFAQItem(item.id)}
                                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                title="Delete FAQ"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <p>No FAQ items in this category</p>
                        <button
                          onClick={() => openFAQModal(null, true, category.id)}
                          className="mt-2 text-[#0055A3] hover:underline"
                        >
                          Add the first FAQ item
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
            <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No FAQ categories found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm ? 'Try adjusting your search terms' : 'Get started by creating your first FAQ category'}
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

      {/* Category Modal */}
      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        category={selectedCategory}
        isEditing={isEditing}
        onSave={fetchFAQData}
      />

      {/* FAQ Modal */}
      <FAQModal
        isOpen={isFAQModalOpen}
        onClose={() => setIsFAQModalOpen(false)}
        faqItem={selectedFAQ}
        isEditing={isEditing}
        onSave={fetchFAQData}
        categories={categories}
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
  onSave 
}: {
  isOpen: boolean;
  onClose: () => void;
  category: FAQCategory | null;
  isEditing: boolean;
  onSave: () => void;
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    sort_order: 0
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        description: category.description || '',
        sort_order: category.sort_order
      });
    } else {
      setFormData({
        name: '',
        description: '',
        sort_order: 0
      });
    }
  }, [category]);

  const handleSave = async () => {
    setSaving(true);
    try {
      if (category) {
        const { error } = await supabase
          .from('faq_categories')
          .update(formData)
          .eq('id', category.id);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('faq_categories')
          .insert([formData]);
        
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                placeholder="e.g., Industrial Coating"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                placeholder="Category description..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort Order
              </label>
              <input
                type="number"
                value={formData.sort_order}
                onChange={(e) => setFormData(prev => ({ ...prev, sort_order: parseInt(e.target.value) || 0 }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
              />
            </div>
          </div>

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
        </motion.div>
      </div>
    </div>
  );
};

// FAQ Modal Component
const FAQModal = ({ 
  isOpen, 
  onClose, 
  faqItem, 
  isEditing, 
  onSave,
  categories
}: {
  isOpen: boolean;
  onClose: () => void;
  faqItem: FAQItem | null;
  isEditing: boolean;
  onSave: () => void;
  categories: FAQCategory[];
}) => {
  const [formData, setFormData] = useState({
    category_id: '',
    question: '',
    answer: '',
    sort_order: 0
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (faqItem) {
      setFormData({
        category_id: faqItem.category_id,
        question: faqItem.question || '',
        answer: faqItem.answer || '',
        sort_order: faqItem.sort_order || 0
      });
    } else {
      setFormData({
        category_id: '',
        question: '',
        answer: '',
        sort_order: 0
      });
    }
  }, [faqItem]);

  const handleSave = async () => {
    if (!formData.category_id || !formData.question || !formData.answer) {
      alert('Please fill in all required fields');
      return;
    }

    setSaving(true);
    try {
      if (faqItem && faqItem.id) {
        const { error } = await supabase
          .from('faq_items')
          .update(formData)
          .eq('id', faqItem.id);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('faq_items')
          .insert([formData]);
        
        if (error) throw error;
      }

      onSave();
      onClose();
    } catch (error) {
      console.error('Error saving FAQ item:', error);
      alert('Error saving FAQ item');
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
              {faqItem && faqItem.id ? 'Edit FAQ Item' : 'Add FAQ Item'}
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
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Question *
              </label>
              <input
                type="text"
                value={formData.question}
                onChange={(e) => setFormData(prev => ({ ...prev, question: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                placeholder="Enter the FAQ question..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Answer *
              </label>
              <textarea
                value={formData.answer}
                onChange={(e) => setFormData(prev => ({ ...prev, answer: e.target.value }))}
                rows={6}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                placeholder="Enter the detailed answer..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort Order
              </label>
              <input
                type="number"
                value={formData.sort_order}
                onChange={(e) => setFormData(prev => ({ ...prev, sort_order: parseInt(e.target.value) || 0 }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
              />
            </div>
          </div>

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
                  Save FAQ
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQManager;