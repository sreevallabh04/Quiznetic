const axios = require('axios');
const { GROQ_API_KEY } = process.env;

// Array of API keys to rotate through when hitting rate limits
const GROQ_API_KEYS = [
  process.env.GROQ_API_KEY,
  // Add any additional keys as fallbacks
];

// Track the current API key index
let currentKeyIndex = 0;

// Get the current API key
const getCurrentApiKey = () => {
  return GROQ_API_KEYS[currentKeyIndex] || GROQ_API_KEY;
};

// Rotate to the next API key
const rotateToNextApiKey = () => {
  currentKeyIndex = (currentKeyIndex + 1) % GROQ_API_KEYS.length;
  return getCurrentApiKey();
};

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

const QuestionController = {
  async generateQuestions(req, res) {
    try {
      const { classLevel, subject, chapterTitle, chapterDescription, questionTypes } = req.body;

      if (!classLevel || !subject || !chapterTitle || !questionTypes || !Array.isArray(questionTypes)) {
        return res.status(400).json({ error: 'Missing required parameters' });
      }

      // Create a detailed prompt based on question types
      let typeSpecificInstructions = '';
      if (questionTypes.includes('multiple_choice')) {
        typeSpecificInstructions += `
          For multiple_choice questions:
          - Provide 4 options per question, with one correct answer
          - Make sure the options are distinct and clear
          - Format as: { "type": "multiple_choice", "question": "Question text?", "options": ["Option A", "Option B", "Option C", "Option D"], "correct": "The correct option" }`;
      }
      
      if (questionTypes.includes('fill_blank')) {
        typeSpecificInstructions += `
          For fill_blank questions:
          - Create sentences with a missing word or phrase indicated by [BLANK]
          - Make sure the answer is specific and unambiguous
          - Format as: { "type": "fill_blank", "question": "Sentence with [BLANK] to fill.", "correct": "correct answer" }`;
      }
      
      if (questionTypes.includes('matching')) {
        typeSpecificInstructions += `
          For matching questions:
          - Create pairs of related items (terms and definitions, causes and effects, etc.)
          - Include at least 4 pairs per matching question
          - Format as: { 
              "type": "matching", 
              "question": "Match the following items:", 
              "prompt": "Match each term with its correct definition",
              "pairs": [
                { "left": { "id": "l1", "text": "Term 1" }, "right": { "id": "r1", "text": "Definition 1" } },
                { "left": { "id": "l2", "text": "Term 2" }, "right": { "id": "r2", "text": "Definition 2" } }
              ]
            }`;
      }

      const prompt = `Generate ${questionTypes.length > 1 ? '10' : '5'} questions for class ${classLevel} ${subject} chapter "${chapterTitle}". 
        The chapter is described as: ${chapterDescription}.
        
        I need questions of the following types: ${questionTypes.join(', ')}.
        
        ${typeSpecificInstructions}
        
        Return the questions as a JSON array. Each question object must include the following fields:
        - id: a unique identifier string
        - type: one of ${JSON.stringify(questionTypes)}
        - question: the text of the question
        
        Make sure each question type follows its specific format as described above.
        Generate contextually relevant questions that are appropriate for students in class ${classLevel} following the Telangana State Board curriculum.
        
        Important: Your response must only contain a valid JSON array of question objects, with no additional text before or after.`;

      // Make the request to Groq API
      const response = await axios.post(GROQ_API_URL, 
        {
          model: "llama3-70b-8192",
          messages: [
            {
              role: "system",
              content: "You are an educational content creator specializing in creating questions for students following the Telangana state board curriculum."
            },
            {
              role: "user",
              content: prompt
            }
          ],
          temperature: 0.3,
          max_tokens: 4000
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getCurrentApiKey()}`
          }
        }
      );

      // Parse the response
      const questions = JSON.parse(response.data.choices[0].message.content);
      
      res.json({ success: true, questions });
    } catch (error) {
      console.error('Error generating questions:', error.message);
      
      // If rate limited, try with a different API key
      if (error.response && error.response.status === 429) {
        rotateToNextApiKey();
        return res.status(429).json({ 
          error: 'Rate limit exceeded. Please try again in a moment.',
          retryAfter: error.response.headers['retry-after'] || 60
        });
      }
      
      res.status(500).json({ 
        error: 'Failed to generate questions',
        message: error.message
      });
    }
  },

  async getQuestionTypes(req, res) {
    try {
      const { classLevel, subject } = req.query;

      if (!classLevel || !subject) {
        return res.status(400).json({ error: 'Missing required parameters' });
      }

      const questionTypes = [
        { id: 'multiple_choice', label: 'Multiple Choice', description: 'Choose the correct answer from given options' },
        { id: 'fill_blank', label: 'Fill in the Blanks', description: 'Fill in the missing word or phrase' },
        { id: 'matching', label: 'Match the Following', description: 'Match items from two columns correctly' },
        { id: 'drag_drop_order', label: 'Drag and Drop', description: 'Arrange items in the correct order' },
        { id: 'dropdown', label: 'Dropdown', description: 'Select the correct answer from a dropdown menu' }
      ];

      res.json({ success: true, questionTypes });
    } catch (error) {
      console.error('Error getting question types:', error);
      res.status(500).json({ error: 'Failed to get question types' });
    }
  }
};

module.exports = QuestionController; 