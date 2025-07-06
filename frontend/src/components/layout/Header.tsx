import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Layout, User, Menu, X, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

interface HeaderProps {
  children?: React.ReactNode;
}

export function Header({ children }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-primary-100">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center py-2 sm:py-3">
            {/* Logo Section - Responsive */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2 sm:space-x-3"
            >
              <div className="p-1 sm:p-1.5 bg-primary-50 rounded-md border border-primary-200 overflow-hidden group">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-primary-600" />
              </div>
              
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-lg sm:text-xl lg:text-2xl font-bold relative"
              >
                <span className="bg-gradient-to-r from-primary-600 to-primary-700 text-transparent bg-clip-text">
                  <span className="hidden sm:inline">Telangana Learning Hub</span>
                  <span className="sm:hidden">TLH</span>
                </span>
                
                <motion.div 
                  className="absolute -bottom-1 left-0 h-[2px] bg-primary-500/60"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                ></motion.div>
              </motion.span>
            </motion.div>
            
            {/* Desktop Navigation */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden md:flex items-center space-x-2"
            >
              <Link 
                to="/question-types" 
                className="flex items-center gap-2 px-3 lg:px-4 py-2 rounded-lg text-secondary-700 hover:text-primary-600 hover:bg-primary-50 transition-colors text-sm lg:text-base"
              >
                <Layout className="w-4 h-4" />
                <span className="font-medium">Question Types</span>
              </Link>
              
              <Link 
                to="/gamification" 
                className="flex items-center gap-2 px-3 lg:px-4 py-2 rounded-lg text-secondary-700 hover:text-primary-600 hover:bg-primary-50 transition-colors text-sm lg:text-base"
              >
                <Trophy className="w-4 h-4" />
                <span className="font-medium">Progress</span>
              </Link>
              
              <Link 
                to="/profile" 
                className="flex items-center gap-2 px-3 lg:px-4 py-2 rounded-lg text-secondary-700 hover:text-primary-600 hover:bg-primary-50 transition-colors text-sm lg:text-base"
              >
                <User className="w-4 h-4" />
                <span className="font-medium">Profile</span>
              </Link>
              
              {/* User Profile Component */}
              {children}
            </motion.div>

            {/* Mobile Navigation Toggle */}
            <div className="md:hidden flex items-center space-x-2">
              {children}
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-lg text-secondary-700 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-primary-100 bg-white"
            >
              <div className="px-3 py-4 space-y-2">
                <Link 
                  to="/question-types" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-secondary-700 hover:text-primary-600 hover:bg-primary-50 transition-colors w-full"
                >
                  <Layout className="w-5 h-5" />
                  <span className="font-medium">Question Types</span>
                </Link>
                
                <Link 
                  to="/gamification" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-secondary-700 hover:text-primary-600 hover:bg-primary-50 transition-colors w-full"
                >
                  <Trophy className="w-5 h-5" />
                  <span className="font-medium">Progress Dashboard</span>
                </Link>
                
                <Link 
                  to="/profile" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-secondary-700 hover:text-primary-600 hover:bg-primary-50 transition-colors w-full"
                >
                  <User className="w-5 h-5" />
                  <span className="font-medium">Profile</span>
                </Link>
                
                <Link 
                  to="/home" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-secondary-700 hover:text-primary-600 hover:bg-primary-50 transition-colors w-full"
                >
                  <BookOpen className="w-5 h-5" />
                  <span className="font-medium">Start Learning</span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Spacer to prevent content from going under fixed header */}
      <div className="h-14 sm:h-16 lg:h-18"></div>
    </>
  );
}