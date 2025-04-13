import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Users } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-6xl font-bold text-secondary-900 mb-6"
        >
          Learn Smarter,{' '}
          <span className="bg-gradient-to-r from-primary-600 to-primary-500 text-transparent bg-clip-text">
            Grow Faster
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-secondary-600 mb-12 max-w-2xl mx-auto"
        >
          Interactive learning platform designed for students in Telangana. Access quality education resources anytime, anywhere.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >

          {[
            {
              icon: GraduationCap,
              title: 'Expert Content',
              description: 'Curriculum aligned with state board standards',
            },
            {
              icon: BookOpen,
              title: 'Interactive Learning',
              description: 'Engaging quizzes and assessments',
            },
            {
              icon: Users,
              title: 'Community',
              description: 'Learn and grow with fellow students',
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-white shadow-md border border-primary-100 rounded-xl p-6 hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-secondary-900">{feature.title}</h3>
              <p className="text-secondary-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}