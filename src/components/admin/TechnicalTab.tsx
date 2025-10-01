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
    <div className="grid grid-cols-1 gap-4">
      <InputField label="Number of Coats" value={data.number_of_coats || ''} onChange={(v) => handleChange('number_of_coats', v)} type="textarea" />
      <InputField label="Tensile Adhesion Strength" value={data.tensile_adhesion_strength || ''} onChange={(v) => handleChange('tensile_adhesion_strength', v)} type="textarea" />
      <InputField label="Material Consumption" value={data.material_consumption || ''} onChange={(v) => handleChange('material_consumption', v)} type="textarea" />
      <InputField label="Viscosity" value={data.viscosity || ''} onChange={(v) => handleChange('viscosity', v)} type="textarea" />
      <InputField label="Weather Resistance" value={data.weather_resistance || ''} onChange={(v) => handleChange('weather_resistance', v)} type="textarea" />
      <InputField label="Compressive Strength" value={data.compressive_strength || ''} onChange={(v) => handleChange('compressive_strength', v)} type="textarea" />
      <InputField label="Tear Resistance" value={data.tear_resistance || ''} onChange={(v) => handleChange('tear_resistance', v)} type="textarea" />
      <InputField label="Elongation at Rupture" value={data.elongation_at_rupture || ''} onChange={(v) => handleChange('elongation_at_rupture', v)} type="textarea" />
      <InputField label="Tensile Strength at 100% Elongation" value={data.tensile_strength_100 || ''} onChange={(v) => handleChange('tensile_strength_100', v)} type="textarea" />
      <InputField label="Tensile Strength at 50% Elongation" value={data.tensile_strength_50 || ''} onChange={(v) => handleChange('tensile_strength_50', v)} type="textarea" />
      <InputField label="Specific Gravity (Mixed)" value={data.specific_gravity_mixed || ''} onChange={(v) => handleChange('specific_gravity_mixed', v)} type="textarea" />
      <InputField label="Solvent Resistance" value={data.solvent_resistance || ''} onChange={(v) => handleChange('solvent_resistance', v)} type="textarea" />
      <InputField label="Chemical Resistance" value={data.chemical_resistance || ''} onChange={(v) => handleChange('chemical_resistance', v)} type="textarea" />
      <InputField label="Abrasion Resistance" value={data.abrasion_resistance || ''} onChange={(v) => handleChange('abrasion_resistance', v)} type="textarea" />
      <InputField label="Friction Resistance" value={data.friction_resistance || ''} onChange={(v) => handleChange('friction_resistance', v)} type="textarea" />
      <InputField label="Washability" value={data.washability || ''} onChange={(v) => handleChange('washability', v)} type="textarea" />
      <InputField label="Water Resistance" value={data.water_resistance || ''} onChange={(v) => handleChange('water_resistance', v)} type="textarea" />
      <InputField label="Theoretical Spreading Rate" value={data.theoretical_spreading_rate || ''} onChange={(v) => handleChange('theoretical_spreading_rate', v)} type="textarea" />
      <InputField label="Recommended Film Thickness" value={data.recommended_film_thickness || ''} onChange={(v) => handleChange('recommended_film_thickness', v)} type="textarea" />
      <InputField label="Temperature Resistance" value={data.temperature_resistance || ''} onChange={(v) => handleChange('temperature_resistance', v)} type="textarea" />
      <InputField label="Solvent Splash Resistance" value={data.solvent_splash_resistance || ''} onChange={(v) => handleChange('solvent_splash_resistance', v)} type="textarea" />
      <InputField label="Sandability" value={data.sandability || ''} onChange={(v) => handleChange('sandability', v)} type="textarea" />
      <InputField label="Adhesion" value={data.adhesion || ''} onChange={(v) => handleChange('adhesion', v)} type="textarea" />
      <InputField label="Flexibility" value={data.flexibility || ''} onChange={(v) => handleChange('flexibility', v)} type="textarea" />
      <InputField label="VOC" value={data.voc || ''} onChange={(v) => handleChange('voc', v)} type="textarea" />
      <InputField label="Volume Solids" value={data.volume_solids || ''} onChange={(v) => handleChange('volume_solids', v)} type="textarea" />
      <InputField label="Gloss" value={data.gloss || ''} onChange={(v) => handleChange('gloss', v)} type="textarea" />
      <InputField label="Color" value={data.color || ''} onChange={(v) => handleChange('color', v)} type="textarea" />
      <InputField label="Component A" value={data.component_a || ''} onChange={(v) => handleChange('component_a', v)} type="textarea" />
      <InputField label="Component B" value={data.component_b || ''} onChange={(v) => handleChange('component_b', v)} type="textarea" />
      <InputField label="Note" value={data.note || ''} onChange={(v) => handleChange('note', v)} type="textarea" rows={5} />
    </div>
  );
};
