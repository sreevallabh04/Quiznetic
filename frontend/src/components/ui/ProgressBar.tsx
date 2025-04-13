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
      {/* Progress track */}
      <div className={`w-full rounded-full h-2.5 mb-1 relative overflow-hidden ${className || 'bg-secondary-100 border border-secondary-200'}`}>
        {/* Progress indicator */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
          className={`h-2.5 rounded-full ${progressClassName || 'bg-gradient-to-r from-primary-500 to-primary-600'}`}
        >
          {/* Subtle shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </motion.div>
      </div>
      
      {/* Optional labels */}
      {showLabels && (
        <div className="flex justify-between text-xs text-secondary-600">
          <span>{current} of {total} complete</span>
          <span>{Math.round(progress)}%</span>
        </div>
      )}
    </div>
  );
}