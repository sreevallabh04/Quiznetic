import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './components/auth/AuthContext';
import { Header } from './components/layout/Header';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import ClassSelection from './components/ClassSelection';
import SubjectSelection from './components/SubjectSelection';
import ChapterSelection from './components/ChapterSelection';
import Quiz from './components/Quiz';
import { useAuth } from './components/auth/AuthContext';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 text-white">
          <Header />
          
          <main className="pt-16">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <ClassSelection />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/class/:classId"
                element={
                  <ProtectedRoute>
                    <SubjectSelection />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/class/:classId/:subject"
                element={
                  <ProtectedRoute>
                    <ChapterSelection />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/class/:classId/:subject/:chapter"
                element={
                  <ProtectedRoute>
                    <Quiz />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}