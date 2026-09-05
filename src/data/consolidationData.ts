import {
  LanguageItem,
  GrammarStructureItem,
  ParaphraseTaskItem,
  CollocationQuizItem,
  SentenceScrambleItem,
  AuthorStanceItem,
} from '../types';

export const CONSOLIDATION_VOCABULARY: LanguageItem[] = [
  {
    id: 'vocab-1',
    term: 'cordon off',
    partOfSpeech: 'phrasal verb',
    phonetic: '/ˈkɔːrdn ɒf/',
    bandLevel: 'Band 8.0',
    definition: 'To seal or isolate an area with barriers or guards to control or prevent entry and exit.',
    passageQuote: '... ordered the army to cordon off the entire boundary along the Luga River, including temporarily halting all activity on the river.',
    paragraphRef: 'D',
    collocations: ['cordon off an area', 'cordon off the boundary', 'military cordon'],
    ieltsTip: 'Frequently tested in IELTS Reading texts discussing quarantine, disaster zones, or crime scenes. Recognising that "cordoning off" signifies physical isolation is crucial for Matching Headings.',
    category: 'collocation'
  },
  {
    id: 'vocab-2',
    term: 'cessation',
    partOfSpeech: 'noun',
    phonetic: '/seˈseɪʃn/',
    bandLevel: 'Band 8.5+',
    definition: 'The fact or process of ending, terminating, or being brought to a complete stop.',
    passageQuote: '... announced the cessation of Russian trade relations with England and other foreign states.',
    paragraphRef: 'B',
    collocations: ['cessation of trade', 'cessation of hostilities', 'immediate cessation'],
    ieltsTip: 'Formal academic synonym for "stopping" or "termination". Look for this in questions asking about economic sanctions or embargoes.',
    category: 'academic-vocab'
  },
  {
    id: 'vocab-3',
    term: 'provisional',
    partOfSpeech: 'adjective',
    phonetic: '/prəˈvɪʒənl/',
    bandLevel: 'Band 7.5',
    definition: 'Arranged or existing for the present, possibly to be changed later; temporary and ad-hoc rather than permanent or systematically designed.',
    passageQuote: '... all of the measures had a provisional character: they were intended to respond to a specific outbreak, and were not designed as a coherent set of measures...',
    paragraphRef: 'E',
    collocations: ['provisional character', 'provisional measure', 'provisional government'],
    ieltsTip: 'Essential clue for Q22–23 and Heading iv: "provisional character" paraphrases "reactive rather than strategic" and "general limitations".',
    category: 'academic-vocab'
  },
  {
    id: 'vocab-4',
    term: 'undercover agent',
    partOfSpeech: 'noun phrase',
    phonetic: '/ˌʌndərˈkʌvər ˈeɪdʒənt/',
    bandLevel: 'Band 7.5',
    definition: 'A spy or operative working secretly using a disguised identity to gather confidential intelligence.',
    passageQuote: '... undercover agents, the network of Imperial Foreign Office embassies and representations abroad, and the customs offices.',
    paragraphRef: 'A',
    collocations: ['deploy undercover agents', 'undercover investigation', 'intelligence gathering'],
    ieltsTip: 'Direct lexical key for Question 20 (Option B: Spying). Understanding that "undercover agent" implies espionage is key to getting the correct answer.',
    category: 'collocation'
  },
  {
    id: 'vocab-5',
    term: 'proactive',
    partOfSpeech: 'adjective',
    phonetic: '/prəʊˈæktɪv/',
    bandLevel: 'Band 8.0',
    definition: 'Creating or controlling a situation rather than just reacting to it after it has occurred; taking initiative.',
    passageQuote: 'The first attempts to organise procedures and carry out proactive steps to control plague date to the aftermath of the 1727-1728 epidemic in Astrakhan.',
    paragraphRef: 'F',
    collocations: ['proactive steps', 'proactive measures', 'proactive approach'],
    ieltsTip: 'Contrasts directly with "reactive" or "provisional" in Paragraph E. Recognizing this semantic shift helps track the overall progression in the passage.',
    category: 'academic-vocab'
  },
  {
    id: 'vocab-6',
    term: 'ravage',
    partOfSpeech: 'verb',
    phonetic: '/ˈrævɪdʒ/',
    bandLevel: 'Band 8.0',
    definition: 'Cause severe, extensive, and devastating damage to something.',
    passageQuote: '... a plague outbreak that had ravaged Istanbul spread to the Podolsk and Kiev provinces in Russia...',
    paragraphRef: 'C',
    collocations: ['disease ravages', 'ravaged by war', 'plague ravages a city'],
    ieltsTip: 'Strong descriptive verb used in academic and historical texts for infectious diseases, wars, or natural catastrophes.',
    category: 'academic-vocab'
  },
  {
    id: 'vocab-7',
    term: 'decree',
    partOfSpeech: 'noun',
    phonetic: '/dɪˈkriː/',
    bandLevel: 'Band 7.5',
    definition: 'An official, legally binding order or directive issued by a legal authority or monarch.',
    passageQuote: '... the Russian imperial authorities issued several decrees aimed at controlling the future spread of plague.',
    paragraphRef: 'F',
    collocations: ['issue a decree', 'imperial decree', 'enforce a decree'],
    ieltsTip: 'Signals official government legislation in historical reading passages. Paraphrases "formulation of preventive strategies" in Heading viii.',
    category: 'academic-vocab'
  },
  {
    id: 'vocab-8',
    term: 'rigorously enforced',
    partOfSpeech: 'verb phrase',
    phonetic: '/ˈrɪɡərəsli ɪnˈfɔːrst/',
    bandLevel: 'Band 8.0',
    definition: 'Carried out or applied with extreme strictness, thoroughness, and penalties for non-compliance.',
    passageQuote: "The tsar's orders were rigorously enforced, and those who disobeyed were hung.",
    paragraphRef: 'D',
    collocations: ['rigorously enforced', 'strictly enforced', 'enforce regulations'],
    ieltsTip: 'In Question 22, Option D claims orders were "not strictly implemented". This text directly disproves that distractor.',
    category: 'collocation'
  },
  {
    id: 'vocab-9',
    term: 'intuitive understanding',
    partOfSpeech: 'noun phrase',
    phonetic: '/ɪnˈtjuːɪtɪv ˌʌndərˈstændɪŋ/',
    bandLevel: 'Band 8.5+',
    definition: 'An innate grasp or insight based on instinctive feeling and empirical observation rather than formal scientific microbial theory.',
    passageQuote: 'The implementation by the authorities of these combined measures demonstrates their intuitive understanding of the importance of the timely isolation of infected people...',
    paragraphRef: 'G',
    collocations: ['intuitive understanding', 'intuitive grasp', 'intuitive knowledge'],
    ieltsTip: 'Shows the author’s concluding appraisal: even before modern germ theory, Russian rulers correctly identified physical quarantine and isolation as the critical mechanism.',
    category: 'academic-vocab'
  },
  {
    id: 'vocab-10',
    term: 'besiege',
    partOfSpeech: 'verb',
    phonetic: '/bɪˈsiːdʒ/',
    bandLevel: 'Band 7.5',
    definition: 'Surround a city or fortress with armed forces in order to force its surrender.',
    passageQuote: 'During this period, the Russians besieged Riga and, after the Swedes had surrendered the city in 1710, the Russian army lost 9,800 soldiers to the plague.',
    paragraphRef: 'C',
    collocations: ['besiege a city', 'lay siege to', 'besieging forces'],
    ieltsTip: 'Crucial for military narrative comprehension in historical passages and for understanding the relationship between warfare and epidemics.',
    category: 'academic-vocab'
  }
];

