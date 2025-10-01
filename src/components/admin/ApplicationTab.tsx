// src/components/admin/ApplicationTab.tsx
import React from 'react';
import { InputField, ArrayInputField } from './FormComponents';

interface Props {
  data: any;
  onChange: (field: string, value: any) => void;
}

export const ApplicationTab: React.FC<Props> = ({ data, onChange }) => {
  const handleChange = (field: string, value: any) => onChange(field, value);

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
        label="Method of Application" 
        value={data.method_of_application || ''} 
        onChange={(v) => handleChange('method_of_application', v)} 
      />

      <InputField 
        label="Mixing Ratio" 
        value={data.mixing_ratio || ''} 
        onChange={(v) => handleChange('mixing_ratio', v)} 
      />

      <InputField 
        label="Pot Life" 
        value={data.pot_life || ''} 
        onChange={(v) => handleChange('pot_life', v)} 
      />

      <InputField 
        label="Cleaner" 
        value={data.cleaner || ''} 
        onChange={(v) => handleChange('cleaner', v)} 
      />

      <InputField 
        label="Thinner" 
        value={data.thinner || ''} 
        onChange={(v) => handleChange('thinner', v)} 
      />

      <InputField 
        label="Application Temperature" 
        value={data.application_temperature || ''} 
        onChange={(v) => handleChange('application_temperature', v)} 
      />

      {/* Mixing Note */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Mixing Note</label>
        <textarea
          value={data.mixing_note || ''}
          onChange={(e) => handleChange('mixing_note', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
        />
      </div>

      {/* Curing Note */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Curing Note</label>
        <textarea
          value={data.curing_note || ''}
          onChange={(e) => handleChange('curing_note', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
        />
      </div>

      {/* Mixing Steps - Array */}
      <ArrayInputField 
        label="Mixing Steps"
        items={data.mixing_steps || []}
        onAdd={() => addArrayItem('mixing_steps')}
        onRemove={(idx) => removeArrayItem('mixing_steps', idx)}
        onChange={(idx, v) => handleArrayChange('mixing_steps', idx, v)}
      />
    </div>
  );
};
 