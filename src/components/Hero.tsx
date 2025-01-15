import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Lock, Rocket } from 'lucide-react';

export const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-black via-purple-900 to-black">
      <div className="absolute inset-0 z-0">
        <div className="stars"></div>
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="animate-float">
          <Lock className="w-16 h-16 mx-auto mb-6 text-purple-400" />
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Explore the Secrets of Cryptography
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-fade-in">
          Journey through space and time to unlock the mysteries of encryption
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/classical-ciphers"
            className="group relative px-6 py-3 text-lg font-semibold rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
          >
            Start Learning
            <Rocket className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/practice"
            className="group px-6 py-3 text-lg font-semibold rounded-full border-2 border-purple-500 text-white hover:bg-purple-500/20 transition-all duration-300"
          >
            Interactive Tools
            <Sparkles className="inline-block ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}