export const CONSOLIDATION_GRAMMAR_STRUCTURES: GrammarStructureItem[] = [
  {
    id: 'struct-1',
    title: 'Negative Restrictive Structure: "It was not until... that..."',
    structurePattern: 'It was not until [Time / Event] that [Subject + Verb in affirmative past]',
    passageExample: 'It was not until 1692 that another plague outbreak was recorded in the Russian province of Astrakhan.',
    paragraphRef: 'B',
    simplifiedParaphrase: 'No other plague outbreak happened before 1692; Astrakhan in 1692 was the very first recorded case after a thirty-year gap.',
    ieltsReadingFunction: 'Used by academic writers to highlight delayed milestones, long periods of stability, or chronological thresholds. Crucial for timeline questions.',
    practiceTip: 'When you spot "It was not until X that Y", remember that Y did NOT happen at all during the period preceding X.'
  },
  {
    id: 'struct-2',
    title: 'Concessive Clause of Contrast: "Although..., [Main Clause]"',
    structurePattern: 'Although + [Subordinate Clause of Reality], [Main Clause Highlighting Key Limitation / Contrast]',
    passageExample: 'However, although the Russian authorities applied such methods to contain the spread of the disease and limit the number of victims, all of the measures had a provisional character...',
    paragraphRef: 'E',
    simplifiedParaphrase: 'While authorities did implement various containment tactics, the critical takeaway is that their methods were merely temporary reactions rather than a unified plan.',
    ieltsReadingFunction: 'Writers use concessive clauses to acknowledge positive efforts while steering the reader toward the true analytical conclusion or limitation in the main clause.',
    practiceTip: 'In IELTS Matching Headings and True/False/Not Given, the main clause after "although" contains the controlling thought for the paragraph.'
  },
  {
    id: 'struct-3',
    title: 'Passive Administrative Mandates: "Subject + were to be + Past Participle"',
    structurePattern: 'Subject + were to be + Past Participle [expressing formal imperial instruction or future obligation]',
    passageExample: 'The houses of infected persons were to be burned along with all of the personal property they contained, including farm animals and cattle.',
    paragraphRef: 'F',
    simplifiedParaphrase: 'Imperial orders required that the homes and belongings of all infected persons must be incinerated.',
    ieltsReadingFunction: 'Expresses historical laws, regulations, and decrees where the agent (imperial decree) establishes universal requirements.',
    practiceTip: 'Key for Sentence Completion tasks (Questions 25–26) where actions ordered by decrees are tested.'
  },
  {
    id: 'struct-4',
    title: 'Comparative Statistical Consequence: "More X than Y"',
    structurePattern: 'More [Noun / Group A] + Verb + than [Group B / Source B]',
    passageExample: '... more soldiers died of the disease after the capture of Riga than from enemy fire during the siege of that city.',
    paragraphRef: 'C',
    simplifiedParaphrase: 'The plague caused more fatalities among Russian troops in Riga than direct combat with Swedish artillery and weapons.',
    ieltsReadingFunction: 'Contrasts two rival causes of mortality. Test creators often invert these quantities to craft subtle multiple-choice traps.',
    practiceTip: 'Look closely at Question 22 Option B: "Military casualties at Riga exceeded the number of plague victims." The passage proves the exact reverse.'
  }
];

