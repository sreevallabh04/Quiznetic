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
        <h2 className="text-3xl font-bold mb-4 text-secondary-800">Chapter Not Found</h2>
        <button
          onClick={() => navigate(`/class/${classId}/${subject}`)}
          className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg transition-colors"
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
            className="p-4 bg-primary-100 rounded-full"
          >
            <Trophy className="w-16 h-16 text-primary-600" />
          </motion.div>
        </div>
        <h2 className="text-3xl font-bold mb-4 text-secondary-800">Quiz Complete!</h2>
        <p className="text-xl mb-4 text-secondary-700">
          Your score: {score} out of {questions.length}
        </p>
        <div className="space-x-4">
          <button
            onClick={() => navigate(`/class/${classId}/${subject}`)}
            className="bg-secondary-500 hover:bg-secondary-600 text-white px-6 py-2 rounded-lg transition-colors"
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
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg transition-colors"
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
          <Loader2 className="w-8 h-8 text-primary-500 animate-spin mb-4" />
          <p className="text-lg text-primary-600">Loading questions from Telangana board syllabus...</p>
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
      {/* Subtle pattern background */}
      <div className="fixed inset-0 bg-[radial-gradient(#f0f0f0_1px,transparent_1px)] bg-[size:20px_20px] opacity-30 z-[-1]"></div>
      
      {/* Back Button */}
      <button
        onClick={() => navigate(`/class/${classId}/${subject}`)}
        className="mb-4 flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors px-4 py-2 rounded-full border border-primary-200 shadow-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Chapters
      </button>

      {/* Chapter Title */}
      <PageTitle title={currentChapter.title} className="text-secondary-800" />
      
      {/* Loading Indicator */}
      {isLoading && (
        <div className="mb-4 flex items-center justify-center gap-2 text-sm text-primary-600 bg-primary-50 p-3 rounded-lg border border-primary-200 shadow-sm">
          <Loader2 className="w-4 h-4 animate-spin text-primary-600" />
          <span>Loading more questions...</span>
        </div>
      )}
      
      {/* Error Indicator */}
      {apiError && staticQuestions.length > 0 && (
        <div className="mb-4 flex items-center justify-center gap-2 text-sm text-amber-700 bg-amber-50 p-3 rounded-lg border border-amber-200 shadow-sm">
          <AlertCircle className="w-4 h-4 text-amber-500" />
          <span>Using available questions. Couldn't load additional questions.</span>
        </div>
      )}
      
      {/* Main Quiz Card */}
      <div className="bg-white rounded-2xl p-8 border border-primary-100 shadow-md relative overflow-hidden">
        {/* Subtle decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50/50 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary-50/50 rounded-full blur-2xl"></div>
        
        {/* Progress Indicator */}
        <div className="mb-6 relative z-10">
          <ProgressBar current={currentQuestion + 1} total={questions.length} />
          <div className="flex justify-between items-center text-sm mt-2">
            <span className="text-secondary-600">Question {currentQuestion + 1} of {questions.length}</span>
            <span className="text-primary-600 font-bold">Score: {score}</span>
          </div>
        </div>

        {/* Question Text */}
        <h3 className="text-xl font-semibold mb-6 text-secondary-800 relative z-10">{questions[currentQuestion]?.question}</h3>

        {/* Interactive Map Display */}
        {questions[currentQuestion]?.mapData && (
          <div className="mb-8 relative z-10">
            <div className="rounded-xl border-2 border-primary-200 overflow-hidden shadow-md transform hover:scale-[1.02] transition-transform duration-300 relative">
              {/* Map Overlay Elements */}
              <div className="absolute inset-0 pointer-events-none z-10">
                <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-primary-200 rounded-tl-lg"></div>
                <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-primary-200 rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-primary-200 rounded-bl-lg"></div>
                <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-primary-200 rounded-br-lg"></div>
              </div>
              <MapDisplay mapData={questions[currentQuestion].mapData} />
            </div>
            <p className="text-sm text-center text-secondary-600 mt-3 bg-primary-50 p-2 rounded-full inline-block px-6 mx-auto border border-primary-100 shadow-sm">
              Explore the map and select the correct answer
            </p>
          </div>
        )}
        
        {/* Static Image Display */}
        {!questions[currentQuestion]?.mapData && questions[currentQuestion]?.imageUrl && (
          <div className="mb-8 relative z-10">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-200 to-primary-300 rounded-xl blur-md opacity-50 group-hover:opacity-75 transition duration-300"></div>
              <img 
                src={questions[currentQuestion].imageUrl} 
                alt="Map reference" 
                className="relative rounded-lg w-full max-w-2xl mx-auto z-10"
              />
            </div>
            <p className="text-sm text-center text-secondary-600 mt-3 bg-primary-50 p-2 rounded-full inline-block px-6 mx-auto border border-primary-100 shadow-sm">
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
                {/* Subtle highlight effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-200/0 via-primary-300/0 to-primary-200/0 rounded-lg blur opacity-0 group-hover:opacity-50 transition duration-300"></div>
                
                <Card 
                  onClick={() => !selectedAnswer && handleAnswer(option)}
                  className={`relative border ${
                    selectedAnswer === option
                      ? option === questions[currentQuestion].correct
                        ? 'border-green-500 bg-green-50'
                        : 'border-red-500 bg-red-50'
                      : 'border-secondary-200 bg-white hover:bg-primary-50'
                  } transition-all duration-300`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-medium ${selectedAnswer === option ? (option === questions[currentQuestion].correct ? 'text-green-700' : 'text-red-700') : 'text-secondary-800'}`}>
                      {option}
                    </span>
                    {selectedAnswer === option && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      >
                        {option === questions[currentQuestion].correct ? (
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-600" />
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