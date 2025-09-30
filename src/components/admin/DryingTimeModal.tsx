import React from 'react';
import { X } from 'lucide-react';
// ✅ استورد من الملف الجديد
import { InputField, ArrayInputField } from './FormComponents';

interface DryingTimeModalProps {
  data: any;
  onChange: (field: string, value: any) => void;
  onClose: () => void;
}

export const DryingTimeModal = ({ data, onChange, onClose }: DryingTimeModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Drying Time</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-4">
            <InputField label="Dry to Touch" value={data.dry_to_touch || ''} onChange={(v) => onChange('dry_to_touch', v)} />
            <InputField label="Dry to Handle" value={data.dry_to_handle || ''} onChange={(v) => onChange('dry_to_handle', v)} />
            <InputField label="Complete Setting" value={data.complete_setting || ''} onChange={(v) => onChange('complete_setting', v)} />
            <InputField label="Grouting Time" value={data.grouting_time || ''} onChange={(v) => onChange('grouting_time', v)} />
            <InputField label="Adjustability Time" value={data.adjustability_time || ''} onChange={(v) => onChange('adjustability_time', v)} />
            <InputField label="Dry to Topcoat" value={data.dry_to_topcoat || ''} onChange={(v) => onChange('dry_to_topcoat', v)} />
            <InputField label="Initial Setting" value={data.initial_setting || ''} onChange={(v) => onChange('initial_setting', v)} />
            <InputField label="Fully Cured" value={data.fully_cured || ''} onChange={(v) => onChange('fully_cured', v)} />
            <InputField label="Dry to Sand" value={data.dry_to_sand || ''} onChange={(v) => onChange('dry_to_sand', v)} />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Note</label>
              <textarea
                value={data.drying_time_note || ''}
                onChange={(e) => onChange('drying_time_note', e.target.value)}
                rows={3}
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