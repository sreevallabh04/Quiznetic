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
      {/* Tech-inspired decorative elements */}
      <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-4 bg-cyan-500/30 rounded"></div>
      <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-1 h-4 bg-cyan-500/30 rounded"></div>
      
      {/* Progress track */}
      <div className={`w-full rounded-full h-2.5 mb-1 relative overflow-hidden ${className || 'bg-slate-800/80 backdrop-blur-sm border border-cyan-900/40'}`}>
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/5 opacity-50"></div>
        
        {/* Progress indicator */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
          className={`h-2.5 rounded-full ${progressClassName || 'bg-gradient-to-r from-blue-500 to-cyan-400'}`}
        ></motion.div>
      </div>
      
      {/* Optional labels */}
      {showLabels && (
        <div className="flex justify-between text-xs text-cyan-300/70">
          <span>{current} of {total} complete</span>
          <span>{Math.round(progress)}%</span>
        </div>
      )}
    </div>
  );
}