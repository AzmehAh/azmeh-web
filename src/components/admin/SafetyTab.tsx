// src/components/admin/SafetyTab.tsx
import React from 'react';
import BilingualInput from './BilingualInput';
import BilingualArrayInput from './BilingualArrayInput';

interface Props {
   any;
  onChange: (field: string, value: any) => void;
}

export const SafetyTab: React.FC<Props> = ({ data, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(e.target.name, e.target.value);
  };

  return (
    <div className="space-y-6">
      <BilingualArrayInput
        labelEn="Safety Precautions"
        labelAr="إجراءات السلامة"
        valueEn={Array.isArray(data.safety_precautions) ? data.safety_precautions : []}
        valueAr={Array.isArray(data.safety_precautions_ar) ? data.safety_precautions_ar : []}
        onChangeEn={(items) => onChange('safety_precautions', items)}
        onChangeAr={(items) => onChange('safety_precautions_ar', items)}
      />

      <BilingualArrayInput
        labelEn="First Aid Measures"
        labelAr="إجراءات الإسعافات الأولية"
        valueEn={Array.isArray(data.safety_first_aid) ? data.safety_first_aid : []}
        valueAr={Array.isArray(data.safety_first_aid_ar) ? data.safety_first_aid_ar : []}
        onChangeEn={(items) => onChange('safety_first_aid', items)}
        onChangeAr={(items) => onChange('safety_first_aid_ar', items)}
      />

      <BilingualInput
        labelEn="Safety Note"
        labelAr="ملاحظة السلامة"
        nameEn="safety_note"
        nameAr="safety_note_ar"
        valueEn={data.safety_note || ''}
        valueAr={data.safety_note_ar || ''}
        onChange={handleChange}
        type="textarea"
      />
    </div>
  );
};