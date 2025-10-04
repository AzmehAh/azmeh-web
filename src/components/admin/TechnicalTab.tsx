// src/components/admin/TechnicalTab.tsx
import React from 'react';
import BilingualInput from './BilingualInput';

interface Props {
   any;
  onChange: (field: string, value: any) => void;
}

export const TechnicalTab: React.FC<Props> = ({ data, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(e.target.name, e.target.value);
  };

  const fields = [
    { en: 'number_of_coats', label: 'Number of Coats', labelAr: 'عدد الطبقات' },
    { en: 'tensile_adhesion_strength', label: 'Tensile Adhesion Strength', labelAr: 'قوة التماسك الشدّي' },
    { en: 'material_consumption', label: 'Material Consumption', labelAr: 'استهلاك المادة' },
    { en: 'viscosity', label: 'Viscosity', labelAr: 'اللزوجة' },
    { en: 'weather_resistance', label: 'Weather Resistance', labelAr: 'مقاومة العوامل الجوية' },
    { en: 'compressive_strength', label: 'Compressive Strength', labelAr: 'مقاومة الانضغاط' },
    { en: 'tear_resistance', label: 'Tear Resistance', labelAr: 'مقاومة التمزق' },
    { en: 'elongation_at_rupture', label: 'Elongation at Rupture', labelAr: 'الاستطالة عند الانكسار' },
    { en: 'tensile_strength_100', label: 'Tensile Strength at 100% Elongation', labelAr: 'مقاومة الشد عند استطالة 100%' },
    { en: 'tensile_strength_50', label: 'Tensile Strength at 50% Elongation', labelAr: 'مقاومة الشد عند استطالة 50%' },
    { en: 'specific_gravity_mixed', label: 'Specific Gravity (Mixed)', labelAr: 'الكثافة النوعية (بعد الخلط)' },
    { en: 'solvent_resistance', label: 'Solvent Resistance', labelAr: 'مقاومة المذيبات' },
    { en: 'chemical_resistance', label: 'Chemical Resistance', labelAr: 'مقاومة المواد الكيميائية' },
    { en: 'abrasion_resistance', label: 'Abrasion Resistance', labelAr: 'مقاومة التآكل' },
    { en: 'friction_resistance', label: 'Friction Resistance', labelAr: 'مقاومة الاحتكاك' },
    { en: 'washability', label: 'Washability', labelAr: 'قابلية الغسل' },
    { en: 'water_resistance', label: 'Water Resistance', labelAr: 'مقاومة الماء' },
    { en: 'theoretical_spreading_rate', label: 'Theoretical Spreading Rate', labelAr: 'معدل الانتشار النظري' },
    { en: 'recommended_film_thickness', label: 'Recommended Film Thickness', labelAr: 'سماكة الطبقة الموصى بها' },
    { en: 'temperature_resistance', label: 'Temperature Resistance', labelAr: 'مقاومة درجات الحرارة' },
    { en: 'solvent_splash_resistance', label: 'Solvent Splash Resistance', labelAr: 'مقاومة رش المذيبات' },
    { en: 'sandability', label: 'Sandability', labelAr: 'قابلية السنفرة' },
    { en: 'adhesion', label: 'Adhesion', labelAr: 'الالتصاق' },
    { en: 'flexibility', label: 'Flexibility', labelAr: 'المرونة' },
    { en: 'voc', label: 'VOC', labelAr: 'مركبات عضوية متطايرة (VOC)' },
    { en: 'volume_solids', label: 'Volume Solids', labelAr: 'نسبة المواد الصلبة بالحجم' },
    { en: 'gloss', label: 'Gloss', labelAr: 'اللمعان' },
    { en: 'color', label: 'Color', labelAr: 'اللون' },
    { en: 'component_a', label: 'Component A', labelAr: 'المكوّن أ' },
    { en: 'component_b', label: 'Component B', labelAr: 'المكوّن ب' },
    { en: 'note', label: 'Note', labelAr: 'ملاحظة' }
  ];

  return (
    <div className="space-y-6">
      {fields.map(field => (
        <BilingualInput
          key={field.en}
          label={field.label}
          labelAr={field.labelAr}
          nameEn={field.en}
          nameAr={`${field.en}_ar`}
          valueEn={data[field.en] || ''}
          valueAr={data[`${field.en}_ar`] || ''}
          onChange={handleChange}
          type="textarea"
        />
      ))}
    </div>
  );
};