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
    name_ar: '',
    code: '',
    brand: '',
    type: '',
    material: '',
    usage: '',
    description: '',
    description_ar: '',
  
    features: [],
    features_ar: [],
    applications: [],
    applications_ar: [],
    instructions: [],
    
    instructions_ar: [],
    packaging: [],
    packaging_ar: [], 
    safety_precautions: [],
    safety_precautions_ar: [],
    safety_first_aid: [],
    safety_first_aid_ar: [],
    // General Info fields
    storing_conditions: '',
    storing_conditions_ar: '',
    joint_preparation: '',
    joint_preparation_ar: '',
    joint_size: '',
    joint_size_ar: '',
    movement_capacity: '',
    movement_capacity_ar: '',
    substrate_treatment: '',
    substrate_treatment_ar: '',
    surface_preparation: '',
    surface_preparation_ar: '',
    general_features: [],
    recommended_uses: '',
    recommended_uses_ar: '',
    // Application
    method_of_application: '',
    method_of_application_ar: '',
    mixing_ratio: '',
    mixing_ratio_ar: '',
    mixing_note: '',
    mixing_note_ar: '',
    mixing_steps: '',
    mixing_steps_ar: '',
    pot_life: '',
    pot_life_ar: '',
    cleaner: '',
    cleaner_ar: '',
    thinner: '',
    thinner_ar: '',
    application_temperature: '',
    application_temperature_ar: '',
    curing_note: '',
    curing_note_ar: '',
    note_application: '',
    note_application_ar: '',
    // Technical
    number_of_coats: '',
    number_of_coats_ar: '',
    note: '',
    note_ar: '',
    tensile_adhesion_strength: '',
    tensile_adhesion_strength_ar: '',
    material_consumption_ar: '',
    viscosity_ar: '',
    weather_resistance_ar: '',
    compressive_strength_ar: '',
    tear_resistance_ar: '',
    elongation_at_rupture_ar: '',
    tensile_strength_100_ar: '',
    tensile_strength_50_ar: '',
    specific_gravity_mixed_ar: '',
    solvent_resistance_ar: '',
    chemical_resistance_ar: '',
    abrasion_resistance_ar: '',
    friction_resistance_ar: '',
    washability_ar: '',
    water_resistance_ar: '',
    theoretical_spreading_rate_ar: '',
    recommended_film_thickness_ar: '',
    temperature_resistance_ar: '',
    solvent_splash_resistance_ar: '',
    sandability_ar: '',
    adhesion_ar: '',
    flexibility_ar: '',
    voc_ar: '',
    volume_solids_ar: '',
    gloss_ar: '',
    color_ar: '',
    component_a_ar: '',
    component_b_ar: '',
    specific_gravity: '',
     specific_gravity_ar: '',
    
    // Drying Time
    dry_to_touch: '',
    dry_to_touch_ar: '',
    dry_to_handle: '',
    dry_to_handle_ar: '',
    complete_setting_ar: '',
    grouting_time_ar: '',
    adjustability_time_ar: '',
    dry_to_topcoat_ar: '',
    initial_setting_ar: '',
    fully_cured_ar: '',
    dry_to_sand_ar: '',
    drying_time_note: '',
    drying_time_note_ar: '',
    safety_note_ar: '',
    status: 'active',
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

  // =============== Input Handler ===============
  const handleInputChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  // =============== Fetch Functions ===============
  const fetchFilterOptions = async () => {
    try {
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

     const groupedValues = (filterTypes || []).reduce((acc: any, type: any) => {
  acc[type.name.toLowerCase()] = (filterValues || [])
    .filter((value: any) => value.filter_type_id === type.id)
    .map((value: any) => {
      const en = value.display_name || value.value;
      const ar = value.display_name_ar || value.value_ar;
      const displayName = ar && en ? `${ar} / ${en}` : ar || en || value.value || 'Unnamed';

      return {
        id: value.id,
        name: displayName, // ← الآن يحتوي على "عربي / إنجليزي"
        value: value.value, // ← القيمة الفعلية التي تُخزّن في قاعدة البيانات (الإنجليزية غالبًا)
        value_ar: value.value_ar // ← مفيدة لعرض إضافي إن لزم
      };
    });
  return acc;
}, {});
 
      setBrands(groupedValues.brand || groupedValues.brands || []);
      setTypes(groupedValues.type || groupedValues.types || []);
      setMaterials(groupedValues.material || groupedValues.materials || []);
      setUsages(groupedValues.usage || groupedValues.usages || []);
    } catch (error) {
      console.error('Error fetching filter options:', error);
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

      const parsed = {
        ...productData,
        features: parseArrayField(productData?.features),
        general_features: parseArrayField(productData?.general_features),
      
        applications: parseArrayField(productData?.applications),
        mixing_steps: parseArrayField(productData?.mixing_steps),
        safety_precautions: parseArrayField(productData?.safety_precautions),
        safety_first_aid: parseArrayField(productData?.safety_first_aid),
        packaging: parseArrayField(productData?.packaging),
        packaging_ar: parseArrayField(productData?.packaging_ar),
      };

      setFormData(parsed);
      setImages((imagesData || []).map(img => ({ ...img, isMain: img.is_main || false })));
    } catch (err) {
      console.error("Error loading product:", err);
      alert('Failed to load product');
      navigate('/admin/products');
    } finally {
      setLoading(false);
    }
  };

  // =============== UseEffect ===============
  useEffect(() => {
    const initializeData = async () => {
      await fetchFilterOptions();
      if (isEditing) {
        await fetchProduct();
      } else {
        setLoading(false);
      }
    };

    initializeData();
  }, [id, isEditing]);

 const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
  if (!e.target.files) return;
  setUploading(true);
  const files = Array.from(e.target.files);
  try {
    const uploaded = await Promise.all(files.map(async (file) => {
      const fileName = `${Math.random()}.${file.name.split('.').pop()}`;
      const { error } = await supabase.storage.from('products').upload(`product_images/${fileName}`, file);
      if (error) {
        if (error.message.includes('Bucket not found')) {
          throw new Error('Storage bucket "products" not found. Please create this bucket in your Supabase project dashboard under Storage.');
        }
        throw error;
      }
      const { data } = supabase.storage.from('products').getPublicUrl(`product_images/${fileName}`); // ✅ تم التصحيح هنا
      return { image_url: data.publicUrl, isMain: false };
    }));
    setImages(prev => [...prev, ...uploaded]);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Image upload failed';
    alert(errorMessage);
    console.error('Image upload error:', err);
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
      // Define valid database columns to prevent schema errors
      const validColumns = [
        'name', 'name_ar', 'code', 'brand', 'type', 'material', 'usage', 'description', 'description_ar',
         'features', 'features_ar', 'applications', 'applications_ar',
        'instructions', 'instructions_ar', 'packaging', 'packaging_ar', 
        'safety_first_aid', 'safety_first_aid_ar', 'technical_specs', 'status', 'category_id', 'featured',
        'storing_conditions', 'storing_conditions_ar', 'joint_preparation', 'joint_preparation_ar',
        'joint_size', 'joint_size_ar', 'movement_capacity', 'movement_capacity_ar',
        'substrate_treatment', 'substrate_treatment_ar', 'surface_preparation', 'surface_preparation_ar',
        'general_features', 'recommended_uses', 'recommended_uses_ar',
        'method_of_application', 'method_of_application_ar', 'mixing_ratio', 'mixing_ratio_ar',
        'mixing_note', 'mixing_note_ar', 'mixing_steps', 'mixing_steps_ar', 'pot_life', 'pot_life_ar',
        'cleaner', 'cleaner_ar', 'thinner', 'thinner_ar', 'application_temperature', 'application_temperature_ar',
        'curing_note', 'curing_note_ar','specific_gravity', ' specific_gravity_ar', 'note_application', 'note_application_ar',
        'number_of_coats', 'number_of_coats_ar', 'note', 'note_ar', 'tensile_adhesion_strength', 'tensile_adhesion_strength_ar',
        'material_consumption', 'material_consumption_ar', 'viscosity', 'viscosity_ar',
        'weather_resistance', 'weather_resistance_ar', 'compressive_strength', 'compressive_strength_ar',
        'tear_resistance', 'tear_resistance_ar', 'elongation_at_rupture', 'elongation_at_rupture_ar',
        'tensile_strength_100', 'tensile_strength_100_ar', 'tensile_strength_50', 'tensile_strength_50_ar',
        'specific_gravity_mixed', 'specific_gravity_mixed_ar', 'solvent_resistance', 'solvent_resistance_ar',
        'chemical_resistance', 'chemical_resistance_ar', 'abrasion_resistance', 'abrasion_resistance_ar',
        'friction_resistance', 'friction_resistance_ar', 'washability', 'washability_ar',
        'water_resistance', 'water_resistance_ar', 'theoretical_spreading_rate', 'theoretical_spreading_rate_ar',
        'recommended_film_thickness', 'recommended_film_thickness_ar', 'temperature_resistance', 'temperature_resistance_ar',
        'solvent_splash_resistance', 'solvent_splash_resistance_ar', 'sandability', 'sandability_ar',
        'adhesion', 'adhesion_ar', 'flexibility', 'flexibility_ar', 'voc', 'voc_ar',
        'volume_solids', 'volume_solids_ar', 'gloss', 'gloss_ar', 'color', 'color_ar',
        'component_a', 'component_a_ar', 'component_b', 'component_b_ar',
        'dry_to_touch', 'dry_to_touch_ar', 'dry_to_handle', 'dry_to_handle_ar',
        'complete_setting', 'complete_setting_ar', 'grouting_time', 'grouting_time_ar',
        'adjustability_time', 'adjustability_time_ar', 'dry_to_topcoat', 'dry_to_topcoat_ar',
        'initial_setting', 'initial_setting_ar', 'fully_cured', 'fully_cured_ar',
        'dry_to_sand', 'dry_to_sand_ar', 'drying_time_note', 'drying_time_note_ar',
        'safety_note', 'safety_note_ar'
      ];

      // Filter formData to only include valid database columns
      const filteredData = Object.keys(formData)
        .filter(key => validColumns.includes(key))
        .reduce((obj, key) => {
          obj[key] = formData[key];
          return obj;
        }, {} as any);

      const productData = {
  ...filteredData,
  features: formData.features || [],
  safety_precautions: formData.safety_precautions || [],
  safety_first_aid: formData.safety_first_aid || [],
  packaging: JSON.stringify(formData.packaging || []),
 packaging_ar: JSON.stringify(formData.packaging_ar || []),
  general_features: formData.general_features || [],
  mixing_steps: formData.mixing_steps || [],
};

      let productId = id;
      if (id) {
        const { error } = await supabase.from('products').update(productData).eq('id', id);
        if (error) throw error;
      } else {
        const { data, error } = await supabase.from('products').insert([productData]).select();
        if (error) throw error;
        productId = data?.[0]?.id;
      }

      // Save images if productId exists
      if (productId) {
        // Delete existing images if editing
        if (isEditing) {
          await supabase.from('product_images').delete().eq('product_id', productId);
        }

        // Insert new images
        if (images.length > 0) {
          const imagesToInsert = images.map(img => ({
            product_id: productId,
            image_url: img.image_url,
            is_main: img.isMain || false
          }));
          await supabase.from('product_images').insert(imagesToInsert);
        }
      }

      navigate('/admin/products');
    } catch (err) {
      console.error('Save error:', err);
      alert('Save failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-xl">
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