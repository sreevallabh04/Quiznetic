import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, MapPin, ArrowLeft, FileText, BrainCircuit, ChevronRight, Atom, Calculator, Beaker } from 'lucide-react';
import { chapterData } from '../data/chapterData';
import { subjects } from '../data/subjects';
import { Card } from './ui/Card';
import { PageTitle } from './ui/PageTitle';

// Define a basic chapter interface with the properties we use in this component
interface BaseChapter {
  id: number;
  title: string;
  description: string;
}

export default function ChapterSelection() {
  const navigate = useNavigate();
  const { classId, subject } = useParams<{ classId: string; subject: string }>();

  const currentSubject = subjects.find((s) => s.id === subject);

  // Animation variants for staggered children
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  // Allowed class levels
  const allowedClassIds = [6, 7, 8, 9, 10] as const;
  type AllowedClassId = typeof allowedClassIds[number];

  // Safely parse and validate classId
  const parsedClassId = Number(classId);
  const isValidClassId = allowedClassIds.includes(parsedClassId as AllowedClassId);

  if (!isValidClassId || !currentSubject) {
    return (
      <div className="relative overflow-hidden min-h-screen text-white">
        {/* Tech-inspired background elements */}
        <div className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?ixlib=rb-4.0.3')] bg-cover bg-center opacity-10 z-[-3]"></div>
        <div className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1624378515195-8385174173f1?ixlib=rb-4.0.3')] bg-repeat opacity-5 z-[-2]"></div>
        <div className="fixed inset-0 bg-gradient-to-br from-blue-900/80 via-slate-900/90 to-slate-900/80 z-[-1]"></div>
        
        <div className="max-w-4xl mx-auto p-8 text-center">
          <PageTitle 
            title="Data Access Error" 
            subtitle="We couldn't find the requested educational resources"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 inline-block px-6 py-3 bg-blue-900/30 backdrop-blur-sm rounded-lg border border-cyan-500/20"
          >
            <p className="text-cyan-300 mb-4">
              Invalid class or subject parameters. Please check your URL and try again.
            </p>
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 mx-auto text-cyan-400 hover:text-cyan-300 border border-cyan-500/30 px-4 py-2 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to Home
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  // Get the chapters for the selected subject and class
  let subjectChapters: any[] = [];
  const subjectData = chapterData[subject as keyof typeof chapterData];
  if (subjectData) {
    subjectChapters = subjectData[parsedClassId as AllowedClassId] || [];
  }

  // Get subject-specific icon and color
  const getSubjectIcon = (chapterId: number) => {
    if (subject === 'mapPointing') return <MapPin className="w-6 h-6 text-cyan-400" />;
    if (subject === 'maths') return <Calculator className="w-6 h-6 text-cyan-400" />;
    if (subject === 'science') return <Beaker className="w-6 h-6 text-cyan-400" />;
    
    // Rotate through different icons for visual interest
    const icons = [
      <BookOpen className="w-6 h-6 text-cyan-400" />,
      <FileText className="w-6 h-6 text-cyan-400" />,
      <BrainCircuit className="w-6 h-6 text-cyan-400" />,
      <Atom className="w-6 h-6 text-cyan-400" />
    ];
    
    return icons[chapterId % icons.length];
  };

  return (
    <div className="relative overflow-hidden min-h-screen text-white">
      {/* Tech-inspired background elements - same as ClassSelection for consistency */}
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
          onClick={() => navigate(`/class/${classId}`)}
          className="mb-6 flex items-center gap-2 text-cyan-300 hover:text-blue-300 transition-colors backdrop-blur-sm px-4 py-2 rounded-full border border-cyan-600/30 shadow-lg shadow-cyan-900/20 w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Subjects
        </button>

        <PageTitle 
          title={`${currentSubject.name} Chapters`} 
          subtitle={`Class ${classId} learning materials aligned with Telangana State Board curriculum`}
        />

        {/* Chapter count info */}
        <div className="mb-8 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-block px-6 py-3 bg-blue-900/30 backdrop-blur-sm rounded-lg border border-cyan-500/20"
          >
            <span className="text-cyan-300/70">
              {subjectChapters.length} {subjectChapters.length === 1 ? 'chapter' : 'chapters'} available for {currentSubject.name}
            </span>
          </motion.div>
        </div>

        {subjectChapters.length > 0 ? (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show" 
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {subjectChapters.map((chapter) => (
              <motion.div key={chapter.id} variants={item}>
                <Card
                  onClick={() => navigate(`/class/${classId}/${subject}/${chapter.id}`)}
                  icon={getSubjectIcon(chapter.id)}
                >
                  <div className="flex flex-col">
                    <div className="flex justify-between items-center">
                      <div>
                        {subject !== 'mapPointing' && (
                          <span className="text-xs text-cyan-400/70 bg-cyan-900/20 px-2 py-1 rounded-md border border-cyan-500/10">
                            Chapter {chapter.id}
                          </span>
                        )}
                        <h3 className="text-lg font-semibold mt-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-200">
                          {chapter.title}
                        </h3>
                      </div>
                      <ChevronRight className="w-5 h-5 text-cyan-400/70" />
                    </div>
                    <p className="text-sm text-cyan-200/70 mt-2">
                      {chapter.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center p-8 bg-blue-900/20 backdrop-blur-md rounded-xl border border-cyan-500/10"
          >
            <p className="text-cyan-300">
              No chapters available for this subject.
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}