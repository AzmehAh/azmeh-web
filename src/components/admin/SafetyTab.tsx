// src/components/admin/SafetyTab.tsx
import React from 'react';
import { ArrayInputField } from './FormComponents';

interface Props {
  data: any;
  onChange: (field: string, value: any) => void;
}

export const SafetyTab: React.FC<Props> = ({ data, onChange }) => {
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
    <div className="grid grid-cols-1 gap-6">
      <ArrayInputField
        label="Safety Precautions"
        items={data.safety_precautions || []}
        onAdd={() => addArrayItem('safety_precautions')}
        onRemove={(idx) => removeArrayItem('safety_precautions', idx)} 
        onChange={(idx, val) => handleArrayChange('safety_precautions', idx, val)}
      />

      <ArrayInputField
        label="First Aid Measures"
        items={data.safety_first_aid || []}
        onAdd={() => addArrayItem('safety_first_aid')}
        onRemove={(idx) => removeArrayItem('safety_first_aid', idx)}
        onChange={(idx, val) => handleArrayChange('safety_first_aid', idx, val)}
      />
    </div>
  );
};
