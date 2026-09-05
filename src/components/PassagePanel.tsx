import React, { useState, useRef, useEffect } from 'react';
import { Paragraph, Question } from '../types';
import { PASSAGE_TITLE, PASSAGE_SUBTITLE, GENERAL_TEST_TIP, FOOTNOTES } from '../data/ieltsData';
import { HighlighterToolbar, HighlightColor } from './HighlighterToolbar';
import { CollapsibleNotes } from './CollapsibleNotes';
import { HeadingDropZone } from './HeadingDropZone';
import { Search, X, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';

const PARAGRAPH_QUESTION_MAP: Record<string, number> = {
  A: 14,
  B: 15,
  C: 16,
  D: 17,
  E: 18,
  F: 19,
};

interface PassagePanelProps {
  paragraphs: Paragraph[];
  isPracticeMode: boolean;
  notes: string;
  onNotesChange: (val: string) => void;
  isNotesOpen: boolean;
  onToggleNotes: () => void;
  highlightColor: HighlightColor;
  onSelectHighlightColor: (c: HighlightColor) => void;
  isHighlighterActive: boolean;
  onToggleHighlighter: () => void;
  highlights: { id: string; text: string; color: HighlightColor; paragraphId?: string }[];
  onAddHighlight: (text: string, color: HighlightColor, paragraphId?: string) => void;
  onRemoveHighlight: (id: string) => void;
  onClearAllHighlights: () => void;
  highlightedParagraphTarget?: string | null;
  searchedEvidenceQuote?: string | null;
  userAnswers: Record<number, string>;
  onAnswerChange: (questionId: number, answer: string) => void;
  showPracticeAnswers: boolean;
  selectedHeadingForAssign: string | null;
  onSelectHeadingForAssign: (headingId: string | null) => void;
  questions: Question[];
}

export const PassagePanel: React.FC<PassagePanelProps> = ({
  paragraphs,
  isPracticeMode,
  notes,
  onNotesChange,
  isNotesOpen,
  onToggleNotes,
  highlightColor,
  onSelectHighlightColor,
  isHighlighterActive,
  onToggleHighlighter,
  highlights,
  onAddHighlight,
  onRemoveHighlight,
  onClearAllHighlights,
  highlightedParagraphTarget,
  searchedEvidenceQuote,
  userAnswers,
  onAnswerChange,
  showPracticeAnswers,
  selectedHeadingForAssign,
  onSelectHeadingForAssign,
  questions,
}) => {
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('base');
  const [searchTerm, setSearchTerm] = useState('');
  const [isTestTipExpanded, setIsTestTipExpanded] = useState(true);
  const passageRef = useRef<HTMLDivElement>(null);
  const [selectionPopup, setSelectionPopup] = useState<{
    text: string;
    x: number;
    y: number;
    paragraphId?: string;
  } | null>(null);

  // Auto-scroll to target paragraph when requested
  useEffect(() => {
    if (highlightedParagraphTarget) {
      const el = document.getElementById(`paragraph-${highlightedParagraphTarget}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.add('ring-3', 'ring-amber-400', 'bg-amber-50/70', 'transition-all');
        const timeout = setTimeout(() => {
          el.classList.remove('ring-3', 'ring-amber-400', 'bg-amber-50/70');
        }, 3000);
        return () => clearTimeout(timeout);
      }
    }
  }, [highlightedParagraphTarget]);

  // Handle text selection in passage
  const handleMouseUp = () => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) {
      setSelectionPopup(null);
      return;
    }

    const selectedText = selection.toString().trim();
    if (selectedText.length < 2) {
      setSelectionPopup(null);
      return;
    }

    // Check if selection is within passage
    if (!passageRef.current || !passageRef.current.contains(selection.anchorNode)) {
      setSelectionPopup(null);
      return;
    }

    // Find which paragraph it was in
    let node: Node | null = selection.anchorNode;
    let paragraphId: string | undefined = undefined;
    while (node && node !== passageRef.current) {
      if (node instanceof HTMLElement && node.dataset.paragraphId) {
        paragraphId = node.dataset.paragraphId;
        break;
      }
      node = node.parentNode;
    }

    // If highlighter is already active, auto-highlight
    if (isHighlighterActive) {
      onAddHighlight(selectedText, highlightColor, paragraphId);
      selection.removeAllRanges();
      setSelectionPopup(null);
      return;
    }

    // Otherwise show quick mini popup at cursor
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    setSelectionPopup({
      text: selectedText,
      x: Math.min(window.innerWidth - 180, Math.max(10, rect.left + rect.width / 2 - 80)),
      y: Math.max(10, rect.top - 42),
      paragraphId,
    });
  };

  const applyHighlightFromPopup = (color: HighlightColor) => {
    if (selectionPopup) {
      onAddHighlight(selectionPopup.text, color, selectionPopup.paragraphId);
      window.getSelection()?.removeAllRanges();
      setSelectionPopup(null);
    }
  };

  const handleAssignHeading = (questionId: number, headingId: string) => {
    // If heading was assigned to another question in Q14-20, clear that one first
    Object.entries(PARAGRAPH_QUESTION_MAP).forEach(([, qId]) => {
      if (qId !== questionId && userAnswers[qId]?.toLowerCase() === headingId.toLowerCase()) {
        onAnswerChange(qId, '');
      }
    });
    onAnswerChange(questionId, headingId);
  };

  const handleClearHeading = (questionId: number) => {
    onAnswerChange(questionId, '');
  };

  // Helper to render paragraph with highlighted substrings and search matches
  const renderParagraphContent = (p: Paragraph) => {
    const content = p.text;
    const paragraphHighlights = highlights.filter((h) => !h.paragraphId || h.paragraphId === p.id);

    const colorClassMap: Record<HighlightColor, string> = {
      yellow: 'bg-amber-200/90 text-slate-900 border-b-2 border-amber-400',
      emerald: 'bg-emerald-200/90 text-slate-900 border-b-2 border-emerald-400',
      sky: 'bg-sky-200/90 text-slate-900 border-b-2 border-sky-400',
      rose: 'bg-rose-200/90 text-slate-900 border-b-2 border-rose-400',
      purple: 'bg-purple-200/90 text-slate-900 border-b-2 border-purple-400',
    };

    interface MatchToken {
      start: number;
      end: number;
      type: 'search' | 'highlight';
      highlightId?: string;
      color?: HighlightColor;
    }

    const matches: MatchToken[] = [];

    if (searchTerm.trim().length >= 2) {
      const regex = new RegExp(searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
      let m;
      while ((m = regex.exec(content)) !== null) {
        matches.push({ start: m.index, end: m.index + m[0].length, type: 'search' });
      }
    }

    paragraphHighlights.forEach((h) => {
      if (!h.text) return;
      const regex = new RegExp(h.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
      let m;
      while ((m = regex.exec(content)) !== null) {
        matches.push({
          start: m.index,
          end: m.index + m[0].length,
          type: 'highlight',
          highlightId: h.id,
          color: h.color,
        });
      }
    });

    if (matches.length === 0) {
      return <span>{content}</span>;
    }

    matches.sort((a, b) => a.start - b.start);

    const elements: React.ReactNode[] = [];
    let lastIdx = 0;

    for (let i = 0; i < matches.length; i++) {
      const match = matches[i];
      if (match.start < lastIdx) continue;

      if (match.start > lastIdx) {
        elements.push(content.substring(lastIdx, match.start));
      }

      const matchText = content.substring(match.start, match.end);

      if (match.type === 'search') {
        elements.push(
          <mark key={`search-${i}`} className="bg-amber-300 font-semibold px-0.5 rounded text-slate-950">
            {matchText}
          </mark>
        );
      } else if (match.type === 'highlight' && match.color) {
        elements.push(
          <mark
            key={`hl-${match.highlightId}-${i}`}
            onClick={(e) => {
              e.stopPropagation();
              if (match.highlightId) onRemoveHighlight(match.highlightId);
            }}
            title="Click to remove highlight"
            className={`cursor-pointer rounded-xs px-0.5 transition-opacity hover:opacity-75 ${colorClassMap[match.color]}`}
          >
            {matchText}
          </mark>
        );
      }

      lastIdx = match.end;
    }

    if (lastIdx < content.length) {
      elements.push(content.substring(lastIdx));
    }

    return <>{elements}</>;
  };

  const fontClass = {
    sm: 'text-sm leading-relaxed',
    base: 'text-[15px] leading-relaxed',
    lg: 'text-[17px] leading-loose',
  }[fontSize];

  const scrollToTop = () => {
    passageRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    if (passageRef.current) {
      passageRef.current.scrollTo({ top: passageRef.current.scrollHeight, behavior: 'smooth' });
    }
  };

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden select-text border-r border-slate-300 relative">
      {/* Passage Top Sub-header Control Bar */}
      <div className="h-12 bg-slate-50 border-b border-slate-200 px-4 flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
          <BookOpen className="w-4 h-4 text-blue-600" />
          <span>Reading Passage 2</span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-500 font-medium normal-case">7 Paragraphs (A–G)</span>
        </div>

        {/* Quick jump to paragraphs */}
        <div className="flex items-center gap-1">
          <span className="text-[11px] text-slate-400 font-medium mr-1 hidden sm:inline">Jump:</span>
          {paragraphs.map((p) => (
            <button
              key={p.id}
              id={`jump-btn-${p.id}`}
              onClick={() => {
                const el = document.getElementById(`paragraph-${p.id}`);
                el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="w-5 h-5 flex items-center justify-center rounded text-xs font-bold text-slate-700 bg-white hover:bg-slate-200 hover:text-slate-900 border border-slate-200 transition"
              title={`Jump to Paragraph ${p.id}`}
            >
              {p.id}
            </button>
          ))}
        </div>

        {/* Tools: Scroll Up/Down, Font size & Skim search */}
        <div className="flex items-center gap-2">
          {/* Quick Scroll Up/Down Buttons */}
          <div className="flex items-center border border-slate-200 rounded bg-white overflow-hidden text-xs">
            <button
              id="passage-scroll-top"
              onClick={scrollToTop}
              className="px-2 py-1 text-slate-600 hover:bg-slate-100 hover:text-slate-900 flex items-center gap-0.5 transition cursor-pointer"
              title="Scroll to Top of Passage"
            >
              <ChevronUp className="w-3.5 h-3.5" />
              <span className="text-[11px] hidden xl:inline">Top</span>
            </button>
            <button
              id="passage-scroll-bottom"
              onClick={scrollToBottom}
              className="px-2 py-1 border-l border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 flex items-center gap-0.5 transition cursor-pointer"
              title="Scroll to Bottom of Passage"
            >
              <ChevronDown className="w-3.5 h-3.5" />
              <span className="text-[11px] hidden xl:inline">Bottom</span>
            </button>
          </div>

          {/* Skim search */}
          <div className="relative flex items-center">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2 pointer-events-none" />
            <input
              id="input-passage-search"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Skim word..."
              className="pl-7 pr-6 py-1 text-xs bg-white border border-slate-200 rounded w-24 focus:w-32 transition-all focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-1.5 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Font sizing */}
          <div className="flex items-center border border-slate-200 rounded bg-white overflow-hidden text-xs">
            <button
              id="font-size-sm"
              onClick={() => setFontSize('sm')}
              className={`px-2 py-0.5 transition cursor-pointer ${
                fontSize === 'sm' ? 'bg-slate-200 font-bold text-slate-900' : 'text-slate-600 hover:bg-slate-100'
              }`}
              title="Small text"
            >
              A-
            </button>
            <button
              id="font-size-base"
              onClick={() => setFontSize('base')}
              className={`px-2 py-0.5 border-x border-slate-200 transition cursor-pointer ${
                fontSize === 'base' ? 'bg-slate-200 font-bold text-slate-900' : 'text-slate-600 hover:bg-slate-100'
              }`}
              title="Regular text"
            >
              A
            </button>
            <button
              id="font-size-lg"
              onClick={() => setFontSize('lg')}
              className={`px-2 py-0.5 transition cursor-pointer ${
                fontSize === 'lg' ? 'bg-slate-200 font-bold text-slate-900' : 'text-slate-600 hover:bg-slate-100'
              }`}
              title="Large text"
            >
              A+
            </button>
          </div>
        </div>
      </div>

      {/* Highlighter and notes sub-toolbar */}
      <div className="px-4 py-2 bg-slate-50/50 border-b border-slate-200 flex items-center justify-between gap-3 shrink-0">
        <HighlighterToolbar
          isActive={isHighlighterActive}
          onToggleActive={onToggleHighlighter}
          selectedColor={highlightColor}
          onSelectColor={onSelectHighlightColor}
          onClearAll={onClearAllHighlights}
          highlightCount={highlights.length}
        />

        <button
          id="toggle-passage-notes-btn"
          onClick={onToggleNotes}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded font-medium text-xs border transition-colors cursor-pointer ${
            isNotesOpen
              ? 'bg-blue-50 border-blue-200 text-blue-800'
              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
          }`}
        >
          <span>Passage Notes</span>
          {notes.trim().length > 0 && (
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
          )}
        </button>
      </div>

      {/* Floating Selection Tooltip for instant highlighting */}
      {selectionPopup && (
        <div
          className="fixed z-50 bg-slate-900 text-white rounded-lg shadow-xl px-2 py-1.5 flex items-center gap-1 text-xs border border-slate-700 animate-in fade-in"
          style={{ top: selectionPopup.y, left: selectionPopup.x }}
        >
          <span className="text-[10px] text-slate-300 font-medium mr-1">Highlight:</span>
          {(['yellow', 'emerald', 'sky', 'rose', 'purple'] as HighlightColor[]).map((c) => (
            <button
              key={c}
              onClick={() => applyHighlightFromPopup(c)}
              className={`w-5 h-5 rounded-full border border-white/20 transition transform hover:scale-125 ${
                c === 'yellow'
                  ? 'bg-yellow-300'
                  : c === 'emerald'
                  ? 'bg-emerald-300'
                  : c === 'sky'
                  ? 'bg-sky-300'
                  : c === 'rose'
                  ? 'bg-rose-300'
                  : 'bg-purple-300'
              }`}
              title={`Highlight with ${c}`}
            />
          ))}
          <button
            onClick={() => setSelectionPopup(null)}
            className="ml-1 text-slate-400 hover:text-white p-0.5"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Scrollable Passage Body */}
      <div
        ref={passageRef}
        onMouseUp={handleMouseUp}
        className="flex-1 min-h-0 overflow-y-auto p-6 sm:p-8 space-y-6 select-text custom-passage-scroll"
      >
        {/* Collapsible Notes Area (if expanded) */}
        <CollapsibleNotes
          id="passage-notes"
          title="Passage Notes & Key Observations"
          notes={notes}
          onChange={onNotesChange}
          isOpen={isNotesOpen}
          onToggle={onToggleNotes}
          placeholder="Type your notes about paragraphs A–G or key statistics here..."
        />

        {/* Practice Mode General Test Tip */}
        {isPracticeMode && (
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-100 transition-all">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold text-blue-600 tracking-wider">
                  Pro Tip
                </span>
                <span className="text-xs font-semibold text-blue-900">
                  {GENERAL_TEST_TIP.title}
                </span>
              </div>
              <button
                onClick={() => setIsTestTipExpanded(!isTestTipExpanded)}
                className="text-xs text-blue-600 font-medium hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>{isTestTipExpanded ? 'Collapse' : 'Expand'}</span>
                {isTestTipExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
            </div>
            {isTestTipExpanded && (
              <p className="mt-2 text-xs leading-relaxed text-blue-800">
                {GENERAL_TEST_TIP.content}
              </p>
            )}
          </div>
        )}

        {/* Passage Header */}
        <div className="border-b border-slate-200 pb-5">
          <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">
            Passage 2
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-3">
            {PASSAGE_TITLE}
          </h2>
          <p className="text-sm italic text-slate-600 leading-relaxed border-l-4 border-slate-200 pl-4 font-normal">
            {PASSAGE_SUBTITLE}
          </p>
        </div>

        {/* Instructions Reminder for Matching Headings in Passage Panel */}
        <div className="p-3 rounded-md bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse shrink-0" />
            <span>
              <strong>Matching Headings (Q14–19):</strong> Drag any heading from the Questions panel or tap directly into the drop zone next to each section letter (A–F) to assign its heading. (Note: Section G does not require a heading).
            </span>
          </div>
        </div>

        {/* Paragraphs A through G with Answer Box / Drop Zone next to Letter */}
        <div className="space-y-8">
          {paragraphs.map((p) => {
            const questionId = PARAGRAPH_QUESTION_MAP[p.id];
            const currentAnswer = questionId ? userAnswers[questionId] : undefined;
            const q = questionId ? questions.find((item) => item.id === questionId) : undefined;

            return (
              <div
                key={p.id}
                id={`paragraph-${p.id}`}
                data-paragraph-id={p.id}
                className={`group relative rounded-xl border transition-all p-4 sm:p-5 ${
                  highlightedParagraphTarget === p.id
                    ? 'bg-amber-50/80 border-amber-400 ring-2 ring-amber-400'
                    : 'bg-white border-slate-200/90 hover:border-slate-300 shadow-2xs'
                }`}
              >
                {/* Paragraph Header Row: Letter Badge & Drop Zone next to Letter */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2.5 shrink-0">
                    <div className="w-8 h-8 rounded-lg bg-[#1E293B] text-white font-extrabold flex items-center justify-center text-sm shadow-xs group-hover:bg-blue-600 transition-colors">
                      {p.id}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">
                        Section {p.id}
                      </h3>
                    </div>
                  </div>

                  {/* Drop Zone Box positioned right next to Letter */}
                  <div className="flex-1 min-w-0">
                    {questionId ? (
                      <HeadingDropZone
                        paragraphId={p.id}
                        questionId={questionId}
                        assignedHeadingId={currentAnswer}
                        onAssignHeading={handleAssignHeading}
                        onClearHeading={handleClearHeading}
                        selectedHeadingForAssign={selectedHeadingForAssign}
                        onSelectHeadingForAssign={onSelectHeadingForAssign}
                        isPracticeMode={isPracticeMode}
                        showPracticeAnswers={showPracticeAnswers}
                        question={q}
                      />
                    ) : (
                      <div className="py-2 px-3 bg-slate-50 border border-dashed border-slate-200 rounded text-xs text-slate-400 italic">
                        No heading question required for Section {p.id}
                      </div>
                    )}
                  </div>
                </div>

                {/* Paragraph Text Body */}
                <div className="mt-4 pl-1">
                  <p className={`text-slate-800 ${fontClass}`}>
                    {renderParagraphContent(p)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footnotes Section (if any) */}
        {FOOTNOTES && FOOTNOTES.length > 0 && (
          <div className="mt-8 pt-4 border-t border-slate-200 text-xs text-slate-600 space-y-1.5 bg-slate-50 p-4 rounded-lg">
            <div className="font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1">
              Footnotes
            </div>
            {FOOTNOTES.map((fn, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="font-mono font-bold text-slate-800">{fn.symbol}</span>
                <span>{fn.text}</span>
              </div>
            ))}
          </div>
        )}

        {/* Footer info */}
        <div className="pt-6 border-t border-slate-200 text-xs text-slate-400 flex items-center justify-between">
          <span>Source: Academic Reading Passage 2</span>
          <span>7 Paragraphs (A–G) • Questions 14–26</span>
        </div>
      </div>
    </div>
  );
};
