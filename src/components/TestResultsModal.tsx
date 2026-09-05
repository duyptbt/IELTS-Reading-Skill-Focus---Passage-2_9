import React from 'react';
import { TestResult } from '../types';
import { PASSAGE_TITLE } from '../data/ieltsData';
import { Award, CheckCircle2, XCircle, RotateCcw, Eye, Clock, Check, Sparkles, ArrowRight } from 'lucide-react';

interface TestResultsModalProps {
  isOpen: boolean;
  result: TestResult | null;
  onClose: () => void;
  onRetake: () => void;
  onReviewInPractice: () => void;
  onGoToConsolidation?: () => void;
}

export const TestResultsModal: React.FC<TestResultsModalProps> = ({
  isOpen,
  result,
  onClose,
  onRetake,
  onReviewInPractice,
  onGoToConsolidation,
}) => {
  if (!isOpen || !result) return null;

  const minutes = Math.floor(result.timeSpentSeconds / 60);
  const seconds = result.timeSpentSeconds % 60;
  const percentage = Math.round((result.score / result.total) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-6 bg-[#1E293B] text-white text-center relative overflow-hidden">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider mb-2 border border-blue-400/30">
              <Award className="w-3.5 h-3.5" />
              <span>IELTS Reading Test Completed</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Test Performance Results
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Passage 2: {PASSAGE_TITLE}
            </p>

            {/* Score Grid */}
            <div className="grid grid-cols-3 gap-3 mt-6 max-w-md mx-auto">
              <div className="bg-white/10 rounded p-3 backdrop-blur-xs border border-white/10">
                <div className="text-2xl sm:text-3xl font-black text-amber-300">
                  {result.bandScore}
                </div>
                <div className="text-[11px] uppercase tracking-wider text-slate-300 font-bold mt-0.5">
                  Est. Band
                </div>
              </div>

              <div className="bg-white/10 rounded p-3 backdrop-blur-xs border border-white/10">
                <div className="text-2xl sm:text-3xl font-black text-white">
                  {result.score} <span className="text-sm font-normal text-slate-300">/ {result.total}</span>
                </div>
                <div className="text-[11px] uppercase tracking-wider text-slate-300 font-bold mt-0.5">
                  Raw Score ({percentage}%)
                </div>
              </div>

              <div className="bg-white/10 rounded p-3 backdrop-blur-xs border border-white/10">
                <div className="text-2xl sm:text-3xl font-black text-blue-300 flex items-center justify-center gap-1">
                  <span>{minutes}m {seconds < 10 ? `0${seconds}` : seconds}s</span>
                </div>
                <div className="text-[11px] uppercase tracking-wider text-slate-300 font-bold mt-0.5">
                  Time Spent
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Unlocked Consolidation Banner */}
        <div className="bg-amber-50 border-b border-amber-200 px-6 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <span className="text-xs text-amber-900 font-semibold">
              Consolidation Tab Unlocked! Study key vocabulary, structures, and skill tasks from this passage.
            </span>
          </div>
          {onGoToConsolidation && (
            <button
              onClick={onGoToConsolidation}
              className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded text-xs font-bold transition flex items-center gap-1 shrink-0"
            >
              <span>Go to Consolidation</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Results List */}
        <div className="p-6 overflow-y-auto flex-1 space-y-3 custom-passage-scroll bg-slate-50">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Questions 14–26 Summary
          </h3>

          <div className="space-y-2">
            {result.breakdown.map((item) => (
              <div
                key={item.questionId}
                className={`p-3 rounded border flex items-center justify-between gap-3 text-xs ${
                  item.isCorrect
                    ? 'bg-emerald-50/70 border-emerald-200 text-slate-800'
                    : 'bg-rose-50/70 border-rose-200 text-slate-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-6 h-6 rounded flex items-center justify-center font-bold text-xs shrink-0 ${
                      item.isCorrect
                        ? 'bg-emerald-200 text-emerald-900'
                        : 'bg-rose-200 text-rose-900'
                    }`}
                  >
                    {item.questionId}
                  </span>
                  <div>
                    <div className="font-semibold text-slate-900">
                      Your answer:{' '}
                      <span className={item.isCorrect ? 'text-emerald-800 font-bold' : 'text-rose-700 line-through'}>
                        {item.userAnswer || '(No answer)'}
                      </span>
                    </div>
                    {!item.isCorrect && (
                      <div className="text-[11px] text-slate-600 mt-0.5">
                        Correct:{' '}
                        <span className="font-bold text-emerald-700">{item.correctDisplay}</span> (Paragraph {item.paragraphRef})
                      </div>
                    )}
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-1 font-semibold">
                  {item.isCorrect ? (
                    <span className="text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Correct
                    </span>
                  ) : (
                    <span className="text-rose-600 flex items-center gap-1">
                      <XCircle className="w-4 h-4" /> Incorrect
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="p-4 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 shrink-0">
          <button
            onClick={onRetake}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake 20-Min Test</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-2 rounded text-xs font-semibold text-slate-600 hover:bg-slate-100 transition"
            >
              Close
            </button>
            <button
              onClick={onReviewInPractice}
              className="flex items-center gap-1.5 px-4 py-2 rounded text-xs font-bold bg-[#1E293B] hover:bg-slate-800 text-white tracking-wider uppercase transition shadow-xs"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Review in Practice</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
