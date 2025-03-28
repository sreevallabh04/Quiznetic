import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Trophy, ArrowLeft, AlertCircle, Loader2 } from 'lucide-react';
import { chapterData } from '../data/chapterData';
import { subjects } from '../data/subjects';
import { Card } from './ui/Card';
import { PageTitle } from './ui/PageTitle';
import { ProgressBar } from './ui/ProgressBar';
import { fetchQuestionsFromAPI } from '../utils/api';
import MapDisplay from './MapDisplay';

export default function Quiz() {
  const navigate = useNavigate();
  const { classId, subject, chapter } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  
  // New states for API integration
  const [isLoading, setIsLoading] = useState(false);
  const [apiQuestions, setApiQuestions] = useState<any[]>([]);
  const [apiError, setApiError] = useState<string | null>(null);

  const currentSubject = subjects.find((s) => s.id === subject);
  
  // Get subject data based on subject parameter
  const subjectData = subject ? chapterData[subject as keyof typeof chapterData] : undefined;
  
  // Get class-specific data
  const classData = subjectData ? subjectData[Number(classId) as 6 | 7 | 8 | 9 | 10] : undefined;
  
  // Get chapters for the selected subject and class
  const subjectChapters = classData || [];
  
  // Find the specific chapter based on chapter parameter
  const currentChapter = subjectChapters.find((c: { id: number }) => c.id === Number(chapter));
  
  // Static questions from data files
  const staticQuestions = currentChapter?.questions || [];
  
  // Combined questions from both static and API sources
  const questions = [...staticQuestions, ...apiQuestions];

  // Fetch additional questions from API
  useEffect(() => {
    // Skip API call if we don't have necessary data
    if (!currentChapter || !classId || !subject) return;

    const fetchQuestions = async () => {
      setIsLoading(true);
      setApiError(null);
      
      try {
        const result = await fetchQuestionsFromAPI(
          Number(classId),
          subject as string,
          currentChapter.title,
          // Safely access description with fallback
          'description' in currentChapter ? currentChapter.description : `${currentChapter.title} chapter from ${subject} for class ${classId}`
        );
        
        if (result.success && result.questions.length > 0) {
          setApiQuestions(result.questions);
        } else {
          setApiError(result.error || 'Failed to fetch questions');
          console.warn('API Error:', result.error);
        }
      } catch (error) {
        setApiError('Error fetching questions');
        console.error('Error in quiz component:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, [classId, subject, chapter, currentChapter]);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    if (answer === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  if (!currentChapter || (staticQuestions.length === 0 && !isLoading && apiQuestions.length === 0)) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-2xl mx-auto text-center"
      >
        <h2 className="text-3xl font-bold mb-4">Chapter Not Found</h2>
        <button
          onClick={() => navigate(`/class/${classId}/${subject}`)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Back to Chapters
        </button>
      </motion.div>
    );
  }

  if (showResult) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-2xl mx-auto text-center"
      >
        <div className="flex justify-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="p-4 bg-yellow-500/20 rounded-full"
          >
            <Trophy className="w-16 h-16 text-yellow-400" />
          </motion.div>
        </div>
        <h2 className="text-3xl font-bold mb-4">Quiz Complete!</h2>
        <p className="text-xl mb-4">
          Your score: {score} out of {questions.length}
        </p>
        <div className="space-x-4">
          <button
            onClick={() => navigate(`/class/${classId}/${subject}`)}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Back to Chapters
          </button>
          <button
            onClick={() => {
              setCurrentQuestion(0);
              setScore(0);
              setShowResult(false);
              setSelectedAnswer(null);
            }}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </motion.div>
    );
  }

  // If we're loading and have no static questions, show loading indicator
  if (isLoading && staticQuestions.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-2xl mx-auto text-center"
      >
        <div className="flex flex-col items-center justify-center h-32">
          <Loader2 className="w-8 h-8 text-purple-500 animate-spin mb-4" />
          <p className="text-lg text-purple-300">Loading questions from Telangana board syllabus...</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative max-w-3xl mx-auto"
    >
      {/* Futuristic Background Pattern */}
      {/* Tech Grid Background */}
      <div className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80')] bg-cover bg-center opacity-10 z-[-3]"></div>
      
      {/* Circuit Pattern Overlay */}
      <div className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80')] bg-cover bg-center opacity-5 z-[-2]"></div>
      
      {/* Animated Gradient Overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900/30 via-cyan-900/20 to-blue-800/30 z-[-1]"></div>
      
      {/* Digital Particles */}
      <div className="fixed inset-0 overflow-hidden z-[-1]">
        {Array.from({ length: 15 }).map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-cyan-500"
            style={{
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5,
              animation: `float ${Math.random() * 10 + 5}s infinite linear`
            }}
          />
        ))}
      </div>
      
      {/* Back Button */}
      <button
        onClick={() => navigate(`/class/${classId}/${subject}`)}
        className="mb-4 flex items-center gap-2 text-cyan-300 hover:text-blue-400 transition-colors backdrop-blur-sm px-4 py-2 rounded-full border border-cyan-600/30 shadow-lg shadow-cyan-900/20"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Chapters
      </button>

      {/* Chapter Title */}
      <PageTitle title={currentChapter.title} className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500 drop-shadow-[0_0_10px_rgba(6,182,212,0.3)]" />
      
      {/* Loading Indicator */}
      {isLoading && (
        <div className="mb-4 flex items-center justify-center gap-2 text-sm text-cyan-300 bg-blue-900/30 p-3 rounded-lg backdrop-blur-md border border-cyan-500/30 shadow-lg shadow-cyan-500/20">
          <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
          <span>Loading more questions...</span>
        </div>
      )}
      
      {/* Error Indicator */}
      {apiError && staticQuestions.length > 0 && (
        <div className="mb-4 flex items-center justify-center gap-2 text-sm text-yellow-300 bg-yellow-900/30 p-3 rounded-lg backdrop-blur-md border border-yellow-500/30 shadow-lg shadow-cyan-500/20">
          <AlertCircle className="w-4 h-4 text-yellow-400" />
          <span>Using available questions. Couldn't load additional questions.</span>
        </div>
      )}
      
      {/* Main Quiz Card */}
      <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-cyan-500/20 shadow-lg shadow-cyan-500/20 relative overflow-hidden">
        {/* Decorative Tech Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-cyan-500/10 to-blue-500/10 rounded-full blur-2xl"></div>
        
        {/* Circuit Board Pattern */}
        <div className="absolute inset-0 opacity-5 bg-[url('https://images.unsplash.com/photo-1624378515195-8385174173f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80')] bg-repeat z-0"></div>
        {/* Progress Indicator */}
        <div className="mb-6 relative z-10">
          <ProgressBar current={currentQuestion + 1} total={questions.length} className="h-2 bg-gray-700 rounded-full overflow-hidden" progressClassName="bg-gradient-to-r from-blue-400 to-cyan-500" />
          <div className="flex justify-between items-center text-sm mt-2">
            <span className="text-cyan-300">Question {currentQuestion + 1} of {questions.length}</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500 font-bold">Score: {score}</span>
          </div>
        </div>

        {/* Question Text */}
        <h3 className="text-xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-300 relative z-10">{questions[currentQuestion]?.question}</h3>

        {/* Interactive Map Display */}
        {questions[currentQuestion]?.mapData && (
          <div className="mb-8 relative z-10">
            <div className="rounded-xl border-2 border-cyan-500/40 overflow-hidden shadow-lg shadow-cyan-500/30 transform hover:scale-[1.02] transition-transform duration-300 relative">
              {/* Map Overlay Elements */}
              <div className="absolute inset-0 pointer-events-none z-10">
                <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-cyan-500/40 rounded-tl-lg"></div>
                <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-cyan-500/40 rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-cyan-500/40 rounded-bl-lg"></div>
                <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-cyan-500/40 rounded-br-lg"></div>
              </div>
              <MapDisplay mapData={questions[currentQuestion].mapData} />
            </div>
            <p className="text-sm text-center text-cyan-300 mt-3 bg-black/30 backdrop-blur-md p-2 rounded-full inline-block px-6 mx-auto border border-cyan-500/20 shadow-lg shadow-cyan-500/10">
              Explore the map and select the correct answer
            </p>
          </div>
        )}
        
        {/* Static Image Display */}
        {!questions[currentQuestion]?.mapData && questions[currentQuestion]?.imageUrl && (
          <div className="mb-8 relative z-10">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur-md opacity-50 group-hover:opacity-75 transition duration-300"></div>
              <img 
                src={questions[currentQuestion].imageUrl} 
                alt="Map reference" 
                className="relative rounded-lg w-full max-w-2xl mx-auto z-10"
              />
            </div>
            <p className="text-sm text-center text-cyan-300 mt-3 bg-black/30 backdrop-blur-md p-2 rounded-full inline-block px-6 mx-auto border border-cyan-500/20 shadow-lg shadow-cyan-500/10">
              Look at the map and select the correct answer
            </p>
          </div>
        )}

        {/* Answer Options */}
        <div className="space-y-4 relative z-10">
          <AnimatePresence mode="wait">
            {questions[currentQuestion]?.options.map((option: string, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                {/* Glow Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/0 via-cyan-500/0 to-blue-500/0 rounded-lg blur opacity-0 group-hover:opacity-50 transition duration-300"></div>
                
                <Card 
                  onClick={() => !selectedAnswer && handleAnswer(option)}
                  className={`relative backdrop-blur-md border ${
                    selectedAnswer === option
                      ? option === questions[currentQuestion].correct
                        ? 'border-green-500/50 bg-green-900/20'
                        : 'border-red-500/50 bg-red-900/20'
                      : 'border-cyan-600/30 bg-black/40 hover:bg-blue-900/20'
                  } transition-all duration-300`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-medium ${selectedAnswer === option ? (option === questions[currentQuestion].correct ? 'text-green-300' : 'text-red-300') : 'text-white'}`}>
                      {option}
                    </span>
                    {selectedAnswer === option && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      >
                        {option === questions[currentQuestion].correct ? (
                          <CheckCircle2 className="w-5 h-5 text-green-400" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-400" />
                        )}
                      </motion.span>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}