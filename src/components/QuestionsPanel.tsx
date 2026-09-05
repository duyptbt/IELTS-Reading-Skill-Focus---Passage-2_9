import React, { useState, useRef } from 'react';
import { Question, HighlightRange } from '../types';
import {
  HEADINGS_TEST_TIP,
  SEVENTEENTH_CENTURY_MCQ_TIP,
  EIGHTEENTH_CENTURY_MCQ_TIP,
  SENTENCE_COMPLETION_TIPS,
  LIST_OF_HEADINGS,
  SEVENTEENTH_CENTURY_OPTIONS,
  EIGHTEENTH_CENTURY_OPTIONS,
  HEADING_DISTRACTOR_NOTES,
  EXAM_REVIEW_ITEMS,
} from '../data/ieltsData';
import { CollapsibleNotes } from './CollapsibleNotes';
import { HighlighterToolbar, HighlightColor } from './HighlighterToolbar';
import { HighlightableText } from './HighlightableText';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Bookmark,
  Lightbulb,
  X,
  GripVertical,
  MousePointerClick,
  ArrowRight,
  Sparkles,
  Check,
  Info,
} from 'lucide-react';

const PARAGRAPH_QUESTION_MAP: Record<string, number> = {
  A: 14,
  B: 15,
  C: 16,
  D: 17,
  E: 18,
  F: 19,
};

interface QuestionsPanelProps {
  questions: Question[];
  userAnswers: Record<number, string>;
  onAnswerChange: (questionId: number, answer: string) => void;
  isPracticeMode: boolean;
  showPracticeAnswers: boolean;
  onLocateParagraph: (paragraphId: string, quote?: string) => void;
  notes: string;
  onNotesChange: (val: string) => void;
  isNotesOpen: boolean;
  onToggleNotes: () => void;
  flaggedQuestions: Set<number>;
  onToggleFlag: (questionId: number) => void;
  onSubmitTest?: () => void;
  highlightColor?: HighlightColor;
  onSelectHighlightColor?: (color: HighlightColor) => void;
  isHighlighterActive?: boolean;
  onToggleHighlighter?: () => void;
  highlights?: HighlightRange[];
  onAddHighlight?: (text: string, color: HighlightColor) => void;
  onRemoveHighlight?: (id: string) => void;
  onClearAllHighlights?: () => void;
  selectedHeadingForAssign: string | null;
  onSelectHeadingForAssign: (headingId: string | null) => void;
  onGoToConsolidation?: () => void;
}

