/*import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Save,
  X,
  FileText,
  Settings,
  Home,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { supabase, HomepageSection, SiteSetting, ContentBlock } from '../../lib/supabase';

const ContentManager = () => {
  const [activeTab, setActiveTab] = useState('homepage');
  const [homepageSections, setHomepageSections] = useState<HomepageSection[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSetting[]>([]);
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([]);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchAllContent();
  }, []);

  const fetchAllContent = async () => {
    try {
      const [homepageData, settingsData, blocksData] = await Promise.all([
        supabase.from('homepage_sections').select('*').order('sort_order'),
        supabase.from('site_settings').select('*').order('setting_key'),
        supabase.from('content_blocks').select('*').order('block_key')
      ]);

      setHomepageSections(homepageData.data || []);
      setSiteSettings(settingsData.data || []);
      setContentBlocks(blocksData.data || []);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'homepage', label: 'Homepage Sections', icon: Home, count: homepageSections.length },
    { id: 'settings', label: 'Site Settings', icon: Settings, count: siteSettings.length },
    { id: 'blocks', label: 'Content Blocks', icon: FileText, count: contentBlocks.length }
  ];

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
          <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
          <p className="text-gray-600">Manage homepage sections, site settings, and content blocks</p>
        </div>
      </div>


      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-[#0055A3] text-[#0055A3]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="w-5 h-5 mr-2" />
              {tab.label}
              <span className="ml-2 bg-gray-100 text-gray-600 py-1 px-2 rounded-full text-xs">
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {activeTab === 'homepage' && (
        <HomepageSectionsTab
          sections={homepageSections}
          onRefresh={fetchAllContent}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      )}

      {activeTab === 'settings' && (
        <SiteSettingsTab
          settings={siteSettings}
          onRefresh={fetchAllContent}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      )}

      {activeTab === 'blocks' && (
        <ContentBlocksTab
          blocks={contentBlocks}
          onRefresh={fetchAllContent}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      )}
    </div>
  );
};

// Homepage Sections Tab
const HomepageSectionsTab = ({ 
  sections, 
  onRefresh, 
  searchTerm, 
  setSearchTerm 
}: {
  sections: HomepageSection[];
  onRefresh: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}) => {
  const [selectedSection, setSelectedSection] = useState<HomepageSection | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredSections = sections.filter(section =>
    section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.section_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openEditModal = (section: HomepageSection) => {
    setSelectedSection(section);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
 
      <div className="relative">
        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search homepage sections..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSections.map((section) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                <p className="text-sm text-gray-500">{section.section_name}</p>
                {section.subtitle && (
                  <p className="text-sm text-gray-600 mt-1">{section.subtitle}</p>
                )}
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                section.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {section.is_active ? 'Active' : 'Inactive'}
              </span>
            </div>

            <div className="flex items-center justify-end space-x-2">
              <button
                onClick={() => openEditModal(section)}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                title="Edit Section"
              >
                <Edit className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {isModalOpen && selectedSection && (
        <HomepageSectionModal
          section={selectedSection}
          onClose={() => setIsModalOpen(false)}
          onSave={onRefresh}
        />
      )}
    </div>
  );
};

// Site Settings Tab
const SiteSettingsTab = ({ 
  settings, 
  onRefresh, 
  searchTerm, 
  setSearchTerm 
}: {
  settings: SiteSetting[];
  onRefresh: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}) => {
  const [selectedSetting, setSelectedSetting] = useState<SiteSetting | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredSettings = settings.filter(setting =>
    setting.setting_key.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (setting.description && setting.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const openEditModal = (setting: SiteSetting) => {
    setSelectedSetting(setting);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
   
      <div className="relative">
        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search site settings..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
        />
      </div>


      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {filteredSettings.map((setting) => (
          <div key={setting.id} className="p-6 border-b border-gray-200 last:border-b-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{setting.setting_key}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    setting.is_public ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {setting.is_public ? 'Public' : 'Private'}
                  </span>
                </div>
                {setting.description && (
                  <p className="text-gray-600 text-sm mb-2">{setting.description}</p>
                )}
                <div className="bg-gray-50 p-3 rounded text-sm font-mono text-gray-700">
                  {JSON.stringify(setting.setting_value, null, 2)}
                </div>
              </div>
              <button
                onClick={() => openEditModal(setting)}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors ml-4"
                title="Edit Setting"
              >
                <Edit className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && selectedSetting && (
        <SiteSettingModal
          setting={selectedSetting}
          onClose={() => setIsModalOpen(false)}
          onSave={onRefresh}
        />
      )}
    </div>
  );
};

// Content Blocks Tab
const ContentBlocksTab = ({ 
  blocks, 
  onRefresh, 
  searchTerm, 
  setSearchTerm 
}: {
  blocks: ContentBlock[];
  onRefresh: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}) => {
  const [selectedBlock, setSelectedBlock] = useState<ContentBlock | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredBlocks = blocks.filter(block =>
    block.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    block.block_key.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openEditModal = (block: ContentBlock) => {
    setSelectedBlock(block);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
 
      <div className="relative">
        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search content blocks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredBlocks.map((block) => (
          <motion.div
            key={block.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{block.title}</h3>
                <p className="text-sm text-gray-500">{block.block_key}</p>
                <span className="inline-block mt-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                  {block.block_type}
                </span>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                block.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {block.is_active ? 'Active' : 'Inactive'}
              </span>
            </div>

            <div className="bg-gray-50 p-3 rounded text-xs text-gray-600 mb-4 max-h-20 overflow-hidden">
              {JSON.stringify(block.content, null, 2)}
            </div>

            <button
              onClick={() => openEditModal(block)}
              className="w-full flex items-center justify-center px-4 py-2 bg-[#0055A3] text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Content
            </button>
          </motion.div>
        ))}
      </div>


      {isModalOpen && selectedBlock && (
        <ContentBlockModal
          block={selectedBlock}
          onClose={() => setIsModalOpen(false)}
          onSave={onRefresh}
        />
      )}
    </div>
  );
};

// Homepage Section Modal
const HomepageSectionModal = ({ 
  section, 
  onClose, 
  onSave 
}: {
  section: HomepageSection;
  onClose: () => void;
  onSave: () => void;
}) => {
  const [formData, setFormData] = useState({
    title: section.title,
    subtitle: section.subtitle || '',
    content: JSON.stringify(section.content, null, 2),
    is_active: section.is_active,
    sort_order: section.sort_order
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
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

      const { error } = await supabase
        .from('homepage_sections')
        .update({
          title: formData.title,
          subtitle: formData.subtitle || null,
          content: contentObj,
          is_active: formData.is_active,
          sort_order: formData.sort_order,
          updated_at: new Date().toISOString()
        })
        .eq('id', section.id);

      if (error) throw error;
      onSave();
      onClose();
    } catch (error) {
      console.error('Error saving section:', error);
      alert('Error saving section');
    } finally {
      setSaving(false);
    }
  };

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
            <h3 className="text-lg font-semibold text-gray-900">Edit Homepage Section</h3>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
              <input
                type="text"
                value={formData.subtitle}
                onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content (JSON)</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                rows={8}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3] font-mono text-sm"
                placeholder="Enter JSON content..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Active</label>
                <select
                  value={formData.is_active ? 'true' : 'false'}
                  onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.value === 'true' }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort Order</label>
                <input
                  type="number"
                  value={formData.sort_order}
                  onChange={(e) => setFormData(prev => ({ ...prev, sort_order: parseInt(e.target.value) || 0 }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                />
              </div>
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
                  Save Changes
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Site Setting Modal
const SiteSettingModal = ({ 
  setting, 
  onClose, 
  onSave 
}: {
  setting: SiteSetting;
  onClose: () => void;
  onSave: () => void;
}) => {
  const [formData, setFormData] = useState({
    setting_value: JSON.stringify(setting.setting_value, null, 2),
    description: setting.description || '',
    is_public: setting.is_public
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      let valueObj;
      try {
        valueObj = JSON.parse(formData.setting_value);
      } catch {
        alert('Invalid JSON in setting value');
        setSaving(false);
        return;
      }

      const { error } = await supabase
        .from('site_settings')
        .update({
          setting_value: valueObj,
          description: formData.description || null,
          is_public: formData.is_public,
          updated_at: new Date().toISOString()
        })
        .eq('id', setting.id);

      if (error) throw error;
      onSave();
      onClose();
    } catch (error) {
      console.error('Error saving setting:', error);
      alert('Error saving setting');
    } finally {
      setSaving(false);
    }
  };

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
            <h3 className="text-lg font-semibold text-gray-900">Edit Site Setting</h3>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Setting Key</label>
              <input
                type="text"
                value={setting.setting_key}
                disabled
                className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Value (JSON) *</label>
              <textarea
                value={formData.setting_value}
                onChange={(e) => setFormData(prev => ({ ...prev, setting_value: e.target.value }))}
                rows={6}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3] font-mono text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
              />
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.is_public}
                  onChange={(e) => setFormData(prev => ({ ...prev, is_public: e.target.checked }))}
                  className="w-4 h-4 text-[#0055A3] border-gray-300 rounded focus:ring-[#0055A3]"
                />
                <span className="ml-2 text-sm text-gray-700">Make this setting public</span>
              </label>
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
                  Save Changes
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Content Block Modal
const ContentBlockModal = ({ 
  block, 
  onClose, 
  onSave 
}: {
  block: ContentBlock;
  onClose: () => void;
  onSave: () => void;
}) => {
  const [formData, setFormData] = useState({
    title: block.title,
    content: JSON.stringify(block.content, null, 2),
    block_type: block.block_type,
    is_active: block.is_active
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
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

      const { error } = await supabase
        .from('content_blocks')
        .update({
          title: formData.title,
          content: contentObj,
          block_type: formData.block_type,
          is_active: formData.is_active,
          updated_at: new Date().toISOString()
        })
        .eq('id', block.id);

      if (error) throw error;
      onSave();
      onClose();
    } catch (error) {
      console.error('Error saving content block:', error);
      alert('Error saving content block');
    } finally {
      setSaving(false);
    }
  };

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
            <h3 className="text-lg font-semibold text-gray-900">Edit Content Block</h3>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Block Key</label>
              <input
                type="text"
                value={block.block_key}
                disabled
                className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content (JSON) *</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                rows={8}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3] font-mono text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Block Type</label>
                <select
                  value={formData.block_type}
                  onChange={(e) => setFormData(prev => ({ ...prev, block_type: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                >
                  <option value="text">Text</option>
                  <option value="html">HTML</option>
                  <option value="json">JSON</option>
                  <option value="markdown">Markdown</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={formData.is_active ? 'true' : 'false'}
                  onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.value === 'true' }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>
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
                  Save Changes
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContentManager; 