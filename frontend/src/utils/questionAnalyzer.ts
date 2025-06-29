// Question analyzer and enhancer for Telangana State Board curriculum
import { chapterData } from '../data/chapterData';

interface QuestionAnalysis {
  subject: string;
  classLevel: number;
  chapterId: number;
  chapterTitle: string;
  currentQuestions: number;
  needsQuestions: number;
  status: 'complete' | 'needs_more';
}

interface ChapterQuestion {
  question: string;
  options: string[];
  correct: string;
  mapData?: any;
  imageUrl?: string;
}

interface Chapter {
  id: number;
  title: string;
  description: string;
  questions: ChapterQuestion[];
}

/**
 * Analyze all chapters and identify which need more questions
 */
export const analyzeAllChapters = (minQuestions = 25): QuestionAnalysis[] => {
  const analysis: QuestionAnalysis[] = [];
  
  const subjects = ['maths', 'science', 'social', 'mapPointing'];
  const classes = [6, 7, 8, 9, 10];
  
  for (const subject of subjects) {
    for (const classLevel of classes) {
      const subjectData = chapterData[subject as keyof typeof chapterData];
      if (!subjectData) continue;
      
      const classData = subjectData[classLevel as keyof typeof subjectData] as Chapter[];
      if (!classData) continue;
      
      for (const chapter of classData) {
        const currentQuestions = chapter.questions?.length || 0;
        const needsQuestions = Math.max(0, minQuestions - currentQuestions);
        
        analysis.push({
          subject,
          classLevel,
          chapterId: chapter.id,
          chapterTitle: chapter.title,
          currentQuestions,
          needsQuestions,
          status: needsQuestions > 0 ? 'needs_more' : 'complete'
        });
      }
    }
  }
  
  return analysis;
};

/**
 * Generate additional questions for Telangana State Board curriculum
 */
export const generateTelanganaQuestions = (
  subject: string,
  classLevel: number,
  chapterTitle: string,
  chapterDescription: string,
  count: number
): ChapterQuestion[] => {
  const questions: ChapterQuestion[] = [];
  
  // Subject-specific question generators
  switch (subject) {
    case 'maths':
      questions.push(...generateMathsQuestions(classLevel, chapterTitle, count));
      break;
    case 'science':
      questions.push(...generateScienceQuestions(classLevel, chapterTitle, count));
      break;
    case 'social':
      questions.push(...generateSocialQuestions(classLevel, chapterTitle, count));
      break;
    case 'mapPointing':
      questions.push(...generateMapQuestions(classLevel, chapterTitle, count));
      break;
  }
  
  return questions.slice(0, count);
};

/**
 * Generate Mathematics questions for Telangana curriculum
 */
