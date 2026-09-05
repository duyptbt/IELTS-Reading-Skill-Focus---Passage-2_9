export type AppMode = 'practice' | 'test' | 'consolidation';

export interface QuestionTip {
  id?: string;
  type: 'test' | 'study';
  title: string;
  content: string;
}

export type QuestionSection = 'matching-headings' | 'multiple-choice-two' | 'sentence-completion';

export interface QuestionOption {
  id: string;
  text: string;
}

export interface HeadingOption {
  id: string; // 'i' | 'ii' | 'iii' | 'iv' | 'v' | 'vi' | 'vii' | 'viii' | 'ix'
  title: string;
}

export interface Question {
  id: number;
  section: QuestionSection;
  prompt: string;
  preText?: string;
  postText?: string;
  correctAnswers: string[]; // Allowed valid variations (lowercase trimmed)
  displayAnswer: string;
  explanation: string;
  quote: string;
  paragraphRef: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
  tips?: QuestionTip[];
  options?: QuestionOption[];
}

export interface Paragraph {
  id: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
  text: string;
}

export interface HighlightRange {
  id: string;
  paragraphId?: string;
  target?: 'passage' | 'questions';
  text: string;
  color: 'yellow' | 'emerald' | 'sky' | 'rose' | 'purple';
  createdAt: number;
}

export interface TestResult {
  score: number;
  total: number;
  timeSpentSeconds: number;
  bandScore: string;
  submittedAt: string;
  breakdown: {
    questionId: number;
    userAnswer: string;
    isCorrect: boolean;
    correctDisplay: string;
    explanation: string;
    paragraphRef: string;
  }[];
}

// Consolidation Language & Reading Skills Types
export interface LanguageItem {
  id: string;
  term: string;
  partOfSpeech: string;
  phonetic?: string;
  bandLevel: 'Band 7.0' | 'Band 7.5' | 'Band 8.0' | 'Band 8.5+';
  definition: string;
  passageQuote: string;
  paragraphRef: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
  collocations: string[];
  ieltsTip: string;
  category: 'academic-vocab' | 'collocation' | 'idiomatic-phrase' | 'environmental-econ';
}

export interface GrammarStructureItem {
  id: string;
  title: string;
  structurePattern: string;
  passageExample: string;
  paragraphRef: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
  simplifiedParaphrase: string;
  ieltsReadingFunction: string;
  practiceTip: string;
}

export interface ParaphraseTaskItem {
  id: string;
  questionOrHeading: string;
  sourceType: 'Heading' | 'Multiple Choice' | 'Sentence Completion';
  questionRef: string;
  passageOriginal: string;
  paragraphRef: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
}

export interface CollocationQuizItem {
  id: string;
  sentenceWithBlank: string;
  targetCollocation: string;
  options: string[];
  correctAnswer: string;
  paragraphRef?: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
  explanation: string;
}

export interface SentenceScrambleItem {
  id: string;
  title: string;
  grammarNote: string;
  paragraphRef: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
  chunks: string[];
  correctOrder: string[];
  fullSentence: string;
}

export interface AuthorStanceItem {
  id: string;
  paragraph: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
  topic: string;
  rhetoricalPurpose: string;
  discourseSignal: string;
  keyConclusion: string;
}


