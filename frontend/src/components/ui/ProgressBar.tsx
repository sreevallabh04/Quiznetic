import { motion } from 'framer-motion';

export interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
  progressClassName?: string;
  showLabels?: boolean;
}

export function ProgressBar({ 
  current, 
  total, 
  className, 
  progressClassName,
  showLabels = false
}: ProgressBarProps) {
  const progress = (current / total) * 100;

  return (
    <div className="relative">
      {/* Cosmic decorative elements */}
      <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-4 bg-fuchsia-500/30 rounded-full"></div>
      <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-1 h-4 bg-purple-500/30 rounded-full"></div>
      
      {/* Star dust */}
      <div className="absolute -top-1 left-1/4 w-0.5 h-0.5 bg-amber-300 rounded-full animate-pulse"></div>
      <div className="absolute -bottom-1 right-1/3 w-0.5 h-0.5 bg-amber-300 rounded-full animate-ping opacity-70"></div>
      
      {/* Progress track */}
      <div className={`w-full rounded-full h-2.5 mb-1 relative overflow-hidden ${className || 'bg-indigo-950/70 backdrop-blur-sm border border-purple-900/40'}`}>
        {/* Nebula glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/10 to-indigo-500/5 opacity-50"></div>
        
        {/* Progress indicator */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
          className={`h-2.5 rounded-full ${progressClassName || 'bg-gradient-to-r from-fuchsia-500 to-purple-400'}`}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
        </motion.div>
      </div>
      
      {/* Optional labels */}
      {showLabels && (
        <div className="flex justify-between text-xs text-purple-300/80">
          <span>{current} of {total} complete</span>
          <span>{Math.round(progress)}%</span>
        </div>
      )}
    </div>
  );
}