const generateMathsQuestions = (classLevel: number, chapterTitle: string, count: number): ChapterQuestion[] => {
  const questions: ChapterQuestion[] = [];
  
  const mathsTopics = {
    6: {
      'Knowing Our Numbers': [
        { q: 'What is the place value of 8 in 58,347?', o: ['Thousands', 'Ten thousands', 'Hundreds', 'Tens'], c: 'Thousands' },
        { q: 'Which is the smallest 5-digit number?', o: ['10,000', '9,999', '1,000', '99,999'], c: '10,000' },
        { q: 'Round 7,654 to the nearest thousand.', o: ['7,000', '8,000', '7,600', '7,700'], c: '8,000' },
        { q: 'What is the Roman numeral for 500?', o: ['D', 'C', 'M', 'L'], c: 'D' },
        { q: 'Express 3,45,678 in words.', o: ['Three lakh forty-five thousand six hundred seventy-eight', 'Three crore forty-five thousand', 'Thirty-four lakh', 'Three hundred forty-five thousand'], c: 'Three lakh forty-five thousand six hundred seventy-eight' }
      ],
      'Whole Numbers': [
        { q: 'What is the multiplicative identity for whole numbers?', o: ['0', '1', '2', 'None'], c: '1' },
        { q: 'Which property is shown in: 5 × 3 = 3 × 5?', o: ['Associative', 'Commutative', 'Distributive', 'Closure'], c: 'Commutative' },
        { q: 'What is the result of any number multiplied by 1?', o: ['0', '1', 'The number itself', 'Undefined'], c: 'The number itself' },
        { q: 'Which of the following represents the associative property?', o: ['(2 + 3) + 4 = 2 + (3 + 4)', '2 + 3 = 3 + 2', '2 × 1 = 2', '2 + 0 = 2'], c: '(2 + 3) + 4 = 2 + (3 + 4)' },
        { q: 'What is the predecessor of 1,000?', o: ['999', '1,001', '900', '1,100'], c: '999' }
      ],
      'Playing with Numbers': [
        { q: 'What is the LCM of 8 and 12?', o: ['24', '96', '4', '48'], c: '24' },
        { q: 'Which of the following is a composite number?', o: ['7', '11', '15', '13'], c: '15' },
        { q: 'What is the HCF of 18 and 27?', o: ['9', '54', '3', '6'], c: '9' },
        { q: 'A number is divisible by 6 if it is divisible by:', o: ['2 and 3', '2 and 6', '3 and 6', '1 and 6'], c: '2 and 3' },
        { q: 'What is the prime factorization of 24?', o: ['2³ × 3', '2² × 6', '4 × 6', '8 × 3'], c: '2³ × 3' }
      ]
    },
    7: {
      'Integers': [
        { q: 'What is the sum of -15 and 8?', o: ['-7', '7', '-23', '23'], c: '-7' },
        { q: 'Which is greater: -5 or -8?', o: ['-5', '-8', 'They are equal', 'Cannot determine'], c: '-5' },
        { q: 'What is the additive inverse of 12?', o: ['-12', '12', '0', '1/12'], c: '-12' },
        { q: 'What is (-4) × (-6)?', o: ['24', '-24', '10', '-10'], c: '24' },
        { q: 'What is the absolute value of -15?', o: ['15', '-15', '0', '1'], c: '15' }
      ]
    }
  };
  
  const topicQuestions = mathsTopics[classLevel as keyof typeof mathsTopics]?.[chapterTitle as keyof any] || [];
  
  topicQuestions.forEach((item, index) => {
    if (questions.length < count) {
      questions.push({
        question: item.q,
        options: item.o,
        correct: item.c
      });
    }
  });
  
  // Fill remaining with generic questions if needed
  while (questions.length < count) {
    questions.push({
      question: `What is an important concept in Class ${classLevel} ${chapterTitle}?`,
      options: ['Basic principles', 'Advanced concepts', 'Problem solving', 'All of the above'],
      correct: 'All of the above'
    });
  }
  
  return questions;
};

/**
 * Generate Science questions for Telangana curriculum
 */
