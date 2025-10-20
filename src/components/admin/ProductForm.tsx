import React from 'react';
import { Upload, Trash2 } from 'lucide-react';
import { InputField } from './FormComponents';
import BilingualInput from './BilingualInput';
import BilingualArrayInput from './BilingualArrayInput';
import { GeneralInfoTab } from './GeneralInfoTab';
interface Props {
  data: any;
  onChange: (field: string, value: any) => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageRemove: (index: number) => void;
  onSetMainImage: (index: number) => void;
  uploading: boolean;
  brands: any[];
  types: any[];
  materials: any[];
  usages: any[];
}

export const GeneralTab: React.FC<Props> = ({
  data,
  onChange,
  onImageUpload,
  onImageRemove,
  onSetMainImage,
  uploading,
  brands,
  types,
  materials,
  usages,
}) => {
  // Packaging handlers
  const handlePackagingChange = (index: number, value: string) => {
    const newPack = [...(data.packaging || [])];
    newPack[index] = { size: value };
    onChange('packaging', newPack);
  };

  const addPackaging = () => {
    onChange('packaging', [...(data.packaging || []), { size: '' }]);
  };

  const removePackaging = (index: number) => {
    const newPack = [...(data.packaging || [])];
    newPack.splice(index, 1);
    onChange('packaging', newPack);
  };

  // ✅ Features handlers
  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...(data.features || [])];
    newFeatures[index] = value;
    onChange('features', newFeatures);
  };

  const addFeature = () => {
    onChange('features', [...(data.features || []), '']);
  };

  const removeFeature = (index: number) => {
    const newFeatures = [...(data.features || [])];
    newFeatures.splice(index, 1);
    onChange('features', newFeatures);
  };

  // قائمة الحقول الإضافية (بدون Features لأنها معالجة بشكل منفصل)
  const additionalFields = [
    { key: 'storing_conditions', label: 'Storing Conditions' },
    { key: 'joint_preparation', label: 'Joint Preparation' },
    { key: 'joint_size', label: 'Joint Size' },
    { key: 'movement_capacity', label: 'Movement Capacity' },
    { key: 'substrate_treatment', label: 'Substrate Treatment' },
    { key: 'surface_preparation', label: 'Surface Preparation' },
    { key: 'recommended_uses', label: 'Recommended Uses' },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-6">
       <BilingualInput
  labelEn="Product Name"
  labelAr="اسم المنتج"
  nameEn="name"
  nameAr="name_ar"
  valueEn={data.name || ''}
  valueAr={data.name_ar || ''}
  onChange={(e) => onChange(e.target.name, e.target.value)}
  required
/>

        <InputField
          label="Product Code *"
          value={data.code || ''}
          onChange={(v) => onChange('code', v)}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

 {/* Brand */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Brand / الفرع *
  </label>
  <select
    value={data.brand_id || ''}
    onChange={(e) => onChange('brand_id', e.target.value)}
    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
  >
    <option value="">Select Brand / اختر الفرع</option>
    {brands && brands.length > 0 ? (
      brands.map(brand => (
        <option key={brand.id} value={brand.id}>
          {brand.name_ar && brand.name ? `${brand.name_ar} / ${brand.name}` : brand.name_ar || brand.name || 'Unnamed'}
        </option>
      ))
    ) : (
      <option value="" disabled>No brands available</option>
    )}
  </select>
  {(!brands || brands.length === 0) && (
    <p className="text-red-500 text-sm mt-1">No brands found. Please add brands first.</p>
  )}
</div>

{/* Type */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Type / النوع *
  </label>
  <select
    value={data.type_id || ''}
    onChange={(e) => onChange('type_id', e.target.value)}
    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
  >
    <option value="">Select Type / اختر النوع</option>
    {types && types.length > 0 ? (
      types.map(type => (
        <option key={type.id} value={type.id}>
          {type.name_ar && type.name ? `${type.name_ar} / ${type.name}` : type.name_ar || type.name || 'Unnamed'}
        </option>
      ))
    ) : (
      <option value="" disabled>No types available</option>
    )}
  </select>
  {(!types || types.length === 0) && (
    <p className="text-red-500 text-sm mt-1">No types found. Please add types first.</p>
  )}
</div>

{/* Material */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Material / المادة *
  </label>
 <select
  multiple
  value={data.material_id || []}
  onChange={(e) => {
    const selected = Array.from(e.target.selectedOptions, opt => opt.value);
    onChange('material_id', selected);
  }}
  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3] h-32 select-multiple"
>
  {materials.map(material => (
    <option key={material.id} value={material.id}>
      {material.name_ar && material.name
        ? `${material.name_ar} / ${material.name}`
        : material.name_ar || material.name || 'Unnamed'}
    </option>
  ))}
</select>
  {(!materials || materials.length === 0) && (
    <p className="text-red-500 text-sm mt-1">No materials found. Please add materials first.</p>
  )}
</div>

{/* Usage */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Usage / الاستخدام *
  </label>
  <select
    value={data.usage_id || ''}
    onChange={(e) => onChange('usage_id', e.target.value)}
    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
  >
    <option value="">Select Usage / اختر الاستخدام</option>
    {usages && usages.length > 0 ? (
      usages.map(usage => (
        <option key={usage.id} value={usage.id}>
          {usage.name_ar && usage.name ? `${usage.name_ar} / ${usage.name}` : usage.name_ar || usage.name || 'Unnamed'}
        </option>
      ))
    ) : (
      <option value="" disabled>No usages available</option>
    )}
  </select>
  {(!usages || usages.length === 0) && (
    <p className="text-red-500 text-sm mt-1">No usages found. Please add usages first.</p>
  )}
</div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Status / الحالة</label>
          <select
            value={data.status || 'active'}
            onChange={(e) => onChange('status', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
          >
            <option value="active">Active / نشط</option>
            <option value="inactive">Inactive / غير نشط</option>
            <option value="draft">Draft / مسودة</option>
          </select>
        </div>

        </div>

        <BilingualInput
  labelEn="Description"
  labelAr="الوصف"
  nameEn="description"
  nameAr="description_ar"
  valueEn={data.description || ''}
  valueAr={data.description_ar || ''}
  onChange={(e) => onChange(e.target.name, e.target.value)}
  type="textarea"
  required
/>

      
{/* Packaging - Bilingual (مثل المميزات) */}
<BilingualArrayInput
  label="Packaging Sizes / أحجام العبوة"
  valueEn={Array.isArray(data.packaging) ? data.packaging.map(item => item?.size || '') : []}
  valueAr={Array.isArray(data.packaging_ar) ? data.packaging_ar.map(item => item?.size || '') : []}
  onChangeEn={(sizes) => {
    const packaging = sizes.map(size => ({ size }));
    onChange('packaging', packaging);
  }}
  onChangeAr={(sizes) => {
    const packaging_ar = sizes.map(size => ({ size }));
    onChange('packaging_ar', packaging_ar);
  }}
/>

        {/* Features */}
        <BilingualArrayInput
          label="Product Features / المميزات"
          valueEn={Array.isArray(data.features) ? data.features : []}
          valueAr={Array.isArray(data.features_ar) ? data.features_ar : []}
          onChangeEn={(items) => onChange('features', items)}
          onChangeAr={(items) => onChange('features_ar', items)}
        />
 {/* ✅ هنا نضيف قسم المعلومات الإضافية */}
      <div className="border-t pt-6 mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">General Information</h3>
        <GeneralInfoTab data={data} onChange={onChange} />
      </div>
   
        {/* Images */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Product Images</label>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="flex items-center px-4 py-2 bg-[#0055A3] text-white rounded-lg cursor-pointer hover:bg-blue-700">
                <Upload className="w-4 h-4 mr-2" />
                Upload Images
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={onImageUpload}
                  className="hidden"
                  disabled={uploading}
                />
              </label>
              {uploading && <span className="text-gray-500">Uploading...</span>}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {(data.images || []).map((img: any, idx: number) => (
                <div key={idx} className="relative">
                  <img
                    src={img.image_url}
                    alt=""
                    className="w-full h-24 object-cover rounded border"
                  />
                  <button
                    type="button"
                    onClick={() => onImageRemove(idx)}
                    className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                  <label className="flex items-center mt-1 text-sm">
                    <input
                      type="radio"
                      checked={img.isMain}
                      onChange={() => onSetMainImage(idx)}
                      className="mr-1"
                    />
                    Main
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};  // src/components/admin/ProductForm.tsx
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
      .select('*, product_filter_types(name)')
      .eq('is_active', true);
    
    if (valuesError) throw valuesError;

    // تجميع القيم حسب نوع الفلتر
    const groupedValues: any = {};
    
    (filterTypes || []).forEach((type: any) => {
      const valuesForType = (filterValues || [])
        .filter((value: any) => value.filter_type_id === type.id)
        .map((value: any) => ({
          id: value.id,
          name: value.display_name || value.value,
          name_ar: value.display_name_ar || value.value_ar,
          value: value.value,
          value_ar: value.value_ar,
          filter_type: type.name.toLowerCase()
        }));
      
      
      groupedValues[type.name] = valuesForType;
    });

    console.log('Grouped Values:', groupedValues); // للتحقق

    
    setBrands(groupedValues['Brand'] || []);
    setTypes(groupedValues['Type'] || []);

  
    setMaterials(groupedValues['Material Type'] || []);

   
    setUsages(groupedValues['Application Fields'] || []);

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
      brand_id: productData?.brand_id || '',
  type_id: productData?.type_id || '',
  material_id: productData?.material_id || '',
  usage_id: productData?.usage_id || '',
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
        'curing_note', 'curing_note_ar','specific_gravity', 'specific_gravity_ar', 'note_application', 'note_application_ar',
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
  brand_id: formData.brand_id,
  type_id: formData.type_id, 
  material_id: formData.material_id,
  usage_id: formData.usage_id,

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