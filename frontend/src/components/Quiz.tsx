import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { CheckCircle2, XCircle, Trophy, ArrowLeft, AlertCircle, Loader2, Check, ArrowDown, RefreshCw, GripVertical, ArrowRight } from 'lucide-react';
import { chapterData } from '../data/chapterData';
import { subjects } from '../data/subjects';
import { Card } from './ui/Card';
import { PageTitle } from './ui/PageTitle';
import { ProgressBar } from './ui/ProgressBar';
import { 
  fetchQuestionsFromAPI, 
  Question, 
  QuestionType,
  MultipleChoiceQuestion,
  FillBlankQuestion,
  MatchingQuestion,
  DragDropOrderQuestion,
  DropdownQuestion
} from '../utils/api';
import MapDisplay from './MapDisplay';

// Helper function to shuffle an array
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export default function Quiz() {
  const navigate = useNavigate();
  const { classId, subject, chapter } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<string, any>>({}); // Enhanced to store various answer types
  
  // New states for API integration
  const [isLoading, setIsLoading] = useState(false);
  const [apiQuestions, setApiQuestions] = useState<Question[]>([]);
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
  
  // Convert static questions to follow the Question interface format
  const staticQuestions = currentChapter?.questions 
    ? currentChapter.questions.map((q: any, index: number) => ({
        id: `static_${index}`,
        type: 'multiple_choice' as QuestionType,
        question: q.question,
        options: q.options,
        correct: q.correct,
        ...(q.mapData && { mapData: q.mapData }),
        ...(q.imageUrl && { imageUrl: q.imageUrl })
      }))
    : [];
  
  // Combined questions from both static and API sources
  const questions: Question[] = [...staticQuestions, ...apiQuestions];

  // For matching questions
  const [matchingPairs, setMatchingPairs] = useState<Record<string, string>>({});
  
  // For drag and drop questions
  const [orderedItems, setOrderedItems] = useState<any[]>([]);
  
  // For fill in the blank questions
  const inputRef = useRef<HTMLInputElement>(null);

  // For dropdown questions
  const [dropdownSelections, setDropdownSelections] = useState<Record<string, string>>({});

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

  // Initialize state based on current question
  useEffect(() => {
    if (questions.length === 0) return;
    
    const currentQ = questions[currentQuestion];
    
    if (currentQ.type === 'matching') {
      // Initialize with empty selections
      setMatchingPairs({});
    } else if (currentQ.type === 'drag_drop_order') {
      // Initialize with shuffled items
      const itemsToOrder = (currentQ as DragDropOrderQuestion).items;
      setOrderedItems(shuffleArray([...itemsToOrder]));
    } else if (currentQ.type === 'dropdown') {
      // Initialize dropdown selections
      setDropdownSelections({});
    }
  }, [currentQuestion, questions]);

  const handleMultipleChoiceAnswer = (answer: string) => {
    const question = questions[currentQuestion] as MultipleChoiceQuestion;
    setSelectedAnswer(answer);
    
    // Record user's answer
    const newUserAnswers = { ...userAnswers };
    newUserAnswers[question.id] = answer;
    setUserAnswers(newUserAnswers);

    if (answer === question.correct) {
      setScore(score + 1);
    }

    moveToNextQuestion();
  };

  const handleFillBlankAnswer = () => {
    if (!inputRef.current) return;
    
    const question = questions[currentQuestion] as FillBlankQuestion;
    const userAnswer = inputRef.current.value.trim();
    setSelectedAnswer(userAnswer);
    
    // Record user's answer
    const newUserAnswers = { ...userAnswers };
    newUserAnswers[question.id] = userAnswer;
    setUserAnswers(newUserAnswers);

    // Check if the answer is correct (case insensitive)
    if (userAnswer.toLowerCase() === question.correct.toLowerCase()) {
      setScore(score + 1);
    }

    moveToNextQuestion();
  };

  const handleMatchingAnswer = () => {
    const question = questions[currentQuestion] as MatchingQuestion;
    
    // Record user's answer
    const newUserAnswers = { ...userAnswers };
    newUserAnswers[question.id] = { ...matchingPairs };
    setUserAnswers(newUserAnswers);

    // Check if all pairs are correctly matched
    let allCorrect = true;
    for (const pair of question.pairs) {
      if (matchingPairs[pair.left.id] !== pair.right.id) {
        allCorrect = false;
        break;
      }
    }

    if (allCorrect) {
      setScore(score + 1);
    }

    moveToNextQuestion();
  };

  const handleDragDropAnswer = () => {
    const question = questions[currentQuestion] as DragDropOrderQuestion;
    
    // Record user's answer
    const newUserAnswers = { ...userAnswers };
    newUserAnswers[question.id] = [...orderedItems];
    setUserAnswers(newUserAnswers);

    // Check if items are in correct order
    const correctOrder = question.items.map(item => item.id);
    const userOrder = orderedItems.map(item => item.id);
    
    let isCorrect = true;
    for (let i = 0; i < correctOrder.length; i++) {
      if (correctOrder[i] !== userOrder[i]) {
        isCorrect = false;
        break;
      }
    }

    if (isCorrect) {
      setScore(score + 1);
    }

    moveToNextQuestion();
  };

  const handleDropdownAnswer = () => {
    const question = questions[currentQuestion] as DropdownQuestion;
    
    // Record user's answer
    const newUserAnswers = { ...userAnswers };
    newUserAnswers[question.id] = { ...dropdownSelections };
    setUserAnswers(newUserAnswers);

    // Check if all dropdowns have correct selections
    let allCorrect = true;
    for (const dropdown of question.dropdowns) {
      if (dropdownSelections[dropdown.placeholder] !== dropdown.correct) {
        allCorrect = false;
        break;
      }
    }

    if (allCorrect) {
      setScore(score + 1);
    }

    moveToNextQuestion();
  };

  const moveToNextQuestion = () => {
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const handlePairSelection = (leftId: string, rightId: string) => {
    setMatchingPairs(prev => ({
      ...prev,
      [leftId]: rightId
    }));
  };

  const getFormattedDropdownQuestion = (question: DropdownQuestion) => {
    // Replace dropdown placeholders with actual dropdown elements
    let text = question.question;
    const dropdowns = question.dropdowns || [];
    
    return text;
  };

  const renderQuestionByType = () => {
    if (!questions.length || currentQuestion >= questions.length) {
      return <div className="text-center text-secondary-800">No questions available</div>;
    }

    const currentQ = questions[currentQuestion];

    switch (currentQ.type) {
      case 'multiple_choice':
        return renderMultipleChoiceQuestion(currentQ as MultipleChoiceQuestion);
      case 'fill_blank':
        return renderFillBlankQuestion(currentQ as FillBlankQuestion);
      case 'matching':
        return renderMatchingQuestion(currentQ as MatchingQuestion);
      case 'drag_drop_order':
        return renderDragDropQuestion(currentQ as DragDropOrderQuestion);
      case 'dropdown':
        return renderDropdownQuestion(currentQ as DropdownQuestion);
      default:
        return <div className="text-center text-secondary-800">Unsupported question type</div>;
    }
  };

  const renderMultipleChoiceQuestion = (question: MultipleChoiceQuestion) => {
    return (
      <>
        {/* Interactive Map Display */}
        {question.mapData && (
          <div className="mb-8 relative z-10">
            <div className="rounded-xl border-2 border-primary-200 overflow-hidden shadow-md transform hover:scale-[1.02] transition-transform duration-300 relative">
              {/* Map Overlay Elements */}
              <div className="absolute inset-0 pointer-events-none z-10">
                <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-primary-200 rounded-tl-lg"></div>
                <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-primary-200 rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-primary-200 rounded-bl-lg"></div>
                <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-primary-200 rounded-br-lg"></div>
              </div>
              <MapDisplay mapData={question.mapData} />
            </div>
            <p className="text-sm text-center text-secondary-600 mt-3 bg-primary-50 p-2 rounded-full inline-block px-6 mx-auto border border-primary-100 shadow-sm">
              Explore the map and select the correct answer
            </p>
          </div>
        )}
        
        {/* Static Image Display */}
        {!question.mapData && question.imageUrl && (
          <div className="mb-8 relative z-10">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-200 to-primary-300 rounded-xl blur-md opacity-50 group-hover:opacity-75 transition duration-300"></div>
              <img 
                src={question.imageUrl} 
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
            {question.options.map((option: string, index: number) => (
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
                  onClick={() => !selectedAnswer && handleMultipleChoiceAnswer(option)}
                  className={`relative border ${
                    selectedAnswer === option
                      ? option === question.correct
                        ? 'border-green-500 bg-green-50'
                        : 'border-red-500 bg-red-50'
                      : 'border-secondary-200 bg-white hover:bg-primary-50'
                  } transition-all duration-300`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-medium ${selectedAnswer === option ? (option === question.correct ? 'text-green-700' : 'text-red-700') : 'text-secondary-800'}`}>
                      {option}
                    </span>
                    {selectedAnswer === option && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      >
                        {option === question.correct ? (
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
      </>
    );
  };

  const renderFillBlankQuestion = (question: FillBlankQuestion) => {
    // Split the question text by [BLANK] placeholder
    const parts = question.question.split('[BLANK]');
    
    return (
      <div className="space-y-6">
        <div className="p-4 rounded-lg bg-white border border-primary-100 shadow-sm">
          <div className="flex flex-wrap items-center text-xl font-medium text-secondary-800">
            {parts.map((part, index) => (
              <React.Fragment key={index}>
                <span>{part}</span>
                {index < parts.length - 1 && (
                  <div className="inline-block mx-1 my-1 w-32 h-10">
                    <input
                      ref={inputRef}
                      type="text"
                      className="w-full h-full px-3 py-1 border-b-2 bg-primary-50 border-primary-300 focus:border-primary-500 focus:outline-none rounded text-center"
                      placeholder="Type answer..."
                      disabled={selectedAnswer !== null}
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`w-full py-3 px-6 rounded-lg text-white font-medium transition-colors ${
            selectedAnswer ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary-600 hover:bg-primary-700'
          }`}
          onClick={() => !selectedAnswer && handleFillBlankAnswer()}
          disabled={selectedAnswer !== null}
        >
          {selectedAnswer ? (
            <div className="flex items-center justify-center space-x-2">
              <span>
                {selectedAnswer.toLowerCase() === question.correct.toLowerCase() 
                  ? 'Correct!' 
                  : `Incorrect! The answer is "${question.correct}"`}
              </span>
              {selectedAnswer.toLowerCase() === question.correct.toLowerCase() ? (
                <CheckCircle2 className="w-5 h-5 text-green-200" />
              ) : (
                <XCircle className="w-5 h-5 text-red-200" />
              )}
            </div>
          ) : (
            'Submit Answer'
          )}
        </motion.button>
      </div>
    );
  };

  const renderMatchingQuestion = (question: MatchingQuestion) => {
    // Create a shuffled array of right side items
    const shuffledRightItems = shuffleArray(question.pairs.map(pair => pair.right));
    
    return (
      <div className="space-y-6">
        <div className="p-4 rounded-lg bg-white border border-primary-100 shadow-sm">
          <p className="mb-4 text-lg font-medium text-secondary-700">{question.prompt}</p>
          
          <div className="grid grid-cols-2 gap-6">
            {/* Left column - terms */}
            <div className="space-y-3">
              <h4 className="font-semibold text-primary-600 mb-2 text-center">Terms</h4>
              {question.pairs.map((pair, index) => (
                <div 
                  key={`left-${index}`}
                  className={`p-3 rounded-lg border ${
                    matchingPairs[pair.left.id] 
                      ? 'border-primary-400 bg-primary-50' 
                      : 'border-gray-200'
                  } transition-colors`}
                >
                  <div className="flex justify-between items-center">
                    <span>{pair.left.text}</span>
                    {matchingPairs[pair.left.id] && (
                      <ArrowRight className="w-4 h-4 text-primary-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Right column - definitions */}
            <div className="space-y-3">
              <h4 className="font-semibold text-primary-600 mb-2 text-center">Definitions</h4>
              {shuffledRightItems.map((rightItem, index) => (
                <div 
                  key={`right-${index}`}
                  className={`p-3 rounded-lg border cursor-pointer ${
                    Object.values(matchingPairs).includes(rightItem.id)
                      ? 'border-primary-400 bg-primary-50 opacity-50'
                      : 'border-gray-200 hover:border-primary-300 hover:bg-primary-50/30'
                  } transition-colors`}
                  onClick={() => {
                    // Find the first unmatched left item
                    const unmatchedLeftId = question.pairs.find(
                      pair => !matchingPairs[pair.left.id]
                    )?.left.id;
                    
                    if (unmatchedLeftId && !Object.values(matchingPairs).includes(rightItem.id)) {
                      handlePairSelection(unmatchedLeftId, rightItem.id);
                    }
                  }}
                >
                  {rightItem.text}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex space-x-4">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="py-3 px-6 rounded-lg text-white font-medium bg-secondary-500 hover:bg-secondary-600 transition-colors"
            onClick={() => setMatchingPairs({})}
          >
            <div className="flex items-center space-x-2">
              <RefreshCw className="w-4 h-4" />
              <span>Reset</span>
            </div>
          </motion.button>
          
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex-1 py-3 px-6 rounded-lg text-white font-medium transition-colors ${
              Object.keys(matchingPairs).length === question.pairs.length
                ? 'bg-primary-600 hover:bg-primary-700'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
            onClick={() => Object.keys(matchingPairs).length === question.pairs.length && handleMatchingAnswer()}
            disabled={Object.keys(matchingPairs).length !== question.pairs.length}
          >
            <div className="flex items-center justify-center space-x-2">
              <span>Submit Matches</span>
              <Check className="w-4 h-4" />
            </div>
          </motion.button>
        </div>
      </div>
    );
  };

  const renderDragDropQuestion = (question: DragDropOrderQuestion) => {
    return (
      <div className="space-y-6">
        <div className="p-4 rounded-lg bg-white border border-primary-100 shadow-sm">
          <p className="mb-4 text-lg font-medium text-secondary-700">{question.prompt}</p>
          
          <div className="mb-4 flex justify-center">
            <div className="inline-flex items-center px-4 py-2 bg-primary-50 rounded-full border border-primary-100">
              <ArrowDown className="w-4 h-4 mr-2 text-primary-500" />
              <span className="text-sm font-medium text-primary-700">Drag items to rearrange</span>
            </div>
          </div>
          
          <Reorder.Group 
            as="div" 
            axis="y" 
            values={orderedItems} 
            onReorder={setOrderedItems}
            className="space-y-3"
          >
            {orderedItems.map(item => (
              <Reorder.Item
                key={item.id}
                value={item}
                className="p-3 rounded-lg border border-gray-200 bg-white shadow-sm cursor-move hover:border-primary-300 transition-all"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-secondary-800">{item.text}</span>
                  <GripVertical className="w-5 h-5 text-gray-400" />
                </div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </div>
        
        <div className="flex space-x-4">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="py-3 px-6 rounded-lg text-white font-medium bg-secondary-500 hover:bg-secondary-600 transition-colors"
            onClick={() => setOrderedItems(shuffleArray([...question.items]))}
          >
            <div className="flex items-center space-x-2">
              <RefreshCw className="w-4 h-4" />
              <span>Shuffle</span>
            </div>
          </motion.button>
          
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 py-3 px-6 rounded-lg text-white font-medium bg-primary-600 hover:bg-primary-700 transition-colors"
            onClick={handleDragDropAnswer}
          >
            <div className="flex items-center justify-center space-x-2">
              <span>Submit Order</span>
              <Check className="w-4 h-4" />
            </div>
          </motion.button>
        </div>
      </div>
    );
  };

  // Error boundary function to safely render dropdown elements
  const renderDropdownQuestion = (question: DropdownQuestion) => {
    // Initialize this array variable at the function scope level
    let questionElements: JSX.Element[] = [];
      
    // Try-catch block to handle any issues with regex or rendering
    try {
      // Split the question text by dropdown placeholders and create elements
      let lastIndex = 0;
      
      // Regular expression to find dropdown placeholders like [DROPDOWN_1]
      const regex = /\[DROPDOWN_(\d+)\]/g;
      let match;
      const text = question.question || ''; // Fallback to empty string if question is undefined
      const dropdowns = question.dropdowns || []; // Fallback to empty array

      while ((match = regex.exec(text)) !== null) {
        try {
          // Add text before the placeholder
          if (match.index > lastIndex) {
            questionElements.push(
              <span key={`text-${lastIndex}`}>{text.substring(lastIndex, match.index)}</span>
            );
          }
          
          // Find the corresponding dropdown from the question data
          const placeholder = match[0];
          const dropdown = dropdowns.find(d => d.placeholder === placeholder);
          
          if (dropdown) {
            // Add the dropdown element with improved styling and z-index
            questionElements.push(
              <div 
                key={`dropdown-container-${match[1]}`} 
                className="inline-block relative mx-2 my-2 min-w-[150px] z-20"
              >
                <select
                  key={`dropdown-${match[1]}`}
                  value={dropdownSelections[placeholder] || ''}
                  onChange={(e) => {
                    e.stopPropagation(); // Prevent event bubbling
                    setDropdownSelections(prev => ({
                      ...prev,
                      [placeholder]: e.target.value
                    }));
                  }}
                  className="w-full px-3 py-2 rounded border-2 border-primary-400 bg-white shadow-sm focus:border-primary-600 focus:outline-none text-secondary-800 font-medium disabled:opacity-60 cursor-pointer appearance-none"
                  disabled={selectedAnswer !== null}
                  aria-label={`Dropdown selection for ${placeholder}`}
                >
                  <option value="">Select...</option>
                  {dropdown.options.map((option, idx) => (
                    <option key={idx} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {/* Custom dropdown arrow for better visibility */}
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <ArrowDown className="h-4 w-4 text-primary-500" />
                </div>
              </div>
            );
          } else {
            // If dropdown not found, show a placeholder with error styling
            questionElements.push(
              <span key={`missing-${match[1]}`} className="mx-1 px-2 py-1 bg-red-100 text-red-600 rounded">
                [Missing dropdown]
              </span>
            );
          }
          
          // Update lastIndex to after the current match
          lastIndex = match.index + match[0].length;
        } catch (e) {
          console.error("Error rendering specific dropdown:", e);
          // Add error placeholder
          questionElements.push(
            <span key={`error-${match ? match[1] : 'unknown'}`} className="mx-1 px-2 py-1 bg-red-100 text-red-600 rounded">
              [Error]
            </span>
          );
          break;
        }
      }
      
      // Add any remaining text
      if (lastIndex < text.length) {
        questionElements.push(
          <span key={`text-${lastIndex}`}>{text.substring(lastIndex)}</span>
        );
      }

      // If no dropdown elements were created due to regex issues, show the raw text
      if (questionElements.length === 0) {
        questionElements.push(
          <span key="fallback-text">{text}</span>
        );
      }
    } catch (error) {
      console.error("Error parsing dropdown question:", error);
      // If the entire rendering process fails, return an error message
      return (
        <div className="space-y-6">
          <div className="p-4 rounded-lg bg-red-50 border border-red-200 shadow-sm">
            <p className="text-red-600">There was an error displaying this question. Please try again or skip to the next question.</p>
            <p className="text-sm text-red-500 mt-2">{question.question}</p>
          </div>
          
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full py-3 px-6 rounded-lg text-white font-medium bg-secondary-600 hover:bg-secondary-700 transition-colors"
            onClick={() => {
              moveToNextQuestion();
            }}
          >
            Skip This Question
          </motion.button>
        </div>
      );
    }
    
    return (
      <div className="space-y-6">
        <div className="p-4 rounded-lg bg-white border border-primary-100 shadow-sm overflow-visible">
          <div className="flex flex-wrap items-center text-xl font-medium text-secondary-800 gap-x-2 gap-y-3">
            {questionElements}
          </div>
        </div>
        
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`w-full py-3 px-6 rounded-lg text-white font-medium transition-colors ${
            Object.keys(dropdownSelections).length === (question.dropdowns?.length || 0) && !selectedAnswer
              ? 'bg-primary-600 hover:bg-primary-700'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
          onClick={() => {
            if (Object.keys(dropdownSelections).length === (question.dropdowns?.length || 0) && !selectedAnswer) {
              setSelectedAnswer('submitted');
              handleDropdownAnswer();
            }
          }}
          disabled={Object.keys(dropdownSelections).length !== (question.dropdowns?.length || 0) || selectedAnswer !== null}
        >
          {selectedAnswer ? (
            <div className="flex items-center justify-center space-x-2">
              <span>
                {(question.dropdowns || []).every(dd => dropdownSelections[dd.placeholder] === dd.correct)
                  ? 'Correct!' 
                  : 'Incorrect!'}
              </span>
              {(question.dropdowns || []).every(dd => dropdownSelections[dd.placeholder] === dd.correct) ? (
                <CheckCircle2 className="w-5 h-5 text-green-200" />
              ) : (
                <XCircle className="w-5 h-5 text-red-200" />
              )}
            </div>
          ) : (
            'Submit Answer'
          )}
        </motion.button>
        
        {/* Help text for dropdown questions */}
        <div className="text-sm text-center text-secondary-500 mt-1">
          Select options from each dropdown menu before submitting
        </div>
      </div>
    ); // Added missing closing parenthesis and semicolon
  }; // Added missing closing brace and semicolon

  // Helper function to render the review of an answer
  const renderAnswerReview = (question: Question, index: number) => {
    const userAnswer = userAnswers[question.id];

    switch (question.type) {
      case 'multiple_choice': {
        const mcQuestion = question as MultipleChoiceQuestion;
        const isCorrect = userAnswer === mcQuestion.correct;
        
        return (
          <>
            <p className={`text-sm ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
              Your Answer: {userAnswer || 'Not Answered'} 
              {userAnswer && (
                isCorrect 
                  ? <CheckCircle2 className="inline w-4 h-4 ml-1" /> 
                  : <XCircle className="inline w-4 h-4 ml-1" />
              )}
            </p>
            <p className="text-sm text-blue-600">Correct Answer: {mcQuestion.correct}</p>
          </>
        );
      }
      
      case 'fill_blank': {
        const fbQuestion = question as FillBlankQuestion;
        const isCorrect = userAnswer?.toLowerCase() === fbQuestion.correct.toLowerCase();
        
        return (
          <>
            <p className={`text-sm ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
              Your Answer: {userAnswer || 'Not Answered'} 
              {userAnswer && (
                isCorrect 
                  ? <CheckCircle2 className="inline w-4 h-4 ml-1" /> 
                  : <XCircle className="inline w-4 h-4 ml-1" />
              )}
            </p>
            <p className="text-sm text-blue-600">Correct Answer: {fbQuestion.correct}</p>
          </>
        );
      }
      
      case 'matching': {
        const matchQuestion = question as MatchingQuestion;
        const userPairs = userAnswer || {};
        
        return (
          <div className="mt-2">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-2 text-left">Term</th>
                  <th className="p-2 text-left">Your Match</th>
                  <th className="p-2 text-left">Correct Match</th>
                  <th className="p-2 text-center">Result</th>
                </tr>
              </thead>
              <tbody>
                {matchQuestion.pairs.map((pair, i) => {
                  const userRightId = userPairs[pair.left.id];
                  const userRight = matchQuestion.pairs.find(p => p.right.id === userRightId)?.right;
                  const isCorrect = userRightId === pair.right.id;
                  
                  return (
                    <tr key={i} className="border-t border-gray-100">
                      <td className="p-2">{pair.left.text}</td>
                      <td className="p-2">{userRight ? userRight.text : 'Not matched'}</td>
                      <td className="p-2">{pair.right.text}</td>
                      <td className="p-2 text-center">
                        {userRight ? (
                          isCorrect 
                            ? <CheckCircle2 className="inline w-4 h-4 text-green-600" /> 
                            : <XCircle className="inline w-4 h-4 text-red-600" />
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      }
      
      case 'drag_drop_order': {
        const ddQuestion = question as DragDropOrderQuestion;
        const userOrder = userAnswer || [];
        const correctOrder = ddQuestion.items;
        
        return (
          <div className="mt-2">
            <div className="flex flex-col space-y-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-sm mb-1">Your Order:</p>
                  {userOrder.length ? (
                    <ol className="list-decimal list-inside text-sm pl-2">
                      {userOrder.map((item: any, i: number) => (
                        <li key={i} className="py-1 px-2 rounded bg-gray-50">
                          {item.text}
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <p className="text-sm text-gray-500 italic">Not answered</p>
                  )}
                </div>
                
                <div>
                  <p className="font-medium text-sm mb-1">Correct Order:</p>
                  <ol className="list-decimal list-inside text-sm pl-2">
                    {correctOrder.map((item, i) => (
                      <li key={i} className="py-1 px-2 rounded bg-gray-50">
                        {item.text}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        );
      }
      
      case 'dropdown': {
        const ddQuestion = question as DropdownQuestion;
        const userSelections = userAnswer || {};
        
        return (
          <div className="mt-2">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-2 text-left">Placeholder</th>
                  <th className="p-2 text-left">Your Selection</th>
                  <th className="p-2 text-left">Correct Answer</th>
                  <th className="p-2 text-center">Result</th>
                </tr>
              </thead>
              <tbody>
                {ddQuestion.dropdowns.map((dropdown, i) => {
                  const userSelection = userSelections[dropdown.placeholder];
                  const isCorrect = userSelection === dropdown.correct;
                  
                  return (
                    <tr key={i} className="border-t border-gray-100">
                      <td className="p-2">{dropdown.placeholder}</td>
                      <td className="p-2">{userSelection || 'Not selected'}</td>
                      <td className="p-2">{dropdown.correct}</td>
                      <td className="p-2 text-center">
                        {userSelection ? (
                          isCorrect 
                            ? <CheckCircle2 className="inline w-4 h-4 text-green-600" /> 
                            : <XCircle className="inline w-4 h-4 text-red-600" />
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      }
      
      default:
        return <p className="text-sm text-gray-500">Answer review not available for this question type.</p>;
    }
  };

  // --- Main Component Return ---

  // Loading State (only show if no static questions are available yet)
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

  // Chapter Not Found State
  if (!currentChapter) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-2xl mx-auto text-center"
      >
        {/* Back Button */}
        <button
          onClick={() => navigate(`/class/${classId}/${subject}`)}
          className="mb-4 flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors px-4 py-2 rounded-full border border-primary-200 shadow-sm mx-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Chapters
        </button>
        <h2 className="text-3xl font-bold mb-4 text-secondary-800">Chapter Not Found</h2>
        <p className="text-secondary-600 mb-6">Could not find the chapter details for Class {classId}, {currentSubject?.name}, Chapter {chapter}.</p>
      </motion.div>
    );
  }

  // Result State
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
              setUserAnswers({}); // Reset user answers
              // Re-initialize question-specific states if needed
              if (questions[0]?.type === 'matching') setMatchingPairs({});
              if (questions[0]?.type === 'drag_drop_order') setOrderedItems(shuffleArray([...(questions[0] as DragDropOrderQuestion).items]));
              if (questions[0]?.type === 'dropdown') setDropdownSelections({});
            }}
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>

        {/* Review Section */}
        <div className="mt-8 text-left max-w-xl mx-auto">
          <h3 className="text-2xl font-semibold mb-4 text-secondary-800">Review Your Answers</h3>
          {questions.map((q, index) => (
            <div key={index} className="mb-6 p-4 border border-secondary-200 rounded-lg bg-white shadow-sm">
              <p className="font-semibold text-secondary-700 mb-2">Question {index + 1}: {q.question?.replace(/MaP: /, '')}</p>
              {renderAnswerReview(q, index)}
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  // Active Quiz State
  // Add a check here to satisfy TypeScript, although the earlier check should prevent this state
  if (!currentChapter) {
      // This should ideally not be reached due to the check above, but satisfies TS
      return null; 
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
      
      {/* Loading Indicator (for API questions when static ones are already shown) */}
      {isLoading && staticQuestions.length > 0 && (
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
        <h3 className="text-xl font-semibold mb-6 text-secondary-800 relative z-10">
          {questions[currentQuestion]?.question?.replace(/MaP: /, '')}
        </h3>

        {/* Render different question types */}
        <div className="relative z-10">
          {renderQuestionByType()}
        </div>
      </div>
    </motion.div>
  );
} // Added missing closing brace