const generateScienceQuestions = (classLevel: number, chapterTitle: string, count: number): ChapterQuestion[] => {
  const questions: ChapterQuestion[] = [];
  
  const scienceTopics = {
    6: {
      'Food: Where Does it Come From?': [
        { q: 'Which part of the plant do we eat in potato?', o: ['Root', 'Stem', 'Leaf', 'Fruit'], c: 'Stem' },
        { q: 'Honey is produced by which insect?', o: ['Butterfly', 'Bee', 'Ant', 'Mosquito'], c: 'Bee' },
        { q: 'Which of these is a carnivorous animal?', o: ['Cow', 'Lion', 'Deer', 'Elephant'], c: 'Lion' },
        { q: 'What is the main source of food for plants?', o: ['Soil', 'Sunlight', 'Water', 'Air'], c: 'Sunlight' },
        { q: 'Which vitamin is produced when skin is exposed to sunlight?', o: ['Vitamin A', 'Vitamin B', 'Vitamin C', 'Vitamin D'], c: 'Vitamin D' }
      ]
    },
    7: {
      'Nutrition in Plants': [
        { q: 'What is the process by which plants make their own food?', o: ['Respiration', 'Photosynthesis', 'Digestion', 'Absorption'], c: 'Photosynthesis' },
        { q: 'Which gas is released during photosynthesis?', o: ['Carbon dioxide', 'Oxygen', 'Nitrogen', 'Hydrogen'], c: 'Oxygen' },
        { q: 'What is the green pigment in plants called?', o: ['Chlorophyll', 'Hemoglobin', 'Melanin', 'Carotene'], c: 'Chlorophyll' },
        { q: 'Which part of the plant conducts water?', o: ['Phloem', 'Xylem', 'Cambium', 'Cortex'], c: 'Xylem' },
        { q: 'What do plants need for photosynthesis?', o: ['Only sunlight', 'Only water', 'Sunlight, water and CO2', 'Only CO2'], c: 'Sunlight, water and CO2' }
      ]
    }
  };
  
  const topicQuestions = scienceTopics[classLevel as keyof typeof scienceTopics]?.[chapterTitle as keyof any] || [];
  
  topicQuestions.forEach((item, index) => {
    if (questions.length < count) {
      questions.push({
        question: item.q,
        options: item.o,
        correct: item.c
      });
    }
  });
  
  // Fill remaining with generic questions
  while (questions.length < count) {
    questions.push({
      question: `What is a key scientific principle in Class ${classLevel} ${chapterTitle}?`,
      options: ['Observation', 'Experimentation', 'Analysis', 'All of the above'],
      correct: 'All of the above'
    });
  }
  
  return questions;
};

/**
 * Generate Social Studies questions for Telangana curriculum
 */
const generateSocialQuestions = (classLevel: number, chapterTitle: string, count: number): ChapterQuestion[] => {
  const questions: ChapterQuestion[] = [];
  
  const socialTopics = {
    6: {
      'What, Where, How and When?': [
        { q: 'What is the study of past events called?', o: ['Geography', 'History', 'Civics', 'Economics'], c: 'History' },
        { q: 'Which river valley is known as the cradle of Indian civilization?', o: ['Ganges', 'Indus', 'Brahmaputra', 'Narmada'], c: 'Indus' },
        { q: 'What are the sources used to study history?', o: ['Only books', 'Coins and inscriptions', 'Only monuments', 'Only oral traditions'], c: 'Coins and inscriptions' },
        { q: 'In which state is Harappa located?', o: ['India', 'Pakistan', 'Bangladesh', 'Afghanistan'], c: 'Pakistan' },
        { q: 'What does BCE stand for?', o: ['Before Common Era', 'Before Christ Era', 'British Common Era', 'Before Current Era'], c: 'Before Common Era' }
      ]
    },
    7: {
      'Medieval Period': [
        { q: 'Who founded the Delhi Sultanate?', o: ['Qutub-ud-din Aibak', 'Alauddin Khilji', 'Muhammad bin Tughlaq', 'Babur'], c: 'Qutub-ud-din Aibak' },
        { q: 'Which empire was established by Babur in India?', o: ['Delhi Sultanate', 'Mughal Empire', 'Maratha Empire', 'Vijayanagara Empire'], c: 'Mughal Empire' },
        { q: 'Who built the Red Fort in Delhi?', o: ['Akbar', 'Shah Jahan', 'Humayun', 'Aurangzeb'], c: 'Shah Jahan' },
        { q: 'Which Mughal emperor was known as Zinda Pir?', o: ['Akbar', 'Aurangzeb', 'Shah Jahan', 'Jahangir'], c: 'Aurangzeb' },
        { q: 'What was the capital of Vijayanagara Empire?', o: ['Hampi', 'Madurai', 'Thanjavur', 'Kanchipuram'], c: 'Hampi' }
      ]
    }
  };
  
  const topicQuestions = socialTopics[classLevel as keyof typeof socialTopics]?.[chapterTitle as keyof any] || [];
  
  topicQuestions.forEach((item, index) => {
    if (questions.length < count) {
      questions.push({
        question: item.q,
        options: item.o,
        correct: item.c
      });
    }
  });
  
  // Fill remaining with generic questions
  while (questions.length < count) {
    questions.push({
      question: `What is an important aspect of Class ${classLevel} ${chapterTitle}?`,
      options: ['Historical facts', 'Cultural understanding', 'Social awareness', 'All of the above'],
      correct: 'All of the above'
    });
  }
  
  return questions;
};

