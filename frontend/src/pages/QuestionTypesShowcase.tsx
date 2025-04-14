import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowRight, GripVertical, PencilRuler, FileQuestion, MousePointerSquareDashed, ListTodo, ListChecks } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { PageTitle } from '../components/ui/PageTitle';
import { Reorder } from 'framer-motion';

export default function QuestionTypesShowcase() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-12">
        <PageTitle title="Interactive Question Types" />
        <p className="text-xl text-secondary-600 mt-4 max-w-3xl mx-auto">
          Explore our diverse question formats designed to make learning more engaging and effective
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-16">
        <MultipleChoiceDemo />
        <FillInTheBlankDemo />
        <MatchingDemo />
        <DragDropDemo />
        <DropdownDemo />
      </div>

      <div className="mt-16 text-center">
        <p className="text-lg text-secondary-600 mb-6">
          These varied question types help students engage with content in different ways, reinforcing learning through multiple methods.
        </p>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium text-lg transition-all shadow-md hover:shadow-lg"
          onClick={() => window.location.href = '/home'}
        >
          Start Practicing Now
        </motion.button>
      </div>
    </div>
  );
}

function MultipleChoiceDemo() {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  
  const question = {
    question: "Which state is known as the 'Rice Bowl of India'?",
    options: ["Tamil Nadu", "Andhra Pradesh", "West Bengal", "Punjab"],
    correct: "Andhra Pradesh"
  };
  
  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
  };
  
  return (
    <section className="bg-white rounded-2xl shadow-md p-8 border border-primary-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-primary-100 rounded-full">
          <FileQuestion className="w-8 h-8 text-primary-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-secondary-800">Multiple Choice Questions</h2>
          <p className="text-secondary-600">Select the best answer from the given options</p>
        </div>
      </div>
      
      <div className="bg-primary-50/50 p-6 rounded-xl border border-primary-100 mb-6">
        <h3 className="text-xl font-semibold mb-6 text-secondary-800">{question.question}</h3>
        
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <div
              key={index}
              className="relative group"
            >
              <Card 
                onClick={() => handleAnswer(option)}
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
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-primary-50/20 p-4 rounded-lg border border-primary-100">
        <h4 className="font-semibold text-secondary-700 mb-2">Benefits:</h4>
        <ul className="list-disc list-inside text-secondary-600 space-y-1">
          <li>Quick assessment of factual knowledge</li>
          <li>Helps students practice decision-making</li>
          <li>Efficient for testing comprehension across topics</li>
        </ul>
      </div>
    </section>
  );
}

