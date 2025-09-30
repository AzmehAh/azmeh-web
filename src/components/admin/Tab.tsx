// src/components/admin/Tab.tsx
import React from 'react';

interface TabProps {
  id: string;
  activeTab: string;
  label: string;
  onClick: () => void;
}

export const Tab: React.FC<TabProps> = ({ id, activeTab, label, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-4 py-2 font-medium transition-colors ${
      activeTab === id
        ? 'bg-white text-[#0055A3] border-t border-l border-r border-gray-200'
        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
    }`}
  >
    {label}
  </button> 
);