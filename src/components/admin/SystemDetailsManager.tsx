import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Edit, 
  Save,
  X,
  FileText,
  Eye,
  Settings,
  Globe,
  Clock,
  User
} from 'lucide-react';
import { supabase, api, SystemDetail } from '../../lib/supabase';

const SystemDetailsManager = () => {
  const [systems, setSystems] = useState<SystemDetail[]>([]);
  const [selectedSystem, setSelectedSystem] = useState<SystemDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Predefined system IDs that can have detail pages
  const availableSystemIds = [
    'concrete-exterior',
    'concrete-lining', 
    'concrete-repair',
    'concrete-sealer',
    'car-coating',
    'concrete-walls',
    'facade-protection',
    'industrial-flooring',
    'joint-sealant',
    'steel-surface',
    'roof-coatings',
    'wooden-surface',
    'fire-retardant',
    'steel-linings',
    'floorings',
    'adhesives-grouts'
  ];

  useEffect(() => {
    fetchSystemDetails();
  }, []);

  const fetchSystemDetails = async () => {
    try {
      const { data, error } = await supabase
        .from('system_details')
        .select('*')
        .order('system_id');

      if (error) throw error;
      setSystems(data || []);
    } catch (error) {
      console.error('Error fetching system details:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteSystemDetail = async (id: string) => {
    if (!confirm('Are you sure you want to delete this system detail page?')) return;

    try {
      await api.deleteSystemDetail(id);
      setSystems(systems.filter(s => s.id !== id));
    } catch (error) {
      console.error('Error deleting system detail:', error);
      alert('Error deleting system detail');
    }
  };

  const openModal = (system: SystemDetail | null = null, editing = false) => {
    setSelectedSystem(system);
    setIsEditing(editing);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedSystem(null);
    setIsEditing(false);
    setIsModalOpen(false);
  };

  const filteredSystems = systems.filter(system =>
    system.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    system.system_id.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h1 className="text-3xl font-bold text-gray-900">System Details</h1>
          <p className="text-gray-600">Manage rich content pages for system categories</p>
        </div>
        <button
          onClick={() => openModal(null, true)}
          className="flex items-center px-4 py-2 bg-[#0055A3] text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add System Detail
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search system details..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
        />
      </div>

      {/* Systems Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSystems.map((system, index) => (
          <motion.div
            key={system.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{system.title}</h3>
                <p className="text-sm text-gray-500 mb-2">/{system.system_id}</p>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    system.is_published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {system.is_published ? 'Published' : 'Draft'}
                  </span>
                </div>
              </div>
              <Settings className="w-6 h-6 text-[#0055A3]" />
            </div>

            {system.meta_description && (
              <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                {system.meta_description}
              </p>
            )}

            <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
              <span className="flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {new Date(system.updated_at).toLocaleDateString()}
              </span>
              <span className="flex items-center">
                <User className="w-3 h-3 mr-1" />
                {system.updated_by || 'System'}
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => openModal(system, false)}
                className="flex-1 flex items-center justify-center p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                title="View"
              >
                <Eye className="w-4 h-4 mr-1" />
                View
              </button>
              <button
                onClick={() => openModal(system, true)}
                className="flex-1 flex items-center justify-center p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
                title="Edit"
              >
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </button>
              <button
                onClick={() => deleteSystemDetail(system.id)}
                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* No systems message */}
      {filteredSystems.length === 0 && (
        <div className="text-center py-12">
          <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No system details found</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm ? 'Try adjusting your search terms' : 'Get started by adding your first system detail page'}
          </p>
          {!searchTerm && (
            <button
              onClick={() => openModal(null, true)}
              className="flex items-center mx-auto px-4 py-2 bg-[#0055A3] text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add System Detail
            </button>
          )}
        </div>
      )}

      {/* System Detail Modal */}
      <SystemDetailModal
        isOpen={isModalOpen}
        onClose={closeModal}
        systemDetail={selectedSystem}
        isEditing={isEditing}
        onSave={fetchSystemDetails}
        availableSystemIds={availableSystemIds}
      />
    </div>
  );
};

// System Detail Modal
const SystemDetailModal = ({ 
  isOpen, 
  onClose, 
  systemDetail, 
  isEditing, 
  onSave,
  availableSystemIds
}: {
  isOpen: boolean;
  onClose: () => void;
  systemDetail: SystemDetail | null;
  isEditing: boolean;
  onSave: () => void;
  availableSystemIds: string[];
}) => {
  const [formData, setFormData] = useState({
    system_id: '',
    title: '',
    content: '{"type":"doc","content":[]}',
    content_type: 'html',
    meta_description: '',
    is_published: false
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (systemDetail) {
      setFormData({
        system_id: systemDetail.system_id,
        title: systemDetail.title,
        content: JSON.stringify(systemDetail.content, null, 2),
        content_type: systemDetail.content_type,
        meta_description: systemDetail.meta_description || '',
        is_published: systemDetail.is_published
      });
    } else {
      setFormData({
        system_id: '',
        title: '',
        content: '{"type":"doc","content":[]}',
        content_type: 'html',
        meta_description: '',
        is_published: false
      });
    }
  }, [systemDetail]);

  const handleSave = async () => {
    if (!formData.system_id || !formData.title) {
      alert('System ID and title are required');
      return;
    }

    setSaving(true);
    try {
      let contentObj;
      try {
        contentObj = JSON.parse(formData.content);
      } catch {
        alert('Invalid JSON in content field');
        setSaving(false);
        return;
      }

      if (systemDetail) {
        await api.updateSystemDetail(systemDetail.id, {
          ...formData,
          content: contentObj
        });
      } else {
        await api.createSystemDetail({
          ...formData,
          content: contentObj
        });
      }

      onSave();
      onClose();
    } catch (error) {
      console.error('Error saving system detail:', error);
      alert('Error saving system detail');
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
          className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        >
          <div className="flex items-center justify-between p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">
              {isEditing ? (systemDetail ? 'Edit System Detail' : 'Add System Detail') : 'View System Detail'}
            </h3>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="overflow-y-auto max-h-[calc(90vh-140px)] p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">System ID *</label>
                {isEditing ? (
                  <select
                    value={formData.system_id}
                    onChange={(e) => setFormData(prev => ({ ...prev, system_id: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                  >
                    <option value="">Select System ID</option>
                    {availableSystemIds.map(id => (
                      <option key={id} value={id}>{id}</option>
                    ))}
                  </select>
                ) : (
                  <p className="text-gray-900">{formData.system_id}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                  />
                ) : (
                  <p className="text-gray-900">{formData.title}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
                {isEditing ? (
                  <textarea
                    value={formData.meta_description}
                    onChange={(e) => setFormData(prev => ({ ...prev, meta_description: e.target.value }))}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                  />
                ) : (
                  <p className="text-gray-900">{formData.meta_description}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content Type</label>
                {isEditing ? (
                  <select
                    value={formData.content_type}
                    onChange={(e) => setFormData(prev => ({ ...prev, content_type: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                  >
                    <option value="html">HTML</option>
                    <option value="markdown">Markdown</option>
                    <option value="json">JSON</option>
                  </select>
                ) : (
                  <p className="text-gray-900">{formData.content_type}</p>
                )}
              </div>
            </div>

            {/* Content Editor */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
              {isEditing ? (
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  rows={20}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3] font-mono text-sm"
                  placeholder="Enter content as JSON (for rich text editor) or HTML..."
                />
              ) : (
                <div className="bg-gray-50 p-4 rounded-lg max-h-96 overflow-y-auto">
                  <pre className="text-xs text-gray-700 whitespace-pre-wrap">
                    {JSON.stringify(JSON.parse(formData.content), null, 2)}
                  </pre>
                </div>
              )}
            </div>

            {isEditing && (
              <div className="mt-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.is_published}
                    onChange={(e) => setFormData(prev => ({ ...prev, is_published: e.target.checked }))}
                    className="w-4 h-4 text-[#0055A3] border-gray-300 rounded focus:ring-[#0055A3]"
                  />
                  <span className="ml-2 text-sm text-gray-700">Publish this system detail page</span>
                </label>
              </div>
            )}
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
                    Save System Detail
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

export default SystemDetailsManager;