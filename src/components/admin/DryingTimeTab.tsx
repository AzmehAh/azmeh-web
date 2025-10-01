// src/components/admin/DryingTimeTab.tsx
import React from 'react';
import { InputField } from './FormComponents';

interface Props {
  data: any;
  onChange: (field: string, value: any) => void;
}

export const DryingTimeTab: React.FC<Props> = ({ data, onChange }) => { 
  const handleChange = (field: string, value: any) => onChange(field, value);

  return (
    <div className="space-y-4">
      <InputField label="Dry to Touch" value={data.dry_to_touch || ''} onChange={(v) => handleChange('dry_to_touch', v)} />
      <InputField label="Dry to Handle" value={data.dry_to_handle || ''} onChange={(v) => handleChange('dry_to_handle', v)} />
      <InputField label="Complete Setting" value={data.complete_setting || ''} onChange={(v) => handleChange('complete_setting', v)} />
      <InputField label="Grouting Time" value={data.grouting_time || ''} onChange={(v) => handleChange('grouting_time', v)} />
      <InputField label="Adjustability Time" value={data.adjustability_time || ''} onChange={(v) => handleChange('adjustability_time', v)} />
      <InputField label="Dry to Topcoat" value={data.dry_to_topcoat || ''} onChange={(v) => handleChange('dry_to_topcoat', v)} />
      <InputField label="Initial Setting" value={data.initial_setting || ''} onChange={(v) => handleChange('initial_setting', v)} />
      <InputField label="Fully Cured" value={data.fully_cured || ''} onChange={(v) => handleChange('fully_cured', v)} />
      <InputField label="Dry to Sand" value={data.dry_to_sand || ''} onChange={(v) => handleChange('dry_to_sand', v)} />
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Note</label>
        <textarea
          value={data.drying_time_note || ''}
          onChange={(e) => handleChange('drying_time_note', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
        />
      </div>
    </div>
  );
}; 