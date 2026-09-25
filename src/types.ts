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
  definitionVi?: string;
  passageQuote: string;
  paragraphRef: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
  collocations: string[];
  ieltsTip: string;
  ieltsTipVi?: string;
  category: 'academic-vocab' | 'collocation' | 'idiomatic-phrase' | 'environmental-econ';
}

export interface GrammarStructureItem {
  id: string;
  title: string;
  titleVi?: string;
  structurePattern: string;
  passageExample: string;
  paragraphRef: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
  simplifiedParaphrase: string;
  simplifiedParaphraseVi?: string;
  ieltsReadingFunction: string;
  ieltsReadingFunctionVi?: string;
  practiceTip: string;
  practiceTipVi?: string;
}

export interface ParaphraseTaskItem {
  id: string;
  questionOrHeading: string;
  questionOrHeadingVi?: string;
  sourceType: 'Heading' | 'Multiple Choice' | 'Sentence Completion';
  questionRef: string;
  passageOriginal: string;
  paragraphRef: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
  options: {
    id: string;
    text: string;
    textVi?: string;
    isCorrect: boolean;
  }[];
  explanation: string;
  explanationVi?: string;
}

export interface CollocationQuizItem {
  id: string;
  sentenceWithBlank: string;
  sentenceWithBlankVi?: string;
  targetCollocation: string;
  options: string[];
  correctAnswer: string;
  paragraphRef?: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
  explanation: string;
  explanationVi?: string;
}

export interface SentenceScrambleItem {
  id: string;
  title: string;
  titleVi?: string;
  grammarNote: string;
  grammarNoteVi?: string;
  paragraphRef: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
  chunks: string[];
  correctOrder: string[];
  fullSentence: string;
  fullSentenceVi?: string;
}

export interface SentenceCompletionCaseStudy {
  questionNumber: number;
  questionPrompt: string;
  questionPromptVi: string;
  targetAnswer: string;
  wordCountLimit: string;
  expectedGrammar: string;
  expectedGrammarVi: string;
  passageSentence: string;
  passageSentenceVi: string;
  paragraphRef: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
  paraphraseMap: {
    testKeyword: string;
    passageMatch: string;
    note: string;
    noteVi: string;
  }[];
  criticalTraps: {
    mistake: string;
    mistakeVi: string;
    reason: string;
    reasonVi: string;
  }[];
  band9Takeaway: string;
  band9TakeawayVi: string;
}

export interface SentenceCompletionInsight {
  coreRules: {
    rule: string;
    ruleVi: string;
    description: string;
    descriptionVi: string;
    badge: string;
  }[];
  fourStepStrategy: {
    step: number;
    title: string;
    titleVi: string;
    summary: string;
    summaryVi: string;
    details: string[];
    detailsVi: string[];
    proTip: string;
    proTipVi: string;
  }[];
  caseStudies: SentenceCompletionCaseStudy[];
  frequentTraps: {
    trapTitle: string;
    trapTitleVi: string;
    trapDescription: string;
    trapDescriptionVi: string;
    badExample: string;
    goodExample: string;
    fixStrategy: string;
    fixStrategyVi: string;
  }[];
}

export interface AuthorStanceItem {
  id: string;
  paragraph: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
  topic: string;
  rhetoricalPurpose: string;
  discourseSignal: string;
  keyConclusion: string;
}


