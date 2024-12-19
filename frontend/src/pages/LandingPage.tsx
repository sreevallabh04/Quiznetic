import { motion } from 'framer-motion';
import { LoginForm } from '../components/auth/LoginForm';
import { Hero } from '../components/landing/Hero';
import { useAuth } from '../components/auth/AuthContext';
import { Navigate } from 'react-router-dom';

export function LandingPage() {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1"
          >
            <Hero />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-96 bg-gray-800/50 backdrop-blur-xl p-8 rounded-2xl shadow-xl"
          >
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Welcome Back
            </h2>
            <LoginForm />
          </motion.div>
        </div>
      </div>
    </div>
  );
}