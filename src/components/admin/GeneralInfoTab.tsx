// src/components/admin/GeneralInfoTab.tsx
import React, { useEffect, useState } from 'react';
import { InputField, ArrayInputField } from './FormComponents';

interface Props {
  data: any;
  onChange: (field: string, value: any) => void;
}

export const GeneralInfoTab: React.FC<Props> = ({ data, onChange }) => {
  const [localData, setLocalData] = useState(data);

  
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
    
        <InputField 
        label="Recommended Uses" 
        value={localData.Recommended_Uses || ''} 
        onChange={(v) => handleChange('Recommended Uses', v)} 
      />
    </div>
  );
};