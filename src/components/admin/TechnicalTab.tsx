// src/components/admin/TechnicalTab.tsx
import React from 'react';
import { InputField } from './FormComponents';

interface Props {
  data: any;
  onChange: (field: string, value: any) => void;
}

export const TechnicalTab: React.FC<Props> = ({ data, onChange }) => {
  const handleChange = (field: string, value: any) => onChange(field, value);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InputField label="Number of Coats" value={data.number_of_coats || ''} onChange={(v) => handleChange('number_of_coats', v)} />
      <InputField label="Tensile Adhesion Strength" value={data.tensile_adhesion_strength || ''} onChange={(v) => handleChange('tensile_adhesion_strength', v)} />
      <InputField label="Material Consumption" value={data.material_consumption || ''} onChange={(v) => handleChange('material_consumption', v)} />
      <InputField label="Viscosity" value={data.viscosity || ''} onChange={(v) => handleChange('viscosity', v)} />
      <InputField label="Weather Resistance" value={data.weather_resistance || ''} onChange={(v) => handleChange('weather_resistance', v)} />
      <InputField label="Compressive Strength" value={data.compressive_strength || ''} onChange={(v) => handleChange('compressive_strength', v)} />
      <InputField label="Tear Resistance" value={data.tear_resistance || ''} onChange={(v) => handleChange('tear_resistance', v)} />
      <InputField label="Elongation at Rupture" value={data.elongation_at_rupture || ''} onChange={(v) => handleChange('elongation_at_rupture', v)} />
      <InputField label="Tensile Strength at 100% Elongation" value={data.tensile_strength_100 || ''} onChange={(v) => handleChange('tensile_strength_100', v)} />
      <InputField label="Tensile Strength at 50% Elongation" value={data.tensile_strength_50 || ''} onChange={(v) => handleChange('tensile_strength_50', v)} />
      <InputField label="Specific Gravity (Mixed)" value={data.specific_gravity_mixed || ''} onChange={(v) => handleChange('specific_gravity_mixed', v)} />
      <InputField label="Solvent Resistance" value={data.solvent_resistance || ''} onChange={(v) => handleChange('solvent_resistance', v)} />
      <InputField label="Chemical Resistance" value={data.chemical_resistance || ''} onChange={(v) => handleChange('chemical_resistance', v)} />
      <InputField label="Abrasion Resistance" value={data.abrasion_resistance || ''} onChange={(v) => handleChange('abrasion_resistance', v)} />
      <InputField label="Friction Resistance" value={data.friction_resistance || ''} onChange={(v) => handleChange('friction_resistance', v)} />
      <InputField label="Washability" value={data.washability || ''} onChange={(v) => handleChange('washability', v)} />
      <InputField label="Water Resistance" value={data.water_resistance || ''} onChange={(v) => handleChange('water_resistance', v)} />
      <InputField label="Theoretical Spreading Rate" value={data.theoretical_spreading_rate || ''} onChange={(v) => handleChange('theoretical_spreading_rate', v)} />
      <InputField label="Recommended Film Thickness" value={data.recommended_film_thickness || ''} onChange={(v) => handleChange('recommended_film_thickness', v)} />
      <InputField label="Temperature Resistance" value={data.temperature_resistance || ''} onChange={(v) => handleChange('temperature_resistance', v)} />
      <InputField label="Solvent Splash Resistance" value={data.solvent_splash_resistance || ''} onChange={(v) => handleChange('solvent_splash_resistance', v)} />
      <InputField label="Sandability" value={data.sandability || ''} onChange={(v) => handleChange('sandability', v)} />
      <InputField label="Adhesion" value={data.adhesion || ''} onChange={(v) => handleChange('adhesion', v)} />
      <InputField label="Flexibility" value={data.flexibility || ''} onChange={(v) => handleChange('flexibility', v)} />
      <InputField label="VOC" value={data.voc || ''} onChange={(v) => handleChange('voc', v)} />
      <InputField label="Volume Solids" value={data.volume_solids || ''} onChange={(v) => handleChange('volume_solids', v)} />
      <InputField label="Gloss" value={data.gloss || ''} onChange={(v) => handleChange('gloss', v)} />
      <InputField label="Color" value={data.color || ''} onChange={(v) => handleChange('color', v)} />
      <InputField label="Component A" value={data.component_a || ''} onChange={(v) => handleChange('component_a', v)} />
      <InputField label="Component B" value={data.component_b || ''} onChange={(v) => handleChange('component_b', v)} />
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">Note</label>
        <textarea
          value={data.note || ''}
          onChange={(e) => handleChange('note', e.target.value)}
          rows={2}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
        />
      </div>
    </div>
  );
}; 