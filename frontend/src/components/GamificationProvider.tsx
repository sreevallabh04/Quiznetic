import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useUser } from "@clerk/clerk-react";
import { UserGamificationProfile, QuestionResult, Achievement, EngagementEvent } from "../types";

interface GamificationContextType {
  profile: UserGamificationProfile | null;
  updateProfile: (updates: Partial<UserGamificationProfile>) => void;
  processQuestionResult: (result: Omit<QuestionResult, "xpEarned" | "masteryGain" | "bonusFactors">) => QuestionResult;
  recentXpGain: QuestionResult | null;
  clearRecentXpGain: () => void;
  availableAchievements: Achievement[];
  addEngagementEvent: (event: Omit<EngagementEvent, "timestamp">) => void;
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

interface GamificationProviderProps {
  children: ReactNode;
}

export const GamificationProvider: React.FC<GamificationProviderProps> = ({ children }) => {
  const { user } = useUser();
  const [profile, setProfile] = useState<UserGamificationProfile | null>(null);
  const [recentXpGain, setRecentXpGain] = useState<QuestionResult | null>(null);

  // Mock gamification functions for now
  const updateProfile = (updates: Partial<UserGamificationProfile>) => {
    if (profile) {
      setProfile({ ...profile, ...updates });
    }
  };

  const processQuestionResult = (result: Omit<QuestionResult, "xpEarned" | "masteryGain" | "bonusFactors">): QuestionResult => {
    const mockResult: QuestionResult = {
      ...result,
      xpEarned: result.isCorrect ? 10 : 5,
      masteryGain: result.isCorrect ? 1.5 : 0.5,
      bonusFactors: {
        speedBonus: 0.1,
        streakBonus: 0.05,
        difficultyBonus: 0.2,
        accuracyBonus: result.isCorrect ? 0.15 : 0
      }
    };
    setRecentXpGain(mockResult);
    return mockResult;
  };

  const clearRecentXpGain = () => {
    setRecentXpGain(null);
  };

  const addEngagementEvent = (event: Omit<EngagementEvent, "timestamp">) => {
    // Mock implementation
    console.log("Engagement event:", event);
  };

  const availableAchievements: Achievement[] = [];

  // Initialize mock profile
  useEffect(() => {
    if (user?.id && !profile) {
      const mockProfile: UserGamificationProfile = {
        userId: user.id,
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
        personalityType: "achiever",
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
          studyTimePreference: "evening",
          sessionLength: "medium",
          feedbackStyle: "immediate",
          motivationStyle: "achievement"
        }
      };
      setProfile(mockProfile);
    }
  }, [user?.id, profile]);

  const contextValue: GamificationContextType = {
    profile,
    updateProfile,
    processQuestionResult,
    recentXpGain,
    clearRecentXpGain,
    availableAchievements,
    addEngagementEvent
  };

  return (
    <GamificationContext.Provider value={contextValue}>
      {children}
    </GamificationContext.Provider>
  );
};

export const useGamification = (): GamificationContextType => {
  const context = useContext(GamificationContext);
  if (context === undefined) {
    throw new Error("useGamification must be used within a GamificationProvider");
  }
  return context;
};
