// Gemini API utilities for fetching questions
// Array of API keys to rotate through when hitting rate limits
const GEMINI_API_KEYS = [
  import.meta.env.VITE_GEMINI_API_KEY_1,
  import.meta.env.VITE_GEMINI_API_KEY_2,
  import.meta.env.VITE_GEMINI_API_KEY_3,
  import.meta.env.VITE_GEMINI_API_KEY_4,
  import.meta.env.VITE_GEMINI_API_KEY_5,
  import.meta.env.VITE_GEMINI_API_KEY_6,
  import.meta.env.VITE_GEMINI_API_KEY_7,
  import.meta.env.VITE_GEMINI_API_KEY_8
].filter(Boolean) as string[]; // Filter out undefined values

// Validate that we have at least one API key
if (GEMINI_API_KEYS.length === 0) {
  console.error('No Gemini API keys found. Please set VITE_GEMINI_API_KEY_1 through VITE_GEMINI_API_KEY_8 in your .env file.');
  throw new Error('Missing Gemini API keys. Please check your environment configuration.');
}

// Track key status for intelligent rotation
interface KeyStatus {
  key: string;
  failures: number;
  lastError: string | null;
  blacklistedUntil: number | null;
}

// Initialize key status tracking
const keyStatuses: KeyStatus[] = GEMINI_API_KEYS.map(key => ({
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

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

// Define interfaces for different question types
export type QuestionType = 'multiple_choice' | 'fill_blank' | 'matching' | 'drag_drop_order' | 'dropdown';

export interface BaseQuestion {
  id: string; // Add a unique ID for each question
  type: QuestionType;
  question: string; // The main question text or instruction
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple_choice';
  options: string[];
  correct: string;
  mapData?: any; // Keep map data for relevant MCQs
  imageUrl?: string; // Keep image URL
}

export interface FillBlankQuestion extends BaseQuestion {
  type: 'fill_blank';
  // Question text should contain a placeholder like '[BLANK]'
  correct: string; // The word(s) that fill the blank
}

export interface MatchingItem {
  id: string;
  text: string;
}

export interface MatchingQuestion extends BaseQuestion {
  type: 'matching';
  prompt: string; // e.g., "Match the terms with their definitions"
  pairs: { left: MatchingItem; right: MatchingItem }[]; // Correctly matched pairs
  // For the quiz, we'll shuffle the 'right' items
}

export interface DragDropOrderItem {
  id: string;
  text: string;
}

export interface DragDropOrderQuestion extends BaseQuestion {
  type: 'drag_drop_order';
  prompt: string; // e.g., "Arrange the following events in chronological order"
  items: DragDropOrderItem[]; // Items in the correct order
  // For the quiz, we'll shuffle the items
}

export interface DropdownQuestion extends BaseQuestion {
  type: 'dropdown';
  // Question text contains placeholders like '[DROPDOWN_1]', '[DROPDOWN_2]'
  dropdowns: {
    placeholder: string; // e.g., '[DROPDOWN_1]'
    options: string[];
    correct: string;
  }[];
}

// Union type for any question
export type Question = MultipleChoiceQuestion | FillBlankQuestion | MatchingQuestion | DragDropOrderQuestion | DropdownQuestion;

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
const makeGeminiApiRequest = async (prompt: string): Promise<any> => {
  const maxAttempts = GEMINI_API_KEYS.length * 2; // Allow multiple attempts per key
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
      const response = await fetch(`${GEMINI_API_URL}?key=${currentKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: "You are an educational content creator specializing in creating multiple-choice questions for students following the Telangana state board curriculum. " + prompt
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 4000
          }
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
            errorMessage = `GEMINI API server error (${response.status})`;
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

// Map-related keywords categorized by type
const mapKeywords = {
  general: ['map', 'location', 'identify', 'highlighted', 'shown', 'marked', 'point', 'direction', 'symbol'],
  country: ['country', 'nation', 'territory', 'border', 'international'],
  state: ['state', 'province', 'region', 'district', 'area', 'territory'],
  city: ['city', 'town', 'capital', 'metropolitan', 'urban'],
  water: ['river', 'ocean', 'sea', 'lake', 'waterway', 'stream', 'tributary', 'delta', 'coast', 'bay', 'gulf'],
  land: ['mountain', 'peninsula', 'desert', 'plateau', 'valley', 'plain', 'hill', 'range'],
  continent: ['continent', 'africa', 'asia', 'europe', 'australia', 'america', 'antarctica'],
  direction: ['north', 'south', 'east', 'west', 'northeastern', 'northwestern', 'southeastern', 'southwestern']
};

// Common countries with their center coordinates
const commonCountries: Record<string, [number, number]> = {
  'india': [20.5937, 78.9629],
  'united states': [37.0902, -95.7129],
  'china': [35.8617, 104.1954],
  'russia': [61.5240, 105.3188],
  'brazil': [-14.2350, -51.9253],
  'australia': [-25.2744, 133.7751],
  'canada': [56.1304, -106.3468],
  'japan': [36.2048, 138.2529],
  'france': [46.2276, 2.2137],
  'germany': [51.1657, 10.4515],
  'united kingdom': [55.3781, -3.4360],
  'south africa': [-30.5595, 22.9375],
  'egypt': [26.8206, 30.8025],
  'nigeria': [9.0820, 8.6753]
};

// Common Indian states with their center coordinates
const indianStates: Record<string, [number, number]> = {
  'telangana': [17.8495, 79.1151],
  'andhra pradesh': [15.9129, 79.7400],
  'tamil nadu': [11.1271, 78.6569],
  'kerala': [10.8505, 76.2711],
  'karnataka': [15.3173, 75.7139],
  'maharashtra': [19.7515, 75.7139],
  'gujarat': [22.2587, 71.1924],
  'rajasthan': [27.0238, 74.2179],
  'punjab': [31.1471, 75.3412],
  'haryana': [29.0588, 76.0856],
  'delhi': [28.7041, 77.1025],
  'uttar pradesh': [26.8467, 80.9462],
  'bihar': [25.0961, 85.3131],
  'west bengal': [22.9868, 87.8550],
  'odisha': [20.9517, 85.0985],
  'madhya pradesh': [22.9734, 78.6569],
  'chhattisgarh': [21.2787, 81.8661],
  'jharkhand': [23.6102, 85.2799],
  'assam': [26.2006, 92.9376],
  'arunachal pradesh': [28.2180, 94.7278],
  'sikkim': [27.5330, 88.5122],
  'meghalaya': [25.4670, 91.3662],
  'tripura': [23.9408, 91.9882],
  'mizoram': [23.1645, 92.9376],
  'manipur': [24.6637, 93.9063],
  'nagaland': [26.1584, 94.5624],
  'himachal pradesh': [31.1048, 77.1734],
  'uttarakhand': [30.0668, 79.0193],
  'jammu and kashmir': [33.7782, 76.5762],
  'goa': [15.2993, 74.1240]
};

/**
 * Check if a question is map-related based on its content
 * @param question The question text to check
 * @returns An object with isMap flag and detected map category
 */
const analyzeMapQuestion = (question: string): { isMap: boolean; category?: string; entity?: string } => {
  // Convert to lowercase for case-insensitive matching
  const lowercaseQuestion = question.toLowerCase();
  
  // Check if it contains any map-related keywords
  const isGeneral = mapKeywords.general.some(keyword => lowercaseQuestion.includes(keyword));
  
  if (!isGeneral) {
    // If no general map keywords, check other categories
    for (const [category, keywords] of Object.entries(mapKeywords)) {
      if (category === 'general') continue; // Skip general as we already checked
      
      if (keywords.some(keyword => lowercaseQuestion.includes(keyword))) {
        // Find specific entity if possible
        let entity: string | undefined;
        
        if (category === 'country') {
          entity = Object.keys(commonCountries).find(country => 
            lowercaseQuestion.includes(country)
          );
        } else if (category === 'state') {
          entity = Object.keys(indianStates).find(state => 
            lowercaseQuestion.includes(state)
          );
        }
        
        return { isMap: true, category, entity };
      }
    }
    
    return { isMap: false };
  }
  
  // If general map keywords found, try to identify specific category
  for (const [category, keywords] of Object.entries(mapKeywords)) {
    if (category === 'general') continue;
    
    if (keywords.some(keyword => lowercaseQuestion.includes(keyword))) {
      let entity: string | undefined;
      
      if (category === 'country') {
        entity = Object.keys(commonCountries).find(country => 
          lowercaseQuestion.includes(country)
        );
      } else if (category === 'state') {
        entity = Object.keys(indianStates).find(state => 
          lowercaseQuestion.includes(state)
        );
      }
      
      return { isMap: true, category, entity };
    }
  }
  
  return { isMap: true, category: 'general' };
};

/**
 * Generate map data for map-related questions
 * @param question The question text
 * @param analysis The map analysis result
 * @returns Map data object for display
 */
const generateMapData = (question: string, analysis: ReturnType<typeof analyzeMapQuestion>) => {
  if (!analysis.isMap) return null;
  
  const lowercaseQuestion = question.toLowerCase();
  
  // Try to find specific coordinates based on category and entity
  if (analysis.category === 'country' && analysis.entity) {
    const coords = commonCountries[analysis.entity];
    if (coords) {
      return {
        center: coords,
        zoom: 4,
        marker: coords,
        type: 'country',
        name: analysis.entity
      };
    }
  }
  
  if (analysis.category === 'state' && analysis.entity) {
    const coords = indianStates[analysis.entity];
    if (coords) {
      return {
        center: coords,
        zoom: 6,
        marker: coords,
        type: 'state',
        name: analysis.entity
      };
    }
  }
  
  // Default map data for general map questions
  return {
    center: [20.5937, 78.9629], // India center
    zoom: 5,
    type: 'general'
  };
};

/**
 * Process GEMINI API response to extract and validate questions
 * @param data The raw API response data
 * @returns The processed and validated questions
 */
const processApiResponse = (data: any): Question[] => {
  // Extract the content from the response
  const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
  
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
  let parsedQuestions: any[];
  try {
    parsedQuestions = JSON.parse(jsonContent);
  } catch (e) {
    console.error("Failed to parse JSON content:", jsonContent);
    throw new Error('Failed to parse JSON from API response');
  }

  // Validate the questions format
  if (!Array.isArray(parsedQuestions) || parsedQuestions.length === 0) {
    throw new Error('Invalid questions format from API: Expected a non-empty array.');
  }

  // Process and validate each question based on its type
  const processedQuestions: Question[] = parsedQuestions.map((q, index) => {
    // Add a unique ID
    const questionId = `q_${Date.now()}_${index}`;
    
    // Basic validation
    if (!q.type || !q.question) {
      console.warn(`Skipping question ${index + 1}: Missing type or question text.`);
      return null;
    }

    // Type-specific validation and processing
    switch (q.type) {
      case 'multiple_choice':
        if (!Array.isArray(q.options) || q.options.length < 2 || !q.correct || !q.options.includes(q.correct)) {
           console.warn(`Skipping MCQ ${index + 1}: Invalid options or correct answer.`);
           return null;
        }
        // Analyze if this is a map-related question
        const mapAnalysis = analyzeMapQuestion(q.question);
        let processedMCQuestion = q.question;
        let mapData = q.mapData;
        if (mapAnalysis.isMap) {
          processedMCQuestion = `MaP: ${q.question}`;
          if (!mapData) {
            mapData = generateMapData(q.question, mapAnalysis);
          }
        }
        return {
          ...q,
          id: questionId,
          type: 'multiple_choice',
          question: processedMCQuestion,
          options: shuffleArray(q.options), // Shuffle options
          correct: q.correct,
          ...(mapData && { mapData }),
        } as MultipleChoiceQuestion;

      case 'fill_blank':
        if (!q.correct || typeof q.correct !== 'string' || !q.question.includes('[BLANK]')) {
          console.warn(`Skipping FillBlank ${index + 1}: Missing correct answer or [BLANK] placeholder.`);
          return null;
        }
        return { ...q, id: questionId, type: 'fill_blank' } as FillBlankQuestion;

      case 'matching':
        if (!q.prompt || !Array.isArray(q.pairs) || q.pairs.length < 2 || !q.pairs.every((p: any) => p.left?.id && p.left?.text && p.right?.id && p.right?.text)) {
          console.warn(`Skipping Matching ${index + 1}: Invalid prompt or pairs structure.`);
          return null;
        }
        // We'll shuffle the 'right' side options in the component later
        return { ...q, id: questionId, type: 'matching' } as MatchingQuestion;

      case 'drag_drop_order':
         if (!q.prompt || !Array.isArray(q.items) || q.items.length < 2 || !q.items.every((item: any) => item.id && item.text)) {
           console.warn(`Skipping DragDropOrder ${index + 1}: Invalid prompt or items structure.`);
           return null;
         }
         // We'll shuffle the items in the component later
         return { ...q, id: questionId, type: 'drag_drop_order' } as DragDropOrderQuestion;

      case 'dropdown':
        if (!Array.isArray(q.dropdowns) || q.dropdowns.length === 0 || !q.dropdowns.every((dd: any) => dd.placeholder && Array.isArray(dd.options) && dd.options.length > 1 && dd.correct && dd.options.includes(dd.correct) && q.question.includes(dd.placeholder))) {
           console.warn(`Skipping Dropdown ${index + 1}: Invalid dropdowns structure or placeholder missing in question.`);
           return null;
        }
        return { ...q, id: questionId, type: 'dropdown' } as DropdownQuestion;

      default:
        console.warn(`Skipping question ${index + 1}: Unknown type "${q.type}".`);
        return null;
    }
  }).filter(q => q !== null) as Question[]; // Remove any null entries
  
  if (processedQuestions.length === 0) {
    throw new Error('No valid questions found in API response');
  }
  
  return processedQuestions;
};

/**
 * Fetch questions from GEMINI API for a specific class, subject, and chapter
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
  // Create a prompt that requests a mix of question types
  const prompt = `Generate a diverse set of 15-20 quiz questions for class ${classLevel} Telangana state board curriculum on the topic "${chapterTitle}" (${chapterDescription}) for subject ${subject}. 
Include a mix of the following question types: 'multiple_choice', 'fill_blank', 'matching', 'drag_drop_order', 'dropdown'. Ensure questions are appropriate for the grade level.

Format the output as a single JSON array containing question objects. Each object must have a unique "id" (string), "type" (string, one of the types above), and "question" (string). Follow the specific structure for each type:

1.  **multiple_choice**: 
    - "question": Question text. Can include map references (prefix with "MaP: ").
    - "options": Array of 4 strings.
    - "correct": The correct string option.
    - "imageUrl": (Optional) URL string for an image.
    - "mapData": (Optional) Object for map display (auto-generated if "MaP: " prefix is used).
    Example: 
    { "id": "mcq1", "type": "multiple_choice", "question": "What is the capital of Telangana?", "options": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar"], "correct": "Hyderabad" }

2.  **fill_blank**:
    - "question": Text containing one or more '[BLANK]' placeholders.
    - "correct": String or array of strings representing the correct word(s) for the blank(s). If multiple blanks, provide answers in order.
    Example:
    { "id": "fb1", "type": "fill_blank", "question": "The Godavari river flows through [BLANK].", "correct": "Telangana" }

3.  **matching**:
    - "prompt": Instruction text (e.g., "Match the leader with their contribution").
    - "pairs": Array of objects, each with { "left": { "id": "L1", "text": "Term A" }, "right": { "id": "R1", "text": "Definition A" } }. Ensure 'left' and 'right' ids within a pair are unique but correspond (e.g., L1 matches R1). Provide at least 3 pairs.
    Example:
    { "id": "m1", "type": "matching", "prompt": "Match rivers and states:", "pairs": [ { "left": { "id": "L1", "text": "Godavari" }, "right": { "id": "R1", "text": "Telangana" } }, { "left": { "id": "L2", "text": "Krishna" }, "right": { "id": "R2", "text": "Andhra Pradesh" } } ] }

4.  **drag_drop_order**:
    - "prompt": Instruction text (e.g., "Arrange these historical events chronologically").
    - "items": Array of objects { "id": "item1", "text": "Event A" } in the CORRECT order. Provide at least 3 items.
    Example:
    { "id": "ddo1", "type": "drag_drop_order", "prompt": "Order the numbers smallest to largest:", "items": [ { "id": "i1", "text": "10" }, { "id": "i2", "text": "25" }, { "id": "i3", "text": "50" } ] }

5.  **dropdown**:
    - "question": Text containing one or more unique placeholders like '[DROPDOWN_1]', '[DROPDOWN_2]'.
    - "dropdowns": Array of objects, one for each placeholder: { "placeholder": "[DROPDOWN_1]", "options": ["OptionA", "OptionB", "Correct"], "correct": "Correct" }. Ensure options array includes the correct answer.
    Example:
    { "id": "dd1", "type": "dropdown", "question": "Select the correct word: The sky is [DROPDOWN_1] and the grass is [DROPDOWN_2].", "dropdowns": [ { "placeholder": "[DROPDOWN_1]", "options": ["blue", "red", "green"], "correct": "blue" }, { "placeholder": "[DROPDOWN_2]", "options": ["yellow", "green", "purple"], "correct": "green" } ] }

Generate around 15-20 questions total, mixing the types. Respond ONLY with the JSON array. Do not include any other text, explanations, or markdown formatting outside the JSON structure itself.
`;

  try {
    // Make the API request with advanced retry logic
    const data = await makeGeminiApiRequest(prompt);
    
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