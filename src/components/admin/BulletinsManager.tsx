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
  Eye,
  Star,
  Calendar,
  Tag
} from 'lucide-react';
import { supabase, Bulletin } from '../../lib/supabase';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// Import BetterTable dynamically to ensure Quill is available
let BetterTable = null;
let Quill = null;

if (typeof window !== 'undefined') {
  import('quill-better-table').then(module => {
    BetterTable = module.default;
    Quill = ReactQuill.Quill || window.Quill;
    
    if (Quill && BetterTable) {
      Quill.register({
        'modules/better-table': BetterTable
      }, true);
    }
  });
  import('quill-better-table/dist/quill-better-table.css');
}

const BulletinsManager = () => {
  const [bulletins, setBulletins] = useState([]);
  const [filteredBulletins, setFilteredBulletins] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedBulletin, setSelectedBulletin] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    fetchBulletins();
  }, []);

  useEffect(() => {
    let filtered = bulletins;

    if (searchTerm) {
      filtered = filtered.filter(bulletin =>
        bulletin.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bulletin.short_description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
      const { data, error } = await supabase
        .from('bulletins')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBulletins(data || []);
    } catch (error) {
      console.error('Error fetching bulletins:', error);
    } finally {
      setLoading(false);
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

  const openModal = (bulletin = null, editing = false) => {
    setSelectedBulletin(bulletin);
    setIsEditing(editing);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedBulletin(null);
    setIsEditing(false);
    setIsModalOpen(false);
  };

  const categories = [...new Set(bulletins.map(b => b.category))];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0055A3]"></div>
      </div>
    );
  }

  const quillModules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image", "video"],
        ["clean"],
        ...(BetterTable ? [["better-table"]] : []),
      ],
    },
    ...(BetterTable ? {
      "better-table": {
        operationMenu: {
          items: {
            unmergeCells: {
              text: "Unmerge cells",
            },
          },
        },
      },
      keyboard: {
        bindings: BetterTable.keyboardBindings,
      },
    } : {}),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Technical Bulletins</h1>
          <p className="text-gray-600">Manage technical bulletins and system documentation</p>
        </div>
        <button
          onClick={() => openModal(null, true)}
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
                  onClick={() => openModal(bulletin, false)}
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
                  onClick={() => openModal(bulletin, true)}
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

      {/* No bulletins message */}
      {filteredBulletins.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No bulletins found</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm ? 'Try adjusting your search terms' : 'Get started by adding your first technical bulletin'}
          </p>
          {!searchTerm && (
            <button
              onClick={() => openModal(null, true)}
              className="flex items-center mx-auto px-4 py-2 bg-[#0055A3] text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Bulletin
            </button>
          )}
        </div>
      )}

      {/* Bulletin Modal */}
      <BulletinModal
        isOpen={isModalOpen}
        onClose={closeModal}
        bulletin={selectedBulletin}
        isEditing={isEditing}
        onSave={fetchBulletins}
      />
    </div>
  );
};

