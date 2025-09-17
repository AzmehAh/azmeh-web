import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../../lib/supabase';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface BulletinFormProps {
  bulletin?: any;
  onClose: () => void;
  onSave: () => void;
}

export default function BulletinForm({ bulletin, onClose, onSave }: BulletinFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    short_description: '',
    cover_image: '',
    category: '',
    subcategory: '',
    content: '',
    contact: '', // إضافة حقل contact
    status: 'published',
    featured: false,
    author: 'Al Azmeh Paints',
    tags: [] as string[]
  });
  
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const quillRef = useRef<ReactQuill>(null);
  const contactQuillRef = useRef<ReactQuill>(null); // مرجع لمحرر contact

  useEffect(() => {
    if (bulletin) {
      setFormData({
        ...bulletin,
        content: typeof bulletin.content === 'string' ? bulletin.content : JSON.stringify(bulletin.content),
        contact: bulletin.contact || '', // تهيئة حقل contact
        tags: bulletin.tags || []
      });
    }
  }, [bulletin]);

  // Custom image handler for Quill editor
  const imageHandler = (quillRef: React.RefObject<ReactQuill>) => {
    return () => {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');
      input.click();

      input.onchange = async () => {
        if (input.files && input.files[0]) {
          const file = input.files[0];
          await uploadImageToEditor(file, quillRef);
        }
      };
    };
  };

  // Upload image for rich text editor
  const uploadImageToEditor = async (file: File, quillRef: React.RefObject<ReactQuill>) => {
    try {
      setUploadingImage(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `bulletin-content-${Date.now()}.${fileExt}`;
      const filePath = `bulletins/content/${fileName}`;

      const { data, error } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      // Insert image into editor
      const quill = quillRef.current?.getEditor();
      if (quill) {
        const range = quill.getSelection();
        if (range) {
          quill.insertEmbed(range.index, 'image', publicUrl);
        }
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image');
    } finally {
      setUploadingImage(false);
    }
  };

  // Upload cover image
  const uploadCoverImage = async (file: File) => {
    try {
      setUploadingImage(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `bulletin-cover-${Date.now()}.${fileExt}`;
      const filePath = `bulletins/covers/${fileName}`;

      const { data, error } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      setFormData(prev => ({ ...prev, cover_image: publicUrl }));
    } catch (error) {
      console.error('Error uploading cover image:', error);
      alert('Error uploading cover image');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      uploadCoverImage(e.target.files[0]);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData(prev => ({
      ...prev,
      title,
      slug: !bulletin ? generateSlug(title) : prev.slug
    }));
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(',').map(tag => tag.trim()).filter(Boolean);
    setFormData(prev => ({ ...prev, tags }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const bulletinData = {
        ...formData,
        content: formData.content || '',
        contact: formData.contact || '' // تضمين حقل contact
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
      setLoading(false);
    }
  };

  // Quill modules configuration
  const getModules = (quillRef: React.RefObject<ReactQuill>) => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'font': [] }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        [{ 'align': [] }],
        ['blockquote', 'code-block'],
        ['link', 'image', 'video'],
        ['clean'],
        [{ 'table': 'TD' }]
      ],
      handlers: {
        image: imageHandler(quillRef)
      }
    },
    table: true
  });

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'list', 'bullet', 'indent',
    'align', 'blockquote', 'code-block',
    'link', 'image', 'video',
    'table'
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[95vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">
            {bulletin ? 'Edit Bulletin' : 'Create New Bulletin'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={handleTitleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Slug *
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cover Image
              </label>
              <div className="flex items-center space-x-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleCoverImageChange}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingImage}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                >
                  {uploadingImage ? 'Uploading...' : 'Upload Image'}
                </button>
                {formData.cover_image && (
                  <div className="flex items-center space-x-2">
                    <img
                      src={formData.cover_image}
                      alt="Cover preview"
                      className="w-16 h-16 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, cover_image: '' }))}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div> 
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Short Description
              </label>
              <textarea
                value={formData.short_description}
                onChange={(e) => setFormData(prev => ({ ...prev, short_description: e.target.value }))}
                rows={3}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subcategory *
                </label>
                <input
                  type="text"
                  value={formData.subcategory}
                  onChange={(e) => setFormData(prev => ({ ...prev, subcategory: e.target.value }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Content *
              </label>
              <div className="border border-gray-300 rounded-md">
                <ReactQuill
                  ref={quillRef}
                  value={formData.content}
                  onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                  modules={getModules(quillRef)}
                  formats={formats}
                  style={{ height: '300px' }}
                />
              </div>
            </div>

            {/* إضافة محرر Contact */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Information
              </label>
              <div className="border border-gray-300 rounded-md">
                <ReactQuill
                  ref={contactQuillRef}
                  value={formData.contact}
                  onChange={(contact) => setFormData(prev => ({ ...prev, contact }))}
                  modules={getModules(contactQuillRef)}
                  formats={formats}
                  style={{ height: '250px' }}
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Add contact information, addresses, phone numbers, maps, or any other contact details here.
              </p>
            </div>

            <div className="pt-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Author
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-end">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Featured</span>
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={formData.tags.join(', ')}
                onChange={handleTagsChange}
                placeholder="tag1, tag2, tag3"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}