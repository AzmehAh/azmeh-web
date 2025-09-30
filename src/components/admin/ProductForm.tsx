import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Save, 
  ArrowLeft, 
  Upload, 
  Trash2, 
  Plus,
  X
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; 
import { GeneralInfoModal } from './GeneralInfoModal';
import { ApplicationModal } from './ApplicationModal';
import { TechnicalModal } from './TechnicalModal';
import { DryingTimeModal } from './DryingTimeModal';

// =============== أنواع البيانات المحدثة ===============
interface ProductImage {
  id?: string;
  image_url: string;
  product_id?: string;
  is_main?: boolean;
}

interface TechnicalSpec { 
  property: string;
  value: string;
}

interface PackagingSize {
  size: string;
}

// =============== Product Interface المحدث ===============
interface Product {
  id: string;
  name: string;
  code: string;
  brand: string;
  type: string;
  material: string;
  usage: string;
  description: string;
  technical_description: string;
  features: string[];
  applications: string[];
  instructions: string[];
  packaging: PackagingSize[];
  storage: string;
  safety_precautions: string[];
  safety_first_aid: string[];
  technical_specs: TechnicalSpec[];

  // === General Information ===
  storing_conditions?: string;
  joint_preparation?: string;
  joint_size?: string;
  movement_capacity?: string;
  substrate_treatment?: string;
  surface_preparation?: string;
  general_features?: string[];
  recommended_uses?: string[];

  // === Application Instructions ===
  method_of_application?: string;
  mixing_ratio?: string;
  mixing_note?: string;
  mixing_steps?: string[];
  pot_life?: string;
  cleaner?: string;
  thinner_cleaner?: string;
  application_temperature?: string;
  curing_note?: string;

  // === Technical Information ===
  number_of_coats?: string;
  note?: string;
  tensile_adhesion_strength?: string;
  material_consumption?: string;
  viscosity?: string;
  weather_resistance?: string;
  compressive_strength?: string;
  tear_resistance?: string;
  elongation_at_rupture?: string;
  tensile_strength_100?: string;
  tensile_strength_50?: string;
  specific_gravity_mixed?: string;
  solvent_resistance?: string;
  chemical_resistance?: string;
  abrasion_resistance?: string;
  friction_resistance?: string;
  washability?: string;
  water_resistance?: string;
  theoretical_spreading_rate?: string;
  recommended_film_thickness?: string;
  temperature_resistance?: string;
  solvent_splash_resistance?: string;
  sandability?: string;
  adhesion?: string;
  flexibility?: string;
  voc?: string;
  volume_solids?: string;
  gloss?: string;
  color?: string;
  component_a?: string;
  component_b?: string;

  // === Drying Time ===
  dry_to_touch?: string;
  dry_to_handle?: string;
  complete_setting?: string;
  grouting_time?: string;
  adjustability_time?: string;
  dry_to_topcoat?: string;
  initial_setting?: string;
  fully_cured?: string;
  dry_to_sand?: string;
  drying_time_note?: string;

  status: 'active' | 'inactive' | 'draft';
  created_at?: string;
}

const parseArrayField = (field: any): any[] => {
  if (Array.isArray(field)) return field;
  if (typeof field === 'string') {
    try {
      return JSON.parse(field);
    } catch (e) {
      return [];
    }
  }
  return [];
};

