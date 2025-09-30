import React from 'react';

// مكون لإدخال نص عادي
export const InputField = ({ 
  label, 
  value, 
  onChange, 
  type = "text",
  placeholder = ""
}: { 
  label: string; 
  value: string; 
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
    />
  </div>
);

// مكون لإدخال مصفوفة (قائمة من العناصر)
export const ArrayInputField = ({ 
  label, 
  items, 
  onAdd, 
  onRemove, 
  onChange 
}: { 
  label: string; 
  items: string[]; 
  onAdd: () => void; 
  onRemove: (index: number) => void; 
  onChange: (index: number, value: string) => void; 
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <div className="space-y-2">
      {items.map((item, idx) => (
        <div key={idx} className="flex gap-2">
          <input
            type="text"
            value={item}
            onChange={(e) => onChange(idx, e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]"
          />
          <button
            type="button"
            onClick={() => onRemove(idx)}
            className="px-2 py-1 text-red-600 border border-red-200 rounded hover:bg-red-50"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={onAdd}
        className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
      >
        + Add {label.split(' ')[0]}
      </button>
    </div>
  </div>
);