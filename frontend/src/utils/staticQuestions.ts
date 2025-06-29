// Static question system for Telangana State Board curriculum
import { chapterData } from '../data/chapterData';
import { Question, QuestionType } from './api';

/**
 * Enhanced question types with better variety for educational content
 */
interface ChapterQuestion {
  question: string;
  options?: string[];
  correct: string | string[];
  type?: QuestionType;
  explanation?: string;
}

interface ChapterData {
  id: number;
  title: string;
  description: string;
  questions: ChapterQuestion[];
}

/**
 * Generate diverse question types from existing chapter data
 */
const enhanceQuestionTypes = (chapterQuestions: ChapterQuestion[], chapterTitle: string): Question[] => {
  const enhancedQuestions: Question[] = [];
  
  chapterQuestions.forEach((q, index) => {
    const questionId = `static_${Date.now()}_${index}`;
    
    // Convert basic questions to multiple choice
    if (q.options && q.options.length >= 2) {
      enhancedQuestions.push({
        id: questionId,
        type: 'multiple_choice',
        question: q.question,
        options: shuffleArray(q.options),
        correct: q.correct as string
      });
    }
    
    // Create fill-in-the-blank variations
    if (index % 4 === 1 && typeof q.correct === 'string') {
      const blankQuestion = q.question.replace(q.correct, '[BLANK]');
      if (blankQuestion !== q.question) {
        enhancedQuestions.push({
          id: `${questionId}_blank`,
          type: 'fill_blank',
          question: blankQuestion,
          correct: q.correct
        });
      }
    }
  });
  
  // Add some matching questions based on the chapter content
  if (chapterQuestions.length >= 6) {
    enhancedQuestions.push(createMatchingQuestion(chapterQuestions, chapterTitle));
  }
  
  // Add drag-drop ordering questions for sequential content
  if (chapterQuestions.length >= 4) {
    enhancedQuestions.push(createOrderingQuestion(chapterQuestions, chapterTitle));
  }
  
  // Add dropdown questions for complex concepts
  if (chapterQuestions.length >= 3) {
    enhancedQuestions.push(createDropdownQuestion(chapterQuestions, chapterTitle));
  }
  
  return enhancedQuestions;
};

/**
 * Create matching questions from chapter content
 */
const createMatchingQuestion = (questions: ChapterQuestion[], chapterTitle: string): Question => {
  const pairs = questions.slice(0, 4).map((q, index) => ({
    left: { id: `L${index + 1}`, text: q.question.split('?')[0] + '?' },
    right: { id: `R${index + 1}`, text: q.correct as string }
  }));
  
  return {
    id: `matching_${Date.now()}`,
    type: 'matching',
    question: `Match the concepts from ${chapterTitle}:`,
    prompt: 'Match each question with its correct answer:',
    pairs
  };
};

/**
 * Create drag-drop ordering questions
 */
const createOrderingQuestion = (questions: ChapterQuestion[], chapterTitle: string): Question => {
  const items = questions.slice(0, 4).map((q, index) => ({
    id: `item${index + 1}`,
    text: q.correct as string
  }));
  
  return {
    id: `order_${Date.now()}`,
    type: 'drag_drop_order',
    question: `Arrange these concepts from ${chapterTitle} in logical order:`,
    prompt: 'Drag and drop to arrange in the correct sequence:',
    items
  };
};

/**
 * Create dropdown questions
 */
const createDropdownQuestion = (questions: ChapterQuestion[], chapterTitle: string): Question => {
  const selectedQuestions = questions.slice(0, 2);
  const dropdowns = selectedQuestions.map((q, index) => ({
    placeholder: `[DROPDOWN_${index + 1}]`,
    options: q.options ? shuffleArray([...q.options]) : ['Option A', 'Option B', 'Option C'],
    correct: q.correct as string
  }));
  
  const questionText = `Complete this statement about ${chapterTitle}: The first concept is [DROPDOWN_1] and the second concept is [DROPDOWN_2].`;
  
  return {
    id: `dropdown_${Date.now()}`,
    type: 'dropdown',
    question: questionText,
    dropdowns
  };
};

/**
 * Shuffle array elements using Fisher-Yates algorithm
 */
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Get static questions for a specific class, subject, and chapter
 */
