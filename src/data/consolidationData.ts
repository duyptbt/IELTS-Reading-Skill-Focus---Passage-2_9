import {
  LanguageItem,
  GrammarStructureItem,
  ParaphraseTaskItem,
  CollocationQuizItem,
  SentenceScrambleItem,
  AuthorStanceItem,
  SentenceCompletionInsight,
} from '../types';

export const CONSOLIDATION_VOCABULARY: LanguageItem[] = [
  {
    id: 'vocab-1',
    term: 'cordon off',
    partOfSpeech: 'phrasal verb',
    phonetic: '/ˈkɔːrdn ɒf/',
    bandLevel: 'Band 8.0',
    definition: 'To seal or isolate an area with barriers or guards to control or prevent entry and exit.',
    definitionVi: 'Lập hàng rào phong tỏa hoặc rào chắn cách ly một khu vực bằng lính canh để ngăn chặn người ra vào.',
    passageQuote: '... ordered the army to cordon off the entire boundary along the Luga River, including temporarily halting all activity on the river.',
    paragraphRef: 'D',
    collocations: ['cordon off an area', 'cordon off the boundary', 'military cordon'],
    ieltsTip: 'Frequently tested in IELTS Reading texts discussing quarantine, disaster zones, or crime scenes. Recognising that "cordoning off" signifies physical isolation is crucial for Matching Headings.',
    ieltsTipVi: 'Thường xuyên xuất hiện trong các bài đọc IELTS về cách ly dịch bệnh, khu vực thảm họa hoặc an ninh. Nhận biết cụm này mang nghĩa "cách ly vật lý" là chìa khóa giải dạng Matching Headings.',
    category: 'collocation'
  },
  {
    id: 'vocab-2',
    term: 'cessation',
    partOfSpeech: 'noun',
    phonetic: '/seˈseɪʃn/',
    bandLevel: 'Band 8.5+',
    definition: 'The fact or process of ending, terminating, or being brought to a complete stop.',
    definitionVi: 'Sự đình chỉ, chấm dứt hoặc ngừng hoàn toàn một hoạt động hay quan hệ ngoại giao/thương mại.',
    passageQuote: '... announced the cessation of Russian trade relations with England and other foreign states.',
    paragraphRef: 'B',
    collocations: ['cessation of trade', 'cessation of hostilities', 'immediate cessation'],
    ieltsTip: 'Formal academic synonym for "stopping" or "termination". Look for this in questions asking about economic sanctions or trade embargoes.',
    ieltsTipVi: 'Từ đồng nghĩa học thuật trang trọng của "stopping" hoặc "termination". Rất hay gặp trong các câu hỏi về lệnh cấm vận hoặc đình chỉ giao thương quốc tế.',
    category: 'academic-vocab'
  },
  {
    id: 'vocab-3',
    term: 'provisional',
    partOfSpeech: 'adjective',
    phonetic: '/prəˈvɪʒənl/',
    bandLevel: 'Band 7.5',
    definition: 'Arranged or existing for the present, possibly to be changed later; temporary and ad-hoc rather than permanent or systematically designed.',
    definitionVi: 'Mang tính tạm thời, lâm thời, đối phó tình huống trước mắt chứ chưa phải là hệ thống chiến lược lâu dài.',
    passageQuote: '... all of the measures had a provisional character: they were intended to respond to a specific outbreak, and were not designed as a coherent set of measures...',
    paragraphRef: 'E',
    collocations: ['provisional character', 'provisional measure', 'provisional government'],
    ieltsTip: 'Essential clue for Q22–23 and Heading iv: "provisional character" paraphrases "reactive rather than strategic" and "general limitations".',
    ieltsTipVi: 'Manh mối quan trọng cho Q22–23 và Heading iv: "provisional character" chính là sự diễn đạt lại (paraphrase) của "reactive rather than strategic" (đối phó thụ động thay vì chiến lược).',
    category: 'academic-vocab'
  },
  {
    id: 'vocab-4',
    term: 'undercover agent',
    partOfSpeech: 'noun phrase',
    phonetic: '/ˌʌndərˈkʌvər ˈeɪdʒənt/',
    bandLevel: 'Band 7.5',
    definition: 'A spy or operative working secretly using a disguised identity to gather confidential intelligence.',
    definitionVi: 'Điệp viên ngầm, người hoạt động bí mật dưới danh tính giả để thu thập tin tức tình báo.',
    passageQuote: '... undercover agents, the network of Imperial Foreign Office embassies and representations abroad, and the customs offices.',
    paragraphRef: 'A',
    collocations: ['deploy undercover agents', 'undercover investigation', 'intelligence gathering'],
    ieltsTip: 'Direct lexical key for Question 20 (Option B: Spying). Understanding that "undercover agent" implies espionage is key to getting the correct answer.',
    ieltsTipVi: 'Từ khóa trực tiếp cho Question 20 (Option B: Spying). Hiểu được "undercover agent" đồng nghĩa với "gián điệp / do thám" (spying) giúp chọn đáp án nhanh chóng.',
    category: 'collocation'
  },
  {
    id: 'vocab-5',
    term: 'proactive',
    partOfSpeech: 'adjective',
    phonetic: '/prəʊˈæktɪv/',
    bandLevel: 'Band 8.0',
    definition: 'Creating or controlling a situation rather than just reacting to it after it has occurred; taking initiative.',
    definitionVi: 'Chủ động, có tính đón đầu và kiểm soát trước tình huống thay vì bị động chờ sự việc xảy ra mới ứng phó.',
    passageQuote: 'The first attempts to organise procedures and carry out proactive steps to control plague date to the aftermath of the 1727-1728 epidemic in Astrakhan.',
    paragraphRef: 'F',
    collocations: ['proactive steps', 'proactive measures', 'proactive approach'],
    ieltsTip: 'Contrasts directly with "reactive" or "provisional" in Paragraph E. Recognizing this semantic shift helps track the overall progression in the passage.',
    ieltsTipVi: 'Đối lập trực tiếp với "reactive" (thụ động) hoặc "provisional" (tạm thời) ở đoạn E. Nắm được bước chuyển biến ý nghĩa này giúp làm tốt câu hỏi cấu trúc bài đọc.',
    category: 'academic-vocab'
  },
  {
    id: 'vocab-6',
    term: 'ravage',
    partOfSpeech: 'verb',
    phonetic: '/ˈrævɪdʒ/',
    bandLevel: 'Band 8.0',
    definition: 'Cause severe, extensive, and devastating damage to something.',
    definitionVi: 'Tàn phá nặng nề, hoành hành và gây thiệt hại thảm khốc cho một khu vực hoặc cộng đồng.',
    passageQuote: '... a plague outbreak that had ravaged Istanbul spread to the Podolsk and Kiev provinces in Russia...',
    paragraphRef: 'C',
    collocations: ['disease ravages', 'ravaged by war', 'plague ravages a city'],
    ieltsTip: 'Strong descriptive verb used in academic and historical texts for infectious diseases, wars, or natural catastrophes.',
    ieltsTipVi: 'Động từ miêu tả mức độ mạnh hay gặp trong văn phong học thuật và lịch sử khi nói về dịch bệnh hoành hành hoặc chiến tranh tàn phá.',
    category: 'academic-vocab'
  },
  {
    id: 'vocab-7',
    term: 'decree',
    partOfSpeech: 'noun',
    phonetic: '/dɪˈkriː/',
    bandLevel: 'Band 7.5',
    definition: 'An official, legally binding order or directive issued by a legal authority or monarch.',
    definitionVi: 'Sắc lệnh, chỉ dụ pháp lý chính thức do hoàng đế hoặc cơ quan có thẩm quyền ban hành.',
    passageQuote: '... the Russian imperial authorities issued several decrees aimed at controlling the future spread of plague.',
    paragraphRef: 'F',
    collocations: ['issue a decree', 'imperial decree', 'enforce a decree'],
    ieltsTip: 'Signals official government legislation in historical reading passages. Paraphrases "formulation of preventive strategies" in Heading viii.',
    ieltsTipVi: 'Dấu hiệu chỉ các quy định pháp luật hoặc chỉ thị triều đình. Là từ gốc tương đương với "formulation of preventive strategies" trong Heading viii.',
    category: 'academic-vocab'
  },
  {
    id: 'vocab-8',
    term: 'rigorously enforced',
    partOfSpeech: 'verb phrase',
    phonetic: '/ˈrɪɡərəsli ɪnˈfɔːrst/',
    bandLevel: 'Band 8.0',
    definition: 'Carried out or applied with extreme strictness, thoroughness, and penalties for non-compliance.',
    definitionVi: 'Được thực thi một cách nghiêm ngặt, triệt để và có hình phạt nặng cho bất kỳ ai không tuân thủ.',
    passageQuote: "The tsar's orders were rigorously enforced, and those who disobeyed were hung.",
    paragraphRef: 'D',
    collocations: ['rigorously enforced', 'strictly enforced', 'enforce regulations'],
    ieltsTip: 'In Question 22, Option D claims orders were "not strictly implemented". This text directly disproves that distractor.',
    ieltsTipVi: 'Trong câu hỏi 22, phương án gây nhiễu D nói rằng các mệnh lệnh "không được thi hành nghiêm ngặt". Cụm này trong bài bác bỏ hoàn toàn phương án bẫy đó.',
    category: 'collocation'
  },
  {
    id: 'vocab-9',
    term: 'intuitive understanding',
    partOfSpeech: 'noun phrase',
    phonetic: '/ɪnˈtjuːɪtɪv ˌʌndərˈstændɪŋ/',
    bandLevel: 'Band 8.5+',
    definition: 'An innate grasp or insight based on instinctive feeling and empirical observation rather than formal scientific microbial theory.',
    definitionVi: 'Sự hiểu biết trực giác, nhận thức tự nhiên dựa trên quan sát thực nghiệm từ sớm chứ chưa cần đến lý thuyết vi sinh vật học hiện đại.',
    passageQuote: 'The implementation by the authorities of these combined measures demonstrates their intuitive understanding of the importance of the timely isolation of infected people...',
    paragraphRef: 'G',
    collocations: ['intuitive understanding', 'intuitive grasp', 'intuitive knowledge'],
    ieltsTip: 'Shows the author’s concluding appraisal: even before modern germ theory, Russian rulers correctly identified physical quarantine and isolation as the critical mechanism.',
    ieltsTipVi: 'Thể hiện đánh giá đúc kết của tác giả ở đoạn cuối: dù chưa có thuyết vi trùng hiện đại, chính quyền Nga hoàng đã hiểu đúng tầm quan trọng cốt lõi của việc cách ly người bệnh kịp thời.',
    category: 'academic-vocab'
  },
  {
    id: 'vocab-10',
    term: 'besiege',
    partOfSpeech: 'verb',
    phonetic: '/bɪˈsiːdʒ/',
    bandLevel: 'Band 7.5',
    definition: 'Surround a city or fortress with armed forces in order to force its surrender.',
    definitionVi: 'Bao vây, vây hãm một thành phố hoặc pháo đài bằng quân đội để buộc quân địch phải đầu hàng.',
    passageQuote: 'During this period, the Russians besieged Riga and, after the Swedes had surrendered the city in 1710, the Russian army lost 9,800 soldiers to the plague.',
    paragraphRef: 'C',
    collocations: ['besiege a city', 'lay siege to', 'besieging forces'],
    ieltsTip: 'Crucial for military narrative comprehension in historical passages and for understanding the relationship between warfare and epidemics.',
    ieltsTipVi: 'Thuật ngữ quan trọng trong văn bản quân sự lịch sử; giúp hiểu rõ bối cảnh chiến sự tại Riga và mối tương quan giữa chiến dịch bao vây và sự bùng phát dịch bệnh.',
    category: 'academic-vocab'
  }
];