/**
 * Generate Map Pointing questions for Telangana curriculum
 */
const generateMapQuestions = (classLevel: number, chapterTitle: string, count: number): ChapterQuestion[] => {
  const questions: ChapterQuestion[] = [];
  
  const mapTopics = {
    6: [
      { q: 'What is the capital of Telangana?', o: ['Mumbai', 'Hyderabad', 'Chennai', 'Bangalore'], c: 'Hyderabad', mapData: { center: [17.3850, 78.4867], zoom: 8, marker: [17.3850, 78.4867] } },
      { q: 'Which river flows through Hyderabad?', o: ['Godavari', 'Krishna', 'Musi', 'Manjira'], c: 'Musi', mapData: { center: [17.3850, 78.4867], zoom: 8, marker: [17.3850, 78.4867] } },
      { q: 'Which state borders Telangana to the north?', o: ['Maharashtra', 'Karnataka', 'Odisha', 'Chhattisgarh'], c: 'Maharashtra' },
      { q: 'What is the largest city in Telangana?', o: ['Warangal', 'Nizamabad', 'Hyderabad', 'Khammam'], c: 'Hyderabad' },
      { q: 'Which district is known as the rice bowl of Telangana?', o: ['Warangal', 'Nizamabad', 'Karimnagar', 'Nalgonda'], c: 'Warangal' }
    ]
  };
  
  const topicQuestions = mapTopics[classLevel as keyof typeof mapTopics] || mapTopics[6];
  
  topicQuestions.forEach((item, index) => {
    if (questions.length < count) {
      questions.push({
        question: item.q,
        options: item.o,
        correct: item.c,
        ...(item.mapData && { mapData: item.mapData })
      });
    }
  });
  
  // Fill remaining with generic map questions
  while (questions.length < count) {
    questions.push({
      question: `Which geographical feature is important in Telangana?`,
      options: ['Rivers', 'Hills', 'Plains', 'All of the above'],
      correct: 'All of the above'
    });
  }
  
  return questions;
};

/**
 * Print analysis summary
 */
export const printAnalysisSummary = (analysis: QuestionAnalysis[]) => {
  console.log('\n📊 TELANGANA STATE BOARD QUESTION ANALYSIS\n');
  
  const needsMore = analysis.filter(a => a.status === 'needs_more');
  const complete = analysis.filter(a => a.status === 'complete');
  
  console.log(`✅ Complete chapters: ${complete.length}`);
  console.log(`⚠️  Chapters needing more questions: ${needsMore.length}`);
  console.log(`📚 Total chapters analyzed: ${analysis.length}\n`);
  
  if (needsMore.length > 0) {
    console.log('CHAPTERS NEEDING MORE QUESTIONS:\n');
    needsMore.forEach(chapter => {
      console.log(`📖 ${chapter.subject.toUpperCase()} Class ${chapter.classLevel} - ${chapter.chapterTitle}`);
      console.log(`   Current: ${chapter.currentQuestions} | Needs: ${chapter.needsQuestions} more\n`);
    });
  }
  
  // Summary by subject
  const subjects = ['maths', 'science', 'social', 'mapPointing'];
  console.log('SUMMARY BY SUBJECT:\n');
  subjects.forEach(subject => {
    const subjectAnalysis = analysis.filter(a => a.subject === subject);
    const subjectComplete = subjectAnalysis.filter(a => a.status === 'complete').length;
    const subjectTotal = subjectAnalysis.length;
    console.log(`${subject.toUpperCase()}: ${subjectComplete}/${subjectTotal} chapters complete`);
  });
};

export default {
  analyzeAllChapters,
  generateTelanganaQuestions,
  printAnalysisSummary
}; 