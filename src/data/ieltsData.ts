import { Paragraph, Question, QuestionTip, HeadingOption, QuestionOption } from '../types';

export const PASSAGE_TITLE = "Measures to combat infectious disease in tsarist Russia";
export const PASSAGE_SUBTITLE = "How seventeenth and eighteenth-century Russian authorities developed border controls, military quarantines, and imperial decrees to control outbreaks of plague.";

export interface ReviewItem {
  id: number;
  question: string;
  answer: string;
}

export const EXAM_REVIEW_ITEMS: ReviewItem[] = [
  { id: 1, question: "How many questions do you have to answer?", answer: "13 (Questions 14–26)" },
  { id: 2, question: "Does each task have the same number of questions?", answer: "No (Matching Headings: 6 questions [14–19]; Multiple Choice: 2 tasks of 2 questions each [20–21 and 22–23]; Sentence Completion: 3 questions [24–26])" },
  { id: 3, question: "How long should you spend on this section?", answer: "20 minutes" }
];

export const GENERAL_TEST_TIP: QuestionTip = {
  type: 'test',
  title: 'Test Tip: Reading Passage 2 Strategy',
  content: "Scan the title and opening sentences of each section to track the chronological and institutional development of anti-plague controls in tsarist Russia: border intelligence and merchant questioning in the 17th century (Section A), trade cessation and quarantines (Section B), plague spread via military campaigns under Peter the Great (Section C), strict wartime checkpoints and river cordons (Section D), the ad-hoc provisional limitation of early methods (Section E), proactive standardized decrees after the 1727–1728 Astrakhan epidemic (Section F), and the authorities' intuitive isolation principles (Section G)."
};

export const HEADINGS_TEST_TIP: QuestionTip = {
  type: 'test',
  title: 'Action plan for Matching paragraph headings (Questions 14–19)',
  content: `• Check how many headings there are (8 headings, i–viii) and how many sections you must match (6 sections, A–F). You will have two extra distractor headings.
• Note that Reading Passage 2 has seven sections (A–G), but you only choose headings for sections A–F. Section G is not assigned a heading.
• Read Section A quickly. Underline key nouns and verbs to identify the primary function: systematic gathering of intelligence about foreign plague through spies, merchants, and customs officials (Heading ii).
• Read each subsequent section to locate its controlling idea rather than supporting details.
• Watch out for distractors: Heading iii refers to "treatment" (medical cure), but Russia only used containment and isolation. Heading vi refers to "hostile reactions from foreign states", but no foreign hostility is mentioned.`
};

export const SEVENTEENTH_CENTURY_MCQ_TIP: QuestionTip = {
  type: 'test',
  title: 'Action plan: Questions 20 & 21 (17th Century Anti-Plague Measures)',
  content: `• Choose TWO letters, A–E. Look for measures Russia specifically implemented in the seventeenth century (discussed in Sections A and B).
• Advice:
  - A: Did Russia cooperate with foreign leaders? (Section B says Tsar Alexei suspended relations and stopped trade, not cooperated).
  - B: Spying? (Section A explicitly states information was reported through 'undercover agents' = spying).
  - C: Military campaigns? (Section C mentions military campaigns, but that was in the 18th century and caused plague spread, rather than being a preventative measure).
  - D: Restrictions on access to its ports? (Section B states 'foreign vessels were not allowed to dock in Russian ports if there was credible information about epidemics').
  - E: Expulsion of foreigners? (Foreigners were quarantined and questioned at customs, not expelled).`
};