export const CONSOLIDATION_GRAMMAR_STRUCTURES: GrammarStructureItem[] = [
  {
    id: 'struct-1',
    title: 'Negative Restrictive Structure: "It was not until... that..."',
    titleVi: 'Cấu Trúc Giới Hạn Thời Gian Phủ Định: "It was not until... that..." (Mãi cho đến khi...)',
    structurePattern: 'It was not until [Time / Event] that [Subject + Verb in affirmative past]',
    passageExample: 'It was not until 1692 that another plague outbreak was recorded in the Russian province of Astrakhan.',
    paragraphRef: 'B',
    simplifiedParaphrase: 'No other plague outbreak happened before 1692; Astrakhan in 1692 was the very first recorded case after a thirty-year gap.',
    simplifiedParaphraseVi: 'Không có bất kỳ đợt dịch hạch nào xảy ra trước năm 1692; đợt dịch tại Astrakhan năm 1692 chính là ca bệnh đầu tiên được ghi nhận sau khoảng lặng suốt 30 năm.',
    ieltsReadingFunction: 'Used by academic writers to highlight delayed milestones, long periods of stability, or chronological thresholds. Crucial for timeline questions.',
    ieltsReadingFunctionVi: 'Được các tác giả học thuật dùng để nhấn mạnh mốc thời gian diễn ra một sự việc muộn màng sau thời gian dài ổn định. Rất quan trọng cho các câu hỏi về dòng thời gian.',
    practiceTip: 'When you spot "It was not until X that Y", remember that Y did NOT happen at all during the period preceding X.',
    practiceTipVi: 'Khi gặp mẫu "It was not until X that Y", hãy luôn nhớ rằng Y HOÀN TOÀN KHÔNG xảy ra trong suốt khoảng thời gian trước thời điểm X.'
  },
  {
    id: 'struct-2',
    title: 'Concessive Clause of Contrast: "Although..., [Main Clause]"',
    titleVi: 'Mệnh Đề Nhượng Bộ Tương Phản: "Although..., [Main Clause]" (Mặc dù..., [Mệnh đề chính mang ý trọng tâm])',
    structurePattern: 'Although + [Subordinate Clause of Reality], [Main Clause Highlighting Key Limitation / Contrast]',
    passageExample: 'However, although the Russian authorities applied such methods to contain the spread of the disease and limit the number of victims, all of the measures had a provisional character...',
    paragraphRef: 'E',
    simplifiedParaphrase: 'While authorities did implement various containment tactics, the critical takeaway is that their methods were merely temporary reactions rather than a unified plan.',
    simplifiedParaphraseVi: 'Mặc dù chính quyền có áp dụng các biện pháp dập dịch, thông điệp then chốt của tác giả là các biện pháp đó chỉ mang tính tình thế đối phó chứ chưa phải kế hoạch tổng thể.',
    ieltsReadingFunction: 'Writers use concessive clauses to acknowledge positive efforts while steering the reader toward the true analytical conclusion or limitation in the main clause.',
    ieltsReadingFunctionVi: 'Tác giả công nhận nỗ lực tích cực ở mệnh đề phụ nhưng chuyển hướng người đọc sang kết luận phân tích hoặc hạn chế cốt lõi nằm ở mệnh đề chính.',
    practiceTip: 'In IELTS Matching Headings and True/False/Not Given, the main clause after "although" contains the controlling thought for the paragraph.',
    practiceTipVi: 'Trong bài Matching Headings hoặc True/False/Not Given, mệnh đề chính sau "although" luôn chứa ý tưởng điều hướng (controlling idea) của đoạn văn.'
  },
  {
    id: 'struct-3',
    title: 'Passive Administrative Mandates: "Subject + were to be + Past Participle"',
    titleVi: 'Mệnh Lệnh Hành Chính Bị Động: "Subject + were to be + V-ed/P2" (Quy định bắt buộc phải...)',
    structurePattern: 'Subject + were to be + Past Participle [expressing formal imperial instruction or future obligation]',
    passageExample: 'The houses of infected persons were to be burned along with all of the personal property they contained, including farm animals and cattle.',
    paragraphRef: 'F',
    simplifiedParaphrase: 'Imperial orders required that the homes and belongings of all infected persons must be incinerated.',
    simplifiedParaphraseVi: 'Mệnh lệnh triều đình bắt buộc nhà cửa và tài sản của tất cả người nhiễm bệnh phải bị thiêu rụi hoàn toàn.',
    ieltsReadingFunction: 'Expresses historical laws, regulations, and decrees where the agent (imperial decree) establishes universal requirements.',
    ieltsReadingFunctionVi: 'Diễn đạt các luật lệ, sắc lệnh lịch sử mang tính bắt buộc thi hành tuyệt đối.',
    practiceTip: 'Key for Sentence Completion tasks (Questions 25–26) where actions ordered by decrees are tested.',
    practiceTipVi: 'Cốt lõi cho dạng Sentence Completion (Questions 25–26) khi đề thi kiểm tra các hành động được quy định theo sắc lệnh.'
  },
  {
    id: 'struct-4',
    title: 'Comparative Statistical Consequence: "More X than Y"',
    titleVi: 'So Sánh Hệ Quả Thống Kê: "More X than Y" (Nhiều X hơn Y)',
    structurePattern: 'More [Noun / Group A] + Verb + than [Group B / Source B]',
    passageExample: '... more soldiers died of the disease after the capture of Riga than from enemy fire during the siege of that city.',
    paragraphRef: 'C',
    simplifiedParaphrase: 'The plague caused more fatalities among Russian troops in Riga than direct combat with Swedish artillery and weapons.',
    simplifiedParaphraseVi: 'Dịch hạch đã cướp đi sinh mạng của nhiều binh lính Nga tại Riga hơn là hỏa lực trực tiếp của đối phương trong chiến dịch bao vây.',
    ieltsReadingFunction: 'Contrasts two rival causes of mortality. Test creators often invert these quantities to craft subtle multiple-choice traps.',
    ieltsReadingFunctionVi: 'Đối chiếu hai nguyên nhân gây tử vong. Người ra đề IELTS thường đảo ngược hai vế so sánh này để tạo bẫy trắc nghiệm.',
    practiceTip: 'Look closely at Question 22 Option B: "Military casualties at Riga exceeded the number of plague victims." The passage proves the exact reverse.',
    practiceTipVi: 'Xem kỹ phương án gây nhiễu B trong Question 22: "Tổn thất quân sự vượt quá số nạn nhân dịch hạch". Đoạn văn chứng minh điều hoàn toàn ngược lại.'
  }
];

