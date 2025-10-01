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
    <div className="grid grid-cols-1 gap-4">
      <InputField
        label="Dry to Touch"
        value={data.dry_to_touch || ''}
        onChange={(v) => handleChange('dry_to_touch', v)}
        type="textarea"
      />

      <InputField
        label="Dry to Handle"
        value={data.dry_to_handle || ''}
        onChange={(v) => handleChange('dry_to_handle', v)}
        type="textarea"
      />

      <InputField
        label="Complete Setting"
        value={data.complete_setting || ''}
        onChange={(v) => handleChange('complete_setting', v)}
        type="textarea"
      />

      <InputField
        label="Grouting Time"
        value={data.grouting_time || ''}
        onChange={(v) => handleChange('grouting_time', v)}
        type="textarea"
      />

      <InputField
        label="Adjustability Time"
        value={data.adjustability_time || ''}
        onChange={(v) => handleChange('adjustability_time', v)}
        type="textarea"
      />

      <InputField
        label="Dry to Topcoat"
        value={data.dry_to_topcoat || ''}
        onChange={(v) => handleChange('dry_to_topcoat', v)}
        type="textarea"
      />

      <InputField
        label="Initial Setting"
        value={data.initial_setting || ''}
        onChange={(v) => handleChange('initial_setting', v)}
        type="textarea"
      />

      <InputField
        label="Fully Cured"
        value={data.fully_cured || ''}
        onChange={(v) => handleChange('fully_cured', v)}
        type="textarea"
      />

      <InputField
        label="Dry to Sand"
        value={data.dry_to_sand || ''}
        onChange={(v) => handleChange('dry_to_sand', v)}
        type="textarea" 
      />

      <InputField
        label="Note"
        value={data.drying_time_note || ''}
        onChange={(v) => handleChange('drying_time_note', v)}
        type="textarea"
        rows={4}
      />
    </div>
  );
};
