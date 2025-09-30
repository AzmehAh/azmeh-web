// src/components/admin/TechnicalPage.tsx
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { InputField } from './FormComponents';

const TechnicalPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<any>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (id) fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    const { data: product, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
    if (!error) {
      setData(product);
    }
  };

  const handleChange = (field: string, value: any) => {
    setData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await supabase
        .from('products')
        .update({
          number_of_coats: data.number_of_coats,
          note: data.note,
          tensile_adhesion_strength: data.tensile_adhesion_strength,
          material_consumption: data.material_consumption,
          viscosity: data.viscosity,
          weather_resistance: data.weather_resistance,
          compressive_strength: data.compressive_strength,
          tear_resistance: data.tear_resistance,
          elongation_at_rupture: data.elongation_at_rupture,
          tensile_strength_100: data.tensile_strength_100,
          tensile_strength_50: data.tensile_strength_50,
          specific_gravity_mixed: data.specific_gravity_mixed,
          solvent_resistance: data.solvent_resistance,
          chemical_resistance: data.chemical_resistance,
          abrasion_resistance: data.abrasion_resistance,
          friction_resistance: data.friction_resistance,
          washability: data.washability,
          water_resistance: data.water_resistance,
          theoretical_spreading_rate: data.theoretical_spreading_rate,
          recommended_film_thickness: data.recommended_film_thickness,
          temperature_resistance: data.temperature_resistance,
          solvent_splash_resistance: data.solvent_splash_resistance,
          sandability: data.sandability,
          adhesion: data.adhesion,
          flexibility: data.flexibility,
          voc: data.voc,
          volume_solids: data.volume_solids,
          gloss: data.gloss,
          color: data.color,
          component_a: data.component_a,
          component_b: data.component_b,
        })
        .eq('id', id);
      navigate(`/admin/products/${id}`);
    } catch (error) {
      console.error('Error saving:', error);
      alert('Error saving data');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl">
        <div className="flex items-center justify-between p-6 border-b">
          <button
            onClick={() => navigate(`/admin/products/${id}`)}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Product
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Technical Information</h1>
          <div className="w-20" />
        </div>

        <div className="p-6">
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
            <InputField label="Solvent Splash and Spill Resistance" value={data.solvent_splash_resistance || ''} onChange={(v) => handleChange('solvent_splash_resistance', v)} />
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
        </div>

        <div className="flex justify-end space-x-3 p-6 border-t bg-gray-50">
          <button
            onClick={() => navigate(`/admin/products/${id}`)}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-[#0055A3] text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TechnicalPage;