import React from "react";

export const GamificationDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
             Gamification System Demo
          </h1>
          <p className="text-xl text-gray-600">
            Advanced Learning Analytics & Achievement System
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-center">
              <div className="text-3xl mb-2"></div>
              <h3 className="font-bold text-lg">Achievement System</h3>
              <p className="text-gray-600 text-sm">Multi-condition achievements with rarity-based rewards</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-center">
              <div className="text-3xl mb-2"></div>
              <h3 className="font-bold text-lg">XP Algorithm</h3>
              <p className="text-gray-600 text-sm">Gaussian speed multipliers and logarithmic streak bonuses</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-center">
              <div className="text-3xl mb-2"></div>
              <h3 className="font-bold text-lg">Mastery Tracking</h3>
              <p className="text-gray-600 text-sm">6-factor competency analysis with adaptive difficulty</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-center">
              <div className="text-3xl mb-2"></div>
              <h3 className="font-bold text-lg">Flow State Detection</h3>
              <p className="text-gray-600 text-sm">Real-time variance analysis and engagement tracking</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-center">
              <div className="text-3xl mb-2"></div>
              <h3 className="font-bold text-lg">Learning Analytics</h3>
              <p className="text-gray-600 text-sm">Predictive modeling and personalized learning paths</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-center">
              <div className="text-3xl mb-2"></div>
              <h3 className="font-bold text-lg">Complex Algorithms</h3>
              <p className="text-gray-600 text-sm">Mathematical models for educational psychology</p>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-gradient-to-r from-gray-800 to-gray-900 text-white p-8 rounded-xl">
          <h2 className="text-2xl font-bold mb-4"> Technical Implementation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Mathematical Models:</h3>
              <ul className="text-sm space-y-1 opacity-90">
                <li> Gaussian distribution functions</li>
                <li> Exponential level progression</li>
                <li> Logarithmic streak calculations</li>
                <li> Variance-based flow detection</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">System Features:</h3>
              <ul className="text-sm space-y-1 opacity-90">
                <li> Real-time analytics engine</li>
                <li> Multi-dimensional competency tracking</li>
                <li> Adaptive difficulty algorithms</li>
                <li> Behavioral psychology integration</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
