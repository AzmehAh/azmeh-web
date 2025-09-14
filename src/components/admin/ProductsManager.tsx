import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';

interface Product {
  name: string;
  code: string;
  brand: string;
  type: string;
  material: string;
  usage: string;
  description: string;
  features: string[];
  applications: string[];
  packaging: { size: string; quantity: string }[];
  technical_specs: { property: string; value: string; standard: string }[];
  instructions: string;
  storage: string;
  safety_precautions: string;
  safety_first_aid: string;
  images: string[]; // روابط الصور
  status: 'active' | 'inactive' | 'draft';
}

interface Props {
  productId?: string;
}

const AddEditProduct = ({ productId }: Props) => {
  const [formData, setFormData] = useState<Product>({
    name: '',
    code: '',
    brand: '',
    type: '',
    material: '',
    usage: '',
    description: '',
    features: [],
    applications: [],
    packaging: [],
    technical_specs: [],
    instructions: '',
    storage: '',
    safety_precautions: '',
    safety_first_aid: '',
    images: [],
    status: 'active',
  });

  const handleInputChange = (field: keyof Product, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addArrayItem = (field: keyof Product, defaultValue: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field] as any[]), defaultValue],
    }));
  };

  const removeArrayItem = (field: keyof Product, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as any[]).filter((_, i) => i !== index),
    }));
  };

  const handleSave = async () => {
    try {
      const payload = {
        ...formData,
        features: JSON.stringify(formData.features),
        applications: JSON.stringify(formData.applications),
        packaging: JSON.stringify(formData.packaging),
        technical_specs: JSON.stringify(formData.technical_specs),
        images: JSON.stringify(formData.images),
      };

      if (productId) {
        // تعديل المنتج
        const { error } = await supabase
          .from('products')
          .update(payload)
          .eq('id', productId);
        if (error) throw error;
        alert('Product updated successfully!');
      } else {
        // إضافة منتج جديد
        const { data, error } = await supabase
          .from('products')
          .insert([payload])
          .select();
        if (error) throw error;
        alert('Product added successfully!');
        console.log('New Product ID:', data?.[0]?.id);
      }
    } catch (error) {
      console.error(error);
      alert('Error saving product');
    }
  };

  return (
    <div className="space-y-4 p-4 border rounded">
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => handleInputChange('name', e.target.value)}
        className="border p-2 rounded w-full"
      />
      <input
        type="text"
        placeholder="Code"
        value={formData.code}
        onChange={(e) => handleInputChange('code', e.target.value)}
        className="border p-2 rounded w-full"
      />
      <input
        type="text"
        placeholder="Brand"
        value={formData.brand}
        onChange={(e) => handleInputChange('brand', e.target.value)}
        className="border p-2 rounded w-full"
      />
      <input
        type="text"
        placeholder="Type"
        value={formData.type}
        onChange={(e) => handleInputChange('type', e.target.value)}
        className="border p-2 rounded w-full"
      />
      <input
        type="text"
        placeholder="Material"
        value={formData.material}
        onChange={(e) => handleInputChange('material', e.target.value)}
        className="border p-2 rounded w-full"
      />
      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) => handleInputChange('description', e.target.value)}
        className="border p-2 rounded w-full"
      />

      {/* مثال للـ Features */}
      <div>
        <h4>Features</h4>
        {formData.features.map((f, i) => (
          <div key={i} className="flex gap-2 items-center">
            <input
              value={f}
              onChange={(e) => {
                const arr = [...formData.features];
                arr[i] = e.target.value;
                handleInputChange('features', arr);
              }}
              className="border p-1 rounded flex-1"
            />
            <button onClick={() => removeArrayItem('features', i)} className="text-red-500">Remove</button>
          </div>
        ))}
        <button onClick={() => addArrayItem('features', '')} className="text-blue-500">+ Add Feature</button>
      </div>

      {/* تطبيق نفس الطريقة للـ Applications, Packaging, Technical Specs, Images */}
      {/* ... */}

      <button
        onClick={handleSave}
        className="bg-green-600 text-white px-4 py-2 rounded mt-4"
      >
        Save Product
      </button>
    </div>
  );
};

export default AddEditProduct;