// Bulletin Modal Component
const BulletinModal = ({ 
  isOpen, 
  onClose, 
  bulletin, 
  isEditing, 
  onSave 
}) => {
  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    short_description: '',
    cover_image: '',
    category: '',
    subcategory: '',
    content: '',
    status: 'draft',
    featured: false,
    author: 'Al Azmeh Paints',
    tags: ''
  });
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    if (bulletin) {
      setFormData({
        slug: bulletin.slug,
        title: bulletin.title,
        short_description: bulletin.short_description || '',
        cover_image: bulletin.cover_image || '',
        category: bulletin.category,
        subcategory: bulletin.subcategory,
        content: typeof bulletin.content === 'string' ? bulletin.content : '',
        status: bulletin.status || 'draft',
        featured: bulletin.featured || false,
        author: bulletin.author || 'Al Azmeh Paints',
        tags: bulletin.tags ? bulletin.tags.join(', ') : ''
      });
    } else {
      setFormData({
        slug: '',
        title: '',
        short_description: '',
        cover_image: '',
        category: '',
        subcategory: '',
        content: '',
        status: 'draft',
        featured: false,
        author: 'Al Azmeh Paints',
        tags: ''
      });
    }
  }, [bulletin]);

  // Custom image handler for rich text editor
  const imageHandler = async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      if (input.files && input.files[0]) {
        const file = input.files[0];
        await uploadImageToEditor(file);
      }
    };
  };

  // Upload image for rich text editor
  const uploadImageToEditor = async (file) => {
    try {
      setUploadingImage(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `bulletin-content-${Date.now()}.${fileExt}`;
      const filePath = `bulletins/content/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      // Insert image into editor at cursor position
      const quill = (document.querySelector('.ql-editor')?.__quill);
      if (quill) {
        const range = quill.getSelection(true);
        quill.insertEmbed(range.index, 'image', publicUrl);
        quill.setSelection(range.index + 1);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image to editor');
    } finally {
      setUploadingImage(false);
    }
  };

  // Quill modules configuration for rich text editing
  const quillModules = React.useMemo(() => {
    const baseModules = {
      toolbar: {
        container: [
          [{ 'header': [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          ['blockquote', 'code-block'],
          ['link', 'image'],
          ['clean']
        ],
        handlers: {
          image: imageHandler
        }
      }
    };
    
    // Only add better-table if it's available
    if (BetterTable) {
      return {
        ...baseModules,
        'better-table': {
          operationMenu: {
            color: {
              colors: ['#000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466'],
              text: 'Background Colors:'
            },
            items: {
              unmergeCells: {
                text: 'Unmerge cells'
              },
              insertColumnRight: {
                text: 'Insert column right'
              },
              insertColumnLeft: {
                text: 'Insert column left'
              },
              insertRowUp: {
                text: 'Insert row above'
              },
              insertRowDown: {
                text: 'Insert row below'
              },
              mergeCells: {
                text: 'Merge cells'
              },
              deleteColumn: {
                text: 'Delete column'
              },
              deleteRow: {
                text: 'Delete row'
              },
              deleteTable: {
                text: 'Delete table'
              }
            }
          },
          toolbarTable: {
            tip: 'Insert Table',
            tipSize: 'Size'
          }
        },
        keyboard: {
          bindings: BetterTable?.keyboardBindings || {}
        },
        table: false
      };
    }
    
    return baseModules;
  }, []);

  const quillFormats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'blockquote', 'code-block',
    'link', 'image',
    ...(BetterTable ? ['better-table'] : [])
  ];

  const handleSave = async () => {
    setSaving(true);
    try {
      const bulletinData = {
        slug: formData.slug,
        title: formData.title,
        short_description: formData.short_description || null,
        cover_image: formData.cover_image || null,
        category: formData.category,
        subcategory: formData.subcategory,
        content: formData.content,
        status: formData.status,
        featured: formData.featured,
        author: formData.author,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [],
        updated_at: new Date().toISOString()
      };

      if (bulletin) {
        const { error } = await supabase
          .from('bulletins')
          .update(bulletinData)
          .eq('id', bulletin.id);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('bulletins')
          .insert([bulletinData]);
        
        if (error) throw error;
      }

      onSave();
      onClose();
    } catch (error) {
      console.error('Error saving bulletin:', error);
      alert('Error saving bulletin');
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
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">
              {isEditing ? (bulletin ? 'Edit Bulletin' : 'Add Bulletin') : 'View Bulletin'}
            </h3>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-140px)] p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Info */}
              <div className="space-y-4">
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Slug *</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                    />
                  ) : (
                    <p className="text-gray-900">{formData.slug}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                  {isEditing ? (
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                    >
                      <option value="">Select Category</option>
                      <option value="Paint Systems">Paint Systems</option>
                      <option value="Technical Solutions">Technical Solutions</option>
                    </select>
                  ) : (
                    <p className="text-gray-900">{formData.category}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subcategory *</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.subcategory}
                      onChange={(e) => setFormData(prev => ({ ...prev, subcategory: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                    />
                  ) : (
                    <p className="text-gray-900">{formData.subcategory}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image URL</label>
                  {isEditing ? (
                    <input
                      type="url"
                      value={formData.cover_image}
                      onChange={(e) => setFormData(prev => ({ ...prev, cover_image: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                    />
                  ) : (
                    <p className="text-gray-900">{formData.cover_image}</p>
                  )}
                </div>
              </div>

              {/* Additional Info */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.author}
                      onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                    />
                  ) : (
                    <p className="text-gray-900">{formData.author}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma-separated)</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                      placeholder="coating, automotive, protection"
                    />
                  ) : (
                    <p className="text-gray-900">{formData.tags}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  {isEditing ? (
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  ) : (
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      formData.status === 'published' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {formData.status}
                    </span>
                  )}
                </div>

                {isEditing && (
                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.featured}
                        onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                        className="w-4 h-4 text-[#0055A3] border-gray-300 rounded focus:ring-[#0055A3]"
                      />
                      <span className="ml-2 text-sm text-gray-700">Featured bulletin</span>
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* Short Description */}
            <div className="px-6 pb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Short Description</label>
              {isEditing ? (
                <textarea
                  value={formData.short_description}
                  onChange={(e) => setFormData(prev => ({ ...prev, short_description: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                />
              ) : (
                <p className="text-gray-900">{formData.short_description}</p>
              )}
            </div>

            {/* Content */}
            <div className="px-6 pb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content *
              </label>
              {isEditing ? (
                <>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    {uploadingImage && (
                      <div className="bg-blue-50 p-2 text-sm text-blue-700 border-b">
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                          Uploading image...
                        </div>
                      </div>
                    )}
                    <ReactQuill
                      theme="snow"
                      value={formData.content}
                      onChange={(value) =>
                        setFormData((prev) => ({ ...prev, content: value }))
                      }
                      modules={quillModules}  
                      formats={quillFormats}   
                      className="h-96"         
                      placeholder="Start writing your bulletin content... Use the toolbar to format text, insert images, and create tables."
                    />
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    <p>To insert a table: Use the table icon in the toolbar or right-click in the editor for table options.</p>
                  </div>
                </>
              ) : (
                <div className="prose max-w-none bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <div dangerouslySetInnerHTML={{ __html: formData.content }} />
                </div>
              )}
            </div>

            {/* Padding إضافي وقت التحرير */}
            {isEditing && <div className="pt-16"></div>}
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
                    Save Bulletin 
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

export default BulletinsManager;