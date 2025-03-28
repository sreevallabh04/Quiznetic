// GROQ API utilities for fetching questions
// Array of API keys to rotate through when hitting rate limits
const GROQ_API_KEYS = [
  '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', // First key to try
  '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',
  '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',
  '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',
  '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',
  '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',
  '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',
  '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'
];

// Track key status for intelligent rotation
interface KeyStatus {
  key: string;
  failures: number;
  lastError: string | null;
  blacklistedUntil: number | null;
}

// Initialize key status tracking
const keyStatuses: KeyStatus[] = GROQ_API_KEYS.map(key => ({
  key,
  failures: 0,
  lastError: null,
  blacklistedUntil: null
}));

// Track the current API key index
let currentKeyIndex = 0;

// Get the current API key, skipping blacklisted keys
const getCurrentApiKey = (): string => {
  // Find the first non-blacklisted key starting from currentKeyIndex
  const now = Date.now();
  let checkedKeysCount = 0;
  let index = currentKeyIndex;
  
  while (checkedKeysCount < keyStatuses.length) {
    const status = keyStatuses[index];
    
    // If key is not blacklisted or blacklist period has expired, use it
    if (!status.blacklistedUntil || status.blacklistedUntil < now) {
      currentKeyIndex = index;
      return status.key;
    }
    
    // Check next key in rotation
    index = (index + 1) % keyStatuses.length;
    checkedKeysCount++;
  }
  
  // If all keys are blacklisted, use the one with the earliest expiration
  let earliestExpiration = Infinity;
  let earliestIndex = 0;
  
  for (let i = 0; i < keyStatuses.length; i++) {
    const blacklistedUntil = keyStatuses[i].blacklistedUntil || 0;
    if (blacklistedUntil < earliestExpiration) {
      earliestExpiration = blacklistedUntil;
      earliestIndex = i;
    }
  }
  
  currentKeyIndex = earliestIndex;
  return keyStatuses[earliestIndex].key;
};

// Handle API key failure and determine next action
const handleKeyFailure = (keyIndex: number, error: any, statusCode?: number): void => {
  const status = keyStatuses[keyIndex];
  status.failures++;
  status.lastError = error?.message || 'Unknown error';
  
  console.log(`API key ${keyIndex + 1}/${keyStatuses.length} failed: ${status.lastError}`);
  
  // Blacklist keys based on error type and failure count
  if (statusCode === 429) {
    // Rate limit error: blacklist for a longer time with exponential backoff
    const backoffMinutes = Math.min(15, Math.pow(2, status.failures - 1));
    status.blacklistedUntil = Date.now() + (backoffMinutes * 60 * 1000);
    console.log(`Key ${keyIndex + 1} rate limited, blacklisted for ${backoffMinutes} minutes`);
  } else if (status.failures >= 3) {
    // Other errors: if persistent, blacklist temporarily
    status.blacklistedUntil = Date.now() + (2 * 60 * 1000); // 2 minutes
    console.log(`Key ${keyIndex + 1} failing repeatedly, blacklisted for 2 minutes`);
  }
};

// Rotate to the next API key
const rotateToNextApiKey = (): string => {
  // Move to the next key index
  currentKeyIndex = (currentKeyIndex + 1) % keyStatuses.length;
  
  // Get a valid key (may not be the one we just rotated to if it's blacklisted)
  return getCurrentApiKey();
};

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

interface Question {
  question: string;
  options: string[];
  correct: string;
}

export interface APIResponse {
  success: boolean;
  questions: Question[];
  error?: string;
}

/**
 * Make API request with retry logic and intelligent key rotation
 * @param prompt The prompt to send to the API
 * @returns The API response data
 */
