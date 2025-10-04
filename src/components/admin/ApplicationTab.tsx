// src/components/admin/ApplicationTab.tsx
import React from 'react';
import BilingualInput from './BilingualInput';

interface Props {
  data: any;
  onChange: (field: string, value: any) => void;
}

export const ApplicationTab: React.FC<Props> = ({ data, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(e.target.name, e.target.value);
  };

  return (
    <div className="space-y-6">
      <BilingualInput
        label="Method of Application"
        nameEn="method_of_application"
        nameAr="method_of_application_ar"
        valueEn={data.method_of_application || ''}
        valueAr={data.method_of_application_ar || ''}
        onChange={handleChange}
        type="textarea"
      />

      <BilingualInput
        label="Mixing Ratio"
        nameEn="mixing_ratio"
        nameAr="mixing_ratio_ar"
        valueEn={data.mixing_ratio || ''}
        valueAr={data.mixing_ratio_ar || ''}
        onChange={handleChange}
        type="textarea"
      />

      <BilingualInput
        label="Mixing Note"
        nameEn="mixing_note"
        nameAr="mixing_note_ar"
        valueEn={data.mixing_note || ''}
        valueAr={data.mixing_note_ar || ''}
        onChange={handleChange}
        type="textarea"
      />

      <BilingualInput
        label="Mixing Steps"
        nameEn="mixing_steps"
        nameAr="mixing_steps_ar"
        valueEn={data.mixing_steps || ''}
        valueAr={data.mixing_steps_ar || ''}
        onChange={handleChange}
        type="textarea"
      />

      <BilingualInput
        label="Pot Life"
        nameEn="pot_life"
        nameAr="pot_life_ar"
        valueEn={data.pot_life || ''}
        valueAr={data.pot_life_ar || ''}
        onChange={handleChange}
        type="textarea"
      />

      <BilingualInput
        label="Cleaner"
        nameEn="cleaner"
        nameAr="cleaner_ar"
        valueEn={data.cleaner || ''}
        valueAr={data.cleaner_ar || ''}
        onChange={handleChange}
        type="textarea"
      />

      <BilingualInput
        label="Thinner"
        nameEn="thinner"
        nameAr="thinner_ar"
        valueEn={data.thinner || ''}
        valueAr={data.thinner_ar || ''}
        onChange={handleChange}
        type="textarea"
      />

      <BilingualInput
        label="Application Temperature"
        nameEn="application_temperature"
        nameAr="application_temperature_ar"
        valueEn={data.application_temperature || ''}
        valueAr={data.application_temperature_ar || ''}
        onChange={handleChange}
        type="textarea"
      />

      <BilingualInput
        label="Curing Note"
        nameEn="curing_note"
        nameAr="curing_note_ar"
        valueEn={data.curing_note || ''}
        valueAr={data.curing_note_ar || ''}
        onChange={handleChange}
        type="textarea"
      />

      <BilingualInput
        label="Number of Coats"
        nameEn="number_of_coats"
        nameAr="number_of_coats_ar"
        valueEn={data.number_of_coats || ''}
        valueAr={data.number_of_coats_ar || ''}
        onChange={handleChange}
        type="textarea"
      />

      <BilingualInput
        label="Application Note"
        nameEn="note_application"
        nameAr="note_application_ar"
        valueEn={data.note_application || ''}
        valueAr={data.note_application_ar || ''}
        onChange={handleChange}
        type="textarea"
      />
    </div>
  );
};
