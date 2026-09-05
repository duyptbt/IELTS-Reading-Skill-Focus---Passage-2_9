import React from 'react';
import { Highlighter, Eraser, Check } from 'lucide-react';

export type HighlightColor = 'yellow' | 'emerald' | 'sky' | 'rose' | 'purple';

interface HighlighterToolbarProps {
  isActive: boolean;
  onToggleActive: () => void;
  selectedColor: HighlightColor;
  onSelectColor: (color: HighlightColor) => void;
  onClearAll: () => void;
  highlightCount: number;
}

const COLOR_OPTIONS: { id: HighlightColor; label: string; dotClass: string }[] = [
  { id: 'yellow', label: 'Yellow', dotClass: 'bg-yellow-300' },
  { id: 'emerald', label: 'Green', dotClass: 'bg-emerald-300' },
  { id: 'sky', label: 'Blue', dotClass: 'bg-sky-300' },
  { id: 'rose', label: 'Pink', dotClass: 'bg-rose-300' },
  { id: 'purple', label: 'Purple', dotClass: 'bg-purple-300' },
];

export const HighlighterToolbar: React.FC<HighlighterToolbarProps> = ({
  isActive,
  onToggleActive,
  selectedColor,
  onSelectColor,
  onClearAll,
  highlightCount,
}) => {
  return (
    <div className="flex items-center gap-2">
      <button
        id="btn-toggle-highlighter"
        onClick={onToggleActive}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors text-xs font-medium border ${
          isActive
            ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
            : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
        }`}
        title={isActive ? 'Highlighter is Active: select text to highlight' : 'Click to enable text highlighter'}
      >
        <Highlighter className="w-3.5 h-3.5" />
        <span>{isActive ? 'Highlighter ON' : 'Highlighter'}</span>
        {highlightCount > 0 && (
          <span className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
            isActive ? 'bg-blue-700 text-white' : 'bg-slate-200 text-slate-700'
          }`}>
            {highlightCount}
          </span>
        )}
      </button>

      {isActive && (
        <div className="flex items-center gap-1 px-2 py-1 bg-white border border-slate-200 rounded">
          {COLOR_OPTIONS.map((c) => (
            <button
              key={c.id}
              id={`highlighter-color-${c.id}`}
              onClick={() => onSelectColor(c.id)}
              className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${c.dotClass} ${
                selectedColor === c.id ? 'ring-2 ring-slate-800 ring-offset-1 scale-110' : 'hover:opacity-80'
              }`}
              title={`Highlight with ${c.label}`}
              aria-label={`Highlight with ${c.label}`}
            >
              {selectedColor === c.id && <Check className="w-2.5 h-2.5 text-slate-900 stroke-[3]" />}
            </button>
          ))}
        </div>
      )}

      {highlightCount > 0 && (
        <button
          id="btn-clear-all-highlights"
          onClick={onClearAll}
          className="flex items-center gap-1 px-2.5 py-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded transition-colors text-xs font-medium"
          title="Remove all text highlights"
        >
          <Eraser className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Clear Highlights</span>
        </button>
      )}
    </div>
  );
};