export const EIGHTEENTH_CENTURY_MCQ_TIP: QuestionTip = {
  type: 'test',
  title: 'Action plan: Questions 22 & 23 (Statements on Early 18th Century)',
  content: `• Choose TWO letters, A–E. Focus on facts stated in Sections C, D, and E about the early eighteenth century.
• Advice:
  - A: Were outbreaks consistently smaller than before? (Section C says: 'although none of the occurrences was of the same scale as in the past, plague appeared in Russia several times').
  - B: Did military casualties at Riga exceed plague deaths? (Section C says: 'more soldiers died of the disease after the capture of Riga than from enemy fire').
  - C: Did camp design allow plague to spread quickly? (Section D states camps were designed to 'separate divisions, detachments, and smaller units' to prevent spread).
  - D: Was the tsar's plan not strictly implemented? (Section D says orders were 'rigorously enforced, and those who disobeyed were hung').
  - E: Were anti-plague measures reactive rather than strategic? (Section E states 'all of the measures had a provisional character: they were intended to respond to a specific outbreak, and were not designed as a coherent set of measures to be implemented systematically').`
};

export const SENTENCE_COMPLETION_TIPS: QuestionTip[] = [
  {
    type: 'test',
    title: 'Action plan for Sentence completion (Questions 24–26)',
    content: `1 Check the word limit: Choose ONE WORD ONLY from the passage for each answer. Writing two words or hyphenated extras will be marked incorrect.
2 Identify the grammatical role needed:
  - Q24: Proper noun / location: 'An outbreak of plague in [Place] prompted...'
  - Q25: Plural noun: 'burn the [items] and possessions of plague victims'
  - Q26: Noun: 'held over a [thing] prior to copying it'
3 Scan Section F for key chronological signposts ('1727–1728 epidemic', 'burned along with', 'letters brought by couriers').
4 Copy the exact spelling from the passage.`
  }
];

export const LIST_OF_HEADINGS: HeadingOption[] = [
  { id: 'i', title: 'Outbreaks of plague as a result of military campaigns.' },
  { id: 'ii', title: 'Systematic intelligence-gathering about external cases of plague.' },
  { id: 'iii', title: 'Early forms of treatment for plague victims.' },
  { id: 'iv', title: 'The general limitations of early Russian anti-plague measures.' },
  { id: 'v', title: 'Partly successful bans against foreign states affected by plague.' },
  { id: 'vi', title: 'Hostile reactions from foreign states to Russian anti-plague measures.' },
  { id: 'vii', title: 'Various measures to limit outbreaks of plague associated with war.' },
  { id: 'viii', title: 'The formulation and publication of preventive strategies.' },
];

export const HEADING_DISTRACTOR_NOTES = [
  {
    id: 'iii',
    heading: 'Early forms of treatment for plague victims.',
    explanation: "Distractor heading. The passage repeatedly mentions physical examination, isolation, quarantine, and burning possessions, but nowhere mentions medical treatment, remedies, or therapies for plague victims."
  },
  {
    id: 'vi',
    heading: 'Hostile reactions from foreign states to Russian anti-plague measures.',
    explanation: "Distractor heading. Section B mentions Tsar Alexei writing to King Charles II announcing the cessation of Russian trade relations with England in 1665, but the text contains no reference to foreign states reacting with hostility."
  }
];

export const SEVENTEENTH_CENTURY_OPTIONS: QuestionOption[] = [
  { id: 'A', text: 'Cooperation with foreign leaders.' },
  { id: 'B', text: 'Spying.' },
  { id: 'C', text: 'Military campaigns.' },
  { id: 'D', text: 'Restrictions on access to its ports.' },
  { id: 'E', text: 'Expulsion of foreigners.' },
];

export const EIGHTEENTH_CENTURY_OPTIONS: QuestionOption[] = [
  { id: 'A', text: 'Plague outbreaks were consistently smaller than before.' },
  { id: 'B', text: 'Military casualties at Riga exceeded the number of plague victims.' },
  { id: 'C', text: 'The design of military camps allowed plague to spread quickly.' },
  { id: 'D', text: "The tsar's plan to protect St Petersburg from plague was not strictly implemented." },
  { id: 'E', text: 'Anti-plague measures were generally reactive rather than strategic.' },
];