export const CONSOLIDATION_PARAPHRASE_TASKS: ParaphraseTaskItem[] = [
  {
    id: 'para-1',
    questionOrHeading: 'Heading ii: Systematic intelligence-gathering about external cases of plague',
    questionOrHeadingVi: 'Tiêu đề ii: Thu thập thông tin tình báo có hệ thống về các ca dịch bệnh bên ngoài',
    sourceType: 'Heading',
    questionRef: 'Question 14 (Section A)',
    passageOriginal: "Information on disease outbreak occurring abroad was regularly reported to the tsar's court through various means, including commercial channels (travelling merchants), military personnel deployed abroad, undercover agents, the network of Imperial Foreign Office embassies and representations abroad, and the customs offices.",
    paragraphRef: 'A',
    options: [
      {
        id: 'opt-1a',
        text: 'Information on disease outbreaks abroad reported via merchants, undercover agents, embassies, and customs interrogation.',
        textVi: 'Thông tin về bùng phát dịch bệnh ở nước ngoài được báo cáo qua thương gia, điệp viên ngầm, đại sứ quán và thẩm vấn hải quan.',
        isCorrect: true
      },
      {
        id: 'opt-1b',
        text: 'Russian doctors travelling to western European capitals to study medical treatment for infected patients.',
        textVi: 'Các bác sĩ Nga đi đến các thủ đô Tây Âu để nghiên cứu phương pháp điều trị cho bệnh nhân nhiễm bệnh.',
        isCorrect: false
      },
      {
        id: 'opt-1c',
        text: 'The complete cessation of all commercial trade with European nations.',
        textVi: 'Việc đình chỉ hoàn toàn mọi hoạt động thương mại với các quốc gia châu Âu.',
        isCorrect: false
      }
    ],
    explanation: '"Systematic intelligence-gathering" matches the multifaceted network of merchants, undercover agents, embassies, and customs officers feeding outbreak reports to the tsar.',
    explanationVi: '"Thu thập thông tin tình báo có hệ thống" khớp chính xác với mạng lưới nhiều kênh gồm thương nhân, điệp viên bí mật, sứ quán và hải quan báo cáo dịch cho Sa hoàng.'
  },
  {
    id: 'para-2',
    questionOrHeading: 'Heading v: Partly successful bans against foreign states affected by plague',
    questionOrHeadingVi: 'Tiêu đề v: Lệnh cấm vận thành công một phần đối với các quốc gia bị ảnh hưởng bởi dịch hạch',
    sourceType: 'Heading',
    questionRef: 'Question 15 (Section B)',
    passageOriginal: 'Tsar Alexei wrote a letter to King Charles II in which he announced the cessation of Russian trade relations with England... These protective measures appeared to have been effective, as the country did not record any cases of plague during that year and in the next three decades. It was not until 1692 that another plague outbreak was recorded...',
    paragraphRef: 'B',
    options: [
      {
        id: 'opt-2a',
        text: 'The total elimination of plague from Russian territory for all subsequent centuries.',
        textVi: 'Việc xóa sổ hoàn toàn bệnh dịch hạch khỏi lãnh thổ Nga trong tất cả các thế kỷ tiếp theo.',
        isCorrect: false
      },
      {
        id: 'opt-2b',
        text: 'Halting trade and barring foreign vessels prevented plague for thirty years, but an epidemic eventually hit Astrakhan in 1692.',
        textVi: 'Ngừng thương mại và chặn tàu nước ngoài đã ngăn được dịch trong 30 năm, nhưng dịch bệnh cuối cùng lại tấn công Astrakhan vào năm 1692.',
        isCorrect: true
      },
      {
        id: 'opt-2c',
        text: 'English merchants retaliating by declaring naval war against the Russian Baltic fleet.',
        textVi: 'Các thương nhân người Anh trả đũa bằng cách tuyên bố chiến tranh trên biển chống lại hạm đội Baltic của Nga.',
        isCorrect: false
      }
    ],
    explanation: '"Partly successful bans" captures both the 30-year effective prevention and the eventual 1692 outbreak in Astrakhan.',
    explanationVi: '"Lệnh cấm thành công một phần" thâu tóm cả hai khía cạnh: ngăn chặn dịch hiệu quả trong 30 năm nhưng cuối cùng dịch vẫn tái phát tại Astrakhan năm 1692.'
  },
  {
    id: 'para-3',
    questionOrHeading: 'Question 20/21: Spying (Option B)',
    questionOrHeadingVi: 'Câu 20/21: Hoạt động do thám / điệp viên (Phương án B)',
    sourceType: 'Multiple Choice',
    questionRef: 'Questions 20 & 21 (Para A)',
    passageOriginal: 'Information on disease outbreak occurring abroad was regularly reported to the tsar\'s court through various means, including ... undercover agents ...',
    paragraphRef: 'A',
    options: [
      {
        id: 'opt-3a',
        text: 'Deploying undercover agents secretly to collect information on overseas epidemics.',
        textVi: 'Triển khai các điệp viên hoạt động bí mật để thu thập thông tin về dịch bệnh ở nước ngoài.',
        isCorrect: true
      },
      {
        id: 'opt-3b',
        text: 'Recruiting foreign doctors to work inside the Kremlin hospital.',
        textVi: 'Tuyển dụng các bác sĩ nước ngoài đến làm việc tại bệnh viện điện Kremlin.',
        isCorrect: false
      },
      {
        id: 'opt-3c',
        text: 'Exchanging scientific papers with British universities.',
        textVi: 'Trao đổi các tài liệu nghiên cứu khoa học với các trường đại học của Anh.',
        isCorrect: false
      }
    ],
    explanation: '"Spying" is the exact everyday synonym for utilizing "undercover agents" to secretly observe and report from abroad.',
    explanationVi: '"Spying" là từ đồng nghĩa phổ biến của việc sử dụng "undercover agents" (điệp viên ngầm) để bí mật thu thập tin tức ở nước ngoài.'
  },
  {
    id: 'para-4',
    questionOrHeading: 'Question 22/23: Anti-plague measures were generally reactive rather than strategic (Option E)',
    questionOrHeadingVi: 'Câu 22/23: Các biện pháp chống dịch mang tính đối phó thụ động hơn là chiến lược (Phương án E)',
    sourceType: 'Multiple Choice',
    questionRef: 'Questions 22 & 23 (Para E)',
    passageOriginal: '... all of the measures had a provisional character: they were intended to respond to a specific outbreak, and were not designed as a coherent set of measures to be implemented systematically at the first sign of plague.',
    paragraphRef: 'E',
    options: [
      {
        id: 'opt-4a',
        text: 'Measures had a provisional character created only for specific crises rather than forming a coherent, systematic framework.',
        textVi: 'Các biện pháp mang tính tình thế lâm thời cho từng đợt dịch cụ thể chứ chưa tạo thành hệ thống chiến lược bài bản.',
        isCorrect: true
      },
      {
        id: 'opt-4b',
        text: 'The tsar completely ignored provincial governors during active epidemics.',
        textVi: 'Sa hoàng hoàn toàn phớt lờ các thống đốc tỉnh trong các đợt bùng phát dịch.',
        isCorrect: false
      },
      {
        id: 'opt-4c',
        text: 'Troops refused to enforce roadblocks because they sympathized with sick travelers.',
        textVi: 'Binh lính từ chối dựng trạm kiểm soát vì đồng cảm với những người lữ hành bị ốm.',
        isCorrect: false
      }
    ],
    explanation: '"Reactive rather than strategic" is an accurate analytical paraphrase for "provisional character: intended to respond to a specific outbreak, and not designed as a coherent set of measures".',
    explanationVi: '"Reactive rather than strategic" chính là sự diễn đạt lại chuẩn xác của "provisional character: intended to respond to a specific outbreak, and not designed as a coherent set of measures".'
  },
  {
    id: 'para-5',
    questionOrHeading: 'Question 26: Correspondence held over fire prior to copying',
    questionOrHeadingVi: 'Câu 26: Thư từ được hơ trên lửa trước khi sao chép',
    sourceType: 'Sentence Completion',
    questionRef: 'Question 26 (Para F)',
    passageOriginal: 'Finally, letters brought by couriers were heated above a fire before being copied.',
    paragraphRef: 'F',
    options: [
      {
        id: 'opt-5a',
        text: 'Courier mail was disinfected by exposing it to heat above flames before scribes transcribed it.',
        textVi: 'Thư từ do giao liên mang đến được khử trùng bằng nhiệt trên ngọn lửa trước khi người chép thư sao chép lại.',
        isCorrect: true
      },
      {
        id: 'opt-5b',
        text: 'Envelopes were immediately immersed in boiling water to kill insects.',
        textVi: 'Các phong bì thư được nhúng ngay vào nước sôi để diệt côn trùng.',
        isCorrect: false
      },
      {
        id: 'opt-5c',
        text: 'All outgoing letters were incinerated without being read.',
        textVi: 'Tất cả thư gửi đi đều bị đốt cháy mà không hề được đọc.',
        isCorrect: false
      }
    ],
    explanation: '"Correspondence" corresponds to "letters brought by couriers", and "held over a fire" paraphrases "heated above a fire".',
    explanationVi: '"Correspondence" tương ứng với "letters brought by couriers", và "held over a fire" diễn đạt lại cụm "heated above a fire".'
  }
];

