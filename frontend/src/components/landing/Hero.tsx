import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Users } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-6xl font-bold text-white mb-6"
        >
          Learn Smarter,{' '}
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
            Grow Faster
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
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
              className="bg-white/5 backdrop-blur-lg rounded-xl p-6"
            >
              <div className="w-12 h-12 rounded-full bg-purple-600/20 flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
