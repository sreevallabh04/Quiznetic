import { fetchQuestionsFromAPI, MultipleChoiceQuestion } from './api';
import { chapterData } from '../data/chapterData';

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
 * Ensures that each chapter in all subjects has at least the specified minimum number of questions.
 * If a chapter has fewer questions, it will generate additional questions using the GROQ API.
 * 
 * @param minimumQuestionCount The minimum number of questions each chapter should have (default: 25)
 * @returns A promise that resolves when all chapters have been processed
 */
export const ensureMinimumQuestions = async (minimumQuestionCount: number = 25): Promise<void> => {
  console.log(`Ensuring all chapters have at least ${minimumQuestionCount} questions...`);
  
  // Track which chapters need additional questions
  const chaptersToUpdate: {
    subject: string;
    classLevel: number;
    chapterIndex: number;
    currentCount: number;
    neededCount: number;
  }[] = [];
  
  // Check all subjects and classes for chapters with fewer than the minimum question count
  for (const [subject, classes] of Object.entries(chapterData)) {
    for (const [classLevel, chapters] of Object.entries(classes)) {
      const classNumber = parseInt(classLevel);
      
      // Skip if invalid class number
      if (isNaN(classNumber)) continue;
      
      // Check each chapter's question count
      chapters.forEach((chapter: Chapter, chapterIndex: number) => {
        const questionCount = chapter.questions?.length || 0;
        
        if (questionCount < minimumQuestionCount) {
          chaptersToUpdate.push({
            subject,
            classLevel: classNumber,
            chapterIndex,
            currentCount: questionCount,
            neededCount: minimumQuestionCount - questionCount
          });
        }
      });
    }
  }
  
  // Generate and add questions for chapters that need them
  for (const chapterInfo of chaptersToUpdate) {
    const { subject, classLevel, chapterIndex, currentCount, neededCount } = chapterInfo;
    // Use proper type casting to handle indexing into nested objects
    const subjectData = chapterData[subject as keyof typeof chapterData];
    const classData = subjectData[classLevel as unknown as keyof typeof subjectData];
    const chapter = classData[chapterIndex] as Chapter;
    
    console.log(`Generating ${neededCount} additional questions for ${subject} Class ${classLevel} Chapter "${chapter.title}" (current: ${currentCount})`);
    
    try {
      // Generate additional questions using the GROQ API
      const result = await fetchQuestionsFromAPI(
        classLevel,
        subject,
        chapter.title,
        chapter.description || `${chapter.title} chapter for ${subject} class ${classLevel}`
      );
      
      if (result.success && result.questions.length > 0) {
        // Convert API questions to the format expected by the chapter data
        const formattedQuestions = result.questions
          .filter(q => q.type === 'multiple_choice') // Filter to only use multiple-choice questions
          .map((q) => {
            const mcQuestion = q as MultipleChoiceQuestion;
            return {
              question: mcQuestion.question.replace(/MaP: /, ''), // Remove map prefix if present
              options: mcQuestion.options,
              correct: mcQuestion.correct,
              ...(mcQuestion.mapData && { mapData: mcQuestion.mapData }),
              ...(mcQuestion.imageUrl && { imageUrl: mcQuestion.imageUrl })
            };
          })
          .slice(0, neededCount); // Only take as many as needed
        
        // Add the new questions to the chapter
        if (!chapter.questions) {
          chapter.questions = [];
        }
        
        chapter.questions = [...chapter.questions, ...formattedQuestions];
        
        console.log(`Added ${formattedQuestions.length} questions to ${subject} Class ${classLevel} Chapter "${chapter.title}" (new total: ${chapter.questions.length})`);
      } else {
        console.warn(`Failed to generate questions for ${subject} Class ${classLevel} Chapter "${chapter.title}": ${result.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error(`Error generating questions for ${subject} Class ${classLevel} Chapter "${chapter.title}":`, error);
    }
  }
  
  console.log('Finished ensuring minimum question counts for all chapters');
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