function FillInTheBlankDemo() {
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  
  const question = {
    question: "Hyderabad is the capital city of [BLANK].",
    correct: "Telangana"
  };
  
  const parts = question.question.split('[BLANK]');
  
  const handleSubmit = () => {
    setSubmitted(true);
  };
  
  return (
    <section className="bg-white rounded-2xl shadow-md p-8 border border-primary-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-amber-100 rounded-full">
          <PencilRuler className="w-8 h-8 text-amber-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-secondary-800">Fill-in-the-Blank Questions</h2>
          <p className="text-secondary-600">Complete the statement with the correct word or phrase</p>
        </div>
      </div>
      
      <div className="bg-amber-50/50 p-6 rounded-xl border border-amber-100 mb-6">
        <div className="flex flex-wrap items-center text-xl font-medium text-secondary-800 mb-6">
          {parts.map((part, index) => (
            <React.Fragment key={index}>
              <span>{part}</span>
              {index < parts.length - 1 && (
                <div className="inline-block mx-1 my-1 w-32 h-10">
                  <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    className="w-full h-full px-3 py-1 border-b-2 bg-white border-amber-300 focus:border-amber-500 focus:outline-none rounded text-center"
                    placeholder="Type answer..."
                    disabled={submitted}
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
        
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`w-full py-3 px-6 rounded-lg text-white font-medium transition-colors ${
            submitted ? 'bg-gray-400 cursor-not-allowed' : 'bg-amber-600 hover:bg-amber-700'
          }`}
          onClick={handleSubmit}
          disabled={submitted}
        >
          {submitted ? (
            <div className="flex items-center justify-center space-x-2">
              <span>
                {userAnswer.toLowerCase() === question.correct.toLowerCase() 
                  ? 'Correct!' 
                  : `Incorrect! The answer is "${question.correct}"`}
              </span>
              {userAnswer.toLowerCase() === question.correct.toLowerCase() ? (
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
      
      <div className="bg-amber-50/20 p-4 rounded-lg border border-amber-100">
        <h4 className="font-semibold text-secondary-700 mb-2">Benefits:</h4>
        <ul className="list-disc list-inside text-secondary-600 space-y-1">
          <li>Tests active recall rather than recognition</li>
          <li>Improves term and definition memorization</li>
          <li>Helps with spelling and language precision</li>
        </ul>
      </div>
    </section>
  );
}

function MatchingDemo() {
  const [matchingPairs, setMatchingPairs] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  
  const question = {
    prompt: "Match the rivers with the states they flow through:",
    pairs: [
      { left: { id: "L1", text: "Godavari" }, right: { id: "R1", text: "Telangana" } },
      { left: { id: "L2", text: "Krishna" }, right: { id: "R2", text: "Maharashtra" } },
      { left: { id: "L3", text: "Narmada" }, right: { id: "R3", text: "Madhya Pradesh" } }
    ]
  };
  
  const shuffledRightItems = [
    { id: "R2", text: "Maharashtra" },
    { id: "R3", text: "Madhya Pradesh" },
    { id: "R1", text: "Telangana" }
  ];
  
  const handlePairSelection = (leftId: string, rightId: string) => {
    setMatchingPairs(prev => ({
      ...prev,
      [leftId]: rightId
    }));
  };
  
  const handleSubmit = () => {
    setSubmitted(true);
  };
  
  return (
    <section className="bg-white rounded-2xl shadow-md p-8 border border-primary-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-100 rounded-full">
          <ListChecks className="w-8 h-8 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-secondary-800">Matching Questions</h2>
          <p className="text-secondary-600">Connect related items from two different columns</p>
        </div>
      </div>
      
      <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100 mb-6">
        <p className="mb-4 text-lg font-medium text-secondary-700">{question.prompt}</p>
        
        <div className="grid grid-cols-2 gap-6">
          {/* Left column - terms */}
          <div className="space-y-3">
            <h4 className="font-semibold text-blue-600 mb-2 text-center">Rivers</h4>
            {question.pairs.map((pair, index) => (
              <div 
                key={`left-${index}`}
                className={`p-3 rounded-lg border ${
                  matchingPairs[pair.left.id] 
                    ? 'border-blue-400 bg-blue-50' 
                    : 'border-gray-200'
                } transition-colors`}
              >
                <div className="flex justify-between items-center">
                  <span>{pair.left.text}</span>
                  {matchingPairs[pair.left.id] && (
                    <ArrowRight className="w-4 h-4 text-blue-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* Right column - definitions */}
          <div className="space-y-3">
            <h4 className="font-semibold text-blue-600 mb-2 text-center">States</h4>
            {shuffledRightItems.map((rightItem, index) => (
              <div 
                key={`right-${index}`}
                className={`p-3 rounded-lg border cursor-pointer ${
                  Object.values(matchingPairs).includes(rightItem.id)
                    ? 'border-blue-400 bg-blue-50 opacity-50'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/30'
                } transition-colors`}
                onClick={() => {
                  if (submitted) return;
                  
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
        
        <div className="mt-6 flex space-x-4">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="py-3 px-6 rounded-lg text-white font-medium bg-secondary-500 hover:bg-secondary-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            onClick={() => setMatchingPairs({})}
            disabled={submitted}
          >
            <div className="flex items-center space-x-2">
              <span>Reset</span>
            </div>
          </motion.button>
          
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex-1 py-3 px-6 rounded-lg text-white font-medium transition-colors ${
              Object.keys(matchingPairs).length === question.pairs.length && !submitted
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
            onClick={handleSubmit}
            disabled={Object.keys(matchingPairs).length !== question.pairs.length || submitted}
          >
            {submitted ? 'Submitted!' : 'Submit Matches'}
          </motion.button>
        </div>
      </div>
      
      <div className="bg-blue-50/20 p-4 rounded-lg border border-blue-100">
        <h4 className="font-semibold text-secondary-700 mb-2">Benefits:</h4>
        <ul className="list-disc list-inside text-secondary-600 space-y-1">
          <li>Builds association between related concepts</li>
          <li>Improves classification and categorization skills</li>
          <li>Great for vocabulary learning and relationship mapping</li>
        </ul>
      </div>
    </section>
  );
}

function DragDropDemo() {
  const [orderedItems, setOrderedItems] = useState([
    { id: "i3", text: "Third phase of Indian Independence Movement (1942-1947)" },
    { id: "i1", text: "First phase of Indian Independence Movement (1857-1905)" },
    { id: "i2", text: "Second phase of Indian Independence Movement (1905-1942)" }
  ]);
  
  const [submitted, setSubmitted] = useState<boolean>(false);
  
  const correctOrder = [
    { id: "i1", text: "First phase of Indian Independence Movement (1857-1905)" },
    { id: "i2", text: "Second phase of Indian Independence Movement (1905-1942)" },
    { id: "i3", text: "Third phase of Indian Independence Movement (1942-1947)" }
  ];
  
  const handleSubmit = () => {
    setSubmitted(true);
  };
  
  return (
    <section className="bg-white rounded-2xl shadow-md p-8 border border-primary-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-green-100 rounded-full">
          <MousePointerSquareDashed className="w-8 h-8 text-green-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-secondary-800">Drag-and-Drop Ordering Questions</h2>
          <p className="text-secondary-600">Arrange items in the correct sequence by dragging them</p>
        </div>
      </div>
      
      <div className="bg-green-50/50 p-6 rounded-xl border border-green-100 mb-6">
        <p className="mb-4 text-lg font-medium text-secondary-700">
          Arrange the following events in chronological order:
        </p>
        
        <div className="mb-4 flex justify-center">
          <div className="inline-flex items-center px-4 py-2 bg-green-50 rounded-full border border-green-100">
            <span className="text-sm font-medium text-green-700">
              {!submitted ? "Drag items to rearrange" : "Order submitted"}
            </span>
          </div>
        </div>
        
        <Reorder.Group 
          as="div" 
          axis="y" 
          values={orderedItems} 
          onReorder={!submitted ? setOrderedItems : undefined}
          className="space-y-3"
        >
          {orderedItems.map(item => (
            <Reorder.Item
              key={item.id}
              value={item}
              className={`p-3 rounded-lg border ${submitted ? 'bg-gray-50' : 'bg-white'} shadow-sm ${!submitted ? 'cursor-move hover:border-green-300' : ''} transition-all`}
              disabled={submitted}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium text-secondary-800">{item.text}</span>
                {!submitted && <GripVertical className="w-5 h-5 text-gray-400" />}
              </div>
            </Reorder.Item>
          ))}
        </Reorder.Group>
        
        <div className="mt-6 flex space-x-4">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="py-3 px-6 rounded-lg text-white font-medium bg-secondary-500 hover:bg-secondary-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            onClick={() => setOrderedItems([...orderedItems].sort(() => Math.random() - 0.5))}
            disabled={submitted}
          >
            <div className="flex items-center space-x-2">
              <span>Shuffle</span>
            </div>
          </motion.button>
          
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex-1 py-3 px-6 rounded-lg text-white font-medium transition-colors ${
              !submitted
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
            onClick={handleSubmit}
            disabled={submitted}
          >
            {submitted ? 'Submitted!' : 'Submit Order'}
          </motion.button>
        </div>
      </div>
      
      <div className="bg-green-50/20 p-4 rounded-lg border border-green-100">
        <h4 className="font-semibold text-secondary-700 mb-2">Benefits:</h4>
        <ul className="list-disc list-inside text-secondary-600 space-y-1">
          <li>Teaches chronology and sequential thinking</li>
          <li>Improves understanding of processes and procedures</li>
          <li>Enhances motor skills and spatial reasoning</li>
        </ul>
      </div>
    </section>
  );
}

function DropdownDemo() {
  const [dropdownSelections, setDropdownSelections] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  
  const question = {
    question: "The [DROPDOWN_1] is the longest river in India, while the [DROPDOWN_2] forms the largest delta in the world.",
    dropdowns: [
      {
        placeholder: "[DROPDOWN_1]",
        options: ["Ganges", "Yamuna", "Godavari", "Brahmaputra"],
        correct: "Ganges"
      },
      {
        placeholder: "[DROPDOWN_2]",
        options: ["Ganges", "Amazon", "Nile", "Mississippi"],
        correct: "Ganges"
      }
    ]
  };
  
  // Create question elements
  const questionElements: JSX.Element[] = [];
  let lastIndex = 0;
  
  // Regular expression to find dropdown placeholders
  const regex = /\[DROPDOWN_(\d+)\]/g;
  let match;
  let text = question.question;

  while ((match = regex.exec(text)) !== null) {
    // Add text before the placeholder
    if (match.index > lastIndex) {
      questionElements.push(
        <span key={`text-${lastIndex}`}>{text.substring(lastIndex, match.index)}</span>
      );
    }
    
    // Find the corresponding dropdown from the question data
    const placeholder = match[0];
    const dropdown = question.dropdowns.find(d => d.placeholder === placeholder);
    
    if (dropdown) {
      // Add the dropdown element
      questionElements.push(
        <select
          key={`dropdown-${match[1]}`}
          value={dropdownSelections[placeholder] || ''}
          onChange={(e) => {
            if (submitted) return;
            setDropdownSelections(prev => ({
              ...prev,
              [placeholder]: e.target.value
            }));
          }}
          className="mx-1 px-2 py-1 rounded border border-purple-300 bg-white focus:border-purple-500 focus:outline-none text-secondary-800 font-medium disabled:opacity-60"
          disabled={submitted}
        >
          <option value="">Select...</option>
          {dropdown.options.map((option, idx) => (
            <option key={idx} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    }
    
    // Update lastIndex to after the current match
    lastIndex = match.index + match[0].length;
  }
  
  // Add any remaining text
  if (lastIndex < text.length) {
    questionElements.push(
      <span key={`text-${lastIndex}`}>{text.substring(lastIndex)}</span>
    );
  }
  
  const handleSubmit = () => {
    setSubmitted(true);
  };
  
  return (
    <section className="bg-white rounded-2xl shadow-md p-8 border border-primary-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-purple-100 rounded-full">
          <ListTodo className="w-8 h-8 text-purple-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-secondary-800">Dropdown Selection Questions</h2>
          <p className="text-secondary-600">Select the appropriate option from dropdown menus</p>
        </div>
      </div>
      
      <div className="bg-purple-50/50 p-6 rounded-xl border border-purple-100 mb-6">
        <div className="flex flex-wrap items-center text-xl font-medium text-secondary-800 space-x-1 mb-6">
          {questionElements}
        </div>
        
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`w-full py-3 px-6 rounded-lg text-white font-medium transition-colors ${
            Object.keys(dropdownSelections).length === question.dropdowns.length && !submitted
              ? 'bg-purple-600 hover:bg-purple-700'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
          onClick={handleSubmit}
          disabled={Object.keys(dropdownSelections).length !== question.dropdowns.length || submitted}
        >
          {submitted ? (
            <div className="flex items-center justify-center space-x-2">
              <span>
                {question.dropdowns.every(dd => dropdownSelections[dd.placeholder] === dd.correct) 
                  ? 'Correct!' 
                  : 'Incorrect!'}
              </span>
              {question.dropdowns.every(dd => dropdownSelections[dd.placeholder] === dd.correct) ? (
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
      
      <div className="bg-purple-50/20 p-4 rounded-lg border border-purple-100">
        <h4 className="font-semibold text-secondary-700 mb-2">Benefits:</h4>
        <ul className="list-disc list-inside text-secondary-600 space-y-1">
          <li>Contextualizes vocabulary within sentences</li>
          <li>Tests grammar and syntax knowledge</li>
          <li>Develops recognition of appropriate terms in context</li>
        </ul>
      </div>
    </section>
  );
}