export const CONSOLIDATION_PARAPHRASE_TASKS: ParaphraseTaskItem[] = [
  {
    id: 'para-1',
    questionOrHeading: 'Heading ii: Systematic intelligence-gathering about external cases of plague',
    sourceType: 'Heading',
    questionRef: 'Question 14 (Section A)',
    passageOriginal: "Information on disease outbreak occurring abroad was regularly reported to the tsar's court through various means, including commercial channels (travelling merchants), military personnel deployed abroad, undercover agents, the network of Imperial Foreign Office embassies and representations abroad, and the customs offices.",
    paragraphRef: 'A',
    options: [
      {
        id: 'opt-1a',
        text: 'Information on disease outbreaks abroad reported via merchants, undercover agents, embassies, and customs interrogation.',
        isCorrect: true
      },
      {
        id: 'opt-1b',
        text: 'Russian doctors travelling to western European capitals to study medical treatment for infected patients.',
        isCorrect: false
      },
      {
        id: 'opt-1c',
        text: 'The complete cessation of all commercial trade with European nations.',
        isCorrect: false
      }
    ],
    explanation: '"Systematic intelligence-gathering" matches the multifaceted network of merchants, undercover agents, embassies, and customs officers feeding outbreak reports to the tsar.'
  },
  {
    id: 'para-2',
    questionOrHeading: 'Heading v: Partly successful bans against foreign states affected by plague',
    sourceType: 'Heading',
    questionRef: 'Question 15 (Section B)',
    passageOriginal: 'Tsar Alexei wrote a letter to King Charles II in which he announced the cessation of Russian trade relations with England... These protective measures appeared to have been effective, as the country did not record any cases of plague during that year and in the next three decades. It was not until 1692 that another plague outbreak was recorded...',
    paragraphRef: 'B',
    options: [
      {
        id: 'opt-2a',
        text: 'The total elimination of plague from Russian territory for all subsequent centuries.',
        isCorrect: false
      },
      {
        id: 'opt-2b',
        text: 'Halting trade and barring foreign vessels prevented plague for thirty years, but an epidemic eventually hit Astrakhan in 1692.',
        isCorrect: true
      },
      {
        id: 'opt-2c',
        text: 'English merchants retaliating by declaring naval war against the Russian Baltic fleet.',
        isCorrect: false
      }
    ],
    explanation: '"Partly successful bans" captures both the 30-year effective prevention and the eventual 1692 outbreak in Astrakhan.'
  },
  {
    id: 'para-3',
    questionOrHeading: 'Question 20/21: Spying (Option B)',
    sourceType: 'Multiple Choice',
    questionRef: 'Questions 20 & 21 (Para A)',
    passageOriginal: 'Information on disease outbreak occurring abroad was regularly reported to the tsar\'s court through various means, including ... undercover agents ...',
    paragraphRef: 'A',
    options: [
      {
        id: 'opt-3a',
        text: 'Deploying undercover agents secretly to collect information on overseas epidemics.',
        isCorrect: true
      },
      {
        id: 'opt-3b',
        text: 'Recruiting foreign doctors to work inside the Kremlin hospital.',
        isCorrect: false
      },
      {
        id: 'opt-3c',
        text: 'Exchanging scientific papers with British universities.',
        isCorrect: false
      }
    ],
    explanation: '"Spying" is the exact everyday synonym for utilizing "undercover agents" to secretly observe and report from abroad.'
  },
  {
    id: 'para-4',
    questionOrHeading: 'Question 22/23: Anti-plague measures were generally reactive rather than strategic (Option E)',
    sourceType: 'Multiple Choice',
    questionRef: 'Questions 22 & 23 (Para E)',
    passageOriginal: '... all of the measures had a provisional character: they were intended to respond to a specific outbreak, and were not designed as a coherent set of measures to be implemented systematically at the first sign of plague.',
    paragraphRef: 'E',
    options: [
      {
        id: 'opt-4a',
        text: 'Measures had a provisional character created only for specific crises rather than forming a coherent, systematic framework.',
        isCorrect: true
      },
      {
        id: 'opt-4b',
        text: 'The tsar completely ignored provincial governors during active epidemics.',
        isCorrect: false
      },
      {
        id: 'opt-4c',
        text: 'Troops refused to enforce roadblocks because they sympathized with sick travelers.',
        isCorrect: false
      }
    ],
    explanation: '"Reactive rather than strategic" is an accurate analytical paraphrase for "provisional character: intended to respond to a specific outbreak, and not designed as a coherent set of measures".'
  },
  {
    id: 'para-5',
    questionOrHeading: 'Question 26: Correspondence held over fire prior to copying',
    sourceType: 'Sentence Completion',
    questionRef: 'Question 26 (Para F)',
    passageOriginal: 'Finally, letters brought by couriers were heated above a fire before being copied.',
    paragraphRef: 'F',
    options: [
      {
        id: 'opt-5a',
        text: 'Courier mail was disinfected by exposing it to heat above flames before scribes transcribed it.',
        isCorrect: true
      },
      {
        id: 'opt-5b',
        text: 'Envelopes were immediately immersed in boiling water to kill insects.',
        isCorrect: false
      },
      {
        id: 'opt-5c',
        text: 'All outgoing letters were incinerated without being read.',
        isCorrect: false
      }
    ],
    explanation: '"Correspondence" corresponds to "letters brought by couriers", and "held over a fire" paraphrases "heated above a fire".'
  }
];

