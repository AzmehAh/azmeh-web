import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface BilingualArrayInputProps {
  label: string;
  valueEn: string[];
  valueAr: string[];
  onChangeEn: (items: string[]) => void;
  onChangeAr: (items: string[]) => void;
}

const BilingualArrayInput: React.FC<BilingualArrayInputProps> = ({
  label,
  valueEn,
  valueAr,
  onChangeEn,
  onChangeAr
}) => {
  const handleAddEn = () => {
    onChangeEn([...valueEn, '']);
  };

  const handleRemoveEn = (index: number) => {
    const newItems = valueEn.filter((_, i) => i !== index);
    onChangeEn(newItems);
  };

  const handleChangeEn = (index: number, value: string) => {
    const newItems = [...valueEn];
    newItems[index] = value;
    onChangeEn(newItems);
  };

  const handleAddAr = () => {
    onChangeAr([...valueAr, '']);
  };

  const handleRemoveAr = (index: number) => {
    const newItems = valueAr.filter((_, i) => i !== index);
    onChangeAr(newItems);
  };

  const handleChangeAr = (index: number, value: string) => {
    const newItems = [...valueAr];
    newItems[index] = value;
    onChangeAr(newItems);
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-medium text-gray-500">
              English
            </label>
            <button
              type="button"
              onClick={handleAddEn}
              className="flex items-center space-x-1 text-xs text-blue-600 hover:text-blue-700"
            >
              <Plus className="w-3 h-3" />
              <span>Add</span>
            </button>
          </div>
          <div className="space-y-2">
            {valueEn.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleChangeEn(index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveEn(index)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-medium text-gray-500">
              العربية (Arabic)
            </label>
            <button
              type="button"
              onClick={handleAddAr}
              className="flex items-center space-x-1 text-xs text-blue-600 hover:text-blue-700"
            >
              <Plus className="w-3 h-3" />
              <span>Add</span>
            </button>
          </div>
          <div className="space-y-2">
            {valueAr.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleChangeAr(index, e.target.value)}
                  dir="rtl"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-right"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveAr(index)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BilingualArrayInput;
