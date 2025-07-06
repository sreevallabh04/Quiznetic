import { 
  UserGamificationProfile, 
  SubjectMastery, 
  Achievement, 
  QuestionResult, 
  GamifiedQuestion,
  SessionStats,
  PersonalityType,
  LearningPathNode,
  AchievementCondition,
  EngagementEvent
} from '../types';

export class GamificationEngine {
  private static instance: GamificationEngine;
  private userProfile: UserGamificationProfile | null = null;
  private sessionStartTime: Date = new Date();
  private engagementEvents: EngagementEvent[] = [];

  static getInstance(): GamificationEngine {
    if (!GamificationEngine.instance) {
      GamificationEngine.instance = new GamificationEngine();
    }
    return GamificationEngine.instance;
  }

  // Complex XP Calculation with Multiple Factors
  calculateXP(result: QuestionResult, profile: UserGamificationProfile): number {
    const baseXP = this.getBaseXP(result.difficulty);
    
    // Gaussian speed multiplier for optimal time calculations
    const speedMultiplier = this.calculateSpeedMultiplier(result.timeSpent, result.difficulty);
    
    // Logarithmic streak bonus with diminishing returns
    const streakBonus = this.calculateStreakBonus(profile.streak.current);
    
    // Circadian rhythm bonus based on user's optimal learning time
    const circadianBonus = this.calculateCircadianBonus(profile.preferences.studyTimePreference);
    
    // Difficulty progression bonus
    const difficultyBonus = this.calculateDifficultyBonus(result.difficulty, profile.level);
    
    // Accuracy consistency bonus
    const accuracyBonus = this.calculateAccuracyBonus(result.isCorrect, profile.sessionStats.accuracy);
    
    // Flow state detection bonus
    const flowBonus = profile.flowStateDetected ? 1.2 : 1.0;
    
    // Mastery gap bonus (encourages working on weak areas)
    const masteryGapBonus = this.calculateMasteryGapBonus(result, profile);

    const totalXP = Math.round(
      baseXP * 
      speedMultiplier * 
      (1 + streakBonus) * 
      (1 + circadianBonus) * 
      (1 + difficultyBonus) * 
      (1 + accuracyBonus) * 
      flowBonus *
      (1 + masteryGapBonus)
    );

    return Math.max(1, totalXP); // Minimum 1 XP
  }

  // Gaussian distribution for optimal time calculation
  private calculateSpeedMultiplier(timeSpent: number, difficulty: number): number {
    const optimalTime = this.getOptimalTime(difficulty);
    const variance = optimalTime * 0.3; // 30% variance
    
    // Gaussian function: e^(-0.5 * ((x - μ) / σ)²)
    const exponent = -0.5 * Math.pow((timeSpent - optimalTime) / variance, 2);
    const gaussian = Math.exp(exponent);
    
    // Scale to meaningful multiplier range (0.5x to 2.0x)
    return 0.5 + (1.5 * gaussian);
  }

  private getOptimalTime(difficulty: number): number {
    // Exponential scaling: easy questions = 15s, hard questions = 120s
    return 15 * Math.pow(2, difficulty / 2);
  }

  private calculateStreakBonus(streak: number): number {
    // Logarithmic bonus with diminishing returns: log₂(streak + 1) * 0.1
    return Math.log2(streak + 1) * 0.1;
  }

  private calculateCircadianBonus(studyTime: string): number {
    const currentHour = new Date().getHours();
    const timeMap = {
      'morning': [6, 11],
      'afternoon': [12, 17],
      'evening': [18, 22],
      'night': [23, 5]
    };
    
    const [start, end] = timeMap[studyTime as keyof typeof timeMap] || [0, 23];
    const inOptimalTime = (currentHour >= start && currentHour <= end) || 
                         (studyTime === 'night' && (currentHour >= 23 || currentHour <= 5));
    
    return inOptimalTime ? 0.15 : 0; // 15% bonus during optimal time
  }

