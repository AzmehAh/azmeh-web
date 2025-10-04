// src/components/admin/GeneralInfoTab.tsx
import React from 'react';
import BilingualInput from './BilingualInput';

interface Props {
  data: any;
  onChange: (field: string, value: any) => void;
}

export const GeneralInfoTab: React.FC<Props> = ({ data, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(e.target.name, e.target.value);
  };

  return (
    <div className="space-y-6">
      <BilingualInput
        label="Storing Conditions"
        labelAr="شروط التخزين"
        nameEn="storing_conditions"
        nameAr="storing_conditions_ar"
        valueEn={data.storing_conditions || ''}
        valueAr={data.storing_conditions_ar || ''}
        onChange={handleChange}
        type="textarea"
      />

      <BilingualInput
        label="Joint Preparation"
        labelAr="تحضير الفراغ"
        nameEn="joint_preparation"
        nameAr="joint_preparation_ar"
        valueEn={data.joint_preparation || ''}
        valueAr={data.joint_preparation_ar || ''}
        onChange={handleChange}
        type="textarea"
      />

      <BilingualInput
        label="Joint Size"
        labelAr="حجم الفراغ"
        nameEn="joint_size"
        nameAr="joint_size_ar"
        valueEn={data.joint_size || ''}
        valueAr={data.joint_size_ar || ''}
        onChange={handleChange}
        type="textarea"
      />

      <BilingualInput
        label="Movement Capacity"
        labelAr="سعة الحركة"
        nameEn="movement_capacity"
        nameAr="movement_capacity_ar"
        valueEn={data.movement_capacity || ''}
        valueAr={data.movement_capacity_ar || ''}
        onChange={handleChange}
        type="textarea"
      />

      <BilingualInput
        label="Substrate Treatment"
        labelAr="معالجة السطح الأساسي"
        nameEn="substrate_treatment"
        nameAr="substrate_treatment_ar"
        valueEn={data.substrate_treatment || ''}
        valueAr={data.substrate_treatment_ar || ''}
        onChange={handleChange}
        type="textarea"
      />

      <BilingualInput
        label="Surface Preparation"
        labelAr="تحضير السطح"
        nameEn="surface_preparation"
        nameAr="surface_preparation_ar"
        valueEn={data.surface_preparation || ''}
        valueAr={data.surface_preparation_ar || ''}
        onChange={handleChange}
        type="textarea"
      />

      <BilingualInput
        label="Recommended Uses"
        labelAr="الاستخدامات الموصى بها"
        nameEn="recommended_uses"
        nameAr="recommended_uses_ar"
        valueEn={data.recommended_uses || ''}
        valueAr={data.recommended_uses_ar || ''}
        onChange={handleChange}
        type="textarea"
      />
    </div>
  );
};