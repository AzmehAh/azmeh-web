import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useNavigate, useParams } from 'react-router-dom';
import { Tab } from './Tab';
import { GeneralTab } from './GeneralTab';
import { ApplicationTab } from './ApplicationTab';
import { TechnicalTab } from './TechnicalTab';
import { DryingTimeTab } from './DryingTimeTab';
import { SafetyTab } from './SafetyTab';

// استخدام useCallback لمنع إعادة إنشاء الدالة في كل render
const parseArrayField = useCallback((field: any): any[] => {
  if (Array.isArray(field)) return field;
  if (typeof field === 'string') {
    try {
      return JSON.parse(field);
    } catch {
      return [];
    }
  }
  return [];
}, []);

const ProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;

  const [formData, setFormData] = useState<any>({
    // ... بيانات النموذج الحالية
  });

  const [images, setImages] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(isEditing);
  const [activeTab, setActiveTab] = useState('general');

  const [brands, setBrands] = useState<any[]>([]);
  const [types, setTypes] = useState<any[]>([]);
  const [materials, setMaterials] = useState<any[]>([]);
  const [usages, setUsages] = useState<any[]>([]);

  // استخدام useCallback لمنع إعادة إنشاء الدالة
  const handleInputChange = useCallback((field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value
    }));
  }, []);

  // دالة محسنة لجلب خيارات الفلاتر
  const fetchFilterOptions = useCallback(async () => {
    try {
      // جلب البيانات في استعلام واحد باستخدام Promise.all
      const [typesResponse, valuesResponse] = await Promise.all([
        supabase
          .from('product_filter_types')
          .select('*')
          .eq('is_active', true),
        supabase
          .from('product_filter_values')
          .select('*, product_filter_types(name)')
          .eq('is_active', true)
      ]);

      if (typesResponse.error) throw typesResponse.error;
      if (valuesResponse.error) throw valuesResponse.error;

      const filterTypes = typesResponse.data || [];
      const filterValues = valuesResponse.data || [];

      // تجميع القيم بشكل أكثر كفاءة
      const groupedValues = filterTypes.reduce((acc, type) => {
        const valuesForType = filterValues
          .filter(value => value.filter_type_id === type.id)
          .map(value => ({
            id: value.id,
            name: value.display_name || value.value,
            name_ar: value.display_name_ar || value.value_ar,
            value: value.value,
            value_ar: value.value_ar,
            filter_type: type.name.toLowerCase()
          }));
        
        acc[type.name] = valuesForType;
        return acc;
      }, {});

      setBrands(groupedValues['Brand'] || []);
      setTypes(groupedValues['Type'] || []);
      setMaterials(groupedValues['Material Type'] || []);
      setUsages(groupedValues['Application Fields'] || []);

      return groupedValues;
    } catch (error) {
      console.error('Error fetching filter options:', error);
      // تعيين قيم افتراضية بدلاً من مصفوفات فارغة
      setBrands([]);
      setTypes([]);
      setMaterials([]);
      setUsages([]);
      throw error;
    }
  }, []);

  // دالة محسنة لجلب بيانات المنتج
  const fetchProduct = useCallback(async (productId: string, filterOptions: any) => {
    try {
      // جلب جميع البيانات في استعلامات متوازية
      const [productResponse, imagesResponse, linksResponse] = await Promise.all([
        supabase
          .from('products')
          .select('*')
          .eq('id', productId)
          .single(),
        supabase
          .from('product_images')
          .select('*')
          .eq('product_id', productId),
        supabase
          .from('product_materials')
          .select('material_id')
          .eq('product_id', productId)
      ]);

      if (productResponse.error) throw productResponse.error;
      if (imagesResponse.error) throw imagesResponse.error;
      if (linksResponse.error) throw linksResponse.error;

      const productData = productResponse.data;
      const imagesData = imagesResponse.data || [];
      const allLinks = linksResponse.data || [];

      const allIds = allLinks.map(link => link.material_id);

      // استخدام filterOptions الممررة بدلاً من state
      const fetchedMaterials = filterOptions['Material Type'] || [];
      const fetchedUsages = filterOptions['Application Fields'] || [];

      const materialIds = allIds.filter(id => 
        fetchedMaterials.some((m: any) => m.id === id)
      );
      const usageIds = allIds.filter(id => 
        fetchedUsages.some((u: any) => u.id === id)
      );

      const parsed = {
        ...productData,
        features: parseArrayField(productData.features),
        brand_id: productData.brand_id || '',
        type_id: productData.type_id || '',
        material_id: materialIds,
        usage_id: usageIds,
        mixing_steps: parseArrayField(productData.mixing_steps),
        safety_precautions: parseArrayField(productData.safety_precautions),
        safety_first_aid: parseArrayField(productData.safety_first_aid),
        packaging: parseArrayField(productData.packaging),
        packaging_ar: parseArrayField(productData.packaging_ar),
      };

      return {
        formData: parsed,
        images: imagesData.map(img => ({ ...img, isMain: img.is_main || false }))
      };
    } catch (err) {
      console.error("Error loading product:", err);
      throw err;
    }
  }, [parseArrayField]);

  // useEffect محسن
  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
      try {
        // 1. جلب خيارات الفلاتر أولاً
        const filterOptions = await fetchFilterOptions();

        // 2. إذا كان في وضع التحرير، جلب بيانات المنتج
        if (isEditing && id) {
          const productData = await fetchProduct(id, filterOptions);
          setFormData(productData.formData);
          setImages(productData.images);
        }
      } catch (err) {
        console.error("Error initializing data:", err);
        alert('Failed to load data');
        navigate('/admin/products');
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, [id, isEditing, fetchFilterOptions, fetchProduct, navigate]);

  // دالة محسنة لرفع الصور
  const handleUploadImage = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files.length) return;
    
    setUploading(true);
    const files = Array.from(e.target.files);
    
    try {
      // التحقق من وجود الـ bucket مسبقاً
      const { data: buckets } = await supabase.storage.listBuckets();
      const productsBucket = buckets?.find(b => b.name === 'products');
      
      if (!productsBucket) {
        throw new Error('Storage bucket "products" not found. Please create this bucket in your Supabase project dashboard under Storage.');
      }

      const uploaded = await Promise.all(
        files.map(async (file) => {
          const fileExt = file.name.split('.').pop();
          const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
          const filePath = `product_images/${fileName}`;

          const { error } = await supabase.storage
            .from('products')
            .upload(filePath, file);

          if (error) throw error;

          const { data } = supabase.storage
            .from('products')
            .getPublicUrl(filePath);

          return { 
            image_url: data.publicUrl, 
            isMain: false 
          };
        })
      );

      setImages(prev => [...prev, ...uploaded]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Image upload failed';
      alert(errorMessage);
      console.error('Image upload error:', err);
    } finally {
      setUploading(false);
    }
  }, []);

  // دوال معالجة الصور محسنة
  const removeImage = useCallback((index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  }, []);

  const setMainImage = useCallback((index: number) => {
    setImages(prev =>
      prev.map((img, i) => ({ ...img, isMain: i === index }))
    );
  }, []);

  // دالة الحفظ المحسنة
  const handleSave = useCallback(async () => {
    setSaving(true);
    try {
      // تحضير البيانات بشكل أكثر كفاءة
      const validColumns = [
        'name', 'name_ar', 'code', 'description', 'description_ar',
        'brand_id', 'type_id',
        'features', 'features_ar',
        // ... بقية الأعمدة
      ];

      const filteredData = validColumns.reduce((obj, key) => {
        if (formData[key] !== undefined) {
          obj[key] = formData[key];
        }
        return obj;
      }, {} as any);

      const productData = {
        ...filteredData,
        features: formData.features || [],
        safety_precautions: formData.safety_precautions || [],
        safety_first_aid: formData.safety_first_aid || [],
        packaging: JSON.stringify(formData.packaging || []),
        packaging_ar: JSON.stringify(formData.packaging_ar || []),
        mixing_steps: formData.mixing_steps || [],
      };

      let productId = id;

      // حفظ بيانات المنتج
      if (id) {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', id);
        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('products')
          .insert([productData])
          .select();
        if (error) throw error;
        productId = data?.[0]?.id;
      }

      if (!productId) throw new Error('Failed to get product ID');

      // حفظ العلاقات والصور في عمليات متوازية
      const allIds = [
        ...(formData.material_id || []),
        ...(formData.usage_id || [])
      ];

      const saveOperations = [];

      // عملية حفظ العلاقات
      if (allIds.length > 0) {
        // حذف العلاقات القديمة أولاً (للمنتجات المعدلة)
        if (isEditing) {
          await supabase
            .from('product_materials')
            .delete()
            .eq('product_id', productId);
        }

        const toInsert = allIds.map((materialId: string) => ({
          product_id: productId,
          material_id: materialId,
        }));

        saveOperations.push(
          supabase.from('product_images').insert(toInsert)
        );
      }

      // عملية حفظ الصور
      if (images.length > 0) {
        if (isEditing) {
          await supabase
            .from('product_images')
            .delete()
            .eq('product_id', productId);
        }

        const imagesToInsert = images.map(img => ({
          product_id: productId,
          image_url: img.image_url,
          is_main: img.isMain || false
        }));

        saveOperations.push(
          supabase.from('product_images').insert(imagesToInsert)
        );
      }

      // تنفيذ جميع عمليات الحفظ بشكل متوازي
      if (saveOperations.length > 0) {
        const results = await Promise.all(saveOperations);
        results.forEach(result => {
          if (result.error) throw result.error;
        });
      }

      navigate('/admin/products');
    } catch (err) {
      console.error('Save error:', err);
      alert('Save failed');
    } finally {
      setSaving(false);
    }
  }, [formData, images, id, isEditing, navigate]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0055A3]"></div>
    </div>
  );

 
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-xl">
        <div className="flex items-center justify-between p-6 border-b">
          <button onClick={() => navigate('/admin/products')} className="flex items-center text-gray-600">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back to Products
          </button>
          <h1 className="text-2xl font-bold">{isEditing ? 'Edit Product' : 'Add Product'}</h1>
        </div>

        <div className="border-b">
          <div className="flex">
            <Tab id="general" activeTab={activeTab} label="General" onClick={() => setActiveTab('general')} />
            <Tab id="application" activeTab={activeTab} label="Application" onClick={() => setActiveTab('application')} />
            <Tab id="technical" activeTab={activeTab} label="Technical" onClick={() => setActiveTab('technical')} />
            <Tab id="drying" activeTab={activeTab} label="Drying Time" onClick={() => setActiveTab('drying')} />
            <Tab id="safety" activeTab={activeTab} label="Safety" onClick={() => setActiveTab('safety')} />
          </div>
        </div>
        <div className="p-6">
          {activeTab === 'general' && (
            <GeneralTab
              data={{ ...formData, images }}
              onChange={handleInputChange}
              onImageUpload={handleUploadImage}
              onImageRemove={removeImage}
              onSetMainImage={setMainImage}
              uploading={uploading}
              brands={brands}
              types={types}
              materials={materials} 
              usages={usages}
            />
          )}
          {activeTab === 'application' && <ApplicationTab data={formData} onChange={handleInputChange} />}
          {activeTab === 'technical' && <TechnicalTab data={formData} onChange={handleInputChange} />}
          {activeTab === 'drying' && <DryingTimeTab data={formData} onChange={handleInputChange} />}
          {activeTab === 'safety' && <SafetyTab data={formData} onChange={handleInputChange} />}
        </div>
        <div className="flex justify-end space-x-3 p-6 border-t bg-gray-50">
          <button onClick={() => navigate('/admin/products')} className="px-4 py-2 border rounded">Cancel</button>
          <button onClick={handleSave} disabled={saving} className="px-4 py-2 bg-[#0055A3] text-white rounded flex items-center">
            {saving ? 'Saving...' : <> <Save className="w-4 h-4 mr-1" /> Save Product</> }
          </button>
        </div>
      </div>
    </div>
  ); 
}; 

export default ProductForm;