import { useUser } from '@clerk/clerk-react';

export interface StudentAnalytics {
  studentId: string;
  totalQuizzes: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number; // in minutes
  subjectScores: {
    [subject: string]: {
      total: number;
      correct: number;
      avgTime: number;
      lastAttempted: Date;
    }
  };
  chapterProgress: {
    [chapterId: string]: {
      attempts: number;
      bestScore: number;
      lastAttempted: Date;
      timeSpent: number;
    }
  };
  weeklyProgress: {
    [week: string]: {
      quizzes: number;
      score: number;
      timeSpent: number;
    }
  };
  achievements: string[];
  streaks: {
    current: number;
    longest: number;
    lastQuizDate: Date;
  };
  weakAreas: string[];
  strengths: string[];
}

export const useAnalytics = () => {
  const { user } = useUser();

  const getAnalytics = (): StudentAnalytics => {
    // Get from localStorage first
    const localData = localStorage.getItem('quiznetic_analytics');
    const localAnalytics = localData ? JSON.parse(localData) : getDefaultAnalytics();

    // Merge with user metadata if available
    if (user?.publicMetadata?.analytics) {
      return { ...localAnalytics, ...user.publicMetadata.analytics };
    }

    return localAnalytics;
  };

  const updateAnalytics = async (newData: Partial<StudentAnalytics>) => {
    const currentAnalytics = getAnalytics();
    const updatedAnalytics = { ...currentAnalytics, ...newData };

    // Save to localStorage immediately
    localStorage.setItem('quiznetic_analytics', JSON.stringify(updatedAnalytics));

    // Sync to Clerk if user is signed in
    if (user) {
      try {
        await user.update({
          publicMetadata: {
            ...user.publicMetadata,
            analytics: updatedAnalytics,
            lastSync: new Date().toISOString()
          }
        });
      } catch (error) {
        console.error('Failed to sync analytics to Clerk:', error);
      }
    }

    return updatedAnalytics;
  };

  const trackQuizCompletion = async (quizData: {
    subject: string;
    chapterId: string;
    totalQuestions: number;
    score: number;
    timeSpent: number;
  }) => {
    const analytics = getAnalytics();
    const today = new Date().toISOString().split('T')[0];
    const thisWeek = getWeekKey(new Date());

    // Update overall stats
    analytics.totalQuizzes++;
    analytics.totalQuestions += quizData.totalQuestions;
    analytics.correctAnswers += quizData.score;
    analytics.timeSpent += quizData.timeSpent;

    // Update subject scores
    if (!analytics.subjectScores[quizData.subject]) {
      analytics.subjectScores[quizData.subject] = {
        total: 0,
        correct: 0,
        avgTime: 0,
        lastAttempted: new Date()
      };
    }
    
    const subjectScore = analytics.subjectScores[quizData.subject];
    subjectScore.total += quizData.totalQuestions;
    subjectScore.correct += quizData.score;
    subjectScore.avgTime = analytics.timeSpent / analytics.totalQuizzes;
    subjectScore.lastAttempted = new Date();

    // Update chapter progress
    const chapterKey = `${quizData.subject}_${quizData.chapterId}`;
    if (!analytics.chapterProgress[chapterKey]) {
      analytics.chapterProgress[chapterKey] = {
        attempts: 0,
        bestScore: 0,
        lastAttempted: new Date(),
        timeSpent: 0
      };
    }
    
    const chapterProgress = analytics.chapterProgress[chapterKey];
    chapterProgress.attempts++;
    chapterProgress.bestScore = Math.max(chapterProgress.bestScore, 
      (quizData.score / quizData.totalQuestions) * 100);
    chapterProgress.lastAttempted = new Date();
    chapterProgress.timeSpent += quizData.timeSpent;

    // Update weekly progress
    if (!analytics.weeklyProgress[thisWeek]) {
      analytics.weeklyProgress[thisWeek] = {
        quizzes: 0,
        score: 0,
        timeSpent: 0
      };
    }
    
    const weeklyData = analytics.weeklyProgress[thisWeek];
    weeklyData.quizzes++;
    weeklyData.score += quizData.score;
    weeklyData.timeSpent += quizData.timeSpent;

    // Update streaks
    const lastQuizDate = new Date(analytics.streaks.lastQuizDate);
    const today_date = new Date();
    const daysDiff = Math.floor((today_date.getTime() - lastQuizDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysDiff <= 1) {
      analytics.streaks.current++;
    } else {
      analytics.streaks.current = 1;
    }
    
    analytics.streaks.longest = Math.max(analytics.streaks.longest, analytics.streaks.current);
    analytics.streaks.lastQuizDate = today_date;

    // Check for achievements
    checkAchievements(analytics, quizData);

    return await updateAnalytics(analytics);
  };

  return {
    getAnalytics,
    updateAnalytics,
    trackQuizCompletion
  };
};

const getDefaultAnalytics = (): StudentAnalytics => ({
  studentId: '',
  totalQuizzes: 0,
  totalQuestions: 0,
  correctAnswers: 0,
  timeSpent: 0,
  subjectScores: {},
  chapterProgress: {},
  weeklyProgress: {},
  achievements: [],
  streaks: {
    current: 0,
    longest: 0,
    lastQuizDate: new Date()
  },
  weakAreas: [],
  strengths: []
});

const getWeekKey = (date: Date): string => {
  const year = date.getFullYear();
  const week = Math.ceil(date.getDate() / 7);
  const month = date.getMonth() + 1;
  return `${year}-${month}-W${week}`;
};

const checkAchievements = (analytics: StudentAnalytics, quizData: any) => {
  const achievements = [...analytics.achievements];
  
  // Quiz milestones
  if (analytics.totalQuizzes === 10 && !achievements.includes('first_10_quizzes')) {
    achievements.push('first_10_quizzes');
  }
  
  if (analytics.totalQuizzes === 50 && !achievements.includes('quiz_champion')) {
    achievements.push('quiz_champion');
  }
  
  // Subject mastery
  Object.entries(analytics.subjectScores).forEach(([subject, scores]) => {
    const accuracy = (scores.correct / scores.total) * 100;
    if (accuracy >= 90 && scores.total >= 50) {
      const achievementKey = `${subject}_master`;
      if (!achievements.includes(achievementKey)) {
        achievements.push(achievementKey);
      }
    }
  });
  
  // Streak achievements
  if (analytics.streaks.current === 7 && !achievements.includes('week_streak')) {
    achievements.push('week_streak');
  }
  
  analytics.achievements = achievements;
}; 