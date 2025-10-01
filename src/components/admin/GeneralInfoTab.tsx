// src/components/admin/GeneralInfoTab.tsx
import React from 'react';
import { InputField, ArrayInputField } from './FormComponents';

interface Props {
  data: any;
  onChange: (field: string, value: any) => void;
}

export const GeneralInfoTab: React.FC<Props> = ({ data, onChange }) => {
  const handleChange = (field: string, value: any) => {
    onChange(field, value);
  };

  const handleArrayChange = (field: string, index: number, value: string) => {
    const arr = [...(data[field] || [])];
    arr[index] = value;
    onChange(field, arr);
  };

  const addArrayItem = (field: string) => {
    const arr = [...(data[field] || []), ''];
    onChange(field, arr);
  };

  const removeArrayItem = (field: string, index: number) => {
    const arr = [...(data[field] || [])];
    arr.splice(index, 1);
    onChange(field, arr);
  };

  return (
    <div className="space-y-4">
      <InputField 
        label="Storing Conditions" 
        value={data.storing_conditions || ''} 
        onChange={(v) => handleChange('storing_conditions', v)} 
      />
      <InputField 
        label="Joint Preparation" 
        value={data.joint_preparation || ''} 
        onChange={(v) => handleChange('joint_preparation', v)} 
      />
      <InputField 
        label="Joint Size" 
        value={data.joint_size || ''} 
        onChange={(v) => handleChange('joint_size', v)} 
      />
      <InputField 
        label="Movement Capacity" 
        value={data.movement_capacity || ''} 
        onChange={(v) => handleChange('movement_capacity', v)} 
      />
      <InputField 
        label="Substrate Treatment" 
        value={data.substrate_treatment || ''} 
        onChange={(v) => handleChange('substrate_treatment', v)} 
      />
      <InputField 
        label="Surface Preparation" 
        value={data.surface_preparation || ''} 
        onChange={(v) => handleChange('surface_preparation', v)} 
      />
      <ArrayInputField
        label="General Features"
        items={data.general_features || []}
        onAdd={() => addArrayItem('general_features')}
        onRemove={(idx) => removeArrayItem('general_features', idx)}
        onChange={(idx, val) => handleArrayChange('general_features', idx, val)}
      />
    <ArrayInputField
  label="Recommended Uses"
  items={data.recommended_uses || []}
  onAdd={() => addArrayItem('recommended_uses')}
  onRemove={(idx) => removeArrayItem('recommended_uses', idx)}
  onChange={(idx, val) => handleArrayChange('recommended_uses', idx, String(val))}
  inputType="text" 
/>

    </div>
  );
}; 