export const QuestionsPanel: React.FC<QuestionsPanelProps> = ({
  questions,
  userAnswers,
  onAnswerChange,
  isPracticeMode,
  showPracticeAnswers,
  onLocateParagraph,
  notes,
  onNotesChange,
  isNotesOpen,
  onToggleNotes,
  flaggedQuestions,
  onToggleFlag,
  onSubmitTest,
  highlightColor: currentHighlightColor = 'yellow' as HighlightColor,
  onSelectHighlightColor = (_color: HighlightColor) => {},
  isHighlighterActive = false,
  onToggleHighlighter = () => {},
  highlights = [],
  onAddHighlight = (_text: string, _color: HighlightColor) => {},
  onRemoveHighlight = (_id: string) => {},
  onClearAllHighlights = () => {},
  selectedHeadingForAssign,
  onSelectHeadingForAssign,
  onGoToConsolidation,
}) => {
  const [expandedExplanations, setExpandedExplanations] = useState<Record<number, boolean>>({});
  const [expandedTips, setExpandedTips] = useState<Record<string, boolean>>({
    review: false,
    headings: true,
    mcqSeventeenth: true,
    mcqEighteenth: true,
    sentence: true,
    distractors: false,
  });

  const [selectionPopup, setSelectionPopup] = useState<{
    text: string;
    x: number;
    y: number;
  } | null>(null);

  const questionsScrollRef = useRef<HTMLDivElement>(null);

  const toggleExplanation = (id: number) => {
    setExpandedExplanations((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleTipSection = (section: string) => {
    setExpandedTips((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Group questions by section
  const sentenceQuestions = questions.filter((q) => q.section === 'sentence-completion');

  // Check correctness of answers
  const isQuestionCorrect = (q: Question): boolean => {
    const rawAnswer = (userAnswers[q.id] || '')
      .trim()
      .toLowerCase()
      .replace(/^[."']+|[."']+$/g, '')
      .replace(/\s+/g, ' ');
    if (!rawAnswer) return false;

    // For questions 20 and 21 (17th century measures - Correct: B, D)
    if (q.id === 20 || q.id === 21) {
      const ans20 = (userAnswers[20] || '').trim().toLowerCase();
      const ans21 = (userAnswers[21] || '').trim().toLowerCase();
      const targetAns = (userAnswers[q.id] || '').trim().toLowerCase();

      if (targetAns !== 'b' && targetAns !== 'd') return false;
      if (ans20 === ans21 && q.id === 21) return false;
      return true;
    }

    // For questions 22 and 23 (Early 18th century statements - Correct: A, E)
    if (q.id === 22 || q.id === 23) {
      const ans22 = (userAnswers[22] || '').trim().toLowerCase();
      const ans23 = (userAnswers[23] || '').trim().toLowerCase();
      const targetAns = (userAnswers[q.id] || '').trim().toLowerCase();

      if (targetAns !== 'a' && targetAns !== 'e') return false;
      if (ans22 === ans23 && q.id === 23) return false;
      return true;
    }

    return q.correctAnswers.some((ans) => {
      const cleanExpected = ans
        .trim()
        .toLowerCase()
        .replace(/^[."']+|[."']+$/g, '')
        .replace(/\s+/g, ' ');
      return rawAnswer === cleanExpected;
    });
  };

  const scrollToTop = () => {
    questionsScrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    if (questionsScrollRef.current) {
      questionsScrollRef.current.scrollTo({
        top: questionsScrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Handle text selection in questions
  const handleMouseUp = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('input') || target.closest('select') || target.closest('button')) {
      setSelectionPopup(null);
      return;
    }

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

    if (!questionsScrollRef.current || !questionsScrollRef.current.contains(selection.anchorNode)) {
      setSelectionPopup(null);
      return;
    }

    if (isHighlighterActive) {
      onAddHighlight(selectedText, currentHighlightColor);
      selection.removeAllRanges();
      setSelectionPopup(null);
      return;
    }

    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    setSelectionPopup({
      text: selectedText,
      x: Math.min(window.innerWidth - 180, Math.max(10, rect.left + rect.width / 2 - 80)),
      y: Math.max(10, rect.top - 42),
    });
  };

  const applyHighlightFromPopup = (color: HighlightColor) => {
    if (selectionPopup) {
      onAddHighlight(selectionPopup.text, color);
      window.getSelection()?.removeAllRanges();
      setSelectionPopup(null);
    }
  };

  // Find which paragraph a heading is currently assigned to (if any)
  const getAssignedParagraphForHeading = (headingId: string): string | null => {
    for (const [para, qId] of Object.entries(PARAGRAPH_QUESTION_MAP)) {
      if ((userAnswers[qId] || '').toLowerCase() === headingId.toLowerCase()) {
        return para;
      }
    }
    return null;
  };

  // Multiple Choice 20-21 (Seventeenth century measures) Handler
  const selectedSeventeenthOptions = [
    (userAnswers[20] || '').toUpperCase(),
    (userAnswers[21] || '').toUpperCase(),
  ].filter(Boolean);

  const handleToggleSeventeenthOption = (optId: string) => {
    const isAlreadySelected = selectedSeventeenthOptions.includes(optId);

    if (isAlreadySelected) {
      if (userAnswers[20]?.toUpperCase() === optId) {
        onAnswerChange(20, userAnswers[21] || '');
        onAnswerChange(21, '');
      } else if (userAnswers[21]?.toUpperCase() === optId) {
        onAnswerChange(21, '');
      }
    } else {
      if (!userAnswers[20]) {
        onAnswerChange(20, optId);
      } else if (!userAnswers[21]) {
        onAnswerChange(21, optId);
      } else {
        onAnswerChange(21, optId);
      }
    }
  };

  // Multiple Choice 22-23 (Early eighteenth century statements) Handler
  const selectedEighteenthOptions = [
    (userAnswers[22] || '').toUpperCase(),
    (userAnswers[23] || '').toUpperCase(),
  ].filter(Boolean);

  const handleToggleEighteenthOption = (optId: string) => {
    const isAlreadySelected = selectedEighteenthOptions.includes(optId);

    if (isAlreadySelected) {
      if (userAnswers[22]?.toUpperCase() === optId) {
        onAnswerChange(22, userAnswers[23] || '');
        onAnswerChange(23, '');
      } else if (userAnswers[23]?.toUpperCase() === optId) {
        onAnswerChange(23, '');
      }
    } else {
      if (!userAnswers[22]) {
        onAnswerChange(22, optId);
      } else if (!userAnswers[23]) {
        onAnswerChange(23, optId);
      } else {
        onAnswerChange(23, optId);
      }
    }
  };

  const answeredCount = Object.values(userAnswers).filter(
    (v): v is string => typeof v === 'string' && v.trim().length > 0
  ).length;

  return (
    <div className="h-full flex flex-col bg-slate-100 overflow-hidden select-text relative">
      {/* Question Header Status Bar */}
      <div className="h-12 bg-white border-b border-slate-200 px-4 flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">
            Questions 14–26
          </h3>
          <span className="text-xs text-slate-300">|</span>
          <span className="text-xs font-semibold text-slate-600">
            Answered {answeredCount} / 13
          </span>
        </div>

        {/* Jump to Question Sections */}
        <div className="hidden lg:flex items-center gap-1 text-xs">
          <span className="text-[11px] text-slate-400 font-medium mr-1">Section:</span>
          <button
            onClick={() => scrollToSection('section-headings')}
            className="px-2 py-0.5 rounded text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-200 border border-slate-200 transition cursor-pointer"
            title="Jump to Questions 14–19 (Matching Headings)"
          >
            14–19
          </button>
          <button
            onClick={() => scrollToSection('section-seventeenth')}
            className="px-2 py-0.5 rounded text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-200 border border-slate-200 transition cursor-pointer"
            title="Jump to Questions 20–21 (17th Century Measures)"
          >
            20–21
          </button>
          <button
            onClick={() => scrollToSection('section-eighteenth')}
            className="px-2 py-0.5 rounded text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-200 border border-slate-200 transition cursor-pointer"
            title="Jump to Questions 22–23 (18th Century Statements)"
          >
            22–23
          </button>
          <button
            onClick={() => scrollToSection('section-sentence')}
            className="px-2 py-0.5 rounded text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-200 border border-slate-200 transition cursor-pointer"
            title="Jump to Questions 24–26 (Sentence Completion)"
          >
            24–26
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Scroll Up/Down Buttons */}
          <div className="flex items-center border border-slate-200 rounded bg-white overflow-hidden text-xs">
            <button
              id="questions-scroll-top"
              onClick={scrollToTop}
              className="px-2 py-1 text-slate-600 hover:bg-slate-100 hover:text-slate-900 flex items-center gap-0.5 transition cursor-pointer"
              title="Scroll to Top of Questions"
            >
              <ChevronUp className="w-3.5 h-3.5" />
              <span className="text-[11px] hidden xl:inline">Top</span>
            </button>
            <button
              id="questions-scroll-bottom"
              onClick={scrollToBottom}
              className="px-2 py-1 border-l border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 flex items-center gap-0.5 transition cursor-pointer"
              title="Scroll to Bottom of Questions"
            >
              <ChevronDown className="w-3.5 h-3.5" />
              <span className="text-[11px] hidden xl:inline">Bottom</span>
            </button>
          </div>
        </div>
      </div>

      {/* Highlighter and notes sub-toolbar */}
      <div className="px-4 py-2 bg-slate-50/50 border-b border-slate-200 flex items-center justify-between gap-3 shrink-0">
        <HighlighterToolbar
          isActive={isHighlighterActive}
          onToggleActive={onToggleHighlighter}
          currentColor={currentHighlightColor}
          onSelectColor={onSelectHighlightColor}
          onClearAll={onClearAllHighlights}
          highlightCount={highlights.length}
        />

        <div className="flex items-center gap-2">
          {isPracticeMode && (
            <button
              onClick={() => toggleTipSection('review')}
              className={`text-xs font-semibold px-2.5 py-1 rounded border transition flex items-center gap-1.5 cursor-pointer ${
                expandedTips.review
                  ? 'bg-blue-100 text-blue-900 border-blue-300'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
              }`}
            >
              <Info className="w-3.5 h-3.5 text-blue-600" />
              <span>Exam Review</span>
            </button>
          )}

          <button
            onClick={onToggleNotes}
            className={`text-xs font-semibold px-2.5 py-1 rounded border transition flex items-center gap-1.5 cursor-pointer ${
              isNotesOpen
                ? 'bg-amber-100 text-amber-900 border-amber-300'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
            }`}
          >
            <span>{isNotesOpen ? 'Hide Notes' : 'Scratchpad'}</span>
            {notes.trim().length > 0 && (
              <span className="w-2 h-2 rounded-full bg-amber-500" />
            )}
          </button>
        </div>
      </div>

      {/* Floating Mini Highlight Popup for Selection in Questions */}
      {selectionPopup && (
        <div
          className="fixed z-50 bg-white border border-slate-300 rounded-lg shadow-xl px-2 py-1.5 flex items-center gap-1.5 animate-in fade-in zoom-in-95 duration-100"
          style={{ top: `${selectionPopup.y}px`, left: `${selectionPopup.x}px` }}
        >
          <span className="text-[10px] uppercase font-bold text-slate-400 mr-1">Highlight:</span>
          {(['yellow', 'emerald', 'sky', 'rose', 'purple'] as HighlightColor[]).map((c) => {
            const bgClass =
              c === 'yellow'
                ? 'bg-amber-300'
                : c === 'emerald'
                ? 'bg-emerald-400'
                : c === 'sky'
                ? 'bg-sky-400'
                : c === 'rose'
                ? 'bg-rose-400'
                : 'bg-purple-400';
            return (
              <button
                key={c}
                onClick={() => applyHighlightFromPopup(c)}
                className={`w-4 h-4 rounded-full ${bgClass} hover:scale-125 transition-transform border border-black/10`}
                title={`Highlight with ${c}`}
              />
            );
          })}
          <button
            onClick={() => setSelectionPopup(null)}
            className="p-0.5 text-slate-400 hover:text-slate-600 ml-0.5 rounded"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Main Scrollable Questions Container */}
      <div
        ref={questionsScrollRef}
        onMouseUp={handleMouseUp}
        className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 space-y-6 custom-passage-scroll"
      >
        {/* Collapsible Scratchpad */}
        <CollapsibleNotes
          id="questions-scratchpad"
          title="Questions Scratchpad & Elimination Log"
          notes={notes}
          onChange={onNotesChange}
          isOpen={isNotesOpen}
          onToggle={onToggleNotes}
          placeholder="Record notes, eliminate distractor headings, or jot keyword matches..."
        />

        {/* Practice Mode: Exam Review Drawer */}
        {isPracticeMode && expandedTips.review && (
          <div className="bg-white rounded-lg border border-blue-200 p-4 shadow-xs">
            <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-600" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Reading Passage 2 Exam Specifications
                </h4>
              </div>
              <button
                onClick={() => toggleTipSection('review')}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {EXAM_REVIEW_ITEMS.map((item) => (
                <div key={item.id} className="bg-blue-50/60 p-3 rounded border border-blue-100">
                  <div className="text-xs font-bold text-blue-900 mb-1">
                    {item.question}
                  </div>
                  <div className="text-xs text-blue-800 font-medium">
                    {item.answer}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SECTION 1: QUESTIONS 14–19 MATCHING HEADINGS */}
        {/* ========================================================================= */}
        <div id="section-headings" className="bg-white rounded-lg border border-slate-200 p-5 sm:p-6 shadow-xs">
          <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3 mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Questions 14–19
              </h2>
              <div className="text-xs text-slate-600 mt-0.5">
                <HighlightableText
                  text="Reading Passage 2 has SEVEN sections, A–G."
                  highlights={highlights}
                  onRemoveHighlight={onRemoveHighlight}
                />
              </div>
              <div className="text-xs font-semibold text-slate-800 mt-1">
                <HighlightableText
                  text="Choose the correct heading for sections A–F from the list of headings below."
                  highlights={highlights}
                  onRemoveHighlight={onRemoveHighlight}
                />
              </div>
              <div className="text-xs text-slate-500 italic mt-0.5">
                <HighlightableText
                  text="Write the correct number, i–viii, in boxes 14–19 on your answer sheet."
                  highlights={highlights}
                  onRemoveHighlight={onRemoveHighlight}
                />
              </div>
            </div>

            {isPracticeMode && (
              <button
                onClick={() => toggleTipSection('headings')}
                className="flex items-center gap-1 text-xs font-medium text-blue-700 bg-blue-50 px-2.5 py-1.5 rounded border border-blue-200 hover:bg-blue-100 transition shrink-0 cursor-pointer"
              >
                <Lightbulb className="w-3.5 h-3.5 text-blue-600" />
                <span>{expandedTips.headings ? 'Hide Tip' : 'Show Tip'}</span>
              </button>
            )}
          </div>

          {/* Practice Mode Tip Strip for Matching Headings */}
          {isPracticeMode && expandedTips.headings && (
            <div className="mb-4 bg-blue-50 border border-blue-100 rounded p-3 text-xs text-blue-900">
              <div className="flex items-center gap-1.5 font-bold text-blue-800 mb-1">
                <span className="px-1.5 py-0.5 bg-blue-600 text-white rounded text-[10px] uppercase font-bold tracking-wider">
                  Tip strip
                </span>
                <span>
                  <HighlightableText
                    text={HEADINGS_TEST_TIP.title}
                    highlights={highlights}
                    onRemoveHighlight={onRemoveHighlight}
                  />
                </span>
              </div>
              <div className="leading-relaxed text-blue-800 text-xs whitespace-pre-line">
                <HighlightableText
                  text={HEADINGS_TEST_TIP.content}
                  highlights={highlights}
                  onRemoveHighlight={onRemoveHighlight}
                />
              </div>
            </div>
          )}

          {/* Drag & Tap Interactive Instruction Banner */}
          <div className="p-3 mb-4 rounded-md bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
            <MousePointerClick className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong>How to Answer:</strong> Drag any heading from the list below directly into the drop zone next to Sections A–F in the passage panel, or tap a heading to select it and then tap the target section box. (Note: Section G does not require a heading).
            </div>
          </div>

          {/* List of Headings Cards (i to viii) */}
          <div className="mb-6 p-4 bg-slate-50 border border-slate-300 rounded-lg">
            <div className="flex items-center justify-between gap-2 mb-3">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                List of Headings (i–viii)
              </h3>
              {selectedHeadingForAssign && (
                <button
                  type="button"
                  onClick={() => onSelectHeadingForAssign(null)}
                  className="text-[11px] font-semibold text-rose-600 hover:text-rose-800 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 cursor-pointer"
                >
                  Cancel Selection
                </button>
              )}
            </div>

            <div className="space-y-2">
              {LIST_OF_HEADINGS.map((h) => {
                const assignedPara = getAssignedParagraphForHeading(h.id);
                const isSelected = selectedHeadingForAssign?.toLowerCase() === h.id.toLowerCase();

                return (
                  <div
                    key={h.id}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData('text/plain', h.id);
                      e.dataTransfer.setData('headingId', h.id);
                    }}
                    onClick={() => {
                      if (isSelected) {
                        onSelectHeadingForAssign(null);
                      } else {
                        onSelectHeadingForAssign(h.id);
                      }
                    }}
                    className={`group p-2.5 rounded-md border transition-all flex items-center justify-between gap-3 cursor-grab active:cursor-grabbing ${
                      isSelected
                        ? 'border-blue-500 bg-blue-100/80 ring-2 ring-blue-400'
                        : assignedPara
                        ? 'border-slate-300 bg-white/90 text-slate-800'
                        : 'border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/40 text-slate-900 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 flex-1 min-w-0">
                      <GripVertical className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500 shrink-0" />
                      <span className="w-5 h-5 rounded bg-[#1E293B] text-white font-bold text-xs flex items-center justify-center shrink-0 uppercase">
                        {h.id}
                      </span>
                      <span className="text-xs sm:text-sm font-medium leading-snug">
                        <HighlightableText
                          text={h.title}
                          highlights={highlights}
                          onRemoveHighlight={onRemoveHighlight}
                        />
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {assignedPara ? (
                        <div className="flex items-center gap-1.5">
                          {(() => {
                            const qId = PARAGRAPH_QUESTION_MAP[assignedPara];
                            const q = questions.find((item) => item.id === qId);
                            const isCorrect = q ? isQuestionCorrect(q) : false;
                            return (
                              <span
                                className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border flex items-center gap-1 ${
                                  showPracticeAnswers
                                    ? isCorrect
                                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                                      : 'bg-rose-100 text-rose-800 border-rose-300'
                                    : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                                }`}
                              >
                                {showPracticeAnswers && (isCorrect ? '✓ ' : '✗ ')}
                                Section {assignedPara} (Q{qId})
                              </span>
                            );
                          })()}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              const qId = PARAGRAPH_QUESTION_MAP[assignedPara];
                              onAnswerChange(qId, '');
                            }}
                            className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                            title="Unassign heading"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ) : isSelected ? (
                        <span className="text-[11px] font-bold text-blue-700 animate-pulse flex items-center gap-1">
                          Tap section box <ArrowRight className="w-3 h-3" />
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-400 group-hover:text-blue-600 font-medium hidden sm:inline">
                          Drag or tap to assign
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Distractor Headings Analysis in Practice Mode */}
          {isPracticeMode && showPracticeAnswers && (
            <div className="mt-4 p-4 rounded-lg bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-xs text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
                  Why Headings iii and vi were NOT used (Distractor Analysis)
                </span>
                <button
                  type="button"
                  onClick={() => toggleTipSection('distractors')}
                  className="text-blue-600 hover:text-blue-800 text-xs font-semibold"
                >
                  {expandedTips.distractors ? 'Hide' : 'Show'}
                </button>
              </div>

              {expandedTips.distractors && (
                <div className="space-y-2 mt-2 pt-2 border-t border-slate-200 text-xs text-slate-700">
                  {HEADING_DISTRACTOR_NOTES.map((d) => (
                    <div key={d.id} className="p-2 bg-white rounded border border-slate-200">
                      <div className="font-bold text-slate-900 mb-0.5">
                        Heading {d.id}: "{d.heading}"
                      </div>
                      <div className="text-slate-600 leading-relaxed">
                        {d.explanation}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* SECTION 2: QUESTIONS 20–21 CHOOSE TWO LETTERS, A–E (17th CENTURY MEASURES) */}
        {/* ========================================================================= */}
        <div id="section-seventeenth" className="bg-white rounded-lg border border-slate-200 p-5 sm:p-6 shadow-xs">
          <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3 mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Questions 20 and 21
              </h2>
              <div className="text-xs font-semibold text-slate-800 mt-0.5">
                <HighlightableText
                  text="Choose TWO letters, A–E."
                  highlights={highlights}
                  onRemoveHighlight={onRemoveHighlight}
                />
              </div>
              <div className="text-xs font-bold text-slate-900 mt-1">
                <HighlightableText
                  text="Which TWO measures did Russia take in the seventeenth century to avoid plague outbreaks?"
                  highlights={highlights}
                  onRemoveHighlight={onRemoveHighlight}
                />
              </div>
            </div>

            {isPracticeMode && (
              <button
                onClick={() => toggleTipSection('mcqSeventeenth')}
                className="flex items-center gap-1 text-xs font-medium text-blue-700 bg-blue-50 px-2.5 py-1.5 rounded border border-blue-200 hover:bg-blue-100 transition shrink-0 cursor-pointer"
              >
                <Lightbulb className="w-3.5 h-3.5 text-blue-600" />
                <span>{expandedTips.mcqSeventeenth ? 'Hide Tip' : 'Show Tip'}</span>
              </button>
            )}
          </div>

          {/* Tip Strip for Questions 20–21 */}
          {isPracticeMode && expandedTips.mcqSeventeenth && (
            <div className="mb-4 bg-blue-50 border border-blue-100 rounded p-3 text-xs text-blue-900">
              <div className="flex items-center gap-1.5 font-bold text-blue-800 mb-1">
                <span className="px-1.5 py-0.5 bg-blue-600 text-white rounded text-[10px] uppercase font-bold tracking-wider">
                  Tip strip
                </span>
                <span>
                  <HighlightableText
                    text={SEVENTEENTH_CENTURY_MCQ_TIP.title}
                    highlights={highlights}
                    onRemoveHighlight={onRemoveHighlight}
                  />
                </span>
              </div>
              <div className="leading-relaxed text-blue-800 text-xs whitespace-pre-line">
                <HighlightableText
                  text={SEVENTEENTH_CENTURY_MCQ_TIP.content}
                  highlights={highlights}
                  onRemoveHighlight={onRemoveHighlight}
                />
              </div>
            </div>
          )}

          {/* Statement Checkbox Options (A–E) */}
          <div className="space-y-2.5 my-4">
            {SEVENTEENTH_CENTURY_OPTIONS.map((opt) => {
              const isSelected = selectedSeventeenthOptions.includes(opt.id);
              const isOptCorrect = opt.id === 'B' || opt.id === 'D';

              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleToggleSeventeenthOption(opt.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-all flex items-start gap-3 cursor-pointer ${
                    showPracticeAnswers
                      ? isOptCorrect
                        ? 'border-emerald-300 bg-emerald-50/70 text-emerald-950 font-medium'
                        : isSelected
                        ? 'border-rose-300 bg-rose-50/70 text-rose-950'
                        : 'border-slate-200 bg-white text-slate-700'
                      : isSelected
                      ? 'border-blue-500 bg-blue-50/70 ring-1 ring-blue-400 text-blue-950 font-medium'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-800 shadow-2xs'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 border ${
                      isSelected
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'border-slate-300 bg-white text-slate-600'
                    }`}
                  >
                    {isSelected ? '✓' : opt.id}
                  </div>
                  <div className="flex-1 text-xs sm:text-sm leading-snug">
                    <span className="font-bold mr-1.5">{opt.id}</span>
                    <HighlightableText
                      text={opt.text}
                      highlights={highlights}
                      onRemoveHighlight={onRemoveHighlight}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Boxes 20 and 21 indicator */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
            {[20, 21].map((qId) => {
              const q = questions.find((item) => item.id === qId)!;
              const val = userAnswers[qId] || '';
              const isCorrect = isQuestionCorrect(q);
              const isExplanationOpen = expandedExplanations[qId] ?? false;

              return (
                <div key={qId} className="bg-white p-3 rounded border border-slate-200">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center">
                        {qId}
                      </span>
                      <span className="text-xs font-bold text-slate-700">
                        Box {qId} Choice:
                      </span>
                      <span className="font-extrabold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 text-xs">
                        {val ? val.toUpperCase() : '(None)'}
                      </span>
                    </div>

                    <button
                      onClick={() => onToggleFlag(qId)}
                      className={`p-1 rounded transition cursor-pointer ${
                        flaggedQuestions.has(qId)
                          ? 'text-amber-600 bg-amber-50'
                          : 'text-slate-300 hover:text-slate-500'
                      }`}
                      title="Flag question"
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${flaggedQuestions.has(qId) ? 'fill-amber-500' : ''}`} />
                    </button>
                  </div>

                  {showPracticeAnswers && (
                    <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                      {isCorrect ? (
                        <span className="text-emerald-700 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                        </span>
                      ) : (
                        <span className="text-rose-700 font-bold flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5" /> Expected: B or D
                        </span>
                      )}

                      <button
                        onClick={() => toggleExplanation(qId)}
                        className="text-blue-700 hover:text-blue-900 font-semibold flex items-center gap-0.5 text-[11px] cursor-pointer"
                      >
                        <span>{isExplanationOpen ? 'Hide' : 'Explanation'}</span>
                        {isExplanationOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                      </button>
                    </div>
                  )}

                  {isExplanationOpen && isPracticeMode && (
                    <div className="mt-2 p-2.5 rounded bg-yellow-50 border border-yellow-200 text-[11px] text-yellow-950 space-y-1">
                      <div className="italic text-yellow-900 font-serif">
                        "{q.quote}"
                      </div>
                      <div className="text-yellow-950 leading-relaxed">
                        {q.explanation}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 3: QUESTIONS 22–23 CHOOSE TWO LETTERS, A–E (EARLY 18th CENTURY) */}
        {/* ========================================================================= */}
        <div id="section-eighteenth" className="bg-white rounded-lg border border-slate-200 p-5 sm:p-6 shadow-xs">
          <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3 mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Questions 22 and 23
              </h2>
              <div className="text-xs font-semibold text-slate-800 mt-0.5">
                <HighlightableText
                  text="Choose TWO letters, A–E."
                  highlights={highlights}
                  onRemoveHighlight={onRemoveHighlight}
                />
              </div>
              <div className="text-xs font-bold text-slate-900 mt-1">
                <HighlightableText
                  text="Which TWO statements are made about Russia in the early eighteenth century?"
                  highlights={highlights}
                  onRemoveHighlight={onRemoveHighlight}
                />
              </div>
            </div>

            {isPracticeMode && (
              <button
                onClick={() => toggleTipSection('mcqEighteenth')}
                className="flex items-center gap-1 text-xs font-medium text-blue-700 bg-blue-50 px-2.5 py-1.5 rounded border border-blue-200 hover:bg-blue-100 transition shrink-0 cursor-pointer"
              >
                <Lightbulb className="w-3.5 h-3.5 text-blue-600" />
                <span>{expandedTips.mcqEighteenth ? 'Hide Tip' : 'Show Tip'}</span>
              </button>
            )}
          </div>

          {/* Tip Strip for Questions 22–23 */}
          {isPracticeMode && expandedTips.mcqEighteenth && (
            <div className="mb-4 bg-blue-50 border border-blue-100 rounded p-3 text-xs text-blue-900">
              <div className="flex items-center gap-1.5 font-bold text-blue-800 mb-1">
                <span className="px-1.5 py-0.5 bg-blue-600 text-white rounded text-[10px] uppercase font-bold tracking-wider">
                  Tip strip
                </span>
                <span>
                  <HighlightableText
                    text={EIGHTEENTH_CENTURY_MCQ_TIP.title}
                    highlights={highlights}
                    onRemoveHighlight={onRemoveHighlight}
                  />
                </span>
              </div>
              <div className="leading-relaxed text-blue-800 text-xs whitespace-pre-line">
                <HighlightableText
                  text={EIGHTEENTH_CENTURY_MCQ_TIP.content}
                  highlights={highlights}
                  onRemoveHighlight={onRemoveHighlight}
                />
              </div>
            </div>
          )}

          {/* Statement Checkbox Options (A–E) */}
          <div className="space-y-2.5 my-4">
            {EIGHTEENTH_CENTURY_OPTIONS.map((opt) => {
              const isSelected = selectedEighteenthOptions.includes(opt.id);
              const isOptCorrect = opt.id === 'A' || opt.id === 'E';

              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleToggleEighteenthOption(opt.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-all flex items-start gap-3 cursor-pointer ${
                    showPracticeAnswers
                      ? isOptCorrect
                        ? 'border-emerald-300 bg-emerald-50/70 text-emerald-950 font-medium'
                        : isSelected
                        ? 'border-rose-300 bg-rose-50/70 text-rose-950'
                        : 'border-slate-200 bg-white text-slate-700'
                      : isSelected
                      ? 'border-blue-500 bg-blue-50/70 ring-1 ring-blue-400 text-blue-950 font-medium'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-800 shadow-2xs'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 border ${
                      isSelected
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'border-slate-300 bg-white text-slate-600'
                    }`}
                  >
                    {isSelected ? '✓' : opt.id}
                  </div>
                  <div className="flex-1 text-xs sm:text-sm leading-snug">
                    <span className="font-bold mr-1.5">{opt.id}</span>
                    <HighlightableText
                      text={opt.text}
                      highlights={highlights}
                      onRemoveHighlight={onRemoveHighlight}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Boxes 22 and 23 indicator */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
            {[22, 23].map((qId) => {
              const q = questions.find((item) => item.id === qId)!;
              const val = userAnswers[qId] || '';
              const isCorrect = isQuestionCorrect(q);
              const isExplanationOpen = expandedExplanations[qId] ?? false;

              return (
                <div key={qId} className="bg-white p-3 rounded border border-slate-200">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center">
                        {qId}
                      </span>
                      <span className="text-xs font-bold text-slate-700">
                        Box {qId} Choice:
                      </span>
                      <span className="font-extrabold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 text-xs">
                        {val ? val.toUpperCase() : '(None)'}
                      </span>
                    </div>

                    <button
                      onClick={() => onToggleFlag(qId)}
                      className={`p-1 rounded transition cursor-pointer ${
                        flaggedQuestions.has(qId)
                          ? 'text-amber-600 bg-amber-50'
                          : 'text-slate-300 hover:text-slate-500'
                      }`}
                      title="Flag question"
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${flaggedQuestions.has(qId) ? 'fill-amber-500' : ''}`} />
                    </button>
                  </div>

                  {showPracticeAnswers && (
                    <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                      {isCorrect ? (
                        <span className="text-emerald-700 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                        </span>
                      ) : (
                        <span className="text-rose-700 font-bold flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5" /> Expected: A or E
                        </span>
                      )}

                      <button
                        onClick={() => toggleExplanation(qId)}
                        className="text-blue-700 hover:text-blue-900 font-semibold flex items-center gap-0.5 text-[11px] cursor-pointer"
                      >
                        <span>{isExplanationOpen ? 'Hide' : 'Explanation'}</span>
                        {isExplanationOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                      </button>
                    </div>
                  )}

                  {isExplanationOpen && isPracticeMode && (
                    <div className="mt-2 p-2.5 rounded bg-yellow-50 border border-yellow-200 text-[11px] text-yellow-950 space-y-1">
                      <div className="italic text-yellow-900 font-serif">
                        "{q.quote}"
                      </div>
                      <div className="text-yellow-950 leading-relaxed">
                        {q.explanation}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 4: QUESTIONS 24–26 SENTENCE COMPLETION */}
        {/* ========================================================================= */}
        <div id="section-sentence" className="bg-white rounded-lg border border-slate-200 p-5 sm:p-6 shadow-xs">
          <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3 mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Questions 24–26
              </h2>
              <div className="text-xs text-slate-600 mt-0.5">
                <HighlightableText
                  text="Complete the sentences below."
                  highlights={highlights}
                  onRemoveHighlight={onRemoveHighlight}
                />
              </div>
              <div className="text-xs font-semibold text-slate-800 mt-1">
                <HighlightableText
                  text="Choose ONE WORD ONLY from the passage for each answer."
                  highlights={highlights}
                  onRemoveHighlight={onRemoveHighlight}
                />
              </div>
              <div className="text-xs text-slate-500 italic mt-0.5">
                <HighlightableText
                  text="Write your answers in boxes 24–26 on your answer sheet."
                  highlights={highlights}
                  onRemoveHighlight={onRemoveHighlight}
                />
              </div>
            </div>

            {isPracticeMode && (
              <button
                onClick={() => toggleTipSection('sentence')}
                className="flex items-center gap-1 text-xs font-medium text-blue-700 bg-blue-50 px-2.5 py-1.5 rounded border border-blue-200 hover:bg-blue-100 transition shrink-0 cursor-pointer"
              >
                <Lightbulb className="w-3.5 h-3.5 text-blue-600" />
                <span>{expandedTips.sentence ? 'Hide Tips' : 'Show Tips'}</span>
              </button>
            )}
          </div>

          {/* Tip Strip for Questions 24–26 */}
          {isPracticeMode && expandedTips.sentence && (
            <div className="space-y-3 mb-4">
              {SENTENCE_COMPLETION_TIPS.map((tip, idx) => (
                <div key={idx} className="bg-blue-50 border border-blue-100 rounded p-3 text-xs text-blue-900">
                  <div className="flex items-center gap-1.5 font-bold text-blue-800 mb-1">
                    <span className="px-1.5 py-0.5 bg-blue-600 text-white rounded text-[10px] uppercase font-bold tracking-wider">
                      Tip strip
                    </span>
                    <span>
                      <HighlightableText
                        text={tip.title}
                        highlights={highlights}
                        onRemoveHighlight={onRemoveHighlight}
                      />
                    </span>
                  </div>
                  <div className="leading-relaxed text-blue-800 text-xs whitespace-pre-line">
                    <HighlightableText
                      text={tip.content}
                      highlights={highlights}
                      onRemoveHighlight={onRemoveHighlight}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Sentences List (Questions 24, 25, and 26) */}
          <div className="space-y-4">
            {sentenceQuestions.map((q) => {
              const currentVal = userAnswers[q.id] || '';
              const isFlagged = flaggedQuestions.has(q.id);
              const isCorrect = isQuestionCorrect(q);
              const isExplanationOpen = expandedExplanations[q.id] ?? false;

              return (
                <div
                  key={q.id}
                  id={`question-card-${q.id}`}
                  className={`p-4 rounded-lg border transition-all ${
                    showPracticeAnswers
                      ? isCorrect
                        ? 'border-emerald-300 bg-emerald-50/40'
                        : 'border-rose-300 bg-rose-50/40'
                      : 'border-slate-200 bg-white hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  {/* Study Tip for this Question */}
                  {isPracticeMode && q.tips && q.tips.length > 0 && (
                    <div className="mb-2.5 p-2 bg-amber-50 border border-amber-200 rounded text-xs text-amber-900 flex items-start gap-1.5">
                      <span className="px-1 py-0.2 bg-amber-600 text-white rounded text-[9px] uppercase font-bold tracking-wider shrink-0 mt-0.5">
                        Tip
                      </span>
                      <div className="flex-1 leading-relaxed text-xs">
                        <HighlightableText
                          text={q.tips[0].content}
                          highlights={highlights}
                          onRemoveHighlight={onRemoveHighlight}
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5 flex-1">
                      <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 border border-slate-200">
                        {q.id}
                      </span>
                      <div className="text-xs sm:text-sm text-slate-800 leading-relaxed flex-1">
                        {q.preText && (
                          <span className="mr-1.5">
                            <HighlightableText
                              text={q.preText}
                              highlights={highlights}
                              onRemoveHighlight={onRemoveHighlight}
                            />
                          </span>
                        )}

                        <span className="inline-block my-1">
                          <input
                            id={`question-input-${q.id}`}
                            type="text"
                            value={currentVal}
                            onChange={(e) => onAnswerChange(q.id, e.target.value)}
                            placeholder={`Answer ${q.id}...`}
                            className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded border w-44 sm:w-56 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                              showPracticeAnswers
                                ? isCorrect
                                  ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold'
                                  : 'bg-rose-50 border-rose-400 text-rose-950 font-bold'
                                : currentVal
                                ? 'bg-blue-50 border-blue-400 text-blue-950 font-medium'
                                : 'bg-white border-slate-300 text-slate-800'
                            }`}
                          />
                        </span>

                        {q.postText && (
                          <span className="ml-1.5">
                            <HighlightableText
                              text={q.postText}
                              highlights={highlights}
                              onRemoveHighlight={onRemoveHighlight}
                            />
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => onToggleFlag(q.id)}
                        className={`p-1.5 rounded transition cursor-pointer ${
                          isFlagged
                            ? 'text-amber-600 bg-amber-50 hover:bg-amber-100'
                            : 'text-slate-300 hover:text-slate-500 hover:bg-slate-100'
                        }`}
                        title={isFlagged ? 'Remove flag' : 'Flag question for review'}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isFlagged ? 'fill-amber-500' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Practice Mode Feedback & Explanation */}
                  {isPracticeMode && (
                    <div className="mt-3 pt-2.5 border-t border-slate-100">
                      <div className="flex items-center justify-between">
                        <button
                          id={`btn-explanation-${q.id}`}
                          onClick={() => toggleExplanation(q.id)}
                          className="flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                        >
                          <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                          <span>
                            {isExplanationOpen ? 'Hide Explanation' : 'View Explanation & Quote'}
                          </span>
                          {isExplanationOpen ? (
                            <ChevronUp className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5" />
                          )}
                        </button>

                        {showPracticeAnswers && (
                          <div className="flex items-center gap-1.5 text-xs font-semibold">
                            {isCorrect ? (
                              <span className="text-emerald-700 flex items-center gap-1">
                                <CheckCircle2 className="w-4 h-4" /> Correct
                              </span>
                            ) : (
                              <span className="text-rose-700 flex items-center gap-1">
                                <XCircle className="w-4 h-4" /> Expected:{' '}
                                <span className="underline font-bold">{q.displayAnswer}</span>
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {isExplanationOpen && (
                        <div className="mt-2.5 p-4 rounded border border-yellow-200 bg-yellow-50 shadow-inner text-xs text-yellow-950 space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="text-xs font-bold text-yellow-800 flex items-center gap-1.5 uppercase">
                              <HelpCircle className="w-3.5 h-3.5 text-yellow-700" />
                              <span>Question {q.id} Analysis</span>
                            </h4>
                            <button
                              onClick={() => onLocateParagraph(q.paragraphRef, q.quote)}
                              className="flex items-center gap-1 text-[11px] font-semibold text-yellow-900 hover:text-yellow-950 bg-yellow-100 px-2 py-0.5 rounded border border-yellow-300 transition cursor-pointer"
                            >
                              <span>Locate in Paragraph {q.paragraphRef}</span>
                              <ExternalLink className="w-3 h-3" />
                            </button>
                          </div>
                          <div>
                            <span className="font-bold text-yellow-950">Correct Answer: </span>
                            <span className="font-extrabold text-blue-900 bg-white px-2 py-0.5 rounded border border-yellow-200">
                              {q.displayAnswer}
                            </span>
                          </div>
                          <div>
                            <span className="font-semibold text-yellow-900">Passage Quote: </span>
                            <span className="italic text-yellow-800 font-serif">
                              "<HighlightableText text={q.quote} highlights={highlights} onRemoveHighlight={onRemoveHighlight} />"
                            </span>
                          </div>
                          <div className="leading-relaxed text-yellow-900 text-[11.5px]">
                            <span className="font-semibold">Analysis: </span>
                            <HighlightableText
                              text={q.explanation}
                              highlights={highlights}
                              onRemoveHighlight={onRemoveHighlight}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Consolidation Banner (shown in practice mode when answers checked) */}
          {isPracticeMode && showPracticeAnswers && (
            <div className="mt-8 p-5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 rounded-xl shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-amber-950">
                      Practice Finished — Consolidation Tab is Unlocked!
                    </h4>
                    <p className="text-xs text-amber-800 mt-0.5 leading-relaxed">
                      Deepen your learning with high-yield IELTS vocabulary, discourse patterns, and interactive reading skills activities for "Measures to combat infectious disease in tsarist Russia".
                    </p>
                  </div>
                </div>

                {onGoToConsolidation && (
                  <button
                    onClick={onGoToConsolidation}
                    className="self-start sm:self-auto px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-xs whitespace-nowrap cursor-pointer"
                  >
                    <span>Go to Consolidation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