export const CONSOLIDATION_COLLOCATION_QUIZ: CollocationQuizItem[] = [
  {
    id: 'colloc-1',
    sentenceWithBlank: 'During the 1710 epidemic, Tsar Peter I ordered his troops to _______ off the entire boundary along the river.',
    sentenceWithBlankVi: 'Trong đợt dịch năm 1710, Sa hoàng Peter I đã ra lệnh cho quân đội _______ toàn bộ ranh giới dọc theo con sông.',
    targetCollocation: 'cordon off',
    options: ['cordon', 'seal', 'fence', 'lock'],
    correctAnswer: 'cordon',
    paragraphRef: 'D',
    explanation: 'The established phrasal verb is "to cordon off", meaning to set up guards and barriers preventing crossing.',
    explanationVi: 'Cụm động từ cố định là "cordon off", có nghĩa là dựng rào chắn và lính canh để ngăn chặn người qua lại.'
  },
  {
    id: 'colloc-2',
    sentenceWithBlank: 'In 1665, Tsar Alexei announced the _______ of Russian trade relations with England.',
    sentenceWithBlankVi: 'Năm 1665, Sa hoàng Alexei tuyên bố _______ quan hệ thương mại của Nga với nước Anh.',
    targetCollocation: 'cessation of trade',
    options: ['cessation', 'intermission', 'recession', 'destruction'],
    correctAnswer: 'cessation',
    paragraphRef: 'B',
    explanation: '"Cessation of trade relations" is the formal collocation for the complete stoppage of commercial exchange.',
    explanationVi: '"Cessation of trade relations" là cụm kết hợp từ trang trọng chỉ việc đình chỉ hoàn toàn quan hệ giao thương.'
  },
  {
    id: 'colloc-3',
    sentenceWithBlank: 'The tsar court received valuable intelligence through _______ agents deployed in foreign territories.',
    sentenceWithBlankVi: 'Triều đình Sa hoàng nhận được tin tức tình báo quý giá thông qua các điệp viên _______ được triển khai tại nước ngoài.',
    targetCollocation: 'undercover agents',
    options: ['undercover', 'underground', 'underhand', 'understated'],
    correctAnswer: 'undercover',
    paragraphRef: 'A',
    explanation: '"Undercover agents" refers specifically to secret intelligence operatives working covertly.',
    explanationVi: '"Undercover agents" là cụm từ chuyên chỉ các điệp viên hoạt động bí mật dưới danh tính ngụy trang.'
  },
  {
    id: 'colloc-4',
    sentenceWithBlank: 'The imperial decrees were _______ enforced, with the death penalty imposed on anyone who disobeyed.',
    sentenceWithBlankVi: 'Các sắc lệnh triều đình được thực thi một cách _______, với án tử hình dành cho bất kỳ ai không tuân lệnh.',
    targetCollocation: 'rigorously enforced',
    options: ['rigorously', 'critically', 'sharply', 'hardly'],
    correctAnswer: 'rigorously',
    paragraphRef: 'D',
    explanation: '"Rigorously enforced" is the academic collocation describing regulations executed with strict consistency.',
    explanationVi: '"Rigorously enforced" là cụm học thuật diễn tả các quy định được thực hiện triệt để, nghiêm ngặt.'
  },
  {
    id: 'colloc-5',
    sentenceWithBlank: 'Early Russian anti-plague procedures had a _______ character, being formulated solely to meet immediate crises.',
    sentenceWithBlankVi: 'Các quy trình chống dịch hạch ban đầu của Nga mang tính chất _______, chỉ được đề ra để giải quyết các cuộc khủng hoảng trước mắt.',
    targetCollocation: 'provisional character',
    options: ['provisional', 'conditional', 'occasional', 'regional'],
    correctAnswer: 'provisional',
    paragraphRef: 'E',
    explanation: '"Provisional character" describes policies of an ad-hoc, temporary nature rather than a standardized system.',
    explanationVi: '"Provisional character" miêu tả tính chất tạm thời, mang tính chắp vá đối phó hơn là hệ thống quy chuẩn.'
  }
];

