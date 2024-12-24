import { motion } from 'framer-motion';
import { LoginForm } from '../components/auth/LoginForm';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-gray-800/50 backdrop-blur-xl p-8 rounded-2xl shadow-xl"
      >
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>

        <h2 className="text-2xl font-bold text-white mb-6">
          Welcome Back
        </h2>
        <LoginForm />
      </motion.div>
    </div>
  );
}