import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Users } from 'lucide-react';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SignedIn>
        {children}
      </SignedIn>
      <SignedOut>
        <AuthLandingPage />
      </SignedOut>
    </>
  );
}

function AuthLandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center"
      >
        <div className="mb-6">
          <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-secondary-800 mb-2">Welcome to Quiznetic</h1>
          <p className="text-secondary-600">Educational Quiz Platform for Telangana State Board</p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex items-center space-x-3 text-left">
            <BookOpen className="w-5 h-5 text-primary-600" />
            <span className="text-secondary-700">1000+ Questions Across All Subjects</span>
          </div>
          <div className="flex items-center space-x-3 text-left">
            <Users className="w-5 h-5 text-primary-600" />
            <span className="text-secondary-700">Track Progress & Compete with Classmates</span>
          </div>
          <div className="flex items-center space-x-3 text-left">
            <GraduationCap className="w-5 h-5 text-primary-600" />
            <span className="text-secondary-700">Aligned with Government School Curriculum</span>
          </div>
        </div>

        <div className="space-y-3">
          <SignUpButton mode="modal">
            <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
              Create Student Account
            </button>
          </SignUpButton>
          
          <SignInButton mode="modal">
            <button className="w-full border border-primary-600 text-primary-600 hover:bg-primary-50 font-medium py-3 px-6 rounded-lg transition-colors">
              Sign In
            </button>
          </SignInButton>
        </div>

        <p className="text-sm text-secondary-500 mt-6">
          For government schools • Free to use • Works offline
        </p>
      </motion.div>
    </div>
  );
} 