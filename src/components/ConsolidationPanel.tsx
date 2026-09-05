import React, { useState } from 'react';
import {
  LanguageItem,
  GrammarStructureItem,
  ParaphraseTaskItem,
  CollocationQuizItem,
  SentenceScrambleItem,
  AuthorStanceItem,
  Paragraph,
} from '../types';
import {
  CONSOLIDATION_VOCABULARY,
  CONSOLIDATION_GRAMMAR_STRUCTURES,
  CONSOLIDATION_PARAPHRASE_TASKS,
  CONSOLIDATION_COLLOCATION_QUIZ,
  CONSOLIDATION_SENTENCE_SCRAMBLE,
  AUTHOR_ARGUMENT_FLOW,
} from '../data/consolidationData';
import { PASSAGE_TITLE } from '../data/ieltsData';
import {
  Sparkles,
  BookOpen,
  Award,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Check,
  Copy,
  Lightbulb,
  FileText,
  Bookmark,
  Layers,
  Search,
  ArrowRight,
  TrendingUp,
  Puzzle,
  Compass,
  ChevronRight,
} from 'lucide-react';

interface ConsolidationPanelProps {
  paragraphs: Paragraph[];
  onAddNote: (noteSnippet: string) => void;
  onNavigateToPractice: () => void;
  onNavigateToTest: () => void;
}

type ConsolidationTab = 'vocabulary' | 'structures' | 'tasks' | 'argument-flow';

