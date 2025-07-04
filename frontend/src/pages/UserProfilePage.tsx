import React, { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import { 
  User, 
  Trophy, 
  TrendingUp, 
  Calendar, 
  BookOpen, 
  Target, 
  Clock, 
  Award,
  BarChart3,
  Settings,
  Star,
  Flame,
  CheckCircle
} from 'lucide-react';
import { useAnalytics } from '../utils/analytics';
import { Card } from '../components/ui/Card';
import { PageTitle } from '../components/ui/PageTitle';

export function UserProfilePage() {
  const { user } = useUser();
  const { getAnalytics } = useAnalytics();
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'achievements' | 'settings'>('overview');
  
  const analytics = getAnalytics();
  const overallAccuracy = analytics.totalQuestions > 0 ? 
    Math.round((analytics.correctAnswers / analytics.totalQuestions) * 100) : 0;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto space-y-4 sm:space-y-6 lg:space-y-8 px-3 sm:px-4 lg:px-6">
      {/* Header Section - Mobile Responsive */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 text-white"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 lg:space-x-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
            {user?.imageUrl ? (
              <img 
                src={user.imageUrl} 
                alt="Profile" 
                className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full object-cover"
              />
            ) : (
              <User className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" />
            )}
          </div>
          
          <div className="flex-1 w-full sm:w-auto">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2">
              {user?.firstName || 'Student'} {user?.lastName || ''}
            </h1>
            <p className="text-primary-100 text-sm sm:text-base lg:text-lg mb-2 sm:mb-3">
              Class {user?.publicMetadata?.classLevel || '6-10'} • Government School Student
            </p>
            
            <div className="flex flex-col sm:flex-row sm:space-x-4 lg:space-x-6 space-y-2 sm:space-y-0 text-xs sm:text-sm">
              <div className="flex items-center space-x-2">
                <Trophy className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>{analytics.totalQuizzes} Quizzes</span>
              </div>
              <div className="flex items-center space-x-2">
                <Target className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>{overallAccuracy}% Accuracy</span>
              </div>
              <div className="flex items-center space-x-2">
                <Flame className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>{analytics.streaks.current} Day Streak</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tab Navigation - Mobile Responsive */}
      <div className="flex overflow-x-auto bg-gray-100 p-1 rounded-lg scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 rounded-md font-medium transition-all whitespace-nowrap text-sm sm:text-base ${
              activeTab === tab.id
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-primary-600'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span className="hidden sm:inline">{tab.label}</span>
            <span className="sm:hidden">{tab.label.slice(0, 3)}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'overview' && <OverviewTab analytics={analytics} />}
        {activeTab === 'analytics' && <AnalyticsTab analytics={analytics} />}
        {activeTab === 'achievements' && <AchievementsTab analytics={analytics} />}
        {activeTab === 'settings' && <SettingsTab />}
      </motion.div>
    </div>
  );
}

