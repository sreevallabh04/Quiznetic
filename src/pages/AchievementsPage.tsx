import React from 'react';
import { Trophy, Star, Award } from 'lucide-react';

export const AchievementsPage = () => {
  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-purple-400 mb-8">Achievements</h1>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gray-900/50 backdrop-blur-md rounded-xl p-6 border border-purple-500/30">
            <Trophy className="w-8 h-8 text-yellow-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Beginner Cryptographer</h3>
            <p className="text-gray-400">Complete your first encryption</p>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-md rounded-xl p-6 border border-purple-500/30">
            <Star className="w-8 h-8 text-purple-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Code Master</h3>
            <p className="text-gray-400">Successfully decrypt 10 messages</p>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-md rounded-xl p-6 border border-purple-500/30">
            <Award className="w-8 h-8 text-pink-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Crypto Expert</h3>
            <p className="text-gray-400">Complete all cipher challenges</p>
          </div>
        </div>
      </div>
    </div>
  );
};