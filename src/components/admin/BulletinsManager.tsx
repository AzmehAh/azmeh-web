import React, { useState, useEffect, useRef } from 'react';
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
  Tag,
  Upload,
  Image as ImageIcon
} from 'lucide-react';
import { supabase, Bulletin } from '../../lib/supabase';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const BulletinsManager = () => {
  // ... (الكود السابق يبقى كما هو حتى مكون BulletinModal)
};

// مكون Modal مع التحسينات
const BulletinModal = ({ 
  isOpen, 
  onClose, 
  bulletin, 
  isEditing, 
  onSave 
}: {
  isOpen: boolean;
  onClose: () => void;
  bulletin: Bulletin | null;
  isEditing: boolean;
  onSave: () => void;
}) => {
  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    short_description: '',
    cover_image: '',
    category: '',
    subcategory: '',
    content: '',
    status: 'draft' as const,
    featured: false,
    author: 'Al Azmeh Paints',
    tags: ''
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const quillRef = useRef<any>(null);

  useEffect(() => {
    if (bulletin) {
      setFormData({
        slug: bulletin.slug,
        title: bulletin.title,
        short_description: bulletin.short_description || '',
        cover_image: bulletin.cover_image || '',
        category: bulletin.category,
        subcategory: bulletin.subcategory,
        content: typeof bulletin.content === 'string' 
          ? bulletin.content 
          : JSON.stringify(bulletin.content),
        status: bulletin.status as 'draft' | 'published',
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

  // دالة لتحميل الصور إلى Supabase
  const uploadImage = async (file: File) => {
    try {
      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `bulletins/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('bulletins-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('bulletins-images')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image');
      return null;
    } finally {
      setUploading(false);
    }
  };

  // إضافة وحدة تحميل الصور إلى ReactQuill
  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      if (!input.files) return;
      const file = input.files[0];
      
      if (file) {
        const imageUrl = await uploadImage(file);
        if (imageUrl && quillRef.current) {
          const quill = quillRef.current.getEditor();
          const range = quill.getSelection();
          quill.insertEmbed(range.index, 'image', imageUrl);
        }
      }
    };
  };

  // تكوين الوحدات الخاصة بمحرر النصوص
  const modules = {
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        ['link', 'image'],
        ['clean']
      ],
      handlers: {
        image: imageHandler
      }
    }
  };

  const handleSave = async () => {
    if (!formData.title || !formData.slug || !formData.category || !formData.subcategory) {
      alert('Please fill all required fields');
      return;
    }

    setSaving(true);
    try {
      const bulletinData = {
        slug: formData.slug,
        title: formData.title,
        short_description: formData.short_description || null,
        cover_image: formData.cover_image || null,
        category: formData.category,
        subcategory: formData.subcategory,
        content: formData.content, // HTML content مباشرة
        status: formData.status,
        featured: formData.featured,
        author: formData.author,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [],
        updated_at: new Date().toISOString(),
      };

      if (bulletin) {
        // تحديث النشرة الحالية
        const { error } = await supabase
          .from('bulletins')
          .update(bulletinData)
          .eq('id', bulletin.id);
        if (error) throw error;
      } else {
        // إضافة نشرة جديدة
        const { error } = await supabase
          .from('bulletins')
          .insert([{ ...bulletinData, created_at: new Date().toISOString() }]);
        if (error) throw error;
      }

      onSave();
      onClose();
      alert('Bulletin saved successfully!');
    } catch (error: any) {
      console.error('Error saving bulletin:', error);
      alert(`Error saving bulletin: ${error.message}`);
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
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={formData.cover_image}
                        onChange={(e) => setFormData(prev => ({ ...prev, cover_image: e.target.value }))}
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                        placeholder="أو قم بتحميل صورة"
                      />
                      <label className="flex items-center px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-200">
                        <Upload className="w-4 h-4 mr-1" />
                        Upload
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={async (e) => {
                            if (e.target.files && e.target.files[0]) {
                              const url = await uploadImage(e.target.files[0]);
                              if (url) {
                                setFormData(prev => ({ ...prev, cover_image: url }));
                              }
                            }
                          }}
                        />
                      </label>
                    </div>
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
                      onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as 'draft' | 'published' }))}
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
            <div className="mt-6">
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
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
              {isEditing ? (
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <ReactQuill
                    ref={quillRef}
                    value={formData.content}
                    onChange={(value) => setFormData(prev => ({ ...prev, content: value }))}
                    theme="snow"
                    modules={modules}
                    style={{ height: '300px' }}
                  />
                  {uploading && (
                    <div className="p-2 bg-blue-50 text-blue-700 text-sm flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-700 mr-2"></div>
                      جاري تحميل الصورة...
                    </div>
                  )}
                </div>
              ) : (
                <div
                  className="prose max-w-none bg-gray-50 p-4 rounded-lg"
                  dangerouslySetInnerHTML={{ __html: formData.content }}
                />
              )}
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