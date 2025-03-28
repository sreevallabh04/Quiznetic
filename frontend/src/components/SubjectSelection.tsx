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
    <div className="relative overflow-hidden min-h-screen text-white">
      {/* Tech-inspired background elements - same as other components for consistency */}
      <div className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?ixlib=rb-4.0.3')] bg-cover bg-center opacity-10 z-[-3]"></div>
      <div className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1624378515195-8385174173f1?ixlib=rb-4.0.3')] bg-repeat opacity-5 z-[-2]"></div>
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900/80 via-slate-900/90 to-slate-900/80 z-[-1]"></div>
      
      {/* Grid decorative element */}
      <div className="fixed bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-cyan-500/5 to-transparent z-0"></div>
      <div className="fixed inset-0 bg-[radial-gradient(rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:20px_20px] z-0 opacity-30"></div>
      
      {/* Digital particles */}
      <div className="fixed inset-0 overflow-hidden z-0">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div 
            key={i}
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%", 
              opacity: Math.random() * 0.5 
            }}
            animate={{ 
              y: [null, Math.random() * 100 + "%"], 
              opacity: [null, Math.random() * 0.7, 0] 
            }}
            transition={{ 
              duration: Math.random() * 30 + 20, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute rounded-full bg-cyan-500 w-1 h-1"
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-5xl mx-auto p-8 relative z-10"
      >
        <button
          onClick={() => navigate('/')}
          className="mb-6 flex items-center gap-2 text-cyan-300 hover:text-blue-300 transition-colors backdrop-blur-sm px-4 py-2 rounded-full border border-cyan-600/30 shadow-lg shadow-cyan-900/20 w-fit"
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
            className="inline-block px-6 py-3 bg-blue-900/30 backdrop-blur-sm rounded-lg border border-cyan-500/20"
          >
            <span className="text-cyan-300/70">
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
                icon={<Icon className="w-6 h-6 text-cyan-400" />}
              >
                <div className="flex flex-col">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-200">
                      {name}
                    </h3>
                    <ChevronRight className="w-5 h-5 text-cyan-400/70" />
                  </div>
                  <p className="mt-2 text-sm text-cyan-200/70">
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