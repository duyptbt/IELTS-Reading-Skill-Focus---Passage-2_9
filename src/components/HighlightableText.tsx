import React from 'react';
import { HighlightRange } from '../types';
import { HighlightColor } from './HighlighterToolbar';

interface HighlightableTextProps {
  text?: string;
  highlights?: HighlightRange[];
  onRemoveHighlight?: (id: string) => void;
  className?: string;
  as?: 'span' | 'p' | 'div' | 'h2' | 'h3' | 'h4';
  children?: React.ReactNode;
}

const colorClassMap: Record<HighlightColor, string> = {
  yellow: 'bg-amber-200/90 text-slate-900 border-b-2 border-amber-400',
  emerald: 'bg-emerald-200/90 text-slate-900 border-b-2 border-emerald-400',
  sky: 'bg-sky-200/90 text-slate-900 border-b-2 border-sky-400',
  rose: 'bg-rose-200/90 text-slate-900 border-b-2 border-rose-400',
  purple: 'bg-purple-200/90 text-slate-900 border-b-2 border-purple-400',
};

export const HighlightableText: React.FC<HighlightableTextProps> = ({
  text,
  highlights = [],
  onRemoveHighlight,
  className = '',
  as: Component = 'span',
  children,
}) => {
  const content = text ?? (typeof children === 'string' ? children : '');

  if (!content || !highlights || highlights.length === 0) {
    return <Component className={className}>{content || children}</Component>;
  }

  interface MatchToken {
    start: number;
    end: number;
    highlightId: string;
    color: HighlightColor;
  }

  const matches: MatchToken[] = [];

  highlights.forEach((h) => {
    const trimmed = h.text?.trim();
    if (!trimmed || trimmed.length < 2) return;

    try {
      const escaped = trimmed.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(escaped, 'gi');
      let m: RegExpExecArray | null;
      while ((m = regex.exec(content)) !== null) {
        matches.push({
          start: m.index,
          end: m.index + m[0].length,
          highlightId: h.id,
          color: h.color,
        });
      }
    } catch {
      // Ignore regex parsing issues
    }
  });

  if (matches.length === 0) {
    return <Component className={className}>{content}</Component>;
  }

  // Sort by start index
  matches.sort((a, b) => a.start - b.start);

  const elements: React.ReactNode[] = [];
  let lastIdx = 0;

  for (let i = 0; i < matches.length; i++) {
    const match = matches[i];
    if (match.start < lastIdx) continue; // Skip overlapping match

    if (match.start > lastIdx) {
      elements.push(content.substring(lastIdx, match.start));
    }

    const matchText = content.substring(match.start, match.end);
    elements.push(
      <mark
        key={`hl-${match.highlightId}-${match.start}-${i}`}
        onClick={(e) => {
          e.stopPropagation();
          if (onRemoveHighlight) onRemoveHighlight(match.highlightId);
        }}
        title="Click to remove highlight"
        className={`cursor-pointer rounded-xs px-0.5 transition-opacity hover:opacity-75 ${
          colorClassMap[match.color] || colorClassMap.yellow
        }`}
      >
        {matchText}
      </mark>
    );

    lastIdx = match.end;
  }

  if (lastIdx < content.length) {
    elements.push(content.substring(lastIdx));
  }

  return <Component className={className}>{elements}</Component>;
};
