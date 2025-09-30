// src/components/admin/ProductForm.tsx
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, Upload, Trash2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useNavigate, useParams } from 'react-router-dom';
import { InputField, ArrayInputField } from './FormComponents';
import { Tab } from './Tab';
import { GeneralInfoTab } from './GeneralInfoTab';
import { ApplicationTab } from './ApplicationTab';
import { TechnicalTab } from './TechnicalTab';
import { DryingTimeTab } from './DryingTimeTab';
import { SafetyTab } from './SafetyTab';

// ... (keep your Product, ProductImage, PackagingSize, TechnicalSpec interfaces exactly as before)

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
// 1. State declarations
const [brands, setBrands] = useState<any[]>([]);
const [types, setTypes] = useState<any[]>([]);
// ... other states

// 2. Define all fetch functions BEFORE useEffect
const fetchBrands = async () => {
  const { data, error } = await supabase.from('brands').select('*');
  if (!error) setBrands(data || []);
};

const fetchTypes = async () => {
  const { data, error } = await supabase.from('types').select('*');
  if (!error) setTypes(data || []);
};

const fetchMaterials = async () => {
  const { data, error } = await supabase.from('materials').select('*');
  if (!error) setMaterials(data || []);
};

const fetchUsages = async () => {
  const { data, error } = await supabase.from('usages').select('*');
  if (!error) setUsages(data || []);
};

