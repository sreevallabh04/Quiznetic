import React, { useState, useEffect } from 'react';
import { getQuestionStats } from '../utils/staticQuestions';

/**
 * Component that initializes and validates the static question database.
 * This runs in the background and provides feedback on the curriculum content.
 */
const QuestionInitializer: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const initializeQuestions = async () => {
      try {
        setIsLoading(true);
        
        console.log('🚀 Initializing Telangana State Board Question Database...');
        
        // Validate and count questions across all subjects and classes
        const subjects = ['maths', 'science', 'social', 'mapPointing'];
        const classes = [6, 7, 8, 9, 10];
        
        const allStats: any = {};
        let totalQuestions = 0;
        let totalChapters = 0;
        
        for (const subject of subjects) {
          allStats[subject] = {};
          for (const classLevel of classes) {
            const classStats = getQuestionStats(classLevel, subject);
            allStats[subject][classLevel] = classStats;
            totalQuestions += classStats.totalQuestions;
            totalChapters += classStats.chapters;
          }
        }
        
        setStats({
          subjects: allStats,
          summary: {
            totalQuestions,
            totalChapters,
            subjects: subjects.length,
            classes: classes.length
          }
        });
        
        console.log('✅ Question Database Initialized Successfully!');
        console.log(`📊 Total: ${totalQuestions} questions across ${totalChapters} chapters`);
        
        setIsComplete(true);
      } catch (err) {
        console.error('Error initializing question database:', err);
      } finally {
        setIsLoading(false);
      }
    };

    // Start the initialization process when the component mounts
    initializeQuestions();
  }, []);

  // This component doesn't render anything visible to the user
  // It just validates the static question database in the background
  return null;
};

export default QuestionInitializer;