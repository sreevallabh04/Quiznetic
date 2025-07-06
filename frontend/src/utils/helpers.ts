import { Question } from './api';
import { chapterData } from '../data/chapterData';
import { getStaticQuestions } from './staticQuestions';
import { generateStaticQuestions } from './staticQuestions';
import { getFallbackQuestions } from './fallbackData';
import { logger } from './utils';

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
export const ensureMinimumQuestions = (
  questions: Question[],
  minCount: number = 5,
  classLevel: number,
  subject: string,
  chapterId: string
): Question[] => {
  try {
    logger.log(`📚 Loading questions for Class ${classLevel} ${subject} Chapter ${chapterId}`);
    
    if (questions.length >= minCount) {
      logger.log(`✅ Loaded ${questions.length} curated questions from Telangana State Board curriculum`);
      return questions.slice(0, 10); // Cap at 10 questions
    }
    
    // Try to get questions from static data first
    const staticQuestions = generateStaticQuestions(classLevel, subject, chapterId);
    if (staticQuestions.length > 0) {
      logger.log(`📋 Using ${staticQuestions.length} questions from chapter data`);
      return staticQuestions;
    }
    
    // If we still don't have enough, use fallback questions
    const fallbackQuestions = getFallbackQuestions(subject, chapterId);
    if (fallbackQuestions.length === 0) {
      logger.warn(`⚠️ No questions found for Class ${classLevel} ${subject} Chapter ${chapterId}. Using default questions.`);
    }
    
    return [...questions, ...fallbackQuestions].slice(0, 10);
  } catch (error) {
    logger.error('Error in ensureMinimumQuestions:', error);
    return getFallbackQuestions(subject, chapterId);
  }
};

/**
 * Get questions from chapter data structure
 */
export const getQuestionsFromChapterData = (
  classLevel: number,
  subject: string,
  chapterId: string
): Question[] => {
  try {
    return generateStaticQuestions(classLevel, subject, chapterId);
  } catch (error) {
    logger.error('Error getting questions from chapter data:', error);
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