export const CONSOLIDATION_SENTENCE_SCRAMBLE: SentenceScrambleItem[] = [
  {
    id: 'scramble-1',
    title: 'Inverted Negative Chronology (Paragraph B)',
    titleVi: 'Cấu Trúc Thời Gian Phủ Định Nhấn Mạnh (Đoạn B)',
    grammarNote: 'Construct the "It was not until... that..." sentence describing the 1692 Astrakhan outbreak.',
    grammarNoteVi: 'Sắp xếp cấu trúc "It was not until... that..." miêu tả đợt dịch tại Astrakhan năm 1692.',
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
    fullSentence: 'It was not until 1692 that another plague outbreak was recorded in the Russian province of Astrakhan.',
    fullSentenceVi: 'Mãi cho đến năm 1692, một đợt bùng phát dịch hạch khác mới được ghi nhận tại tỉnh Astrakhan của Nga.'
  },
  {
    id: 'scramble-2',
    title: 'Concessive Contrast of Limitations (Paragraph E)',
    titleVi: 'Mệnh Đề Tương Phản Nhượng Bộ Về Hạn Chế (Đoạn E)',
    grammarNote: 'Assemble the complex sentence contrasting applied methods with their provisional character.',
    grammarNoteVi: 'Ghép câu phức thể hiện sự tương phản giữa biện pháp thực tế và tính chất tạm thời của chúng.',
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
    fullSentence: 'However, although the Russian authorities applied such methods to contain the spread, all of the measures had a provisional character.',
    fullSentenceVi: 'Tuy nhiên, mặc dù chính quyền Nga đã áp dụng các phương pháp như vậy để ngăn chặn sự lây lan, tất cả các biện pháp đều mang tính chất tạm thời.'
  },
  {
    id: 'scramble-3',
    title: 'Imperial Quarantine Order (Paragraph F)',
    titleVi: 'Chỉ Dụ Cách Ly Của Triều Đình (Đoạn F)',
    grammarNote: 'Assemble the passive obligation decree regarding burning contaminated houses.',
    grammarNoteVi: 'Ghép mệnh đề mệnh lệnh bị động quy định việc tiêu hủy nhà cửa của người nhiễm dịch.',
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
    fullSentence: 'The houses of infected persons were to be burned along with all of the personal property they contained.',
    fullSentenceVi: 'Nhà cửa của những người nhiễm bệnh phải bị thiêu rụi cùng với tất cả tài sản cá nhân bên trong.'
  }
];

