import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { subjects } from '../data/subjects';
import { Card } from './ui/Card';
import { PageTitle } from './ui/PageTitle';

export default function SubjectSelection() {
  const navigate = useNavigate();
  const { classId } = useParams();
  
  // Animation variants for staggered children
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
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
        <button
          onClick={() => navigate('/')}
          className="mb-6 flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors px-4 py-2 rounded-full border border-primary-200 shadow-sm w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Classes
        </button>

        <PageTitle 
          title={`Class ${classId} Subjects`}
          subtitle="Select a subject to explore chapters and interactive learning resources"
        />

        {/* Subject selection info */}
        <div className="mb-8 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-block px-6 py-3 bg-white rounded-lg border border-primary-200 shadow-md"
          >
            <span className="text-secondary-600">
              {subjects.length} subjects available with curriculum-aligned content
            </span>
          </motion.div>
        </div>
        
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {subjects.map(({ id, name, icon: Icon, description }) => (
            <motion.div key={id} variants={item}>
              <Card 
                onClick={() => navigate(`/class/${classId}/${id}`)}
                icon={<Icon className="w-6 h-6 text-primary-600" />}
              >
                <div className="flex flex-col">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-secondary-800">
                      {name}
                    </h3>
                    <ChevronRight className="w-5 h-5 text-primary-500" />
                  </div>
                  <p className="mt-2 text-sm text-secondary-600">
                    {description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}