export const CONSOLIDATION_COLLOCATION_QUIZ: CollocationQuizItem[] = [
  {
    id: 'colloc-1',
    sentenceWithBlank: 'During the 1710 epidemic, Tsar Peter I ordered his troops to _______ off the entire boundary along the river.',
    targetCollocation: 'cordon off',
    options: ['cordon', 'seal', 'fence', 'lock'],
    correctAnswer: 'cordon',
    paragraphRef: 'D',
    explanation: 'The established phrasal verb is "to cordon off", meaning to set up guards and barriers preventing crossing.'
  },
  {
    id: 'colloc-2',
    sentenceWithBlank: 'In 1665, Tsar Alexei announced the _______ of Russian trade relations with England.',
    targetCollocation: 'cessation of trade',
    options: ['cessation', 'intermission', 'recession', 'destruction'],
    correctAnswer: 'cessation',
    paragraphRef: 'B',
    explanation: '"Cessation of trade relations" is the formal collocation for the complete stoppage of commercial exchange.'
  },
  {
    id: 'colloc-3',
    sentenceWithBlank: 'The tsar court received valuable intelligence through _______ agents deployed in foreign territories.',
    targetCollocation: 'undercover agents',
    options: ['undercover', 'underground', 'underhand', 'understated'],
    correctAnswer: 'undercover',
    paragraphRef: 'A',
    explanation: '"Undercover agents" refers specifically to secret intelligence operatives working covertly.'
  },
  {
    id: 'colloc-4',
    sentenceWithBlank: 'The imperial decrees were _______ enforced, with the death penalty imposed on anyone who disobeyed.',
    targetCollocation: 'rigorously enforced',
    options: ['rigorously', 'critically', 'sharply', 'hardly'],
    correctAnswer: 'rigorously',
    paragraphRef: 'D',
    explanation: '"Rigorously enforced" is the academic collocation describing regulations executed with strict consistency.'
  },
  {
    id: 'colloc-5',
    sentenceWithBlank: 'Early Russian anti-plague procedures had a _______ character, being formulated solely to meet immediate crises.',
    targetCollocation: 'provisional character',
    options: ['provisional', 'conditional', 'occasional', 'regional'],
    correctAnswer: 'provisional',
    paragraphRef: 'E',
    explanation: '"Provisional character" describes policies of an ad-hoc, temporary nature rather than a standardized system.'
  }
];

