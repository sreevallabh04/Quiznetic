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
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-6 h-6 text-green-100" />
                <span className="font-semibold text-lg">🎉 Production Ready!</span>
              </div>
              
              <div className="hidden md:flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4" />
                  <span>1000+ Telangana Board Questions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>Classes 6-10 Curriculum</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4" />
                  <span>No API Dependencies</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => setIsVisible(false)}
              className="text-white hover:text-green-100 transition-colors p-1"
              aria-label="Close banner"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="md:hidden mt-2 text-sm">
            <p>✨ Complete with 1000+ questions from Telangana State Board curriculum for Classes 6-10</p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductionReadyBanner; 