// Deep Insight into How to Answer Sentence Completion Questions Effectively
export const SENTENCE_COMPLETION_INSIGHTS: SentenceCompletionInsight = {
  coreRules: [
    {
      rule: 'Exact Words Directly From the Passage',
      ruleVi: 'Trích Xuất Nguyên Văn Từ Bài Đọc',
      description: 'Never alter the grammatical ending, tense, singular/plural form, or part of speech of words taken from the text. IELTS Reading test software marks your answer against strict strings from the text.',
      descriptionVi: 'Tuyệt đối không biến đổi đuôi từ, thì, dạng số ít/số nhiều hoặc từ loại của từ vựng trích xuất. Hệ thống chấm IELTS chỉ chấp nhận chuỗi ký tự chính xác có mặt trong bài đọc.',
      badge: 'Golden Rule #1'
    },
    {
      rule: 'Strict Word Limit Adherence',
      ruleVi: 'Tuân Thủ Giới Hạn Số Từ Tuyệt Đối',
      description: 'When instructions state "NO MORE THAN TWO WORDS", writing three words is an automatic zero, even if your answer contains the core concept.',
      descriptionVi: 'Khi đề bài yêu cầu "NO MORE THAN TWO WORDS", câu trả lời 3 từ sẽ bị chấm 0 điểm ngay lập tức, bất kể bạn có chứa từ khóa đúng hay không.',
      badge: 'Golden Rule #2'
    },
    {
      rule: 'Linear Chronological Flow in Text',
      ruleVi: 'Trình Tự Tuyến Tính Theo Dòng Bài Đọc',
      description: 'Sentence Completion questions follow the linear sequence of the passage. Question 24 appears first in Section F, followed immediately by Question 25, and finally Question 26.',
      descriptionVi: 'Các câu hỏi dạng Hoàn thành câu luôn xuất hiện theo trình tự thời gian/văn bản từ trên xuống dưới. Câu 24 xuất hiện trước trong Đoạn F, tiếp theo là câu 25 và cuối cùng là câu 26.',
      badge: 'Golden Rule #3'
    },
    {
      rule: '100% Grammatical & Syntactic Harmony',
      ruleVi: 'Hòa Hợp Ngữ Pháp & Cú Pháp Tuyệt Đối',
      description: 'The completed sentence must make flawless grammatical sense: correct subject-verb agreement, suitable prepositions, and natural collocations without duplicate articles.',
      descriptionVi: 'Câu sau khi điền phải hoàn chỉnh về mặt ngữ pháp: đúng sự hòa hợp chủ-vị, giới từ phù hợp và không bao giờ bị lặp mạo từ (a/an/the) với đề bài.',
      badge: 'Golden Rule #4'
    }
  ],
  fourStepStrategy: [
    {
      step: 1,
      title: 'Grammatical Forecasting & Part-of-Speech Prediction',
      titleVi: 'Phân Tích Ngữ Pháp & Dự Đoán Từ Loại Trước Khi Đọc',
      summary: 'Inspect the immediate environment around the blank to predict the required part of speech, countability, and semantic role.',
      summaryVi: 'Kiểm tra kỹ các từ đứng ngay trước và sau chỗ trống để xác định chính xác từ loại, số ít/số nhiều và trường nghĩa cần điền.',
      details: [
        'Articles: If preceded by "a", you MUST find a singular countable noun starting with a consonant sound (e.g. Q24: "create a [cordon sanitaire]").',
        'Quantifiers: Words like "any" or "all" signal either plural countable nouns or uncountable mass nouns (e.g. Q25: "any [farm animals]").',
        'Prepositions: Prepositions like "above a...", "around...", "by..." define the physical or relational orientation of the target noun.',
        'Semantic Category: Decide whether the answer is an object, person, policy, animal, or chemical substance.'
      ],
      detailsVi: [
        'Mạo từ: Nếu đứng sau "a", chỗ trống BẮT BUỘC là danh từ đếm được số ít phát âm bằng phụ âm (ví dụ Q24: "create a [cordon sanitaire]").',
        'Lượng từ: Từ như "any" hoặc "all" báo hiệu danh từ đếm được số nhiều hoặc không đếm được (ví dụ Q25: "any [farm animals]").',
        'Giới từ: Các giới từ như "above a...", "around...", "along with..." khoanh vùng quan hệ không gian hoặc bổ trợ của danh từ mục tiêu.',
        'Trường nghĩa: Xác định trước từ cần điền là đồ vật, con người, chính sách, động vật hay hành động.'
      ],
      proTip: 'Write the grammar tag right beside the blank (e.g., "(N) sing" or "(N) plur") before scanning the passage.',
      proTipVi: 'Ghi chú ký hiệu ngữ pháp ngay cạnh chỗ trống (ví dụ: "(N) số ít" hoặc "(N) số nhiều") trước khi quay lại bài đọc.'
    },
    {
      step: 2,
      title: 'Anchor vs. Paraphrasable Keyword Demarcation',
      titleVi: 'Phân Định Từ Khóa Cố Định & Từ Khóa Bị Diễn Đạt Lại',
      summary: 'Separate immutable scanning anchors (dates, proper nouns) from flexible words that test creators deliberately paraphrase.',
      summaryVi: 'Tách biệt giữa các từ khóa bất biến (năm, địa danh, tên riêng) và các từ linh hoạt chắc chắn sẽ bị diễn đạt lại (paraphrase).',
      details: [
        'Anchor Keywords (Scanning Beacons): Numbers, years ("1728"), capitalised proper names ("Astrakhan", "Senate", "Peter I"). These never change and allow you to jump straight to the exact paragraph in 3 seconds.',
        'Paraphrasable Keywords: Verbs, adjectives, and abstract nouns in the question. Anticipate their synonyms before scanning: "order" -> "instruction / decree", "disease transmission" -> "spread", "postal communications" -> "letters brought by couriers".',
        'Look for structural parallelisms: Passive structures in questions often reflect active constructions in the text and vice-versa.'
      ],
      detailsVi: [
        'Từ khóa Cố định (Đèn hoa tiêu quét bài): Năm ("1728"), địa danh viết hoa ("Astrakhan", "Luga River"). Những từ này không bao giờ thay đổi và giúp bạn tìm đúng đoạn trong 3 giây.',
        'Từ khóa Bị Paraphrase: Động từ, tính từ và danh từ chung. Hãy chủ động lường trước từ đồng nghĩa: "order" -> "decree / instruction", "postal communications" -> "letters brought by couriers", "heated" -> "held over".',
        'Chú ý cấu trúc đối xứng: Câu hỏi thể bị động thường được diễn đạt lại từ câu chủ động trong bài đọc.'
      ],
      proTip: 'Never scan for common words like "disease" or "people" which appear 50 times in historical passages; always anchor on unique dates or specific nouns.',
      proTipVi: 'Đừng bao giờ quét các từ chung chung như "disease" hay "people" xuất hiện hàng chục lần; luôn lấy năm (1728) hoặc danh từ độc nhất làm mỏ neo.'
    },
    {
      step: 3,
      title: 'Zone Scanning & Syntactic Boundary Mapping',
      titleVi: 'Quét Vùng Thông Tin & Khớp Nối Cú Pháp Chuẩn Xác',
      summary: 'Locate the exact sentence in the target section and compare its grammatical skeleton with the test prompt.',
      summaryVi: 'Xác định chính xác câu chứa thông tin trong đoạn và so khớp khung xương ngữ pháp giữa câu hỏi và bài đọc.',
      details: [
        'Find the Anchor Sentence: In Section F, locate the sentence starting with "In response to this outbreak, in 1728...".',
        'Align the Clauses: Match the subordinate and main clauses between the prompt and the passage.',
        'Isolate the Target Word: Strip away the surrounding parallel words to reveal the solitary piece of missing information.'
      ],
      detailsVi: [
        'Tìm câu chứa từ neo: Trong Đoạn F, tìm câu mở đầu với "In response to this outbreak, in 1728...".',
        'So khớp các vế câu: Đối chiếu mệnh đề chính và mệnh đề phụ giữa đề bài và văn bản gốc.',
        'Cô lập từ mục tiêu: Bỏ qua các từ đồng nghĩa xung quanh để làm lộ diện mảnh ghép duy nhất còn thiếu.'
      ],
      proTip: 'If two sentences both seem relevant, remember that Sentence Completion questions in Passage 2 test explicit facts, not ambiguous interpretations.',
      proTipVi: 'Nếu có 2 câu có vẻ liên quan, hãy nhớ rằng dạng điền từ kiểm tra sự thật hiển ngôn trong bài chứ không suy đoán mơ hồ.'
    },
    {
      step: 4,
      title: 'Verification & The Triple-Audit Checklist',
      titleVi: 'Kiểm Tra Hoàn Tất Với Bảng Kiểm 3 Bước',
      summary: 'Before confirming your answer, run through the triple-audit checklist to eliminate the most common Band 6/7 careless mistakes.',
      summaryVi: 'Trước khi chốt đáp án, hãy chạy nhanh bảng kiểm 3 bước để loại bỏ toàn bộ các lỗi bất cẩn khiến bạn mất điểm.',
      details: [
        'Audit 1 (Word Count): Is it strictly within the limit (e.g. 1 or 2 words)? Hyphenated words (e.g. "cordon-sanitaire") count as ONE word, but "cordon sanitaire" is TWO words.',
        'Audit 2 (No Duplicate Articles): Did you inadvertently copy "a" from the text when "a" is already in the question?',
        'Audit 3 (Exact Spelling): Did you transcribe every letter faithfully, especially French or foreign loanwords (e.g. "sanitaire" not "sanitary")?'
      ],
      detailsVi: [
        'Kiểm tra 1 (Số lượng từ): Có vượt quá giới hạn (ví dụ tối đa 2 từ)? Từ nối gạch ngang tính là 1 từ, còn "cordon sanitaire" tính là 2 từ (hợp lệ).',
        'Kiểm tra 2 (Không lặp mạo từ): Bạn có vô tình chép cả mạo từ "a" vào chỗ trống trong khi đề bài đã in sẵn "a" không?',
        'Kiểm tra 3 (Chính tả tuyệt đối): Bạn đã sao chép đúng từng chữ cái chưa, nhất là từ mượn gốc tiếng Pháp ("sanitaire" chứ không phải "sanitary")?'
      ],
      proTip: 'Read the completed question sentence in your head. If it sounds clunky, awkward, or syntactically broken, you picked the wrong word form.',
      proTipVi: 'Đọc nhẩm lại toàn bộ câu hỏi đã điền từ. Nếu nghe gượng gạo, sai ngữ pháp hoặc thừa từ, chắc chắn bạn đã điền sai dạng từ.'
    }
  ],
  caseStudies: [
    {
      questionNumber: 24,
      questionPrompt: 'During the 1728 outbreak, provincial governors were ordered to isolate infected villages and create a _______ around them.',
      questionPromptVi: 'Trong đợt bùng phát năm 1728, các thống đốc tỉnh được lệnh cách ly các ngôi làng bị nhiễm bệnh và thiết lập một _______ xung quanh chúng.',
      targetAnswer: 'cordon sanitaire',
      wordCountLimit: 'NO MORE THAN TWO WORDS',
      expectedGrammar: 'Singular countable noun phrase beginning with a consonant, preceded by the article "a".',
      expectedGrammarVi: 'Cụm danh từ đếm được số ít bắt đầu bằng một phụ âm, đứng sau mạo từ "a".',
      passageSentence: 'Among these decrees was an instruction to provincial governors requiring that if an outbreak occurred, the infected village or town should be isolated, and a cordon sanitaire established around it.',
      passageSentenceVi: 'Trong số các sắc lệnh này có một chỉ thị gửi tới các thống đốc tỉnh yêu cầu rằng nếu dịch bệnh bùng phát, ngôi làng hoặc thị trấn bị nhiễm bệnh phải được cách ly và thiết lập một vành đai phòng dịch xung quanh nó.',
      paragraphRef: 'F',
      paraphraseMap: [
        {
          testKeyword: 'During the 1728 outbreak',
          passageMatch: '...the 1727-1728 epidemic in Astrakhan. In response to this outbreak, in 1728...',
          note: 'Anchor date 1728 immediately locks onto Section F lines 1–3.',
          noteVi: 'Từ khóa mốc năm 1728 khóa ngay vùng thông tin tại đầu Đoạn F.'
        },
        {
          testKeyword: 'provincial governors were ordered to',
          passageMatch: '...an instruction to provincial governors requiring that...',
          note: 'Passive "were ordered to" mirrors noun phrase "an instruction... requiring that".',
          noteVi: 'Cấu trúc bị động "were ordered to" diễn đạt lại "an instruction... requiring that".'
        },
        {
          testKeyword: 'create a _______ around them',
          passageMatch: '...and a cordon sanitaire established around it.',
          note: 'Active "create a [Noun]" directly matches passive "a cordon sanitaire established".',
          noteVi: 'Động từ chủ động "create a [N]" tương đương với "a cordon sanitaire established".'
        }
      ],
      criticalTraps: [
        {
          mistake: 'Writing "a cordon sanitaire"',
          mistakeVi: 'Điền "a cordon sanitaire" (thừa mạo từ "a")',
          reason: 'The prompt already provides "create a _______". Writing "a cordon sanitaire" yields "create a a cordon sanitaire". Automatic mark deduction!',
          reasonVi: 'Đề bài đã có sẵn từ "a" trước chỗ trống. Điền thêm "a" sẽ tạo thành câu sai ngữ pháp "create a a cordon sanitaire".'
        },
        {
          mistake: 'Writing "cordon" alone',
          mistakeVi: 'Chỉ điền từ "cordon" đơn độc',
          reason: 'While "cordon" carries partial meaning, the historical decree specifically codified the specialized public health term "cordon sanitaire".',
          reasonVi: 'Dù "cordon" có nghĩa, văn bản gốc dùng chính xác thuật ngữ lịch sử chuyên ngành y tế công cộng là "cordon sanitaire".'
        },
        {
          mistake: 'Anglicizing as "cordon sanitary"',
          mistakeVi: 'Tự ý đổi chính tả sang tiếng Anh "cordon sanitary"',
          reason: 'IELTS candidates must never translate or anglicize words from the text. The passage spells it with French orthography: "sanitaire".',
          reasonVi: 'Thí sinh không bao giờ được tự ý sửa đuôi từ. Bài đọc dùng nguyên văn tiếng Pháp là "sanitaire".'
        }
      ],
      band9Takeaway: 'Notice how the test designers kept the exact words "cordon sanitaire" untouched while paraphrasing everything around it ("established around it" -> "create a _______ around them"). Look for the constant noun phrase amidst paraphrased verbs!',
      band9TakeawayVi: 'Nhận thấy rằng người ra đề giữ nguyên vẹn cụm danh từ "cordon sanitaire" và chỉ paraphrase động từ bao quanh ("established" -> "create"). Hãy tìm kiếm cụm danh từ không đổi nằm giữa các động từ bị paraphrase!'
    },
    {
      questionNumber: 25,
      questionPrompt: 'Decrees stated that the houses of infected people, along with any _______, were to be burned.',
      questionPromptVi: 'Các sắc lệnh quy định rằng nhà của những người nhiễm bệnh, cùng với bất kỳ _______ nào, phải bị thiêu hủy.',
      targetAnswer: 'farm animals (or cattle)',
      wordCountLimit: 'NO MORE THAN TWO WORDS',
      expectedGrammar: 'Plural countable noun or mass noun following the quantifier "any" inside the prepositional phrase "along with any...".',
      expectedGrammarVi: 'Danh từ số nhiều hoặc danh từ tập hợp đứng sau lượng từ "any" trong cụm giới từ "along with any...".',
      passageSentence: 'The houses of infected persons were to be burned along with all of the personal property they contained, including farm animals and cattle.',
      passageSentenceVi: 'Nhà cửa của những người nhiễm bệnh phải bị đốt cháy cùng với tất cả tài sản cá nhân bên trong, bao gồm cả gia súc và súc vật nuôi trong nông trại.',
      paragraphRef: 'F',
      paraphraseMap: [
        {
          testKeyword: 'Decrees stated that',
          passageMatch: 'Among these decrees... were to be...',
          note: 'Paraphrases imperial decrees ordering mandatory procedures.',
          noteVi: 'Diễn đạt lại các sắc lệnh của hoàng gia quy định thủ tục bắt buộc.'
        },
        {
          testKeyword: 'the houses of infected people',
          passageMatch: 'The houses of infected persons',
          note: '"infected people" is a direct synonym for "infected persons".',
          noteVi: '"infected people" là từ đồng nghĩa trực tiếp của "infected persons".'
        },
        {
          testKeyword: 'along with any _______',
          passageMatch: '...along with all of the personal property they contained, including farm animals and cattle.',
          note: 'Prompt asks for the specific subordinate category listed after "including".',
          noteVi: 'Đề bài hỏi danh mục cụ thể được liệt kê sau từ "including".'
        }
      ],
      criticalTraps: [
        {
          mistake: 'Writing "personal property"',
          mistakeVi: 'Điền "personal property"',
          reason: 'In the passage, "personal property" is the overarching category that contained the items. The prompt sentence tests the specific livestock mentioned under "including".',
          reasonVi: 'Trong bài, "personal property" là danh mục bao quát. Đề bài dùng "along with any..." hướng đến đối tượng cụ thể đi kèm (gia súc/vật nuôi).'
        },
        {
          mistake: 'Writing "farm animals and cattle" (4 words)',
          mistakeVi: 'Điền "farm animals and cattle" (4 từ)',
          reason: 'Violates the strict "NO MORE THAN TWO WORDS" instruction! You must write either "farm animals" (2 words) or "cattle" (1 word).',
          reasonVi: 'Vi phạm giới hạn tối đa 2 từ! Thí sinh chỉ được chọn "farm animals" (2 từ) hoặc "cattle" (1 từ).'
        },
        {
          mistake: 'Writing "farm animal" (singular)',
          mistakeVi: 'Viết "farm animal" ở dạng số ít',
          reason: 'Fails to match the plural agreement of "any farm animals" and alters the original text "farm animals".',
          reasonVi: 'Sai dạng số ít/số nhiều và vi phạm nguyên tắc giữ nguyên vẹn từ trong bài đọc.'
        }
      ],
      band9Takeaway: 'When the passage presents an overarching category with an illustrative list ("personal property... including farm animals and cattle"), examine the prompt syntax to pinpoint whether it asks for the category or the exemplars. Here, "farm animals" fits the slot perfectly.',
      band9TakeawayVi: 'Khi bài đọc đưa ra danh mục bao quát đi kèm ví dụ liệt kê ("personal property... including farm animals"), hãy nhìn kỹ cú pháp câu hỏi để biết đề đang hỏi ví dụ cụ thể nào. "farm animals" hoặc "cattle" là đáp án chuẩn xác.'
    },
    {
      questionNumber: 26,
      questionPrompt: 'To prevent the transmission of disease through postal communications, letters were heated above a _______ before being copied.',
      questionPromptVi: 'Để ngăn chặn sự lây lan của bệnh tật qua đường liên lạc bưu chính, các bức thư được hơ nóng trên một _______ trước khi được sao chép.',
      targetAnswer: 'fire',
      wordCountLimit: 'NO MORE THAN TWO WORDS',
      expectedGrammar: 'Singular countable noun preceded by the article "a" and preposition "above".',
      expectedGrammarVi: 'Danh từ đếm được số ít đứng sau mạo từ "a" và giới từ "above".',
      passageSentence: 'Finally, letters brought by couriers were heated above a fire before being copied.',
      passageSentenceVi: 'Cuối cùng, những bức thư do lính chuyển phát nhanh mang đến được hơ nóng trên lửa trước khi sao chép.',
      paragraphRef: 'F',
      paraphraseMap: [
        {
          testKeyword: 'postal communications',
          passageMatch: 'letters brought by couriers',
          note: '"postal communications" elegantly paraphrases mail delivered by official messengers/couriers.',
          noteVi: '"postal communications" (liên lạc bưu chính) diễn đạt lại thư từ do giao liên (couriers) vận chuyển.'
        },
        {
          testKeyword: 'letters were heated above a _______',
          passageMatch: 'letters brought by couriers were heated above a fire',
          note: 'Near-verbatim match for "were heated above a [fire]".',
          noteVi: 'Khớp gần như từng chữ với "were heated above a fire".'
        },
        {
          testKeyword: 'before being copied',
          passageMatch: 'before being copied',
          note: 'Exact, identical match in syntax and wording.',
          noteVi: 'Trùng khớp 100% về cấu trúc và từ ngữ ở vế sau.'
        }
      ],
      criticalTraps: [
        {
          mistake: 'Writing "a fire"',
          mistakeVi: 'Điền "a fire" (lặp mạo từ)',
          reason: 'The prompt already provides "above a _______". Writing "a fire" creates the erroneous string "above a a fire". Automatic zero!',
          reasonVi: 'Đề bài đã có sẵn "above a _______". Điền "a fire" sẽ làm lặp hai mạo từ "a a fire", bị máy tính trừ điểm ngay.'
        },
        {
          mistake: 'Paraphrasing with synonyms like "flame" or "heat source"',
          mistakeVi: 'Tự dùng từ đồng nghĩa như "flame" hay "heat source"',
          reason: 'IELTS Reading tests your ability to extract authentic words, NOT to write your own English vocabulary.',
          reasonVi: 'IELTS Reading kiểm tra khả năng trích xuất từ trong bài đọc, không phải kiểm tra khả năng tự viết từ vựng của bạn.'
        },
        {
          mistake: 'Writing "courier" or "letters"',
          mistakeVi: 'Điền "courier" hoặc "letters"',
          reason: 'Syntactically absurd: "letters were heated above a couriers" makes no grammatical or logical sense.',
          reasonVi: 'Hoàn toàn phi lý về mặt ngữ pháp và ngữ nghĩa: "heated above a couriers".'
        }
      ],
      band9Takeaway: 'The tail of the question ("before being copied") is identical to the passage. When you spot an identical multi-word anchor phrase at the end of a sentence, the blank is virtually guaranteed to sit directly adjacent to it.',
      band9TakeawayVi: 'Đuôi của câu hỏi ("before being copied") giống hệt trong bài đọc. Khi bạn bắt gặp một cụm từ neo nguyên văn ở cuối câu, từ cần điền chắc chắn nằm ngay sát trước nó!'
    }
  ],
  frequentTraps: [
    {
      trapTitle: 'The Duplicate Article Trap',
      trapTitleVi: 'Bẫy Lặp Mạo Từ (a / an / the)',
      trapDescription: 'Students copy the article together with the noun (e.g. writing "a fire" or "a cordon sanitaire") when the prompt sentence already prints the article before the blank.',
      trapDescriptionVi: 'Thí sinh sao chép cả mạo từ đi kèm danh từ (ví dụ viết "a fire" hoặc "a cordon") trong khi đề bài đã in sẵn mạo từ "a" trước chỗ trống.',
      badExample: 'Prompt: "...heated above a _______" -> Student writes: "a fire" (Sentence becomes: "...above a a fire")',
      goodExample: 'Student writes: "fire" (Sentence becomes: "...above a fire")',
      fixStrategy: 'Always read the prompt sentence with your answer inserted aloud or silently in your head. Check if you see two "a"s or "the"s side by side.',
      fixStrategyVi: 'Luôn đọc nhẩm lại câu hoàn chỉnh sau khi điền. Kiểm tra xem có xuất hiện hai chữ "a" hoặc "the" đứng cạnh nhau hay không.'
    },
    {
      trapTitle: 'The Paraphrase-in-the-Answer Trap',
      trapTitleVi: 'Bẫy Tự Ý Đổi Từ (Paraphrase Ngược)',
      trapDescription: 'Some candidates think they should demonstrate their own rich vocabulary by substituting synonyms (e.g. writing "flames" for "fire", or "border" for "boundary"). IELTS Reading requires words directly from the text.',
      trapDescriptionVi: 'Nhiều thí sinh nghĩ rằng cần phô diễn từ vựng bằng cách dùng từ đồng nghĩa của mình (ví dụ viết "flames" thay vì "fire"). IELTS Reading bắt buộc dùng từ nguyên văn.',
      badExample: 'Text says: "heated above a fire" -> Candidate writes: "candle" or "flame"',
      goodExample: 'Candidate copies: "fire"',
      fixStrategy: 'Treat the passage as a closed word bank. If the exact spelling does not appear on the page, it cannot be the answer.',
      fixStrategyVi: 'Coi bài đọc như một kho từ đóng. Nếu từ đó không xuất hiện chính xác từng ký tự trên trang giấy, đó không phải đáp án.'
    },
    {
      trapTitle: 'The Word Limit Exceeded Trap in Lists',
      trapTitleVi: 'Bẫy Quá Số Từ Khi Gặp Danh Sách Liệt Kê',
      trapDescription: 'When the passage presents an "A and B" compound or list, candidates write the entire conjunction, exceeding the word limit.',
      trapDescriptionVi: 'Khi bài đọc liệt kê danh sách "A và B", thí sinh cố chép toàn bộ cả liên từ khiến câu trả lời vượt quá số từ quy định.',
      badExample: 'Prompt says "NO MORE THAN TWO WORDS" -> Student writes: "farm animals and cattle" (4 words)',
      goodExample: 'Student writes: "farm animals" (2 words) or "cattle" (1 word)',
      fixStrategy: 'Count words on your fingers before writing. Compound words without hyphens count as multiple words. Pick the primary noun phrase.',
      fixStrategyVi: 'Đếm số từ cẩn thận trước khi viết. Chọn cụm danh từ trọng tâm nhất hoặc từ đơn đứng đầu danh sách.'
    },
    {
      trapTitle: 'The Inattention to Singular / Plural Form',
      trapTitleVi: 'Bẫy Bất Cẩn Giữa Dạng Số Ít Và Số Nhiều',
      trapDescription: 'Dropping the plural "-s" or "-es" suffix, or adding an unnecessary plural marker, which destroys grammatical agreement with the rest of the question sentence.',
      trapDescriptionVi: 'Bỏ quên đuôi số nhiều "-s" hoặc "-es", hoặc tự ý thêm đuôi khiến câu mất đi sự hòa hợp số ít/số nhiều với động từ hoặc lượng từ đi kèm.',
      badExample: 'Prompt: "...along with any _______" -> Candidate writes: "farm animal" (singular)',
      goodExample: 'Candidate writes: "farm animals" (plural, matching "any" and passage text)',
      fixStrategy: 'Check whether the verb after the blank is singular ("is/was") or plural ("are/were"), and match the exact form from the passage.',
      fixStrategyVi: 'Quan sát động từ đi sau (số ít "was" hay số nhiều "were") hoặc lượng từ đi trước ("any", "many") để đối chiếu chính xác đuôi số nhiều.'
    },
    {
      trapTitle: 'The Preposition Mismatch Trap',
      trapTitleVi: 'Bẫy Lệch Giới Từ & Cụm Kết Hợp Từ',
      trapDescription: 'Failing to notice the preposition following or preceding the blank, resulting in an impossible collocation.',
      trapDescriptionVi: 'Không chú ý giới từ đứng trước hoặc sau chỗ trống dẫn đến kết hợp từ sai hoặc vô nghĩa.',
      badExample: 'Prompt: "...create a _______ around them." Candidate writes: "outbreak"',
      goodExample: 'Candidate writes: "cordon sanitaire" (forming "create a cordon sanitaire around them")',
      fixStrategy: 'Map the preposition in the prompt ("around", "above", "along with") directly to the preposition used in the passage.',
      fixStrategyVi: 'Nối giới từ trong câu hỏi ("around", "above", "along with") thẳng tới giới từ tương ứng trong câu của bài đọc.'
    }
  ]
};

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
