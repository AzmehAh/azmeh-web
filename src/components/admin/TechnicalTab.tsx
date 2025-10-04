// src/components/admin/TechnicalTab.tsx
import React from 'react';
import BilingualInput from './BilingualInput';

interface Props {
  data: any;
  onChange: (field: string, value: any) => void;
}

export const TechnicalTab: React.FC<Props> = ({ data, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(e.target.name, e.target.value);
  };

  const fields = [
    { en: 'number_of_coats', label: 'Number of Coats' },
    { en: 'tensile_adhesion_strength', label: 'Tensile Adhesion Strength' },
    { en: 'material_consumption', label: 'Material Consumption' },
    { en: 'viscosity', label: 'Viscosity' },
    { en: 'weather_resistance', label: 'Weather Resistance' },
    { en: 'compressive_strength', label: 'Compressive Strength' },
    { en: 'tear_resistance', label: 'Tear Resistance' },
    { en: 'elongation_at_rupture', label: 'Elongation at Rupture' },
    { en: 'tensile_strength_100', label: 'Tensile Strength at 100% Elongation' },
    { en: 'tensile_strength_50', label: 'Tensile Strength at 50% Elongation' },
    { en: 'specific_gravity_mixed', label: 'Specific Gravity (Mixed)' },
    { en: 'solvent_resistance', label: 'Solvent Resistance' },
    { en: 'chemical_resistance', label: 'Chemical Resistance' },
    { en: 'abrasion_resistance', label: 'Abrasion Resistance' },
    { en: 'friction_resistance', label: 'Friction Resistance' },
    { en: 'washability', label: 'Washability' },
    { en: 'water_resistance', label: 'Water Resistance' },
    { en: 'theoretical_spreading_rate', label: 'Theoretical Spreading Rate' },
    { en: 'recommended_film_thickness', label: 'Recommended Film Thickness' },
    { en: 'temperature_resistance', label: 'Temperature Resistance' },
    { en: 'solvent_splash_resistance', label: 'Solvent Splash Resistance' },
    { en: 'sandability', label: 'Sandability' },
    { en: 'adhesion', label: 'Adhesion' },
    { en: 'flexibility', label: 'Flexibility' },
    { en: 'voc', label: 'VOC' },
    { en: 'volume_solids', label: 'Volume Solids' },
    { en: 'gloss', label: 'Gloss' },
    { en: 'color', label: 'Color' },
    { en: 'component_a', label: 'Component A' },
    { en: 'component_b', label: 'Component B' },
    { en: 'note', label: 'Note' }
  ];

  return (
    <div className="space-y-6">
      {fields.map(field => (
        <BilingualInput
          key={field.en}
          label={field.label}
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