export const CONSOLIDATION_SENTENCE_SCRAMBLE: SentenceScrambleItem[] = [
  {
    id: 'scramble-1',
    title: 'Inverted Negative Chronology (Paragraph B)',
    grammarNote: 'Construct the "It was not until... that..." sentence describing the 1692 Astrakhan outbreak.',
    paragraphRef: 'B',
    chunks: [
      'It was not until 1692',
      'that another plague outbreak',
      'was recorded in',
      'the Russian province of Astrakhan.',
    ],
    correctOrder: [
      'It was not until 1692',
      'that another plague outbreak',
      'was recorded in',
      'the Russian province of Astrakhan.',
    ],
    fullSentence: 'It was not until 1692 that another plague outbreak was recorded in the Russian province of Astrakhan.'
  },
  {
    id: 'scramble-2',
    title: 'Concessive Contrast of Limitations (Paragraph E)',
    grammarNote: 'Assemble the complex sentence contrasting applied methods with their provisional character.',
    paragraphRef: 'E',
    chunks: [
      'However, although the Russian authorities applied',
      'such methods to contain the spread,',
      'all of the measures had',
      'a provisional character.',
    ],
    correctOrder: [
      'However, although the Russian authorities applied',
      'such methods to contain the spread,',
      'all of the measures had',
      'a provisional character.',
    ],
    fullSentence: 'However, although the Russian authorities applied such methods to contain the spread, all of the measures had a provisional character.'
  },
  {
    id: 'scramble-3',
    title: 'Imperial Quarantine Order (Paragraph F)',
    grammarNote: 'Assemble the passive obligation decree regarding burning contaminated houses.',
    paragraphRef: 'F',
    chunks: [
      'The houses of infected persons',
      'were to be burned along with',
      'all of the personal property',
      'they contained.',
    ],
    correctOrder: [
      'The houses of infected persons',
      'were to be burned along with',
      'all of the personal property',
      'they contained.',
    ],
    fullSentence: 'The houses of infected persons were to be burned along with all of the personal property they contained.'
  }
];

