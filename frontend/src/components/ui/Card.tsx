import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export interface CardProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  icon?: ReactNode;
  isActive?: boolean;
}

export function Card({ children, onClick, className, icon, isActive = false }: CardProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`group relative overflow-hidden rounded-xl p-6 transition-all duration-300 w-full text-left ${
        className || 
        `backdrop-blur-md border ${
          isActive 
            ? 'border-fuchsia-400/50 bg-gradient-to-br from-indigo-900/60 to-purple-900/50 shadow-lg shadow-purple-500/20' 
            : 'border-purple-500/20 bg-gradient-to-br from-indigo-900/40 to-purple-900/30 hover:border-fuchsia-400/30 hover:shadow-lg hover:shadow-fuchsia-500/10'
        }`
      }`}
    >
      {/* Cosmic nebula effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-purple-500/0 to-fuchsia-500/0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
      
      {/* Subtle star pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(white_1px,transparent_1px)] bg-[size:32px_32px] opacity-[0.03]"></div>
      
      {/* Corner star accents */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-fuchsia-500/40 rounded-tl-lg opacity-70"></div>
      <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-purple-500/40 rounded-tr-lg opacity-70"></div>
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-indigo-500/40 rounded-bl-lg opacity-70"></div>
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-purple-500/40 rounded-br-lg opacity-70"></div>
      
      {/* Star particle effects */}
      <div className="absolute top-1/4 right-1/4 w-1 h-1 bg-amber-300 rounded-full opacity-0 group-hover:opacity-70 animate-pulse"></div>
      <div className="absolute bottom-1/3 left-1/3 w-0.5 h-0.5 bg-fuchsia-300 rounded-full opacity-0 group-hover:opacity-60 animate-ping"></div>
      
      {/* Icon container with cosmic styling */}
      {icon && (
        <div className="mb-4 flex justify-center items-center w-12 h-12 rounded-lg bg-fuchsia-500/10 border border-purple-500/30 relative overflow-hidden">
          {icon}
        </div>
      )}
      
      {/* Content with relative positioning */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.button>
  );
}