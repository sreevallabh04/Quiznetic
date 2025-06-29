import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X, BookOpen, Users, Zap } from 'lucide-react';

const ProductionReadyBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg relative z-50"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-2 sm:py-3">
                      <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 sm:space-x-4 flex-1 min-w-0">
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-green-100 flex-shrink-0" />
                  <span className="font-semibold text-sm sm:text-base lg:text-lg">🎉 Production Ready!</span>
                </div>
              
              <div className="hidden sm:flex items-center space-x-3 md:space-x-6 text-xs sm:text-sm overflow-hidden">
                <div className="flex items-center space-x-1 sm:space-x-2 whitespace-nowrap">
                  <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden md:inline">1000+ Telangana Board Questions</span>
                  <span className="md:hidden">1000+ Questions</span>
                </div>
                <div className="flex items-center space-x-1 sm:space-x-2 whitespace-nowrap">
                  <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden md:inline">Classes 6-10 Curriculum</span>
                  <span className="md:hidden">Classes 6-10</span>
                </div>
                <div className="flex items-center space-x-1 sm:space-x-2 whitespace-nowrap">
                  <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden md:inline">No API Dependencies</span>
                  <span className="md:hidden">Offline Ready</span>
                </div>
              </div>
            </div>
            
            <button            
              onClick={() => setIsVisible(false)}
              className="text-white hover:text-green-100 transition-colors p-1 sm:p-1.5 flex-shrink-0 ml-2"
              aria-label="Close banner"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
          
          <div className="sm:hidden mt-2 text-xs leading-relaxed">
            <p>✨ Complete with 1000+ questions from Telangana State Board curriculum for Classes 6-10</p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductionReadyBanner; 