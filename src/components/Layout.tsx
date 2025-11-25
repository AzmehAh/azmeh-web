// src/components/Layout.tsx
import { useTranslation } from 'react-i18next';
import Header from './Header'; // أو اكتب الهيدر هنا

export default function Layout({ children }) {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <div className="flex flex-col h-screen bg-gray-50" dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />
      <main className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </div>
      </main>
    </div>
  );
}