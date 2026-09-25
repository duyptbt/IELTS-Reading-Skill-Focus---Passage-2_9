import React, { useState, useEffect } from 'react';
import {
  LanguageItem,
  GrammarStructureItem,
  ParaphraseTaskItem,
  CollocationQuizItem,
  SentenceScrambleItem,
  SentenceCompletionCaseStudy,
  Paragraph,
} from '../types';
import {
  CONSOLIDATION_VOCABULARY,
  CONSOLIDATION_GRAMMAR_STRUCTURES,
  CONSOLIDATION_PARAPHRASE_TASKS,
  CONSOLIDATION_COLLOCATION_QUIZ,
  CONSOLIDATION_SENTENCE_SCRAMBLE,
  SENTENCE_COMPLETION_INSIGHTS,
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
  Layers,
  Search,
  ArrowRight,
  Puzzle,
  Target,
  AlertTriangle,
  ShieldCheck,
  HelpCircle,
  ChevronRight,
  CheckSquare,
  Zap,
  BookMarked,
  Filter,
} from 'lucide-react';

interface ConsolidationPanelProps {
  paragraphs: Paragraph[];
  onAddNote: (noteSnippet: string) => void;
  onNavigateToPractice: () => void;
  onNavigateToTest: () => void;
}

type ConsolidationTab = 'vocabulary' | 'structures' | 'tasks' | 'sentence-completion';

