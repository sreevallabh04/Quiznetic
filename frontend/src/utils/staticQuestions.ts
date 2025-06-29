// Static question system for Telangana State Board curriculum
import { chapterData } from '../data/chapterData';
import { Question, QuestionType } from './api';
import { getFallbackQuestions } from './fallbackData';
import { logger } from './utils';

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
 * Generate questions for a specific chapter using static data
 * @param classLevel The class level (6-12)
 * @param subject The subject (maths, science, social)
 * @param chapterId The chapter identifier
 * @returns Array of questions for the chapter
 */
export const generateStaticQuestions = (
  classLevel: number,
  subject: string,
  chapterId: string
): Question[] => {
  try {
    // Check if subject exists in chapter data
    if (!chapterData[subject]) {
      logger.warn(`Subject '${subject}' not found in chapter data`);
      return getFallbackQuestions(5);
    }

    // Check if class level exists for the subject
    const subjectData = chapterData[subject];
    if (!subjectData[`class${classLevel}`]) {
      logger.warn(`Class ${classLevel} not found for subject '${subject}'`);
      return getFallbackQuestions(5);
    }

    // Get chapter data
    const classData = subjectData[`class${classLevel}`];
    const chapter = classData.find((ch: any) => ch.id === chapterId);
    if (!chapter) {
      logger.warn(`Chapter ${chapterId} not found for class ${classLevel} ${subject}`);
      return getFallbackQuestions(5);
    }

    // Get questions from chapter
    const questions = chapter.questions || [];
    
    // Shuffle questions for variety
    const shuffledQuestions = shuffleArray(questions);
    
    // Take up to 10 questions
    const finalQuestions = shuffledQuestions.slice(0, 10);
    
    // Add unique IDs if not present
    const questionsWithIds = finalQuestions.map((q: Question, index: number) => ({
      ...q,
      id: q.id || `${subject}_${classLevel}_${chapterId}_${index + 1}`
    }));

    logger.log(`✅ Generated ${finalQuestions.length} questions for Class ${classLevel} ${subject} Chapter ${chapterId}`);
    
    return questionsWithIds;
  } catch (error) {
    logger.error('Error generating static questions:', error);
    return getFallbackQuestions(5);
  }
};

/**
 * Get all available questions from static data
 * @returns Object containing all questions organized by subject and class
 */
export const getAllStaticQuestions = () => {
  try {
    const allQuestions: Record<string, any> = {};
    
    Object.keys(chapterData).forEach(subject => {
      allQuestions[subject] = {};
      const subjectData = chapterData[subject];
      
      Object.keys(subjectData).forEach(classKey => {
        const classLevel = classKey.replace('class', '');
        allQuestions[subject][classLevel] = {};
        
        const classData = subjectData[classKey];
        classData.forEach((chapter: any) => {
          allQuestions[subject][classLevel][chapter.id] = chapter.questions || [];
        });
      });
    });
    
    return allQuestions;
  } catch (error) {
    logger.error('Error getting all static questions:', error);
    return {};
  }
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