import { UserButton, useUser } from '@clerk/clerk-react';
import { motion } from 'framer-motion';

export function UserProfile() {
  const { user } = useUser();

  return (
    <div className="flex items-center space-x-2 sm:space-x-4">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="hidden sm:flex items-center space-x-3 bg-white rounded-full px-2 sm:px-4 py-1 sm:py-2 shadow-sm border border-primary-100"
      >
        <div className="text-right">
          <p className="text-xs sm:text-sm font-medium text-secondary-800 leading-tight">
            {user?.firstName || 'Student'}
          </p>
          <p className="text-xs text-secondary-500">
            Class {user?.publicMetadata?.classLevel || '6-10'}
          </p>
        </div>
      </motion.div>
      
      <UserButton 
        appearance={{
          elements: {
            avatarBox: "w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-primary-200"
          }
        }}
        showName={false}
      />
    </div>
  );
} 