export const ConsolidationPanel: React.FC<ConsolidationPanelProps> = ({
  paragraphs,
  onAddNote,
  onNavigateToPractice,
  onNavigateToTest,
}) => {
  // Bilingual state: 'en' or 'vi'
  const [lang, setLang] = useState<'en' | 'vi'>(() => {
    try {
      const saved = localStorage.getItem('ielts_consolidation_lang');
      return saved === 'vi' ? 'vi' : 'en';
    } catch {
      return 'en';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('ielts_consolidation_lang', lang);
    } catch {
      // ignore
    }
  }, [lang]);

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

  // Sentence Completion Masterclass State
  const [selectedCaseStudyQ, setSelectedCaseStudyQ] = useState<number>(24);
  const [masterclassSubSection, setMasterclassSubSection] = useState<'rules' | 'steps' | 'cases' | 'traps' | 'simulator'>('steps');

  // Interactive Sentence Completion Simulator State
  const [simQuestionNum, setSimQuestionNum] = useState<number>(24);
  const [simInput, setSimInput] = useState<string>('');
  const [simAuditResult, setSimAuditResult] = useState<{
    wordCount: number;
    wordCountValid: boolean;
    duplicateArticle: boolean;
    isExactMatch: boolean;
    feedbackMessage: string;
    feedbackMessageVi: string;
    status: 'correct' | 'warning' | 'incorrect';
  } | null>(null);

  // Handle Copy to clipboard
  const handleCopy = (item: LanguageItem) => {
    const text = `${item.term} (${item.partOfSpeech}) - ${item.bandLevel}\nDefinition: ${item.definition}${item.definitionVi ? `\nÝ nghĩa (VI): ${item.definitionVi}` : ''}\nPassage Quote (Para ${item.paragraphRef}): "${item.passageQuote}"\nCollocations: ${item.collocations.join('; ')}\nIELTS Tip: ${item.ieltsTip}`;
    navigator.clipboard.writeText(text);
    setCopiedItemId(item.id);
    setTimeout(() => setCopiedItemId(null), 2000);
  };

  // Handle Add to Notes
  const handleAddToNotes = (item: LanguageItem) => {
    const snippet = `[Vocabulary] ${item.term} (${item.partOfSpeech}) - ${item.bandLevel}\n• Definition (EN): ${item.definition}\n${item.definitionVi ? `• Định nghĩa (VI): ${item.definitionVi}\n` : ''}• In Passage (Para ${item.paragraphRef}): "${item.passageQuote}"\n• Key Collocations: ${item.collocations.join(', ')}\n• Reading Strategy: ${lang === 'vi' && item.ieltsTipVi ? item.ieltsTipVi : item.ieltsTip}\n\n`;
    onAddNote(snippet);
    setAddedNotesItemId(item.id);
    setTimeout(() => setAddedNotesItemId(null), 2000);
  };

  // Add Grammar Structure to Notes
  const handleAddStructureToNotes = (struct: GrammarStructureItem) => {
    const snippet = `[Structure] ${lang === 'vi' && struct.titleVi ? struct.titleVi : struct.title}\n• Pattern: ${struct.structurePattern}\n• Passage Example (Para ${struct.paragraphRef}): "${struct.passageExample}"\n• Simplified Meaning: ${lang === 'vi' && struct.simplifiedParaphraseVi ? struct.simplifiedParaphraseVi : struct.simplifiedParaphrase}\n• IELTS Reading Function: ${lang === 'vi' && struct.ieltsReadingFunctionVi ? struct.ieltsReadingFunctionVi : struct.ieltsReadingFunction}\n\n`;
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
      (item.definitionVi && item.definitionVi.toLowerCase().includes(vocabSearch.toLowerCase())) ||
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
    setScrambleResults((prev) => ({ ...prev, [scrambleId]: null }));
  };

  const handleCheckScramble = (task: SentenceScrambleItem) => {
    const userOrder = userScrambleOrders[task.id] || [];
    if (userOrder.length !== task.correctOrder.length) {
      alert(lang === 'vi' ? 'Vui lòng chọn đủ tất cả các thành phần câu trước khi kiểm tra!' : 'Please select all sentence parts before checking!');
      return;
    }
    const isCorrect = userOrder.every((chunk, idx) => chunk === task.correctOrder[idx]);
    setScrambleResults((prev) => ({ ...prev, [task.id]: isCorrect }));
  };

  const handleResetScramble = (scrambleId: string) => {
    setUserScrambleOrders((prev) => ({ ...prev, [scrambleId]: [] }));
    setScrambleResults((prev) => ({ ...prev, [scrambleId]: null }));
  };

  // Run audit in Simulator
  const handleAuditSimulator = () => {
    const trimmed = simInput.trim();
    if (!trimmed) {
      setSimAuditResult(null);
      return;
    }

    const words = trimmed.split(/\s+/).filter(Boolean);
    const wordCount = words.length;
    const lower = trimmed.toLowerCase();
    const startsWithArticle = lower.startsWith('a ') || lower.startsWith('an ') || lower.startsWith('the ');

    let isExact = false;
    let feedbackEn = '';
    let feedbackVi = '';
    let status: 'correct' | 'warning' | 'incorrect' = 'incorrect';

    if (simQuestionNum === 24) {
      // Expected: "cordon sanitaire"
      if (lower === 'cordon sanitaire') {
        isExact = true;
        status = 'correct';
        feedbackEn = 'Outstanding! Perfect 2-word match directly extracted from Section F without altering syntax.';
        feedbackVi = 'Xuất sắc! Cụm 2 từ chuẩn xác 100% trích xuất trực tiếp từ Đoạn F, không thừa thiếu mạo từ.';
      } else if (lower === 'a cordon sanitaire' || startsWithArticle) {
        status = 'warning';
        feedbackEn = 'Duplicate Article Alert: The prompt sentence already provides "create a _______". Writing "a cordon sanitaire" yields "create a a cordon sanitaire". Drop the leading "a"!';
        feedbackVi = 'Cảnh báo lặp mạo từ: Đề bài đã có sẵn từ "a" trước chỗ trống. Nếu bạn điền "a cordon sanitaire" sẽ bị lỗi thành "create a a cordon sanitaire". Hãy bỏ chữ "a"!';
      } else if (lower === 'cordon') {
        status = 'warning';
        feedbackEn = 'Partially accurate, but incomplete. The formal historical and medical term codified in the decree is the compound noun "cordon sanitaire".';
        feedbackVi = 'Đúng một phần nhưng chưa trọn vẹn. Thuật ngữ lịch sử và y tế chính thức được quy định trong sắc lệnh là cụm danh từ "cordon sanitaire".';
      } else if (wordCount > 2) {
        status = 'incorrect';
        feedbackEn = `Word limit violation: Your answer contains ${wordCount} words. The instruction allows NO MORE THAN TWO WORDS.`;
        feedbackVi = `Vi phạm giới hạn số từ: Câu trả lời có ${wordCount} từ. Đề bài chỉ cho phép TỐI ĐA HAI TỪ.`;
      } else {
        status = 'incorrect';
        feedbackEn = `Incorrect keyword. Locate Section F where "an instruction to provincial governors" mentions isolating the village and establishing a "cordon sanitaire".`;
        feedbackVi = `Chưa đúng từ khóa. Hãy tìm ở Đoạn F câu có "an instruction to provincial governors" nói về việc cách ly ngôi làng và thiết lập một "cordon sanitaire".`;
      }
    } else if (simQuestionNum === 25) {
      // Expected: "farm animals" or "cattle"
      if (lower === 'farm animals' || lower === 'cattle') {
        isExact = true;
        status = 'correct';
        feedbackEn = `Spot on! "${lower}" is verbatim from "...including farm animals and cattle" and fits "...along with any ${lower}".`;
        feedbackVi = `Chính xác tuyệt đối! "${lower}" là từ nguyên văn trong bài "...including farm animals and cattle" và hòa hợp ngữ pháp với cụm "...along with any ${lower}".`;
      } else if (lower === 'farm animals and cattle') {
        status = 'warning';
        feedbackEn = 'Word limit exceeded! "farm animals and cattle" is 4 words. The instruction permits NO MORE THAN TWO WORDS. Use "farm animals" (2 words) or "cattle" (1 word).';
        feedbackVi = 'Vượt quá giới hạn số từ! Cụm "farm animals and cattle" gồm 4 từ. Đề bài chỉ cho phép TỐI ĐA 2 TỪ. Bạn phải chọn "farm animals" (2 từ) hoặc "cattle" (1 từ).';
      } else if (lower === 'personal property') {
        status = 'warning';
        feedbackEn = 'Misidentified category: "personal property" is the broad category. The prompt sentence tests what was included along with it ("including farm animals and cattle").';
        feedbackVi = 'Nhầm danh mục: "personal property" (tài sản cá nhân) là danh mục lớn bao quát. Đề bài đang hỏi đối tượng cụ thể đi kèm ("including farm animals and cattle").';
      } else if (lower === 'farm animal') {
        status = 'warning';
        feedbackEn = 'Singular form mismatch: The passage uses the plural "farm animals", and "any" in this context takes the plural.';
        feedbackVi = 'Sai dạng số ít/số nhiều: Bài đọc dùng số nhiều "farm animals", và từ hạn định "any" ở đây đi với danh từ số nhiều.';
      } else {
        status = 'incorrect';
        feedbackEn = 'Incorrect keyword. Check the sentence in Section F regarding what was to be burned along with personal property.';
        feedbackVi = 'Chưa đúng từ khóa. Xem lại câu ở Đoạn F nói về những thứ bị tiêu hủy cùng với tài sản cá nhân.';
      }
    } else if (simQuestionNum === 26) {
      // Expected: "fire"
      if (lower === 'fire') {
        isExact = true;
        status = 'correct';
        feedbackEn = 'Brilliant! "fire" fits the prepositional structure "...heated above a fire before being copied".';
        feedbackVi = 'Chính xác! "fire" khớp 100% với cấu trúc giới từ "...heated above a fire before being copied".';
      } else if (lower === 'a fire' || startsWithArticle) {
        status = 'warning';
        feedbackEn = 'Duplicate Article Alert: The prompt already includes "...heated above a _______". Writing "a fire" creates "...above a a fire". Remove "a"!';
        feedbackVi = 'Cảnh báo lặp mạo từ: Đề bài đã có sẵn "...heated above a _______". Nếu điền "a fire" sẽ bị lặp thành "...above a a fire". Hãy xóa chữ "a"!';
      } else if (lower === 'flame' || lower === 'flames' || lower === 'heat') {
        status = 'warning';
        feedbackEn = 'Paraphrase trap: You must write words directly FROM THE TEXT. The passage says "heated above a fire", not flames or heat.';
        feedbackVi = 'Bẫy paraphrase: IELTS Reading bắt buộc lấy từ NGUYÊN VĂN TRONG BÀI. Bài đọc dùng "fire", không được tự đổi thành flames hay heat.';
      } else {
        status = 'incorrect';
        feedbackEn = 'Incorrect keyword. In Section F, look for what letters brought by couriers were held above before being copied.';
        feedbackVi = 'Chưa đúng từ khóa. Trong Đoạn F, tìm xem thư từ do giao liên mang đến được hơ trên cái gì trước khi sao chép.';
      }
    }

    setSimAuditResult({
      wordCount,
      wordCountValid: wordCount <= 2,
      duplicateArticle: startsWithArticle,
      isExactMatch: isExact,
      feedbackMessage: feedbackEn,
      feedbackMessageVi: feedbackVi,
      status,
    });
  };

  return (
    <div className="flex-1 h-full min-h-0 flex flex-col bg-slate-100 overflow-hidden font-sans">
      {/* Top Banner & Tab Navigation */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-8 py-4 shrink-0 shadow-xs">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold text-xs border border-amber-300">
                <Sparkles className="w-3 h-3 text-amber-600" />
                <span>{lang === 'vi' ? 'Đã Mở Khóa Ôn Tập' : 'Consolidation Unlocked'}</span>
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Passage 2: {PASSAGE_TITLE}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
              {lang === 'vi'
                ? 'Củng Cố Ngôn Ngữ & Chiến Lược Đọc IELTS'
                : 'Language Input & Reading Skill Consolidation'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              {lang === 'vi'
                ? 'Ôn luyện từ vựng Band cao, giải mã cấu trúc câu học thuật và nắm vững tuyệt chiêu làm dạng Hoàn Thành Câu (Sentence Completion).'
                : 'Review high-yield IELTS vocabulary, academic structures, and master Sentence Completion strategies to maximize your Band score.'}
            </p>
          </div>

          {/* Quick Actions & Language Switcher */}
          <div className="flex items-center gap-2.5 flex-wrap self-start md:self-auto">
            {/* Language Switcher */}
            <div className="flex items-center rounded-lg bg-slate-100 p-1 border border-slate-300 shadow-2xs">
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 rounded text-xs font-bold transition flex items-center gap-1.5 ${
                  lang === 'en'
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Switch to English"
              >
                <span>🇬🇧</span>
                <span>English</span>
              </button>
              <button
                type="button"
                onClick={() => setLang('vi')}
                className={`px-2.5 py-1 rounded text-xs font-bold transition flex items-center gap-1.5 ${
                  lang === 'vi'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Chuyển sang Tiếng Việt"
              >
                <span>🇻🇳</span>
                <span>Tiếng Việt</span>
              </button>
            </div>

            <button
              onClick={onNavigateToPractice}
              className="px-3 py-1.5 rounded text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{lang === 'vi' ? 'Về Luyện Tập' : 'Practice Mode'}</span>
            </button>
            <button
              onClick={onNavigateToTest}
              className="px-3 py-1.5 rounded text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-xs transition flex items-center gap-1.5"
            >
              <span>{lang === 'vi' ? 'Vào Thi Thử (20m)' : 'Test Mode (20m)'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-6xl mx-auto flex items-center gap-2 mt-4 pt-2 border-t border-slate-100 overflow-x-auto">
          <button
            id="tab-btn-vocab"
            onClick={() => setActiveTab('vocabulary')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition shrink-0 ${
              activeTab === 'vocabulary'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>
              {lang === 'vi'
                ? `Từ Vựng Trọng Tâm (${CONSOLIDATION_VOCABULARY.length})`
                : `Key Words & Phrases (${CONSOLIDATION_VOCABULARY.length})`}
            </span>
          </button>

          <button
            id="tab-btn-structures"
            onClick={() => setActiveTab('structures')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition shrink-0 ${
              activeTab === 'structures'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>
              {lang === 'vi'
                ? `Cấu Trúc Học Thuật (${CONSOLIDATION_GRAMMAR_STRUCTURES.length})`
                : `Expressions & Structures (${CONSOLIDATION_GRAMMAR_STRUCTURES.length})`}
            </span>
          </button>

          <button
            id="tab-btn-tasks"
            onClick={() => setActiveTab('tasks')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition shrink-0 ${
              activeTab === 'tasks'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Puzzle className="w-4 h-4" />
            <span>
              {lang === 'vi'
                ? 'Luyện Tập Kỹ Năng (4 Bài)'
                : 'Skill Tasks & Paraphrase (4 Tasks)'}
            </span>
          </button>

          <button
            id="tab-btn-sentence-completion"
            onClick={() => setActiveTab('sentence-completion')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition shrink-0 ${
              activeTab === 'sentence-completion'
                ? 'bg-emerald-600 text-white shadow-xs font-bold'
                : 'text-emerald-700 hover:text-emerald-900 hover:bg-emerald-50 bg-emerald-50/60 border border-emerald-200'
            }`}
          >
            <Target className="w-4 h-4 text-emerald-500" />
            <span>
              {lang === 'vi'
                ? 'Chiến Lược Hoàn Thành Câu (Q24–26)'
                : 'Sentence Completion Masterclass'}
            </span>
            <span className="px-1.5 py-0.2 rounded text-[10px] bg-emerald-200 text-emerald-900 font-extrabold uppercase">
              Deep Insight
            </span>
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
                    placeholder={
                      lang === 'vi'
                        ? 'Tìm từ vựng, định nghĩa hoặc collocation...'
                        : 'Search term, definition, or collocation...'
                    }
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                  />
                </div>

                {/* Category Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                  {[
                    { id: 'all', label: lang === 'vi' ? 'Tất cả' : 'All Items' },
                    { id: 'academic-vocab', label: lang === 'vi' ? 'Từ vựng học thuật' : 'Academic Vocab' },
                    { id: 'collocation', label: 'Collocations' },
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
                              <span className="text-xs text-slate-500 italic">
                                ({item.partOfSpeech})
                              </span>
                              {item.phonetic && (
                                <span className="text-xs text-slate-400 font-mono">
                                  {item.phonetic}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                              {item.bandLevel}
                            </span>
                            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                              Para {item.paragraphRef}
                            </span>
                          </div>
                        </div>

                        {/* Definitions */}
                        <div className="space-y-1.5 mb-3">
                          <p className="text-xs sm:text-sm text-slate-700 font-medium">
                            <span className="font-semibold text-slate-900">EN: </span>
                            {item.definition}
                          </p>
                          {item.definitionVi && (
                            <p className="text-xs sm:text-sm text-blue-900 bg-blue-50/70 p-2 rounded border border-blue-100 font-medium">
                              <span className="font-semibold text-blue-950">VI: </span>
                              {item.definitionVi}
                            </p>
                          )}
                        </div>

                        {/* Passage Quote */}
                        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 mb-3 text-xs text-slate-600 italic font-serif">
                          "{item.passageQuote}"
                        </div>

                        {/* Collocations */}
                        <div className="mb-3">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                            {lang === 'vi' ? 'Cụm từ hay gặp (Collocations)' : 'Key Collocations'}
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {item.collocations.map((colloc, cIdx) => (
                              <span
                                key={cIdx}
                                className="px-2 py-0.5 rounded text-xs bg-slate-100 text-slate-800 font-mono font-medium border border-slate-200"
                              >
                                {colloc}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* IELTS Reading Tip */}
                        <div className="p-3 rounded-lg bg-amber-50/70 border border-amber-200 mb-4 text-xs text-amber-950">
                          <div className="flex items-center gap-1.5 font-bold text-amber-900 mb-0.5">
                            <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                            <span>{lang === 'vi' ? 'Chiến thuật đọc IELTS' : 'IELTS Reading Strategy'}</span>
                          </div>
                          <p className="leading-relaxed">
                            {lang === 'vi' && item.ieltsTipVi ? item.ieltsTipVi : item.ieltsTip}
                          </p>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                        <button
                          onClick={() => handleCopy(item)}
                          className="flex-1 py-1.5 rounded text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition flex items-center justify-center gap-1.5"
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-700">{lang === 'vi' ? 'Đã sao chép' : 'Copied!'}</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-slate-500" />
                              <span>{lang === 'vi' ? 'Sao chép' : 'Copy'}</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => handleAddToNotes(item)}
                          className="flex-1 py-1.5 rounded text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition flex items-center justify-center gap-1.5"
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-blue-700" />
                              <span>{lang === 'vi' ? 'Đã thêm vào ghi chú' : 'Added to Notes!'}</span>
                            </>
                          ) : (
                            <>
                              <BookMarked className="w-3.5 h-3.5 text-blue-600" />
                              <span>{lang === 'vi' ? 'Lưu ghi chú' : 'Add to Notes'}</span>
                            </>
                          )}
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
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">
                  {lang === 'vi'
                    ? 'Giải Mã Các Cấu Trúc Học Thuật Trọng Điểm'
                    : 'Deconstructing High-Yield Academic Grammar & Discourse'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mb-6">
                  {lang === 'vi'
                    ? 'Các cấu trúc ngữ pháp phức tạp này thường được người ra đề dùng để tạo bẫy câu hỏi hoặc định hình ý tưởng cốt lõi của đoạn văn.'
                    : 'These sentence patterns govern the logical flow of historical and expository academic passages in IELTS Reading.'}
                </p>

                <div className="grid grid-cols-1 gap-6">
                  {CONSOLIDATION_GRAMMAR_STRUCTURES.map((struct) => {
                    const isAdded = addedNotesItemId === struct.id;

                    return (
                      <div
                        key={struct.id}
                        className="bg-slate-50/70 border border-slate-200 rounded-xl p-5 hover:border-slate-300 transition"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                          <h4 className="text-base font-bold text-slate-900">
                            {lang === 'vi' && struct.titleVi ? struct.titleVi : struct.title}
                          </h4>
                          <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-blue-100 text-blue-800 self-start sm:self-auto">
                            Para {struct.paragraphRef}
                          </span>
                        </div>

                        {/* Pattern formula */}
                        <div className="p-3 bg-white rounded-lg border border-slate-200 mb-3 font-mono text-xs sm:text-sm text-blue-700 font-semibold">
                          {struct.structurePattern}
                        </div>

                        {/* Passage Example */}
                        <div className="mb-3 text-xs sm:text-sm text-slate-700 italic font-serif bg-slate-100/70 p-3 rounded border-l-4 border-blue-500">
                          "{struct.passageExample}"
                        </div>

                        {/* Simplified Meaning */}
                        <div className="mb-3 text-xs sm:text-sm text-slate-800">
                          <span className="font-bold text-slate-900">
                            {lang === 'vi' ? 'Ý nghĩa rút gọn: ' : 'Simplified Meaning: '}
                          </span>
                          <span>
                            {lang === 'vi' && struct.simplifiedParaphraseVi
                              ? struct.simplifiedParaphraseVi
                              : struct.simplifiedParaphrase}
                          </span>
                        </div>

                        {/* Reading Function */}
                        <div className="mb-3 text-xs sm:text-sm text-slate-700">
                          <span className="font-bold text-slate-900">
                            {lang === 'vi' ? 'Chức năng trong bài đọc IELTS: ' : 'IELTS Reading Function: '}
                          </span>
                          <span>
                            {lang === 'vi' && struct.ieltsReadingFunctionVi
                              ? struct.ieltsReadingFunctionVi
                              : struct.ieltsReadingFunction}
                          </span>
                        </div>

                        {/* Practice Tip */}
                        <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-950 flex items-start gap-2 mb-3">
                          <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-amber-900">
                              {lang === 'vi' ? 'Mẹo làm bài: ' : 'Test Taker Tip: '}
                            </span>
                            <span>
                              {lang === 'vi' && struct.practiceTipVi
                                ? struct.practiceTipVi
                                : struct.practiceTip}
                            </span>
                          </div>
                        </div>

                        <div className="flex justify-end pt-2">
                          <button
                            onClick={() => handleAddStructureToNotes(struct)}
                            className="px-3 py-1.5 rounded text-xs font-semibold text-blue-700 bg-white hover:bg-blue-50 border border-blue-200 transition flex items-center gap-1.5"
                          >
                            {isAdded ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-blue-700" />
                                <span>{lang === 'vi' ? 'Đã lưu ghi chú' : 'Saved to Notes!'}</span>
                              </>
                            ) : (
                              <>
                                <BookMarked className="w-3.5 h-3.5 text-blue-600" />
                                <span>{lang === 'vi' ? 'Lưu cấu trúc vào ghi chú' : 'Save Structure to Notes'}</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SKILL ACTIVITIES & TASKS */}
          {activeTab === 'tasks' && (
            <div className="space-y-8">
              {/* Task 1: Paraphrase Decoding Challenge */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      {lang === 'vi' ? 'Nhiệm Vụ 1: Giải Mã Paraphrase' : 'Activity 1: Paraphrase Decoding Challenge'}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600">
                      {lang === 'vi'
                        ? 'Chọn phương án diễn đạt lại chuẩn xác nhất cho từng tiêu đề hoặc câu hỏi trong bài thi.'
                        : 'Select the optimal paraphrase that maps precisely to the original passage text.'}
                    </p>
                  </div>
                  <div className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-200 self-start sm:self-auto">
                    {lang === 'vi' ? 'Điểm: ' : 'Score: '} {correctParaphraseCount} / {completedParaphraseCount} {lang === 'vi' ? 'hoàn thành' : 'completed'}
                  </div>
                </div>

                <div className="space-y-6">
                  {CONSOLIDATION_PARAPHRASE_TASKS.map((task, idx) => {
                    const selectedOptId = selectedParaphraseAnswers[task.id];
                    const isChecked = showParaphraseResults[task.id];

                    return (
                      <div
                        key={task.id}
                        className="p-5 rounded-xl border border-slate-200 bg-slate-50/50"
                      >
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-xs font-bold text-blue-700">
                            {task.sourceType} • {task.questionRef}
                          </span>
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                            Para {task.paragraphRef}
                          </span>
                        </div>

                        <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-2">
                          {lang === 'vi' && task.questionOrHeadingVi ? task.questionOrHeadingVi : task.questionOrHeading}
                        </h4>

                        <div className="p-3 bg-white rounded-lg border border-slate-200 mb-4 text-xs text-slate-600 italic font-serif">
                          "{task.passageOriginal}"
                        </div>

                        {/* Options */}
                        <div className="space-y-2 mb-4">
                          {task.options.map((opt) => {
                            const isSelected = selectedOptId === opt.id;
                            let btnStyle = 'bg-white border-slate-200 text-slate-700 hover:border-blue-400';

                            if (isSelected) {
                              btnStyle = 'bg-blue-50 border-blue-500 text-blue-900 font-semibold';
                            }
                            if (isChecked) {
                              if (opt.isCorrect) {
                                btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold';
                              } else if (isSelected && !opt.isCorrect) {
                                btnStyle = 'bg-rose-50 border-rose-400 text-rose-900';
                              }
                            }

                            return (
                              <button
                                key={opt.id}
                                disabled={isChecked}
                                onClick={() => {
                                  setSelectedParaphraseAnswers((prev) => ({
                                    ...prev,
                                    [task.id]: opt.id,
                                  }));
                                }}
                                className={`w-full p-3 rounded-lg border text-left text-xs sm:text-sm transition flex items-start gap-2.5 ${btnStyle}`}
                              >
                                <span className="font-bold shrink-0 mt-0.5">
                                  {isChecked && opt.isCorrect ? '✓' : isChecked && isSelected && !opt.isCorrect ? '✕' : '•'}
                                </span>
                                <span>{lang === 'vi' && opt.textVi ? opt.textVi : opt.text}</span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Check Controls */}
                        {!isChecked ? (
                          <button
                            disabled={!selectedOptId}
                            onClick={() => {
                              setShowParaphraseResults((prev) => ({ ...prev, [task.id]: true }));
                            }}
                            className="px-4 py-1.5 rounded text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 transition"
                          >
                            {lang === 'vi' ? 'Kiểm Tra Đáp Án' : 'Verify Paraphrase'}
                          </button>
                        ) : (
                          <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-700">
                            <span className="font-bold text-slate-900">
                              {lang === 'vi' ? 'Giải thích: ' : 'Explanation: '}
                            </span>
                            <span>{lang === 'vi' && task.explanationVi ? task.explanationVi : task.explanation}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Task 2: Academic Collocations Quiz */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      {lang === 'vi' ? 'Nhiệm Vụ 2: Điền Cụm Từ Học Thuật (Collocations)' : 'Activity 2: Collocations Mastery Drill'}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600">
                      {lang === 'vi'
                        ? 'Chọn từ đúng để hoàn thành các cụm kết hợp từ cố định xuất hiện trong bài.'
                        : 'Select the single lexical item that creates the authentic academic collocation.'}
                    </p>
                  </div>
                  <div className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-200 self-start sm:self-auto">
                    {lang === 'vi' ? 'Điểm: ' : 'Score: '} {correctCollocationCount} / {completedCollocationCount}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {CONSOLIDATION_COLLOCATION_QUIZ.map((quiz, idx) => {
                    const isChecked = collocationChecked[quiz.id];
                    const selected = collocationAnswers[quiz.id];
                    const isCorrect = selected === quiz.correctAnswer;

                    return (
                      <div
                        key={quiz.id}
                        className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-slate-700">
                              {lang === 'vi' ? `Câu ${idx + 1}` : `Item ${idx + 1}`}
                            </span>
                            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                              Para {quiz.paragraphRef}
                            </span>
                          </div>

                          <p className="text-xs sm:text-sm text-slate-900 font-medium mb-3">
                            {lang === 'vi' && quiz.sentenceWithBlankVi ? quiz.sentenceWithBlankVi : quiz.sentenceWithBlank}
                          </p>

                          <div className="grid grid-cols-2 gap-2 mb-3">
                            {quiz.options.map((opt) => {
                              const isThisSelected = selected === opt;
                              let btnCls = 'bg-white border-slate-200 text-slate-700 hover:border-blue-400';

                              if (isThisSelected) {
                                btnCls = 'bg-blue-100 border-blue-500 text-blue-900 font-bold';
                              }
                              if (isChecked) {
                                if (opt === quiz.correctAnswer) {
                                  btnCls = 'bg-emerald-100 border-emerald-500 text-emerald-900 font-bold';
                                } else if (isThisSelected && opt !== quiz.correctAnswer) {
                                  btnCls = 'bg-rose-100 border-rose-400 text-rose-900';
                                }
                              }

                              return (
                                <button
                                  key={opt}
                                  disabled={isChecked}
                                  onClick={() => {
                                    setCollocationAnswers((prev) => ({
                                      ...prev,
                                      [quiz.id]: opt,
                                    }));
                                  }}
                                  className={`p-2 rounded text-xs border font-medium transition ${btnCls}`}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {!isChecked ? (
                          <button
                            disabled={!selected}
                            onClick={() => {
                              setCollocationChecked((prev) => ({ ...prev, [quiz.id]: true }));
                            }}
                            className="w-full py-1.5 rounded text-xs font-bold bg-slate-800 hover:bg-slate-900 text-white disabled:opacity-50 transition"
                          >
                            {lang === 'vi' ? 'Kiểm Tra' : 'Verify'}
                          </button>
                        ) : (
                          <div className="p-2.5 rounded bg-white border border-slate-200 text-xs">
                            <span className={isCorrect ? 'text-emerald-700 font-bold' : 'text-rose-600 font-bold'}>
                              {isCorrect
                                ? (lang === 'vi' ? '✓ Chính xác! ' : '✓ Correct! ')
                                : (lang === 'vi' ? `✕ Chưa đúng (Đáp án: ${quiz.correctAnswer}). ` : `✕ Incorrect (Target: ${quiz.correctAnswer}). `)}
                            </span>
                            <span className="text-slate-600">
                              {lang === 'vi' && quiz.explanationVi ? quiz.explanationVi : quiz.explanation}
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Task 3: Sentence Scramble Constructor */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
                <div className="mb-4 pb-3 border-b border-slate-100">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    {lang === 'vi' ? 'Nhiệm Vụ 3: Sắp Xếp Trật Tự Câu Học Thuật' : 'Activity 3: Academic Sentence Constructor'}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600">
                    {lang === 'vi'
                      ? 'Bấm chọn các cụm từ theo đúng trật tự ngữ pháp để ghép thành câu hoàn chỉnh trong bài đọc.'
                      : 'Reconstruct the complex sentences from the passage by clicking the phrase chunks in grammatical sequence.'}
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
                            {lang === 'vi'
                              ? `Câu ${idx + 1}: ${scramble.titleVi || scramble.title}`
                              : `Sentence ${idx + 1}: ${scramble.title}`}
                          </span>
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                            Para {scramble.paragraphRef}
                          </span>
                        </div>

                        <p className="text-xs text-slate-600 mb-3 bg-white p-2.5 rounded border border-slate-200">
                          <span className="font-bold text-slate-800">
                            {lang === 'vi' ? 'Manh mối ngữ pháp: ' : 'Structural clue: '}
                          </span>
                          {lang === 'vi' && scramble.grammarNoteVi ? scramble.grammarNoteVi : scramble.grammarNote}
                        </p>

                        {/* Selected Sequence Drop Zone */}
                        <div className="min-h-[50px] p-3 rounded-lg border-2 border-dashed border-slate-300 bg-white mb-3 flex flex-wrap items-center gap-2">
                          {selectedChunks.length === 0 ? (
                            <span className="text-xs text-slate-400 italic">
                              {lang === 'vi'
                                ? 'Bấm vào các mảnh câu bên dưới theo thứ tự ngữ pháp để ghép câu...'
                                : 'Click the phrase chips below in grammatical order to reconstruct the sentence...'}
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
                            {lang === 'vi' ? 'Kiểm Tra Trật Tự' : 'Verify Order'}
                          </button>

                          <button
                            onClick={() => handleResetScramble(scramble.id)}
                            className="px-3 py-1.5 rounded text-xs font-medium text-slate-600 hover:bg-slate-200 transition"
                          >
                            {lang === 'vi' ? 'Làm lại' : 'Reset'}
                          </button>

                          {result !== null && result !== undefined && (
                            <div className="flex items-center gap-1 text-xs font-bold">
                              {result ? (
                                <span className="text-emerald-700 flex items-center gap-1">
                                  <CheckCircle2 className="w-4 h-4" />
                                  {lang === 'vi' ? 'Chính xác hoàn hảo!' : 'Perfect sentence construction!'}
                                </span>
                              ) : (
                                <span className="text-rose-600 flex items-center gap-1">
                                  <XCircle className="w-4 h-4" />
                                  {lang === 'vi' ? 'Thứ tự chưa đúng, hãy thử lại.' : 'Sequence incorrect. Try again.'}
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        {result && (
                          <div className="mt-3 p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-xs sm:text-sm text-emerald-950 italic font-serif">
                            "{scramble.fullSentence}"
                            {lang === 'vi' && scramble.fullSentenceVi && (
                              <div className="text-xs text-emerald-800 not-italic font-sans mt-1">
                                ➔ {scramble.fullSentenceVi}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SENTENCE COMPLETION MASTERCLASS (Replacing Argument Flow & Author Stance) */}
          {activeTab === 'sentence-completion' && (
            <div className="space-y-6">
              {/* Masterclass Hero Header */}
              <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-md">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="max-w-3xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-400/30 mb-2">
                      <Target className="w-3.5 h-3.5" />
                      <span>{lang === 'vi' ? 'Chiến Thuật Điểm Tuyệt Đối IELTS Reading' : 'IELTS Reading Band 8.5+ Strategy'}</span>
                    </div>
                    <h3 className="text-xl sm:text-3xl font-extrabold tracking-tight">
                      {lang === 'vi'
                        ? 'Chiến Lược Hoàn Thành Câu (Sentence Completion) Chuyên Sâu'
                        : 'Sentence Completion Masterclass & Execution Strategy'}
                    </h3>
                    <p className="text-xs sm:text-sm text-emerald-100/90 mt-2 leading-relaxed">
                      {lang === 'vi'
                        ? 'Giải mã toàn diện dạng bài Hoàn thành câu (Questions 24–26): từ kỹ thuật dự đoán ngữ pháp, phân định từ khóa mỏ neo, so khớp cú pháp đoạn văn đến các bẫy trừ điểm kinh điển.'
                        : 'Exhaustive strategic blueprint for IELTS Sentence Completion: grammatical forecasting, anchor keyword demarcation, syntactic alignment, and trap avoidance tailored to Questions 24–26.'}
                    </p>
                  </div>

                  {/* Sub-nav buttons */}
                  <div className="flex flex-wrap md:flex-col gap-1.5 shrink-0">
                    {[
                      { id: 'steps', labelEn: '4-Step Strategy', labelVi: 'Quy Trình 4 Bước' },
                      { id: 'cases', labelEn: 'Q24–26 Case Studies', labelVi: 'Phân Tích Q24–26' },
                      { id: 'rules', labelEn: '4 Golden Rules', labelVi: '4 Nguyên Tắc Vàng' },
                      { id: 'traps', labelEn: 'Top 5 Traps & Fixes', labelVi: '5 Bẫy Kinh Điển' },
                      { id: 'simulator', labelEn: 'Live Audit Simulator', labelVi: 'Thực Hành & Soát Lỗi' },
                    ].map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => setMasterclassSubSection(sub.id as any)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition text-left ${
                          masterclassSubSection === sub.id
                            ? 'bg-emerald-400 text-slate-950 shadow-sm'
                            : 'bg-white/10 text-emerald-100 hover:bg-white/20'
                        }`}
                      >
                        {lang === 'vi' ? sub.labelVi : sub.labelEn}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* SUB-SECTION 1: THE 4-STEP STRATEGIC EXECUTION MODEL */}
              {masterclassSubSection === 'steps' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                      <div>
                        <h4 className="text-lg font-bold text-slate-900">
                          {lang === 'vi'
                            ? 'Quy Trình 4 Bước Chuẩn Band 8.5+ Cho Dạng Hoàn Thành Câu'
                            : 'The 4-Step Band 8.5+ Execution Framework'}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                          {lang === 'vi'
                            ? 'Làm theo đúng 4 bước có hệ thống này để tìm ra đáp án đúng trong vòng chưa đầy 45 giây cho mỗi câu.'
                            : 'Follow this systematic execution protocol to reliably pinpoint verbatim answers in under 45 seconds.'}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {SENTENCE_COMPLETION_INSIGHTS.fourStepStrategy.map((step) => (
                        <div
                          key={step.step}
                          className="p-5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-emerald-400 transition-all flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="w-7 h-7 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center">
                                {step.step}
                              </span>
                              <h5 className="text-sm sm:text-base font-bold text-slate-900">
                                {lang === 'vi' ? step.titleVi : step.title}
                              </h5>
                            </div>

                            <p className="text-xs sm:text-sm font-semibold text-emerald-800 bg-emerald-50/70 p-2 rounded border border-emerald-100 mb-3">
                              {lang === 'vi' ? step.summaryVi : step.summary}
                            </p>

                            <ul className="space-y-1.5 mb-3 text-xs text-slate-700">
                              {(lang === 'vi' ? step.detailsVi : step.details).map((detail, dIdx) => (
                                <li key={dIdx} className="flex items-start gap-2">
                                  <ChevronRight className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                  <span>{detail}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-1.5">
                            <Zap className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                            <div>
                              <span className="font-bold">Pro Tip: </span>
                              <span>{lang === 'vi' ? step.proTipVi : step.proTip}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* SUB-SECTION 2: DEEP DIVE CASE STUDIES (QUESTIONS 24, 25, 26) */}
              {masterclassSubSection === 'cases' && (
                <div className="space-y-6">
                  {/* Selector Pills */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {SENTENCE_COMPLETION_INSIGHTS.caseStudies.map((cs) => (
                      <button
                        key={cs.questionNumber}
                        onClick={() => setSelectedCaseStudyQ(cs.questionNumber)}
                        className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
                          selectedCaseStudyQ === cs.questionNumber
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <span>Question {cs.questionNumber}</span>
                        <span className="text-[11px] opacity-80 font-mono">({cs.targetAnswer})</span>
                      </button>
                    ))}
                  </div>

                  {/* Active Case Study Detail */}
                  {(() => {
                    const cs = SENTENCE_COMPLETION_INSIGHTS.caseStudies.find(
                      (c) => c.questionNumber === selectedCaseStudyQ
                    )!;

                    return (
                      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
                        {/* Header Banner */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                          <div>
                            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                              Section {cs.paragraphRef} • Case Study #{cs.questionNumber}
                            </span>
                            <h4 className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
                              {lang === 'vi'
                                ? `Phân Tích Chi Tiết Câu ${cs.questionNumber}`
                                : `Comprehensive Breakdown: Question ${cs.questionNumber}`}
                            </h4>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="px-3 py-1 rounded bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300">
                              {cs.wordCountLimit}
                            </span>
                            <span className="px-3 py-1 rounded bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-300">
                              Answer: "{cs.targetAnswer}"
                            </span>
                          </div>
                        </div>

                        {/* Question Prompt & Expected Grammar */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                              {lang === 'vi' ? 'Câu Hỏi Trong Đề Bài' : 'Test Prompt Sentence'}
                            </span>
                            <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-relaxed mb-2">
                              "{cs.questionPrompt}"
                            </p>
                            {lang === 'vi' && (
                              <p className="text-xs text-blue-900 bg-blue-50/80 p-2 rounded border border-blue-100">
                                ➔ {cs.questionPromptVi}
                              </p>
                            )}
                          </div>

                          <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block mb-1">
                              {lang === 'vi' ? 'Dự Đoán Ngữ Pháp Chỗ Trống' : 'Grammatical Forecast (Before Scanning)'}
                            </span>
                            <p className="text-xs sm:text-sm font-semibold text-emerald-950 leading-relaxed">
                              {lang === 'vi' ? cs.expectedGrammarVi : cs.expectedGrammar}
                            </p>
                          </div>
                        </div>

                        {/* Passage Sentence Evidence */}
                        <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-800 block mb-1">
                            {lang === 'vi' ? 'Câu Chứa Đáp Án Trong Bài Đọc (Đoạn F)' : 'Target Passage Sentence (Section F)'}
                          </span>
                          <p className="text-xs sm:text-sm font-serif italic text-slate-900 leading-relaxed">
                            "{cs.passageSentence}"
                          </p>
                          {lang === 'vi' && (
                            <p className="text-xs text-blue-950 not-italic font-sans mt-1.5 pt-1.5 border-t border-blue-200">
                              ➔ {cs.passageSentenceVi}
                            </p>
                          )}
                        </div>

                        {/* Paraphrase Mapping Table */}
                        <div>
                          <h5 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                            <CheckSquare className="w-4 h-4 text-emerald-600" />
                            <span>
                              {lang === 'vi'
                                ? 'Bảng Đối Chiếu Paraphrase 1:1 Giữa Đề Bài & Bài Đọc'
                                : '1:1 Paraphrase Alignment Matrix'}
                            </span>
                          </h5>
                          <div className="overflow-x-auto">
                            <table className="w-full text-xs text-left border border-slate-200 rounded-lg overflow-hidden">
                              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                                <tr>
                                  <th className="p-3 w-1/3">
                                    {lang === 'vi' ? 'Từ Khóa Trong Đề Bài' : 'Keyword in Question'}
                                  </th>
                                  <th className="p-3 w-1/3">
                                    {lang === 'vi' ? 'Từ Tương Đương Trong Bài Đọc' : 'Parallel in Passage'}
                                  </th>
                                  <th className="p-3 w-1/3">
                                    {lang === 'vi' ? 'Phân Tích Chiến Lược' : 'Strategic Insight'}
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100 bg-white">
                                {cs.paraphraseMap.map((map, mIdx) => (
                                  <tr key={mIdx} className="hover:bg-slate-50 transition">
                                    <td className="p-3 font-semibold text-rose-700">
                                      {map.testKeyword}
                                    </td>
                                    <td className="p-3 font-semibold text-emerald-700">
                                      {map.passageMatch}
                                    </td>
                                    <td className="p-3 text-slate-600">
                                      {lang === 'vi' ? map.noteVi : map.note}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>

                        {/* Critical Traps */}
                        <div>
                          <h5 className="text-sm font-bold text-rose-900 mb-2 flex items-center gap-1.5">
                            <AlertTriangle className="w-4 h-4 text-rose-600" />
                            <span>
                              {lang === 'vi'
                                ? 'Các Lỗi Sai Khiến Thí Sinh Mất Điểm Ở Câu Này'
                                : 'Critical Traps & Why Candidates Fail on this Question'}
                            </span>
                          </h5>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {cs.criticalTraps.map((trap, tIdx) => (
                              <div
                                key={tIdx}
                                className="p-3.5 rounded-xl border border-rose-200 bg-rose-50/50 flex flex-col justify-between"
                              >
                                <div>
                                  <span className="text-xs font-bold text-rose-800 block mb-1">
                                    ✕ {lang === 'vi' ? trap.mistakeVi : trap.mistake}
                                  </span>
                                  <p className="text-[11px] text-rose-900/80 leading-relaxed">
                                    {lang === 'vi' ? trap.reasonVi : trap.reason}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Band 9 Takeaway */}
                        <div className="p-4 rounded-xl bg-emerald-950 text-emerald-100 border border-emerald-800">
                          <div className="flex items-center gap-2 font-bold text-emerald-300 text-xs mb-1">
                            <Award className="w-4 h-4 text-emerald-400" />
                            <span>Band 9.0 Strategic Takeaway</span>
                          </div>
                          <p className="text-xs sm:text-sm leading-relaxed text-emerald-50">
                            {lang === 'vi' ? cs.band9TakeawayVi : cs.band9Takeaway}
                          </p>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* SUB-SECTION 3: 4 GOLDEN RULES */}
              {masterclassSubSection === 'rules' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
                    <h4 className="text-lg font-bold text-slate-900 mb-1">
                      {lang === 'vi'
                        ? '4 Nguyên Tắc Vàng Bất Di Bất Dịch Của Sentence Completion'
                        : 'The 4 Non-Negotiable Golden Rules of Sentence Completion'}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 mb-6">
                      {lang === 'vi'
                        ? 'Mọi câu trả lời đúng đều phải vượt qua bài kiểm tra của 4 nguyên tắc này trước khi ghi vào phiếu trả lời.'
                        : 'Every correct answer must satisfy all four exam imperatives before you write it on your answer sheet.'}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {SENTENCE_COMPLETION_INSIGHTS.coreRules.map((rule, rIdx) => (
                        <div
                          key={rIdx}
                          className="p-5 rounded-xl border border-slate-200 bg-slate-50/70 hover:border-emerald-500 hover:bg-white transition"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                              {rule.badge}
                            </span>
                          </div>
                          <h5 className="text-base font-bold text-slate-900 mb-2">
                            {lang === 'vi' ? rule.ruleVi : rule.rule}
                          </h5>
                          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                            {lang === 'vi' ? rule.descriptionVi : rule.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* SUB-SECTION 4: TOP 5 TRAPS & BAND 8.5+ FIXES */}
              {masterclassSubSection === 'traps' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
                    <h4 className="text-lg font-bold text-slate-900 mb-1">
                      {lang === 'vi'
                        ? '5 Cái Bẫy Kinh Điển Khiến 80% Thí Sinh Mất Điểm Oan'
                        : 'Top 5 Sentence Completion Pitfalls & How Band 8.5+ Solves Them'}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 mb-6">
                      {lang === 'vi'
                        ? 'Nắm vững 5 cơ chế tạo bẫy này của hội đồng khảo thí để không bao giờ bị trừ điểm một cách đáng tiếc.'
                        : 'Understand these five test-creator trap mechanisms to eliminate careless point deductions.'}
                    </p>

                    <div className="space-y-4">
                      {SENTENCE_COMPLETION_INSIGHTS.frequentTraps.map((trap, idx) => (
                        <div
                          key={idx}
                          className="p-5 rounded-xl border border-slate-200 bg-slate-50/50"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <span className="w-6 h-6 rounded-full bg-rose-600 text-white font-bold text-xs flex items-center justify-center">
                              {idx + 1}
                            </span>
                            <h5 className="text-base font-bold text-slate-900">
                              {lang === 'vi' ? trap.trapTitleVi : trap.trapTitle}
                            </h5>
                          </div>

                          <p className="text-xs sm:text-sm text-slate-700 mb-3">
                            {lang === 'vi' ? trap.trapDescriptionVi : trap.trapDescription}
                          </p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3 text-xs">
                            <div className="p-3 bg-rose-50 rounded-lg border border-rose-200 text-rose-950">
                              <span className="font-bold text-rose-800 block mb-1">
                                ✕ {lang === 'vi' ? 'Ví dụ sai lầm:' : 'Careless Mistake:'}
                              </span>
                              <code>{trap.badExample}</code>
                            </div>
                            <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-emerald-950">
                              <span className="font-bold text-emerald-800 block mb-1">
                                ✓ {lang === 'vi' ? 'Cách xử lý chuẩn xác:' : 'Band 8.5+ Execution:'}
                              </span>
                              <code>{trap.goodExample}</code>
                            </div>
                          </div>

                          <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-800">
                            <span className="font-bold text-blue-700">
                              {lang === 'vi' ? 'Chiến lược phòng tránh: ' : 'Fix Strategy: '}
                            </span>
                            <span>{lang === 'vi' ? trap.fixStrategyVi : trap.fixStrategy}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* SUB-SECTION 5: LIVE AUDIT SIMULATOR */}
              {masterclassSubSection === 'simulator' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
                    <div className="mb-4 pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-2 mb-1">
                        <ShieldCheck className="w-5 h-5 text-emerald-600" />
                        <h4 className="text-lg font-bold text-slate-900">
                          {lang === 'vi'
                            ? 'Công Cụ Tự Kiểm Tra Đáp Án Điền Từ (Live Audit Simulator)'
                            : 'Interactive Sentence Completion Audit Simulator'}
                        </h4>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600">
                        {lang === 'vi'
                          ? 'Thử nhập các cách viết khác nhau (kể cả phương án sai hoặc thừa từ) để xem cơ chế kiểm tra lỗi tự động của giám khảo IELTS!'
                          : 'Type trial responses to observe how automated IELTS examiners detect duplicate articles, word count overflows, and spelling mismatches.'}
                      </p>
                    </div>

                    {/* Question Picker */}
                    <div className="flex items-center gap-2 mb-4 overflow-x-auto">
                      {[24, 25, 26].map((qNum) => (
                        <button
                          key={qNum}
                          onClick={() => {
                            setSimQuestionNum(qNum);
                            setSimInput('');
                            setSimAuditResult(null);
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                            simQuestionNum === qNum
                              ? 'bg-slate-900 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          Question {qNum}
                        </button>
                      ))}
                    </div>

                    {/* Active Question Prompt Display */}
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 mb-4">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                        {lang === 'vi' ? 'Đề bài câu ' : 'Prompt for Question '} {simQuestionNum} (NO MORE THAN TWO WORDS)
                      </span>
                      <p className="text-sm font-semibold text-slate-900">
                        {simQuestionNum === 24 && 'During the 1728 outbreak, provincial governors were ordered to isolate infected villages and create a _______ around them.'}
                        {simQuestionNum === 25 && 'Decrees stated that the houses of infected people, along with any _______, were to be burned.'}
                        {simQuestionNum === 26 && 'To prevent the transmission of disease through postal communications, letters were heated above a _______ before being copied.'}
                      </p>
                    </div>

                    {/* Interactive Input */}
                    <div className="flex flex-col sm:flex-row gap-2 mb-4">
                      <input
                        type="text"
                        value={simInput}
                        onChange={(e) => {
                          setSimInput(e.target.value);
                          setSimAuditResult(null);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleAuditSimulator();
                        }}
                        placeholder={
                          lang === 'vi'
                            ? 'Nhập thử từ muốn điền (ví dụ: a fire, fire, cordon sanitaire, cattle...)'
                            : 'Type your candidate response (e.g. fire, a fire, cordon sanitaire...)'
                        }
                        className="flex-1 px-4 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
                      />
                      <button
                        onClick={handleAuditSimulator}
                        disabled={!simInput.trim()}
                        className="px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50 transition shadow-xs"
                      >
                        {lang === 'vi' ? 'Kiểm Tra Đáp Án' : 'Audit Response'}
                      </button>
                    </div>

                    {/* Simulator Feedback Display */}
                    {simAuditResult && (
                      <div
                        className={`p-5 rounded-xl border transition-all ${
                          simAuditResult.status === 'correct'
                            ? 'bg-emerald-50/80 border-emerald-300'
                            : simAuditResult.status === 'warning'
                            ? 'bg-amber-50/80 border-amber-300'
                            : 'bg-rose-50/80 border-rose-300'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-3">
                          {simAuditResult.status === 'correct' && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          )}
                          {simAuditResult.status === 'warning' && (
                            <AlertTriangle className="w-5 h-5 text-amber-600" />
                          )}
                          {simAuditResult.status === 'incorrect' && (
                            <XCircle className="w-5 h-5 text-rose-600" />
                          )}

                          <span className="text-sm font-bold">
                            {simAuditResult.status === 'correct' &&
                              (lang === 'vi' ? 'Đáp Án Hợp Lệ & Chính Xác 100%' : '100% Valid & Exact Match')}
                            {simAuditResult.status === 'warning' &&
                              (lang === 'vi' ? 'Cảnh Báo Lỗi Bất Cẩn / Bẫy Đề Thi' : 'Careless Mistake / Trap Triggered')}
                            {simAuditResult.status === 'incorrect' &&
                              (lang === 'vi' ? 'Chưa Đúng Từ Khóa' : 'Incorrect Candidate String')}
                          </span>
                        </div>

                        {/* Audit Indicators */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3 text-xs font-semibold">
                          <div className="p-2 rounded bg-white border border-slate-200 flex items-center justify-between">
                            <span>{lang === 'vi' ? 'Số lượng từ:' : 'Word Count:'}</span>
                            <span className={simAuditResult.wordCountValid ? 'text-emerald-700' : 'text-rose-600'}>
                              {simAuditResult.wordCount} {simAuditResult.wordCount === 1 ? 'word' : 'words'} ({simAuditResult.wordCountValid ? 'OK' : 'Exceeded'})
                            </span>
                          </div>

                          <div className="p-2 rounded bg-white border border-slate-200 flex items-center justify-between">
                            <span>{lang === 'vi' ? 'Lặp mạo từ (a/an/the):' : 'Duplicate Article:'}</span>
                            <span className={simAuditResult.duplicateArticle ? 'text-rose-600 font-bold' : 'text-emerald-700'}>
                              {simAuditResult.duplicateArticle ? 'Detected!' : 'None'}
                            </span>
                          </div>

                          <div className="p-2 rounded bg-white border border-slate-200 flex items-center justify-between">
                            <span>{lang === 'vi' ? 'Khớp văn bản gốc:' : 'Verbatim Match:'}</span>
                            <span className={simAuditResult.isExactMatch ? 'text-emerald-700' : 'text-slate-500'}>
                              {simAuditResult.isExactMatch ? 'Exact ✓' : 'Mismatch ✕'}
                            </span>
                          </div>
                        </div>

                        <p className="text-xs sm:text-sm font-medium text-slate-800 leading-relaxed">
                          {lang === 'vi' ? simAuditResult.feedbackMessageVi : simAuditResult.feedbackMessage}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
