// src/components/admin/ProductForm.tsx
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useNavigate, useParams } from 'react-router-dom';
import { Tab } from './Tab';
import { GeneralTab } from './GeneralTab';
import { ApplicationTab } from './ApplicationTab';
import { TechnicalTab } from './TechnicalTab';
import { DryingTimeTab } from './DryingTimeTab';
import { SafetyTab } from './SafetyTab';

const parseArrayField = (field: any): any[] => {
  if (Array.isArray(field)) return field;
  if (typeof field === 'string') {
    try {
      return JSON.parse(field);
    } catch {
      return [];
    }
  }
  return [];
};

const ProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;

  const [formData, setFormData] = useState<any>({
    name: '',
    code: '',
    brand: '',
    type: '',
    material: '',
    usage: '',
    description: '',
    technical_description: '',
    features: [],
    applications: [],
    instructions: [],
    packaging: [],
    safety_precautions: [],
    safety_first_aid: [],
    // General Info fields
    storing_conditions: '',
    joint_preparation: '',
    joint_size: '',
    movement_capacity: '',
    substrate_treatment: '',
    surface_preparation: '',
    general_features: [],
    recommended_uses: [],
    // Application
    method_of_application: '',
    mixing_ratio: '',
    mixing_note: '',
    mixing_steps: [],
    pot_life: '',
    cleaner: '',
    thinner_cleaner: '',
    application_temperature: '',
    curing_note: '',
    // Technical
    number_of_coats: '',
    note: '',
    tensile_adhesion_strength: '',
    // ... (أضف باقي الحقول كما في النموذج السابق)
    // Drying Time
    dry_to_touch: '',
    dry_to_handle: '',
    drying_time_note: '',
    status: 'active',
  });

  const [images, setImages] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(isEditing);
  const [activeTab, setActiveTab] = useState('general'); // general, application, technical, drying, safety

  const [brands, setBrands] = useState<any[]>([]);
  const [types, setTypes] = useState<any[]>([]);
  const [materials, setMaterials] = useState<any[]>([]);
  const [usages, setUsages] = useState<any[]>([]);

  // =============== Fetch Functions ===============
  const fetchFilterOptions = async () => {
    try {
      // Fetch filter types and values from existing tables
      const { data: filterTypes, error: typesError } = await supabase
        .from('product_filter_types')
        .select('*')
        .eq('is_active', true);
      
      if (typesError) throw typesError;

      const { data: filterValues, error: valuesError } = await supabase
        .from('product_filter_values')
        .select('*, filter_type_id')
        .eq('is_active', true);
      
      if (valuesError) throw valuesError;

      // Group values by filter type name
      const groupedValues = (filterTypes || []).reduce((acc: any, type: any) => {
        acc[type.name.toLowerCase()] = (filterValues || [])
          .filter((value: any) => value.filter_type_id === type.id)
          .map((value: any) => ({
            id: value.id,
            name: value.display_name || value.value,
            value: value.value
          }));
        return acc;
      }, {});

      // Set individual filter arrays
      setBrands(groupedValues.brand || groupedValues.brands || []);
      setTypes(groupedValues.type || groupedValues.types || []);
      setMaterials(groupedValues.material || groupedValues.materials || []);
      setUsages(groupedValues.usage || groupedValues.usages || []);
    } catch (error) {
      console.error('Error fetching filter options:', error);
      // Set empty arrays as fallback
      setBrands([]);
      setTypes([]);
      setMaterials([]);
      setUsages([]);
    }
  };

 const fetchProduct = async () => {
  if (!id) return;
  try {
    setLoading(true);

    console.log("Fetching product with ID:", id);

    const { data: productData, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    console.log("Product data:", productData);

    const { data: imagesData, error: imagesError } = await supabase
      .from('product_images')
      .select('*')
      .eq('product_id', id);

    if (imagesError) throw imagesError;
    console.log("Images data:", imagesData);

    // 👇 تجهيز البيانات: كل الأعمدة + تحويل اللي لازم Arrays
    const parsed = {
      ...productData,

      // General Tab
      features: parseArrayField(productData?.features),
      general_features: parseArrayField(productData?.general_features),
      recommended_uses: parseArrayField(productData?.recommended_uses),

      // Application Tab
      applications: parseArrayField(productData?.applications),
      mixing_steps: parseArrayField(productData?.mixing_steps),

      // Safety Tab
      safety_precautions: parseArrayField(productData?.safety_precautions),
      safety_first_aid: parseArrayField(productData?.safety_first_aid),

      // Packaging (ممكن تاب منفصل أو ضمن General)
      packaging: parseArrayField(productData?.packaging),
    };

    setFormData(parsed);
    setImages((imagesData || []).map(img => ({ ...img, isMain: img.is_main || false })));
  } catch (err) {
    console.error("Error loading product:", err);
    alert('Failed to load product');
    setLoading(false);
    navigate('/admin/products');
  } finally {
    setLoading(false);
  }
};



  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setUploading(true);
    const files = Array.from(e.target.files);
    try {
      const uploaded = await Promise.all(files.map(async (file) => {
        const fileName = `${Math.random()}.${file.name.split('.').pop()}`;
        const { error } = await supabase.storage.from('product-images').upload(`product_images/${fileName}`, file);
        if (error) throw error;
        const { data } = supabase.storage.from('product-images').getPublicUrl(`product_images/${fileName}`);
        return { image_url: data.publicUrl, isMain: false };
      }));
      setImages(prev => [...prev, ...uploaded]);
    } catch (err) {
      alert('Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const setMainImage = (index: number) => {
    setImages(prev =>
      prev.map((img, i) => ({ ...img, isMain: i === index }))
    );
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const productData = {
        ...formData,
        features: formData.features || [],
        safety_precautions: formData.safety_precautions || [],
        safety_first_aid: formData.safety_first_aid || [],
        packaging: formData.packaging || [],
        general_features: formData.general_features || [],
        recommended_uses: formData.recommended_uses || [],
        mixing_steps: formData.mixing_steps || [],
      };

      let productId = id;
      if (id) {
        await supabase.from('products').update(productData).eq('id', id);
      } else {
        const { data } = await supabase.from('products').insert([productData]).select();
        productId = data?.[0]?.id;
      }

      if (productId) {
        // Save images logic here (same as before)
      }

      navigate('/admin/products');
    } catch (err) {
      alert('Save failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <button onClick={() => navigate('/admin/products')} className="flex items-center text-gray-600">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back to Products
          </button>
          <h1 className="text-2xl font-bold">{isEditing ? 'Edit Product' : 'Add Product'}</h1>
        </div>

        {/* Tabs */}
        <div className="border-b">
          <div className="flex">
            <Tab id="general" activeTab={activeTab} label="General" onClick={() => setActiveTab('general')} />
            <Tab id="application" activeTab={activeTab} label="Application" onClick={() => setActiveTab('application')} />
            <Tab id="technical" activeTab={activeTab} label="Technical" onClick={() => setActiveTab('technical')} />
            <Tab id="drying" activeTab={activeTab} label="Drying Time" onClick={() => setActiveTab('drying')} />
            <Tab id="safety" activeTab={activeTab} label="Safety" onClick={() => setActiveTab('safety')} />
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6 max-h-[500px] overflow-y-auto">
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

        {/* Footer */}
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