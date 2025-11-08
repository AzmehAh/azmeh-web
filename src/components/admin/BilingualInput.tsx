import React from 'react';
import { useTranslation } from 'react-i18next';
interface BilingualInputProps {
  labelEn: string;
  labelAr: string;
  nameEn: string;
  nameAr: string;
  valueEn: string;
  valueAr: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: 'text' | 'textarea';
  required?: boolean;
  placeholder?: string;
}
 const { t, i18n } = useTranslation(''); // استخدام namespace 'social'
  const isRTL = i18n.language === 'ar';
const BilingualInput: React.FC<BilingualInputProps> = ({
  labelEn,
  labelAr,
  nameEn,
  nameAr,
  valueEn,
  valueAr,
  onChange,
  type = 'text',
  required = false,
  placeholder = ''
}) => {
  const InputComponent = type === 'textarea' ? 'textarea' : 'input';

  return (
    <div className="space-y-3">
      {/* العنوان الرئيسي المدمج: إنجليزي / عربي */}
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {labelEn} / {labelAr}
        {required && <span className="text-red-500"> *</span>}
      </label>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            English
          </label>
          <InputComponent
            name={nameEn}
            value={valueEn}
            onChange={onChange}
            required={required}
            placeholder={placeholder}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            {...(type === 'textarea' && { rows: 3 })}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            العربية (Arabic)
          </label>
          <InputComponent
            name={nameAr}
            value={valueAr}
            onChange={onChange}
            placeholder={placeholder}
            dir="rtl"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
            {...(type === 'textarea' && { rows: 3 })}
          />
        </div> 
      </div>
    </div>
  );
};

export default BilingualInput;