export const ConsolidationPanel: React.FC<ConsolidationPanelProps> = ({
  paragraphs,
  onAddNote,
  onNavigateToPractice,
  onNavigateToTest,
}) => {
  const [activeTab, setActiveTab] = useState<ConsolidationTab>('vocabulary');

  // Vocabulary filters & search
  const [vocabSearch, setVocabSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedItemId, setCopiedItemId] = useState<string | null>(null);
  const [addedNotesItemId, setAddedNotesItemId] = useState<string | null>(null);

  // Paraphrase Task State
  const [selectedParaphraseAnswers, setSelectedParaphraseAnswers] = useState<Record<string, string>>({});
  const [showParaphraseResults, setShowParaphraseResults] = useState<Record<string, boolean>>({});

  // Collocation Quiz State
  const [collocationAnswers, setCollocationAnswers] = useState<Record<string, string>>({});
  const [collocationChecked, setCollocationChecked] = useState<Record<string, boolean>>({});

  // Sentence Scramble State
  const [userScrambleOrders, setUserScrambleOrders] = useState<Record<string, string[]>>({
    'scramble-1': [],
    'scramble-2': [],
    'scramble-3': [],
  });
  const [scrambleResults, setScrambleResults] = useState<Record<string, boolean | null>>({});

  // Active paragraph in Argument Flow
  const [selectedFlowPara, setSelectedFlowPara] = useState<'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'>('A');

  // Handle Copy to clipboard
  const handleCopy = (item: LanguageItem) => {
    const text = `${item.term} (${item.partOfSpeech}) - ${item.bandLevel}\nDefinition: ${item.definition}\nPassage Quote (Para ${item.paragraphRef}): "${item.passageQuote}"\nCollocations: ${item.collocations.join('; ')}\nIELTS Tip: ${item.ieltsTip}`;
    navigator.clipboard.writeText(text);
    setCopiedItemId(item.id);
    setTimeout(() => setCopiedItemId(null), 2000);
  };

  // Handle Add to Notes
  const handleAddToNotes = (item: LanguageItem) => {
    const snippet = `[Vocabulary] ${item.term} (${item.partOfSpeech}) - ${item.bandLevel}\n• Definition: ${item.definition}\n• In Passage (Para ${item.paragraphRef}): "${item.passageQuote}"\n• Key Collocations: ${item.collocations.join(', ')}\n• Reading Strategy: ${item.ieltsTip}\n\n`;
    onAddNote(snippet);
    setAddedNotesItemId(item.id);
    setTimeout(() => setAddedNotesItemId(null), 2000);
  };

  // Add Grammar Structure to Notes
  const handleAddStructureToNotes = (struct: GrammarStructureItem) => {
    const snippet = `[Structure] ${struct.title}\n• Pattern: ${struct.structurePattern}\n• Passage Example (Para ${struct.paragraphRef}): "${struct.passageExample}"\n• Simplified Meaning: ${struct.simplifiedParaphrase}\n• IELTS Reading Function: ${struct.ieltsReadingFunction}\n\n`;
    onAddNote(snippet);
    setAddedNotesItemId(struct.id);
    setTimeout(() => setAddedNotesItemId(null), 2000);
  };

  // Filtered vocabulary
  const filteredVocabulary = CONSOLIDATION_VOCABULARY.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.term.toLowerCase().includes(vocabSearch.toLowerCase()) ||
      item.definition.toLowerCase().includes(vocabSearch.toLowerCase()) ||
      item.collocations.some((c) => c.toLowerCase().includes(vocabSearch.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Calculate Paraphrase Score
  const completedParaphraseCount = Object.keys(showParaphraseResults).length;
  const correctParaphraseCount = CONSOLIDATION_PARAPHRASE_TASKS.filter((task) => {
    const selectedOptId = selectedParaphraseAnswers[task.id];
    const option = task.options.find((o) => o.id === selectedOptId);
    return option?.isCorrect && showParaphraseResults[task.id];
  }).length;

  // Calculate Collocation Score
  const completedCollocationCount = Object.keys(collocationChecked).length;
  const correctCollocationCount = CONSOLIDATION_COLLOCATION_QUIZ.filter((q) => {
    return collocationChecked[q.id] && collocationAnswers[q.id] === q.correctAnswer;
  }).length;

  // Sentence Scramble handlers
  const handleToggleScrambleChunk = (scrambleId: string, chunk: string) => {
    setUserScrambleOrders((prev) => {
      const current = prev[scrambleId] || [];
      if (current.includes(chunk)) {
        return { ...prev, [scrambleId]: current.filter((c) => c !== chunk) };
      } else {
        return { ...prev, [scrambleId]: [...current, chunk] };
      }
    });
    // Reset checked status on change
    setScrambleResults((prev) => ({ ...prev, [scrambleId]: null }));
  };

  const handleCheckScramble = (task: SentenceScrambleItem) => {
    const userOrder = userScrambleOrders[task.id] || [];
    if (userOrder.length !== task.correctOrder.length) {
      alert("Please select all sentence parts before checking!");
      return;
    }
    const isCorrect = userOrder.every((chunk, idx) => chunk === task.correctOrder[idx]);
    setScrambleResults((prev) => ({ ...prev, [task.id]: isCorrect }));
  };

  const handleResetScramble = (scrambleId: string) => {
    setUserScrambleOrders((prev) => ({ ...prev, [scrambleId]: [] }));
    setScrambleResults((prev) => ({ ...prev, [scrambleId]: null }));
  };

  return (
    <div className="flex-1 h-full min-h-0 flex flex-col bg-slate-100 overflow-hidden font-sans">
      {/* Top Banner & Tab Navigation */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-8 py-4 shrink-0 shadow-xs">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold text-xs border border-amber-300">
                <Sparkles className="w-3 h-3 text-amber-600" />
                <span>Consolidation Unlocked</span>
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Passage 2: {PASSAGE_TITLE}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
              Language Input & Reading Skill Consolidation
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Review high-yield IELTS vocabulary, discourse structures, and practice paraphrase decoding to maximize your Band score.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={onNavigateToPractice}
              className="px-3 py-1.5 rounded text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Back to Practice Mode</span>
            </button>
            <button
              onClick={onNavigateToTest}
              className="px-3 py-1.5 rounded text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-xs transition flex items-center gap-1.5"
            >
              <span>Go to Test Mode</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-6xl mx-auto flex items-center gap-2 mt-4 pt-2 border-t border-slate-100 overflow-x-auto">
          <button
            id="tab-btn-vocab"
            onClick={() => setActiveTab('vocabulary')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition shrink-0 ${
              activeTab === 'vocabulary'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Key Words & Phrases ({CONSOLIDATION_VOCABULARY.length})</span>
          </button>

          <button
            id="tab-btn-structures"
            onClick={() => setActiveTab('structures')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition shrink-0 ${
              activeTab === 'structures'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Useful Expressions & Structures ({CONSOLIDATION_GRAMMAR_STRUCTURES.length})</span>
          </button>

          <button
            id="tab-btn-tasks"
            onClick={() => setActiveTab('tasks')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition shrink-0 ${
              activeTab === 'tasks'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Puzzle className="w-4 h-4" />
            <span>Skill Activities & Tasks (4 Activities)</span>
          </button>

          <button
            id="tab-btn-argument"
            onClick={() => setActiveTab('argument-flow')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition shrink-0 ${
              activeTab === 'argument-flow'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Argument Flow & Author Stance</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto custom-passage-scroll p-4 sm:p-8">
        <div className="max-w-6xl mx-auto pb-16">
          {/* TAB 1: KEY WORDS & PHRASES */}
          {activeTab === 'vocabulary' && (
            <div className="space-y-6">
              {/* Search & Filter Bar */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
                {/* Search box */}
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={vocabSearch}
                    onChange={(e) => setVocabSearch(e.target.value)}
                    placeholder="Search term, definition, or collocation..."
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                  />
                </div>

                {/* Category Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                  {[
                    { id: 'all', label: 'All Items' },
                    { id: 'environmental-econ', label: 'Environmental / Econ' },
                    { id: 'academic-vocab', label: 'Academic Vocab' },
                    { id: 'collocation', label: 'Collocations' },
                    { id: 'idiomatic-phrase', label: 'Idioms / Signposts' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                        selectedCategory === cat.id
                          ? 'bg-slate-800 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Vocabulary Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredVocabulary.map((item) => {
                  const isCopied = copiedItemId === item.id;
                  const isAdded = addedNotesItemId === item.id;

                  return (
                    <div
                      key={item.id}
                      className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                    >
                      <div>
                        {/* Header: Term, Band & Paragraph Reference */}
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                                {item.term}
                              </h3>
                              <span className="text-[11px] font-mono text-slate-500 italic">
                                {item.phonetic}
                              </span>
                            </div>
                            <span className="text-xs text-slate-500 font-medium">
                              {item.partOfSpeech}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                              {item.bandLevel}
                            </span>
                            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                              Para {item.paragraphRef}
                            </span>
                          </div>
                        </div>

                        {/* Definition */}
                        <p className="text-sm text-slate-700 font-medium leading-relaxed mb-3">
                          {item.definition}
                        </p>

                        {/* Exact Passage Quote */}
                        <div className="bg-slate-50 border-l-3 border-blue-500 p-3 rounded-r-lg mb-3">
                          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
                            <span>Passage Context</span>
                            <span className="text-slate-400 font-normal">(Paragraph {item.paragraphRef})</span>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-800 italic font-serif leading-relaxed">
                            "{item.passageQuote}"
                          </p>
                        </div>

                        {/* Collocations */}
                        <div className="mb-3">
                          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1">
                            <TrendingUp className="w-3 h-3 text-emerald-600" />
                            <span>IELTS High-Yield Collocations</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {item.collocations.map((colloc, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 rounded bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200/80"
                              >
                                {colloc}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* IELTS Strategy Tip */}
                        <div className="bg-amber-50/70 border border-amber-200/80 rounded-lg p-2.5 mb-4">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 mb-1">
                            <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                            <span>IELTS Reading Insight</span>
                          </div>
                          <p className="text-xs text-amber-800 leading-relaxed">
                            {item.ieltsTip}
                          </p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                        <button
                          onClick={() => handleCopy(item)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition font-medium"
                          title="Copy details to clipboard"
                        >
                          {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{isCopied ? 'Copied' : 'Copy'}</span>
                        </button>

                        <button
                          onClick={() => handleAddToNotes(item)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 transition font-semibold"
                          title="Add to Passage/Question Notes"
                        >
                          {isAdded ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Bookmark className="w-3.5 h-3.5" />}
                          <span>{isAdded ? 'Added to Notes!' : 'Save to Study Notes'}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: USEFUL EXPRESSIONS & STRUCTURES */}
          {activeTab === 'structures' && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-blue-950">
                    Why Discourse Structures Matter for IELTS Reading
                  </h3>
                  <p className="text-xs sm:text-sm text-blue-800 mt-1 leading-relaxed">
                    Passage 2 and 3 frequently use inverted conditionals, concessive clauses, and hedging to express nuanced scientific and economic arguments. Recognizing these structural templates allows you to instantly determine whether the writer is presenting a fact, a hypothesis, or an alternative counter-argument.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {CONSOLIDATION_GRAMMAR_STRUCTURES.map((struct, index) => {
                  const isAdded = addedNotesItemId === struct.id;

                  return (
                    <div
                      key={struct.id}
                      className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2.5">
                          <span className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                            {index + 1}
                          </span>
                          <div>
                            <h3 className="text-base sm:text-lg font-bold text-slate-900">
                              {struct.title}
                            </h3>
                          </div>
                        </div>

                        <span className="self-start sm:self-auto px-2.5 py-0.5 rounded text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
                          Paragraph {struct.paragraphRef}
                        </span>
                      </div>

                      {/* Structural Formula Pattern */}
                      <div className="bg-slate-900 text-slate-100 p-3 rounded-lg font-mono text-xs sm:text-sm mb-4 border border-slate-800">
                        <div className="text-[10px] uppercase font-bold text-blue-400 mb-1">
                          Grammatical Pattern / Formula
                        </div>
                        <div className="text-emerald-300 font-semibold">{struct.structurePattern}</div>
                      </div>

                      {/* Two Column comparison: Original vs Simplified */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                        <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
                          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                            Passage Example (Paragraph {struct.paragraphRef})
                          </div>
                          <p className="text-xs sm:text-sm text-slate-900 font-serif italic leading-relaxed">
                            "{struct.passageExample}"
                          </p>
                        </div>

                        <div className="p-3.5 bg-emerald-50/70 rounded-lg border border-emerald-200">
                          <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 mb-1">
                            Plain-English Paraphrase
                          </div>
                          <p className="text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed">
                            {struct.simplifiedParaphrase}
                          </p>
                        </div>
                      </div>

                      {/* IELTS Reading Function */}
                      <div className="p-4 bg-slate-100/70 rounded-lg border border-slate-200/80 mb-4">
                        <div className="text-xs font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5 text-blue-600" />
                          <span>IELTS Reading Function & Traps</span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                          {struct.ieltsReadingFunction}
                        </p>
                        <div className="mt-2 text-xs text-blue-700 font-medium flex items-center gap-1">
                          <ArrowRight className="w-3 h-3 text-blue-600 shrink-0" />
                          <span>Quick Reading Tip: {struct.practiceTip}</span>
                        </div>
                      </div>

                      {/* Add to notes */}
                      <div className="flex justify-end">
                        <button
                          onClick={() => handleAddStructureToNotes(struct)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-300 transition"
                        >
                          {isAdded ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Bookmark className="w-3.5 h-3.5" />}
                          <span>{isAdded ? 'Added to Notes!' : 'Save Structure to Notes'}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: SKILL ACTIVITIES & TASKS */}
          {activeTab === 'tasks' && (
            <div className="space-y-8">
              {/* Task 1: Paraphrase Decoding */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
                <div className="flex items-start justify-between gap-4 mb-4 pb-3 border-b border-slate-100">
                  <div>
                    <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-blue-100 text-blue-800">
                      Activity 1 of 3
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mt-1">
                      IELTS Paraphrase & Synonym Hunt
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                      IELTS questions never use the exact wording of headings or questions. Match each question prompt with its authentic phrasing from the passage.
                    </p>
                  </div>

                  <div className="bg-slate-100 px-3 py-2 rounded-lg text-center shrink-0 border border-slate-200">
                    <div className="text-xs text-slate-500 font-medium">Score</div>
                    <div className="text-lg font-black text-blue-600">
                      {correctParaphraseCount} / {CONSOLIDATION_PARAPHRASE_TASKS.length}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {CONSOLIDATION_PARAPHRASE_TASKS.map((task, idx) => {
                    const selectedOptId = selectedParaphraseAnswers[task.id];
                    const isChecked = showParaphraseResults[task.id];
                    const selectedOption = task.options.find((o) => o.id === selectedOptId);
                    const isCorrect = selectedOption?.isCorrect;

                    return (
                      <div
                        key={task.id}
                        className="p-4 rounded-xl border border-slate-200 bg-slate-50/60"
                      >
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                            Item {idx + 1} • {task.questionRef}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-200 text-slate-700">
                            Para {task.paragraphRef}
                          </span>
                        </div>

                        {/* Test Question / Heading Prompt */}
                        <div className="text-sm sm:text-base font-semibold text-slate-900 mb-3 bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
                          {task.questionOrHeading}
                        </div>

                        <div className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">
                          Select the authentic text excerpt that paraphrases this:
                        </div>

                        {/* Options */}
                        <div className="space-y-2 mb-3">
                          {task.options.map((opt) => {
                            const isSelected = selectedOptId === opt.id;
                            let btnClasses =
                              'w-full text-left p-3 rounded-lg border text-xs sm:text-sm font-medium transition flex items-start gap-2.5 ';

                            if (isChecked) {
                              if (opt.isCorrect) {
                                btnClasses += 'bg-emerald-50 border-emerald-300 text-emerald-950 font-semibold';
                              } else if (isSelected && !opt.isCorrect) {
                                btnClasses += 'bg-rose-50 border-rose-300 text-rose-950 line-through';
                              } else {
                                btnClasses += 'bg-white border-slate-200 text-slate-500 opacity-60';
                              }
                            } else {
                              btnClasses += isSelected
                                ? 'bg-blue-50 border-blue-500 text-blue-900 shadow-2xs'
                                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100/70';
                            }

                            return (
                              <button
                                key={opt.id}
                                disabled={isChecked}
                                onClick={() =>
                                  setSelectedParaphraseAnswers((prev) => ({
                                    ...prev,
                                    [task.id]: opt.id,
                                  }))
                                }
                                className={btnClasses}
                              >
                                <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                                  {opt.id.replace('opt-', '').toUpperCase()}
                                </span>
                                <span className="flex-1 font-serif italic">"{opt.text}"</span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Check Button & Explanation */}
                        {!isChecked ? (
                          <button
                            disabled={!selectedOptId}
                            onClick={() =>
                              setShowParaphraseResults((prev) => ({
                                ...prev,
                                [task.id]: true,
                              }))
                            }
                            className="px-4 py-1.5 rounded text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-40 disabled:cursor-not-allowed transition shadow-xs"
                          >
                            Check Paraphrase
                          </button>
                        ) : (
                          <div
                            className={`p-3.5 rounded-lg border text-xs sm:text-sm leading-relaxed ${
                              isCorrect
                                ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                                : 'bg-rose-50/80 border-rose-200 text-rose-950'
                            }`}
                          >
                            <div className="font-bold mb-1 flex items-center gap-1.5">
                              {isCorrect ? (
                                <>
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                  <span>Spot on! Paraphrase confirmed.</span>
                                </>
                              ) : (
                                <>
                                  <XCircle className="w-4 h-4 text-rose-600" />
                                  <span>Not quite. Review the IELTS connection below:</span>
                                </>
                              )}
                            </div>
                            <p className="text-slate-800">{task.explanation}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Task 2: Academic Collocations Fill-in */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
                <div className="flex items-start justify-between gap-4 mb-4 pb-3 border-b border-slate-100">
                  <div>
                    <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-emerald-100 text-emerald-800">
                      Activity 2 of 3
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mt-1">
                      Academic Collocations in Environmental Contexts
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                      Select the precise academic collocation that accurately completes each sentence derived from the reading passage.
                    </p>
                  </div>

                  <div className="bg-slate-100 px-3 py-2 rounded-lg text-center shrink-0 border border-slate-200">
                    <div className="text-xs text-slate-500 font-medium">Score</div>
                    <div className="text-lg font-black text-emerald-600">
                      {correctCollocationCount} / {CONSOLIDATION_COLLOCATION_QUIZ.length}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {CONSOLIDATION_COLLOCATION_QUIZ.map((quiz, idx) => {
                    const userAns = collocationAnswers[quiz.id];
                    const isChecked = collocationChecked[quiz.id];
                    const isCorrect = userAns === quiz.correctAnswer;

                    return (
                      <div
                        key={quiz.id}
                        className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                              Collocation {idx + 1}
                            </span>
                            {quiz.paragraphRef && (
                              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                                Para {quiz.paragraphRef}
                              </span>
                            )}
                          </div>

                          <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed mb-3">
                            {quiz.sentenceWithBlank}
                          </p>

                          {/* Options grid */}
                          <div className="grid grid-cols-2 gap-2 mb-3">
                            {quiz.options.map((opt) => {
                              const isSelected = userAns === opt;
                              let btnClass =
                                'px-2.5 py-1.5 text-xs font-semibold rounded border text-left transition ';

                              if (isChecked) {
                                if (opt === quiz.correctAnswer) {
                                  btnClass += 'bg-emerald-100 border-emerald-400 text-emerald-900';
                                } else if (isSelected && opt !== quiz.correctAnswer) {
                                  btnClass += 'bg-rose-100 border-rose-300 text-rose-900 line-through';
                                } else {
                                  btnClass += 'bg-white border-slate-200 text-slate-400 opacity-60';
                                }
                              } else {
                                btnClass += isSelected
                                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100';
                              }

                              return (
                                <button
                                  key={opt}
                                  disabled={isChecked}
                                  onClick={() =>
                                    setCollocationAnswers((prev) => ({
                                      ...prev,
                                      [quiz.id]: opt,
                                    }))
                                  }
                                  className={btnClass}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Button or Feedback */}
                        {!isChecked ? (
                          <button
                            disabled={!userAns}
                            onClick={() =>
                              setCollocationChecked((prev) => ({
                                ...prev,
                                [quiz.id]: true,
                              }))
                            }
                            className="w-full py-1.5 rounded text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-40 disabled:cursor-not-allowed transition"
                          >
                            Check Answer
                          </button>
                        ) : (
                          <div
                            className={`p-2.5 rounded text-xs leading-relaxed ${
                              isCorrect
                                ? 'bg-emerald-100/70 text-emerald-900 font-medium'
                                : 'bg-rose-100/70 text-rose-900 font-medium'
                            }`}
                          >
                            <span className="font-bold block mb-0.5">
                              {isCorrect ? '✓ Correct Collocation' : `✕ Correct: "${quiz.correctAnswer}"`}
                            </span>
                            {quiz.explanation}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Task 3: Discourse & Sentence Inversion Rebuilder */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
                <div className="mb-4 pb-3 border-b border-slate-100">
                  <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-purple-100 text-purple-800">
                    Activity 3 of 3
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">
                    Sentence Inversion & Discourse Structure Rebuilder
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                    Click chunks in logical order to assemble the complex academic sentences from the text. This builds your ability to rapidly parse complex clauses during timed reading.
                  </p>
                </div>

                <div className="space-y-6">
                  {CONSOLIDATION_SENTENCE_SCRAMBLE.map((scramble, idx) => {
                    const selectedChunks = userScrambleOrders[scramble.id] || [];
                    const result = scrambleResults[scramble.id];

                    return (
                      <div
                        key={scramble.id}
                        className="p-5 rounded-xl border border-slate-200 bg-slate-50/50"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-slate-700">
                            Sentence {idx + 1}: {scramble.title}
                          </span>
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                            Para {scramble.paragraphRef}
                          </span>
                        </div>

                        <p className="text-xs text-slate-600 mb-3 bg-white p-2.5 rounded border border-slate-200">
                          <span className="font-bold text-slate-800">Structural clue: </span>
                          {scramble.grammarNote}
                        </p>

                        {/* Selected Sequence Drop Zone */}
                        <div className="min-h-[50px] p-3 rounded-lg border-2 border-dashed border-slate-300 bg-white mb-3 flex flex-wrap items-center gap-2">
                          {selectedChunks.length === 0 ? (
                            <span className="text-xs text-slate-400 italic">
                              Click the phrase chips below in grammatical order to reconstruct the sentence...
                            </span>
                          ) : (
                            selectedChunks.map((chunk, cIdx) => (
                              <button
                                key={cIdx}
                                onClick={() => handleToggleScrambleChunk(scramble.id, chunk)}
                                className="px-3 py-1.5 rounded bg-blue-100 text-blue-900 text-xs font-semibold hover:bg-rose-100 hover:text-rose-800 transition flex items-center gap-1.5 border border-blue-200"
                                title="Click to remove"
                              >
                                <span>{chunk}</span>
                                <span className="text-blue-400 text-[10px]">✕</span>
                              </button>
                            ))
                          )}
                        </div>

                        {/* Available Chunks Pool (shuffled order) */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {scramble.chunks
                            .slice()
                            .reverse()
                            .map((chunk, cIdx) => {
                              const isUsed = selectedChunks.includes(chunk);

                              return (
                                <button
                                  key={cIdx}
                                  disabled={isUsed}
                                  onClick={() => handleToggleScrambleChunk(scramble.id, chunk)}
                                  className={`px-3 py-1.5 rounded text-xs font-medium border transition ${
                                    isUsed
                                      ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed opacity-50'
                                      : 'bg-white text-slate-800 border-slate-300 hover:border-blue-500 hover:bg-blue-50/50 shadow-2xs'
                                  }`}
                                >
                                  {chunk}
                                </button>
                              );
                            })}
                        </div>

                        {/* Controls & Result */}
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleCheckScramble(scramble)}
                            className="px-4 py-1.5 rounded text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition"
                          >
                            Verify Order
                          </button>

                          <button
                            onClick={() => handleResetScramble(scramble.id)}
                            className="px-3 py-1.5 rounded text-xs font-medium text-slate-600 hover:bg-slate-200 transition"
                          >
                            Reset
                          </button>

                          {result !== null && result !== undefined && (
                            <div className="flex items-center gap-1 text-xs font-bold">
                              {result ? (
                                <span className="text-emerald-700 flex items-center gap-1">
                                  <CheckCircle2 className="w-4 h-4" /> Perfect sentence construction!
                                </span>
                              ) : (
                                <span className="text-rose-600 flex items-center gap-1">
                                  <XCircle className="w-4 h-4" /> Sequence incorrect. Review the grammar clue above and try again.
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        {result && (
                          <div className="mt-3 p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-xs sm:text-sm text-emerald-950 italic font-serif">
                            "{scramble.fullSentence}"
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ARGUMENT FLOW & AUTHOR STANCE */}
          {activeTab === 'argument-flow' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
                <div className="max-w-3xl mb-6">
                  <h3 className="text-lg font-bold text-slate-900">
                    Deconstructing Historical Discourse & Argument Structure
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    Trace how the historical narrative develops systematically across the seven sections: from seventeenth-century frontier cordons and quarantine procedures, to Peter the Great's institutionalization of permanent quarantine barriers, the catastrophic 1771 Moscow plague outbreak, and subsequent administrative reforms.
                  </p>
                </div>

                {/* Horizontal Paragraph Stepper */}
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 mb-6">
                  {AUTHOR_ARGUMENT_FLOW.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedFlowPara(item.paragraph)}
                      className={`p-3 rounded-xl border text-center transition flex flex-col items-center gap-1 ${
                        selectedFlowPara === item.paragraph
                          ? 'bg-blue-600 text-white border-blue-600 shadow-md font-bold'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 font-medium'
                      }`}
                    >
                      <span className="text-base font-black">
                        Section {item.paragraph}
                      </span>
                      <span className="text-[10px] truncate max-w-[80px] opacity-80">
                        {item.topic}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Selected Paragraph Detail Card */}
                {(() => {
                  const flow = AUTHOR_ARGUMENT_FLOW.find((f) => f.paragraph === selectedFlowPara)!;
                  const paraObj = paragraphs.find((p) => p.id === selectedFlowPara);
                  const isHeadingRequired = flow.paragraph !== 'G';
                  const headingIndex = ['A', 'B', 'C', 'D', 'E', 'F'].indexOf(flow.paragraph);

                  return (
                    <div className="bg-slate-50/70 border border-slate-200 rounded-xl p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-200">
                        <div>
                          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                            Rhetorical Phase {selectedFlowPara} of 7
                          </span>
                          <h4 className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
                            Section {flow.paragraph}: {flow.topic}
                          </h4>
                        </div>

                        <span className="px-3 py-1 rounded bg-blue-100 text-blue-900 font-bold text-xs self-start md:self-auto">
                          {isHeadingRequired
                            ? `Heading Target: Q${14 + headingIndex}`
                            : 'No Heading Target (Conclusion Section)'}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Left: Rhetorical Analysis */}
                        <div className="space-y-4">
                          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs">
                            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                              Rhetorical Purpose in Argument
                            </div>
                            <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                              {flow.rhetoricalPurpose}
                            </p>
                          </div>

                          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs">
                            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                              Key Discourse Signals & Transition Phrases
                            </div>
                            <p className="text-xs sm:text-sm text-blue-700 font-mono font-medium">
                              {flow.discourseSignal}
                            </p>
                          </div>

                          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs">
                            <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 mb-1">
                              Author's Decisive Finding
                            </div>
                            <p className="text-xs sm:text-sm text-slate-900 font-semibold leading-relaxed">
                              {flow.keyConclusion}
                            </p>
                          </div>
                        </div>

                        {/* Right: Actual Passage Paragraph */}
                        <div className="bg-white p-5 rounded-lg border border-slate-200 flex flex-col justify-between">
                          <div>
                            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center justify-between">
                              <span>Full Passage Text (Paragraph {selectedFlowPara})</span>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-800 font-serif leading-relaxed italic">
                              "{paraObj?.text}"
                            </p>
                          </div>

                          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                            <span>Paragraph Length: {paraObj?.text.split(/\s+/).length} words</span>
                            {selectedFlowPara !== 'G' && (
                              <button
                                onClick={() => {
                                  const paras: ('A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G')[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
                                  const next = paras[paras.indexOf(selectedFlowPara) + 1];
                                  setSelectedFlowPara(next);
                                }}
                                className="text-blue-600 font-bold hover:underline flex items-center gap-1"
                              >
                                <span>Next Paragraph</span>
                                <ChevronRight className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
