import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Calculator, Microscope, Globe, ChevronRight, Atom } from 'lucide-react';
import { Card } from './ui/Card';
import { PageTitle } from './ui/PageTitle';

const classes = [6, 7, 8, 9, 10];

export default function ClassSelection() {
  const navigate = useNavigate();

  // Animation variants for staggered children
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="relative overflow-hidden min-h-screen text-secondary-800">
      {/* Subtle pattern background */}
      <div className="fixed inset-0 bg-[radial-gradient(#f0f0f0_1px,transparent_1px)] bg-[size:20px_20px] opacity-30 z-0"></div>
      
      {/* Light green accent */}
      <div className="fixed bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-primary-100/30 to-transparent z-0"></div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-5xl mx-auto p-3 sm:p-6 lg:p-8 relative z-10"
      >
        <PageTitle 
          title="Telangana Learning Hub" 
          subtitle="Interactive learning resources aligned with Telangana State Board syllabus"
        />
        
        {/* Subject selection info - Mobile Responsive */}
        <div className="mb-8 sm:mb-12 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-block px-4 sm:px-6 py-3 bg-white rounded-lg border border-primary-200 shadow-md"
          >
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-primary-700 mb-1 sm:mb-2">
              Select Your Class Level
            </h2>
            <p className="text-secondary-600 text-sm sm:text-base">
              Choose your class to access subject materials and interactive quizzes
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {classes.map((classNum) => {
            // Different icons for different cards to add visual interest
            const icons = [
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />,
              <Calculator className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />,
              <Microscope className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />,
              <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />,
              <Atom className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />
            ];
            const icon = icons[classNum - 6] || icons[0];
            
            return (
              <motion.div key={classNum} variants={item}>
                <Card 
                  onClick={() => navigate(`/class/${classNum}`)}
                  icon={icon}
                  className="p-4 sm:p-6 h-full"
                >
                  <div className="flex flex-col h-full">
                    <div className="flex justify-between items-center mb-2 sm:mb-3">
                      <span className="text-lg sm:text-xl font-bold text-secondary-800">
                        Class {classNum}
                      </span>
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-primary-500" />
                    </div>
                    <p className="text-xs sm:text-sm text-secondary-600 leading-relaxed flex-grow">
                      {classNum <= 8 
                        ? "Elementary curriculum with fundamental concepts" 
                        : "Advanced curriculum with in-depth subjects"}
                    </p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Mobile-friendly call to action */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 sm:mt-12 text-center"
        >
          <div className="bg-white rounded-lg p-4 sm:p-6 border border-primary-200 shadow-sm max-w-md mx-auto">
            <h3 className="font-semibold text-primary-700 mb-2 text-sm sm:text-base">
              🎯 Quick Start Guide
            </h3>
            <div className="text-xs sm:text-sm text-secondary-600 space-y-1">
              <p>1. Select your class level</p>
              <p>2. Choose a subject</p>
              <p>3. Pick a chapter</p>
              <p>4. Start learning!</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}