// src/components/admin/ApplicationPage.tsx
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { InputField, ArrayInputField } from './FormComponents';

const ApplicationPage = () => {
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
      setData({
        ...product,
        mixing_steps: Array.isArray(product.mixing_steps) ? product.mixing_steps : [],
      });
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
          method_of_application: data.method_of_application,
          mixing_ratio: data.mixing_ratio,
          mixing_note: data.mixing_note,
          mixing_steps: data.mixing_steps || [],
          pot_life: data.pot_life,
          cleaner: data.cleaner,
          thinner_cleaner: data.thinner_cleaner,
          application_temperature: data.application_temperature,
          curing_note: data.curing_note,
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
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl">
        <div className="flex items-center justify-between p-6 border-b">
          <button
            onClick={() => navigate(`/admin/products/${id}`)}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Product
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Application Instructions</h1>
          <div className="w-20" />
        </div>

        <div className="p-6 space-y-4">
          <InputField 
            label="Method of Application" 
            value={data.method_of_application || ''} 
            onChange={(v) => handleChange('method_of_application', v)} 
          />
          <InputField 
            label="Mixing Ratio" 
            value={data.mixing_ratio || ''} 
            onChange={(v) => handleChange('mixing_ratio', v)} 
          />
          <InputField 
            label="Pot Life" 
            value={data.pot_life || ''} 
            onChange={(v) => handleChange('pot_life', v)} 
          />
          <InputField 
            label="Cleaner" 
            value={data.cleaner || ''} 
            onChange={(v) => handleChange('cleaner', v)} 
          />
          <InputField 
            label="Thinner / Cleaner" 
            value={data.thinner_cleaner || ''} 
            onChange={(v) => handleChange('thinner_cleaner', v)} 
          />
          <InputField 
            label="Application Temperature" 
            value={data.application_temperature || ''} 
            onChange={(v) => handleChange('application_temperature', v)} 
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mixing Note</label>
            <textarea
              value={data.mixing_note || ''}
              onChange={(e) => handleChange('mixing_note', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Curing Note</label>
            <textarea
              value={data.curing_note || ''}
              onChange={(e) => handleChange('curing_note', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
            />
          </div>

          <ArrayInputField
            label="Mixing Steps"
            items={data.mixing_steps || []}
            onAdd={() => {
              const arr = [...(data.mixing_steps || []), ''];
              handleChange('mixing_steps', arr);
            }}
            onRemove={(idx) => {
              const arr = [...(data.mixing_steps || [])];
              arr.splice(idx, 1);
              handleChange('mixing_steps', arr);
            }}
            onChange={(idx, val) => {
              const arr = [...(data.mixing_steps || [])];
              arr[idx] = val;
              handleChange('mixing_steps', arr);
            }}
          />
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

export default ApplicationPage;