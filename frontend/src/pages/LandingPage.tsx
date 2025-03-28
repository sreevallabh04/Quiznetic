import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Hero } from '../components/landing/Hero';
import { BookOpen, Map, Users, Award } from 'lucide-react';

export function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: BookOpen,
      title: 'Comprehensive Content',
      description: 'Access a wide range of subjects aligned with Telangana state board curriculum',
      color: 'bg-blue-500/20 text-blue-400'
    },
    {
      icon: Map,
      title: 'Interactive Maps',
      description: 'Learn geography through interactive map-based exercises and quizzes',
      color: 'bg-green-500/20 text-green-400'
    },
    {
      icon: Users,
      title: 'Student-Friendly',
      description: 'Designed specifically for students in classes 6-10 with age-appropriate content',
      color: 'bg-yellow-500/20 text-yellow-400'
    },
    {
      icon: Award,
      title: 'Track Progress',
      description: 'See your improvement as you complete quizzes across different subjects',
      color: 'bg-purple-500/20 text-purple-400'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-16">
        <Hero />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-4xl mx-auto mt-16"
        >
          <h2 className="text-3xl font-bold text-center mb-8">
            Why Choose <span className="text-purple-400">Quiznetic</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-white/5 backdrop-blur-lg rounded-xl p-6 hover:bg-white/10 transition-all"
              >
                <div className={`w-12 h-12 rounded-full ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex justify-center mt-12"
        >
          <button
            onClick={() => navigate('/home')}
            className="px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-medium text-lg transition-all shadow-lg hover:shadow-xl"
          >
            Start Learning Now
          </button>
        </motion.div>
      </div>
    </div>
  );
}