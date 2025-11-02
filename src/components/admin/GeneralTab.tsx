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
const packagingStrings = Array.isArray(data.packaging)
  ? data.packaging.map(item => item.size || '')
  : [];

const packagingArStrings = Array.isArray(data.packaging_ar)
  ? data.packaging_ar.map(item => item.size || '')
  : [];
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
// في الـ onChange لاختيار المواد
const handleMaterialChange = (selectedMaterials: string[]) => {
  handleInputChange('material_id', selectedMaterials); // ✅ تمرير مصفوفة
};
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
{/* Material - Checkboxes */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Material / المادة *
  </label>
  <div className="border border-gray-200 rounded-lg p-3 max-h-48 overflow-y-auto">
    {materials && materials.length > 0 ? (
      materials.map(material => {
        const isChecked = Array.isArray(data.material_id) && data.material_id.includes(material.id);
        return (
          <div key={material.id} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={`material-${material.id}`}
              checked={isChecked}
              onChange={(e) => {
                const current = Array.isArray(data.material_id) ? [...data.material_id] : [];
                if (e.target.checked) {
                  onChange('material_id', [...current, material.id]);
                } else {
                  onChange('material_id', current.filter(id => id !== material.id));
                }
              }}
              className="h-4 w-4 text-[#0055A3] rounded focus:ring-[#0055A3]"
            />
            <label
              htmlFor={`material-${material.id}`}
              className="mr-2 text-sm text-gray-700 cursor-pointer"
            >
              {material.name_ar && material.name
                ? `${material.name_ar} / ${material.name}`
                : material.name_ar || material.name || 'Unnamed'}
            </label>
          </div>
        );
      })
    ) : (
      <p className="text-gray-500 text-sm">No materials available</p>
    )}
  </div>
  {(!materials || materials.length === 0) && (
    <p className="text-red-500 text-sm mt-1">No materials found. Please add materials first.</p>
  )}
</div>
{/* Usage - Checkboxes */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Usage / الاستخدام *
  </label>
  <div className="border border-gray-200 rounded-lg p-3 max-h-48 overflow-y-auto">
    {usages && usages.length > 0 ? (
      usages.map(usage => {
        const isChecked = Array.isArray(data.usage_id) && data.usage_id.includes(usage.id);
        return (
          <div key={usage.id} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={`usage-${usage.id}`}
              checked={isChecked}
              onChange={(e) => {
                const current = Array.isArray(data.usage_id) ? [...data.usage_id] : [];
                if (e.target.checked) {
                  onChange('usage_id', [...current, usage.id]);
                } else {
                  onChange('usage_id', current.filter(id => id !== usage.id));
                }
              }}
              className="h-4 w-4 text-[#0055A3] rounded focus:ring-[#0055A3]"
            />
            <label
              htmlFor={`usage-${usage.id}`}
              className="mr-2 text-sm text-gray-700 cursor-pointer"
            >
              {usage.name_ar && usage.name
                ? `${usage.name_ar} / ${usage.name}`
                : usage.name_ar || usage.name || 'Unnamed'}
            </label>
          </div>
        );
      })
    ) : (
      <p className="text-gray-500 text-sm">No usages available</p>
    )}
  </div>
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

      
<BilingualArrayInput
  label="Packaging Sizes / أحجام العبوة"
  valueEn={packagingStrings}
  valueAr={packagingArStrings}
  onChangeEn={(sizes) => {
    // عند الحفظ، احفظ كمصفوفة كائنات مرة أخرى
    const formatted = sizes.map(size => ({ size }));
    onChange('packaging', formatted);
  }}
  onChangeAr={(sizes) => {
    const formatted = sizes.map(size => ({ size }));
    onChange('packaging_ar', formatted);
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
}; 