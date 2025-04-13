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
      color: 'bg-primary-100 text-primary-600'
    },
    {
      icon: Map,
      title: 'Interactive Maps',
      description: 'Learn geography through interactive map-based exercises and quizzes',
      color: 'bg-primary-100 text-primary-600'
    },
    {
      icon: Users,
      title: 'Student-Friendly',
      description: 'Designed specifically for students in classes 6-10 with age-appropriate content',
      color: 'bg-primary-100 text-primary-600'
    },
    {
      icon: Award,
      title: 'Track Progress',
      description: 'See your improvement as you complete quizzes across different subjects',
      color: 'bg-primary-100 text-primary-600'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <Hero />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-4xl mx-auto mt-16"
        >
          <h2 className="text-3xl font-bold text-center mb-8 text-secondary-800">
            Why Choose <span className="text-primary-600">Quiznetic</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-white shadow-md border border-primary-100 rounded-xl p-6 hover:shadow-lg transition-all"
              >
                <div className={`w-12 h-12 rounded-full ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-secondary-800">{feature.title}</h3>
                <p className="text-secondary-600">{feature.description}</p>
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
            className="px-10 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium text-lg transition-all shadow-md hover:shadow-lg"
          >
            Start Learning Now
          </button>
        </motion.div>
      </div>
    </div>
  );
}