import { motion } from 'framer-motion';
import { BookOpen, Layout } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-primary-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          {/* Logo Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3"
          >
            <div className="p-1.5 bg-primary-50 rounded-md border border-primary-200 overflow-hidden group">
              <BookOpen className="w-5 h-5 text-primary-600" />
            </div>
          
          {/* Navigation Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center"
          >
            <Link 
              to="/question-types" 
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-secondary-700 hover:text-primary-600 hover:bg-primary-50 transition-colors"
            >
              <Layout className="w-4 h-4" />
              <span className="font-medium">Question Types</span>
            </Link>
          </motion.div>
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold relative"
            >
              <span className="bg-gradient-to-r from-primary-600 to-primary-700 text-transparent bg-clip-text">
                Telangana Learning Hub
              </span>
              
              <motion.div 
                className="absolute -bottom-1 left-0 h-[2px] bg-primary-500/60"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.5, duration: 0.8 }}
              ></motion.div>
            </motion.span>
          </motion.div>
        </div>
      </div>
    </header>
  );
}