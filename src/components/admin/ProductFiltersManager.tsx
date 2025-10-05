import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Save,
  X,
  Filter,
  ChevronDown,
  ChevronUp,
  Package,
  Tag
} from 'lucide-react';
import { supabase, ProductFilterType, ProductFilterValue, api } from '../../lib/supabase';
import BilingualInput from './BilingualInput';

const ProductFiltersManager = () => {
  const [filterTypes, setFilterTypes] = useState<(ProductFilterType & { product_filter_values: ProductFilterValue[] })[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilterType, setSelectedFilterType] = useState<ProductFilterType | null>(null);
  const [selectedFilterValue, setSelectedFilterValue] = useState<ProductFilterValue | null>(null);
  const [isFilterTypeModalOpen, setIsFilterTypeModalOpen] = useState(false);
  const [isFilterValueModalOpen, setIsFilterValueModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [expandedTypes, setExpandedTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFilterData();
  }, []);

  const fetchFilterData = async () => {
    try {
      const { data, error } = await supabase
        .from('product_filter_types')
        .select(`
          *,
          product_filter_values (*)
        `)
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setFilterTypes(data || []);
      setExpandedTypes((data || []).map(type => type.id));
    } catch (error) {
      console.error('Error fetching filter data:', error);
    } finally {
      setLoading(false);
    }
  };

  const reorderFilterTypes = async () => {
    try {
      const { data: filterTypesData, error } = await supabase
        .from('product_filter_types')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      if (!filterTypesData || filterTypesData.length === 0) return;

      const activeTypes = filterTypesData.filter(t => t.is_active);
      const sorted = [...activeTypes].sort((a, b) => a.sort_order - b.sort_order);

      const updates = sorted.map((type, index) => ({
        id: type.id,
        sort_order: index
      }));

      await Promise.all(
        updates.map(update =>
          supabase
            .from('product_filter_types')
            .update({ sort_order: update.sort_order })
            .eq('id', update.id)
        )
      );

      await new Promise(resolve => setTimeout(resolve, 300));
      await fetchFilterData();

    } catch (error) {
      console.error('Error reordering filter types:', error);
      alert('Failed to reorder filter types');
    }
  };

  const reorderFilterValues = async (filterTypeId: string) => {
    try {
      const { data: filterValuesData, error } = await supabase
        .from('product_filter_values')
        .select('*')
        .eq('filter_type_id', filterTypeId)
        .order('sort_order', { ascending: true });

      if (error) throw error;
      if (!filterValuesData || filterValuesData.length === 0) return;

      const activeValues = filterValuesData.filter(v => v.is_active);
      const sorted = [...activeValues].sort((a, b) => a.sort_order - b.sort_order);

      const updates = sorted.map((value, index) => ({
        id: value.id,
        sort_order: index
      }));

      await Promise.all(
        updates.map(update =>
          supabase
            .from('product_filter_values')
            .update({ sort_order: update.sort_order })
            .eq('id', update.id)
        )
      );

      await new Promise(resolve => setTimeout(resolve, 300));
      await fetchFilterData();

    } catch (error) {
      console.error('Error reordering filter values:', error);
      alert('Failed to reorder filter values');
    }
  };

  const getMaxFilterTypeSortOrder = async () => {
    const { data, error } = await supabase
      .from('product_filter_types')
      .select('sort_order')
      .order('sort_order', { ascending: false })
      .limit(1);

    if (error) throw error;
    return data && data.length > 0 ? data[0].sort_order + 1 : 0;
  };

  const getMaxFilterValueSortOrder = async (filterTypeId: string) => {
    const { data, error } = await supabase
      .from('product_filter_values')
      .select('sort_order')
      .eq('filter_type_id', filterTypeId)
      .order('sort_order', { ascending: false })
      .limit(1);

    if (error) throw error;
    return data && data.length > 0 ? data[0].sort_order + 1 : 0;
  };

  const toggleFilterType = (typeId: string) => {
    setExpandedTypes(prev => 
      prev.includes(typeId)
        ? prev.filter(id => id !== typeId)
        : [...prev, typeId]
    );
  };

  const deleteFilterType = async (id: string) => {
    if (!confirm('Are you sure? This will delete the filter type and all its values.')) return;

    try {
      await api.deleteProductFilterType(id);
      await reorderFilterTypes();
    } catch (error) {
      console.error('Error deleting filter type:', error);
      alert('Error deleting filter type');
    }
  };

  const deleteFilterValue = async (id: string) => {
    if (!confirm('Are you sure you want to delete this filter value?')) return;

    try {
      const { data: valueData, error: fetchError } = await supabase
        .from('product_filter_values')
        .select('filter_type_id')
        .eq('id', id)
        .single();

      if (fetchError) throw fetchError;

      await api.deleteProductFilterValue(id);
      await reorderFilterValues(valueData.filter_type_id);
    } catch (error) {
      console.error('Error deleting filter value:', error);
      alert('Error deleting filter value');
    }
  };

  const openFilterTypeModal = async (filterType: ProductFilterType | null = null, editing = false) => {
    setSelectedFilterType(filterType);
    setIsEditing(editing);
    
    if (!filterType) {
      const maxSortOrder = await getMaxFilterTypeSortOrder();
      setSelectedFilterType({
        id: '',
        name: '',
        name_ar: '',
        description: '',
        description_ar: '',
        sort_order: maxSortOrder,
        is_active: true,
        created_at: '',
        updated_at: ''
      });
    }
    
    setIsFilterTypeModalOpen(true);
  };

  const openFilterValueModal = async (filterValue: ProductFilterValue | null = null, editing = false, filterTypeId?: string) => {
    setSelectedFilterValue(filterValue);
    setIsEditing(editing);
    
    if (!filterValue && filterTypeId) {
      const maxSortOrder = await getMaxFilterValueSortOrder(filterTypeId);
      setSelectedFilterValue({
        id: '',
        filter_type_id: filterTypeId,
        value: '',
        value_ar: '',
        display_name: '',
        display_name_ar: '',
        sort_order: maxSortOrder,
        is_active: true,
        created_at: '',
        updated_at: ''
      });
    }
    
    setIsFilterValueModalOpen(true);
  };

  const filteredFilterTypes = filterTypes.filter(type =>
    searchTerm === '' || 
    type.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (type.name_ar && type.name_ar.toLowerCase().includes(searchTerm.toLowerCase())) ||
    type.product_filter_values.some(value => 
      value.value.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (value.value_ar && value.value_ar.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (value.display_name && value.display_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (value.display_name_ar && value.display_name_ar.toLowerCase().includes(searchTerm.toLowerCase()))
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Product Filters</h1>
          <p className="text-gray-600">Manage product filter types and values</p>
        </div>
        <button
          onClick={() => openFilterTypeModal(null, true)}
          className="flex items-center px-4 py-2 bg-[#0055A3] text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Filter Type
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search filter types and values..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
        />
      </div>

      <div className="space-y-4">
        {filteredFilterTypes.map((filterType) => (
          <div key={filterType.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => toggleFilterType(filterType.id)}
                    className="p-2 hover:bg-gray-100 rounded transition-colors"
                  >
                    {expandedTypes.includes(filterType.id) ? (
                      <ChevronUp className="w-5 h-5 text-gray-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-600" />
                    )}
                  </button>
                  <Filter className="w-6 h-6 text-[#0055A3]" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {filterType.name}
                      {filterType.name_ar && (
                        <span className="block text-gray-700 text-base" dir="rtl">
                          {filterType.name_ar}
                        </span>
                      )}
                    </h3>
                    {(filterType.description || filterType.description_ar) && (
                      <p className="text-gray-600 text-sm">
                        {filterType.description}
                        {filterType.description_ar && (
                          <span className="block" dir="rtl">
                            {filterType.description_ar}
                          </span>
                        )}
                      </p>
                    )} 
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    filterType.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {filterType.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">{filterType.product_filter_values.length} values</span>
                  <button
                    onClick={() => openFilterValueModal(null, true, filterType.id)}
                    className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
                    title="Add Filter Value"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => openFilterTypeModal(filterType, true)}
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    title="Edit Filter Type"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteFilterType(filterType.id)}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Delete Filter Type"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <AnimatePresence>
              {expandedTypes.includes(filterType.id) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 space-y-4">
                    {filterType.product_filter_values.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filterType.product_filter_values.map((value) => (
                          <div key={value.id} className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold text-gray-900">
                                {value.display_name || value.value}
                                {(value.display_name_ar || value.value_ar) && (
                                  <span className="block text-gray-700 text-sm" dir="rtl">
                                    {value.display_name_ar || value.value_ar}
                                  </span>
                                )}
                              </h4>
                              {value.display_name && value.display_name !== value.value && (
                                <p className="text-xs text-gray-500">{value.value}</p>
                              )}
                              <p className="text-xs text-gray-400">Order: {value.sort_order}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => openFilterValueModal(value, true)}
                                className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
                                title="Edit Filter Value"
                              >
                                <Edit className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => deleteFilterValue(value.id)}
                                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                title="Delete Filter Value"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <p>No filter values in this category</p>
                        <button
                          onClick={() => openFilterValueModal(null, true, filterType.id)}
                          className="mt-2 text-[#0055A3] hover:underline"
                        >
                          Add the first filter value
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}

        {filteredFilterTypes.length === 0 && (
          <div className="text-center py-12">
            <Filter className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No filter types found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm ? 'Try adjusting your search terms' : 'Get started by creating your first filter type'}
            </p>
            {!searchTerm && (
              <button
                onClick={() => openFilterTypeModal(null, true)}
                className="flex items-center mx-auto px-4 py-2 bg-[#0055A3] text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Filter Type
              </button>
            )}
          </div>
        )}
      </div>

      <FilterTypeModal
        isOpen={isFilterTypeModalOpen}
        onClose={() => setIsFilterTypeModalOpen(false)}
        filterType={selectedFilterType}
        isEditing={isEditing}
        onSave={fetchFilterData}
        reorderFilterTypes={reorderFilterTypes}
        getMaxFilterTypeSortOrder={getMaxFilterTypeSortOrder}
      />

      <FilterValueModal
        isOpen={isFilterValueModalOpen}
        onClose={() => setIsFilterValueModalOpen(false)}
        filterValue={selectedFilterValue}
        isEditing={isEditing}
        onSave={fetchFilterData}
        filterTypes={filterTypes}
        reorderFilterValues={reorderFilterValues}
        getMaxFilterValueSortOrder={getMaxFilterValueSortOrder}
      />
    </div>
  );
};

// Filter Type Modal
const FilterTypeModal = ({ 
  isOpen, 
  onClose, 
  filterType, 
  isEditing, 
  onSave,
  reorderFilterTypes,
  getMaxFilterTypeSortOrder
}: {
  isOpen: boolean;
  onClose: () => void;
  filterType: ProductFilterType | null;
  isEditing: boolean;
  onSave: () => void;
  reorderFilterTypes: () => Promise<void>;
  getMaxFilterTypeSortOrder: () => Promise<number>;
}) => {
  const [formData, setFormData] = useState({
    name: '',
    name_ar: '',
    description: '',
    description_ar: '',
    sort_order: 0,
    is_active: true
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (filterType) {
      setFormData({
        name: filterType.name,
        name_ar: filterType.name_ar || '',
        description: filterType.description || '',
        description_ar: filterType.description_ar || '',
        sort_order: filterType.sort_order,
        is_active: filterType.is_active
      });
    } else {
      getMaxFilterTypeSortOrder().then(maxOrder => {
        setFormData({
          name: '',
          name_ar: '',
          description: '',
          description_ar: '',
          sort_order: maxOrder,
          is_active: true
        });
      });
    }
  }, [filterType, getMaxFilterTypeSortOrder]);

  const handleSave = async () => {
    if (!formData.name.trim()) {
      alert('Please fill in the English name');
      return;
    }

    setSaving(true);
    try {
      if (filterType && filterType.id) {
        await api.updateProductFilterType(filterType.id, formData);
      } else {
        await api.createProductFilterType(formData);
      }

      onSave();
      await reorderFilterTypes();
      onClose();
    } catch (error) {
      console.error('Error saving filter type:', error);
      alert('Error saving filter type');
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
              {filterType ? 'Edit Filter Type' : 'Add Filter Type'}
            </h3>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-4">
            {/* Name */}
            {isEditing ? (
              <BilingualInput
                labelEn="Filter Type Name"
                labelAr="اسم نوع الفلتر"
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
                  Filter Type Name / اسم نوع الفلتر
                </label>
                <p className="text-gray-900">{formData.name}</p>
                {formData.name_ar && <p className="text-gray-700 mt-1" dir="rtl">{formData.name_ar}</p>}
              </div>
            )}

            {/* Description */}
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

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort Order / الترتيب
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status / الحالة
                </label>
                {isEditing ? (
                  <select
                    value={formData.is_active ? 'true' : 'false'}
                    onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.value === 'true' }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                  >
                    <option value="true">Active / نشط</option>
                    <option value="false">Inactive / غير نشط</option>
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

// Filter Value Modal
const FilterValueModal = ({ 
  isOpen, 
  onClose, 
  filterValue, 
  isEditing, 
  onSave,
  filterTypes,
  reorderFilterValues,
  getMaxFilterValueSortOrder
}: {
  isOpen: boolean;
  onClose: () => void;
  filterValue: ProductFilterValue | null;
  isEditing: boolean;
  onSave: () => void;
  filterTypes: ProductFilterType[];
  reorderFilterValues: (filterTypeId: string) => Promise<void>;
  getMaxFilterValueSortOrder: (filterTypeId: string) => Promise<number>;
}) => {
  const [formData, setFormData] = useState({
    filter_type_id: '',
    value: '',
    value_ar: '',
    display_name: '',
    display_name_ar: '',
    sort_order: 0,
    is_active: true
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (filterValue) {
      setFormData({
        filter_type_id: filterValue.filter_type_id,
        value: filterValue.value || '',
        value_ar: filterValue.value_ar || '',
        display_name: filterValue.display_name || '',
        display_name_ar: filterValue.display_name_ar || '',
        sort_order: filterValue.sort_order || 0,
        is_active: filterValue.is_active !== undefined ? filterValue.is_active : true
      });
    } else {
      if (formData.filter_type_id) {
        getMaxFilterValueSortOrder(formData.filter_type_id).then(maxOrder => {
          setFormData(prev => ({
            ...prev,
            sort_order: maxOrder
          }));
        });
      }
    }
  }, [filterValue, formData.filter_type_id, getMaxFilterValueSortOrder]);

  const handleSave = async () => {
    if (!formData.filter_type_id || !formData.value.trim()) {
      alert('Please select a filter type and enter a value');
      return;
    }

    setSaving(true);
    try {
      if (filterValue && filterValue.id) {
        await api.updateProductFilterValue(filterValue.id, formData);
      } else {
        await api.createProductFilterValue(formData);
      }

      onSave();
      await reorderFilterValues(formData.filter_type_id);
      onClose();
    } catch (error) {
      console.error('Error saving filter value:', error);
      alert('Error saving filter value');
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
              {filterValue && filterValue.id ? 'Edit Filter Value' : 'Add Filter Value'}
            </h3>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter Type / نوع الفلتر *
              </label>
              <select
                value={formData.filter_type_id}
                onChange={(e) => {
                  const newFilterTypeId = e.target.value;
                  setFormData(prev => ({ ...prev, filter_type_id: newFilterTypeId }));
                  
                  if (newFilterTypeId) {
                    getMaxFilterValueSortOrder(newFilterTypeId).then(maxOrder => {
                      setFormData(prev => ({
                        ...prev,
                        sort_order: maxOrder
                      }));
                    });
                  }
                }}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
              >
                <option value="">Select a filter type</option>
                {filterTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.name}{type.name_ar && ` / ${type.name_ar}`}</option>
                ))}
              </select>
            </div>

            {/* Value */}
            {isEditing ? (
              <BilingualInput
                labelEn="Value"
                labelAr="القيمة"
                nameEn="value"
                nameAr="value_ar"
                valueEn={formData.value}
                valueAr={formData.value_ar}
                onChange={(e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                required
              />
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Value / القيمة
                </label>
                <p className="text-gray-900">{formData.value}</p>
                {formData.value_ar && <p className="text-gray-700 mt-1" dir="rtl">{formData.value_ar}</p>}
              </div>
            )}

            {/* Display Name */}
            {isEditing ? (
              <BilingualInput
                labelEn="Display Name (optional)"
                labelAr="اسم العرض (اختياري)"
                nameEn="display_name"
                nameAr="display_name_ar"
                valueEn={formData.display_name}
                valueAr={formData.display_name_ar}
                onChange={(e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))}
              />
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Display Name / اسم العرض
                </label>
                <p className="text-gray-900">{formData.display_name || '-'}</p>
                {formData.display_name_ar && <p className="text-gray-700 mt-1" dir="rtl">{formData.display_name_ar}</p>}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort Order / الترتيب
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status / الحالة
                </label>
                {isEditing ? (
                  <select
                    value={formData.is_active ? 'true' : 'false'}
                    onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.value === 'true' }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                  >
                    <option value="true">Active / نشط</option>
                    <option value="false">Inactive / غير نشط</option>
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

export default ProductFiltersManager;