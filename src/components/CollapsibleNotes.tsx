import React from 'react';
import { ChevronDown, ChevronUp, Copy, Trash2, Check, FileText } from 'lucide-react';

interface CollapsibleNotesProps {
  id: string;
  title: string;
  notes: string;
  onChange: (val: string) => void;
  isOpen: boolean;
  onToggle: () => void;
  placeholder?: string;
}

export const CollapsibleNotes: React.FC<CollapsibleNotesProps> = ({
  id,
  title,
  notes,
  onChange,
  isOpen,
  onToggle,
  placeholder = "Type your notes, vocabulary, or thoughts here..."
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    if (!notes) return;
    navigator.clipboard.writeText(notes);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    if (window.confirm("Are you sure you want to clear these notes?")) {
      onChange('');
    }
  };

  const wordCount = notes.trim() ? notes.trim().split(/\s+/).length : 0;
  const charCount = notes.length;

  return (
    <div id={`notes-container-${id}`} className="bg-slate-50 rounded-lg border border-slate-200 p-4 transition-all mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <FileText className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {title}
          </span>
          {wordCount > 0 && (
            <span className="text-[11px] bg-slate-200/80 text-slate-700 px-2 py-0.5 rounded font-mono">
              {wordCount} words
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button
            id={`notes-toggle-${id}`}
            onClick={onToggle}
            className="text-xs text-blue-600 font-medium hover:underline flex items-center gap-1"
          >
            <span>{isOpen ? 'Collapse' : 'Expand'}</span>
            {isOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="mt-2 pt-2 border-t border-slate-200/60">
          <textarea
            id={`notes-textarea-${id}`}
            value={notes}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={3}
            className="w-full bg-white border border-slate-200 rounded p-2.5 text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition font-sans leading-relaxed resize-y placeholder:text-slate-400"
          />
          <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
            <span className="font-mono text-[11px]">{charCount} characters</span>
            <div className="flex items-center gap-2">
              <button
                id={`notes-copy-${id}`}
                onClick={handleCopy}
                disabled={!notes}
                className="flex items-center gap-1 px-2 py-1 rounded bg-slate-200/70 hover:bg-slate-200 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition text-xs font-medium"
                title="Copy notes to clipboard"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
              <button
                id={`notes-clear-${id}`}
                onClick={handleClear}
                disabled={!notes}
                className="flex items-center gap-1 px-2 py-1 rounded bg-slate-200/70 hover:bg-rose-100 text-slate-700 hover:text-rose-700 disabled:opacity-40 disabled:cursor-not-allowed transition text-xs font-medium"
                title="Clear notes"
              >
                <Trash2 className="w-3 h-3" />
                <span>Clear</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