export const AUTHOR_ARGUMENT_FLOW: AuthorStanceItem[] = [
  {
    id: 'flow-A',
    paragraph: 'A',
    topic: '17th-Century Border Intelligence',
    rhetoricalPurpose: 'Introduces the early defensive perimeter strategy: preventing plague importation via systematic foreign surveillance (customs, undercover agents, merchants).',
    discourseSignal: 'In the second half of the seventeenth century... For instance...',
    keyConclusion: 'Russia relied heavily on proactive information gathering from abroad to preempt epidemics.'
  },
  {
    id: 'flow-B',
    paragraph: 'B',
    topic: 'Trade Bans, Port Restrictions & Quarantines',
    rhetoricalPurpose: 'Examines the direct containment actions triggered by reports (suspending relations, banning docking vessels, 1665 England trade halt) and their initial 30-year efficacy before the 1692 Astrakhan epidemic.',
    discourseSignal: 'If news came... For instance... These protective measures appeared to have been effective... It was not until...',
    keyConclusion: 'Trade bans and quarantines were remarkably effective for three decades, showing that physical isolation worked.'
  },
  {
    id: 'flow-C',
    paragraph: 'C',
    topic: 'Plague Transmission via Military Campaigns',
    rhetoricalPurpose: 'Explains how 18th-century warfare (Great Northern War, Poltava, siege of Riga) undermined containment, resulting in devastating troop losses.',
    discourseSignal: 'During the eighteenth century... After defeating... Despite preventive measures... During this period...',
    keyConclusion: 'Military expeditions directly acted as vectors of transmission, causing more casualties than enemy fire.'
  },
  {
    id: 'flow-D',
    paragraph: 'D',
    topic: 'Peter the Great’s Wartime Cordon Sanitaire',
    rhetoricalPurpose: 'Details strict wartime countermeasures instituted by Peter I: sick soldier isolation, dispersed camp layouts, and cordoning the Luga River with checkpoints.',
    discourseSignal: 'Tsar Peter I imposed strict measures... In addition... When plague reached Narva... The tsar\'s orders were rigorously enforced...',
    keyConclusion: 'Strict enforcement with capital punishment was necessary to halt plague spread to the new capital, St. Petersburg.'
  },
  {
    id: 'flow-E',
    paragraph: 'E',
    topic: 'The Limitation: Provisional Nature of Measures',
    rhetoricalPurpose: 'Presents a critical turning point and evaluation: early responses were reactive, ad-hoc, and crisis-specific rather than a coherent institutional system.',
    discourseSignal: 'However, although... all of the measures had a provisional character...',
    keyConclusion: 'Before the late 1720s, Russia lacked a standardized, proactive public health framework.'
  },
  {
    id: 'flow-F',
    paragraph: 'F',
    topic: 'Institutionalization & Decrees after 1728',
    rhetoricalPurpose: 'Chronicles the development of formalized, standardized public health regulations ("Instructions for Governors and Heads of Townships") following the 1727–1728 Astrakhan epidemic.',
    discourseSignal: 'The first attempts to organise procedures... In response to this... Among these decrees... Furthermore... In addition... Finally...',
    keyConclusion: 'Imperial decrees codified a proactive protocol: mandatory Senate notification, 6-week quarantine cordons, incineration of property, and heat disinfection of mail.'
  },
  {
    id: 'flow-G',
    paragraph: 'G',
    topic: 'Author’s Concluding Appraisal',
    rhetoricalPurpose: 'Delivers the overarching conclusion: tsarist authorities exhibited an intuitive empirical understanding of isolation long before modern bacteriology.',
    discourseSignal: 'The implementation by the authorities of these combined measures demonstrates their intuitive understanding...',
    keyConclusion: 'Timely physical isolation of infected populations was the intuitive cornerstone of Russia\'s historical public health success.'
  }
];
