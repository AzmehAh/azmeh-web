// src/components/admin/DryingTimeTab.tsx
import React from 'react';
import BilingualInput from './BilingualInput';

interface Props {
  data: any;
  onChange: (field: string, value: any) => void;
}

export const DryingTimeTab: React.FC<Props> = ({ data, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(e.target.name, e.target.value);
  };

  return (
    <div className="space-y-6">
      <BilingualInput
        label="Dry to Touch"
        nameEn="dry_to_touch"
        nameAr="dry_to_touch_ar"
        valueEn={data.dry_to_touch || ''}
        valueAr={data.dry_to_touch_ar || ''}
        onChange={handleChange}
        type="textarea"
      />

      <BilingualInput
        label="Dry to Handle"
        nameEn="dry_to_handle"
        nameAr="dry_to_handle_ar"
        valueEn={data.dry_to_handle || ''}
        valueAr={data.dry_to_handle_ar || ''}
        onChange={handleChange}
        type="textarea"
      />

      <BilingualInput
        label="Complete Setting"
        nameEn="complete_setting"
        nameAr="complete_setting_ar"
        valueEn={data.complete_setting || ''}
        valueAr={data.complete_setting_ar || ''}
        onChange={handleChange}
        type="textarea"
      />

      <BilingualInput
        label="Grouting Time"
        nameEn="grouting_time"
        nameAr="grouting_time_ar"
        valueEn={data.grouting_time || ''}
        valueAr={data.grouting_time_ar || ''}
        onChange={handleChange}
        type="textarea"
      />

      <BilingualInput
        label="Adjustability Time"
        nameEn="adjustability_time"
        nameAr="adjustability_time_ar"
        valueEn={data.adjustability_time || ''}
        valueAr={data.adjustability_time_ar || ''}
        onChange={handleChange}
        type="textarea"
      />

      <BilingualInput
        label="Dry to Topcoat"
        nameEn="dry_to_topcoat"
        nameAr="dry_to_topcoat_ar"
        valueEn={data.dry_to_topcoat || ''}
        valueAr={data.dry_to_topcoat_ar || ''}
        onChange={handleChange}
        type="textarea"
      />

      <BilingualInput
        label="Initial Setting"
        nameEn="initial_setting"
        nameAr="initial_setting_ar"
        valueEn={data.initial_setting || ''}
        valueAr={data.initial_setting_ar || ''}
        onChange={handleChange}
        type="textarea"
      />

      <BilingualInput
        label="Fully Cured"
        nameEn="fully_cured"
        nameAr="fully_cured_ar"
        valueEn={data.fully_cured || ''}
        valueAr={data.fully_cured_ar || ''}
        onChange={handleChange}
        type="textarea"
      />

      <BilingualInput
        label="Dry to Sand"
        nameEn="dry_to_sand"
        nameAr="dry_to_sand_ar"
        valueEn={data.dry_to_sand || ''}
        valueAr={data.dry_to_sand_ar || ''}
        onChange={handleChange}
        type="textarea"
      />

      <BilingualInput
        label="Drying Time Note"
        nameEn="drying_time_note"
        nameAr="drying_time_note_ar"
        valueEn={data.drying_time_note || ''}
        valueAr={data.drying_time_note_ar || ''}
        onChange={handleChange}
        type="textarea"
      />
    </div>
  );
};
