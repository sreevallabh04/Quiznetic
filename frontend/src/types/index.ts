export type QuestionType = 'multiple_choice' | 'fill_blank' | 'matching' | 'drag_drop_order' | 'dropdown';

export interface BaseQuestion {
  id: string;
  type: QuestionType;
  question: string;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple_choice';
  options: string[];
  correct: string;
  mapData?: any;
  imageUrl?: string;
}

export interface FillBlankQuestion extends BaseQuestion {
  type: 'fill_blank';
  correct: string;
}

export interface MatchingQuestion extends BaseQuestion {
  type: 'matching';
  prompt: string;
  pairs: { left: MatchingItem; right: MatchingItem }[];
}

export interface DragDropOrderQuestion extends BaseQuestion {
  type: 'drag_drop_order';
  prompt: string;
  items: DragDropOrderItem[];
}

export interface DropdownQuestion extends BaseQuestion {
  type: 'dropdown';
  dropdowns: {
    placeholder: string;
    options: string[];
    correct: string;
  }[];
}

export interface MatchingItem {
  id: string;
  text: string;
}

export interface DragDropOrderItem {
  id: string;
  text: string;
}

export type Question = 
  | MultipleChoiceQuestion 
  | FillBlankQuestion 
  | MatchingQuestion 
  | DragDropOrderQuestion 
  | DropdownQuestion;

export interface APIResponse {
  success: boolean;
  questions: Question[];
  error?: string;
}

export interface QuestionTypeResponse {
  success: boolean;
  questionTypes: {
    id: QuestionType;
    label: string;
    description: string;
  }[];
  error?: string;
}

// Gamification System Types
export interface UserGamificationProfile {
  userId: string;
  level: number;
  totalXP: number;
  currentXP: number; // XP in current level
  xpToNextLevel: number;
  streak: {
    current: number;
    longest: number;
    lastActivity: Date;
  };
  masteryLevels: Record<string, SubjectMastery>; // subject -> mastery
  achievements: Achievement[];
  badges: Badge[];
  personalityType: PersonalityType;
  engagementScore: number;
  flowStateDetected: boolean;
  lastActiveTime: Date;
  sessionStats: SessionStats;
  learningPath: LearningPathNode[];
  preferences: LearningPreferences;
}

export interface SubjectMastery {
  subject: string;
  overallMastery: number; // 0-100
  competencies: {
    accuracy: number;
    consistency: number;
    speed: number;
    improvement: number;
    retention: number;
    difficulty: number;
  };
  chapterMastery: Record<string, number>; // chapter -> mastery level
  weakAreas: string[];
  strongAreas: string[];
  recommendedDifficulty: number;
  lastUpdated: Date;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  category: AchievementCategory;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  icon: string;
  xpReward: number;
  unlockedAt: Date;
  conditions: AchievementCondition[];
  progress: number; // 0-100
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: Date;
  level: number; // For tiered badges
  category: BadgeCategory;
}

export interface SessionStats {
  questionsAnswered: number;
  correctAnswers: number;
  accuracy: number;
  averageTimePerQuestion: number;
  difficultiesAttempted: number[];
  subjectsStudied: string[];
  xpEarned: number;
  achievementsUnlocked: number;
  flowStateMinutes: number;
  sessionDuration: number;
  engagementEvents: EngagementEvent[];
}

export interface LearningPathNode {
  id: string;
  type: 'concept' | 'practice' | 'assessment' | 'review';
  subject: string;
  chapter: string;
  difficulty: number;
  prerequisites: string[];
  estimatedTime: number;
  completed: boolean;
  mastery: number;
  recommendedNext: string[];
}

export interface EngagementEvent {
  timestamp: Date;
  type: 'question_start' | 'question_end' | 'correct_answer' | 'incorrect_answer' | 'hint_used' | 'pause' | 'resume';
  metadata: Record<string, any>;
}

export type PersonalityType = 'achiever' | 'explorer' | 'socializer' | 'competitor';
export type AchievementCategory = 'accuracy' | 'speed' | 'consistency' | 'exploration' | 'mastery' | 'streak' | 'special';
export type BadgeCategory = 'subject' | 'difficulty' | 'time' | 'milestone' | 'special';

export interface LearningPreferences {
  preferredDifficulty: number;
  preferredSubjects: string[];
  studyTimePreference: 'morning' | 'afternoon' | 'evening' | 'night';
  sessionLength: 'short' | 'medium' | 'long';
  feedbackStyle: 'immediate' | 'delayed' | 'summary';
  motivationStyle: 'achievement' | 'progress' | 'competition' | 'exploration';
}

export interface AchievementCondition {
  type: 'accuracy' | 'streak' | 'questions_answered' | 'time_spent' | 'subjects_mastered' | 'consecutive_correct' | 'difficulty_threshold' | 'custom';
  operator: 'gt' | 'gte' | 'eq' | 'lt' | 'lte';
  value: number;
  timeframe?: 'session' | 'day' | 'week' | 'month' | 'all_time';
}

// Enhanced Question Types for Gamification
export interface GamifiedQuestion extends Question {
  difficultyWeight: number;
  masteryContribution: number;
  timeBonus: number;
  streakMultiplier: number;
  baseXP: number;
}

export interface QuestionResult {
  questionId: string;
  isCorrect: boolean;
  timeSpent: number;
  difficulty: number;
  hintsUsed: number;
  attempts: number;
  xpEarned: number;
  masteryGain: number;
  bonusFactors: {
    speedBonus: number;
    streakBonus: number;
    difficultyBonus: number;
    accuracyBonus: number;
  };
} 