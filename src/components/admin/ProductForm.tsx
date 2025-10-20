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
    brand_id: '',
    type_id: '',
    material_id: [], // ✅ تأكد أنه مصفوفة فارغة
    usage_id: '',
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
    material_consumption: '',
    material_consumption_ar: '',
    viscosity: '',
    viscosity_ar: '',
    weather_resistance: '',
    weather_resistance_ar: '',
    compressive_strength: '',
    compressive_strength_ar: '',
    tear_resistance: '',
    tear_resistance_ar: '',
    elongation_at_rupture: '',
    elongation_at_rupture_ar: '',
    tensile_strength_100: '',
    tensile_strength_100_ar: '',
    tensile_strength_50: '',
    tensile_strength_50_ar: '',
    specific_gravity_mixed: '',
    specific_gravity_mixed_ar: '',
    solvent_resistance: '',
    solvent_resistance_ar: '',
    chemical_resistance: '',
    chemical_resistance_ar: '',
    abrasion_resistance: '',
    abrasion_resistance_ar: '',
    friction_resistance: '',
    friction_resistance_ar: '',
    washability: '',
    washability_ar: '',
    water_resistance: '',
    water_resistance_ar: '',
    theoretical_spreading_rate: '',
    theoretical_spreading_rate_ar: '',
    recommended_film_thickness: '',
    recommended_film_thickness_ar: '',
    temperature_resistance: '',
    temperature_resistance_ar: '',
    solvent_splash_resistance: '',
    solvent_splash_resistance_ar: '',
    sandability: '',
    sandability_ar: '',
    adhesion: '',
    adhesion_ar: '',
    flexibility: '',
    flexibility_ar: '',
    voc: '',
    voc_ar: '',
    volume_solids: '',
    volume_solids_ar: '',
    gloss: '',
    gloss_ar: '',
    color: '',
    color_ar: '',
    component_a: '',
    component_a_ar: '',
    component_b: '',
    component_b_ar: '',
    specific_gravity: '',
    specific_gravity_ar: '',
    // Drying Time
    dry_to_touch: '', 
    dry_to_touch_ar: '',
    dry_to_handle: '',
    dry_to_handle_ar: '',
    complete_setting: '',
    complete_setting_ar: '',
    grouting_time: '',
    grouting_time_ar: '',
    adjustability_time: '',
    adjustability_time_ar: '',
    dry_to_topcoat: '',
    dry_to_topcoat_ar: '',
    initial_setting: '',
    initial_setting_ar: '',
    fully_cured: '',
    fully_cured_ar: '',
    dry_to_sand: '',
    dry_to_sand_ar: '',
    drying_time_note: '',
    drying_time_note_ar: '',
    safety_note: '',
    safety_note_ar: '',
    status: 'active',
  });

  const [images, setImages] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(isEditing);
  const [brands, setBrands] = useState<any[]>([]);
  const [types, setTypes] = useState<any[]>([]);
  const [materials, setMaterials] = useState<any[]>([]);
  const [usages, setUsages] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('general');

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

      // تعيين القيم مع التحقق
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

      const { data: productData, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      // ✅ جلب المواد المرتبطة من جدول product_materials
      const { data: materialRelations } = await supabase
        .from('product_materials')
        .select('material_id')
        .eq('product_id', id);

      const materialIds = (materialRelations || []).map((r: any) => r.material_id);

      // جلب الصور
      const { data: imagesData } = await supabase
        .from('product_images')
        .select('*')
        .eq('product_id', id);

      const parsed = {
        ...productData,
        features: parseArrayField(productData?.features),
        features_ar: parseArrayField(productData?.features_ar),
        packaging: parseArrayField(productData?.packaging),
        packaging_ar: parseArrayField(productData?.packaging_ar),
        safety_precautions: parseArrayField(productData?.safety_precautions),
        safety_first_aid: parseArrayField(productData?.safety_first_aid),
        general_features: parseArrayField(productData?.general_features),
        applications: parseArrayField(productData?.applications),
        applications_ar: parseArrayField(productData?.applications_ar),
        instructions: parseArrayField(productData?.instructions),
        instructions_ar: parseArrayField(productData?.instructions_ar),
        mixing_steps: parseArrayField(productData?.mixing_steps),

        // ✅ تعيين material_id كمصفوفة
        material_id: materialIds,
        brand_id: productData?.brand_id || '',
        type_id: productData?.type_id || '',
        usage_id: productData?.usage_id || '',
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
        const { data } = supabase.storage.from('products').getPublicUrl(`product_images/${fileName}`);
        return { image_url: data.publicUrl, isMain: false };
      }));
      setImages(prev => [...prev, ...uploaded]);
    } catch (err: any) {
      console.error('Full error details:', err);
      alert('Check console for error details');
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
      // 1. التحقق من البيانات المطلوبة
      if (!formData.name || !formData.name_ar || !formData.code) {
        alert('Please fill in all required fields: Product Name (EN/AR) and Product Code');
        return;
      }

      // 2. إعداد بيانات المنتج الأساسية
      const productData: any = {
        name: formData.name,
        name_ar: formData.name_ar,
        code: formData.code,
        description: formData.description || '',
        description_ar: formData.description_ar || '',
        status: formData.status || 'active',
        
        // العلاقات الأساسية
        brand_id: formData.brand_id || null,
        type_id: formData.type_id || null,
        usage_id: formData.usage_id || null,
        
        // الحقول المصفوفية (كدول JSON)
        features: JSON.stringify(formData.features || []),
        features_ar: JSON.stringify(formData.features_ar || []),
        packaging: JSON.stringify(formData.packaging || []),
        packaging_ar: JSON.stringify(formData.packaging_ar || []),
        safety_precautions: JSON.stringify(formData.safety_precautions || []),
        safety_precautions_ar: JSON.stringify(formData.safety_precautions_ar || []),
        safety_first_aid: JSON.stringify(formData.safety_first_aid || []),
        safety_first_aid_ar: JSON.stringify(formData.safety_first_aid_ar || []),
        general_features: JSON.stringify(formData.general_features || []),
        mixing_steps: JSON.stringify(formData.mixing_steps || []),
        applications: JSON.stringify(formData.applications || []),
        applications_ar: JSON.stringify(formData.applications_ar || []),
        instructions: JSON.stringify(formData.instructions || []),
        instructions_ar: JSON.stringify(formData.instructions_ar || []),
        
        // الحقول العامة
        storing_conditions: formData.storing_conditions || '',
        storing_conditions_ar: formData.storing_conditions_ar || '',
        joint_preparation: formData.joint_preparation || '',
        joint_preparation_ar: formData.joint_preparation_ar || '',
        joint_size: formData.joint_size || '',
        joint_size_ar: formData.joint_size_ar || '',
        movement_capacity: formData.movement_capacity || '',
        movement_capacity_ar: formData.movement_capacity_ar || '',
        substrate_treatment: formData.substrate_treatment || '',
        substrate_treatment_ar: formData.substrate_treatment_ar || '',
        surface_preparation: formData.surface_preparation || '',
        surface_preparation_ar: formData.surface_preparation_ar || '',
        recommended_uses: formData.recommended_uses || '',
        recommended_uses_ar: formData.recommended_uses_ar || '',
        method_of_application: formData.method_of_application || '',
        method_of_application_ar: formData.method_of_application_ar || '',
        mixing_ratio: formData.mixing_ratio || '',
        mixing_ratio_ar: formData.mixing_ratio_ar || '',
        mixing_note: formData.mixing_note || '',
        mixing_note_ar: formData.mixing_note_ar || '',
        pot_life: formData.pot_life || '',
        pot_life_ar: formData.pot_life_ar || '',
        cleaner: formData.cleaner || '',
        cleaner_ar: formData.cleaner_ar || '',
        thinner: formData.thinner || '',
        thinner_ar: formData.thinner_ar || '',
        application_temperature: formData.application_temperature || '',
        application_temperature_ar: formData.application_temperature_ar || '',
        curing_note: formData.curing_note || '',
        curing_note_ar: formData.curing_note_ar || '',
        note_application: formData.note_application || '',
        note_application_ar: formData.note_application_ar || '',
        number_of_coats: formData.number_of_coats || '',
        number_of_coats_ar: formData.number_of_coats_ar || '',
        note: formData.note || '',
        note_ar: formData.note_ar || '',
        tensile_adhesion_strength: formData.tensile_adhesion_strength || '',
        tensile_adhesion_strength_ar: formData.tensile_adhesion_strength_ar || '',
        material_consumption: formData.material_consumption || '',
        material_consumption_ar: formData.material_consumption_ar || '',
        viscosity: formData.viscosity || '',
        viscosity_ar: formData.viscosity_ar || '',
        weather_resistance: formData.weather_resistance || '',
        weather_resistance_ar: formData.weather_resistance_ar || '',
        compressive_strength: formData.compressive_strength || '',
        compressive_strength_ar: formData.compressive_strength_ar || '',
        tear_resistance: formData.tear_resistance || '',
        tear_resistance_ar: formData.tear_resistance_ar || '',
        elongation_at_rupture: formData.elongation_at_rupture || '',
        elongation_at_rupture_ar: formData.elongation_at_rupture_ar || '',
        tensile_strength_100: formData.tensile_strength_100 || '',
        tensile_strength_100_ar: formData.tensile_strength_100_ar || '',
        tensile_strength_50: formData.tensile_strength_50 || '',
        tensile_strength_50_ar: formData.tensile_strength_50_ar || '',
        specific_gravity_mixed: formData.specific_gravity_mixed || '',
        specific_gravity_mixed_ar: formData.specific_gravity_mixed_ar || '',
        solvent_resistance: formData.solvent_resistance || '',
        solvent_resistance_ar: formData.solvent_resistance_ar || '',
        chemical_resistance: formData.chemical_resistance || '',
        chemical_resistance_ar: formData.chemical_resistance_ar || '',
        abrasion_resistance: formData.abrasion_resistance || '',
        abrasion_resistance_ar: formData.abrasion_resistance_ar || '',
        friction_resistance: formData.friction_resistance || '',
        friction_resistance_ar: formData.friction_resistance_ar || '',
        washability: formData.washability || '',
        washability_ar: formData.washability_ar || '',
        water_resistance: formData.water_resistance || '',
        water_resistance_ar: formData.water_resistance_ar || '',
        theoretical_spreading_rate: formData.theoretical_spreading_rate || '',
        theoretical_spreading_rate_ar: formData.theoretical_spreading_rate_ar || '',
        recommended_film_thickness: formData.recommended_film_thickness || '',
        recommended_film_thickness_ar: formData.recommended_film_thickness_ar || '',
        temperature_resistance: formData.temperature_resistance || '',
        temperature_resistance_ar: formData.temperature_resistance_ar || '',
        solvent_splash_resistance: formData.solvent_splash_resistance || '',
        solvent_splash_resistance_ar: formData.solvent_splash_resistance_ar || '',
        sandability: formData.sandability || '',
        sandability_ar: formData.sandability_ar || '',
        adhesion: formData.adhesion || '',
        adhesion_ar: formData.adhesion_ar || '',
        flexibility: formData.flexibility || '',
        flexibility_ar: formData.flexibility_ar || '',
        voc: formData.voc || '',
        voc_ar: formData.voc_ar || '',
        volume_solids: formData.volume_solids || '',
        volume_solids_ar: formData.volume_solids_ar || '',
        gloss: formData.gloss || '',
        gloss_ar: formData.gloss_ar || '',
        color: formData.color || '',
        color_ar: formData.color_ar || '',
        component_a: formData.component_a || '',
        component_a_ar: formData.component_a_ar || '',
        component_b: formData.component_b || '',
        component_b_ar: formData.component_b_ar || '',
        specific_gravity: formData.specific_gravity || '',
        specific_gravity_ar: formData.specific_gravity_ar || '',
        dry_to_touch: formData.dry_to_touch || '',
        dry_to_touch_ar: formData.dry_to_touch_ar || '',
        dry_to_handle: formData.dry_to_handle || '',
        dry_to_handle_ar: formData.dry_to_handle_ar || '',
        complete_setting: formData.complete_setting || '',
        complete_setting_ar: formData.complete_setting_ar || '',
        grouting_time: formData.grouting_time || '',
        grouting_time_ar: formData.grouting_time_ar || '',
        adjustability_time: formData.adjustability_time || '',
        adjustability_time_ar: formData.adjustability_time_ar || '',
        dry_to_topcoat: formData.dry_to_topcoat || '',
        dry_to_topcoat_ar: formData.dry_to_topcoat_ar || '',
        initial_setting: formData.initial_setting || '',
        initial_setting_ar: formData.initial_setting_ar || '',
        fully_cured: formData.fully_cured || '',
        fully_cured_ar: formData.fully_cured_ar || '',
        dry_to_sand: formData.dry_to_sand || '',
        dry_to_sand_ar: formData.dry_to_sand_ar || '',
        drying_time_note: formData.drying_time_note || '',
        drying_time_note_ar: formData.drying_time_note_ar || '',
        safety_note: formData.safety_note || '',
        safety_note_ar: formData.safety_note_ar || '',
      };

      let productId = id;

      // 3. حفظ/تحديث المنتج
      if (id) {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', id);
        if (error) throw error;
        productId = id;
      } else {
        const { data, error } = await supabase
          .from('products')
          .insert([productData])
          .select('id')
          .single();
        if (error) throw error;
        productId = data.id;
      }

      if (!productId) throw new Error('Failed to get product ID');

      // 4. ✅ معالجة علاقة المواد (Many-to-Many)
     // 4. ✅ معالجة علاقة المواد (Many-to-Many)
if (Array.isArray(formData.material_id)) {
  // ✅ تصفية القيم: تأكد أن كل قيمة هي UUID صالح (غير فارغة)
  const validMaterialIds = formData.material_id.filter(
    (id: any) => id && typeof id === 'string' && id.trim() !== ''
  );

  // احذف العلاقات القديمة
  const { error: deleteError } = await supabase
    .from('product_materials')
    .delete()
    .eq('product_id', productId);
  
  if (deleteError) console.error('Error deleting old materials:', deleteError);

  // أدخل العلاقات الجديدة فقط إذا كانت هناك مواد محددة
  if (validMaterialIds.length > 0) {
    const materialRelations = validMaterialIds.map((materialId: string) => ({
      product_id: productId,
      material_id: materialId,
    }));

    const { error: insertError } = await supabase
      .from('product_materials')
      .insert(materialRelations);
    
    if (insertError) throw insertError;
  }
}

      // 5. معالجة الصور
      if (images.length > 0) {
        // احذف الصور القديمة إذا كنت في وضع التعديل
        if (isEditing) {
          await supabase
            .from('product_images')
            .delete()
            .eq('product_id', productId);
        }

        // أدخل الصور الجديدة
        const imagesToInsert = images.map(img => ({
          product_id: productId,
          image_url: img.image_url,
          is_main: img.isMain || false,
        }));

        const { error: imagesError } = await supabase
          .from('product_images')
          .insert(imagesToInsert);
        
        if (imagesError) throw imagesError;
      } 

      alert('Product saved successfully!');
      navigate('/admin/products');
      
    } catch (err) {
  console.error('Save error:', err);

  // ✅ عرض رسالة الخطأ الكاملة من Supabase
  if (err && typeof err === 'object' && 'message' in err) {
    alert(`Failed to save product:\n\n${err.message}\n\nCheck console for details.`);
  } else {
    alert('Failed to save product: Unknown error. Check console for details.');
  }
}
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