  private calculateDifficultyBonus(difficulty: number, userLevel: number): number {
    // Encourage attempting harder questions relative to user level
    const relativeDifficulty = difficulty / Math.max(1, userLevel);
    return Math.min(0.5, relativeDifficulty * 0.2); // Max 50% bonus
  }

  private calculateAccuracyBonus(isCorrect: boolean, sessionAccuracy: number): number {
    if (!isCorrect) return -0.1; // Small penalty for wrong answers
    
    // Bonus based on maintaining high accuracy
    if (sessionAccuracy >= 0.9) return 0.3;
    if (sessionAccuracy >= 0.8) return 0.2;
    if (sessionAccuracy >= 0.7) return 0.1;
    return 0;
  }

  private calculateMasteryGapBonus(result: QuestionResult, profile: UserGamificationProfile): number {
    // Encourage working on subjects with lower mastery
    const subjectMastery = this.getSubjectMasteryFromQuestion(result.questionId, profile);
    if (subjectMastery < 0.5) return 0.25; // 25% bonus for weak subjects
    if (subjectMastery < 0.7) return 0.15; // 15% bonus for medium subjects
    return 0;
  }

  // Multi-dimensional Mastery Calculation
  calculateMastery(subject: string, results: QuestionResult[], profile: UserGamificationProfile): SubjectMastery {
    const competencies = this.calculateCompetencies(results);
    const overallMastery = this.calculateOverallMastery(competencies);
    
    return {
      subject,
      overallMastery,
      competencies,
      chapterMastery: this.calculateChapterMastery(subject, results),
      weakAreas: this.identifyWeakAreas(competencies),
      strongAreas: this.identifyStrongAreas(competencies),
      recommendedDifficulty: this.calculateRecommendedDifficulty(overallMastery, profile.level),
      lastUpdated: new Date()
    };
  }

  private calculateCompetencies(results: QuestionResult[]) {
    const accuracy = this.calculateAccuracyCompetency(results);
    const consistency = this.calculateConsistencyCompetency(results);
    const speed = this.calculateSpeedCompetency(results);
    const improvement = this.calculateImprovementCompetency(results);
    const retention = this.calculateRetentionCompetency(results);
    const difficulty = this.calculateDifficultyCompetency(results);

    return { accuracy, consistency, speed, improvement, retention, difficulty };
  }

  private calculateOverallMastery(competencies: any): number {
    // Weighted combination of competencies
    const weights = {
      accuracy: 0.35,
      consistency: 0.20,
      speed: 0.15,
      improvement: 0.10,
      retention: 0.10,
      difficulty: 0.10
    };

    return Object.entries(weights).reduce((total, [key, weight]) => {
      return total + (competencies[key] * weight);
    }, 0);
  }

  private calculateAccuracyCompetency(results: QuestionResult[]): number {
    if (results.length === 0) return 0;
    return results.filter(r => r.isCorrect).length / results.length * 100;
  }

  private calculateConsistencyCompetency(results: QuestionResult[]): number {
    if (results.length < 5) return 50; // Default for insufficient data
    
    const accuracies = this.getRecentAccuracyTrend(results, 10);
    const variance = this.calculateVariance(accuracies);
    
    // Lower variance = higher consistency (inverted scale)
    return Math.max(0, 100 - (variance * 400));
  }

  private calculateSpeedCompetency(results: QuestionResult[]): number {
    if (results.length === 0) return 0;
    
    const avgTime = results.reduce((sum, r) => sum + r.timeSpent, 0) / results.length;
    const optimalTime = results.reduce((sum, r) => sum + this.getOptimalTime(r.difficulty), 0) / results.length;
    
    // Score based on how close to optimal time
    const ratio = Math.min(avgTime / optimalTime, 2); // Cap at 2x optimal
    return Math.max(0, 100 - (Math.abs(1 - ratio) * 100));
  }

  private calculateImprovementCompetency(results: QuestionResult[]): number {
    if (results.length < 10) return 50; // Default for insufficient data
    
    const recentAccuracy = this.getRecentAccuracy(results, 20);
    const pastAccuracy = this.getRecentAccuracy(results.slice(0, -20), 20);
    
    const improvement = recentAccuracy - pastAccuracy;
    return Math.max(0, Math.min(100, 50 + (improvement * 100)));
  }