export const getStaticQuestions = (
  classLevel: number,
  subject: string,
  chapterId: number
): Question[] => {
  try {
    // Get the subject data
    const subjectData = chapterData[subject as keyof typeof chapterData];
    if (!subjectData) {
      console.warn(`Subject '${subject}' not found in chapter data`);
      return getDefaultQuestions(subject, classLevel);
    }
    
    // Get the class data
    const classData = subjectData[classLevel as keyof typeof subjectData] as ChapterData[];
    if (!classData) {
      console.warn(`Class ${classLevel} not found for subject '${subject}'`);
      return getDefaultQuestions(subject, classLevel);
    }
    
    // Find the specific chapter
    const chapter = classData.find(ch => ch.id === chapterId);
    if (!chapter) {
      console.warn(`Chapter ${chapterId} not found for class ${classLevel} ${subject}`);
      return getDefaultQuestions(subject, classLevel);
    }
    
    // Convert and enhance the questions
    const enhancedQuestions = enhanceQuestionTypes(chapter.questions, chapter.title);
    
    // Ensure we have a good variety of questions
    if (enhancedQuestions.length < 5) {
      // Add some default questions if we don't have enough
      const defaultQuestions = getDefaultQuestions(subject, classLevel);
      enhancedQuestions.push(...defaultQuestions.slice(0, 5 - enhancedQuestions.length));
    }
    
    // Limit to reasonable number and shuffle
    const finalQuestions = shuffleArray(enhancedQuestions).slice(0, 15);
    
    console.log(`✅ Generated ${finalQuestions.length} questions for Class ${classLevel} ${subject} Chapter ${chapterId}`);
    return finalQuestions;
    
  } catch (error) {
    console.error('Error generating static questions:', error);
    return getDefaultQuestions(subject, classLevel);
  }
};

/**
 * Get all available questions for a subject and class (for practice mode)
 */
export const getAllStaticQuestions = (
  classLevel: number,
  subject: string
): Question[] => {
  try {
    const subjectData = chapterData[subject as keyof typeof chapterData];
    if (!subjectData) return [];
    
    const classData = subjectData[classLevel as keyof typeof subjectData] as ChapterData[];
    if (!classData) return [];
    
    const allQuestions: Question[] = [];
    
    classData.forEach(chapter => {
      const chapterQuestions = enhanceQuestionTypes(chapter.questions, chapter.title);
      allQuestions.push(...chapterQuestions);
    });
    
    return shuffleArray(allQuestions).slice(0, 50); // Limit for performance
  } catch (error) {
    console.error('Error getting all static questions:', error);
    return [];
  }
};

/**
 * Default questions for when specific content is not available
 */
const getDefaultQuestions = (subject: string, classLevel: number): Question[] => {
  const subjectSpecificQuestions: Record<string, Question[]> = {
    maths: [
      {
        id: 'default_math_1',
        type: 'multiple_choice',
        question: `What is a fundamental concept in Class ${classLevel} Mathematics?`,
        options: ['Numbers and Operations', 'Advanced Calculus', 'Quantum Physics', 'None of these'],
        correct: 'Numbers and Operations'
      },
      {
        id: 'default_math_2',
        type: 'fill_blank',
        question: 'Mathematics helps us understand [BLANK] and solve problems.',
        correct: 'patterns'
      }
    ],
    science: [
      {
        id: 'default_sci_1',
        type: 'multiple_choice',
        question: `Which is an important topic in Class ${classLevel} Science?`,
        options: ['Scientific Method', 'Time Travel', 'Magic', 'None of these'],
        correct: 'Scientific Method'
      },
      {
        id: 'default_sci_2',
        type: 'fill_blank',
        question: 'Science is the study of the [BLANK] world around us.',
        correct: 'natural'
      }
    ],
    social: [
      {
        id: 'default_soc_1',
        type: 'multiple_choice',
        question: `What is an important aspect of Class ${classLevel} Social Studies?`,
        options: ['Understanding Society', 'Space Exploration', 'Computer Programming', 'None of these'],
        correct: 'Understanding Society'
      },
      {
        id: 'default_soc_2',
        type: 'fill_blank',
        question: 'Social Studies helps us understand [BLANK] and culture.',
        correct: 'history'
      }
    ],
    mapPointing: [
      {
        id: 'default_map_1',
        type: 'multiple_choice',
        question: 'MaP: What is the capital of Telangana?',
        options: ['Mumbai', 'Hyderabad', 'Chennai', 'Bangalore'],
        correct: 'Hyderabad',
        mapData: {
          center: [17.8495, 79.1151],
          zoom: 6,
          marker: [17.8495, 79.1151],
          type: 'state',
          name: 'telangana'
        }
      }
    ]
  };
  
  return subjectSpecificQuestions[subject] || [
    {
      id: 'default_generic_1',
      type: 'multiple_choice',
      question: 'This is a sample question for the Telangana State Board curriculum.',
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correct: 'Option A'
    }
  ];
};

/**
 * Get question statistics for a subject and class
 */
export const getQuestionStats = (classLevel: number, subject: string) => {
  try {
    const subjectData = chapterData[subject as keyof typeof chapterData];
    if (!subjectData) return { chapters: 0, totalQuestions: 0 };
    
    const classData = subjectData[classLevel as keyof typeof subjectData] as ChapterData[];
    if (!classData) return { chapters: 0, totalQuestions: 0 };
    
    const totalQuestions = classData.reduce((sum, chapter) => sum + chapter.questions.length, 0);
    
    return {
      chapters: classData.length,
      totalQuestions,
      averageQuestionsPerChapter: Math.round(totalQuestions / classData.length)
    };
  } catch (error) {
    return { chapters: 0, totalQuestions: 0, averageQuestionsPerChapter: 0 };
  }
}; 