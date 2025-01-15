import React, { useState } from 'react';
import { Menu, X, BookOpen, Lock, Shield, Brain, Award } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { title: 'Introduction', icon: BookOpen, path: '/' },
    { title: 'Classical Ciphers', icon: Lock, path: '/classical-ciphers' },
    { title: 'Modern Encryption', icon: Shield, path: '/modern-encryption' },
    { title: 'Practice', icon: Brain, path: '/practice' },
    { title: 'Achievements', icon: Award, path: '/achievements' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-md border-b border-purple-900/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Lock className="w-8 h-8 text-purple-400" />
            <span className="text-xl font-bold text-white">CryptoSpace</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.title}
                to={item.path}
                className={`text-gray-300 hover:text-purple-400 flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                  isActive(item.path) ? 'text-purple-400 bg-purple-900/20' : ''
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.title}</span>
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-black/90">
            {navItems.map((item) => (
              <Link
                key={item.title}
                to={item.path}
                className={`text-gray-300 hover:text-purple-400 block px-3 py-2 rounded-md text-base font-medium w-full text-left flex items-center space-x-2 ${
                  isActive(item.path) ? 'text-purple-400 bg-purple-900/20' : ''
                }`}
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.title}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};