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
      {/* Left accent line for visual interest */}
      <div className="absolute -left-4 top-1/2 -translate-y-1/2 h-16 w-[3px] bg-primary-400 hidden md:block"></div>
      
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`text-3xl font-bold relative inline-block ${className || 'text-secondary-800'}`}
      >
        {title}
        
        {/* Bottom underline accent */}
        <motion.div 
          className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary-500"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ delay: 0.2, duration: 0.8 }}
        ></motion.div>
      </motion.h2>
      
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-secondary-600 mt-2 max-w-3xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}