  private calculateRetentionCompetency(results: QuestionResult[]): number {
    // Simplified retention calculation - would need question tracking in real implementation
    const recentResults = results.slice(-50);
    const oldTopics = new Set();
    const recentCorrect = recentResults.filter(r => {
      if (oldTopics.has(r.questionId)) {
        return r.isCorrect; // Retention test
      }
      oldTopics.add(r.questionId);
      return false;
    });
    
    return recentCorrect.length > 0 ? (recentCorrect.filter(r => r).length / recentCorrect.length * 100) : 75;
  }

  private calculateDifficultyCompetency(results: QuestionResult[]): number {
    if (results.length === 0) return 0;
    
    const maxDifficulty = Math.max(...results.map(r => r.difficulty));
    const avgDifficulty = results.reduce((sum, r) => sum + r.difficulty, 0) / results.length;
    
    return (avgDifficulty / Math.max(1, maxDifficulty)) * 100;
  }

  // Flow State Detection Algorithm
  detectFlowState(events: EngagementEvent[]): boolean {
    if (events.length < 10) return false;
    
    const recentEvents = events.slice(-20);
    const responseTimes = this.extractResponseTimes(recentEvents);
    
    // Flow state indicators:
    // 1. Consistent response times (low variance)
    // 2. No long pauses
    // 3. Sustained engagement
    
    const variance = this.calculateVariance(responseTimes);
    const avgResponseTime = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;
    const hasLongPauses = responseTimes.some(time => time > avgResponseTime * 2);
    
    const lowVariance = variance < (avgResponseTime * 0.3);
    const consistentTiming = !hasLongPauses;
    const sustainedEngagement = recentEvents.length >= 15;
    
    return lowVariance && consistentTiming && sustainedEngagement;
  }

  // Personality Type Detection
  detectPersonalityType(profile: UserGamificationProfile): PersonalityType {
    const { sessionStats, achievements, preferences } = profile;
    
    const scores = {
      achiever: 0,
      explorer: 0,
      socializer: 0,
      competitor: 0
    };
    
    // Achievement-oriented behavior
    if (achievements.length > profile.level * 2) scores.achiever += 2;
    if (sessionStats.accuracy > 0.85) scores.achiever += 1;
    
    // Exploration behavior
    if (sessionStats.subjectsStudied.length > 2) scores.explorer += 2;
    if (sessionStats.difficultiesAttempted.length > 3) scores.explorer += 1;
    
    // Social behavior (would need multiplayer features)
    // Placeholder for future social features
    
    // Competitive behavior
    if (profile.streak.current > 7) scores.competitor += 2;
    if (sessionStats.averageTimePerQuestion < 30) scores.competitor += 1;
    
    return Object.entries(scores).reduce((a, b) => scores[a[0] as PersonalityType] > scores[b[0] as PersonalityType] ? a : b)[0] as PersonalityType;
  }

  // Achievement System
  checkAchievements(profile: UserGamificationProfile, result: QuestionResult): Achievement[] {
    const newAchievements: Achievement[] = [];
    const achievements = this.getAllPossibleAchievements();
    
    for (const achievement of achievements) {
      if (this.isAchievementEarned(achievement, profile, result) && 
          !profile.achievements.some(a => a.id === achievement.id)) {
        newAchievements.push({
          ...achievement,
          unlockedAt: new Date(),
          progress: 100
        });
      }
    }
    
    return newAchievements;
  }

  private isAchievementEarned(achievement: Achievement, profile: UserGamificationProfile, result: QuestionResult): boolean {
    return achievement.conditions.every(condition => 
      this.evaluateAchievementCondition(condition, profile, result)
    );
  }