// 3. Now useEffect can safely call them
useEffect(() => {
  fetchBrands();
  fetchTypes();
  fetchMaterials();
  fetchUsages();
  if (isEditing) {
    fetchProduct();
  }
}, [id, isEditing]);
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
    storage: '',
    safety_precautions: [],
    safety_first_aid: [],
    technical_specs: [],
    // General Info
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
    material_consumption: '',
    viscosity: '',
    weather_resistance: '',
    compressive_strength: '',
    tear_resistance: '',
    elongation_at_rupture: '',
    tensile_strength_100: '',
    tensile_strength_50: '',
    specific_gravity_mixed: '',
    solvent_resistance: '',
    chemical_resistance: '',
    abrasion_resistance: '',
    friction_resistance: '',
    washability: '',
    water_resistance: '',
    theoretical_spreading_rate: '',
    recommended_film_thickness: '',
    temperature_resistance: '',
    solvent_splash_resistance: '',
    sandability: '',
    adhesion: '',
    flexibility: '',
    voc: '',
    volume_solids: '',
    gloss: '',
    color: '',
    component_a: '',
    component_b: '',
    // Drying Time
    dry_to_touch: '',
    dry_to_handle: '',
    complete_setting: '',
    grouting_time: '',
    adjustability_time: '',
    dry_to_topcoat: '',
    initial_setting: '',
    fully_cured: '',
    dry_to_sand: '',
    drying_time_note: '',
    status: 'active',
  });

  const [images, setImages] = useState<{ image_url: string; isMain?: boolean; id?: string }[]>([]);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(isEditing);
  const [activeTab, setActiveTab] = useState('general'); // 'general', 'application', 'technical', 'drying', 'safety'

  const [brands, setBrands] = useState<any[]>([]);
  const [types, setTypes] = useState<any[]>([]);
  const [materials, setMaterials] = useState<any[]>([]);
  const [usages, setUsages] = useState<any[]>([]);

  // ... (fetchBrands, fetchTypes, fetchMaterials, fetchUsages — same as before)

  useEffect(() => {
    fetchBrands();
    fetchTypes();
    fetchMaterials();
    fetchUsages();
    if (isEditing) fetchProduct();
  }, [id]);

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

      const { data: imagesData } = await supabase
        .from('product_images')
        .select('*')
        .eq('product_id', id);

      const parsed = {
        ...productData,
        features: parseArrayField(productData.features),
        applications: parseArrayField(productData.applications),
        packaging: parseArrayField(productData.packaging),
        technical_specs: parseArrayField(productData.technical_specs),
        instructions: parseArrayField(productData.instructions),
        safety_first_aid: parseArrayField(productData.safety_first_aid),
        safety_precautions: parseArrayField(productData.safety_precautions),
        general_features: parseArrayField(productData.general_features),
        recommended_uses: parseArrayField(productData.recommended_uses),
        mixing_steps: parseArrayField(productData.mixing_steps),
      };

      setFormData(parsed);
      setImages((imagesData || []).map(img => ({ ...img, isMain: img.is_main })));
    } catch (err) {
      alert('Failed to load product');
      navigate('/admin/products');
    } finally {
      setLoading(false);
    }
  };

  // ... (handleUploadImage, uploadImage, removeImage, setMainImage — same as before)

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // ... (same save logic as before — ensure all fields are included)
      const productData = {
        ...formData,
        features: formData.features || [],
        safety_precautions: formData.safety_precautions || [],
        instructions: formData.instructions || [],
        applications: formData.applications || [],
        safety_first_aid: formData.safety_first_aid || [],
        packaging: formData.packaging || [],
        technical_specs: formData.technical_specs || [],
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

      // ... (save images logic — same as before)

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

        {/* General Info Section */}
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">General Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="Product Name *" value={formData.name} onChange={(v) => handleInputChange('name', v)} />
            <InputField label="Product Code *" value={formData.code} onChange={(v) => handleInputChange('code', v)} />
            
            {/* Brand, Type, Material, Usage selects — same as before */}
            <div>
              <label className="block text-sm font-medium mb-2">Brand *</label>
              <select value={formData.brand} onChange={(e) => handleInputChange('brand', e.target.value)} className="w-full p-2 border rounded">
                <option value="">Select</option>
                {brands.map(b => <option key={b.id} value={b.value}>{b.display_name || b.value}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Type *</label>
              <select value={formData.type} onChange={(e) => handleInputChange('type', e.target.value)} className="w-full p-2 border rounded">
                <option value="">Select</option>
                {types.map(t => <option key={t.id} value={t.value}>{t.display_name || t.value}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Material *</label>
              <select value={formData.material} onChange={(e) => handleInputChange('material', e.target.value)} className="w-full p-2 border rounded">
                <option value="">Select</option>
                {materials.map(m => <option key={m.id} value={m.value}>{m.display_name || m.value}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Usage *</label>
              <select value={formData.usage} onChange={(e) => handleInputChange('usage', e.target.value)} className="w-full p-2 border rounded">
                <option value="">Select</option>
                {usages.map(u => <option key={u.id} value={u.value}>{u.display_name || u.value}</option>)}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Status</label>
              <select value={formData.status} onChange={(e) => handleInputChange('status', e.target.value)} className="w-full p-2 border rounded">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="draft">Draft</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Description *</label>
              <textarea value={formData.description} onChange={(e) => handleInputChange('description', e.target.value)} rows={3} className="w-full p-2 border rounded" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Technical Description</label>
              <textarea value={formData.technical_description} onChange={(e) => handleInputChange('technical_description', e.target.value)} rows={4} className="w-full p-2 border rounded" />
            </div>

            {/* Packaging */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Packaging Sizes</label>
              <div className="space-y-2">
                {(formData.packaging || []).map((item: any, idx: number) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      type="text"
                      value={item.size || ''}
                      onChange={(e) => {
                        const newPack = [...(formData.packaging || [])];
                        newPack[idx] = { size: e.target.value };
                        handleInputChange('packaging', newPack);
                      }}
                      className="flex-1 p-2 border rounded"
                    />
                    <button type="button" onClick={() => {
                      const newPack = [...(formData.packaging || [])];
                      newPack.splice(idx, 1);
                      handleInputChange('packaging', newPack);
                    }} className="px-3 text-red-600">Remove</button>
                  </div>
                ))}
                <button type="button" onClick={() => handleInputChange('packaging', [...(formData.packaging || []), { size: '' }])} className="px-3 py-1 bg-gray-100 rounded">
                  + Add Size
                </button>
              </div>
            </div>

            {/* Images — same as before */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Product Images</label>
              <div className="flex gap-4">
                <label className="flex items-center px-4 py-2 bg-[#0055A3] text-white rounded cursor-pointer">
                  <Upload className="w-4 h-4 mr-2" /> Upload
                  <input type="file" multiple accept="image/*" onChange={handleUploadImage} className="hidden" disabled={uploading} />
                </label>
                {uploading && <span>Uploading...</span>}
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                {images.map((img, idx) => (
                  <div key={idx} className="relative">
                    <img src={img.image_url} alt="" className="w-full h-24 object-cover rounded" />
                    <button type="button" onClick={() => {
                      const newImages = [...images];
                      newImages.splice(idx, 1);
                      setImages(newImages);
                    }} className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded">
                      <Trash2 className="w-3 h-3" />
                    </button>
                    <label className="flex items-center mt-1 text-sm">
                      <input type="radio" checked={img.isMain} onChange={() => {
                        const newImages = images.map((i, j) => ({ ...i, isMain: j === idx }));
                        setImages(newImages);
                      }} className="mr-1" />
                      Main
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b">
          <div className="flex">
            <Tab id="general" activeTab={activeTab} label="General Info" onClick={() => setActiveTab('general')} />
            <Tab id="application" activeTab={activeTab} label="Application" onClick={() => setActiveTab('application')} />
            <Tab id="technical" activeTab={activeTab} label="Technical" onClick={() => setActiveTab('technical')} />
            <Tab id="drying" activeTab={activeTab} label="Drying Time" onClick={() => setActiveTab('drying')} />
            <Tab id="safety" activeTab={activeTab} label="Safety" onClick={() => setActiveTab('safety')} />
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6 max-h-[400px] overflow-y-auto">
          {activeTab === 'general' && <GeneralInfoTab data={formData} onChange={handleInputChange} />}
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