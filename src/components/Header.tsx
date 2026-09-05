import React from 'react';
import { AppMode } from '../types';
import { PASSAGE_TITLE } from '../data/ieltsData';
import {
  Clock,
  Play,
  Pause,
  RotateCcw,
  BookOpen,
  GraduationCap,
  Eye,
  EyeOff,
  FileCheck2,
  Sparkles,
  Lock,
} from 'lucide-react';

interface HeaderProps {
  mode: AppMode;
  onSelectMode: (mode: AppMode) => void;
  isConsolidationUnlocked: boolean;
  onUnlockConsolidation: () => void;
  // Test Mode Timer Props
  timerSeconds: number;
  isTimerRunning: boolean;
  onToggleTimer: () => void;
  onResetTimer: () => void;
  onSubmitTest: () => void;
  // Practice Mode Props
  showPracticeAnswers: boolean;
  onToggleShowAnswers: () => void;
  onResetAnswers: () => void;
  answeredCount: number;
  totalQuestions: number;
}

export const Header: React.FC<HeaderProps> = ({
  mode,
  onSelectMode,
  isConsolidationUnlocked,
  onUnlockConsolidation,
  timerSeconds,
  isTimerRunning,
  onToggleTimer,
  onResetTimer,
  onSubmitTest,
  showPracticeAnswers,
  onToggleShowAnswers,
  onResetAnswers,
  answeredCount,
  totalQuestions,
}) => {
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isLowTime = timerSeconds <= 300 && timerSeconds > 60; // 5 mins
  const isCriticalTime = timerSeconds <= 60; // 1 min

  return (
    <header className="h-16 bg-[#1E293B] border-b border-slate-800 flex items-center justify-between px-3 sm:px-6 shrink-0 z-30">
      {/* Brand & Passage Identifier */}
      <div className="flex items-center gap-2.5 sm:gap-4">
        <div className="bg-blue-600 text-white py-1 px-2.5 sm:px-3 rounded flex items-center justify-center font-bold text-xs sm:text-sm tracking-wide shadow-xs">
          IELTS
        </div>
        <div>
          <h1 className="text-white font-semibold text-xs sm:text-base md:text-lg tracking-tight flex items-center gap-2">
            <span className="truncate max-w-[150px] sm:max-w-none">Passage 2: {PASSAGE_TITLE}</span>
          </h1>
          <p className="text-[10px] sm:text-xs text-slate-400 truncate max-w-[140px] sm:max-w-md">
            Academic Reading • Questions 14–26
          </p>
        </div>
      </div>

      {/* Mode Controls & Actions */}
      <div className="flex items-center gap-2 sm:gap-5">
        {/* Mode Selector Segmented Tabs */}
        <div className="flex items-center bg-slate-700/50 p-1 rounded-lg border border-slate-700/60">
          <button
            id="mode-practice-btn"
            onClick={() => onSelectMode('practice')}
            className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded transition-all text-xs sm:text-sm font-medium whitespace-nowrap ${
              mode === 'practice'
                ? 'bg-blue-600 text-white shadow font-semibold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 shrink-0" />
            <span>Practice Mode</span>
          </button>

          <button
            id="mode-test-btn"
            onClick={() => onSelectMode('test')}
            className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded transition-all text-xs sm:text-sm font-medium whitespace-nowrap ${
              mode === 'test'
                ? 'bg-blue-600 text-white shadow font-semibold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 shrink-0" />
            <span>Test Mode</span>
          </button>

          <button
            id="mode-consolidation-btn"
            onClick={() => {
              if (isConsolidationUnlocked) {
                onSelectMode('consolidation');
              } else {
                onUnlockConsolidation();
              }
            }}
            className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded transition-all text-xs sm:text-sm font-medium whitespace-nowrap relative ${
              mode === 'consolidation'
                ? 'bg-amber-600 text-white shadow font-semibold'
                : isConsolidationUnlocked
                ? 'text-amber-300 hover:text-amber-100 hover:bg-slate-700/70 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title={
              isConsolidationUnlocked
                ? 'Consolidation Unlocked: Study key vocabulary, structures & complete reading activities'
                : 'Consolidation is activated once you submit Test Mode or check answers in Practice Mode'
            }
          >
            {isConsolidationUnlocked ? (
              <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            ) : (
              <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            )}
            <span>Consolidation</span>
            {isConsolidationUnlocked && mode !== 'consolidation' && (
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block animate-pulse"></span>
            )}
          </button>
        </div>

        {/* Mode-Specific Actions */}
        <div className="flex items-center gap-2">
          {mode === 'consolidation' ? (
            /* CONSOLIDATION MODE ACTIONS */
            <div className="flex items-center gap-2">
              <span className="text-[11px] sm:text-xs text-amber-300 font-semibold hidden md:inline-flex items-center gap-1 bg-amber-950/40 px-2.5 py-1 rounded border border-amber-600/30">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Language & Skills Focus</span>
              </span>
              <button
                onClick={() => onSelectMode('practice')}
                className="flex items-center gap-1 px-3 py-1.5 rounded text-xs font-semibold bg-slate-700 hover:bg-slate-600 text-white transition border border-slate-600"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Return to</span> Passage
              </button>
            </div>
          ) : mode === 'test' ? (
            /* TEST MODE: 20-minute Timer & Submit */
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Timer Pill with Pulsing Indicator */}
              <div
                id="test-timer-display"
                className={`flex items-center gap-1.5 sm:gap-2 bg-slate-900/70 px-2.5 sm:px-3 py-1.5 rounded border border-slate-700 shadow-xs transition-colors ${
                  isCriticalTime
                    ? 'border-rose-500/80 bg-rose-950/40 text-rose-300'
                    : isLowTime
                    ? 'border-amber-500/80 bg-amber-950/40 text-amber-200'
                    : 'text-slate-100'
                }`}
                title={isCriticalTime ? 'Less than 1 minute remaining!' : isLowTime ? 'Less than 5 minutes remaining!' : '20-minute exam timer'}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    isCriticalTime
                      ? 'bg-rose-500 animate-ping'
                      : isLowTime
                      ? 'bg-amber-400 animate-pulse'
                      : 'bg-orange-500 animate-pulse'
                  }`}
                />
                <span className="font-mono font-bold text-sm sm:text-lg tracking-wider">
                  {formatTime(timerSeconds)}
                </span>
              </div>

              {/* Pause / Resume */}
              <button
                id="btn-timer-pause-resume"
                onClick={onToggleTimer}
                className="p-1.5 rounded border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                title={isTimerRunning ? 'Pause timer' : 'Resume timer'}
              >
                {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>

              {/* Submit Test */}
              <button
                id="btn-submit-test"
                onClick={onSubmitTest}
                className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow transition uppercase tracking-wider"
              >
                <FileCheck2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Submit Test</span>
                <span className="sm:hidden">Submit</span>
              </button>
            </div>
          ) : (
            /* PRACTICE MODE: Check answers & Reset */
            <div className="flex items-center gap-2">
              <button
                id="btn-check-answers"
                onClick={onToggleShowAnswers}
                className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded text-xs font-semibold transition shadow-xs ${
                  showPracticeAnswers
                    ? 'bg-slate-700 text-slate-100 hover:bg-slate-600 border border-slate-600'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {showPracticeAnswers ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{showPracticeAnswers ? 'Hide Answers' : 'Check Answers'}</span>
              </button>

              <button
                id="btn-reset-practice"
                onClick={onResetAnswers}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded border border-slate-700/60 transition"
                title="Reset your answers"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