  private evaluateAchievementCondition(condition: AchievementCondition, profile: UserGamificationProfile, result: QuestionResult): boolean {
    let value: number;
    
    switch (condition.type) {
      case 'accuracy':
        value = profile.sessionStats.accuracy;
        break;
      case 'streak':
        value = profile.streak.current;
        break;
      case 'questions_answered':
        value = profile.sessionStats.questionsAnswered;
        break;
      case 'consecutive_correct':
        value = this.getConsecutiveCorrect(profile);
        break;
      default:
        return false;
    }
    
    switch (condition.operator) {
      case 'gt': return value > condition.value;
      case 'gte': return value >= condition.value;
      case 'eq': return value === condition.value;
      case 'lt': return value < condition.value;
      case 'lte': return value <= condition.value;
      default: return false;
    }
  }

  // Adaptive Learning Path Generation
  generateLearningPath(profile: UserGamificationProfile): LearningPathNode[] {
    const path: LearningPathNode[] = [];
    const masteryLevels = profile.masteryLevels;
    
    // Identify subjects that need work
    const subjectsToImprove = Object.entries(masteryLevels)
      .filter(([_, mastery]) => mastery.overallMastery < 70)
      .sort((a, b) => a[1].overallMastery - b[1].overallMastery);
    
    // Generate path based on Zone of Proximal Development
    for (const [subject, mastery] of subjectsToImprove) {
      const difficulty = this.calculateOptimalDifficulty(mastery, profile.level);
      const weakChapters = mastery.weakAreas.slice(0, 3); // Focus on top 3 weak areas
      
      for (const chapter of weakChapters) {
        path.push({
          id: `${subject}-${chapter}-${Date.now()}`,
          type: 'practice',
          subject,
          chapter,
          difficulty,
          prerequisites: [],
          estimatedTime: 15,
          completed: false,
          mastery: mastery.chapterMastery[chapter] || 0,
          recommendedNext: []
        });
      }
    }
    
    return path.slice(0, 10); // Limit to 10 items
  }

  // Helper methods
  private getBaseXP(difficulty: number): number {
    return 10 + (difficulty * 5); // Base XP scales with difficulty
  }

  private getSubjectMasteryFromQuestion(questionId: string, profile: UserGamificationProfile): number {
    // Simplified - would need question metadata in real implementation
    return 0.5; // Default mastery
  }

  private calculateVariance(values: number[]): number {
    if (values.length === 0) return 0;
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const squaredDiffs = values.map(value => Math.pow(value - mean, 2));
    return squaredDiffs.reduce((a, b) => a + b, 0) / values.length;
  }

  private getRecentAccuracyTrend(results: QuestionResult[], count: number): number[] {
    return results.slice(-count).map((_, index, arr) => {
      const windowSize = 5;
      const start = Math.max(0, index - windowSize);
      const window = arr.slice(start, index + 1);
      return window.filter(r => r.isCorrect).length / window.length;
    });
  }

  private getRecentAccuracy(results: QuestionResult[], count: number): number {
    const recent = results.slice(-count);
    if (recent.length === 0) return 0;
    return recent.filter(r => r.isCorrect).length / recent.length;
  }

  private extractResponseTimes(events: EngagementEvent[]): number[] {
    const times: number[] = [];
    let lastStart: Date | null = null;
    
    for (const event of events) {
      if (event.type === 'question_start') {
        lastStart = event.timestamp;
      } else if (event.type === 'question_end' && lastStart) {
        times.push(event.timestamp.getTime() - lastStart.getTime());
        lastStart = null;
      }
    }
    
    return times;
  }

  private calculateChapterMastery(subject: string, results: QuestionResult[]): Record<string, number> {
    // Simplified - would need question-to-chapter mapping
    return {};
  }

  private identifyWeakAreas(competencies: any): string[] {
    return Object.entries(competencies)
      .filter(([_, score]) => (score as number) < 60)
      .map(([area, _]) => area);
  }

  private identifyStrongAreas(competencies: any): string[] {
    return Object.entries(competencies)
      .filter(([_, score]) => (score as number) > 80)
      .map(([area, _]) => area);
  }

