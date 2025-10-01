// src/components/admin/SafetyTab.tsx
import React from 'react';
import { InputField } from './FormComponents';

interface Props {
  data: any;
  onChange: (field: string, value: any) => void;
}

export const SafetyTab: React.FC<Props> = ({ data, onChange }) => {
  const handleChange = (field: string, value: any) => onChange(field, value);

  const handleArrayFieldChange = (field: string, value: string) => {
    const arrayValue = value.split(',').map(item => item.trim()).filter(item => item.length > 0);
    onChange(field, arrayValue);
  };

  return (
    <div className="space-y-4">
      <InputField
        label="Safety Precautions"
        value={Array.isArray(data.safety_precautions) ? data.safety_precautions.join(', ') : data.safety_precautions || ''}
        onChange={(v) => handleArrayFieldChange('safety_precautions', v)}
        type="textarea"
      />

      <InputField
        label="First Aid Measures"
        value={Array.isArray(data.safety_first_aid) ? data.safety_first_aid.join(', ') : data.safety_first_aid || ''}
        onChange={(v) => handleArrayFieldChange('safety_first_aid', v)}
        type="textarea"
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Note</label>
        <textarea
          value={data.safety_note || ''}
          onChange={(e) => handleChange('safety_note', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
        />
      </div>
    </div>
  );
};
