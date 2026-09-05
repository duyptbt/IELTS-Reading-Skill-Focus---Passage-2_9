import React, { useState, useEffect, useRef } from 'react';
import { AppMode, Question, HighlightRange, TestResult } from './types';
import { PARAGRAPHS, QUESTIONS, calculateBandScore } from './data/ieltsData';
import { Header } from './components/Header';
import { PassagePanel } from './components/PassagePanel';
import { QuestionsPanel } from './components/QuestionsPanel';
import { Divider } from './components/Divider';
import { TestResultsModal } from './components/TestResultsModal';
import { ConsolidationPanel } from './components/ConsolidationPanel';
import { HighlightColor } from './components/HighlighterToolbar';
import { Bookmark, HelpCircle } from 'lucide-react';

const INITIAL_TEST_SECONDS = 20 * 60; // 20 minutes

export default function App() {
  // Mode state
  const [mode, setMode] = useState<AppMode>('practice');

  // Consolidation activation state (unlocked after test submit or practice answer check)
  const [isConsolidationUnlocked, setIsConsolidationUnlocked] = useState<boolean>(() => {
    try {
      return localStorage.getItem('ielts_consolidation_unlocked') === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('ielts_consolidation_unlocked', isConsolidationUnlocked ? 'true' : 'false');
    } catch {
      // ignore
    }
  }, [isConsolidationUnlocked]);

  // Answers state: questionId -> string
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>(() => {
    try {
      const saved = localStorage.getItem('ielts_answers');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Flagged questions state
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());

  // Practice mode answers visibility
  const [showPracticeAnswers, setShowPracticeAnswers] = useState<boolean>(false);

  // Notes state
  const [passageNotes, setPassageNotes] = useState<string>(() => {
    return localStorage.getItem('ielts_passage_notes') || '';
  });
  const [questionNotes, setQuestionNotes] = useState<string>(() => {
    return localStorage.getItem('ielts_question_notes') || '';
  });
  const [isPassageNotesOpen, setIsPassageNotesOpen] = useState<boolean>(false);
  const [isQuestionNotesOpen, setIsQuestionNotesOpen] = useState<boolean>(false);

  // Highlighter state
  const [isHighlighterActive, setIsHighlighterActive] = useState<boolean>(false);
  const [highlightColor, setHighlightColor] = useState<HighlightColor>('yellow');
  const [highlights, setHighlights] = useState<HighlightRange[]>(() => {
    try {
      const saved = localStorage.getItem('ielts_highlights');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Test Mode Timer state
  const [timerSeconds, setTimerSeconds] = useState<number>(INITIAL_TEST_SECONDS);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [isResultModalOpen, setIsResultModalOpen] = useState<boolean>(false);

  // Panel Splitter state (percentage for left passage panel)
  const [splitRatio, setSplitRatio] = useState<number>(50);
  const [isDesktop, setIsDesktop] = useState<boolean>(() => {
    return typeof window !== 'undefined' ? window.innerWidth >= 768 : true;
  });
  const isDraggingRef = useRef<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Selected heading for tap-to-assign across panels
  const [selectedHeadingForAssign, setSelectedHeadingForAssign] = useState<string | null>(null);

  // Passage navigation & highlight target from question explanations
  const [highlightedParagraphTarget, setHighlightedParagraphTarget] = useState<string | null>(null);
  const [searchedEvidenceQuote, setSearchedEvidenceQuote] = useState<string | null>(null);

  // Highlights state for questions
  const [questionHighlights, setQuestionHighlights] = useState<HighlightRange[]>(() => {
    try {
      const saved = localStorage.getItem('ielts_question_highlights');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save persistent state
  useEffect(() => {
    localStorage.setItem('ielts_answers', JSON.stringify(userAnswers));
  }, [userAnswers]);

  useEffect(() => {
    localStorage.setItem('ielts_passage_notes', passageNotes);
  }, [passageNotes]);

  useEffect(() => {
    localStorage.setItem('ielts_question_notes', questionNotes);
  }, [questionNotes]);

  useEffect(() => {
    localStorage.setItem('ielts_highlights', JSON.stringify(highlights));
  }, [highlights]);

  useEffect(() => {
    localStorage.setItem('ielts_question_highlights', JSON.stringify(questionHighlights));
  }, [questionHighlights]);

  // Test Mode Timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (mode === 'test' && isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(prev => {
          if (prev <= 1) {
            clearInterval(interval!);
            handleCompleteTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [mode, isTimerRunning, timerSeconds]);

  // Handlers for Mode change
  const handleUnlockConsolidation = () => {
    const confirmed = window.confirm(
      "The Consolidation tab is normally activated once you submit Test Mode or check answers in Practice Mode.\n\nWould you like to unlock Consolidation now to study the key vocabulary, discourse structures, and skill tasks?"
    );
    if (confirmed) {
      setIsConsolidationUnlocked(true);
      setMode('consolidation');
    }
  };

  const handleSelectMode = (newMode: AppMode) => {
    if (newMode === 'consolidation') {
      if (!isConsolidationUnlocked) {
        handleUnlockConsolidation();
        return;
      }
      setMode('consolidation');
      setIsTimerRunning(false);
      return;
    }

    setMode(newMode);
    if (newMode === 'test') {
      setShowPracticeAnswers(false);
      // If timer is not running and still at initial, start it
      if (timerSeconds === INITIAL_TEST_SECONDS) {
        setIsTimerRunning(true);
      }
    } else {
      // In practice mode, stop timer
      setIsTimerRunning(false);
    }
  };

  const handleToggleShowAnswers = () => {
    const nextVal = !showPracticeAnswers;
    setShowPracticeAnswers(nextVal);
    if (nextVal) {
      setIsConsolidationUnlocked(true);
    }
  };

  // Answer handler
  const handleAnswerChange = (questionId: number, answer: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  // Flag handler
  const handleToggleFlag = (id: number) => {
    setFlaggedQuestions(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Highlighter Handlers
  const handleAddHighlight = (text: string, color: HighlightColor, paragraphId?: string) => {
    const newHighlight: HighlightRange = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      paragraphId: paragraphId || '',
      text: text.trim(),
      color,
      createdAt: Date.now(),
    };
    setHighlights(prev => [...prev, newHighlight]);
  };

  const handleRemoveHighlight = (id: string) => {
    setHighlights(prev => prev.filter(h => h.id !== id));
  };

  const handleClearAllHighlights = () => {
    if (highlights.length === 0) return;
    if (window.confirm("Remove all highlights from the passage?")) {
      setHighlights([]);
    }
  };

  // Questions Highlighter Handlers
  const handleAddQuestionHighlight = (text: string, color: HighlightColor) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const newHighlight: HighlightRange = {
      id: `q-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      target: 'questions',
      text: trimmed,
      color,
      createdAt: Date.now(),
    };
    setQuestionHighlights(prev => [...prev, newHighlight]);
  };

  const handleRemoveQuestionHighlight = (id: string) => {
    setQuestionHighlights(prev => prev.filter(h => h.id !== id));
  };

  const handleClearAllQuestionHighlights = () => {
    if (questionHighlights.length === 0) return;
    if (window.confirm("Remove all highlights from the questions?")) {
      setQuestionHighlights([]);
    }
  };

  // Locate paragraph and evidence in passage
  const handleLocateParagraph = (paragraphId: string, quote?: string) => {
    setHighlightedParagraphTarget(paragraphId);
    setSearchedEvidenceQuote(quote || null);
  };

  // Test Submission & Result calculation
  const handleCompleteTest = () => {
    setIsTimerRunning(false);

    let score = 0;
    const ans20 = (userAnswers[20] || '').trim().toLowerCase();
    const ans21 = (userAnswers[21] || '').trim().toLowerCase();
    const ans22 = (userAnswers[22] || '').trim().toLowerCase();
    const ans23 = (userAnswers[23] || '').trim().toLowerCase();

    const breakdown = QUESTIONS.map(q => {
      let isCorrect = false;

      if (q.id === 20 || q.id === 21) {
        const myAns = (userAnswers[q.id] || '').trim().toLowerCase();
        if (myAns === 'b' || myAns === 'd') {
          // If both 20 and 21 have the same answer, only give credit to 20
          if (ans20 === ans21 && q.id === 21) {
            isCorrect = false;
          } else {
            isCorrect = true;
          }
        }
      } else if (q.id === 22 || q.id === 23) {
        const myAns = (userAnswers[q.id] || '').trim().toLowerCase();
        if (myAns === 'a' || myAns === 'e') {
          // If both 22 and 23 have the same answer, only give credit to 22
          if (ans22 === ans23 && q.id === 23) {
            isCorrect = false;
          } else {
            isCorrect = true;
          }
        }
      } else {
        const userAns = (userAnswers[q.id] || '').trim().toLowerCase().replace(/^[."']+|[."']+$/g, '').replace(/\s+/g, ' ');
        isCorrect = q.correctAnswers.some(ans => {
          const cleanExpected = ans.trim().toLowerCase().replace(/^[."']+|[."']+$/g, '').replace(/\s+/g, ' ');
          return cleanExpected === userAns;
        });
      }

      if (isCorrect) score += 1;

      return {
        questionId: q.id,
        userAnswer: userAnswers[q.id] || '',
        isCorrect,
        correctDisplay: q.displayAnswer,
        explanation: q.explanation,
        paragraphRef: q.paragraphRef,
      };
    });

    const result: TestResult = {
      score,
      total: QUESTIONS.length,
      timeSpentSeconds: INITIAL_TEST_SECONDS - timerSeconds,
      bandScore: calculateBandScore(score),
      submittedAt: new Date().toLocaleTimeString(),
      breakdown,
    };

    setTestResult(result);
    setIsResultModalOpen(true);
    setIsConsolidationUnlocked(true);
  };

  const handleResetTest = () => {
    if (window.confirm("Are you sure you want to retake the test? Your timer and answers will be reset.")) {
      setTimerSeconds(INITIAL_TEST_SECONDS);
      setIsTimerRunning(true);
      setUserAnswers({});
      setFlaggedQuestions(new Set());
      setTestResult(null);
      setIsResultModalOpen(false);
    }
  };

  const handleReviewInPractice = () => {
    setIsResultModalOpen(false);
    setMode('practice');
    setShowPracticeAnswers(true);
  };

  const handleResetPractice = () => {
    if (window.confirm("Reset all question answers in Practice Mode?")) {
      setUserAnswers({});
      setShowPracticeAnswers(false);
    }
  };

  // Drag divider logic
  const handleDividerMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isDraggingRef.current = true;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!isDraggingRef.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const newRatio = ((moveEvent.clientX - rect.left) / rect.width) * 100;
      // Clamp between 25% and 75%
      const clamped = Math.min(75, Math.max(25, newRatio));
      setSplitRatio(clamped);
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleResetSplit = () => {
    setSplitRatio(50);
  };

  const answeredQuestionsCount = Object.values(userAnswers).filter((v): v is string => typeof v === 'string' && v.trim().length > 0).length;

  return (
    <div className="h-screen max-h-screen w-screen max-w-full overflow-hidden flex flex-col bg-slate-100 font-sans text-slate-900 selection:bg-amber-200">
      {/* Top Header */}
      <Header
        mode={mode}
        onSelectMode={handleSelectMode}
        isConsolidationUnlocked={isConsolidationUnlocked}
        onUnlockConsolidation={handleUnlockConsolidation}
        timerSeconds={timerSeconds}
        isTimerRunning={isTimerRunning}
        onToggleTimer={() => setIsTimerRunning(!isTimerRunning)}
        onResetTimer={() => setTimerSeconds(INITIAL_TEST_SECONDS)}
        onSubmitTest={handleCompleteTest}
        showPracticeAnswers={showPracticeAnswers}
        onToggleShowAnswers={handleToggleShowAnswers}
        onResetAnswers={handleResetPractice}
        answeredCount={answeredQuestionsCount}
        totalQuestions={QUESTIONS.length}
      />

      {/* Main Content Area: Consolidation Mode vs Dual-Panel Reading Arena */}
      {mode === 'consolidation' ? (
        <main className="flex-1 min-h-0 overflow-hidden flex flex-col w-full bg-slate-50">
          <ConsolidationPanel
            paragraphs={PARAGRAPHS}
            onNavigateToPractice={() => setMode('practice')}
            onNavigateToTest={() => {
              setMode('test');
              setShowPracticeAnswers(false);
              if (timerSeconds === INITIAL_TEST_SECONDS) {
                setIsTimerRunning(true);
              }
            }}
            onAddNote={(note) => {
              setPassageNotes(prev => prev ? `${prev}\n\n${note}` : note);
              setIsPassageNotesOpen(true);
            }}
          />
        </main>
      ) : (
        <main
          ref={containerRef}
          className="flex-1 min-h-0 flex flex-col md:flex-row overflow-hidden relative w-full"
        >
          {/* Left: Passage Panel */}
          <div
            className="h-1/2 md:h-full overflow-hidden flex flex-col min-h-0"
            style={{ width: isDesktop ? `calc(${splitRatio}% - 6px)` : '100%', flexShrink: 0 }}
          >
            <PassagePanel
              paragraphs={PARAGRAPHS}
              isPracticeMode={mode === 'practice'}
              notes={passageNotes}
              onNotesChange={setPassageNotes}
              isNotesOpen={isPassageNotesOpen}
              onToggleNotes={() => setIsPassageNotesOpen(!isPassageNotesOpen)}
              highlightColor={highlightColor}
              onSelectHighlightColor={setHighlightColor}
              isHighlighterActive={isHighlighterActive}
              onToggleHighlighter={() => setIsHighlighterActive(!isHighlighterActive)}
              highlights={highlights}
              onAddHighlight={handleAddHighlight}
              onRemoveHighlight={handleRemoveHighlight}
              onClearAllHighlights={handleClearAllHighlights}
              highlightedParagraphTarget={highlightedParagraphTarget}
              searchedEvidenceQuote={searchedEvidenceQuote}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              showPracticeAnswers={showPracticeAnswers}
              selectedHeadingForAssign={selectedHeadingForAssign}
              onSelectHeadingForAssign={setSelectedHeadingForAssign}
              questions={QUESTIONS}
            />
          </div>

          {/* Vertical Dividing Line & Draggable Resizer */}
          <Divider
            onMouseDown={handleDividerMouseDown}
            onDoubleClick={handleResetSplit}
          />

          {/* Right: Question Panel */}
          <div
            className="h-1/2 md:h-full overflow-hidden flex flex-col min-h-0"
            style={{ width: isDesktop ? `calc(${100 - splitRatio}% - 6px)` : '100%', flex: 1, minWidth: 0 }}
          >
            <QuestionsPanel
              questions={QUESTIONS}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              isPracticeMode={mode === 'practice'}
              showPracticeAnswers={showPracticeAnswers}
              onLocateParagraph={handleLocateParagraph}
              notes={questionNotes}
              onNotesChange={setQuestionNotes}
              isNotesOpen={isQuestionNotesOpen}
              onToggleNotes={() => setIsQuestionNotesOpen(!isQuestionNotesOpen)}
              flaggedQuestions={flaggedQuestions}
              onToggleFlag={handleToggleFlag}
              onSubmitTest={mode === 'practice' ? (showPracticeAnswers ? () => handleCompleteTest() : () => setShowPracticeAnswers(true)) : handleCompleteTest}
              highlightColor={highlightColor}
              onSelectHighlightColor={setHighlightColor}
              isHighlighterActive={isHighlighterActive}
              onToggleHighlighter={() => setIsHighlighterActive(!isHighlighterActive)}
              highlights={questionHighlights}
              onAddHighlight={handleAddQuestionHighlight}
              onRemoveHighlight={handleRemoveQuestionHighlight}
              onClearAllHighlights={handleClearAllQuestionHighlights}
              selectedHeadingForAssign={selectedHeadingForAssign}
              onSelectHeadingForAssign={setSelectedHeadingForAssign}
              onGoToConsolidation={() => {
                setIsConsolidationUnlocked(true);
                setMode('consolidation');
              }}
            />
          </div>
        </main>
      )}

      {/* Test Results Modal */}
      <TestResultsModal
        isOpen={isResultModalOpen}
        result={testResult}
        onClose={() => setIsResultModalOpen(false)}
        onRetake={handleResetTest}
        onReviewInPractice={handleReviewInPractice}
        onGoToConsolidation={() => {
          setIsResultModalOpen(false);
          setIsConsolidationUnlocked(true);
          setMode('consolidation');
        }}
      />
    </div>
  );
}