  private calculateRecommendedDifficulty(mastery: number, level: number): number {
    // Zone of Proximal Development: slightly above current mastery
    const baseRec = (mastery / 100) * 10; // Convert to 1-10 scale
    const levelAdjustment = Math.min(level / 10, 2); // Level-based adjustment
    return Math.min(10, Math.max(1, baseRec + levelAdjustment + 1));
  }

  private getConsecutiveCorrect(profile: UserGamificationProfile): number {
    // Simplified - would need to track this in session
    return 0;
  }

  private calculateOptimalDifficulty(mastery: SubjectMastery, level: number): number {
    return this.calculateRecommendedDifficulty(mastery.overallMastery, level);
  }

  private getAllPossibleAchievements(): Achievement[] {
    return [
      {
        id: 'first_correct',
        name: 'First Steps',
        description: 'Answer your first question correctly',
        category: 'accuracy',
        rarity: 'common',
        icon: '🎯',
        xpReward: 10,
        unlockedAt: new Date(),
        conditions: [{ type: 'questions_answered', operator: 'gte', value: 1 }],
        progress: 0
      },
      {
        id: 'perfectionist',
        name: 'Perfectionist',
        description: 'Achieve 100% accuracy in a session with 10+ questions',
        category: 'accuracy',
        rarity: 'rare',
        icon: '💎',
        xpReward: 100,
        unlockedAt: new Date(),
        conditions: [
          { type: 'accuracy', operator: 'eq', value: 1 },
          { type: 'questions_answered', operator: 'gte', value: 10 }
        ],
        progress: 0
      },
      {
        id: 'speed_demon',
        name: 'Speed Demon',
        description: 'Answer 20 questions in under 5 minutes',
        category: 'speed',
        rarity: 'epic',
        icon: '⚡',
        xpReward: 150,
        unlockedAt: new Date(),
        conditions: [{ type: 'questions_answered', operator: 'gte', value: 20 }],
        progress: 0
      },
      {
        id: 'streak_master',
        name: 'Streak Master',
        description: 'Maintain a 30-day streak',
        category: 'streak',
        rarity: 'legendary',
        icon: '🔥',
        xpReward: 500,
        unlockedAt: new Date(),
        conditions: [{ type: 'streak', operator: 'gte', value: 30 }],
        progress: 0
      }
    ];
  }

  // Level calculation with exponential scaling
  calculateLevel(totalXP: number): { level: number, currentXP: number, xpToNext: number } {
    // Exponential level progression: XP = 100 * 1.5^(level-1)
    let level = 1;
    let xpForCurrentLevel = 0;
    let xpForNextLevel = 100;
    
    while (totalXP >= xpForNextLevel) {
      level++;
      xpForCurrentLevel = xpForNextLevel;
      xpForNextLevel = Math.floor(100 * Math.pow(1.5, level - 1));
    }
    
    return {
      level,
      currentXP: totalXP - xpForCurrentLevel,
      xpToNext: xpForNextLevel - totalXP
    };
  }

  // Initialize user profile with gamification data
  initializeProfile(userId: string): UserGamificationProfile {
    return {
      userId,
      level: 1,
      totalXP: 0,
      currentXP: 0,
      xpToNextLevel: 100,
      streak: {
        current: 0,
        longest: 0,
        lastActivity: new Date()
      },
      masteryLevels: {},
      achievements: [],
      badges: [],
      personalityType: 'achiever',
      engagementScore: 50,
      flowStateDetected: false,
      lastActiveTime: new Date(),
      sessionStats: {
        questionsAnswered: 0,
        correctAnswers: 0,
        accuracy: 0,
        averageTimePerQuestion: 0,
        difficultiesAttempted: [],
        subjectsStudied: [],
        xpEarned: 0,
        achievementsUnlocked: 0,
        flowStateMinutes: 0,
        sessionDuration: 0,
        engagementEvents: []
      },
      learningPath: [],
      preferences: {
        preferredDifficulty: 3,
        preferredSubjects: [],
        studyTimePreference: 'evening',
        sessionLength: 'medium',
        feedbackStyle: 'immediate',
        motivationStyle: 'achievement'
      }
    };
  }
} 