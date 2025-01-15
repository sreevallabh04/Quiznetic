import React, { useState } from 'react';
import { RefreshCw, Lock, Unlock } from 'lucide-react';

export const CipherPlayground = () => {
  const [text, setText] = useState('');
  const [shift, setShift] = useState(3);
  const [result, setResult] = useState('');

  const caesarCipher = (str: string, shift: number, decrypt = false) => {
    return str
      .split('')
      .map((char) => {
        if (char.match(/[a-z]/i)) {
          const code = char.charCodeAt(0);
          const isUpperCase = code >= 65 && code <= 90;
          const base = isUpperCase ? 65 : 97;
          const shiftAmount = decrypt ? -shift : shift;
          return String.fromCharCode(
            ((code - base + shiftAmount + 26) % 26) + base
          );
        }
        return char;
      })
      .join('');
  };

  const handleEncrypt = () => {
    setResult(caesarCipher(text, shift));
  };

  const handleDecrypt = () => {
    setResult(caesarCipher(text, shift, true));
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-md rounded-xl p-6 border border-purple-500/30">
      <h3 className="text-2xl font-bold text-white mb-4">Cipher Playground</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Enter your message
          </label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full px-4 py-2 bg-black/50 border border-purple-500/30 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Type something..."
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Shift Amount: {shift}
          </label>
          <input
            type="range"
            min="1"
            max="25"
            value={shift}
            onChange={(e) => setShift(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="flex space-x-4">
          <button
            onClick={handleEncrypt}
            className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white transition-colors"
          >
            <Lock className="w-4 h-4" />
            <span>Encrypt</span>
          </button>
          <button
            onClick={handleDecrypt}
            className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-pink-600 hover:bg-pink-700 rounded-lg text-white transition-colors"
          >
            <Unlock className="w-4 h-4" />
            <span>Decrypt</span>
          </button>
        </div>

        {result && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Result
            </label>
            <div className="p-4 bg-black/30 rounded-lg text-purple-400 font-mono break-all">
              {result}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}