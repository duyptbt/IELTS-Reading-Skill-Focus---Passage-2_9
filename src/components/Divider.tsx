import React from 'react';
import { GripVertical } from 'lucide-react';

interface DividerProps {
  onMouseDown: (e: React.MouseEvent) => void;
  onDoubleClick?: () => void;
}

export const Divider: React.FC<DividerProps> = ({ onMouseDown, onDoubleClick }) => {
  return (
    <div
      onMouseDown={onMouseDown}
      onDoubleClick={onDoubleClick}
      role="separator"
      aria-orientation="vertical"
      title="Drag to resize panels (Double click to reset 50/50)"
      className="hidden md:flex relative w-3 bg-slate-200/80 hover:bg-slate-300 active:bg-blue-100 cursor-col-resize select-none items-center justify-center border-x border-slate-300 transition-colors z-20 group"
    >
      {/* Central line */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-slate-300 group-hover:bg-blue-500 transition-colors" />

      {/* Grip Handle */}
      <div className="z-10 w-3.5 h-8 rounded bg-white border border-slate-300 group-hover:border-blue-500 shadow-2xs flex items-center justify-center text-slate-400 group-hover:text-blue-600 transition-all">
        <GripVertical className="w-3 h-3" />
      </div>
    </div>
  );
};
