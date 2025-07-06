import React from "react";
import { useGamification } from "../components/GamificationProvider";

export const GamificationPage: React.FC = () => {
  const { profile } = useGamification();

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Gamification Dashboard</h1>
        
        {profile ? (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Your Progress</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{profile.level}</div>
                <div className="text-sm text-blue-700">Level</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{profile.totalXP}</div>
                <div className="text-sm text-green-700">Total XP</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{profile.streak.current}</div>
                <div className="text-sm text-purple-700">Day Streak</div>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">XP Progress</h3>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className="bg-blue-500 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${(profile.currentXP / (profile.currentXP + profile.xpToNextLevel)) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span>{profile.currentXP} XP</span>
                <span>{profile.currentXP + profile.xpToNextLevel} XP to next level</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-500">Loading your gamification profile...</div>
          </div>
        )}
      </div>
    </div>
  );
};
