// src/components/admin/ApplicationTab.tsx
import React from 'react';
import { InputField } from './FormComponents';

interface Props {
  data: any;
  onChange: (field: string, value: any) => void;
}

export const ApplicationTab: React.FC<Props> = ({ data, onChange }) => {
  const handleChange = (field: string, value: any) => onChange(field, value);

  return (
    <div className="grid grid-cols-1 gap-4">
      <InputField 
        label="Method of Application" 
        value={data.method_of_application || ''} 
        onChange={(v) => handleChange('method_of_application', v)} 
        type="textarea"
      />

      <InputField 
        label="Mixing Ratio" 
        value={data.mixing_ratio || ''} 
        onChange={(v) => handleChange('mixing_ratio', v)} 
        type="textarea"
      />

      <InputField 
        label="Mixing Note" 
        value={data.mixing_note || ''} 
        onChange={(v) => handleChange('mixing_note', v)} 
        type="textarea"
      />

      <InputField 
        label="Mixing Steps" 
        value={data.mixing_steps || ''} 
        onChange={(v) => handleChange('mixing_steps', v)} 
        type="textarea"
      />

      <InputField 
        label="Pot Life" 
        value={data.pot_life || ''} 
        onChange={(v) => handleChange('pot_life', v)} 
        type="textarea"
      />

      <InputField 
        label="Cleaner / Thinner" 
        value={data.cleaner_thinner || ''} 
        onChange={(v) => handleChange('thinner_cleaner', v)} 
        type="textarea"
      />

      <InputField 
        label="Application Temperature" 
        value={data.application_temperature || ''} 
        onChange={(v) => handleChange('application_temperature', v)} 
        type="textarea"
      />

      <InputField 
        label="Curing Note" 
        value={data.curing_note || ''} 
        onChange={(v) => handleChange('curing_note', v)} 
        type="textarea"
        rows={5}
      />

      <InputField 
        label="Number of Coats" 
        value={data.number_of_coats || ''} 
        onChange={(v) => handleChange('number_of_coats', v)} 
        type="textarea"
      />
    </div>
  );
};
