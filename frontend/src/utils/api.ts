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
        let entity = '';
        
        if (category === 'country') {
          for (const country of Object.keys(commonCountries)) {
            if (lowercaseQuestion.includes(country)) {
              entity = country;
              break;
            }
          }
        } else if (category === 'state') {
          for (const state of Object.keys(indianStates)) {
            if (lowercaseQuestion.includes(state)) {
              entity = state;
              break;
            }
          }
        }
        
        return { isMap: true, category, entity };
      }
    }
    
    return { isMap: false };
  }
  
  // If contains general map keywords, determine the most relevant category
  for (const [category, keywords] of Object.entries(mapKeywords)) {
    if (category === 'general') continue; // Skip general as we're looking for specifics
    
    if (keywords.some(keyword => lowercaseQuestion.includes(keyword))) {
      // Find specific entity if possible
      let entity = '';
      
      if (category === 'country') {
        for (const country of Object.keys(commonCountries)) {
          if (lowercaseQuestion.includes(country)) {
            entity = country;
            break;
          }
        }
      } else if (category === 'state') {
        for (const state of Object.keys(indianStates)) {
          if (lowercaseQuestion.includes(state)) {
            entity = state;
            break;
          }
        }
      }
      
      return { isMap: true, category, entity };
    }
  }
  
  // If has general map keywords but no specific category was found
  return { isMap: true, category: 'general' };
};

/**
 * Generate appropriate map data based on question content
 * @param question The question text
 * @param analysis The result of question analysis
 * @returns A mapData object or undefined if can't generate valid map data
 */
const generateMapData = (question: string, analysis: ReturnType<typeof analyzeMapQuestion>) => {
  if (!analysis.isMap) return undefined;
  
  // Default map settings
  let center: [number, number] = [20.5937, 78.9629]; // Center of India by default
  let zoom = 5;
  let marker: [number, number] = [...center];
  let highlightFeature: string | undefined;
  let highlightState: string | undefined;
  let highlightCountry: string | undefined;
  
  // Adjust settings based on category
  if (analysis.category === 'country' && analysis.entity && commonCountries[analysis.entity]) {
    center = commonCountries[analysis.entity];
    marker = [...center];
    highlightCountry = analysis.entity.replace(/\s+/g, '_').toLowerCase();
    zoom = 4;
  } else if (analysis.category === 'state' && analysis.entity && indianStates[analysis.entity]) {
    center = indianStates[analysis.entity];
    marker = [...center];
    highlightState = analysis.entity.replace(/\s+/g, '_').toLowerCase();
    zoom = 6;
  } else if (analysis.category === 'city') {
    zoom = 8;
    highlightFeature = 'city';
  } else if (analysis.category === 'water') {
    highlightFeature = 'water';
    if (question.toLowerCase().includes('river')) {
      highlightFeature = 'river';
    } else if (question.toLowerCase().includes('ocean')) {
      highlightFeature = 'ocean';
      zoom = 3;
    } else if (question.toLowerCase().includes('sea')) {
      highlightFeature = 'sea';
      zoom = 4;
    } else if (question.toLowerCase().includes('lake')) {
      highlightFeature = 'lake';
      zoom = 7;
    }
  } else if (analysis.category === 'land') {
    highlightFeature = 'land';
    if (question.toLowerCase().includes('mountain')) {
      highlightFeature = 'mountain';
    } else if (question.toLowerCase().includes('desert')) {
      highlightFeature = 'desert';
    }
  } else if (analysis.category === 'continent') {
    zoom = 2;
    highlightFeature = 'continent';
    
    // Try to determine which continent
    const continents = ['africa', 'asia', 'europe', 'australia', 'north america', 'south america', 'antarctica'];
    for (const continent of continents) {
      if (question.toLowerCase().includes(continent)) {
        if (continent === 'africa') center = [8.7832, 17.5731];
        else if (continent === 'asia') center = [34.0479, 100.6197];
        else if (continent === 'europe') center = [54.5260, 15.2551];
        else if (continent === 'australia') center = [-25.2744, 133.7751];
        else if (continent === 'north america') center = [54.5260, -105.2551];
        else if (continent === 'south america') center = [-8.7832, -55.4915];
        else if (continent === 'antarctica') center = [-82.8628, 135.0000];
        marker = [...center];
        break;
      }
    }
  }
  
  // Create the mapData object
  const mapData: any = {
    center,
    zoom,
    marker
  };
  
  // Add highlight information if relevant
  if (highlightFeature) mapData.highlightFeature = highlightFeature;
  if (highlightState) mapData.highlightState = highlightState;
  if (highlightCountry) mapData.highlightCountry = highlightCountry;
  
  return mapData;
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

  // Process each question to add MaP prefix, shuffle options, and add map data
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
    
    // Analyze if this is a map-related question and what kind
    const mapAnalysis = analyzeMapQuestion(q.question);
    
    // Variables for processed question
    let processedQuestion = q.question;
    let mapData = q.mapData; // Keep existing mapData if any
    
    // If map-related, add prefix and generate mapData if needed
    if (mapAnalysis.isMap) {
      // Add "MaP" prefix
      processedQuestion = `MaP: ${q.question}`;
      
      // Generate mapData if none exists
      if (!mapData) {
        mapData = generateMapData(q.question, mapAnalysis);
      }
    }
    
    // Save the correct answer
    const correctAnswer = q.correct;
    
    // Shuffle options
    const shuffledOptions = shuffleArray(q.options);
    
    // Return processed question
    return {
      question: processedQuestion,
      options: shuffledOptions,
      correct: correctAnswer,
      // Include mapData if available
      ...(mapData && { mapData }),
      // Maintain any other properties
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