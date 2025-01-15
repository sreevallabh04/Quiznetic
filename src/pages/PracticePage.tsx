import React, { useState, useEffect } from 'react';
import { CipherPlayground } from '../components/CipherPlayground';
import { Brain, Target, Trophy, Puzzle, RefreshCw } from 'lucide-react';

export const PracticePage = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState('easy');
  const [currentChallenges, setCurrentChallenges] = useState([]);

  // Challenge templates with variables
  const challengeTemplates = {
    easy: [
      {
        title: "Caesar's Message",
        generateChallenge: () => {
          const words = ['HELLO', 'WORLD', 'CRYPTO', 'CIPHER', 'SECRET', 'DECODE'];
          const shift = Math.floor(Math.random() * 25) + 1;
          const word = words[Math.floor(Math.random() * words.length)];
          const encrypted = caesarEncrypt(word, shift);
          return {
            description: `Decrypt: '${encrypted}' with shift ${shift}`,
            hint: "Shift each letter back by the given number",
            solution: word
          };
        }
      },
      {
        title: "Simple Substitution",
        generateChallenge: () => {
          const words = ['APPLE', 'BEACH', 'CLOUD', 'DANCE', 'EARTH'];
          const word = words[Math.floor(Math.random() * words.length)];
          const encrypted = word.split('').map(c => 
            String.fromCharCode(((c.charCodeAt(0) - 65 + 1) % 26) + 65)
          ).join('');
          return {
            description: `Replace each letter with the previous one: '${encrypted}'`,
            hint: "What comes before each letter?",
            solution: word
          };
        }
      }
    ],
    medium: [
      {
        title: "Vigenère Challenge",
        generateChallenge: () => {
          const words = ['HELLO', 'WORLD', 'LEARN', 'STUDY', 'TEACH'];
          const keys = ['KEY', 'BOX', 'CAT', 'DOG', 'RAT'];
          const word = words[Math.floor(Math.random() * words.length)];
          const key = keys[Math.floor(Math.random() * keys.length)];
          const encrypted = vigenereEncrypt(word, key);
          return {
            description: `Key: '${key}', Decrypt: '${encrypted}'`,
            hint: "Use the Vigenère table with the given key",
            solution: word
          };
        }
      },
      {
        title: "Pattern Analysis",
        generateChallenge: () => {
          const patterns = ['ABC', 'XYZ', 'RST', 'MNO'];
          const pattern = patterns[Math.floor(Math.random() * patterns.length)];
          const repeated = `${pattern}${pattern} ${pattern}${pattern}`;
          return {
            description: `Find the pattern: '${repeated}'`,
            hint: "Look for repeating sequences",
            solution: `Repeating ${pattern} pattern`
          };
        }
      }
    ],
    hard: [
      {
        title: "Frequency Analysis",
        generateChallenge: () => {
          const phrases = ['THIS IS A TEST', 'CRYPTO IS FUN', 'DECODE ME NOW', 'SECRET MESSAGE'];
          const phrase = phrases[Math.floor(Math.random() * phrases.length)];
          const encrypted = rot13(phrase);
          return {
            description: `Analyze: '${encrypted}'`,
            hint: "Most common letters in English are E, T, A",
            solution: phrase
          };
        }
      },
      {
        title: "Mixed Cipher",
        generateChallenge: () => {
          const words = ['TESTING', 'COMPLEX', 'PUZZLE', 'CIPHER'];
          const word = words[Math.floor(Math.random() * words.length)];
          const encrypted = caesarEncrypt(word.split('').reverse().join(''), 3);
          return {
            description: `Combined Caesar + Reverse: '${encrypted}'`,
            hint: "First shift back, then reverse",
            solution: word
          };
        }
      }
    ]
  };

  // Utility functions for encryption
  const caesarEncrypt = (text, shift) => {
    return text.split('').map(char => {
      if (char.match(/[A-Z]/)) {
        return String.fromCharCode(
          ((char.charCodeAt(0) - 65 + shift) % 26) + 65
        );
      }
      return char;
    }).join('');
  };

  const vigenereEncrypt = (text, key) => {
    return text.split('').map((char, i) => {
      const shift = key[i % key.length].charCodeAt(0) - 65;
      return caesarEncrypt(char, shift);
    }).join('');
  };

  const rot13 = (text) => {
    return caesarEncrypt(text, 13);
  };

  // Generate new challenges
  const generateChallenges = () => {
    const templates = challengeTemplates[selectedDifficulty];
    const newChallenges = templates.map(template => ({
      title: template.title,
      ...template.generateChallenge()
    }));
    setCurrentChallenges(newChallenges);
  };

  // Generate initial challenges and when difficulty changes
  useEffect(() => {
    generateChallenges();
  }, [selectedDifficulty]);

  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-purple-400 mb-8">Practice Area</h1>
        
        {/* Main Practice Tools */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="space-y-6">
            <p className="text-gray-300">
              Put your cryptography knowledge to the test! Use our interactive tools to practice
              encryption and decryption techniques.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-purple-900/30 rounded-lg border border-purple-500/30">
                <Brain className="w-6 h-6 text-purple-400 mb-2" />
                <h3 className="font-bold mb-2">Learn by Doing</h3>
                <p className="text-sm text-gray-400">
                  Interactive exercises to master cryptography
                </p>
              </div>
              <div className="p-4 bg-purple-900/30 rounded-lg border border-purple-500/30">
                <Trophy className="w-6 h-6 text-purple-400 mb-2" />
                <h3 className="font-bold mb-2">Earn Badges</h3>
                <p className="text-sm text-gray-400">
                  Complete challenges to unlock achievements
                </p>
              </div>
            </div>
          </div>
          <CipherPlayground />
        </div>

        {/* Difficulty Selection */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-purple-300">Cryptography Challenges</h2>
            <button
              onClick={generateChallenges}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              New Challenges
            </button>
          </div>
          <div className="flex space-x-4 mt-4">
            {['easy', 'medium', 'hard'].map((difficulty) => (
              <button
                key={difficulty}
                onClick={() => setSelectedDifficulty(difficulty)}
                className={`px-4 py-2 rounded-lg capitalize ${
                  selectedDifficulty === difficulty
                    ? 'bg-purple-600 text-white'
                    : 'bg-purple-900/30 text-gray-300 hover:bg-purple-800/30'
                }`}
              >
                {difficulty}
              </button>
            ))}
          </div>
        </div>

        {/* Challenge Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentChallenges.map((challenge, index) => (
            <div key={index} className="bg-gray-900/50 backdrop-blur-md rounded-xl p-6 border border-purple-500/30">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-purple-300">{challenge.title}</h3>
                <Puzzle className="w-5 h-5 text-purple-400" />
              </div>
              <p className="text-gray-300 mb-4">{challenge.description}</p>
              <details className="text-sm text-gray-400">
                <summary className="cursor-pointer hover:text-purple-400 transition-colors">
                  Need a hint?
                </summary>
                <p className="mt-2 pl-4 border-l-2 border-purple-500/30">
                  {challenge.hint}
                </p>
              </details>
              <details className="text-sm text-gray-400 mt-4">
                <summary className="cursor-pointer hover:text-purple-400 transition-colors">
                  View Solution
                </summary>
                <p className="mt-2 pl-4 border-l-2 border-purple-500/30 font-mono">
                  {challenge.solution}
                </p>
              </details>
            </div>
          ))}
        </div>

        {/* Progress Tracking */}
        <div className="mt-12 p-6 bg-gray-900/50 backdrop-blur-md rounded-xl border border-purple-500/30">
          <div className="flex items-center gap-4 mb-4">
            <Target className="w-6 h-6 text-purple-400" />
            <h2 className="text-2xl font-bold text-purple-300">Your Progress</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 bg-black/30 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300">Easy Challenges</span>
                <span className="text-purple-400">2/5</span>
              </div>
              <div className="w-full bg-purple-900/30 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '40%' }}></div>
              </div>
            </div>
            <div className="p-4 bg-black/30 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300">Medium Challenges</span>
                <span className="text-purple-400">1/5</span>
              </div>
              <div className="w-full bg-purple-900/30 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '20%' }}></div>
              </div>
            </div>
            <div className="p-4 bg-black/30 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300">Hard Challenges</span>
                <span className="text-purple-400">0/5</span>
              </div>
              <div className="w-full bg-purple-900/30 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '0%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};