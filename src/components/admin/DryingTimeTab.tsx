// src/components/admin/DryingTimePage.tsx
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { InputField } from './FormComponents';

const DryingTimePage = () => {
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
          dry_to_touch: data.dry_to_touch,
          dry_to_handle: data.dry_to_handle,
          complete_setting: data.complete_setting,
          grouting_time: data.grouting_time,
          adjustability_time: data.adjustability_time,
          dry_to_topcoat: data.dry_to_topcoat,
          initial_setting: data.initial_setting,
          fully_cured: data.fully_cured,
          dry_to_sand: data.dry_to_sand,
          drying_time_note: data.drying_time_note,
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
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl">
        <div className="flex items-center justify-between p-6 border-b">
          <button
            onClick={() => navigate(`/admin/products/${id}`)}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Product
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Drying Time</h1>
          <div className="w-20" />
        </div>

        <div className="p-6 space-y-4">
          <InputField label="Dry to Touch" value={data.dry_to_touch || ''} onChange={(v) => handleChange('dry_to_touch', v)} />
          <InputField label="Dry to Handle" value={data.dry_to_handle || ''} onChange={(v) => handleChange('dry_to_handle', v)} />
          <InputField label="Complete Setting" value={data.complete_setting || ''} onChange={(v) => handleChange('complete_setting', v)} />
          <InputField label="Grouting Time" value={data.grouting_time || ''} onChange={(v) => handleChange('grouting_time', v)} />
          <InputField label="Adjustability Time" value={data.adjustability_time || ''} onChange={(v) => handleChange('adjustability_time', v)} />
          <InputField label="Dry to Topcoat" value={data.dry_to_topcoat || ''} onChange={(v) => handleChange('dry_to_topcoat', v)} />
          <InputField label="Initial Setting" value={data.initial_setting || ''} onChange={(v) => handleChange('initial_setting', v)} />
          <InputField label="Fully Cured" value={data.fully_cured || ''} onChange={(v) => handleChange('fully_cured', v)} />
          <InputField label="Dry to Sand" value={data.dry_to_sand || ''} onChange={(v) => handleChange('dry_to_sand', v)} />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Note</label>
            <textarea
              value={data.drying_time_note || ''}
              onChange={(e) => handleChange('drying_time_note', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
            />
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

export default DryingTimePage; 