const makeGroqApiRequest = async (prompt: string): Promise<any> => {
  const maxAttempts = GROQ_API_KEYS.length * 2; // Allow multiple attempts per key
  let attempts = 0;
  let lastError: any = null;
  let lastStatusCode: number | undefined;
  
  // For logging/debugging
  const startTime = Date.now();
  console.log(`Starting API request with prompt for: ${prompt.substring(0, 50)}...`);
  
  while (attempts < maxAttempts) {
    const currentKey = getCurrentApiKey();
    const currentKeyIdx = keyStatuses.findIndex(status => status.key === currentKey);
    
    try {
      console.log(`Attempt ${attempts + 1}/${maxAttempts} using API key ${currentKeyIdx + 1}/${keyStatuses.length}`);
      
      // Add delay between attempts with exponential backoff
      if (attempts > 0) {
        const delayMs = Math.min(1000 * Math.pow(1.5, attempts - 1), 8000);
        console.log(`Adding delay of ${delayMs}ms before next attempt`);
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
      
      // Make the API request
      const response = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentKey}`
        },
        body: JSON.stringify({
          model: "llama3-70b-8192",
          messages: [
            {
              role: "system",
              content: "You are an educational content creator specializing in creating multiple-choice questions for students following the Telangana state board curriculum."
            },
            {
              role: "user",
              content: prompt
            }
          ],
          temperature: 0.3,
          max_tokens: 4000
        })
      });
      
      lastStatusCode = response.status;
      
      if (!response.ok) {
        // Handle API-level errors based on status code
        let errorMessage: string;
        
        switch (response.status) {
          case 429:
            errorMessage = 'Rate limit exceeded';
            break;
          case 401:
            errorMessage = 'API key is invalid or unauthorized';
            break;
          case 403:
            errorMessage = 'Access forbidden';
            break;
          case 500:
          case 502:
          case 503:
          case 504:
            errorMessage = `GROQ API server error (${response.status})`;
            break;
          default:
            errorMessage = `API request failed with status: ${response.status}`;
        }
        
        // Update key status and rotate
        handleKeyFailure(currentKeyIdx, new Error(errorMessage), response.status);
        rotateToNextApiKey();
        
        attempts++;
        lastError = new Error(errorMessage);
        
        if (response.status === 429 || [500, 502, 503, 504].includes(response.status)) {
          // For rate limits and server errors, we should retry with a different key
          continue;
        }
        
        throw new Error(errorMessage);
      }

      const data = await response.json();
      
      // Reset failures for this key since it succeeded
      keyStatuses[currentKeyIdx].failures = 0;
      keyStatuses[currentKeyIdx].lastError = null;
      keyStatuses[currentKeyIdx].blacklistedUntil = null;
      
      console.log(`API request successful with key ${currentKeyIdx + 1} after ${attempts + 1} attempts`);
      
      // Success! Return the data
      return data;
      
    } catch (error) {
      // Handle network errors, parsing errors, etc.
      console.error(`Error with API key ${currentKeyIdx + 1}:`, error);
      
      // Update key status and rotate to next key
      handleKeyFailure(currentKeyIdx, error);
      rotateToNextApiKey();
      
      lastError = error;
      attempts++;
      
      // If this was the last attempt, break out of the loop
      if (attempts >= maxAttempts) {
        break;
      }
    }
  }
  
  // If we've exhausted all attempts, throw the last error
  const errorMsg = `All API keys failed after ${attempts} attempts. Last error: ${lastError?.message || 'Unknown error'}`;
  console.error(errorMsg);
  throw new Error(errorMsg);
};

/**
 * Shuffle array elements using Fisher-Yates algorithm
 * @param array The array to shuffle
 * @returns A new shuffled array
 */
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array]; // Create a copy to avoid modifying the original
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    // Pick a random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));
    
    // Swap elements at i and j
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled;
};

/**
 * Check if a question is map-related based on its content
 * @param question The question text to check
 * @returns true if the question is map-related
 */
const isMapRelatedQuestion = (question: string): boolean => {
  // Keywords that suggest the question is related to maps or geography
  const mapKeywords = [
    'map', 'location', 'region', 'country', 'state', 'capital', 'city',
    'river', 'mountain', 'ocean', 'sea', 'lake', 'peninsula', 'desert',
    'continent', 'border', 'coast', 'region', 'area', 'identify', 'located',
    'geographical', 'geography', 'territory', 'highlighted', 'shown',
    'north', 'south', 'east', 'west', 'point', 'direction', 'symbol'
  ];
  
  // Convert to lowercase for case-insensitive matching
  const lowercaseQuestion = question.toLowerCase();
  
  // Check if any keyword appears in the question
  return mapKeywords.some(keyword => lowercaseQuestion.includes(keyword));
};

/**
 * Process GROQ API response to extract and validate questions
 * @param data The raw API response data
 * @returns The processed and validated questions
 */
const processApiResponse = (data: any): Question[] => {
  // Extract the content from the response
  const content = data.choices[0]?.message?.content;
  
  if (!content) {
    throw new Error('No content in API response');
  }

  // Parse the JSON content, handling potential JSON within markdown code blocks
  let jsonContent = content;
  
  // If the response is wrapped in markdown code blocks, extract just the JSON
  const jsonMatch = content.match(/```(?:json)?([\s\S]*?)```/);
  if (jsonMatch && jsonMatch[1]) {
    jsonContent = jsonMatch[1].trim();
  }
  
  // Parse the JSON content
  const questions = JSON.parse(jsonContent);

  // Validate the questions format
  if (!Array.isArray(questions) || questions.length === 0) {
    throw new Error('Invalid questions format from API');
  }

  // Process each question to add MaP prefix and shuffle options
  const processedQuestions = questions.map(q => {
    // Only proceed if question has required properties
    if (
      !q.question || 
      !Array.isArray(q.options) || 
      q.options.length !== 4 || 
      !q.correct || 
      !q.options.includes(q.correct)
    ) {
      return null; // Skip invalid questions
    }
    
    // Check if this is a map-related question
    const isMapQuestion = isMapRelatedQuestion(q.question);
    
    // Add "MaP" prefix to map-related questions
    const processedQuestion = isMapQuestion 
      ? `MaP: ${q.question}` 
      : q.question;
    
    // Save the correct answer
    const correctAnswer = q.correct;
    
    // Shuffle options
    const shuffledOptions = shuffleArray(q.options);
    
    // Return processed question
    return {
      question: processedQuestion,
      options: shuffledOptions,
      correct: correctAnswer,
      // Maintain any other properties
      ...(q.mapData && { mapData: q.mapData }),
      ...(q.imageUrl && { imageUrl: q.imageUrl })
    };
  }).filter(q => q !== null) as Question[]; // Remove any null entries
  
  if (processedQuestions.length === 0) {
    throw new Error('No valid questions found in API response');
  }
  
  return processedQuestions;
};

/**
 * Fetch questions from GROQ API for a specific class, subject, and chapter
 * With API key rotation for handling rate limits
 * 
 * @param classLevel The class level (6-10)
 * @param subject The subject (maths, science, social)
 * @param chapterTitle The chapter title
 * @param chapterDescription Brief description of the chapter
 * @returns Array of questions or error
 */
export const fetchQuestionsFromAPI = async (
  classLevel: number, 
  subject: string,
  chapterTitle: string,
  chapterDescription: string
): Promise<APIResponse> => {
  // Create a prompt that specifies exactly what we need
  const prompt = `Generate 20 multiple-choice questions with 4 options each for class ${classLevel} Telangana state board curriculum on the topic "${chapterTitle}" (${chapterDescription}) for subject ${subject}. 
  
  Each question should:
  1. Be appropriate for the grade level (Class ${classLevel})
  2. Follow the Telangana state board syllabus for ${subject}
  3. Have exactly 4 options with one correct answer
  4. Be formatted as a JSON array of objects with this exact structure:
  [
    {
      "question": "Question text here?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correct": "The exact text of the correct option"
    }
  ]
  
  Only respond with the JSON array, no other text.`;

  try {
    // Make the API request with advanced retry logic
    const data = await makeGroqApiRequest(prompt);
    
    // Process the API response to extract valid questions
    const validQuestions = processApiResponse(data);
    
    // Request was successful, return the valid questions
    return {
      success: true,
      questions: validQuestions
    };
  } catch (error) {
    // Provide a detailed error message to help debugging
    console.error('Failed to fetch questions after all retry attempts:', error);
    
    // Log key statuses for debugging
    console.log('Key status summary:');
    keyStatuses.forEach((status, idx) => {
      console.log(`Key ${idx + 1}: ${status.failures} failures, ${status.blacklistedUntil ? 'blacklisted until ' + new Date(status.blacklistedUntil).toLocaleTimeString() : 'active'}`);
    });
    
    return {
      success: false,
      questions: [],
      error: error instanceof Error 
        ? `${error.message} (All API keys attempted - please try again later)`
        : 'Failed to fetch questions due to API errors'
    };
  }
};