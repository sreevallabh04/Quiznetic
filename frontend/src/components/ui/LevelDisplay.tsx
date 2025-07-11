import React from 
\react\';
import { UserGamificationProfile } from \../../types\';

interface LevelDisplayProps {
  profile: UserGamificationProfile;
  className?: string;
}

export const LevelDisplay: React.FC<LevelDisplayProps> = ({ profile, className = \'\' }) => {
  const progressPercentage = (profile.currentXP / (profile.currentXP + profile.xpToNextLevel)) * 100;

  return (
    <div className={`bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-lg shadow-lg ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-12 h-12 bg-white bg-opacity-20 rounded-full">
            <span className="text-xl font-bold">{profile.level}</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Level {profile.level}</h3>
            <p className="text-sm opacity-90">{profile.totalXP.toLocaleString()} Total XP</p>
          </div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center space-x-1 text-orange-300">
            <span className="text-xl"></span>
            <span className="font-bold">{profile.streak.current}</span>
          </div>
          <p className="text-xs opacity-80">day streak</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Progress to Level {profile.level + 1}</span>
          <span>{profile.currentXP} / {profile.currentXP + profile.xpToNextLevel} XP</span>
        </div>
        <div className="w-full bg-white bg-opacity-20 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-yellow-400 to-orange-400 h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {profile.flowStateDetected && (
        <div className="mt-3 flex items-center space-x-2 text-cyan-300">
          <span className="animate-pulse"></span>
          <span className="text-sm font-medium">Flow State Active</span>
          <span className="animate-pulse"></span>
        </div>
      )}
    </div>
  );
};
