import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Trophy, ArrowLeft } from 'lucide-react';
import { chapterData } from '../data/chapterData';
import { subjects } from '../data/subjects';
import { Card } from './ui/Card';
import { PageTitle } from './ui/PageTitle';
import { ProgressBar } from './ui/ProgressBar';

export default function Quiz() {
  const navigate = useNavigate();
  const { classId, subject, chapter } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const currentSubject = subjects.find(s => s.id === subject);
  const subjectChapters = chapterData[subject as keyof typeof chapterData]?.[Number(classId)] || [];
  const currentChapter = subjectChapters.find(c => c.id === Number(chapter));
  const questions = currentChapter?.questions || [];

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

  if (!currentChapter || questions.length === 0) {
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto"
    >
      <button
        onClick={() => navigate(`/class/${classId}/${subject}`)}
        className="mb-4 flex items-center gap-2 text-purple-300 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Chapters
      </button>

      <PageTitle title={currentChapter.title} />
      
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
        <div className="mb-4">
          <ProgressBar current={currentQuestion + 1} total={questions.length} />
          <div className="flex justify-between items-center text-sm text-purple-300">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>Score: {score}</span>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-6">{questions[currentQuestion]?.question}</h3>

        <div className="space-y-3">
          <AnimatePresence mode="wait">
            {questions[currentQuestion]?.options.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card onClick={() => !selectedAnswer && handleAnswer(option)}>
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {selectedAnswer === option && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      >
                        {option === questions[currentQuestion].correct ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500" />
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