export const PARAGRAPHS: Paragraph[] = [
  {
    id: 'A',
    text: "In the second half of the seventeenth century, Russian authorities began implementing controls at the borders of their empire to prevent the importation of plague, a highly infectious and dangerous disease. Information on disease outbreak occurring abroad was regularly reported to the tsar's court through various means, including commercial channels (travelling merchants), military personnel deployed abroad, undercover agents, the network of Imperial Foreign Office embassies and representations abroad, and the customs offices. For instance, the heads of customs offices were instructed to question foreigners entering Russia about possible epidemics of dangerous diseases in their respective countries."
  },
  {
    id: 'B',
    text: "If news of an outbreak came from abroad, relations with the affected country were suspended. For instance, foreign vessels were not allowed to dock in Russian ports if there was credible information about the existence of epidemics in countries from whence they had departed. In addition, all foreigners entering Russia from those countries had to undergo quarantine. In 1665, after receiving news about a plague epidemic in England, Tsar Alexei wrote a letter to King Charles II in which he announced the cessation of Russian trade relations with England and other foreign states. These protective measures appeared to have been effective, as the country did not record any cases of plague during that year and in the next three decades. It was not until 1692 that another plague outbreak was recorded in the Russian province of Astrakhan. This epidemic continued for five months and killed 10,383 people, or about 65 percent of the city's population. By the end of the seventeenth century, preventative measures had been widely introduced in Russia, including the isolation of persons ill with plague, the imposition of quarantines, and the distribution of explanatory public health notices about plague outbreaks."
  },
  {
    id: 'C',
    text: "During the eighteenth century, although none of the occurrences was of the same scale as in the past, plague appeared in Russia several times. For instance, from 1703 to 1705, a plague outbreak that had ravaged Istanbul spread to the Podolsk and Kiev provinces in Russia, and then to Poland and Hungary. After defeating the Swedes in the battle of Poltava in 1709, Tsar Peter I (Peter the Great) dispatched part of his army to Poland, where plague had been raging for two years. Despite preventive measures, the disease spread among the Russian troops. In 1710, the plague reached Riga (then part of Sweden, now the capital of Latvia), where it was active until 1711 and claimed 60,000 lives. During this period, the Russians besieged Riga and, after the Swedes had surrendered the city in 1710, the Russian army lost 9,800 soldiers to the plague. Russian military chronicles of the time note that more soldiers died of the disease after the capture of Riga than from enemy fire during the siege of that city."
  },
  {
    id: 'D',
    text: "Tsar Peter I imposed strict measures to prevent the spread of plague during these conflicts. Soldiers suspected of being infected were isolated and taken to areas far from military camps. In addition, camps were designed to separate divisions, detachments, and smaller units of soldiers. When plague reached Narva (located in present-day Estonia) and threatened to spread to St. Petersburg, the newly built capital of Russia, Tsar Peter I ordered the army to cordon off the entire boundary along the Luga River, including temporarily halting all activity on the river. In order to prevent the movement of people and goods from Narva to St Petersburg and Novgorod, roadblocks and checkpoints were set up on all roads. The tsar's orders were rigorously enforced, and those who disobeyed were hung."
  },
  {
    id: 'E',
    text: "However, although the Russian authorities applied such methods to contain the spread of the disease and limit the number of victims, all of the measures had a provisional character: they were intended to respond to a specific outbreak, and were not designed as a coherent set of measures to be implemented systematically at the first sign of plague. The advent of such a standard response system came a few years later."
  },
  {
    id: 'F',
    text: "The first attempts to organise procedures and carry out proactive steps to control plague date to the aftermath of the 1727-1728 epidemic in Astrakhan. In response to this, the Russian imperial authorities issued several decrees aimed at controlling the future spread of plague. Among these decrees, the 'Instructions for Governors and Heads of Townships' required that all governors immediately inform the Senate - a government body created by Tsar Peter I in 1711 to advise the monarch - if plague cases were detected in their respective provinces. Furthermore, the decree required that governors ensure the physical examination of all persons suspected of carrying the disease and their subsequent isolation. In addition, it was ordered that sites where plague victims were found had to be encircled by checkpoints and isolated for the duration of the outbreak. These checkpoints were to remain operational for at least six weeks. The houses of infected persons were to be burned along with all of the personal property they contained, including farm animals and cattle. The governors were instructed to inform the neighbouring provinces and cities about every plague case occurring on their territories. Finally, letters brought by couriers were heated above a fire before being copied."
  },
  {
    id: 'G',
    text: "The implementation by the authorities of these combined measures demonstrates their intuitive understanding of the importance of the timely isolation of infected people to limit the spread of plague."
  }
];

