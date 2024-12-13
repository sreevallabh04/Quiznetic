import { motion } from 'framer-motion';

interface PageTitleProps {
  title: string;
}

export function PageTitle({ title }: PageTitleProps) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-3xl font-bold text-center mb-8 text-white"
    >
      {title}
    </motion.h2>
  );
}