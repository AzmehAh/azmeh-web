import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Save, 
  X, 
  Upload,
  ArrowLeft
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import BilingualInput from './BilingualInput'; // تأكد من وجوده

const BulletinForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const location = useLocation();
  const isEditing = location.pathname.includes('edit');
  const isViewOnly = !isEditing && id; 

  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    title_ar: '',
    short_description: '',
    short_description_ar: '',
    cover_image: '',
    category: '',
    subcategory: '',
    content: '',
    content_ar: '',
    status: 'draft',
    featured: false,
    author: 'Al Azmeh Paints',
    tags: ''
  });
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
 const [categoryOptions, setCategoryOptions] = useState([]);
  const [bulletin, setBulletin] = useState(null);
  const [loading, setLoading] = useState(!!id);
  const quillRef = useRef(null);
  const quillRefAr = useRef(null); // مرجع منفصل للمحرر العربي
  
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [imageWidth, setImageWidth] = useState('');
  const [imageHeight, setImageHeight] = useState('');
  const [allBulletins, setAllBulletins] = useState([]);
  const [selectedRelatedIds, setSelectedRelatedIds] = useState<string[]>([]);

  // جلب جميع البلتينات للاختيار منها (لـ Related)
  useEffect(() => {
    const fetchAllBulletins = async () => {
      try {
        const { data, error } = await supabase
          .from('bulletins')
          .select('id, title, slug')
          .eq('status', 'published')
          .order('created_at', { ascending: false });

        if (error) throw error;

        const filtered = data.filter(b => b.id !== id);
        setAllBulletins(filtered);

        if (bulletin?.related_bulletin_ids) {
          setSelectedRelatedIds(bulletin.related_bulletin_ids);
        }
      } catch (error) {
        console.error('Error fetching bulletins for related selection:', error);
      }
    };

    if (isEditing || !id) {
      fetchAllBulletins();
    }
  }, [id, isEditing, bulletin]);

  useEffect(() => {
    const fetchBulletin = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('bulletins')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setBulletin(data);
        setFormData({
          slug: data.slug,
          title: data.title,
          title_ar: data.title_ar || '',
          short_description: data.short_description || '',
          short_description_ar: data.short_description_ar || '',
          cover_image: data.cover_image || '',
          category: data.category,
          subcategory: data.subcategory,
          content: typeof data.content === 'string' ? data.content : '',
          content_ar: typeof data.content_ar === 'string' ? data.content_ar : '',
          status: data.status || 'draft',
          featured: data.featured || false,
          author: data.author || 'Al Azmeh Paints',
          tags: data.tags ? data.tags.join(', ') : ''
        });
      } catch (error) {
        console.error('Error fetching bulletin:', error);
        alert('Failed to load bulletin');
        navigate('/bulletins');
      } finally {
        setLoading(false);
      }
    };

    fetchBulletin();
  }, [id, navigate]);

  // جلب التصنيفات
 // جلب التصنيفات مع الترجمة العربية
