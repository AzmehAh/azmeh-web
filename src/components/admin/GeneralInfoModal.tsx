import React from 'react';
import { X } from 'lucide-react';
// ✅ استورد من الملف الجديد
import { InputField, ArrayInputField } from './FormComponents';

interface GeneralInfoModalProps {
  data: any;
  onChange: (field: string, value: any) => void;
  onClose: () => void;
}

export const GeneralInfoModal = ({ data, onChange, onClose }: GeneralInfoModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">General Information</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-4">
            <InputField label="Storing Conditions" value={data.storing_conditions || ''} onChange={(v) => onChange('storing_conditions', v)} />
            <InputField label="Joint Preparation" value={data.joint_preparation || ''} onChange={(v) => onChange('joint_preparation', v)} />
            <InputField label="Joint Size" value={data.joint_size || ''} onChange={(v) => onChange('joint_size', v)} />
            <InputField label="Movement Capacity" value={data.movement_capacity || ''} onChange={(v) => onChange('movement_capacity', v)} />
            <InputField label="Substrate Treatment" value={data.substrate_treatment || ''} onChange={(v) => onChange('substrate_treatment', v)} />
            <InputField label="Surface Preparation" value={data.surface_preparation || ''} onChange={(v) => onChange('surface_preparation', v)} />

            <ArrayInputField
              label="Features"
              items={data.general_features || []}
              onAdd={() => {
                const arr = [...(data.general_features || []), ''];
                onChange('general_features', arr);
              }}
              onRemove={(idx) => {
                const arr = [...(data.general_features || [])];
                arr.splice(idx, 1);
                onChange('general_features', arr);
              }}
              onChange={(idx, val) => {
                const arr = [...(data.general_features || [])];
                arr[idx] = val;
                onChange('general_features', arr);
              }}
            />

            <ArrayInputField
              label="Recommended Uses"
              items={data.recommended_uses || []}
              onAdd={() => {
                const arr = [...(data.recommended_uses || []), ''];
                onChange('recommended_uses', arr);
              }}
              onRemove={(idx) => {
                const arr = [...(data.recommended_uses || [])];
                arr.splice(idx, 1);
                onChange('recommended_uses', arr);
              }}
              onChange={(idx, val) => {
                const arr = [...(data.recommended_uses || [])];
                arr[idx] = val;
                onChange('recommended_uses', arr);
              }}
            />
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