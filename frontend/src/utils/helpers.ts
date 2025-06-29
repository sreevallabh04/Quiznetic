import { Question } from './api';
import { chapterData } from '../data/chapterData';
import { getStaticQuestions } from './staticQuestions';

/**
 * Shuffles an array using Fisher-Yates algorithm
 * @param array The array to shuffle
 * @returns A new shuffled array
 */
export const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};
// Define a Chapter type to use throughout the function
interface Chapter {
  id: number;
  title: string;
  description?: string;
  questions: Array<{
    question: string;
    options: string[];
    correct: string;
    mapData?: any;
    imageUrl?: string;
  }>;
}

/**
 * Get questions for a specific chapter using static data from Telangana State Board curriculum
 * This replaces API calls with curated, curriculum-aligned content
 * 
 * @param classLevel The class level (6-10)
 * @param subject The subject (maths, science, social, mapPointing)
 * @param chapterId The chapter ID
 * @param minQuestions Minimum number of questions to return (default: 15)
 * @returns Array of questions for the chapter
 */
export const ensureMinimumQuestions = async (
  classLevel: number,
  subject: string,
  chapterId: number,
  minQuestions: number = 15
): Promise<Question[]> => {
  try {
    console.log(`📚 Loading questions for Class ${classLevel} ${subject} Chapter ${chapterId}`);
    
    // Get static questions directly from our curated database
    const questions = getStaticQuestions(classLevel, subject, chapterId);
    
    if (questions.length > 0) {
      console.log(`✅ Loaded ${questions.length} curated questions from Telangana State Board curriculum`);
      return questions.slice(0, Math.max(minQuestions, questions.length));
    }
    
    // Fallback: Get questions from chapter data if static questions fail
    const fallbackQuestions = getQuestionsFromChapterData(classLevel, subject, chapterId);
    if (fallbackQuestions.length > 0) {
      console.log(`📋 Using ${fallbackQuestions.length} questions from chapter data`);
      return fallbackQuestions.slice(0, minQuestions);
    }
    
    // Last resort: return default questions
    console.warn(`⚠️ No questions found for Class ${classLevel} ${subject} Chapter ${chapterId}. Using default questions.`);
    return getDefaultQuestions(subject, classLevel, chapterId);
    
  } catch (error) {
    console.error('Error in ensureMinimumQuestions:', error);
    return getDefaultQuestions(subject, classLevel, chapterId);
  }
};

/**
 * Get questions directly from chapter data (fallback method)
 */
const getQuestionsFromChapterData = (classLevel: number, subject: string, chapterId: number): Question[] => {
  try {
    const subjectData = chapterData[subject as keyof typeof chapterData];
    if (!subjectData) return [];
    
    const classData = subjectData[classLevel as keyof typeof subjectData] as Chapter[];
    if (!classData) return [];
    
    const chapter = classData.find(ch => ch.id === chapterId);
    if (!chapter || !chapter.questions) return [];
    
    return chapter.questions.map((q, index) => ({
      id: `chapter_${chapterId}_${index}`,
      type: 'multiple_choice' as const,
      question: q.question,
      options: q.options,
      correct: q.correct,
      ...(q.mapData && { mapData: q.mapData }),
      ...(q.imageUrl && { imageUrl: q.imageUrl })
    }));
  } catch (error) {
    console.error('Error getting questions from chapter data:', error);
    return [];
  }
};

/**
 * Get default questions when specific content is not available
 */
const getDefaultQuestions = (subject: string, classLevel: number, chapterId: number): Question[] => {
  const subjectNames: Record<string, string> = {
    maths: 'Mathematics',
    science: 'Science',
    social: 'Social Studies',
    mapPointing: 'Geography & Map Skills'
  };
  
  const subjectName = subjectNames[subject] || subject;
  
  return [
    {
      id: `default_${Date.now()}_1`,
      type: 'multiple_choice',
      question: `This is a sample question for Class ${classLevel} ${subjectName} Chapter ${chapterId}. What is an important concept in this chapter?`,
      options: ['Fundamental Concepts', 'Advanced Topics', 'Basic Principles', 'All of the above'],
      correct: 'All of the above'
    },
    {
      id: `default_${Date.now()}_2`,
      type: 'fill_blank',
      question: `In Class ${classLevel} ${subjectName}, we learn about [BLANK] concepts that are important for understanding the subject.`,
      correct: 'key'
    },
    {
      id: `default_${Date.now()}_3`,
      type: 'multiple_choice',
      question: `Which approach is best for learning ${subjectName} in Class ${classLevel}?`,
      options: ['Regular practice', 'Understanding concepts', 'Solving problems', 'All of the above'],
      correct: 'All of the above'
    }
  ];
};

/**
 * Generates a random ID
 * @returns A random string ID
 */
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

/**
 * Formats a number as a percentage
 * @param value The number to format
 * @param decimals Number of decimal places
 * @returns Formatted percentage string
 */
export const formatPercentage = (value: number, decimals = 0): string => {
  return `${(value * 100).toFixed(decimals)}%`;
};

/**
 * Debounces a function
 * @param func The function to debounce
 * @param wait The wait time in milliseconds
 * @returns A debounced function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}; 