function OverviewTab({ analytics }: { analytics: any }) {
  const overallAccuracy = analytics.totalQuestions > 0 ? 
    Math.round((analytics.correctAnswers / analytics.totalQuestions) * 100) : 0;

  const recentSubjects = Object.entries(analytics.subjectScores)
    .map(([subject, scores]: [string, any]) => ({
      subject,
      accuracy: scores.total > 0 ? Math.round((scores.correct / scores.total) * 100) : 0,
      total: scores.total,
      lastAttempted: new Date(scores.lastAttempted)
    }))
    .sort((a, b) => b.lastAttempted.getTime() - a.lastAttempted.getTime())
    .slice(0, 3);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
      {/* Quick Stats - Mobile Responsive */}
      <div className="lg:col-span-2 grid grid-cols-2 gap-3 sm:gap-4">
        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-600 mb-1">Total Quizzes</p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary-600">{analytics.totalQuizzes}</p>
            </div>
            <BookOpen className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-primary-600" />
          </div>
        </Card>

        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-600 mb-1">Accuracy</p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600">{overallAccuracy}%</p>
            </div>
            <Target className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-green-600" />
          </div>
        </Card>

        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-600 mb-1">Streak</p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-orange-600">{analytics.streaks.current}</p>
            </div>
            <Flame className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-orange-600" />
          </div>
        </Card>

        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-600 mb-1">Time</p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600">{analytics.timeSpent}m</p>
            </div>
            <Clock className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-blue-600" />
          </div>
        </Card>
      </div>

      {/* Recent Activity - Mobile Responsive */}
      <Card className="p-4 sm:p-6">
        <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4 flex items-center">
          <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-primary-600" />
          <span className="hidden sm:inline">Recent Performance</span>
          <span className="sm:hidden">Recent</span>
        </h3>
        <div className="space-y-3">
          {recentSubjects.map((subject) => (
            <div key={subject.subject} className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="font-medium capitalize text-sm sm:text-base truncate">{subject.subject}</p>
                <p className="text-xs sm:text-sm text-gray-600">{subject.total} questions</p>
              </div>
              <div className="text-right ml-2">
                <p className={`font-semibold text-sm sm:text-base ${
                  subject.accuracy >= 80 ? 'text-green-600' : 
                  subject.accuracy >= 60 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {subject.accuracy}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function AnalyticsTab({ analytics }: { analytics: any }) {
  const subjectPerformance = Object.entries(analytics.subjectScores)
    .map(([subject, scores]: [string, any]) => ({
      subject,
      accuracy: scores.total > 0 ? Math.round((scores.correct / scores.total) * 100) : 0,
      total: scores.total,
      correct: scores.correct,
      avgTime: Math.round(scores.avgTime || 0)
    }));

  const weeklyData = Object.entries(analytics.weeklyProgress || {})
    .map(([week, data]: [string, any]) => ({
      week,
      quizzes: data.quizzes,
      score: data.score,
      timeSpent: data.timeSpent
    }))
    .slice(-4); // Last 4 weeks

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Subject Performance - Mobile Responsive */}
      <Card className="p-4 sm:p-6">
        <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4 flex items-center">
          <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-primary-600" />
          Subject Performance
        </h3>
        <div className="space-y-3 sm:space-y-4">
          {subjectPerformance.map((subject) => (
            <div key={subject.subject} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium capitalize text-sm sm:text-base">{subject.subject}</span>
                <span className="text-xs sm:text-sm text-gray-600">
                  {subject.correct}/{subject.total} ({subject.accuracy}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    subject.accuracy >= 80 ? 'bg-green-500' :
                    subject.accuracy >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${subject.accuracy}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Weekly Progress - Mobile Responsive */}
      <Card className="p-4 sm:p-6">
        <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4 flex items-center">
          <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-primary-600" />
          Weekly Progress
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {weeklyData.map((week) => (
            <div key={week.week} className="bg-gray-50 rounded-lg p-3 sm:p-4">
              <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2 truncate">{week.week}</p>
              <p className="text-sm sm:text-lg font-semibold">{week.quizzes} quizzes</p>
              <p className="text-xs sm:text-sm text-primary-600">{week.timeSpent}min</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Learning Insights - Mobile Responsive */}
      <Card className="p-4 sm:p-6">
        <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Learning Insights</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="bg-blue-50 rounded-lg p-3 sm:p-4">
            <h4 className="font-medium text-blue-800 mb-1 sm:mb-2 text-sm sm:text-base">Strongest Subject</h4>
            <p className="text-blue-600 text-sm sm:text-base capitalize">
              {subjectPerformance.length > 0 ? 
                subjectPerformance.reduce((prev, current) => 
                  prev.accuracy > current.accuracy ? prev : current
                ).subject : 'No data yet'}
            </p>
          </div>
          <div className="bg-orange-50 rounded-lg p-3 sm:p-4">
            <h4 className="font-medium text-orange-800 mb-1 sm:mb-2 text-sm sm:text-base">Needs Practice</h4>
            <p className="text-orange-600 text-sm sm:text-base capitalize">
              {subjectPerformance.length > 0 ? 
                subjectPerformance.reduce((prev, current) => 
                  prev.accuracy < current.accuracy ? prev : current
                ).subject : 'No data yet'}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

function AchievementsTab({ analytics }: { analytics: any }) {
  const achievements = [
    {
      id: 'first_10_quizzes',
      title: 'Getting Started',
      description: 'Complete your first 10 quizzes',
      icon: BookOpen,
      earned: analytics.achievements.includes('first_10_quizzes'),
      progress: Math.min(analytics.totalQuizzes, 10),
      total: 10
    },
    {
      id: 'quiz_champion',
      title: 'Quiz Champion',
      description: 'Complete 50 quizzes',
      icon: Trophy,
      earned: analytics.achievements.includes('quiz_champion'),
      progress: Math.min(analytics.totalQuizzes, 50),
      total: 50
    },
    {
      id: 'week_streak',
      title: 'Consistent Learner',
      description: 'Maintain a 7-day learning streak',
      icon: Flame,
      earned: analytics.achievements.includes('week_streak'),
      progress: Math.min(analytics.streaks.current, 7),
      total: 7
    },
    {
      id: 'maths_master',
      title: 'Mathematics Master',
      description: 'Achieve 90% accuracy in Mathematics',
      icon: Award,
      earned: analytics.achievements.includes('maths_master'),
      progress: analytics.subjectScores.maths ? 
        Math.round((analytics.subjectScores.maths.correct / analytics.subjectScores.maths.total) * 100) : 0,
      total: 90
    },
    {
      id: 'science_master',
      title: 'Science Scholar',
      description: 'Achieve 90% accuracy in Science',
      icon: Award,
      earned: analytics.achievements.includes('science_master'),
      progress: analytics.subjectScores.science ? 
        Math.round((analytics.subjectScores.science.correct / analytics.subjectScores.science.total) * 100) : 0,
      total: 90
    },
    {
      id: 'social_master',
      title: 'Social Studies Expert',
      description: 'Achieve 90% accuracy in Social Studies',
      icon: Award,
      earned: analytics.achievements.includes('social_master'),
      progress: analytics.subjectScores.social ? 
        Math.round((analytics.subjectScores.social.correct / analytics.subjectScores.social.total) * 100) : 0,
      total: 90
    }
  ];

  const earnedCount = achievements.filter(a => a.earned).length;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Achievement Summary - Mobile Responsive */}
      <Card className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="mb-3 sm:mb-0">
            <h3 className="font-semibold text-base sm:text-lg">Achievement Progress</h3>
            <p className="text-gray-600 text-sm sm:text-base">You've earned {earnedCount} out of {achievements.length} achievements</p>
          </div>
          <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-600">
            {earnedCount}/{achievements.length}
          </div>
        </div>
      </Card>

      {/* Achievement Grid - Mobile Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {achievements.map((achievement) => (
          <Card 
            key={achievement.id}
            className={`p-4 sm:p-6 transition-all duration-300 ${
              achievement.earned 
                ? 'bg-gradient-to-br from-green-50 to-green-100 border-green-200' 
                : 'bg-gray-50 border-gray-200'
            }`}
          >
            <div className="flex items-start space-x-3 sm:space-x-4">
              <div className={`p-2 sm:p-3 rounded-full flex-shrink-0 ${
                achievement.earned ? 'bg-green-200 text-green-700' : 'bg-gray-200 text-gray-500'
              }`}>
                <achievement.icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start space-x-2 mb-1 sm:mb-2">
                  <h4 className="font-semibold text-sm sm:text-base leading-tight">{achievement.title}</h4>
                  {achievement.earned && <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 flex-shrink-0 mt-0.5" />}
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 leading-relaxed">{achievement.description}</p>
                
                {!achievement.earned && (
                  <div className="space-y-1 sm:space-y-2">
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span>Progress</span>
                      <span>{achievement.progress}/{achievement.total}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                      <div 
                        className="bg-primary-500 h-1.5 sm:h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function SettingsTab() {
  const { user } = useUser();
  const [notifications, setNotifications] = useState(true);
  const [studyReminders, setStudyReminders] = useState(true);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Account Information - Mobile Responsive */}
      <Card className="p-4 sm:p-6">
        <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Account Information</h3>
        <div className="space-y-3 sm:space-y-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Name</label>
            <p className="text-gray-900 text-sm sm:text-base">{user?.firstName} {user?.lastName}</p>
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Email</label>
            <p className="text-gray-900 text-sm sm:text-base break-all">{user?.primaryEmailAddress?.emailAddress}</p>
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Class Level</label>
            <p className="text-gray-900 text-sm sm:text-base">Class {user?.publicMetadata?.classLevel || '6-10'}</p>
          </div>
        </div>
      </Card>

      {/* Preferences - Mobile Responsive */}
      <Card className="p-4 sm:p-6">
        <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Learning Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex-1 pr-4">
              <p className="font-medium text-sm sm:text-base">Push Notifications</p>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">Get notified about new achievements and reminders</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
              />
              <div className="w-10 h-5 sm:w-11 sm:h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 sm:after:h-5 sm:after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
          
          <div className="flex items-start justify-between">
            <div className="flex-1 pr-4">
              <p className="font-medium text-sm sm:text-base">Study Reminders</p>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">Daily reminders to practice questions</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={studyReminders}
                onChange={(e) => setStudyReminders(e.target.checked)}
              />
              <div className="w-10 h-5 sm:w-11 sm:h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 sm:after:h-5 sm:after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
        </div>
      </Card>

      {/* Data Management - Mobile Responsive */}
      <Card className="p-4 sm:p-6">
        <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Data Management</h3>
        <div className="space-y-3 sm:space-y-4">
          <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
            <p className="font-medium text-sm sm:text-base">Export Learning Data</p>
            <p className="text-xs sm:text-sm text-gray-600">Download your progress and analytics data</p>
          </button>
          
          <button className="w-full text-left p-3 rounded-lg border border-red-200 hover:bg-red-50 transition-colors text-red-600">
            <p className="font-medium text-sm sm:text-base">Reset Progress</p>
            <p className="text-xs sm:text-sm text-red-500">Clear all quiz progress and start fresh</p>
          </button>
        </div>
      </Card>
    </div>
  );
} 