// =============== مكون InputField للاستخدام المتكرر ===============
const InputField = ({ label, value, onChange, type = "text" }: { 
  label: string; 
  value: string; 
  onChange: (v: string) => void;
  type?: string;
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
    />
  </div>
);

// =============== مكون ArrayInputField ===============
const ArrayInputField = ({ 
  label, 
  items, 
  onAdd, 
  onRemove, 
  onChange 
}: { 
  label: string; 
  items: string[]; 
  onAdd: () => void; 
  onRemove: (index: number) => void; 
  onChange: (index: number, value: string) => void; 
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <div className="space-y-2">
      {items.map((item, idx) => (
        <div key={idx} className="flex gap-2">
          <input
            type="text"
            value={item}
            onChange={(e) => onChange(idx, e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
          />
          <button
            type="button"
            onClick={() => onRemove(idx)}
            className="px-2 py-1 text-red-600 border border-red-200 rounded hover:bg-red-50"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={onAdd}
        className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
      >
        + Add {label.split(' ')[0]}
      </button>
    </div>
  </div>
);

// =============== المكون الرئيسي ===============
const ProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;

  const [formData, setFormData] = useState<Partial<Product>>({
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
    general_features: [],
    recommended_uses: [],
    // Application
    mixing_steps: [],
    // Technical
    // Drying Time
    status: 'active'
  });

  const [images, setImages] = useState<ProductImage[]>([]);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(isEditing);

  // =============== حالات فتح المودالات ===============
  const [isGeneralModalOpen, setIsGeneralModalOpen] = useState(false);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [isTechnicalModalOpen, setIsTechnicalModalOpen] = useState(false);
  const [isDryingModalOpen, setIsDryingModalOpen] = useState(false);

  const [brands, setBrands] = useState<any[]>([]);
  const [types, setTypes] = useState<any[]>([]);
  const [materials, setMaterials] = useState<any[]>([]);
  const [usages, setUsages] = useState<any[]>([]);

  // ... (كل دوال fetchBrands, fetchTypes, ... كما هي - لن أكررها لتوفير المساحة)

  useEffect(() => {
    fetchBrands();
    fetchTypes();
    fetchMaterials();
    fetchUsages();
    if (isEditing) {
      fetchProduct();
    }
  }, [id, isEditing]);

  // =============== دوال fetch (كما هي) ===============
  const fetchBrands = async () => { /* ... */ };
  const fetchTypes = async () => { /* ... */ };
  const fetchMaterials = async () => { /* ... */ };
  const fetchUsages = async () => { /* ... */ };

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

      const parsedProductData = {
        ...productData,
        features: parseArrayField(productData.features),
        applications: parseArrayField(productData.applications),
        packaging: parseArrayField(productData.packaging),
        technical_specs: parseArrayField(productData.technical_specs),
        instructions: parseArrayField(productData.instructions),
        safety_first_aid: parseArrayField(productData.safety_first_aid),
        safety_precautions: parseArrayField(productData.safety_precautions),
        // تهيئة الحقول الجديدة
        general_features: parseArrayField(productData.general_features),
        recommended_uses: parseArrayField(productData.recommended_uses),
        mixing_steps: parseArrayField(productData.mixing_steps),
      };

      setFormData(parsedProductData);
      const imagesWithMainFlag = (imagesData || []).map(img => ({
        ...img,
        isMain: img.is_main || false
      }));
      setImages(imagesWithMainFlag);
    } catch (error) {
      console.error('Error fetching product:', error);
      alert('Error loading product');
      navigate('/admin/products');
    } finally {
      setLoading(false);
    }
  };

  // =============== دوال الصور (كما هي) ===============
  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => { /* ... */ };
  const uploadImage = async (file: File) => { /* ... */ };
  const removeImage = (index: number) => { /* ... */ };
  const setMainImage = (index: number) => { /* ... */ };

  // =============== دوال التعامل مع الحقول ===============
  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayInputChange = (field: string, index: number, value: string) => {
    setFormData(prev => {
      const currentArray = Array.isArray(prev[field]) ? [...(prev[field] as string[])] : [];
      currentArray[index] = value;
      return { ...prev, [field]: currentArray };
    });
  };

  const addArrayItem = (field: string, defaultValue: any = '') => {
    setFormData(prev => {
      const currentArray = Array.isArray(prev[field]) ? [...(prev[field] as any[])] : [];
      return { ...prev, [field]: [...currentArray, defaultValue] };
    });
  };

  const removeArrayItem = (field: string, index: number) => {
    setFormData(prev => {
      const currentArray = Array.isArray(prev[field]) ? [...(prev[field] as any[])] : [];
      return { ...prev, [field]: currentArray.filter((_, i) => i !== index) };
    });
  };

  // =============== دالة الحفظ (كما هي) ===============
  const handleSave = async () => {
    setSaving(true);
    try {
      let productId = id;
      const productData = {
        ...formData,
        features: Array.isArray(formData.features) ? formData.features : [],
        safety_precautions: Array.isArray(formData.safety_precautions) ? formData.safety_precautions : [],
        instructions: Array.isArray(formData.instructions) ? formData.instructions : [],
        applications: Array.isArray(formData.applications) ? formData.applications : [],
        safety_first_aid: Array.isArray(formData.safety_first_aid) ? formData.safety_first_aid : [],
        packaging: formData.packaging || [],
        technical_specs: formData.technical_specs || [],
        // الحقول الجديدة
        general_features: formData.general_features || [],
        recommended_uses: formData.recommended_uses || [],
        mixing_steps: formData.mixing_steps || [],
      };

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
          .select();
        if (error) throw error;
        productId = data?.[0]?.id;
      }

      if (productId) {
        const { data: existingImages } = await supabase
          .from('product_images')
          .select('*')
          .eq('product_id', productId);

        const imagesToKeep = images.filter(img => img.id).map(img => img.id);
        const imagesToDelete = existingImages?.filter(img => !imagesToKeep.includes(img.id)) || [];
        for (const img of imagesToDelete) {
          await supabase.from('product_images').delete().eq('id', img.id);
        }

        for (const img of images) {
          if (img.id) {
            await supabase
              .from('product_images')
              .update({ 
                image_url: img.image_url,
                is_main: img.isMain || false
              })
              .eq('id', img.id);
          } else {
            await supabase
              .from('product_images')
              .insert([{ 
                product_id: productId, 
                image_url: img.image_url,
                is_main: img.isMain || false
              }]);
          }
        }
      }

      navigate('/admin/products');
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error saving product');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0055A3]"></div>
      </div>
    );
  }

  // =============== واجهة المستخدم ===============
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <button
            onClick={() => navigate('/admin/products')}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Products
          </button>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEditing ? 'Edit Product' : 'Add New Product'}
          </h1>
          <div className="w-20" />
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(100vh-200px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* ... (كل الحقول الأساسية كما هي: name, code, brand, type, material, usage, description, technical_description, features, applications, instructions, packaging, storage, safety, technical_specs, images) ... */}
            
            {/* Basic Info */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Code *
                </label>
                <input
                  type="text"
                  value={formData.code || ''}
                  onChange={(e) => handleInputChange('code', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brand *
                </label>
                <select
                  value={formData.brand || ''}
                  onChange={(e) => handleInputChange('brand', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                >
                  <option value="">Select a brand</option>
                  {brands.map((b) => (
                    <option key={b.id} value={b.value}>
                      {b.display_name || b.value}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type *
                </label>
                <select
                  value={formData.type || ''}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                >
                  <option value="">Select a type</option>
                  {types.map((t) => (
                    <option key={t.id} value={t.value}>
                      {t.display_name || t.value}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Additional Info */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Material *
                </label>
                <select
                  value={formData.material || ''}
                  onChange={(e) => handleInputChange('material', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                >
                  <option value="">Select a material</option>
                  {materials.map((m) => (
                    <option key={m.id} value={m.value}>
                      {m.display_name || m.value}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Usage *
                </label>
                <select
                  value={formData.usage || ''}
                  onChange={(e) => handleInputChange('usage', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                >
                  <option value="">Select a usage</option>
                  {usages.map((u) => (
                    <option key={u.id} value={u.value}>
                      {u.display_name || u.value}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={formData.status || 'active'}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="mt-6 col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
              />
            </div>

            {/* Technical Description */}
            <div className="mt-6 col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Technical Description
              </label>
              <textarea
                value={formData.technical_description || ''}
                onChange={(e) => handleInputChange('technical_description', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
              />
            </div>

            {/* Features */}
            <div className="mt-6 col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Features
              </label>
              <div className="space-y-2">
                {(formData.features || []).map((item, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => handleArrayInputChange('features', idx, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem('features', idx)}
                      className="px-2 py-1 text-red-600 border border-red-200 rounded hover:bg-red-50"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('features', '')}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                >
                  + Add Feature
                </button>
              </div>
            </div>

            {/* Applications */}
            <div className="mt-6 col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Applications
              </label>
              <div className="space-y-2">
                {(formData.applications || []).map((item, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => handleArrayInputChange('applications', idx, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem('applications', idx)}
                      className="px-2 py-1 text-red-600 border border-red-200 rounded hover:bg-red-50"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('applications', '')}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                >
                  + Add Application
                </button>
              </div>
            </div>

            {/* Instructions */}
            <div className="mt-6 col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Instructions
              </label>
              <div className="space-y-2">
                {(formData.instructions || []).map((item, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => handleArrayInputChange('instructions', idx, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem('instructions', idx)}
                      className="px-2 py-1 text-red-600 border border-red-200 rounded hover:bg-red-50"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('instructions', '')}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                >
                  + Add Instruction
                </button>
              </div>
            </div>

            {/* Packaging */}
            <div className="mt-6 col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Packaging Sizes
              </label>
              <div className="space-y-2">
                {(formData.packaging || []).map((item, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      type="text"
                      value={item.size || ''}
                      onChange={(e) => {
                        const newPackaging = [...(formData.packaging || [])];
                        newPackaging[idx] = { ...newPackaging[idx], size: e.target.value };
                        setFormData(prev => ({ ...prev, packaging: newPackaging }));
                      }}
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                      placeholder="Size (e.g., 1L, 5kg)"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem('packaging', idx)}
                      className="px-2 py-1 text-red-600 border border-red-200 rounded hover:bg-red-50"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('packaging', { size: '' })}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                >
                  + Add Size
                </button>
              </div>
            </div>

            {/* Storage */}
            <div className="mt-6 col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Storage
              </label>
              <ReactQuill
                value={formData.storage || ""}
                onChange={(value) => handleInputChange("storage", value)}
                className="bg-white rounded-lg border border-gray-200"
                theme="snow"
                modules={{
                  toolbar: [
                    [{ header: [1, 2, 3, false] }],
                    ["bold", "italic", "underline", "strike"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["link", "image"],
                    ["clean"],
                  ],
                }}
              />
            </div>

            {/* Product Images */}
            <div className="mt-6 col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Images
              </label>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label className="flex items-center px-4 py-2 bg-[#0055A3] text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Images
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleUploadImage}
                      className="hidden"
                      disabled={uploading}
                    />
                  </label>
                  {uploading && <span className="text-gray-500">Uploading...</span>}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                  {images.map((img, idx) => (
                    <div key={img.id || idx} className="relative flex flex-col items-center group">
                      <div className="relative w-full h-32 rounded border overflow-hidden">
                        <img
                          src={img.image_url}
                          alt={`Product ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        {img.isMain && (
                          <div className="absolute top-2 left-2 px-2 py-1 bg-[#0055A3] text-white text-xs rounded">
                            Main
                          </div>
                        )}
                      </div>
                      <label className="mt-2 flex items-center gap-2 text-sm cursor-pointer">
                        <input
                          type="radio"
                          name="mainImage"
                          checked={img.isMain || false}
                          onChange={() => setMainImage(idx)}
                          className="w-5 h-5 accent-[#0055A3]"
                        />
                        Main Image
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Safety Precautions */}
            <div className="mt-6 col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Safety Precautions
              </label>
              <div className="space-y-2">
                {(formData.safety_precautions || []).map((item, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => handleArrayInputChange('safety_precautions', idx, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem('safety_precautions', idx)}
                      className="px-2 py-1 text-red-600 border border-red-200 rounded hover:bg-red-50"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('safety_precautions', '')}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                >
                  + Add Safety Precaution
                </button>
              </div>
            </div>

            {/* Safety First Aid */}
            <div className="mt-6 col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Safety First Aid
              </label>
              <div className="space-y-2">
                {(formData.safety_first_aid || []).map((item, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => handleArrayInputChange('safety_first_aid', idx, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem('safety_first_aid', idx)}
                      className="px-2 py-1 text-red-600 border border-red-200 rounded hover:bg-red-50"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('safety_first_aid', '')}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                >
                  + Add Safety First Aid
                </button>
              </div>
            </div>

            {/* Technical Specs */}
            <div className="mt-6 col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Technical Specifications
              </label>
              <div className="space-y-2">
                {(formData.technical_specs || []).map((item, idx) => (
                  <div key={idx} className="grid grid-cols-1 md:grid-cols-4 gap-2 items-center">
                    <input
                      type="text"
                      placeholder="Property"
                      value={item.property || ''}
                      onChange={(e) => {
                        const newSpecs = [...(formData.technical_specs || [])];
                        newSpecs[idx] = { ...newSpecs[idx], property: e.target.value };
                        setFormData(prev => ({ ...prev, technical_specs: newSpecs }));
                      }}
                      className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                    />
                    <input
                      type="text"
                      placeholder="Value"
                      value={item.value || ''}
                      onChange={(e) => {
                        const newSpecs = [...(formData.technical_specs || [])];
                        newSpecs[idx] = { ...newSpecs[idx], value: e.target.value };
                        setFormData(prev => ({ ...prev, technical_specs: newSpecs }));
                      }}
                      className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem('technical_specs', idx)}
                      className="px-2 py-2 text-red-600 border border-red-200 rounded hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('technical_specs', { property: '', value: '' })}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                >
                  + Add Specification
                </button>
              </div>
            </div>

            {/* =============== أزرار فتح المودالات =============== */}
            <div className="mt-8 col-span-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button
                type="button"
                onClick={() => setIsGeneralModalOpen(true)}
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition"
              >
                General Information
              </button>
              <button
                type="button"
                onClick={() => setIsApplicationModalOpen(true)}
                className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition"
              >
                Application Instructions
              </button>
              <button
                type="button"
                onClick={() => setIsTechnicalModalOpen(true)}
                className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition"
              >
                Technical Information
              </button>
              <button
                type="button"
                onClick={() => setIsDryingModalOpen(true)}
                className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 transition"
              >
                Drying Time
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t bg-gray-50">
          <button
            onClick={() => navigate('/admin/products')}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-[#0055A3] text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center"
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Product
              </>
            )}
          </button>
        </div>
      </div>

      {/* =============== المودالات =============== */}
      {isGeneralModalOpen && (
        <GeneralInfoModal
          data={formData}
          onChange={handleInputChange}
          onClose={() => setIsGeneralModalOpen(false)}
        />
      )}
      {isApplicationModalOpen && (
        <ApplicationModal
          data={formData}
          onChange={handleInputChange}
          onClose={() => setIsApplicationModalOpen(false)}
        />
      )}
      {isTechnicalModalOpen && (
        <TechnicalModal
          data={formData}
          onChange={handleInputChange}
          onClose={() => setIsTechnicalModalOpen(false)}
        />
      )}
      {isDryingModalOpen && (
        <DryingTimeModal
          data={formData}
          onChange={handleInputChange}
          onClose={() => setIsDryingModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ProductForm;