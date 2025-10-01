// src/components/admin/GeneralInfoTab.tsx
import React, { useEffect, useState } from 'react';
import { InputField, ArrayInputField } from './FormComponents';

interface Props {
  data: any;
  onChange: (field: string, value: any) => void;
}

export const GeneralInfoTab: React.FC<Props> = ({ data, onChange }) => {
  const [localData, setLocalData] = useState(data);

  // تحديث البيانات المحلية عندما تتغير الـ props
  useEffect(() => {
    setLocalData(data);
  }, [data]);

  const handleChange = (field: string, value: any) => {
    const updatedData = { ...localData, [field]: value };
    setLocalData(updatedData);
    onChange(field, value);
  };

  const handleArrayChange = (field: string, index: number, value: string) => {
    const arr = [...(localData[field] || [])];
    arr[index] = value;
    handleChange(field, arr);
  };

  const addArrayItem = (field: string) => {
    const arr = [...(localData[field] || []), ''];
    handleChange(field, arr);
  };

  const removeArrayItem = (field: string, index: number) => {
    const arr = [...(localData[field] || [])];
    arr.splice(index, 1);
    handleChange(field, arr);
  };

  return (
    <div className="space-y-4">
      <InputField 
        label="Storing Conditions" 
        value={localData.storing_conditions || ''} 
        onChange={(v) => handleChange('storing_conditions', v)} 
      />
      <InputField 
        label="Joint Preparation" 
        value={localData.joint_preparation || ''} 
        onChange={(v) => handleChange('joint_preparation', v)} 
      />
      <InputField 
        label="Joint Size" 
        value={localData.joint_size || ''} 
        onChange={(v) => handleChange('joint_size', v)} 
      />
      <InputField 
        label="Movement Capacity" 
        value={localData.movement_capacity || ''} 
        onChange={(v) => handleChange('movement_capacity', v)} 
      />
      <InputField 
        label="Substrate Treatment" 
        value={localData.substrate_treatment || ''} 
        onChange={(v) => handleChange('substrate_treatment', v)} 
      />
      <InputField 
        label="Surface Preparation" 
        value={localData.surface_preparation || ''} 
        onChange={(v) => handleChange('surface_preparation', v)} 
      />
     {/* Features */}
<div className="md:col-span-2">
  <label className="block text-sm font-medium text-gray-700 mb-2">Product Features</label>
  <div className="space-y-2">
    {(data.features || []).map((item: any, idx: number) => (
      <div key={idx} className="flex gap-2">
        <input
          type="text"
          value={item || ''} // لأن features مصفوفة من نصوص مباشرة، وليس كائنات
          onChange={(e) => handleFeatureChange(idx, e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
          placeholder="e.g., UV resistance, Water repellent"
        />
        <button
          type="button"
          onClick={() => removeFeature(idx)}
          className="px-3 py-1 text-red-600 border border-red-200 rounded hover:bg-red-50"
        >
          Remove
        </button>
      </div>
    ))}
    <button
      type="button"
      onClick={addFeature}
      className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
    >
      + Add Feature
    </button>
  </div>
</div>
        <InputField 
        label="Recommended Uses" 
        value={localData.Recommended_Uses || ''} 
        onChange={(v) => handleChange('Recommended Uses', v)} 
      />
    </div>
  );
};