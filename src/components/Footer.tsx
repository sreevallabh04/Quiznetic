import React from 'react';
import { Github, Linkedin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-black/80 border-t border-purple-500/30 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-4">
          <p className="text-gray-400">Made with ❤️ by Sreevallabh Kakarala</p>
          <div className="flex space-x-4">
            <a href="https://github.com/sreevallabh" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com/in/sreevallabh" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};