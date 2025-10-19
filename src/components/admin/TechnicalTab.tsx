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
    { en: 'number_of_coats', labelEn: 'Number of Coats', labelAr: 'عدد الطبقات' },
    { en: 'tensile_adhesion_strength', labelEn: 'Tensile Adhesion Strength', labelAr: 'قوة التماسك الشدّي' },
    { en: 'material_consumption',labelEn: 'Material Consumption', labelAr: 'استهلاك المادة' },
    { en: 'viscosity', labelEn: 'Viscosity', labelAr: 'اللزوجة' },
    { en: 'weather_resistance', labelEn: 'Weather Resistance', labelAr: 'مقاومة العوامل الجوية' },
    { en: 'compressive_strength', labelEn: 'Compressive Strength', labelAr: 'مقاومة الانضغاط' },
    { en: 'tear_resistance', labelEn: 'Tear Resistance', labelAr: 'مقاومة التمزق' },
    { en: 'elongation_at_rupture', labelEn: 'Elongation at Rupture', labelAr: 'الاستطالة عند الانكسار' },
    { en: 'tensile_strength_100', labelEn: 'Tensile Strength at 100% Elongation', labelAr: 'مقاومة الشد عند استطالة 100%' },
    { en: 'tensile_strength_50', labelEn: 'Tensile Strength at 50% Elongation', labelAr: 'مقاومة الشد عند استطالة 50%' },
    { en: 'specific_gravity_mixed', labelEn: 'Specific Gravity (Mixed)', labelAr: 'الكثافة النوعية (بعد الخلط)' },
    { en: 'specific_gravity', labelEn: 'Specific Gravity', labelAr: 'الكثافة النوعية' },
    { en: 'solvent_resistance', labelEn: 'Solvent Resistance', labelAr: 'مقاومة المذيبات' },
    { en: 'chemical_resistance', labelEn: 'Chemical Resistance', labelAr: 'مقاومة المواد الكيميائية' },
    { en: 'abrasion_resistance', labelEn: 'Abrasion Resistance', labelAr: 'مقاومة التآكل' },
    { en: 'friction_resistance', labelEn: 'Friction Resistance', labelAr: 'مقاومة الاحتكاك' },
    { en: 'washability', labelEn: 'Washability', labelAr: 'قابلية الغسل' },
    { en: 'water_resistance', labelEn: 'Water Resistance', labelAr: 'مقاومة الماء' },
    { en: 'theoretical_spreading_rate', labelEn: 'Theoretical Spreading Rate', labelAr: 'معدل الانتشار النظري' },
    { en: 'recommended_film_thickness', labelEn: 'Recommended Film Thickness', labelAr: 'سماكة الطبقة الموصى بها' },
    { en: 'temperature_resistance', labelEn: 'Temperature Resistance', labelAr: 'مقاومة درجات الحرارة' },
    { en: 'solvent_splash_resistance',labelEn: 'Solvent Splash Resistance', labelAr: 'مقاومة رش المذيبات' },
    { en: 'sandability', labelEn: 'Sandability', labelAr: 'قابلية السنفرة' },
    { en: 'adhesion', labelEn: 'Adhesion', labelAr: 'الالتصاق' },
    { en: 'flexibility', labelEn: 'Flexibility', labelAr: 'المرونة' },
    { en: 'voc', labelEn: 'VOC', labelAr: 'مركبات عضوية متطايرة (VOC)' },
    { en: 'volume_solids', labelEn: 'Volume Solids', labelAr: 'نسبة المواد الصلبة بالحجم' },
    { en: 'gloss', labelEn: 'Gloss', labelAr: 'اللمعان' },
    { en: 'color', labelEn: 'Color', labelAr: 'اللون' },
    { en: 'component_a', labelEn: 'Component A', labelAr: 'المكوّن أ' },
    { en: 'component_b', labelEn: 'Component B', labelAr: 'المكوّن ب' },
    { en: 'note', labelEn: 'Note', labelAr: 'ملاحظة' }
  ];

  return (
    <div className="space-y-6">
      {fields.map(field => (
        <BilingualInput
          key={field.en}
          labelEn={field.labelEn}
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