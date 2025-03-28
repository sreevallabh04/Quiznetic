// GROQ API utilities for fetching questions
const GROQ_API_KEY = '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';
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
 * Fetch questions from GROQ API for a specific class, subject, and chapter
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
  try {
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

    // Make the API request
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
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

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    const data = await response.json();
    
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

    // Make sure each question has the required properties
    const validQuestions = questions.filter(q => 
      q.question && 
      Array.isArray(q.options) && 
      q.options.length === 4 && 
      q.correct && 
      q.options.includes(q.correct)
    );

    if (validQuestions.length === 0) {
      throw new Error('No valid questions found in API response');
    }

    return {
      success: true,
      questions: validQuestions
    };
  } catch (error) {
    console.error('Error fetching questions from API:', error);
    return {
      success: false,
      questions: [],
      error: error instanceof Error ? error.message : 'Unknown error fetching questions'
    };
  }
};