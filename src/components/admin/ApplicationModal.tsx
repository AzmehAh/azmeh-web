import React from 'react';
import { X } from 'lucide-react';
// ✅ استورد من الملف الجديد
import { InputField, ArrayInputField } from './FormComponents';

interface ApplicationModalProps {
  data: any;
  onChange: (field: string, value: any) => void;
  onClose: () => void;
}

export const ApplicationModal = ({ data, onChange, onClose }: ApplicationModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Application Instructions</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-4">
            <InputField label="Method of Application" value={data.method_of_application || ''} onChange={(v) => onChange('method_of_application', v)} />
            <InputField label="Mixing Ratio" value={data.mixing_ratio || ''} onChange={(v) => onChange('mixing_ratio', v)} />
            <InputField label="Pot Life" value={data.pot_life || ''} onChange={(v) => onChange('pot_life', v)} />
            <InputField label="Cleaner" value={data.cleaner || ''} onChange={(v) => onChange('cleaner', v)} />
            <InputField label="Thinner / Cleaner" value={data.thinner_cleaner || ''} onChange={(v) => onChange('thinner_cleaner', v)} />
            <InputField label="Application Temperature" value={data.application_temperature || ''} onChange={(v) => onChange('application_temperature', v)} />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mixing Note</label>
              <textarea
                value={data.mixing_note || ''}
                onChange={(e) => onChange('mixing_note', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Curing Note</label>
              <textarea
                value={data.curing_note || ''}
                onChange={(e) => onChange('curing_note', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
              />
            </div>

            <ArrayInputField
              label="Mixing Steps"
              items={data.mixing_steps || []}
              onAdd={() => {
                const arr = [...(data.mixing_steps || []), ''];
                onChange('mixing_steps', arr);
              }}
              onRemove={(idx) => {
                const arr = [...(data.mixing_steps || [])];
                arr.splice(idx, 1);
                onChange('mixing_steps', arr);
              }}
              onChange={(idx, val) => {
                const arr = [...(data.mixing_steps || [])];
                arr[idx] = val;
                onChange('mixing_steps', arr);
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