useEffect(() => {
  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('bulletin_categories_config')
        .select('name, name_ar')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) throw error;

      if (data && data.length > 0) {
        setCategoryOptions(data);
      } else {
        // fallback: جلب من المقالات إذا لم يوجد تكوين
        const { data: bulletinsData } = await supabase
          .from('bulletins')
          .select('category')
          .not('category', 'is', null);

        if (bulletinsData) {
          const uniqueCategories = [...new Set(bulletinsData.map(b => b.category))].filter(Boolean);
          // لا يوجد ترجمة عربية في هذه الحالة، لذا نستخدم نفس الاسم مرتين
          const fallbackOptions = uniqueCategories.map(cat => ({ name: cat, name_ar: cat }));
          setCategoryOptions(fallbackOptions);
        } else {
          setCategoryOptions([]);
        }
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategoryOptions([]);
    }
  };

  fetchCategories();
}, []);

  // Upload image to storage
  const uploadImage = async (file, path) => {
    try {
      if (!file || !file.type.startsWith('image/')) {
        alert('Please select a valid image file');
        return null;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return null;
      }
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `${path}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('system-media')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('system-media')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image: ' + error.message);
      return null;
    }
  };

  // Handle cover image upload
  const handleCoverImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploadingCover(true);
      const imageUrl = await uploadImage(file, 'bulletins/covers');
      if (imageUrl) {
        setFormData(prev => ({ ...prev, cover_image: imageUrl }));
      }
    } catch (error) {
      console.error('Error uploading cover image:', error);
      alert('Failed to upload cover image');
    } finally {
      setUploadingCover(false);
    }
  };

  // دالة لمعالجة رفع الصورة في المحرر (الإنجليزي)
  const imageHandlerEn = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      if (input.files && input.files[0]) {
        setSelectedImageFile(input.files[0]);
        setImageWidth('');
        setImageHeight('');
        setImageModalOpen(true);
      }
    };
  }, []);

  // دالة لمعالجة رفع الصورة في المحرر (العربي)
  const imageHandlerAr = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      if (input.files && input.files[0]) {
        setSelectedImageFile(input.files[0]);
        setImageWidth('');
        setImageHeight('');
        setImageModalOpen(true);
      }
    };
  }, []);

  // دالة لإدراج الصورة بعد تحديد الأبعاد
  const handleInsertImageWithDimensions = async () => {
    if (!selectedImageFile) {
      alert('No image selected');
      return;
    }

    try {
      setUploadingImage(true);
      setImageModalOpen(false);

      const imageUrl = await uploadImage(selectedImageFile, 'bulletins/content');
      if (!imageUrl) {
        alert('Failed to upload image.');
        return;
      }

      let styleAttr = '';
      if (imageWidth) styleAttr += `width: ${imageWidth}; `;
      if (imageHeight) styleAttr += `height: ${imageHeight}; `;
      let imgTag = `<img src="${imageUrl}" ${styleAttr ? `style="${styleAttr}"` : ''} />`;

      // إدراج في المحرر الإنجليزي إذا كان نشطًا
      if (quillRef.current) {
        const quill = quillRef.current.getEditor();
        if (quill) {
          const range = quill.getSelection();
          const position = range ? range.index : quill.getLength();
          quill.clipboard.dangerouslyPasteHTML(position, imgTag);
          quill.setSelection(position + 1, 0);
        }
      }

      // إدراج في المحرر العربي إذا كان نشطًا
      if (quillRefAr.current) {
        const quill = quillRefAr.current.getEditor();
        if (quill) {
          const range = quill.getSelection();
          const position = range ? range.index : quill.getLength();
          quill.clipboard.dangerouslyPasteHTML(position, imgTag);
          quill.setSelection(position + 1, 0);
        }
      }

      setSelectedImageFile(null);
      setImageWidth('');
      setImageHeight('');
    } catch (error) {
      console.error('Error inserting image with dimensions:', error);
      alert('Error: ' + (error.message || 'Unknown error'));
    } finally {
      setUploadingImage(false);
    }
  };

  const quillModulesEn = useMemo(() => ({
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
        image: imageHandlerEn 
      }
    }
  }), [imageHandlerEn]);

  const quillModulesAr = useMemo(() => ({
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
        image: imageHandlerAr 
      }
    }
  }), [imageHandlerAr]);

  const quillFormats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'blockquote', 'code-block',
    'link', 'image'
  ];

  const handleSave = async () => {
    if (!formData.title || !formData.slug || !formData.category || !formData.subcategory || !formData.content) {
      alert('Please fill in all required fields (title, slug, category, subcategory, content)');
      return;
    }

    setSaving(true);
    try {
      const bulletinData = {
        slug: formData.slug,
        title: formData.title,
        title_ar: formData.title_ar || null,
        short_description: formData.short_description || null,
        short_description_ar: formData.short_description_ar || null,
        cover_image: formData.cover_image || null,
        category: formData.category,
        subcategory: formData.subcategory,
        content: formData.content,
        content_ar: formData.content_ar || null,
        status: formData.status,
        featured: formData.featured,
        author: formData.author,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '') : [],
        updated_at: new Date().toISOString(),
        related_bulletin_ids: selectedRelatedIds.length > 0 ? selectedRelatedIds : null
      };

      if (id) {
        const { error } = await supabase
          .from('bulletins')
          .update(bulletinData)
          .eq('id', id);
        
        if (error) throw error;
      } else {
        bulletinData.created_at = new Date().toISOString();
        const { error } = await supabase
          .from('bulletins')
          .insert([bulletinData]);
        
        if (error) throw error;
      }

     

      navigate('/admin/bulletins');
    } catch (error) {
      console.error('Error saving bulletin:', error);
      alert('Error saving bulletin: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin/bulletins');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0055A3]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <button
              onClick={handleCancel}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to List
            </button>
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
              {id ? 
                (isEditing ? 'Edit Bulletin' : 'View Bulletin') 
                : 'Add New Bulletin'
              }
            </h3>
          </div>

          {/* Content - بدون تقسيم إلى عمودين */}
          <div className="overflow-y-auto max-h-[calc(100vh-200px)] p-6 space-y-6">
             {/* Title - English and Arabic side by side */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              {isEditing || !id ? (
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                      placeholder="Title (English)"
                    />
                  </div>
                  <div className="flex-1" dir="rtl">
                    <input
                      type="text"
                      value={formData.title_ar}
                      onChange={(e) => setFormData(prev => ({ ...prev, title_ar: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                      placeholder="العنوان (العربية)"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-4">
                  <p className="flex-1 text-gray-900">{formData.title}</p>
                  <p className="flex-1 text-gray-900" dir="rtl">{formData.title_ar}</p>
                </div>
              )}
            </div>
            {/* Slug */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Slug *</label>
              {isEditing || !id ? (
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                  placeholder="unique-identifier"
                />
              ) : (
                <p className="text-gray-900">{formData.slug}</p>
              )}
            </div>

           

         {/* Category */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
  {isEditing || !id ? (
    <select
      value={formData.category}
      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
    >
      <option value="">Select a category</option>
      {categoryOptions.map(cat => (
        <option key={cat.name} value={cat.name}>
          {cat.name_ar} / {cat.name}
        </option>
      ))}
    </select>
  ) : (
    <p className="text-gray-900">
      {categoryOptions.find(c => c.name === formData.category)?.name_ar || formData.category} / {formData.category}
    </p>
  )}
</div>

            {/* Subcategory */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subcategory *</label>
              {isEditing || !id ? (
                <input 
                  type="text"
                  value={formData.subcategory}
                  onChange={(e) => setFormData(prev => ({ ...prev, subcategory: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                  placeholder="Enter subcategory"
                />
              ) : (
                <p className="text-gray-900">{formData.subcategory}</p>
              )}
            </div>

            {/* Short Description - Bilingual */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Short Description
              </label>
              {isEditing || !id ? (
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <textarea
                      value={formData.short_description}
                      onChange={(e) => setFormData(prev => ({ ...prev, short_description: e.target.value }))}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                      placeholder="Short description (English)"
                    />
                  </div>
                  <div className="flex-1" dir="rtl">
                    <textarea
                      value={formData.short_description_ar}
                      onChange={(e) => setFormData(prev => ({ ...prev, short_description_ar: e.target.value }))}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                      placeholder="وصف مختصر (العربية)"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-4">
                  <p className="flex-1 text-gray-900">{formData.short_description || '—'}</p>
                  <p className="flex-1 text-gray-900" dir="rtl">{formData.short_description_ar || '—'}</p>
                </div>
              )}
            </div>

            {/* Cover Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cover Image
              </label>
              {isEditing || !id ? (
                <div className="space-y-2">
                  {formData.cover_image && (
                    <div className="relative w-full h-32 rounded border overflow-hidden">
                      <img
                        src={formData.cover_image}
                        alt="Cover preview" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <label className="flex items-center px-4 py-2 bg-[#0055A3] text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors w-fit">
                    <Upload className="w-4 h-4 mr-2" />
                    {uploadingCover ? 'Uploading...' : 'Upload Cover Image'}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCoverImageUpload}
                      className="hidden"
                      disabled={uploadingCover}
                    />
                  </label>
                </div>
              ) : (
                formData.cover_image ? (
                  <img
                    src={formData.cover_image}
                    alt="Cover"
                    className="w-full h-32 object-cover rounded border"
                  />
                ) : (
                  <p className="text-gray-500">No cover image</p>
                )
              )}
            </div>

            {/* Author */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
              {isEditing || !id ? (
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

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma-separated)</label>
              {isEditing || !id ? (
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

        {/* Related Bulletins */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Related Bulletins
  </label>
  {isEditing || !id ? (
    <div className="space-y-2 max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-2">
      {allBulletins.length > 0 ? (
        allBulletins.map((bulletinItem) => (
          <label key={bulletinItem.id} className="flex items-start space-x-3">
            <input
              type="checkbox"
              checked={selectedRelatedIds.includes(bulletinItem.id)}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedRelatedIds(prev => [...prev, bulletinItem.id]);
                } else {
                  setSelectedRelatedIds(prev => prev.filter(id => id !== bulletinItem.id));
                }
              }}
              className="mt-1 w-4 h-4 text-[#0055A3] rounded focus:ring-[#0055A3]"
            />
            <span className="text-sm text-gray-800">
              <span className="font-medium">{bulletinItem.title}</span> 
              <span className="text-gray-500 ml-2">({bulletinItem.slug})</span>
            </span>
          </label>
        ))
      ) : (
        <p className="text-sm text-gray-500 italic">No published bulletins available.</p>
      )}
    </div>
  ) : (
    <div className="space-y-1">
      {bulletin?.related_bulletin_ids && bulletin.related_bulletin_ids.length > 0 ? (
        bulletin.related_bulletin_ids.map((relId) => {
          const rel = allBulletins.find(b => b.id === relId);
          return rel ? (
            <div key={relId} className="text-gray-900">
              {rel.title} <span className="text-gray-500">({rel.slug})</span>
            </div>
          ) : null;
        })
      ) : (
        <p className="text-gray-500">—</p>
      )}
    </div>
  )}
</div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              {isEditing || !id ? (
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

            {/* Featured */}
            {(isEditing || !id) && (
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

            {/* Content - Bilingual */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content *
              </label>
              {isEditing || !id ? (
                <div className="space-y-4">
                  {/* English */}
                  <div>
                    <div className="text-xs text-gray-500 mb-1">English</div>
                    {uploadingImage && (
                      <div className="bg-blue-50 p-2 text-sm text-blue-700 rounded mb-2 flex items-center">
                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-600 mr-2"></div>
                        Uploading image...
                      </div>
                    )}
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <ReactQuill
                        ref={quillRef}
                        theme="snow"
                        value={formData.content}
                        onChange={(value) => setFormData(prev => ({ ...prev, content: value }))}
                        modules={quillModulesEn}
                        formats={quillFormats}
                        placeholder="Write content in English..."
                      />
                    </div>
                  </div>

                  {/* Arabic */}
                  <div dir="rtl">
                    <div className="text-xs text-gray-500 mb-1">العربية</div>
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <ReactQuill
                        ref={quillRefAr}
                        theme="snow"
                        value={formData.content_ar}
                        onChange={(value) => setFormData(prev => ({ ...prev, content_ar: value }))}
                        modules={quillModulesAr}
                        formats={quillFormats}
                        placeholder="اكتب المحتوى بالعربية..."
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">English</div>
                    <div className="prose max-w-none bg-gray-50 p-4 rounded border">
                      {formData.content ? (
                        <div dangerouslySetInnerHTML={{ __html: formData.content }} />
                      ) : (
                        <p className="text-gray-500 italic">—</p>
                      )}
                    </div>
                  </div>
                  <div dir="rtl">
                    <div className="text-xs text-gray-500 mb-1">العربية</div>
                    <div className="prose max-w-none bg-gray-50 p-4 rounded border">
                      {formData.content_ar ? (
                        <div dangerouslySetInnerHTML={{ __html: formData.content_ar }} />
                      ) : (
                        <p className="text-gray-500 italic">—</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            {(isEditing || !id) && (
              <div className="flex items-center justify-end space-x-3 pt-6 border-t bg-gray-50">
                <button
                  onClick={handleCancel}
                  className="px-6 py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-6 py-3 bg-[#0055A3] text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center font-medium"
                >
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5 mr-2" />
                      Save Bulletin
                    </>
                  )}
                </button> 
              </div>
            )}

            {id && !isEditing && (
              <div className="flex items-center justify-center pt-6 border-t bg-gray-50">
                <button
                  onClick={handleCancel}
                  className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-medium"
                >
                  Back to List
                </button>
              </div>
            )}

            {/* Image Modal */}
            {imageModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg p-6 w-full max-w-md">
                  <h3 className="text-lg font-semibold mb-4">Set Image Dimensions</h3>
                  {selectedImageFile && (
                    <div className="mb-4 text-center">
                      <p className="text-sm text-gray-600 mb-2">Selected: {selectedImageFile.name}</p>
                      <img 
                        src={URL.createObjectURL(selectedImageFile)} 
                        alt="Preview" 
                        className="max-h-40 mx-auto rounded border"
                      />
                    </div>
                  )}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Width (px or %)</label>
                      <input
                        type="text"
                        value={imageWidth}
                        onChange={(e) => setImageWidth(e.target.value)}
                        placeholder="e.g., 300 or 50%"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#0055A3]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Height (px or %)</label>
                      <input
                        type="text"
                        value={imageHeight}
                        onChange={(e) => setImageHeight(e.target.value)}
                        placeholder="e.g., 200 or auto"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#0055A3]"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-3 mt-6">
                    <button
                      onClick={() => setImageModalOpen(false)}
                      className="px-4 py-2 text-gray-700 border border-gray-300 rounded hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleInsertImageWithDimensions}
                      className="px-4 py-2 bg-[#0055A3] text-white rounded hover:bg-blue-700"
                    >
                      Insert Image
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BulletinForm;