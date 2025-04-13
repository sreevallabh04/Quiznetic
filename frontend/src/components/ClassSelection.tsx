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
        className="max-w-5xl mx-auto p-8 relative z-10"
      >
        <PageTitle 
          title="Telangana Learning Hub" 
          subtitle="Interactive learning resources aligned with Telangana State Board syllabus"
        />
        
        {/* Subject selection info */}
        <div className="mb-12 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-block px-6 py-3 bg-white rounded-lg border border-primary-200 shadow-md"
          >
            <h2 className="text-2xl font-semibold text-primary-700 mb-2">
              Select Your Class Level
            </h2>
            <p className="text-secondary-600">
              Choose your class to access subject materials and interactive quizzes
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {classes.map((classNum) => {
            // Different icons for different cards to add visual interest
            const icons = [
              <BookOpen className="w-6 h-6 text-primary-600" />,
              <Calculator className="w-6 h-6 text-primary-600" />,
              <Microscope className="w-6 h-6 text-primary-600" />,
              <Globe className="w-6 h-6 text-primary-600" />,
              <Atom className="w-6 h-6 text-primary-600" />
            ];
            const icon = icons[classNum - 6] || icons[0];
            
            return (
              <motion.div key={classNum} variants={item}>
                <Card 
                  onClick={() => navigate(`/class/${classNum}`)}
                  icon={icon}
                >
                  <div className="flex flex-col">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-secondary-800">
                        Class {classNum}
                      </span>
                      <ChevronRight className="w-5 h-5 text-primary-500" />
                    </div>
                    <p className="mt-2 text-sm text-secondary-600">
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
      </motion.div>
    </div>
  );
}