export const FOOTNOTES: { symbol: string; text: string }[] = [];

export const PARAGRAPH_QUESTION_MAP: Record<string, number> = {
  A: 14,
  B: 15,
  C: 16,
  D: 17,
  E: 18,
  F: 19,
};

export const QUESTIONS: Question[] = [
  // =========================================================================
  // Questions 14–19: Matching Headings (Sections A–F)
  // =========================================================================
  {
    id: 14,
    section: 'matching-headings',
    prompt: "Section A",
    correctAnswers: ["ii", "2", "systematic intelligence-gathering about external cases of plague", "systematic intelligence-gathering about external cases of plague."],
    displayAnswer: "ii",
    paragraphRef: 'A',
    quote: "Information on disease outbreak occurring abroad was regularly reported to the tsar's court through various means, including commercial channels (travelling merchants), military personnel deployed abroad, undercover agents, the network of Imperial Foreign Office embassies and representations abroad, and the customs offices.",
    explanation: "Section A describes how in the seventeenth century Russian authorities used a variety of means to find out about and prevent the import of plague from foreign countries. The text details intelligence-gathering through commercial channels, military scouts, undercover agents, embassies, and customs interrogation.",
    tips: [
      {
        id: 'advice-14',
        type: 'study',
        title: 'Advice: Question 14 (Section A)',
        content: "Look at Section A's catalogue of reporting channels: travelling merchants, deployed soldiers, undercover agents, embassies, and customs officers interrogating incoming travelers. This matches Heading ii: 'Systematic intelligence-gathering about external cases of plague'."
      }
    ]
  },
  {
    id: 15,
    section: 'matching-headings',
    prompt: "Section B",
    correctAnswers: ["v", "5", "partly successful bans against foreign states affected by plague", "partly successful bans against foreign states affected by plague."],
    displayAnswer: "v",
    paragraphRef: 'B',
    quote: "In 1665, after receiving news about a plague epidemic in England, Tsar Alexei wrote a letter to King Charles II in which he announced the cessation of Russian trade relations with England and other foreign states. These protective measures appeared to have been effective, as the country did not record any cases of plague during that year and in the next three decades. It was not until 1692 that another plague outbreak was recorded in the Russian province of Astrakhan.",
    explanation: "Section B shows that there was some success in preventing the import of the plague, though not total prevention. The trade bans and ship dock restrictions protected Russia for three decades, but another outbreak eventually occurred in Astrakhan in 1692.",
    tips: [
      {
        id: 'advice-15',
        type: 'study',
        title: 'Advice: Question 15 (Section B)',
        content: "Notice the balance in Section B: trade was banned with England and foreign vessels were barred, keeping plague away for 30 years ('effective'), yet in 1692 an epidemic hit Astrakhan, killing 65% of its population ('partly successful'). This matches Heading v."
      }
    ]
  },
  {
    id: 16,
    section: 'matching-headings',
    prompt: "Section C",
    correctAnswers: ["i", "1", "outbreaks of plague as a result of military campaigns", "outbreaks of plague as a result of military campaigns."],
    displayAnswer: "i",
    paragraphRef: 'C',
    quote: "After defeating the Swedes in the battle of Poltava in 1709, Tsar Peter I (Peter the Great) dispatched part of his army to Poland, where plague had been raging for two years. Despite preventive measures, the disease spread among the Russian troops. In 1710, the plague reached Riga... During this period, the Russians besieged Riga and, after the Swedes had surrendered the city in 1710, the Russian army lost 9,800 soldiers to the plague.",
    explanation: "Section C explains how Russian involvement in wars with other countries allowed the spread of the plague to Russian soldiers. Soldiers dispatched to Poland and besieging Riga suffered massive plague casualties (losing 9,800 soldiers, more than from enemy fire).",
    tips: [
      {
        id: 'advice-16',
        type: 'study',
        title: 'Advice: Question 16 (Section C)',
        content: "Notice the central topic of Section C: warfare (the battle of Poltava, troop movements to Poland, the siege of Riga) directly causing disease among troops ('more soldiers died of the disease after the capture of Riga than from enemy fire'). This matches Heading i."
      }
    ]
  },
  {
    id: 17,
    section: 'matching-headings',
    prompt: "Section D",
    correctAnswers: ["vii", "7", "various measures to limit outbreaks of plague associated with war", "various measures to limit outbreaks of plague associated with war."],
    displayAnswer: "vii",
    paragraphRef: 'D',
    quote: "Tsar Peter I imposed strict measures to prevent the spread of plague during these conflicts. Soldiers suspected of being infected were isolated and taken to areas far from military camps. In addition, camps were designed to separate divisions, detachments, and smaller units of soldiers. When plague reached Narva... ordered the army to cordon off the entire boundary along the Luga River...",
    explanation: "Section D describes how the Tsar Peter 1 tried to limit the spread of the plague in a variety of ways during wartime conflicts, including isolating infected soldiers, redesigning army camps to separate units, cordoning off the Luga River boundary, and setting up checkpoints on roads with death penalties for disobedience.",
    tips: [
      {
        id: 'advice-17',
        type: 'study',
        title: 'Advice: Question 17 (Section D)',
        content: "Look at the variety of containment tactics listed by Peter I during wartime: camp segregation, isolated sick wards, river cordons, and roadblocks to protect St. Petersburg. This matches Heading vii."
      }
    ]
  },
  {
    id: 18,
    section: 'matching-headings',
    prompt: "Section E",
    correctAnswers: ["iv", "4", "the general limitations of early Russian anti-plague measures", "the general limitations of early Russian anti-plague measures."],
    displayAnswer: "iv",
    paragraphRef: 'E',
    quote: "However, although the Russian authorities applied such methods to contain the spread of the disease and limit the number of victims, all of the measures had a provisional character: they were intended to respond to a specific outbreak, and were not designed as a coherent set of measures to be implemented systematically at the first sign of plague.",
    explanation: "Section E summarises the measures taken by the Russian authorities as being limited in their success by being too piecemeal: they were ad-hoc, provisional, and reactive rather than a standardized, coherent system.",
    tips: [
      {
        id: 'advice-18',
        type: 'study',
        title: 'Advice: Question 18 (Section E)',
        content: "Section E is short and reflective: 'all of the measures had a provisional character... not designed as a coherent set of measures'. This highlights their inherent limitations (Heading iv)."
      }
    ]
  },
  {
    id: 19,
    section: 'matching-headings',
    prompt: "Section F",
    correctAnswers: ["viii", "8", "the formulation and publication of preventive strategies", "the formulation and publication of preventive strategies."],
    displayAnswer: "viii",
    paragraphRef: 'F',
    quote: "The first attempts to organise procedures and carry out proactive steps to control plague date to the aftermath of the 1727-1728 epidemic in Astrakhan. In response to this, the Russian imperial authorities issued several decrees aimed at controlling the future spread of plague. Among these decrees, the 'Instructions for Governors and Heads of Townships' required that all governors immediately inform the Senate...",
    explanation: "Section F shows how a coherent preventive strategy was developed for more systematic control of plague. Imperial authorities formulated and published official decrees (such as the 'Instructions for Governors and Heads of Townships') mandating prompt reporting, health examinations, six-week quarantine perimeters, burning contaminated property, and disinfecting courier letters over fire.",
    tips: [
      {
        id: 'advice-19',
        type: 'study',
        title: 'Advice: Question 19 (Section F)',
        content: "Section F marks the transition to formal decrees ('Instructions for Governors and Heads of Townships') and standardized proactive rules. This directly matches Heading viii: 'The formulation and publication of preventive strategies'."
      }
    ]
  },

  // =========================================================================
  // Questions 20–21: Multiple Choice (17th Century Measures)
  // Choose TWO letters, A–E
  // =========================================================================
  {
    id: 20,
    section: 'multiple-choice-two',
    prompt: "Which TWO measures did Russia take in the seventeenth century to avoid plague outbreaks? (Measure 1)",
    options: SEVENTEENTH_CENTURY_OPTIONS,
    correctAnswers: ["b", "d"],
    displayAnswer: "B",
    paragraphRef: 'A',
    quote: "Information on disease outbreak occurring abroad was regularly reported to the tsar's court through various means, including ... undercover agents ...",
    explanation: "PARAGRAPH A says that 'Information on disease outbreak occurring abroad was regularly reported to the tsar's court through various means, including ... undercover agents ...' which represents Option B (Spying).",
    tips: [
      {
        id: 'advice-20',
        type: 'study',
        title: 'Advice: Questions 20 and 21',
        content: `Check Paragraphs A & B for seventeenth-century actions:
• Spying: Para A mentions using 'undercover agents' to report disease outbreaks abroad (Option B).
• Port restrictions: Para B states 'foreign vessels were not allowed to dock in Russian ports if there was credible information about the existence of epidemics' (Option D).`
      }
    ]
  },
  {
    id: 21,
    section: 'multiple-choice-two',
    prompt: "Which TWO measures did Russia take in the seventeenth century to avoid plague outbreaks? (Measure 2)",
    options: SEVENTEENTH_CENTURY_OPTIONS,
    correctAnswers: ["b", "d"],
    displayAnswer: "D",
    paragraphRef: 'B',
    quote: "... foreign vessels were not allowed to dock in Russian ports if there was credible information about the existence of epidemics in countries from whence they had departed.",
    explanation: "PARAGRAPH B says that '... foreign vessels were not allowed to dock in Russian ports if there was credible information about the existence of epidemics in countries from whence they had departed.' This corresponds directly to Option D (Restrictions on access to its ports).",
    tips: []
  },

  // =========================================================================
  // Questions 22–23: Multiple Choice (Statements on Early 18th Century)
  // Choose TWO letters, A–E
  // =========================================================================
  {
    id: 22,
    section: 'multiple-choice-two',
    prompt: "Which TWO statements are made about Russia in the early eighteenth century? (Statement 1)",
    options: EIGHTEENTH_CENTURY_OPTIONS,
    correctAnswers: ["a", "e"],
    displayAnswer: "A",
    paragraphRef: 'C',
    quote: "During the eighteenth century, although none of the occurrences was of the same scale as in the past, plague appeared in Russia several times.",
    explanation: "PARAGRAPH C explains that '... none of the occurrences was of the same scale as in the past ...', matching Option A ('Plague outbreaks were consistently smaller than before').",
    tips: [
      {
        id: 'advice-22',
        type: 'study',
        title: 'Advice: Questions 22 and 23',
        content: `Check Paragraphs C, D, & E for eighteenth-century statements:
• Option A: Para C notes 'none of the occurrences was of the same scale as in the past' = consistently smaller scale than before (Correct).
• Option B: Para C states more soldiers died of plague than from enemy fire, so casualties from fighting did NOT exceed plague victims (Incorrect).
• Option C: Para D states camp design was meant to separate units to isolate infection, not allow it to spread (Incorrect).
• Option D: Para D states orders were 'rigorously enforced, and those who disobeyed were hung', so it was strictly implemented (Incorrect).
• Option E: Para E notes measures had a 'provisional character' and were not designed systematically = reactive rather than strategic (Correct).`
      }
    ]
  },
  {
    id: 23,
    section: 'multiple-choice-two',
    prompt: "Which TWO statements are made about Russia in the early eighteenth century? (Statement 2)",
    options: EIGHTEENTH_CENTURY_OPTIONS,
    correctAnswers: ["a", "e"],
    displayAnswer: "E",
    paragraphRef: 'E',
    quote: "... all of the measures had a provisional character: they were intended to respond to a specific outbreak, and were not designed as a coherent set of measures to be implemented systematically at the first sign of plague.",
    explanation: "PARAGRAPH E summarises the ad-hoc nature of the anti-plague measures: '... all of the measures had a provisional character: they were intended to respond to a specific outbreak, and were not designed as a coherent set of measures to be implemented systematically at the first sign of plague.' This matches Option E ('Anti-plague measures were generally reactive rather than strategic').",
    tips: []
  },

  // =========================================================================
  // Questions 24–26: Sentence Completion
  // Choose ONE WORD ONLY from the passage for each answer.
  // =========================================================================
  {
    id: 24,
    section: 'sentence-completion',
    prompt: "An outbreak of plague in ............... prompted the publication of a coherent preventative strategy.",
    preText: "An outbreak of plague in",
    postText: "prompted the publication of a coherent preventative strategy.",
    correctAnswers: ["astrakhan"],
    displayAnswer: "Astrakhan",
    paragraphRef: 'F',
    quote: "The first attempts to organise procedures and carry out proactive steps to control plague date to the aftermath of the 1727-1728 epidemic in Astrakhan.",
    explanation: "PARAGRAPH F states: 'The first attempts to organise procedures and carry out proactive steps to control plague date to the aftermath of the 1727–1728 epidemic in Astrakhan.'",
    tips: [
      {
        id: 'advice-24',
        type: 'study',
        title: 'Advice: Question 24',
        content: "Look in Paragraph F for the epidemic location that triggered formal proactive steps and decrees. Remember: ONE WORD ONLY."
      }
    ]
  },
  {
    id: 25,
    section: 'sentence-completion',
    prompt: "Provincial governors were ordered to burn the ............... and possessions of plague victims.",
    preText: "Provincial governors were ordered to burn the",
    postText: "and possessions of plague victims.",
    correctAnswers: ["houses", "house"],
    displayAnswer: "houses",
    paragraphRef: 'F',
    quote: "The houses of infected persons were to be burned along with all of the personal property they contained ...",
    explanation: "PARAGRAPH F states: 'The houses of infected persons were to be burned along with all of the personal property they contained ...'",
    tips: [
      {
        id: 'advice-25',
        type: 'study',
        title: 'Advice: Question 25',
        content: "Scan Paragraph F for what was burned along with personal property. The passage specifies 'The houses of infected persons were to be burned along with all of the personal property...' Answer: houses."
      }
    ]
  },
  {
    id: 26,
    section: 'sentence-completion',
    prompt: "Correspondence was held over a ............... prior to copying it.",
    preText: "Correspondence was held over a",
    postText: "prior to copying it.",
    correctAnswers: ["fire"],
    displayAnswer: "fire",
    paragraphRef: 'F',
    quote: "... letters brought by couriers were heated above a fire before being copied.",
    explanation: "PARAGRAPH F states: 'Finally, letters brought by couriers were heated above a fire before being copied.' 'Correspondence' paraphrases 'letters brought by couriers', and 'held over' paraphrases 'heated above'.",
    tips: [
      {
        id: 'advice-26',
        type: 'study',
        title: 'Advice: Question 26',
        content: "Look at the final sentence of Paragraph F: couriers' letters (correspondence) were 'heated above a fire before being copied'. The target noun is 'fire'."
      }
    ]
  }
];

export function calculateBandScore(score: number): string {
  if (score === 13) return "9.0";
  if (score === 12) return "8.5";
  if (score === 11) return "8.0";
  if (score === 10) return "7.5";
  if (score === 9) return "7.0";
  if (score === 8) return "6.5";
  if (score === 7) return "6.0";
  if (score === 6) return "5.5";
  if (score === 5) return "5.0";
  if (score === 4) return "4.5";
  if (score === 3) return "4.0";
  if (score >= 2) return "3.5";
  return "3.0";
}
