import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Save,
  X,
  FileText,
  Upload,
  Download,
  Eye,
  Shield,
  Package,
  Wrench,
  AlertTriangle,
  CheckCircle,
  List,
  Image as ImageIcon
} from 'lucide-react';
import { 
  supabase, 
  api, 
  ProductBulletin, 
  ProductTechnicalSpec,
  ProductKeyFeature,
  ProductApplication,
  ProductStorageRequirement,
  ProductSafetyInfo,
  Product
} from '../../lib/supabase';

const ProductBulletinManager = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [bulletin, setBulletin] = useState<ProductBulletin | null>(null);
  const [technicalSpecs, setTechnicalSpecs] = useState<ProductTechnicalSpec[]>([]);
  const [keyFeatures, setKeyFeatures] = useState<ProductKeyFeature[]>([]);
  const [applications, setApplications] = useState<ProductApplication[]>([]);
  const [storageRequirements, setStorageRequirements] = useState<ProductStorageRequirement[]>([]);
  const [safetyInfo, setSafetyInfo] = useState<ProductSafetyInfo[]>([]);
  const [activeTab, setActiveTab] = useState('basic');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      fetchBulletinData(selectedProduct.id);
    }
  }, [selectedProduct]);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('status', 'active')
        .order('name');

      if (error) throw error;
      setProducts(data || []);
      
      if (data && data.length > 0 && !selectedProduct) {
        setSelectedProduct(data[0]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBulletinData = async (productId: string) => {
    try {
      const data = await api.getProductBulletin(productId);
      
      if (data) {
        setBulletin(data);
        setTechnicalSpecs(data.product_technical_specs || []);
        setKeyFeatures(data.product_key_features || []);
        setApplications(data.product_applications || []);
        setStorageRequirements(data.product_storage_requirements || []);
        setSafetyInfo(data.product_safety_info || []);
      } else {
        // Create new bulletin if none exists
        const newBulletin = await api.createProductBulletin({
          product_id: productId,
          title: `${selectedProduct?.name} Technical Bulletin`,
          short_description: selectedProduct?.description,
          is_published: false
        });
        setBulletin(newBulletin);
        setTechnicalSpecs([]);
        setKeyFeatures([]);
        setApplications([]);
        setStorageRequirements([]);
        setSafetyInfo([]);
      }
    } catch (error) {
      console.error('Error fetching bulletin data:', error);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: Package },
    { id: 'specs', label: 'Technical Specs', icon: FileText },
    { id: 'features', label: 'Key Features', icon: CheckCircle },
    { id: 'applications', label: 'Applications', icon: Wrench },
    { id: 'instructions', label: 'Instructions', icon: List },
    { id: 'storage', label: 'Storage', icon: Package },
    { id: 'safety', label: 'Safety Info', icon: Shield }
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Product Bulletins</h1>
          <p className="text-gray-600">Manage technical bulletins for products</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Product Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Product</h3>
            
            {/* Product Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
              />
            </div>

            {/* Product List */}
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredProducts.map((product) => (
                <button
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    selectedProduct?.id === product.id
                      ? 'bg-[#0055A3] text-white border-[#0055A3]'
                      : 'bg-gray-50 text-gray-900 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <div className="font-medium text-sm">{product.name}</div>
                  <div className="text-xs opacity-75">{product.code}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bulletin Editor */}
        <div className="lg:col-span-3">
          {selectedProduct && bulletin ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              {/* Tabs */}
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
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
                      <tab.icon className="w-4 h-4 mr-2" />
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'basic' && (
                  <BasicInfoTab 
                    bulletin={bulletin} 
                    onUpdate={(updates) => {
                      api.updateProductBulletin(bulletin.id, updates);
                      setBulletin({ ...bulletin, ...updates });
                    }}
                  />
                )}
                
                {activeTab === 'specs' && (
                  <TechnicalSpecsTab 
                    specs={technicalSpecs}
                    bulletinId={bulletin.id}
                    onUpdate={() => fetchBulletinData(selectedProduct.id)}
                  />
                )}
                
                {activeTab === 'features' && (
                  <KeyFeaturesTab 
                    features={keyFeatures}
                    bulletinId={bulletin.id}
                    onUpdate={() => fetchBulletinData(selectedProduct.id)}
                  />
                )}
                
                {activeTab === 'applications' && (
                  <ApplicationsTab 
                    applications={applications}
                    bulletinId={bulletin.id}
                    onUpdate={() => fetchBulletinData(selectedProduct.id)}
                  />
                )}
                
                {activeTab === 'storage' && (
                  <StorageTab 
                    requirements={storageRequirements}
                    bulletinId={bulletin.id}
                    onUpdate={() => fetchBulletinData(selectedProduct.id)}
                  />
                )}
                
                {activeTab === 'safety' && (
                  <SafetyTab 
                    safetyInfo={safetyInfo}
                    bulletinId={bulletin.id}
                    onUpdate={() => fetchBulletinData(selectedProduct.id)}
                  />
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Product</h3>
              <p className="text-gray-600">Choose a product from the sidebar to manage its technical bulletin</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Basic Info Tab
const BasicInfoTab = ({ 
  bulletin, 
  onUpdate 
}: {
  bulletin: ProductBulletin;
  onUpdate: (updates: Partial<ProductBulletin>) => void;
}) => {
  const [formData, setFormData] = useState({
    title: bulletin.title,
    short_description: bulletin.short_description || '',
    cover_image_url: bulletin.cover_image_url || '',
    datasheet_url: bulletin.datasheet_url || '',
    manual_url: bulletin.manual_url || '',
    is_published: bulletin.is_published
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await onUpdate(formData);
    } catch (error) {
      console.error('Error saving basic info:', error);
      alert('Error saving basic information');
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = async (field: string, file: File) => {
    try {
      const url = await api.uploadFile('product-documents', 'bulletins', file);
      setFormData(prev => ({ ...prev, [field]: url }));
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Bulletin Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Short Description</label>
        <textarea
          value={formData.short_description}
          onChange={(e) => setFormData(prev => ({ ...prev, short_description: e.target.value }))}
          rows={3}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image URL</label>
        <div className="flex space-x-2">
          <input
            type="url"
            value={formData.cover_image_url}
            onChange={(e) => setFormData(prev => ({ ...prev, cover_image_url: e.target.value }))}
            className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
          />
          <label className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer transition-colors">
            <Upload className="w-4 h-4" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFileUpload('cover_image_url', e.target.files[0])}
            />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Datasheet URL</label>
          <div className="flex space-x-2">
            <input
              type="url"
              value={formData.datasheet_url}
              onChange={(e) => setFormData(prev => ({ ...prev, datasheet_url: e.target.value }))}
              className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
            />
            <label className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer transition-colors">
              <Upload className="w-4 h-4" />
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFileUpload('datasheet_url', e.target.files[0])}
              />
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Manual URL</label>
          <div className="flex space-x-2">
            <input
              type="url"
              value={formData.manual_url}
              onChange={(e) => setFormData(prev => ({ ...prev, manual_url: e.target.value }))}
              className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
            />
            <label className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer transition-colors">
              <Upload className="w-4 h-4" />
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFileUpload('manual_url', e.target.files[0])}
              />
            </label>
          </div>
        </div>
      </div>

      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.is_published}
            onChange={(e) => setFormData(prev => ({ ...prev, is_published: e.target.checked }))}
            className="w-4 h-4 text-[#0055A3] border-gray-300 rounded focus:ring-[#0055A3]"
          />
          <span className="ml-2 text-sm text-gray-700">Publish this bulletin</span>
        </label>
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="flex items-center px-4 py-2 bg-[#0055A3] text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {saving ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Saving...
          </>
        ) : (
          <>
            <Save className="w-4 h-4 mr-2" />
            Save Basic Info
          </>
        )}
      </button>
    </div>
  );
};

// Technical Specs Tab
const TechnicalSpecsTab = ({ 
  specs, 
  bulletinId, 
  onUpdate 
}: {
  specs: ProductTechnicalSpec[];
  bulletinId: string;
  onUpdate: () => void;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSpec, setSelectedSpec] = useState<ProductTechnicalSpec | null>(null);
  const [formData, setFormData] = useState({
    property: '',
    value: '',
    standard: '',
    sort_order: 0
  });
  const [saving, setSaving] = useState(false);

  const openModal = (spec: ProductTechnicalSpec | null = null) => {
    if (spec) {
      setFormData({
        property: spec.property,
        value: spec.value,
        standard: spec.standard || '',
        sort_order: spec.sort_order
      });
      setSelectedSpec(spec);
    } else {
      setFormData({
        property: '',
        value: '',
        standard: '',
        sort_order: specs.length
      });
      setSelectedSpec(null);
    }
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (selectedSpec) {
        await api.updateTechnicalSpec(selectedSpec.id, formData);
      } else {
        await api.createTechnicalSpec({
          product_bulletin_id: bulletinId,
          ...formData
        });
      }
      onUpdate();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving spec:', error);
      alert('Error saving technical specification');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this specification?')) return;

    try {
      await api.deleteTechnicalSpec(id);
      onUpdate();
    } catch (error) {
      console.error('Error deleting spec:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Technical Specifications</h3>
        <button
          onClick={() => openModal()}
          className="flex items-center px-4 py-2 bg-[#0055A3] text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Specification
        </button>
      </div>

      {specs.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Property</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Value</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Standard</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {specs.sort((a, b) => a.sort_order - b.sort_order).map((spec) => (
                <tr key={spec.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">{spec.property}</td>
                  <td className="px-4 py-3 text-sm text-[#0055A3] font-medium">{spec.value}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{spec.standard}</td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openModal(spec)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(spec.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <FileText className="w-12 h-12 mx-auto mb-3" />
          <p>No technical specifications added yet</p>
        </div>
      )}

      {/* Spec Modal */}
      <SpecModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formData={formData}
        setFormData={setFormData}
        onSave={handleSave}
        saving={saving}
        isEditing={!!selectedSpec}
      />
    </div>
  );
};

// Key Features Tab
const KeyFeaturesTab = ({ 
  features, 
  bulletinId, 
  onUpdate 
}: {
  features: ProductKeyFeature[];
  bulletinId: string;
  onUpdate: () => void;
}) => {
  const [newFeature, setNewFeature] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');

  const handleAdd = async () => {
    if (!newFeature.trim()) return;

    try {
      await api.createKeyFeature({
        product_bulletin_id: bulletinId,
        feature: newFeature,
        sort_order: features.length
      });
      setNewFeature('');
      onUpdate();
    } catch (error) {
      console.error('Error adding feature:', error);
    }
  };

  const handleEdit = async (id: string) => {
    if (!editingText.trim()) return;

    try {
      await api.updateKeyFeature(id, { feature: editingText });
      setEditingId(null);
      setEditingText('');
      onUpdate();
    } catch (error) {
      console.error('Error updating feature:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this feature?')) return;

    try {
      await api.deleteKeyFeature(id);
      onUpdate();
    } catch (error) {
      console.error('Error deleting feature:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Key Features</h3>
      </div>

      {/* Add New Feature */}
      <div className="flex space-x-2">
        <input
          type="text"
          value={newFeature}
          onChange={(e) => setNewFeature(e.target.value)}
          placeholder="Add a new key feature..."
          className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
          onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
        />
        <button
          onClick={handleAdd}
          disabled={!newFeature.trim()}
          className="px-4 py-2 bg-[#0055A3] text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Features List */}
      <div className="space-y-3">
        {features.sort((a, b) => a.sort_order - b.sort_order).map((feature) => (
          <div key={feature.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
            
            {editingId === feature.id ? (
              <div className="flex-1 flex space-x-2">
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  className="flex-1 px-3 py-1 border border-gray-200 rounded focus:outline-none focus:border-[#0055A3]"
                  onKeyPress={(e) => e.key === 'Enter' && handleEdit(feature.id)}
                />
                <button
                  onClick={() => handleEdit(feature.id)}
                  className="text-green-600 hover:text-green-800"
                >
                  <Save className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <span className="flex-1 text-gray-900">{feature.feature}</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setEditingId(feature.id);
                      setEditingText(feature.feature);
                    }}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(feature.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {features.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <CheckCircle className="w-12 h-12 mx-auto mb-3" />
          <p>No key features added yet</p>
        </div>
      )}
    </div>
  );
};

// Applications Tab
const ApplicationsTab = ({ 
  applications, 
  bulletinId, 
  onUpdate 
}: {
  applications: ProductApplication[];
  bulletinId: string;
  onUpdate: () => void;
}) => {
  const [newApplication, setNewApplication] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');

  const handleAdd = async () => {
    if (!newApplication.trim()) return;

    try {
      await api.createApplication({
        product_bulletin_id: bulletinId,
        application: newApplication,
        sort_order: applications.length
      });
      setNewApplication('');
      onUpdate();
    } catch (error) {
      console.error('Error adding application:', error);
    }
  };

  const handleEdit = async (id: string) => {
    if (!editingText.trim()) return;

    try {
      await api.updateApplication(id, { application: editingText });
      setEditingId(null);
      setEditingText('');
      onUpdate();
    } catch (error) {
      console.error('Error updating application:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this application?')) return;

    try {
      await api.deleteApplication(id);
      onUpdate();
    } catch (error) {
      console.error('Error deleting application:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Applications</h3>
      </div>

      {/* Add New Application */}
      <div className="flex space-x-2">
        <input
          type="text"
          value={newApplication}
          onChange={(e) => setNewApplication(e.target.value)}
          placeholder="Add a new application..."
          className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
          onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
        />
        <button
          onClick={handleAdd}
          disabled={!newApplication.trim()}
          className="px-4 py-2 bg-[#0055A3] text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Applications List */}
      <div className="space-y-3">
        {applications.sort((a, b) => a.sort_order - b.sort_order).map((application) => (
          <div key={application.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <Wrench className="w-5 h-5 text-[#0055A3] flex-shrink-0" />
            
            {editingId === application.id ? (
              <div className="flex-1 flex space-x-2">
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  className="flex-1 px-3 py-1 border border-gray-200 rounded focus:outline-none focus:border-[#0055A3]"
                  onKeyPress={(e) => e.key === 'Enter' && handleEdit(application.id)}
                />
                <button
                  onClick={() => handleEdit(application.id)}
                  className="text-green-600 hover:text-green-800"
                >
                  <Save className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <span className="flex-1 text-gray-900">{application.application}</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setEditingId(application.id);
                      setEditingText(application.application);
                    }}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(application.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {applications.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Wrench className="w-12 h-12 mx-auto mb-3" />
          <p>No applications added yet</p>
        </div>
      )}
    </div>
  );
};

// Storage Tab
const StorageTab = ({ 
  requirements, 
  bulletinId, 
  onUpdate 
}: {
  requirements: ProductStorageRequirement[];
  bulletinId: string;
  onUpdate: () => void;
}) => {
  const [newRequirement, setNewRequirement] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');

  const handleAdd = async () => {
    if (!newRequirement.trim()) return;

    try {
      await api.createStorageRequirement({
        product_bulletin_id: bulletinId,
        requirement: newRequirement,
        sort_order: requirements.length
      });
      setNewRequirement('');
      onUpdate();
    } catch (error) {
      console.error('Error adding requirement:', error);
    }
  };

  const handleEdit = async (id: string) => {
    if (!editingText.trim()) return;

    try {
      await api.updateStorageRequirement(id, { requirement: editingText });
      setEditingId(null);
      setEditingText('');
      onUpdate();
    } catch (error) {
      console.error('Error updating requirement:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this requirement?')) return;

    try {
      await api.deleteStorageRequirement(id);
      onUpdate();
    } catch (error) {
      console.error('Error deleting requirement:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Storage Requirements</h3>
      </div>

      {/* Add New Requirement */}
      <div className="flex space-x-2">
        <input
          type="text"
          value={newRequirement}
          onChange={(e) => setNewRequirement(e.target.value)}
          placeholder="Add a storage requirement..."
          className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
          onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
        />
        <button
          onClick={handleAdd}
          disabled={!newRequirement.trim()}
          className="px-4 py-2 bg-[#0055A3] text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Requirements List */}
      <div className="space-y-3">
        {requirements.sort((a, b) => a.sort_order - b.sort_order).map((requirement) => (
          <div key={requirement.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <Package className="w-5 h-5 text-[#0055A3] flex-shrink-0" />
            
            {editingId === requirement.id ? (
              <div className="flex-1 flex space-x-2">
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  className="flex-1 px-3 py-1 border border-gray-200 rounded focus:outline-none focus:border-[#0055A3]"
                  onKeyPress={(e) => e.key === 'Enter' && handleEdit(requirement.id)}
                />
                <button
                  onClick={() => handleEdit(requirement.id)}
                  className="text-green-600 hover:text-green-800"
                >
                  <Save className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <span className="flex-1 text-gray-900">{requirement.requirement}</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setEditingId(requirement.id);
                      setEditingText(requirement.requirement);
                    }}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(requirement.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {requirements.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Package className="w-12 h-12 mx-auto mb-3" />
          <p>No storage requirements added yet</p>
        </div>
      )}
    </div>
  );
};

// Safety Tab
const SafetyTab = ({ 
  safetyInfo, 
  bulletinId, 
  onUpdate 
}: {
  safetyInfo: ProductSafetyInfo[];
  bulletinId: string;
  onUpdate: () => void;
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'precaution' | 'first_aid'>('precaution');
  const [newInfo, setNewInfo] = useState('');

  const filteredInfo = safetyInfo.filter(info => info.info_type === activeSubTab);

  const handleAdd = async () => {
    if (!newInfo.trim()) return;

    try {
      await api.createSafetyInfo({
        product_bulletin_id: bulletinId,
        info_type: activeSubTab,
        information: newInfo,
        sort_order: filteredInfo.length
      });
      setNewInfo('');
      onUpdate();
    } catch (error) {
      console.error('Error adding safety info:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this safety information?')) return;

    try {
      await api.deleteSafetyInfo(id);
      onUpdate();
    } catch (error) {
      console.error('Error deleting safety info:', error);
    }
  };

  const subTabs = [
    { id: 'precaution', label: 'Safety Precautions', icon: Shield, color: 'text-red-600' },
    { id: 'first_aid', label: 'First Aid', icon: AlertTriangle, color: 'text-orange-600' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Safety Information</h3>
        
        {/* Sub Tabs */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          {subTabs.map((subTab) => (
            <button
              key={subTab.id}
              onClick={() => setActiveSubTab(subTab.id as 'precaution' | 'first_aid')}
              className={`flex items-center px-4 py-2 rounded-md font-medium text-sm transition-colors ${
                activeSubTab === subTab.id
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <subTab.icon className={`w-4 h-4 mr-2 ${subTab.color}`} />
              {subTab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Add New Info */}
      <div className="flex space-x-2">
        <input
          type="text"
          value={newInfo}
          onChange={(e) => setNewInfo(e.target.value)}
          placeholder={`Add ${activeSubTab === 'precaution' ? 'safety precaution' : 'first aid information'}...`}
          className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
          onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
        />
        <button
          onClick={handleAdd}
          disabled={!newInfo.trim()}
          className="px-4 py-2 bg-[#0055A3] text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Info List */}
      <div className="space-y-3">
        {filteredInfo.sort((a, b) => a.sort_order - b.sort_order).map((info) => (
          <div key={info.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            {activeSubTab === 'precaution' ? (
              <Shield className="w-5 h-5 text-red-600 flex-shrink-0" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0" />
            )}
            
            <span className="flex-1 text-gray-900">{info.information}</span>
            <button
              onClick={() => handleDelete(info.id)}
              className="text-red-600 hover:text-red-800"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {filteredInfo.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          {activeSubTab === 'precaution' ? (
            <>
              <Shield className="w-12 h-12 mx-auto mb-3" />
              <p>No safety precautions added yet</p>
            </>
          ) : (
            <>
              <AlertTriangle className="w-12 h-12 mx-auto mb-3" />
              <p>No first aid information added yet</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

// Spec Modal Component
const SpecModal = ({ 
  isOpen, 
  onClose, 
  formData, 
  setFormData, 
  onSave, 
  saving, 
  isEditing 
}: {
  isOpen: boolean;
  onClose: () => void;
  formData: any;
  setFormData: (data: any) => void;
  onSave: () => void;
  saving: boolean;
  isEditing: boolean;
}) => {
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
              {isEditing ? 'Edit Specification' : 'Add Specification'}
            </h3>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Property *</label>
              <input
                type="text"
                value={formData.property}
                onChange={(e) => setFormData(prev => ({ ...prev, property: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                placeholder="e.g., Viscosity, Coverage, Drying Time"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Value *</label>
              <input
                type="text"
                value={formData.value}
                onChange={(e) => setFormData(prev => ({ ...prev, value: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                placeholder="e.g., 85-95 KU, 12-14 m²/L"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Standard</label>
              <input
                type="text"
                value={formData.standard}
                onChange={(e) => setFormData(prev => ({ ...prev, standard: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                placeholder="e.g., ASTM D562, ISO 2813"
              />
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

          <div className="flex items-center justify-end space-x-3 p-6 border-t bg-gray-50">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={onSave}
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

export default ProductBulletinManager;