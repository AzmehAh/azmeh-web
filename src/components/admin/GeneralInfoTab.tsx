// src/components/admin/GeneralInfoPage.tsx
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { InputField, ArrayInputField } from './FormComponents';

const GeneralInfoPage = () => {
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
        general_features: Array.isArray(product.general_features) ? product.general_features : [],
        recommended_uses: Array.isArray(product.recommended_uses) ? product.recommended_uses : [],
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
          storing_conditions: data.storing_conditions,
          joint_preparation: data.joint_preparation,
          joint_size: data.joint_size,
          movement_capacity: data.movement_capacity,
          substrate_treatment: data.substrate_treatment,
          surface_preparation: data.surface_preparation,
          general_features: data.general_features || [],
          recommended_uses: data.recommended_uses || [],
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
          <h1 className="text-2xl font-bold text-gray-900">General Information</h1>
          <div className="w-20" />
        </div>

        <div className="p-6 space-y-4">
          <InputField 
            label="Storing Conditions" 
            value={data.storing_conditions || ''} 
            onChange={(v) => handleChange('storing_conditions', v)} 
          />
          <InputField 
            label="Joint Preparation" 
            value={data.joint_preparation || ''} 
            onChange={(v) => handleChange('joint_preparation', v)} 
          />
          <InputField 
            label="Joint Size" 
            value={data.joint_size || ''} 
            onChange={(v) => handleChange('joint_size', v)} 
          />
          <InputField 
            label="Movement Capacity" 
            value={data.movement_capacity || ''} 
            onChange={(v) => handleChange('movement_capacity', v)} 
          />
          <InputField 
            label="Substrate Treatment" 
            value={data.substrate_treatment || ''} 
            onChange={(v) => handleChange('substrate_treatment', v)} 
          />
          <InputField 
            label="Surface Preparation" 
            value={data.surface_preparation || ''} 
            onChange={(v) => handleChange('surface_preparation', v)} 
          />

          <ArrayInputField
            label="Features"
            items={data.general_features || []}
            onAdd={() => {
              const arr = [...(data.general_features || []), ''];
              handleChange('general_features', arr);
            }}
            onRemove={(idx) => {
              const arr = [...(data.general_features || [])];
              arr.splice(idx, 1);
              handleChange('general_features', arr);
            }}
            onChange={(idx, val) => {
              const arr = [...(data.general_features || [])];
              arr[idx] = val;
              handleChange('general_features', arr);
            }}
          />

          <ArrayInputField
            label="Recommended Uses"
            items={data.recommended_uses || []}
            onAdd={() => {
              const arr = [...(data.recommended_uses || []), ''];
              handleChange('recommended_uses', arr);
            }}
            onRemove={(idx) => {
              const arr = [...(data.recommended_uses || [])];
              arr.splice(idx, 1);
              handleChange('recommended_uses', arr);
            }}
            onChange={(idx, val) => {
              const arr = [...(data.recommended_uses || [])];
              arr[idx] = val;
              handleChange('recommended_uses', arr);
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

export default GeneralInfoPage; 