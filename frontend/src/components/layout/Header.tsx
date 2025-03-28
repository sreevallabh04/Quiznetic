import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-indigo-950/30 border-b border-fuchsia-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3"
          >
            <div className="p-1.5 bg-fuchsia-500/10 rounded-md border border-purple-500/30 relative overflow-hidden group">
              {/* Star twinkle effect */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-300/30 to-fuchsia-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold relative"
            >
              <span className="bg-gradient-to-r from-fuchsia-300 via-purple-400 to-indigo-300 text-transparent bg-clip-text">
                Telangana Learning Hub
              </span>
              
              {/* Cosmic dust effect */}
              <motion.div 
                className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-fuchsia-500/60 via-purple-500/40 to-indigo-500/20"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.5, duration: 0.8 }}
              ></motion.div>
              
              {/* Star particle effects */}
              <div className="absolute -top-1 -right-2 w-1 h-1 bg-amber-300 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-2 left-1/4 w-1 h-1 bg-fuchsia-300 rounded-full animate-ping opacity-70"></div>
            </motion.span>
          </motion.div>
        </div>
      </div>
    </header>
  );
}