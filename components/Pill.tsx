
import React from 'react';

interface PillProps {
  children: React.ReactNode;
}

const Pill: React.FC<PillProps> = ({ children }) => (
  <span className="inline-block bg-sky-100 text-sky-800 text-sm font-medium me-2 mb-2 px-3 py-1 rounded-full">
    {children}
  </span>
);

export default Pill;
