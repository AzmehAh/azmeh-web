
import React from 'react';
import { Upload, Trash2 } from 'lucide-react';
import { InputField, ArrayInputField } from './FormComponents';

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

  // قائمة الحقول الإضافية الجديدة
  const additionalFields = [
    { key: 'storing_conditions', label: 'Storing Conditions' },
    { key: 'joint_preparation', label: 'Joint Preparation' },
    { key: 'joint_size', label: 'Joint Size' },
    { key: 'movement_capacity', label: 'Movement Capacity' },
    { key: 'substrate_treatment', label: 'Substrate Treatment' },
    { key: 'surface_preparation', label: 'Surface Preparation' },
    { key: 'features', label: 'Features' },
    { key: 'recommended_uses', label: 'Recommended Uses' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Product Name *"
          value={data.name || ''}
          onChange={(v) => onChange('name', v)}
        />
        <InputField
          label="Product Code *"
          value={data.code || ''}
          onChange={(v) => onChange('code', v)}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Brand *</label>
          <select
            value={data.brand || ''}
            onChange={(e) => onChange('brand', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
          >
            <option value="">Select</option> 
            {brands.map((b) => (
              <option key={b.id} value={b.value}>
                {b.display_name || b.value}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Type *</label>
          <select
            value={data.type || ''}
            onChange={(e) => onChange('type', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
          >
            <option value="">Select</option>
            {types.map((t) => (
              <option key={t.id} value={t.value}>
                {t.display_name || t.value}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Material *</label>
          <select
            value={data.material || ''}
            onChange={(e) => onChange('material', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
          >
            <option value="">Select</option>
            {materials.map((m) => (
              <option key={m.id} value={m.value}>
                {m.display_name || m.value}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Usage *</label>
          <select
            value={data.usage || ''}
            onChange={(e) => onChange('usage', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
          >
            <option value="">Select</option>
            {usages.map((u) => (
              <option key={u.id} value={u.value}>
                {u.display_name || u.value}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select
            value={data.status || 'active'}
            onChange={(e) => onChange('status', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
          <textarea
            value={data.description || ''}
            onChange={(e) => onChange('description', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Technical Description</label>
          <textarea
            value={data.technical_description || ''}
            onChange={(e) => onChange('technical_description', e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
          />
        </div>

        {/* Packaging */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Packaging Sizes</label>
          <div className="space-y-2">
            {(data.packaging || []).map((item: any, idx: number) => (
              <div key={idx} className="flex gap-2">
                <input
                  type="text"
                  value={item.size || ''}
                  onChange={(e) => handlePackagingChange(idx, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
                  placeholder="e.g., 1L, 5kg"
                />
                <button
                  type="button"
                  onClick={() => removePackaging(idx)}
                  className="px-3 py-1 text-red-600 border border-red-200 rounded hover:bg-red-50"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addPackaging}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
            >
              + Add Size
            </button>
          </div>
        </div>

        {/* الحقول الإضافية (General Information) */}
        {additionalFields.map((field) => (
          <div key={field.key} className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {field.label}
            </label>
            <textarea
              value={data[field.key] || ''}
              onChange={(e) => onChange(field.key, e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
            />
          </div>
        ))}

        {/* Images */}
        <div className="md:col-span-2">
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