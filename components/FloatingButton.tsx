import React from 'react';
import { CpuChipIcon } from './Icons';

interface FloatingButtonProps {
  onClick: () => void;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 px-4 py-3 bg-sky-600 text-white rounded-full shadow-2xl border border-sky-500 hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-300 transition-transform duration-200 hover:scale-105 print:hidden"
    aria-label="Abrir painel de controle"
  >
    <CpuChipIcon className="w-5 h-5" />
    <span className="text-sm font-semibold">Painel</span>
  </button>
);

export default FloatingButton;
