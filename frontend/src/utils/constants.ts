/**
 * List of allowed class IDs
 */
export const allowedClassIds = ['6', '7', '8', '9', '10', '11', '12'];

/**
 * API endpoints
 */
export const API_ENDPOINTS = {
  QUESTIONS: '/questions',
  QUESTION_TYPES: '/questions/types',
  AUTH: '/auth',
  PRODUCTS: '/products'
};

/**
 * Question type constants
 */
export const QUESTION_TYPES = {
  MULTIPLE_CHOICE: 'multiple_choice',
  FILL_BLANK: 'fill_blank',
  MATCHING: 'matching',
  DRAG_DROP_ORDER: 'drag_drop_order',
  DROPDOWN: 'dropdown'
} as const;

/**
 * API configuration
 */
export const API_CONFIG = {
  BASE_URL: 'http://localhost:3001',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3
};

/**
 * Quiz configuration
 */
export const QUIZ_CONFIG = {
  MAX_QUESTIONS: 10,
  TIME_LIMIT: 30, // minutes
  PASSING_SCORE: 0.7 // 70%
};

/**
 * Error messages
 */
export const ERROR_MESSAGES = {
  INVALID_CLASS: 'Please select a valid class',
  INVALID_SUBJECT: 'Please select a valid subject',
  INVALID_CHAPTER: 'Please select a valid chapter',
  NO_QUESTION_TYPES: 'No question types available for this subject',
  API_ERROR: 'An error occurred while fetching data',
  NETWORK_ERROR: 'Network error. Please check your connection'
}; 