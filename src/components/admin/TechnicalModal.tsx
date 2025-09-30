import React from 'react';
import { X } from 'lucide-react';
import { InputField } from './ProductForm';

interface TechnicalModalProps {
  data: any;
  onChange: (field: string, value: any) => void;
  onClose: () => void;
}

export const TechnicalModal = ({ data, onChange, onClose }: TechnicalModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Technical Information</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Number of Coats" value={data.number_of_coats || ''} onChange={(v) => onChange('number_of_coats', v)} />
            <InputField label="Tensile Adhesion Strength" value={data.tensile_adhesion_strength || ''} onChange={(v) => onChange('tensile_adhesion_strength', v)} />
            <InputField label="Material Consumption" value={data.material_consumption || ''} onChange={(v) => onChange('material_consumption', v)} />
            <InputField label="Viscosity" value={data.viscosity || ''} onChange={(v) => onChange('viscosity', v)} />
            <InputField label="Weather Resistance" value={data.weather_resistance || ''} onChange={(v) => onChange('weather_resistance', v)} />
            <InputField label="Compressive Strength" value={data.compressive_strength || ''} onChange={(v) => onChange('compressive_strength', v)} />
            <InputField label="Tear Resistance" value={data.tear_resistance || ''} onChange={(v) => onChange('tear_resistance', v)} />
            <InputField label="Elongation at Rupture" value={data.elongation_at_rupture || ''} onChange={(v) => onChange('elongation_at_rupture', v)} />
            <InputField label="Tensile Strength at 100% Elongation" value={data.tensile_strength_100 || ''} onChange={(v) => onChange('tensile_strength_100', v)} />
            <InputField label="Tensile Strength at 50% Elongation" value={data.tensile_strength_50 || ''} onChange={(v) => onChange('tensile_strength_50', v)} />
            <InputField label="Specific Gravity (Mixed)" value={data.specific_gravity_mixed || ''} onChange={(v) => onChange('specific_gravity_mixed', v)} />
            <InputField label="Solvent Resistance" value={data.solvent_resistance || ''} onChange={(v) => onChange('solvent_resistance', v)} />
            <InputField label="Chemical Resistance" value={data.chemical_resistance || ''} onChange={(v) => onChange('chemical_resistance', v)} />
            <InputField label="Abrasion Resistance" value={data.abrasion_resistance || ''} onChange={(v) => onChange('abrasion_resistance', v)} />
            <InputField label="Friction Resistance" value={data.friction_resistance || ''} onChange={(v) => onChange('friction_resistance', v)} />
            <InputField label="Washability" value={data.washability || ''} onChange={(v) => onChange('washability', v)} />
            <InputField label="Water Resistance" value={data.water_resistance || ''} onChange={(v) => onChange('water_resistance', v)} />
            <InputField label="Theoretical Spreading Rate" value={data.theoretical_spreading_rate || ''} onChange={(v) => onChange('theoretical_spreading_rate', v)} />
            <InputField label="Recommended Film Thickness" value={data.recommended_film_thickness || ''} onChange={(v) => onChange('recommended_film_thickness', v)} />
            <InputField label="Temperature Resistance" value={data.temperature_resistance || ''} onChange={(v) => onChange('temperature_resistance', v)} />
            <InputField label="Solvent Splash and Spill Resistance" value={data.solvent_splash_resistance || ''} onChange={(v) => onChange('solvent_splash_resistance', v)} />
            <InputField label="Sandability" value={data.sandability || ''} onChange={(v) => onChange('sandability', v)} />
            <InputField label="Adhesion" value={data.adhesion || ''} onChange={(v) => onChange('adhesion', v)} />
            <InputField label="Flexibility" value={data.flexibility || ''} onChange={(v) => onChange('flexibility', v)} />
            <InputField label="VOC" value={data.voc || ''} onChange={(v) => onChange('voc', v)} />
            <InputField label="Volume Solids" value={data.volume_solids || ''} onChange={(v) => onChange('volume_solids', v)} />
            <InputField label="Gloss" value={data.gloss || ''} onChange={(v) => onChange('gloss', v)} />
            <InputField label="Color" value={data.color || ''} onChange={(v) => onChange('color', v)} />
            <InputField label="Component A" value={data.component_a || ''} onChange={(v) => onChange('component_a', v)} />
            <InputField label="Component B" value={data.component_b || ''} onChange={(v) => onChange('component_b', v)} />
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Note</label>
              <textarea
                value={data.note || ''}
                onChange={(e) => onChange('note', e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
            <button onClick={onClose} className="px-4 py-2 bg-[#0055A3] text-white rounded">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};