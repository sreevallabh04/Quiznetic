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
        `border ${
          isActive 
            ? 'border-primary-400 bg-primary-50 shadow-lg' 
            : 'border-secondary-200 bg-white hover:border-primary-300 hover:shadow-lg'
        }`
      }`}
    >
      {/* Subtle pattern background */}
      <div className="absolute inset-0 bg-[radial-gradient(#f0f0f0_1px,transparent_1px)] bg-[size:20px_20px] opacity-20"></div>
      
      {/* Icon container with styling */}
      {icon && (
        <div className="mb-4 flex justify-center items-center w-12 h-12 rounded-lg bg-primary-100 border border-primary-200 relative overflow-hidden">
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