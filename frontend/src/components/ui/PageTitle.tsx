import { motion } from 'framer-motion';

export interface PageTitleProps {
  title: string;
  className?: string;
  subtitle?: string;
  alignment?: 'left' | 'center' | 'right';
}

export function PageTitle({ 
  title, 
  className, 
  subtitle,
  alignment = 'center' 
}: PageTitleProps) {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  return (
    <div className={`mb-8 relative ${alignmentClasses[alignment]}`}>
      {/* Cosmic dust elements */}
      <div className="absolute -left-4 top-1/2 -translate-y-1/2 h-16 w-[2px] bg-gradient-to-b from-fuchsia-500/0 via-purple-500/70 to-indigo-500/0 hidden md:block"></div>
      
      {/* Star elements */}
      <div className="absolute -left-8 top-0 w-1.5 h-1.5 rounded-full bg-amber-300/70 hidden md:block"></div>
      <div className="absolute -left-6 bottom-0 w-1 h-1 rounded-full bg-fuchsia-400/50 hidden md:block"></div>
      
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`text-3xl font-bold relative inline-block ${className || 'text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-300 via-purple-400 to-indigo-300'}`}
      >
        {/* Cosmic symbol decorations */}
        <span className="absolute -left-4 top-0 text-purple-400/70 font-light">✧</span>
        {title}
        <span className="absolute -right-4 top-0 text-purple-400/70 font-light">✧</span>
        
        {/* Cosmic glow effect */}
        <div className="absolute -inset-1 rounded-lg bg-purple-500/5 blur-xl hidden group-hover:block transition-opacity"></div>
        
        {/* Nebula underline effect */}
        <motion.div 
          className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-fuchsia-500/80 via-purple-500/60 to-indigo-500/0"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ delay: 0.2, duration: 0.8 }}
        ></motion.div>
      </motion.h2>
      
      {/* Animated stars around the title */}
      <div className="absolute -top-4 right-1/4 w-1 h-1 bg-amber-300/70 rounded-full animate-pulse hidden md:block"></div>
      <div className="absolute bottom-2 right-1/3 w-0.5 h-0.5 bg-fuchsia-300/50 rounded-full animate-ping hidden md:block"></div>
      
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-purple-300/80 mt-2 max-w-3xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}