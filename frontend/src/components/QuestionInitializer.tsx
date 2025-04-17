import React, { useState, useEffect } from 'react';
import { ensureMinimumQuestions } from '../utils/helpers';

/**
 * Component that initializes questions for all chapters to ensure minimum question counts.
 * This runs in the background and doesn't block the UI.
 */
const QuestionInitializer: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeQuestions = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Run the question generation process
        await ensureMinimumQuestions(25);
        
        setIsComplete(true);
      } catch (err) {
        console.error('Error initializing questions:', err);
        setError('Failed to initialize questions. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    // Start the initialization process when the component mounts
    initializeQuestions();
  }, []);

  // This component doesn't render anything visible to the user
  // It just runs the initialization process in the background
  return null;
};

export default QuestionInitializer;